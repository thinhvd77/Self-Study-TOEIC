import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { loadAndMigrate, mapLevelToBox } from '../migrateVocabularyProgress'
import { UserProgress } from '../../types'

describe('mapLevelToBox', () => {
  it('maps level 0 to box 1', () => {
    expect(mapLevelToBox(0)).toBe(1)
  })

  it('maps level 1 to box 1', () => {
    expect(mapLevelToBox(1)).toBe(1)
  })

  it('maps level 2 to box 2', () => {
    expect(mapLevelToBox(2)).toBe(2)
  })

  it('maps level 3 to box 3', () => {
    expect(mapLevelToBox(3)).toBe(3)
  })

  it('maps level 4 to box 4', () => {
    expect(mapLevelToBox(4)).toBe(4)
  })

  it('maps level 5 to box 5', () => {
    expect(mapLevelToBox(5)).toBe(5)
  })

  it('clamps level 99 to box 5', () => {
    expect(mapLevelToBox(99)).toBe(5)
  })

  it('clamps level -3 to box 1', () => {
    expect(mapLevelToBox(-3)).toBe(1)
  })
})

describe('loadAndMigrate', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('test 1: neither toeic-progress-v2 nor toeic-progress key set → returns fresh state with version: 2', () => {
    const result = loadAndMigrate()
    expect(result.version).toBe(2)
    expect(result.currentWeek).toBe(1)
    expect(result.completedTasks).toEqual([])
    expect(result.testHistory).toEqual([])
    expect(result.vocabularyProgress).toEqual([])
    expect(result.grammarProgress).toEqual([])
  })

  it('test 2: only toeic-progress-v2 set with version === 2 → returns it as-is (no migration needed)', () => {
    const mockV2State: UserProgress = {
      version: 2,
      currentWeek: 5,
      startDate: '2026-01-01',
      completedTasks: ['task1'],
      testHistory: [],
      vocabularyProgress: [],
      grammarProgress: [],
    }
    localStorage.setItem('toeic-progress-v2', JSON.stringify(mockV2State))

    const result = loadAndMigrate()
    expect(result).toEqual(mockV2State)
    expect(result.version).toBe(2)
    expect(result.currentWeek).toBe(5)
  })

  it('test 3: only legacy toeic-progress set with levels [0, 1, 2, 3, 4, 5] → maps levels to boxes [1, 1, 2, 3, 4, 5], version becomes 2, written to new key', () => {
    const legacyState = {
      version: 1,
      currentWeek: 2,
      startDate: '2026-01-15',
      completedTasks: [],
      testHistory: [],
      vocabularyProgress: [
        { wordId: 'v-001', level: 0, lastReviewed: '2026-01-15', nextReview: '2026-01-16' },
        { wordId: 'v-002', level: 1, lastReviewed: '2026-01-15', nextReview: '2026-01-16' },
        { wordId: 'v-003', level: 2, lastReviewed: '2026-01-15', nextReview: '2026-01-17' },
        { wordId: 'v-004', level: 3, lastReviewed: '2026-01-15', nextReview: '2026-01-18' },
        { wordId: 'v-005', level: 4, lastReviewed: '2026-01-15', nextReview: '2026-01-20' },
        { wordId: 'v-006', level: 5, lastReviewed: '2026-01-15', nextReview: '2026-01-25' },
      ],
      grammarProgress: [],
    }
    localStorage.setItem('toeic-progress', JSON.stringify(legacyState))

    const result = loadAndMigrate()
    expect(result.version).toBe(2)
    expect(result.currentWeek).toBe(2)
    expect(result.vocabularyProgress).toHaveLength(6)
    expect(result.vocabularyProgress[0]).toMatchObject({ wordId: 'v-001', box: 1 })
    expect(result.vocabularyProgress[1]).toMatchObject({ wordId: 'v-002', box: 1 })
    expect(result.vocabularyProgress[2]).toMatchObject({ wordId: 'v-003', box: 2 })
    expect(result.vocabularyProgress[3]).toMatchObject({ wordId: 'v-004', box: 3 })
    expect(result.vocabularyProgress[4]).toMatchObject({ wordId: 'v-005', box: 4 })
    expect(result.vocabularyProgress[5]).toMatchObject({ wordId: 'v-006', box: 5 })

    // Verify migrated state was written to v2 key
    const storedV2 = localStorage.getItem('toeic-progress-v2')
    expect(storedV2).toBeTruthy()
    const parsedV2 = JSON.parse(storedV2!)
    expect(parsedV2.version).toBe(2)
  })

  it('test 4: both keys set → toeic-progress-v2 wins, legacy key is not deleted (backup preserved)', () => {
    const legacyState = {
      version: 1,
      currentWeek: 2,
      startDate: '2026-01-15',
      completedTasks: [],
      testHistory: [],
      vocabularyProgress: [
        { wordId: 'v-001', level: 0, lastReviewed: '2026-01-15', nextReview: '2026-01-16' },
      ],
      grammarProgress: [],
    }
    const v2State: UserProgress = {
      version: 2,
      currentWeek: 8,
      startDate: '2026-01-15',
      completedTasks: ['task1'],
      testHistory: [],
      vocabularyProgress: [],
      grammarProgress: [],
    }
    localStorage.setItem('toeic-progress', JSON.stringify(legacyState))
    localStorage.setItem('toeic-progress-v2', JSON.stringify(v2State))

    const result = loadAndMigrate()
    expect(result).toEqual(v2State)
    expect(result.currentWeek).toBe(8)

    // Verify legacy key still exists (not deleted)
    const legacyStill = localStorage.getItem('toeic-progress')
    expect(legacyStill).toBeTruthy()
    expect(JSON.parse(legacyStill!).currentWeek).toBe(2)
  })

  it('test 5: legacy JSON malformed (e.g., "not json") → wrapped in try/catch → returns fresh state', () => {
    localStorage.setItem('toeic-progress', '"not json"')

    const result = loadAndMigrate()
    expect(result.version).toBe(2)
    expect(result.currentWeek).toBe(1)
    expect(result.vocabularyProgress).toEqual([])
  })

  it('test 6: legacy exists but missing vocabularyProgress array → returns fresh state (validate Array.isArray)', () => {
    const malformedLegacy = {
      version: 1,
      currentWeek: 2,
      startDate: '2026-01-15',
      completedTasks: [],
      testHistory: [],
      // vocabularyProgress missing
      grammarProgress: [],
    }
    localStorage.setItem('toeic-progress', JSON.stringify(malformedLegacy))

    const result = loadAndMigrate()
    expect(result.version).toBe(2)
    expect(result.currentWeek).toBe(1)
    expect(result.vocabularyProgress).toEqual([])
  })

  it('test 7: legacy has corrupt level value level: 99 → clamp to Box 5', () => {
    const legacyState = {
      version: 1,
      currentWeek: 2,
      startDate: '2026-01-15',
      completedTasks: [],
      testHistory: [],
      vocabularyProgress: [
        { wordId: 'v-001', level: 99, lastReviewed: '2026-01-15', nextReview: '2026-01-16' },
      ],
      grammarProgress: [],
    }
    localStorage.setItem('toeic-progress', JSON.stringify(legacyState))

    const result = loadAndMigrate()
    expect(result.version).toBe(2)
    expect(result.vocabularyProgress[0]).toMatchObject({ wordId: 'v-001', box: 5 })
  })

  it('test 8: legacy has corrupt level value level: -3 → clamp to Box 1', () => {
    const legacyState = {
      version: 1,
      currentWeek: 2,
      startDate: '2026-01-15',
      completedTasks: [],
      testHistory: [],
      vocabularyProgress: [
        { wordId: 'v-001', level: -3, lastReviewed: '2026-01-15', nextReview: '2026-01-16' },
      ],
      grammarProgress: [],
    }
    localStorage.setItem('toeic-progress', JSON.stringify(legacyState))

    const result = loadAndMigrate()
    expect(result.version).toBe(2)
    expect(result.vocabularyProgress[0]).toMatchObject({ wordId: 'v-001', box: 1 })
  })

  it('test 9: legacy with empty vocabularyProgress: [] → migrated to empty with version: 2', () => {
    const legacyState = {
      version: 1,
      currentWeek: 3,
      startDate: '2026-02-01',
      completedTasks: ['task1'],
      testHistory: [],
      vocabularyProgress: [],
      grammarProgress: [],
    }
    localStorage.setItem('toeic-progress', JSON.stringify(legacyState))

    const result = loadAndMigrate()
    expect(result.version).toBe(2)
    expect(result.currentWeek).toBe(3)
    expect(result.completedTasks).toEqual(['task1'])
    expect(result.vocabularyProgress).toEqual([])
  })
})
