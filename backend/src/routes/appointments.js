import { Router } from 'express'
import pool from '../db.js'
import { verifyToken } from '../middleware/auth.js'
import { getDoctorId, getPatientId } from '../lib/profile.js'

const router = Router()

const SELECT_APPOINTMENTS = `
  SELECT a.appointment_id,
         a.appointment_date::text AS appointment_date,
         to_char(a.start_time, 'HH24:MI') AS start_time,
         a.status, a.reason,
         up.first_name || ' ' || up.last_name AS patient,
         ud.first_name || ' ' || ud.last_name AS doctor,
         s.name AS specialty
  FROM appointments a
  JOIN patients p    ON p.patient_id = a.patient_id
  JOIN users up      ON up.user_id = p.user_id
  JOIN doctors d     ON d.doctor_id = a.doctor_id
  JOIN users ud      ON ud.user_id = d.user_id
  JOIN specialties s ON s.specialty_id = d.specialty_id`

const ORDER = ' ORDER BY a.appointment_date DESC, a.start_time DESC'

// GET /api/v1/appointments  (results depend on who is logged in)
//  admin   -> all appointments
//  doctor  -> only their own
//  patient -> only their own
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const { role, id } = req.user

    if (role === 'admin') {
      const { rows } = await pool.query(SELECT_APPOINTMENTS + ORDER)
      return res.json(rows)
    }

    if (role === 'doctor') {
      const doctorId = await getDoctorId(id)
      if (!doctorId) return res.json([])
      const { rows } = await pool.query(SELECT_APPOINTMENTS + ' WHERE a.doctor_id = $1' + ORDER, [doctorId])
      return res.json(rows)
    }

    const patientId = await getPatientId(id)
    if (!patientId) return res.json([])
    const { rows } = await pool.query(SELECT_APPOINTMENTS + ' WHERE a.patient_id = $1' + ORDER, [patientId])
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

export default router
