# Vocab Daily Batch + Review Schedule Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add per-topic daily batching (15 new words/day, same batch all day) and a 7-day review schedule timeline to the Vocabulary page.

**Architecture:** Two new state fields on `UserProgress` (`dailyBatchSize`, `topicBatches`) drive a new pure utility `getTopicBatch`. A new `getReviewSchedule` function in `useLeitnerBoxes` powers a new `ReviewSchedule` presentational component. The flashcard route wraps in a thin `BatchedFlashcardRoute` component that computes and saves the daily batch on mount.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4, Vitest + React Testing Library, localStorage via AppContext

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/types/index.ts` | Modify | Add `dailyBatchSize`, `topicBatches` to `UserProgress` |
| `src/context/AppContext.tsx` | Modify | Update `makeInitialProgress`, add 2 reducer actions |
| `src/utils/migrateVocabularyProgress.ts` | Modify | Backfill new fields in both `makeInitialProgress` and `migrateProgress`; backfill v2 sessions in `loadAndMigrate` |
| `src/utils/getTopicBatch.ts` | Create | Pure function: resolves today's word batch for a topic |
| `src/utils/__tests__/getTopicBatch.test.ts` | Create | 8 unit tests for batch resolution |
| `src/hooks/useLeitnerBoxes.ts` | Modify | Add `getReviewSchedule()` export |
| `src/hooks/__tests__/useLeitnerBoxes.test.ts` | Modify | 5 tests for `getReviewSchedule` |
| `src/components/ReviewSchedule.tsx` | Create | Presentational 7-day timeline component |
| `src/components/__tests__/ReviewSchedule.test.tsx` | Create | 4 render tests |
| `src/pages/Vocabulary/index.tsx` | Modify | `BatchedFlashcardRoute`, batch size input, topic badge, `ReviewSchedule` |

---

## Task 1: Update Types + Migration

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/context/AppContext.tsx`
- Modify: `src/utils/migrateVocabularyProgress.ts`

- [ ] **Step 1: Add new fields to `UserProgress` in `src/types/index.ts`**

Replace the `UserProgress` interface (currently lines 103-111):

```typescript
export interface UserProgress {
  currentWeek: number
  startDate: string
  completedTasks: string[]
  testHistory: TestResult[]
  vocabularyProgress: VocabularyProgress[]
  grammarProgress: GrammarProgress[]
  version: number
  dailyBatchSize: number
  topicBatches: Record<string, { date: string; startIndex: number }>
}
```

- [ ] **Step 2: Update `makeInitialProgress` in `src/context/AppContext.tsx`**

Replace the function (currently lines 5-15):

```typescript
function makeInitialProgress(): UserProgress {
  return {
    currentWeek: 1,
    startDate: new Date().toISOString().split('T')[0],
    completedTasks: [],
    testHistory: [],
    vocabularyProgress: [],
    grammarProgress: [],
    version: 2,
    dailyBatchSize: 15,
    topicBatches: {},
  }
}
```

- [ ] **Step 3: Update `makeInitialProgress` in `src/utils/migrateVocabularyProgress.ts`**

Replace the private function (currently lines 11-21):

```typescript
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
```

- [ ] **Step 4: Backfill new fields in `migrateProgress` return value**

In `src/utils/migrateVocabularyProgress.ts`, replace the return statement at the end of `migrateProgress` (currently lines 83-91):

```typescript
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
```

- [ ] **Step 5: Backfill v2 sessions that predate these fields in `loadAndMigrate`**

In `src/utils/migrateVocabularyProgress.ts`, update the v2 return block (currently lines 107-110) inside the first `try` block:

```typescript
      const v2Parsed = JSON.parse(v2Stored) as UserProgress
      if (v2Parsed.version === LATEST_VERSION) {
        return {
          ...v2Parsed,
          dailyBatchSize: v2Parsed.dailyBatchSize ?? 15,
          topicBatches: v2Parsed.topicBatches ?? {},
        }
      }
```

- [ ] **Step 6: Run type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Run full test suite**

```bash
npx vitest run --exclude '.worktrees/**'
```

Expected: all existing tests pass (148 tests).

- [ ] **Step 8: Commit**

```bash
git add src/types/index.ts src/context/AppContext.tsx src/utils/migrateVocabularyProgress.ts
git commit -m "feat(types): add dailyBatchSize and topicBatches to UserProgress"
```

