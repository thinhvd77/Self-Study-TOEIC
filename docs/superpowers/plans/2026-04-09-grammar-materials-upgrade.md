# Grammar Materials Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuẩn hóa và viết lại 8 bài grammar hiện có để dễ hiểu hơn cho người học nền yếu, giữ nguyên schema lesson và flow UI hiện tại.

**Architecture:** Thêm một test dữ liệu chuyên biệt để khóa template Markdown, độ sâu examples/explanations, và shape của lesson data trước khi rewrite nội dung theo từng batch nhỏ. Mọi thay đổi nằm trong `src/data/grammar/*.ts` và test data modules; không đổi `GrammarLesson`, không đổi route/component vì `LessonView` đã render Markdown đúng cách.

**Tech Stack:** TypeScript, Vitest, static data modules trong `src/data/grammar/**`, ReactMarkdown renderer hiện có

**Spec:** `docs/superpowers/specs/2026-04-09-grammar-materials-upgrade-design.md`

---

## File Structure

```text
src/data/__tests__/
├── grammar-content-upgrade.test.ts   # CREATE: khóa template heading, example depth, exercise explanation quality
└── task2-data.test.ts                # MODIFY: nâng regression baseline từ 1 lesson lên đủ 8 lesson

src/data/grammar/
├── parts-of-speech.ts                # MODIFY: rewrite theo template dễ hiểu cho người yếu nền
├── verb-tenses.ts                    # MODIFY: rewrite theo template + time-signal emphasis
├── passive-voice.ts                  # MODIFY: rewrite theo template + active/passive traps
├── conjunctions.ts                   # MODIFY: rewrite theo template + connector clues
├── prepositions.ts                   # MODIFY: rewrite theo template + collocation traps
├── relative-pronouns.ts              # MODIFY: rewrite theo template + clause-role clues
├── comparatives.ts                   # MODIFY: rewrite theo template + comparison patterns
└── conditionals.ts                   # MODIFY: rewrite theo template + type recognition
```

---

### Task 1: Seed the Grammar Content Contract Test

**Files:**
- Create: `src/data/__tests__/grammar-content-upgrade.test.ts`

- [ ] **Step 1: Write the failing contract test for the first batch (`gram-01`..`gram-03`)**

```typescript
import { describe, expect, it } from 'vitest'
import { GrammarLesson } from '../../types'
import { partsOfSpeechLesson } from '../grammar/parts-of-speech'
import { verbTensesLesson } from '../grammar/verb-tenses'
import { passiveVoiceLesson } from '../grammar/passive-voice'

const requiredHeadings = [
  '## Mục tiêu bài học',
  '## Khái niệm cốt lõi',
  '## Cách nhận diện trong câu',
  '## Công thức/mẫu cần nhớ',
  '## Lỗi thường gặp',
  '## Mẹo làm TOEIC Part 5',
  '## Tóm tắt nhanh',
]

function assertStructuredLesson(lesson: GrammarLesson) {
  expect(lesson.content).toBe(lesson.content.trim())

  for (const heading of requiredHeadings) {
    expect(lesson.content).toContain(heading)
  }

  expect(lesson.examples.length).toBeGreaterThanOrEqual(3)
  expect(lesson.exercises).toHaveLength(5)

  for (const example of lesson.examples) {
    expect(example.english.length).toBeGreaterThanOrEqual(20)
    expect(example.vietnamese.length).toBeGreaterThanOrEqual(30)
  }

  for (const exercise of lesson.exercises) {
    expect(exercise.options).toHaveLength(4)
    expect(exercise.correctAnswer).toBeGreaterThanOrEqual(0)
    expect(exercise.correctAnswer).toBeLessThan(exercise.options.length)
    expect(exercise.explanation.length).toBeGreaterThanOrEqual(60)
  }
}

describe('Grammar content upgrade contract', () => {
  it('keeps gram-01 beginner-friendly and structured', () => {
    assertStructuredLesson(partsOfSpeechLesson)
  })

  it('keeps gram-02 beginner-friendly and structured', () => {
    assertStructuredLesson(verbTensesLesson)
  })

  it('keeps gram-03 beginner-friendly and structured', () => {
    assertStructuredLesson(passiveVoiceLesson)
  })
})
```

