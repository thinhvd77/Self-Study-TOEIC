import { useState, useCallback, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { QuestionCard } from '../../components/QuestionCard'
import { QuestionNav } from '../../components/QuestionNav'
import { Timer } from '../../components/Timer'
import { useTimer } from '../../hooks/useTimer'
import { useAppContext } from '../../context/AppContext'
import { Question, TestResult, AnswerRecord } from '../../types'

interface PracticeSessionProps {
  getQuestions: (part: number) => Question[]
  onComplete: (result: TestResult) => void
}

export function PracticeSession({ getQuestions, onComplete }: PracticeSessionProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { dispatch } = useAppContext()

  const part = Number(searchParams.get('part') || 5)
  const mode = searchParams.get('mode') ?? 'part'
  // For mini mode, pass part=0 to signal the mini pool branch in getQuestions.
  const questions = getQuestions(mode === 'mini' ? 0 : part)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set())
  const [isSubmitted, setIsSubmitted] = useState(false)

  const answersRef = useRef(answers)
  useEffect(() => { answersRef.current = answers }, [answers])
  const submittedRef = useRef(false)

  const timeLimit = mode === 'mini' ? 2700 : questions.length * 30

  const handleSubmit = useCallback(() => {
    if (submittedRef.current) return
    submittedRef.current = true
    timer.pause()
    setIsSubmitted(true)

    const currentAnswers = answersRef.current
    const answerRecords: AnswerRecord[] = questions.map((q, i) => ({
      questionId: q.id,
      selected: currentAnswers[i] ?? -1,
      correct: currentAnswers[i] === q.correctAnswer,
    }))

    const correctCount = answerRecords.filter((a) => a.correct).length
    const result: TestResult = {
      id: `test-${Date.now()}`,
      date: new Date().toISOString(),
      mode: mode === 'mini' ? 'mini' : 'part',
      part,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      timeSpent: timer.elapsed,
      answers: answerRecords,
    }

    dispatch({ type: 'ADD_TEST_RESULT', payload: result })
    onComplete(result)
  }, [questions, part, mode, dispatch, onComplete])

  const handleTimeUp = useCallback(() => {
    if (!submittedRef.current) handleSubmit()
  }, [handleSubmit])

  const timer = useTimer(timeLimit, handleTimeUp)

  useEffect(() => { timer.start() }, [])

  const handleSelect = (optionIndex: number) => {
    if (isSubmitted) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = optionIndex
    setAnswers(newAnswers)
  }

  const handleToggleBookmark = () => {
    const newBookmarks = new Set(bookmarks)
    if (newBookmarks.has(currentIndex)) newBookmarks.delete(currentIndex)
    else newBookmarks.add(currentIndex)
    setBookmarks(newBookmarks)
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">Chưa có câu hỏi cho Part này.</p>
        <button onClick={() => navigate('/practice')} className="mt-4 text-[var(--accent)] hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const current = questions[currentIndex]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          {mode === 'mini' ? 'Mini Test' : `Part ${part}`} {isSubmitted && '- Kết quả'}
        </h2>
        {!isSubmitted && (
          <Timer
            timeLeft={timer.timeLeft}
            isRunning={timer.isRunning}
            onToggle={() => (timer.isRunning ? timer.pause() : timer.start())}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <QuestionCard
            questionNumber={currentIndex + 1}
            question={current.question}
            passage={current.passage}
            passage2={current.passage2}
            options={current.options}
            selectedAnswer={answers[currentIndex]}
            correctAnswer={isSubmitted ? current.correctAnswer : undefined}
            explanation={isSubmitted ? current.explanation : undefined}
            isBookmarked={bookmarks.has(currentIndex)}
            onSelect={handleSelect}
            onToggleBookmark={handleToggleBookmark}
          />

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] disabled:opacity-50 active:scale-95 transition-all"
            >
              Câu trước
            </button>

            {!isSubmitted && currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
              >
                Nộp bài
              </button>
            ) : isSubmitted && currentIndex === questions.length - 1 ? (
              <button
                onClick={() => navigate('/practice/result')}
                className="px-6 py-2 rounded-lg bg-[var(--success)] text-white hover:brightness-110 font-medium active:scale-95 transition-all"
              >
                Xem kết quả
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                className="px-4 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] active:scale-95 transition-all"
              >
                Câu sau
              </button>
            )}
          </div>
        </div>

        <div>
          <QuestionNav
            total={questions.length}
            currentIndex={currentIndex}
            answers={answers}
            bookmarks={bookmarks}
            onNavigate={setCurrentIndex}
          />
        </div>
      </div>
    </div>
  )
}
