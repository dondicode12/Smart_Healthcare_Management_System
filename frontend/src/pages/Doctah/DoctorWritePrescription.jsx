import DoctorLayout from '../../components/DoctorLayout'

function DoctorWritePrescription() {
  return (
    <DoctorLayout>
      <h2 className="mb-6 text-2xl font-bold">Write Prescription</h2>

      <div className="max-w-xl rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <form>
          <label className="block text-sm font-medium text-gray-700">Patient</label>
          <select className="mb-4 mt-1 w-full rounded border border-gray-300 p-2">
            <option value="">Select a patient</option>
            <option>Juan Dela Cruz</option>
            <option>Ana Reyes</option>
          </select>

          <label className="block text-sm font-medium text-gray-700">Medicine</label>
          <input
            type="text"
            placeholder="e.g. Amoxicillin 500mg"
            className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"
          />

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Dosage</label>
              <input
                type="text"
                placeholder="1 capsule"
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
              <input
                type="number"
                placeholder="7"
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          <textarea
            rows="3"
            placeholder="e.g. Take after meals, 3 times a day"
            className="mb-6 mt-1 w-full rounded border border-gray-300 p-2"
          ></textarea>

          <button
            type="submit"
            className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
          >
            Save Prescription
          </button>
        </form>
      </div>
    </DoctorLayout>
  )
}

export default DoctorWritePrescription