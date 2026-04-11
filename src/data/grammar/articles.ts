import { GrammarLesson } from '../../types'

export const articlesLesson: GrammarLesson = {
  id: 'gram-09',
  title: 'Mạo từ (Articles: a, an, the)',
  order: 9,
  content: `
## Mạo từ trong TOEIC (Articles: a, an, the)

Mạo từ là một trong những chủ đề phổ biến nhất trong TOEIC Part 5. Quy tắc dường như đơn giản, nhưng các tình huống thực tế lại rất tế nhị. Hãy nắm vững ba loại mạo từ: **a**, **an**, và **the** (hay không dùng mạo từ nào cả).

### 1) Indefinite Articles: a / an

Dùng "a" hay "an" khi bạn nói về một thứ bất định hoặc lần đầu tiên nhắc đến.

**Khi nào dùng a / an:**
- Danh từ đếm được, số ít, lần đầu tiên nhắc đến: "We need a new employee"
- Chỉ một thành viên của một nhóm: "She is a consultant"
- Trước nghề nghiệp, chức vụ: "He became an accountant"
- Trong các cụm từ thông dụng: "an hour", "a question", "a few days"

**Quy tắc a vs an:**
- "a" trước phụ âm: "a company", "a budget"
- "an" trước nguyên âm: "an employee", "an office", "an invoice"
- Lưu ý: dùng theo âm thanh, không phải chữ cái. "a university" (âm /juː/) nhưng "an honor" (âm /ˈɑnər/)

### 2) Definite Article: the

Dùng "the" khi bạn nói về một thứ cụ thể, đã được xác định hoặc duy nhất.

**Khi nào dùng the:**
- Danh từ được xác định (thường lần thứ hai trở đi): "We hired an employee. **The** employee is very talented"
- Danh từ duy nhất hoặc nổi tiếng: "the CEO", "the President", "the sun"
- Các tổ chức, công ty: "**the** Google", "**the** World Health Organization"
- Danh từ số nhiều khi chỉ một nhóm cụ thể: "**the** documents" (các tài liệu cụ thể), "**the** employees" (những nhân viên cụ thể)
- Trước tính từ sở hữu chỉ thế hệ: "the 1990s", "the middle east"
- Trước tên riêng của dãy mountain, sông, đại dương: "**the** Alps", "**the** Amazon", "**the** Pacific Ocean"

### 3) Không dùng mạo từ (Zero Article)

Đây là trường hợp khó nhất vì không có từ ngữ gợi ý.

**Khi nào không dùng mạo từ:**
- Danh từ không đếm được (uncountable): "information", "equipment", "furniture", "advice" → không dùng "a/an" hay "the"
  - Ví dụ: "We need more equipment" (không "an equipment")
- Danh từ số nhiều nói chung (generic): "Employees work hard" (nói chung về nhân viên)
- Trước tên riêng người, địa danh: "John works at Microsoft" (không "the John", "the Microsoft")
- Trước chức vụ khi nói chung: "He is director of sales" (hoặc "**a** director of sales") nhưng "**the** director of sales" chỉ người cụ thể
- Trước tên bộ phận công ty: "We contacted **Sales** department" (hoặc "**the** Sales department" nếu đã xác định)

### 4) Các bẫy thường gặp trong TOEIC

**Business vs General usage:**
- "**a** report" (bất kỳ báo cáo nào) vs "**the** report" (báo cáo cụ thể đã nhắc)
- "We need **a** consultant" (chưa biết ai) vs "**The** consultant arrived yesterday" (người đã được thuê)

**Danh từ không đếm được thường quên:**
- money, information, equipment, furniture, luggage, baggage, advice, progress, traffic, homework, research, work
- Sai: "a information", "the equipments"
- Đúng: "information", "equipment"

**Tên công ty và tổ chức:**
- Một số tổ chức có "the": "**the** United Nations", "**the** European Union"
- Nhưng công ty riêng thường không: "Google", "Microsoft" (không "the")

**Trước danh từ sau "most":**
- "**the** most difficult task" (so sánh nhất)
- "Most employees..." (đa số, không dùng "the")

### Quy tắc nhanh để áp dụng trong Part 5

1. Nếu danh từ là **lần đầu tiên** xuất hiện → "a / an"
2. Nếu danh từ **được xác định rõ** (lần 2 trở đi, hoặc duy nhất) → "the"
3. Nếu danh từ là **uncountable hoặc plural generic** → không dùng mạo từ
4. Nếu là **tên riêng** (người, công ty, địa danh) → thường không dùng mạo từ
5. Nếu không chắc chắn → hỏi: "Cái này cụ thể hay không xác định?" → rõ ràng → "the", không rõ ràng → "a/an"

### Lưu ý về ngữ cảnh công sở TOEIC

Trong các tài liệu công vụ:
- "Please send **the** report to **the** manager" (cụ thể)
- "We received **a** complaint from **a** customer" (bất định)
- "**The** Human Resources department" (xác định) vs "working in **a** department" (bất định)
  `.trim(),
  examples: [
    {
      english: 'We need _______ experienced consultant to handle the project.',
      vietnamese: 'Lần đầu nhắc đến một nhà tư vấn → "a" hoặc "an"; "experienced" bắt đầu với âm /ɪ/ (nguyên âm) nên dùng "an experienced consultant". Lưu ý: lựa chọn mạo từ theo âm thanh, không phải chữ cái đầu tiên.',
    },
    {
      english: 'The _______ equipment in the warehouse needs to be replaced.',
      vietnamese: '"Equipment" là danh từ không đếm được → không dùng "a/an", chỉ dùng "the" nếu xác định cụ thể → "The equipment" (đó là danh từ không đếm được)',
    },
    {
      english: '_______ Amazon River is the longest river in South America.',
      vietnamese: 'Tên riêng của sông → dùng "the" trước tên sông → "The Amazon River"',
    },
  ],
  exercises: [
    {
      id: 'gram-09-ex01',
      question: 'We need _______ new account manager to work with our largest client.',
      options: ['a', 'an', 'the', '—'],
      correctAnswer: 0,
      explanation: 'Lần đầu tiên nhắc đến một vị trí quản lý tài khoản → "a". "New" bắt đầu với phụ âm /n/ → dùng "a new account manager".',
    },
    {
      id: 'gram-09-ex02',
      question: 'The company relies heavily on _______ technology and _______ innovation.',
      options: ['a / an', 'the / the', '— / —', 'an / a'],
      correctAnswer: 2,
      explanation: '"Technology" và "innovation" là những danh từ không đếm được (uncountable) được nói một cách chung (generic) → không dùng mạo từ: "technology and innovation".',
    },
    {
      id: 'gram-09-ex03',
      question: 'Please forward _______ attached documents to _______ accounting department.',
      options: ['a / the', 'the / —', 'the / the', '— / the'],
      correctAnswer: 2,
      explanation: '"The attached documents" (tài liệu cụ thể được nêu ra) + "the accounting department" (bộ phận xác định của công ty) → cả hai cùng dùng "the".',
    },
    {
      id: 'gram-09-ex04',
      question: 'Mr. Johnson is _______ Vice President of Sales and has been with _______ company for ten years.',
      options: ['a / the', 'the / the', '— / the', '— / —'],
      correctAnswer: 2,
      explanation: '"Vice President of Sales" là chức vụ chỉ định (duy nhất) → không dùng mạo từ; "the company" (công ty cụ thể nơi anh ta làm việc) → dùng "the".',
    },
    {
      id: 'gram-09-ex05',
      question: 'We cannot proceed without _______ approval from _______ project manager.',
      options: ['the / a', 'a / the', '— / the', 'an / the'],
      correctAnswer: 2,
      explanation: '"Approval" là danh từ không đếm được → không dùng mạo từ; "the project manager" (người quản lý dự án cụ thể) → dùng "the".',
    },
    {
      id: 'gram-09-ex06',
      question: 'She worked as _______ consultant for _______ major tech firm before joining our company.',
      options: ['a / a', 'an / the', 'a / the', 'the / the'],
      correctAnswer: 2,
      explanation: '"A consultant" (một vị tư vấn bất định); "the major tech firm" (công ty công nghệ lớn cụ thể mà cô ấy đã làm việc) → "a / the".',
    },
    {
      id: 'gram-09-ex07',
      question: '_______ training program provided by our HR department covers _______ essential skills needed for career advancement.',
      options: ['The / the', 'A / —', '— / the', 'The / —'],
      correctAnswer: 0,
      explanation: '"The training program" (chương trình đã nhắc/cụ thể); "the essential skills" (các kỹ năng thiết yếu cụ thể) → cả hai dùng "the".',
    },
    {
      id: 'gram-09-ex08',
      question: 'Please provide _______ feedback on _______ proposal we sent yesterday.',
      options: ['— / the', 'a / the', 'the / —', 'an / a'],
      correctAnswer: 0,
      explanation: '"Feedback" là danh từ không đếm được → không dùng mạo từ; "the proposal" (đề xuất cụ thể đã gửi) → dùng "the".',
    },
    {
      id: 'gram-09-ex09',
      question: 'In _______ manufacturing industry, _______ equipment maintenance is critical for productivity.',
      options: ['the / — ', 'a / an', '— / the', 'an / the'],
      correctAnswer: 0,
      explanation: '"In the manufacturing industry" (ngành sản xuất, xác định); "equipment maintenance" (danh từ không đếm được, nói chung) → không dùng mạo từ → "the / —".',
    },
    {
      id: 'gram-09-ex10',
      question: 'The director requested that all staff members submit _______ updated resume and _______ cover letter by Friday.',
      options: ['an / a', 'a / a', 'the / the', '— / —'],
      correctAnswer: 0,
      explanation: '"An updated resume" (một hồ sơ bất định; "updated" bắt đầu với âm /ʌ/ - nguyên âm, nên dùng "an"); "a cover letter" (một lá thư bất định) → "an / a". Nhớ: chọn mạo từ dựa vào âm thanh, không phải chữ cái đầu tiên.',
    },
  ],
}
