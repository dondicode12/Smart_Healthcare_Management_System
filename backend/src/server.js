import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import pool from './db.js'
import authRoutes from './routes/auth.js'
import doctorRoutes from './routes/doctors.js'
import specialtyRoutes from './routes/specialties.js'
import userRoutes from './routes/users.js'
import patientRoutes from './routes/patients.js'
import appointmentRoutes from './routes/appointments.js'
import invoiceRoutes from './routes/invoices.js'
import prescriptionRoutes from './routes/prescriptions.js'
import dashboardRoutes from './routes/dashboard.js'

if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
  console.error('Missing DATABASE_URL or JWT_SECRET. Copy .env.example to .env and fill it in.')
  process.exit(1)
}

const app = express()

// CORS: only our frontend may call this API from a browser.
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

// Open http://localhost:5000/api/v1/health to test the database connection.
app.get('/api/v1/health', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW() AS server_time')
    res.json({ status: 'ok', database: 'connected', serverTime: rows[0].server_time })
  } catch (err) {
    console.error('Database check failed:', err.message)
    res.status(500).json({ status: 'error', database: 'not connected' })
  }
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/doctors', doctorRoutes)
app.use('/api/v1/specialties', specialtyRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/patients', patientRoutes)
app.use('/api/v1/appointments', appointmentRoutes)
app.use('/api/v1/invoices', invoiceRoutes)
app.use('/api/v1/prescriptions', prescriptionRoutes)
app.use('/api/v1/dashboard', dashboardRoutes)

app.use((req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found.' } })
})

// Last-resort error handler: log the details, show the user nothing sensitive.
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'Something went wrong on our side.' } })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
