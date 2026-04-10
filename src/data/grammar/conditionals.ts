import { GrammarLesson } from '../../types'

export const conditionalsLesson: GrammarLesson = {
  id: 'gram-08',
  title: 'Câu điều kiện (Conditional Sentences)',
  order: 8,
  content: `
## Mục tiêu bài học
- Nhận ra nhanh 4 loại câu điều kiện: zero, first, second, và third conditional.
- Phân biệt **khả năng thực tế**, **tình huống giả định**, và **sự tiếc nuối về quá khứ** để chọn đúng mẫu động từ.

## Khái niệm cốt lõi
Câu điều kiện có 2 phần: **mệnh đề điều kiện** và **mệnh đề kết quả**. Trong TOEIC, bạn không cần học thuộc định nghĩa dài; bạn cần nhìn xem câu đang nói về:
- **Sự thật/quy tắc chung** -> zero conditional
- **Khả năng có thể xảy ra thật** -> first conditional
- **Giả định không có thật ở hiện tại/tương lai** -> second conditional
- **Tiếc nuối về chuyện đã không xảy ra trong quá khứ** -> third conditional

## Cách nhận diện trong câu
- Thấy **if + hiện tại đơn**, và vế kia cũng là hiện tại đơn -> zero conditional.
- Thấy **if + hiện tại đơn** nhưng vế kết quả có **will + V** -> first conditional.
- Thấy **if + quá khứ đơn** và vế kết quả có **would + V** -> second conditional.
- Thấy **if + had + V3** và vế kết quả có **would have + V3** -> third conditional.
- Thấy **unless** -> hiểu nhanh là **if ... not**; thường đi cùng zero hoặc first conditional.
- Các cụm như **provided that** hoặc **as long as** cũng có thể mở đầu mệnh đề điều kiện. Với **in case**, hãy hiểu là “để phòng khi”, không xem như marker điều kiện cơ bản trong bài này.

## Công thức/mẫu cần nhớ
- Zero conditional: \`if + present simple, present simple\`
- First conditional: \`if + present simple, will + base verb\`
- Second conditional: \`if + past simple, would + base verb\`
- Third conditional: \`if + past perfect, would have + past participle\`
- Với động từ \`to be\` trong second conditional: ưu tiên \`If I were ...\`
- \`unless + present simple\` = \`if ... not\` trong câu điều kiện thực tế

## Lỗi thường gặp
- Viết \`if + will\` trong first conditional. Sau **if** thường không dùng **will**.
- Thấy **would** rồi vẫn chọn hiện tại đơn ở vế điều kiện, làm hỏng second conditional.
- Nhầm third conditional với second conditional: nếu có **had + V3**, hãy nghĩ ngay đến chuyện tiếc nuối trong quá khứ.
- Dịch \`unless\` như \`if\` bình thường và quên mất nghĩa phủ định của nó.
- Dùng \`was\` thay vì \`were\` trong mẫu chuẩn \`If I were ...\`.

## Mẹo làm TOEIC Part 5
Hãy nhìn **cặp động từ** trước khi nhìn nghĩa. Một vế sẽ tiết lộ loại câu điều kiện, và loại đó sẽ khóa luôn mẫu động từ ở vế còn lại. Trong nhiều câu TOEIC, chỉ cần thấy **will**, **would**, hoặc **would have** là bạn đã loại được phần lớn đáp án.

## Tóm tắt nhanh
- Zero: sự thật chung -> present / present
- First: khả năng thật -> present / will + V
- Second: giả định hiện tại -> past / would + V
- Third: tiếc nuối quá khứ -> had + V3 / would have + V3
- **unless** = **if ... not**
`.trim(),
  examples: [
    {
      english: 'If the shipment arrives today, we will send the invoices this afternoon.',
      vietnamese:
        'Đây là **first conditional** vì câu nói về khả năng thực tế trong tương lai. Cặp mẫu nhìn thấy là **if + present simple** (arrives) và **will + V** (will send).',
    },
    {
      english: 'If I were the team leader, I would call the client immediately.',
      vietnamese:
        'Đây là **second conditional** vì người nói giả định một tình huống không thật ở hiện tại. Mẫu đúng là **if + past simple** (were) và **would + V** (would call).',
    },
    {
      english: 'If the team had checked the figures, it would have avoided the error.',
      vietnamese:
        'Đây là **third conditional** vì câu nói về một điều đã không xảy ra trong quá khứ và kết quả đáng tiếc. Mẫu là **if + had + V3** (had checked) và **would have + V3** (would have avoided).',
    },
  ],
  exercises: [
    {
      id: 'gram-08-ex01',
      question:
        'If employees miss the safety drill, they always _______ a follow-up session under company policy.',
      options: ['attend', 'will attend', 'would attend', 'would have attended'],
      correctAnswer: 0,
      explanation:
        'Tín hiệu **always** và cụm **under company policy** cho biết đây là quy định chung, nên dùng **zero conditional**. Cặp mẫu đúng là **if + present simple** (miss) và **present simple** (attend), vì vậy chọn **attend**.',
    },
    {
      id: 'gram-08-ex02',
      question: 'If the shipment arrives today, we _______ the replacement units immediately.',
      options: ['ship', 'will ship', 'would ship', 'would have shipped'],
      correctAnswer: 1,
      explanation:
        'Đây là **first conditional** vì câu nói về khả năng thực tế ở tương lai. Vế điều kiện đã dùng **if + present simple** (arrives), nên vế kết quả phải theo cặp **will + base verb** -> **will ship**.',
    },
    {
      id: 'gram-08-ex03',
      question: 'If I _______ in charge of recruitment, I would shorten the interview process.',
      options: ['am', 'will be', 'were', 'had been'],
      correctAnswer: 2,
      explanation:
        'Đây là **second conditional** vì vế kết quả có **would shorten**, báo hiệu tình huống giả định ở hiện tại. Cặp mẫu cần là **if + past simple** và **would + base verb**; với \`to be\`, dạng chuẩn là **were**.',
    },
    {
      id: 'gram-08-ex04',
      question: 'If the team had checked the figures, they _______ the reporting error.',
      options: ['avoid', 'will avoid', 'would avoid', 'would have avoided'],
      correctAnswer: 3,
      explanation:
        'Đây là **third conditional** vì vế if đã có **had checked**, tức **if + past perfect**. Theo cặp mẫu của third conditional, vế kết quả phải là **would have + past participle**, nên đáp án đúng là **would have avoided**.',
    },
    {
      id: 'gram-08-ex05',
      question: 'Unless the vendor _______ the contract today, we will postpone the launch.',
      options: ['signs', 'will sign', 'signed', 'had signed'],
      correctAnswer: 0,
      explanation:
        'Từ khóa **unless** có nghĩa là **if ... not**, nên câu này vẫn là **first conditional**. Cặp mẫu đúng là **unless + present simple** và **will + base verb**, vì vậy chọn **signs**.',
    },
  ],
}
