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
        <p className="text-gray-500">Không có kết quả.</p>
        <button onClick={() => navigate('/practice')} className="mt-4 text-blue-600 hover:underline">
          Quay lại
        </button>
      </div>
    )
  }

  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100)
  const minutes = Math.floor(result.timeSpent / 60)
  const seconds = result.timeSpent % 60

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kết quả luyện tập</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="text-center mb-6">
          <p className="text-5xl font-bold text-blue-700">{percentage}%</p>
          <p className="text-gray-500 mt-2">
            {result.correctAnswers}/{result.totalQuestions} câu đúng
          </p>
        </div>

        <ProgressBar
          value={percentage}
          label="Tỷ lệ đúng"
          color={percentage >= 70 ? 'green' : percentage >= 50 ? 'yellow' : 'red'}
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 rounded p-4">
            <p className="text-sm text-gray-500">Thời gian</p>
            <p className="text-lg font-bold">
              {minutes}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-sm text-gray-500">Chế độ</p>
            <p className="text-lg font-bold">
              {result.mode === 'part' ? `Part ${result.part}` : result.mode === 'mini' ? 'Mini Test' : 'Full Test'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/practice')}
          className="flex-1 px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium"
        >
          Luyện tiếp
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
        >
          Về Dashboard
        </button>
      </div>
    </div>
  )
}
