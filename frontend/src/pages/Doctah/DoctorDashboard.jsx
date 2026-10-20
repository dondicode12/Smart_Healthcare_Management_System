import DoctorLayout from '../../components/DoctorLayout'

function DoctorDashboard() {
  return (
    <DoctorLayout>
      <h2 className="mb-6 text-2xl font-bold">Welcome, Dr. Dion Angelo Hipolito</h2>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-gray-500">Appointments Today</p>
          <p className="text-3xl font-bold text-blue-900">5</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-gray-500">Total Patients</p>
          <p className="text-3xl font-bold text-blue-900">48</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-gray-500">Pending Prescriptions</p>
          <p className="text-3xl font-bold text-blue-900">2</p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold">Today's Schedule</h3>
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4">Time</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">9:00 AM</td>
              <td className="p-4">Juan Dela Cruz</td>
              <td className="p-4">Chest pain follow-up</td>
              <td className="p-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Confirmed
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-4">10:30 AM</td>
              <td className="p-4">Ana Reyes</td>
              <td className="p-4">Blood pressure check</td>
              <td className="p-4">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DoctorLayout>
  )
}

export default DoctorDashboard