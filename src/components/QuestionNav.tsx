interface QuestionNavProps {
  total: number
  currentIndex: number
  answers: (number | null)[]
  bookmarks: Set<number>
  onNavigate: (index: number) => void
}

export function QuestionNav({
  total,
  currentIndex,
  answers,
  bookmarks,
  onNavigate,
}: QuestionNavProps) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4">
      <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Câu hỏi</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: total }, (_, i) => {
          let className = 'w-10 h-10 rounded text-sm font-medium transition-colors '

          if (i === currentIndex) {
            className += 'bg-[var(--accent)] text-gray-900'
          } else if (answers[i] !== null && answers[i] !== undefined) {
            className += 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]'
          } else {
            className += 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--border)]'
          }

          return (
            <button key={i} onClick={() => onNavigate(i)} className={`${className} relative`}>
              {bookmarks.has(i) && (
                <span className="absolute top-0 right-0 text-[var(--warning)] text-xs leading-none">★</span>
              )}
              {i + 1}
            </button>
          )
        })}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-[var(--text-secondary)]">
        <span>Đã làm: {answers.filter((a) => a !== null && a !== undefined).length}/{total}</span>
        <span>Đánh dấu: {bookmarks.size}</span>
      </div>
    </div>
  )
}
