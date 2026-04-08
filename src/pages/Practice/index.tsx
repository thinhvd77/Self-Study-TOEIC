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

  const startPractice = (part: number) => {
    navigate(`/practice/session?part=${part}`)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Luyện đề thi</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Reading (Part 5-7)</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {PARTS.map((p) => (
            <button
              key={p.part}
              onClick={() => startPractice(p.part)}
              disabled={p.count === 0}
              className={`text-left p-5 rounded-lg border-2 transition-colors ${
                p.count > 0
                  ? 'border-blue-200 hover:border-blue-400 bg-white'
                  : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
              }`}
            >
              <h4 className="font-bold text-gray-800">{p.label}</h4>
              <p className="text-sm text-gray-500 mt-1">{p.description}</p>
              <p className="text-sm text-blue-600 mt-2 font-medium">{p.count} câu</p>
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
      <Route
        path="session"
        element={
          <PracticeSession
            getQuestions={getQuestions}
            onComplete={setLastResult}
          />
        }
      />
      <Route
        path="result"
        element={<PracticeResult result={lastResult} />}
      />
    </Routes>
  )
}
