// Full-page message for 404, access denied, expired session, etc.
// icon: a lucide icon, label: small text above the title, children: buttons
function StatePage({ icon: Icon, tone = 'blue', label, title, message, children }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-900',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-700',
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-page p-6">
      <div className="card page-enter w-full max-w-md px-8 py-12 text-center">
        <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${tones[tone]}`}>
          <Icon size={30} />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">{label}</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-gray-500">{message}</p>
        <div className="mt-8 flex flex-col gap-2">{children}</div>
      </div>
    </div>
  )
}

export default StatePage
