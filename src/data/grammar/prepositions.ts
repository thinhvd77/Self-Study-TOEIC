import { GrammarLesson } from '../../types'

export const prepositionsLesson: GrammarLesson = {
  id: 'gram-05',
  title: 'Giới từ (Prepositions)',
  order: 5,
  content: `
## Giới từ (Prepositions)

Giới từ là từ chỉ mối quan hệ giữa các thành phần trong câu về **thời gian**, **nơi chốn**, hoặc **hướng đi**. Trong TOEIC Part 5/6, giới từ xuất hiện rất thường xuyên — đặc biệt trong các cụm từ cố định.

---

### 1. Giới từ chỉ thời gian

| Giới từ | Cách dùng | Ví dụ |
|---------|-----------|-------|
| **at** | Thời điểm cụ thể | at 9 a.m., at noon, at midnight |
| **on** | Ngày / thứ / ngày cụ thể | on Monday, on June 5th |
| **in** | Tháng / năm / khoảng thời gian | in March, in 2024, in the morning |
| **by** | Trước thời hạn (deadline) | by Friday, by the end of the month |
| **until** | Tiếp diễn đến thời điểm | until 5 p.m., until further notice |
| **during** | Trong suốt khoảng thời gian | during the meeting, during summer |
| **within** | Trong vòng (khoảng thời gian) | within 3 days, within a week |
| **for** | Khoảng thời gian kéo dài | for two hours, for a year |
| **since** | Từ thời điểm (dùng với thì hiện tại hoàn thành) | since 2020, since last week |

---

### 2. Giới từ chỉ nơi chốn

| Giới từ | Cách dùng | Ví dụ |
|---------|-----------|-------|
| **at** | Địa điểm cụ thể | at the office, at the airport |
| **in** | Không gian có giới hạn / thành phố / quốc gia | in the room, in Tokyo, in Japan |
| **on** | Trên bề mặt | on the desk, on the wall |
| **above** | Phía trên (không tiếp xúc) | above the table |
| **below** | Phía dưới | below the line |
| **between** | Ở giữa (hai vật) | between the offices |
| **beside / next to** | Ở cạnh | beside the printer |
| **near** | Gần | near the entrance |
| **behind** | Phía sau | behind the counter |

---

### 3. Giới từ chỉ hướng đi

- **to** – hướng đến: *go to the meeting room*
- **from** – xuất phát từ: *a message from the manager*
- **into** – đi vào trong: *walk into the conference room*
- **out of** – ra khỏi: *take out of the box*
- **through** – đi xuyên qua: *pass through customs*
- **along** – dọc theo: *walk along the corridor*
- **toward** – hướng về phía: *move toward the goal*

---

### 4. Cụm giới từ thường gặp trong kinh doanh (TOEIC Part 5/6)

| Cụm từ | Nghĩa |
|--------|-------|
| **responsible for** | chịu trách nhiệm về |
| **interested in** | quan tâm đến |
| **familiar with** | quen thuộc với |
| **committed to** | cam kết với |
| **in charge of** | phụ trách / quản lý |
| **based on** | dựa trên |
| **according to** | theo / căn cứ theo |

---

### Mẹo TOEIC

Học thuộc các **cụm giới từ cố định** (fixed prepositional phrases) — đây là dạng câu hỏi hay gặp nhất trong Part 5/6. Không thể suy luận từ nghĩa, phải nhớ theo cụm:

> *She is **responsible for** managing the budget.* (KHÔNG nói "responsible of")

> *The report is **based on** recent data.* (KHÔNG nói "based in")
  `.trim(),
  examples: [
    {
      english: 'Please submit the report by Friday at 5 p.m.',
      vietnamese: '"by" chỉ deadline (nộp trước thứ Sáu); "at" chỉ thời điểm cụ thể (lúc 5 giờ chiều)',
    },
    {
      english: 'The manager is responsible for overseeing the entire project.',
      vietnamese: '"responsible for" là cụm giới từ cố định = chịu trách nhiệm về (KHÔNG dùng "responsible of")',
    },
    {
      english: 'The new branch is located in Hanoi, on Tran Hung Dao Street.',
      vietnamese: '"in" dùng cho thành phố (Hanoi); "on" dùng cho tên đường (bề mặt/tuyến đường)',
    },
  ],
  exercises: [
    {
      id: 'gram-05-ex01',
      question: 'The sales meeting will be held _______ Monday morning.',
      options: ['in', 'at', 'on', 'by'],
      correctAnswer: 2,
      explanation: '"on" dùng trước ngày trong tuần (Monday). "in" dùng cho tháng/năm, "at" dùng cho thời điểm cụ thể.',
    },
    {
      id: 'gram-05-ex02',
      question: 'Please send your application _______ the end of this week.',
      options: ['until', 'during', 'by', 'since'],
      correctAnswer: 2,
      explanation: '"by" chỉ deadline — hành động phải hoàn thành trước thời điểm đó. "until" chỉ sự tiếp diễn.',
    },
    {
      id: 'gram-05-ex03',
      question: 'Ms. Park has been working at this company _______ 2019.',
      options: ['for', 'during', 'within', 'since'],
      correctAnswer: 3,
      explanation: '"since" + mốc thời gian cụ thể, dùng với thì hiện tại hoàn thành (has been working). "for" + khoảng thời gian.',
    },
    {
      id: 'gram-05-ex04',
      question: 'The new policy is _______ improving employee satisfaction.',
      options: ['committed to', 'familiar with', 'based on', 'interested in'],
      correctAnswer: 0,
      explanation: '"committed to + V-ing" = cam kết thực hiện điều gì. Đây là cụm giới từ cố định thường gặp trong TOEIC.',
    },
    {
      id: 'gram-05-ex05',
      question: 'The assistant put the documents _______ the manager\'s desk before the meeting.',
      options: ['between', 'on', 'into', 'behind'],
      correctAnswer: 1,
      explanation: '"on" chỉ vị trí trên bề mặt (on the desk = trên mặt bàn). "into" chỉ hướng đi vào trong.',
    },
  ],
}
