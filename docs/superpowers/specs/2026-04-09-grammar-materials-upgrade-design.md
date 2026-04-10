# Grammar Materials Upgrade - Design Spec

## 1. Bối cảnh và mục tiêu

Module Grammar hiện đã có đủ 8 bài học và flow học ổn định, nhưng chất lượng tài liệu giữa các bài chưa đồng đều và một số phần giải thích vẫn còn hơi "đọc hiểu rồi tự suy", chưa đủ thân thiện với người học mất gốc hoặc nền yếu.

Mục tiêu của đợt nâng cấp này:

1. Nâng chất lượng **toàn bộ 8 bài grammar hiện có**, không thêm chủ điểm mới.
2. Làm nội dung **dễ hiểu hơn cho người học nền yếu**, ưu tiên cách nhận diện nhanh trong TOEIC Part 5.
3. **Giữ nguyên mô hình dữ liệu hiện tại** (`content`, `examples`, `exercises`) để không tạo thay đổi dây chuyền ở UI, routing, state, hay persistence.

## 2. Phạm vi và ràng buộc

### 2.1 Trong phạm vi

- Rewrite và chuẩn hóa nội dung cho 8 file trong `src/data/grammar/*.ts`.
- Chuẩn hóa cấu trúc Markdown bên trong `content` của từng bài.
- Viết lại `examples` và `exercises` để bám sát khung giải thích mới.
- Điều chỉnh/điều hòa độ sâu giữa các bài để trải nghiệm học liền mạch hơn.

### 2.2 Ngoài phạm vi

- Không thêm lesson mới.
- Không đổi `GrammarLesson` type.
- Không thay đổi route, layout, component flow, hay localStorage schema.
- Không thiết kế lại UI Grammar page.

## 3. Audit hiện trạng

- Module Grammar dùng dữ liệu tĩnh trong `src/data/grammar/*.ts`, render phần `content` bằng `react-markdown`.
- Cả 8 bài hiện đều theo cùng một schema và mỗi bài có 5 câu bài tập, nên nền tảng kỹ thuật đã ổn định.
- Chênh lệch chính nằm ở **mức độ sư phạm**: một số bài đã có mẹo và tín hiệu nhận diện rõ, trong khi một số bài còn ngắn hoặc thiếu nhịp giải thích nhất quán cho người học yếu nền.
- Vì yêu cầu lần này là "nâng cấp tài liệu", điểm cần xử lý là **chất lượng biên tập nội dung**, không phải kiến trúc hiển thị.

## 4. Thiết kế nội dung chuẩn hóa

### 4.1 Template Markdown chuẩn cho mỗi bài

Mỗi lesson sẽ được viết lại theo cùng một template bên trong trường `content`:

1. **Mục tiêu bài học** - học xong cần nhận ra gì trong câu TOEIC.
2. **Khái niệm cốt lõi** - giải thích ngắn, tránh thuật ngữ rườm rà.
3. **Cách nhận diện trong câu** - vị trí, time signals, connectors, markers, hoặc mẫu câu thường gặp.
4. **Công thức/mẫu cần nhớ** - trình bày như cheat sheet dễ quét.
5. **Lỗi thường gặp** - chỉ rõ nhầm lẫn điển hình của người mất gốc.
6. **Mẹo làm TOEIC Part 5** - chuyển kiến thức thành thao tác chọn đáp án.
7. **Tóm tắt nhanh** - 3-5 ý để ôn lại trước khi làm bài.

Template này giữ nguyên cơ chế render hiện tại nhưng tạo được trải nghiệm học nhất quán giữa các bài.

### 4.2 Chuẩn biên tập nội dung

- Dùng tiếng Việt đơn giản, câu ngắn, giải thích theo logic "nhìn dấu hiệu gì -> chọn cấu trúc gì".
- Chỉ giữ phần kiến thức phục vụ trực tiếp việc làm TOEIC; lược bỏ chi tiết hàn lâm không giúp ra đáp án.
- Mỗi bài phải hướng người học đi qua cùng một nhịp: **hiểu khái niệm -> nhận diện dấu hiệu -> tránh bẫy -> áp dụng vào câu hỏi**.
- Mật độ thông tin giữa các bài cần cân bằng, tránh có bài quá mỏng và bài khác quá dày.

### 4.3 Chuẩn cho `examples`

- Vẫn giữ `examples` là mảng riêng, không nhập vào `content`.
- Mỗi ví dụ phải ngắn, rõ, sát bối cảnh công việc hoặc đề thi TOEIC.
- Phần tiếng Việt không chỉ dịch nghĩa mà phải giải thích vì sao nhận ra cấu trúc/ngữ pháp tương ứng.
- Ví dụ phải phản ánh đúng trọng tâm của bài, không dùng câu chung chung khó suy ra quy tắc.

