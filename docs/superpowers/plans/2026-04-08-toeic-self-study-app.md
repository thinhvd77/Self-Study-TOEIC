# TOEIC Self-Study Web App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal TOEIC self-study web app with practice tests (Part 1-7), vocabulary flashcards with spaced repetition, grammar lessons, and a 4-month study roadmap dashboard.

**Architecture:** React SPA with React Router for 4 main routes (Dashboard, Practice, Vocabulary, Grammar). All content stored as static JSON/TS data files. User progress persisted in LocalStorage via React Context + useReducer. No backend needed.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, React Router v6, Recharts, Vitest + React Testing Library

**Spec:** `docs/superpowers/specs/2026-04-08-toeic-self-study-app-design.md`

---

## File Structure Overview

```
src/
├── types/index.ts                    # All TypeScript interfaces
├── data/
│   ├── tests/part5.ts                # Sample Part 5 questions
│   ├── tests/part6.ts                # Sample Part 6 questions
│   ├── tests/part7.ts                # Sample Part 7 questions
│   ├── vocabulary/business.ts        # Business vocab
│   ├── vocabulary/office.ts          # Office vocab
│   ├── grammar/parts-of-speech.ts    # Lesson 1
│   ├── grammar/verb-tenses.ts        # Lesson 2
│   └── roadmap.ts                    # 16-week roadmap
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useTimer.ts
│   └── useSpacedRepetition.ts
├── context/AppContext.tsx
├── components/
│   ├── Layout.tsx
│   ├── Timer.tsx
│   ├── AudioPlayer.tsx
│   ├── QuestionCard.tsx
│   ├── Flashcard.tsx
│   ├── ProgressBar.tsx
│   └── QuestionNav.tsx
├── pages/
│   ├── Dashboard/index.tsx
│   ├── Practice/index.tsx
│   ├── Practice/PracticeSession.tsx
│   ├── Practice/PracticeResult.tsx
│   ├── Vocabulary/index.tsx
│   ├── Vocabulary/FlashcardSession.tsx
│   ├── Vocabulary/VocabQuiz.tsx
│   ├── Grammar/index.tsx
│   └── Grammar/LessonView.tsx
├── utils/scoring.ts
├── App.tsx
└── main.tsx
```

---

### Task 1: Project Setup

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `src/main.tsx`, `src/App.tsx`, `index.html`, `src/index.css`
- Create: `vitest.config.ts`, `src/test/setup.ts`

- [ ] **Step 1: Scaffold Vite project**

```bash
npm create vite@latest . -- --template react-ts
```

Select "Ignore files and continue" if prompted about existing directory.

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom recharts
npm install -D tailwindcss @tailwindcss/vite vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 3: Configure Tailwind**

Replace `src/index.css` with:

```css
@import "tailwindcss";
```

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 4: Configure Vitest**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
```

Create `src/test/setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

Add to `tsconfig.app.json` compilerOptions:

```json
"types": ["vitest/globals"]
```

- [ ] **Step 5: Create minimal App with router**

Replace `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow p-4 flex gap-4">
          <Link to="/" className="font-bold text-blue-600">Dashboard</Link>
          <Link to="/practice" className="text-gray-700 hover:text-blue-600">Practice</Link>
          <Link to="/vocabulary" className="text-gray-700 hover:text-blue-600">Vocabulary</Link>
          <Link to="/grammar" className="text-gray-700 hover:text-blue-600">Grammar</Link>
        </nav>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/practice/*" element={<div>Practice</div>} />
            <Route path="/vocabulary/*" element={<div>Vocabulary</div>} />
            <Route path="/grammar/*" element={<div>Grammar</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 6: Verify dev server runs**

```bash
npm run dev
```

Expected: App loads at `http://localhost:5173`, nav links work, each route shows placeholder text.

- [ ] **Step 7: Run tests to verify setup**

```bash
npx vitest run
```

Expected: Test suite runs (0 tests initially, no errors).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold project with Vite, React, Tailwind, React Router, Vitest"
```

---

### Task 2: Types & Sample Data

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/tests/part5.ts`, `src/data/vocabulary/business.ts`, `src/data/grammar/parts-of-speech.ts`, `src/data/roadmap.ts`

- [ ] **Step 1: Define all TypeScript types**

Create `src/types/index.ts`:

```typescript
// === Practice (Luyện đề) ===

export interface Question {
  id: string
  part: 1 | 2 | 3 | 4 | 5 | 6 | 7
  type: 'listening' | 'reading'
  audioUrl?: string
  imageUrl?: string
  passage?: string
  question: string
  options: string[]
  correctAnswer: number // index 0-3
  explanation: string
  groupId?: string
}

export interface TestResult {
  id: string
  date: string
  mode: 'part' | 'mini' | 'full'
  part?: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number // seconds
  answers: AnswerRecord[]
}

export interface AnswerRecord {
  questionId: string
  selected: number
  correct: boolean
}

// === Vocabulary (Từ vựng) ===

export interface VocabularyWord {
  id: string
  word: string
  ipa: string
  meaning: string
  partOfSpeech: string
  example: string
  synonyms?: string[]
  antonyms?: string[]
  topic: string
}

export interface VocabularyProgress {
  wordId: string
  level: number // 0-5
  nextReview: string // ISO date
  lastReviewed: string
  correctCount: number
  incorrectCount: number
}

// === Grammar (Ngữ pháp) ===

export interface GrammarLesson {
  id: string
  title: string
  order: number
  content: string
  examples: { english: string; vietnamese: string }[]
  exercises: GrammarExercise[]
}

export interface GrammarExercise {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface GrammarProgress {
  lessonId: string
  completed: boolean
  exerciseScore: number
  lastStudied: string
}

// === Roadmap (Lộ trình) ===

export interface RoadmapWeek {
  week: number
  phase: 1 | 2 | 3 | 4
  title: string
  tasks: RoadmapTask[]
}

export interface RoadmapTask {
  id: string
  type: 'vocabulary' | 'grammar' | 'practice'
  description: string
  target: string
  quantity?: number
}

// === User Progress (Tiến độ) ===

export interface UserProgress {
  currentWeek: number
  startDate: string
  completedTasks: string[]
  testHistory: TestResult[]
  vocabularyProgress: VocabularyProgress[]
  grammarProgress: GrammarProgress[]
}
```

- [ ] **Step 2: Create sample Part 5 questions**

Create `src/data/tests/part5.ts`:

```typescript
import { Question } from '../../types'

export const part5Questions: Question[] = [
  {
    id: 'p5-001',
    part: 5,
    type: 'reading',
    question: 'The company will _______ a new marketing strategy next quarter.',
    options: ['implement', 'implementation', 'implementing', 'implemented'],
    correctAnswer: 0,
    explanation: 'Sau "will" cần động từ nguyên mẫu. "implement" là verb, các đáp án khác sai về loại từ hoặc dạng.',
  },
  {
    id: 'p5-002',
    part: 5,
    type: 'reading',
    question: 'All employees must submit their reports _______ Friday.',
    options: ['by', 'until', 'since', 'for'],
    correctAnswer: 0,
    explanation: '"by + thời điểm" = trước thời điểm đó. "by Friday" = trước thứ Sáu.',
  },
  {
    id: 'p5-003',
    part: 5,
    type: 'reading',
    question: 'The manager was _______ impressed by the presentation.',
    options: ['particular', 'particularly', 'particularity', 'particularize'],
    correctAnswer: 1,
    explanation: 'Cần trạng từ (adverb) để bổ nghĩa cho tính từ "impressed". "particularly" là adverb.',
  },
  {
    id: 'p5-004',
    part: 5,
    type: 'reading',
    question: 'The budget proposal was approved _______ some minor revisions.',
    options: ['despite', 'with', 'although', 'because'],
    correctAnswer: 1,
    explanation: '"with some minor revisions" = kèm theo một số chỉnh sửa nhỏ. "with" là giới từ phù hợp.',
  },
  {
    id: 'p5-005',
    part: 5,
    type: 'reading',
    question: 'Ms. Chen is responsible _______ overseeing the new project.',
    options: ['to', 'for', 'with', 'about'],
    correctAnswer: 1,
    explanation: '"responsible for + V-ing" là collocation cố định. "responsible for overseeing" = chịu trách nhiệm giám sát.',
  },
  {
    id: 'p5-006',
    part: 5,
    type: 'reading',
    question: 'The conference room is _______ enough to accommodate 50 people.',
    options: ['large', 'largely', 'larger', 'largest'],
    correctAnswer: 0,
    explanation: 'Cấu trúc "adj + enough": cần tính từ nguyên mẫu. "large enough" = đủ lớn.',
  },
  {
    id: 'p5-007',
    part: 5,
    type: 'reading',
    question: 'Customers who _______ before March 1 will receive a discount.',
    options: ['register', 'registers', 'registering', 'registered'],
    correctAnswer: 0,
    explanation: '"Customers who" là chủ ngữ số nhiều, cần động từ không chia. Câu ở thì hiện tại đơn.',
  },
  {
    id: 'p5-008',
    part: 5,
    type: 'reading',
    question: 'The annual report includes a _______ analysis of market trends.',
    options: ['comprehend', 'comprehensive', 'comprehension', 'comprehensively'],
    correctAnswer: 1,
    explanation: 'Trước danh từ "analysis" cần tính từ. "comprehensive" (adj) = toàn diện.',
  },
]
```

