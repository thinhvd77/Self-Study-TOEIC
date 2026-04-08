# TOEIC Self-Study Web App - Design Spec

## Context

App luyện thi TOEIC cá nhân cho một người dùng duy nhất, trình độ hiện tại dưới 400, mục tiêu đạt 550+ trong 4 tháng. App tập trung vào cả Listening và Reading, với nội dung được tổ chức sẵn dưới dạng JSON tĩnh từ các nguồn tài liệu chất lượng trên internet.

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State**: React Context + useReducer
- **Storage**: LocalStorage (lưu tiến độ, kết quả, settings)
- **Data**: JSON files tĩnh trong project
- **Charts**: Recharts (cho biểu đồ tiến độ)

## Cấu trúc thư mục

```
src/
├── components/           # UI components dùng chung
│   ├── Layout.tsx        # Layout chính (sidebar + content)
│   ├── Timer.tsx         # Đồng hồ đếm ngược
│   ├── AudioPlayer.tsx   # Player cho Listening
│   ├── QuestionCard.tsx  # Hiển thị câu hỏi trắc nghiệm
│   ├── Flashcard.tsx     # Thẻ flashcard từ vựng
│   └── ProgressBar.tsx   # Thanh tiến độ
├── pages/
│   ├── Dashboard/        # Trang chủ: tổng quan + lộ trình
│   ├── Practice/         # Luyện đề thi (Part 1-7)
│   ├── Vocabulary/       # Học từ vựng flashcard
│   └── Grammar/          # Bài học ngữ pháp + bài tập
├── data/                 # JSON files chứa nội dung
│   ├── tests/            # Đề thi theo Part
│   ├── vocabulary/       # Từ vựng theo chủ đề
│   ├── grammar/          # Bài học ngữ pháp
│   └── roadmap.json      # Lộ trình 4 tháng
├── hooks/                # Custom hooks
│   ├── useLocalStorage.ts
│   ├── useTimer.ts
│   └── useSpacedRepetition.ts
├── context/              # React Context
│   └── AppContext.tsx     # Global state (tiến độ, settings)
├── utils/                # Helper functions
│   └── scoring.ts        # Tính điểm TOEIC
├── types/                # TypeScript types
│   └── index.ts
public/
└── audio/                # File audio cho Listening
```

## 4 Route chính

| Route | Trang | Mô tả |
|-------|-------|-------|
| `/` | Dashboard | Tổng quan tiến độ, lộ trình, thống kê |
| `/practice` | Practice | Chọn Part/chế độ luyện tập |
| `/vocabulary` | Vocabulary | Học từ vựng theo chủ đề |
| `/grammar` | Grammar | Bài học ngữ pháp + bài tập |

## Tính năng 1: Luyện đề thi (Practice)

### Cấu trúc đề TOEIC

**Listening (Part 1-4)**:
- Part 1: Mô tả hình ảnh (6 câu) - Nghe + chọn mô tả đúng
- Part 2: Hỏi đáp (25 câu) - Nghe câu hỏi + chọn câu trả lời
- Part 3: Hội thoại (39 câu) - Nghe hội thoại + trả lời 3 câu/đoạn
- Part 4: Bài nói ngắn (30 câu) - Nghe bài nói + trả lời 3 câu/đoạn

**Reading (Part 5-7)**:
- Part 5: Điền câu (30 câu) - Chọn từ/cụm từ đúng
- Part 6: Điền đoạn (16 câu) - Điền vào đoạn văn
- Part 7: Đọc hiểu (54 câu) - Đọc passage + trả lời câu hỏi

### Chế độ luyện tập

1. **Luyện theo Part**: Chọn Part cụ thể, làm từng bộ câu hỏi
2. **Mini Test**: Bộ đề rút gọn (~30 phút, mix các Part)
3. **Full Test**: Mô phỏng đề thi thật (120 phút, 200 câu)

### Tính năng trong khi làm bài

