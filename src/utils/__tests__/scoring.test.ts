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
