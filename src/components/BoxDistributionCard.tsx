interface Props {
  distribution: Array<{ box: 1 | 2 | 3 | 4 | 5; count: number }>
  total: number
}

const boxColors = {
  1: 'bg-red-500',
  2: 'bg-orange-500',
  3: 'bg-yellow-500',
  4: 'bg-blue-500',
  5: 'bg-green-500',
}

export function BoxDistributionCard({ distribution, total }: Props) {
  // Find max count to scale bar heights
  const maxCount = Math.max(...distribution.map((d) => d.count), 0)

  // Create a map for quick lookup
  const distributionMap = new Map(distribution.map((d) => [d.box, d.count]))

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Phân bổ hộp</h3>
        <span className="text-2xl font-bold text-[var(--accent)]">{total}</span>
      </div>

      {/* Bars container */}
      <div className="flex justify-between gap-2 h-40">
        {(Array.from({ length: 5 }, (_, i) => (i + 1) as 1 | 2 | 3 | 4 | 5)).map((box) => {
          const count = distributionMap.get(box) || 0
          const percent = maxCount === 0 ? 0 : (count / maxCount) * 100

          return (
            <div key={box} className="flex flex-col items-center flex-1">
              {/* Bar area: takes remaining height, bar grows from bottom */}
              <div className="relative flex-1 w-full">
                <div
                  data-testid="bar"
                  className={`absolute bottom-0 left-0 right-0 rounded-t ${boxColors[box]} transition-all duration-300`}
                  style={{ height: `${percent}%` }}
                />
              </div>
              {/* Label */}
              <span className="text-sm font-medium text-[var(--text-secondary)]">Hộp {box}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
