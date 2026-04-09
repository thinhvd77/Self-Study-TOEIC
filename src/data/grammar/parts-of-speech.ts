import { GrammarLesson } from '../../types'

export const partsOfSpeechLesson: GrammarLesson = {
  id: 'gram-01',
  title: 'Loại từ & Vị trí trong câu',
  order: 1,
  content: `
## Mục tiêu bài học
- Nhận ra chỗ trống đang cần noun, verb, adjective hay adverb.
- Loại đáp án nhanh bằng vị trí và hậu tố trong TOEIC Part 5.

## Khái niệm cốt lõi
Loại từ là vai trò của một từ trong câu. Trong Part 5, đề thường không hỏi nghĩa khó mà hỏi xem chỗ trống đang cần "danh từ, động từ, tính từ hay trạng từ".

## Cách nhận diện trong câu
- Sau mạo từ (\`a/an/the\`) thường cần noun.
- Trước noun thường cần adjective.
- Bổ nghĩa cho verb thường cần adverb.
- Sau trợ động từ, \`to\`, hoặc sau chủ ngữ thường cần verb.
- Hậu tố hay gặp: \`-tion/-ment\` (noun), \`-ive/-ous/-al\` (adjective), \`-ly\` (adverb), \`-ize/-ate\` (verb).

## Công thức/mẫu cần nhớ
- \`the + noun\`
- \`be + adjective\`
- \`verb + adverb\`
- \`to + verb\`
- \`adjective + noun\`

## Lỗi thường gặp
- Thấy từ có nghĩa quen nhưng quên kiểm tra vị trí trong câu.
- Chọn adjective thay vì adverb vì hai từ cùng họ từ.
- Chọn noun sau \`to\` dù sau \`to\` phải là verb nguyên mẫu.

## Mẹo làm TOEIC Part 5
Nhìn ngay từ đứng trước và sau chỗ trống trước khi đọc nghĩa. Nếu xác định đúng vị trí ngữ pháp, bạn thường loại được 2-3 đáp án trong vài giây.

## Tóm tắt nhanh
- Trước noun -> adjective
- Sau mạo từ -> noun
- Bổ nghĩa verb -> adverb
- Sau \`to\` / trợ động từ -> verb
`.trim(),
  examples: [
    {
      english: 'The ___ report was sent to the client this morning.',
      vietnamese:
        'Sau "The" và trước "report" cần một tính từ bổ nghĩa cho danh từ, nên phải chọn dạng adjective.',
    },
    {
      english: 'Our team responded ___ to the customer complaint.',
      vietnamese:
        'Từ cần điền bổ nghĩa cho động từ "responded", nên phải tìm trạng từ chứ không phải tính từ hay danh từ.',
    },
    {
      english: 'The manager decided to ___ the policy immediately.',
      vietnamese:
        'Sau "to" luôn cần động từ nguyên mẫu, đây là cách loại đáp án rất nhanh trong Part 5.',
    },
  ],
  exercises: [
    {
      id: 'gram-01-ex01',
      question: 'The _______ of the new software took several months.',
      options: ['develop', 'development', 'developing', 'developer'],
      correctAnswer: 1,
      explanation:
        'Dấu hiệu trong câu là sau "The" và trước "of" nên chỗ trống cần noun. "development" đúng vì là danh từ chỉ quá trình phát triển; "develop" là verb, "developing" là V-ing, còn "developer" chỉ người phát triển nên sai nghĩa vị trí.',
    },
    {
      id: 'gram-01-ex02',
      question: 'Our team worked _______ to meet the deadline.',
      options: ['diligent', 'diligence', 'diligently', 'diligentness'],
      correctAnswer: 2,
      explanation:
        'Dấu hiệu trong câu là từ đứng sau động từ "worked", nên cần một adverb để bổ nghĩa cho verb. "diligently" đúng vì là trạng từ; "diligent" là adjective, "diligence" là noun, còn "diligentness" không phải dạng từ chuẩn trong tiếng Anh nên cũng không thể là đáp án đúng.',
    },
    {
      id: 'gram-01-ex03',
      question: 'The report contains _______ information about the market.',
      options: ['value', 'valuable', 'valuably', 'valuation'],
      correctAnswer: 1,
      explanation:
        'Dấu hiệu trong câu là chỗ trống đứng ngay trước noun "information", nên phải chọn adjective. "valuable" đúng vì là tính từ bổ nghĩa cho danh từ; "value" và "valuation" là noun, còn "valuably" là adverb nên không thể đứng trước noun ở đây.',
    },
    {
      id: 'gram-01-ex04',
      question: 'We need to _______ the process to save time.',
      options: ['simplification', 'simple', 'simplify', 'simply'],
      correctAnswer: 2,
      explanation:
        'Dấu hiệu trong câu là sau "to", nên chỗ trống phải là verb nguyên mẫu. "simplify" đúng vì là động từ; "simplification" là noun, "simple" là adjective, còn "simply" là adverb nên ba lựa chọn này đều sai sau "to".',
    },
    {
      id: 'gram-01-ex05',
      question: 'Customer _______ is our top priority.',
      options: ['satisfy', 'satisfactory', 'satisfaction', 'satisfactorily'],
      correctAnswer: 2,
      explanation:
        'Dấu hiệu trong câu là cụm "Customer ___" đứng làm chủ ngữ trước "is", nên cần noun. "satisfaction" đúng vì là danh từ; "satisfy" là verb, "satisfactory" là adjective, còn "satisfactorily" là adverb nên không thể làm trung tâm của cụm chủ ngữ.',
    },
  ],
}
