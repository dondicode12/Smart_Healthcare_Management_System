import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import DoctorLayout from '../../components/DoctorLayout'
import Avatar from '../../components/Avatar'
import PageHeader from '../../components/PageHeader'
import TableCard from '../../components/TableCard'

// Fake data. Later this comes from the backend.
const patients = [
  { id: 1, name: 'Juan Dela Cruz', age: 34, phone: '0917 123 4567', lastVisit: 'Oct 10, 2026' },
  { id: 2, name: 'Ana Reyes', age: 52, phone: '0918 765 4321', lastVisit: 'Sep 28, 2026' },
]

function DoctorPatients() {
  return (
    <DoctorLayout>
      <PageHeader title="My Patients" subtitle="Patients you have treated">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-400">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search patients..."
            className="w-48 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>
      </PageHeader>

      <TableCard headers={['Name', 'Age', 'Phone', 'Last Visit', 'Action']}>
        {patients.map((patient) => (
          <tr key={patient.id} className="border-t">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <Avatar name={patient.name} />
                <span className="font-medium">{patient.name}</span>
              </div>
            </td>
            <td className="p-4">{patient.age}</td>
            <td className="p-4">{patient.phone}</td>
            <td className="p-4">{patient.lastVisit}</td>
            <td className="p-4">
              <Link
                to="/doctor/patients/record"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                View Record
              </Link>
            </td>
          </tr>
        ))}
      </TableCard>
    </DoctorLayout>
  )
}

export default DoctorPatients
