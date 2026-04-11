import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getTopicBatch } from '../getTopicBatch'
import type { VocabularyWord, VocabularyProgress } from '../../types'

const makeWord = (id: string): VocabularyWord => ({
  id,
  word: id,
  ipa: '/test/',
  meaning: 'test',
  partOfSpeech: 'noun',
  example: 'test sentence',
  topic: 'test',
})

const makeProgress = (
  wordId: string,
  correctCount = 1,
  nextReview = '2099-01-01',
  lastReviewed = '2026-01-01'
): VocabularyProgress => ({
  wordId,
  box: 1,
  nextReview,
  lastReviewed,
  correctCount,
  incorrectCount: 0,
})

const TODAY = new Date().toISOString().split('T')[0]
const YESTERDAY = new Date(Date.now() - 86400000).toISOString().split('T')[0]

// 20 test words
const words = Array.from({ length: 20 }, (_, i) => makeWord(`w${i + 1}`))

describe('getTopicBatch', () => {
  it('returns first N words when no progress exists', () => {
    const result = getTopicBatch('test', words, [], {}, 5)
    expect(result.batch.map((w) => w.id)).toEqual(['w1', 'w2', 'w3', 'w4', 'w5'])
    expect(result.isComplete).toBe(false)
    expect(result.newBatchRecord).toEqual({ date: TODAY, startIndex: 0 })
  })

  it('starts batch at first unlearned word when partial progress exists', () => {
    const progress = [makeProgress('w1'), makeProgress('w2'), makeProgress('w3')]
    const result = getTopicBatch('test', words, progress, {}, 3)
    expect(result.batch.map((w) => w.id)).toEqual(['w4', 'w5', 'w6'])
    expect(result.newBatchRecord).toEqual({ date: TODAY, startIndex: 3 })
  })

  it('returns the same batch when today record exists (stable mid-session)', () => {
    const progress = [makeProgress('w1')] // w1 learned mid-session
    const batches = { test: { date: TODAY, startIndex: 0 } }
    const result = getTopicBatch('test', words, progress, batches, 3)
    // Still w1-w3, not shifted by learned w1
    expect(result.batch.map((w) => w.id)).toEqual(['w1', 'w2', 'w3'])
    expect(result.newBatchRecord).toBeNull()
  })

  it('recomputes batch when stored date is not today (new day)', () => {
    const progress = [makeProgress('w1'), makeProgress('w2')]
    const batches = { test: { date: YESTERDAY, startIndex: 0 } }
    const result = getTopicBatch('test', words, progress, batches, 3)
    // New batch starts at first unlearned (w3, index 2)
    expect(result.batch.map((w) => w.id)).toEqual(['w3', 'w4', 'w5'])
    expect(result.newBatchRecord).toEqual({ date: TODAY, startIndex: 2 })
  })

  it('clamps batch to remaining unlearned words when fewer than dailyBatchSize', () => {
    // 18 words learned, only w19 and w20 remain
    const progress = Array.from({ length: 18 }, (_, i) => makeProgress(`w${i + 1}`))
    const result = getTopicBatch('test', words, progress, {}, 5)
    expect(result.batch.map((w) => w.id)).toEqual(['w19', 'w20'])
    expect(result.isComplete).toBe(false)
  })

  it('returns empty batch with isComplete true when all words learned and none due', () => {
    const progress = Array.from({ length: 20 }, (_, i) =>
      makeProgress(`w${i + 1}`, 1, '2099-01-01')
    )
    const result = getTopicBatch('test', words, progress, {}, 5)
    expect(result.batch).toEqual([])
    expect(result.isComplete).toBe(true)
    expect(result.newBatchRecord).toBeNull()
  })

  it('returns due words when all words learned but some are overdue', () => {
    const progress = Array.from({ length: 20 }, (_, i) =>
      makeProgress(`w${i + 1}`, 1, i < 3 ? TODAY : '2099-01-01')
    )
    const result = getTopicBatch('test', words, progress, {}, 5)
    expect(result.batch.map((w) => w.id)).toEqual(['w1', 'w2', 'w3'])
    expect(result.isComplete).toBe(false)
  })

  it('returns empty batch with isComplete true for empty word list', () => {
    const result = getTopicBatch('test', [], [], {}, 5)
    expect(result.batch).toEqual([])
    expect(result.isComplete).toBe(true)
    expect(result.newBatchRecord).toBeNull()
  })
})
