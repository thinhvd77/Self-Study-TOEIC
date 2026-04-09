import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { PracticeSession } from './PracticeSession'
import { PracticeResult } from './PracticeResult'
import { part5Questions } from '../../data/tests/part5'
import { Question, TestResult } from '../../types'

const PARTS = [
  { part: 5, label: 'Part 5: Điền câu', description: 'Chọn từ/cụm từ đúng để hoàn thành câu', count: part5Questions.length },
  { part: 6, label: 'Part 6: Điền đoạn', description: 'Điền vào đoạn văn (coming soon)', count: 0 },
  { part: 7, label: 'Part 7: Đọc hiểu', description: 'Đọc passage và trả lời câu hỏi (coming soon)', count: 0 },
]

function PartSelection() {
  const navigate = useNavigate()

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Luyện đề thi</h2>
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
    </div>
  )
}

export default function PracticePage() {
  const [lastResult, setLastResult] = useState<TestResult | null>(null)

  const getQuestions = (part: number): Question[] => {
    switch (part) {
      case 5: return part5Questions
      default: return []
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