### 4.4 Chuẩn cho `exercises`

- Giữ số lượng bài tập hiện tại để tránh phình scope.
- Viết lại câu hỏi và đáp án nhiễu nếu cần để bám sát khung lý thuyết mới.
- Mỗi `explanation` phải nêu đủ 3 lớp:
  1. dấu hiệu trong câu,
  2. vì sao đáp án đúng là đúng,
  3. vì sao các lựa chọn còn lại dễ gây nhầm.

Mục tiêu là người học đọc lời giải xong có thể áp dụng lại quy tắc, không chỉ biết "đáp án nào đúng".

## 5. Áp dụng cho 8 bài hiện có

Thiết kế này áp dụng cho toàn bộ các lesson hiện hữu:

- `gram-01` - Loại từ & Vị trí trong câu
- `gram-02` - Thì động từ
- `gram-03` - Câu bị động
- `gram-04` - Liên từ & Từ nối
- `gram-05` - Giới từ
- `gram-06` - Đại từ quan hệ
- `gram-07` - So sánh
- `gram-08` - Câu điều kiện

Mỗi bài dùng chung template nhưng phần "dấu hiệu nhận diện", "lỗi thường gặp", và "mẹo TOEIC" phải được viết theo đúng bản chất chủ điểm, không copy công thức chung một cách cơ học.

## 6. Tác động lên codebase

### 6.1 File bị ảnh hưởng

Phần lớn thay đổi sẽ nằm ở:

- `src/data/grammar/parts-of-speech.ts`
- `src/data/grammar/verb-tenses.ts`
- `src/data/grammar/passive-voice.ts`
- `src/data/grammar/conjunctions.ts`
- `src/data/grammar/prepositions.ts`
- `src/data/grammar/relative-pronouns.ts`
- `src/data/grammar/comparatives.ts`
- `src/data/grammar/conditionals.ts`

### 6.2 File không chủ động thay đổi

- `src/types/index.ts`
- `src/pages/Grammar/index.tsx`
- `src/pages/Grammar/LessonView.tsx`

Lý do: flow hiển thị hiện tại đã phù hợp với schema hiện có; yêu cầu lần này chỉ cần nâng cấp học liệu, không cần đổi kiến trúc.

## 7. Kiểm chứng và an toàn dữ liệu

Để tránh lỗi khi biên tập hàng loạt:

- `content` của mỗi bài phải tiếp tục là Markdown string hợp lệ và kết thúc bằng `.trim()`.
- `examples` phải còn đúng shape và phản ánh chính xác lesson tương ứng.
- `exercises` phải giữ `correctAnswer` dạng zero-based index.
- Tên heading chính trong `content` nên được chuẩn hóa để mọi lesson theo cùng template.

Hướng kiểm chứng phù hợp:

1. Dùng test dữ liệu để bắt lỗi cấu trúc như thiếu lesson, content rỗng, exercise rỗng, option count sai.
2. Bổ sung kiểm tra cho template heading chuẩn nếu cần, nhằm tránh mỗi bài bị biên tập theo một format khác nhau.
3. Duyệt thủ công nội dung để xác nhận độ dễ hiểu, vì tính sư phạm không thể đánh giá hoàn toàn bằng test tự động.

## 8. Definition of Done

Đợt nâng cấp được xem là hoàn thành khi:

1. Cả 8 lesson grammar được rewrite theo cùng template đã chốt.
2. Nội dung từng bài dễ hiểu hơn cho người học nền yếu và bám sát TOEIC Part 5.
3. `examples` và `exercises` đồng bộ với phần lý thuyết mới.
4. Không có thay đổi không cần thiết ở type, UI flow, hoặc persistence.
5. Các kiểm tra dữ liệu liên quan vẫn pass.

## 9. Rủi ro và giảm thiểu

- **Rủi ro:** nội dung dài hơn nhưng vẫn khó hiểu.
  - **Giảm thiểu:** ưu tiên câu ngắn, giải thích theo tín hiệu nhận diện, tránh diễn giải kiểu sách giáo khoa.
- **Rủi ro:** chuẩn hóa quá mức làm các bài trở nên giống nhau một cách máy móc.
  - **Giảm thiểu:** giữ template chung nhưng viết phần mẹo, lỗi thường gặp, và ví dụ theo đúng đặc thù từng chủ điểm.
- **Rủi ro:** biên tập hàng loạt làm lệch explanation hoặc index đáp án.
  - **Giảm thiểu:** dùng kiểm tra dữ liệu cho shape/index, sau đó review thủ công phần nội dung.
