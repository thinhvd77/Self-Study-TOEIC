import { describe, expect, it } from 'vitest'
import { GrammarLesson } from '../../types'
import { partsOfSpeechLesson } from '../grammar/parts-of-speech'
import { verbTensesLesson } from '../grammar/verb-tenses'
import { passiveVoiceLesson } from '../grammar/passive-voice'
import { conjunctionsLesson } from '../grammar/conjunctions'
import { prepositionsLesson } from '../grammar/prepositions'
import { relativePronounsLesson } from '../grammar/relative-pronouns'

const requiredHeadings = [
  '## Mục tiêu bài học',
  '## Khái niệm cốt lõi',
  '## Cách nhận diện trong câu',
  '## Công thức/mẫu cần nhớ',
  '## Lỗi thường gặp',
  '## Mẹo làm TOEIC Part 5',
  '## Tóm tắt nhanh',
]

const expectedLessonIds = ['gram-01', 'gram-02', 'gram-03', 'gram-04', 'gram-05', 'gram-06']

const expectedExerciseIdsByLesson = {
  'gram-01': ['gram-01-ex01', 'gram-01-ex02', 'gram-01-ex03', 'gram-01-ex04', 'gram-01-ex05'],
  'gram-02': ['gram-02-ex01', 'gram-02-ex02', 'gram-02-ex03', 'gram-02-ex04', 'gram-02-ex05'],
  'gram-03': ['gram-03-ex01', 'gram-03-ex02', 'gram-03-ex03', 'gram-03-ex04', 'gram-03-ex05'],
  'gram-04': ['gram-04-ex01', 'gram-04-ex02', 'gram-04-ex03', 'gram-04-ex04', 'gram-04-ex05'],
  'gram-05': ['gram-05-ex01', 'gram-05-ex02', 'gram-05-ex03', 'gram-05-ex04', 'gram-05-ex05'],
  'gram-06': ['gram-06-ex01', 'gram-06-ex02', 'gram-06-ex03', 'gram-06-ex04', 'gram-06-ex05'],
} as const

const expectedCorrectAnswersByLesson = {
  'gram-01': {
    'gram-01-ex01': 1,
    'gram-01-ex02': 2,
    'gram-01-ex03': 1,
    'gram-01-ex04': 2,
    'gram-01-ex05': 2,
  },
  'gram-02': {
    'gram-02-ex01': 1,
    'gram-02-ex02': 1,
    'gram-02-ex03': 2,
    'gram-02-ex04': 0,
    'gram-02-ex05': 2,
  },
  'gram-03': {
    'gram-03-ex01': 1,
    'gram-03-ex02': 1,
    'gram-03-ex03': 2,
    'gram-03-ex04': 2,
    'gram-03-ex05': 2,
  },
  'gram-04': {
    'gram-04-ex01': 1,
    'gram-04-ex02': 2,
    'gram-04-ex03': 0,
    'gram-04-ex04': 2,
    'gram-04-ex05': 0,
  },
  'gram-05': {
    'gram-05-ex01': 2,
    'gram-05-ex02': 2,
    'gram-05-ex03': 3,
    'gram-05-ex04': 0,
    'gram-05-ex05': 1,
  },
  'gram-06': {
    'gram-06-ex01': 2,
    'gram-06-ex02': 3,
    'gram-06-ex03': 2,
    'gram-06-ex04': 3,
    'gram-06-ex05': 3,
  },
} as const

function assertStructuredLesson(lesson: GrammarLesson) {
  expect(lesson.content).toBe(lesson.content.trim())

  for (const heading of requiredHeadings) {
    expect(lesson.content).toContain(heading)
  }

  expect(lesson.examples.length).toBeGreaterThanOrEqual(3)
  expect(lesson.exercises).toHaveLength(5)

  for (const example of lesson.examples) {
    expect(example.english.length).toBeGreaterThanOrEqual(20)
    expect(example.vietnamese.length).toBeGreaterThanOrEqual(30)
  }

  for (const exercise of lesson.exercises) {
    expect(exercise.options).toHaveLength(4)
    expect(exercise.correctAnswer).toBeGreaterThanOrEqual(0)
    expect(exercise.correctAnswer).toBeLessThan(exercise.options.length)
    expect(exercise.explanation.length).toBeGreaterThanOrEqual(60)
  }
}

describe('Grammar content upgrade contract', () => {
  it('preserves required lesson IDs and exercise IDs', () => {
    const lessons = [
      partsOfSpeechLesson,
      verbTensesLesson,
      passiveVoiceLesson,
      conjunctionsLesson,
      prepositionsLesson,
      relativePronounsLesson,
    ]

    expect(lessons.map((lesson) => lesson.id)).toEqual(expectedLessonIds)

    for (const lesson of lessons) {
      expect(lesson.exercises.map((exercise) => exercise.id)).toEqual(
        expectedExerciseIdsByLesson[lesson.id as keyof typeof expectedExerciseIdsByLesson],
      )
    }
  })

  it('locks exact answer keys for gram-01 to gram-06 exercises', () => {
    const lessons = [
      partsOfSpeechLesson,
      verbTensesLesson,
      passiveVoiceLesson,
      conjunctionsLesson,
      prepositionsLesson,
      relativePronounsLesson,
    ]

    for (const lesson of lessons) {
      expect(
        Object.fromEntries(
          lesson.exercises.map((exercise) => [exercise.id, exercise.correctAnswer]),
        ),
      ).toEqual(expectedCorrectAnswersByLesson[lesson.id as keyof typeof expectedCorrectAnswersByLesson])
    }
  })

  it('keeps ambiguity-sensitive questions unchanged', () => {
    const verbTensesAmbiguousItem = verbTensesLesson.exercises.find(
      (exercise) => exercise.id === 'gram-02-ex04',
    )
    const passiveVoiceAmbiguousItem = passiveVoiceLesson.exercises.find(
      (exercise) => exercise.id === 'gram-03-ex02',
    )

    expect(verbTensesAmbiguousItem).toMatchObject({
      question: 'If the venue is available, the conference _______ place next month.',
      options: ['will take', 'takes', 'is taking', 'has taken'],
    })

    expect(passiveVoiceAmbiguousItem).toMatchObject({
      question: 'The new branch office _______ by the CEO in Singapore last year.',
      options: ['opened', 'was opened', 'has been opened', 'is opening'],
    })
  })

  it('keeps gram-01 beginner-friendly and structured', () => {
    assertStructuredLesson(partsOfSpeechLesson)
  })

  it('keeps gram-02 beginner-friendly and structured', () => {
    assertStructuredLesson(verbTensesLesson)
  })

  it('keeps gram-03 beginner-friendly and structured', () => {
    assertStructuredLesson(passiveVoiceLesson)
  })

  it('keeps gram-04 beginner-friendly and structured', () => {
    assertStructuredLesson(conjunctionsLesson)
  })

  it('keeps gram-05 beginner-friendly and structured', () => {
    assertStructuredLesson(prepositionsLesson)
  })

  it('keeps gram-06 beginner-friendly and structured', () => {
    assertStructuredLesson(relativePronounsLesson)
  })
})