- [ ] **Step 2: Run the new test to verify it fails on missing headings / shallow explanations**

Run: `npx vitest run src/data/__tests__/grammar-content-upgrade.test.ts`

Expected: FAIL because the current lessons do not yet contain the approved heading set and some explanations/examples are below the new depth threshold.

---

### Task 2: Rewrite the Foundation Lessons (`gram-01`..`gram-03`)

**Files:**
- Modify: `src/data/grammar/parts-of-speech.ts`
- Modify: `src/data/grammar/verb-tenses.ts`
- Modify: `src/data/grammar/passive-voice.ts`
- Test: `src/data/__tests__/grammar-content-upgrade.test.ts`

- [ ] **Step 1: Rewrite `src/data/grammar/parts-of-speech.ts` with the approved beginner-first template**

```typescript
content: `
## Mục tiêu bài học
- Nhận ra chỗ trống đang cần noun, verb, adjective hay adverb.
- Loại đáp án nhanh bằng vị trí và hậu tố trong TOEIC Part 5.

## Khái niệm cốt lõi
Loại từ là vai trò của một từ trong câu. Trong Part 5, đề thường không hỏi nghĩa khó mà hỏi xem chỗ trống đang cần "danh từ, động từ, tính từ hay trạng từ".

## Cách nhận diện trong câu
- Sau mạo từ (`a/an/the`) thường cần noun.
- Trước noun thường cần adjective.
- Bổ nghĩa cho verb thường cần adverb.
- Sau trợ động từ, `to`, hoặc sau chủ ngữ thường cần verb.
- Hậu tố hay gặp: `-tion/-ment` (noun), `-ive/-ous/-al` (adjective), `-ly` (adverb), `-ize/-ate` (verb).

## Công thức/mẫu cần nhớ
- `the + noun`
- `be + adjective`
- `verb + adverb`
- `to + verb`
- `adjective + noun`

## Lỗi thường gặp
- Thấy từ có nghĩa quen nhưng quên kiểm tra vị trí trong câu.
- Chọn adjective thay vì adverb vì hai từ cùng họ từ.
- Chọn noun sau `to` dù sau `to` phải là verb nguyên mẫu.

## Mẹo làm TOEIC Part 5
Nhìn ngay từ đứng trước và sau chỗ trống trước khi đọc nghĩa. Nếu xác định đúng vị trí ngữ pháp, bạn thường loại được 2-3 đáp án trong vài giây.

## Tóm tắt nhanh
- Trước noun -> adjective
- Sau mạo từ -> noun
- Bổ nghĩa verb -> adverb
- Sau `to` / trợ động từ -> verb
`.trim(),
examples: [
  {
    english: 'The ___ report was sent to the client this morning.',
    vietnamese: 'Sau "The" và trước "report" cần một tính từ bổ nghĩa cho danh từ, nên phải chọn dạng adjective.',
  },
  {
    english: 'Our team responded ___ to the customer complaint.',
    vietnamese: 'Từ cần điền bổ nghĩa cho động từ "responded", nên phải tìm trạng từ chứ không phải tính từ hay danh từ.',
  },
  {
    english: 'The manager decided to ___ the policy immediately.',
    vietnamese: 'Sau "to" luôn cần động từ nguyên mẫu, đây là cách loại đáp án rất nhanh trong Part 5.',
  },
],
// Preserve exercise IDs `gram-01-ex01`..`gram-01-ex05`, keep four options per question,
// and rewrite all five explanation strings to follow:
// "Dấu hiệu trong câu -> loại từ cần chọn -> vì sao ba lựa chọn còn lại sai".
```

- [ ] **Step 2: Rewrite `src/data/grammar/verb-tenses.ts` to emphasize time signals and decision flow**

```typescript
content: `
## Mục tiêu bài học
- Nhận ra dấu hiệu thời gian để chọn đúng thì trong câu TOEIC.
- Phân biệt nhanh các cặp dễ nhầm như Present Perfect và Past Simple.

## Khái niệm cốt lõi
Thì động từ cho biết hành động xảy ra khi nào. Trong TOEIC, bạn không cần nhớ toàn bộ hệ thống ngữ pháp học thuật; bạn cần nhìn ra dấu hiệu thời gian và quan hệ trước-sau giữa các hành động.

