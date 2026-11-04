import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, SearchX, Users } from 'lucide-react'
import AsyncBoundary from '../../components/AsyncBoundary'
import Avatar from '../../components/Avatar'
import DoctorLayout from '../../components/DoctorLayout'
import EmptyState from '../../components/EmptyState'
import PageHeader from '../../components/PageHeader'
import TableCard from '../../components/TableCard'
import useApi from '../../lib/useApi'
import { formatDate } from '../../lib/format'

function DoctorPatients() {
  const { data, loading, error, retry } = useApi('/patients')
  const patients = data ?? []
  const [query, setQuery] = useState('')

  // Keep only the patients whose name contains what was typed
  const results = patients.filter((patient) =>
    patient.name.toLowerCase().includes(query.trim().toLowerCase())
  )

  const noResults =
    patients.length === 0 ? (
      <EmptyState
        icon={Users}
        title="No patients yet"
        message="Patients who book an appointment with you will show up here."
      />
    ) : (
      <EmptyState
        icon={SearchX}
        title={`No patients match "${query}"`}
        message="Check the spelling, or try just the first or last name."
        action={
          <button
            onClick={() => setQuery('')}
            className="rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
          >
            Clear search
          </button>
        }
      />
    )

  return (
    <DoctorLayout>
      <PageHeader title="My Patients" subtitle="Patients you have treated">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-400">
          <Search size={16} />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search patients..."
            className="w-48 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>
      </PageHeader>

      <AsyncBoundary loading={loading} error={error} onRetry={retry}>
        <TableCard
          headers={['Name', 'Age', 'Phone', 'Last Visit', 'Action']}
          empty={results.length === 0 && noResults}
        >
          {results.map((patient) => (
            <tr key={patient.patient_id} className="border-t">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={patient.name} />
                  <span className="font-medium">{patient.name}</span>
                </div>
              </td>
              <td className="p-4">{patient.age}</td>
              <td className="p-4">{patient.phone || '-'}</td>
              <td className="p-4">{formatDate(patient.last_visit)}</td>
              <td className="p-4">
                <Link
                  to={`/doctor/patients/${patient.patient_id}`}
                  className="text-sm font-medium text-blue-700 hover:underline"
                >
                  View Record
                </Link>
              </td>
            </tr>
          ))}
        </TableCard>
      </AsyncBoundary>
    </DoctorLayout>
  )
}

export default DoctorPatients
