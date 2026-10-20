import { Link } from 'react-router-dom'

function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-100 text-center">
      <p className="text-6xl font-bold text-red-600">403</p>
      <h1 className="mt-2 text-2xl font-semibold">Access denied</h1>
      <p className="mb-6 mt-2 text-gray-500">
        You don't have permission to view this page.
      </p>
      <Link
        to="/"
        className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
      >
        Back to Login
      </Link>
    </div>
  )
}

export default Unauthorized