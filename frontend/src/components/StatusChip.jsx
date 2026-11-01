// [chip colors, dot color] for each status word
const styles = {
  Confirmed: ['bg-green-100 text-green-700', 'bg-green-600'],
  Paid: ['bg-green-100 text-green-700', 'bg-green-600'],
  Active: ['bg-green-100 text-green-700', 'bg-green-600'],
  Pending: ['bg-yellow-100 text-yellow-700', 'bg-yellow-600'],
  Unpaid: ['bg-red-100 text-red-700', 'bg-red-600'],
  Cancelled: ['bg-red-100 text-red-700', 'bg-red-600'],
  Completed: ['bg-gray-200 text-gray-700', 'bg-gray-500'],
  Inactive: ['bg-gray-200 text-gray-700', 'bg-gray-500'],
}

// Colored pill with a dot, e.g. <StatusChip status="Confirmed" />
function StatusChip({ status }) {
  const [chip, dot] = styles[status] ?? styles.Completed

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm ${chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`}></span>
      {status}
    </span>
  )
}

export default StatusChip
