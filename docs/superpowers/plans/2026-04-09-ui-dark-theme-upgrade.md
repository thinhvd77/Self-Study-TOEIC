# UI Dark Theme Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the entire app from light theme to a dark mode with amber accent, using CSS variables throughout.

**Architecture:** Define all color tokens as CSS custom properties in `src/index.css`, then replace every hardcoded Tailwind color class across 16 files with `bg-[var(--x)]` / `text-[var(--x)]` arbitrary-value syntax. No logic changes — styling only.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4 (arbitrary value syntax `bg-[var(--token)]`), CSS custom properties.

---

### Task 1: CSS Foundation

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace `src/index.css` entirely**

```css
@import "tailwindcss";

:root {
  --bg-primary: #0f0f13;
  --bg-surface: #1a1a24;
  --bg-elevated: #242433;
  --border: #2e2e42;
  --text-primary: #f1f0f5;
  --text-secondary: #8b8ba7;
  --accent: #f59e0b;
  --accent-hover: #fbbf24;
  --accent-soft: #2d1f05;
  --success: #10b981;
  --success-soft: #052e1c;
  --danger: #ef4444;
  --danger-soft: #2d0a0a;
  --warning: #fbbf24;
  --warning-soft: #2d1e04;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.markdown-content { color: var(--text-primary); }
.markdown-content h1,
.markdown-content h2,
.markdown-content h3 { color: var(--accent); margin-top: 1rem; margin-bottom: 0.5rem; font-weight: 700; }
.markdown-content strong { color: var(--text-primary); font-weight: 600; }
.markdown-content ul,
.markdown-content ol { color: var(--text-secondary); padding-left: 1.5rem; }
.markdown-content li { margin-bottom: 0.25rem; }
.markdown-content code {
  background: var(--bg-elevated);
  color: var(--accent);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.875em;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in { animation: none; }
  * { transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```
Expected: no errors, bundle builds successfully.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add dark theme CSS variables and utility classes"
```

---

### Task 2: Layout Component

**Files:**
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: Replace `src/components/Layout.tsx`**

```tsx
import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/practice', label: 'Luyện đề', icon: '📝' },
  { to: '/vocabulary', label: 'Từ vựng', icon: '📚' },
  { to: '/grammar', label: 'Ngữ pháp', icon: '📖' },
]

export function Layout() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-50 bg-[var(--bg-surface)] border-b border-[var(--border)] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[var(--accent)]">🎯 TOEIC 550+</h1>
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-soft)]'
                  }`
                }
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Build and test**

```bash
npm run build && npm test
```
Expected: build passes, 31/31 tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/Layout.tsx
git commit -m "feat: apply dark theme to Layout"
```

---

### Task 3: ProgressBar and Timer Components

**Files:**
- Modify: `src/components/ProgressBar.tsx`
- Modify: `src/components/Timer.tsx`

- [ ] **Step 1: Replace `src/components/ProgressBar.tsx`**

```tsx
interface ProgressBarProps {
  value: number // 0-100
  label?: string
  color?: 'blue' | 'green' | 'yellow' | 'red'
}

const colorMap = {
  blue: 'bg-[var(--accent)]',
  green: 'bg-green-500',
  yellow: 'bg-yellow-400',
  red: 'bg-red-500',
}

export function ProgressBar({ value, label, color = 'blue' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div>
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-[var(--text-secondary)]">{label}</span>
          <span className="font-medium text-[var(--text-primary)]">{clamped}%</span>
        </div>
      )}
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${colorMap[color]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Replace `src/components/Timer.tsx`**

```tsx
interface TimerProps {
  timeLeft: number
  isRunning: boolean
  onToggle: () => void
}

export function Timer({ timeLeft, isRunning, onToggle }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const isLow = timeLeft < 60

  return (
    <div className="flex items-center gap-3">
      <span
        className={`font-mono text-2xl font-bold ${isLow ? 'text-[var(--danger)]' : 'text-[var(--accent)]'}`}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <button
        onClick={onToggle}
        className="px-3 py-1 text-sm rounded bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] active:scale-95 transition-all"
      >
        {isRunning ? 'Tạm dừng' : 'Tiếp tục'}
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Build and test**

```bash
npm run build && npm test
```
Expected: build passes, 31/31 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProgressBar.tsx src/components/Timer.tsx
git commit -m "feat: apply dark theme to ProgressBar and Timer"
```

---

### Task 4: QuestionNav, QuestionCard, Flashcard Components

**Files:**
- Modify: `src/components/QuestionNav.tsx`
- Modify: `src/components/QuestionCard.tsx`
- Modify: `src/components/Flashcard.tsx`

- [ ] **Step 1: Replace `src/components/QuestionNav.tsx`**

```tsx
interface QuestionNavProps {
  total: number
  currentIndex: number
  answers: (number | null)[]
  bookmarks: Set<number>
  onNavigate: (index: number) => void
}

export function QuestionNav({
  total,
  currentIndex,
  answers,
  bookmarks,
  onNavigate,
}: QuestionNavProps) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4">
      <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Câu hỏi</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: total }, (_, i) => {
          let className = 'w-10 h-10 rounded text-sm font-medium transition-colors '

          if (i === currentIndex) {
            className += 'bg-[var(--accent)] text-gray-900'
          } else if (answers[i] !== null && answers[i] !== undefined) {
            className += 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]'
          } else {
            className += 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--border)]'
          }

          return (
            <button key={i} onClick={() => onNavigate(i)} className={`${className} relative`}>
              {bookmarks.has(i) && (
                <span className="absolute top-0 right-0 text-[var(--warning)] text-xs leading-none">★</span>
              )}
              {i + 1}
            </button>
          )
        })}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-[var(--text-secondary)]">
        <span>Đã làm: {answers.filter((a) => a !== null && a !== undefined).length}/{total}</span>
        <span>Đánh dấu: {bookmarks.size}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Replace `src/components/QuestionCard.tsx`**

