import { Link, useNavigate } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import StatePage from '../components/StatePage'

function Unauthorized() {
  const navigate = useNavigate()

  return (
    <StatePage
      icon={ShieldAlert}
      tone="red"
      label="Error 403"
      title="You don't have access to this page"
      message="This page is for a different type of account. If you think this is a mistake, please contact your administrator."
    >
      <button
        onClick={() => navigate(-1)}
        className="rounded-lg bg-blue-900 px-4 py-2.5 font-semibold text-white hover:bg-blue-800"
      >
        Go back
      </button>
      <Link
        to="/"
        className="rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-100"
      >
        Back to Login
      </Link>
    </StatePage>
  )
}

export default Unauthorized
