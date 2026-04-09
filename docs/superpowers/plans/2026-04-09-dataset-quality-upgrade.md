# Dataset Quality & Coverage Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nâng chất lượng dữ liệu học tập hiện có (Vocabulary + Grammar) và mở rộng Practice data để khớp roadmap 16 tuần.

**Architecture:** Dùng hướng hybrid: (1) thêm quality gates bằng Vitest để khóa chuẩn dữ liệu, (2) chuẩn hóa nội dung Vocabulary/Grammar theo rubric, (3) bổ sung Practice datasets theo từng Part còn thiếu. Mọi thay đổi giữ mô hình dữ liệu tĩnh trong `src/data/**`, không thêm backend.

**Tech Stack:** TypeScript, Vitest, React app data modules (`src/data/**`)

**Spec:** `docs/superpowers/specs/2026-04-09-dataset-quality-upgrade-design.md`

---

## File Structure

```text
src/data/__tests__/
├── dataset-quality.test.ts             # CREATE: quality gates cho vocabulary + grammar
├── practice-data-coverage.test.ts      # CREATE: kiểm tra coverage Part 1/3/4/5/6/7
└── roadmap-data-alignment.test.ts      # CREATE: kiểm tra roadmap target có data tương ứng

src/data/tests/
├── part1.ts                            # CREATE: sample Part 1 questions
├── part3.ts                            # CREATE: sample Part 3 questions
├── part4.ts                            # CREATE: sample Part 4 questions
├── part6.ts                            # CREATE: sample Part 6 questions
├── part7.ts                            # CREATE: sample Part 7 questions
└── part5.ts                            # MODIFY: giữ chuẩn giải thích + difficulty spread

src/data/vocabulary/
├── office.ts                           # MODIFY: chuẩn hóa nghĩa/ví dụ tự nhiên, giảm dịch máy
└── finance.ts                          # MODIFY: chuẩn hóa nghĩa/ví dụ tự nhiên, giảm dịch máy

src/data/grammar/
└── parts-of-speech.ts                  # MODIFY: mở rộng nội dung + nâng chất lượng bài tập
```

---

### Task 1: Add Quality Gate Test Harness

**Files:**
- Create: `src/data/__tests__/dataset-quality.test.ts`

- [ ] **Step 1: Write the failing quality-gate tests**

```typescript
import { describe, expect, it } from 'vitest'
import { officeVocabulary } from '../vocabulary/office'
import { financeVocabulary } from '../vocabulary/finance'
import { businessVocabulary } from '../vocabulary/business'
import { hrVocabulary } from '../vocabulary/hr'
import { manufacturingVocabulary } from '../vocabulary/manufacturing'
import { partsOfSpeechLesson } from '../grammar/parts-of-speech'

const workplaceKeywords = /(company|team|meeting|project|client|manager|department|report|policy|employee)/i

describe('Dataset quality gates', () => {
  it('keeps office + finance meanings concise', () => {
    const longMeanings = [...officeVocabulary, ...financeVocabulary].filter((w) => w.meaning.length > 70)
    expect(longMeanings).toHaveLength(0)
  })

  it('keeps office + finance examples in workplace context', () => {
    const offContextMiss = officeVocabulary.filter((w) => !workplaceKeywords.test(w.example))
    const finContextMiss = financeVocabulary.filter((w) => !workplaceKeywords.test(w.example))
    expect(offContextMiss).toHaveLength(0)
    expect(finContextMiss).toHaveLength(0)
  })

  it('limits cross-topic duplicates among business/hr/manufacturing/office/finance', () => {
    const pools = [businessVocabulary, hrVocabulary, manufacturingVocabulary, officeVocabulary, financeVocabulary]
    const words = pools.flatMap((topic) => topic.map((w) => w.word.toLowerCase()))
    const duplicates = words.filter((w, i, arr) => arr.indexOf(w) !== i)
    expect(new Set(duplicates).size).toBeLessThanOrEqual(20)
  })

  it('keeps gram-01 depth aligned with other lessons', () => {
    expect(partsOfSpeechLesson.content.length).toBeGreaterThanOrEqual(1800)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/__tests__/dataset-quality.test.ts`
