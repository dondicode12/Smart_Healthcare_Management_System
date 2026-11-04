import pool from '../db.js'
import { getDoctorId, getPatientId } from './profile.js'

// "Today" in the Philippines (the database clock is UTC).
const TODAY = "(NOW() AT TIME ZONE 'Asia/Manila')::date"

// This file decides WHAT the AI is allowed to see.
// Every query is fixed (written by us, never by the AI) and parameterized.
// The logged-in user's id comes from the verified token, not from the chat message,
// so a user can never ask the AI about somebody else's records.
//
// Deliberately NOT sent to the AI: emails, phone numbers, addresses, dates of birth,
// passwords, and anything else the answer does not need.

async function patientContext(userId) {
  const patientId = await getPatientId(userId)
  if (!patientId) return { note: 'This account has no patient profile.' }

  const [upcoming, past, unpaid, medicines] = await Promise.all([
    pool.query(
      `SELECT a.appointment_date::text AS date, to_char(a.start_time, 'HH24:MI') AS time,
              ud.first_name || ' ' || ud.last_name AS doctor, s.name AS specialty
       FROM appointments a
       JOIN doctors d     ON d.doctor_id = a.doctor_id
       JOIN users ud      ON ud.user_id = d.user_id
       JOIN specialties s ON s.specialty_id = d.specialty_id
       WHERE a.patient_id = $1 AND a.status = 'scheduled' AND a.appointment_date >= ${TODAY}
       ORDER BY a.appointment_date, a.start_time
       LIMIT 5`,
      [patientId],
    ),
    pool.query(
      `SELECT a.appointment_date::text AS date, a.status,
              ud.first_name || ' ' || ud.last_name AS doctor,
              left(a.diagnosis, 120) AS diagnosis
       FROM appointments a
       JOIN doctors d ON d.doctor_id = a.doctor_id
       JOIN users ud  ON ud.user_id = d.user_id
       WHERE a.patient_id = $1 AND NOT (a.status = 'scheduled' AND a.appointment_date >= ${TODAY})
       ORDER BY a.appointment_date DESC, a.start_time DESC
       LIMIT 5`,
      [patientId],
    ),
    pool.query(
      `SELECT 'INV-' || lpad(i.invoice_id::text, 4, '0') AS invoice,
              i.issue_date::text AS issued,
              (i.total_amount - COALESCE((SELECT SUM(p.amount) FROM payments p
                                           WHERE p.invoice_id = i.invoice_id), 0))::float AS balance_php,
              COALESCE((SELECT string_agg(s.name, ', ') FROM invoice_items ii
                         JOIN services s ON s.service_id = ii.service_id
                         WHERE ii.invoice_id = i.invoice_id), '-') AS for_services
       FROM invoices i
       WHERE i.patient_id = $1 AND i.status = 'unpaid'
       ORDER BY i.issue_date DESC
       LIMIT 10`,
      [patientId],
    ),
    pool.query(
      `SELECT m.name || COALESCE(' ' || m.strength, '') AS medicine,
              pi.dosage, pi.frequency,
              (pr.issued_at::date + pi.duration_days)::text AS last_day
       FROM prescription_items pi
       JOIN prescriptions pr ON pr.prescription_id = pi.prescription_id
       JOIN appointments a   ON a.appointment_id = pr.appointment_id
       JOIN medications m    ON m.medication_id = pi.medication_id
       WHERE a.patient_id = $1 AND pr.issued_at::date + pi.duration_days >= ${TODAY}
       ORDER BY pr.issued_at::date + pi.duration_days
       LIMIT 10`,
      [patientId],
    ),
  ])

  return {
    upcoming_appointments: upcoming.rows,
    recent_past_appointments: past.rows,
    unpaid_bills: unpaid.rows,
    active_medicines: medicines.rows,
  }
}