- [ ] **Step 3: Create sample vocabulary data**

Create `src/data/vocabulary/business.ts`:

```typescript
import { VocabularyWord } from '../../types'

export const businessVocabulary: VocabularyWord[] = [
  {
    id: 'v-biz-001',
    word: 'negotiate',
    ipa: '/nɪˈɡoʊʃieɪt/',
    meaning: 'đàm phán, thương lượng',
    partOfSpeech: 'verb',
    example: 'The two companies will negotiate the terms of the contract next week.',
    synonyms: ['bargain', 'discuss'],
    topic: 'business',
  },
  {
    id: 'v-biz-002',
    word: 'revenue',
    ipa: '/ˈrevənjuː/',
    meaning: 'doanh thu',
    partOfSpeech: 'noun',
    example: 'The company reported a 15% increase in revenue this quarter.',
    synonyms: ['income', 'earnings'],
    topic: 'business',
  },
  {
    id: 'v-biz-003',
    word: 'deadline',
    ipa: '/ˈdedlaɪn/',
    meaning: 'hạn chót, thời hạn',
    partOfSpeech: 'noun',
    example: 'Please make sure to submit the proposal before the deadline.',
    topic: 'business',
  },
  {
    id: 'v-biz-004',
    word: 'implement',
    ipa: '/ˈɪmplɪment/',
    meaning: 'thực hiện, triển khai',
    partOfSpeech: 'verb',
    example: 'The team will implement the new policy starting next month.',
    synonyms: ['execute', 'carry out'],
    topic: 'business',
  },
  {
    id: 'v-biz-005',
    word: 'contract',
    ipa: '/ˈkɒntrækt/',
    meaning: 'hợp đồng',
    partOfSpeech: 'noun',
    example: 'Both parties signed the contract after months of negotiation.',
    synonyms: ['agreement', 'deal'],
    topic: 'business',
  },
  {
    id: 'v-biz-006',
    word: 'profitable',
    ipa: '/ˈprɒfɪtəbl/',
    meaning: 'có lợi nhuận, sinh lời',
    partOfSpeech: 'adjective',
    example: 'The new product line has been very profitable for the company.',
    synonyms: ['lucrative', 'gainful'],
    antonyms: ['unprofitable'],
    topic: 'business',
  },
  {
    id: 'v-biz-007',
    word: 'budget',
    ipa: '/ˈbʌdʒɪt/',
    meaning: 'ngân sách',
    partOfSpeech: 'noun',
    example: 'The marketing department exceeded its budget by 10%.',
    topic: 'business',
  },
  {
    id: 'v-biz-008',
    word: 'invoice',
    ipa: '/ˈɪnvɔɪs/',
    meaning: 'hóa đơn',
    partOfSpeech: 'noun',
    example: 'Please send the invoice to our accounting department.',
    synonyms: ['bill'],
    topic: 'business',
  },
  {
    id: 'v-biz-009',
    word: 'quarterly',
    ipa: '/ˈkwɔːrtərli/',
    meaning: 'hàng quý, mỗi quý',
    partOfSpeech: 'adjective',
    example: 'The company holds quarterly meetings to review progress.',
    topic: 'business',
  },
  {
    id: 'v-biz-010',
    word: 'colleague',
    ipa: '/ˈkɒliːɡ/',
    meaning: 'đồng nghiệp',
    partOfSpeech: 'noun',
    example: 'I discussed the project plan with my colleagues.',
    synonyms: ['coworker', 'associate'],
    topic: 'business',
  },
]
```

- [ ] **Step 4: Create sample grammar lesson**

Create `src/data/grammar/parts-of-speech.ts`:

```typescript
import { GrammarLesson } from '../../types'

export const partsOfSpeechLesson: GrammarLesson = {
  id: 'gram-01',
  title: 'Loại từ & Vị trí trong câu',
  order: 1,
  content: `
## Loại từ trong tiếng Anh

Trong TOEIC Part 5, bạn thường gặp câu hỏi yêu cầu chọn đúng **loại từ** (part of speech) để điền vào chỗ trống.

### 4 loại từ chính:

**1. Noun (Danh từ)** - chỉ người, vật, sự việc
- Vị trí: sau mạo từ (a/an/the), sau tính từ, sau giới từ
- Đuôi thường gặp: -tion, -ment, -ness, -ity, -ance/-ence

**2. Verb (Động từ)** - chỉ hành động, trạng thái
- Vị trí: sau chủ ngữ, sau trợ động từ (will, can, must, have)
- Đuôi thường gặp: -ize, -ify, -ate

**3. Adjective (Tính từ)** - mô tả danh từ
- Vị trí: trước danh từ, sau "be/become/seem"
- Đuôi thường gặp: -ful, -ive, -ous, -able, -al

**4. Adverb (Trạng từ)** - bổ nghĩa cho động từ, tính từ, trạng từ khác
- Vị trí: trước/sau động từ, trước tính từ
- Đuôi thường gặp: -ly

### Mẹo: Nhìn vị trí trong câu để xác định loại từ cần điền!
  `.trim(),
  examples: [
    {
      english: 'The _______ of the project was completed on time. (completion)',
      vietnamese: 'Sau "The" và trước "of" → cần NOUN → completion',
    },
    {
      english: 'She works _______. (efficiently)',
      vietnamese: 'Bổ nghĩa cho động từ "works" → cần ADVERB → efficiently',
    },
    {
      english: 'This is a _______ solution. (practical)',
      vietnamese: 'Trước danh từ "solution" → cần ADJECTIVE → practical',
    },
  ],
  exercises: [
    {
      id: 'gram-01-ex01',
      question: 'The _______ of the new software took several months.',
      options: ['develop', 'development', 'developing', 'developer'],
      correctAnswer: 1,
      explanation: 'Sau "The" và trước "of" cần danh từ. "development" là noun chỉ sự phát triển.',
    },
    {
      id: 'gram-01-ex02',
      question: 'Our team worked _______ to meet the deadline.',
      options: ['diligent', 'diligence', 'diligently', 'diligentness'],
      correctAnswer: 2,
      explanation: 'Cần trạng từ bổ nghĩa cho động từ "worked". "diligently" là adverb.',
    },
    {
      id: 'gram-01-ex03',
      question: 'The report contains _______ information about the market.',
      options: ['value', 'valuable', 'valuably', 'valuation'],
      correctAnswer: 1,
      explanation: 'Trước danh từ "information" cần tính từ. "valuable" là adjective = có giá trị.',
    },
    {
      id: 'gram-01-ex04',
      question: 'We need to _______ the process to save time.',
      options: ['simplification', 'simple', 'simplify', 'simply'],
      correctAnswer: 2,
      explanation: 'Sau "to" cần động từ nguyên mẫu. "simplify" là verb = đơn giản hóa.',
    },
    {
      id: 'gram-01-ex05',
      question: 'Customer _______ is our top priority.',
      options: ['satisfy', 'satisfactory', 'satisfaction', 'satisfactorily'],
      correctAnswer: 2,
      explanation: 'Vị trí chủ ngữ trước "is" cần danh từ. "satisfaction" là noun = sự hài lòng.',
    },
  ],
}
```

- [ ] **Step 5: Create roadmap data**

Create `src/data/roadmap.ts`:

