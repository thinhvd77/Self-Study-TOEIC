import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTimer } from '../useTimer'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts at given time and counts down per second', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useTimer(10, onComplete))

    expect(result.current.timeLeft).toBe(10)
    expect(result.current.elapsed).toBe(0)
    expect(result.current.isRunning).toBe(false)

    act(() => {
      result.current.start()
      vi.advanceTimersByTime(3000)
    })

    expect(result.current.timeLeft).toBe(7)
    expect(result.current.elapsed).toBe(3)
    expect(result.current.isRunning).toBe(true)
  })

  it('calls onComplete when reaching 0 once', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useTimer(2, onComplete))

    act(() => {
      result.current.start()
      vi.advanceTimersByTime(3000)
    })

    expect(result.current.timeLeft).toBe(0)
    expect(result.current.isRunning).toBe(false)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('can pause and resume', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useTimer(5, onComplete))

    act(() => {
      result.current.start()
      vi.advanceTimersByTime(2000)
      result.current.pause()
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.timeLeft).toBe(3)
    expect(result.current.elapsed).toBe(2)
    expect(result.current.isRunning).toBe(false)

    act(() => {
      result.current.start()
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.timeLeft).toBe(2)
    expect(result.current.elapsed).toBe(3)
    expect(result.current.isRunning).toBe(true)
  })

  it('returns elapsed time correctly', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useTimer(4, onComplete))

    act(() => {
      result.current.start()
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.elapsed).toBe(2)

    act(() => {
      result.current.reset()
    })

    expect(result.current.timeLeft).toBe(4)
    expect(result.current.elapsed).toBe(0)
    expect(result.current.isRunning).toBe(false)
  })

  it('resyncs when initialSeconds changes and clears running interval', () => {
    const onComplete = vi.fn()
    const { result, rerender } = renderHook(
      ({ seconds }) => useTimer(seconds, onComplete),
      { initialProps: { seconds: 5 } },
    )

    act(() => {
      result.current.start()
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.timeLeft).toBe(3)
    expect(result.current.isRunning).toBe(true)

    rerender({ seconds: 10 })

    expect(result.current.timeLeft).toBe(10)
    expect(result.current.elapsed).toBe(0)
    expect(result.current.isRunning).toBe(false)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.timeLeft).toBe(10)

    act(() => {
      result.current.start()
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.timeLeft).toBe(9)
    expect(result.current.isRunning).toBe(true)
  })
})
