import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../db.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function fail(res, status, code, message) {
  return res.status(status).json({ error: { code, message } })
}

// POST /api/v1/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')

    if (!email || !password) {
      return fail(res, 400, 'VALIDATION_ERROR', 'Please enter your email and password.')
    }

    // $1 is a "parameter". The value is sent separately from the SQL,
    // which is what prevents SQL injection. Never build SQL with string concatenation.
    const { rows } = await pool.query(
      `SELECT user_id, role, email, password_hash, first_name, last_name, is_active
       FROM users WHERE email = $1`,
      [email],
    )
    const user = rows[0]

    // Same message for "no such email" and "wrong password" on purpose.
    const ok = user && (await bcrypt.compare(password, user.password_hash))
    if (!ok) {
      return fail(res, 401, 'INVALID_CREDENTIALS', 'Email or password is incorrect.')
    }
    if (!user.is_active) {
      return fail(res, 403, 'ACCOUNT_INACTIVE', 'This account is inactive. Contact the admin.')
    }

    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.json({
      token,
      user: {
        id: user.user_id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/v1/auth/register  (always creates a PATIENT account)
router.post('/register', async (req, res, next) => {
  const fullName = String(req.body.fullName || '').trim().replace(/\s+/g, ' ')
  const email = String(req.body.email || '').trim().toLowerCase()
  const phone = String(req.body.phone || '').trim()
  const dateOfBirth = String(req.body.dateOfBirth || '')
  const password = String(req.body.password || '')

  const words = fullName.split(' ').filter(Boolean)
  if (words.length < 2) {
    return fail(res, 400, 'VALIDATION_ERROR', 'Please enter your first and last name.')
  }
  if (!EMAIL_PATTERN.test(email)) {
    return fail(res, 400, 'VALIDATION_ERROR', 'Please enter a valid email address.')
  }
  if (!phone) return fail(res, 400, 'VALIDATION_ERROR', 'Phone number is required.')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) || dateOfBirth > new Date().toISOString().slice(0, 10)) {
    return fail(res, 400, 'VALIDATION_ERROR', 'Please enter a valid date of birth.')
  }
  if (password.length < 8) {
    return fail(res, 400, 'VALIDATION_ERROR', 'Password must be at least 8 characters.')
  }

  // "Juan Dela Cruz" -> first_name "Juan Dela", last_name "Cruz"
  const lastName = words[words.length - 1]
  const firstName = words.slice(0, -1).join(' ')

  const client = await pool.connect()
  try {
    // A transaction = all steps succeed together, or none are saved.
    // We insert into 2 tables (users + patients), so we must not save half of it.
    await client.query('BEGIN')
    const hash = await bcrypt.hash(password, 12)

    const created = await client.query(
      `INSERT INTO users (role, email, password_hash, first_name, last_name, phone)
       VALUES ('patient', $1, $2, $3, $4, $5)
       RETURNING user_id`,
      [email, hash, firstName, lastName, phone],
    )
    await client.query(
      'INSERT INTO patients (user_id, date_of_birth) VALUES ($1, $2)',
      [created.rows[0].user_id, dateOfBirth],
    )

    await client.query('COMMIT')
    res.status(201).json({ message: 'Account created. You can now sign in.' })
  } catch (err) {
    await client.query('ROLLBACK')
    if (err.code === '23505') {
      return fail(res, 409, 'EMAIL_TAKEN', 'That email is already registered.')
    }
    next(err)
  } finally {
    client.release()
  }
})

// GET /api/v1/auth/me  (needs a valid token)
router.get('/me', verifyToken, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT user_id, role, email, first_name, last_name FROM users WHERE user_id = $1',
      [req.user.id],
    )
    if (!rows[0]) return fail(res, 404, 'NOT_FOUND', 'User not found.')
    const u = rows[0]
    res.json({ id: u.user_id, name: `${u.first_name} ${u.last_name}`, email: u.email, role: u.role })
  } catch (err) {
    next(err)
  }
})

export default router
