import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
        <p className="text-gray-500">Không tìm thấy bài học.</p>
        <button onClick={() => navigate('/grammar')} className="mt-4 text-blue-600 hover:underline">
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
    const correctCount = answers.filter(
      (a, i) => a === lesson.exercises[i].correctAnswer
    ).length
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
      <div>
        <button onClick={() => navigate('/grammar')} className="text-blue-600 hover:underline text-sm mb-4 block">
          ← Quay lại danh sách
        </button>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Bài {lesson.order}: {lesson.title}
          </h2>

          <div
            className="prose prose-sm max-w-none mt-6 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br/>') }}
          />

          {lesson.examples.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-gray-800 mb-3">Ví dụ:</h3>
              <div className="space-y-3">
                {lesson.examples.map((ex, i) => (
                  <div key={i} className="bg-blue-50 rounded p-4">
                    <p className="text-blue-800 font-medium">{ex.english}</p>
                    <p className="text-blue-600 text-sm mt-1">→ {ex.vietnamese}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startExercises}
            className="mt-8 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
          >
            Làm bài tập ({lesson.exercises.length} câu)
          </button>
        </div>
      </div>
    )
  }

  // Exercise mode
  const correctCount = isSubmitted
    ? answers.filter((a, i) => a === lesson.exercises[i].correctAnswer).length
    : 0

  if (isSubmitted && currentEx >= lesson.exercises.length) {
    const score = Math.round((correctCount / lesson.exercises.length) * 100)
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Kết quả bài tập</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <p className="text-5xl font-bold text-blue-700">{score}%</p>
          <p className="text-gray-500 mt-2">
            {correctCount}/{lesson.exercises.length} câu đúng
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setShowExercises(false)
              setIsSubmitted(false)
              setCurrentEx(0)
            }}
            className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium"
          >
            Xem lại bài học
          </button>
          <button
            onClick={() => navigate('/grammar')}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
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
        <h2 className="text-xl font-bold text-gray-800">
          Bài tập: {lesson.title}
        </h2>
        <span className="text-sm text-gray-500">{currentEx + 1}/{lesson.exercises.length}</span>
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
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Câu trước
        </button>

        {currentEx === lesson.exercises.length - 1 && !isSubmitted ? (
          <button onClick={handleSubmit} className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium">
            Nộp bài
          </button>
        ) : isSubmitted && currentEx === lesson.exercises.length - 1 ? (
          <button
            onClick={() => setCurrentEx(lesson.exercises.length)}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium"
          >
            Xem kết quả
          </button>
        ) : (
          <button
            onClick={() => setCurrentEx(currentEx + 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Câu sau
          </button>
        )}
      </div>
    </div>
  )
}
