// Friendly message for a list with nothing in it yet.
// icon: a lucide icon, action: optional button or link
function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 rounded-full bg-blue-50 p-4 text-blue-900">
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {message && <p className="mt-1 max-w-sm text-sm text-gray-500">{message}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export default EmptyState
