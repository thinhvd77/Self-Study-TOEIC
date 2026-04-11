import { GrammarLesson } from '../../types'

export const subjectVerbAgreementLesson: GrammarLesson = {
  id: 'gram-11',
  title: 'Sự hòa hợp chủ ngữ - động từ (Subject-Verb Agreement)',
  order: 11,
  content: `
## Sự hòa hợp chủ ngữ - động từ (Subject-Verb Agreement)

Subject-Verb Agreement (Sự hòa hợp giữa chủ ngữ và động từ) là một quy tắc cơ bản nhưng dễ bị sơ suất. Trong TOEIC Part 5, những câu hỏi về quy tắc này thường được che dấu bằng các mệnh đề phức tạp hay những từ gây nhầm lẫn giữa chủ ngữ thực và chủ ngữ giả.

### 1) Quy tắc cơ bản

**Chủ ngữ số ít → Động từ số ít**
- "The manager **is** very experienced" (không "are")
- "This project **requires** attention" (không "require")

**Chủ ngữ số nhiều → Động từ số nhiều**
- "The employees **are** ready" (không "is")
- "The documents **have** been updated" (không "has")

### 2) Những trường hợp bẫy (Tricky Cases)

**a) Danh từ tập hợp (Collective Nouns):**

Danh từ tập hợp (như: team, group, committee, staff, management, majority, audience) có thể **ở dạng số ít hoặc số nhiều** tùy vào ngữ cảnh:

- **Số ít** (nhóm được coi như một đơn vị): "The team **is** working on the project" (nhóm làm việc như một thể thống nhất)
- **Số nhiều** (các thành viên riêng lẻ): "The team **are** disagreeing on the approach" (các thành viên không đồng ý với nhau)
- Trong TOEIC, thường dùng **số ít**: "The committee **has** made its decision"

**b) Những từ chỉ số lượng:**

Các từ như: all, most, some, none, half có thể số ít hoặc số nhiều tuỳ vào danh từ sau nó:

- "**All** of the report **is** ready" (report = uncountable → động từ số ít)
- "**All** of the employees **are** present" (employees = countable plural → động từ số nhiều)
- "**Some** of the furniture **needs** repair" (furniture = uncountable → số ít)
- "**Some** of the documents **have** been signed" (documents = plural → số nhiều)

**c) Danh từ không đếm được (Uncountable Nouns):**

Danh từ không đếm được luôn ở dạng **số ít**:
- money, information, equipment, furniture, advice, progress, research, data, traffic, baggage, luggage, news
- "The equipment **is** brand new" (không "are")
- "The information **has** been updated" (không "have")
- "The staff **is** very professional" (staff = tập hợp, thường dùng số ít)

**Lưu ý về "data":** "Data" là số nhiều (plural) của "datum", nhưng trong tiếng Anh hiện đại thường được xem như uncountable:
- "The data **is** accurate" (hiện đại, phổ biến hơn)
- "The data **are** accurate" (cổ điển, vẫn chấp nhận được)

**d) Chủ ngữ kép với "and":**

Khi hai chủ ngữ nối với "and" → **động từ số nhiều** (trừ khi chúng tạo thành một khái niệm duy nhất):

- "The manager and the assistant **are** preparing the documents" (hai người khác nhau → số nhiều)
- "The president and CEO **is** announcing the merger" (một người giữ hai chức vụ → số ít)

**e) Chủ ngữ kép với "or" / "nor" / "either...or" / "neither...nor":**

Động từ **phải hòa hợp với chủ ngữ gần nhất** (chủ ngữ sau "or" hoặc "nor"):

- "Either the manager or the employees **are** responsible" (gần nhất là "employees" = số nhiều)
- "Neither the report nor the documents **were** complete" (gần nhất là "documents" = số nhiều)
- "Either you or I **am** mistaken" (gần nhất là "I" = số ít, "am" phù hợp với "I")

**f) Cụm giới từ không ảnh hưởng đến động từ:**

Chủ ngữ thực là từ **trước** cụm giới từ, không phải trong cụm giới từ:

- "The number of employees **is** increasing" (chủ ngữ = "number" (số ít), không phải "employees")
- "A series of meetings **is** scheduled" (chủ ngữ = "series" (số ít))
- "The manager **of** the department **has** approved the plan" (chủ ngữ = "manager", "of the department" là cụm giới từ)

**g) Danh từ xảy ra trước động từ nhưng không phải chủ ngữ:**

- "There **are** three employees in the office" (chủ ngữ thực = "employees" = số nhiều, không phải "there")
- "Here **is** the information you requested" (chủ ngữ = "information" = số ít)

**h) Các đại từ không xác định (Indefinite Pronouns):**

Những đại từ sau luôn **số ít**:
- each, either, neither, someone, everyone, nobody, anybody, nobody, something, everything, nothing
- "**Each** employee **receives** a performance review" (không "receive")
- "**Everyone** in the office **is** waiting for the announcement" (không "are")
- "**Neither** of them **is** available" (không "are")

**Lưu ý**: "None" có thể số ít hoặc số nhiều:
- "None of the report **is** finished" (số ít - một phần của báo cáo)
- "None of the employees **are** ready" (số nhiều - một số trong số họ không sẵn sàng)

### 3) Quy tắc nhanh cho TOEIC Part 5

1. **Xác định chủ ngữ thực** (bỏ qua các cụm giới từ)
2. **Kiểm tra chủ ngữ là số ít hay số nhiều**
3. **Chọn động từ phù hợp**
4. **Nếu chủ ngữ kép**: với "and" → số nhiều; với "or/nor" → phù hợp với chủ ngữ gần nhất

Ví dụ bẫy điển hình:
- "The manager **with** three assistants **handles** the project" (không "handle"; chủ ngữ = "manager" số ít)
- "A variety of products **is** available in the catalog" (chủ ngữ = "variety" số ít, không phải "products")
  `.trim(),
  examples: [
    {
      english: 'The team _______ implementing a new marketing strategy this quarter.',
      vietnamese: '"Team" là danh từ tập hợp; trong TOEIC thường dùng số ít → "is implementing". Lưu ý: bỏ qua cụm "of developers" để tìm chủ ngữ thực.',
    },
    {
      english: 'Each of the applicants _______ to attend the orientation session.',
      vietnamese: '"Each" là đại từ không xác định, luôn số ít → "is required" (bắt buộc tham dự).',
    },
    {
      english: 'Neither the invoice nor the receipts _______ in the file.',
      vietnamese: '"Neither...nor..."; động từ phù hợp với chủ ngữ gần nhất là "receipts" (số nhiều) → "were".',
    },
  ],
  exercises: [
    {
      id: 'gram-11-ex01',
      question: 'The committee _______ reviewing the budget proposal for the next fiscal year.',
      options: ['is', 'are', 'was', 'were'],
      correctAnswer: 0,
      explanation: '"Committee" là danh từ tập hợp; được coi như một đơn vị → số ít → **is reviewing**. Nếu dùng "are" sẽ chỉ các thành viên riêng lẻ (khó xảy ra trong TOEIC).',
    },
    {
      id: 'gram-11-ex02',
      question: 'The manager, along with two consultants, _______ developing a comprehensive action plan.',
      options: ['is', 'are', 'have', 'does'],
      correctAnswer: 0,
      explanation: 'Chủ ngữ thực = "manager" (số ít); "along with two consultants" là cụm giới từ → **is developing**. Cụm "along with" không làm chủ ngữ trở thành số nhiều.',
    },
    {
      id: 'gram-11-ex03',
      question: 'Either the sales team or the marketing department _______ responsible for the client outreach.',
      options: ['is', 'are', 'were', 'has been'],
      correctAnswer: 1,
      explanation: '"Either...or..."; chủ ngữ gần nhất = "marketing department" (số nhiều) → **are responsible**. (Tuy "sales team" là số ít, nhưng "marketing department" đóng vai trò tập hợp, thường được coi là số nhiều.)',
    },
    {
      id: 'gram-11-ex04',
      question: 'The number of applicants for the position _______ increased significantly this year.',
      options: ['has', 'have', 'is', 'are'],
      correctAnswer: 0,
      explanation: 'Chủ ngữ = "number" (số ít); "of applicants" là cụm giới từ → **has increased**. Không dùng "have"; "number of" luôn ở dạng số ít.',
    },
    {
      id: 'gram-11-ex05',
      question: 'All of the equipment _______ been tested and certified before delivery.',
      options: ['has', 'have', 'is', 'are'],
      correctAnswer: 0,
      explanation: '"Equipment" là danh từ không đếm được (số ít) → **has been tested**. "All of the equipment" cần động từ số ít.',
    },
    {
      id: 'gram-11-ex06',
      question: 'Neither the employees nor the manager _______ aware of the policy changes.',
      options: ['was', 'were', 'is', 'has'],
      correctAnswer: 1,
      explanation: '"Neither...nor..."; chủ ngữ gần nhất = "manager" (số ít) nhưng "neither...nor" là cấu trúc kép → **were** (về mặt ngữ pháp hiện đại, "were" thường được dùng cho cấu trúc này, mặc dù "was" cũng có thể theo quy tắc chặt chẽ).',
    },
    {
      id: 'gram-11-ex07',
      question: 'Each of the departments _______ required to submit their quarterly reports by the deadline.',
      options: ['is', 'are', 'has', 'have'],
      correctAnswer: 0,
      explanation: '"Each" là đại từ không xác định → luôn số ít → **is required**. "Each of the departments" = mỗi bộ phận riêng lẻ.',
    },
    {
      id: 'gram-11-ex08',
      question: 'A series of events _______ scheduled for the company anniversary celebration.',
      options: ['is', 'are', 'were', 'have been'],
      correctAnswer: 0,
      explanation: '"Series" là danh từ tập hợp (số ít) → **is scheduled**. Cấu trúc "a series of" luôn được coi là số ít.',
    },
    {
      id: 'gram-11-ex09',
      question: 'The information provided in the documents _______ accurate and up-to-date.',
      options: ['is', 'are', 'have', 'do'],
      correctAnswer: 0,
      explanation: '"Information" là danh từ không đếm được (số ít) → **is accurate**. "In the documents" là cụm giới từ, không làm thay đổi số của chủ ngữ.',
    },
    {
      id: 'gram-11-ex10',
      question: 'Either the HR department or the finance team _______ approve all requests for additional budget.',
      options: ['must', 'must be', 'must have', 'must are'],
      correctAnswer: 0,
      explanation: '"Either...or..."; chủ ngữ gần nhất = "finance team" (số nhiều) → **must approve** (sau "must" dùng động từ nguyên mẫu không "to"). Cụm động từ: "must + base verb".',
    },
  ],
}