---

## Task 2: Add Reducer Actions to AppContext

**Files:**
- Modify: `src/context/AppContext.tsx`

- [ ] **Step 1: Add 2 new action types to the `Action` union**

In `src/context/AppContext.tsx`, replace the `Action` type (currently lines 17-23):

```typescript
type Action =
  | { type: 'ADD_TEST_RESULT'; payload: TestResult }
  | { type: 'UPDATE_VOCAB_PROGRESS'; payload: VocabularyProgress }
  | { type: 'UPDATE_GRAMMAR_PROGRESS'; payload: GrammarProgress }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'SET_WEEK'; payload: number }
  | { type: 'LOAD'; payload: UserProgress }
  | { type: 'UPDATE_TOPIC_BATCH'; payload: { topicId: string; date: string; startIndex: number } }
  | { type: 'UPDATE_DAILY_BATCH_SIZE'; payload: number }
```

- [ ] **Step 2: Add 2 new cases to the `reducer` function**

In `src/context/AppContext.tsx`, add before the `default:` line in the reducer switch:

```typescript
    case 'UPDATE_TOPIC_BATCH':
      return {
        ...state,
        topicBatches: {
          ...state.topicBatches,
          [action.payload.topicId]: {
            date: action.payload.date,
            startIndex: action.payload.startIndex,
          },
        },
      }
    case 'UPDATE_DAILY_BATCH_SIZE':
      return { ...state, dailyBatchSize: Math.min(50, Math.max(5, action.payload)) }
```

- [ ] **Step 3: Run type check + tests**

```bash
npx tsc --noEmit && npx vitest run --exclude '.worktrees/**'
```

Expected: no errors, 148 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/context/AppContext.tsx
git commit -m "feat(context): add UPDATE_TOPIC_BATCH and UPDATE_DAILY_BATCH_SIZE actions"
```

---

## Task 3: TDD — getTopicBatch Utility

**Files:**
- Create: `src/utils/__tests__/getTopicBatch.test.ts`
- Create: `src/utils/getTopicBatch.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/utils/__tests__/getTopicBatch.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run tests to verify they all fail**

```bash
npx vitest run src/utils/__tests__/getTopicBatch.test.ts
```

Expected: FAIL with `Failed to resolve import "../getTopicBatch"`.

- [ ] **Step 3: Implement `src/utils/getTopicBatch.ts`**

```typescript
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
```

- [ ] **Step 4: Run tests to verify they all pass**

```bash
npx vitest run src/utils/__tests__/getTopicBatch.test.ts
```

Expected: 8 tests pass.

- [ ] **Step 5: Run full suite**

```bash
npx vitest run --exclude '.worktrees/**'
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/utils/getTopicBatch.ts src/utils/__tests__/getTopicBatch.test.ts
git commit -m "feat(utils): add getTopicBatch with daily batch resolution logic"
```

---

## Task 4: TDD — getReviewSchedule

**Files:**
- Modify: `src/hooks/__tests__/useLeitnerBoxes.test.ts`
- Modify: `src/hooks/useLeitnerBoxes.ts`

- [ ] **Step 1: Add failing tests to `src/hooks/__tests__/useLeitnerBoxes.test.ts`**

Append a new `describe` block at the end of the file:

```typescript
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
```

Also add `getReviewSchedule` to the import at the top of the test file. Current import line likely looks like:
```typescript
import { calculateNextBox, getNextReviewDate, isDueForReview, getWordsToReview, getBoxDistribution, LEITNER_INTERVALS } from '../useLeitnerBoxes'
```
Add `getReviewSchedule` to this import.

- [ ] **Step 2: Run tests to verify new ones fail**

```bash
npx vitest run src/hooks/__tests__/useLeitnerBoxes.test.ts
```

Expected: existing tests pass, new 5 tests FAIL with `getReviewSchedule is not a function`.

- [ ] **Step 3: Implement `getReviewSchedule` in `src/hooks/useLeitnerBoxes.ts`**

Add at the end of the file:

