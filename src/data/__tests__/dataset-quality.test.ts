import { describe, expect, it } from 'vitest'
import { officeVocabulary } from '../vocabulary/office'
import { financeVocabulary } from '../vocabulary/finance'
import { businessVocabulary } from '../vocabulary/business'
import { hrVocabulary } from '../vocabulary/hr'
import { manufacturingVocabulary } from '../vocabulary/manufacturing'
import { partsOfSpeechLesson } from '../grammar/parts-of-speech'

const workplaceKeywords = /(company|team|meeting|project|client|manager|department|report|policy|employee)/i

describe('Dataset quality gates', () => {
  it('keeps office + finance meanings concise', () => {
    const longMeanings = [...officeVocabulary, ...financeVocabulary].filter((w) => w.meaning.length > 70)
    expect(longMeanings).toHaveLength(0)
  })

  it('keeps office + finance examples in workplace context', () => {
    const offContextMiss = officeVocabulary.filter((w) => !workplaceKeywords.test(w.example))
    const finContextMiss = financeVocabulary.filter((w) => !workplaceKeywords.test(w.example))
    expect(offContextMiss).toHaveLength(0)
    expect(finContextMiss).toHaveLength(0)
  })

  it('limits cross-topic duplicates among business/hr/manufacturing/office/finance', () => {
    const pools = [businessVocabulary, hrVocabulary, manufacturingVocabulary, officeVocabulary, financeVocabulary]
    const words = pools.flatMap((topic) => topic.map((w) => w.word.toLowerCase()))
    const duplicates = words.filter((w, i, arr) => arr.indexOf(w) !== i)
    expect(new Set(duplicates).size).toBeLessThanOrEqual(20)
  })

  it('keeps gram-01 depth aligned with other lessons', () => {
    expect(partsOfSpeechLesson.content.length).toBeGreaterThanOrEqual(1800)
  })
})
