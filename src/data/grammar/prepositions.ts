import { GrammarLesson } from '../../types'

export const prepositionsLesson: GrammarLesson = {
  id: 'gram-05',
  title: 'Giới từ (Prepositions)',
  order: 5,
  content: `
## Mục tiêu bài học
- Chọn đúng giới từ theo cụm cố định và theo dạng biểu thức thời gian trong TOEIC.
- Tránh các bẫy hay gặp như \`in/on/at\`, \`for/since\`, và động từ đi kèm giới từ cố định.

## Khái niệm cốt lõi
Giới từ cho biết quan hệ về **thời gian, nơi chốn, hướng đi**, hoặc đi theo **cụm cố định**. Trong TOEIC Part 5, nhiều câu không thể dịch từng từ; bạn phải nhận ra **pattern** như \`at 9:00 a.m.\`, \`for three years\`, \`comply with a rule\`.

## Cách nhận diện trong câu
- Nếu chỗ trống đứng trước **giờ cụ thể**, nghĩ đến \`at\`: \`at 9:00 a.m.\`
- Nếu đứng trước **ngày/thứ/ngày cụ thể**, nghĩ đến \`on\`: \`on Monday\`
- Nếu đứng trước **tháng, năm, buổi trong ngày**, nghĩ đến \`in\`: \`in June\`, \`in 2024\`, \`in the morning\`
- Nếu câu có **khoảng thời gian kéo dài**, dùng \`for\`: \`for three years\`
- Nếu câu có **mốc bắt đầu cụ thể**, dùng \`since\`: \`since 2021\`
- Nếu sau tính từ/động từ là một collocation quen thuộc như \`responsible for\`, \`based on\`, \`comply with\`, hãy nhớ theo cụm.

## Công thức/mẫu cần nhớ
- Giờ cụ thể: \`at + time\`
- Ngày/thứ: \`on + day/date\`
- Tháng/năm/khoảng thời gian lớn: \`in + month/year/part of day\`
- Khoảng thời gian: \`for + duration\`
- Mốc bắt đầu: \`since + starting point\`
- Cụm cố định: \`comply with\`, \`interested in\`, \`responsible for\`, \`according to\`, \`based on\`

## Lỗi thường gặp
- Dùng \`in\` hoặc \`on\` với giờ cụ thể thay vì \`at\`.
- Nhầm \`for\` và \`since\`: \`for\` đi với khoảng thời gian, \`since\` đi với mốc bắt đầu.
- Dịch từng từ rồi viết sai collocation như \`comply to\` hoặc \`responsible of\`.
- Chỉ nhìn nghĩa chung "ở" rồi đoán \`in/on/at\` mà không kiểm tra loại thời gian hoặc cụm cố định.

## Mẹo làm TOEIC Part 5
Hãy tìm "tín hiệu điều khiển" trước: đây là **giờ/ngày/tháng**, **duration/starting point**, hay **cụm cố định**? Khi xác định đúng nhóm, bạn thường loại được 3 đáp án rất nhanh.

## Tóm tắt nhanh
- \`at\` + giờ cụ thể
- \`on\` + ngày/thứ
- \`in\` + tháng/năm/buổi
- \`for\` + khoảng thời gian
- \`since\` + mốc bắt đầu
- Nhiều câu TOEIC là collocation: nhớ cả cụm, ví dụ \`comply with\`
`.trim(),
  examples: [
    {
      english: 'The orientation session starts at 9:00 a.m. in the main hall.',
      vietnamese:
        'Biểu thức "9:00 a.m." là giờ cụ thể nên phải dùng "at". Đây là quy tắc thời gian rất hay xuất hiện trong Part 5.',
    },
    {
      english: 'Ms. Ruiz has worked for three years in the accounting department.',
      vietnamese:
        'Cụm "three years" là khoảng thời gian kéo dài, vì vậy dùng "for" chứ không dùng "since". Mẫu là "for + duration".',
    },
    {
      english: 'All suppliers must comply with the new safety rules.',
      vietnamese:
        'Động từ "comply" đi với giới từ cố định "with". Đây là collocation phải nhớ nguyên cụm, không đổi sang "to" hay "for".',
    },
  ],
  exercises: [
    {
      id: 'gram-05-ex01',
      question: 'The sales meeting will be held _______ Monday morning.',
      options: ['in', 'at', 'on', 'by'],
      correctAnswer: 2,
      explanation:
        'Cụm thời gian "Monday morning" được điều khiển bởi quy tắc ngày/thứ cụ thể, nên dùng mẫu "on + day/date". Vì vậy đáp án đúng là **on**, không phải **at** hay **in**.',
    },
    {
      id: 'gram-05-ex02',
      question: 'Please send your application _______ the end of this week.',
      options: ['until', 'during', 'by', 'since'],
      correctAnswer: 2,
      explanation:
        'Câu nói về hạn chót phải hoàn thành trước một mốc thời gian, nên dùng collocation thời gian "by the end of ...". Quy tắc điều khiển đáp án là deadline expression, vì vậy chọn **by**.',
    },
    {
      id: 'gram-05-ex03',
      question: 'Ms. Park has been working at this company _______ 2019.',
      options: ['for', 'during', 'within', 'since'],
      correctAnswer: 3,
      explanation:
        'Mốc "2019" là điểm bắt đầu cụ thể, và câu đang ở hiện tại hoàn thành tiếp diễn "has been working". Quy tắc là "since + starting point", nên đáp án đúng là **since** chứ không phải **for**.',
    },
    {
      id: 'gram-05-ex04',
      question: 'The management team is _______ improving employee satisfaction.',
      options: ['committed to', 'familiar with', 'based on', 'interested in'],
      correctAnswer: 0,
      explanation:
        'Chủ ngữ "management team" phù hợp với collocation kinh doanh "be committed to + V-ing" để diễn tả sự cam kết thực hiện điều gì. Chỉ **committed to** khớp tự nhiên với mẫu này.',
    },
    {
      id: 'gram-05-ex05',
      question: 'The assistant put the documents _______ the manager\'s desk before the meeting.',
      options: ['between', 'on', 'into', 'behind'],
      correctAnswer: 1,
      explanation:
        'Danh từ "desk" gợi quy tắc vị trí trên bề mặt, nên cụm đúng là "on the desk". Đây là spatial pattern chỉ vị trí bề mặt, vì vậy chọn **on** thay vì **into** hay **behind**.',
    },
  ],
}
