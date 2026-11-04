import { Link } from 'react-router-dom'
import { CalendarPlus, Pill } from 'lucide-react'
import AsyncBoundary from '../../components/AsyncBoundary'
import EmptyState from '../../components/EmptyState'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import StatusChip from '../../components/StatusChip'
import { TileSkeleton } from '../../components/Skeleton'
import useApi from '../../lib/useApi'
import { formatDate, todayISO, withDr } from '../../lib/format'

function PatientPrescriptions() {
  const { data, loading, error, retry } = useApi('/prescriptions')
  const prescriptions = data ?? []
  const today = todayISO()

  return (
    <Layout>
      <PageHeader
        title="My Prescriptions"
        subtitle="Medicines prescribed by your doctors"
      />

      <AsyncBoundary
        loading={loading}
        error={error}
        onRetry={retry}
        skeleton={<TileSkeleton count={2} />}
      >
        {prescriptions.length === 0 ? (
          <EmptyState
            icon={Pill}
            title="No prescriptions yet"
            message="When a doctor prescribes medicine, it will show up here."
            action={
              <Link
                to="/patient/book"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
              >
                <CalendarPlus size={16} /> Book an appointment
              </Link>
            }
          />
        ) : (
          <div className="stagger grid gap-4 md:grid-cols-2">
            {prescriptions.map((prescription) => {
              // A prescription is active while any of its medicines has not run out yet
              const active = prescription.items.some((item) => item.ends_on >= today)

              return (
                <div
                  key={prescription.prescription_id}
                  className="card p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-50 p-2.5 text-blue-900">
                        <Pill size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">
                          Prescription #{prescription.prescription_id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(prescription.issued_date)}
                        </p>
                      </div>
                    </div>
                    <StatusChip status={active ? 'active' : 'completed'} />
                  </div>

                  <ul className="mt-4 space-y-3">
                    {prescription.items.map((item, index) => (
                      <li key={index} className="border-t border-gray-100 pt-3">
                        <p className="font-medium">{item.medicine}</p>
                        <p className="text-sm text-gray-600">
                          {item.dosage}, {item.frequency} for {item.duration_days} days
                        </p>
                        {item.instructions && (
                          <p className="text-sm text-gray-500">{item.instructions}</p>
                        )}
                      </li>
                    ))}
                  </ul>

                  {prescription.notes && (
                    <p className="mt-3 text-sm text-gray-600">Notes: {prescription.notes}</p>
                  )}
                  <p className="mt-4 text-sm text-gray-500">
                    Prescribed by {withDr(prescription.doctor)}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </AsyncBoundary>
    </Layout>
  )
}

export default PatientPrescriptions