```typescript
export function getReviewSchedule(
  allProgress: VocabularyProgress[],
  daysAhead: number = 7
): Array<{ date: string; count: number }> {
  const today = getDateOnlyString(new Date())

  // Build the window: daysAhead entries starting from today
  const schedule = Array.from({ length: daysAhead }, (_, i) => {
    const d = new Date(Date.now() + i * 24 * 60 * 60 * 1000)
    return { date: getDateOnlyString(d), count: 0 }
  })

  const dateToIndex = new Map(schedule.map((s, i) => [s.date, i]))

  for (const p of allProgress) {
    const reviewDate = normalizeReviewDate(p.nextReview)
    if (!reviewDate) continue

    if (reviewDate <= today) {
      // Overdue → bucket into today
      schedule[0].count++
    } else {
      const idx = dateToIndex.get(reviewDate)
      if (idx !== undefined) {
        schedule[idx].count++
      }
    }
  }

  return schedule
}
```

- [ ] **Step 4: Run tests to verify all pass**

```bash
npx vitest run src/hooks/__tests__/useLeitnerBoxes.test.ts
```

Expected: all tests pass (existing 18 + new 5 = 23 tests).

- [ ] **Step 5: Run full suite**

```bash
npx vitest run --exclude '.worktrees/**'
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useLeitnerBoxes.ts src/hooks/__tests__/useLeitnerBoxes.test.ts
git commit -m "feat(hooks): add getReviewSchedule to useLeitnerBoxes"
```

---

## Task 5: TDD — ReviewSchedule Component

**Files:**
- Create: `src/components/__tests__/ReviewSchedule.test.tsx`
- Create: `src/components/ReviewSchedule.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/__tests__/ReviewSchedule.test.tsx`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ReviewSchedule } from '../ReviewSchedule'

const TODAY = new Date().toISOString().split('T')[0]

function makeDayDate(offsetDays: number): string {
  return new Date(Date.now() + offsetDays * 86400000).toISOString().split('T')[0]
}

