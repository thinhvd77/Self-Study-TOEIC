import { describe, expect, it } from 'vitest'
import { part1Questions } from '../tests/part1'
import { part3Questions } from '../tests/part3'
import { part4Questions } from '../tests/part4'
import { part5Questions } from '../tests/part5'
import { part6Questions } from '../tests/part6'
import { part7Questions } from '../tests/part7'
import { Question } from '../../types'

const assertQuestionQuality = (
  questions: Question[],
  expectedPart: 1 | 3 | 4 | 5 | 6 | 7,
  expectedType: 'listening' | 'reading',
  requiresAudio = false,
  requiresPassage = false
) => {
  questions.forEach((question, index) => {
    expect(question.part).toBe(expectedPart)
    expect(question.options).toHaveLength(4)
    expect(question.correctAnswer).toBeGreaterThanOrEqual(0)
    expect(question.correctAnswer).toBeLessThan(question.options.length)
    expect(question.type).toBe(expectedType)
    if (requiresAudio) {
      expect(question.audioUrl).toBeTruthy()
    }
    if (requiresPassage) {
      expect(question.passage).toBeTruthy()
    }
    expect(question.id).toMatch(/^\w+-\d{3}$/)
    expect(question.explanation.length).toBeGreaterThan(10)
    expect(question.id.endsWith(String(index + 1).padStart(3, '0'))).toBe(true)
  })
}

describe('Practice data coverage', () => {
  it('has minimum question banks per implemented part', () => {
    expect(part1Questions.length).toBeGreaterThanOrEqual(10)
    expect(part3Questions.length).toBeGreaterThanOrEqual(10)
    expect(part4Questions.length).toBeGreaterThanOrEqual(10)
    expect(part5Questions.length).toBeGreaterThanOrEqual(20)
    expect(part6Questions.length).toBeGreaterThanOrEqual(10)
    expect(part7Questions.length).toBeGreaterThanOrEqual(10)
  })

  it('keeps question structure and answer indices valid', () => {
    assertQuestionQuality(part1Questions, 1, 'listening', true)
    assertQuestionQuality(part3Questions, 3, 'listening', true)
    assertQuestionQuality(part4Questions, 4, 'listening', true)
    assertQuestionQuality(part5Questions, 5, 'reading')
    assertQuestionQuality(part6Questions, 6, 'reading')
    assertQuestionQuality(part7Questions, 7, 'reading', false, true)
  })

  it('uses safe answer-key diversity without forcing wrong mappings', () => {
    const datasets = [part1Questions, part3Questions, part4Questions, part5Questions, part6Questions, part7Questions]
    const globalAnswerSet = new Set<number>()

    datasets.forEach((questions) => {
      const answerSet = new Set(questions.map((q) => q.correctAnswer))
      expect(answerSet.size).toBeGreaterThanOrEqual(2)
      answerSet.forEach((answer) => globalAnswerSet.add(answer))
    })

    ;[0, 1, 2, 3].forEach((answer) => expect(globalAnswerSet.has(answer)).toBe(true))
  })

  it('groups part 3 and part 4 into 3-question sets', () => {
    ;[part3Questions, part4Questions].forEach((questions) => {
      const counts = questions.reduce<Record<string, number>>((acc, question) => {
        const groupId = question.groupId ?? ''
        acc[groupId] = (acc[groupId] ?? 0) + 1
        return acc
      }, {})

      Object.values(counts).forEach((count) => expect(count).toBe(3))
    })
  })
})
