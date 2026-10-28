import { Link } from 'react-router-dom'
import DoctorLayout from '../../components/DoctorLayout'

function DoctorPatients() {
  return (
    <DoctorLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Patients</h2>
        <input
          type="text"
          placeholder="Search patients..."
          className="rounded border border-gray-300 p-2"
        />
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Age</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Last Visit</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">Juan Dela Cruz</td>
              <td className="p-4">34</td>
              <td className="p-4">0917 123 4567</td>
              <td className="p-4">Oct 10, 2026</td>
              <td className="p-4">
                <Link to="/doctor/patients/record" className="text-blue-700 hover:underline">
                  View Record
                </Link>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-4">Ana Reyes</td>
              <td className="p-4">52</td>
              <td className="p-4">0918 765 4321</td>
              <td className="p-4">Sep 28, 2026</td>
              <td className="p-4">
                <Link to="/doctor/patients/record" className="text-blue-700 hover:underline">
                  View Record
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DoctorLayout>
  )
}

export default DoctorPatients