import { GrammarLesson } from '../../types'

export const conjunctionsLesson: GrammarLesson = {
  id: 'gram-04',
  title: 'Liên từ & Từ nối (Conjunctions & Connectors)',
  order: 4,
  content: `
## Mục tiêu bài học
- Phân biệt liên từ, connector, và conjunctive adverb trong câu TOEIC.
- Chọn từ nối dựa trên quan hệ logic giữa hai mệnh đề thay vì đoán theo nghĩa chung chung.

## Khái niệm cốt lõi
- **Conjunction / liên từ** nối hai từ, hai cụm, hoặc hai mệnh đề. Ví dụ: \`and, but, so\`.
- **Subordinating conjunction** nối mệnh đề phụ với mệnh đề chính. Ví dụ: \`although, because, if\`.
- **Conjunctive adverb / trạng từ liên kết** nối hai mệnh đề độc lập, thường đi sau dấu chấm phẩy hoặc đứng đầu câu và có dấu phẩy. Ví dụ: \`however, therefore, moreover\`.
- Trong TOEIC Part 5, câu hỏi thường kiểm tra xem hai vế có quan hệ **kết quả, tương phản, nhượng bộ, bổ sung, điều kiện** hay không.

## Cách nhận diện trong câu
- Nếu câu có hai mệnh đề và vế sau là **kết quả** của vế trước, nghĩ đến \`so\`, \`therefore\`, \`consequently\`.
- Nếu hai vế **trái ngược** nhau, nghĩ đến \`but\`, \`although\`, \`however\`, \`nevertheless\`.
- Nếu sau chỗ trống là **một mệnh đề đầy đủ** nhưng vế đầu là mệnh đề phụ, liên từ như \`although\`, \`because\`, \`if\` thường phù hợp.
- Nếu trước chỗ trống có **dấu chấm phẩy** hoặc câu tách làm hai mệnh đề độc lập, ưu tiên conjunctive adverb như \`however\`.
- Nếu đề cho một **cặp từ**, hãy kiểm tra mẫu song song như \`both...and\`, \`either...or\`, \`not only...but also\`.

## Công thức/mẫu cần nhớ
- Kết quả: \`S + V, so + S + V\`
- Nhượng bộ: \`Although + S + V, S + V\`
- Trạng từ liên kết: \`S + V; however, S + V\`
- Điều kiện phủ định: \`S + V not ... unless + S + V\`
- Tương quan: \`both A and B\`, \`either A or B\`, \`not only A but also B\`

## Lỗi thường gặp
- Nhầm \`although\` với \`however\`: \`although\` đứng trước mệnh đề phụ, còn \`however\` thường đi sau dấu chấm phẩy hoặc đầu câu và có dấu phẩy.
- Thấy nghĩa "vì vậy" rồi chọn \`so\` dù câu đã có dấu chấm phẩy; khi đó \`therefore\` hoặc \`however\` mới đúng mẫu dấu câu.
- Quên kiểm tra quan hệ logic giữa hai vế nên chọn từ nối chỉ vì quen mặt.
- Dùng sai cặp tương quan, ví dụ viết \`both...or\` hoặc \`not only...and\`.

## Mẹo làm TOEIC Part 5
Đọc nhanh hai vế và tự hỏi: **vế sau là kết quả, sự nhượng bộ, hay sự đối lập?** Sau đó nhìn dấu câu. Quan hệ logic chọn nhóm từ; dấu câu chọn đúng mẫu trong nhóm đó.

## Tóm tắt nhanh
- Kết quả trực tiếp -> \`so\`
- Nhượng bộ -> \`although\`
- Hai mệnh đề độc lập + dấu chấm phẩy -> \`however\` / \`therefore\`
- Điều kiện phủ định -> \`unless\`
- Hai ý song song -> cặp \`both...and\`, \`either...or\`, \`not only...but also\`
`.trim(),
  examples: [
    {
      english: 'The printer was out of ink, so the staff used the machine on the second floor.',
      vietnamese:
        'Hai mệnh đề có quan hệ kết quả: máy in hết mực nên nhân viên phải dùng máy khác. Mẫu phù hợp là "mệnh đề, so + mệnh đề".',
    },
    {
      english: 'Although the proposal was expensive, the director approved it immediately.',
      vietnamese:
        'Hai vế mang quan hệ nhượng bộ: đề xuất đắt nhưng vẫn được duyệt. "Although" đứng đầu mệnh đề phụ theo mẫu "Although + S + V, S + V".',
    },
    {
      english: 'The restaurant was crowded; however, the service remained fast and polite.',
      vietnamese:
        'Hai mệnh đề độc lập được nối bằng dấu chấm phẩy và có ý tương phản, nên dùng conjunctive adverb "however" theo mẫu "S + V; however, S + V".',
    },
  ],
  exercises: [
    {
      id: 'gram-04-ex01',
      question: 'The new software is expensive _______ it saves the company significant time and resources.',
      options: ['so', 'but', 'for', 'nor'],
      correctAnswer: 1,
      explanation:
        'Quan hệ logic là tương phản: phần mềm đắt nhưng lại tiết kiệm thời gian và nguồn lực. Câu dùng mẫu nối hai mệnh đề độc lập "S + V, but + S + V", nên **but** là đáp án đúng.',
    },
    {
      id: 'gram-04-ex02',
      question: '_______ the manager approved the budget, the team began recruiting new staff.',
      options: ['Although', 'Unless', 'As soon as', 'However'],
      correctAnswer: 2,
      explanation:
        'Quan hệ logic là thời gian-kết quả ngay sau đó: vừa được phê duyệt ngân sách thì đội tuyển dụng bắt đầu hành động. Câu cần mẫu mệnh đề phụ thời gian "As soon as + S + V, S + V", nên chọn **As soon as**.',
    },
    {
      id: 'gram-04-ex03',
      question: 'We cannot process your application _______ you submit all the required documents.',
      options: ['unless', 'although', 'moreover', 'so'],
      correctAnswer: 0,
      explanation:
        'Quan hệ logic là điều kiện phủ định: không thể xử lý đơn trừ khi bạn nộp đủ giấy tờ. Mẫu phù hợp là "not ... unless + mệnh đề", nên connector đúng là **unless**.',
    },
    {
      id: 'gram-04-ex04',
      question: 'The report was thorough; _______, the board still had several unanswered questions.',
      options: ['therefore', 'furthermore', 'nevertheless', 'consequently'],
      correctAnswer: 2,
      explanation:
        'Quan hệ logic là nhượng bộ/tương phản: báo cáo rất kỹ nhưng hội đồng vẫn còn thắc mắc. Vì câu có hai mệnh đề độc lập với dấu chấm phẩy, mẫu cần là conjunctive adverb "S + V; nevertheless, S + V", nên chọn **nevertheless**.',
    },
    {
      id: 'gram-04-ex05',
      question: '_______ the headquarters _______ the regional office are located in Asia.',
      options: ['Both / and', 'Neither / nor', 'Either / or', 'Not only / but also'],
      correctAnswer: 0,
      explanation:
        'Câu diễn tả hai chủ ngữ cùng đúng và cùng chia sẻ một động từ, nên cần cấu trúc song song "Both A and B + plural verb". Vì vậy đáp án đúng là **Both / and**.',
    },
    {
      id: 'gram-04-ex06',
      question: 'The employee left the company _______ he found a better job opportunity.',
      options: ['because', 'however', 'therefore', 'besides'],
      correctAnswer: 0,
      explanation: '"The employee left...because he found..." là mối quan hệ nhân quả rõ ràng → **because**. "However" là liên từ chuyển hướng, "therefore" là liên từ kết luận, "besides" dùng để thêm thông tin.',
    },
    {
      id: 'gram-04-ex07',
      question: 'The price of oil has increased significantly; _______, fuel costs have risen.',
      options: ['as', 'moreover', 'however', 'therefore'],
      correctAnswer: 3,
      explanation: 'Giữa hai câu độc lập có mối quan hệ kết luận: tăng giá dầu → dẫn đến tăng chi phí xăng → **therefore** (vì vậy). "Moreover" dùng để thêm, "however" chỉ sự tương phản.',
    },
    {
      id: 'gram-04-ex08',
      question: '_______ the marketing campaign was successful _______ the sales team worked very hard.',
      options: ['Neither / nor', 'Both / and', 'Not only / but also', 'Either / or'],
      correctAnswer: 2,
      explanation: 'Hai mệnh đề đều đúng và có mối quan hệ nhân quả: "Not only...but also" (không chỉ...mà còn) nhấn mạnh cả hai yếu tố. Đây là dạng tương tự để khẳng định hai điều.' ,
    },
    {
      id: 'gram-04-ex09',
      question: 'We wanted to expand into new markets; _______, the financial situation did not permit it.',
      options: ['furthermore', 'however', 'likewise', 'thus'],
      correctAnswer: 1,
      explanation: '"We wanted to expand...however, the financial situation did not permit" chỉ sự tương phản, trái ngược → **however** (tuy nhiên). "Furthermore" thêm vào, "likewise" cũng tương tự, "thus" kết luận.',
    },
    {
      id: 'gram-04-ex10',
      question: 'The factory was closed for two weeks _______ equipment maintenance _______ safety inspections.',
      options: ['for / and', 'because / while', 'due to / and', 'for / while'],
      correctAnswer: 2,
      explanation: '"Closed...due to equipment maintenance and safety inspections" → **due to...and** (do...và). "Due to" + noun phrase chỉ nguyên nhân; "for" có thể dùng nhưng "due to" tự nhiên hơn trong ngữ cảnh này.',
    },
  ],
}
