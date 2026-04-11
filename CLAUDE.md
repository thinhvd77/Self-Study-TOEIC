# TOEIC Self-Study Web App

## Project Overview

App luyện thi TOEIC cá nhân, trình độ hiện tại dưới 400, mục tiêu 550+ trong 4 tháng. Single user, no backend. Nội dung bằng tiếng Việt.

4 tính năng chính: Luyện đề thi (Part 1-7), Từ vựng Flashcard (SM-2 spaced repetition), Ngữ pháp (bài học + bài tập), Dashboard lộ trình 16 tuần.

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v4 (`@import "tailwindcss"` in CSS, `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- React Router v6
- Recharts (charts)
- Vitest + React Testing Library + jsdom (testing)
- LocalStorage for persistence

## Commands

```bash
npm run dev          # Start dev server (port 5173)
npm run build        # Production build (verified ✓)
npm test             # Run all tests (verified ✓)
npx vitest run src/path/to/test.ts  # Run specific test
npx vitest run --exclude '.worktrees/**'  # Run main src tests only (clean output during feature branches)
npx vitest run .worktrees/<branch>/src/  # Test specific worktree
npm test --prefix ".worktrees/<branch>"  # Run full suite in a specific worktree without cd
```

Commits: Use `feat: ` for features, `fix: ` for bug fixes, `chore: ` for setup/tooling

## Architecture

```
src/
├── types/index.ts              # All TypeScript interfaces
├── data/
│   ├── tests/                  # part1.ts, part3.ts, part4.ts, part5.ts, part6.ts, part7.ts
│   ├── vocabulary/             # 8 topics: business, finance, health, hr, manufacturing, office, technology, travel (150 words each)
│   ├── grammar/                # 8 lessons: parts-of-speech, verb-tenses, comparatives, conditionals, conjunctions, passive-voice, prepositions, relative-pronouns
│   ├── __tests__/              # crawled-vocabulary, dataset-quality, practice-data-coverage, roadmap-data-alignment, task2-data, vocabulary-data
│   └── roadmap.ts              # 16-week roadmap data
├── hooks/
│   ├── useLocalStorage.ts      # Persist state to localStorage
│   ├── useTimer.ts             # Countdown timer with start/pause/reset
│   └── useSpacedRepetition.ts  # SM-2 algorithm for vocab review
├── context/AppContext.tsx       # Global state: React Context + useReducer
├── components/
│   ├── Layout.tsx              # Main layout (nav + content)
│   ├── Timer.tsx               # Timer display component
│   ├── AudioPlayer.tsx         # Audio player for Listening parts
│   ├── QuestionCard.tsx        # Multiple choice question display
│   ├── Flashcard.tsx           # Flip flashcard component
│   ├── ProgressBar.tsx         # Progress indicator
│   └── QuestionNav.tsx         # Question navigation panel
├── pages/
│   ├── Dashboard/index.tsx     # Roadmap, score chart, stats, weak areas (Task 9 ✅)
│   ├── Practice/index.tsx      # Part selection (Task 6 ✅)
│   ├── Practice/PracticeSession.tsx  # Active test session (Task 6 ✅)
│   ├── Practice/PracticeResult.tsx   # Score + review answers (Task 6 ✅)
│   ├── Vocabulary/index.tsx    # Topic list with stats & topic selection (Task 7 ✅)
│   ├── Vocabulary/FlashcardSession.tsx  # Flashcard study with SM-2 spaced repetition (Task 7 ✅)
│   ├── Vocabulary/VocabQuiz.tsx       # Vocabulary quiz with auto-generated questions (Task 7 ✅)
│   ├── Grammar/index.tsx       # Lesson list (Task 8 ✅)
│   └── Grammar/LessonView.tsx  # Lesson content + exercises (Task 8 ✅)
├── utils/scoring.ts            # TOEIC scoring helpers
├── App.tsx                     # Router setup
└── main.tsx                    # Entry point
public/
└── audio/                      # Audio files for Listening (Part 1-4)
```

## Key Data Types

```typescript
// Practice: Question (optional passage2 for double-passage Part 7), TestResult, AnswerRecord
// Vocabulary: VocabularyWord, VocabularyProgress
// Grammar: GrammarLesson, GrammarExercise, GrammarProgress
// Roadmap: RoadmapWeek, RoadmapTask
// State: UserProgress (currentWeek, startDate, completedTasks, testHistory, vocabularyProgress, grammarProgress)
```

All types defined in `src/types/index.ts`.

## Key Patterns

- **State**: React Context + useReducer, no Redux. Single `AppContext` manages all user progress.
- **Data**: Static TS files in `src/data/`, imported directly. No API calls.
- **Persistence**: All progress auto-saved to LocalStorage via AppContext on state changes.
- **useReducer + localStorage**: Load from localStorage in the lazy initializer (3rd arg to `useReducer`), persist via `useEffect`. See `AppContext.tsx` for reference pattern.
- **Routing**: 4 main routes: `/` (Dashboard), `/practice` (Practice), `/vocabulary` (Vocabulary), `/grammar` (Grammar).
- **Spaced Repetition**: SM-2 algorithm in `useSpacedRepetition`. Vocab rated as "Chưa biết" (quality 1) / "Hơi biết" (3) / "Biết rồi" (5).
- **TypeScript gotchas**: When iterating `Record<number, ...>` with `for...in`, cast key to number: `for (const k in obj) { const num = Number(k); ... }`. Avoid `new Date()` at module level for timestamp state — use factory function `() => ({ date: new Date().toISOString().split('T')[0] })`
- **React/useMemo gotcha**: Direct function calls in render body create new references each render (e.g., `getWords(topic)` returns `[]`). Always wrap derived state in `useMemo` if it's a dependency for other memos. Failure silently invalidates downstream memos and can corrupt quiz state (e.g., re-shuffled options don't match stored answers).
- **Grammar lesson content**: Stored as Markdown in `src/data/grammar/*.ts` (e.g., `##` headers, `**bold**`, `-` lists). Render with `react-markdown`, not raw `dangerouslySetInnerHTML` with `.replace(/\n/g, '<br/>')`.
- **Progress/percentage clamping**: Wrap computed progress values with `Math.min(100, Math.max(0, ...))` to handle edge cases where corrupted localStorage or invalid state produces negative or > 100 values.
- **Derived stats memoization**: Wrap all derived stats calculations (vocab counts, grammar counts, test counts, chart data transformations) in `useMemo` with specific array dependencies to prevent recomputation on every context update. Example: `useMemo(() => progress.vocabularyProgress.filter(...).length, [progress.vocabularyProgress])`.
- **VocabQuiz render guards**: `VocabQuiz.tsx` returns results view when `isSubmitted && currentIndex === questions.length` (line 70) before accessing `questions[currentIndex]` (line 90). The early return safely guards against out-of-bounds access — don't remove this guard as it protects the subsequent render logic.

## Vocabulary Data Pattern

Every vocabulary file exports `const topicVocabulary: VocabularyWord[] = [...]` with 100–150 words. Structure per entry: `id` (sequential v-XXX-001..N), `word`, `ipa` (American English only, `/.../ format`), `meaning` (Vietnamese, ≤70 chars for office/finance), `partOfSpeech` (noun|verb|adjective|adverb|preposition|conjunction), `example` (business context), `topic` (exact match), optional `synonyms`. POS target: ~15–20% verbs, ~10–15% adjectives, rest nouns. After writing, register in `src/pages/Vocabulary/index.tsx` `allTopics` and in `src/data/__tests__/vocabulary-data.test.ts` `allVocabulary` with `expectedCount` field.

## IPA Standardization (American English)

All IPA must use General American English. Key fixes: `/ɒ/` → `/ɑː/` (contract, policy, toxic); `/ɒ/` → `/ɔː/` when before r (deforestation); `/tj/` cluster (British yod-forming) → yod-dropped (stewardship `/ˈstuːərdʒɪp/` not `/ˈstjuːərdʒɪp/`); `/njuː/` → `/nuː/` in General American (renewable, neutral).
- IPA rule applies to grammar lesson prose/examples too: use General American forms (e.g., "honor" `/ˈɑnər/`, not `/ɒ/`).

## Practice Modes

- **Luyện theo Part**: Single part, optional timer (Part 5, 6, 7 enabled; Part 1-4 require audio files)
- **Mini Test**: ~30 min, mix of parts (enabled)
- **Full Test**: 120 min, 200 questions (simulates real TOEIC)

Features during practice: countdown timer, bookmark uncertain questions, question navigation panel, audio player (Part 1-4) with speed control.

## Style Guide

- Vietnamese for all UI text and content
- Tailwind utility classes, no custom CSS unless necessary
- Components use named exports, pages use default exports
- Tailwind v4: use `@import "tailwindcss"` in CSS (no PostCSS config needed, uses Vite plugin)

## Testing

- Unit tests for hooks and utility functions
- Tests in `__tests__/` directories adjacent to source files
- Use `vi.fn()`, `vi.useFakeTimers()` for mocking
- Test setup: `src/test/setup.ts` imports `@testing-library/jest-dom`
- Vitest config: jsdom environment, globals enabled
- TDD workflow: Create test first, verify fails with `npx vitest run src/path/to/test.ts`, implement, verify passes
- `npm test` runs 86 tests across 10 test files (main src). Note: `npm test` also picks up tests from `.worktrees/` — in-progress worktree work may show failures; this is expected.
- To run only main src tests without worktree noise: `npx vitest run --exclude '.worktrees/**'`

## Vocabulary Testing Constraints

- Office + finance: every example must contain one of (company|team|meeting|project|client|manager|department|report|policy|employee)
- Office + finance: meanings ≤ 70 chars
- Cross-topic duplicates (business/hr/manufacturing/office/finance): ≤ 20 total
- Grammar lesson content: ≥ 1800 characters (depth gate for consistency with gram-01)
- Grammar expansion gotcha: when increasing lesson exercise counts, update matching expectations in `src/data/__tests__/task2-data.test.ts`.

## Verification Criteria

1. Dev server runs, 4 routes work
2. Practice: can complete Part 5 questions with sample data, shows score + answer review
3. Vocabulary: flashcards display correctly, spaced repetition schedules reviews
4. Grammar: lessons render content, exercises score correctly
5. Dashboard: roadmap shows current week, chart renders with data
6. LocalStorage: progress survives page reload
7. Responsive: works on desktop and mobile
8. Build: `npm run build` produces ~670 kB bundle (expected with Recharts + react-markdown); chunk size warning is not actionable

## Implementation Status

All core features complete (Tasks 1–10): project setup, types/data, hooks, context, layout, practice, vocabulary, grammar, dashboard, E2E verification. Active development continues via git worktrees for content and feature upgrades.
