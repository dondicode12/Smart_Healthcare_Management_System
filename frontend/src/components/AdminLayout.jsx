import { Link } from 'react-router-dom'

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-60 bg-blue-900 p-4 text-white">
        <h2 className="text-xl font-bold">BLASTCARE</h2>
        <Link to="/admin/dashboard" className="mt-4 block">Dashboard</Link>
        <Link to="/admin/users" className="mt-2 block">Manage Users</Link>
        <Link to="/admin/doctors" className="mt-2 block">Manage Doctors</Link>
        <Link to="/admin/patients" className="mt-2 block">Manage Patients</Link>
        <Link to="/admin/appointments" className="mt-2 block">Manage Appointments</Link>
        <Link to="/admin/billing" className="mt-2 block">Billing</Link>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between border-b bg-white p-4">
          <span>Admin Portal</span>
          <Link to="/" className="text-blue-700">Logout</Link>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout