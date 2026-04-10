import { GrammarLesson } from '../../types'

export const comparativesLesson: GrammarLesson = {
  id: 'gram-07',
  title: 'So sánh (Comparatives & Superlatives)',
  order: 7,
  content: `
## Mục tiêu bài học
- Nhận ra nhanh 3 dấu hiệu so sánh quen thuộc trong TOEIC: \`than\`, \`the most\`, và \`as ... as\`.
- Chọn đúng dạng tính từ trong câu so sánh hơn, so sánh nhất, và so sánh bằng.

## Khái niệm cốt lõi
Câu so sánh không bắt bạn dịch hết câu trước. Việc quan trọng là nhìn **marker** trước:
- Thấy **than** -> thường là **so sánh hơn** giữa 2 đối tượng.
- Thấy **the most / the + -est** -> thường là **so sánh nhất** trong một nhóm.
- Thấy **as ... as** -> thường là **so sánh bằng**.

## Cách nhận diện trong câu
- Có từ **than** ngay sau tính từ -> nghĩ đến mẫu comparative: \`more efficient than\`, \`better than\`.
- Có **the** và ý so sánh trong cả nhóm như \`in the company\`, \`of all teams\` -> nghĩ đến superlative: \`the most profitable\`.
- Có khung **as + tính từ + as** -> chọn tính từ nguyên mẫu: \`as reliable as\`.
- Có cặp lặp lại **the + comparative, the + comparative** -> đây là mẫu quan hệ tỉ lệ: \`The larger ..., the lower ...\`.
- Nếu tính từ là dạng đặc biệt như \`good\`, \`bad\`, hãy nhớ ngay: \`better/best\`, \`worse/worst\`.

## Công thức/mẫu cần nhớ
- Tính từ dài: \`more + adjective + than\` -> \`more efficient than\`
- Tính từ ngắn: \`adjective-er + than\` -> \`faster than\`
- So sánh nhất tính từ dài: \`the most + adjective\` -> \`the most profitable\`
- So sánh nhất tính từ ngắn: \`the + adjective-est\` -> \`the fastest\`
- So sánh bằng: \`as + adjective + as\` -> \`as reliable as\`
- So sánh kép: \`the + comparative, the + comparative\`
- Bất quy tắc: \`good -> better -> best\`

## Lỗi thường gặp
- Thấy **than** nhưng lại chọn \`the most\` hoặc \`as ... as\`.
- Viết kép dạng so sánh như \`more faster\` hoặc \`most easiest\`.
- Dùng trạng từ thay cho tính từ trong mẫu \`as ... as\`, ví dụ \`as reliably as\`.
- Quên \`the\` trước so sánh nhất: phải là \`the most profitable\`, không phải \`most profitable\`.
- Quên dạng bất quy tắc: \`gooder\` là sai, phải là \`better\`.

## Mẹo làm TOEIC Part 5
Đừng đọc cả câu trước. Hãy khoanh ngay **marker nhìn thấy được**. Nếu câu có **than**, loại nhanh các đáp án superlative. Nếu câu có **as ... as**, tìm đáp án giữ nguyên tính từ. Nếu câu có **the** + phạm vi nhóm, ưu tiên superlative.

## Tóm tắt nhanh
- **than** -> comparative
- **the most / the + -est** -> superlative
- **as ... as** -> equal comparison
- **the ..., the ...** -> double comparative
- \`good\` -> \`better/best\`
`.trim(),
  examples: [
    {
      english: 'The new workflow is more efficient than the previous process.',
      vietnamese:
        'Marker nhìn thấy là "than", nên đây là so sánh hơn. Vì "efficient" là tính từ dài, mẫu đúng là **more efficient than** chứ không thêm **-er**.',
    },
    {
      english: 'This branch is the most profitable office in the region.',
      vietnamese:
        'Cụm "the most" báo hiệu so sánh nhất trong một nhóm. Với tính từ dài "profitable", ta dùng **the most profitable** để nói chi nhánh này lợi nhuận cao nhất.',
    },
    {
      english: 'Our backup platform is as reliable as the main server.',
      vietnamese:
        'Khung "as ... as" cho biết hai đối tượng được so sánh bằng nhau. Vì vậy ta giữ nguyên tính từ và dùng mẫu **as reliable as**.',
    },
  ],
  exercises: [
    {
      id: 'gram-07-ex01',
      question: 'The new logistics software is _______ than the old system for tracking deliveries.',
      options: ['more efficient', 'most efficient', 'as efficient', 'efficiently'],
      correctAnswer: 0,
      explanation:
        'Marker nhìn thấy trong câu là **than**, nên đây là comparative. Vì "efficient" là tính từ dài, chỗ trống phải điền **more efficient** để hoàn thành mẫu **more + adjective + than**.',
    },
    {
      id: 'gram-07-ex02',
      question: 'This is _______ product line in the company.',
      options: ['more profitable', 'the most profitable', 'as profitable as', 'profitabler'],
      correctAnswer: 1,
      explanation:
        'Cụm **in the company** cho thấy đang so sánh trong cả một nhóm, nên cần superlative. Với tính từ dài "profitable", dạng đúng là **the most profitable** để diễn tả dòng sản phẩm có lợi nhuận cao nhất trong công ty.',
    },
    {
      id: 'gram-07-ex03',
      question: 'The backup system is as _______ as the main server during peak hours.',
      options: ['more reliable', 'reliable', 'the most reliable', 'reliably'],
      correctAnswer: 1,
      explanation:
        'Khung so sánh nhìn thấy ngay trong câu là **as ... as**, nên chỗ trống phải là tính từ nguyên mẫu. Vì vậy đáp án đúng là **reliable** để tạo thành **as reliable as**.',
    },
    {
      id: 'gram-07-ex04',
      question: 'This quarter\'s sales were _______ than last quarter\'s results.',
      options: ['gooder', 'best', 'better', 'more best'],
      correctAnswer: 2,
      explanation:
        'Marker nhìn thấy là **than**, nên đây là comparative. Với tính từ bất quy tắc "good", dạng so sánh hơn đúng là **better**, nên đáp án cần điền là **better**.',
    },
    {
      id: 'gram-07-ex05',
      question: '_______ the order, _______ the shipping discount.',
      options: ['The larger / the greater', 'Larger / greater', 'The largest / the greatest', 'More large / more great'],
      correctAnswer: 0,
      explanation:
        'Câu lặp lại marker **the** ở cả hai vế, nên đây là mẫu double comparative: **the + comparative, the + comparative**. Vì vậy đáp án đúng là **The larger / the greater**.',
    },
  ],
}
