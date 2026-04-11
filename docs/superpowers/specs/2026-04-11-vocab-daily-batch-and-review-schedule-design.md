# Design: Daily Batch Learning + Review Schedule Timeline

**Date:** 2026-04-11
**Status:** Approved
**Scope:** Vocabulary learning UX improvement — two independent features delivered together

## Context

Current pain points:
1. Entering a topic loads all 150 words — user must go through all from the beginning every session
2. Leitner boxes schedule reviews but there is no visibility into when words are due

## Goals

1. **Daily batch:** Each topic delivers a fixed number of new words per day. Returning mid-day shows the same words (not a fresh set). Next day advances to the next batch.
2. **Review schedule:** Simple 7-day timeline showing how many words are due each day — placed on the Vocabulary index page.

## Out of Scope

- Cross-topic unified queue
- Settings page (batch size is a single inline input)
- Notification/reminder system
- Batch for review words (review session remains unchanged)

---

## Data Model Changes

### `src/types/index.ts`

Add two fields to `UserProgress`:

```typescript
dailyBatchSize: number
// Default: 15. User-editable via inline input on Vocabulary page.

topicBatches: Record<string, {
  date: string        // YYYY-MM-DD — the day this batch was created
  startIndex: number  // Index in the topic's word array where this batch starts
}>
// Key: topic id (e.g. "business", "office")
// One entry per topic. Overwritten each new day.
```

### Migration

`makeInitialProgress()` sets `dailyBatchSize: 15`, `topicBatches: {}`.

The existing `migrateVocabularyProgress.ts` `migrateProgress()` backfills both fields for legacy sessions (users who already have data): coerce `undefined → 15` and `undefined → {}`.

---

## Feature 1: Daily Batch Per Topic

### Batch resolution logic

New pure function in `src/utils/getTopicBatch.ts`:

```typescript
getTopicBatch(
  topicId: string,
  words: VocabularyWord[],
  vocabularyProgress: VocabularyProgress[],
  topicBatches: Record<string, { date: string; startIndex: number }>,
  dailyBatchSize: number
): {
  batch: VocabularyWord[]
  isComplete: boolean
  newBatchRecord: { date: string; startIndex: number } | null  // non-null = caller must dispatch
}
```

**Algorithm:**

1. If `topicBatches[topicId]?.date === today` → use saved `startIndex`. Return `{ batch: words.slice(startIndex, startIndex + dailyBatchSize), isComplete: false, newBatchRecord: null }`.
2. Otherwise (new day or no record yet):
   - Find `startIndex` = first index in `words[]` where the word has no `VocabularyProgress` record or `correctCount === 0`.
   - Return `{ batch: words.slice(startIndex, startIndex + dailyBatchSize), isComplete: false, newBatchRecord: { date: today, startIndex } }`.
   - **Caller** (Vocabulary/index.tsx) checks `newBatchRecord !== null` and dispatches `UPDATE_TOPIC_BATCH`.
3. If no unlearned word found (entire topic has been learned): return all words in the topic that are due for review today (`isDueForReview`). If none due either, return `{ batch: [], isComplete: true, newBatchRecord: null }`.

**`isComplete`** flag is `true` only when all words in topic have been learned (have a progress record with `correctCount > 0`). Used by UI to show "Đã học hết topic này 🎉".

### AppContext changes

New reducer action:

```typescript
{ type: 'UPDATE_TOPIC_BATCH'; payload: { topicId: string; date: string; startIndex: number } }
```

Merges into `progress.topicBatches[topicId]`.

### FlashcardSession changes

`FlashcardSession` receives its word list via the existing `getWords` prop. The caller (`Vocabulary/index.tsx`) changes how it computes this list — `FlashcardSession` itself does not change.

In `Vocabulary/index.tsx`, replace the direct `getWordsByTopic` call with `getTopicBatch(...)` when navigating to the flashcard route. Pass the resulting `batch` as the word list.

### Topic card UI changes (`Vocabulary/index.tsx`)

Each topic card's "Flashcard" button gains a badge showing today's batch status:

- **Default:** `Flashcard · 15 từ hôm nay` (count from `dailyBatchSize`)
- **Already completed today** (all batch words have been rated today): `✓ Hôm nay xong` — button still clickable but styled differently (muted, not disabled — user may want to review anyway)
- **Topic fully learned:** `🎉 Đã học hết` — button muted

"Completed today" check: all words in the batch for this topic have a `lastReviewed === today` record.

### Batch size setting

At the top of the `TopicSelection` component, above the stats card:

```
Số từ mới mỗi ngày: [15 ▲▼]
```

- `<input type="number" min={5} max={50}>` bound to `progress.dailyBatchSize`
- `onChange` dispatches `UPDATE_DAILY_BATCH_SIZE` action
- Clamp to `[5, 50]` on save

