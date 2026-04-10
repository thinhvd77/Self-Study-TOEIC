import fs from 'node:fs'
import path from 'node:path'

const LONG_MEANING_THRESHOLD = 70
const TARGET_FILES = [
  'src/data/vocabulary/office.ts',
  'src/data/vocabulary/finance.ts',
]

const parseEntries = (content) => {
  const entries = []
  const entryPattern = /\{[\s\S]*?\}/g

  for (const blockMatch of content.matchAll(entryPattern)) {
    const block = blockMatch[0]
    const idMatch = block.match(/id\s*:\s*['\"]([^'\"]+)['\"]/)
    const wordMatch = block.match(/word\s*:\s*['\"]([^'\"]+)['\"]/)
    const meaningMatch = block.match(/meaning\s*:\s*([\"'])((?:\\.|(?!\1)[\s\S])*)\1/)

    if (!meaningMatch) continue

    entries.push({
      id: idMatch?.[1] ?? 'unknown-id',
      word: wordMatch?.[1] ?? 'unknown-word',
      meaning: meaningMatch[2],
    })
  }

  return entries
}

const auditFile = (relativePath) => {
  const absolutePath = path.resolve(process.cwd(), relativePath)
  const content = fs.readFileSync(absolutePath, 'utf8')
  const entries = parseEntries(content)

  return entries.filter((entry) => entry.meaning.length > LONG_MEANING_THRESHOLD)
}

const main = () => {
  const report = TARGET_FILES.map((filePath) => ({
    filePath,
    violations: auditFile(filePath),
  }))

  const totalViolations = report.reduce((sum, item) => sum + item.violations.length, 0)

  console.log(`Dataset quality audit (meaning length > ${LONG_MEANING_THRESHOLD})`)

  for (const item of report) {
    console.log(`- ${item.filePath}: ${item.violations.length} violation(s)`)

    for (const violation of item.violations) {
      console.log(
        `  • ${violation.id} (${violation.word}) -> ${violation.meaning.length} chars`
      )
    }
  }

  if (totalViolations > 0) {
    console.error(`Audit failed: ${totalViolations} long meaning violation(s) found.`)
    process.exitCode = 1
    return
  }

  console.log('Audit passed: no long meaning violations found.')
}

main()