- Đồng hồ đếm ngược (có thể tắt khi luyện theo Part)
- Đánh dấu câu chưa chắc (bookmark) để xem lại
- Navigation panel: xem tổng quan câu đã làm/chưa làm
- Audio player cho Listening: play/pause, điều chỉnh tốc độ

### Sau khi hoàn thành

- Điểm số tổng + phân tích theo từng Part
- Xem lại từng câu: đáp án đúng, đáp án đã chọn, giải thích
- Lưu kết quả vào lịch sử

### Data format cho câu hỏi

```typescript
interface Question {
  id: string;
  part: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  type: 'listening' | 'reading';
  audioUrl?: string;        // Part 1-4
  imageUrl?: string;        // Part 1
  passage?: string;         // Part 6-7
  question: string;
  options: string[];        // 4 lựa chọn A-D
  correctAnswer: number;    // index 0-3
  explanation: string;      // Giải thích đáp án
  groupId?: string;         // Nhóm câu hỏi (Part 3,4,6,7)
}

interface TestResult {
  id: string;
  date: string;
  mode: 'part' | 'mini' | 'full';
  part?: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;        // seconds
  answers: { questionId: string; selected: number; correct: boolean }[];
}
```

## Tính năng 2: Học Từ vựng (Vocabulary)

### Chủ đề từ vựng TOEIC

- Business (hợp đồng, đàm phán, marketing)
- Office (thiết bị, cuộc họp, email)
- Finance (ngân hàng, thuế, đầu tư)
- Travel (sân bay, khách sạn, giao thông)
- Health (bệnh viện, bảo hiểm y tế)
- Technology (phần mềm, internet, thiết bị)
- HR (tuyển dụng, đào tạo, lương)
- Manufacturing (sản xuất, kho hàng, vận chuyển)

### Data format cho từ vựng

```typescript
interface VocabularyWord {
  id: string;
  word: string;
  ipa: string;              // Phiên âm IPA
  meaning: string;          // Nghĩa tiếng Việt
  partOfSpeech: string;     // noun, verb, adj, adv
  example: string;          // Câu ví dụ ngữ cảnh TOEIC
  synonyms?: string[];
  antonyms?: string[];
  topic: string;            // Chủ đề
}

interface VocabularyProgress {
  wordId: string;
  level: number;            // 0-5 (SM-2 level)
  nextReview: string;       // ISO date
  lastReviewed: string;
  correctCount: number;
  incorrectCount: number;
}
```

### Chế độ học

1. **Flashcard**: Hiển thị từ tiếng Anh, lật để xem nghĩa. Đánh giá: "Chưa biết" / "Hơi biết" / "Biết rồi" (mapping sang SM-2 quality 1/3/5)
2. **Spaced Repetition**: Thuật toán SM-2 đơn giản. Từ đánh giá thấp sẽ xuất hiện lại sớm hơn
3. **Quiz**: Trắc nghiệm 4 đáp án - chọn nghĩa đúng hoặc điền từ vào chỗ trống

### Theo dõi

- Tổng số từ đã học / tổng số từ
- Số từ cần ôn hôm nay
- Tỷ lệ nhớ (% từ ở level >= 3)

## Tính năng 3: Học Ngữ pháp (Grammar)

### Chủ đề ngữ pháp (ưu tiên cho 550+)

1. Loại từ & vị trí trong câu (noun, verb, adj, adv)
2. Thì động từ (present, past, future, perfect)
3. Câu bị động (passive voice)
4. Liên từ & từ nối (and, but, however, therefore)
5. Giới từ (in, on, at, by, for)
6. Đại từ quan hệ (who, which, that)
7. So sánh (comparative, superlative)
8. Câu điều kiện (if clauses)

### Data format cho bài học

```typescript
interface GrammarLesson {
  id: string;
  title: string;
  order: number;            // Thứ tự bài học
  content: string;          // Nội dung bài học (HTML hoặc Markdown)
  examples: { english: string; vietnamese: string }[];
  exercises: GrammarExercise[];
}

interface GrammarExercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface GrammarProgress {
  lessonId: string;
  completed: boolean;
  exerciseScore: number;    // % đúng
  lastStudied: string;
}
```

