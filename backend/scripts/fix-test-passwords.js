// DEV ONLY. The seed accounts have placeholder password hashes (not real bcrypt hashes),
// so nobody can log in with them. This gives every such account the password below.
// It only touches rows whose hash is NOT a valid 60-character bcrypt hash.
import 'dotenv/config'
import bcrypt from 'bcrypt'
import pool from '../src/db.js'

const TEST_PASSWORD = 'Password123!'

const hash = await bcrypt.hash(TEST_PASSWORD, 12)
const { rows } = await pool.query(
  `UPDATE users SET password_hash = $1
   WHERE length(password_hash) <> 60
   RETURNING email, role`,
  [hash],
)

console.log(`Updated ${rows.length} account(s). Password for each: ${TEST_PASSWORD}`)
rows.forEach((r) => console.log(` - ${r.role}: ${r.email}`))
await pool.end()
