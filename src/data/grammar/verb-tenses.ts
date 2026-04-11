import { GrammarLesson } from '../../types'

export const verbTensesLesson: GrammarLesson = {
  id: 'gram-02',
  title: 'Thì động từ (English Tenses)',
  order: 2,
  content: `
## Mục tiêu bài học
- Nhận ra dấu hiệu thời gian để chọn đúng thì trong câu TOEIC.
- Phân biệt nhanh các cặp dễ nhầm như Present Perfect và Past Simple.

## Khái niệm cốt lõi
Thì động từ cho biết hành động xảy ra khi nào. Trong TOEIC, bạn không cần nhớ toàn bộ hệ thống ngữ pháp học thuật; bạn cần nhìn ra dấu hiệu thời gian và quan hệ trước-sau giữa các hành động.

## Cách nhận diện trong câu
- \`every day\`, \`usually\`, \`often\` -> Present Simple
- \`now\`, \`currently\`, \`at the moment\` -> Present Continuous
- \`since\`, \`for\`, \`already\`, \`just\`, \`yet\` -> Present Perfect
- \`yesterday\`, \`last week\`, \`ago\`, năm cụ thể trong quá khứ -> Past Simple
- \`while\`, \`when\` + bối cảnh đang diễn ra -> Past Continuous / Past Perfect
- \`by next ...\`, \`by the time ...\` -> Future Perfect hoặc Past Perfect tùy mốc thời gian

## Công thức/mẫu cần nhớ
- Present Simple: \`S + V(s/es)\`
- Present Perfect: \`S + have/has + V3\`
- Past Simple: \`S + V2/ed\`
- Past Perfect: \`S + had + V3\`
- Future Perfect: \`S + will have + V3\`

## Lỗi thường gặp
- Thấy mốc quá khứ nhưng vẫn chọn Present Perfect.
- Gặp \`since/for\` mà quên kiểm tra hành động còn liên quan đến hiện tại hay không.
- Nhầm giữa một hành động đang diễn ra trong quá khứ và hành động hoàn thành trước đó.

## Mẹo làm TOEIC Part 5
Đừng đọc cả câu theo cảm giác. Hãy gạch dưới time signal trước, sau đó mới chọn nhóm thì phù hợp. Nếu có hai hành động quá khứ, hỏi tiếp: hành động nào xảy ra trước?

## Tóm tắt nhanh
- \`since/for\` -> ưu tiên Present Perfect
- mốc quá khứ rõ ràng -> Past Simple
- hành động xảy ra trước quá khứ khác -> Past Perfect
- \`by next ...\` -> nghĩ đến Future Perfect
`.trim(),
  examples: [
    {
      english: 'The company has expanded its services since 2021.',
      vietnamese:
        'Từ "since 2021" cho biết hành động bắt đầu trong quá khứ và còn liên hệ đến hiện tại, nên dùng Present Perfect.',
    },
    {
      english: 'While we were reviewing the contract, the client called.',
      vietnamese:
        'Một hành động đang diễn ra trong quá khứ bị một hành động khác chen vào, nên cần Past Continuous cho hành động đang diễn ra.',
    },
    {
      english: 'By next month, the finance team will have finished the audit.',
      vietnamese:
        'Cụm "By next month" cho thấy hành động phải hoàn thành trước một mốc tương lai, nên dùng Future Perfect.',
    },
  ],
  exercises: [
    {
      id: 'gram-02-ex01',
      question: 'The company _______ its services to Southeast Asia since 2015.',
      options: ['expands', 'has expanded', 'expanded', 'will expand'],
      correctAnswer: 1,
      explanation:
        'Time signal là "since 2015", nên hành động bắt đầu trong quá khứ và còn liên hệ đến hiện tại. Vì vậy phải chọn Present Perfect "has expanded"; "expands" là thói quen, "expanded" ngắt khỏi hiện tại, còn "will expand" chuyển sang tương lai nên đều không khớp.',
    },
    {
      id: 'gram-02-ex02',
      question: 'While we _______ the new software, the system crashed.',
      options: ['install', 'were installing', 'installed', 'have installed'],
      correctAnswer: 1,
      explanation:
        'Time signal là "While" kết hợp với hành động chen vào "the system crashed", nên câu cần thì diễn tả việc đang diễn ra trong quá khứ. "were installing" đúng vì là Past Continuous; các đáp án còn lại không thể hiện đúng bối cảnh đang diễn ra lúc bị gián đoạn.',
    },
    {
      id: 'gram-02-ex03',
      question: 'By the time you arrive, I _______ the report.',
      options: ['finish', 'have finished', 'will have finished', 'am finishing'],
      correctAnswer: 2,
      explanation:
        'Time signal là "By the time you arrive", tức một mốc tương lai mà trước đó việc hoàn thành phải xong. Vì vậy cần Future Perfect "will have finished"; "finish", "have finished", và "am finishing" không diễn tả rõ hành động hoàn tất trước mốc tương lai này.',
    },
    {
      id: 'gram-02-ex04',
      question: 'If the venue is available, the conference _______ place next month.',
      options: ['will take', 'takes', 'is taking', 'has taken'],
      correctAnswer: 0,
      explanation:
        'Mệnh đề điều kiện "If the venue is available" đẩy câu về dạng tương lai ở mệnh đề chính, nên đáp án đúng là Future Simple "will take". "takes" không phù hợp với cấu trúc điều kiện loại 1 trong ngữ cảnh này, "is taking" sai vì cụm "take place" hầu như không dùng ở thì tiếp diễn, còn "has taken" trái hẳn với mốc tương lai "next month".',
    },
    {
      id: 'gram-02-ex05',
      question: 'Sales _______ significantly since we introduced the new product.',
      options: ['increase', 'increased', 'have increased', 'were increasing'],
      correctAnswer: 2,
      explanation:
        'Time signal là "since we introduced the new product", nên mức tăng doanh số bắt đầu từ quá khứ và còn được nhìn từ hiện tại. Vì thế chọn Present Perfect "have increased"; ba đáp án còn lại lần lượt là hiện tại đơn, quá khứ đơn và quá khứ tiếp diễn nên không đúng logic thời gian.',
    },
    {
      id: 'gram-02-ex06',
      question: 'The manager _______ the budget report when the CEO called the meeting.',
      options: ['reviews', 'has reviewed', 'was reviewing', 'will review'],
      correctAnswer: 2,
      explanation: '"When the CEO called" (quá khứ) → hành động khác đang xảy ra vào lúc đó → Past Continuous: **was reviewing**. Chỉ ra hoạt động đang diễn ra tại một thời điểm trong quá khứ.',
    },
    {
      id: 'gram-02-ex07',
      question: 'After the project _______, the team took a one-week break.',
      options: ['completes', 'has completed', 'had been completed', 'is completing'],
      correctAnswer: 2,
      explanation: '"After the project..." (quá khứ) → hành động hoàn thành trước khi "took a break" (hành động quá khứ khác) → Past Perfect: **had been completed**. Cách khác là "had completed" (active voice) cũng có thể dùng tùy ngữ cảnh, nhưng dạng bị động phổ biến hơn.',
    },
    {
      id: 'gram-02-ex08',
      question: 'We _______ the new office building every day as we drive past.',
      options: ['see', 'have seen', 'are seeing', 'will see'],
      correctAnswer: 0,
      explanation: '"Every day" (thói quen) → Present Simple: **see**. Dùng để chỉ hành động lặp lại hàng ngày, thói quen.',
    },
    {
      id: 'gram-02-ex09',
      question: 'Once the contract _______, we can begin negotiations with the client.',
      options: ['signs', 'is signed', 'will be signed', 'is signing'],
      correctAnswer: 1,
      explanation: '"Once the contract..." (điều kiện) → hành động phải hoàn thành trước khi "can begin" → Present Simple hoặc Passive để chỉ quá trình hoàn thành: **is signed**. Hành động bị động ở hiện tại đơn.',
    },
    {
      id: 'gram-02-ex10',
      question: 'By the end of this month, our company _______ all outstanding invoices.',
      options: ['will collect', 'collects', 'is collecting', 'will have collected'],
      correctAnswer: 3,
      explanation: '"By the end of this month" (thời điểm tương lai) → hành động sẽ hoàn thành trước thời điểm đó → Future Perfect: **will have collected**. Chỉ ra điều gì sẽ xong vào thời điểm cụ thể trong tương lai.',
    },
  ],
}
