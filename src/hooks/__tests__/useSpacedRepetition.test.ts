import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { VocabularyProgress } from '../../types'
import {
  calculateNextReview,
  getNextReviewDate,
  getWordsToReview,
  isDueForReview,
} from '../useSpacedRepetition'

describe('useSpacedRepetition utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-01-15T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('resets to level 0 with 1 day interval when quality is 1', () => {
    const result = calculateNextReview({ level: 4, quality: 1 })

    expect(result).toEqual({ level: 0, intervalDays: 1 })
  })

  it('resets to level 0 when quality is below 1', () => {
    const result = calculateNextReview({ level: 3, quality: 0 })

    expect(result).toEqual({ level: 0, intervalDays: 1 })
  })

  it('keeps same level when quality is 3', () => {
    const result = calculateNextReview({ level: 2, quality: 3 })

    expect(result).toEqual({ level: 2, intervalDays: 2 })
  })

  it('keeps same level and uses mapped interval when quality is 2', () => {
    const result = calculateNextReview({ level: 4, quality: 2 })

    expect(result).toEqual({ level: 4, intervalDays: 7 })
  })

  it('increases level by 1 when quality is 4', () => {
    const result = calculateNextReview({ level: 2, quality: 4 })

    expect(result).toEqual({ level: 3, intervalDays: 4 })
  })

  it('increases level by 1 when quality is 5', () => {
    const result = calculateNextReview({ level: 2, quality: 5 })

    expect(result).toEqual({ level: 3, intervalDays: 4 })
  })

  it('caps level at 5', () => {
    const result = calculateNextReview({ level: 5, quality: 5 })

    expect(result.level).toBe(5)
    expect(result.intervalDays).toBe(14)
  })

  it('uses exact interval mapping [1,1,2,4,7,14] for retained levels', () => {
    const expectedIntervals = [1, 1, 2, 4, 7, 14]

    expectedIntervals.forEach((intervalDays, level) => {
      const result = calculateNextReview({ level, quality: 3 })

      expect(result).toEqual({ level, intervalDays })
    })
  })

  it('returns next review date as YYYY-MM-DD based on interval days', () => {
    const result = getNextReviewDate(4)

    expect(result).toBe('2025-01-19')
  })

  it('checks whether a word is due for review', () => {
    const dueWord: VocabularyProgress = {
      wordId: 'w1',
      level: 2,
      nextReview: '2025-01-14',
      lastReviewed: '2025-01-10T00:00:00.000Z',
      correctCount: 2,
      incorrectCount: 1,
    }

    const notDueWord: VocabularyProgress = {
      ...dueWord,
      wordId: 'w2',
      nextReview: '2025-01-20',
    }

    expect(isDueForReview(dueWord)).toBe(true)
    expect(isDueForReview(notDueWord)).toBe(false)
  })

  it('treats a word scheduled later today as due on day granularity', () => {
    vi.setSystemTime(new Date('2025-01-15T12:30:00.000Z'))

    const sameDayLaterTime: VocabularyProgress = {
      wordId: 'w4',
      level: 1,
      nextReview: '2025-01-15T23:59:59.000Z',
      lastReviewed: '2025-01-14T00:00:00.000Z',
      correctCount: 1,
      incorrectCount: 0,
    }

    expect(isDueForReview(sameDayLaterTime)).toBe(true)
  })

  it('returns only words that are due for review', () => {
    const allProgress: VocabularyProgress[] = [
      {
        wordId: 'w1',
        level: 1,
        nextReview: '2025-01-13',
        lastReviewed: '2025-01-10T00:00:00.000Z',
        correctCount: 1,
        incorrectCount: 0,
      },
      {
        wordId: 'w2',
        level: 3,
        nextReview: '2025-01-17',
        lastReviewed: '2025-01-12T00:00:00.000Z',
        correctCount: 3,
        incorrectCount: 1,
      },
      {
        wordId: 'w3',
        level: 0,
        nextReview: '2025-01-15',
        lastReviewed: '2025-01-14T00:00:00.000Z',
        correctCount: 0,
        incorrectCount: 2,
      },
    ]

    expect(getWordsToReview(allProgress).map((word) => word.wordId)).toEqual(['w1', 'w3'])
  })
})
