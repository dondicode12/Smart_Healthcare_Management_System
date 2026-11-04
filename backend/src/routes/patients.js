import { Router } from 'express'
import pool from '../db.js'
import { verifyToken, authorize } from '../middleware/auth.js'
import { getDoctorId } from '../lib/profile.js'

const router = Router()

// GET /api/v1/patients
//  admin  -> every patient
//  doctor -> only patients who have an appointment with that doctor
router.get('/', verifyToken, authorize('admin', 'doctor'), async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const { rows } = await pool.query(
        `SELECT p.patient_id,
                u.first_name || ' ' || u.last_name AS name,
                DATE_PART('year', AGE(p.date_of_birth))::int AS age,
                u.phone, u.email,
                (SELECT MAX(a.appointment_date)::text FROM appointments a
                  WHERE a.patient_id = p.patient_id AND a.status = 'completed') AS last_visit
         FROM patients p
         JOIN users u ON u.user_id = p.user_id
         ORDER BY u.last_name, u.first_name`,
      )
      return res.json(rows)
    }

    const doctorId = await getDoctorId(req.user.id)
    if (!doctorId) return res.json([])

    const { rows } = await pool.query(
      `SELECT p.patient_id,
              u.first_name || ' ' || u.last_name AS name,
              DATE_PART('year', AGE(p.date_of_birth))::int AS age,
              u.phone, u.email,
              (SELECT MAX(a.appointment_date)::text FROM appointments a
                WHERE a.patient_id = p.patient_id AND a.doctor_id = $1
                  AND a.status = 'completed') AS last_visit
       FROM patients p
       JOIN users u ON u.user_id = p.user_id
       WHERE EXISTS (SELECT 1 FROM appointments a
                      WHERE a.patient_id = p.patient_id AND a.doctor_id = $1)
       ORDER BY u.last_name, u.first_name`,
      [doctorId],
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

// GET /api/v1/patients/:id  -> { patient, visits }  (doctor sees only their own visits)
router.get('/:id', verifyToken, authorize('admin', 'doctor'), async (req, res, next) => {
  try {
    const patientId = Number.parseInt(req.params.id, 10)
    if (!Number.isInteger(patientId)) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid patient id.' } })
    }

    let doctorId = null
    if (req.user.role === 'doctor') {
      doctorId = await getDoctorId(req.user.id)
      const allowed = doctorId && (await pool.query(
        'SELECT 1 FROM appointments WHERE patient_id = $1 AND doctor_id = $2 LIMIT 1',
        [patientId, doctorId],
      )).rowCount > 0
      if (!allowed) {
        return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Patient not found.' } })
      }
    }

    const patient = await pool.query(
      `SELECT p.patient_id,
              u.first_name || ' ' || u.last_name AS name,
              u.email, u.phone,
              p.date_of_birth::text AS date_of_birth,
              DATE_PART('year', AGE(p.date_of_birth))::int AS age,
              p.sex, p.blood_type
       FROM patients p
       JOIN users u ON u.user_id = p.user_id
       WHERE p.patient_id = $1`,
      [patientId],
    )
    if (!patient.rows[0]) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Patient not found.' } })
    }

    const visits = await pool.query(
      `SELECT a.appointment_id,
              a.appointment_date::text AS date,
              a.reason, a.diagnosis, a.notes
       FROM appointments a
       WHERE a.patient_id = $1
         AND a.status = 'completed'
         AND ($2::int IS NULL OR a.doctor_id = $2)
       ORDER BY a.appointment_date DESC, a.start_time DESC`,
      [patientId, doctorId],
    )

    res.json({ patient: patient.rows[0], visits: visits.rows })
  } catch (err) {
    next(err)
  }
})

export default router
