import { Link } from 'react-router-dom'
import { CalendarDays, Pill, Receipt, ChevronRight } from 'lucide-react'
import AsyncBoundary from '../../components/AsyncBoundary'
import Layout from '../../components/Layout'
import StatTile from '../../components/StatTile'
import { TableSkeleton, TileSkeleton } from '../../components/Skeleton'
import useApi from '../../lib/useApi'
import { getStoredUser } from '../../lib/auth'
import { firstWord, formatDate, formatTime, withDr } from '../../lib/format'
import { getGreeting } from '../../lib/greeting'

function plural(count, word) {
  return `${count} ${word}${count === 1 ? '' : 's'}`
}

function PatientDashboard() {
  const { data, loading, error, retry } = useApi('/dashboard/patient')
  const name = getStoredUser()?.name

  return (
    <Layout>
      <h2 className="text-3xl font-bold tracking-tight">{getGreeting()}, {firstWord(name)}</h2>
      <p className="mb-8 mt-1 text-gray-500">
        {data
          ? `You have ${plural(data.upcoming_count, 'upcoming appointment')} and ${plural(data.unpaid_bills, 'unpaid bill')}.`
          : 'Loading your summary...'}
      </p>

      <AsyncBoundary
        loading={loading}
        error={error}
        onRetry={retry}
        skeleton={
          <div className="space-y-4">
            <TileSkeleton count={3} />
            <TableSkeleton rows={2} />
          </div>
        }
      >
        {data && (
          <>
            <div className="stagger mb-8 grid gap-4 md:grid-cols-3">
              <StatTile
                to="/patient/appointments"
                label="Upcoming Appointments"
                value={data.upcoming_count}
                icon={CalendarDays}
                tone="blue"
              />
              <StatTile
                to="/patient/prescriptions"
                label="Active Medicines"
                value={data.active_medicines}
                icon={Pill}
                tone="green"
              />
              <StatTile
                to="/patient/bills"
                label="Unpaid Bills"
                value={data.unpaid_bills}
                icon={Receipt}
                tone="red"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="card p-6 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-blue-900">Upcoming Appointments</h3>
                  <Link to="/patient/appointments" className="text-sm text-blue-700 hover:underline">
                    View all
                  </Link>
                </div>

                {data.upcoming.length === 0 && (
                  <p className="border-t border-gray-100 py-6 text-center text-sm text-gray-500">
                    No upcoming appointments.{' '}
                    <Link to="/patient/book" className="text-blue-700 hover:underline">
                      Book one
                    </Link>
                  </p>
                )}

                {data.upcoming.map((item) => (
                  <div
                    key={item.appointment_id}
                    className="flex items-center justify-between border-t border-gray-100 py-4"
                  >
                    <div>
                      <p className="font-medium">{withDr(item.doctor)}</p>
                      <p className="text-sm text-gray-500">{item.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatDate(item.appointment_date)}</p>
                      <p className="text-sm text-gray-500">{formatTime(item.start_time)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card p-6">
                <h3 className="mb-4 text-lg font-semibold text-blue-900">Needs your attention</h3>

                {data.unpaid_bills > 0 && (
                  <Link
                    to="/patient/bills"
                    className="mb-3 flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
                  >
                    <div className="rounded-full bg-red-50 p-2 text-red-600">
                      <Receipt size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{plural(data.unpaid_bills, 'unpaid bill')}</p>
                      <p className="text-xs text-gray-500">{data.unpaid_description || 'Open your bills'}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                )}

                {data.ending_soon && (
                  <Link
                    to="/patient/prescriptions"
                    className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
                  >
                    <div className="rounded-full bg-green-50 p-2 text-green-700">
                      <Pill size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{data.ending_soon} ends soon</p>
                      <p className="text-xs text-gray-500">Check your prescriptions</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                )}

                {data.unpaid_bills === 0 && !data.ending_soon && (
                  <p className="text-sm text-gray-500">You're all caught up.</p>
                )}
              </div>
            </div>
          </>
        )}
      </AsyncBoundary>
    </Layout>
  )
}

export default PatientDashboard
