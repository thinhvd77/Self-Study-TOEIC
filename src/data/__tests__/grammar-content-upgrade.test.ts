import { describe, expect, it } from 'vitest'
import { GrammarLesson } from '../../types'
import { partsOfSpeechLesson } from '../grammar/parts-of-speech'
import { verbTensesLesson } from '../grammar/verb-tenses'
import { passiveVoiceLesson } from '../grammar/passive-voice'

const requiredHeadings = [
  '## Mục tiêu bài học',
  '## Khái niệm cốt lõi',
  '## Cách nhận diện trong câu',
  '## Công thức/mẫu cần nhớ',
  '## Lỗi thường gặp',
  '## Mẹo làm TOEIC Part 5',
  '## Tóm tắt nhanh',
]

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
  it('keeps gram-01 beginner-friendly and structured', () => {
    assertStructuredLesson(partsOfSpeechLesson)
  })

  it('keeps gram-02 beginner-friendly and structured', () => {
    assertStructuredLesson(verbTensesLesson)
  })

  it('keeps gram-03 beginner-friendly and structured', () => {
    assertStructuredLesson(passiveVoiceLesson)
  })
})
