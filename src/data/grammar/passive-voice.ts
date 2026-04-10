import { GrammarLesson } from '../../types'

export const passiveVoiceLesson: GrammarLesson = {
  id: 'gram-03',
  title: 'Câu bị động (Passive Voice)',
  order: 3,
  content: `
## Mục tiêu bài học
- Nhận ra khi nào câu cần bị động thay vì chủ động.
- Chọn đúng dạng \`be + V3/ed\` theo thì của câu.

## Khái niệm cốt lõi
Câu bị động được dùng khi người viết muốn nhấn mạnh người/vật nhận hành động hơn là người thực hiện hành động. Trong TOEIC, bị động rất hay xuất hiện trong email, thông báo, quy trình, và quy định công ty.

## Cách nhận diện trong câu
- Chủ ngữ là thứ "được xử lý/được gửi/được yêu cầu" -> nghĩ đến bị động.
- Có dạng \`be\` + past participle (\`sent\`, \`approved\`, \`completed\`) -> bị động.
- Nếu người làm hành động không quan trọng hoặc không xuất hiện -> thường dùng bị động.
- Kiểm tra thì của động từ \`be\` trước, sau đó mới chọn V3/ed.

## Công thức/mẫu cần nhớ
- Present passive: \`am/is/are + V3\`
- Past passive: \`was/were + V3\`
- Future passive: \`will be + V3\`
- Modal passive: \`can/must/should be + V3\`

## Lỗi thường gặp
- Chọn V-ing hoặc V nguyên mẫu sau \`is/was/will be\`.
- Thấy một động từ quen mắt rồi chọn active dù chủ ngữ không tự thực hiện hành động.
- Quên chia thì cho \`be\`.

## Mẹo làm TOEIC Part 5
Hỏi nhanh: chủ ngữ có tự làm hành động này không? Nếu không, gần như chắc chắn cần bị động. Sau đó chỉ còn việc chọn đúng thì của \`be\`.

## Tóm tắt nhanh
- Bị tác động -> nghĩ đến passive
- Passive = \`be + V3\`
- Xác định thì trước, chia \`be\` sau
- Modal + passive = \`modal + be + V3\`
`.trim(),
  examples: [
    {
      english: 'The final report was submitted to the director yesterday.',
      vietnamese:
        'Báo cáo là thứ nhận hành động "submit", không phải tự nộp, nên câu này dùng bị động ở quá khứ.',
    },
    {
      english: 'All visitors must be registered at the front desk.',
      vietnamese:
        'Sau modal "must" mà muốn diễn tả bị động thì dùng cấu trúc "must be + V3".',
    },
    {
      english: 'The new policy will be announced next Monday.',
      vietnamese:
        'Thông báo là hành động xảy ra với "policy", nên dùng future passive: "will be announced".',
    },
  ],
  exercises: [
    {
      id: 'gram-03-ex01',
      question: 'The annual report _______ by the accounting department every December.',
      options: ['prepares', 'is prepared', 'has prepared', 'preparing'],
      correctAnswer: 1,
      explanation:
        'Chủ ngữ "The annual report" nhận hành động chứ không tự thực hiện việc chuẩn bị, nên câu cần dạng passive. Vì mốc "every December" diễn tả thói quen hiện tại, dạng đúng là Present Simple passive "is prepared"; các lựa chọn còn lại đều là active hoặc sai cấu trúc.',
    },
    {
      id: 'gram-03-ex02',
      question: 'The new branch office _______ by the CEO in Singapore last year.',
      options: ['opened', 'was opened', 'has been opened', 'is opening'],
      correctAnswer: 1,
      explanation:
        'Cụm "by the CEO" cho thấy chủ ngữ "The new branch office" là đối tượng nhận hành động, nên câu bắt buộc phải ở dạng bị động. Với mốc quá khứ rõ ràng "last year", đáp án đúng là Past Simple passive "was opened"; "opened" thiếu trợ động từ bị động, còn "has been opened" và "is opening" đều sai về thì.',
    },
    {
      id: 'gram-03-ex03',
      question: 'The project deadline _______ until the end of next month.',
      options: ['extended', 'will extend', 'will be extended', 'has extended'],
      correctAnswer: 2,
      explanation:
        'Chủ ngữ "The project deadline" nhận hành động gia hạn chứ không tự gia hạn, nên phải chọn passive form. Vì mốc thời gian hướng tới tương lai "until the end of next month", đáp án đúng là Future passive "will be extended"; các đáp án khác thiếu "be" hoặc là active.',
    },
    {
      id: 'gram-03-ex04',
      question: 'All expenses _______ by the finance team before reimbursement.',
      options: ['must review', 'must be reviewing', 'must be reviewed', 'must have reviewed'],
      correctAnswer: 2,
      explanation:
        'Chủ ngữ "All expenses" là đối tượng được xem xét, nghĩa là chủ ngữ chịu tác động của hành động nên câu cần bị động. Sau modal "must", cấu trúc đúng là "must be reviewed"; ba đáp án còn lại hoặc là active, hoặc là dạng tiếp diễn/hoàn thành không phù hợp với mẫu modal passive.',
    },
    {
      id: 'gram-03-ex05',
      question: 'Three new products _______ since the company changed its strategy.',
      options: ['launched', 'were launched', 'have been launched', 'are launching'],
      correctAnswer: 2,
      explanation:
        'Chủ ngữ "Three new products" nhận hành động tung ra thị trường, nên câu phải ở dạng passive chứ không phải active. Vì có "since the company changed its strategy", hành động được nhìn từ quá khứ đến hiện tại, nên dạng đúng là Present Perfect passive "have been launched".',
    },
  ],
}
