
import { useState } from 'react'
import { Link } from 'react-router-dom'

const inputClass =
  'mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100'

function EyeIcon({ visible }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {visible ? (
        <>
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 5.2A11 11 0 0 1 12 5c5 0 9 7 9 7a15 15 0 0 1-4 4.5" />
          <path d="M6.2 6.2C3.6 7.8 2 12 2 12s3 7 10 7a10 10 0 0 0 4-.8" />
        </>
      ) : (
        <>
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  )
}

function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  function handleRegister(event) {
    event.preventDefault()

    const newErrors = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.'
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required.'
    }

    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required.'
    } else if (dateOfBirth > new Date().toISOString().split('T')[0]) {
      newErrors.dateOfBirth = 'Date of Birth cannot be in the future.'
    }

    if (!password) {
      newErrors.password = 'Password is required.'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(newErrors)
    setSuccess('')

    if (Object.keys(newErrors).length === 0) {
      setSuccess(
        'Validation successful! Account creation will work once the backend is connected.',
      )
    }
  }

  function errorText(message) {
    return message ? (
      <p className="mt-1 text-sm text-red-600" role="alert">
        {message}
      </p>
    ) : null
  }

  return (
    <div className="flex min-h-screen">
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

        <p className="text-sm text-blue-200">
          © 2026 BLASTCARE. All rights reserved.
        </p>
      </div>

      <div className="flex w-full items-center justify-center overflow-y-auto bg-white p-8 md:w-1/2">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mb-8 mt-1 text-gray-500">
            It only takes a minute
          </p>

          <form onSubmit={handleRegister} noValidate>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value)
                setErrors((prev) => ({ ...prev, fullName: '' }))
                setSuccess('')
              }}
              placeholder="Juan Dela Cruz"
              className={`${inputClass} ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errorText(errors.fullName)}

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErrors((prev) => ({ ...prev, email: '' }))
                setSuccess('')
              }}
              placeholder="you@example.com"
              className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
            />
            {errorText(errors.email)}

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                setErrors((prev) => ({ ...prev, phone: '' }))
                setSuccess('')
              }}
              placeholder="09XX XXX XXXX"
              className={`${inputClass} ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errorText(errors.phone)}

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => {
                setDateOfBirth(e.target.value)
                setErrors((prev) => ({ ...prev, dateOfBirth: '' }))
                setSuccess('')
              }}
              className={`${inputClass} ${errors.dateOfBirth ? 'border-red-500' : ''}`}
            />
            {errorText(errors.dateOfBirth)}

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setErrors((prev) => ({ ...prev, password: '' }))
                  setSuccess('')
                }}
                placeholder="Create a password"
                className={`w-full rounded-lg border p-3 pr-12 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
            {errorText(errors.password)}

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: '',
                  }))
                  setSuccess('')
                }}
                placeholder="Re-enter your password"
                className={`w-full rounded-lg border p-3 pr-12 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 ${
                  errors.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700"
              >
                <EyeIcon visible={showConfirmPassword} />
              </button>
            </div>
            {errorText(errors.confirmPassword)}

            {success && (
              <p
                className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700"
                role="status"
              >
                {success}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-blue-900 p-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              to="/"
              className="font-medium text-blue-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
