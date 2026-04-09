import { GrammarLesson } from '../../types'

export const conjunctionsLesson: GrammarLesson = {
  id: 'gram-04',
  title: 'Liên từ & Từ nối (Conjunctions & Connectors)',
  order: 4,
  content: `
## Liên từ & Từ nối (Conjunctions & Connectors)

Liên từ và từ nối là những từ dùng để kết nối các ý, câu hoặc mệnh đề với nhau. Trong TOEIC Part 5 & 6, bạn cần xác định **mối quan hệ logic** giữa các vế câu để chọn liên từ phù hợp.

### 1. Liên từ kết hợp (Coordinating Conjunctions) — FANBOYS

Dùng để nối hai mệnh đề độc lập (independent clauses) có cùng cấu trúc ngữ pháp:

| Liên từ | Ý nghĩa | Ví dụ |
|---------|---------|-------|
| **For** | vì (lý do) | She stayed late, for she had more work to finish. |
| **And** | và (thêm vào) | The report is clear and concise. |
| **Nor** | cũng không | He didn't call, nor did he email. |
| **But** | nhưng (tương phản) | The price is high, but the quality is excellent. |
| **Or** | hoặc (lựa chọn) | You can pay by cash or credit card. |
| **Yet** | tuy nhiên (tương phản) | It was difficult, yet we succeeded. |
| **So** | vì vậy (kết quả) | We ran out of stock, so we reordered. |

### 2. Liên từ phụ thuộc (Subordinating Conjunctions)

Dùng để nối mệnh đề phụ (dependent clause) với mệnh đề chính (main clause):

- **Because / Since / As** (vì): chỉ nguyên nhân
  - "Because the client cancelled, we rescheduled the meeting."
- **Although / Even though / Though** (mặc dù): chỉ sự tương phản
  - "Although sales dropped, profits remained stable."
- **While / Whereas** (trong khi / trong khi đó): so sánh tương phản hoặc đồng thời
  - "While he handles marketing, she focuses on operations."
- **When / As soon as** (khi / ngay khi): chỉ thời điểm
  - "Please call us when you arrive."
- **If** (nếu): điều kiện
  - "If you have questions, please contact HR."
- **Unless** (trừ khi): điều kiện phủ định
  - "Unless you register early, you may not get a seat."
- **As long as** (miễn là / chừng nào mà): điều kiện liên tục
  - "As long as the budget allows, we will proceed."

### 3. Trạng từ liên kết (Conjunctive Adverbs)

Dùng sau dấu chấm phẩy (;) hoặc đứng đầu câu để nối hai câu độc lập. Thường đi kèm dấu phẩy sau:

- **However** (tuy nhiên): tương phản
- **Therefore / Consequently** (vì vậy): kết quả / hệ quả
- **Moreover / Furthermore / In addition** (hơn nữa): bổ sung
- **Nevertheless / Nonetheless** (dù vậy): tương phản dù có trở ngại
- **For example / For instance** (ví dụ): minh họa

Ví dụ: "Sales were low; **however**, customer satisfaction improved."

### 4. Liên từ tương quan (Correlative Conjunctions)

Luôn dùng theo cặp, hai vế phải có cấu trúc song song (parallel structure):

- **Both...and** (cả...lẫn): "Both the manager and the team agreed."
- **Either...or** (hoặc...hoặc): "Either you confirm today, or we cancel the order."
- **Neither...nor** (không...cũng không): "Neither the price nor the deadline has changed."
- **Not only...but also** (không chỉ...mà còn): "Not only did she finish on time, but she also exceeded targets."

### ⚠️ Mẹo TOEIC quan trọng

Khi gặp câu điền liên từ, hãy tự hỏi: **"Mối quan hệ giữa hai vế là gì?"**

- Đối lập / tương phản → **but, however, although, yet, nevertheless**
- Nguyên nhân – kết quả → **because, since, therefore, consequently, so**
- Bổ sung thêm → **and, moreover, furthermore, in addition**
- Điều kiện → **if, unless, as long as**
- Lựa chọn → **or, either...or, neither...nor**

Lỗi phổ biến: nhầm **although** (mệnh đề phụ) với **however** (trạng từ liên kết). "Although it rained, we continued." ✓ — "However it rained, we continued." ✗
  `.trim(),
  examples: [
    {
      english: 'The company expanded aggressively; _______, profits declined due to rising costs.',
      vietnamese: 'Hai vế có nghĩa tương phản (mở rộng nhưng lợi nhuận lại giảm) và dùng dấu chấm phẩy → cần trạng từ liên kết chỉ sự tương phản: **however**.',
    },
    {
      english: 'Not only did the new policy reduce costs, _______ it also improved employee satisfaction.',
      vietnamese: 'Cặp liên từ tương quan "Not only...": vế sau phải dùng **but also**. Hai vế cần song song về cấu trúc ngữ pháp.',
    },
    {
      english: '_______ the project was completed on time, the client requested several last-minute changes.',
      vietnamese: 'Dự án hoàn thành đúng hạn NHƯNG khách hàng lại yêu cầu thay đổi → quan hệ tương phản, mệnh đề phụ đứng trước → **Although**.',
    },
  ],
  exercises: [
    {
      id: 'gram-04-ex01',
      question: 'The new software is expensive _______ it saves the company significant time and resources.',
      options: ['so', 'but', 'for', 'nor'],
      correctAnswer: 1,
      explanation: 'Hai vế có nghĩa tương phản: đắt tiền ><< tiết kiệm thời gian & tài nguyên → dùng **but** (nhưng). "So" chỉ kết quả, "for" chỉ lý do, "nor" chỉ phủ định thêm — đều không phù hợp.',
    },
    {
      id: 'gram-04-ex02',
      question: '_______ the manager approved the budget, the team began recruiting new staff.',
      options: ['Although', 'Unless', 'As soon as', 'However'],
      correctAnswer: 2,
      explanation: 'Hai hành động có quan hệ thời gian "ngay khi...thì..." → dùng **As soon as** (ngay khi). "Although" chỉ tương phản, "Unless" chỉ điều kiện phủ định, "However" là trạng từ liên kết không dùng ở đầu mệnh đề phụ.',
    },
    {
      id: 'gram-04-ex03',
      question: 'We cannot process your application _______ you submit all the required documents.',
      options: ['unless', 'although', 'moreover', 'so'],
      correctAnswer: 0,
      explanation: 'Nghĩa: "Chúng tôi không thể xử lý đơn của bạn TRỪ KHI bạn nộp đủ tài liệu" → điều kiện phủ định → **unless** (trừ khi). "Unless" = "if...not", dùng khi đưa ra điều kiện bắt buộc.',
    },
    {
      id: 'gram-04-ex04',
      question: 'The report was thorough; _______, the board still had several unanswered questions.',
      options: ['therefore', 'furthermore', 'nevertheless', 'consequently'],
      correctAnswer: 2,
      explanation: 'Báo cáo đầy đủ (tốt), nhưng BAN VẪN CÒN câu hỏi (dù vậy) → tương phản dù có sự tốt đẹp → **nevertheless** (dù vậy). "Therefore/Consequently" chỉ kết quả thuận chiều, "furthermore" bổ sung thêm.',
    },
    {
      id: 'gram-04-ex05',
      question: '_______ the headquarters is in Tokyo, _______ the regional office is in Singapore.',
      options: ['Both / and', 'Neither / nor', 'Either / or', 'Not only / but also'],
      correctAnswer: 0,
      explanation: 'Cả trụ sở chính VÀ văn phòng khu vực đều được đề cập như hai thực tế cùng tồn tại → **Both...and** (cả...lẫn). "Neither...nor" phủ định cả hai, "Either...or" chỉ lựa chọn một trong hai, "Not only...but also" nhấn mạnh bổ sung.',
    },
  ],
}
