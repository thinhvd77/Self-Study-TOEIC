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

  const phaseWeeks = roadmap.filter((w) => w.phase === currentPhase)
  const phaseStart = phaseWeeks[0]?.week ?? 1
  const phaseEnd = phaseWeeks[phaseWeeks.length - 1]?.week ?? 4
  const phaseProgress = Math.min(100, Math.max(0, Math.round(
    ((progress.currentWeek - phaseStart) / (phaseEnd - phaseStart + 1)) * 100
  )))

  const totalVocabLearned = useMemo(
    () => progress.vocabularyProgress.filter((v) => v.correctCount > 0).length,
    [progress.vocabularyProgress]
  )
  const mastered = useMemo(
    () => progress.vocabularyProgress.filter(v => v.box === 5).length,
    [progress.vocabularyProgress]
  )
  const grammarCompleted = useMemo(
    () => progress.grammarProgress.filter((g) => g.completed).length,
    [progress.grammarProgress]
  )
  const testsCompleted = useMemo(() => progress.testHistory.length, [progress.testHistory])
  const chartData = useMemo(
    () => progress.testHistory.map((test) => ({
      date: new Date(test.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
      score: Math.round((test.correctAnswers / test.totalQuestions) * 100),
    })),
    [progress.testHistory]
  )
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
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Dashboard</h2>

      {/* Roadmap */}
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Giai đoạn {currentPhase}: {PHASE_LABELS[currentPhase]}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">Tuần {progress.currentWeek}/16</p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((phase) => (
              <div
                key={phase}
                className={`w-8 h-2 rounded-full ${
                  phase < currentPhase
                    ? 'bg-[var(--success)]'
                    : phase === currentPhase
                      ? 'bg-[var(--accent)]'
                      : 'bg-[var(--border)]'
                }`}
              />
            ))}
          </div>
        </div>

        <ProgressBar value={phaseProgress} label="Tiến độ giai đoạn" />

        {currentWeekData && (
          <div className="mt-4">
            <h4 className="font-medium text-[var(--text-primary)] mb-2">
              Tuần {currentWeekData.week}: {currentWeekData.title}
            </h4>
            <div className="space-y-2">
              {currentWeekData.tasks.map((task) => {
                const isCompleted = progress.completedTasks.includes(task.id)
                return (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isCompleted ? 'bg-[var(--accent-soft)]' : 'bg-[var(--bg-elevated)]'
                    }`}
                  >
                    <span className={isCompleted ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}>
                      {isCompleted ? '✓' : '○'}
                    </span>
                    <span className={`text-sm ${isCompleted ? 'text-[var(--accent)] line-through' : 'text-[var(--text-primary)]'}`}>
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
        {[
          { value: totalVocabLearned, label: 'Từ vựng đã học' },
          { value: grammarCompleted, label: 'Bài ngữ pháp' },
          { value: testsCompleted, label: 'Đề đã làm' },
        ].map(({ value, label }) => (
          <div key={label} className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 text-center hover:-translate-y-0.5 transition-all duration-200">
            <p className="text-3xl font-bold text-[var(--accent)]">{value}</p>
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
          </div>
        ))}
        {/* Mastered words tile */}
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 text-center hover:-translate-y-0.5 transition-all duration-200">
          <p className="text-3xl font-bold text-[var(--accent)]">{mastered}</p>
          <p className="text-sm text-[var(--text-secondary)]">Từ đã thuộc (Hộp 5)</p>
          <p className="text-xs text-gray-600 mt-1">trên {totalVocabLearned} từ đã học</p>
        </div>
      </div>

      {/* Score chart */}
      {chartData.length > 0 && (
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 mb-6">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Lịch sử điểm thi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e2e42" />
              <XAxis dataKey="date" fontSize={12} tick={{ fill: '#8b8ba7' }} />
              <YAxis domain={[0, 100]} fontSize={12} tick={{ fill: '#8b8ba7' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a24',
                  border: '1px solid #2e2e42',
                  borderRadius: '8px',
                  color: '#f1f0f5',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4, fill: '#f59e0b' }}
                name="Điểm (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Weakness */}
      {weakestPart && (
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Điểm yếu cần cải thiện</h3>
          <div className="bg-[var(--danger-soft)] rounded-lg p-4">
            <p className="font-medium text-[#fca5a5]">
              Part {weakestPart[0]}: {Math.round((weakestPart[1].correct / weakestPart[1].total) * 100)}% đúng
            </p>
            <p className="text-sm text-[#fca5a5] opacity-80 mt-1">
              {weakestPart[1].correct}/{weakestPart[1].total} câu đúng - Nên luyện thêm Part này
            </p>
          </div>
        </div>
      )}

      {chartData.length === 0 && testsCompleted === 0 && (
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-6 text-center">
          <p className="text-[var(--text-secondary)]">Chưa có dữ liệu. Bắt đầu luyện tập để xem thống kê!</p>
        </div>
      )}
    </div>
  )
}
