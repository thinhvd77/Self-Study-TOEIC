// === Practice (Luyện đề) ===

export interface Question {
  id: string
  part: 1 | 2 | 3 | 4 | 5 | 6 | 7
  type: 'listening' | 'reading'
  audioUrl?: string
  imageUrl?: string
  passage?: string
  passage2?: string
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
  box: 1 | 2 | 3 | 4 | 5
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
  version: number
  dailyBatchSize: number
  topicBatches: Record<string, { date: string; startIndex: number }>
}
