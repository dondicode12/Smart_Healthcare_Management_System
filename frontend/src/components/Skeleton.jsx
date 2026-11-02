// Grey shimmering placeholders shown while data is loading.

export function Skeleton({ className = '' }) {
  return <div className={`skeleton rounded-lg ${className}`}></div>
}

// Placeholder for a row of number tiles
export function TileSkeleton({ count = 3 }) {
  return (
    <div
      className="grid gap-4 md:grid-cols-3"
      role="status"
      aria-label="Loading"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card p-6">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="mt-3 h-8 w-1/3" />
        </div>
      ))}
    </div>
  )
}

// Placeholder for a table
export function TableSkeleton({ rows = 4 }) {
  return (
    <div className="card overflow-hidden" role="status" aria-label="Loading">
      <div className="bg-gray-50 p-4">
        <Skeleton className="h-4 w-1/3" />
      </div>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 border-t border-gray-100 p-4">
          <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="ml-auto h-4 w-16" />
        </div>
      ))}
    </div>
  )
}
