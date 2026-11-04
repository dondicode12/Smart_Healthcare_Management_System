import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import SuccessState from '../../components/SuccessState'
import api, { getErrorMessage } from '../../lib/api'
import useApi from '../../lib/useApi'
import { formatDate, formatTime, withDr } from '../../lib/format'
 
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
  const [submitting, setSubmitting] = useState(false)
  // Filled after a successful booking, so we can show the success screen
  const [booked, setBooked] = useState(null)
 
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
 
  function resetForm() {
    setSpecialty('')
    setDoctor('')
    setDate('')
    setTime('')
    setReason('')
    setMessage('')
    setBooked(null)
  }
 
  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
 
    if (!specialty || !doctor || !date || !time || !reason.trim()) {
      setMessage('Please complete all fields before booking.')
      return
    }
 
    if (date < minDate) {
      setMessage('Please select today or a future date.')
      return
    }
 
    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
 
    if (date === minDate && time <= currentTime) {
      setMessage('Please select a future time.')
      return
    }
 
    setSubmitting(true)
    try {
      // The server checks the doctor is free (a double booking returns an error)
      await api.post('/appointments', {
        doctor_id: Number(doctor),
        appointment_date: date,
        start_time: time,
        reason: reason.trim(),
      })
 
      const chosen = doctors.find((d) => String(d.doctor_id) === doctor)
      setBooked({ doctor: withDr(chosen?.name), date, time })
    } catch (error) {
      setMessage(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }
 
  // After booking, replace the form with a confirmation
  if (booked) {
    return (
      <Layout>
        <SuccessState
          title="Appointment requested"
          message="You can see it under My Appointments."
          details={[
            { label: 'Doctor', value: booked.doctor },
            { label: 'Date', value: formatDate(booked.date) },
            { label: 'Time', value: formatTime(booked.time) },
          ]}
        >
          <Link
            to="/patient/appointments"
            className="rounded-lg bg-blue-900 px-4 py-2.5 font-semibold text-white hover:bg-blue-800"
          >
            View my appointments
          </Link>
          <button
            onClick={resetForm}
            className="rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-100"
          >
            Book another
          </button>
        </SuccessState>
      </Layout>
    )
  }
 
  return (
    <Layout>
      <h2 className="mb-6 text-2xl font-bold">Book an Appointment</h2>
 
      <div className="max-w-xl rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <form onSubmit={handleSubmit}>
          {message && (
            <p
              role="alert"
              className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700"
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
              disabled={submitting}
              className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {submitting ? 'Booking...' : 'Confirm Booking'}
            </button>
 
            <button
              type="button"
              onClick={resetForm}
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