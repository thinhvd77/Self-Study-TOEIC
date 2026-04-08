import { describe, expect, it } from 'vitest'
import { businessVocabulary } from '../vocabulary/business'
import { officeVocabulary } from '../vocabulary/office'
import { financeVocabulary } from '../vocabulary/finance'
import { travelVocabulary } from '../vocabulary/travel'
import { healthVocabulary } from '../vocabulary/health'
import { technologyVocabulary } from '../vocabulary/technology'
import { hrVocabulary } from '../vocabulary/hr'
import { manufacturingVocabulary } from '../vocabulary/manufacturing'
import { VocabularyWord } from '../../types'

const allVocabulary: { name: string; data: VocabularyWord[]; prefix: string; topic: string }[] = [
  { name: 'business', data: businessVocabulary, prefix: 'v-biz-', topic: 'business' },
  { name: 'office', data: officeVocabulary, prefix: 'v-off-', topic: 'office' },
  { name: 'finance', data: financeVocabulary, prefix: 'v-fin-', topic: 'finance' },
  { name: 'travel', data: travelVocabulary, prefix: 'v-tra-', topic: 'travel' },
  { name: 'health', data: healthVocabulary, prefix: 'v-hea-', topic: 'health' },
  { name: 'technology', data: technologyVocabulary, prefix: 'v-tec-', topic: 'technology' },
  { name: 'hr', data: hrVocabulary, prefix: 'v-hr-', topic: 'hr' },
  { name: 'manufacturing', data: manufacturingVocabulary, prefix: 'v-mfg-', topic: 'manufacturing' },
]

describe('Vocabulary data completeness', () => {
  it.each(allVocabulary)('$name has exactly 50 words', ({ data }) => {
    expect(data).toHaveLength(50)
  })

  it('has 400 total words across all topics', () => {
    const total = allVocabulary.reduce((sum, v) => sum + v.data.length, 0)
    expect(total).toBe(400)
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

  it.each(allVocabulary)('$name words have sequential IDs from 001 to 050', ({ data, prefix }) => {
    for (let i = 0; i < 50; i++) {
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
