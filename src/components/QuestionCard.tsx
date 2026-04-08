interface QuestionCardProps {
  questionNumber: number
  question: string
  passage?: string
  options: string[]
  selectedAnswer: number | null
  correctAnswer?: number // shown after submit
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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-gray-500">Câu {questionNumber}</span>
        <button
          onClick={onToggleBookmark}
          className={`text-lg ${isBookmarked ? 'text-yellow-500' : 'text-gray-300'}`}
          title={isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
        >
          ★
        </button>
      </div>

      {passage && (
        <div className="mb-4 p-4 bg-gray-50 rounded text-sm leading-relaxed whitespace-pre-wrap">
          {passage}
        </div>
      )}

      <p className="text-gray-800 font-medium mb-4">{question}</p>

      <div className="space-y-2">
        {options.map((option, index) => {
          let className = 'w-full text-left px-4 py-3 rounded-lg border transition-colors '

          if (isReviewMode) {
            if (index === correctAnswer) {
              className += 'border-green-500 bg-green-50 text-green-800'
            } else if (index === selectedAnswer && index !== correctAnswer) {
              className += 'border-red-500 bg-red-50 text-red-800'
            } else {
              className += 'border-gray-200 text-gray-500'
            }
          } else if (index === selectedAnswer) {
            className += 'border-blue-500 bg-blue-50 text-blue-800'
          } else {
            className += 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
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
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800 mb-1">Giải thích:</p>
          <p className="text-sm text-blue-700">{explanation}</p>
        </div>
      )}
    </div>
  )
}
