import { Routes, Route, useNavigate } from 'react-router-dom'
import { LessonView } from './LessonView'
import { partsOfSpeechLesson } from '../../data/grammar/parts-of-speech'
import { useAppContext } from '../../context/AppContext'
import { GrammarLesson } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'

const allLessons: GrammarLesson[] = [partsOfSpeechLesson]

function LessonList() {
  const navigate = useNavigate()
  const { progress } = useAppContext()

  const completedCount = progress.grammarProgress.filter((g) => g.completed).length

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ngữ pháp TOEIC</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <ProgressBar
          value={allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0}
          label={`Tiến độ: ${completedCount}/${allLessons.length} bài`}
          color="green"
        />
      </div>

      <div className="space-y-3">
        {allLessons.map((lesson) => {
          const gProgress = progress.grammarProgress.find((g) => g.lessonId === lesson.id)
          const isCompleted = gProgress?.completed ?? false
          const score = gProgress?.exerciseScore

          return (
            <button
              key={lesson.id}
              onClick={() => navigate(`/grammar/${lesson.id}`)}
              className="w-full text-left bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Bài {lesson.order}</span>
                    {isCompleted && <span className="text-green-600 text-sm">✓</span>}
                  </div>
                  <h3 className="font-bold text-gray-800 mt-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {lesson.exercises.length} câu bài tập
                  </p>
                </div>
                {score !== undefined && (
                  <div className="text-right">
                    <p className={`text-xl font-bold ${score >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {score}%
                    </p>
                    <p className="text-xs text-gray-400">Điểm bài tập</p>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function GrammarPage() {
  return (
    <Routes>
      <Route index element={<LessonList />} />
      <Route
        path=":lessonId"
        element={<LessonView lessons={allLessons} />}
      />
    </Routes>
  )
}
