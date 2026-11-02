import { Check } from 'lucide-react'

// Confirms something worked, then shows what happens next.
// details: [{ label: 'Doctor', value: 'Dr. Maria Santos' }, ...]
// children: the buttons or links for the next step
function SuccessState({ title, message, details = [], children }) {
  return (
    <div className="card mx-auto max-w-md px-6 py-10 text-center" role="status">
      <div className="pop-in mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
        <Check size={32} />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}

      {details.length > 0 && (
        <dl className="mt-6 space-y-2 border-t border-gray-100 pt-4 text-left text-sm">
          {details.map((item) => (
            <div key={item.label} className="flex justify-between gap-4">
              <dt className="text-gray-500">{item.label}</dt>
              <dd className="font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {children && <div className="mt-6 flex flex-col gap-2">{children}</div>}
    </div>
  )
}

export default SuccessState
