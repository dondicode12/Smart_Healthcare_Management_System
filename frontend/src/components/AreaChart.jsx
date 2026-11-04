// A simple line + area chart drawn with SVG (no library needed).
// data: [{ label: 'Jan', value: 120 }, ...]
function AreaChart({ data }) {
  const width = 600
  const height = 220
  const pad = { top: 16, right: 12, bottom: 28, left: 12 }

  // The ", 1" keeps the chart from dividing by zero when every value is 0
  const max = Math.max(...data.map((d) => d.value), 1)
  const stepX = (width - pad.left - pad.right) / Math.max(data.length - 1, 1)

  const points = data.map((d, i) => ({
    x: pad.left + i * stepX,
    y: pad.top + (1 - d.value / max) * (height - pad.top - pad.bottom),
    label: d.label,
    value: d.value,
  }))

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const area = `${line} L${points[points.length - 1].x},${height - pad.bottom} L${points[0].x},${height - pad.bottom} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full text-blue-700"
      role="img"
      aria-label="Revenue chart"
    >
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={area} fill="url(#areaFill)" />
      <path
        d={line}
        pathLength="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw-line"
      />

      {points.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="4" fill="currentColor">
            <title>{`${p.label}: ₱${p.value.toLocaleString()}`}</title>
          </circle>
          <text
            x={p.x}
            y={height - 8}
            textAnchor="middle"
            className="fill-gray-500 text-[12px]"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default AreaChart