```tsx
interface QuestionCardProps {
  questionNumber: number
  question: string
  passage?: string
  options: string[]
  selectedAnswer: number | null
  correctAnswer?: number
  explanation?: string
  isBookmarked: boolean
  onSelect: (index: number) => void
  onToggleBookmark: () => void
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export function QuestionCard({
  questionNumber,
  question,
  passage,
  options,
  selectedAnswer,
  correctAnswer,
  explanation,
  isBookmarked,
  onSelect,
  onToggleBookmark,
}: QuestionCardProps) {
  const isReviewMode = correctAnswer !== undefined

  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-[var(--text-secondary)]">Câu {questionNumber}</span>
        <button
          onClick={onToggleBookmark}
          className={`text-lg ${isBookmarked ? 'text-[var(--accent)]' : 'text-[var(--border)]'}`}
          title={isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
        >
          ★
        </button>
      </div>

      {passage && (
        <div className="mb-4 p-4 bg-[var(--bg-elevated)] rounded text-sm leading-relaxed whitespace-pre-wrap text-[var(--text-primary)]">
          {passage}
        </div>
      )}

      <p className="text-[var(--text-primary)] font-medium mb-4">{question}</p>

      <div className="space-y-2">
        {options.map((option, index) => {
          let className = 'w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 active:scale-[0.99] '

          if (isReviewMode) {
            if (index === correctAnswer) {
              className += 'border-[var(--success)] bg-[var(--success-soft)] text-[var(--success)]'
            } else if (index === selectedAnswer && index !== correctAnswer) {
              className += 'border-[var(--danger)] bg-[var(--danger-soft)] text-[var(--danger)]'
            } else {
              className += 'border-[var(--border)] text-[var(--text-secondary)]'
            }
          } else if (index === selectedAnswer) {
            className += 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
          } else {
            className += 'border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]'
          }

          return (
            <button
              key={index}
              onClick={() => !isReviewMode && onSelect(index)}
              disabled={isReviewMode}
              className={className}
            >
              <span className="font-bold mr-3">{OPTION_LABELS[index] ?? String(index + 1)}.</span>
              {option}
            </button>
          )
        })}
      </div>

      {isReviewMode && explanation && (
        <div className="mt-4 p-4 bg-[var(--bg-elevated)] rounded-lg border border-[var(--border)]">
          <p className="text-sm font-medium text-[var(--accent)] mb-1">Giải thích:</p>
          <p className="text-sm text-[var(--text-secondary)]">{explanation}</p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Replace `src/components/Flashcard.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { VocabularyWord } from '../types'

interface FlashcardProps {
  word: VocabularyWord
  onRate: (quality: 1 | 3 | 5) => void
}

