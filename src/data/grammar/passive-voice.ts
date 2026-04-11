import { GrammarLesson } from '../../types'

export const passiveVoiceLesson: GrammarLesson = {
  id: 'gram-03',
  title: 'Câu bị động (Passive Voice)',
  order: 3,
  content: `
## Câu bị động (Passive Voice)

Câu bị động được dùng rất phổ biến trong văn phong kinh doanh và học thuật — chính là ngữ cảnh thường gặp nhất trong TOEIC. Hiểu rõ cấu trúc này giúp bạn giải quyết nhanh nhiều câu hỏi Part 5.

### Cấu trúc cơ bản

**Câu chủ động (Active):** Subject + verb + object
> "The manager approved the proposal." (Người quản lý phê duyệt đề xuất.)

**Câu bị động (Passive):** Subject + **be** + **past participle** (+ by + agent)
> "The proposal **was approved** (by the manager)." (Đề xuất được phê duyệt.)

Quy tắc: tân ngữ của câu chủ động trở thành chủ ngữ của câu bị động. Động từ "be" được chia theo thì, sau đó là **past participle** (quá khứ phân từ).

### Câu bị động ở các thì khác nhau

| Thì | Cấu trúc bị động | Ví dụ |
|-----|-----------------|-------|
| **Present Simple** | am/is/are + pp | "Reports are submitted weekly." |
| **Past Simple** | was/were + pp | "The contract was signed yesterday." |
| **Present Perfect** | have/has been + pp | "The order has been shipped." |
| **Future Simple** | will be + pp | "Employees will be notified soon." |
| **Present Continuous** | am/is/are being + pp | "The system is being updated." |

*(pp = past participle)*

### Khi nào dùng câu bị động?

**1. Không biết hoặc không cần nhắc đến chủ thể hành động**
> "The package was delivered this morning." (Ai giao không quan trọng.)

**2. Văn phong trang trọng, công sở (TOEIC hay dùng!)**
> "All staff are required to attend the meeting."

**3. Muốn nhấn mạnh đối tượng chịu tác động, không phải người làm**
> "The budget has been reduced by 20%." (Nhấn mạnh vào ngân sách, không phải ai cắt.)

### Cụm "by + agent" (tác nhân)

Cụm **by + agent** là tùy chọn — chỉ thêm khi thông tin về chủ thể quan trọng:
> "The report was written **by the finance team**."

Nếu chủ thể là "someone", "people", "they" chung chung → bỏ cụm by:
> "The results will be announced tomorrow." (không cần "by someone")

### Meo TOEIC: nhận biết câu bị động nhanh

Trong TOEIC Part 5, khi bạn thấy các đáp án có dạng **be + past participle**, đó là tín hiệu của câu bị động:
- Nhìn vào chủ ngữ: có phải là vật/người chịu tác động không?
- Nhìn vào thì của câu: chọn dạng "be" đúng thì (is/was/has been/will be...)
- Chú ý phân biệt: **"is done"** (bị động) vs **"has done"** (chủ động, hiện tại hoàn thành)

Ví dụ bẫy hay gặp:
- "The meeting **was held**" ✓ (bị động, past simple)
- "The meeting **held**" ✗ (thiếu "be", sai cấu trúc)
  `.trim(),
  examples: [
    {
      english: 'All invoices must _______ before the end of the fiscal year.',
      vietnamese: 'Chủ ngữ "invoices" là vật chịu tác động (bị xử lý). Cần câu bị động với modal verb: **be processed**. Cấu trúc: modal + be + past participle.',
    },
    {
      english: 'The new policy _______ to all employees last Friday.',
      vietnamese: '"Last Friday" chỉ thời điểm cụ thể trong quá khứ. Chủ ngữ "policy" chịu hành động thông báo → Past Simple bị động: **was announced**.',
    },
    {
      english: 'Several improvements _______ to the software since the last update.',
      vietnamese: '"Since the last update" chỉ khoảng thời gian từ quá khứ đến hiện tại → Present Perfect bị động: **have been made**. Cấu trúc: have/has been + past participle.',
    },
  ],
  exercises: [
    {
      id: 'gram-03-ex01',
      question: 'The annual report _______ by the accounting department every December.',
      options: ['prepares', 'is prepared', 'has prepared', 'preparing'],
      correctAnswer: 1,
      explanation: 'Chủ ngữ "annual report" là vật được chuẩn bị (chịu tác động). Thói quen hàng năm (every December) → Present Simple bị động: **is prepared**. Cấu trúc: is/am/are + past participle.',
    },
    {
      id: 'gram-03-ex02',
      question: 'The new branch office _______ in Singapore last year.',
      options: ['opened', 'was opened', 'has been opened', 'is opening'],
      correctAnswer: 1,
      explanation: '"Last year" chỉ thời điểm xác định trong quá khứ. Chủ ngữ "branch office" chịu hành động khai trương → Past Simple bị động: **was opened**. Cấu trúc: was/were + past participle.',
    },
    {
      id: 'gram-03-ex03',
      question: 'The project deadline _______ until the end of next month.',
      options: ['extended', 'will extend', 'will be extended', 'has extended'],
      correctAnswer: 2,
      explanation: 'Hành động xảy ra trong tương lai ("next month"). Chủ ngữ "deadline" chịu tác động (được gia hạn) → Future Simple bị động: **will be extended**. Cấu trúc: will be + past participle.',
    },
    {
      id: 'gram-03-ex04',
      question: 'All expenses _______ by the finance team before reimbursement.',
      options: ['must review', 'must be reviewing', 'must be reviewed', 'must have reviewed'],
      correctAnswer: 2,
      explanation: 'Chủ ngữ "expenses" là vật chịu sự xem xét. Câu có modal verb "must" → bị động với modal: **must be reviewed**. Cấu trúc: modal + be + past participle.',
    },
    {
      id: 'gram-03-ex05',
      question: 'Three new products _______ since the company changed its strategy.',
      options: ['launched', 'were launched', 'have been launched', 'are launching'],
      correctAnswer: 2,
      explanation: '"Since the company changed" chỉ khoảng thời gian từ quá khứ đến hiện tại. Chủ ngữ "products" chịu hành động tung ra thị trường → Present Perfect bị động: **have been launched**. Cấu trúc: have/has been + past participle.',
    },
    {
      id: 'gram-03-ex06',
      question: 'The office supplies _______ by the new vendor next week.',
      options: ['will deliver', 'will be delivered', 'are delivered', 'have been delivered'],
      correctAnswer: 1,
      explanation: '"Next week" (tương lai) và chủ ngữ "supplies" chịu hành động giao hàng → Future bị động: **will be delivered**. Cấu trúc: will + be + past participle.',
    },
    {
      id: 'gram-03-ex07',
      question: 'The customer complaint _______ to the appropriate department yesterday.',
      options: ['forwarded', 'was forwarded', 'has been forwarded', 'is forwarding'],
      correctAnswer: 1,
      explanation: '"Yesterday" (quá khứ xác định) và chủ ngữ "complaint" chịu hành động chuyển tiếp → Past Simple bị động: **was forwarded**. Cấu trúc: was/were + past participle.',
    },
    {
      id: 'gram-03-ex08',
      question: 'The proposal _______ by all stakeholders before the deadline.',
      options: ['must approve', 'must be approved', 'should approving', 'must have approved'],
      correctAnswer: 1,
      explanation: 'Chủ ngữ "proposal" chịu sự phê duyệt từ stakeholders. "Must" + bị động → **must be approved**. Cấu trúc: modal + be + past participle.',
    },
    {
      id: 'gram-03-ex09',
      question: 'The report _______ while the manager was in the meeting.',
      options: ['was being prepared', 'has been prepared', 'would be prepared', 'will prepare'],
      correctAnswer: 0,
      explanation: '"While the manager was in the meeting" (quá khứ) → hành động đang xảy ra tại lúc đó → Past Continuous bị động: **was being prepared**. Cấu trúc: was/were + being + past participle.',
    },
    {
      id: 'gram-03-ex10',
      question: 'The contract _______ for three months before both parties finally agreed.',
      options: ['has been negotiated', 'was being negotiated', 'had been negotiated', 'would be negotiated'],
      correctAnswer: 2,
      explanation: '"For three months" và "before both parties finally agreed" (quá khứ) → hành động hoàn thành trước quá khứ → Past Perfect bị động: **had been negotiated**. Cấu trúc: had + been + past participle.',
    },
  ],
}
