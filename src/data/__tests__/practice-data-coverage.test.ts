import { describe, expect, it } from 'vitest'
import { part1Questions } from '../tests/part1'
import { part3Questions } from '../tests/part3'
import { part4Questions } from '../tests/part4'
import { part5Questions } from '../tests/part5'
import { part6Questions } from '../tests/part6'
import { part7Questions } from '../tests/part7'
import { Question } from '../../types'

const assertQuestionQuality = (questions: Question[], expectedType: 'listening' | 'reading') => {
  questions.forEach((question, index) => {
    expect(question.options).toHaveLength(4)
    expect(question.correctAnswer).toBeGreaterThanOrEqual(0)
    expect(question.correctAnswer).toBeLessThan(question.options.length)
    expect(question.type).toBe(expectedType)
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
    assertQuestionQuality(part1Questions, 'listening')
    assertQuestionQuality(part3Questions, 'listening')
    assertQuestionQuality(part4Questions, 'listening')
    assertQuestionQuality(part5Questions, 'reading')
    assertQuestionQuality(part6Questions, 'reading')
    assertQuestionQuality(part7Questions, 'reading')
  })
})