## Cách nhận diện trong câu
- `every day`, `usually`, `often` -> Present Simple
- `now`, `currently`, `at the moment` -> Present Continuous
- `since`, `for`, `already`, `just`, `yet` -> Present Perfect
- `yesterday`, `last week`, `ago`, năm cụ thể trong quá khứ -> Past Simple
- `while`, `when` + bối cảnh đang diễn ra -> Past Continuous / Past Perfect
- `by next ...`, `by the time ...` -> Future Perfect hoặc Past Perfect tùy mốc thời gian

## Công thức/mẫu cần nhớ
- Present Simple: `S + V(s/es)`
- Present Perfect: `S + have/has + V3`
- Past Simple: `S + V2/ed`
- Past Perfect: `S + had + V3`
- Future Perfect: `S + will have + V3`

## Lỗi thường gặp
- Thấy mốc quá khứ nhưng vẫn chọn Present Perfect.
- Gặp `since/for` mà quên kiểm tra hành động còn liên quan đến hiện tại hay không.
- Nhầm giữa một hành động đang diễn ra trong quá khứ và hành động hoàn thành trước đó.

## Mẹo làm TOEIC Part 5
Đừng đọc cả câu theo cảm giác. Hãy gạch dưới time signal trước, sau đó mới chọn nhóm thì phù hợp. Nếu có hai hành động quá khứ, hỏi tiếp: hành động nào xảy ra trước?

## Tóm tắt nhanh
- `since/for` -> ưu tiên Present Perfect
- mốc quá khứ rõ ràng -> Past Simple
- hành động xảy ra trước quá khứ khác -> Past Perfect
- `by next ...` -> nghĩ đến Future Perfect
`.trim(),
examples: [
  {
    english: 'The company has expanded its services since 2021.',
    vietnamese: 'Từ "since 2021" cho biết hành động bắt đầu trong quá khứ và còn liên hệ đến hiện tại, nên dùng Present Perfect.',
  },
  {
    english: 'While we were reviewing the contract, the client called.',
    vietnamese: 'Một hành động đang diễn ra trong quá khứ bị một hành động khác chen vào, nên cần Past Continuous cho hành động đang diễn ra.',
  },
  {
    english: 'By next month, the finance team will have finished the audit.',
    vietnamese: 'Cụm "By next month" cho thấy hành động phải hoàn thành trước một mốc tương lai, nên dùng Future Perfect.',
  },
],
// Rewrite explanation strings for `gram-02-ex01`..`gram-02-ex05`
// so each one explicitly names the time signal and the tense-selection reason.
```

- [ ] **Step 3: Rewrite `src/data/grammar/passive-voice.ts` to focus on active/passive recognition**

```typescript
content: `
## Mục tiêu bài học
- Nhận ra khi nào câu cần bị động thay vì chủ động.
- Chọn đúng dạng `be + V3/ed` theo thì của câu.

## Khái niệm cốt lõi
Câu bị động được dùng khi người viết muốn nhấn mạnh người/vật nhận hành động hơn là người thực hiện hành động. Trong TOEIC, bị động rất hay xuất hiện trong email, thông báo, quy trình, và quy định công ty.

## Cách nhận diện trong câu
- Chủ ngữ là thứ "được xử lý/được gửi/được yêu cầu" -> nghĩ đến bị động.
- Có dạng `be` + past participle (`sent`, `approved`, `completed`) -> bị động.
- Nếu người làm hành động không quan trọng hoặc không xuất hiện -> thường dùng bị động.
- Kiểm tra thì của động từ `be` trước, sau đó mới chọn V3/ed.

## Công thức/mẫu cần nhớ
- Present passive: `am/is/are + V3`
- Past passive: `was/were + V3`
- Future passive: `will be + V3`
- Modal passive: `can/must/should be + V3`

## Lỗi thường gặp
- Chọn V-ing hoặc V nguyên mẫu sau `is/was/will be`.
- Thấy một động từ quen mắt rồi chọn active dù chủ ngữ không tự thực hiện hành động.
- Quên chia thì cho `be`.

## Mẹo làm TOEIC Part 5
Hỏi nhanh: chủ ngữ có tự làm hành động này không? Nếu không, gần như chắc chắn cần bị động. Sau đó chỉ còn việc chọn đúng thì của `be`.

