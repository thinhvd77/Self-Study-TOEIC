import { useEffect, useRef, useState } from 'react'

interface UseTimerReturn {
  timeLeft: number
  elapsed: number
  isRunning: boolean
  start: () => void
  pause: () => void
  reset: () => void
}

export function useTimer(initialSeconds: number, onComplete: () => void): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<number | null>(null)

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const start = () => {
    if (timerRef.current !== null || timeLeft <= 0) {
      return
    }

    setIsRunning(true)
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
  }

  const pause = () => {
    clearTimer()
    setIsRunning(false)
  }

  const reset = () => {
    clearTimer()
    setIsRunning(false)
    setTimeLeft(initialSeconds)
  }

  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsRunning(false)
    setTimeLeft(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    if (isRunning && timeLeft === 0) {
      clearTimer()
      setIsRunning(false)
      onComplete()
    }
  }, [isRunning, onComplete, timeLeft])

  useEffect(() => clearTimer, [])

  return {
    timeLeft,
    elapsed: initialSeconds - timeLeft,
    isRunning,
    start,
    pause,
    reset,
  }
}
