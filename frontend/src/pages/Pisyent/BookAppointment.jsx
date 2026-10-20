import Layout from '../../components/Layout'

function BookAppointment() {
  return (
    <Layout>
      <h2 className="mb-6 text-2xl font-bold">Book an Appointment</h2>

      <div className="max-w-xl rounded-lg bg-white p-8 shadow">
        <form>
          <label className="block text-sm font-medium text-gray-700">
            Specialty
          </label>
          <select className="mb-4 mt-1 w-full rounded border border-gray-300 p-2">
            <option value="">Select a specialty</option>
            <option>General Medicine</option>
            <option>Cardiology</option>
            <option>Dermatology</option>
            <option>Pediatrics</option>
          </select>

          <label className="block text-sm font-medium text-gray-700">
            Doctor
          </label>
          <select className="mb-4 mt-1 w-full rounded border border-gray-300 p-2">
            <option value="">Select a doctor</option>
            <option>Dr. Maria Santos</option>
            <option>Dr. Jose Reyes</option>
            <option>Dr. Ana Cruz</option>
          </select>

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700">
            Reason for visit
          </label>
          <textarea
            rows="4"
            placeholder="Describe your symptoms or reason for the visit"
            className="mb-6 mt-1 w-full rounded border border-gray-300 p-2"
          ></textarea>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
            >
              Confirm Booking
            </button>
            <button
              type="button"
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