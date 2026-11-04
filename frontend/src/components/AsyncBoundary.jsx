import ErrorState from './ErrorState'
import { TableSkeleton } from './Skeleton'

// Shows a loading skeleton, then an error with "Try again", then the real content.
// IMPORTANT: guard the children, for example {data && (...)}, because JSX children
// are built before this component decides what to show.
function AsyncBoundary({ loading, error, onRetry, skeleton, children }) {
  if (loading) return skeleton ?? <TableSkeleton rows={4} />
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  return children
}

export default AsyncBoundary
