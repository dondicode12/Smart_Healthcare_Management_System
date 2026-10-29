
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  function handleLogin(event) {
    event.preventDefault()
    setMessage('')
    setMessageType('')

    if (!email.trim() || !password) {
      setMessage('Please enter your email and password.')
      setMessageType('error')
      return
    }

    setMessage(
      'Validation successful! Actual sign-in will work once the backend is connected.'
    )
    setMessageType('success')
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel: branding */}
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

        <p className="text-sm text-blue-200">
          © 2026 BLASTCARE. All rights reserved.
        </p>
      </div>

      {/* Right panel: the form */}
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mb-8 mt-1 text-gray-500">
            Sign in to your account
          </p>

          <form onSubmit={handleLogin}>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="mb-4 mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />

            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="relative mb-6 mt-1">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-300 p-3 pr-12 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-700"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                    <path d="M9.9 5.2A11 11 0 0112 5c5 0 9 7 9 7a15 15 0 01-3 3.8" />
                    <path d="M6.6 6.6C4.1 8.2 3 12 3 12s4 7 9 7a9 9 0 004.1-1" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`mb-4 rounded-lg p-3 text-sm ${
                  messageType === 'error'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-900 p-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
