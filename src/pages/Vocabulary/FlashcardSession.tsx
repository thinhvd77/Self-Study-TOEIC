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
}

export function FlashcardSession({ getWords, isReview }: FlashcardSessionProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { progress, dispatch } = useAppContext()

  const topic = searchParams.get('topic') || ''

  let words: VocabularyWord[]
  if (isReview) {
    const dueProgress = getWordsToReview(progress.vocabularyProgress)
    const allWords = businessVocabulary
    words = dueProgress
      .map((p) => allWords.find((w) => w.id === p.wordId))
      .filter((w): w is VocabularyWord => w !== undefined)
  } else {
    words = getWords(topic)
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [stats, setStats] = useState({ total: 0, knew: 0, didntKnow: 0 })

  if (words.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {isReview ? 'Không có từ nào cần ôn hôm nay!' : 'Không tìm thấy từ vựng.'}
        </p>
        <button onClick={() => navigate('/vocabulary')} className="mt-4 text-blue-600 hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const handleRate = (quality: 1 | 3 | 5) => {
    const word = words[currentIndex]
    const existing = progress.vocabularyProgress.find((v) => v.wordId === word.id)
    const currentLevel = existing?.level ?? 0

    const { level, intervalDays } = calculateNextReview({ level: currentLevel, quality })

    const updatedProgress: VocabularyProgress = {
      wordId: word.id,
      level,
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

    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(-1)
    }
  }

  if (currentIndex === -1) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hoàn thành!</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <p className="text-gray-600">Đã học {stats.total} từ</p>
          <div className="flex justify-center gap-8 mt-4">
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.knew}</p>
              <p className="text-sm text-gray-500">Biết rồi</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.didntKnow}</p>
              <p className="text-sm text-gray-500">Chưa biết</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/vocabulary')}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
        >
          Quay lại
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {isReview ? 'Ôn tập' : `Từ vựng: ${topic}`}
        </h2>
        <span className="text-sm text-gray-500">
          {currentIndex + 1}/{words.length}
        </span>
      </div>

      <Flashcard word={words[currentIndex]} onRate={handleRate} />
    </div>
  )
}
