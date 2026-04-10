import { describe, expect, it } from 'vitest'
import { roadmap } from '../roadmap'
import { part1Questions } from '../tests/part1'
import { part3Questions } from '../tests/part3'
import { part4Questions } from '../tests/part4'
import { part5Questions } from '../tests/part5'
import { part6Questions } from '../tests/part6'
import { part7Questions } from '../tests/part7'

const partBank: Record<string, number> = {
  'part:1': part1Questions.length,
  'part:3': part3Questions.length,
  'part:4': part4Questions.length,
  'part:5': part5Questions.length,
  'part:6': part6Questions.length,
  'part:7': part7Questions.length,
}
const supportedPartTargets = new Set(Object.keys(partBank))

describe('Roadmap and data alignment', () => {
  it('ensures each part target in roadmap has available question data', () => {
    const partTargets = roadmap
      .flatMap((week) => week.tasks)
      .filter((task) => task.type === 'practice' && task.target.startsWith('part:'))
      .map((task) => task.target)

    expect(partTargets.length).toBeGreaterThan(0)

    partTargets.forEach((target) => {
      expect(partBank[target]).toBeGreaterThan(0)
    })
  })

  it('covers all parts mentioned in practice task descriptions', () => {
    const mentionedParts = roadmap
      .flatMap((week) => week.tasks)
      .filter((task) => task.type === 'practice')
      .flatMap((task) => {
        const matches = [...task.description.matchAll(/Part\s+([1-7])/gi)]
        return matches.map((match) => `part:${match[1]}`)
      })

    const uniqueMentionedParts = [...new Set(mentionedParts)].filter((target) => supportedPartTargets.has(target))
    expect(uniqueMentionedParts.length).toBeGreaterThan(0)

    uniqueMentionedParts.forEach((target) => {
      expect(partBank[target]).toBeGreaterThan(0)
    })
  })
})
