import { useState } from 'react'
import { CalendarDays, Plus } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import AsyncBoundary from '../../components/AsyncBoundary'
import Avatar from '../../components/Avatar'
import ConfirmDialog from '../../components/ConfirmDialog'
import EmptyState from '../../components/EmptyState'
import PageHeader from '../../components/PageHeader'
import RowActions from '../../components/RowActions'
import StatusChip from '../../components/StatusChip'
import TableCard from '../../components/TableCard'
import useApi from '../../lib/useApi'
import { formatDate, formatTime, withDr } from '../../lib/format'

function AdminAppointments() {
  const { data, loading, error, retry, setData } = useApi('/appointments')
  const appointments = data ?? []
  // The row the admin clicked Delete on (null = no popup)
  const [toDelete, setToDelete] = useState(null)

  function confirmDelete() {
    // TODO (backend): call the real cancel/delete route first, then update the list
    setData((previous) => previous.filter((a) => a.appointment_id !== toDelete.appointment_id))
    setToDelete(null)
  }

  return (
    <AdminLayout>
      <PageHeader title="Manage Appointments" subtitle="Every booking across all doctors">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          <Plus size={18} /> Add Appointment
        </button>
      </PageHeader>

      <AsyncBoundary loading={loading} error={error} onRetry={retry}>
        <TableCard
          headers={['Patient', 'Doctor', 'Date', 'Time', 'Status', 'Actions']}
          empty={
            appointments.length === 0 && (
              <EmptyState
                icon={CalendarDays}
                title="No appointments yet"
                message="Bookings across all doctors will show up here."
              />
            )
          }
        >
          {appointments.map((item) => (
            <tr key={item.appointment_id} className="border-t">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={item.patient} />
                  <span className="font-medium">{item.patient}</span>
                </div>
              </td>
              <td className="p-4">{withDr(item.doctor)}</td>
              <td className="p-4">{formatDate(item.appointment_date)}</td>
              <td className="p-4">{formatTime(item.start_time)}</td>
              <td className="p-4">
                <StatusChip status={item.status} />
              </td>
              <td className="p-4">
                <RowActions onDelete={() => setToDelete(item)} />
              </td>
            </tr>
          ))}
        </TableCard>
      </AsyncBoundary>

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this appointment?"
        message={toDelete ? `${toDelete.patient} with ${withDr(toDelete.doctor)}` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </AdminLayout>
  )
}

export default AdminAppointments
