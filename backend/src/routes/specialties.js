import { Router } from 'express'
import pool from '../db.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

// GET /api/v1/specialties  (any logged-in user) - fills the specialty dropdown
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT specialty_id, name FROM specialties ORDER BY name',
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

export default router
