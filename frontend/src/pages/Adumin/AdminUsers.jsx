import { useState } from 'react'
import { Plus, Users } from 'lucide-react'
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
import { roleLabel } from '../../lib/auth'

function AdminUsers() {
  const { data, loading, error, retry, setData } = useApi('/users')
  const users = data ?? []
  // The row the admin clicked Delete on (null = no popup)
  const [toDelete, setToDelete] = useState(null)

  function confirmDelete() {
    // TODO (backend): users should be DEACTIVATED (is_active = false), not deleted
    setData((previous) => previous.filter((u) => u.user_id !== toDelete.user_id))
    setToDelete(null)
  }

  return (
    <AdminLayout>
      <PageHeader title="Manage Users" subtitle="Everyone who can sign in">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          <Plus size={18} /> Add User
        </button>
      </PageHeader>

      <AsyncBoundary loading={loading} error={error} onRetry={retry}>
        <TableCard
          headers={['Name', 'Email', 'Role', 'Status', 'Actions']}
          empty={
            users.length === 0 && (
              <EmptyState
                icon={Users}
                title="No users yet"
                message="People who can sign in to BLASTCARE will be listed here."
              />
            )
          }
        >
          {users.map((user) => (
            <tr key={user.user_id} className="border-t">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={user.name} />
                  <span className="font-medium">{user.name}</span>
                </div>
              </td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{roleLabel(user.role)}</td>
              <td className="p-4">
                <StatusChip status={user.is_active ? 'active' : 'inactive'} />
              </td>
              <td className="p-4">
                <RowActions onDelete={() => setToDelete(user)} />
              </td>
            </tr>
          ))}
        </TableCard>
      </AsyncBoundary>

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