## Tóm tắt nhanh
- Bị tác động -> nghĩ đến passive
- Passive = `be + V3`
- Xác định thì trước, chia `be` sau
- Modal + passive = `modal + be + V3`
`.trim(),
examples: [
  {
    english: 'The final report was submitted to the director yesterday.',
    vietnamese: 'Báo cáo là thứ nhận hành động "submit", không phải tự nộp, nên câu này dùng bị động ở quá khứ.',
  },
  {
    english: 'All visitors must be registered at the front desk.',
    vietnamese: 'Sau modal "must" mà muốn diễn tả bị động thì dùng cấu trúc "must be + V3".',
  },
  {
    english: 'The new policy will be announced next Monday.',
    vietnamese: 'Thông báo là hành động xảy ra với "policy", nên dùng future passive: "will be announced".',
  },
],
// Rewrite explanation strings for `gram-03-ex01`..`gram-03-ex05`
// so each item states whether the subject performs or receives the action, then points to the correct passive form.
```

- [ ] **Step 4: Run the contract test and confirm the first batch passes**

Run: `npx vitest run src/data/__tests__/grammar-content-upgrade.test.ts`

Expected: PASS for `gram-01`, `gram-02`, and `gram-03`.

- [ ] **Step 5: Commit the first passing batch**

```bash
git add src/data/__tests__/grammar-content-upgrade.test.ts \
  src/data/grammar/parts-of-speech.ts \
  src/data/grammar/verb-tenses.ts \
  src/data/grammar/passive-voice.ts
git commit -m "feat(grammar): rewrite foundation lessons for beginner clarity" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 3: Extend the Contract and Rewrite the Connector Lessons (`gram-04`..`gram-06`)

**Files:**
- Modify: `src/data/__tests__/grammar-content-upgrade.test.ts`
- Modify: `src/data/grammar/conjunctions.ts`
- Modify: `src/data/grammar/prepositions.ts`
- Modify: `src/data/grammar/relative-pronouns.ts`

- [ ] **Step 1: Extend `grammar-content-upgrade.test.ts` to cover `gram-04`..`gram-06`**

```typescript
import { conjunctionsLesson } from '../grammar/conjunctions'
import { prepositionsLesson } from '../grammar/prepositions'
import { relativePronounsLesson } from '../grammar/relative-pronouns'

