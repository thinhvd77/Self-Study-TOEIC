import { GrammarLesson } from '../../types'

export const gerundInfinitivesLesson: GrammarLesson = {
  id: 'gram-10',
  title: 'Động từ-ing vs To + Động từ (Gerunds vs Infinitives)',
  order: 10,
  content: `
## Gerunds vs Infinitives trong TOEIC

Phân biệt giữa gerund (V-ing) và infinitive (to + V) là một chủ đề khó và thường xuyên xuất hiện trong TOEIC Part 5. Quy tắc chính phụ thuộc vào **động từ trước** nó.

### 1) Gerund (V-ing dạng danh từ)

Gerund là dạng V-ing của động từ nhưng đóng vai trò như một danh từ. Nó có thể là chủ ngữ, tân ngữ, hoặc theo sau một giới từ.

**Gerund làm chủ ngữ:**
- "Reading reports is essential" (Đọc báo cáo là điều cần thiết)
- "Managing projects requires experience" (Quản lý dự án cần kinh nghiệm)

**Gerund làm tân ngữ trực tiếp (sau một số động từ):**
- Những động từ này **bắt buộc gerund**: enjoy, avoid, consider, delay, deny, discuss, finish, imagine, keep, mind, miss, practice, quit, risk, suggest, tolerate
- "She enjoys presenting ideas to the team" (Cô ấy thích trình bày ý tưởng cho nhóm)
- "We avoid making hasty decisions" (Chúng tôi tránh đưa ra quyết định vội vàng)
- "The manager denied approving the extra hours" (Người quản lý phủ nhận việc phê duyệt giờ làm thêm)

**Gerund theo sau giới từ:**
- "After finishing the project, we celebrated" (Sau khi hoàn thành dự án, chúng tôi ăn mừng)
- "Instead of sending an email, she called directly" (Thay vì gửi email, cô ấy gọi trực tiếp)
- "They are interested in expanding into new markets" (Họ quan tâm đến việc mở rộng vào các thị trường mới)

### 2) Infinitive (To + Động từ)

Infinitive là dạng nguyên mẫu của động từ (thường có "to" phía trước).

**Infinitive làm tân ngữ (sau một số động từ):**
- Những động từ này **bắt buộc infinitive**: want, need, hope, expect, plan, try, decide, agree, manage, promise, fail, learn, refuse, afford, choose
- "The team wants to complete the task by Friday" (Nhóm muốn hoàn thành công việc vào thứ Sáu)
- "She agreed to take on the new responsibilities" (Cô ấy đồng ý nhận lấy những trách nhiệm mới)
- "We expect to receive the payment next week" (Chúng tôi dự kiến nhận thanh toán tuần tới)

**Infinitive làm chủ ngữ:**
- "To succeed in business requires hard work" (Để thành công trong kinh doanh cần làm việc chăm chỉ)
- "To implement this strategy is crucial" (Thực hiện chiến lược này là rất quan trọng)

**Infinitive sau tính từ hoặc danh từ:**
- "This task is difficult to complete" (Công việc này khó hoàn thành)
- "We have an opportunity to learn new skills" (Chúng ta có cơ hội học những kỹ năng mới)

### 3) Động từ có thể theo sau cả Gerund và Infinitive

Một số động từ có thể được theo sau bởi cả gerund lẫn infinitive, nhưng **có sự thay đổi về nghĩa**:

- **Begin, start, continue:** "Start working / Start to work" (ý nghĩa giống nhau, cả hai đều được dùng)
- **Remember:** "I remember sending the email" (Tôi nhớ đã gửi email) vs "Remember to send the email" (Nhớ gửi email)
- **Stop:** "She stopped working" (Cô ấy dừng làm việc) vs "She stopped to work" (Cô ấy dừng lại để làm việc)
- **Try:** "Try using this method" (Hãy thử sử dụng phương pháp này) vs "Try to solve the problem" (Hãy cố gắng giải quyết vấn đề)
- **Forget:** "He forgot sending the document" (Anh ấy quên đã gửi tài liệu) vs "Don't forget to send it" (Đừng quên gửi nó)
- **Like, love, prefer, hate:** Cả hai cách đều có thể dùng, nhưng trong bối cảnh kinh doanh TOEIC thường dùng infinitive
  - "I like to attend conferences" (Tôi thích tham dự hội nghị)
  - "I like attending conferences" (Tôi thích tham dự hội nghị)

### 4) Các cụm từ đặc biệt

**Help + Verb (không nhất thiết phải có "to"):**
- "Help me organize the meeting" (hoặc "help me to organize")

**Make, let, have (không dùng "to"):**
- "The manager made them redo the analysis" (không phải "made them to redo")
- "Let the team decide" (không phải "let the team to decide")

**Would rather, would prefer (không "to"):**
- "I would rather work on this project than the other one"

### 5) Lưu ý cho TOEIC Part 5

Khi gặp một động từ trong phần chọn lựa và sau nó là một chỗ trống (blank):

1. **Xác định động từ chính** trước blank
2. **Kiểm tra xem động từ đó bắt buộc gerund hay infinitive**
3. **Nếu có giới từ trước blank → luôn dùng gerund** (V-ing)
4. **Nếu không rõ ràng → đọc lại toàn bộ câu để hiểu ngữ cảnh**

Ví dụ TOEIC:
- "The company is interested in **expanding** into new markets" (expanding = gerund sau giới từ "in")
- "The manager wants **to improve** the efficiency" (to improve = infinitive sau động từ "wants")
- "After **completing** the project, the team took a break" (completing = gerund sau giới từ "after")
  `.trim(),
  examples: [
    {
      english: 'The company is committed to _______ customer satisfaction.',
      vietnamese: '"Committed to" là cụm từ giới từ → bắt buộc phải dùng gerund (V-ing) → "improving" (cải thiện)',
    },
    {
      english: 'We expect _______ the contract by the end of the month.',
      vietnamese: '"Expect" là động từ bắt buộc infinitive → "to sign" (ký kết hợp đồng)',
    },
    {
      english: 'Instead of _______ in the meeting, she sent a detailed email.',
      vietnamese: '"Instead of" là cụm giới từ → bắt buộc gerund → "participating" (tham gia)',
    },
  ],
  exercises: [
    {
      id: 'gram-10-ex01',
      question: 'The team suggested _______ the project deadline to accommodate the client\'s request.',
      options: ['extending', 'to extend', 'extend', 'extended'],
      correctAnswer: 0,
      explanation: '"Suggest" là động từ bắt buộc gerund → **extending**. Không dùng "to extend" hay "extend".',
    },
    {
      id: 'gram-10-ex02',
      question: 'The manager will try _______ the budget cuts while maintaining service quality.',
      options: ['minimizing', 'to minimize', 'minimize', 'minimized'],
      correctAnswer: 1,
      explanation: '"Try" + infinitive = cố gắng làm gì → **to minimize**. (Trong ngữ cảnh cố gắng thực hiện một hành động)',
    },
    {
      id: 'gram-10-ex03',
      question: 'Before _______ the report, please review all the data one more time.',
      options: ['submitting', 'to submit', 'submit', 'submits'],
      correctAnswer: 0,
      explanation: '"Before" là giới từ → bắt buộc gerund → **submitting**.',
    },
    {
      id: 'gram-10-ex04',
      question: 'The employees appreciate _______ flexible work arrangements and additional training opportunities.',
      options: ['to have', 'having', 'have', 'had'],
      correctAnswer: 1,
      explanation: '"Appreciate" là động từ bắt buộc gerund → **having**. Không dùng "to have".',
    },
    {
      id: 'gram-10-ex05',
      question: 'We agreed _______ a strategy meeting next week to discuss the quarterly results.',
      options: ['scheduling', 'to schedule', 'schedule', 'scheduled'],
      correctAnswer: 1,
      explanation: '"Agree" là động từ bắt buộc infinitive → **to schedule**.',
    },
    {
      id: 'gram-10-ex06',
      question: 'The consultant recommended _______ the current system rather than replacing it completely.',
      options: ['to upgrade', 'upgrading', 'upgrade', 'upgraded'],
      correctAnswer: 1,
      explanation: '"Recommend" là động từ bắt buộc gerund → **upgrading**.',
    },
    {
      id: 'gram-10-ex07',
      question: 'After _______ the proposal, the board decided _______ for the investment.',
      options: ['reviewing / to proceed', 'to review / proceeding', 'reviewing / proceeding', 'reviewed / to proceed'],
      correctAnswer: 0,
      explanation: '"After" (giới từ) → gerund "reviewing"; "decided to" → infinitive "to proceed".',
    },
    {
      id: 'gram-10-ex08',
      question: 'The company is committed _______ sustainable practices in all its operations.',
      options: ['to adopt', 'adopting', 'to adopting', 'adopt'],
      correctAnswer: 1,
      explanation: '"Committed to" là cụm giới từ → gerund **adopting**. Cấu trúc: "be committed to + V-ing".',
    },
    {
      id: 'gram-10-ex09',
      question: 'The manager failed _______ the importance of the deadline during the initial briefing.',
      options: ['emphasizing', 'to emphasize', 'emphasize', 'emphasized'],
      correctAnswer: 1,
      explanation: '"Fail" là động từ bắt buộc infinitive → **to emphasize** (thất bại trong việc nhấn mạnh).',
    },
    {
      id: 'gram-10-ex10',
      question: 'Instead _______ overtime, the company hired additional staff to distribute the workload.',
      options: ['of working', 'to work', 'working', 'of to work'],
      correctAnswer: 0,
      explanation: '"Instead of" là cụm giới từ → gerund → **of working**. (Thay vì làm việc thêm giờ)',
    },
  ],
}
