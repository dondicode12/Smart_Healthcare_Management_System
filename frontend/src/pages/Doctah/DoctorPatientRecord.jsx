import { Link } from 'react-router-dom'
import { ArrowLeft, FilePen } from 'lucide-react'
import DoctorLayout from '../../components/DoctorLayout'
import Avatar from '../../components/Avatar'

// Fake data. Later this comes from the backend.
const visits = [
  { id: 1, date: 'Oct 10, 2026', title: 'General check-up', note: 'Mild cough and fever for 3 days.' },
  { id: 2, date: 'Sep 5, 2026', title: 'Follow-up', note: 'Blood pressure review.' },
]

function DoctorPatientRecord() {
  return (
    <DoctorLayout>
      <Link
        to="/doctor/patients"
        className="inline-flex items-center gap-1 text-sm text-blue-700 hover:underline"
      >
        <ArrowLeft size={16} /> Back to patients
      </Link>

      <div className="mb-6 mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar name="Juan Dela Cruz" className="h-14 w-14 text-lg" />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Juan Dela Cruz</h2>
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
              <dd className="font-medium">34</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Phone</dt>
              <dd className="font-medium">0917 123 4567</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Email</dt>
              <dd className="font-medium">juan@email.com</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Date of Birth</dt>
              <dd className="font-medium">Mar 14, 1992</dd>
            </div>
          </dl>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-blue-900">Visit History</h3>
          <ol className="space-y-5 border-l-2 border-gray-200 pl-6">
            {visits.map((visit) => (
              <li key={visit.id} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-blue-900 ring-4 ring-blue-50"></span>
                <p className="font-medium">
                  {visit.title}
                  <span className="ml-2 text-sm font-normal text-gray-500">{visit.date}</span>
                </p>
                <p className="text-sm text-gray-500">Triage note: {visit.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </DoctorLayout>
  )
}

export default DoctorPatientRecord
