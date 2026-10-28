import Layout from '../../components/Layout'

function PatientPrescriptions() {
  return (
    <Layout>
      <h2 className="mb-6 text-2xl font-bold">My Prescriptions</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-blue-900">Amoxicillin 500mg</h3>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              Active
            </span>
          </div>
          <p className="mt-2 text-gray-600">1 capsule, 3 times a day for 7 days</p>
          <p className="mt-4 text-sm text-gray-500">Prescribed by Dr. Ana Cruz</p>
          <p className="text-sm text-gray-500">Date: Oct 10, 2026</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-blue-900">Losartan 50mg</h3>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              Active
            </span>
          </div>
          <p className="mt-2 text-gray-600">1 tablet every morning</p>
          <p className="mt-4 text-sm text-gray-500">Prescribed by Dr. Maria Santos</p>
          <p className="text-sm text-gray-500">Date: Oct 5, 2026</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-blue-900">Cetirizine 10mg</h3>
            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">
              Completed
            </span>
          </div>
          <p className="mt-2 text-gray-600">1 tablet at night for 5 days</p>
          <p className="mt-4 text-sm text-gray-500">Prescribed by Dr. Jose Reyes</p>
          <p className="text-sm text-gray-500">Date: Sep 20, 2026</p>
        </div>
      </div>
    </Layout>
  )
}

export default PatientPrescriptions