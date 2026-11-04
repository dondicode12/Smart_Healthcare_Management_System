import {
  LayoutDashboard,
  CalendarDays,
  CalendarPlus,
  Pill,
  Receipt,
  User,
} from 'lucide-react'
import AppShell from './AppShell'
import { getLayoutUser } from '../lib/auth'

// Patient portal frame. Edit the links here.
const groups = [
  {
    label: 'Care',
    items: [
      { to: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/patient/appointments', label: 'My Appointments', icon: CalendarDays },
      { to: '/patient/book', label: 'Book Appointment', icon: CalendarPlus },
      { to: '/patient/prescriptions', label: 'My Prescriptions', icon: Pill },
    ],
  },
  {
    label: 'Account',
    items: [
      { to: '/patient/bills', label: 'My Bills', icon: Receipt },
      { to: '/profile', label: 'Profile', icon: User },
    ],
  },
]

function Layout({ children }) {
  return (
    <AppShell
      portal="Patient Portal"
      groups={groups}
      user={getLayoutUser()}
      searchPlaceholder="Search doctors, records..."
    >
      {children}
    </AppShell>
  )
}

export default Layout
