import AdminLayout from '../../components/AdminLayout'

function AdminBillings() {
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Billing and Invoices</h2>
        <button className="rounded bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800">
          Add Invoice
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">INV-001</td>
              <td className="p-4">Don Marco Del Campo</td>
              <td className="p-4">$150.00</td>
              <td className="p-4">Paid</td>
              <td className="p-4">
                <button className="mr-3 text-blue-700 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-4">INV-002</td>
              <td className="p-4">Sean Kyle Quintos</td>
              <td className="p-4">$200.00</td>
              <td className="p-4">Pending</td>
              <td className="p-4">
                <button className="mr-3 text-blue-700 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default AdminBillings