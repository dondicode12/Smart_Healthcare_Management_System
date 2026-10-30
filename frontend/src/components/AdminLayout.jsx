import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  HeartPulse,
  CalendarDays,
  Receipt,
  BarChart3,
} from 'lucide-react'

const linkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-white/15 text-white' : 'text-blue-100 hover:bg-white/10'
  }`

function AdminLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Dark overlay behind the menu on phones. Tap it to close. */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar: slides in on phones, always visible on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 overflow-y-auto bg-blue-900 p-5 text-white transition-transform md:sticky md:top-0 md:bottom-auto md:h-screen md:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="mb-8 text-2xl font-bold tracking-tight">BLASTCARE</h2>

        <nav className="space-y-1" onClick={() => setMenuOpen(false)}>
          <NavLink to="/admin/dashboard" className={linkClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin/users" className={linkClass}>
            <Users size={18} /> Manage Users
          </NavLink>
          <NavLink to="/admin/doctors" className={linkClass}>
            <Stethoscope size={18} /> Manage Doctors
          </NavLink>
          <NavLink to="/admin/patients" className={linkClass}>
            <HeartPulse size={18} /> Manage Patients
          </NavLink>
          <NavLink to="/admin/appointments" className={linkClass}>
            <CalendarDays size={18} /> Manage Appointments
          </NavLink>
          <NavLink to="/admin/billing" className={linkClass}>
            <Receipt size={18} /> Billing
          </NavLink>
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b bg-white px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Hamburger button: only shows on phones */}
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded p-2 text-xl text-gray-700 hover:bg-gray-100 md:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>
            <span className="font-semibold text-gray-700">Admin Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-sm font-semibold text-white">
              AD
            </div>
            <Link to="/" className="text-sm text-blue-700 hover:underline">
              Logout
            </Link>
          </div>
        </header>

        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout