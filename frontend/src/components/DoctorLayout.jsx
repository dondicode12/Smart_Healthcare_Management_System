import { LayoutDashboard, Users, FilePen } from 'lucide-react'
import AppShell from './AppShell'
import { getLayoutUser } from '../lib/auth'

// Doctor portal frame. Edit the links here.
const groups = [
  {
    label: 'Workspace',
    items: [
      { to: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/doctor/patients', label: 'My Patients', icon: Users },
      { to: '/doctor/prescriptions/new', label: 'Write Prescription', icon: FilePen },
    ],
  },
]

function DoctorLayout({ children }) {
  return (
    <AppShell
      portal="Doctor Portal"
      groups={groups}
      user={getLayoutUser()}
      searchPlaceholder="Search patients..."
    >
      {children}
    </AppShell>
  )
}

export default DoctorLayout
