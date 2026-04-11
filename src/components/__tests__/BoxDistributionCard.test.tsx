import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BoxDistributionCard } from '../BoxDistributionCard'

describe('BoxDistributionCard', () => {
  it('renders 5 bars with correct labels', () => {
    const distribution = [
      { box: 1 as const, count: 2 },
      { box: 2 as const, count: 3 },
      { box: 3 as const, count: 5 },
      { box: 4 as const, count: 0 },
      { box: 5 as const, count: 1 },
    ]
    const total = 10

    render(<BoxDistributionCard distribution={distribution} total={total} />)

    expect(screen.getByText('Hộp 1')).toBeInTheDocument()
    expect(screen.getByText('Hộp 2')).toBeInTheDocument()
    expect(screen.getByText('Hộp 3')).toBeInTheDocument()
    expect(screen.getByText('Hộp 4')).toBeInTheDocument()
    expect(screen.getByText('Hộp 5')).toBeInTheDocument()
    expect(screen.getByText(total.toString())).toBeInTheDocument()
  })

  it('scales bar heights relative to max count', () => {
    const distribution = [
      { box: 1 as const, count: 5 },
      { box: 2 as const, count: 3 },
      { box: 3 as const, count: 0 },
      { box: 4 as const, count: 2 },
      { box: 5 as const, count: 1 },
    ]
    const total = 11

    const { container } = render(<BoxDistributionCard distribution={distribution} total={total} />)

    const bars = container.querySelectorAll('[data-testid="bar"]')
    expect(bars).toHaveLength(5)

    // Bar 1 (count: 5) should have 100% height (max is 5)
    expect(bars[0]).toHaveStyle('height: 100%')

    // Bar 2 (count: 3) should have 60% height (3/5 * 100)
    expect(bars[1]).toHaveStyle('height: 60%')

    // Bar 3 (count: 0) should have 0% height
    expect(bars[2]).toHaveStyle('height: 0%')

    // Bar 4 (count: 2) should have 40% height (2/5 * 100)
    expect(bars[3]).toHaveStyle('height: 40%')

    // Bar 5 (count: 1) should have 20% height (1/5 * 100)
    expect(bars[4]).toHaveStyle('height: 20%')
  })

  it('renders without crashing when all counts are zero', () => {
    const distribution = [
      { box: 1 as const, count: 0 },
      { box: 2 as const, count: 0 },
      { box: 3 as const, count: 0 },
      { box: 4 as const, count: 0 },
      { box: 5 as const, count: 0 },
    ]
    const total = 0

    const { container } = render(<BoxDistributionCard distribution={distribution} total={total} />)

    expect(screen.getByText('0')).toBeInTheDocument()

    const bars = container.querySelectorAll('[data-testid="bar"]')
    bars.forEach((bar) => {
      // Should not be NaN, should be 0%
      expect(bar).toHaveStyle('height: 0%')
    })
  })

  it('displays total count correctly', () => {
    const testCases = [
      { distribution: [{ box: 1 as const, count: 10 }], total: 10 },
      {
        distribution: [
          { box: 1 as const, count: 2 },
          { box: 2 as const, count: 3 },
          { box: 3 as const, count: 5 },
          { box: 4 as const, count: 1 },
          { box: 5 as const, count: 4 },
        ],
        total: 15,
      },
      { distribution: [{ box: 5 as const, count: 1 }], total: 1 },
    ]

    for (const testCase of testCases) {
      const { unmount } = render(
        <BoxDistributionCard distribution={testCase.distribution} total={testCase.total} />,
      )
      expect(screen.getByText(testCase.total.toString())).toBeInTheDocument()
      unmount()
    }
  })
})
