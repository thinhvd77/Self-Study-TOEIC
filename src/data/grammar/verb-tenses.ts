import { GrammarLesson } from '../../types'

export const verbTensesLesson: GrammarLesson = {
  id: 'gram-02',
  title: 'Thì động từ (English Tenses)',
  order: 2,
  content: `
## Thì động từ (English Tenses)

Trong TOEIC Part 5, bạn thường gặp câu hỏi yêu cầu chọn **thì động từ** đúng để điền vào chỗ trống. Việc nắm rõ khi nào dùng thì nào là rất quan trọng.

### Những tín hiệu thời gian (Time Signals) giúp xác định thì

Đó là chìa khóa để chọn đúng thì trong TOEIC Part 5. Hãy nhìn vào các từ chỉ thời gian trong câu:
- **Since** (kể từ): Present Perfect
- **For** (trong vòng): Present Perfect
- **Ago** (cách đây): Past Simple
- **Yesterday, last week, last month**: Past Simple
- **Now, currently, at the moment**: Present Continuous
- **Every day, usually, often**: Present Simple
- **By + time**: Future Perfect (sẽ hoàn thành)
- **Already**: Present Perfect
- **Just**: Present Perfect
- **Yet**: Present Perfect (trong câu phủ định/câu hỏi)

### 3 nhóm thời gian chính

**1. Hiện tại (Present)**

**Present Simple** - Sự thật, thói quen, hành động lặp lại
- Cấu trúc: động từ nguyên mẫu (chia 3 ngôi số ít)
- Ví dụ: "The company produces high-quality products." (sự thật về công ty)
- TOEIC: "Our team meets every Friday." → thói quen

**Present Continuous** - Hành động đang xảy ra ngay bây giờ hoặc trong giai đoạn hiện tại
- Cấu trúc: am/is/are + verb-ing
- Ví dụ: "We are developing a new software." (đang làm bây giờ)
- TOEIC: "The project is progressing well." → tình hình hiện tại

**Present Perfect** - Hành động bắt đầu từ quá khứ, còn ảnh hưởng đến hiện tại
- Cấu trúc: have/has + past participle
- Ví dụ: "She has worked here for 5 years." (từ 5 năm trước đến bây giờ)
- TOEIC: "We have completed three projects this quarter." → thành tích cho đến hiện tại

**2. Quá khứ (Past)**

**Past Simple** - Hành động đã hoàn thành trong quá khứ tại một thời điểm xác định
- Cấu trúc: động từ + -ed (hoặc bất quy tắc)
- Ví dụ: "They finished the project last month." (đã xong lâu rồi)
- TOEIC: "The company relocated in 2015." → sự kiện cụ thể trong quá khứ

**Past Continuous** - Hành động đang xảy ra tại một thời điểm xác định trong quá khứ
- Cấu trúc: was/were + verb-ing
- Ví dụ: "While he was presenting, the client interrupted." (đang thuyết trình rồi bị gián đoạn)
- TOEIC: "We were reviewing the proposal when the deadline changed." → bối cảnh quá khứ

**Past Perfect** - Hành động xảy ra trước một hành động quá khứ khác
- Cấu trúc: had + past participle
- Ví dụ: "By the time she arrived, he had left." (anh ấy đi trước em ấy đến)
- TOEIC: "When the CEO arrived, we had prepared the documents." → thứ tự các hành động

**3. Tương lai (Future)**

**Future Simple (will)** - Dự đoán, quyết định tức thời, lời hứa
- Cấu trúc: will + base verb
- Ví dụ: "We will meet you tomorrow." (lời hứa)
- TOEIC: "The new product will launch next quarter." (dự đoán)

**Future with "going to"** - Kế hoạch đã có sẵn, dự đoán dựa trên dấu hiệu hiện tại
- Cấu trúc: am/is/are + going to + base verb
- Ví dụ: "It's going to rain soon." (nhìn thấy đám mây rồi)
- TOEIC: "We are going to expand into three new markets." (kế hoạch cụ thể)

### ⚠️ Mẹo TOEIC quan trọng nhất

**Phân biệt Present Perfect vs Past Simple** - Đây là lỗi phổ biến nhất!
- **Present Perfect** (have + past participle): Từ quá khứ ĐẾN HIỆN TẠI (vẫn còn liên quan)
  - "I have worked here since 2015" (từ 2015 đến bây giờ, vẫn làm)
- **Past Simple** (verb-ed): Quá khứ, kết thúc rồi, KHÔNG liên quan hiện tại
  - "I worked there in 2015" (làm vào năm 2015, bây giờ không làm nữa)

Quy tắc: Nếu thấy "since" hoặc "for", hầu như 100% dùng **Present Perfect**!
  `.trim(),
  examples: [
    {
      english: 'The team _______ on this project since January.',
      vietnamese: 'Từ "since January" chỉ khoảng thời gian từ quá khứ đến hiện tại → hành động vẫn đang diễn ra. Cần Present Perfect: **has been working**',
    },
    {
      english: 'When the meeting started, the manager _______ the slides.',
      vietnamese: 'Hành động "chuẩn bị slides" xảy ra TRƯỚC khi "cuộc họp bắt đầu" (một hành động quá khứ khác) → Past Perfect: **had prepared**',
    },
    {
      english: 'By next year, our company _______ five new branches.',
      vietnamese: '"By next year" chỉ một thời điểm trong tương lai, hành động sẽ HOÀN THÀNH vào lúc đó → Future Perfect: **will have opened**',
    },
  ],
  exercises: [
    {
      id: 'gram-02-ex01',
      question: 'The company _______ its services to Southeast Asia since 2015.',
      options: ['expands', 'has expanded', 'expanded', 'will expand'],
      correctAnswer: 1,
      explanation: '"Since 2015" (khoảng thời gian từ quá khứ đến hiện tại) → Present Perfect: **has expanded**. Đây là hành động bắt đầu từ 2015 và vẫn tiếp tục đến bây giờ.',
    },
    {
      id: 'gram-02-ex02',
      question: 'While we _______ the new software, the system crashed.',
      options: ['install', 'were installing', 'installed', 'have installed'],
      correctAnswer: 1,
      explanation: '"While" + hành động đang xảy ra khi một hành động khác xảy ra (hệ thống crash) → Past Continuous: **were installing**. Chỉ ra hoạt động đang diễn ra trong quá khứ.',
    },
    {
      id: 'gram-02-ex03',
      question: 'By the time you arrive, I _______ the report.',
      options: ['finish', 'have finished', 'will have finished', 'am finishing'],
      correctAnswer: 2,
      explanation: '"By the time" + thời điểm tương lai → hành động sẽ hoàn thành trước thời điểm đó → Future Perfect: **will have finished**. Chỉ ra cái gì sẽ hoàn thành trước khi bạn đến.',
    },
    {
      id: 'gram-02-ex04',
      question: 'The conference _______ place next month.',
      options: ['will take', 'takes', 'is taking', 'has taken'],
      correctAnswer: 0,
      explanation: '"Next month" (tương lai) và không có kế hoạch cụ thể (hoặc đơn thuần là dự đoán/tuyên bố) → Future Simple: **will take**. Dùng "will" cho tuyên bố sự kiện tương lai.',
    },
    {
      id: 'gram-02-ex05',
      question: 'Sales _______ significantly since we introduced the new product.',
      options: ['increase', 'increased', 'have increased', 'were increasing'],
      correctAnswer: 2,
      explanation: '"Since we introduced" (quá khứ) so sánh với hiện tại (bây giờ sales vẫn cao) → Present Perfect: **have increased**. Hành động bắt đầu từ quá khứ, kéo dài đến hiện tại, nên dùng present perfect.',
    },
  ],
}
