import { useState } from 'react'
import { Plus, Receipt } from 'lucide-react'
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
import { formatDate, formatPeso, invoiceNumber } from '../../lib/format'

function AdminBilling() {
  const { data, loading, error, retry, setData } = useApi('/invoices')
  const invoices = data ?? []
  // The row the admin clicked Delete on (null = no popup)
  const [toDelete, setToDelete] = useState(null)

  function confirmDelete() {
    // TODO (backend): invoices should be cancelled (status = 'cancelled'), not deleted
    setData((previous) => previous.filter((i) => i.invoice_id !== toDelete.invoice_id))
    setToDelete(null)
  }

  return (
    <AdminLayout>
      <PageHeader title="Billing and Invoices" subtitle="Charges and payment status">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          <Plus size={18} /> Add Invoice
        </button>
      </PageHeader>

      <AsyncBoundary loading={loading} error={error} onRetry={retry}>
        <TableCard
          headers={['Invoice #', 'Patient', 'Date', 'Amount', 'Status', 'Actions']}
          empty={
            invoices.length === 0 && (
              <EmptyState
                icon={Receipt}
                title="No invoices yet"
                message="Invoices will appear here once appointments are billed."
              />
            )
          }
        >
          {invoices.map((invoice) => (
            <tr key={invoice.invoice_id} className="border-t">
              <td className="p-4 font-medium">{invoiceNumber(invoice.invoice_id)}</td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={invoice.patient} />
                  {invoice.patient}
                </div>
              </td>
              <td className="p-4">{formatDate(invoice.issue_date)}</td>
              <td className="p-4">{formatPeso(invoice.total_amount)}</td>
              <td className="p-4">
                <StatusChip status={invoice.status} />
              </td>
              <td className="p-4">
                <RowActions onDelete={() => setToDelete(invoice)} />
              </td>
            </tr>
          ))}
        </TableCard>
      </AsyncBoundary>

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this invoice?"
        message={toDelete ? invoiceNumber(toDelete.invoice_id) : ''}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </AdminLayout>
  )
}

export default AdminBilling
