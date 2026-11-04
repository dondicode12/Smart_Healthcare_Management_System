import { Router } from 'express'
import pool from '../db.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

// GET /api/v1/doctors  (any logged-in user)
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT d.doctor_id,
              u.first_name || ' ' || u.last_name AS name,
              u.email,
              s.name AS specialty,
              d.consultation_fee
       FROM doctors d
       JOIN users u       ON u.user_id = d.user_id
       JOIN specialties s ON s.specialty_id = d.specialty_id
       WHERE u.is_active = TRUE
       ORDER BY u.last_name, u.first_name`,
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

export default router