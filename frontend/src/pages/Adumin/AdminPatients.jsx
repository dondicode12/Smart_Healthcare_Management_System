import { HeartPulse, Plus } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import Avatar from '../../components/Avatar'
import PageHeader from '../../components/PageHeader'
import RowActions from '../../components/RowActions'
import EmptyState from '../../components/EmptyState'
import TableCard from '../../components/TableCard'

// Fake data. Later this comes from the backend.
const patients = [
  { id: 1, name: 'Sean Kyle Quintos', age: 30, phone: '123-456-7890', email: 'sean@blastcare.com' },
  { id: 2, name: 'Don Marco Del Campo', age: 25, phone: '098-765-4321', email: 'don@blastcare.com' },
]

function AdminPatients() {
  return (
    <AdminLayout>
      <PageHeader title="Manage Patients" subtitle="All registered patients">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          <Plus size={18} /> Add Patient
        </button>
      </PageHeader>

      <TableCard headers={['Name', 'Age', 'Phone', 'Email', 'Actions']}
        empty={
          patients.length === 0 && (
            <EmptyState
              icon={HeartPulse}
              title="No patients yet"
              message="Registered patients will show up here."
            />
          )
        }>
        {patients.map((patient) => (
          <tr key={patient.id} className="border-t">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <Avatar name={patient.name} />
                <span className="font-medium">{patient.name}</span>
              </div>
            </td>
            <td className="p-4">{patient.age}</td>
            <td className="p-4">{patient.phone}</td>
            <td className="p-4">{patient.email}</td>
            <td className="p-4">
              <RowActions />
            </td>
          </tr>
        ))}
      </TableCard>
    </AdminLayout>
  )
}

export default AdminPatients
