import { Navigate } from 'react-router-dom'

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

// Wrap a page with this. role = the only role allowed to see it.
function ProtectedRoute({ role, children }) {
  const user = getStoredUser()

  if (!localStorage.getItem('token') || !user) {
    return <Navigate to="/session-expired" replace />
  }
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />
  }
  return children
}

export default ProtectedRoute