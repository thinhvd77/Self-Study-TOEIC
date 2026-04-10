# UI Dark Theme Upgrade — Design Spec

**Date:** 2026-04-09  
**Scope:** Toàn bộ app (Layout + 4 trang: Dashboard, Practice, Vocabulary, Grammar)  
**Approach:** CSS Variables Dark Theme (Option A) — không thêm library mới

---

## 1. Mục tiêu

Nâng cấp giao diện toàn bộ app từ light theme đơn giản sang dark mode chuyên nghiệp với:
- Nền tối (`#0f0f13`) + accent màu Amber (`#f59e0b`)
- Animation vừa phải (hover, fade-in, progress bar)
- Top navigation giữ nguyên vị trí nhưng redesign

---

## 2. Color Palette (CSS Variables)

Định nghĩa đầy đủ trong `src/index.css`. Tất cả các "soft/tinted" states phải dùng biến có sẵn, không dùng inline opacity syntax (`var(--x)/20`).

```css
@import "tailwindcss";

:root {
  /* Backgrounds */
  --bg-primary: #0f0f13;
  --bg-surface: #1a1a24;
  --bg-elevated: #242433;
  --border: #2e2e42;

  /* Text */
  --text-primary: #f1f0f5;
  --text-secondary: #8b8ba7;

  /* Accent - Amber */
  --accent: #f59e0b;
  --accent-hover: #fbbf24;
  --accent-soft: #2d1f05;      /* Amber tint bg cho selected/active states */

  /* Semantic */
  --success: #10b981;
  --success-soft: #052e1c;     /* Emerald tint bg */
  --danger: #ef4444;
  --danger-soft: #2d0a0a;      /* Red tint bg */
  --warning: #fbbf24;
  --warning-soft: #2d1e04;     /* Yellow tint bg */
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
  }
  * {
    transition-duration: 0.01ms !important;
  }
}
```

**Quy tắc:** Bất cứ chỗ nào cần màu tint (bg nhạt của accent/success/danger), dùng biến `--*-soft` đã định nghĩa, không tự tính opacity.

---

## 3. Layout & Navigation (`src/components/Layout.tsx`)

**Header:**
- Nền: `var(--bg-surface)`, border dưới `var(--border)`, `sticky top-0 z-50`, `backdrop-blur-sm`
- Logo "TOEIC 550+" : amber text, thêm icon 🎯
- Nav link mặc định: `var(--text-secondary)`
- Nav link active: amber text + `2px` amber bottom border
- Nav link hover: `var(--text-primary)` + `var(--accent-soft)` bg

**Body:**
- `min-h-screen` nền: `var(--bg-primary)`
- Text mặc định: `var(--text-primary)`

**Card pattern (tái dùng toàn app):**
- Nền: `var(--bg-surface)`
- Border: `1px solid var(--border)`, `rounded-xl`
- Hover card: nền `var(--bg-elevated)` + border `var(--accent)`
- Không dùng `shadow` (không hiệu quả trên dark bg)

---

## 4. Dashboard (`src/pages/Dashboard/index.tsx`)

