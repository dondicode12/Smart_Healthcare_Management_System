import jwt from 'jsonwebtoken'

// Rejects the request unless it has a valid "Authorization: Bearer <token>" header.
export function verifyToken(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({
      error: { code: 'NO_TOKEN', message: 'Please sign in first.' },
    })
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET) // { id, role }
    next()
  } catch {
    res.status(401).json({
      error: { code: 'INVALID_TOKEN', message: 'Your session expired. Please sign in again.' },
    })
  }
}

// Use after verifyToken. Example: authorize('admin', 'doctor')
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: { code: 'FORBIDDEN', message: 'You do not have permission to do this.' },
      })
    }
    next()
  }
}
