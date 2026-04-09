# Dataset Quality & Coverage Upgrade - Design Spec

## 1. Bối cảnh và mục tiêu

Dự án hiện có dữ liệu học tập nền tảng tốt về cấu trúc nhưng chưa cân bằng giữa **chất lượng nội dung** và **coverage luyện thi thực tế**.

Mục tiêu của đợt nâng cấp này:

1. Nâng chất lượng dữ liệu hiện có (ưu tiên chính): nghĩa, ví dụ, độ tự nhiên, tính nhất quán.
2. Bổ sung dữ liệu Practice theo roadmap để người học có thể luyện liên tục theo tiến độ tuần.
3. Thiết lập quy trình hybrid: auto-seed dữ liệu mới + review thủ công theo rubric chất lượng.

## 2. Audit hiện trạng

### 2.1 Vocabulary

- Có 8 topic, tổng ~800 từ, schema và ID nhìn chung ổn định.
- `office.ts` và `finance.ts` có dấu hiệu dữ liệu crawl/JSON-style, độ tự nhiên của nghĩa và ví dụ không đồng đều với các topic khác.
- Trùng từ liên-topic ở mức cao (nhiều từ lặp giữa business/finance/hr/office/manufacturing...), làm giảm hiệu quả phân hóa theo chủ đề.
- Metadata `synonyms`/`antonyms` có độ phủ chênh lệch giữa các topic.

### 2.2 Grammar

- Đủ 8 bài (`gram-01`..`gram-08`), mỗi bài 5 bài tập, map đúng roadmap.
- Chênh lệch độ sâu nội dung giữa các bài (ví dụ `gram-01` ngắn hơn đáng kể so với phần còn lại).
- Cần chuẩn hóa mức độ khó câu hỏi để tạo progression tốt hơn cho người học.

### 2.3 Practice

- Hiện chỉ có `src/data/tests/part5.ts` với 8 câu.
- Roadmap yêu cầu luyện nhiều part (`1,3,4,5,7`), mini test và full test; dữ liệu hiện tại chưa đáp ứng.

## 3. Thiết kế chất lượng dữ liệu (Rubric + Gates)

### 3.1 Rubric chấm chất lượng (0-2 mỗi trục, pass khi >= 8/10)

1. **Linguistic quality:** nghĩa tiếng Việt tự nhiên, ngắn gọn; ví dụ đúng ngữ cảnh TOEIC.
2. **Pedagogical value:** dữ liệu giúp phân biệt năng lực thật, tránh từ/câu thiếu giá trị luyện thi.
3. **Consistency:** cùng chuẩn style, part of speech, IPA, độ sâu mô tả.
4. **Coverage:** bám đúng roadmap theo topic/lesson/part.
5. **Duplication control:** trùng từ có chủ đích mới giữ, còn lại cần loại hoặc thay thế.

### 3.2 Quality Gates

- **Gate A - Schema tự động:** validate field bắt buộc, định dạng ID, sequence, topic/lesson mapping.
- **Gate B - Quality flag bán tự động:** phát hiện nghĩa quá dài kiểu từ điển, ví dụ kém ngữ cảnh công việc, trùng từ liên-topic.
- **Gate C - Manual review:** reviewer duyệt các mục bị flag trước khi nhập chính thức.

## 4. Roadmap nâng cấp (Hybrid)

### Phase 1 - Chuẩn hóa chất lượng dữ liệu hiện có (ưu tiên cao nhất)

- Rewrite/normalize nội dung `office.ts` và `finance.ts` để đạt chuẩn tương đương các topic còn lại.
- Giảm trùng từ liên-topic; cho phép giữ một nhóm nhỏ từ lõi đa chủ đề có gắn nhãn `shared-core`.
- Nâng độ sâu `gram-01`, đồng bộ độ khó 5 bài tập/bài theo mức tăng dần.

### Phase 2 - Mở rộng Practice theo roadmap

- Bổ sung dữ liệu theo lô nhỏ cho các part còn thiếu: Part 1, 3, 4, 6, 7.
- Triển khai theo thứ tự ưu tiên: nền tảng nghe -> đọc -> mini/full simulation.
- Mỗi câu hỏi thêm metadata hỗ trợ phân tích: độ khó, chủ điểm ngữ pháp/từ vựng, kỹ năng chính.

### Phase 3 - Pipeline mở rộng bền vững

- Auto-seed tạo nháp dữ liệu mới.
- Chạy Gate A/B tự động và Gate C thủ công trước khi merge.
- Duy trì checklist reviewer để đảm bảo chất lượng không suy giảm khi scale.

## 5. Definition of Done cho mỗi lô dữ liệu

1. Pass toàn bộ validation schema.
2. Số lượng quality flags dưới ngưỡng cho phép và đã được reviewer xử lý.
3. Dữ liệu mới được map vào flow học thực tế (vocabulary/grammar/practice) không phá vỡ hành vi hiện tại.
4. Có changelog ngắn mô tả những mục thay thế/do trùng/chỉnh nghĩa lớn.

## 6. Ngoài phạm vi

- Không thay đổi kiến trúc ứng dụng (React Context, LocalStorage, route structure).
- Không triển khai backend hay dịch vụ external runtime.
- Không tối ưu UI/UX ngoài phần cần thiết để hiển thị dữ liệu mới.

## 7. Rủi ro và giảm thiểu

- **Rủi ro:** mở rộng nhanh làm giảm chất lượng ngôn ngữ.
  - **Giảm thiểu:** bắt buộc qua Gate C trước merge.
- **Rủi ro:** trùng từ khó tránh ở domain business.
  - **Giảm thiểu:** quy định rõ danh sách `shared-core` và giới hạn tỷ lệ trùng.
- **Rủi ro:** lệch roadmap khi bổ sung practice không đồng bộ part.
  - **Giảm thiểu:** bổ sung theo backlog part-priority được khóa thứ tự.
