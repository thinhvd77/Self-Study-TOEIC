# Content & Feature Audit — TOEIC Self-Study App

**Date:** 2026-04-10  
**Goal:** Audit and upgrade content + features to support TOEIC 550+ target  
**Scope:** Reading only (Part 5–7). Listening (Part 1–4) excluded — no audio files available.

---

## Context

Current state before this upgrade:
- Practice: only Part 5 enabled (20 câu); Part 6/7 disabled; Part 1–4 in data but not shown in UI
- Vocabulary: 8 topics × 100 words = 800 words
- Grammar: 8 lessons × 6 exercises = 48 exercises total
- Mini Test / Full Test: referenced in roadmap but not implemented

---

## Section 1: Practice Questions

### Target question counts

| Part | Real TOEIC | Current | Target |
|------|-----------|---------|--------|
| Part 5 (Fill-in blank) | 30 | 20 | **30** |
| Part 6 (Text completion) | 16 | 10 | **16** |
| Part 7 (Reading comprehension) | 54 | 10 | **48** |

Part 7 targets 48/54 (89%) — enough for meaningful practice without over-generating passages.

### Part 7 structure

- Single passage: 8 bài × 4 câu = 32 câu
- Double passage: 4 bộ × 4 câu = 16 câu
- Total: 48 câu

Single passages use the existing `passage` field. Double passages require a second text — add `passage2?: string` to the `Question` type in `src/types/index.ts`. `PracticeSession.tsx` renders `passage2` below `passage` when present, separated by a visual divider.

### UI changes — `src/pages/Practice/index.tsx`

- Remove Part 1–4 from `PARTS` array
- Enable Part 6 and Part 7: remove `disabled` flag, remove "coming soon" from description
- Import `part6Questions`, `part7Questions` and wire into `getQuestions()`
- Add Mini Test option (see Section 4)

---

## Section 2: Vocabulary

### Expand existing topics: 100 → 150 words each

| Topic file | Current | Target | Delta |
|-----------|---------|--------|-------|
| business.ts | 100 | 150 | +50 |
| office.ts | 100 | 150 | +50 |
| finance.ts | 100 | 150 | +50 |
| travel.ts | 100 | 150 | +50 |
| health.ts | 100 | 150 | +50 |
| technology.ts | 100 | 150 | +50 |
| hr.ts | 100 | 150 | +50 |
| manufacturing.ts | 100 | 150 | +50 |

### Add 4 new topics: 100 words each

| File | Topic | Reason |
|------|-------|--------|
| marketing.ts | Marketing | Advertisements, promotions — common in Part 7 |
| legal.ts | Legal | Contracts, agreements — common in Part 6–7 |
| real-estate.ts | Real Estate | Office/property rental — appears across all Parts |
| environment.ts | Environment | Sustainability topics — modern exam trend |

### Total: 8×150 + 4×100 = **1600 words**

### Data quality fix

`finance.ts` currently uses double quotes (`"id": "v-fin-001"`) while all other files use single quotes. Normalize to single quotes when adding new words.

### UI — `src/pages/Vocabulary/index.tsx`

Add 4 new topics to `allTopics` array.

---

## Section 3: Grammar

### Increase exercises: 6 → 10 per existing lesson

All 8 existing lessons (gram-01 through gram-08) get +4 exercises each (+32 total).

### Add 5 new lessons

| ID | Title | Focus |
|----|-------|-------|
| gram-09 | Articles (a/an/the/Ø) | Most common error type in Part 5 |
| gram-10 | Gerunds vs Infinitives | to do / doing confusion |
| gram-11 | Subject-Verb Agreement | Singular/plural, intervening clauses |
| gram-12 | Pronouns | Subject/object/possessive, reflexive, indefinite |
| gram-13 | Word Order | Adverb placement, fronted adverbials, inversion |

Each new lesson: full Markdown content + 10 exercises.

### UI — `src/pages/Grammar/index.tsx`

Import and register gram-09 through gram-13 in the lessons list. No logic changes needed.

---

## Section 4: Features

### Mini Test

- **Composition:** Part 5 (30) + Part 6 (16) + Part 7 subset (16) = **62 câu**
- **Time:** 45 minutes
- **Implementation:** Shuffle + slice from existing question pools — no separate data file needed
- **Route:** `/practice/session?mode=mini`
- `PracticeSession.tsx` receives questions via prop — Mini Test just passes a different set

### Roadmap updates — `src/data/roadmap.ts`

Replace Listening-part targets with Reading equivalents:

| Week | Old target | New target |
|------|-----------|-----------|
| w3-3 | `part:1` (Listening Part 1) | `part:6` (Reading Part 6 intro) |
| w5-3 | `part:3` (Listening Part 3) | `part:7` (Part 7 single passage) |
| w6-3 | `part:4` (Listening Part 4) | `part:7` (Part 7 double passage) |

Mini Test and Full Test references (Week 8, 10, 11, 12, 13, 14, 15, 16) remain — they will work once Mini Test is implemented.

---

## Implementation Order

1. **Practice UI** — Enable Part 6/7, remove Listening parts, add Mini Test button
2. **Part 5 questions** — Add 10 new questions (20→30)
3. **Part 6 questions** — Add 6 new questions (10→16)
4. **Part 7 questions** — Add `passage2?: string` to `Question` type; add 38 new questions (10→48), structured as single + double passages; update `PracticeSession.tsx` to render `passage2` when present
5. **Vocabulary expansion** — 8 existing topics +50 words each
6. **Vocabulary new topics** — 4 new files × 100 words
7. **Grammar exercises** — 8 existing lessons +4 exercises each
8. **Grammar new lessons** — 5 new lesson files (gram-09 to gram-13)
9. **Mini Test** — Wire up in Practice page
10. **Roadmap** — Update Listening references to Reading

---

## Success Criteria

- [ ] All 3 Reading Parts accessible and functional in Practice page
- [ ] Part 5: 30 câu | Part 6: 16 câu | Part 7: 48 câu
- [ ] Vocabulary: 1600 words across 12 topics
- [ ] Grammar: 13 lessons, 10 exercises each
- [ ] Mini Test: 62 câu, 45 min timer, scores correctly
- [ ] Roadmap tasks reference valid Part targets
- [ ] `npm test` passes | `npm run build` succeeds
