import { GrammarLesson } from '../../types'

export const partsOfSpeechLesson: GrammarLesson = {
  id: 'gram-01',
  title: 'Loại từ & Vị trí trong câu',
  order: 1,
  content: `
## Loại từ trong TOEIC Part 5

Trong Part 5, câu hỏi về **loại từ** (part of speech) thường kiểm tra xem bạn có nhận ra vai trò của từ trong câu hay không. Mấu chốt không chỉ là nhìn đuôi từ, mà là đọc **vị trí xung quanh chỗ trống**.

### 1) Noun (danh từ)
Danh từ chỉ người, vật, sự việc, ý tưởng.

**Dấu hiệu nhận biết**
- Đứng sau **a / an / the / this / that / these / those / my / our / their**
- Đứng sau **tính từ**: a successful ___, an important ___
- Đứng sau **giới từ**: in the ___, of the ___, for the ___
- Đứng trước **of + noun**: the ___ of the company

**Đuôi thường gặp**
- -tion / -sion, -ment, -ness, -ity, -ance / -ence, -ship, -hood

**Lưu ý**
Nếu thấy mẫu **article + blank + of**, khả năng rất cao blank cần danh từ.

### 2) Verb (động từ)
Động từ diễn tả hành động hoặc trạng thái.

**Dấu hiệu nhận biết**
- Đứng sau **chủ ngữ**: The manager ___
- Đứng sau **modal verbs**: can, should, must, will, may
- Đứng sau **to**: to ___, nhưng phải phân biệt với danh từ đuôi -tion
- Đứng sau **have / has / had / be** để tạo thì hoặc thể bị động

**Đuôi thường gặp**
- -ize, -ify, -ate, -en

**Lưu ý**
Đôi khi một từ vừa là danh từ vừa là động từ. Hãy đọc cấu trúc quanh chỗ trống thay vì đoán theo nghĩa quen thuộc.

### 3) Adjective (tính từ)
Tính từ mô tả danh từ.

**Dấu hiệu nhận biết**
- Đứng **trước danh từ**: a practical solution
- Đứng sau **linking verbs**: be, become, seem, look, feel, sound
- Đứng sau **too / very / quite / rather / extremely**

**Đuôi thường gặp**
- -ful, -ive, -ous, -able / -ible, -al, -ic, -ary, -ent

**Lưu ý**
Nhiều câu Part 5 kiểm tra cặp **adjective vs adverb**. Nếu từ cần bổ nghĩa cho danh từ thì chọn adjective; nếu bổ nghĩa cho động từ thì chọn adverb.

### 4) Adverb (trạng từ)
Trạng từ bổ nghĩa cho động từ, tính từ hoặc trạng từ khác.

**Dấu hiệu nhận biết**
- Đứng gần động từ: work efficiently
- Đứng trước tính từ: highly effective
- Đứng trước một trạng từ khác: very carefully
- Đôi khi đứng đầu câu để bổ nghĩa cả mệnh đề: Fortunately, ...

**Đuôi thường gặp**
- -ly là dấu hiệu mạnh nhất, nhưng không phải 100%.

**Lưu ý**
Một số từ có đuôi -ly nhưng không phải adverb (friendly, likely khi dùng như adjective). Vì vậy phải kiểm tra ngữ cảnh.

### TOEIC word-family traps
TOEIC rất thích bẫy theo **word family**: các từ cùng gốc nhưng khác loại từ.

- **success / succeed / successful / successfully**
  - success = noun
  - succeed = verb
  - successful = adjective
  - successfully = adverb
- **confidence / confident / confidently**
  - confidence = noun
  - confident = adjective
  - confidently = adverb
- **responsibility / responsible / responsibly**
  - responsibility = noun
  - responsible = adjective
  - responsibly = adverb
- **simplicity / simple / simplify / simply**
  - simplicity = noun
  - simple = adjective
  - simplify = verb
  - simply = adverb
- **economic / economical / economy / economically**
  - economy = noun
  - economic = adjective liên quan kinh tế
  - economical = adjective tiết kiệm
  - economically = adverb

Khi gặp bẫy này, đừng chỉ dịch nghĩa. Hãy hỏi: **từ đó đang đóng vai trò gì trong câu?**

### Quick checklist cho Part 5
Trước khi chọn đáp án, hãy tự hỏi 4 câu sau:
1. Chỗ trống đứng **sau** từ loại nào?
2. Chỗ trống đứng **trước** từ loại nào?
3. Từ cần điền có đang bổ nghĩa cho **noun / verb / adjective / adverb** không?
4. Có phải đây là **word-family trap** không?

### Quy tắc chốt nhanh
- Sau **article + adjective** → thường là **noun**
- Trước **noun** → thường là **adjective**
- Sau **subject / modal / to** → thường là **verb**
- Bổ nghĩa cho **verb / adjective / adverb** → thường là **adverb**

Nếu còn phân vân, hãy quay lại **vị trí của blank** và đọc cả cụm từ thay vì nhìn một từ đơn lẻ.
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
      question: 'The manager gave a _______ answer to the client.',
      options: ['quick', 'quickly', 'quicken', 'quickness'],
      correctAnswer: 0,
      explanation: 'Trước danh từ "answer" cần tính từ. "quick" là adjective mô tả danh từ.',
    },
    {
      id: 'gram-01-ex04',
      question: 'The policy was _______ updated after the meeting.',
      options: ['recent', 'recently', 'recentness', 'recenter'],
      correctAnswer: 1,
      explanation: 'Bổ nghĩa cho động từ "updated" cần trạng từ. "recently" là adverb.',
    },
    {
      id: 'gram-01-ex05',
      question: 'The proposal was _______ reviewed before submission.',
      options: ['careful', 'carefully', 'carefulness', 'care'],
      correctAnswer: 1,
      explanation: 'Sau động từ bị động "was" cần trạng từ bổ nghĩa cho cả cụm "reviewed". "carefully" là adverb, còn "careful" là adjective.',
    },
  ],
}
