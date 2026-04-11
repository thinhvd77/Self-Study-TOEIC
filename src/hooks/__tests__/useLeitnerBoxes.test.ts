import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { VocabularyProgress } from '../../types'
import {
  calculateNextBox,
  LEITNER_INTERVALS,
  getNextReviewDate,
  isDueForReview,
  getWordsToReview,
  getBoxDistribution,
  getReviewSchedule,
} from '../useLeitnerBoxes'

describe('useLeitnerBoxes utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-01-15T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // === calculateNextBox transitions (8 tests) ===

  it('Box 1 + didntKnow stays at Box 1 with 1 day interval (no underflow)', () => {
    const result = calculateNextBox({ box: 1, quality: 'didntKnow' })

    expect(result).toEqual({ box: 1, intervalDays: 1 })
  })

  it('Box 5 + didntKnow resets to Box 1 with 1 day interval', () => {
    const result = calculateNextBox({ box: 5, quality: 'didntKnow' })

    expect(result).toEqual({ box: 1, intervalDays: 1 })
  })

  it('Box 3 + soSo stays at Box 3 with 4 day interval', () => {
    const result = calculateNextBox({ box: 3, quality: 'soSo' })

    expect(result).toEqual({ box: 3, intervalDays: 4 })
  })

  it('Box 1 + soSo stays at Box 1 with 1 day interval', () => {
    const result = calculateNextBox({ box: 1, quality: 'soSo' })

    expect(result).toEqual({ box: 1, intervalDays: 1 })
  })

  it('Box 1 + known promotes to Box 2 with 2 day interval', () => {
    const result = calculateNextBox({ box: 1, quality: 'known' })

    expect(result).toEqual({ box: 2, intervalDays: 2 })
  })

  it('Box 2 + known promotes to Box 3 with 4 day interval', () => {
    const result = calculateNextBox({ box: 2, quality: 'known' })

    expect(result).toEqual({ box: 3, intervalDays: 4 })
  })

  it('Box 4 + known promotes to Box 5 with 14 day interval', () => {
    const result = calculateNextBox({ box: 4, quality: 'known' })

    expect(result).toEqual({ box: 5, intervalDays: 14 })
  })

  it('Box 5 + known clamps at Box 5 with 14 day interval (no overflow)', () => {
    const result = calculateNextBox({ box: 5, quality: 'known' })

    expect(result).toEqual({ box: 5, intervalDays: 14 })
  })

  // === Constants (1 test) ===

  it('LEITNER_INTERVALS equals [1, 2, 4, 8, 14]', () => {
    expect(LEITNER_INTERVALS).toEqual([1, 2, 4, 8, 14])
  })

  // === Date helpers (3 tests) ===

  it('getNextReviewDate(8) returns ISO date of today + 8 days', () => {
    const result = getNextReviewDate(8)

    expect(result).toBe('2025-01-23')
  })

  it('isDueForReview returns true when nextReview is today', () => {
    const dueWord: VocabularyProgress = {
      wordId: 'w1',
      box: 2,
      nextReview: '2025-01-15',
      lastReviewed: '2025-01-10T00:00:00.000Z',
      correctCount: 2,
      incorrectCount: 1,
    }

    expect(isDueForReview(dueWord)).toBe(true)
  })

  it('isDueForReview returns false when nextReview is tomorrow', () => {
    const notDueWord: VocabularyProgress = {
      wordId: 'w2',
      box: 3,
      nextReview: '2025-01-16',
      lastReviewed: '2025-01-12T00:00:00.000Z',
      correctCount: 3,
      incorrectCount: 0,
    }

    expect(isDueForReview(notDueWord)).toBe(false)
  })

  // === Filtering (1 test) ===

  it('getWordsToReview filters correct words from a mixed list', () => {
    const allProgress: VocabularyProgress[] = [
      {
        wordId: 'w1',
        box: 1,
        nextReview: '2025-01-14',
        lastReviewed: '2025-01-10T00:00:00.000Z',
        correctCount: 1,
        incorrectCount: 0,
      },
      {
        wordId: 'w2',
        box: 3,
        nextReview: '2025-01-17',
        lastReviewed: '2025-01-12T00:00:00.000Z',
        correctCount: 3,
        incorrectCount: 1,
      },
      {
        wordId: 'w3',
        box: 1,
        nextReview: '2025-01-15',
        lastReviewed: '2025-01-14T00:00:00.000Z',
        correctCount: 0,
        incorrectCount: 2,
      },
    ]

    expect(getWordsToReview(allProgress).map((word) => word.wordId)).toEqual(['w1', 'w3'])
  })

  // === Distribution (2 tests) ===

  it('getBoxDistribution returns correct counts per box with zero-filled empty boxes', () => {
    const words: VocabularyProgress[] = [
      {
        wordId: 'w1',
        box: 1,
        nextReview: '2025-01-15',
        lastReviewed: '2025-01-10T00:00:00.000Z',
        correctCount: 1,
        incorrectCount: 0,
      },
      {
        wordId: 'w2',
        box: 1,
        nextReview: '2025-01-15',
        lastReviewed: '2025-01-10T00:00:00.000Z',
        correctCount: 2,
        incorrectCount: 0,
      },
      {
        wordId: 'w3',
        box: 3,
        nextReview: '2025-01-15',
        lastReviewed: '2025-01-10T00:00:00.000Z',
        correctCount: 3,
        incorrectCount: 1,
      },
      {
        wordId: 'w4',
        box: 3,
        nextReview: '2025-01-15',
        lastReviewed: '2025-01-10T00:00:00.000Z',
        correctCount: 1,
        incorrectCount: 0,
      },
      {
        wordId: 'w5',
        box: 3,
        nextReview: '2025-01-15',
        lastReviewed: '2025-01-10T00:00:00.000Z',
        correctCount: 2,
        incorrectCount: 0,
      },
    ]

    const result = getBoxDistribution(words)

    expect(result).toEqual([2, 0, 3, 0, 0])
  })

  it('getBoxDistribution returns all zeros for empty array', () => {
    const result = getBoxDistribution([])

    expect(result).toEqual([0, 0, 0, 0, 0])
  })

  it('getBoxDistribution clamps out-of-range box values to valid range', () => {
    const words: VocabularyProgress[] = [
      {
        wordId: 'w1',
        box: 0 as any,
        nextReview: '2025-01-15',
        lastReviewed: '2025-01-10T00:00:00.000Z',
        correctCount: 1,
        incorrectCount: 0,
      },
      {
        wordId: 'w2',
        box: 6 as any,
        nextReview: '2025-01-15',
        lastReviewed: '2025-01-10T00:00:00.000Z',
        correctCount: 2,
        incorrectCount: 0,
      },
      {
        wordId: 'w3',
        box: 3,
        nextReview: '2025-01-15',
        lastReviewed: '2025-01-10T00:00:00.000Z',
        correctCount: 3,
        incorrectCount: 1,
      },
    ]

    const result = getBoxDistribution(words)

    expect(result).toEqual([1, 0, 1, 0, 1])
  })

  // === isDueForReview edge cases (2 tests) ===

  it('isDueForReview returns false when nextReview is empty string', () => {
    const word: VocabularyProgress = {
      wordId: 'w1',
      box: 2,
      nextReview: '',
      lastReviewed: '2025-01-10T00:00:00.000Z',
      correctCount: 2,
      incorrectCount: 1,
    }

    expect(isDueForReview(word)).toBe(false)
  })

  it('isDueForReview correctly parses and evaluates full ISO timestamp', () => {
    const dueWord: VocabularyProgress = {
      wordId: 'w1',
      box: 2,
      nextReview: '2025-01-14T12:00:00.000Z',
      lastReviewed: '2025-01-10T00:00:00.000Z',
      correctCount: 2,
      incorrectCount: 1,
    }

    expect(isDueForReview(dueWord)).toBe(true)
  })
})

