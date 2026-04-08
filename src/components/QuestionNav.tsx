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
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Câu hỏi</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: total }, (_, i) => {
          let className = 'w-10 h-10 rounded text-sm font-medium transition-colors '

          if (i === currentIndex) {
            className += 'bg-blue-600 text-white'
          } else if (answers[i] !== null && answers[i] !== undefined) {
            className += 'bg-green-100 text-green-800 border border-green-300'
          } else {
            className += 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }

          return (
            <button key={i} onClick={() => onNavigate(i)} className={className}>
              {bookmarks.has(i) && <span className="text-yellow-500 text-xs">★</span>}
              {i + 1}
            </button>
          )
        })}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-gray-500">
        <span>Đã làm: {answers.filter((a) => a !== null && a !== undefined).length}/{total}</span>
        <span>Đánh dấu: {bookmarks.size}</span>
      </div>
    </div>
  )
}
