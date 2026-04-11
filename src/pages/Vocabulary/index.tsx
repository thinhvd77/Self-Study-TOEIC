import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom'
import { useMemo, useState, useEffect, useCallback } from 'react'
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
import { getWordsToReview, getBoxDistribution, getReviewSchedule } from '../../hooks/useLeitnerBoxes'
import { BoxDistributionCard } from '../../components/BoxDistributionCard'
import { ReviewSchedule } from '../../components/ReviewSchedule'
import { VocabularyWord } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'
import { getTopicBatch } from '../../utils/getTopicBatch'

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

function getWordsByTopic(topicId: string): VocabularyWord[] {
  return allTopics.find((t) => t.id === topicId)?.words ?? []
}

// ─── Batched Flashcard Route ──────────────────────────────────────────────────

function BatchedFlashcardRoute() {
  const [searchParams] = useSearchParams()
  const { progress, dispatch } = useAppContext()
  const topicId = searchParams.get('topic') || ''
  const topicWords = getWordsByTopic(topicId)

  // Compute batch once on mount (lazy init keeps it stable during the session)
  const [batchResult] = useState(() =>
    getTopicBatch(
      topicId,
      topicWords,
      progress.vocabularyProgress,
      progress.topicBatches ?? {},
      progress.dailyBatchSize ?? 15
    )
  )

  // Save batch record to state if it's a new batch (runs once after mount)
  useEffect(() => {
    if (batchResult.newBatchRecord) {
      dispatch({
        type: 'UPDATE_TOPIC_BATCH',
        payload: { topicId, ...batchResult.newBatchRecord },
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getBatch = useCallback(() => batchResult.batch, [batchResult.batch])

  return <FlashcardSession getWords={getBatch} />
}

// ─── Topic Selection ─────────────────────────────────────────────────────────

function TopicSelection() {
  const navigate = useNavigate()
  const { progress, dispatch } = useAppContext()

  const today = new Date().toISOString().split('T')[0]

  const learnedCount = progress.vocabularyProgress.filter((v) => v.correctCount > 0).length
  const dueForReview = getWordsToReview(progress.vocabularyProgress)

  const boxDistribution = useMemo(
    () => {
      const distribution = getBoxDistribution(progress.vocabularyProgress)
      return distribution.map((count, index) => ({
        box: (index + 1) as 1 | 2 | 3 | 4 | 5,
        count,
      }))
    },
    [progress.vocabularyProgress]
  )

  const reviewSchedule = useMemo(
    () => getReviewSchedule(progress.vocabularyProgress, 7),
    [progress.vocabularyProgress]
  )

  const progressMap = useMemo(
    () => new Map(progress.vocabularyProgress.map((p) => [p.wordId, p])),
    [progress.vocabularyProgress]
  )

  function getTopicBadge(topicId: string, topicWords: VocabularyWord[]): 'default' | 'done-today' | 'complete' {
    if (topicWords.length === 0) return 'complete'
    // All words learned?
    if (topicWords.every((w) => (progressMap.get(w.id)?.correctCount ?? 0) > 0)) {
      return 'complete'
    }
    // Batch started today and all batch words reviewed today?
    const savedBatch = (progress.topicBatches ?? {})[topicId]
    if (savedBatch?.date === today) {
      const batchSize = progress.dailyBatchSize ?? 15
      const batchWords = topicWords.slice(savedBatch.startIndex, savedBatch.startIndex + batchSize)
      if (batchWords.length > 0 && batchWords.every((w) => progressMap.get(w.id)?.lastReviewed === today)) {
        return 'done-today'
      }
    }
    return 'default'
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Học từ vựng</h2>
        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          Từ mới/ngày:
          <input
            type="number"
            min={5}
            max={50}
            value={progress.dailyBatchSize ?? 15}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10)
              if (!isNaN(val)) dispatch({ type: 'UPDATE_DAILY_BATCH_SIZE', payload: val })
            }}
            className="w-16 px-2 py-1 rounded border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-center"
          />
        </label>
      </div>

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
                ? Math.min(
                    100,
                    Math.round(
                      (progress.vocabularyProgress.filter((v) => v.box >= 3).length / learnedCount) * 100
                    )
                  )
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

      <BoxDistributionCard distribution={boxDistribution} total={learnedCount} />

      <ReviewSchedule
        schedule={reviewSchedule}
        onReviewToday={() => navigate('/vocabulary/review')}
      />

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
        {allTopics.map((topic) => {
          const badge = getTopicBadge(topic.id, topic.words)
          const batchSize = progress.dailyBatchSize ?? 15
          return (
            <div
              key={topic.id}
              className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <h4 className="font-bold text-[var(--text-primary)] text-lg">{topic.label}</h4>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{topic.words.length} từ</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/vocabulary/flashcard?topic=${topic.id}`)}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg font-medium active:scale-95 transition-all ${
                    badge === 'complete' || badge === 'done-today'
                      ? 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
                      : 'bg-[var(--accent-soft)] text-[var(--accent)] hover:brightness-110'
                  }`}
                >
                  {badge === 'done-today'
                    ? '✓ Hôm nay xong'
                    : badge === 'complete'
                    ? '🎉 Đã học hết'
                    : `Flashcard · ${batchSize} từ`}
                </button>
                <button
                  onClick={() => navigate(`/vocabulary/quiz?topic=${topic.id}`)}
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-[var(--success-soft)] text-[var(--success)] hover:brightness-110 font-medium active:scale-95 transition-all"
                >
                  Quiz
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Page Router ──────────────────────────────────────────────────────────────

export default function VocabularyPage() {
  return (
    <Routes>
      <Route index element={<TopicSelection />} />
      <Route path="flashcard" element={<BatchedFlashcardRoute />} />
      <Route path="quiz" element={<VocabQuiz getWords={getWordsByTopic} />} />
      <Route path="review" element={<FlashcardSession getWords={() => []} allWords={allWords} isReview />} />
    </Routes>
  )
}
