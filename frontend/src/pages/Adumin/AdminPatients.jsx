import { useState } from 'react'
import { HeartPulse, Plus } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import AsyncBoundary from '../../components/AsyncBoundary'
import Avatar from '../../components/Avatar'
import ConfirmDialog from '../../components/ConfirmDialog'
import EmptyState from '../../components/EmptyState'
import PageHeader from '../../components/PageHeader'
import RowActions from '../../components/RowActions'
import TableCard from '../../components/TableCard'
import useApi from '../../lib/useApi'

function AdminPatients() {
  const { data, loading, error, retry, setData } = useApi('/patients')
  const patients = data ?? []
  // The row the admin clicked Delete on (null = no popup)
  const [toDelete, setToDelete] = useState(null)

  function confirmDelete() {
    // TODO (backend): call the real deactivate route first, then update the list
    setData((previous) => previous.filter((p) => p.patient_id !== toDelete.patient_id))
    setToDelete(null)
  }

  return (
    <AdminLayout>
      <PageHeader title="Manage Patients" subtitle="All registered patients">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          <Plus size={18} /> Add Patient
        </button>
      </PageHeader>

      <AsyncBoundary loading={loading} error={error} onRetry={retry}>
        <TableCard
          headers={['Name', 'Age', 'Phone', 'Email', 'Actions']}
          empty={
            patients.length === 0 && (
              <EmptyState
                icon={HeartPulse}
                title="No patients yet"
                message="Registered patients will show up here."
              />
            )
          }
        >
          {patients.map((patient) => (
            <tr key={patient.patient_id} className="border-t">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={patient.name} />
                  <span className="font-medium">{patient.name}</span>
                </div>
              </td>
              <td className="p-4">{patient.age}</td>
              <td className="p-4">{patient.phone || '-'}</td>
              <td className="p-4">{patient.email}</td>
              <td className="p-4">
                <RowActions onDelete={() => setToDelete(patient)} />
              </td>
            </tr>
          ))}
        </TableCard>
      </AsyncBoundary>

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this patient?"
        message={toDelete ? toDelete.name : ''}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </AdminLayout>
  )
}

export default AdminPatients
