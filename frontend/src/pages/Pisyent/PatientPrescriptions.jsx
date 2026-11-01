import { Pill } from 'lucide-react'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import StatusChip from '../../components/StatusChip'

// Fake data. Later this comes from the backend.
const prescriptions = [
  {
    id: 1,
    medicine: 'Amoxicillin 500mg',
    directions: '1 capsule, 3 times a day for 7 days',
    doctor: 'Dr. Ana Cruz',
    date: 'Oct 10, 2026',
    status: 'Active',
  },
  {
    id: 2,
    medicine: 'Losartan 50mg',
    directions: '1 tablet every morning',
    doctor: 'Dr. Maria Santos',
    date: 'Oct 5, 2026',
    status: 'Active',
  },
  {
    id: 3,
    medicine: 'Cetirizine 10mg',
    directions: '1 tablet at night for 5 days',
    doctor: 'Dr. Jose Reyes',
    date: 'Sep 20, 2026',
    status: 'Completed',
  },
]

function PatientPrescriptions() {
  return (
    <Layout>
      <PageHeader
        title="My Prescriptions"
        subtitle="Medicines prescribed by your doctors"
      />

      <div className="stagger grid gap-4 md:grid-cols-2">
        {prescriptions.map((item) => (
          <div
            key={item.id}
            className="card p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-50 p-2.5 text-blue-900">
                  <Pill size={20} />
                </div>
                <h3 className="text-lg font-semibold text-blue-900">{item.medicine}</h3>
              </div>
              <StatusChip status={item.status} />
            </div>
            <p className="mt-3 text-gray-600">{item.directions}</p>
            <p className="mt-4 text-sm text-gray-500">Prescribed by {item.doctor}</p>
            <p className="text-sm text-gray-500">Date: {item.date}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default PatientPrescriptions
