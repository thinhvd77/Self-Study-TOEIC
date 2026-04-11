import { UserProgress, VocabularyProgress } from '../types'

// Constants
export const CURRENT_STORAGE_KEY = 'toeic-progress-v2'
export const LEGACY_STORAGE_KEY = 'toeic-progress'
export const LATEST_VERSION = 2

/**
 * Creates a fresh initial UserProgress state with version 2
 */
function makeInitialProgress(): UserProgress {
  return {
    currentWeek: 1,
    startDate: new Date().toISOString().split('T')[0],
    completedTasks: [],
    testHistory: [],
    vocabularyProgress: [],
    grammarProgress: [],
    version: LATEST_VERSION,
    dailyBatchSize: 15,
    topicBatches: {},
  }
}

/**
 * Maps legacy level (0-5, or out of bounds) to SM-2 box (1-5)
 * Logic: clamp to 0-5, then map via [1, 1, 2, 3, 4, 5]
 */
export function mapLevelToBox(level: number): 1 | 2 | 3 | 4 | 5 {
  const clamped = Math.max(0, Math.min(5, Math.floor(level)))
  const MAP = [1, 1, 2, 3, 4, 5]
  return MAP[clamped] as 1 | 2 | 3 | 4 | 5
}

/**
 * Migrates legacy UserProgress (version 1) to version 2
 * - Transforms vocabulary progress: level → box
 * - Keeps all other fields unchanged
 * - Returns fresh state if validation fails
 */
export function migrateProgress(raw: unknown): UserProgress {
  // Validate raw is an object with vocabularyProgress array
  if (
    typeof raw !== 'object' ||
    raw === null ||
    !Array.isArray((raw as Record<string, unknown>).vocabularyProgress)
  ) {
    return makeInitialProgress()
  }

  const legacy = raw as Record<string, unknown>

  // Transform vocabulary progress: level → box
  const vocabularyProgress: VocabularyProgress[] = []
  if (Array.isArray(legacy.vocabularyProgress)) {
    for (const record of legacy.vocabularyProgress) {
      if (typeof record === 'object' && record !== null) {
        const rec = record as Record<string, unknown>
        const level = typeof rec.level === 'number' ? rec.level : 0
        const wordId = typeof rec.wordId === 'string' ? rec.wordId : ''
        const lastReviewed = typeof rec.lastReviewed === 'string' ? rec.lastReviewed : ''
        const nextReview = typeof rec.nextReview === 'string' ? rec.nextReview : ''
        const correctCount = typeof rec.correctCount === 'number' ? rec.correctCount : 0
        const incorrectCount = typeof rec.incorrectCount === 'number' ? rec.incorrectCount : 0

        vocabularyProgress.push({
          wordId,
          box: mapLevelToBox(level),
          lastReviewed,
          nextReview,
          correctCount,
          incorrectCount,
        })
      }
    }
  }

  // Keep other fields unchanged
  const currentWeek = typeof legacy.currentWeek === 'number' ? legacy.currentWeek : 1
  const startDate = typeof legacy.startDate === 'string' ? legacy.startDate : ''
  const completedTasks = Array.isArray(legacy.completedTasks) ? legacy.completedTasks : []
  const testHistory = Array.isArray(legacy.testHistory) ? legacy.testHistory : []
  const grammarProgress = Array.isArray(legacy.grammarProgress) ? legacy.grammarProgress : []

  return {
    currentWeek,
    startDate,
    completedTasks,
    testHistory,
    vocabularyProgress,
    grammarProgress,
    version: LATEST_VERSION,
    dailyBatchSize: typeof legacy.dailyBatchSize === 'number' ? legacy.dailyBatchSize : 15,
    topicBatches:
      typeof legacy.topicBatches === 'object' &&
      legacy.topicBatches !== null &&
      !Array.isArray(legacy.topicBatches)
        ? (legacy.topicBatches as Record<string, { date: string; startIndex: number }>)
        : {},
  }
}

/**
 * Loads and migrates user progress from localStorage
 * Flow:
 * 1. Try read v2 key. If parse OK and version === 2 → return as-is
 * 2. Try read legacy key. If parse OK and has vocabularyProgress array → migrate → write to v2 key → return
 * 3. Neither exists → return fresh state with version 2
 * 4. JSON.parse errors wrapped in try/catch → fresh state
 */
export function loadAndMigrate(): UserProgress {
  // Step 1: Try v2 key
  try {
    const v2Stored = localStorage.getItem(CURRENT_STORAGE_KEY)
    if (v2Stored) {
      const v2Parsed = JSON.parse(v2Stored) as UserProgress
      if (v2Parsed.version === LATEST_VERSION) {
        return {
          ...v2Parsed,
          dailyBatchSize: v2Parsed.dailyBatchSize ?? 15,
          topicBatches: v2Parsed.topicBatches ?? {},
        }
      }
    }
  } catch {
    // v2 parse failed, fall through to legacy check
  }

  // Step 2: Try legacy key
  try {
    const legacyStored = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (legacyStored) {
      const legacyParsed = JSON.parse(legacyStored) as unknown
      // Validate it has vocabularyProgress array
      if (
        typeof legacyParsed === 'object' &&
        legacyParsed !== null &&
        Array.isArray((legacyParsed as Record<string, unknown>).vocabularyProgress)
      ) {
        // Migrate and write to v2 key
        const migrated = migrateProgress(legacyParsed)
        localStorage.setItem(CURRENT_STORAGE_KEY, JSON.stringify(migrated))
        return migrated
      }
    }
  } catch {
    // Legacy parse failed, fall through to fresh state
  }

  // Step 3: Neither exists or validation failed → fresh state
  return makeInitialProgress()
}
