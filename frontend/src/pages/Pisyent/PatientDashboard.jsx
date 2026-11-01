import { Link } from 'react-router-dom'
import { CalendarDays, Pill, Receipt, ChevronRight } from 'lucide-react'
import Layout from '../../components/Layout'
import StatTile from '../../components/StatTile'
import { getGreeting } from '../../lib/greeting'

function PatientDashboard() {
  return (
    <Layout>
      <h2 className="text-3xl font-bold tracking-tight">{getGreeting()}, Juan</h2>
      <p className="mb-8 mt-1 text-gray-500">
        You have 2 upcoming appointments and 1 unpaid bill.
      </p>

      <div className="stagger mb-8 grid gap-4 md:grid-cols-3">
        <StatTile
          to="/patient/appointments"
          label="Upcoming Appointments"
          value="2"
          icon={CalendarDays}
          tone="blue"
        />
        <StatTile
          to="/patient/prescriptions"
          label="Active Prescriptions"
          value="3"
          icon={Pill}
          tone="green"
        />
        <StatTile
          to="/patient/bills"
          label="Unpaid Bills"
          value="1"
          icon={Receipt}
          tone="red"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-blue-900">Upcoming Appointments</h3>
            <Link to="/patient/appointments" className="text-sm text-blue-700 hover:underline">
              View all
            </Link>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 py-4">
            <div>
              <p className="font-medium">Dr. Maria Santos</p>
              <p className="text-sm text-gray-500">Cardiology</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Oct 25, 2026</p>
              <p className="text-sm text-gray-500">9:00 AM</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 py-4">
            <div>
              <p className="font-medium">Dr. Jose Reyes</p>
              <p className="text-sm text-gray-500">Dermatology</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Oct 28, 2026</p>
              <p className="text-sm text-gray-500">2:30 PM</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="mb-4 text-lg font-semibold text-blue-900">Needs your attention</h3>

          <Link
            to="/patient/bills"
            className="mb-3 flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
          >
            <div className="rounded-full bg-red-50 p-2 text-red-600">
              <Receipt size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">1 unpaid bill</p>
              <p className="text-xs text-gray-500">Cardiology consultation</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </Link>

          <Link
            to="/patient/prescriptions"
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50"
          >
            <div className="rounded-full bg-green-50 p-2 text-green-700">
              <Pill size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Amoxicillin ends soon</p>
              <p className="text-xs text-gray-500">Check your prescriptions</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default PatientDashboard
