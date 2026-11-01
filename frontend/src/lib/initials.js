// "Juan Dela Cruz" -> "JC", "Dr. Dion Angelo Hipolito" -> "DH"
export function getInitials(name) {
  const words = name.replace(/^Dr\.\s*/, '').split(' ').filter(Boolean)
  if (words.length === 0) return '?'
  const first = words[0][0]
  const last = words.length > 1 ? words[words.length - 1][0] : ''
  return (first + last).toUpperCase()
}
