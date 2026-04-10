import { describe, expect, it } from 'vitest'
import { businessVocabulary } from '../vocabulary/business'
import { officeVocabulary } from '../vocabulary/office'
import { financeVocabulary } from '../vocabulary/finance'
import { travelVocabulary } from '../vocabulary/travel'
import { healthVocabulary } from '../vocabulary/health'
import { technologyVocabulary } from '../vocabulary/technology'
import { hrVocabulary } from '../vocabulary/hr'
import { manufacturingVocabulary } from '../vocabulary/manufacturing'
import { marketingVocabulary } from '../vocabulary/marketing'
import { legalVocabulary } from '../vocabulary/legal'
import { realEstateVocabulary } from '../vocabulary/real-estate'
import { environmentVocabulary } from '../vocabulary/environment'
import { VocabularyWord } from '../../types'

const allVocabulary: { name: string; data: VocabularyWord[]; prefix: string; topic: string; expectedCount: number }[] = [
  { name: 'business', data: businessVocabulary, prefix: 'v-biz-', topic: 'business', expectedCount: 150 },
  { name: 'office', data: officeVocabulary, prefix: 'v-off-', topic: 'office', expectedCount: 150 },
  { name: 'finance', data: financeVocabulary, prefix: 'v-fin-', topic: 'finance', expectedCount: 150 },
  { name: 'travel', data: travelVocabulary, prefix: 'v-tra-', topic: 'travel', expectedCount: 150 },
  { name: 'health', data: healthVocabulary, prefix: 'v-hea-', topic: 'health', expectedCount: 150 },
  { name: 'technology', data: technologyVocabulary, prefix: 'v-tec-', topic: 'technology', expectedCount: 150 },
  { name: 'hr', data: hrVocabulary, prefix: 'v-hr-', topic: 'hr', expectedCount: 150 },
  { name: 'manufacturing', data: manufacturingVocabulary, prefix: 'v-mfg-', topic: 'manufacturing', expectedCount: 150 },
  { name: 'marketing', data: marketingVocabulary, prefix: 'v-mkt-', topic: 'marketing', expectedCount: 100 },
  { name: 'legal', data: legalVocabulary, prefix: 'v-leg-', topic: 'legal', expectedCount: 100 },
  { name: 'real-estate', data: realEstateVocabulary, prefix: 'v-rea-', topic: 'real-estate', expectedCount: 100 },
  { name: 'environment', data: environmentVocabulary, prefix: 'v-env-', topic: 'environment', expectedCount: 100 },
]

describe('Vocabulary data completeness', () => {
  it.each(allVocabulary)('$name has exactly $expectedCount words', ({ data, expectedCount }) => {
    expect(data).toHaveLength(expectedCount)
  })

  it('has 1600 total words across all topics', () => {
    const total = allVocabulary.reduce((sum, v) => sum + v.data.length, 0)
    expect(total).toBe(1600)
  })
})

describe('Vocabulary data structure', () => {
  it.each(allVocabulary)('$name words have correct ID prefix', ({ data, prefix }) => {
    data.forEach((word) => {
      expect(word.id).toMatch(new RegExp(`^${prefix}\\d{3}$`))
    })
  })

  it.each(allVocabulary)('$name words have correct topic field', ({ data, topic }) => {
    data.forEach((word) => {
      expect(word.topic).toBe(topic)
    })
  })

  it.each(allVocabulary)('$name words have all required fields', ({ data }) => {
    data.forEach((word) => {
      expect(word.id).toBeTruthy()
      expect(word.word).toBeTruthy()
      expect(word.ipa).toMatch(/^\/.*\/$/)
      expect(word.meaning).toBeTruthy()
      expect(word.partOfSpeech).toMatch(/^(noun|verb|adjective|adverb|preposition|conjunction)$/)
      expect(word.example).toBeTruthy()
    })
  })

  it.each(allVocabulary)('$name words have sequential IDs from 001 to expectedCount', ({ data, prefix, expectedCount }) => {
    for (let i = 0; i < expectedCount; i++) {
      const expectedId = `${prefix}${String(i + 1).padStart(3, '0')}`
      expect(data[i].id).toBe(expectedId)
    }
  })
})

describe('Vocabulary data uniqueness', () => {
  it('has no duplicate word IDs across all topics', () => {
    const allIds = allVocabulary.flatMap((v) => v.data.map((w) => w.id))
    const uniqueIds = new Set(allIds)
    expect(uniqueIds.size).toBe(allIds.length)
  })

  it('has no duplicate words within each topic', () => {
    allVocabulary.forEach(({ name, data }) => {
      const words = data.map((w) => w.word.toLowerCase())
      const uniqueWords = new Set(words)
      expect(uniqueWords.size).toBe(words.length)
    })
  })
})
