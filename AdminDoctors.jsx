import AdminLayout from '../../components/AdminLayout'

function AdminDoctors() {
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Doctors</h2>
        <button className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          Add Doctor
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Specialty</th>
              <th className="p-4">Email</th>
              <th className="p-4">Availability</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">Dr. Maria Santos</td>
              <td className="p-4">Cardiology</td>
              <td className="p-4">maria@blastcare.com</td>
              <td className="p-4">Mon-Fri</td>
              <td className="p-4">
                <button className="mr-3 text-blue-700 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-4">Dr. Jose Reyes</td>
              <td className="p-4">Dermatology</td>
              <td className="p-4">jose@blastcare.com</td>
              <td className="p-4">Tue, Thu, Sat</td>
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

export default AdminDoctors