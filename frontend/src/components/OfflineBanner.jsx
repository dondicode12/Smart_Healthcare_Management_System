import { useEffect, useState } from 'react'
import { WifiOff } from 'lucide-react'

// A bar that appears at the top while the internet connection is down.
function OfflineBanner() {
  const [online, setOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  if (online) return null

  return (
    <div
      role="alert"
      className="flex items-center justify-center gap-2 bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700"
    >
      <WifiOff size={16} />
      You're offline. Changes can't be saved until you reconnect.
    </div>
  )
}

export default OfflineBanner
