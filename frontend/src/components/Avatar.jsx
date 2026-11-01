import { getInitials } from '../lib/initials'

// Round badge with a person's initials, e.g. "Juan Dela Cruz" -> "JC"
function Avatar({ name, className = 'h-8 w-8 text-xs' }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-brand ${className}`}
    >
      {getInitials(name)}
    </div>
  )
}

export default Avatar
