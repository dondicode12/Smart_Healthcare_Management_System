import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-100 text-center">
      <p className="text-6xl font-bold text-blue-900">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
      <p className="mb-6 mt-2 text-gray-500">
        The page you're looking for doesn't exist or was moved.
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

export default NotFound