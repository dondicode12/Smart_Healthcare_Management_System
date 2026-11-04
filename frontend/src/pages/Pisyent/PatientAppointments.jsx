import { CalendarPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import AsyncBoundary from '../../components/AsyncBoundary'
import EmptyState from '../../components/EmptyState'
import Layout from '../../components/Layout'
import StatusChip from '../../components/StatusChip'
import TableCard from '../../components/TableCard'
import useApi from '../../lib/useApi'
import { formatDate, formatTime, withDr } from '../../lib/format'

function PatientAppointments() {
  const { data, loading, error, retry, setData } = useApi('/appointments')
  const appointments = data ?? []

  const handleCancel = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this appointment?'
    )

    if (!confirmed) return

    // TODO (backend): call the real cancel route first, then update the list
    setData((previous) =>
      previous.map((appointment) =>
        appointment.appointment_id === id
          ? { ...appointment, status: 'cancelled' }
          : appointment
      )
    )
  }

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Appointments</h2>
        <Link
          to="/patient/book"
          className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
        >
          Book Appointment
        </Link>
      </div>

      <AsyncBoundary loading={loading} error={error} onRetry={retry}>
        <TableCard
          headers={['Date', 'Time', 'Doctor', 'Specialty', 'Status', 'Action']}
          empty={
            appointments.length === 0 && (
              <EmptyState
                icon={CalendarPlus}
                title="No appointments yet"
                message="Book your first appointment with one of our doctors."
              />
            )
          }
        >
          {appointments.map((appointment) => (
            <tr key={appointment.appointment_id} className="border-t">
              <td className="p-4">{formatDate(appointment.appointment_date)}</td>
              <td className="p-4">{formatTime(appointment.start_time)}</td>
              <td className="p-4">{withDr(appointment.doctor)}</td>
              <td className="p-4">{appointment.specialty}</td>
              <td className="p-4">
                <StatusChip status={appointment.status} />
              </td>
              <td className="p-4">
                {appointment.status === 'scheduled' ? (
                  <button
                    type="button"
                    onClick={() => handleCancel(appointment.appointment_id)}
                    className="text-red-600 hover:underline"
                  >
                    Cancel
                  </button>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
            </tr>
          ))}
        </TableCard>
      </AsyncBoundary>
    </Layout>
  )
}

export default PatientAppointments
