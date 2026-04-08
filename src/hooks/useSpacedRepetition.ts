import type { VocabularyProgress } from '../types'

const REVIEW_INTERVALS = [1, 1, 2, 4, 7, 14]
const MAX_LEVEL = 5

const clampLevel = (level: number) => Math.max(0, Math.min(MAX_LEVEL, level))
const getDateOnlyString = (date: Date) => date.toISOString().slice(0, 10)
const normalizeReviewDate = (dateValue: string): string | null => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return dateValue
  }

  const parsedDate = new Date(dateValue)
  if (Number.isNaN(parsedDate.getTime())) {
    return null
  }

  return getDateOnlyString(parsedDate)
}

export function calculateNextReview(params: {
  level: number
  quality: number
}): { level: number; intervalDays: number } {
  if (params.quality <= 1) {
    return { level: 0, intervalDays: REVIEW_INTERVALS[0] }
  }

  const currentLevel = clampLevel(params.level)
  if (params.quality <= 3) {
    return {
      level: currentLevel,
      intervalDays: REVIEW_INTERVALS[currentLevel],
    }
  }

  const nextLevel = clampLevel(currentLevel + 1)

  return {
    level: nextLevel,
    intervalDays: REVIEW_INTERVALS[nextLevel],
  }
}

export function getNextReviewDate(intervalDays: number): string {
  const intervalMs = Math.max(1, intervalDays) * 24 * 60 * 60 * 1000
  return getDateOnlyString(new Date(Date.now() + intervalMs))
}

export function isDueForReview(progress: VocabularyProgress): boolean {
  const normalizedReviewDate = normalizeReviewDate(progress.nextReview)
  if (!normalizedReviewDate) {
    return false
  }

  return normalizedReviewDate <= getDateOnlyString(new Date())
}

export function getWordsToReview(allProgress: VocabularyProgress[]): VocabularyProgress[] {
  return allProgress.filter(isDueForReview)
}
