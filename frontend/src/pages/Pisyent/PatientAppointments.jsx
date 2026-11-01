
import { useState } from 'react'
import Layout from '../../components/Layout'
import { Link } from 'react-router-dom'

function PatientAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: 'Oct 25, 2026',
      time: '9:00 AM',
      doctor: 'Dr. Maria Santos',
      specialty: 'Cardiology',
      status: 'Confirmed',
    },
    {
      id: 2,
      date: 'Oct 28, 2026',
      time: '2:30 PM',
      doctor: 'Dr. Jose Reyes',
      specialty: 'Dermatology',
      status: 'Pending',
    },
    {
      id: 3,
      date: 'Oct 10, 2026',
      time: '11:00 AM',
      doctor: 'Dr. Ana Cruz',
      specialty: 'General Medicine',
      status: 'Completed',
    },
  ])

  const handleCancel = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this appointment?'
    )

    if (!confirmed) return

    setAppointments((previousAppointments) =>
      previousAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: 'Cancelled' }
          : appointment
      )
    )
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-700'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'Completed':
        return 'bg-gray-200 text-gray-700'
      case 'Cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Appointments</h2>
        <Link
          to="/patient/book"
          className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
        >
          Book Appointment
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Doctor</th>
              <th className="p-4">Specialty</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-t">
                <td className="p-4">{appointment.date}</td>
                <td className="p-4">{appointment.time}</td>
                <td className="p-4">{appointment.doctor}</td>
                <td className="p-4">{appointment.specialty}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${getStatusStyle(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td className="p-4">
                  {appointment.status !== 'Completed' &&
                  appointment.status !== 'Cancelled' ? (
                    <button
                      type="button"
                      onClick={() => handleCancel(appointment.id)}
                      className="text-red-600 hover:underline"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default PatientAppointments
