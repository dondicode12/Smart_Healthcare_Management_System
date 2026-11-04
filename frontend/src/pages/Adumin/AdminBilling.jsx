import { useState } from 'react'
import { Plus, Receipt } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import Avatar from '../../components/Avatar'
import PageHeader from '../../components/PageHeader'
import RowActions from '../../components/RowActions'
import StatusChip from '../../components/StatusChip'
import EmptyState from '../../components/EmptyState'
import TableCard from '../../components/TableCard'
import ConfirmDialog from '../../components/ConfirmDialog'

// Fake data. Later this comes from the backend.
const initialInvoices = [
  { id: 'INV-001', patient: 'Don Marco Del Campo', amount: '₱1,500.00', status: 'Paid' },
  { id: 'INV-002', patient: 'Sean Kyle Quintos', amount: '₱2,000.00', status: 'Pending' },
]

function AdminBilling() {
  const [invoices, setInvoices] = useState(initialInvoices)
  // The row the admin clicked Delete on (null = no popup)
  const [toDelete, setToDelete] = useState(null)

  function confirmDelete() {
    // TODO (backend): await api.delete(`/invoices/${toDelete.id}`) before updating the list
    setInvoices((previous) => previous.filter((entry) => entry.id !== toDelete.id))
    setToDelete(null)
  }

  return (
    <AdminLayout>
      <PageHeader title="Billing and Invoices" subtitle="Charges and payment status">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          <Plus size={18} /> Add Invoice
        </button>
      </PageHeader>

      <TableCard headers={['Invoice #', 'Patient', 'Amount', 'Status', 'Actions']}
        empty={
          invoices.length === 0 && (
            <EmptyState
              icon={Receipt}
              title="No invoices yet"
              message="Invoices will appear here once appointments are billed."
            />
          )
        }>
        {invoices.map((invoice) => (
          <tr key={invoice.id} className="border-t">
            <td className="p-4 font-medium">{invoice.id}</td>
            <td className="p-4">
              <div className="flex items-center gap-3">
                <Avatar name={invoice.patient} />
                {invoice.patient}
              </div>
            </td>
            <td className="p-4">{invoice.amount}</td>
            <td className="p-4">
              <StatusChip status={invoice.status} />
            </td>
            <td className="p-4">
              <RowActions onDelete={() => setToDelete(invoice)} />
            </td>
          </tr>
        ))}
      </TableCard>

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this invoice?"
        message={toDelete ? toDelete.id : ''}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </AdminLayout>
  )
}

export default AdminBilling
