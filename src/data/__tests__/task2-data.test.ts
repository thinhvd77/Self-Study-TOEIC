import { describe, expect, it } from 'vitest'
import { part5Questions } from '../tests/part5'
import { businessVocabulary } from '../vocabulary/business'
import { partsOfSpeechLesson } from '../grammar/parts-of-speech'
import { roadmap } from '../roadmap'
import {
  GrammarLesson,
  Question,
  RoadmapWeek,
  UserProgress,
  VocabularyWord,
} from '../../types'

describe('Task 2 sample data', () => {
  it('provides at least 20 sample Part 5 questions', () => {
    expect(part5Questions.length).toBeGreaterThanOrEqual(20)
    expect(part5Questions[0].id).toBe('p5-001')
    expect(part5Questions[19].id).toBe('p5-020')
  })

  it('provides 100 business vocabulary words', () => {
    expect(businessVocabulary).toHaveLength(100)
    expect(businessVocabulary[0].topic).toBe('business')
  })

  it('provides parts of speech lesson with exercises', () => {
    expect(partsOfSpeechLesson.id).toBe('gram-01')
    expect(partsOfSpeechLesson.exercises).toHaveLength(5)
  })

  it('provides 16-week roadmap', () => {
    expect(roadmap).toHaveLength(16)
    expect(roadmap[0].week).toBe(1)
    expect(roadmap[15].week).toBe(16)
  })
})

describe('Task 2 type contracts', () => {
  it('supports Practice and Vocabulary types', () => {
    const question: Question = {
      id: 'q1',
      part: 5,
      type: 'reading',
      question: 'Sample?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Sample explanation',
    }

    const word: VocabularyWord = {
      id: 'w1',
      word: 'budget',
      ipa: '/ˈbʌdʒɪt/',
      meaning: 'ngân sách',
      partOfSpeech: 'noun',
      example: 'We need a bigger budget.',
      topic: 'business',
    }

    expect(question.correctAnswer).toBe(0)
    expect(word.topic).toBe('business')
  })

  it('supports Grammar, Roadmap, and UserProgress types', () => {
    const lesson: GrammarLesson = {
      id: 'gram-x',
      title: 'Sample',
      order: 1,
      content: 'Sample content',
      examples: [{ english: 'Example', vietnamese: 'Ví dụ' }],
      exercises: [
        {
          id: 'ex-1',
          question: 'Choose',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 1,
          explanation: 'Because',
        },
      ],
    }

    const weeks: RoadmapWeek[] = [
      {
        week: 1,
        phase: 1,
        title: 'Week 1',
        tasks: [{ id: 't1', type: 'practice', description: 'Task', target: 'part:5' }],
      },
    ]

    const progress: UserProgress = {
      currentWeek: 1,
      startDate: '2025-01-01',
      completedTasks: [],
      testHistory: [],
      vocabularyProgress: [],
      grammarProgress: [],
    }

    expect(lesson.exercises[0].correctAnswer).toBe(1)
    expect(weeks[0].phase).toBe(1)
    expect(progress.currentWeek).toBe(1)
  })
})
