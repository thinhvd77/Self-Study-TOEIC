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

  for (const partKey in result) {
    const part = Number(partKey)
    const data = result[part]
    data.percentage = Math.round((data.correct / data.total) * 100)
  }

  return result
}
