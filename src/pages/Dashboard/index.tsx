import { useMemo } from 'react'
import { useAppContext } from '../../context/AppContext'
import { roadmap } from '../../data/roadmap'
import { ProgressBar } from '../../components/ProgressBar'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PHASE_LABELS = ['', 'Nền tảng', 'Mở rộng', 'Luyện đề', 'Tổng ôn']

export default function DashboardPage() {
  const { progress } = useAppContext()

  const currentWeekData = roadmap.find((w) => w.week === progress.currentWeek)
  const currentPhase = currentWeekData?.phase ?? 1

  // Calculate phase progress
  const phaseWeeks = roadmap.filter((w) => w.phase === currentPhase)
  const phaseStart = phaseWeeks[0]?.week ?? 1
  const phaseEnd = phaseWeeks[phaseWeeks.length - 1]?.week ?? 4
  const phaseProgress = Math.min(100, Math.max(0, Math.round(
    ((progress.currentWeek - phaseStart) / (phaseEnd - phaseStart + 1)) * 100
  )))

  // Stats
  const totalVocabLearned = useMemo(
    () => progress.vocabularyProgress.filter((v) => v.correctCount > 0).length,
    [progress.vocabularyProgress]
  )

  const grammarCompleted = useMemo(
    () => progress.grammarProgress.filter((g) => g.completed).length,
    [progress.grammarProgress]
  )

  const testsCompleted = useMemo(() => progress.testHistory.length, [progress.testHistory])

  // Chart data
  const chartData = useMemo(
    () => progress.testHistory.map((test) => ({
      date: new Date(test.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
      score: Math.round((test.correctAnswers / test.totalQuestions) * 100),
    })),
    [progress.testHistory]
  )

  // Weakness analysis
  const weakestPart = useMemo(() => {
    const partScores: Record<number, { correct: number; total: number }> = {}
    for (const test of progress.testHistory) {
      for (const answer of test.answers) {
        const partMatch = answer.questionId.match(/^p(\d)/)
        if (partMatch) {
          const part = Number(partMatch[1])
          if (!partScores[part]) partScores[part] = { correct: 0, total: 0 }
          partScores[part].total++
          if (answer.correct) partScores[part].correct++
        }
      }
    }
    return Object.entries(partScores).sort(
      ([, a], [, b]) => a.correct / a.total - b.correct / b.total
    )[0]
  }, [progress.testHistory])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {/* Roadmap */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Giai đoạn {currentPhase}: {PHASE_LABELS[currentPhase]}
            </h3>
            <p className="text-sm text-gray-500">Tuần {progress.currentWeek}/16</p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((phase) => (
              <div
                key={phase}
                className={`w-8 h-2 rounded-full ${
                  phase < currentPhase
                    ? 'bg-green-500'
                    : phase === currentPhase
                      ? 'bg-blue-500'
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <ProgressBar value={phaseProgress} label="Tiến độ giai đoạn" />

        {currentWeekData && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">
              Tuần {currentWeekData.week}: {currentWeekData.title}
            </h4>
            <div className="space-y-2">
              {currentWeekData.tasks.map((task) => {
                const isCompleted = progress.completedTasks.includes(task.id)
                return (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 rounded ${
                      isCompleted ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    <span className={isCompleted ? 'text-green-600' : 'text-gray-400'}>
                      {isCompleted ? '✓' : '○'}
                    </span>
                    <span className={`text-sm ${isCompleted ? 'text-green-800 line-through' : 'text-gray-700'}`}>
                      {task.description}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-3xl font-bold text-blue-700">{totalVocabLearned}</p>
          <p className="text-sm text-gray-500">Từ vựng đã học</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{grammarCompleted}</p>
          <p className="text-sm text-gray-500">Bài ngữ pháp</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{testsCompleted}</p>
          <p className="text-sm text-gray-500">Đề đã làm</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-3xl font-bold text-yellow-600">
            {progress.vocabularyProgress.length > 0
              ? Math.round(
                  (progress.vocabularyProgress.filter((v) => v.level >= 3).length /
                    progress.vocabularyProgress.length) *
                    100
                )
              : 0}%
          </p>
          <p className="text-sm text-gray-500">Tỷ lệ nhớ từ</p>
        </div>
      </div>

      {/* Score chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Lịch sử điểm thi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis domain={[0, 100]} fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Điểm (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Weakness */}
      {weakestPart && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Điểm yếu cần cải thiện</h3>
          <div className="bg-red-50 rounded p-4">
            <p className="font-medium text-red-800">
              Part {weakestPart[0]}: {Math.round((weakestPart[1].correct / weakestPart[1].total) * 100)}% đúng
            </p>
            <p className="text-sm text-red-600 mt-1">
              {weakestPart[1].correct}/{weakestPart[1].total} câu đúng - Nên luyện thêm Part này
            </p>
          </div>
        </div>
      )}

      {chartData.length === 0 && testsCompleted === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Chưa có dữ liệu. Bắt đầu luyện tập để xem thống kê!</p>
        </div>
      )}
    </div>
  )
}
