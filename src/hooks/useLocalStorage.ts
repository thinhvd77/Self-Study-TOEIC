import { useState } from 'react'

type SetValue<T> = T | ((prev: T) => T)

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return String(error)
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: SetValue<T>) => {
    setStoredValue((prev) => {
      const valueToStore = value instanceof Function ? value(prev) : value
      try {
        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(
          `Failed to persist localStorage key "${key}". Updated in-memory state only: ${getErrorMessage(error)}`,
          error,
        )
      }

      return valueToStore
    })
  }

  return [storedValue, setValue]
}
