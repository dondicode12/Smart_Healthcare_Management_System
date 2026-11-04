import {
  LayoutDashboard,
  Users,
  Stethoscope,
  HeartPulse,
  CalendarDays,
  Receipt,
  BarChart3,
} from 'lucide-react'
import AppShell from './AppShell'
import { getLayoutUser } from '../lib/auth'

// Admin portal frame. Edit the links here.
const groups = [
  {
    label: 'Overview',
    items: [
      { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'People',
    items: [
      { to: '/admin/users', label: 'Manage Users', icon: Users },
      { to: '/admin/doctors', label: 'Manage Doctors', icon: Stethoscope },
      { to: '/admin/patients', label: 'Manage Patients', icon: HeartPulse },
    ],
  },
  {
    label: 'Operations',
    items: [
      { to: '/admin/appointments', label: 'Manage Appointments', icon: CalendarDays },
      { to: '/admin/billing', label: 'Billing', icon: Receipt },
      { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
    ],
  },
]

function AdminLayout({ children }) {
  return (
    <AppShell
      portal="Admin Portal"
      groups={groups}
      user={getLayoutUser()}
      searchPlaceholder="Search users, invoices..."
    >
      {children}
    </AppShell>
  )
}

export default AdminLayout
