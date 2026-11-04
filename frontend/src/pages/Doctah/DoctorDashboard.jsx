import { Link } from 'react-router-dom'
import { CalendarDays, Users, FilePen, ChevronRight } from 'lucide-react'
import AsyncBoundary from '../../components/AsyncBoundary'
import Avatar from '../../components/Avatar'
import DoctorLayout from '../../components/DoctorLayout'
import StatTile from '../../components/StatTile'
import StatusChip from '../../components/StatusChip'
import { TableSkeleton, TileSkeleton } from '../../components/Skeleton'
import useApi from '../../lib/useApi'
import { getStoredUser } from '../../lib/auth'
import { formatTime, lastWord } from '../../lib/format'
import { getGreeting } from '../../lib/greeting'

function DoctorDashboard() {
  const { data, loading, error, retry } = useApi('/dashboard/doctor')
  const name = getStoredUser()?.name

  return (
    <DoctorLayout>
      <h2 className="text-3xl font-bold tracking-tight">
        {getGreeting()}, Dr. {lastWord(name)}
      </h2>
      <p className="mb-8 mt-1 text-gray-500">
        {data
          ? `You have ${data.appointments_today} appointments today and ${data.pending_prescriptions} prescriptions waiting.`
          : 'Loading today\'s summary...'}
      </p>

      <AsyncBoundary
        loading={loading}
        error={error}
        onRetry={retry}
        skeleton={
          <div className="space-y-4">
            <TileSkeleton count={3} />
            <TableSkeleton rows={3} />
          </div>
        }
      >
        {data && (
          <>
            <div className="stagger mb-8 grid gap-4 md:grid-cols-3">
              <StatTile
                to="/doctor/patients"
                label="Appointments Today"
                value={data.appointments_today}
                icon={CalendarDays}
                tone="blue"
              />
              <StatTile
                to="/doctor/patients"
                label="Total Patients"
                value={data.total_patients}
                icon={Users}
                tone="green"
              />
              <StatTile
                to="/doctor/prescriptions/new"
                label="Pending Prescriptions"
                value={data.pending_prescriptions}
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
                    {data.schedule.map((item) => (
                      <tr key={item.appointment_id} className="border-t">
                        <td className="py-3">{formatTime(item.start_time)}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <Avatar name={item.patient} />
                            {item.patient}
                          </div>
                        </td>
                        <td className="py-3">{item.reason || '-'}</td>
                        <td className="py-3">
                          <StatusChip status={item.status} />
                        </td>
                      </tr>
                    ))}
                    {data.schedule.length === 0 && (
                      <tr className="border-t">
                        <td colSpan={4} className="py-6 text-center text-sm text-gray-500">
                          No appointments today.
                        </td>
                      </tr>
                    )}
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
                    <p className="text-sm font-medium">{data.pending_prescriptions} prescriptions to write</p>
                    <p className="text-xs text-gray-500">Completed visits with no prescription</p>
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
                    <p className="text-xs text-gray-500">Check visit notes</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              </div>
            </div>
          </>
        )}
      </AsyncBoundary>
    </DoctorLayout>
  )
}

export default DoctorDashboard