New reducer action:

```typescript
{ type: 'UPDATE_DAILY_BATCH_SIZE'; payload: number }
```

---

## Feature 2: Review Schedule Timeline

### Data computation

New pure function in `src/hooks/useLeitnerBoxes.ts`:

```typescript
getReviewSchedule(
  allProgress: VocabularyProgress[],
  daysAhead: number = 7
): Array<{ date: string; count: number }>
```

- Iterates `allProgress`, groups by `nextReview` date (normalized to `YYYY-MM-DD`)
- Returns 7 entries — one per day from today through today+6
- Days with 0 words are included for today, omitted for future days
- Words with `nextReview` before today (overdue) are counted in today's bucket

### New component

`src/components/ReviewSchedule.tsx` — named export, presentational (no AppContext dependency):

```typescript
interface Props {
  schedule: Array<{ date: string; count: number }>
  onReviewToday: () => void   // navigates to /vocabulary/review
}
```

**Render:**

```
📅 Lịch ôn tập
─────────────────────────────
Hôm nay      ██████  5 từ   [Ôn ngay →]   ← accent color, bold; button shown only if count > 0
Ngày mai             8 từ
Thứ Tư               3 từ
Thứ Năm             12 từ
Thứ Bảy              7 từ
Chủ Nhật             2 từ
─────────────────────────────
```

- Future days with `count === 0` are omitted
- If all 7 days have `count === 0`: show "Không có từ nào cần ôn trong 7 ngày tới 🎉"
- Day names in Vietnamese: Thứ Hai … Chủ Nhật; today always shown as "Hôm nay"

### Integration

In `Vocabulary/index.tsx` `TopicSelection`:

```typescript
const schedule = useMemo(
  () => getReviewSchedule(progress.vocabularyProgress),
  [progress.vocabularyProgress]
)
```

Placed between `BoxDistributionCard` and the topic list (after the review button if it exists).

---

## Files to Create / Modify / Delete

### Create

| Path | Purpose |
|------|---------|
| `src/utils/getTopicBatch.ts` | Pure batch resolution logic |
| `src/utils/__tests__/getTopicBatch.test.ts` | Unit tests for batch logic |
| `src/components/ReviewSchedule.tsx` | Review timeline component |
| `src/components/__tests__/ReviewSchedule.test.tsx` | Render tests |

### Modify

| Path | Change |
|------|--------|
| `src/types/index.ts` | Add `dailyBatchSize`, `topicBatches` to `UserProgress` |
| `src/context/AppContext.tsx` | Add `UPDATE_TOPIC_BATCH`, `UPDATE_DAILY_BATCH_SIZE` actions; update `makeInitialProgress()` |
| `src/utils/migrateVocabularyProgress.ts` | Backfill new fields for legacy sessions |
| `src/hooks/useLeitnerBoxes.ts` | Add `getReviewSchedule()` |
| `src/hooks/__tests__/useLeitnerBoxes.test.ts` | Tests for `getReviewSchedule()` |
| `src/pages/Vocabulary/index.tsx` | Batch size input, topic badge, ReviewSchedule component, batch-aware navigation |

### Delete

None.

---

## Test Plan

### `getTopicBatch.test.ts` (~8 cases)

- No existing progress → startIndex = 0, returns first N words
- Partial progress → startIndex = first unlearned word
- Today's batch already set → same startIndex returned regardless of progress changes
- New day → recalculates startIndex
- All words learned, none due → `isComplete: true`, empty batch
- All words learned, some due → returns due words
- `dailyBatchSize` larger than remaining unlearned words → clamps to remaining
- Empty topic → `isComplete: true`, empty batch

### `useLeitnerBoxes.test.ts` additions (~5 cases)

- `getReviewSchedule` with mixed future dates → correct counts per day
- Overdue words count toward today
- Days with 0 count omitted (except today)
- Empty progress → all zeros
- 7-day window boundary

### `ReviewSchedule.test.tsx` (~4 cases)

- Renders "Hôm nay" row with correct count and "Ôn ngay" button
- Future days with count > 0 render; days with count = 0 omitted
- Empty schedule → shows "Không có từ nào..." message
- `onReviewToday` called when "Ôn ngay" clicked

---

## Verification Criteria

1. Enter a topic → see only `dailyBatchSize` words (not 150)
2. Stop halfway, return → same batch starts from word 1
3. Next day → batch advances to next unlearned slice
4. Batch size input updates immediately, persists across reload
5. Topic card badge shows correct status (default / hoàn thành / đã học hết)
6. Review timeline shows correct day-by-day counts
7. "Ôn ngay" button on timeline navigates to review session
8. Overdue words appear in "Hôm nay" bucket
9. All tests pass; build succeeds
