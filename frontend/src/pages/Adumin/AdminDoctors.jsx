import { useState } from 'react'
import { Plus, Stethoscope } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import Avatar from '../../components/Avatar'
import PageHeader from '../../components/PageHeader'
import RowActions from '../../components/RowActions'
import EmptyState from '../../components/EmptyState'
import TableCard from '../../components/TableCard'
import ConfirmDialog from '../../components/ConfirmDialog'

// Fake data. Later this comes from the backend.
const initialDoctors = [
  { id: 1, name: 'Dr. Maria Santos', specialty: 'Cardiology', email: 'maria@blastcare.com', availability: 'Mon-Fri' },
  { id: 2, name: 'Dr. Jose Reyes', specialty: 'Dermatology', email: 'jose@blastcare.com', availability: 'Tue, Thu, Sat' },
]

function AdminDoctors() {
  const [doctors, setDoctors] = useState(initialDoctors)
  // The row the admin clicked Delete on (null = no popup)
  const [toDelete, setToDelete] = useState(null)

  function confirmDelete() {
    // TODO (backend): await api.delete(`/doctors/${toDelete.id}`) before updating the list
    setDoctors((previous) => previous.filter((entry) => entry.id !== toDelete.id))
    setToDelete(null)
  }

  return (
    <AdminLayout>
      <PageHeader title="Manage Doctors" subtitle="Doctors and their availability">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          <Plus size={18} /> Add Doctor
        </button>
      </PageHeader>

      <TableCard headers={['Name', 'Specialty', 'Email', 'Availability', 'Actions']}
        empty={
          doctors.length === 0 && (
            <EmptyState
              icon={Stethoscope}
              title="No doctors yet"
              message="Add a doctor to start scheduling appointments."
            />
          )
        }>
        {doctors.map((doctor) => (
          <tr key={doctor.id} className="border-t">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <Avatar name={doctor.name} />
                <span className="font-medium">{doctor.name}</span>
              </div>
            </td>
            <td className="p-4">{doctor.specialty}</td>
            <td className="p-4">{doctor.email}</td>
            <td className="p-4">{doctor.availability}</td>
            <td className="p-4">
              <RowActions onDelete={() => setToDelete(doctor)} />
            </td>
          </tr>
        ))}
      </TableCard>

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this doctor?"
        message={toDelete ? toDelete.name : ''}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </AdminLayout>
  )
}

export default AdminDoctors
