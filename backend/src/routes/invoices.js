import { Router } from 'express'
import pool from '../db.js'
import { verifyToken, authorize } from '../middleware/auth.js'
import { getPatientId } from '../lib/profile.js'

const router = Router()

const SELECT_INVOICES = `
  SELECT i.invoice_id,
         i.issue_date::text AS issue_date,
         i.total_amount,
         i.status,
         up.first_name || ' ' || up.last_name AS patient,
         COALESCE((SELECT string_agg(s.name, ', ' ORDER BY ii.invoice_item_id)
                   FROM invoice_items ii
                   JOIN services s ON s.service_id = ii.service_id
                   WHERE ii.invoice_id = i.invoice_id), '-') AS description,
         COALESCE((SELECT SUM(pay.amount) FROM payments pay
                   WHERE pay.invoice_id = i.invoice_id), 0) AS amount_paid
  FROM invoices i
  JOIN patients p ON p.patient_id = i.patient_id
  JOIN users up   ON up.user_id = p.user_id`

const ORDER = ' ORDER BY i.issue_date DESC, i.invoice_id DESC'

// GET /api/v1/invoices
//  admin   -> all invoices
//  patient -> only their own
router.get('/', verifyToken, authorize('admin', 'patient'), async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const { rows } = await pool.query(SELECT_INVOICES + ORDER)
      return res.json(rows)
    }

    const patientId = await getPatientId(req.user.id)
    if (!patientId) return res.json([])
    const { rows } = await pool.query(SELECT_INVOICES + ' WHERE i.patient_id = $1' + ORDER, [patientId])
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

export default router
