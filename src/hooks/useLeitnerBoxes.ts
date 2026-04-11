import type { VocabularyProgress } from '../types'

export const LEITNER_INTERVALS = [1, 2, 4, 8, 14]

const MAX_BOX = 5
const MIN_BOX = 1

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

export function calculateNextBox(params: {
  box: 1 | 2 | 3 | 4 | 5
  quality: 'didntKnow' | 'soSo' | 'known'
}): { box: 1 | 2 | 3 | 4 | 5; intervalDays: number } {
  const { box, quality } = params

  if (quality === 'didntKnow') {
    return { box: MIN_BOX, intervalDays: LEITNER_INTERVALS[MIN_BOX - 1] }
  }

  if (quality === 'soSo') {
    return { box, intervalDays: LEITNER_INTERVALS[box - 1] }
  }

  // quality === 'known'
  const nextBox = Math.min(box + 1, MAX_BOX) as 1 | 2 | 3 | 4 | 5
  return { box: nextBox, intervalDays: LEITNER_INTERVALS[nextBox - 1] }
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

export function getBoxDistribution(allProgress: VocabularyProgress[]): number[] {
  const distribution: number[] = [0, 0, 0, 0, 0]

  for (const progress of allProgress) {
    const boxIndex = progress.box - 1
    distribution[boxIndex]++
  }

  return distribution
}
