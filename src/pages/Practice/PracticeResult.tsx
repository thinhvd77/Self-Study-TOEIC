import { useNavigate } from 'react-router-dom'
import { TestResult } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'

interface PracticeResultProps {
  result: TestResult | null
}

export function PracticeResult({ result }: PracticeResultProps) {
  const navigate = useNavigate()

  if (!result) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">Không có kết quả.</p>
        <button onClick={() => navigate('/practice')} className="mt-4 text-[var(--accent)] hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100)
  const minutes = Math.floor(result.timeSpent / 60)
  const seconds = result.timeSpent % 60

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Kết quả luyện tập</h2>

      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
        <div className="text-center mb-6">
          <p className="text-5xl font-bold text-[var(--accent)]">{percentage}%</p>
          <p className="text-[var(--text-secondary)] mt-2">
            {result.correctAnswers}/{result.totalQuestions} câu đúng
          </p>
        </div>

        <ProgressBar
          value={percentage}
          label="Tỷ lệ đúng"
          color={percentage >= 70 ? 'green' : percentage >= 50 ? 'yellow' : 'red'}
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-[var(--bg-elevated)] rounded-lg p-4">
            <p className="text-sm text-[var(--text-secondary)]">Thời gian</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {minutes}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
          <div className="bg-[var(--bg-elevated)] rounded-lg p-4">
            <p className="text-sm text-[var(--text-secondary)]">Chế độ</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {result.mode === 'part' ? `Part ${result.part}` : result.mode === 'mini' ? 'Mini Test' : 'Full Test'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/practice')}
          className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--border)] font-medium active:scale-95 transition-all"
        >
          Luyện tiếp
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 px-4 py-3 rounded-xl bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-hover)] font-medium active:scale-95 transition-all"
        >
          Về Dashboard
        </button>
      </div>
    </div>
  )
}
