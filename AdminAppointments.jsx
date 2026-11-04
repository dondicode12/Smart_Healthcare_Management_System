import AdminLayout from '../../components/AdminLayout'

function AdminAppointments() {
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Appointments</h2>
        <button className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          Add Appointment
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="p-4">Patient</th>
              <th className="p-4">Doctor</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">Don Marco Del Campo</td>
              <td className="p-4">Dr. Maria Santos</td>
              <td className="p-4">2023-10-15</td>
              <td className="p-4">10:00 AM</td>
              <td className="p-4">Confirmed</td>
              <td className="p-4">
                <button className="mr-3 text-blue-700 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-4">Sean Kyle Quintos</td>
              <td className="p-4">Dr. Jose Reyes</td>
              <td className="p-4">2023-10-16</td>
              <td className="p-4">2:00 PM</td>
              <td className="p-4">Pending</td>
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

export default AdminAppointments