import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { GrammarLesson, GrammarProgress } from '../../types'
import { useAppContext } from '../../context/AppContext'
import { QuestionCard } from '../../components/QuestionCard'

interface LessonViewProps {
  lessons: GrammarLesson[]
}

export function LessonView({ lessons }: LessonViewProps) {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { dispatch } = useAppContext()

  const lesson = lessons.find((l) => l.id === lessonId)

  const [showExercises, setShowExercises] = useState(false)
  const [currentEx, setCurrentEx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">Không tìm thấy bài học.</p>
        <button onClick={() => navigate('/grammar')} className="mt-4 text-[var(--accent)] hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const startExercises = () => {
    setShowExercises(true)
    setAnswers(new Array(lesson.exercises.length).fill(null))
  }

  const handleSelect = (index: number) => {
    if (isSubmitted) return
    const newAnswers = [...answers]
    newAnswers[currentEx] = index
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    const correctCount = answers.filter((a, i) => a === lesson.exercises[i].correctAnswer).length
    const score = Math.round((correctCount / lesson.exercises.length) * 100)
    const grammarProgress: GrammarProgress = {
      lessonId: lesson.id,
      completed: true,
      exerciseScore: score,
      lastStudied: new Date().toISOString().split('T')[0],
    }
    dispatch({ type: 'UPDATE_GRAMMAR_PROGRESS', payload: grammarProgress })
  }

  if (!showExercises) {
    return (
      <div className="animate-fade-in">
        <button onClick={() => navigate('/grammar')} className="text-[var(--accent)] hover:underline text-sm mb-4 block">
          ← Quay lại danh sách
        </button>

        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Bài {lesson.order}: {lesson.title}
          </h2>

          <div className="mt-6 leading-relaxed space-y-3">
            <div className="markdown-content">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>
          </div>

          {lesson.examples.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-[var(--text-primary)] mb-3">Ví dụ:</h3>
              <div className="space-y-3">
                {lesson.examples.map((ex, i) => (
                  <div key={i} className="bg-[var(--accent-soft)] rounded-lg p-4">
                    <p className="text-[var(--accent)] font-medium">{ex.english}</p>
                    <p className="text-[var(--text-secondary)] text-sm mt-1">→ {ex.vietnamese}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startExercises}
            className="mt-8 px-6 py-3 rounded-xl bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
          >
            Làm bài tập ({lesson.exercises.length} câu)
          </button>
        </div>
      </div>
    )
  }

  const correctCount = isSubmitted
    ? answers.filter((a, i) => a === lesson.exercises[i].correctAnswer).length
    : 0

  if (isSubmitted && currentEx >= lesson.exercises.length) {
    const score = Math.round((correctCount / lesson.exercises.length) * 100)
    return (
      <div className="max-w-lg mx-auto text-center py-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Kết quả bài tập</h2>
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
          <p className="text-5xl font-bold text-[var(--accent)]">{score}%</p>
          <p className="text-[var(--text-secondary)] mt-2">{correctCount}/{lesson.exercises.length} câu đúng</p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => { setShowExercises(false); setIsSubmitted(false); setCurrentEx(0) }}
            className="px-6 py-3 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] font-medium active:scale-95 transition-all"
          >
            Xem lại bài học
          </button>
          <button
            onClick={() => navigate('/grammar')}
            className="px-6 py-3 rounded-xl bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
          >
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  const exercise = lesson.exercises[currentEx]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Bài tập: {lesson.title}</h2>
        <span className="text-sm text-[var(--text-secondary)]">{currentEx + 1}/{lesson.exercises.length}</span>
      </div>

      <QuestionCard
        questionNumber={currentEx + 1}
        question={exercise.question}
        options={exercise.options}
        selectedAnswer={answers[currentEx]}
        correctAnswer={isSubmitted ? exercise.correctAnswer : undefined}
        explanation={isSubmitted ? exercise.explanation : undefined}
        isBookmarked={false}
        onSelect={handleSelect}
        onToggleBookmark={() => {}}
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentEx(Math.max(0, currentEx - 1))}
          disabled={currentEx === 0}
          className="px-4 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] disabled:opacity-50 active:scale-95 transition-all"
        >
          Câu trước
        </button>

        {currentEx === lesson.exercises.length - 1 && !isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
          >
            Nộp bài
          </button>
        ) : isSubmitted && currentEx === lesson.exercises.length - 1 ? (
          <button
            onClick={() => setCurrentEx(lesson.exercises.length)}
            className="px-6 py-2 rounded-lg bg-[var(--success)] text-white hover:brightness-110 font-medium active:scale-95 transition-all"
          >
            Xem kết quả
          </button>
        ) : (
          <button
            onClick={() => setCurrentEx(currentEx + 1)}
            className="px-4 py-2 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] active:scale-95 transition-all"
          >
            Câu sau
          </button>
        )}
      </div>
    </div>
  )
}
