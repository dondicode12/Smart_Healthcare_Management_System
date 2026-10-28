import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel: branding (hidden on small screens) */}
      <div className="hidden w-1/2 flex-col justify-between bg-linear-to-br from-blue-900 to-blue-700 p-12 text-white md:flex">
        <h1 className="text-3xl font-bold tracking-tight">BLASTCARE</h1>

        <div>
          <h2 className="text-4xl font-bold leading-tight">
            Smarter healthcare,
            <br />
            all in one place.
          </h2>
          <p className="mt-4 max-w-md text-blue-100">
            Book appointments, view prescriptions, and manage your health
            records anytime, anywhere.
          </p>
        </div>

        <p className="text-sm text-blue-200">© 2026 BLASTCARE. All rights reserved.</p>
      </div>

      {/* Right panel: the form */}
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="mb-8 mt-1 text-gray-500">Sign in to your account</p>

          <form>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mb-4 mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />

            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Your password"
              className="mb-6 mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-900 p-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-700 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login