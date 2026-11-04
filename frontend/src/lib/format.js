// Small helpers that turn database values into friendly text.

// "2026-10-25" -> "Oct 25, 2026" (no timezone surprises: we build the date from its parts)
export function formatDate(iso) {
  if (!iso) return '-'
  const [y, m, d] = String(iso).slice(0, 10).split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// "09:00" or "09:00:00" -> "9:00 AM"
export function formatTime(time) {
  if (!time) return '-'
  const [h, m] = String(time).split(':').map(Number)
  return new Date(2000, 0, 1, h, m).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

// 1500 -> "₱1,500.00"  (Postgres sends NUMERIC columns as text, so we convert)
export function formatPeso(value) {
  return (
    '₱' +
    Number(value || 0).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  )
}

// 3 -> "INV-0003"
export function invoiceNumber(id) {
  return `INV-${String(id).padStart(4, '0')}`
}

// Today's date as "YYYY-MM-DD" in the browser's own timezone
export function todayISO() {
  return new Date().toLocaleDateString('en-CA')
}

// "Maria Santos" -> "Dr. Maria Santos" (does not double the prefix)
export function withDr(name) {
  if (!name) return ''
  return name.startsWith('Dr.') ? name : `Dr. ${name}`
}

export function firstWord(name) {
  return String(name || '').trim().split(' ')[0]
}

export function lastWord(name) {
  const words = String(name || '').trim().split(' ')
  return words[words.length - 1]
}