Expected: FAIL on long meanings / context mismatch / duplicate count / gram-01 content length.

- [ ] **Step 3: Commit failing-test baseline**

```bash
git add src/data/__tests__/dataset-quality.test.ts
git commit -m "test(data): add quality gate tests for vocabulary and grammar" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 2: Normalize Office and Finance Vocabulary Quality

**Files:**
- Modify: `src/data/vocabulary/office.ts`
- Modify: `src/data/vocabulary/finance.ts`

- [ ] **Step 1: Rewrite low-quality entries in office.ts**

```typescript
// Example target style for rewritten entries (apply this quality level across all flagged items)
{
  id: 'v-off-001',
  word: 'agenda',
  ipa: '/əˈdʒen.də/',
  meaning: 'chương trình cuộc họp, danh sách nội dung cần thảo luận',
  partOfSpeech: 'noun',
  example: 'Please review the meeting agenda before the weekly team discussion.',
  synonyms: ['schedule', 'plan'],
  topic: 'office',
}
```

- [ ] **Step 2: Rewrite low-quality entries in finance.ts**

```typescript
{
  id: 'v-fin-001',
  word: 'asset',
  ipa: '/ˈæs.et/',
  meaning: 'tài sản có giá trị của cá nhân hoặc doanh nghiệp',
  partOfSpeech: 'noun',
  example: 'The company listed all major assets in its annual financial report.',
  antonyms: ['liability'],
  topic: 'finance',
}
```

- [ ] **Step 3: Remove avoidable cross-topic duplicates**

```typescript
const replacementMap: Record<string, string> = {
  // office.ts
  'v-off-003': 'milestone',     // replace duplicate "deadline"
  'v-off-028': 'briefing',      // replace duplicate "meeting"-like overlap
  'v-off-061': 'workstation',   // replace duplicate "office"
  // finance.ts
  'v-fin-009': 'turnover',      // replace duplicate "revenue"
  'v-fin-020': 'cash flow',     // replace duplicate "budget"/"expense" overlap
  'v-fin-057': 'equity ratio',  // replace duplicate "equity"
}

// Update both `word`, `meaning`, `example`, and optional synonyms for each replaced ID.
```

- [ ] **Step 4: Run quality gate test to verify pass**

Run: `npx vitest run src/data/__tests__/dataset-quality.test.ts`
Expected: PASS

- [ ] **Step 5: Commit normalized vocabulary**

```bash
git add src/data/vocabulary/office.ts src/data/vocabulary/finance.ts
git commit -m "fix(data): normalize office and finance vocabulary quality" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 3: Upgrade Grammar Lesson Depth Consistency

**Files:**
- Modify: `src/data/grammar/parts-of-speech.ts`
- Test: `src/data/__tests__/dataset-quality.test.ts`

- [ ] **Step 1: Expand `gram-01` content and examples to match learning depth**

```typescript
const addedSection = `
### Cách nhận diện loại từ trong 10 giây (TOEIC Part 5)

1. Xác định vị trí trống: trước danh từ / sau động từ nối / trước động từ chính.
2. Kiểm tra hậu tố: -tion/-ment (noun), -ive/-al (adjective), -ly (adverb), -ize/-ate (verb).
3. So sánh theo họ từ:
   - decide (v) / decision (n) / decisive (adj) / decisively (adv)
   - compete (v) / competition (n) / competitive (adj) / competitively (adv)

### Checklist tránh bẫy
- Nếu chỗ trống đứng trước danh từ: ưu tiên adjective.
- Nếu chỗ trống sau "be": ưu tiên adjective hoặc past participle tùy ngữ cảnh.
- Nếu chỗ trống bổ nghĩa động từ: ưu tiên adverb.
`.trim()
```

- [ ] **Step 2: Ensure exercises follow progressive difficulty**

