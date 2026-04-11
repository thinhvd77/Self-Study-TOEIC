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
    {
      id: 'gram-01-ex06',
      question: 'The _______ of our employees has increased this year.',
      options: ['efficient', 'efficiency', 'efficiently', 'efficacy'],
      correctAnswer: 1,
      explanation:
        'Dấu hiệu trong câu là mẫu "The ___ of" luôn yêu cầu noun để làm chủ ngữ. "efficiency" đúng vì là danh từ chỉ tính chất; "efficient" là adjective, "efficiently" là adverb, còn "efficacy" không phù hợp với ngữ cảnh công ty nên không thể dùng đây.',
    },
    {
      id: 'gram-01-ex07',
      question: 'The new software will help managers make _______ decisions.',
      options: ['effective', 'effectively', 'effect', 'effectiveness'],
      correctAnswer: 0,
      explanation:
        'Dấu hiệu trong câu là chỗ trống đứng ngay trước noun "decisions", nên cần adjective bổ nghĩa cho danh từ. "effective" đúng vì là tính từ; "effectively" là adverb không thể đứng trước noun, "effect" là noun, còn "effectiveness" là noun nên cũng không phù hợp ở vị trí này.',
    },
    {
      id: 'gram-01-ex08',
      question: 'We must _______ our current budget to cover additional expenses.',
      options: ['adjustment', 'adjust', 'adjustable', 'adjusted'],
      correctAnswer: 1,
      explanation:
        'Dấu hiệu trong câu là sau modal verb "must", nên chỗ trống phải là verb nguyên mẫu. "adjust" đúng vì là động từ; "adjustment" là noun, "adjustable" là adjective, còn "adjusted" là quá khứ phân từ nên cả ba lựa chọn này đều sai sau "must".',
    },
    {
      id: 'gram-01-ex09',
      question: 'The company implemented a _______ plan to reduce costs.',
      options: ['comprehensively', 'comprehensive', 'comprehension', 'comprehend'],
      correctAnswer: 1,
      explanation:
        'Dấu hiệu trong câu là chỗ trống đứng trước noun "plan", nên cần adjective để bổ nghĩa cho danh từ. "comprehensive" đúng vì là tính từ; "comprehensively" là adverb không thể đứng trước noun, "comprehension" là noun, còn "comprehend" là verb nên không phù hợp ở vị trí này.',
    },
    {
      id: 'gram-01-ex10',
      question: 'The _______ between the two proposals was clearly analyzed.',
      options: ['distinguish', 'distinct', 'distinction', 'distinctly'],
      correctAnswer: 2,
      explanation:
        'Dấu hiệu trong câu là mẫu "The ___ between" luôn cần noun để làm chủ ngữ của mệnh đề. "distinction" đúng vì là danh từ chỉ sự khác biệt; "distinguish" là verb, "distinct" là adjective, còn "distinctly" là adverb nên ba lựa chọn này không thể đứng sau "The" và trước "between".',
    },
  ],
}
