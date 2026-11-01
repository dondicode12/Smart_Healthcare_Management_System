import { BarChart3, CalendarDays, TrendingUp, Users } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import PageHeader from '../../components/PageHeader'

// The list of available reports. Later each one opens real data.
const reports = [
  {
    id: 1,
    title: 'Monthly Revenue',
    description: 'Income from paid invoices, per month.',
    icon: TrendingUp,
  },
  {
    id: 2,
    title: 'Appointments per Doctor',
    description: 'How many visits each doctor handled.',
    icon: CalendarDays,
  },
  {
    id: 3,
    title: 'Patient Growth',
    description: 'New patient registrations over time.',
    icon: Users,
  },
]

function AdminReports() {
  return (
    <AdminLayout>
      <PageHeader title="Reports" subtitle="Summaries built from your database" />

      <div className="stagger grid gap-4 md:grid-cols-3">
        {reports.map((report) => {
          const Icon = report.icon
          return (
            <div
              key={report.id}
              className="card p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-full bg-blue-50 p-3 text-blue-900">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-blue-900">{report.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{report.description}</p>
              <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline">
                <BarChart3 size={16} /> View Report
              </button>
            </div>
          )
        })}
      </div>
    </AdminLayout>
  )
}

export default AdminReports