### Cấu trúc mỗi bài học

- Giải thích ngữ pháp ngắn gọn (tiếng Việt)
- Ví dụ minh họa trong ngữ cảnh TOEIC
- Bài tập trắc nghiệm 10-15 câu
- Xem đáp án + giải thích chi tiết

## Tính năng 4: Lộ trình 4 tháng (Dashboard)

### 4 giai đoạn

| Giai đoạn | Tuần | Mục tiêu | Trọng tâm |
|-----------|------|----------|-----------|
| Tháng 1: Nền tảng | 1-4 | Nắm cấu trúc đề, xây vocab cơ bản | 600 từ cơ bản + Ngữ pháp cơ bản + Làm quen Part 1,2,5 |
| Tháng 2: Mở rộng | 5-8 | Cải thiện Listening + Reading | Thêm vocab + Luyện Part 3,4,6 + Ngữ pháp nâng cao |
| Tháng 3: Luyện đề | 9-12 | Quen với áp lực thời gian | Luyện Part 7 + Mini Test hàng tuần + Ôn từ vựng |
| Tháng 4: Tổng ôn | 13-16 | Sẵn sàng thi | Full Test hàng tuần + Ôn điểm yếu + Rà soát |

### Dashboard hiển thị

- **Lộ trình**: Tuần hiện tại, nhiệm vụ hôm nay, % hoàn thành giai đoạn
- **Biểu đồ điểm**: Line chart lịch sử điểm thi theo thời gian
- **Thống kê tổng quan**: Số từ đã học, bài ngữ pháp hoàn thành, số đề đã làm
- **Điểm yếu**: Part nào có tỷ lệ đúng thấp nhất, gợi ý ôn tập

### Data format cho lộ trình

```typescript
interface RoadmapWeek {
  week: number;
  phase: 1 | 2 | 3 | 4;
  title: string;
  tasks: RoadmapTask[];
}

interface RoadmapTask {
  id: string;
  type: 'vocabulary' | 'grammar' | 'practice';
  description: string;
  target: string;           // Ví dụ: "topic:business" hoặc "part:5"
  quantity?: number;         // Số lượng cần hoàn thành
}

interface UserProgress {
  currentWeek: number;
  startDate: string;
  completedTasks: string[]; // task IDs
  testHistory: TestResult[];
  vocabularyProgress: VocabularyProgress[];
  grammarProgress: GrammarProgress[];
}
```

## Nguồn tài liệu

Nội dung câu hỏi, từ vựng, ngữ pháp sẽ được tổ chức thành JSON files trong `src/data/`.

**Giai đoạn 1 (khi code)**: Dùng dữ liệu mẫu (5-10 câu mỗi Part, 20-30 từ vựng, 2-3 bài ngữ pháp) để phát triển và test app.

**Giai đoạn 2 (sau khi app hoạt động)**: Bổ sung nội dung thật từ các nguồn TOEIC phổ biến (sách ETS, 600 Essential Words for the TOEIC, v.v.). Dữ liệu được thêm bằng cách tạo/sửa JSON files, không cần thay đổi code.

## Verification

1. **Dev server**: `npm run dev` chạy được, 4 route hoạt động
2. **Practice**: Có thể làm bài Part 5 (đơn giản nhất, không cần audio) với dữ liệu mẫu
3. **Vocabulary**: Flashcard hiển thị đúng, spaced repetition hoạt động
4. **Grammar**: Bài học hiển thị, bài tập chấm điểm đúng
5. **Dashboard**: Hiển thị lộ trình, biểu đồ render đúng với dữ liệu mẫu
6. **LocalStorage**: Tiến độ được lưu và khôi phục sau reload
7. **Responsive**: Giao diện hiển thị tốt trên desktop và mobile