describe('Grammar content upgrade contract - connector batch', () => {
  it('keeps gram-04 beginner-friendly and structured', () => {
    assertStructuredLesson(conjunctionsLesson)
  })

  it('keeps gram-05 beginner-friendly and structured', () => {
    assertStructuredLesson(prepositionsLesson)
  })

  it('keeps gram-06 beginner-friendly and structured', () => {
    assertStructuredLesson(relativePronounsLesson)
  })
})
```

- [ ] **Step 2: Run the contract test to verify the new batch fails before content changes**

Run: `npx vitest run src/data/__tests__/grammar-content-upgrade.test.ts`

Expected: FAIL on one or more of `gram-04`, `gram-05`, `gram-06` for missing headings or shallow example/explanation depth.

- [ ] **Step 3: Rewrite `src/data/grammar/conjunctions.ts` around clause-linking clues**

```typescript
content: `
## Mục tiêu bài học
- Phân biệt nhanh conjunction, connector, và conjunctive adverb trong Part 5.
- Chọn đúng từ nối dựa trên quan hệ ý nghĩa giữa hai vế câu.

## Khái niệm cốt lõi
Từ nối giúp liên kết ý. TOEIC thường hỏi bạn chọn từ vì nghĩa logic của câu: thêm ý, đối lập, nguyên nhân-kết quả, hoặc điều kiện.

## Cách nhận diện trong câu
- Hai mệnh đề hoàn chỉnh -> cần coordinating conjunction hoặc conjunctive adverb đúng ngữ cảnh.
- Một vế phụ + một vế chính -> thường là subordinating conjunction.
- Có dấu chấm phẩy hoặc dấu phẩy bao quanh -> để ý conjunctive adverb như `however`, `therefore`.
- Nhìn quan hệ ý nghĩa: cùng chiều, đối lập, nguyên nhân, nhượng bộ, điều kiện.

## Công thức/mẫu cần nhớ
- `and / but / or / so`
- `because / although / if / unless`
- `; however,` / `; therefore,`

## Lỗi thường gặp
- Chọn từ nối đúng nghĩa nhưng sai cấu trúc câu.
- Nhầm `because` với `because of`.
- Dùng `however` như conjunction thường.

## Mẹo làm TOEIC Part 5
Đọc hai vế và tự nói bằng tiếng Việt xem chúng đang "thêm ý, trái ý, hay giải thích lý do". Xác định quan hệ trước rồi mới chọn từ nối.

## Tóm tắt nhanh
- hai mệnh đề + đối lập -> `but` / `however`
- lý do -> `because`
- kết quả -> `so` / `therefore`
- điều kiện -> `if` / `unless`
`.trim(),
examples: [
  {
    english: 'The shipment was delayed, so the client changed the delivery date.',
    vietnamese: 'Vế sau là kết quả của vế trước, nên phải dùng từ nối chỉ kết quả như "so".',
  },
  {
    english: 'Although the proposal was expensive, the board approved it.',
    vietnamese: 'Hai ý trái ngược nhau nhưng vẫn đi cùng nhau, nên cần từ nối nhượng bộ như "although".',
  },
  {
    english: 'The printer is out of paper; however, the front desk has extra copies.',
    vietnamese: 'Sau dấu chấm phẩy và trước dấu phẩy là vị trí rất điển hình của conjunctive adverb như "however".',
  },
],
// Rewrite explanations to point out both the logical relationship and the sentence pattern the correct connector fits.
```

- [ ] **Step 4: Rewrite `src/data/grammar/prepositions.ts` around fixed patterns and common traps**

```typescript
content: `
## Mục tiêu bài học
- Nhận ra giới từ đúng theo thời gian, vị trí, và cụm cố định thường gặp trong TOEIC.
- Tránh nhầm các cặp phổ biến như `in/on/at`, `for/since`, `to/for`.

## Khái niệm cốt lõi
Giới từ không chỉ mang nghĩa chung; nhiều câu TOEIC kiểm tra cụm dùng cố định. Vì vậy người học cần nhìn cả cụm thay vì dịch từng từ riêng lẻ.

## Cách nhận diện trong câu
- Thời gian dài (`month`, `year`, `morning`) -> thường `in`
- Ngày cụ thể / thứ -> thường `on`
- Giờ cụ thể / điểm mốc ngắn -> thường `at`
- `since` đi với mốc bắt đầu, `for` đi với khoảng thời gian
- Một số động từ/tính từ có giới từ đi kèm cố định: `interested in`, `responsible for`, `apply for`

## Công thức/mẫu cần nhớ
- `in + month/year`
- `on + day/date`
- `at + time`
- `responsible for`, `participate in`, `according to`

## Lỗi thường gặp
- Dịch nghĩa từng từ rồi chọn giới từ theo cảm giác.
- Nhầm `since` và `for`.
- Quên học collocation cố định.

## Mẹo làm TOEIC Part 5
Nếu chỗ trống là preposition, đừng chỉ nhìn danh từ theo sau; hãy nhìn luôn từ đứng trước vì rất nhiều đáp án được quyết định bởi collocation.

## Tóm tắt nhanh
- mốc rộng -> `in`
- ngày / date -> `on`
- giờ cụ thể -> `at`
- mốc bắt đầu -> `since`
- khoảng thời gian -> `for`
`.trim(),
examples: [
  {
    english: 'The training session will begin at 9:00 a.m.',
    vietnamese: 'Một giờ cụ thể đi với "at", đây là cách nhận diện nhanh nhất ở nhóm giới từ thời gian.',
  },
  {
    english: 'She has worked in marketing for three years.',
    vietnamese: 'Cụm "for three years" diễn tả khoảng thời gian kéo dài, khác với "since" là mốc bắt đầu.',
  },
  {
    english: 'All employees must comply with the new safety policy.',
    vietnamese: 'Đây là collocation cố định "comply with", nên không thể chọn giới từ theo nghĩa chung.',
  },
],
// Preserve `gram-05-ex01`..`gram-05-ex05` and rewrite all five explanations
// so each one names the collocation or time-expression rule that controls the answer.
```

- [ ] **Step 5: Rewrite `src/data/grammar/relative-pronouns.ts` around role-based clause analysis**

```typescript
content: `
## Mục tiêu bài học
- Xác định khi nào dùng who, which, that, whose, where, hoặc when.
- Nhìn vai trò còn thiếu trong mệnh đề quan hệ để chọn đúng đại từ quan hệ.

## Khái niệm cốt lõi
Đại từ quan hệ nối một danh từ với mệnh đề bổ sung thông tin cho danh từ đó. Trong TOEIC, lỗi phổ biến nhất là chọn theo nghĩa thay vì kiểm tra xem mệnh đề đang thiếu chủ ngữ, tân ngữ, hay chỉ sở hữu.

## Cách nhận diện trong câu
- Chỉ người -> thường `who/whom/that`
- Chỉ vật/sự việc -> thường `which/that`
- Chỉ sở hữu -> `whose`
- Chỉ nơi chốn -> `where`
- Chỉ thời gian -> `when`
- Nếu phía sau vẫn thiếu chủ ngữ hoặc tân ngữ, đó là tín hiệu của relative pronoun

## Công thức/mẫu cần nhớ
- `the employee who ...`
- `the document that ...`
- `the office where ...`
- `the year when ...`
- `the manager whose team ...`

## Lỗi thường gặp
- Chọn `which` cho người hoặc `who` cho vật.
- Quên kiểm tra mệnh đề sau đang thiếu thành phần gì.
- Nhầm `whose` với `who's`.