```typescript
import { RoadmapWeek } from '../types'

export const roadmap: RoadmapWeek[] = [
  // Phase 1: Nền tảng (Tuần 1-4)
  {
    week: 1,
    phase: 1,
    title: 'Làm quen cấu trúc TOEIC & Từ vựng cơ bản',
    tasks: [
      { id: 'w1-1', type: 'vocabulary', description: 'Học 50 từ vựng chủ đề Business', target: 'topic:business', quantity: 50 },
      { id: 'w1-2', type: 'grammar', description: 'Bài 1: Loại từ & vị trí trong câu', target: 'lesson:gram-01' },
      { id: 'w1-3', type: 'practice', description: 'Làm 10 câu Part 5', target: 'part:5', quantity: 10 },
    ],
  },
  {
    week: 2,
    phase: 1,
    title: 'Tiếp tục từ vựng & Ngữ pháp cơ bản',
    tasks: [
      { id: 'w2-1', type: 'vocabulary', description: 'Học 50 từ vựng chủ đề Office', target: 'topic:office', quantity: 50 },
      { id: 'w2-2', type: 'grammar', description: 'Bài 2: Thì động từ', target: 'lesson:gram-02' },
      { id: 'w2-3', type: 'practice', description: 'Làm 10 câu Part 5 + ôn từ vựng', target: 'part:5', quantity: 10 },
    ],
  },
  {
    week: 3,
    phase: 1,
    title: 'Mở rộng từ vựng & Làm quen Listening',
    tasks: [
      { id: 'w3-1', type: 'vocabulary', description: 'Học 50 từ vựng chủ đề Finance', target: 'topic:finance', quantity: 50 },
      { id: 'w3-2', type: 'grammar', description: 'Bài 3: Câu bị động', target: 'lesson:gram-03' },
      { id: 'w3-3', type: 'practice', description: 'Làm quen Part 1 & Part 2', target: 'part:1', quantity: 5 },
    ],
  },
  {
    week: 4,
    phase: 1,
    title: 'Tổng ôn tháng 1',
    tasks: [
      { id: 'w4-1', type: 'vocabulary', description: 'Ôn lại 150 từ đã học', target: 'review', quantity: 150 },
      { id: 'w4-2', type: 'practice', description: 'Làm 20 câu Part 5 tổng hợp', target: 'part:5', quantity: 20 },
    ],
  },
  // Phase 2: Mở rộng (Tuần 5-8)
  {
    week: 5,
    phase: 2,
    title: 'Part 3 & Từ vựng nâng cao',
    tasks: [
      { id: 'w5-1', type: 'vocabulary', description: 'Học 50 từ chủ đề Travel', target: 'topic:travel', quantity: 50 },
      { id: 'w5-2', type: 'grammar', description: 'Bài 4: Liên từ & từ nối', target: 'lesson:gram-04' },
      { id: 'w5-3', type: 'practice', description: 'Luyện Part 3', target: 'part:3', quantity: 12 },
    ],
  },
  {
    week: 6,
    phase: 2,
    title: 'Part 4 & Part 6',
    tasks: [
      { id: 'w6-1', type: 'vocabulary', description: 'Học 50 từ chủ đề Health', target: 'topic:health', quantity: 50 },
      { id: 'w6-2', type: 'grammar', description: 'Bài 5: Giới từ', target: 'lesson:gram-05' },
      { id: 'w6-3', type: 'practice', description: 'Luyện Part 4 & Part 6', target: 'part:4', quantity: 12 },
    ],
  },
  {
    week: 7,
    phase: 2,
    title: 'Ngữ pháp nâng cao',
    tasks: [
      { id: 'w7-1', type: 'vocabulary', description: 'Học 50 từ chủ đề Technology', target: 'topic:technology', quantity: 50 },
      { id: 'w7-2', type: 'grammar', description: 'Bài 6: Đại từ quan hệ', target: 'lesson:gram-06' },
      { id: 'w7-3', type: 'practice', description: 'Luyện Part 5 & Part 6 mix', target: 'part:5', quantity: 15 },
    ],
  },
  {
    week: 8,
    phase: 2,
    title: 'Tổng ôn tháng 2',
    tasks: [
      { id: 'w8-1', type: 'vocabulary', description: 'Ôn 300 từ đã học', target: 'review', quantity: 300 },
      { id: 'w8-2', type: 'grammar', description: 'Bài 7: So sánh', target: 'lesson:gram-07' },
      { id: 'w8-3', type: 'practice', description: 'Mini Test lần 1', target: 'mini', quantity: 1 },
    ],
  },
  // Phase 3: Luyện đề (Tuần 9-12)
  {
    week: 9,
    phase: 3,
    title: 'Part 7 - Đọc hiểu cơ bản',
    tasks: [
      { id: 'w9-1', type: 'vocabulary', description: 'Học 50 từ chủ đề HR', target: 'topic:hr', quantity: 50 },
      { id: 'w9-2', type: 'grammar', description: 'Bài 8: Câu điều kiện', target: 'lesson:gram-08' },
      { id: 'w9-3', type: 'practice', description: 'Luyện Part 7 single passage', target: 'part:7', quantity: 10 },
    ],
  },
  {
    week: 10,
    phase: 3,
    title: 'Part 7 nâng cao & Mini Test',
    tasks: [
      { id: 'w10-1', type: 'vocabulary', description: 'Học 50 từ chủ đề Manufacturing', target: 'topic:manufacturing', quantity: 50 },
      { id: 'w10-2', type: 'practice', description: 'Luyện Part 7 double passage', target: 'part:7', quantity: 10 },
      { id: 'w10-3', type: 'practice', description: 'Mini Test lần 2', target: 'mini', quantity: 1 },
    ],
  },
  {
    week: 11,
    phase: 3,
    title: 'Luyện đề tổng hợp',
    tasks: [
      { id: 'w11-1', type: 'vocabulary', description: 'Ôn từ vựng yếu', target: 'review' },
      { id: 'w11-2', type: 'practice', description: 'Mini Test lần 3', target: 'mini', quantity: 1 },
      { id: 'w11-3', type: 'practice', description: 'Ôn Part yếu nhất', target: 'weakest' },
    ],
  },
  {
    week: 12,
    phase: 3,
    title: 'Tổng ôn tháng 3',
    tasks: [
      { id: 'w12-1', type: 'vocabulary', description: 'Ôn toàn bộ từ vựng', target: 'review' },
      { id: 'w12-2', type: 'practice', description: 'Full Test lần 1', target: 'full', quantity: 1 },
    ],
  },
  // Phase 4: Tổng ôn (Tuần 13-16)
  {
    week: 13,
    phase: 4,
    title: 'Full Test & Phân tích điểm yếu',
    tasks: [
      { id: 'w13-1', type: 'practice', description: 'Full Test lần 2', target: 'full', quantity: 1 },
      { id: 'w13-2', type: 'practice', description: 'Ôn Part yếu nhất dựa trên kết quả', target: 'weakest' },
    ],
  },
  {
    week: 14,
    phase: 4,
    title: 'Tập trung điểm yếu',
    tasks: [
      { id: 'w14-1', type: 'vocabulary', description: 'Ôn từ vựng hay quên', target: 'review' },
      { id: 'w14-2', type: 'grammar', description: 'Ôn ngữ pháp hay sai', target: 'review' },
      { id: 'w14-3', type: 'practice', description: 'Full Test lần 3', target: 'full', quantity: 1 },
    ],
  },
  {
    week: 15,
    phase: 4,
    title: 'Mô phỏng thi thật',
    tasks: [
      { id: 'w15-1', type: 'practice', description: 'Full Test lần 4 (tính giờ nghiêm ngặt)', target: 'full', quantity: 1 },
      { id: 'w15-2', type: 'vocabulary', description: 'Ôn lại từ vựng lần cuối', target: 'review' },
    ],
  },
  {
    week: 16,
    phase: 4,
    title: 'Sẵn sàng thi!',
    tasks: [
      { id: 'w16-1', type: 'practice', description: 'Full Test cuối cùng', target: 'full', quantity: 1 },
      { id: 'w16-2', type: 'vocabulary', description: 'Review nhanh từ khó', target: 'review' },
    ],
  },
]
```

- [ ] **Step 6: Commit**

```bash
git add src/types/ src/data/
git commit -m "feat: add TypeScript types and sample data for practice, vocabulary, grammar, roadmap"
```

---

### Task 3: Custom Hooks (useLocalStorage, useTimer, useSpacedRepetition)

**Files:**
- Create: `src/hooks/useLocalStorage.ts`
- Create: `src/hooks/useTimer.ts`
- Create: `src/hooks/useSpacedRepetition.ts`
- Create: `src/hooks/__tests__/useLocalStorage.test.ts`
- Create: `src/hooks/__tests__/useTimer.test.ts`
- Create: `src/hooks/__tests__/useSpacedRepetition.test.ts`

- [ ] **Step 1: Write test for useLocalStorage**

Create `src/hooks/__tests__/useLocalStorage.test.ts`:

```typescript
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'

beforeEach(() => {
  localStorage.clear()
})

describe('useLocalStorage', () => {
  it('returns initial value when no stored value exists', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('returns stored value when it exists', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('stored')
  })

  it('updates localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    act(() => {
      result.current[1]('updated')
    })
    expect(result.current[0]).toBe('updated')
    expect(JSON.parse(localStorage.getItem('test-key')!)).toBe('updated')
  })

  it('works with objects', () => {
    const initial = { count: 0 }
    const { result } = renderHook(() => useLocalStorage('obj-key', initial))
    act(() => {
      result.current[1]({ count: 5 })
    })
    expect(result.current[0]).toEqual({ count: 5 })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/hooks/__tests__/useLocalStorage.test.ts
```

