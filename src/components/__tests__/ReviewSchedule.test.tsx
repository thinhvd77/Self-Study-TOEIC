import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ReviewSchedule } from '../ReviewSchedule'

const TODAY = new Date().toISOString().split('T')[0]

function makeDayDate(offsetDays: number): string {
  return new Date(Date.now() + offsetDays * 86400000).toISOString().split('T')[0]
}

describe('ReviewSchedule', () => {
  it('renders "Hôm nay" row with count and Ôn ngay button when today has words', () => {
    const schedule = [
      { date: TODAY, count: 5 },
      { date: makeDayDate(1), count: 0 },
      { date: makeDayDate(2), count: 0 },
      { date: makeDayDate(3), count: 0 },
      { date: makeDayDate(4), count: 0 },
      { date: makeDayDate(5), count: 0 },
      { date: makeDayDate(6), count: 0 },
    ]
    render(<ReviewSchedule schedule={schedule} onReviewToday={vi.fn()} />)
    expect(screen.getByText('Hôm nay')).toBeInTheDocument()
    expect(screen.getByText('5 từ')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Ôn ngay/i })).toBeInTheDocument()
  })

  it('renders future days with count > 0 and omits days with count 0', () => {
    const schedule = [
      { date: TODAY, count: 0 },
      { date: makeDayDate(1), count: 3 },
      { date: makeDayDate(2), count: 0 },
      { date: makeDayDate(3), count: 7 },
      { date: makeDayDate(4), count: 0 },
      { date: makeDayDate(5), count: 0 },
      { date: makeDayDate(6), count: 0 },
    ]
    render(<ReviewSchedule schedule={schedule} onReviewToday={vi.fn()} />)
    expect(screen.getByText('3 từ')).toBeInTheDocument()
    expect(screen.getByText('7 từ')).toBeInTheDocument()
    // Today is still shown even with 0 count (no Ôn ngay button though)
    expect(screen.getByText('Hôm nay')).toBeInTheDocument()
    // Days with 0 are omitted (can check no "0 từ" exists)
    expect(screen.queryByText('0 từ')).not.toBeInTheDocument()
  })

  it('shows empty message when all 7 days have count 0', () => {
    const schedule = Array.from({ length: 7 }, (_, i) => ({
      date: makeDayDate(i),
      count: 0,
    }))
    render(<ReviewSchedule schedule={schedule} onReviewToday={vi.fn()} />)
    expect(screen.getByText(/Không có từ nào cần ôn/i)).toBeInTheDocument()
  })

  it('calls onReviewToday when Ôn ngay button is clicked', () => {
    const onReviewToday = vi.fn()
    const schedule = [
      { date: TODAY, count: 3 },
      ...Array.from({ length: 6 }, (_, i) => ({ date: makeDayDate(i + 1), count: 0 })),
    ]
    render(<ReviewSchedule schedule={schedule} onReviewToday={onReviewToday} />)
    fireEvent.click(screen.getByRole('button', { name: /Ôn ngay/i }))
    expect(onReviewToday).toHaveBeenCalledOnce()
  })
})
