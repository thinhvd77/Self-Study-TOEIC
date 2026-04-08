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
```

Commits: Use `feat: ` for features, `fix: ` for bug fixes, `chore: ` for setup/tooling

## Architecture

```
src/
├── types/index.ts              # All TypeScript interfaces
├── data/
│   ├── tests/part5.ts          # Part 5 questions (and part6.ts, part7.ts)
│   ├── vocabulary/business.ts  # Vocab by topic (business, office, finance, travel, health, technology, hr, manufacturing)
│   ├── grammar/parts-of-speech.ts  # Lessons (parts-of-speech, verb-tenses, ...)
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
// Practice: Question, TestResult, AnswerRecord
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

## Practice Modes

- **Luyện theo Part**: Single part, optional timer
- **Mini Test**: ~30 min, mix of parts
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
- `npm test` runs 31 tests: useLocalStorage 4, useTimer 4, useSpacedRepetition 5, scoring 3, data verification 15

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

**Task 1: Project Setup** ✅ Complete (branch: `task-1-implementation`)
- Vite + React 18 + TypeScript scaffold
- Tailwind CSS v4 via `@tailwindcss/vite`
- React Router v6 with placeholder routes
- Vitest + Testing Library configured
- All deps aligned, npm audit clean

**Task 2: Types & Sample Data** ✅ Complete (commit: `ca61522`)
- Added domain types in `src/types/index.ts`
- Added sample data in `src/data/tests/part5.ts`, `src/data/vocabulary/business.ts`, `src/data/grammar/parts-of-speech.ts`, and `src/data/roadmap.ts`
- Added data verification tests in `src/data/__tests__/task2-data.test.ts`

**Task 3: Custom Hooks** ✅ Complete (branch: `task-1-implementation`)
- Added `src/hooks/useLocalStorage.ts`, `src/hooks/useTimer.ts`, and `src/hooks/useSpacedRepetition.ts`
- Added hook tests in `src/hooks/__tests__/useLocalStorage.test.ts`, `src/hooks/__tests__/useTimer.test.ts`, and `src/hooks/__tests__/useSpacedRepetition.test.ts`
- Implemented timer pause/resume/reset + `initialSeconds` resync behavior in `useTimer`
- Implemented spaced repetition utilities with interval mapping `[1, 1, 2, 4, 7, 14]`, level cap at 5, and day-granularity due checks

**Task 4: App Context & Scoring Utility** ✅ Complete
- `src/context/AppContext.tsx`: React Context + useReducer, localStorage key `toeic-progress`
- `src/utils/scoring.ts`: `calculateToeicScore` (proportional, max 495 per section), `getPartAccuracy`

**Task 5: Layout & Shared Components** ✅ Complete
- All components in `src/components/` created and integrated
- `src/App.tsx` now uses `AppProvider` + `Layout` with nested routes

**Task 6: Practice Page - Part Selection & Quiz Session** ✅ Complete (commit: `c831846`)
- Created `src/pages/Practice/index.tsx` with part selection UI (Part 5 enabled, 6&7 disabled)
- Created `src/pages/Practice/PracticeSession.tsx` with timer, bookmarks, question navigation, auto-submit on time-up
- Created `src/pages/Practice/PracticeResult.tsx` with score display and ProgressBar
- Updated `src/App.tsx` to import real PracticePage component
- **Implementation detail**: Used `useRef` for `answers` and `submitted` state in PracticeSession to prevent stale closure bugs in timer callback

**Task 7: Vocabulary Page - Flashcard & Quiz** ✅ Complete (commit: `0421f2a`)
- Created `src/pages/Vocabulary/index.tsx` with topic selection, stats (learned/due-for-review/retention%), progress bar, "Ôn tập hôm nay" button
- Created `src/pages/Vocabulary/FlashcardSession.tsx` with Flashcard flip UI, SM-2 spaced repetition dispatch, review session support
- Created `src/pages/Vocabulary/VocabQuiz.tsx` with auto-generated multiple-choice, forward/back navigation, submit & results
- Updated `src/App.tsx` to import real VocabularyPage component
- **Architectural pattern**: Vocabulary topics are designed to scale — `allTopics` array in index.tsx aggregates all topics; pass `allWords` prop to `FlashcardSession` for review mode to support future topics (business, office, finance, etc.)
- **React patterns**: Use `useMemo` for derived state that depends on function results (e.g., `words` from `getWords(topic)`) to prevent dependency invalidation and re-shuffling; disable interactive buttons after submission to prevent unexpected navigation
- **Quality checks**: learnedCount should filter by `correctCount > 0`, not raw array length, to avoid inflating stats with words rated "Chưa biết"

**Task 8: Grammar Page - Lessons & Exercises** ✅ Complete (commits: `d820d42`, `f488545`)
- Created `src/pages/Grammar/index.tsx` with lesson list, progress bar, per-lesson score display, and navigation
- Created `src/pages/Grammar/LessonView.tsx` with Markdown lesson content, examples, exercise mode with per-question navigation, submit, results, and `UPDATE_GRAMMAR_PROGRESS` dispatch
- Updated `src/App.tsx` to import real GrammarPage component, replaced inline stub
- **Key learning**: Grammar lesson content is Markdown-formatted; code review caught that initial `dangerouslySetInnerHTML` with only `\n → <br/>` broke Markdown rendering. Fixed by adding `react-markdown` dependency.

**Task 9: Dashboard Page - Roadmap, Stats & Charts** ✅ Complete (commit: `39682cb`)
- Created `src/pages/Dashboard/index.tsx` with roadmap tracker (current phase/week, phase progress bar, current week tasks with ✓/○ checkmarks), stats grid (vocab learned, grammar completed, tests done, vocab retention %), score chart (Recharts LineChart), and weakness analysis (lowest-accuracy Part)
- Updated `src/App.tsx` to import real DashboardPage component, removed inline stub
- **Quality improvements**: (1) Vocab learned count filters by `correctCount > 0` per Task 7 guideline; (2) `phaseProgress` clamped to [0, 100] to handle corrupted localStorage; (3) All expensive derived stats (`totalVocabLearned`, `grammarCompleted`, `chartData`, `weakestPart`) wrapped in `useMemo` with specific dependencies to prevent unnecessary recomputation on every context update
- **Code review pattern**: Two-stage review (spec compliance → code quality) caught real issues: raw array length for vocab count and missing memoization for expensive calculations

**Task 10: End-to-End Verification & Polish** ✅ Complete
- Ran full test suite: 31/31 tests pass (5 test files)
- Ran production build: succeeds with no errors (~670 kB bundle with Recharts + react-markdown)
- Verified git status: clean working tree, all changes committed
- No issues found requiring fixes
- **Verification note**: Bundle size ~670 kB is expected and not a concern for this single-user local app
