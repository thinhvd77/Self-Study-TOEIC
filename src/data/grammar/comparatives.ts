import { GrammarLesson } from '../../types'

export const comparativesLesson: GrammarLesson = {
  id: 'gram-07',
  title: 'So sánh (Comparatives & Superlatives)',
  order: 7,
  content: `
## So sánh (Comparatives & Superlatives)

Trong TOEIC Part 5, bạn thường gặp câu hỏi yêu cầu chọn **dạng so sánh đúng** của tính từ hoặc trạng từ. Nắm rõ quy tắc so sánh giúp bạn xử lý nhanh và chính xác.

### 1. So sánh hơn (Comparative)

So sánh hơn dùng để so sánh **hai đối tượng** với nhau. Cấu trúc phụ thuộc vào số âm tiết của tính từ:

**Tính từ ngắn (1-2 âm tiết):** thêm **-er** + **than**
- cheap → **cheaper than** (rẻ hơn)
- fast → **faster than** (nhanh hơn)
- big → **bigger than** (lớn hơn) *(nhân đôi phụ âm cuối trước khi thêm -er)*
- simple → **simpler than** (đơn giản hơn)

**Tính từ dài (3+ âm tiết):** dùng **more** + tính từ + **than**
- expensive → **more expensive than** (đắt hơn)
- efficient → **more efficient than** (hiệu quả hơn)
- important → **more important than** (quan trọng hơn)

### 2. So sánh nhất (Superlative)

So sánh nhất dùng khi so sánh **một đối tượng với toàn bộ nhóm**. Luôn dùng **the** phía trước:

**Tính từ ngắn:** **the** + tính từ + **-est**
- cheap → **the cheapest** (rẻ nhất)
- fast → **the fastest** (nhanh nhất)
- big → **the biggest** (lớn nhất)

**Tính từ dài:** **the most** + tính từ
- expensive → **the most expensive** (đắt nhất)
- efficient → **the most efficient** (hiệu quả nhất)
- important → **the most important** (quan trọng nhất)

### 3. Dạng bất quy tắc (Irregular Forms)

Một số tính từ phổ biến có dạng so sánh đặc biệt, cần học thuộc:

| Gốc | So sánh hơn | So sánh nhất |
|-----|-------------|--------------|
| good (tốt) | better | best |
| bad (tệ) | worse | worst |
| far (xa) | farther / further | farthest / furthest |
| many/much (nhiều) | more | most |
| little (ít) | less | least |

### 4. So sánh bằng (Equal Comparison)

Dùng cấu trúc **as + tính từ + as** để diễn đạt hai thứ bằng nhau:
- "The new model is **as efficient as** the old one." (hiệu quả như nhau)
- "This branch is **as profitable as** last year." (lợi nhuận như năm trước)

Phủ định: **not as + tính từ + as** (không bằng)
- "This product is **not as popular as** the previous version."

### 5. So sánh kép (Double Comparative)

Cấu trúc **the + comparative..., the + comparative** diễn đạt mối quan hệ tỉ lệ thuận:
- "**The more** you practice, **the better** your score will be."
- "**The larger** the order, **the cheaper** the unit price."

### ⚠️ Mẹo TOEIC quan trọng

1. **Đếm âm tiết** trước khi chọn: 1-2 âm tiết → thêm **-er/-est**; 3+ âm tiết → **more/most**
2. **So sánh hơn luôn cần "than"**: "This report is *more detailed* ~~as~~ **than** the previous one."
3. **So sánh nhất luôn cần "the"**: "She is **the most** experienced employee." (không bỏ "the")
4. **Không dùng cả hai dạng cùng lúc**: ~~more faster~~ → chỉ dùng **faster**; ~~more better~~ → chỉ dùng **better**
5. Nếu gặp **good/bad**, hãy nhớ ngay: better/best và worse/worst
  `.trim(),
  examples: [
    {
      english: 'This laptop is more expensive than the one we bought last year.',
      vietnamese: '"Expensive" có 3 âm tiết → dùng "more...than" (so sánh hơn): **more expensive than**. Không dùng "expensiver".',
    },
    {
      english: 'Ms. Kim is the most qualified candidate for the position.',
      vietnamese: '"Qualified" có 3 âm tiết → so sánh nhất dùng "the most": **the most qualified**. Luôn nhớ có "the" phía trước.',
    },
    {
      english: 'The new office is as large as the old headquarters.',
      vietnamese: 'Hai văn phòng có diện tích bằng nhau → dùng cấu trúc **as + adj + as**: "as large as". Đây là so sánh bằng.',
    },
  ],
  exercises: [
    {
      id: 'gram-07-ex01',
      question: 'Our new product is _______ the competitor\'s version.',
      options: ['more reliable than', 'more reliable as', 'reliably than', 'the most reliable than'],
      correctAnswer: 0,
      explanation: '"Reliable" có 3 âm tiết → so sánh hơn dùng "more + adj + than": **more reliable than**. Không dùng "as" sau comparative; "than" mới đúng.',
    },
    {
      id: 'gram-07-ex02',
      question: 'She is the _______ employee in the entire department.',
      options: ['most experienced', 'more experienced', 'experienceder', 'much experienced'],
      correctAnswer: 0,
      explanation: 'So sánh nhất (trong toàn bộ phòng ban) + "experienced" có 4 âm tiết → dùng "the most experienced". Không dùng "more" cho so sánh nhất.',
    },
    {
      id: 'gram-07-ex03',
      question: 'This quarter\'s results are _______ last quarter\'s.',
      options: ['better than', 'gooder than', 'more good than', 'best than'],
      correctAnswer: 0,
      explanation: '"Good" có dạng bất quy tắc: good → **better** → best. So sánh hơn của "good" là "better than". Không dùng "gooder" hay "more good".',
    },
    {
      id: 'gram-07-ex04',
      question: 'The new software is _______ the manual system we used before.',
      options: ['as efficient as', 'as efficiently as', 'more efficient as', 'the most efficient than'],
      correctAnswer: 0,
      explanation: 'Cấu trúc so sánh bằng: **as + tính từ + as**. "Efficient" là tính từ (không dùng "efficiently"). Cần "as...as", không phải "more...as" hay "the most...than".',
    },
    {
      id: 'gram-07-ex05',
      question: '_______ the order quantity, _______ the discount rate.',
      options: ['The larger / the higher', 'The large / the high', 'Larger / higher', 'The largest / the highest'],
      correctAnswer: 0,
      explanation: 'Cấu trúc so sánh kép: **the + comparative..., the + comparative**. Dùng "the larger...the higher" để diễn đạt "đơn hàng càng lớn, chiết khấu càng cao". Phải có "the" và dạng so sánh hơn.',
    },
    {
      id: 'gram-07-ex06',
      question: 'The new office is far _______ the old one in terms of location and amenities.',
      options: ['superior than', 'superior to', 'more superior to', 'superior as'],
      correctAnswer: 1,
      explanation: '"Superior to" là cụm tính từ cố định (vượt trội hơn). Không dùng "superior than" hay "more superior". "Superior" là tính từ có sẵn so sánh, không cần "more".',
    },
    {
      id: 'gram-07-ex07',
      question: 'Her sales performance this year is _______ impressive _______ last year\'s.',
      options: ['more / as', 'more / than', 'as / as', 'much / than'],
      correctAnswer: 1,
      explanation: '"More impressive than" là so sánh hơn (kém thiên vệ). "More...than" là cấu trúc so sánh, không dùng "as...as" hay "much...than".',
    },
    {
      id: 'gram-07-ex08',
      question: 'Of all the proposed solutions, this approach seems the _______ feasible.',
      options: ['more', 'most', 'very', 'so'],
      correctAnswer: 1,
      explanation: '"The most feasible" = so sánh nhất (khả thi nhất). Sau "the" dùng "most" (dạng so sánh nhất), không dùng "more" (so sánh hơn).',
    },
    {
      id: 'gram-07-ex09',
      question: 'The product quality is _______ important _______ the price when making purchasing decisions.',
      options: ['more / as', 'much / than', 'as / as', 'more / than'],
      correctAnswer: 3,
      explanation: '"More important than" để so sánh chất lượng sản phẩm với giá tiền. "More...than" là cấu trúc so sánh hơn.',
    },
    {
      id: 'gram-07-ex10',
      question: 'His analysis was _______ detailed and thorough _______ anyone expected.',
      options: ['as / as', 'more / than', 'very / than', 'much / as'],
      correctAnswer: 1,
      explanation: '"More detailed and thorough than anyone expected" = chi tiết và kỹ lưỡng hơn mong đợi. Dùng "more...than" để so sánh, có thể nhấn mạnh hai tính từ cùng lúc.',
    },
  ],
}
