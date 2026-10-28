import { Link, NavLink } from 'react-router-dom'

// Style for sidebar links. isActive is true when you're on that page.
const linkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-white/15 text-white' : 'text-blue-100 hover:bg-white/10'
  }`

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="sticky top-0 h-screen w-64 shrink-0 bg-blue-900 p-5 text-white">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">BLASTCARE</h2>

        <nav className="space-y-1">
          <NavLink to="/patient/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/patient/appointments" className={linkClass}>My Appointments</NavLink>
          <NavLink to="/patient/book" className={linkClass}>Book Appointment</NavLink>
          <NavLink to="/patient/prescriptions" className={linkClass}>My Prescriptions</NavLink>
          <NavLink to="/patient/bills" className={linkClass}>My Bills</NavLink>
          <NavLink to="/profile" className={linkClass}>Profile</NavLink>
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <span className="font-semibold text-gray-700">Patient Portal</span>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-sm font-semibold text-white">
              JD
            </div>
            <Link to="/" className="text-sm text-blue-700 hover:underline">
              Logout
            </Link>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}

export default Layout