export function Flashcard({ word, onRate }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    setIsFlipped(false)
  }, [word.id])

  return (
    <div className="max-w-lg mx-auto">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--accent)] transition-all duration-200"
      >
        {!isFlipped ? (
          <>
            <p className="text-3xl font-bold text-[var(--accent)] mb-2">{word.word}</p>
            <p className="text-[var(--text-secondary)] text-sm">{word.ipa}</p>
            <p className="text-[var(--text-secondary)] text-xs mt-2">({word.partOfSpeech})</p>
            <p className="text-[var(--text-secondary)] text-sm mt-6">Nhấn để xem nghĩa</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-[var(--accent)] mb-2">{word.meaning}</p>
            <p className="text-[var(--text-secondary)] text-sm mb-4">{word.word} ({word.partOfSpeech})</p>
            <div className="bg-[var(--bg-elevated)] rounded p-3 w-full">
              <p className="text-sm text-[var(--text-primary)] italic">"{word.example}"</p>
            </div>
            {word.synonyms && word.synonyms.length > 0 && (
              <p className="text-xs text-[var(--text-secondary)] mt-3">
                Đồng nghĩa: {word.synonyms.join(', ')}
              </p>
            )}
          </>
        )}
      </div>

      {isFlipped && (
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => { setIsFlipped(false); onRate(1) }}
            className="px-6 py-3 bg-[var(--danger-soft)] text-[var(--danger)] rounded-lg font-medium hover:brightness-110 active:scale-95 transition-all"
          >
            Chưa biết
          </button>
          <button
            onClick={() => { setIsFlipped(false); onRate(3) }}
            className="px-6 py-3 bg-[var(--warning-soft)] text-[var(--warning)] rounded-lg font-medium hover:brightness-110 active:scale-95 transition-all"
          >
            Hơi biết
          </button>
          <button
            onClick={() => { setIsFlipped(false); onRate(5) }}
            className="px-6 py-3 bg-[var(--success-soft)] text-[var(--success)] rounded-lg font-medium hover:brightness-110 active:scale-95 transition-all"
          >
            Biết rồi
          </button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Build and test**

```bash
npm run build && npm test
```
Expected: build passes, 31/31 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/QuestionNav.tsx src/components/QuestionCard.tsx src/components/Flashcard.tsx
git commit -m "feat: apply dark theme to QuestionNav, QuestionCard, Flashcard"
```

---

### Task 5: Dashboard Page

**Files:**
- Modify: `src/pages/Dashboard/index.tsx`

- [ ] **Step 1: Replace `src/pages/Dashboard/index.tsx`**

```tsx
import { useMemo } from 'react'
import { useAppContext } from '../../context/AppContext'
import { roadmap } from '../../data/roadmap'
import { ProgressBar } from '../../components/ProgressBar'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PHASE_LABELS = ['', 'Nền tảng', 'Mở rộng', 'Luyện đề', 'Tổng ôn']

export default function DashboardPage() {
  const { progress } = useAppContext()

  const currentWeekData = roadmap.find((w) => w.week === progress.currentWeek)
  const currentPhase = currentWeekData?.phase ?? 1

  const phaseWeeks = roadmap.filter((w) => w.phase === currentPhase)
  const phaseStart = phaseWeeks[0]?.week ?? 1
  const phaseEnd = phaseWeeks[phaseWeeks.length - 1]?.week ?? 4
  const phaseProgress = Math.min(100, Math.max(0, Math.round(
    ((progress.currentWeek - phaseStart) / (phaseEnd - phaseStart + 1)) * 100
  )))

  const totalVocabLearned = useMemo(
    () => progress.vocabularyProgress.filter((v) => v.correctCount > 0).length,
    [progress.vocabularyProgress]
  )
  const grammarCompleted = useMemo(
    () => progress.grammarProgress.filter((g) => g.completed).length,
    [progress.grammarProgress]
  )
  const testsCompleted = useMemo(() => progress.testHistory.length, [progress.testHistory])
  const chartData = useMemo(
    () => progress.testHistory.map((test) => ({
      date: new Date(test.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
      score: Math.round((test.correctAnswers / test.totalQuestions) * 100),
    })),
    [progress.testHistory]
  )
  const weakestPart = useMemo(() => {
    const partScores: Record<number, { correct: number; total: number }> = {}
    for (const test of progress.testHistory) {
      for (const answer of test.answers) {
        const partMatch = answer.questionId.match(/^p(\d)/)
        if (partMatch) {
          const part = Number(partMatch[1])
          if (!partScores[part]) partScores[part] = { correct: 0, total: 0 }
          partScores[part].total++
          if (answer.correct) partScores[part].correct++
        }
      }
    }
    return Object.entries(partScores).sort(
      ([, a], [, b]) => a.correct / a.total - b.correct / b.total
    )[0]
  }, [progress.testHistory])

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Dashboard</h2>

      {/* Roadmap */}
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Giai đoạn {currentPhase}: {PHASE_LABELS[currentPhase]}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">Tuần {progress.currentWeek}/16</p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((phase) => (
              <div
                key={phase}
                className={`w-8 h-2 rounded-full ${
                  phase < currentPhase
                    ? 'bg-[var(--success)]'
                    : phase === currentPhase
                      ? 'bg-[var(--accent)]'
                      : 'bg-[var(--border)]'
                }`}
              />
            ))}
          </div>
        </div>

        <ProgressBar value={phaseProgress} label="Tiến độ giai đoạn" />

        {currentWeekData && (
          <div className="mt-4">
            <h4 className="font-medium text-[var(--text-primary)] mb-2">
              Tuần {currentWeekData.week}: {currentWeekData.title}
            </h4>
            <div className="space-y-2">
              {currentWeekData.tasks.map((task) => {
                const isCompleted = progress.completedTasks.includes(task.id)
                return (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isCompleted ? 'bg-[var(--accent-soft)]' : 'bg-[var(--bg-elevated)]'
                    }`}
                  >
                    <span className={isCompleted ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}>
                      {isCompleted ? '✓' : '○'}
                    </span>
                    <span className={`text-sm ${isCompleted ? 'text-[var(--accent)] line-through' : 'text-[var(--text-primary)]'}`}>
                      {task.description}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { value: totalVocabLearned, label: 'Từ vựng đã học' },
          { value: grammarCompleted, label: 'Bài ngữ pháp' },
          { value: testsCompleted, label: 'Đề đã làm' },
          {
            value: `${progress.vocabularyProgress.length > 0
              ? Math.round(
                  (progress.vocabularyProgress.filter((v) => v.level >= 3).length /
                    progress.vocabularyProgress.length) * 100
                )
              : 0}%`,
            label: 'Tỷ lệ nhớ từ',
          },
        ].map(({ value, label }) => (
          <div key={label} className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 text-center hover:-translate-y-0.5 transition-all duration-200">
            <p className="text-3xl font-bold text-[var(--accent)]">{value}</p>
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
          </div>
        ))}
      </div>

      {/* Score chart */}
      {chartData.length > 0 && (
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Lịch sử điểm thi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e2e42" />
              <XAxis dataKey="date" fontSize={12} tick={{ fill: '#8b8ba7' }} />
              <YAxis domain={[0, 100]} fontSize={12} tick={{ fill: '#8b8ba7' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a24',
                  border: '1px solid #2e2e42',
                  borderRadius: '8px',
                  color: '#f1f0f5',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4, fill: '#f59e0b' }}
                name="Điểm (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Weakness */}
      {weakestPart && (
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Điểm yếu cần cải thiện</h3>
          <div className="bg-[var(--danger-soft)] rounded-lg p-4">
            <p className="font-medium text-[#fca5a5]">
              Part {weakestPart[0]}: {Math.round((weakestPart[1].correct / weakestPart[1].total) * 100)}% đúng
            </p>
            <p className="text-sm text-[#fca5a5] opacity-80 mt-1">
              {weakestPart[1].correct}/{weakestPart[1].total} câu đúng - Nên luyện thêm Part này
            </p>
          </div>
        </div>
      )}

      {chartData.length === 0 && testsCompleted === 0 && (
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 text-center">
          <p className="text-[var(--text-secondary)]">Chưa có dữ liệu. Bắt đầu luyện tập để xem thống kê!</p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Build and test**

```bash
npm run build && npm test
```
Expected: build passes, 31/31 tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Dashboard/index.tsx
git commit -m "feat: apply dark theme to Dashboard page"
```

---

### Task 6: Practice Pages

**Files:**
- Modify: `src/pages/Practice/index.tsx`
- Modify: `src/pages/Practice/PracticeSession.tsx`
- Modify: `src/pages/Practice/PracticeResult.tsx`

- [ ] **Step 1: Replace `src/pages/Practice/index.tsx`**

```tsx
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { PracticeSession } from './PracticeSession'
import { PracticeResult } from './PracticeResult'
import { part5Questions } from '../../data/tests/part5'
import { Question, TestResult } from '../../types'

const PARTS = [
  { part: 5, label: 'Part 5: Điền câu', description: 'Chọn từ/cụm từ đúng để hoàn thành câu', count: part5Questions.length },
  { part: 6, label: 'Part 6: Điền đoạn', description: 'Điền vào đoạn văn (coming soon)', count: 0 },
  { part: 7, label: 'Part 7: Đọc hiểu', description: 'Đọc passage và trả lời câu hỏi (coming soon)', count: 0 },
]

function PartSelection() {
  const navigate = useNavigate()

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Luyện đề thi</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[var(--text-secondary)] mb-4">Reading (Part 5-7)</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {PARTS.map((p) => (
            <button
              key={p.part}
              onClick={() => navigate(`/practice/session?part=${p.part}`)}
              disabled={p.count === 0}
              className={`text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                p.count > 0
                  ? 'border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg-surface)] hover:-translate-y-0.5'
                  : 'border-[var(--border)] bg-[var(--bg-surface)] opacity-40 cursor-not-allowed'
              }`}
            >
              <h4 className="font-bold text-[var(--text-primary)]">{p.label}</h4>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{p.description}</p>
              <p className="text-sm text-[var(--accent)] mt-2 font-medium">{p.count} câu</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PracticePage() {
  const [lastResult, setLastResult] = useState<TestResult | null>(null)

  const getQuestions = (part: number): Question[] => {
    switch (part) {
      case 5: return part5Questions
      default: return []
    }
  }

  return (
    <Routes>
      <Route index element={<PartSelection />} />
      <Route path="session" element={<PracticeSession getQuestions={getQuestions} onComplete={setLastResult} />} />
      <Route path="result" element={<PracticeResult result={lastResult} />} />
    </Routes>
  )
}
```

- [ ] **Step 2: Replace `src/pages/Practice/PracticeSession.tsx`**

```tsx
import { useState, useCallback, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { QuestionCard } from '../../components/QuestionCard'
import { QuestionNav } from '../../components/QuestionNav'
import { Timer } from '../../components/Timer'
import { useTimer } from '../../hooks/useTimer'
import { useAppContext } from '../../context/AppContext'
import { Question, TestResult, AnswerRecord } from '../../types'

interface PracticeSessionProps {
  getQuestions: (part: number) => Question[]
  onComplete: (result: TestResult) => void
}

export function PracticeSession({ getQuestions, onComplete }: PracticeSessionProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { dispatch } = useAppContext()

  const part = Number(searchParams.get('part') || 5)
  const questions = getQuestions(part)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set())
  const [isSubmitted, setIsSubmitted] = useState(false)

  const answersRef = useRef(answers)
  useEffect(() => { answersRef.current = answers }, [answers])
  const submittedRef = useRef(false)

  const timeLimit = questions.length * 30

  const handleSubmit = useCallback(() => {
    if (submittedRef.current) return
    submittedRef.current = true
    timer.pause()
    setIsSubmitted(true)

    const currentAnswers = answersRef.current
    const answerRecords: AnswerRecord[] = questions.map((q, i) => ({
      questionId: q.id,
      selected: currentAnswers[i] ?? -1,
      correct: currentAnswers[i] === q.correctAnswer,
    }))

    const correctCount = answerRecords.filter((a) => a.correct).length
    const result: TestResult = {
      id: `test-${Date.now()}`,
      date: new Date().toISOString(),
      mode: 'part',
      part,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      timeSpent: timer.elapsed,
      answers: answerRecords,
    }

    dispatch({ type: 'ADD_TEST_RESULT', payload: result })
    onComplete(result)
  }, [questions, part, dispatch, onComplete])

  const handleTimeUp = useCallback(() => {
    if (!submittedRef.current) handleSubmit()
  }, [handleSubmit])

  const timer = useTimer(timeLimit, handleTimeUp)

  useEffect(() => { timer.start() }, [])

  const handleSelect = (optionIndex: number) => {
    if (isSubmitted) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = optionIndex
    setAnswers(newAnswers)
  }

  const handleToggleBookmark = () => {
    const newBookmarks = new Set(bookmarks)
    if (newBookmarks.has(currentIndex)) newBookmarks.delete(currentIndex)
    else newBookmarks.add(currentIndex)
    setBookmarks(newBookmarks)
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">Chưa có câu hỏi cho Part này.</p>
        <button onClick={() => navigate('/practice')} className="mt-4 text-[var(--accent)] hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const current = questions[currentIndex]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          Part {part} {isSubmitted && '- Kết quả'}
        </h2>
        {!isSubmitted && (
          <Timer
            timeLeft={timer.timeLeft}
            isRunning={timer.isRunning}
            onToggle={() => (timer.isRunning ? timer.pause() : timer.start())}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <QuestionCard
            questionNumber={currentIndex + 1}
            question={current.question}
            passage={current.passage}
            options={current.options}
            selectedAnswer={answers[currentIndex]}
            correctAnswer={isSubmitted ? current.correctAnswer : undefined}
            explanation={isSubmitted ? current.explanation : undefined}
            isBookmarked={bookmarks.has(currentIndex)}
            onSelect={handleSelect}
            onToggleBookmark={handleToggleBookmark}
          />

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] disabled:opacity-50 active:scale-95 transition-all"
            >
              Câu trước
            </button>

            {!isSubmitted && currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
              >
                Nộp bài
              </button>
            ) : isSubmitted && currentIndex === questions.length - 1 ? (
              <button
                onClick={() => navigate('/practice/result')}
                className="px-6 py-2 rounded-lg bg-[var(--success)] text-white hover:brightness-110 font-medium active:scale-95 transition-all"
              >
                Xem kết quả
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                className="px-4 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] active:scale-95 transition-all"
              >
                Câu sau
              </button>
            )}
          </div>
        </div>

        <div>
          <QuestionNav
            total={questions.length}
            currentIndex={currentIndex}
            answers={answers}
            bookmarks={bookmarks}
            onNavigate={setCurrentIndex}
          />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Replace `src/pages/Practice/PracticeResult.tsx`**

```tsx
import { useNavigate } from 'react-router-dom'
import { TestResult } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'

interface PracticeResultProps {
  result: TestResult | null
}

export function PracticeResult({ result }: PracticeResultProps) {
  const navigate = useNavigate()

  if (!result) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">Không có kết quả.</p>
        <button onClick={() => navigate('/practice')} className="mt-4 text-[var(--accent)] hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100)
  const minutes = Math.floor(result.timeSpent / 60)
  const seconds = result.timeSpent % 60

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Kết quả luyện tập</h2>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
        <div className="text-center mb-6">
          <p className="text-5xl font-bold text-[var(--accent)]">{percentage}%</p>
          <p className="text-[var(--text-secondary)] mt-2">
            {result.correctAnswers}/{result.totalQuestions} câu đúng
          </p>
        </div>

        <ProgressBar
          value={percentage}
          label="Tỷ lệ đúng"
          color={percentage >= 70 ? 'green' : percentage >= 50 ? 'yellow' : 'red'}
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-[var(--bg-elevated)] rounded-lg p-4">
            <p className="text-sm text-[var(--text-secondary)]">Thời gian</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {minutes}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
          <div className="bg-[var(--bg-elevated)] rounded-lg p-4">
            <p className="text-sm text-[var(--text-secondary)]">Chế độ</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {result.mode === 'part' ? `Part ${result.part}` : result.mode === 'mini' ? 'Mini Test' : 'Full Test'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/practice')}
          className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] font-medium active:scale-95 transition-all"
        >
          Luyện tiếp
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 px-4 py-3 rounded-xl bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
        >
          Về Dashboard
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Build and test**

```bash
npm run build && npm test
```
Expected: build passes, 31/31 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Practice/index.tsx src/pages/Practice/PracticeSession.tsx src/pages/Practice/PracticeResult.tsx
git commit -m "feat: apply dark theme to Practice pages"
```

---

### Task 7: Vocabulary Pages

**Files:**
- Modify: `src/pages/Vocabulary/index.tsx`
- Modify: `src/pages/Vocabulary/FlashcardSession.tsx`
- Modify: `src/pages/Vocabulary/VocabQuiz.tsx`

- [ ] **Step 1: Replace `src/pages/Vocabulary/index.tsx`**

```tsx
import { Routes, Route, useNavigate } from 'react-router-dom'
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
import { useAppContext } from '../../context/AppContext'
import { getWordsToReview } from '../../hooks/useSpacedRepetition'
import { VocabularyWord } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'

const allTopics = [
  { id: 'business', label: 'Kinh doanh', words: businessVocabulary },
  { id: 'office', label: 'Văn phòng', words: officeVocabulary },
  { id: 'finance', label: 'Tài chính', words: financeVocabulary },
  { id: 'travel', label: 'Du lịch', words: travelVocabulary },
  { id: 'health', label: 'Y tế', words: healthVocabulary },
  { id: 'technology', label: 'Công nghệ', words: technologyVocabulary },
  { id: 'hr', label: 'Nhân sự', words: hrVocabulary },
  { id: 'manufacturing', label: 'Sản xuất', words: manufacturingVocabulary },
]

const allWords = allTopics.flatMap((t) => t.words)

function TopicSelection() {
  const navigate = useNavigate()
  const { progress } = useAppContext()

  const learnedCount = progress.vocabularyProgress.filter((v) => v.correctCount > 0).length
  const dueForReview = getWordsToReview(progress.vocabularyProgress)

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Học từ vựng</h2>

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
                ? Math.round((progress.vocabularyProgress.filter((v) => v.level >= 3).length / learnedCount) * 100)
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
        {allTopics.map((topic) => (
          <div key={topic.id} className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all duration-200">
            <h4 className="font-bold text-[var(--text-primary)] text-lg">{topic.label}</h4>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{topic.words.length} từ</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/vocabulary/flashcard?topic=${topic.id}`)}
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] hover:brightness-110 font-medium active:scale-95 transition-all"
              >
                Flashcard
              </button>
              <button
                onClick={() => navigate(`/vocabulary/quiz?topic=${topic.id}`)}
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-[var(--success-soft)] text-[var(--success)] hover:brightness-110 font-medium active:scale-95 transition-all"
              >
                Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getWordsByTopic(topicId: string): VocabularyWord[] {
  const topic = allTopics.find((t) => t.id === topicId)
  return topic?.words ?? []
}

export default function VocabularyPage() {
  return (
    <Routes>
      <Route index element={<TopicSelection />} />
      <Route path="flashcard" element={<FlashcardSession getWords={getWordsByTopic} />} />
      <Route path="quiz" element={<VocabQuiz getWords={getWordsByTopic} />} />
      <Route path="review" element={<FlashcardSession getWords={() => []} allWords={allWords} isReview />} />
    </Routes>
  )
}
```

- [ ] **Step 2: Replace `src/pages/Vocabulary/FlashcardSession.tsx`**

```tsx
import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Flashcard } from '../../components/Flashcard'
import { useAppContext } from '../../context/AppContext'
import { calculateNextReview, getNextReviewDate, getWordsToReview } from '../../hooks/useSpacedRepetition'
import { VocabularyWord, VocabularyProgress } from '../../types'
import { businessVocabulary } from '../../data/vocabulary/business'

interface FlashcardSessionProps {
  getWords: (topicId: string) => VocabularyWord[]
  isReview?: boolean
  allWords?: VocabularyWord[]
}

export function FlashcardSession({ getWords, isReview, allWords: allWordsProp }: FlashcardSessionProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { progress, dispatch } = useAppContext()

  const topic = searchParams.get('topic') || ''

  let words: VocabularyWord[]
  if (isReview) {
    const dueProgress = getWordsToReview(progress.vocabularyProgress)
    const reviewPool = allWordsProp ?? businessVocabulary
    words = dueProgress
      .map((p) => reviewPool.find((w) => w.id === p.wordId))
      .filter((w): w is VocabularyWord => w !== undefined)
  } else {
    words = getWords(topic)
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [stats, setStats] = useState({ total: 0, knew: 0, didntKnow: 0 })

  if (words.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">
          {isReview ? 'Không có từ nào cần ôn hôm nay!' : 'Không tìm thấy từ vựng.'}
        </p>
        <button onClick={() => navigate('/vocabulary')} className="mt-4 text-[var(--accent)] hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const handleRate = (quality: 1 | 3 | 5) => {
    const word = words[currentIndex]
    const existing = progress.vocabularyProgress.find((v) => v.wordId === word.id)
    const currentLevel = existing?.level ?? 0
    const { level, intervalDays } = calculateNextReview({ level: currentLevel, quality })
    const updatedProgress: VocabularyProgress = {
      wordId: word.id,
      level,
      nextReview: getNextReviewDate(intervalDays),
      lastReviewed: new Date().toISOString().split('T')[0],
      correctCount: (existing?.correctCount ?? 0) + (quality >= 3 ? 1 : 0),
      incorrectCount: (existing?.incorrectCount ?? 0) + (quality < 3 ? 1 : 0),
    }
    dispatch({ type: 'UPDATE_VOCAB_PROGRESS', payload: updatedProgress })
    setStats((prev) => ({
      total: prev.total + 1,
      knew: prev.knew + (quality === 5 ? 1 : 0),
      didntKnow: prev.didntKnow + (quality === 1 ? 1 : 0),
    }))
    if (currentIndex < words.length - 1) setCurrentIndex(currentIndex + 1)
    else setCurrentIndex(-1)
  }

  if (currentIndex === -1) {
    return (
      <div className="max-w-lg mx-auto text-center py-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Hoàn thành!</h2>
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
          <p className="text-[var(--text-secondary)]">Đã học {stats.total} từ</p>
          <div className="flex justify-center gap-8 mt-4">
            <div>
              <p className="text-2xl font-bold text-[var(--success)]">{stats.knew}</p>
              <p className="text-sm text-[var(--text-secondary)]">Biết rồi</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--danger)]">{stats.didntKnow}</p>
              <p className="text-sm text-[var(--text-secondary)]">Chưa biết</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/vocabulary')}
          className="px-6 py-3 rounded-xl bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
        >
          Quay lại
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          {isReview ? 'Ôn tập' : `Từ vựng: ${topic}`}
        </h2>
        <span className="text-sm text-[var(--text-secondary)]">{currentIndex + 1}/{words.length}</span>
      </div>
      <Flashcard word={words[currentIndex]} onRate={handleRate} />
    </div>
  )
}
```

- [ ] **Step 3: Replace `src/pages/Vocabulary/VocabQuiz.tsx`**

```tsx
import { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { VocabularyWord } from '../../types'
import { QuestionCard } from '../../components/QuestionCard'

interface VocabQuizProps {
  getWords: (topicId: string) => VocabularyWord[]
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface QuizQuestion {
  word: VocabularyWord
  options: string[]
  correctAnswer: number
}

function generateQuizQuestions(words: VocabularyWord[]): QuizQuestion[] {
  return words.map((word) => {
    const otherWords = words.filter((w) => w.id !== word.id)
    const distractors = shuffleArray(otherWords).slice(0, 3).map((w) => w.meaning)
    const allOptions = shuffleArray([word.meaning, ...distractors])
    const correctAnswer = allOptions.indexOf(word.meaning)
    return { word, options: allOptions, correctAnswer }
  })
}

export function VocabQuiz({ getWords }: VocabQuizProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const topic = searchParams.get('topic') || ''
  const words = useMemo(() => getWords(topic), [getWords, topic])
  const questions = useMemo(() => generateQuizQuestions(words), [words])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (words.length < 4) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">Cần ít nhất 4 từ để tạo quiz.</p>
        <button onClick={() => navigate('/vocabulary')} className="mt-4 text-[var(--accent)] hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const handleSelect = (index: number) => {
    if (isSubmitted) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = index
    setAnswers(newAnswers)
  }

  const correctCount = answers.filter((a, i) => a === questions[i].correctAnswer).length

  if (isSubmitted && currentIndex === questions.length) {
    return (
      <div className="max-w-lg mx-auto text-center py-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Kết quả Quiz</h2>
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
          <p className="text-5xl font-bold text-[var(--accent)]">
            {Math.round((correctCount / questions.length) * 100)}%
          </p>
          <p className="text-[var(--text-secondary)] mt-2">{correctCount}/{questions.length} câu đúng</p>
        </div>
        <button
          onClick={() => navigate('/vocabulary')}
          className="px-6 py-3 rounded-xl bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
        >
          Quay lại
        </button>
      </div>
    )
  }

  const q = questions[currentIndex]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Quiz: {topic}</h2>
        <span className="text-sm text-[var(--text-secondary)]">{currentIndex + 1}/{questions.length}</span>
      </div>

      <QuestionCard
        questionNumber={currentIndex + 1}
        question={`"${q.word.word}" nghĩa là gì?`}
        options={q.options}
        selectedAnswer={answers[currentIndex]}
        correctAnswer={isSubmitted ? q.correctAnswer : undefined}
        explanation={isSubmitted ? `${q.word.word} (${q.word.ipa}) = ${q.word.meaning}` : undefined}
        isBookmarked={false}
        onSelect={handleSelect}
        onToggleBookmark={() => {}}
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] disabled:opacity-50 active:scale-95 transition-all"
        >
          Câu trước
        </button>

        {currentIndex === questions.length - 1 && !isSubmitted ? (
          <button
            onClick={() => setIsSubmitted(true)}
            className="px-6 py-2 rounded-lg bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
          >
            Nộp bài
          </button>
        ) : isSubmitted && currentIndex === questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(questions.length)}
            className="px-6 py-2 rounded-lg bg-[var(--success)] text-white hover:brightness-110 font-medium active:scale-95 transition-all"
          >
            Xem kết quả
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            disabled={isSubmitted}
            className="px-4 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] disabled:opacity-50 active:scale-95 transition-all"
          >
            Câu sau
          </button>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Build and test**

```bash
npm run build && npm test
```
Expected: build passes, 31/31 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Vocabulary/index.tsx src/pages/Vocabulary/FlashcardSession.tsx src/pages/Vocabulary/VocabQuiz.tsx
git commit -m "feat: apply dark theme to Vocabulary pages"
```

---

### Task 8: Grammar Pages

**Files:**
- Modify: `src/pages/Grammar/index.tsx`
- Modify: `src/pages/Grammar/LessonView.tsx`

- [ ] **Step 1: Replace `src/pages/Grammar/index.tsx`**

```tsx
import { Routes, Route, useNavigate } from 'react-router-dom'
import { LessonView } from './LessonView'
import { partsOfSpeechLesson } from '../../data/grammar/parts-of-speech'
import { verbTensesLesson } from '../../data/grammar/verb-tenses'
import { passiveVoiceLesson } from '../../data/grammar/passive-voice'
import { conjunctionsLesson } from '../../data/grammar/conjunctions'
import { prepositionsLesson } from '../../data/grammar/prepositions'
import { relativePronounsLesson } from '../../data/grammar/relative-pronouns'
import { comparativesLesson } from '../../data/grammar/comparatives'
import { conditionalsLesson } from '../../data/grammar/conditionals'
import { useAppContext } from '../../context/AppContext'
import { GrammarLesson } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'

const allLessons: GrammarLesson[] = [
  partsOfSpeechLesson, verbTensesLesson, passiveVoiceLesson, conjunctionsLesson,
  prepositionsLesson, relativePronounsLesson, comparativesLesson, conditionalsLesson,
]

function LessonList() {
  const navigate = useNavigate()
  const { progress } = useAppContext()
  const completedCount = progress.grammarProgress.filter((g) => g.completed).length

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Ngữ pháp TOEIC</h2>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
        <ProgressBar
          value={allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0}
          label={`Tiến độ: ${completedCount}/${allLessons.length} bài`}
          color="green"
        />
      </div>

      <div className="space-y-3">
        {allLessons.map((lesson) => {
          const gProgress = progress.grammarProgress.find((g) => g.lessonId === lesson.id)
          const isCompleted = gProgress?.completed ?? false
          const score = gProgress?.exerciseScore

          return (
            <button
              key={lesson.id}
              onClick={() => navigate(`/grammar/${lesson.id}`)}
              className="w-full text-left bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--text-secondary)]">Bài {lesson.order}</span>
                    {isCompleted && <span className="text-[var(--accent)] text-sm">✓</span>}
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] mt-1">{lesson.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{lesson.exercises.length} câu bài tập</p>
                </div>
                {score !== undefined && (
                  <div className="text-right">
                    <p className={`text-xl font-bold ${score >= 70 ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                      {score}%
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">Điểm bài tập</p>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function GrammarPage() {
  return (
    <Routes>
      <Route index element={<LessonList />} />
      <Route path=":lessonId" element={<LessonView lessons={allLessons} />} />
    </Routes>
  )
}
```

- [ ] **Step 2: Replace `src/pages/Grammar/LessonView.tsx`**

```tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { GrammarLesson, GrammarProgress } from '../../types'
import { useAppContext } from '../../context/AppContext'
import { QuestionCard } from '../../components/QuestionCard'

interface LessonViewProps {
  lessons: GrammarLesson[]
}

export function LessonView({ lessons }: LessonViewProps) {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { dispatch } = useAppContext()

  const lesson = lessons.find((l) => l.id === lessonId)

  const [showExercises, setShowExercises] = useState(false)
  const [currentEx, setCurrentEx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">Không tìm thấy bài học.</p>
        <button onClick={() => navigate('/grammar')} className="mt-4 text-[var(--accent)] hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const startExercises = () => {
    setShowExercises(true)
    setAnswers(new Array(lesson.exercises.length).fill(null))
  }

  const handleSelect = (index: number) => {
    if (isSubmitted) return
    const newAnswers = [...answers]
    newAnswers[currentEx] = index
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    const correctCount = answers.filter((a, i) => a === lesson.exercises[i].correctAnswer).length
    const score = Math.round((correctCount / lesson.exercises.length) * 100)
    const grammarProgress: GrammarProgress = {
      lessonId: lesson.id,
      completed: true,
      exerciseScore: score,
      lastStudied: new Date().toISOString().split('T')[0],
    }
    dispatch({ type: 'UPDATE_GRAMMAR_PROGRESS', payload: grammarProgress })
  }

  if (!showExercises) {
    return (
      <div className="animate-fade-in">
        <button onClick={() => navigate('/grammar')} className="text-[var(--accent)] hover:underline text-sm mb-4 block">
          ← Quay lại danh sách
        </button>

        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Bài {lesson.order}: {lesson.title}
          </h2>

          <div className="mt-6 leading-relaxed space-y-3">
            <div className="markdown-content">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>
          </div>

          {lesson.examples.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-[var(--text-primary)] mb-3">Ví dụ:</h3>
              <div className="space-y-3">
                {lesson.examples.map((ex, i) => (
                  <div key={i} className="bg-[var(--accent-soft)] rounded-lg p-4">
                    <p className="text-[var(--accent)] font-medium">{ex.english}</p>
                    <p className="text-[var(--text-secondary)] text-sm mt-1">→ {ex.vietnamese}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startExercises}
            className="mt-8 px-6 py-3 rounded-xl bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
          >
            Làm bài tập ({lesson.exercises.length} câu)
          </button>
        </div>
      </div>
    )
  }

  const correctCount = isSubmitted
    ? answers.filter((a, i) => a === lesson.exercises[i].correctAnswer).length
    : 0

  if (isSubmitted && currentEx >= lesson.exercises.length) {
    const score = Math.round((correctCount / lesson.exercises.length) * 100)
    return (
      <div className="max-w-lg mx-auto text-center py-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Kết quả bài tập</h2>
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
          <p className="text-5xl font-bold text-[var(--accent)]">{score}%</p>
          <p className="text-[var(--text-secondary)] mt-2">{correctCount}/{lesson.exercises.length} câu đúng</p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => { setShowExercises(false); setIsSubmitted(false); setCurrentEx(0) }}
            className="px-6 py-3 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] font-medium active:scale-95 transition-all"
          >
            Xem lại bài học
          </button>
          <button
            onClick={() => navigate('/grammar')}
            className="px-6 py-3 rounded-xl bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
          >
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  const exercise = lesson.exercises[currentEx]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Bài tập: {lesson.title}</h2>
        <span className="text-sm text-[var(--text-secondary)]">{currentEx + 1}/{lesson.exercises.length}</span>
      </div>

      <QuestionCard
        questionNumber={currentEx + 1}
        question={exercise.question}
        options={exercise.options}
        selectedAnswer={answers[currentEx]}
        correctAnswer={isSubmitted ? exercise.correctAnswer : undefined}
        explanation={isSubmitted ? exercise.explanation : undefined}
        isBookmarked={false}
        onSelect={handleSelect}
        onToggleBookmark={() => {}}
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentEx(Math.max(0, currentEx - 1))}
          disabled={currentEx === 0}
          className="px-4 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] disabled:opacity-50 active:scale-95 transition-all"
        >
          Câu trước
        </button>

        {currentEx === lesson.exercises.length - 1 && !isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
          >
            Nộp bài
          </button>
        ) : isSubmitted && currentEx === lesson.exercises.length - 1 ? (
          <button
            onClick={() => setCurrentEx(lesson.exercises.length)}
            className="px-6 py-2 rounded-lg bg-[var(--success)] text-white hover:brightness-110 font-medium active:scale-95 transition-all"
          >
            Xem kết quả
          </button>
        ) : (
          <button
            onClick={() => setCurrentEx(currentEx + 1)}
            className="px-4 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] active:scale-95 transition-all"
          >
            Câu sau
          </button>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Build and test**

```bash
npm run build && npm test
```
Expected: build passes, 31/31 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Grammar/index.tsx src/pages/Grammar/LessonView.tsx
git commit -m "feat: apply dark theme to Grammar pages"
```

---

### Task 9: Final Verification

- [ ] **Step 1: Run full test suite**

```bash
npm test
```
Expected: 31/31 tests pass (useLocalStorage 4, useTimer 4, useSpacedRepetition 5, scoring 3, data verification 15).

- [ ] **Step 2: Production build**

```bash
npm run build
```
Expected: no errors, bundle ~670 kB.

- [ ] **Step 3: Manual smoke test checklist**

Start dev server: `npm run dev`

- [ ] `/` Dashboard loads with dark background, amber stats
- [ ] Nav links: active = amber underline, inactive = gray, hover = amber tint
- [ ] `/practice` Part cards on dark surface, amber count text, hover border amber
- [ ] Start a Part 5 session: dark QuestionCard, amber selected option, amber timer
- [ ] Submit session: correct = green, incorrect = red option highlight
- [ ] `/practice/result` score in amber, dark stat cells
- [ ] `/vocabulary` topic cards dark, amber Flashcard button, green Quiz button
- [ ] Flashcard: amber word on dark card, colored rating buttons
- [ ] `/grammar` lesson list dark, green ProgressBar
- [ ] Open a lesson: markdown renders with amber headings, dark background
- [ ] Do exercises: dark QuestionCard, amber Nộp bài button

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete dark theme upgrade — amber accent, CSS variables, animations"
```
