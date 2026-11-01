import { Plus } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import Avatar from '../../components/Avatar'
import PageHeader from '../../components/PageHeader'
import RowActions from '../../components/RowActions'
import StatusChip from '../../components/StatusChip'
import TableCard from '../../components/TableCard'

// Fake data. Later this comes from the backend.
const appointments = [
  { id: 1, patient: 'Don Marco Del Campo', doctor: 'Dr. Maria Santos', date: 'Oct 15, 2026', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, patient: 'Sean Kyle Quintos', doctor: 'Dr. Jose Reyes', date: 'Oct 16, 2026', time: '2:00 PM', status: 'Pending' },
]

function AdminAppointments() {
  return (
    <AdminLayout>
      <PageHeader title="Manage Appointments" subtitle="Every booking across all doctors">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          <Plus size={18} /> Add Appointment
        </button>
      </PageHeader>

      <TableCard
        headers={['Patient', 'Doctor', 'Date', 'Time', 'Status', 'Actions']}
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
              <RowActions />
            </td>
          </tr>
        ))}
      </TableCard>
    </AdminLayout>
  )
}

export default AdminAppointments