describe('getReviewSchedule', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-11T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('counts words due on the correct days', () => {
    const progress: VocabularyProgress[] = [
      { wordId: 'a', box: 1, nextReview: '2026-04-11', lastReviewed: '2026-04-10', correctCount: 1, incorrectCount: 0 },
      { wordId: 'b', box: 2, nextReview: '2026-04-12', lastReviewed: '2026-04-10', correctCount: 1, incorrectCount: 0 },
      { wordId: 'c', box: 2, nextReview: '2026-04-12', lastReviewed: '2026-04-10', correctCount: 1, incorrectCount: 0 },
      { wordId: 'd', box: 3, nextReview: '2026-04-14', lastReviewed: '2026-04-10', correctCount: 1, incorrectCount: 0 },
    ]
    const schedule = getReviewSchedule(progress, 7)
    expect(schedule).toHaveLength(7)
    expect(schedule[0]).toEqual({ date: '2026-04-11', count: 1 })
    expect(schedule[1]).toEqual({ date: '2026-04-12', count: 2 })
    expect(schedule[3]).toEqual({ date: '2026-04-14', count: 1 })
  })

  it('counts overdue words (nextReview in the past) in today bucket', () => {
    const progress: VocabularyProgress[] = [
      { wordId: 'a', box: 1, nextReview: '2026-04-09', lastReviewed: '2026-04-08', correctCount: 1, incorrectCount: 0 },
      { wordId: 'b', box: 1, nextReview: '2026-04-10', lastReviewed: '2026-04-09', correctCount: 1, incorrectCount: 0 },
    ]
    const schedule = getReviewSchedule(progress, 7)
    expect(schedule[0]).toEqual({ date: '2026-04-11', count: 2 })
  })

  it('returns 7 entries for empty progress, all counts zero', () => {
    const schedule = getReviewSchedule([], 7)
    expect(schedule).toHaveLength(7)
    expect(schedule.every((d) => d.count === 0)).toBe(true)
    expect(schedule[0].date).toBe('2026-04-11')
  })

  it('ignores words due beyond the daysAhead window', () => {
    const progress: VocabularyProgress[] = [
      { wordId: 'a', box: 5, nextReview: '2026-04-20', lastReviewed: '2026-04-10', correctCount: 1, incorrectCount: 0 },
    ]
    const schedule = getReviewSchedule(progress, 7)
    expect(schedule.every((d) => d.count === 0)).toBe(true)
  })

  it('includes today in results even when count is 0', () => {
    const schedule = getReviewSchedule([], 7)
    expect(schedule[0].date).toBe('2026-04-11')
    expect(schedule[0].count).toBe(0)
  })
})
