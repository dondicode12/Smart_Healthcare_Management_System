// [chip colors, dot color, label] for each status.
// Keys are the exact lowercase values stored in the database.
const styles = {
  scheduled: ['bg-yellow-100 text-yellow-700', 'bg-yellow-600', 'Scheduled'],
  completed: ['bg-gray-200 text-gray-700', 'bg-gray-500', 'Completed'],
  cancelled: ['bg-red-100 text-red-700', 'bg-red-600', 'Cancelled'],
  no_show: ['bg-red-100 text-red-700', 'bg-red-600', 'No show'],
  paid: ['bg-green-100 text-green-700', 'bg-green-600', 'Paid'],
  unpaid: ['bg-red-100 text-red-700', 'bg-red-600', 'Unpaid'],
  active: ['bg-green-100 text-green-700', 'bg-green-600', 'Active'],
  inactive: ['bg-gray-200 text-gray-700', 'bg-gray-500', 'Inactive'],
  confirmed: ['bg-green-100 text-green-700', 'bg-green-600', 'Confirmed'],
  pending: ['bg-yellow-100 text-yellow-700', 'bg-yellow-600', 'Pending'],
}

// Colored pill with a dot, e.g. <StatusChip status="scheduled" />
function StatusChip({ status }) {
  const key = String(status ?? '').toLowerCase()
  const [chip, dot, label] = styles[key] ?? [
    'bg-gray-200 text-gray-700',
    'bg-gray-500',
    status,
  ]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm ${chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`}></span>
      {label}
    </span>
  )
}

export default StatusChip
