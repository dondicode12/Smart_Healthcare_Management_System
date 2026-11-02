import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import StatePage from '../components/StatePage'

// Send people here when the server says their login has expired (HTTP 401).
function SessionExpired() {
  return (
    <StatePage
      icon={Clock}
      tone="yellow"
      label="Session expired"
      title="You've been signed out"
      message="For your security, we sign you out after a period of inactivity. Sign in again to continue. Anything you hadn't saved may need to be entered again."
    >
      <Link
        to="/"
        className="rounded-lg bg-blue-900 px-4 py-2.5 font-semibold text-white hover:bg-blue-800"
      >
        Sign in again
      </Link>
    </StatePage>
  )
}

export default SessionExpired
