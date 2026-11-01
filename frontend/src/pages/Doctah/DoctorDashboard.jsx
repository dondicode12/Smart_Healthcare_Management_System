import { Link } from 'react-router-dom'
import { CalendarDays, Users, FilePen, ChevronRight } from 'lucide-react'
import DoctorLayout from '../../components/DoctorLayout'
import Avatar from '../../components/Avatar'
import StatTile from '../../components/StatTile'
import StatusChip from '../../components/StatusChip'
import { getGreeting } from '../../lib/greeting'

// Fake data. Later this comes from the backend.
const schedule = [
  { id: 1, time: '9:00 AM', patient: 'Juan Dela Cruz', reason: 'Chest pain follow-up', status: 'Confirmed' },
  { id: 2, time: '10:30 AM', patient: 'Ana Reyes', reason: 'Blood pressure check', status: 'Pending' },
]

function DoctorDashboard() {
  return (
    <DoctorLayout>
      <h2 className="text-3xl font-bold tracking-tight">
        {getGreeting()}, Dr. Hipolito
      </h2>
      <p className="mb-8 mt-1 text-gray-500">
        You have 5 appointments today and 2 prescriptions waiting.
      </p>

      <div className="stagger mb-8 grid gap-4 md:grid-cols-3">
        <StatTile label="Appointments Today" value="5" icon={CalendarDays} tone="blue" />
        <StatTile
          to="/doctor/patients"
          label="Total Patients"
          value="48"
          icon={Users}
          tone="green"
        />
        <StatTile
          to="/doctor/prescriptions/new"
          label="Pending Prescriptions"
          value="2"
          icon={FilePen}
          tone="yellow"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card overflow-x-auto p-6 lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-blue-900">Today's Schedule</h3>
          <table className="w-full text-left">
            <thead className="text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="py-2 font-semibold">Time</th>
                <th className="py-2 font-semibold">Patient</th>
                <th className="py-2 font-semibold">Reason</th>
                <th className="py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-3">{item.time}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={item.patient} />
                      {item.patient}
                    </div>
                  </td>
                  <td className="py-3">{item.reason}</td>
                  <td className="py-3">
                    <StatusChip status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card p-6">
          <h3 className="mb-4 text-lg font-semibold text-blue-900">Needs your attention</h3>

          <Link
            to="/doctor/prescriptions/new"
            className="mb-3 flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
          >
            <div className="rounded-full bg-yellow-50 p-2 text-yellow-700">
              <FilePen size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">2 prescriptions to write</p>
              <p className="text-xs text-gray-500">After today's visits</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </Link>

          <Link
            to="/doctor/patients"
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
          >
            <div className="rounded-full bg-blue-50 p-2 text-blue-900">
              <Users size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Review patient records</p>
              <p className="text-xs text-gray-500">Check triage notes</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </Link>
        </div>
      </div>
    </DoctorLayout>
  )
}

export default DoctorDashboard
