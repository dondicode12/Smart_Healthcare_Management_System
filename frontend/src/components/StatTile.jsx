import { Link } from 'react-router-dom'

// [tile background, number color] for each tone
const tones = {
  blue: ['bg-blue-50', 'text-blue-900'],
  green: ['bg-green-50', 'text-green-700'],
  yellow: ['bg-yellow-50', 'text-yellow-700'],
  red: ['bg-red-50', 'text-red-600'],
  emerald: ['bg-emerald-50', 'text-emerald-700'],
}

// Soft colored number tile. Pass `to` to make the whole tile a link.
function StatTile({ label, value, icon: Icon, tone = 'blue', to }) {
  const [bg, text] = tones[tone]
  const classes = `flex items-center justify-between rounded-2xl p-6 ${bg} ${
    to ? 'transition duration-200 hover:-translate-y-0.5 hover:shadow-md' : ''
  }`

  const content = (
    <>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className={`text-3xl font-bold ${text}`}>{value}</p>
      </div>
      <div className={`rounded-full bg-white p-3 ${text}`}>
        <Icon size={22} />
      </div>
    </>
  )

  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  )
}

export default StatTile
