import { Link } from 'react-router-dom'
import DoctorLayout from '../../components/DoctorLayout'

function DoctorPatientRecord() {
  return (
    <DoctorLayout>
      <Link to="/doctor/patients" className="text-blue-700 hover:underline">
        ← Back to patients
      </Link>

      <h2 className="mb-6 mt-2 text-2xl font-bold">Patient Record: Juan Dela Cruz</h2>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h3 className="mb-3 text-lg font-semibold text-blue-900">Details</h3>
        <div className="grid gap-2 md:grid-cols-2">
          <p><span className="text-gray-500">Age:</span> 34</p>
          <p><span className="text-gray-500">Phone:</span> 0917 123 4567</p>
          <p><span className="text-gray-500">Email:</span> juan@email.com</p>
          <p><span className="text-gray-500">Date of Birth:</span> Mar 14, 1992</p>
        </div>
      </div>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h3 className="mb-3 text-lg font-semibold text-blue-900">Visit History</h3>
        <div className="border-t py-3">
          <p className="font-medium">Oct 10, 2026: General check-up</p>
          <p className="text-sm text-gray-500">Triage note: Mild cough and fever for 3 days.</p>
        </div>
        <div className="border-t py-3">
          <p className="font-medium">Sep 5, 2026: Follow-up</p>
          <p className="text-sm text-gray-500">Triage note: Blood pressure review.</p>
        </div>
      </div>

      <Link
        to="/doctor/prescriptions/new"
        className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
      >
        Write Prescription
      </Link>
    </DoctorLayout>
  )
}

export default DoctorPatientRecord