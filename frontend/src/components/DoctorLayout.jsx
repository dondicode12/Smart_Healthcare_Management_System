import { Link } from 'react-router-dom'

function DoctorLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-60 bg-blue-900 p-4 text-white">
        <h2 className="text-xl font-bold">BLASTCARE</h2>
        <Link to="/doctor/dashboard" className="mt-4 block">Dashboard</Link>
        <Link to="/doctor/patients" className="mt-2 block">My Patients</Link>
        <Link to="/doctor/prescriptions/new" className="mt-2 block">Write Prescription</Link>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between border-b bg-white p-4">
          <span>Doctor Portal</span>
          <Link to="/" className="text-blue-700">Logout</Link>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export default DoctorLayout