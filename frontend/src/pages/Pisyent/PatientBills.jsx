import { CircleCheck, Receipt, Wallet } from 'lucide-react'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import StatTile from '../../components/StatTile'
import StatusChip from '../../components/StatusChip'
import EmptyState from '../../components/EmptyState'
import TableCard from '../../components/TableCard'

// Fake data. Later this comes from the backend.
const bills = [
  {
    id: 'INV-0003',
    date: 'Oct 25, 2026',
    description: 'Cardiology consultation',
    amount: '₱2,500.00',
    status: 'Unpaid',
  },
  {
    id: 'INV-0002',
    date: 'Oct 10, 2026',
    description: 'General check-up',
    amount: '₱1,200.00',
    status: 'Paid',
  },
  {
    id: 'INV-0001',
    date: 'Sep 20, 2026',
    description: 'Dermatology consultation',
    amount: '₱1,800.00',
    status: 'Paid',
  },
]

function PatientBills() {
  return (
    <Layout>
      <PageHeader title="My Bills" subtitle="Invoices for your consultations" />

      <div className="stagger mb-6 grid gap-4 md:grid-cols-2">
        <StatTile label="Total Unpaid" value="₱2,500.00" icon={Wallet} tone="red" />
        <StatTile label="Paid This Year" value="₱8,200.00" icon={CircleCheck} tone="green" />
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
          <tr key={bill.id} className="border-t">
            <td className="p-4 font-medium">{bill.id}</td>
            <td className="p-4">{bill.date}</td>
            <td className="p-4">{bill.description}</td>
            <td className="p-4">{bill.amount}</td>
            <td className="p-4">
              <StatusChip status={bill.status} />
            </td>
            <td className="p-4">
              {bill.status === 'Unpaid' ? (
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
    </Layout>
  )
}

export default PatientBills