async function doctorContext(userId) {
  const doctorId = await getDoctorId(userId)
  if (!doctorId) return { note: 'This account has no doctor profile.' }

  const [schedule, patients, visits, pending] = await Promise.all([
    pool.query(
      `SELECT a.appointment_date::text AS date, to_char(a.start_time, 'HH24:MI') AS time,
              a.status, left(a.reason, 120) AS reason,
              up.first_name || ' ' || up.last_name AS patient
       FROM appointments a
       JOIN patients p ON p.patient_id = a.patient_id
       JOIN users up   ON up.user_id = p.user_id
       WHERE a.doctor_id = $1 AND a.appointment_date BETWEEN ${TODAY} AND ${TODAY} + 7
       ORDER BY a.appointment_date, a.start_time
       LIMIT 20`,
      [doctorId],
    ),
    pool.query(
      `SELECT u.first_name || ' ' || u.last_name AS name,
              DATE_PART('year', AGE(p.date_of_birth))::int AS age,
              (SELECT MAX(a.appointment_date)::text FROM appointments a
                WHERE a.patient_id = p.patient_id AND a.doctor_id = $1
                  AND a.status = 'completed') AS last_completed_visit
       FROM patients p
       JOIN users u ON u.user_id = p.user_id
       WHERE EXISTS (SELECT 1 FROM appointments a
                      WHERE a.patient_id = p.patient_id AND a.doctor_id = $1)
       ORDER BY u.last_name, u.first_name
       LIMIT 30`,
      [doctorId],
    ),
    pool.query(
      `SELECT up.first_name || ' ' || up.last_name AS patient,
              a.appointment_date::text AS date,
              left(a.diagnosis, 120) AS diagnosis
       FROM appointments a
       JOIN patients p ON p.patient_id = a.patient_id
       JOIN users up   ON up.user_id = p.user_id
       WHERE a.doctor_id = $1 AND a.status = 'completed'
       ORDER BY a.appointment_date DESC, a.start_time DESC
       LIMIT 10`,
      [doctorId],
    ),
    pool.query(
      `SELECT COUNT(*)::int AS n FROM appointments a
       WHERE a.doctor_id = $1 AND a.status = 'completed'
         AND NOT EXISTS (SELECT 1 FROM prescriptions pr WHERE pr.appointment_id = a.appointment_id)`,
      [doctorId],
    ),
  ])

  return {
    schedule_today_and_next_7_days: schedule.rows,
    my_patients: patients.rows,
    my_recent_completed_visits: visits.rows,
    completed_visits_without_prescription: pending.rows[0].n,
  }
}

async function adminContext() {
  const [counts, unpaid, doctors, revenue] = await Promise.all([
    pool.query(
      `SELECT
         (SELECT COUNT(*) FROM patients)::int AS total_patients,
         (SELECT COUNT(*) FROM doctors)::int AS total_doctors,
         (SELECT COUNT(*) FROM appointments WHERE appointment_date = ${TODAY})::int AS appointments_today,
         (SELECT COUNT(*) FROM appointments WHERE status = 'scheduled')::int AS scheduled_appointments,
         (SELECT COUNT(*) FROM invoices WHERE status = 'unpaid')::int AS unpaid_invoices,
         (SELECT COUNT(*) FROM users WHERE NOT is_active)::int AS inactive_users`,
    ),
    pool.query(
      `SELECT 'INV-' || lpad(i.invoice_id::text, 4, '0') AS invoice,
              up.first_name || ' ' || up.last_name AS patient,
              i.issue_date::text AS issued,
              i.total_amount::float AS total_php
       FROM invoices i
       JOIN patients p ON p.patient_id = i.patient_id
       JOIN users up   ON up.user_id = p.user_id
       WHERE i.status = 'unpaid'
       ORDER BY i.issue_date DESC
       LIMIT 10`,
    ),
    pool.query(
      `SELECT ud.first_name || ' ' || ud.last_name AS doctor, s.name AS specialty,
              COUNT(DISTINCT a.patient_id)::int AS patients,
              COUNT(a.appointment_id)::int AS appointments
       FROM doctors d
       JOIN users ud      ON ud.user_id = d.user_id
       JOIN specialties s ON s.specialty_id = d.specialty_id
       LEFT JOIN appointments a ON a.doctor_id = d.doctor_id
       GROUP BY d.doctor_id, ud.first_name, ud.last_name, s.name
       ORDER BY patients DESC
       LIMIT 10`,
    ),
    pool.query(
      `SELECT to_char(m, 'Mon YYYY') AS month, COALESCE(SUM(p.amount), 0)::float AS revenue_php
       FROM generate_series(
              date_trunc('month', NOW() AT TIME ZONE 'Asia/Manila') - INTERVAL '5 months',
              date_trunc('month', NOW() AT TIME ZONE 'Asia/Manila'),
              INTERVAL '1 month') AS m
       LEFT JOIN payments p ON date_trunc('month', p.paid_at) = m
       GROUP BY m
       ORDER BY m`,
    ),
  ])

  return {
    totals: counts.rows[0],
    unpaid_invoices_latest_10: unpaid.rows,
    doctors_by_number_of_patients: doctors.rows,
    revenue_last_6_months: revenue.rows,
  }
}

// Returns { today, role, data } for the logged-in user
export async function buildContext(user) {
  const today = (
    await pool.query(`SELECT ${TODAY}::text AS today`)
  ).rows[0].today

  let data
  if (user.role === 'patient') data = await patientContext(user.id)
  else if (user.role === 'doctor') data = await doctorContext(user.id)
  else data = await adminContext()

  return { today, role: user.role, data }
}
