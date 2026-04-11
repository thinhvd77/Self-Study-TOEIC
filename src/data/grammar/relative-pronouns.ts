import { GrammarLesson } from '../../types'

export const relativePronounsLesson: GrammarLesson = {
  id: 'gram-06',
  title: 'Đại từ quan hệ (Relative Pronouns)',
  order: 6,
  content: `
## Đại từ quan hệ (Relative Pronouns)

**Đại từ quan hệ** (Relative Pronouns) được dùng để nối hai mệnh đề, trong đó mệnh đề phụ bổ sung thông tin cho danh từ (antecedent) trong mệnh đề chính.

### Các đại từ quan hệ phổ biến

**1. WHO — chỉ người (làm chủ ngữ)**

Dùng khi danh từ đứng trước là **người**, và đại từ quan hệ đóng vai trò **chủ ngữ** của mệnh đề phụ.
- "The manager **who** signed the contract is on vacation." (manager = người, who = chủ ngữ của "signed")

**2. WHOM — chỉ người (làm tân ngữ)**

Dùng khi danh từ đứng trước là **người**, và đại từ quan hệ đóng vai trò **tân ngữ** của mệnh đề phụ.
- "The candidate **whom** we interviewed is highly qualified." (candidate = người, whom = tân ngữ của "interviewed")
- Mẹo: Nếu thay thế được bằng "him/her" → dùng **whom**; nếu thay bằng "he/she" → dùng **who**

**3. WHICH — chỉ vật, động vật**

Dùng khi danh từ đứng trước là **vật** hoặc **động vật**.
- "The report **which** was submitted yesterday needs revision." (report = vật)
- "The software **which** we developed won an award." (software = vật)

**4. THAT — thay thế who/which (mệnh đề xác định)**

**That** có thể thay thế cho **who** hoặc **which** trong **mệnh đề quan hệ xác định** (defining relative clause), tức là mệnh đề không có dấu phẩy.
- "The employee **that** received the bonus was very happy." (= who)
- "The proposal **that** she submitted was approved." (= which)
- Lưu ý: **Không dùng "that"** trong mệnh đề quan hệ không xác định (có dấu phẩy)

**5. WHOSE — chỉ sở hữu (người và vật)**

Dùng để chỉ **sở hữu**, thay thế cho his/her/its/their. Có thể dùng cho cả người lẫn vật.
- "The employee **whose** performance was excellent got promoted." (chỉ người)
- "The company **whose** products are popular is expanding." (chỉ công ty/vật)

**6. WHERE — chỉ nơi chốn**

Dùng khi danh từ đứng trước là **địa điểm, nơi chốn**.
- "The office **where** I work is downtown." (office = địa điểm)
- "The city **where** the conference was held is Paris." (city = địa điểm)

**7. WHEN — chỉ thời gian**

Dùng khi danh từ đứng trước là **thời gian** (day, year, time, moment...).
- "I remember the day **when** we signed the deal." (day = thời gian)
- "There are times **when** patience is the best strategy." (times = thời gian)

### Mệnh đề xác định vs. không xác định

**Mệnh đề xác định (Defining):** Không có dấu phẩy — thông tin là cần thiết để xác định danh từ.
- "The employee **who** works overtime will be rewarded."

**Mệnh đề không xác định (Non-defining):** Có dấu phẩy — thông tin chỉ bổ sung, có thể bỏ qua.
- "Mr. Kim, **who** is the CEO, will attend the meeting."
- Lưu ý: Trong mệnh đề không xác định, **không dùng "that"**; chỉ dùng who/whom/which/whose.

### Mẹo TOEIC quan trọng

Khi gặp câu hỏi về đại từ quan hệ trong TOEIC Part 5, hãy làm theo 3 bước:
1. **Xác định antecedent** (danh từ đứng trước): người, vật, địa điểm hay thời gian?
2. **Xác định vai trò** trong mệnh đề phụ: chủ ngữ, tân ngữ hay sở hữu?
3. **Kiểm tra dấu phẩy**: có dấu phẩy → không dùng "that"

| Antecedent | Chủ ngữ | Tân ngữ | Sở hữu |
|-----------|---------|---------|--------|
| Người | who / that | whom / that | whose |
| Vật | which / that | which / that | whose |
| Nơi chốn | where | — | — |
| Thời gian | when | — | — |
  `.trim(),
  examples: [
    {
      english: 'The supervisor _______ manages our team is very experienced.',
      vietnamese: 'Antecedent là "supervisor" (người), vị trí trống đóng vai trò chủ ngữ của "manages" → dùng **who** (hoặc that). Đáp án: **who**',
    },
    {
      english: 'This is the department _______ new budget was approved last week.',
      vietnamese: 'Antecedent là "department" (vật), và mệnh đề phụ bổ sung thông tin sở hữu (budget của department) → dùng **whose**. Đáp án: **whose**',
    },
    {
      english: 'The city _______ our headquarters is located attracts many tourists.',
      vietnamese: 'Antecedent là "city" (địa điểm/nơi chốn) → dùng **where**. Không dùng "which" vì sau trống không có danh từ làm tân ngữ hay chủ ngữ cho mệnh đề. Đáp án: **where**',
    },
  ],
  exercises: [
    {
      id: 'gram-06-ex01',
      question: 'The employee _______ submitted the report made an error.',
      options: ['whom', 'which', 'who', 'whose'],
      correctAnswer: 2,
      explanation: 'Antecedent là "employee" (người). Vị trí trống đóng vai trò **chủ ngữ** của động từ "submitted" → dùng **who**. "Whom" là tân ngữ (sai vì đây là chủ ngữ), "which" chỉ vật (sai), "whose" chỉ sở hữu (sai).',
    },
    {
      id: 'gram-06-ex02',
      question: 'The software _______ we installed yesterday is not working properly.',
      options: ['who', 'whose', 'whom', 'which'],
      correctAnswer: 3,
      explanation: 'Antecedent là "software" (vật) → dùng **which**. Vị trí trống đóng vai trò tân ngữ của "installed" (we installed [it]). "Who/whom" chỉ người (sai), "whose" chỉ sở hữu (sai).',
    },
    {
      id: 'gram-06-ex03',
      question: 'The manager _______ team won the award was very proud.',
      options: ['who', 'which', 'whose', 'whom'],
      correctAnswer: 2,
      explanation: 'Antecedent là "manager" (người). Mệnh đề phụ cần chỉ **sở hữu** ("team của manager") → dùng **whose**. "Whose team" = "his/her team". "Who/whom" không chỉ sở hữu (sai), "which" chỉ vật (sai).',
    },
    {
      id: 'gram-06-ex04',
      question: 'The conference room _______ we hold our meetings needs renovation.',
      options: ['when', 'who', 'which', 'where'],
      correctAnswer: 3,
      explanation: 'Antecedent là "conference room" (địa điểm/nơi chốn) → dùng **where**. "Where" = "in which" (nơi mà chúng ta tổ chức các cuộc họp). "When" chỉ thời gian (sai), "who" chỉ người (sai), "which" có thể dùng nhưng khi đó phải có giới từ: "in which" (không phải "which" đơn thuần ở đây).',
    },
    {
      id: 'gram-06-ex05',
      question: 'I still remember the year _______ our company was founded.',
      options: ['where', 'which', 'whose', 'when'],
      correctAnswer: 3,
      explanation: 'Antecedent là "year" (thời gian) → dùng **when**. "When" thay thế cho "in which" khi nói về thời gian. "Where" chỉ nơi chốn (sai), "which" cần giới từ "in which" mới đúng cú pháp, "whose" chỉ sở hữu (sai).',
    },
    {
      id: 'gram-06-ex06',
      question: 'The consultant _______ the company hired last month has already delivered significant results.',
      options: ['who', 'whom', 'whose', 'which'],
      correctAnswer: 1,
      explanation: 'Antecedent là "consultant" (người); trong mệnh đề quan hệ, "consultant" đóng vai trò tân ngữ (the company hired the consultant) → dùng **whom** (objective case). "Who" là chủ ngữ (sai), "whose" chỉ sở hữu, "which" dùng cho vật.',
    },
    {
      id: 'gram-06-ex07',
      question: 'The manager _______ team includes two new employees is very supportive of fresh ideas.',
      options: ['who', 'whose', 'whom', 'which'],
      correctAnswer: 1,
      explanation: '"Manager" + "manager\'s team" → dùng **whose** (sở hữu). "Whose team" = team của manager. "Who" là chủ ngữ (sai), "whom" là tân ngữ (sai), "which" dùng cho vật.',
    },
    {
      id: 'gram-06-ex08',
      question: 'The policy _______ was recently updated applies to all employees without exception.',
      options: ['which', 'where', 'when', 'whose'],
      correctAnswer: 0,
      explanation: 'Antecedent là "policy" (vật); "policy was recently updated" → chủ ngữ không nhất thiết, dùng **which** (relative pronoun cho vật). "Where" chỉ nơi chốn, "when" chỉ thời gian, "whose" chỉ sở hữu.',
    },
    {
      id: 'gram-06-ex09',
      question: 'Those _______ have completed the training program are eligible for promotion.',
      options: ['who', 'whom', 'which', 'whose'],
      correctAnswer: 0,
      explanation: '"Those who have completed" = những người mà đã hoàn thành → dùng **who** (chủ ngữ). "Whom" là tân ngữ (sai), "which" dùng cho vật, "whose" chỉ sở hữu.',
    },
    {
      id: 'gram-06-ex10',
      question: 'The products _______ customers prefer most are usually out of stock during peak seasons.',
      options: ['that', 'which', 'whom', 'where'],
      correctAnswer: 0,
      explanation: '"Products that customers prefer most" = những sản phẩm mà khách hàng thích nhất → dùng **that** (relative pronoun tổng quát, có thể thay cho "which"). Cả "that" và "which" đều có thể dùng được; tuy nhiên "that" thường được ưa thích sau antecedent có superlative (most). "Whom" là tân ngữ cho người (sai), "where" chỉ nơi chốn.',
    },
  ],
}
