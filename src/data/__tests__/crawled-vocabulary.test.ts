import { describe, expect, it } from 'vitest'
import { officeVocabulary } from '../vocabulary/office'
import { financeVocabulary } from '../vocabulary/finance'

describe('Crawled vocabulary datasets', () => {
  it('keeps office vocabulary in expected format', () => {
    expect(officeVocabulary.length).toBeGreaterThanOrEqual(10)

    officeVocabulary.forEach((word, index) => {
      expect(word.id).toBe(`v-off-${String(index + 1).padStart(3, '0')}`)
      expect(word.topic).toBe('office')
      expect(word.word.length).toBeGreaterThan(0)
      expect(word.meaning.length).toBeGreaterThan(0)
      expect(word.ipa.length).toBeGreaterThan(0)
      expect(word.partOfSpeech.length).toBeGreaterThan(0)
      expect(word.example.length).toBeGreaterThan(0)
    })
  })

  it('keeps finance vocabulary in expected format', () => {
    expect(financeVocabulary.length).toBeGreaterThanOrEqual(10)

    financeVocabulary.forEach((word, index) => {
      expect(word.id).toBe(`v-fin-${String(index + 1).padStart(3, '0')}`)
      expect(word.topic).toBe('finance')
      expect(word.word.length).toBeGreaterThan(0)
      expect(word.meaning.length).toBeGreaterThan(0)
      expect(word.ipa.length).toBeGreaterThan(0)
      expect(word.partOfSpeech.length).toBeGreaterThan(0)
      expect(word.example.length).toBeGreaterThan(0)
    })
  })
})