## Mẹo làm TOEIC Part 5
Khoanh danh từ đứng trước trước, rồi hỏi: mệnh đề sau đang nói thêm về người, vật, nơi chốn, thời gian hay sở hữu? Chỉ cần trả lời đúng câu này là loại được gần hết đáp án.

## Tóm tắt nhanh
- người -> `who`
- vật -> `which/that`
- sở hữu -> `whose`
- nơi chốn -> `where`
- thời gian -> `when`
`.trim(),
examples: [
  {
    english: 'The applicant who submitted the resume was called for an interview.',
    vietnamese: 'Danh từ trước là người và mệnh đề sau cần chủ ngữ, nên dùng "who".',
  },
  {
    english: 'The building where the conference is held was recently renovated.',
    vietnamese: 'Danh từ trước chỉ nơi chốn, nên "where" là lựa chọn tự nhiên nhất.',
  },
  {
    english: 'The manager whose team won the award will speak today.',
    vietnamese: 'Mệnh đề sau cần diễn tả quan hệ sở hữu giữa manager và team, nên phải dùng "whose".',
  },
],
// Rewrite explanations so each one names the antecedent type and the missing role inside the relative clause.
```

- [ ] **Step 6: Run the contract test and confirm the second batch passes**

Run: `npx vitest run src/data/__tests__/grammar-content-upgrade.test.ts`

Expected: PASS for `gram-01`..`gram-06`.

- [ ] **Step 7: Commit the second passing batch**

```bash
git add src/data/__tests__/grammar-content-upgrade.test.ts \
  src/data/grammar/conjunctions.ts \
  src/data/grammar/prepositions.ts \
  src/data/grammar/relative-pronouns.ts
git commit -m "feat(grammar): rewrite connector lessons for beginner clarity" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 4: Extend the Contract and Rewrite the Pattern Lessons (`gram-07`..`gram-08`)

**Files:**
- Modify: `src/data/__tests__/grammar-content-upgrade.test.ts`
- Modify: `src/data/grammar/comparatives.ts`
- Modify: `src/data/grammar/conditionals.ts`

- [ ] **Step 1: Extend `grammar-content-upgrade.test.ts` to cover `gram-07` and `gram-08`**

```typescript
import { comparativesLesson } from '../grammar/comparatives'
import { conditionalsLesson } from '../grammar/conditionals'

