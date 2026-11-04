import { Link } from 'react-router-dom'
import {
  HeartPulse,
  Stethoscope,
  CalendarDays,
  Wallet,
  Receipt,
  Users,
  ChevronRight,
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import AreaChart from '../../components/AreaChart'
import AsyncBoundary from '../../components/AsyncBoundary'
import Avatar from '../../components/Avatar'
import StatTile from '../../components/StatTile'
import StatusChip from '../../components/StatusChip'
import { TableSkeleton, TileSkeleton } from '../../components/Skeleton'
import useApi from '../../lib/useApi'
import { formatDate, formatPeso, withDr } from '../../lib/format'
import { getGreeting } from '../../lib/greeting'

function AdminDashboard() {
  const { data, loading, error, retry } = useApi('/dashboard/admin')

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold tracking-tight">{getGreeting()}, Admin</h2>
      <p className="mb-8 mt-1 text-gray-500">
        {data
          ? `${data.appointments_today} appointments today across ${data.total_doctors} doctors.`
          : 'Loading today\'s summary...'}
      </p>

      <AsyncBoundary
        loading={loading}
        error={error}
        onRetry={retry}
        skeleton={
          <div className="space-y-4">
            <TileSkeleton count={4} />
            <TableSkeleton rows={3} />
          </div>
        }
      >
        {data && (
          <>
            <div className="stagger mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatTile to="/admin/patients" label="Total Patients" value={data.total_patients} icon={HeartPulse} tone="blue" />
              <StatTile to="/admin/doctors" label="Total Doctors" value={data.total_doctors} icon={Stethoscope} tone="green" />
              <StatTile to="/admin/appointments" label="Appointments Today" value={data.appointments_today} icon={CalendarDays} tone="yellow" />
              <StatTile to="/admin/billing" label="Revenue This Month" value={formatPeso(data.revenue_this_month)} icon={Wallet} tone="emerald" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="card p-6 lg:col-span-2">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-blue-900">Revenue overview</h3>
                  <span className="text-sm text-gray-500">Last 6 months</span>
                </div>
                <AreaChart data={data.revenue} />
              </div>

              <div className="card p-6">
                <h3 className="mb-4 text-lg font-semibold text-blue-900">Needs your attention</h3>

                <Link
                  to="/admin/appointments"
                  className="mb-3 flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
                >
                  <div className="rounded-full bg-yellow-50 p-2 text-yellow-700">
                    <CalendarDays size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{data.scheduled_appointments} scheduled appointments</p>
                    <p className="text-xs text-gray-500">Upcoming across all doctors</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>

                <Link
                  to="/admin/billing"
                  className="mb-3 flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
                >
                  <div className="rounded-full bg-red-50 p-2 text-red-600">
                    <Receipt size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{data.unpaid_invoices} unpaid invoices</p>
                    <p className="text-xs text-gray-500">Follow up with patients</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>

                <Link
                  to="/admin/users"
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
                >
                  <div className="rounded-full bg-blue-50 p-2 text-blue-900">
                    <Users size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{data.inactive_users} inactive users</p>
                    <p className="text-xs text-gray-500">Review accounts</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              </div>
            </div>

            <div className="card mt-6 overflow-x-auto p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-blue-900">Recent Appointments</h3>
                <Link to="/admin/appointments" className="text-sm text-blue-700 hover:underline">
                  View all
                </Link>
              </div>
              <table className="w-full text-left">
                <thead className="text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="py-2 font-semibold">Patient</th>
                    <th className="py-2 font-semibold">Doctor</th>
                    <th className="py-2 font-semibold">Date</th>
                    <th className="py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent.map((item) => (
                    <tr key={item.appointment_id} className="border-t">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={item.patient} />
                          {item.patient}
                        </div>
                      </td>
                      <td className="py-3">{withDr(item.doctor)}</td>
                      <td className="py-3">{formatDate(item.appointment_date)}</td>
                      <td className="py-3">
                        <StatusChip status={item.status} />
                      </td>
                    </tr>
                  ))}
                  {data.recent.length === 0 && (
                    <tr className="border-t">
                      <td colSpan={4} className="py-6 text-center text-sm text-gray-500">
                        No appointments yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </AsyncBoundary>
    </AdminLayout>
  )
}

export default AdminDashboard
