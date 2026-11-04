import { useState } from 'react'
import { Plus, Stethoscope } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import AsyncBoundary from '../../components/AsyncBoundary'
import Avatar from '../../components/Avatar'
import ConfirmDialog from '../../components/ConfirmDialog'
import EmptyState from '../../components/EmptyState'
import PageHeader from '../../components/PageHeader'
import RowActions from '../../components/RowActions'
import TableCard from '../../components/TableCard'
import useApi from '../../lib/useApi'
import { formatPeso } from '../../lib/format'

function AdminDoctors() {
  const { data, loading, error, retry, setData } = useApi('/doctors')
  const doctors = data ?? []
  // The row the admin clicked Delete on (null = no popup)
  const [toDelete, setToDelete] = useState(null)

  function confirmDelete() {
    // TODO (backend): call the real deactivate route first, then update the list
    setData((previous) => previous.filter((d) => d.doctor_id !== toDelete.doctor_id))
    setToDelete(null)
  }

  return (
    <AdminLayout>
      <PageHeader title="Manage Doctors" subtitle="Doctors and their specialties">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          <Plus size={18} /> Add Doctor
        </button>
      </PageHeader>

      <AsyncBoundary loading={loading} error={error} onRetry={retry}>
        <TableCard
          headers={['Name', 'Specialty', 'Email', 'Fee', 'Actions']}
          empty={
            doctors.length === 0 && (
              <EmptyState
                icon={Stethoscope}
                title="No doctors yet"
                message="Add a doctor to start scheduling appointments."
              />
            )
          }
        >
          {doctors.map((doctor) => (
            <tr key={doctor.doctor_id} className="border-t">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={doctor.name} />
                  <span className="font-medium">{doctor.name}</span>
                </div>
              </td>
              <td className="p-4">{doctor.specialty}</td>
              <td className="p-4">{doctor.email}</td>
              <td className="p-4">{formatPeso(doctor.consultation_fee)}</td>
              <td className="p-4">
                <RowActions onDelete={() => setToDelete(doctor)} />
              </td>
            </tr>
          ))}
        </TableCard>
      </AsyncBoundary>

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
