import { useState } from 'react'
import Layout from '../../components/Layout'
import useApi from '../../lib/useApi'
import { withDr } from '../../lib/format'

function BookAppointment() {
  // Both dropdowns are filled from the database
  const { data: specialtyList } = useApi('/specialties')
  const { data: doctorList } = useApi('/doctors')
  const specialties = specialtyList ?? []
  const doctors = doctorList ?? []

  const [specialty, setSpecialty] = useState('')
  const [doctor, setDoctor] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  // Only show the doctors of the chosen specialty
  const doctorsInSpecialty = doctors.filter(
    (d) => String(d.specialty_id) === specialty
  )

  const today = new Date()
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')

  function handleSpecialtyChange(value) {
    setSpecialty(value)
    setDoctor('') // the old doctor may not belong to the new specialty
  }

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setMessageType('')

    if (!specialty || !doctor || !date || !time || !reason.trim()) {
      setMessage('Please complete all fields before booking.')
      setMessageType('error')
      return
    }

    if (date < minDate) {
      setMessage('Please select today or a future date.')
      setMessageType('error')
      return
    }

    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    if (date === minDate && time <= currentTime) {
      setMessage('Please select a future time.')
      setMessageType('error')
      return
    }

    // TODO (backend): POST /appointments with { doctor_id: doctor, appointment_date: date, start_time: time, reason }
    setMessage(
      'Appointment details validated successfully! Booking will be available once the backend is connected.'
    )
    setMessageType('success')
  }

  function handleCancel() {
    setSpecialty('')
    setDoctor('')
    setDate('')
    setTime('')
    setReason('')
    setMessage('')
    setMessageType('')
  }

  return (
    <Layout>
      <h2 className="mb-6 text-2xl font-bold">Book an Appointment</h2>

      <div className="max-w-xl rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <form onSubmit={handleSubmit}>
          {message && (
            <p
              role="alert"
              className={`mb-4 rounded-lg p-3 text-sm ${
                messageType === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message}
            </p>
          )}

          <label className="block text-sm font-medium text-gray-700">
            Specialty
          </label>
          <select
            value={specialty}
            onChange={(e) => handleSpecialtyChange(e.target.value)}
            required
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          >
            <option value="">Select a specialty</option>
            {specialties.map((s) => (
              <option key={s.specialty_id} value={s.specialty_id}>
                {s.name}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-gray-700">
            Doctor
          </label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
            disabled={!specialty}
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2 disabled:opacity-60"
          >
            <option value="">
              {specialty ? 'Select a doctor' : 'Choose a specialty first'}
            </option>
            {doctorsInSpecialty.map((d) => (
              <option key={d.doctor_id} value={d.doctor_id}>
                {withDr(d.name)}
              </option>
            ))}
          </select>

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700">
            Reason for visit
          </label>
          <textarea
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe your symptoms or reason for the visit"
            required
            className="mb-6 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
            >
              Confirm Booking
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default BookAppointment
