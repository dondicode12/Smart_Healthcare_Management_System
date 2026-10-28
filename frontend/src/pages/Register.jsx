import { Link } from 'react-router-dom'

const inputClass =
  'mb-4 mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100'

function Register() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel: branding (hidden on small screens) */}
      <div className="hidden w-1/2 flex-col justify-between bg-linear-to-br from-blue-900 to-blue-700 p-12 text-white md:flex">
        <h1 className="text-3xl font-bold tracking-tight">BLASTCARE</h1>

        <div>
          <h2 className="text-4xl font-bold leading-tight">
            Join us and take
            <br />
            charge of your health.
          </h2>
          <p className="mt-4 max-w-md text-blue-100">
            Create a free patient account in a minute and book your first
            appointment today.
          </p>
        </div>

        <p className="text-sm text-blue-200">© 2026 BLASTCARE. All rights reserved.</p>
      </div>

      {/* Right panel: the form */}
      <div className="flex w-full items-center justify-center overflow-y-auto bg-white p-8 md:w-1/2">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="mb-8 mt-1 text-gray-500">It only takes a minute</p>

          <form>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" placeholder="Juan Dela Cruz" className={inputClass} />

            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" placeholder="you@example.com" className={inputClass} />

            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" placeholder="09XX XXX XXXX" className={inputClass} />

            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" className={inputClass} />

            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" placeholder="Create a password" className={inputClass} />

            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" placeholder="Re-enter your password" className="mb-6 mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-900 p-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/" className="font-medium text-blue-700 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register