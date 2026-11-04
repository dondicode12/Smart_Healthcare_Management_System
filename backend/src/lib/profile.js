import pool from '../db.js'

// A login (users row) can also have a doctor or patient profile.
// These helpers find the profile id that belongs to the logged-in user.
export async function getDoctorId(userId) {
  const { rows } = await pool.query('SELECT doctor_id FROM doctors WHERE user_id = $1', [userId])
  return rows[0]?.doctor_id ?? null
}

export async function getPatientId(userId) {
  const { rows } = await pool.query('SELECT patient_id FROM patients WHERE user_id = $1', [userId])
  return rows[0]?.patient_id ?? null
}
