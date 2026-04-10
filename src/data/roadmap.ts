import { RoadmapWeek } from '../types'

export const roadmap: RoadmapWeek[] = [
  // Phase 1: Nền tảng (Tuần 1-4)
  {
    week: 1,
    phase: 1,
    title: 'Làm quen cấu trúc TOEIC & Từ vựng cơ bản',
    tasks: [
      { id: 'w1-1', type: 'vocabulary', description: 'Học 50 từ vựng chủ đề Business', target: 'topic:business', quantity: 50 },
      { id: 'w1-2', type: 'grammar', description: 'Bài 1: Loại từ & vị trí trong câu', target: 'lesson:gram-01' },
      { id: 'w1-3', type: 'practice', description: 'Làm 10 câu Part 5', target: 'part:5', quantity: 10 },
    ],
  },
  {
    week: 2,
    phase: 1,
    title: 'Tiếp tục từ vựng & Ngữ pháp cơ bản',
    tasks: [
      { id: 'w2-1', type: 'vocabulary', description: 'Học 50 từ vựng chủ đề Office', target: 'topic:office', quantity: 50 },
      { id: 'w2-2', type: 'grammar', description: 'Bài 2: Thì động từ', target: 'lesson:gram-02' },
      { id: 'w2-3', type: 'practice', description: 'Làm 10 câu Part 5 + ôn từ vựng', target: 'part:5', quantity: 10 },
    ],
  },
  {
    week: 3,
    phase: 1,
    title: 'Mở rộng từ vựng & Làm quen Listening',
    tasks: [
      { id: 'w3-1', type: 'vocabulary', description: 'Học 50 từ vựng chủ đề Finance', target: 'topic:finance', quantity: 50 },
      { id: 'w3-2', type: 'grammar', description: 'Bài 3: Câu bị động', target: 'lesson:gram-03' },
      { id: 'w3-3', type: 'practice', description: 'Làm quen Part 1 cơ bản', target: 'part:1', quantity: 5 },
    ],
  },
  {
    week: 4,
    phase: 1,
    title: 'Tổng ôn tháng 1',
    tasks: [
      { id: 'w4-1', type: 'vocabulary', description: 'Ôn lại 150 từ đã học', target: 'review', quantity: 150 },
      { id: 'w4-2', type: 'practice', description: 'Làm 20 câu Part 5 tổng hợp', target: 'part:5', quantity: 20 },
    ],
  },
  // Phase 2: Mở rộng (Tuần 5-8)
  {
    week: 5,
    phase: 2,
    title: 'Part 3 & Từ vựng nâng cao',
    tasks: [
      { id: 'w5-1', type: 'vocabulary', description: 'Học 50 từ chủ đề Travel', target: 'topic:travel', quantity: 50 },
      { id: 'w5-2', type: 'grammar', description: 'Bài 4: Liên từ & từ nối', target: 'lesson:gram-04' },
      { id: 'w5-3', type: 'practice', description: 'Luyện Part 3', target: 'part:3', quantity: 12 },
    ],
  },
  {
    week: 6,
    phase: 2,
    title: 'Part 4 & Part 6',
    tasks: [
      { id: 'w6-1', type: 'vocabulary', description: 'Học 50 từ chủ đề Health', target: 'topic:health', quantity: 50 },
      { id: 'w6-2', type: 'grammar', description: 'Bài 5: Giới từ', target: 'lesson:gram-05' },
      { id: 'w6-3', type: 'practice', description: 'Luyện Part 4 & Part 6', target: 'part:4', quantity: 12 },
    ],
  },
  {
    week: 7,
    phase: 2,
    title: 'Ngữ pháp nâng cao',
    tasks: [
      { id: 'w7-1', type: 'vocabulary', description: 'Học 50 từ chủ đề Technology', target: 'topic:technology', quantity: 50 },
      { id: 'w7-2', type: 'grammar', description: 'Bài 6: Đại từ quan hệ', target: 'lesson:gram-06' },
      { id: 'w7-3', type: 'practice', description: 'Luyện Part 5 & Part 6 mix', target: 'part:5', quantity: 15 },
    ],
  },
  {
    week: 8,
    phase: 2,
    title: 'Tổng ôn tháng 2',
    tasks: [
      { id: 'w8-1', type: 'vocabulary', description: 'Ôn 300 từ đã học', target: 'review', quantity: 300 },
      { id: 'w8-2', type: 'grammar', description: 'Bài 7: So sánh', target: 'lesson:gram-07' },
      { id: 'w8-3', type: 'practice', description: 'Mini Test lần 1', target: 'mini', quantity: 1 },
    ],
  },
  // Phase 3: Luyện đề (Tuần 9-12)
  {
    week: 9,
    phase: 3,
    title: 'Part 7 - Đọc hiểu cơ bản',
    tasks: [
      { id: 'w9-1', type: 'vocabulary', description: 'Học 50 từ chủ đề HR', target: 'topic:hr', quantity: 50 },
      { id: 'w9-2', type: 'grammar', description: 'Bài 8: Câu điều kiện', target: 'lesson:gram-08' },
      { id: 'w9-3', type: 'practice', description: 'Luyện Part 7 single passage', target: 'part:7', quantity: 10 },
    ],
  },
  {
    week: 10,
    phase: 3,
    title: 'Part 7 nâng cao & Mini Test',
    tasks: [
      { id: 'w10-1', type: 'vocabulary', description: 'Học 50 từ chủ đề Manufacturing', target: 'topic:manufacturing', quantity: 50 },
      { id: 'w10-2', type: 'practice', description: 'Luyện Part 7 double passage', target: 'part:7', quantity: 10 },
      { id: 'w10-3', type: 'practice', description: 'Mini Test lần 2', target: 'mini', quantity: 1 },
    ],
  },
  {
    week: 11,
    phase: 3,
    title: 'Luyện đề tổng hợp',
    tasks: [
      { id: 'w11-1', type: 'vocabulary', description: 'Ôn từ vựng yếu', target: 'review' },
      { id: 'w11-2', type: 'practice', description: 'Mini Test lần 3', target: 'mini', quantity: 1 },
      { id: 'w11-3', type: 'practice', description: 'Ôn Part yếu nhất', target: 'weakest' },
    ],
  },
  {
    week: 12,
    phase: 3,
    title: 'Tổng ôn tháng 3',
    tasks: [
      { id: 'w12-1', type: 'vocabulary', description: 'Ôn toàn bộ từ vựng', target: 'review' },
      { id: 'w12-2', type: 'practice', description: 'Full Test lần 1', target: 'full', quantity: 1 },
    ],
  },
  // Phase 4: Tổng ôn (Tuần 13-16)
  {
    week: 13,
    phase: 4,
    title: 'Full Test & Phân tích điểm yếu',
    tasks: [
      { id: 'w13-1', type: 'practice', description: 'Full Test lần 2', target: 'full', quantity: 1 },
      { id: 'w13-2', type: 'practice', description: 'Ôn Part yếu nhất dựa trên kết quả', target: 'weakest' },
    ],
  },
  {
    week: 14,
    phase: 4,
    title: 'Tập trung điểm yếu',
    tasks: [
      { id: 'w14-1', type: 'vocabulary', description: 'Ôn từ vựng hay quên', target: 'review' },
      { id: 'w14-2', type: 'grammar', description: 'Ôn ngữ pháp hay sai', target: 'review' },
      { id: 'w14-3', type: 'practice', description: 'Full Test lần 3', target: 'full', quantity: 1 },
    ],
  },
  {
    week: 15,
    phase: 4,
    title: 'Mô phỏng thi thật',
    tasks: [
      { id: 'w15-1', type: 'practice', description: 'Full Test lần 4 (tính giờ nghiêm ngặt)', target: 'full', quantity: 1 },
      { id: 'w15-2', type: 'vocabulary', description: 'Ôn lại từ vựng lần cuối', target: 'review' },
    ],
  },
  {
    week: 16,
    phase: 4,
    title: 'Sẵn sàng thi!',
    tasks: [
      { id: 'w16-1', type: 'practice', description: 'Full Test cuối cùng', target: 'full', quantity: 1 },
      { id: 'w16-2', type: 'vocabulary', description: 'Review nhanh từ khó', target: 'review' },
    ],
  },
]
