import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Flashcard } from '../../components/Flashcard'
import { useAppContext } from '../../context/AppContext'
import { calculateNextBox, getNextReviewDate, getWordsToReview } from '../../hooks/useLeitnerBoxes'
import { VocabularyWord, VocabularyProgress } from '../../types'

interface FlashcardSessionProps {
  getWords: (topicId: string) => VocabularyWord[]
  isReview?: boolean
  allWords?: VocabularyWord[]
}

export function FlashcardSession({ getWords, isReview, allWords: allWordsProp }: FlashcardSessionProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { progress, dispatch } = useAppContext()

  const topic = searchParams.get('topic') || ''

  let words: VocabularyWord[]
  if (isReview) {
    const dueProgress = getWordsToReview(progress.vocabularyProgress)
    const reviewPool = allWordsProp || []
    words = dueProgress
      .map((p) => reviewPool.find((w) => w.id === p.wordId))
      .filter((w): w is VocabularyWord => w !== undefined)
  } else {
    words = getWords(topic)
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [stats, setStats] = useState({ total: 0, knew: 0, didntKnow: 0 })
  const [toast, setToast] = useState<{ from: number; to: number; intervalDays: number } | null>(null)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 1500)
      return () => clearTimeout(timer)
    }
  }, [toast])

  if (words.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">
          {isReview ? 'Không có từ nào cần ôn hôm nay!' : 'Không tìm thấy từ vựng.'}
        </p>
        <button onClick={() => navigate('/vocabulary')} className="mt-4 text-[var(--accent)] hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const handleRate = (quality: 1 | 3 | 5) => {
    const word = words[currentIndex]
    const existing = progress.vocabularyProgress.find((v) => v.wordId === word.id)
    const currentBox = existing?.box ?? 1

    // Map quality (from Flashcard) to Leitner rating
    const qualityToRating = { 1: 'didntKnow', 3: 'soSo', 5: 'known' } as const
    const rating = qualityToRating[quality as keyof typeof qualityToRating]
    const result = calculateNextBox({ box: currentBox as 1 | 2 | 3 | 4 | 5, quality: rating })
    const { box, intervalDays } = result

    const updatedProgress: VocabularyProgress = {
      wordId: word.id,
      box,
      nextReview: getNextReviewDate(intervalDays),
      lastReviewed: new Date().toISOString().split('T')[0],
      correctCount: (existing?.correctCount ?? 0) + (quality >= 3 ? 1 : 0),
      incorrectCount: (existing?.incorrectCount ?? 0) + (quality < 3 ? 1 : 0),
    }
    dispatch({ type: 'UPDATE_VOCAB_PROGRESS', payload: updatedProgress })
    setToast({ from: currentBox, to: box, intervalDays })
    setStats((prev) => ({
      total: prev.total + 1,
      knew: prev.knew + (quality === 5 ? 1 : 0),
      didntKnow: prev.didntKnow + (quality === 1 ? 1 : 0),
    }))
    if (currentIndex < words.length - 1) setCurrentIndex(currentIndex + 1)
    else setCurrentIndex(-1)
  }

  if (currentIndex === -1) {
    return (
      <div className="max-w-lg mx-auto text-center py-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Hoàn thành!</h2>
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
          <p className="text-[var(--text-secondary)]">Đã học {stats.total} từ</p>
          <div className="flex justify-center gap-8 mt-4">
            <div>
              <p className="text-2xl font-bold text-[var(--success)]">{stats.knew}</p>
              <p className="text-sm text-[var(--text-secondary)]">Biết rồi</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--danger)]">{stats.didntKnow}</p>
              <p className="text-sm text-[var(--text-secondary)]">Chưa biết</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/vocabulary')}
          className="px-6 py-3 rounded-xl bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
        >
          Quay lại
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          {isReview ? 'Ôn tập' : `Từ vựng: ${topic}`}
        </h2>
        <span className="text-sm text-[var(--text-secondary)]">{currentIndex + 1}/{words.length}</span>
      </div>
      <Flashcard word={words[currentIndex]} onRate={handleRate} />
      {toast && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          {toast.from < toast.to && `Hộp ${toast.from} → Hộp ${toast.to} ✨`}
          {toast.from > toast.to && `Hộp ${toast.from} → Hộp ${toast.to} 🔁`}
          {toast.from === toast.to && `Hộp ${toast.from} • Ôn lại sau ${toast.intervalDays} ngày`}
        </div>
      )}
    </div>
  )
}
