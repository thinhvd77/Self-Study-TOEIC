import { useRef, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { PracticeSession } from './PracticeSession'
import { PracticeResult } from './PracticeResult'
import { part5Questions } from '../../data/tests/part5'
import { part6Questions } from '../../data/tests/part6'
import { part7Questions } from '../../data/tests/part7'
import { Question, TestResult } from '../../types'

const PARTS = [
  { part: 5, label: 'Part 5: Điền câu', description: 'Chọn từ/cụm từ đúng để hoàn thành câu', count: part5Questions.length },
  { part: 6, label: 'Part 6: Điền đoạn', description: 'Chọn từ/cụm từ để hoàn thành đoạn văn', count: part6Questions.length },
  { part: 7, label: 'Part 7: Đọc hiểu', description: 'Đọc passage và trả lời câu hỏi', count: part7Questions.length },
]

/** Fisher-Yates shuffle — returns a new array. */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Build the Mini Test pool: all Part 5 + all Part 6 + first 16 Part 7 questions,
 * then shuffle the combined array.
 *
 * TODO: When Part 7 reaches 48 questions (split into groups by groupId), preserve
 * groupId continuity by shuffling groups instead of individual questions to avoid
 * breaking double-passage sets.
 */
function buildMiniPool(): Question[] {
  const p7Subset = part7Questions.slice(0, 16)
  return shuffle([...part5Questions, ...part6Questions, ...p7Subset])
}

function PartSelection() {
  const navigate = useNavigate()

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Luyện đề thi</h2>

      {/* Reading parts */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[var(--text-secondary)] mb-4">Reading (Part 5-7)</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {PARTS.map((p) => (
            <button
              key={p.part}
              onClick={() => navigate(`/practice/session?part=${p.part}`)}
              disabled={p.count === 0}
              className={`text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                p.count > 0
                  ? 'border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg-surface)] hover:-translate-y-0.5'
                  : 'border-[var(--border)] bg-[var(--bg-surface)] opacity-40 cursor-not-allowed'
              }`}
            >
              <h4 className="font-bold text-[var(--text-primary)]">{p.label}</h4>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{p.description}</p>
              <p className="text-sm text-[var(--accent)] mt-2 font-medium">{p.count} câu</p>
            </button>
          ))}
        </div>
      </div>

      {/* Mini Test */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[var(--text-secondary)] mb-4">Kiểm tra tổng hợp</h3>
        <button
          onClick={() => navigate('/practice/session?mode=mini')}
          className="w-full text-left p-5 rounded-xl border-2 border-[var(--accent)] bg-[var(--bg-surface)] hover:bg-[var(--accent-soft)] transition-all duration-200 hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-[var(--text-primary)] text-lg">Mini Test</h4>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Kết hợp Part 5 + 6 + 7 — luyện tập toàn diện kỹ năng Reading
              </p>
              <p className="text-sm text-[var(--accent)] mt-2 font-medium">
                {part5Questions.length + part6Questions.length + Math.min(part7Questions.length, 16)} câu · 45 phút
              </p>
            </div>
            <span className="text-3xl text-[var(--accent)] ml-4">→</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default function PracticePage() {
  const [lastResult, setLastResult] = useState<TestResult | null>(null)

  // Stable mini pool: generated once per mount, not on every render.
  const miniPoolRef = useRef<Question[]>([])
  if (miniPoolRef.current.length === 0) {
    miniPoolRef.current = buildMiniPool()
  }

  const getQuestions = (part: number): Question[] => {
    // PracticeSession calls getQuestions(part) where part comes from ?part= URL param.
    // For mini mode there is no ?part=, so part is NaN or 0 — fall through to default.
    switch (part) {
      case 5: return part5Questions
      case 6: return part6Questions
      case 7: return part7Questions
      default:
        // Mini Test or unknown part — return the pre-shuffled pool.
        return miniPoolRef.current
    }
  }

  return (
    <Routes>
      <Route index element={<PartSelection />} />
      <Route path="session" element={<PracticeSession getQuestions={getQuestions} onComplete={setLastResult} />} />
      <Route path="result" element={<PracticeResult result={lastResult} />} />
    </Routes>
  )
}