describe('Grammar content upgrade contract - pattern batch', () => {
  it('keeps gram-07 beginner-friendly and structured', () => {
    assertStructuredLesson(comparativesLesson)
  })

  it('keeps gram-08 beginner-friendly and structured', () => {
    assertStructuredLesson(conditionalsLesson)
  })
})
```

- [ ] **Step 2: Run the contract test to verify the last batch fails before rewrite**

Run: `npx vitest run src/data/__tests__/grammar-content-upgrade.test.ts`

Expected: FAIL on `gram-07` and/or `gram-08` until the new template is applied.

- [ ] **Step 3: Rewrite `src/data/grammar/comparatives.ts` to focus on pattern matching**

```typescript
content: `
## Mục tiêu bài học
- Nhận ra nhanh comparative, superlative, và cấu trúc so sánh bằng trong TOEIC.
- Tránh nhầm giữa dấu hiệu hình thức (`-er`, `more`, `most`, `as ... as`) và từ loại cần dùng.

## Khái niệm cốt lõi
Câu so sánh không khó nếu bạn nhìn ra mẫu. TOEIC thường kiểm tra xem người học có nhận ra cấu trúc so sánh đang mở ra loại từ hay cụm từ nào.

## Cách nhận diện trong câu
- Có `than` -> nghĩ đến comparative
- Có `the most` / `the least` -> superlative
- Có `as ... as` -> so sánh bằng
- Sau `more` / `most` mà đi với adjective dài -> không dùng `-er/-est`

## Công thức/mẫu cần nhớ
- `adj-er + than`
- `more + adjective + than`
- `the + adj-est`
- `the most + adjective`
- `as + adjective + as`

## Lỗi thường gặp
- Dùng `more easier`, `most fastest`
- Thấy `than` nhưng chọn superlative
- Quên `the` trước superlative

## Mẹo làm TOEIC Part 5
Chỉ cần tìm từ khóa như `than`, `as`, `most`, `least` trước. Khi mẫu đã rõ, đáp án thường chỉ còn là chọn đúng dạng adjective/adverb.

## Tóm tắt nhanh
- `than` -> comparative
- `the most` -> superlative
- `as ... as` -> so sánh bằng
- adjective ngắn -> `-er/-est`
- adjective dài -> `more/most`
`.trim(),
examples: [
  {
    english: 'This model is more efficient than the previous one.',
    vietnamese: 'Có "than" nên đây là so sánh hơn; tính từ dài như "efficient" đi với "more", không thêm "-er".',
  },
  {
    english: 'Our branch is the most profitable in the region.',
    vietnamese: 'Có "the most" nên đây là so sánh nhất, dùng để chọn chi nhánh có lợi nhuận cao nhất.',
  },
  {
    english: 'The new system is as reliable as the old one.',
    vietnamese: 'Cấu trúc "as ... as" cho biết hai đối tượng được so sánh ngang nhau.',
  },
],
// Rewrite explanation strings for `gram-07-ex01`..`gram-07-ex05`
// so each one points to the visible comparison marker in the sentence.
```

- [ ] **Step 4: Rewrite `src/data/grammar/conditionals.ts` to emphasize condition-type recognition**

```typescript
content: `
## Mục tiêu bài học
- Nhận ra loại câu điều kiện đang xuất hiện trong TOEIC.
- Chọn đúng cặp thì giữa mệnh đề `if` và mệnh đề chính.

## Khái niệm cốt lõi
Câu điều kiện diễn tả mối quan hệ giữa điều kiện và kết quả. Trong TOEIC, bạn không cần đi quá sâu vào lý thuyết; bạn cần nhìn xem điều kiện là thật, có thể xảy ra, hay trái với thực tế.

## Cách nhận diện trong câu
- sự thật / quy luật -> zero conditional
- khả năng có thể xảy ra ở hiện tại hoặc tương lai -> first conditional
- giả định trái với hiện tại -> second conditional
- tiếc nuối / giả định trái với quá khứ -> third conditional
- các từ thay thế `if`: `unless`, `provided that`, `as long as`

## Công thức/mẫu cần nhớ
- Zero: `if + present, present`
- First: `if + present, will + verb`
- Second: `if + past, would + verb`
- Third: `if + had + V3, would have + V3`

## Lỗi thường gặp
- Dùng `will` trong mệnh đề `if` của first conditional.
- Nhầm second và third conditional.
- Không nhận ra `unless` mang nghĩa phủ định của `if`.

## Mẹo làm TOEIC Part 5
Hãy hỏi: điều kiện này là thật, có thể xảy ra, hay trái với thực tế? Trả lời xong câu đó, bạn gần như đã biết cặp thì cần dùng.

## Tóm tắt nhanh
- hiện tại có thể xảy ra -> first conditional
- trái hiện tại -> second conditional
- trái quá khứ -> third conditional
- `unless` = `if ... not`
`.trim(),
examples: [
  {
    english: 'If the shipment arrives today, we will send the invoice tomorrow.',
    vietnamese: 'Điều kiện này còn có thể xảy ra trong hiện tại/tương lai, nên dùng first conditional: present + will.',
  },
  {
    english: 'If I were the supervisor, I would approve the request.',
    vietnamese: 'Đây là giả định trái với hiện tại, nên dùng second conditional với "were" và "would".',
  },
  {
    english: 'If the team had checked the figures earlier, it would have avoided the error.',
    vietnamese: 'Hai hành động đều nhìn lại quá khứ, nên đây là third conditional với "had + V3" và "would have + V3".',
  },
],
// Rewrite explanations so each one names the condition type and the verb-pattern pair that makes the answer correct.
```

- [ ] **Step 5: Run the contract test and confirm all eight lessons pass**

Run: `npx vitest run src/data/__tests__/grammar-content-upgrade.test.ts`

Expected: PASS for `gram-01`..`gram-08`.

- [ ] **Step 6: Commit the last lesson batch**

```bash
git add src/data/__tests__/grammar-content-upgrade.test.ts \
  src/data/grammar/comparatives.ts \
  src/data/grammar/conditionals.ts
