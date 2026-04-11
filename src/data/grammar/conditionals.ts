import { GrammarLesson } from '../../types'

export const conditionalsLesson: GrammarLesson = {
  id: 'gram-08',
  title: 'Câu điều kiện (Conditional Sentences)',
  order: 8,
  content: `
## Câu điều kiện (Conditional Sentences)

Câu điều kiện diễn tả **mối quan hệ nguyên nhân - kết quả** giữa hai mệnh đề. Trong TOEIC Part 5 và 6, bạn thường gặp dạng câu hỏi yêu cầu chọn đúng thì động từ trong câu điều kiện. Mẹo quan trọng: hãy xác định **loại điều kiện** dựa vào thì của động từ trong cả hai vế.

---

### Loại 0 – Zero Conditional (Sự thật hiển nhiên / Quy luật tự nhiên)

**Cấu trúc:** If + Present Simple, Present Simple

Dùng để diễn tả **sự thật, quy luật khoa học, thói quen** luôn luôn đúng.

- "If water reaches 100°C, it boils." (Nếu nước đạt 100°C, nó sôi.)
- "If employees are late, they receive a warning." (Nếu nhân viên đi trễ, họ bị cảnh cáo.)

> **Lưu ý:** Cả hai vế đều dùng **Present Simple**. Có thể thay "if" bằng "when" mà không đổi nghĩa.

---

### Loại 1 – First Conditional (Điều kiện có thể xảy ra ở tương lai)

**Cấu trúc:** If + Present Simple, will + động từ nguyên mẫu

Dùng để nói về **khả năng thực tế** có thể xảy ra trong tương lai.

- "If we finish early, we will celebrate." (Nếu chúng ta hoàn thành sớm, chúng ta sẽ ăn mừng.)
- "If the client approves the proposal, we will sign the contract." (Nếu khách hàng duyệt đề xuất, chúng ta sẽ ký hợp đồng.)

> **Mẹo TOEIC:** Mệnh đề "if" dùng thì **hiện tại đơn** (KHÔNG dùng "will"), mệnh đề kết quả dùng **will + V**.

---

### Loại 2 – Second Conditional (Điều kiện không có thực ở hiện tại)

**Cấu trúc:** If + Past Simple, would + động từ nguyên mẫu

Dùng để nói về **tình huống giả định, không có thật** ở hiện tại hoặc tương lai.

- "If I were the manager, I would change the policy." (Nếu tôi là giám đốc, tôi sẽ thay đổi chính sách.)
- "If the company had more funding, it would hire new staff." (Nếu công ty có nhiều kinh phí hơn, họ sẽ tuyển thêm nhân viên.)

> **Lưu ý đặc biệt:** Với động từ "to be", luôn dùng **were** cho mọi ngôi (I/he/she/it were), không dùng "was" trong văn viết chuẩn.

---

### Loại 3 – Third Conditional (Điều kiện không có thực trong quá khứ)

**Cấu trúc:** If + Past Perfect, would have + past participle

Dùng để nói về **tình huống không xảy ra trong quá khứ** và kết quả giả định của nó.

- "If she had prepared more, she would have passed the interview." (Nếu cô ấy chuẩn bị kỹ hơn, cô ấy đã vượt qua phỏng vấn rồi.)
- "If they had invested earlier, they would have made a profit." (Nếu họ đầu tư sớm hơn, họ đã có lợi nhuận rồi.)

---

### Unless = If...not

**Unless** có nghĩa là "nếu không" (= if...not). Cấu trúc theo cùng loại điều kiện.

- "Unless you confirm by Friday, we will cancel the order." = "If you do not confirm by Friday, we will cancel the order."
- "Unless the report is submitted, the project will be delayed."

---

### ⚠️ Mẹo TOEIC quan trọng

Để xác định loại câu điều kiện trong bài thi, hãy **nhìn vào thì của cả hai vế**:

| Loại | Mệnh đề IF | Mệnh đề kết quả |
|------|-----------|----------------|
| Zero | Present Simple | Present Simple |
| First | Present Simple | will + V |
| Second | Past Simple | would + V |
| Third | Past Perfect | would have + V3 |

Khi gặp chỗ trống, hãy xác định loại điều kiện từ vế còn lại, rồi chọn đúng thì cho vế chứa chỗ trống.
  `.trim(),
  examples: [
    {
      english: 'If the manager _______ (approve) the budget, we will start the project next week.',
      vietnamese: 'Mệnh đề kết quả dùng "will start" → đây là First Conditional. Mệnh đề "if" phải dùng Present Simple: **approves**. (Nếu giám đốc phê duyệt ngân sách, chúng ta sẽ bắt đầu dự án vào tuần tới.)',
    },
    {
      english: 'If I _______ (be) the CEO, I would restructure the entire department.',
      vietnamese: 'Mệnh đề kết quả dùng "would restructure" → đây là Second Conditional (giả định không có thực ở hiện tại). Mệnh đề "if" dùng Past Simple, và với "to be" luôn dùng **were**: **were**. (Nếu tôi là CEO, tôi sẽ tái cơ cấu toàn bộ phòng ban.)',
    },
    {
      english: 'If the team had communicated better, they _______ (avoid) the costly mistake.',
      vietnamese: 'Mệnh đề "if" dùng "had communicated" (Past Perfect) → đây là Third Conditional (không có thực trong quá khứ). Mệnh đề kết quả phải dùng: **would have avoided**. (Nếu nhóm đã giao tiếp tốt hơn, họ đã tránh được sai lầm tốn kém đó.)',
    },
  ],
  exercises: [
    {
      id: 'gram-08-ex01',
      question: 'If you heat ice, it _______ into water.',
      options: ['melts', 'will melt', 'would melt', 'would have melted'],
      correctAnswer: 0,
      explanation: 'Đây là Zero Conditional – sự thật khoa học luôn đúng. Cả hai vế đều dùng Present Simple: **melts**. (Nếu bạn làm nóng nước đá, nó tan thành nước.)',
    },
    {
      id: 'gram-08-ex02',
      question: 'If the client _______ by noon, we will start the meeting without them.',
      options: ['will not arrive', 'did not arrive', 'does not arrive', 'had not arrived'],
      correctAnswer: 2,
      explanation: 'Mệnh đề kết quả dùng "will start" → First Conditional. Mệnh đề "if" phải dùng Present Simple (phủ định): **does not arrive**. (Nếu khách hàng không đến vào buổi trưa, chúng ta sẽ bắt đầu cuộc họp mà không có họ.)',
    },
    {
      id: 'gram-08-ex03',
      question: 'If our company _______ more resources, we would expand to new markets.',
      options: ['has', 'will have', 'had', 'had had'],
      correctAnswer: 2,
      explanation: 'Mệnh đề kết quả dùng "would expand" → Second Conditional (giả định không có thực ở hiện tại). Mệnh đề "if" phải dùng Past Simple: **had**. (Nếu công ty chúng tôi có thêm nguồn lực, chúng tôi sẽ mở rộng sang thị trường mới.)',
    },
    {
      id: 'gram-08-ex04',
      question: 'If the team had submitted the proposal on time, they _______ the contract.',
      options: ['win', 'will win', 'would win', 'would have won'],
      correctAnswer: 3,
      explanation: 'Mệnh đề "if" dùng "had submitted" (Past Perfect) → Third Conditional (quá khứ không có thực). Mệnh đề kết quả phải dùng would have + V3: **would have won**. (Nếu nhóm đã nộp đề xuất đúng hạn, họ đã giành được hợp đồng đó rồi.)',
    },
    {
      id: 'gram-08-ex05',
      question: '_______ you practice regularly, your TOEIC score will improve significantly.',
      options: ['If', 'Unless', 'Although', 'Whether'],
      correctAnswer: 0,
      explanation: 'Câu này diễn tả điều kiện có thể xảy ra (First Conditional): nếu luyện tập thường xuyên thì điểm sẽ tăng. Dùng **If** để bắt đầu mệnh đề điều kiện. "Unless" sẽ có nghĩa ngược lại (= if you do not practice). (Nếu bạn luyện tập thường xuyên, điểm TOEIC của bạn sẽ cải thiện đáng kể.)',
    },
    {
      id: 'gram-08-ex06',
      question: 'If the system _______ properly maintained, we would have fewer technical problems.',
      options: ['is', 'was', 'were', 'has been'],
      correctAnswer: 2,
      explanation: 'Mệnh đề "kết quả" dùng "would have" → Second Conditional (giả định không có thực ở hiện tại). Mệnh đề "if" phải dùng Past Simple (were): **were**. Lưu ý: với "be" trong Second Conditional luôn dùng "were" (cả I, he, she, it).',
    },
    {
      id: 'gram-08-ex07',
      question: 'Unless the manager _______ the proposal by Friday, the project will be delayed.',
      options: ['approves', 'approved', 'will approve', 'has approved'],
      correctAnswer: 0,
      explanation: '"Unless" + First Conditional → dùng Present Simple (approves). "Unless the manager approves" = "If the manager does not approve". Không dùng will/approved.',
    },
    {
      id: 'gram-08-ex08',
      question: 'If we _______ acquired better equipment, we could produce more units per day.',
      options: ['had', 'have', 'would have', 'has'],
      correctAnswer: 0,
      explanation: 'Mệnh đề "kết quả" dùng "could produce" (viễn thời) → Second Conditional. Mệnh đề "if" dùng Past Simple: **had**. (Nếu chúng tôi có thiết bị tốt hơn, chúng tôi có thể sản xuất nhiều đơn vị hơn mỗi ngày.)',
    },
    {
      id: 'gram-08-ex09',
      question: 'Had the software _______ compatible with all devices, we would have sold more licenses.',
      options: ['been', 'is', 'was', 'be'],
      correctAnswer: 0,
      explanation: 'Cấu trúc ngược (inverted) của Third Conditional: "Had the software been" = "If the software had been". Cần past participle "been" sau "had". (Nếu phần mềm tương thích với tất cả các thiết bị, chúng tôi đã bán được nhiều giấy phép hơn.)',
    },
    {
      id: 'gram-08-ex10',
      question: 'If the company _______ invested more in R&D, it would be a market leader by now.',
      options: ['had', 'has', 'would have', 'have'],
      correctAnswer: 0,
      explanation: 'Mixed Conditional: tình huống quá khứ "had invested" với kết quả hiện tại "would be" (bây giờ vẫn còn ảnh hưởng). Dùng Past Perfect trong mệnh đề "if": **had invested**. (Nếu công ty đã đầu tư nhiều hơn vào R&D, nó sẽ là một lãnh đạo thị trường vào bây giờ.)',
    },
  ],
}
