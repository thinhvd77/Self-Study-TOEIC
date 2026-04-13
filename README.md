# Ứng Dụng Luyện Thi TOEIC Cá Nhân

Ứng dụng web luyện thi TOEIC với mục tiêu nâng điểm từ dưới 400 lên 550+ trong 4 tháng. Ứng dụng single-user không có backend, toàn bộ nội dung bằng tiếng Việt, lưu dữ liệu trên thiết bị cục bộ.

## Tính năng chính

- **Luyện đề thi (Part 1-7)**: Luyện tập theo từng part, mini test ~30 phút, full test 120 phút với 200 câu hỏi. Hỗ trợ đếm ngược thời gian, đánh dấu câu hỏi khó, panel điều hướng câu hỏi.

- **Từ vựng Flashcard**: 1600 từ vựng trong 12 chủ đề (Business, Environment, Finance, Health, HR, Legal, Manufacturing, Marketing, Office, Real Estate, Technology, Travel). Sử dụng thuật toán SM-2 spaced repetition để tối ưu hóa nhớ lâu dài.

- **Ngữ pháp**: 13 bài học chi tiết (Articles, Comparatives, Conditionals, Conjunctions, Gerunds & Infinitives, Parts of Speech, Passive Voice, Prepositions, Pronouns, Relative Pronouns, Subject-Verb Agreement, Verb Tenses, Word Order) kèm theo bài tập và chấm điểm tự động.

- **Dashboard lộ trình 16 tuần**: Theo dõi tiến độ học tập, xem biểu đồ điểm số, phân tích điểm yếu, quản lý mục tiêu hàng tuần.

## Công nghệ sử dụng

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **Biểu đồ**: Recharts
- **Testing**: Vitest + React Testing Library + jsdom
- **Lưu trữ**: LocalStorage (không cần backend)

## Cài đặt & chạy nhanh

**Yêu cầu**: Node.js LTS

```bash
# Clone repository
git clone <repository-url>
cd Self-Study-TOEIC

# Cài đặt dependencies
npm install

# Chạy dev server (mặc định port 5173)
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Chạy tất cả tests
npm test

# Chạy tests chỉ main src (tránh worktree noise)
npx vitest run --exclude '.worktrees/**'
```

## Scripts chính

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Khởi động dev server (port 5173) |
| `npm run build` | Build production |
| `npm run preview` | Xem preview của production build |
| `npm test` | Chạy tất cả tests |
| `npm run crawl:vocab` | Thu thập từ vựng từ nguồn |
| `npm run audit:data` | Kiểm tra chất lượng dữ liệu |

## Cấu trúc thư mục (rút gọn)

```
src/
├── types/              # TypeScript interfaces
├── data/
│   ├── tests/          # Dữ liệu đề thi (Part 1-7)
│   ├── vocabulary/     # 12 chủ đề từ vựng
│   ├── grammar/        # 13 bài học ngữ pháp
│   └── roadmap.ts      # Lộ trình 16 tuần
├── hooks/              # Custom hooks (useLocalStorage, useTimer, useSpacedRepetition)
├── context/            # Global state (AppContext)
├── components/         # Components tái sử dụng
├── pages/              # Trang chính (Dashboard, Practice, Vocabulary, Grammar)
├── utils/              # Helper functions
└── main.tsx            # Entry point
```

## Luồng dữ liệu & lưu tiến độ

- **State Management**: React Context + useReducer, không dùng Redux
- **Dữ liệu**: Tất cả dữ liệu static trong `src/data/`, được import trực tiếp (không API calls)
- **Persistence**: Tất cả tiến độ được tự động lưu vào LocalStorage thông qua AppContext
- **Routing**: 4 route chính: `/` (Dashboard), `/practice` (Practice), `/vocabulary` (Vocabulary), `/grammar` (Grammar)

## Testing & kiểm chứng nhanh

- Unit tests cho hooks và utility functions
- Tests đặt trong thư mục `__tests__/` bên cạnh source files
- Test setup: `src/test/setup.ts` imports `@testing-library/jest-dom`
- Vitest config: jsdom environment, globals enabled
- Chạy tests cụ thể: `npx vitest run src/path/to/test.ts`

**Tiêu chí xác minh**:
1. Dev server chạy, 4 route hoạt động
2. Practice: hoàn thành Part 5, hiển thị điểm + review câu trả lời
3. Vocabulary: flashcards hiển thị chính xác, spaced repetition hoạt động
4. Grammar: bài học render, bài tập chấm điểm tự động
5. Dashboard: roadmap hiển thị tuần hiện tại, biểu đồ có dữ liệu
6. LocalStorage: tiến độ giữ nguyên sau khi reload trang
7. Responsive: hoạt động trên desktop và mobile

## Roadmap ngắn

- Mở rộng database từ vựng
- Thêm audio cho Part 1-4
- Tối ưu hóa thuật toán spaced repetition
- Cải thiện giao diện mobile
- Thêm tính năng export/import tiến độ
