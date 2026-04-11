import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { VocabularyProgress } from '../../types'
import {
  calculateNextBox,
  LEITNER_INTERVALS,
  getNextReviewDate,
  isDueForReview,
  getWordsToReview,
  getBoxDistribution,
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
})