- **Tiêu đề trang:** `var(--text-primary)`
- **Stats cards (4 card):** số liệu lớn đổi tất cả sang `var(--accent)`, label `var(--text-secondary)`
- **Phase dots:** active = `var(--accent)`, completed = `var(--success)`, inactive = `var(--border)`
- **Task list:** completed = `var(--accent-soft)` bg + `var(--accent)` checkmark, pending = `var(--bg-elevated)`
- **Chart (Recharts):**
  - `stroke` line: `var(--accent)` (#f59e0b)
  - `CartesianGrid` stroke: `var(--border)` (#2e2e42)
  - `XAxis` / `YAxis` tick color: `var(--text-secondary)` (#8b8ba7) — set via `tick={{ fill: '#8b8ba7' }}`
  - `Tooltip` bg: `var(--bg-surface)`, border `var(--border)`, text `var(--text-primary)` — set via `contentStyle`
- **Weakness card:** nền `var(--danger-soft)`, text `#fca5a5`
- **Empty state** (chưa có dữ liệu): `var(--bg-surface)` card, `var(--text-secondary)` text
- **Sections:** thêm class `animate-fade-in`

---

## 5. Practice (`src/pages/Practice/`)

**PartSelection:**
- Part card available: border `var(--border)` → hover border `var(--accent)`, lift `hover:-translate-y-0.5`
- Part card disabled: `opacity-40`, no hover
- Count text: `var(--accent)` thay vì blue

**PracticeSession:**
- Question card: `var(--bg-surface)` nền, `var(--text-primary)` text
- Option buttons (trước khi nộp): `var(--bg-elevated)` nền; chọn = `var(--accent)` border + `var(--accent-soft)` bg
- **Option buttons sau khi nộp (answer review nằm ở đây, không phải PracticeResult):** correct = `var(--success)` border + `var(--success-soft)` bg; incorrect = `var(--danger)` border + `var(--danger-soft)` bg — đây là QuestionCard hiển thị `correctAnswer` + `explanation` sau submit
- **Timer:** giữ nguyên threshold `timeLeft < 60` (60s) hiện tại — không thay đổi logic. Chỉ đổi màu: bình thường = `var(--accent)`, thấp = `var(--danger)`. Nút tạm dừng: `var(--bg-elevated)` bg, `var(--text-primary)` text.
- Nav panel: `var(--bg-surface)` bg, bookmarked = `var(--accent)` dot
- Nút điều hướng (Câu trước/sau): `var(--bg-elevated)` bg, `var(--text-primary)` text
- Nút Nộp bài: `var(--accent)` bg + dark text
- Nút Xem kết quả: `var(--success)` bg + white text
- **Empty state** (questions.length === 0): `var(--text-secondary)` text, amber back link

**PracticeResult (summary-only — không có answer review):**
- Scope: màn hình tổng kết gồm score %, thời gian, chế độ, ProgressBar, 2 nút. Không có per-question review (review nằm ở PracticeSession).
- Card: `var(--bg-surface)` thay vì `bg-white`
- Score: `var(--accent)` text (thay vì `text-blue-700`)
- Stat cells (Thời gian / Chế độ): `var(--bg-elevated)` bg, `var(--text-secondary)` label, `var(--text-primary)` value
- ProgressBar color: `green` (≥70%), `yellow` (≥50%), `red` (<50%) — giữ nguyên logic, chỉ cần dark-theme track (xem mục 8)
- Nút Luyện tiếp: `var(--bg-elevated)` bg + `var(--text-primary)` text
- Nút Về Dashboard: `var(--accent)` bg + dark text
- **Null state** (result = null): `var(--text-secondary)` text, amber back link

---

## 6. Vocabulary (`src/pages/Vocabulary/`)

**TopicSelection:**
- Stats (Đã học / Cần ôn / Tỷ lệ nhớ): `var(--accent)` / `var(--warning)` / `var(--success)`
- "Ôn tập hôm nay" button: `var(--warning-soft)` bg + `var(--warning)` border + `var(--warning)` text
- Topic cards: `var(--bg-surface)`, hover `var(--accent)` border
- Flashcard button: `var(--accent-soft)` bg + `var(--accent)` text
- Quiz button: `var(--success-soft)` bg + `var(--success)` text
- Progress bar: amber fill

**FlashcardSession:**
- Card front/back: `var(--bg-surface)`, từ chính `var(--accent)` lớn, translation `var(--text-secondary)`
- Buttons: Chưa biết = `var(--danger-soft)` bg + `var(--danger)` text; Hơi biết = `var(--warning-soft)` + `var(--warning)`; Biết rồi = `var(--success-soft)` + `var(--success)`
- **Empty/completion state** (không còn từ để ôn): `var(--bg-surface)` card, `var(--success)` icon, amber nút quay lại

**VocabQuiz:**
- Option: `var(--bg-elevated)` bg; selected = `var(--accent)` border
- Correct sau submit: `var(--success-soft)` bg + `var(--success)` border
- Incorrect sau submit: `var(--danger-soft)` bg + `var(--danger)` border
- **Results screen:** score amber, correct/total `var(--text-secondary)`, nút amber

---

## 7. Grammar (`src/pages/Grammar/`)

**LessonList:**
- Lesson card: `var(--bg-surface)`, hover `var(--bg-elevated)`
- Completed: `var(--accent)` ✓ icon
- Score badge: `var(--success-soft)` + `var(--success)` text (≥70%), `var(--danger-soft)` + `var(--danger)` text (<70%)
- ProgressBar: giữ `var(--success)` fill (xanh = hoàn thành bài học)

**LessonView — Lesson content:**
- Back link: `var(--accent)` text (thay vì blue)
- Card: `var(--bg-surface)` thay vì `bg-white`
- Heading: `var(--text-primary)`
- **Markdown content:** dùng CSS wrapper selector `.markdown-content` được định nghĩa trong `src/index.css`:
  ```css
  .markdown-content { color: var(--text-primary); }
  .markdown-content h1, .markdown-content h2, .markdown-content h3 { color: var(--accent); }
  .markdown-content strong { color: var(--text-primary); }
  .markdown-content ul, .markdown-content ol { color: var(--text-secondary); }
  .markdown-content code { background: var(--bg-elevated); color: var(--accent); padding: 2px 6px; border-radius: 4px; }
  ```
  Wrap `<ReactMarkdown>` trong `<div className="markdown-content">`.
- Example cards (`bg-blue-50`): đổi sang `var(--accent-soft)` bg, `var(--accent)` text cho English, `var(--text-secondary)` cho Vietnamese

**LessonView — Exercise mode:**
- QuestionCard option: `var(--bg-elevated)` bg; selected = `var(--accent)` border + `var(--accent-soft)` bg
- Nút điều hướng: `var(--bg-elevated)` bg + `var(--text-primary)` text
- Nút Nộp bài: `var(--accent)` bg + dark text
- Nút Xem kết quả: `var(--success)` bg + white text

**LessonView — Result screen** (`isSubmitted && currentEx >= exercises.length`):
- Card: `var(--bg-surface)`, score `var(--accent)` (thay vì blue-700)
- Nút Xem lại bài học: `var(--bg-elevated)` bg
- Nút Quay lại: `var(--accent)` bg + dark text

**LessonView — Not-found state** (`!lesson`):
- Text: `var(--text-secondary)`
- Back link: `var(--accent)` text

---

## 8. Shared Components

**`src/components/QuestionCard.tsx`:**
- Card: `var(--bg-surface)`, `var(--text-primary)`
- Option unselected: `var(--bg-elevated)` bg, `var(--border)` border
- Option selected: `var(--accent)` border + `var(--accent-soft)` bg
- Option correct (after submit): `var(--success)` border + `var(--success-soft)` bg
- Option incorrect (after submit): `var(--danger)` border + `var(--danger-soft)` bg
- Explanation: `var(--bg-elevated)` bg, `var(--text-secondary)` text
- Bookmark icon: `var(--accent)` khi active

**`src/components/QuestionNav.tsx`:**
- Container: `var(--bg-surface)` bg
- Question dot: answered = `var(--accent)`, bookmarked = `var(--warning)`, current = `var(--accent)` border, unanswered = `var(--bg-elevated)`

**`src/components/Flashcard.tsx`:**
- Front/back: `var(--bg-surface)`, border `var(--border)`
- Từ chính (front): `var(--accent)` text

**`src/components/ProgressBar.tsx`:**
- Track: `var(--border)` (#2e2e42) thay vì `bg-gray-200` — dùng inline style `backgroundColor: 'var(--border)'`
- `colorMap` cập nhật đầy đủ cho dark theme:
  - `blue` → `#f59e0b` (amber — dùng `var(--accent)`)
  - `green` → `#10b981` (giữ nguyên `bg-green-500`)
  - `yellow` → `#fbbf24` (giữ nguyên `bg-yellow-400`, vẫn đủ contrast trên dark track)
  - `red` → `#ef4444` (giữ nguyên `bg-red-500`, vẫn đủ contrast trên dark track)

---

## 9. Animation

| Hiệu ứng | Kích hoạt | Implementation |
|---|---|---|
| Fade-in | Load section/page | `animate-fade-in` CSS class |
| Card lift | Hover | `hover:-translate-y-0.5 transition-all duration-200` |
| Button press | Active | `active:scale-95` |
| Progress bar fill | Mount | `transition-all duration-500` (đã có) |

**`prefers-reduced-motion`:** Định nghĩa trong `src/index.css` (mục 2 ở trên) — tắt `animate-fade-in` và rút ngắn tất cả `transition-duration` xuống `0.01ms` khi user bật reduced motion.

---

## 10. Files cần thay đổi

| File | Thay đổi |
|---|---|
| `src/index.css` | CSS variables, keyframe, `.markdown-content`, `prefers-reduced-motion` |
| `src/components/Layout.tsx` | Dark nav + body bg |
| `src/components/ProgressBar.tsx` | Amber fill default, dark track |
| `src/components/Flashcard.tsx` | Dark card |
| `src/components/QuestionCard.tsx` | Dark card + semantic option states |
| `src/components/QuestionNav.tsx` | Dark bg + dot colors |
| `src/components/Timer.tsx` | Amber/red text, dark button (threshold 60s giữ nguyên) |
| `src/pages/Dashboard/index.tsx` | Full dark + amber stats + chart tick/tooltip theming + empty state |
| `src/pages/Practice/index.tsx` | Dark part cards |
| `src/pages/Practice/PracticeSession.tsx` | Dark session UI |
| `src/pages/Practice/PracticeResult.tsx` | Dark result UI + null state |
| `src/pages/Vocabulary/index.tsx` | Dark topic selection |
| `src/pages/Vocabulary/FlashcardSession.tsx` | Dark flashcard + completion state |
| `src/pages/Vocabulary/VocabQuiz.tsx` | Dark quiz + results screen |
| `src/pages/Grammar/index.tsx` | Dark lesson list |
| `src/pages/Grammar/LessonView.tsx` | Dark lesson view + markdown wrapper + result + not-found states |

---

## 11. Không thay đổi

- Logic, state management, hooks — không đụng
- Routing — không đụng
- Data files — không đụng
- Test files — không đụng
- TypeScript types — không đụng
- Bundle size — không tăng (không thêm library)
- Timer low-time threshold — giữ nguyên `timeLeft < 60` (60 giây)
