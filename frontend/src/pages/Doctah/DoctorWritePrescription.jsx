  
import { useState } from 'react'
import DoctorLayout from '../../components/DoctorLayout'

function DoctorWritePrescription() {
  const [patient, setPatient] = useState('')
  const [medicine, setMedicine] = useState('')
  const [dosage, setDosage] = useState('')
  const [duration, setDuration] = useState('')
  const [instructions, setInstructions] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setMessageType('')

    if (
      !patient ||
      !medicine.trim() ||
      !dosage.trim() ||
      !duration ||
      !instructions.trim()
    ) {
      setMessage('Please complete all fields.')
      setMessageType('error')
      return
    }

    if (!Number.isInteger(Number(duration)) || Number(duration) <= 0) {
      setMessage('Duration must be a positive whole number.')
      setMessageType('error')
      return
    }

    setMessage(
      'Prescription details validated successfully! Saving will be available once the backend is connected.'
    )
    setMessageType('success')
  }

  function handleClear() {
    setPatient('')
    setMedicine('')
    setDosage('')
    setDuration('')
    setInstructions('')
    setMessage('')
    setMessageType('')
  }

  return (
    <DoctorLayout>
      <h2 className="mb-6 text-2xl font-bold">Write Prescription</h2>

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
            Patient
          </label>
          <select
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            required
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          >
            <option value="">Select a patient</option>
            <option value="Juan Dela Cruz">Juan Dela Cruz</option>
            <option value="Ana Reyes">Ana Reyes</option>
          </select>

          <label className="block text-sm font-medium text-gray-700">
            Medicine
          </label>
          <input
            type="text"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            placeholder="e.g. Amoxicillin 500mg"
            required
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dosage
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="1 capsule"
                required
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (days)
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="7"
                required
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700">
            Instructions
          </label>
          <textarea
            rows="3"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter the doctor's instructions"
            required
            className="mb-6 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
            >
              Save Prescription
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </DoctorLayout>
  )
}

export default DoctorWritePrescription
