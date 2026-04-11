import { Routes, Route, useNavigate } from 'react-router-dom'
import { LessonView } from './LessonView'
import { partsOfSpeechLesson } from '../../data/grammar/parts-of-speech'
import { verbTensesLesson } from '../../data/grammar/verb-tenses'
import { passiveVoiceLesson } from '../../data/grammar/passive-voice'
import { conjunctionsLesson } from '../../data/grammar/conjunctions'
import { prepositionsLesson } from '../../data/grammar/prepositions'
import { relativePronounsLesson } from '../../data/grammar/relative-pronouns'
import { comparativesLesson } from '../../data/grammar/comparatives'
import { conditionalsLesson } from '../../data/grammar/conditionals'
import { articlesLesson } from '../../data/grammar/articles'
import { gerundInfinitivesLesson } from '../../data/grammar/gerunds-infinitives'
import { subjectVerbAgreementLesson } from '../../data/grammar/subject-verb-agreement'
import { pronounsLesson } from '../../data/grammar/pronouns'
import { wordOrderLesson } from '../../data/grammar/word-order'
import { useAppContext } from '../../context/AppContext'
import { GrammarLesson } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'

const allLessons: GrammarLesson[] = [
  partsOfSpeechLesson, verbTensesLesson, passiveVoiceLesson, conjunctionsLesson,
  prepositionsLesson, relativePronounsLesson, comparativesLesson, conditionalsLesson,
  articlesLesson, gerundInfinitivesLesson, subjectVerbAgreementLesson, pronounsLesson, wordOrderLesson,
]

function LessonList() {
  const navigate = useNavigate()
  const { progress } = useAppContext()
  const completedCount = progress.grammarProgress.filter((g) => g.completed).length

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Ngữ pháp TOEIC</h2>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
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
              className="w-full text-left bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--text-secondary)]">Bài {lesson.order}</span>
                    {isCompleted && <span className="text-[var(--accent)] text-sm">✓</span>}
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] mt-1">{lesson.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{lesson.exercises.length} câu bài tập</p>
                </div>
                {score !== undefined && (
                  <div className="text-right">
                    <p className={`text-xl font-bold ${score >= 70 ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                      {score}%
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">Điểm bài tập</p>
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
      <Route path=":lessonId" element={<LessonView lessons={allLessons} />} />
    </Routes>
  )
}
