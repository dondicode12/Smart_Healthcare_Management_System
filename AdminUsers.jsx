import AdminLayout from '../../components/AdminLayout'

function AdminUsers() {
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <button className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          Add User
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">Juan Dela Cruz</td>
              <td className="p-4">juan@email.com</td>
              <td className="p-4">Patient</td>
              <td className="p-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Active
                </span>
              </td>
              <td className="p-4">
                <button className="mr-3 text-blue-700 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-4">Dr. Maria Santos</td>
              <td className="p-4">maria@blastcare.com</td>
              <td className="p-4">Doctor</td>
              <td className="p-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Active
                </span>
              </td>
              <td className="p-4">
                <button className="mr-3 text-blue-700 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-4">Rico Dizon</td>
              <td className="p-4">rico@blastcare.com</td>
              <td className="p-4">Admin</td>
              <td className="p-4">
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">
                  Inactive
                </span>
              </td>
              <td className="p-4">
                <button className="mr-3 text-blue-700 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default AdminUsers