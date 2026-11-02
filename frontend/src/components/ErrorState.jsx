import { RefreshCw, TriangleAlert } from 'lucide-react'

// Shown when data could not be loaded. Says what happened and offers a retry.
function ErrorState({
  title = "We couldn't load this page",
  message = 'Something went wrong on our side. Your information is safe.',
  onRetry,
  code,
}) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center" role="alert">
      <div className="mb-4 rounded-full bg-red-50 p-4 text-red-600">
        <TriangleAlert size={28} />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white hover:bg-blue-800"
        >
          <RefreshCw size={16} /> Try again
        </button>
      )}
      {code && <p className="mt-4 text-xs text-gray-400">Error code: {code}</p>}
    </div>
  )
}

export default ErrorState
