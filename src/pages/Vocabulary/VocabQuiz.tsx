import { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { VocabularyWord } from '../../types'
import { QuestionCard } from '../../components/QuestionCard'

interface VocabQuizProps {
  getWords: (topicId: string) => VocabularyWord[]
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface QuizQuestion {
  word: VocabularyWord
  options: string[]
  correctAnswer: number
}

function generateQuizQuestions(words: VocabularyWord[]): QuizQuestion[] {
  return words.map((word) => {
    const otherWords = words.filter((w) => w.id !== word.id)
    const distractors = shuffleArray(otherWords).slice(0, 3).map((w) => w.meaning)
    const allOptions = shuffleArray([word.meaning, ...distractors])
    const correctAnswer = allOptions.indexOf(word.meaning)

    return { word, options: allOptions, correctAnswer }
  })
}

export function VocabQuiz({ getWords }: VocabQuizProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const topic = searchParams.get('topic') || ''
  const words = getWords(topic)

  const questions = useMemo(() => generateQuizQuestions(words), [words])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (words.length < 4) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Cần ít nhất 4 từ để tạo quiz.</p>
        <button onClick={() => navigate('/vocabulary')} className="mt-4 text-blue-600 hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const handleSelect = (index: number) => {
    if (isSubmitted) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = index
    setAnswers(newAnswers)
  }

  const handleSubmit = () => setIsSubmitted(true)

  const correctCount = answers.filter((a, i) => a === questions[i].correctAnswer).length

  if (isSubmitted && currentIndex === questions.length) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Kết quả Quiz</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <p className="text-5xl font-bold text-blue-700">
            {Math.round((correctCount / questions.length) * 100)}%
          </p>
          <p className="text-gray-500 mt-2">{correctCount}/{questions.length} câu đúng</p>
        </div>
        <button
          onClick={() => navigate('/vocabulary')}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
        >
          Quay lại
        </button>
      </div>
    )
  }

  const q = questions[currentIndex]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Quiz: {topic}</h2>
        <span className="text-sm text-gray-500">{currentIndex + 1}/{questions.length}</span>
      </div>

      <QuestionCard
        questionNumber={currentIndex + 1}
        question={`"${q.word.word}" nghĩa là gì?`}
        options={q.options}
        selectedAnswer={answers[currentIndex]}
        correctAnswer={isSubmitted ? q.correctAnswer : undefined}
        explanation={isSubmitted ? `${q.word.word} (${q.word.ipa}) = ${q.word.meaning}` : undefined}
        isBookmarked={false}
        onSelect={handleSelect}
        onToggleBookmark={() => {}}
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Câu trước
        </button>

        {currentIndex === questions.length - 1 && !isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium"
          >
            Nộp bài
          </button>
        ) : isSubmitted && currentIndex === questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(questions.length)}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium"
          >
            Xem kết quả
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Câu sau
          </button>
        )}
      </div>
    </div>
  )
}