describe('ReviewSchedule', () => {
  it('renders "Hôm nay" row with count and Ôn ngay button when today has words', () => {
    const schedule = [
      { date: TODAY, count: 5 },
      { date: makeDayDate(1), count: 0 },
      { date: makeDayDate(2), count: 0 },
      { date: makeDayDate(3), count: 0 },
      { date: makeDayDate(4), count: 0 },
      { date: makeDayDate(5), count: 0 },
      { date: makeDayDate(6), count: 0 },
    ]
    render(<ReviewSchedule schedule={schedule} onReviewToday={vi.fn()} />)
    expect(screen.getByText('Hôm nay')).toBeInTheDocument()
    expect(screen.getByText('5 từ')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Ôn ngay/i })).toBeInTheDocument()
  })

  it('renders future days with count > 0 and omits days with count 0', () => {
    const schedule = [
      { date: TODAY, count: 0 },
      { date: makeDayDate(1), count: 3 },
      { date: makeDayDate(2), count: 0 },
      { date: makeDayDate(3), count: 7 },
      { date: makeDayDate(4), count: 0 },
      { date: makeDayDate(5), count: 0 },
      { date: makeDayDate(6), count: 0 },
    ]
    render(<ReviewSchedule schedule={schedule} onReviewToday={vi.fn()} />)
    expect(screen.getByText('3 từ')).toBeInTheDocument()
    expect(screen.getByText('7 từ')).toBeInTheDocument()
    // Today is still shown even with 0 count (no Ôn ngay button though)
    expect(screen.getByText('Hôm nay')).toBeInTheDocument()
    // Days with 0 are omitted (can check no "0 từ" exists)
    expect(screen.queryByText('0 từ')).not.toBeInTheDocument()
  })

  it('shows empty message when all 7 days have count 0', () => {
    const schedule = Array.from({ length: 7 }, (_, i) => ({
      date: makeDayDate(i),
      count: 0,
    }))
    render(<ReviewSchedule schedule={schedule} onReviewToday={vi.fn()} />)
    expect(screen.getByText(/Không có từ nào cần ôn/i)).toBeInTheDocument()
  })

  it('calls onReviewToday when Ôn ngay button is clicked', () => {
    const onReviewToday = vi.fn()
    const schedule = [
      { date: TODAY, count: 3 },
      ...Array.from({ length: 6 }, (_, i) => ({ date: makeDayDate(i + 1), count: 0 })),
    ]
    render(<ReviewSchedule schedule={schedule} onReviewToday={onReviewToday} />)
    fireEvent.click(screen.getByRole('button', { name: /Ôn ngay/i }))
    expect(onReviewToday).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run tests to verify they all fail**

```bash
npx vitest run src/components/__tests__/ReviewSchedule.test.tsx
```

Expected: FAIL with `Failed to resolve import "../ReviewSchedule"`.

- [ ] **Step 3: Implement `src/components/ReviewSchedule.tsx`**

```typescript
const DAY_NAMES = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

interface ScheduleEntry {
  date: string
  count: number
}

interface Props {
  schedule: ScheduleEntry[]
  onReviewToday: () => void
}

function getDayLabel(dateStr: string): string {
  // Parse as local date to avoid UTC offset shifting the day
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return DAY_NAMES[date.getDay()]
}

export function ReviewSchedule({ schedule, onReviewToday }: Props) {
  const today = schedule[0]?.date ?? ''
  const hasAnyWords = schedule.some((d) => d.count > 0)

  if (!hasAnyWords) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-4 mb-6">
        <p className="text-[var(--text-secondary)] text-center text-sm">
          Không có từ nào cần ôn trong 7 ngày tới 🎉
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-4 mb-6">
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-3">📅 Lịch ôn tập</h3>
      <div className="space-y-2">
        {schedule.map((entry) => {
          const isToday = entry.date === today
          // Always show today; skip future days with 0 count
          if (!isToday && entry.count === 0) return null
          return (
            <div
              key={entry.date}
              className={`flex items-center gap-3 ${
                isToday
                  ? 'font-semibold text-[var(--accent)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <span className="w-20 text-sm shrink-0">
                {isToday ? 'Hôm nay' : getDayLabel(entry.date)}
              </span>
              <span className="flex-1 text-sm">{entry.count} từ</span>
              {isToday && entry.count > 0 && (
                <button
                  onClick={onReviewToday}
                  className="text-xs px-3 py-1 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] hover:brightness-110 font-medium shrink-0"
                >
                  Ôn ngay →
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they all pass**

```bash
npx vitest run src/components/__tests__/ReviewSchedule.test.tsx
```

Expected: 4 tests pass.

- [ ] **Step 5: Run full suite**

```bash
npx vitest run --exclude '.worktrees/**'
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/ReviewSchedule.tsx src/components/__tests__/ReviewSchedule.test.tsx
git commit -m "feat(components): add ReviewSchedule 7-day timeline component"
```

---

## Task 6: Wire Vocabulary/index.tsx

**Files:**
- Modify: `src/pages/Vocabulary/index.tsx`

This task replaces the existing `src/pages/Vocabulary/index.tsx` wholesale. The file is 145 lines; full replacement avoids partial-edit confusion. Read the current file first, then write the new version.

- [ ] **Step 1: Write the complete updated `src/pages/Vocabulary/index.tsx`**

```typescript
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
```

- [ ] **Step 2: Run type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Run full test suite**

```bash
npx vitest run --exclude '.worktrees/**'
```

Expected: all tests pass.

- [ ] **Step 4: Run production build**

```bash
npm run build
```

Expected: build succeeds; bundle stays approximately the same size (~1.2 MB unminified).

- [ ] **Step 5: Commit**

```bash
git add src/pages/Vocabulary/index.tsx
git commit -m "feat(vocabulary): add daily batch, topic badge, review schedule timeline"
```

---

## Final Verification

- [ ] Start dev server: `npm run dev`
- [ ] Go to `/vocabulary` — verify batch size input shows 15, topic buttons show `Flashcard · 15 từ`
- [ ] Click "Flashcard" on "Kinh doanh" — verify only 15 words show (not 150), counter shows `1/15`
- [ ] Rate a few words, then press back — go back into the same topic — verify same 15 words restart from word 1
- [ ] Change batch size input to 20 — click Flashcard on another topic — verify counter shows `1/20`
- [ ] Rate all 15 words in a session — return to topic list — verify button shows `✓ Hôm nay xong`
- [ ] Verify `ReviewSchedule` card appears between BoxDistributionCard and the topic list
- [ ] After rating words, verify `ReviewSchedule` updates with correct future dates
- [ ] Verify "Ôn ngay" button in ReviewSchedule navigates to review session
- [ ] Reload page — verify batch size and batch records persist (localStorage)
