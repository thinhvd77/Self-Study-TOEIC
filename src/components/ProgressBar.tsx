interface ProgressBarProps {
  value: number // 0-100
  label?: string
  color?: 'blue' | 'green' | 'yellow' | 'red'
}

const colorMap = {
  blue: 'bg-[var(--accent)]',
  green: 'bg-green-500',
  yellow: 'bg-yellow-400',
  red: 'bg-red-500',
}

export function ProgressBar({ value, label, color = 'blue' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div>
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-[var(--text-secondary)]">{label}</span>
          <span className="font-medium text-[var(--text-primary)]">{clamped}%</span>
        </div>
      )}
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${colorMap[color]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
