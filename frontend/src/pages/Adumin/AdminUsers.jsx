import { useState } from 'react'
import { Plus, Users } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import Avatar from '../../components/Avatar'
import PageHeader from '../../components/PageHeader'
import RowActions from '../../components/RowActions'
import StatusChip from '../../components/StatusChip'
import EmptyState from '../../components/EmptyState'
import TableCard from '../../components/TableCard'
import ConfirmDialog from '../../components/ConfirmDialog'

// Fake data. Later this comes from the backend.
const initialUsers = [
  { id: 1, name: 'Juan Dela Cruz', email: 'juan@email.com', role: 'Patient', status: 'Active' },
  { id: 2, name: 'Dr. Maria Santos', email: 'maria@blastcare.com', role: 'Doctor', status: 'Active' },
  { id: 3, name: 'Rico Dizon', email: 'rico@blastcare.com', role: 'Admin', status: 'Inactive' },
]

function AdminUsers() {
  const [users, setUsers] = useState(initialUsers)
  // The row the admin clicked Delete on (null = no popup)
  const [toDelete, setToDelete] = useState(null)

  function confirmDelete() {
    // TODO (backend): await api.delete(`/users/${toDelete.id}`) before updating the list
    setUsers((previous) => previous.filter((entry) => entry.id !== toDelete.id))
    setToDelete(null)
  }

  return (
    <AdminLayout>
      <PageHeader title="Manage Users" subtitle="Everyone who can sign in">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          <Plus size={18} /> Add User
        </button>
      </PageHeader>

      <TableCard headers={['Name', 'Email', 'Role', 'Status', 'Actions']}
        empty={
          users.length === 0 && (
            <EmptyState
              icon={Users}
              title="No users yet"
              message="People who can sign in to BLASTCARE will be listed here."
            />
          )
        }>
        {users.map((user) => (
          <tr key={user.id} className="border-t">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <Avatar name={user.name} />
                <span className="font-medium">{user.name}</span>
              </div>
            </td>
            <td className="p-4">{user.email}</td>
            <td className="p-4">{user.role}</td>
            <td className="p-4">
              <StatusChip status={user.status} />
            </td>
            <td className="p-4">
              <RowActions onDelete={() => setToDelete(user)} />
            </td>
          </tr>
        ))}
      </TableCard>

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this user?"
        message={toDelete ? toDelete.name : ''}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </AdminLayout>
  )
}

export default AdminUsers
