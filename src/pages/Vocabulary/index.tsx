import { Routes, Route, useNavigate } from 'react-router-dom'
import { FlashcardSession } from './FlashcardSession'
import { VocabQuiz } from './VocabQuiz'
import { businessVocabulary } from '../../data/vocabulary/business'
import { officeVocabulary } from '../../data/vocabulary/office'
import { financeVocabulary } from '../../data/vocabulary/finance'
import { travelVocabulary } from '../../data/vocabulary/travel'
import { healthVocabulary } from '../../data/vocabulary/health'
import { technologyVocabulary } from '../../data/vocabulary/technology'
import { hrVocabulary } from '../../data/vocabulary/hr'
import { manufacturingVocabulary } from '../../data/vocabulary/manufacturing'
import { marketingVocabulary } from '../../data/vocabulary/marketing'
import { legalVocabulary } from '../../data/vocabulary/legal'
import { realEstateVocabulary } from '../../data/vocabulary/real-estate'
import { environmentVocabulary } from '../../data/vocabulary/environment'
import { useAppContext } from '../../context/AppContext'
import { getWordsToReview } from '../../hooks/useSpacedRepetition'
import { VocabularyWord } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'

const allTopics = [
  { id: 'business', label: 'Kinh doanh', words: businessVocabulary },
  { id: 'office', label: 'Văn phòng', words: officeVocabulary },
  { id: 'finance', label: 'Tài chính', words: financeVocabulary },
  { id: 'travel', label: 'Du lịch', words: travelVocabulary },
  { id: 'health', label: 'Y tế', words: healthVocabulary },
  { id: 'technology', label: 'Công nghệ', words: technologyVocabulary },
  { id: 'hr', label: 'Nhân sự', words: hrVocabulary },
  { id: 'manufacturing', label: 'Sản xuất', words: manufacturingVocabulary },
  { id: 'marketing', label: 'Marketing', words: marketingVocabulary },
  { id: 'legal', label: 'Pháp lý', words: legalVocabulary },
  { id: 'real-estate', label: 'Bất động sản', words: realEstateVocabulary },
  { id: 'environment', label: 'Môi trường', words: environmentVocabulary },
]

const allWords = allTopics.flatMap((t) => t.words)

function TopicSelection() {
  const navigate = useNavigate()
  const { progress } = useAppContext()

  const learnedCount = progress.vocabularyProgress.filter((v) => v.correctCount > 0).length
  const dueForReview = getWordsToReview(progress.vocabularyProgress)

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Học từ vựng</h2>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-[var(--accent)]">{learnedCount}</p>
            <p className="text-sm text-[var(--text-secondary)]">Đã học</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[var(--warning)]">{dueForReview.length}</p>
            <p className="text-sm text-[var(--text-secondary)]">Cần ôn hôm nay</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[var(--success)]">
              {learnedCount > 0
                ? Math.round((progress.vocabularyProgress.filter((v) => v.level >= 3).length / learnedCount) * 100)
                : 0}%
            </p>
            <p className="text-sm text-[var(--text-secondary)]">Tỷ lệ nhớ</p>
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
          className="w-full mb-6 p-4 rounded-xl bg-[var(--warning-soft)] border-2 border-[var(--warning)] hover:brightness-110 text-left active:scale-[0.99] transition-all"
        >
          <h3 className="font-bold text-[var(--warning)]">Ôn tập hôm nay</h3>
          <p className="text-sm text-[var(--warning)] opacity-80">{dueForReview.length} từ cần ôn lại</p>
        </button>
      )}

      <h3 className="text-lg font-semibold text-[var(--text-secondary)] mb-4">Chủ đề</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {allTopics.map((topic) => (
          <div key={topic.id} className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all duration-200">
            <h4 className="font-bold text-[var(--text-primary)] text-lg">{topic.label}</h4>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{topic.words.length} từ</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/vocabulary/flashcard?topic=${topic.id}`)}
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] hover:brightness-110 font-medium active:scale-95 transition-all"
              >
                Flashcard
              </button>
              <button
                onClick={() => navigate(`/vocabulary/quiz?topic=${topic.id}`)}
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-[var(--success-soft)] text-[var(--success)] hover:brightness-110 font-medium active:scale-95 transition-all"
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
