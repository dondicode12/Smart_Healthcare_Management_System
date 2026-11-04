import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, FilePen } from 'lucide-react'
import AsyncBoundary from '../../components/AsyncBoundary'
import Avatar from '../../components/Avatar'
import DoctorLayout from '../../components/DoctorLayout'
import { Skeleton } from '../../components/Skeleton'
import useApi from '../../lib/useApi'
import { formatDate } from '../../lib/format'

function DoctorPatientRecord() {
  // The patient's id comes from the address: /doctor/patients/:id
  const { id } = useParams()
  const { data, loading, error, retry } = useApi(`/patients/${id}`)

  return (
    <DoctorLayout>
      <Link
        to="/doctor/patients"
        className="inline-flex items-center gap-1 text-sm text-blue-700 hover:underline"
      >
        <ArrowLeft size={16} /> Back to patients
      </Link>

      <div className="mt-4">
        <AsyncBoundary
          loading={loading}
          error={error}
          onRetry={retry}
          skeleton={<Skeleton className="h-64 w-full" />}
        >
          {data && (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar name={data.patient.name} className="h-14 w-14 text-lg" />
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">{data.patient.name}</h2>
                    <p className="text-sm text-gray-500">Patient record</p>
                  </div>
                </div>

                <Link
                  to="/doctor/prescriptions/new"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
                >
                  <FilePen size={18} /> Write Prescription
                </Link>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-blue-900">Details</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Age</dt>
                      <dd className="font-medium">{data.patient.age}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Phone</dt>
                      <dd className="font-medium">{data.patient.phone || '-'}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Email</dt>
                      <dd className="font-medium">{data.patient.email}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Date of Birth</dt>
                      <dd className="font-medium">{formatDate(data.patient.date_of_birth)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Blood type</dt>
                      <dd className="font-medium">{data.patient.blood_type || '-'}</dd>
                    </div>
                  </dl>
                </div>

                <div className="card p-6 lg:col-span-2">
                  <h3 className="mb-4 text-lg font-semibold text-blue-900">Visit History</h3>
                  {data.visits.length === 0 ? (
                    <p className="text-sm text-gray-500">No completed visits yet.</p>
                  ) : (
                    <ol className="space-y-5 border-l-2 border-gray-200 pl-6">
                      {data.visits.map((visit) => (
                        <li key={visit.appointment_id} className="relative">
                          <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-blue-900 ring-4 ring-blue-50"></span>
                          <p className="font-medium">
                            {visit.diagnosis || visit.reason || 'Visit'}
                            <span className="ml-2 text-sm font-normal text-gray-500">
                              {formatDate(visit.date)}
                            </span>
                          </p>
                          {visit.reason && (
                            <p className="text-sm text-gray-500">Reason: {visit.reason}</p>
                          )}
                          {visit.notes && (
                            <p className="text-sm text-gray-500">Notes: {visit.notes}</p>
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            </>
          )}
        </AsyncBoundary>
      </div>
    </DoctorLayout>
  )
}

export default DoctorPatientRecord
