import { CircleCheck, Receipt, Wallet } from 'lucide-react'
import AsyncBoundary from '../../components/AsyncBoundary'
import EmptyState from '../../components/EmptyState'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import StatTile from '../../components/StatTile'
import StatusChip from '../../components/StatusChip'
import TableCard from '../../components/TableCard'
import useApi from '../../lib/useApi'
import { formatDate, formatPeso, invoiceNumber } from '../../lib/format'

function PatientBills() {
  const { data, loading, error, retry } = useApi('/invoices')
  const bills = data ?? []

  // Totals are worked out from the real invoices
  const thisYear = String(new Date().getFullYear())
  const totalUnpaid = bills
    .filter((bill) => bill.status === 'unpaid')
    .reduce((sum, bill) => sum + (Number(bill.total_amount) - Number(bill.amount_paid)), 0)
  const paidThisYear = bills
    .filter((bill) => bill.issue_date.startsWith(thisYear))
    .reduce((sum, bill) => sum + Number(bill.amount_paid), 0)

  return (
    <Layout>
      <PageHeader title="My Bills" subtitle="Invoices for your consultations" />

      <AsyncBoundary loading={loading} error={error} onRetry={retry}>
        <div className="stagger mb-6 grid gap-4 md:grid-cols-2">
          <StatTile label="Total Unpaid" value={formatPeso(totalUnpaid)} icon={Wallet} tone="red" />
          <StatTile label="Paid This Year" value={formatPeso(paidThisYear)} icon={CircleCheck} tone="green" />
        </div>

        <TableCard
          headers={['Invoice #', 'Date', 'Description', 'Amount', 'Status', 'Action']}
          empty={
            bills.length === 0 && (
              <EmptyState
                icon={Receipt}
                title="No bills yet"
                message="Invoices for your visits will show up here."
              />
            )
          }
        >
          {bills.map((bill) => (
            <tr key={bill.invoice_id} className="border-t">
              <td className="p-4 font-medium">{invoiceNumber(bill.invoice_id)}</td>
              <td className="p-4">{formatDate(bill.issue_date)}</td>
              <td className="p-4">{bill.description}</td>
              <td className="p-4">{formatPeso(bill.total_amount)}</td>
              <td className="p-4">
                <StatusChip status={bill.status} />
              </td>
              <td className="p-4">
                {bill.status === 'unpaid' ? (
                  <button className="rounded-lg bg-blue-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-800">
                    Pay Now
                  </button>
                ) : (
                  <button className="text-sm text-blue-700 hover:underline">
                    View Receipt
                  </button>
                )}
              </td>
            </tr>
          ))}
        </TableCard>
      </AsyncBoundary>
    </Layout>
  )
}

export default PatientBills
