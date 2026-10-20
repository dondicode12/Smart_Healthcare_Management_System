import Layout from '../components/Layout'

function Profile() {
  return (
    <Layout>
      <h2 className="mb-6 text-2xl font-bold">Profile & Settings</h2>

      <div className="mb-6 max-w-xl rounded-lg bg-white p-8 shadow">
        <h3 className="mb-4 text-lg font-semibold text-blue-900">Personal Information</h3>
        <form>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            defaultValue="Juan Dela Cruz"
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            defaultValue="juan@email.com"
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            defaultValue="0917 123 4567"
            className="mb-6 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <button
            type="submit"
            className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
          >
            Save Changes
          </button>
        </form>
      </div>

      <div className="max-w-xl rounded-lg bg-white p-8 shadow">
        <h3 className="mb-4 text-lg font-semibold text-blue-900">Change Password</h3>
        <form>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="mb-6 mt-1 w-full rounded border border-gray-300 p-2"
          />

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