import Layout from '../../components/Layout'
import { Link } from 'react-router-dom'

function PatientAppointments() {
  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Appointments</h2>
        <Link to="/patient/book"
          className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          Book Appointment
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Doctor</th>
              <th className="p-4">Specialty</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">Oct 25, 2026</td>
              <td className="p-4">9:00 AM</td>
              <td className="p-4">Dr. Maria Santos</td>
              <td className="p-4">Cardiology</td>
              <td className="p-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Confirmed
                </span>
              </td>
              <td className="p-4">
                <button className="text-red-600 hover:underline">Cancel</button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Oct 28, 2026</td>
              <td className="p-4">2:30 PM</td>
              <td className="p-4">Dr. Jose Reyes</td>
              <td className="p-4">Dermatology</td>
              <td className="p-4">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                  Pending
                </span>
              </td>
              <td className="p-4">
                <button className="text-red-600 hover:underline">Cancel</button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Oct 10, 2026</td>
              <td className="p-4">11:00 AM</td>
              <td className="p-4">Dr. Ana Cruz</td>
              <td className="p-4">General Medicine</td>
              <td className="p-4">
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">
                  Completed
                </span>
              </td>
              <td className="p-4">
                <span className="text-gray-400">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default PatientAppointments