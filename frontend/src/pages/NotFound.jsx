import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import StatePage from '../components/StatePage'

function NotFound() {
  return (
    <StatePage
      icon={Compass}
      label="Error 404"
      title="Page not found"
      message="The page you're looking for doesn't exist or was moved."
    >
      <Link
        to="/"
        className="rounded-lg bg-blue-900 px-4 py-2.5 font-semibold text-white hover:bg-blue-800"
      >
        Back to Login
      </Link>
    </StatePage>
  )
}

export default NotFound
