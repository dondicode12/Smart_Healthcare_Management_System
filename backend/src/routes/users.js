import { Router } from 'express'
import pool from '../db.js'
import { verifyToken, authorize } from '../middleware/auth.js'

const router = Router()

// GET /api/v1/users  (admin only)
// password_hash is never selected, so it can never leak.
router.get('/', verifyToken, authorize('admin'), async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT user_id,
              first_name || ' ' || last_name AS name,
              email, role, is_active
       FROM users
       ORDER BY user_id`,
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

export default router