Expected: FAIL - module not found.

- [ ] **Step 3: Implement useLocalStorage**

Create `src/hooks/useLocalStorage.ts`:

```typescript
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // localStorage full or unavailable
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/hooks/__tests__/useLocalStorage.test.ts
```

Expected: 4 tests PASS.

- [ ] **Step 5: Write test for useTimer**

Create `src/hooks/__tests__/useTimer.test.ts`:

```typescript
import { renderHook, act } from '@testing-library/react'
import { useTimer } from '../useTimer'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts at given time and counts down', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useTimer(60, onComplete))

    expect(result.current.timeLeft).toBe(60)

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.timeLeft).toBe(59)
  })

  it('calls onComplete when time reaches 0', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useTimer(2, onComplete))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(result.current.timeLeft).toBe(0)
  })

  it('can pause and resume', () => {
    const { result } = renderHook(() => useTimer(60, vi.fn()))

    act(() => result.current.start())
    act(() => vi.advanceTimersByTime(5000))
    expect(result.current.timeLeft).toBe(55)

    act(() => result.current.pause())
    act(() => vi.advanceTimersByTime(5000))
    expect(result.current.timeLeft).toBe(55) // unchanged

    act(() => result.current.start())
    act(() => vi.advanceTimersByTime(3000))
    expect(result.current.timeLeft).toBe(52)
  })

  it('returns elapsed time', () => {
    const { result } = renderHook(() => useTimer(60, vi.fn()))

    act(() => result.current.start())
    act(() => vi.advanceTimersByTime(10000))

    expect(result.current.elapsed).toBe(10)
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npx vitest run src/hooks/__tests__/useTimer.test.ts
```

Expected: FAIL.

- [ ] **Step 7: Implement useTimer**

Create `src/hooks/useTimer.ts`:

```typescript
import { useState, useRef, useCallback, useEffect } from 'react'

export function useTimer(initialSeconds: number, onComplete: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(initialSeconds)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    clearTimer()
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer()
          setIsRunning(false)
          onComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [clearTimer, onComplete])

  const pause = useCallback(() => {
    clearTimer()
    setIsRunning(false)
  }, [clearTimer])

  const reset = useCallback(() => {
    clearTimer()
    setIsRunning(false)
    setTimeLeft(initialSeconds)
  }, [clearTimer, initialSeconds])

  useEffect(() => {
    startTimeRef.current = initialSeconds
    setTimeLeft(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    return clearTimer
  }, [clearTimer])

  const elapsed = initialSeconds - timeLeft

  return { timeLeft, elapsed, isRunning, start, pause, reset }
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npx vitest run src/hooks/__tests__/useTimer.test.ts
```

Expected: 4 tests PASS.

- [ ] **Step 9: Write test for useSpacedRepetition**

Create `src/hooks/__tests__/useSpacedRepetition.test.ts`:

```typescript
import { calculateNextReview } from '../useSpacedRepetition'

describe('calculateNextReview', () => {
  it('resets to level 0 for quality 1 (did not know)', () => {
    const result = calculateNextReview({ level: 3, quality: 1 })
    expect(result.level).toBe(0)
    expect(result.intervalDays).toBe(1)
  })

  it('stays at same level for quality 3 (somewhat knew)', () => {
    const result = calculateNextReview({ level: 2, quality: 3 })
    expect(result.level).toBe(2)
    expect(result.intervalDays).toBeGreaterThanOrEqual(1)
  })

  it('increases level for quality 5 (knew well)', () => {
    const result = calculateNextReview({ level: 2, quality: 5 })
    expect(result.level).toBe(3)
    expect(result.intervalDays).toBeGreaterThan(1)
  })

  it('caps at level 5', () => {
    const result = calculateNextReview({ level: 5, quality: 5 })
    expect(result.level).toBe(5)
  })

  it('gives increasing intervals for higher levels', () => {
    const lvl1 = calculateNextReview({ level: 1, quality: 5 })
    const lvl3 = calculateNextReview({ level: 3, quality: 5 })
    expect(lvl3.intervalDays).toBeGreaterThan(lvl1.intervalDays)
  })
})
```

- [ ] **Step 10: Run test to verify it fails**

```bash
npx vitest run src/hooks/__tests__/useSpacedRepetition.test.ts
```

Expected: FAIL.

- [ ] **Step 11: Implement useSpacedRepetition**

Create `src/hooks/useSpacedRepetition.ts`:

```typescript
import { VocabularyProgress } from '../types'

const INTERVALS = [1, 1, 2, 4, 7, 14] // days per level 0-5

export function calculateNextReview(params: { level: number; quality: number }): {
  level: number
  intervalDays: number
} {
  const { level, quality } = params

  if (quality <= 1) {
    return { level: 0, intervalDays: 1 }
  }

  if (quality <= 3) {
    return { level, intervalDays: INTERVALS[level] ?? 14 }
  }

  // quality 5: knew well
  const newLevel = Math.min(level + 1, 5)
  return { level: newLevel, intervalDays: INTERVALS[newLevel] ?? 14 }
}

export function getNextReviewDate(intervalDays: number): string {
  const date = new Date()
  date.setDate(date.getDate() + intervalDays)
  return date.toISOString().split('T')[0]
}

export function isDueForReview(progress: VocabularyProgress): boolean {
  const today = new Date().toISOString().split('T')[0]
  return progress.nextReview <= today
}

export function getWordsToReview(allProgress: VocabularyProgress[]): VocabularyProgress[] {
  return allProgress.filter(isDueForReview)
}
```

- [ ] **Step 12: Run test to verify it passes**

```bash
npx vitest run src/hooks/__tests__/useSpacedRepetition.test.ts
```

Expected: 5 tests PASS.

- [ ] **Step 13: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useLocalStorage, useTimer, useSpacedRepetition hooks with tests"
```

---

### Task 4: App Context & Scoring Utility

**Files:**
- Create: `src/context/AppContext.tsx`
- Create: `src/utils/scoring.ts`
- Create: `src/utils/__tests__/scoring.test.ts`

- [ ] **Step 1: Write test for scoring utility**

Create `src/utils/__tests__/scoring.test.ts`:

```typescript
import { calculateToeicScore, getPartAccuracy } from '../scoring'
import { AnswerRecord } from '../../types'

describe('calculateToeicScore', () => {
  it('returns 0/0 for empty answers', () => {
    const result = calculateToeicScore([], [])
    expect(result).toEqual({ listening: 0, reading: 0, total: 0 })
  })

  it('calculates proportional score based on correct answers', () => {
    const listening: AnswerRecord[] = [
      { questionId: 'q1', selected: 0, correct: true },
      { questionId: 'q2', selected: 1, correct: true },
    ]
    const reading: AnswerRecord[] = [
      { questionId: 'q3', selected: 0, correct: true },
      { questionId: 'q4', selected: 2, correct: false },
    ]
    const result = calculateToeicScore(listening, reading)
    // 2/2 listening = 495, 1/2 reading = ~248
    expect(result.listening).toBe(495)
    expect(result.reading).toBe(248)
    expect(result.total).toBe(743)
  })
})