git commit -m "feat(grammar): rewrite pattern lessons for beginner clarity" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

### Task 5: Strengthen Regression Coverage and Run Final Verification

**Files:**
- Modify: `src/data/__tests__/task2-data.test.ts`
- Test: `src/data/__tests__/grammar-content-upgrade.test.ts`

- [ ] **Step 1: Expand `task2-data.test.ts` so the baseline test knows about all eight grammar lessons**

```typescript
import { partsOfSpeechLesson } from '../grammar/parts-of-speech'
import { verbTensesLesson } from '../grammar/verb-tenses'
import { passiveVoiceLesson } from '../grammar/passive-voice'
import { conjunctionsLesson } from '../grammar/conjunctions'
import { prepositionsLesson } from '../grammar/prepositions'
import { relativePronounsLesson } from '../grammar/relative-pronouns'
import { comparativesLesson } from '../grammar/comparatives'
import { conditionalsLesson } from '../grammar/conditionals'

const grammarLessons = [
  partsOfSpeechLesson,
  verbTensesLesson,
  passiveVoiceLesson,
  conjunctionsLesson,
  prepositionsLesson,
  relativePronounsLesson,
  comparativesLesson,
  conditionalsLesson,
]

it('provides 8 grammar lessons with 5 exercises each', () => {
  expect(grammarLessons).toHaveLength(8)
  expect(grammarLessons.map((lesson) => lesson.id)).toEqual([
    'gram-01',
    'gram-02',
    'gram-03',
    'gram-04',
    'gram-05',
    'gram-06',
    'gram-07',
    'gram-08',
  ])

  for (const lesson of grammarLessons) {
    expect(lesson.exercises).toHaveLength(5)
  }
})
```

- [ ] **Step 2: Run the targeted grammar data tests**

Run: `npx vitest run src/data/__tests__/grammar-content-upgrade.test.ts src/data/__tests__/task2-data.test.ts`

Expected: PASS

- [ ] **Step 3: Run the full repository test suite**

Run: `npm test`

Expected: PASS with the existing Vitest suite plus the new grammar content coverage.

- [ ] **Step 4: Run the production build**

Run: `npm run build`

Expected: PASS with the normal Vite bundle output and no TypeScript errors.

- [ ] **Step 5: Commit the regression coverage and final verification state**

```bash
git add src/data/__tests__/task2-data.test.ts
git commit -m "test(grammar): strengthen grammar lesson regression coverage" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Self-Review Checklist

- **Spec coverage:** Tasks 2-4 implement the approved template rewrite across all 8 lessons; Task 1 and Task 5 cover the validation requirements and regression safety from the spec.
- **Placeholder scan:** No task uses placeholder language or vague deferred-work instructions; every code-changing step names the exact files and shows the code shape to add.
- **Type consistency:** All tasks preserve the existing `GrammarLesson` contract (`content`, `examples`, `exercises`) and keep `correctAnswer` zero-based.
