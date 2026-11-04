import { Router } from 'express'
import pool from '../db.js'
import { verifyToken, authorize } from '../middleware/auth.js'
import { getDoctorId, getPatientId } from '../lib/profile.js'

const router = Router()

// "Today" in the Philippines. The database clock is UTC, which can be a day behind.
const TODAY = "(NOW() AT TIME ZONE 'Asia/Manila')::date"

// GET /api/v1/dashboard/admin
router.get('/admin', verifyToken, authorize('admin'), async (req, res, next) => {
  try {
    const [counts, revenue, recent] = await Promise.all([
      pool.query(
        `SELECT
           (SELECT COUNT(*) FROM patients)::int AS total_patients,
           (SELECT COUNT(*) FROM doctors d JOIN users u ON u.user_id = d.user_id
             WHERE u.is_active)::int AS total_doctors,
           (SELECT COUNT(*) FROM appointments WHERE appointment_date = ${TODAY})::int AS appointments_today,
           (SELECT COUNT(*) FROM appointments WHERE status = 'scheduled')::int AS scheduled_appointments,
           (SELECT COUNT(*) FROM invoices WHERE status = 'unpaid')::int AS unpaid_invoices,
           (SELECT COUNT(*) FROM users WHERE NOT is_active)::int AS inactive_users`,
      ),
      pool.query(
        `SELECT to_char(m, 'Mon') AS label,
                COALESCE(SUM(p.amount), 0)::float AS value
         FROM generate_series(
                date_trunc('month', NOW() AT TIME ZONE 'Asia/Manila') - INTERVAL '5 months',
                date_trunc('month', NOW() AT TIME ZONE 'Asia/Manila'),
                INTERVAL '1 month') AS m
         LEFT JOIN payments p ON date_trunc('month', p.paid_at) = m
         GROUP BY m
         ORDER BY m`,
      ),
      pool.query(
        `SELECT a.appointment_id,
                a.appointment_date::text AS appointment_date,
                a.status,
                up.first_name || ' ' || up.last_name AS patient,
                ud.first_name || ' ' || ud.last_name AS doctor
         FROM appointments a
         JOIN patients p ON p.patient_id = a.patient_id
         JOIN users up   ON up.user_id = p.user_id
         JOIN doctors d  ON d.doctor_id = a.doctor_id
         JOIN users ud   ON ud.user_id = d.user_id
         ORDER BY a.appointment_date DESC, a.start_time DESC
         LIMIT 5`,
      ),
    ])

    const series = revenue.rows
    res.json({
      ...counts.rows[0],
      revenue: series,
      revenue_this_month: series.length ? series[series.length - 1].value : 0,
      recent: recent.rows,
    })
  } catch (err) {
    next(err)
  }
})

// GET /api/v1/dashboard/doctor
router.get('/doctor', verifyToken, authorize('doctor'), async (req, res, next) => {
  try {
    const doctorId = await getDoctorId(req.user.id)
    if (!doctorId) {
      return res.json({ appointments_today: 0, total_patients: 0, pending_prescriptions: 0, schedule: [] })
    }

    const [stats, schedule] = await Promise.all([
      pool.query(
        `SELECT
           (SELECT COUNT(*) FROM appointments
             WHERE doctor_id = $1 AND appointment_date = ${TODAY})::int AS appointments_today,
           (SELECT COUNT(DISTINCT patient_id) FROM appointments
             WHERE doctor_id = $1)::int AS total_patients,
           (SELECT COUNT(*) FROM appointments a
             WHERE a.doctor_id = $1 AND a.status = 'completed'
               AND NOT EXISTS (SELECT 1 FROM prescriptions pr
                                WHERE pr.appointment_id = a.appointment_id))::int AS pending_prescriptions`,
        [doctorId],
      ),
      pool.query(
        `SELECT a.appointment_id,
                to_char(a.start_time, 'HH24:MI') AS start_time,
                a.status, a.reason,
                up.first_name || ' ' || up.last_name AS patient
         FROM appointments a
         JOIN patients p ON p.patient_id = a.patient_id
         JOIN users up   ON up.user_id = p.user_id
         WHERE a.doctor_id = $1 AND a.appointment_date = ${TODAY}
         ORDER BY a.start_time`,
        [doctorId],
      ),
    ])

    res.json({ ...stats.rows[0], schedule: schedule.rows })
  } catch (err) {
    next(err)
  }
})

// GET /api/v1/dashboard/patient
router.get('/patient', verifyToken, authorize('patient'), async (req, res, next) => {
  try {
    const patientId = await getPatientId(req.user.id)
    if (!patientId) {
      return res.json({
        upcoming_count: 0, active_medicines: 0, unpaid_bills: 0,
        unpaid_description: null, ending_soon: null, upcoming: [],
      })
    }

    const [stats, upcoming, ending] = await Promise.all([
      pool.query(
        `SELECT
           (SELECT COUNT(*) FROM appointments
             WHERE patient_id = $1 AND status = 'scheduled'
               AND appointment_date >= ${TODAY})::int AS upcoming_count,
           (SELECT COUNT(*) FROM prescription_items pi
             JOIN prescriptions pr ON pr.prescription_id = pi.prescription_id
             JOIN appointments a   ON a.appointment_id = pr.appointment_id
             WHERE a.patient_id = $1
               AND pr.issued_at::date + pi.duration_days >= ${TODAY})::int AS active_medicines,
           (SELECT COUNT(*) FROM invoices
             WHERE patient_id = $1 AND status = 'unpaid')::int AS unpaid_bills,
           (SELECT string_agg(s.name, ', ')
              FROM invoice_items ii
              JOIN services s ON s.service_id = ii.service_id
             WHERE ii.invoice_id = (SELECT invoice_id FROM invoices
                                     WHERE patient_id = $1 AND status = 'unpaid'
                                     ORDER BY issue_date DESC, invoice_id DESC
                                     LIMIT 1)) AS unpaid_description`,
        [patientId],
      ),
      pool.query(
        `SELECT a.appointment_id,
                a.appointment_date::text AS appointment_date,
                to_char(a.start_time, 'HH24:MI') AS start_time,
                ud.first_name || ' ' || ud.last_name AS doctor,
                s.name AS specialty
         FROM appointments a
         JOIN doctors d     ON d.doctor_id = a.doctor_id
         JOIN users ud      ON ud.user_id = d.user_id
         JOIN specialties s ON s.specialty_id = d.specialty_id
         WHERE a.patient_id = $1 AND a.status = 'scheduled'
           AND a.appointment_date >= ${TODAY}
         ORDER BY a.appointment_date, a.start_time
         LIMIT 2`,
        [patientId],
      ),
      pool.query(
        `SELECT m.name
         FROM prescription_items pi
         JOIN prescriptions pr ON pr.prescription_id = pi.prescription_id
         JOIN appointments a   ON a.appointment_id = pr.appointment_id
         JOIN medications m    ON m.medication_id = pi.medication_id
         WHERE a.patient_id = $1
           AND pr.issued_at::date + pi.duration_days BETWEEN ${TODAY} AND ${TODAY} + 3
         ORDER BY pr.issued_at::date + pi.duration_days
         LIMIT 1`,
        [patientId],
      ),
    ])

    res.json({
      ...stats.rows[0],
      ending_soon: ending.rows[0]?.name ?? null,
      upcoming: upcoming.rows,
    })
  } catch (err) {
    next(err)
  }
})

export default router
