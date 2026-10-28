import AdminLayout from '../../components/AdminLayout'

function AdminDashboard() {
  return (
    <AdminLayout>
      <h2 className="mb-6 text-2xl font-bold">Admin Dashboard</h2>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
          <p className="text-gray-500">Total Patients</p>
          <p className="text-3xl font-bold text-blue-900">312</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
          <p className="text-gray-500">Total Doctors</p>
          <p className="text-3xl font-bold text-blue-900">18</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
          <p className="text-gray-500">Appointments Today</p>
          <p className="text-3xl font-bold text-blue-900">27</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
          <p className="text-gray-500">Revenue This Month</p>
          <p className="text-3xl font-bold text-green-600">₱84,500</p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
        <h3 className="mb-3 text-lg font-semibold text-blue-900">Recent Appointments</h3>
        <table className="w-full text-left">
          <thead className="text-sm text-gray-600">
            <tr>
              <th className="py-2">Patient</th>
              <th className="py-2">Doctor</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-3">Juan Dela Cruz</td>
              <td className="py-3">Dr. Maria Santos</td>
              <td className="py-3">Oct 25, 2026</td>
              <td className="py-3">Confirmed</td>
            </tr>
            <tr className="border-t">
              <td className="py-3">Ana Reyes</td>
              <td className="py-3">Dr. Jose Reyes</td>
              <td className="py-3">Oct 24, 2026</td>
              <td className="py-3">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard