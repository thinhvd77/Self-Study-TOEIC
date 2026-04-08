import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns initial value when no stored value', () => {
    const { result } = renderHook(() => useLocalStorage('theme', 'light'))

    expect(result.current[0]).toBe('light')
  })

  it('returns stored value when it exists', () => {
    localStorage.setItem('theme', JSON.stringify('dark'))

    const { result } = renderHook(() => useLocalStorage('theme', 'light'))

    expect(result.current[0]).toBe('dark')
  })

  it('updates localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('theme', 'light'))

    act(() => {
      result.current[1]('dark')
    })

    expect(result.current[0]).toBe('dark')
    expect(localStorage.getItem('theme')).toBe(JSON.stringify('dark'))
  })

  it('works with objects', () => {
    type Settings = { mode: string; notifications: boolean }

    const { result } = renderHook(() =>
      useLocalStorage<Settings>('settings', { mode: 'study', notifications: true }),
    )

    act(() => {
      result.current[1]((prev) => ({ ...prev, notifications: false }))
    })

    expect(result.current[0]).toEqual({ mode: 'study', notifications: false })
    expect(localStorage.getItem('settings')).toBe(
      JSON.stringify({ mode: 'study', notifications: false }),
    )
  })

  it('logs clear error and still updates in-memory state when localStorage write fails', () => {
    const storageError = new Error('QuotaExceededError')
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw storageError
    })
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { result } = renderHook(() => useLocalStorage('theme', 'light'))

    act(() => {
      result.current[1]('dark')
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to persist localStorage key "theme". Updated in-memory state only: QuotaExceededError',
      storageError,
    )
    expect(result.current[0]).toBe('dark')
    expect(localStorage.getItem('theme')).toBeNull()
  })
})
