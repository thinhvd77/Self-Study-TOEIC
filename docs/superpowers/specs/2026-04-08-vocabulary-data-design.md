# Vocabulary Data - Design Spec

## Mục tiêu

Tạo đầy đủ dữ liệu từ vựng cho app luyện thi TOEIC với 8 chủ đề, mỗi chủ đề 50 từ, tổng cộng 400 từ. Từ vựng nhắm đến target 550+ TOEIC, tập trung vào từ phổ thông thường gặp trong bài thi.

## Phạm vi

- **8 chủ đề:** business, office, finance, travel, health, technology, hr, manufacturing
- **50 từ/chủ đề** = 400 từ tổng
- **Chất lượng:** Mỗi từ có IPA, synonyms/antonyms nếu phù hợp
- **Ngôn ngữ:** Nghĩa và giải thích bằng tiếng Việt

## Cấu trúc file

```
src/data/vocabulary/
├── business.ts       # Mở rộng: 10 → 50 từ
├── office.ts         # Mở rộng: 12 → 50 từ
├── finance.ts        # Mở rộng: 12 → 50 từ
├── travel.ts         # Mới: 50 từ
├── health.ts         # Mới: 50 từ
├── technology.ts     # Mới: 50 từ
├── hr.ts             # Mới: 50 từ
└── manufacturing.ts  # Mới: 50 từ
```

## Schema từ vựng

Giữ nguyên interface `VocabularyWord` đã định nghĩa trong `src/types/index.ts`:

```typescript
interface VocabularyWord {
  id: string           // Format: 'v-{topic}-{001-050}', vd: 'v-travel-023'
  word: string         // Từ tiếng Anh
  ipa: string          // Phiên âm IPA, vd: '/ˈtræv.əl/'
  meaning: string      // Nghĩa tiếng Việt
  partOfSpeech: string // noun, verb, adjective, adverb
  example: string      // Câu ví dụ tiếng Anh ngữ cảnh TOEIC
  synonyms?: string[]  // Từ đồng nghĩa (tùy chọn)
  antonyms?: string[]  // Từ trái nghĩa (tùy chọn)
  topic: string        // Tên topic: 'business', 'office', etc.
}
```

## ID Convention

- Format: `v-{topic_abbrev}-{number}`
- Topic abbreviations:
  - business → `biz`
  - office → `off`
  - finance → `fin`
  - travel → `tra`
  - health → `hea`
  - technology → `tec`
  - hr → `hr`
  - manufacturing → `mfg`
- Number: 3 chữ số, từ 001-050

Ví dụ: `v-tra-015`, `v-hea-042`, `v-mfg-007`

## Chủ đề và nội dung từ vựng gợi ý

### 1. Business (Kinh doanh)
Từ vựng về: hợp đồng, đàm phán, chiến lược, khách hàng, đối tác, lợi nhuận, đầu tư, cạnh tranh, thị trường, mục tiêu kinh doanh.

### 2. Office (Văn phòng)
Từ vựng về: họp, lịch trình, tài liệu, email, deadline, báo cáo, đồng nghiệp, phòng ban, thiết bị văn phòng, quy trình làm việc.

### 3. Finance (Tài chính)
Từ vựng về: kế toán, ngân sách, chi phí, doanh thu, thuế, lương, đầu tư, vay, lãi suất, báo cáo tài chính.

### 4. Travel (Du lịch)
Từ vựng về: đặt phòng, sân bay, chuyến bay, khách sạn, hành lý, visa, lịch trình, điểm đến, phương tiện, công tác.

### 5. Health (Y tế)
Từ vựng về: bảo hiểm y tế, khám bệnh, thuốc, bệnh viện, triệu chứng, chăm sóc sức khỏe, nghỉ phép bệnh, an toàn lao động.

### 6. Technology (Công nghệ)
Từ vựng về: phần mềm, phần cứng, mạng, bảo mật, cập nhật, cài đặt, thiết bị, hệ thống, dữ liệu, hỗ trợ kỹ thuật.

### 7. HR (Nhân sự)
Từ vựng về: tuyển dụng, phỏng vấn, hợp đồng lao động, đào tạo, đánh giá, thăng chức, sa thải, phúc lợi, kỷ luật, nghỉ phép.

### 8. Manufacturing (Sản xuất)
Từ vựng về: nhà máy, dây chuyền, chất lượng, kiểm tra, nguyên liệu, vận chuyển, kho hàng, đóng gói, an toàn, bảo trì.

## Cập nhật Vocabulary Page

File `src/pages/Vocabulary/index.tsx` cần được cập nhật:

1. Import thêm 5 vocabulary arrays mới
2. Cập nhật `allTopics` với 8 entries
3. Cập nhật label tiếng Việt cho các topic

```typescript
import { businessVocabulary } from '../../data/vocabulary/business'
import { officeVocabulary } from '../../data/vocabulary/office'
import { financeVocabulary } from '../../data/vocabulary/finance'
import { travelVocabulary } from '../../data/vocabulary/travel'
import { healthVocabulary } from '../../data/vocabulary/health'
import { technologyVocabulary } from '../../data/vocabulary/technology'
import { hrVocabulary } from '../../data/vocabulary/hr'
import { manufacturingVocabulary } from '../../data/vocabulary/manufacturing'

const allTopics = [
  { id: 'business', label: 'Kinh doanh', words: businessVocabulary },
  { id: 'office', label: 'Văn phòng', words: officeVocabulary },
  { id: 'finance', label: 'Tài chính', words: financeVocabulary },
  { id: 'travel', label: 'Du lịch', words: travelVocabulary },
  { id: 'health', label: 'Y tế', words: healthVocabulary },
  { id: 'technology', label: 'Công nghệ', words: technologyVocabulary },
  { id: 'hr', label: 'Nhân sự', words: hrVocabulary },
  { id: 'manufacturing', label: 'Sản xuất', words: manufacturingVocabulary },
]
```

## Quy tắc chất lượng từ vựng

1. **Từ phổ thông TOEIC:** Chọn từ thường xuất hiện trong bài thi TOEIC Listening & Reading
2. **Câu ví dụ ngữ cảnh:** Câu ví dụ phải phù hợp ngữ cảnh công việc/kinh doanh
3. **IPA chính xác:** Sử dụng IPA chuẩn, bao gồm stress marker
4. **Nghĩa ngắn gọn:** Nghĩa tiếng Việt súc tích, dễ hiểu
5. **Synonyms thực tế:** Chỉ thêm synonym nếu thực sự phổ biến và hữu ích
6. **Không trùng lặp:** Không trùng từ giữa các topic (trừ từ đa nghĩa rõ ràng)

## Tiêu chí nghiệm thu

- [ ] 8 file vocabulary trong `src/data/vocabulary/`
- [ ] Mỗi file có đúng 50 từ
- [ ] Tổng 400 từ không trùng lặp
- [ ] Tất cả từ có đầy đủ: id, word, ipa, meaning, partOfSpeech, example, topic
- [ ] ID format đúng convention
- [ ] `npm run build` pass không lỗi TypeScript
- [ ] `npm test` pass tất cả tests
- [ ] Vocabulary page hiển thị đúng 8 topic

## Không bao gồm

- Audio pronunciation (không có trong MVP)
- Hình ảnh minh họa
- Bài tập ngữ pháp cho từ vựng
- Phân loại độ khó (dễ/trung bình/khó)
