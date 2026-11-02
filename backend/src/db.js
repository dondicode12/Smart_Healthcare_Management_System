import 'dotenv/config'
import pg from 'pg'

// A "pool" keeps a few database connections open and reuses them,
// so every request does not have to reconnect.
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Supabase requires SSL
  max: 10,
})

export default pool
