import { Router } from 'express'
import pool from '../db.js'
import { verifyToken, authorize } from '../middleware/auth.js'
import { getPatientId } from '../lib/profile.js'

const router = Router()

// GET /api/v1/prescriptions  (patient: their own prescriptions, each with its medicines)
router.get('/', verifyToken, authorize('patient'), async (req, res, next) => {
  try {
    const patientId = await getPatientId(req.user.id)
    if (!patientId) return res.json([])

    const { rows } = await pool.query(
      `SELECT pr.prescription_id,
              pr.issued_at::date::text AS issued_date,
              pr.notes,
              ud.first_name || ' ' || ud.last_name AS doctor,
              COALESCE(
                json_agg(json_build_object(
                  'medicine', m.name || COALESCE(' ' || m.strength, ''),
                  'dosage', pi.dosage,
                  'frequency', pi.frequency,
                  'duration_days', pi.duration_days,
                  'instructions', pi.instructions,
                  'ends_on', (pr.issued_at::date + pi.duration_days)::text
                ) ORDER BY pi.prescription_item_id)
                FILTER (WHERE pi.prescription_item_id IS NOT NULL),
                '[]'::json
              ) AS items
       FROM prescriptions pr
       JOIN appointments a ON a.appointment_id = pr.appointment_id
       JOIN doctors d      ON d.doctor_id = a.doctor_id
       JOIN users ud       ON ud.user_id = d.user_id
       LEFT JOIN prescription_items pi ON pi.prescription_id = pr.prescription_id
       LEFT JOIN medications m         ON m.medication_id = pi.medication_id
       WHERE a.patient_id = $1
       GROUP BY pr.prescription_id, ud.first_name, ud.last_name
       ORDER BY pr.issued_at DESC`,
      [patientId],
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

export default router
