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

## Development Worktree

Active feature branch work happens in an isolated git worktree:
- Location: `~/.config/superpowers/worktrees/Self-Study-TOEIC/task-1`
- Branch: `task-1-implementation`

To switch work back to main repo after merging, use `git worktree remove`.

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
│   ├── Dashboard/index.tsx     # Roadmap, score chart, stats, weak areas
│   ├── Practice/index.tsx      # Part selection
│   ├── Practice/PracticeSession.tsx  # Active test session
│   ├── Practice/PracticeResult.tsx   # Score + review answers
│   ├── Vocabulary/index.tsx    # Topic list
│   ├── Vocabulary/FlashcardSession.tsx  # Flashcard study
│   ├── Vocabulary/VocabQuiz.tsx       # Vocabulary quiz
│   ├── Grammar/index.tsx       # Lesson list
│   └── Grammar/LessonView.tsx  # Lesson content + exercises
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
- **Routing**: 4 main routes: `/` (Dashboard), `/practice` (Practice), `/vocabulary` (Vocabulary), `/grammar` (Grammar).
- **Spaced Repetition**: SM-2 algorithm in `useSpacedRepetition`. Vocab rated as "Chưa biết" (quality 1) / "Hơi biết" (3) / "Biết rồi" (5).

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

## Verification Criteria

1. Dev server runs, 4 routes work
2. Practice: can complete Part 5 questions with sample data, shows score + answer review
3. Vocabulary: flashcards display correctly, spaced repetition schedules reviews
4. Grammar: lessons render content, exercises score correctly
5. Dashboard: roadmap shows current week, chart renders with data
6. LocalStorage: progress survives page reload
7. Responsive: works on desktop and mobile

## Implementation Status

**Task 1: Project Setup** ✅ Complete (branch: `task-1-implementation`)
- Vite + React 18 + TypeScript scaffold
- Tailwind CSS v4 via `@tailwindcss/vite`
- React Router v6 with placeholder routes
- Vitest + Testing Library configured
- All deps aligned, npm audit clean
