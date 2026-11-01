
import { useState } from 'react'
import Layout from '../components/Layout'

function Profile() {
  const [fullName, setFullName] = useState('Juan Dela Cruz')
  const [email, setEmail] = useState('juan@email.com')
  const [phone, setPhone] = useState('0917 123 4567')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [profileMessage, setProfileMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    setProfileMessage('')

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setProfileMessage('Please complete all personal information fields.')
      setMessageType('error')
      return
    }

    setProfileMessage(
      'Profile details validated successfully! Saving will be available once the backend is connected.'
    )
    setMessageType('success')
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setPasswordMessage('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage('Please complete all password fields.')
      return
    }

    if (newPassword.length < 8) {
      setPasswordMessage('New password must be at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage('New passwords do not match.')
      return
    }

    setPasswordMessage(
      'Password details validated successfully! Updating will be available once the backend is connected.'
    )

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <Layout>
      <h2 className="mb-6 text-2xl font-bold">Profile & Settings</h2>

      <div className="mb-6 max-w-xl rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <h3 className="mb-4 text-lg font-semibold text-blue-900">
          Personal Information
        </h3>

        <form onSubmit={handleProfileSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mb-6 mt-1 w-full rounded border border-gray-300 p-2"
          />

          {profileMessage && (
            <p
              role="status"
              className={`mb-4 text-sm ${
                messageType === 'error' ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {profileMessage}
            </p>
          )}

          <button
            type="submit"
            className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
          >
            Save Changes
          </button>
        </form>
      </div>

      <div className="max-w-xl rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <h3 className="mb-4 text-lg font-semibold text-blue-900">
          Change Password
        </h3>

        <form onSubmit={handlePasswordSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mb-6 mt-1 w-full rounded border border-gray-300 p-2"
          />

          {passwordMessage && (
            <p
              role="status"
              className={`mb-4 text-sm ${
                passwordMessage.startsWith('Password details')
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {passwordMessage}
            </p>
          )}

          <button
            type="submit"
            className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
          >
            Update Password
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Profile
