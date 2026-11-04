import { useState } from 'react'
import { CalendarDays, Plus } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import Avatar from '../../components/Avatar'
import PageHeader from '../../components/PageHeader'
import RowActions from '../../components/RowActions'
import StatusChip from '../../components/StatusChip'
import EmptyState from '../../components/EmptyState'
import TableCard from '../../components/TableCard'
import ConfirmDialog from '../../components/ConfirmDialog'

// Fake data. Later this comes from the backend.
const initialAppointments = [
  { id: 1, patient: 'Don Marco Del Campo', doctor: 'Dr. Maria Santos', date: 'Oct 15, 2026', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, patient: 'Sean Kyle Quintos', doctor: 'Dr. Jose Reyes', date: 'Oct 16, 2026', time: '2:00 PM', status: 'Pending' },
]

function AdminAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments)
  // The row the admin clicked Delete on (null = no popup)
  const [toDelete, setToDelete] = useState(null)

  function confirmDelete() {
    // TODO (backend): await api.delete(`/appointments/${toDelete.id}`) before updating the list
    setAppointments((previous) => previous.filter((entry) => entry.id !== toDelete.id))
    setToDelete(null)
  }

  return (
    <AdminLayout>
      <PageHeader title="Manage Appointments" subtitle="Every booking across all doctors">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          <Plus size={18} /> Add Appointment
        </button>
      </PageHeader>

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
          <tr key={item.id} className="border-t">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <Avatar name={item.patient} />
                <span className="font-medium">{item.patient}</span>
              </div>
            </td>
            <td className="p-4">{item.doctor}</td>
            <td className="p-4">{item.date}</td>
            <td className="p-4">{item.time}</td>
            <td className="p-4">
              <StatusChip status={item.status} />
            </td>
            <td className="p-4">
              <RowActions onDelete={() => setToDelete(item)} />
            </td>
          </tr>
        ))}
      </TableCard>

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this appointment?"
        message={toDelete ? `${toDelete.patient} with ${toDelete.doctor}` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </AdminLayout>
  )
}

export default AdminAppointments