```typescript
const exerciseDifficultyPlan = {
  'gram-01-ex01': 'easy',
  'gram-01-ex02': 'easy',
  'gram-01-ex03': 'medium',
  'gram-01-ex04': 'medium',
  'gram-01-ex05': 'hard',
}

// Rewrite explanations so each item states: clue -> part of speech -> why other options are wrong.
```

- [ ] **Step 3: Run grammar quality test**

Run: `npx vitest run src/data/__tests__/dataset-quality.test.ts`
Expected: PASS for gram-01 depth gate.

- [ ] **Step 4: Commit grammar improvements**

```bash
git add src/data/grammar/parts-of-speech.ts src/data/__tests__/dataset-quality.test.ts
git commit -m "feat(grammar): deepen gram-01 content and exercise progression" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 4: Add Missing Practice Datasets (Part 1, 3, 4, 6, 7)

**Files:**
- Create: `src/data/tests/part1.ts`
- Create: `src/data/tests/part3.ts`
- Create: `src/data/tests/part4.ts`
- Create: `src/data/tests/part6.ts`
- Create: `src/data/tests/part7.ts`
- Create: `src/data/__tests__/practice-data-coverage.test.ts`

- [ ] **Step 1: Write failing practice coverage test**

```typescript
import { describe, expect, it } from 'vitest'
import { part1Questions } from '../tests/part1'
import { part3Questions } from '../tests/part3'
import { part4Questions } from '../tests/part4'
import { part5Questions } from '../tests/part5'
import { part6Questions } from '../tests/part6'
import { part7Questions } from '../tests/part7'

