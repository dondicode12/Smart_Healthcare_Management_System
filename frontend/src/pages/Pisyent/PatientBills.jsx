import Layout from '../../components/Layout'

function PatientBills() {
  return (
    <Layout>
      <h2 className="mb-6 text-2xl font-bold">My Bills</h2>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
          <p className="text-gray-500">Total Unpaid</p>
          <p className="text-3xl font-bold text-red-600">₱2,500.00</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
          <p className="text-gray-500">Paid This Year</p>
          <p className="text-3xl font-bold text-green-600">₱8,200.00</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Date</th>
              <th className="p-4">Description</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">INV-0003</td>
              <td className="p-4">Oct 25, 2026</td>
              <td className="p-4">Cardiology consultation</td>
              <td className="p-4">₱2,500.00</td>
              <td className="p-4">
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                  Unpaid
                </span>
              </td>
              <td className="p-4">
                <button className="rounded bg-blue-900 px-3 py-1 text-white hover:bg-blue-800">
                  Pay Now
                </button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">INV-0002</td>
              <td className="p-4">Oct 10, 2026</td>
              <td className="p-4">General check-up</td>
              <td className="p-4">₱1,200.00</td>
              <td className="p-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Paid
                </span>
              </td>
              <td className="p-4">
                <button className="text-blue-700 hover:underline">View Receipt</button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">INV-0001</td>
              <td className="p-4">Sep 20, 2026</td>
              <td className="p-4">Dermatology consultation</td>
              <td className="p-4">₱1,800.00</td>
              <td className="p-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Paid
                </span>
              </td>
              <td className="p-4">
                <button className="text-blue-700 hover:underline">View Receipt</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default PatientBills