describe('getPartAccuracy', () => {
  it('returns accuracy per part', () => {
    const answers: AnswerRecord[] = [
      { questionId: 'p5-001', selected: 0, correct: true },
      { questionId: 'p5-002', selected: 1, correct: false },
      { questionId: 'p5-003', selected: 1, correct: true },
    ]
    const partMap: Record<string, number> = {
      'p5-001': 5,
      'p5-002': 5,
      'p5-003': 5,
    }
    const result = getPartAccuracy(answers, partMap)
    expect(result[5]).toEqual({ correct: 2, total: 3, percentage: Math.round((2 / 3) * 100) })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/utils/__tests__/scoring.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement scoring utility**

Create `src/utils/scoring.ts`:

```typescript
import { AnswerRecord } from '../types'

const MAX_LISTENING = 495
const MAX_READING = 495

export function calculateToeicScore(
  listeningAnswers: AnswerRecord[],
  readingAnswers: AnswerRecord[]
): { listening: number; reading: number; total: number } {
  if (listeningAnswers.length === 0 && readingAnswers.length === 0) {
    return { listening: 0, reading: 0, total: 0 }
  }

  const listeningCorrect = listeningAnswers.filter((a) => a.correct).length
  const readingCorrect = readingAnswers.filter((a) => a.correct).length

  const listening =
    listeningAnswers.length > 0
      ? Math.round((listeningCorrect / listeningAnswers.length) * MAX_LISTENING)
      : 0

  const reading =
    readingAnswers.length > 0
      ? Math.round((readingCorrect / readingAnswers.length) * MAX_READING)
      : 0

  return { listening, reading, total: listening + reading }
}

export function getPartAccuracy(
  answers: AnswerRecord[],
  partMap: Record<string, number>
): Record<number, { correct: number; total: number; percentage: number }> {
  const result: Record<number, { correct: number; total: number; percentage: number }> = {}

  for (const answer of answers) {
    const part = partMap[answer.questionId]
    if (part === undefined) continue

    if (!result[part]) {
      result[part] = { correct: 0, total: 0, percentage: 0 }
    }
    result[part].total++
    if (answer.correct) result[part].correct++
  }

  for (const part in result) {
    const data = result[part]
    data.percentage = Math.round((data.correct / data.total) * 100)
  }

  return result
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/utils/__tests__/scoring.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 5: Create AppContext**

Create `src/context/AppContext.tsx`:

```tsx
import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { UserProgress, TestResult, VocabularyProgress, GrammarProgress } from '../types'

const STORAGE_KEY = 'toeic-progress'

const initialProgress: UserProgress = {
  currentWeek: 1,
  startDate: new Date().toISOString().split('T')[0],
  completedTasks: [],
  testHistory: [],
  vocabularyProgress: [],
  grammarProgress: [],
}

type Action =
  | { type: 'ADD_TEST_RESULT'; payload: TestResult }
  | { type: 'UPDATE_VOCAB_PROGRESS'; payload: VocabularyProgress }
  | { type: 'UPDATE_GRAMMAR_PROGRESS'; payload: GrammarProgress }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'SET_WEEK'; payload: number }
  | { type: 'LOAD'; payload: UserProgress }

function reducer(state: UserProgress, action: Action): UserProgress {
  switch (action.type) {
    case 'ADD_TEST_RESULT':
      return { ...state, testHistory: [...state.testHistory, action.payload] }
    case 'UPDATE_VOCAB_PROGRESS': {
      const existing = state.vocabularyProgress.findIndex(
        (v) => v.wordId === action.payload.wordId
      )
      const updated = [...state.vocabularyProgress]
      if (existing >= 0) {
        updated[existing] = action.payload
      } else {
        updated.push(action.payload)
      }
      return { ...state, vocabularyProgress: updated }
    }
    case 'UPDATE_GRAMMAR_PROGRESS': {
      const existing = state.grammarProgress.findIndex(
        (g) => g.lessonId === action.payload.lessonId
      )
      const updated = [...state.grammarProgress]
      if (existing >= 0) {
        updated[existing] = action.payload
      } else {
        updated.push(action.payload)
      }
      return { ...state, grammarProgress: updated }
    }
    case 'COMPLETE_TASK':
      if (state.completedTasks.includes(action.payload)) return state
      return { ...state, completedTasks: [...state.completedTasks, action.payload] }
    case 'SET_WEEK':
      return { ...state, currentWeek: action.payload }
    case 'LOAD':
      return action.payload
    default:
      return state
  }
}

interface AppContextType {
  progress: UserProgress
  dispatch: React.Dispatch<Action>
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [progress, dispatch] = useReducer(reducer, initialProgress, () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as UserProgress) : initialProgress
    } catch {
      return initialProgress
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  return <AppContext.Provider value={{ progress, dispatch }}>{children}</AppContext.Provider>
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
```

- [ ] **Step 6: Commit**

```bash
git add src/context/ src/utils/
git commit -m "feat: add AppContext with reducer for progress, scoring utility with tests"
```

---

### Task 5: Layout & Shared Components

**Files:**
- Create: `src/components/Layout.tsx`
- Create: `src/components/Timer.tsx`
- Create: `src/components/QuestionCard.tsx`
- Create: `src/components/ProgressBar.tsx`
- Create: `src/components/QuestionNav.tsx`
- Create: `src/components/Flashcard.tsx`
- Create: `src/components/AudioPlayer.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Layout component**

Create `src/components/Layout.tsx`:

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-700">TOEIC 550+</h1>
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
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

- [ ] **Step 2: Create Timer component**

Create `src/components/Timer.tsx`:

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
        className={`font-mono text-2xl font-bold ${isLow ? 'text-red-600' : 'text-gray-800'}`}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <button
        onClick={onToggle}
        className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
      >
        {isRunning ? 'Tạm dừng' : 'Tiếp tục'}
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Create QuestionCard component**

Create `src/components/QuestionCard.tsx`:

```tsx
interface QuestionCardProps {
  questionNumber: number
  question: string
  passage?: string
  options: string[]
  selectedAnswer: number | null
  correctAnswer?: number // shown after submit
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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-gray-500">Câu {questionNumber}</span>
        <button
          onClick={onToggleBookmark}
          className={`text-lg ${isBookmarked ? 'text-yellow-500' : 'text-gray-300'}`}
          title={isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
        >
          ★
        </button>
      </div>

      {passage && (
        <div className="mb-4 p-4 bg-gray-50 rounded text-sm leading-relaxed whitespace-pre-wrap">
          {passage}
        </div>
      )}

      <p className="text-gray-800 font-medium mb-4">{question}</p>

      <div className="space-y-2">
        {options.map((option, index) => {
          let className = 'w-full text-left px-4 py-3 rounded-lg border transition-colors '

          if (isReviewMode) {
            if (index === correctAnswer) {
              className += 'border-green-500 bg-green-50 text-green-800'
            } else if (index === selectedAnswer && !options[index]) {
              className += 'border-red-500 bg-red-50 text-red-800'
            } else if (index === selectedAnswer && index !== correctAnswer) {
              className += 'border-red-500 bg-red-50 text-red-800'
            } else {
              className += 'border-gray-200 text-gray-500'
            }
          } else if (index === selectedAnswer) {
            className += 'border-blue-500 bg-blue-50 text-blue-800'
          } else {
            className += 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }

          return (
            <button
              key={index}
              onClick={() => !isReviewMode && onSelect(index)}
              disabled={isReviewMode}
              className={className}
            >
              <span className="font-bold mr-3">{OPTION_LABELS[index]}.</span>
              {option}
            </button>
          )
        })}
      </div>

      {isReviewMode && explanation && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800 mb-1">Giải thích:</p>
          <p className="text-sm text-blue-700">{explanation}</p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Create ProgressBar component**

Create `src/components/ProgressBar.tsx`:

```tsx
interface ProgressBarProps {
  value: number // 0-100
  label?: string
  color?: 'blue' | 'green' | 'yellow' | 'red'
}

const colorMap = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
}

export function ProgressBar({ value, label, color = 'blue' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div>
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">{label}</span>
          <span className="font-medium">{clamped}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${colorMap[color]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create QuestionNav component**

Create `src/components/QuestionNav.tsx`:

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
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Câu hỏi</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: total }, (_, i) => {
          let className = 'w-10 h-10 rounded text-sm font-medium transition-colors '

          if (i === currentIndex) {
            className += 'bg-blue-600 text-white'
          } else if (answers[i] !== null && answers[i] !== undefined) {
            className += 'bg-green-100 text-green-800 border border-green-300'
          } else {
            className += 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }

          return (
            <button key={i} onClick={() => onNavigate(i)} className={className}>
              {bookmarks.has(i) && <span className="text-yellow-500 text-xs">★</span>}
              {i + 1}
            </button>
          )
        })}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-gray-500">
        <span>Đã làm: {answers.filter((a) => a !== null && a !== undefined).length}/{total}</span>
        <span>Đánh dấu: {bookmarks.size}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create Flashcard component**

Create `src/components/Flashcard.tsx`:

```tsx
import { useState } from 'react'
import { VocabularyWord } from '../types'

interface FlashcardProps {
  word: VocabularyWord
  onRate: (quality: 1 | 3 | 5) => void
}

export function Flashcard({ word, onRate }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="max-w-lg mx-auto">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="bg-white rounded-xl shadow-lg p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
      >
        {!isFlipped ? (
          <>
            <p className="text-3xl font-bold text-gray-800 mb-2">{word.word}</p>
            <p className="text-gray-400 text-sm">{word.ipa}</p>
            <p className="text-gray-400 text-xs mt-2">({word.partOfSpeech})</p>
            <p className="text-gray-400 text-sm mt-6">Nhấn để xem nghĩa</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-blue-700 mb-2">{word.meaning}</p>
            <p className="text-gray-600 text-sm mb-4">{word.word} ({word.partOfSpeech})</p>
            <div className="bg-gray-50 rounded p-3 w-full">
              <p className="text-sm text-gray-700 italic">"{word.example}"</p>
            </div>
            {word.synonyms && word.synonyms.length > 0 && (
              <p className="text-xs text-gray-500 mt-3">
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
            className="px-6 py-3 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200"
          >
            Chưa biết
          </button>
          <button
            onClick={() => { setIsFlipped(false); onRate(3) }}
            className="px-6 py-3 bg-yellow-100 text-yellow-700 rounded-lg font-medium hover:bg-yellow-200"
          >
            Hơi biết
          </button>
          <button
            onClick={() => { setIsFlipped(false); onRate(5) }}
            className="px-6 py-3 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200"
          >
            Biết rồi
          </button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 7: Create AudioPlayer component**

Create `src/components/AudioPlayer.tsx`:

```tsx
import { useRef, useState } from 'react'

interface AudioPlayerProps {
  src: string
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const changeSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5]
    const nextIndex = (speeds.indexOf(speed) + 1) % speeds.length
    const newSpeed = speeds[nextIndex]
    setSpeed(newSpeed)
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed
    }
  }

  return (
    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
      />
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <button
        onClick={changeSpeed}
        className="px-2 py-1 text-xs font-medium bg-gray-200 rounded hover:bg-gray-300"
      >
        {speed}x
      </button>
    </div>
  )
}
```

- [ ] **Step 8: Update App.tsx to use Layout and AppProvider**

Replace `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/Layout'