describe('Practice data coverage', () => {
  it('has minimum question banks per implemented part', () => {
    expect(part1Questions.length).toBeGreaterThanOrEqual(10)
    expect(part3Questions.length).toBeGreaterThanOrEqual(10)
    expect(part4Questions.length).toBeGreaterThanOrEqual(10)
    expect(part5Questions.length).toBeGreaterThanOrEqual(20)
    expect(part6Questions.length).toBeGreaterThanOrEqual(10)
    expect(part7Questions.length).toBeGreaterThanOrEqual(10)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/__tests__/practice-data-coverage.test.ts`
Expected: FAIL with missing module imports for new part files.

- [ ] **Step 3: Create minimal valid datasets for each missing part**

```typescript
// Example object shape to apply in each new file
import { Question } from '../../types'

export const part1Questions: Question[] = [
  {
    id: 'p1-001',
    part: 1,
    type: 'listening',
    audioUrl: '/audio/part1/q001.mp3',
    question: 'What is most likely happening in the picture?',
    options: ['A man is filing documents.', 'A man is cleaning a window.', 'A man is giving a speech.', 'A man is painting a wall.'],
    correctAnswer: 0,
    explanation: 'Bức tranh mô tả nhân viên đang sắp xếp tài liệu trong văn phòng.',
  },
]
```

- [ ] **Step 4: Expand part5 question bank from 8 to at least 20**

```typescript
const newPart5Blueprint = [
  { id: 'p5-009', focus: 'present perfect vs past simple' },
  { id: 'p5-010', focus: 'preposition of time/place' },
  { id: 'p5-011', focus: 'conjunction contrast' },
  { id: 'p5-012', focus: 'relative pronoun' },
  { id: 'p5-013', focus: 'conditionals type 1' },
  { id: 'p5-014', focus: 'passive voice' },
  { id: 'p5-015', focus: 'word form (noun/verb/adj/adv)' },
  { id: 'p5-016', focus: 'countable/uncountable quantifiers' },
  { id: 'p5-017', focus: 'modal verbs in business requests' },
  { id: 'p5-018', focus: 'gerund vs infinitive' },
  { id: 'p5-019', focus: 'parallel structure' },
  { id: 'p5-020', focus: 'comparative/superlative' },
]
```

- [ ] **Step 5: Run practice coverage tests**

Run: `npx vitest run src/data/__tests__/practice-data-coverage.test.ts`
Expected: PASS

- [ ] **Step 6: Commit practice datasets**

```bash
git add src/data/tests/part1.ts src/data/tests/part3.ts src/data/tests/part4.ts src/data/tests/part5.ts src/data/tests/part6.ts src/data/tests/part7.ts src/data/__tests__/practice-data-coverage.test.ts
git commit -m "feat(data): add missing practice part datasets and coverage test" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 5: Add Roadmap-to-Data Alignment Test and Final Regression

**Files:**
- Create: `src/data/__tests__/roadmap-data-alignment.test.ts`

- [ ] **Step 1: Write roadmap alignment test**

```typescript
import { describe, expect, it } from 'vitest'
import { roadmap } from '../roadmap'
import { part1Questions } from '../tests/part1'
import { part3Questions } from '../tests/part3'
import { part4Questions } from '../tests/part4'
import { part5Questions } from '../tests/part5'
import { part6Questions } from '../tests/part6'
import { part7Questions } from '../tests/part7'

const partBank: Record<string, number> = {
  'part:1': part1Questions.length,
  'part:3': part3Questions.length,
  'part:4': part4Questions.length,
  'part:5': part5Questions.length,
  'part:6': part6Questions.length,
  'part:7': part7Questions.length,
}

describe('Roadmap and data alignment', () => {
  it('ensures each part target in roadmap has available question data', () => {
    const partTargets = roadmap
      .flatMap((w) => w.tasks)
      .filter((t) => t.type === 'practice' && t.target.startsWith('part:'))
      .map((t) => t.target)

    partTargets.forEach((target) => {
      expect(partBank[target]).toBeGreaterThan(0)
    })
  })
})
```

- [ ] **Step 2: Run target tests**

Run: `npx vitest run src/data/__tests__/dataset-quality.test.ts src/data/__tests__/practice-data-coverage.test.ts src/data/__tests__/roadmap-data-alignment.test.ts`
Expected: PASS

- [ ] **Step 3: Run full test suite**

Run: `npm test`
Expected: PASS (all test files green)

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: PASS (`tsc -b` + Vite build successful)

- [ ] **Step 5: Commit alignment + verification changes**

```bash
git add src/data/__tests__/roadmap-data-alignment.test.ts src/data/__tests__/dataset-quality.test.ts src/data/__tests__/practice-data-coverage.test.ts
git commit -m "test(data): enforce roadmap alignment and quality coverage gates" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 6: Add Auto-Audit Script for Hybrid Workflow (Phase 3 Foundation)

**Files:**
- Create: `scripts/audit-dataset-quality.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the audit script**

```javascript
import fs from 'node:fs'
import path from 'node:path'

const longMeaningThreshold = 70

const collectLongMeanings = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8')
  const meanings = [...content.matchAll(/["']?meaning["']?\s*:\s*["']([^"']+)["']/g)].map((m) => m[1])
  return meanings.filter((m) => m.length > longMeaningThreshold).length
}

const printReport = () => {
  const officePath = path.join('src/data/vocabulary/office.ts')
  const financePath = path.join('src/data/vocabulary/finance.ts')
  const officeLong = collectLongMeanings(officePath)
  const financeLong = collectLongMeanings(financePath)

  console.log('=== Dataset Quality Audit ===')
  console.log('office long meanings:', officeLong)
  console.log('finance long meanings:', financeLong)

  if (officeLong > 0 || financeLong > 0) {
    process.exitCode = 1
  }
}

printReport()
```

- [ ] **Step 2: Add npm script entry**

```json
{
  "scripts": {
    "audit:data": "node scripts/audit-dataset-quality.mjs"
  }
}
```

- [ ] **Step 3: Run audit command**

Run: `npm run audit:data`
Expected: PASS (exit code 0) after Task 2 normalization.

- [ ] **Step 4: Commit audit workflow foundation**

```bash
git add scripts/audit-dataset-quality.mjs package.json
git commit -m "chore(data): add dataset quality audit script for hybrid workflow" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Execution Notes

- Giữ tiếng Việt cho toàn bộ learner-facing text (`meaning`, `explanation`) theo convention của repo.
- Không thay đổi domain types trừ khi thực sự bắt buộc để hiển thị dữ liệu mới.
- Ưu tiên commit nhỏ theo từng task để dễ review và rollback.
