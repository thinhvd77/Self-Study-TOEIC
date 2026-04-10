interface TimerProps {
  timeLeft: number
  isRunning: boolean
  onToggle: () => void
}

export function Timer({ timeLeft, isRunning, onToggle }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const isLow = timeLeft < 60

  return (
    <div className="flex items-center gap-3">
      <span
        className={`font-mono text-2xl font-bold ${isLow ? 'text-[var(--danger)]' : 'text-[var(--accent)]'}`}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <button
        onClick={onToggle}
        className="px-3 py-1 text-sm rounded bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] active:scale-95 transition-all"
      >
        {isRunning ? 'Tạm dừng' : 'Tiếp tục'}
      </button>
    </div>
  )
}