function DashboardPage() {
  return <div>Dashboard - Coming soon</div>
}

function PracticePage() {
  return <div>Practice - Coming soon</div>
}

function VocabularyPage() {
  return <div>Vocabulary - Coming soon</div>
}

function GrammarPage() {
  return <div>Grammar - Coming soon</div>
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/practice/*" element={<PracticePage />} />
            <Route path="/vocabulary/*" element={<VocabularyPage />} />
            <Route path="/grammar/*" element={<GrammarPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 9: Verify dev server and run all tests**

```bash
npm run dev
```

Expected: App loads with header navigation, layout renders correctly.

```bash
npx vitest run
```

Expected: All existing tests pass.

- [ ] **Step 10: Commit**

```bash
git add src/components/ src/App.tsx
git commit -m "feat: add Layout, Timer, QuestionCard, ProgressBar, QuestionNav, Flashcard, AudioPlayer components"
```

---

### Task 6: Practice Page - Part Selection & Quiz Session

**Files:**
- Create: `src/pages/Practice/index.tsx`
- Create: `src/pages/Practice/PracticeSession.tsx`
- Create: `src/pages/Practice/PracticeResult.tsx`
- Modify: `src/App.tsx` - replace placeholder with actual page components

- [ ] **Step 1: Create Practice index page (Part selection)**

Create `src/pages/Practice/index.tsx`:

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

  const startPractice = (part: number) => {
    navigate(`/practice/session?part=${part}`)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Luyện đề thi</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Reading (Part 5-7)</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {PARTS.map((p) => (
            <button
              key={p.part}
              onClick={() => startPractice(p.part)}
              disabled={p.count === 0}
              className={`text-left p-5 rounded-lg border-2 transition-colors ${
                p.count > 0
                  ? 'border-blue-200 hover:border-blue-400 bg-white'
                  : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
              }`}
            >
              <h4 className="font-bold text-gray-800">{p.label}</h4>
              <p className="text-sm text-gray-500 mt-1">{p.description}</p>
              <p className="text-sm text-blue-600 mt-2 font-medium">{p.count} câu</p>
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
      <Route
        path="session"
        element={
          <PracticeSession
            getQuestions={getQuestions}
            onComplete={setLastResult}
          />
        }
      />
      <Route
        path="result"
        element={<PracticeResult result={lastResult} />}
      />
    </Routes>
  )
}
```

- [ ] **Step 2: Create PracticeSession component**

Create `src/pages/Practice/PracticeSession.tsx`:

```tsx
import { useState, useCallback } from 'react'
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
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  )
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set())
  const [isSubmitted, setIsSubmitted] = useState(false)

  const timeLimit = questions.length * 30 // 30 seconds per question

  const handleTimeUp = useCallback(() => {
    if (!isSubmitted) handleSubmit()
  }, [isSubmitted])

  const timer = useTimer(timeLimit, handleTimeUp)

  // Start timer on mount
  useState(() => {
    timer.start()
  })

  const handleSelect = (optionIndex: number) => {
    if (isSubmitted) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = optionIndex
    setAnswers(newAnswers)
  }

  const handleToggleBookmark = () => {
    const newBookmarks = new Set(bookmarks)
    if (newBookmarks.has(currentIndex)) {
      newBookmarks.delete(currentIndex)
    } else {
      newBookmarks.add(currentIndex)
    }
    setBookmarks(newBookmarks)
  }

  const handleSubmit = () => {
    timer.pause()
    setIsSubmitted(true)

    const answerRecords: AnswerRecord[] = questions.map((q, i) => ({
      questionId: q.id,
      selected: answers[i] ?? -1,
      correct: answers[i] === q.correctAnswer,
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
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Chưa có câu hỏi cho Part này.</p>
        <button onClick={() => navigate('/practice')} className="mt-4 text-blue-600 hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const current = questions[currentIndex]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
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
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Câu trước
            </button>

            {!isSubmitted && currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium"
              >
                Nộp bài
              </button>
            ) : isSubmitted && currentIndex === questions.length - 1 ? (
              <button
                onClick={() => navigate('/practice/result')}
                className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium"
              >
                Xem kết quả
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
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

- [ ] **Step 3: Create PracticeResult component**

Create `src/pages/Practice/PracticeResult.tsx`:

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
        <p className="text-gray-500">Không có kết quả.</p>
        <button onClick={() => navigate('/practice')} className="mt-4 text-blue-600 hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100)
  const minutes = Math.floor(result.timeSpent / 60)
  const seconds = result.timeSpent % 60

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kết quả luyện tập</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="text-center mb-6">
          <p className="text-5xl font-bold text-blue-700">{percentage}%</p>
          <p className="text-gray-500 mt-2">
            {result.correctAnswers}/{result.totalQuestions} câu đúng
          </p>
        </div>

        <ProgressBar
          value={percentage}
          label="Tỷ lệ đúng"
          color={percentage >= 70 ? 'green' : percentage >= 50 ? 'yellow' : 'red'}
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 rounded p-4">
            <p className="text-sm text-gray-500">Thời gian</p>
            <p className="text-lg font-bold">
              {minutes}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-sm text-gray-500">Chế độ</p>
            <p className="text-lg font-bold">
              {result.mode === 'part' ? `Part ${result.part}` : result.mode === 'mini' ? 'Mini Test' : 'Full Test'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/practice')}
          className="flex-1 px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium"
        >
          Luyện tiếp
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
        >
          Về Dashboard
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Update App.tsx to use real page components**

Replace `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/Layout'
import PracticePage from './pages/Practice'

function DashboardPage() {
  return <div>Dashboard - Coming soon</div>
}

function VocabularyPage() {
  return <div>Vocabulary - Coming soon</div>
}

function GrammarPage() {
  return <div>Grammar - Coming soon</div>
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/practice/*" element={<PracticePage />} />
            <Route path="/vocabulary/*" element={<VocabularyPage />} />
            <Route path="/grammar/*" element={<GrammarPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 5: Verify Practice flow works**

```bash
npm run dev
```

Expected: Navigate to `/practice`, select Part 5, answer questions, submit, see results. Timer counts down. Bookmarks work. Navigation panel shows progress.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Practice/ src/App.tsx
git commit -m "feat: add Practice page with part selection, quiz session, timer, and results"
```

---

### Task 7: Vocabulary Page - Flashcard & Quiz

**Files:**
- Create: `src/pages/Vocabulary/index.tsx`
- Create: `src/pages/Vocabulary/FlashcardSession.tsx`
- Create: `src/pages/Vocabulary/VocabQuiz.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Vocabulary index page**

Create `src/pages/Vocabulary/index.tsx`:

```tsx
import { Routes, Route, useNavigate } from 'react-router-dom'
import { FlashcardSession } from './FlashcardSession'
import { VocabQuiz } from './VocabQuiz'
import { businessVocabulary } from '../../data/vocabulary/business'
import { useAppContext } from '../../context/AppContext'
import { getWordsToReview } from '../../hooks/useSpacedRepetition'
import { VocabularyWord } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'

const allTopics = [
  { id: 'business', label: 'Business', words: businessVocabulary },
]

function TopicSelection() {
  const navigate = useNavigate()
  const { progress } = useAppContext()

  const allWords = allTopics.flatMap((t) => t.words)
  const learnedCount = progress.vocabularyProgress.length
  const dueForReview = getWordsToReview(progress.vocabularyProgress)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Học từ vựng</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-700">{learnedCount}</p>
            <p className="text-sm text-gray-500">Đã học</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-yellow-600">{dueForReview.length}</p>
            <p className="text-sm text-gray-500">Cần ôn hôm nay</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">
              {learnedCount > 0
                ? Math.round((progress.vocabularyProgress.filter((v) => v.level >= 3).length / learnedCount) * 100)
                : 0}%
            </p>
            <p className="text-sm text-gray-500">Tỷ lệ nhớ</p>
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
          className="w-full mb-6 p-4 rounded-lg bg-yellow-50 border-2 border-yellow-300 hover:border-yellow-400 text-left"
        >
          <h3 className="font-bold text-yellow-800">Ôn tập hôm nay</h3>
          <p className="text-sm text-yellow-600">{dueForReview.length} từ cần ôn lại</p>
        </button>
      )}

      <h3 className="text-lg font-semibold text-gray-700 mb-4">Chủ đề</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {allTopics.map((topic) => (
          <div key={topic.id} className="bg-white rounded-lg shadow p-5">
            <h4 className="font-bold text-gray-800 text-lg">{topic.label}</h4>
            <p className="text-sm text-gray-500 mt-1">{topic.words.length} từ</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/vocabulary/flashcard?topic=${topic.id}`)}
                className="flex-1 px-3 py-2 text-sm rounded bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium"
              >
                Flashcard
              </button>
              <button
                onClick={() => navigate(`/vocabulary/quiz?topic=${topic.id}`)}
                className="flex-1 px-3 py-2 text-sm rounded bg-green-100 text-green-700 hover:bg-green-200 font-medium"
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
      <Route path="review" element={<FlashcardSession getWords={() => []} isReview />} />
    </Routes>
  )
}
```

- [ ] **Step 2: Create FlashcardSession component**

Create `src/pages/Vocabulary/FlashcardSession.tsx`:

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
}

export function FlashcardSession({ getWords, isReview }: FlashcardSessionProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { progress, dispatch } = useAppContext()

  const topic = searchParams.get('topic') || ''

  let words: VocabularyWord[]
  if (isReview) {
    const dueProgress = getWordsToReview(progress.vocabularyProgress)
    const allWords = businessVocabulary // For now, search all known words
    words = dueProgress
      .map((p) => allWords.find((w) => w.id === p.wordId))
      .filter((w): w is VocabularyWord => w !== undefined)
  } else {
    words = getWords(topic)
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [stats, setStats] = useState({ total: 0, knew: 0, didntKnow: 0 })

  if (words.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {isReview ? 'Không có từ nào cần ôn hôm nay!' : 'Không tìm thấy từ vựng.'}
        </p>
        <button onClick={() => navigate('/vocabulary')} className="mt-4 text-blue-600 hover:underline">
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

    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Session complete
      setCurrentIndex(-1)
    }
  }

  if (currentIndex === -1) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hoàn thành!</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <p className="text-gray-600">Đã học {stats.total} từ</p>
          <div className="flex justify-center gap-8 mt-4">
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.knew}</p>
              <p className="text-sm text-gray-500">Biết rồi</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.didntKnow}</p>
              <p className="text-sm text-gray-500">Chưa biết</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/vocabulary')}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
        >
          Quay lại
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {isReview ? 'Ôn tập' : `Từ vựng: ${topic}`}
        </h2>
        <span className="text-sm text-gray-500">
          {currentIndex + 1}/{words.length}
        </span>
      </div>

      <Flashcard word={words[currentIndex]} onRate={handleRate} />
    </div>
  )
}
```

- [ ] **Step 3: Create VocabQuiz component**

Create `src/pages/Vocabulary/VocabQuiz.tsx`:

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
  const words = getWords(topic)

  const questions = useMemo(() => generateQuizQuestions(words), [words])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (words.length < 4) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Cần ít nhất 4 từ để tạo quiz.</p>
        <button onClick={() => navigate('/vocabulary')} className="mt-4 text-blue-600 hover:underline">
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

  const handleSubmit = () => setIsSubmitted(true)

  const correctCount = answers.filter((a, i) => a === questions[i].correctAnswer).length

  if (isSubmitted && currentIndex === questions.length) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Kết quả Quiz</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <p className="text-5xl font-bold text-blue-700">
            {Math.round((correctCount / questions.length) * 100)}%
          </p>
          <p className="text-gray-500 mt-2">{correctCount}/{questions.length} câu đúng</p>
        </div>
        <button onClick={() => navigate('/vocabulary')} className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium">
          Quay lại
        </button>
      </div>
    )
  }

  const q = questions[currentIndex]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Quiz: {topic}</h2>
        <span className="text-sm text-gray-500">{currentIndex + 1}/{questions.length}</span>
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
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Câu trước
        </button>

        {currentIndex === questions.length - 1 && !isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium"
          >
            Nộp bài
          </button>
        ) : isSubmitted && currentIndex === questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(questions.length)}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium"
          >
            Xem kết quả
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Câu sau
          </button>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Update App.tsx to use VocabularyPage**

In `src/App.tsx`, replace the VocabularyPage placeholder:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/Layout'
import PracticePage from './pages/Practice'
import VocabularyPage from './pages/Vocabulary'

function DashboardPage() {
  return <div>Dashboard - Coming soon</div>
}

function GrammarPage() {
  return <div>Grammar - Coming soon</div>
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/practice/*" element={<PracticePage />} />
            <Route path="/vocabulary/*" element={<VocabularyPage />} />
            <Route path="/grammar/*" element={<GrammarPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 5: Verify Vocabulary flow works**

```bash
npm run dev
```

Expected: Navigate to `/vocabulary`, see topic list with stats. Click "Flashcard" for Business topic, flip cards, rate them. Click "Quiz", answer multiple choice, submit, see results.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Vocabulary/ src/App.tsx
git commit -m "feat: add Vocabulary page with flashcard sessions, spaced repetition, and quiz mode"
```

---

### Task 8: Grammar Page - Lessons & Exercises

**Files:**
- Create: `src/pages/Grammar/index.tsx`
- Create: `src/pages/Grammar/LessonView.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Grammar index page**

Create `src/pages/Grammar/index.tsx`:

```tsx
import { Routes, Route, useNavigate } from 'react-router-dom'
import { LessonView } from './LessonView'
import { partsOfSpeechLesson } from '../../data/grammar/parts-of-speech'
import { useAppContext } from '../../context/AppContext'
import { GrammarLesson } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'

const allLessons: GrammarLesson[] = [partsOfSpeechLesson]

function LessonList() {
  const navigate = useNavigate()
  const { progress } = useAppContext()

  const completedCount = progress.grammarProgress.filter((g) => g.completed).length

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ngữ pháp TOEIC</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
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
              className="w-full text-left bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Bài {lesson.order}</span>
                    {isCompleted && <span className="text-green-600 text-sm">✓</span>}
                  </div>
                  <h3 className="font-bold text-gray-800 mt-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {lesson.exercises.length} câu bài tập
                  </p>
                </div>
                {score !== undefined && (
                  <div className="text-right">
                    <p className={`text-xl font-bold ${score >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {score}%
                    </p>
                    <p className="text-xs text-gray-400">Điểm bài tập</p>
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
      <Route
        path=":lessonId"
        element={<LessonView lessons={allLessons} />}
      />
    </Routes>
  )
}
```

- [ ] **Step 2: Create LessonView component**

Create `src/pages/Grammar/LessonView.tsx`:

```tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
        <p className="text-gray-500">Không tìm thấy bài học.</p>
        <button onClick={() => navigate('/grammar')} className="mt-4 text-blue-600 hover:underline">
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
    const correctCount = answers.filter(
      (a, i) => a === lesson.exercises[i].correctAnswer
    ).length
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
      <div>
        <button onClick={() => navigate('/grammar')} className="text-blue-600 hover:underline text-sm mb-4 block">
          ← Quay lại danh sách
        </button>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Bài {lesson.order}: {lesson.title}
          </h2>

          <div
            className="prose prose-sm max-w-none mt-6 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br/>') }}
          />

          {lesson.examples.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-gray-800 mb-3">Ví dụ:</h3>
              <div className="space-y-3">
                {lesson.examples.map((ex, i) => (
                  <div key={i} className="bg-blue-50 rounded p-4">
                    <p className="text-blue-800 font-medium">{ex.english}</p>
                    <p className="text-blue-600 text-sm mt-1">→ {ex.vietnamese}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startExercises}
            className="mt-8 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
          >
            Làm bài tập ({lesson.exercises.length} câu)
          </button>
        </div>
      </div>
    )
  }

  // Exercise mode
  const correctCount = isSubmitted
    ? answers.filter((a, i) => a === lesson.exercises[i].correctAnswer).length
    : 0

  if (isSubmitted && currentEx >= lesson.exercises.length) {
    const score = Math.round((correctCount / lesson.exercises.length) * 100)
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Kết quả bài tập</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <p className="text-5xl font-bold text-blue-700">{score}%</p>
          <p className="text-gray-500 mt-2">
            {correctCount}/{lesson.exercises.length} câu đúng
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setShowExercises(false)
              setIsSubmitted(false)
              setCurrentEx(0)
            }}
            className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium"
          >
            Xem lại bài học
          </button>
          <button
            onClick={() => navigate('/grammar')}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
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
        <h2 className="text-xl font-bold text-gray-800">
          Bài tập: {lesson.title}
        </h2>
        <span className="text-sm text-gray-500">{currentEx + 1}/{lesson.exercises.length}</span>
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
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Câu trước
        </button>

        {currentEx === lesson.exercises.length - 1 && !isSubmitted ? (
          <button onClick={handleSubmit} className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium">
            Nộp bài
          </button>
        ) : isSubmitted && currentEx === lesson.exercises.length - 1 ? (
          <button
            onClick={() => setCurrentEx(lesson.exercises.length)}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium"
          >
            Xem kết quả
          </button>
        ) : (
          <button
            onClick={() => setCurrentEx(currentEx + 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Câu sau
          </button>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Update App.tsx to use GrammarPage**

Replace `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/Layout'
import PracticePage from './pages/Practice'
import VocabularyPage from './pages/Vocabulary'
import GrammarPage from './pages/Grammar'

function DashboardPage() {
  return <div>Dashboard - Coming soon</div>
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/practice/*" element={<PracticePage />} />
            <Route path="/vocabulary/*" element={<VocabularyPage />} />
            <Route path="/grammar/*" element={<GrammarPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 4: Verify Grammar flow works**

```bash
npm run dev
```

Expected: Navigate to `/grammar`, see lesson list with progress. Click lesson, read content + examples. Click "Làm bài tập", answer questions, submit, see score.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Grammar/ src/App.tsx
git commit -m "feat: add Grammar page with lesson view, exercises, and progress tracking"
```

---

### Task 9: Dashboard Page - Roadmap, Stats & Charts

**Files:**
- Create: `src/pages/Dashboard/index.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Dashboard page**

Create `src/pages/Dashboard/index.tsx`:

```tsx
import { useAppContext } from '../../context/AppContext'
import { roadmap } from '../../data/roadmap'
import { ProgressBar } from '../../components/ProgressBar'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PHASE_LABELS = ['', 'Nền tảng', 'Mở rộng', 'Luyện đề', 'Tổng ôn']
const PHASE_COLORS = ['', 'blue', 'green', 'yellow', 'red'] as const

export default function DashboardPage() {
  const { progress } = useAppContext()

  const currentWeekData = roadmap.find((w) => w.week === progress.currentWeek)
  const currentPhase = currentWeekData?.phase ?? 1

  // Calculate phase progress
  const phaseWeeks = roadmap.filter((w) => w.phase === currentPhase)
  const phaseStart = phaseWeeks[0]?.week ?? 1
  const phaseEnd = phaseWeeks[phaseWeeks.length - 1]?.week ?? 4
  const phaseProgress = Math.round(
    ((progress.currentWeek - phaseStart) / (phaseEnd - phaseStart + 1)) * 100
  )

  // Stats
  const totalVocabLearned = progress.vocabularyProgress.length
  const grammarCompleted = progress.grammarProgress.filter((g) => g.completed).length
  const testsCompleted = progress.testHistory.length

  // Chart data
  const chartData = progress.testHistory.map((test) => ({
    date: new Date(test.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
    score: Math.round((test.correctAnswers / test.totalQuestions) * 100),
  }))

  // Weakness analysis
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

  const weakestPart = Object.entries(partScores).sort(
    ([, a], [, b]) => a.correct / a.total - b.correct / b.total
  )[0]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {/* Roadmap */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Giai đoạn {currentPhase}: {PHASE_LABELS[currentPhase]}
            </h3>
            <p className="text-sm text-gray-500">Tuần {progress.currentWeek}/16</p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((phase) => (
              <div
                key={phase}
                className={`w-8 h-2 rounded-full ${
                  phase < currentPhase
                    ? 'bg-green-500'
                    : phase === currentPhase
                      ? 'bg-blue-500'
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <ProgressBar value={phaseProgress} label="Tiến độ giai đoạn" />

        {currentWeekData && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">
              Tuần {currentWeekData.week}: {currentWeekData.title}
            </h4>
            <div className="space-y-2">
              {currentWeekData.tasks.map((task) => {
                const isCompleted = progress.completedTasks.includes(task.id)
                return (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 rounded ${
                      isCompleted ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    <span className={isCompleted ? 'text-green-600' : 'text-gray-400'}>
                      {isCompleted ? '✓' : '○'}
                    </span>
                    <span className={`text-sm ${isCompleted ? 'text-green-800 line-through' : 'text-gray-700'}`}>
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
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-3xl font-bold text-blue-700">{totalVocabLearned}</p>
          <p className="text-sm text-gray-500">Từ vựng đã học</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{grammarCompleted}</p>
          <p className="text-sm text-gray-500">Bài ngữ pháp</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{testsCompleted}</p>
          <p className="text-sm text-gray-500">Đề đã làm</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-3xl font-bold text-yellow-600">
            {progress.vocabularyProgress.length > 0
              ? Math.round(
                  (progress.vocabularyProgress.filter((v) => v.level >= 3).length /
                    progress.vocabularyProgress.length) *
                    100
                )
              : 0}%
          </p>
          <p className="text-sm text-gray-500">Tỷ lệ nhớ từ</p>
        </div>
      </div>

      {/* Score chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Lịch sử điểm thi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis domain={[0, 100]} fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Điểm (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Weakness */}
      {weakestPart && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Điểm yếu cần cải thiện</h3>
          <div className="bg-red-50 rounded p-4">
            <p className="font-medium text-red-800">
              Part {weakestPart[0]}: {Math.round((weakestPart[1].correct / weakestPart[1].total) * 100)}% đúng
            </p>
            <p className="text-sm text-red-600 mt-1">
              {weakestPart[1].correct}/{weakestPart[1].total} câu đúng - Nên luyện thêm Part này
            </p>
          </div>
        </div>
      )}

      {chartData.length === 0 && testsCompleted === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Chưa có dữ liệu. Bắt đầu luyện tập để xem thống kê!</p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Update App.tsx to use DashboardPage**

Replace `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/Layout'
import DashboardPage from './pages/Dashboard'
import PracticePage from './pages/Practice'
import VocabularyPage from './pages/Vocabulary'
import GrammarPage from './pages/Grammar'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/practice/*" element={<PracticePage />} />
            <Route path="/vocabulary/*" element={<VocabularyPage />} />
            <Route path="/grammar/*" element={<GrammarPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 3: Verify Dashboard works**

```bash
npm run dev
```

Expected: Dashboard shows roadmap with week 1 tasks, stats cards (all 0 initially). After doing some practice, vocab, and grammar, the stats update and chart appears.

- [ ] **Step 4: Run all tests**

```bash
npx vitest run
```

Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Dashboard/ src/App.tsx
git commit -m "feat: add Dashboard with roadmap tracker, stats, score chart, and weakness analysis"
```

---

### Task 10: End-to-End Verification & Polish

**Files:**
- Possibly modify: any file with bugs found during verification

- [ ] **Step 1: Verify all 4 routes work**

```bash
npm run dev
```

Manual checks:
1. **Dashboard** (`/`): Shows roadmap week 1, stats at 0, no chart yet
2. **Practice** (`/practice`): Part 5 shows 8 questions. Click → answer → submit → see results
3. **Vocabulary** (`/vocabulary`): Business topic with 10 words. Flashcard and Quiz modes work
4. **Grammar** (`/grammar`): Parts of Speech lesson. Read → exercises → submit → see score
5. **Navigation**: All nav links work, active state highlights correctly

- [ ] **Step 2: Verify LocalStorage persistence**

1. Do a Practice session and submit
2. Learn some vocabulary via flashcards
3. Complete a grammar lesson
4. Refresh the page
5. Check Dashboard shows updated stats
6. Check vocabulary progress is preserved

- [ ] **Step 3: Verify responsive layout**

Resize browser to mobile width (~375px). Check:
- Navigation wraps or stacks properly
- Cards and questions are readable
- Flashcards work on touch

- [ ] **Step 4: Run full test suite**

```bash
npx vitest run
```

Expected: All tests pass (useLocalStorage 4, useTimer 4, useSpacedRepetition 5, scoring 3 = 16 tests total).

- [ ] **Step 5: Build check**

```bash
npm run build
```

Expected: Build completes with no errors. Output in `dist/`.

- [ ] **Step 6: Fix any issues found, then final commit**

If any bugs were found and fixed:

```bash
git add -A
git commit -m "fix: address issues found during end-to-end verification"
```

If no issues:

```bash
git status
```

Expected: Clean working directory, all changes committed.
