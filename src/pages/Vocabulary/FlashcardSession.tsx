import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Flashcard } from '../../components/Flashcard'
import { useAppContext } from '../../context/AppContext'
import { calculateNextReview, getNextReviewDate, getWordsToReview } from '../../hooks/useSpacedRepetition'
import { VocabularyWord, VocabularyProgress } from '../../types'
import { businessVocabulary } from '../../data/vocabulary/business'

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
    const reviewPool = allWordsProp ?? businessVocabulary
    words = dueProgress
      .map((p) => reviewPool.find((w) => w.id === p.wordId))
      .filter((w): w is VocabularyWord => w !== undefined)
  } else {
    words = getWords(topic)
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [stats, setStats] = useState({ total: 0, knew: 0, didntKnow: 0 })

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
    // The old useSpacedRepetition hook uses 'level' terminology (0-5)
    // The new VocabularyProgress type uses 'box' terminology (1-5)
    // We bridge them here with Math.max(1, ...) until Task 9 replaces the hook
    const currentLevel = existing?.box ?? 1
    const { level, intervalDays } = calculateNextReview({ level: currentLevel, quality })
    const updatedProgress: VocabularyProgress = {
      wordId: word.id,
      // SM-2 returns level 0 for "failed" which maps to Leitner box 1 (lowest level)
      // This is temporary until Task 9 replaces with useLeitnerBoxes
      // The mapping is intentional and correct — both represent "reset to lowest"
      box: Math.max(1, level),
      nextReview: getNextReviewDate(intervalDays),
      lastReviewed: new Date().toISOString().split('T')[0],
      correctCount: (existing?.correctCount ?? 0) + (quality >= 3 ? 1 : 0),
      incorrectCount: (existing?.incorrectCount ?? 0) + (quality < 3 ? 1 : 0),
    }
    dispatch({ type: 'UPDATE_VOCAB_PROGRESS', payload: updatedProgress })
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
    </div>
  )
}
