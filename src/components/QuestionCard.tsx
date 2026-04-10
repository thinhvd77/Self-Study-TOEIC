interface QuestionCardProps {
  questionNumber: number
  question: string
  passage?: string
  passage2?: string
  options: string[]
  selectedAnswer: number | null
  correctAnswer?: number
  explanation?: string
  isBookmarked: boolean
  onSelect: (index: number) => void
  onToggleBookmark: () => void
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export function QuestionCard({
  questionNumber,
  question,
  passage,
  passage2,
  options,
  selectedAnswer,
  correctAnswer,
  explanation,
  isBookmarked,
  onSelect,
  onToggleBookmark,
}: QuestionCardProps) {
  const isReviewMode = correctAnswer !== undefined

  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-[var(--text-secondary)]">Câu {questionNumber}</span>
        <button
          onClick={onToggleBookmark}
          className={`text-lg ${isBookmarked ? 'text-[var(--accent)]' : 'text-[var(--border)]'}`}
          title={isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
        >
          ★
        </button>
      </div>

      {passage && (
        <div className="mb-4 p-4 bg-[var(--bg-elevated)] rounded text-sm leading-relaxed whitespace-pre-wrap text-[var(--text-primary)]">
          {passage}
        </div>
      )}

      {passage2 && (
        <div className="mb-4">
          <div className="border-t border-[var(--border)] pt-4">
            <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2">Đoạn văn 2</p>
            <div className="p-4 bg-[var(--bg-elevated)] rounded text-sm leading-relaxed whitespace-pre-wrap text-[var(--text-primary)]">
              {passage2}
            </div>
          </div>
        </div>
      )}

      <p className="text-[var(--text-primary)] font-medium mb-4">{question}</p>

      <div className="space-y-2">
        {options.map((option, index) => {
          let className = 'w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 active:scale-[0.99] '

          if (isReviewMode) {
            if (index === correctAnswer) {
              className += 'border-[var(--success)] bg-[var(--success-soft)] text-[var(--success)]'
            } else if (index === selectedAnswer && index !== correctAnswer) {
              className += 'border-[var(--danger)] bg-[var(--danger-soft)] text-[var(--danger)]'
            } else {
              className += 'border-[var(--border)] text-[var(--text-secondary)]'
            }
          } else if (index === selectedAnswer) {
            className += 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
          } else {
            className += 'border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]'
          }

          return (
            <button
              key={index}
              onClick={() => !isReviewMode && onSelect(index)}
              disabled={isReviewMode}
              className={className}
            >
              <span className="font-bold mr-3">{OPTION_LABELS[index] ?? String(index + 1)}.</span>
              {option}
            </button>
          )
        })}
      </div>

      {isReviewMode && explanation && (
        <div className="mt-4 p-4 bg-[var(--bg-elevated)] rounded-lg border border-[var(--border)]">
          <p className="text-sm font-medium text-[var(--accent)] mb-1">Giải thích:</p>
          <p className="text-sm text-[var(--text-secondary)]">{explanation}</p>
        </div>
      )}
    </div>
  )
}
