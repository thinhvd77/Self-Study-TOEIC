const DAY_NAMES = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

interface ScheduleEntry {
  date: string
  count: number
}

interface Props {
  schedule: ScheduleEntry[]
  onReviewToday: () => void
}

function getDayLabel(dateStr: string): string {
  // Parse as local date to avoid UTC offset shifting the day
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return DAY_NAMES[date.getDay()]
}

export function ReviewSchedule({ schedule, onReviewToday }: Props) {
  const today = schedule[0]?.date ?? ''
  const hasAnyWords = schedule.some((d) => d.count > 0)

  if (!hasAnyWords) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-4 mb-6">
        <p className="text-[var(--text-secondary)] text-center text-sm">
          Không có từ nào cần ôn trong 7 ngày tới 🎉
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-4 mb-6">
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-3">📅 Lịch ôn tập</h3>
      <div className="space-y-2">
        {schedule.map((entry) => {
          const isToday = entry.date === today
          // Always show today; skip future days with 0 count
          if (!isToday && entry.count === 0) return null
          return (
            <div
              key={entry.date}
              className={`flex items-center gap-3 ${
                isToday
                  ? 'font-semibold text-[var(--accent)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <span className="w-20 text-sm shrink-0">
                {isToday ? 'Hôm nay' : getDayLabel(entry.date)}
              </span>
              {entry.count > 0 && (
                <span className="flex-1 text-sm">{entry.count} từ</span>
              )}
              {isToday && entry.count > 0 && (
                <button
                  onClick={onReviewToday}
                  className="text-xs px-3 py-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] hover:brightness-110 font-medium shrink-0"
                >
                  Ôn ngay →
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
