import { Routes, Route, useNavigate } from 'react-router-dom'
import { FlashcardSession } from './FlashcardSession'
import { VocabQuiz } from './VocabQuiz'
import { businessVocabulary } from '../../data/vocabulary/business'
import { useAppContext } from '../../context/AppContext'
import { getWordsToReview } from '../../hooks/useSpacedRepetition'
import { VocabularyWord } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'

const allTopics = [
  { id: 'business', label: 'Business', words: businessVocabulary },
]

const allWords = allTopics.flatMap((t) => t.words)

function TopicSelection() {
  const navigate = useNavigate()
  const { progress } = useAppContext()

  const learnedCount = progress.vocabularyProgress.filter((v) => v.correctCount > 0).length
  const dueForReview = getWordsToReview(progress.vocabularyProgress)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Học từ vựng</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-700">{learnedCount}</p>
            <p className="text-sm text-gray-500">Đã học</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-yellow-600">{dueForReview.length}</p>
            <p className="text-sm text-gray-500">Cần ôn hôm nay</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">
              {learnedCount > 0
                ? Math.round((progress.vocabularyProgress.filter((v) => v.level >= 3).length / learnedCount) * 100)
                : 0}%
            </p>
            <p className="text-sm text-gray-500">Tỷ lệ nhớ</p>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar
            value={Math.round((learnedCount / allWords.length) * 100)}
            label={`Tiến độ: ${learnedCount}/${allWords.length} từ`}
          />
        </div>
      </div>

      {dueForReview.length > 0 && (
        <button
          onClick={() => navigate('/vocabulary/review')}
          className="w-full mb-6 p-4 rounded-lg bg-yellow-50 border-2 border-yellow-300 hover:border-yellow-400 text-left"
        >
          <h3 className="font-bold text-yellow-800">Ôn tập hôm nay</h3>
          <p className="text-sm text-yellow-600">{dueForReview.length} từ cần ôn lại</p>
        </button>
      )}

      <h3 className="text-lg font-semibold text-gray-700 mb-4">Chủ đề</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {allTopics.map((topic) => (
          <div key={topic.id} className="bg-white rounded-lg shadow p-5">
            <h4 className="font-bold text-gray-800 text-lg">{topic.label}</h4>
            <p className="text-sm text-gray-500 mt-1">{topic.words.length} từ</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/vocabulary/flashcard?topic=${topic.id}`)}
                className="flex-1 px-3 py-2 text-sm rounded bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium"
              >
                Flashcard
              </button>
              <button
                onClick={() => navigate(`/vocabulary/quiz?topic=${topic.id}`)}
                className="flex-1 px-3 py-2 text-sm rounded bg-green-100 text-green-700 hover:bg-green-200 font-medium"
              >
                Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getWordsByTopic(topicId: string): VocabularyWord[] {
  const topic = allTopics.find((t) => t.id === topicId)
  return topic?.words ?? []
}

export default function VocabularyPage() {
  return (
    <Routes>
      <Route index element={<TopicSelection />} />
      <Route path="flashcard" element={<FlashcardSession getWords={getWordsByTopic} />} />
      <Route path="quiz" element={<VocabQuiz getWords={getWordsByTopic} />} />
      <Route path="review" element={<FlashcardSession getWords={() => []} allWords={allWords} isReview />} />
    </Routes>
  )
}
