import { GrammarLesson } from '../../types'

export const partsOfSpeechLesson: GrammarLesson = {
  id: 'gram-01',
  title: 'Loại từ & Vị trí trong câu',
  order: 1,
  content: `
## Loại từ trong tiếng Anh

Trong TOEIC Part 5, bạn thường gặp câu hỏi yêu cầu chọn đúng **loại từ** (part of speech) để điền vào chỗ trống.

### 4 loại từ chính:

**1. Noun (Danh từ)** - chỉ người, vật, sự việc
- Vị trí: sau mạo từ (a/an/the), sau tính từ, sau giới từ
- Đuôi thường gặp: -tion, -ment, -ness, -ity, -ance/-ence

**2. Verb (Động từ)** - chỉ hành động, trạng thái
- Vị trí: sau chủ ngữ, sau trợ động từ (will, can, must, have)
- Đuôi thường gặp: -ize, -ify, -ate

**3. Adjective (Tính từ)** - mô tả danh từ
- Vị trí: trước danh từ, sau "be/become/seem"
- Đuôi thường gặp: -ful, -ive, -ous, -able, -al

**4. Adverb (Trạng từ)** - bổ nghĩa cho động từ, tính từ, trạng từ khác
- Vị trí: trước/sau động từ, trước tính từ
- Đuôi thường gặp: -ly

### Mẹo: Nhìn vị trí trong câu để xác định loại từ cần điền!
  `.trim(),
  examples: [
    {
      english: 'The _______ of the project was completed on time. (completion)',
      vietnamese: 'Sau "The" và trước "of" → cần NOUN → completion',
    },
    {
      english: 'She works _______. (efficiently)',
      vietnamese: 'Bổ nghĩa cho động từ "works" → cần ADVERB → efficiently',
    },
    {
      english: 'This is a _______ solution. (practical)',
      vietnamese: 'Trước danh từ "solution" → cần ADJECTIVE → practical',
    },
  ],
  exercises: [
    {
      id: 'gram-01-ex01',
      question: 'The _______ of the new software took several months.',
      options: ['develop', 'development', 'developing', 'developer'],
      correctAnswer: 1,
      explanation: 'Sau "The" và trước "of" cần danh từ. "development" là noun chỉ sự phát triển.',
    },
    {
      id: 'gram-01-ex02',
      question: 'Our team worked _______ to meet the deadline.',
      options: ['diligent', 'diligence', 'diligently', 'diligentness'],
      correctAnswer: 2,
      explanation: 'Cần trạng từ bổ nghĩa cho động từ "worked". "diligently" là adverb.',
    },
    {
      id: 'gram-01-ex03',
      question: 'The report contains _______ information about the market.',
      options: ['value', 'valuable', 'valuably', 'valuation'],
      correctAnswer: 1,
      explanation: 'Trước danh từ "information" cần tính từ. "valuable" là adjective = có giá trị.',
    },
    {
      id: 'gram-01-ex04',
      question: 'We need to _______ the process to save time.',
      options: ['simplification', 'simple', 'simplify', 'simply'],
      correctAnswer: 2,
      explanation: 'Sau "to" cần động từ nguyên mẫu. "simplify" là verb = đơn giản hóa.',
    },
    {
      id: 'gram-01-ex05',
      question: 'Customer _______ is our top priority.',
      options: ['satisfy', 'satisfactory', 'satisfaction', 'satisfactorily'],
      correctAnswer: 2,
      explanation: 'Vị trí chủ ngữ trước "is" cần danh từ. "satisfaction" là noun = sự hài lòng.',
    },
  ],
}
