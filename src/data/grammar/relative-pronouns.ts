import { GrammarLesson } from '../../types'

export const relativePronounsLesson: GrammarLesson = {
  id: 'gram-06',
  title: 'Đại từ quan hệ (Relative Pronouns)',
  order: 6,
  content: `
## Mục tiêu bài học
- Xác định đúng đại từ quan hệ dựa trên loại antecedent và vai trò còn thiếu trong mệnh đề quan hệ.
- Tránh nhầm giữa \`who\`, \`which\`, \`that\`, \`whose\`, \`where\`, và \`when\` trong TOEIC.

## Khái niệm cốt lõi
Đại từ quan hệ nối một danh từ đứng trước (**antecedent**) với mệnh đề bổ nghĩa phía sau. Muốn chọn đúng, bạn cần trả lời 2 câu:
1. Antecedent là **người, vật, nơi chốn, hay thời gian**?
2. Trong mệnh đề quan hệ đang thiếu **chủ ngữ, tân ngữ, hay ý sở hữu**?

## Cách nhận diện trong câu
- Antecedent là **người** và chỗ trống làm chủ ngữ -> thường dùng \`who\`
- Antecedent là **vật** và chỗ trống làm chủ ngữ/tân ngữ -> thường dùng \`which\` hoặc \`that\`
- Nếu cần ý **sở hữu** -> dùng \`whose\`
- Antecedent là **địa điểm** -> ưu tiên \`where\`
- Antecedent là **thời gian** -> ưu tiên \`when\`
- Nếu mệnh đề có dấu phẩy bổ sung thông tin, tránh dùng \`that\`

## Công thức/mẫu cần nhớ
- Người + thiếu chủ ngữ: \`person + who + V\`
- Vật + thiếu tân ngữ/chủ ngữ: \`thing + which/that + clause\`
- Sở hữu: \`person/thing + whose + noun + V\`
- Nơi chốn: \`place + where + S + V\`
- Thời gian: \`time/year/day + when + S + V\`

## Lỗi thường gặp
- Chỉ nhìn antecedent mà quên xem mệnh đề sau đang thiếu vai trò gì.
- Dùng \`which\` cho người hoặc \`who\` cho vật.
- Thấy danh từ địa điểm nhưng vẫn chọn \`which\` dù câu đang thiếu trạng ngữ nơi chốn, khi đó \`where\` tự nhiên hơn.
- Quên rằng \`whose\` dùng cho cả người lẫn vật khi câu cần ý sở hữu.

## Mẹo làm TOEIC Part 5
Khoanh antecedent trước, rồi nhìn mệnh đề sau xem sau chỗ trống đã có chủ ngữ/động từ chưa. Nếu động từ xuất hiện ngay sau chỗ trống, rất có thể bạn đang thiếu **chủ ngữ**; nếu sau chỗ trống là danh từ, có thể bạn đang cần **whose**.

## Tóm tắt nhanh
- Người + thiếu chủ ngữ -> \`who\`
- Vật -> \`which/that\`
- Sở hữu -> \`whose\`
- Địa điểm -> \`where\`
- Thời gian -> \`when\`
- Chọn theo **antecedent + vai trò thiếu**
`.trim(),
  examples: [
    {
      english: 'The consultant who leads the project will visit our office tomorrow.',
      vietnamese:
        'Antecedent là "consultant" (người), và chỗ trống là chủ ngữ của động từ "leads", nên dùng "who" theo mẫu "person + who + V".',
    },
    {
      english: 'The branch where we trained new employees opened last year.',
      vietnamese:
        'Antecedent là "branch" (địa điểm), và mệnh đề sau cần ý nơi chốn "ở đó chúng tôi đào tạo". Vì vậy dùng "where".',
    },
    {
      english: 'The manager whose signature appears on the contract is on leave today.',
      vietnamese:
        'Antecedent là "manager" (người), nhưng vai trò thiếu là sở hữu: chữ ký của người quản lý. Mẫu đúng là "whose + noun".',
    },
  ],
  exercises: [
    {
      id: 'gram-06-ex01',
      question: 'The employee _______ submitted the report made an error.',
      options: ['whom', 'which', 'who', 'whose'],
      correctAnswer: 2,
      explanation:
        'Antecedent là **employee**, tức người. Trong mệnh đề quan hệ, chỗ trống là **chủ ngữ** của động từ "submitted", nên phải dùng mẫu "person + who + V"; vì vậy đáp án đúng là **who**.',
    },
    {
      id: 'gram-06-ex02',
      question: 'The software _______ we installed yesterday is not working properly.',
      options: ['who', 'whose', 'whom', 'which'],
      correctAnswer: 3,
      explanation:
        'Antecedent là **software**, tức vật. Trong mệnh đề quan hệ, chỗ trống là **tân ngữ** của "installed" vì đã có chủ ngữ "we", nên cần đại từ cho vật theo mẫu "thing + which + clause"; đáp án là **which**.',
    },
    {
      id: 'gram-06-ex03',
      question: 'The manager _______ team won the award was very proud.',
      options: ['who', 'which', 'whose', 'whom'],
      correctAnswer: 2,
      explanation:
        'Antecedent là **manager**, tức người. Trong mệnh đề quan hệ, chỗ trống biểu thị **sở hữu** trước danh từ "team", nên phải dùng mẫu "person + whose + noun"; vì vậy chọn **whose**.',
    },
    {
      id: 'gram-06-ex04',
      question: 'The conference room _______ we hold our meetings needs renovation.',
      options: ['when', 'who', 'which', 'where'],
      correctAnswer: 3,
      explanation:
        'Antecedent là **conference room**, tức địa điểm. Trong mệnh đề quan hệ, phần còn thiếu là **vai trò nơi chốn** "ở đó chúng tôi họp", nên câu phù hợp với mẫu "place + where + S + V"; đáp án là **where**.',
    },
    {
      id: 'gram-06-ex05',
      question: 'I still remember the year _______ our company was founded.',
      options: ['where', 'which', 'whose', 'when'],
      correctAnswer: 3,
      explanation:
        'Antecedent là **year**, tức thời gian. Trong mệnh đề quan hệ, chỗ trống mang **vai trò thời gian** "vào năm đó công ty được thành lập", nên dùng mẫu "time + when + S + V"; vì vậy đáp án đúng là **when**.',
    },
  ],
}
