import type { VocabularyWord, VocabularyProgress } from '../types'
import { isDueForReview } from '../hooks/useLeitnerBoxes'

export function getTopicBatch(
  topicId: string,
  words: VocabularyWord[],
  vocabularyProgress: VocabularyProgress[],
  topicBatches: Record<string, { date: string; startIndex: number }>,
  dailyBatchSize: number
): {
  batch: VocabularyWord[]
  isComplete: boolean
  newBatchRecord: { date: string; startIndex: number } | null
} {
  const today = new Date().toISOString().split('T')[0]
  const progressMap = new Map(vocabularyProgress.map((p) => [p.wordId, p]))

  // Empty topic
  if (words.length === 0) {
    return { batch: [], isComplete: true, newBatchRecord: null }
  }

  // Find first unlearned word (no progress or correctCount === 0)
  const unlearnedIndex = words.findIndex((w) => {
    const p = progressMap.get(w.id)
    return !p || p.correctCount === 0
  })

  // All words have been learned at least once
  if (unlearnedIndex === -1) {
    const dueWords = words.filter((w) => {
      const p = progressMap.get(w.id)
      return p !== undefined && isDueForReview(p)
    })
    return {
      batch: dueWords,
      isComplete: dueWords.length === 0,
      newBatchRecord: null,
    }
  }

  // Today's batch already saved — return same batch to keep session stable
  const savedBatch = topicBatches[topicId]
  if (savedBatch?.date === today) {
    return {
      batch: words.slice(savedBatch.startIndex, savedBatch.startIndex + dailyBatchSize),
      isComplete: false,
      newBatchRecord: null,
    }
  }

  // New day or first visit — create new batch starting at first unlearned
  const startIndex = unlearnedIndex
  return {
    batch: words.slice(startIndex, startIndex + dailyBatchSize),
    isComplete: false,
    newBatchRecord: { date: today, startIndex },
  }
}
