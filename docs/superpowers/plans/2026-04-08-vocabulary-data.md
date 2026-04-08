# Vocabulary Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create complete vocabulary data for 8 TOEIC topics with 50 words each, totaling 400 words.

**Architecture:** Each topic is a separate TypeScript file exporting a `VocabularyWord[]` array. The Vocabulary page imports all topics and registers them in `allTopics`. Data follows existing schema from `src/types/index.ts`.

**Tech Stack:** TypeScript, Vitest for testing

**Spec:** `docs/superpowers/specs/2026-04-08-vocabulary-data-design.md`

---

## File Structure

```
src/data/vocabulary/
├── business.ts       # MODIFY: Expand 10 → 50 words
├── office.ts         # MODIFY: Expand 12 → 50 words
├── finance.ts        # MODIFY: Expand 12 → 50 words
├── travel.ts         # CREATE: 50 words
├── health.ts         # CREATE: 50 words
├── technology.ts     # CREATE: 50 words
├── hr.ts             # CREATE: 50 words
└── manufacturing.ts  # CREATE: 50 words

src/data/__tests__/
└── vocabulary-data.test.ts  # CREATE: Tests for all 8 topics

src/pages/Vocabulary/
└── index.tsx         # MODIFY: Import and register all 8 topics
```

## ID Convention Reference

| Topic | Abbreviation | Example ID |
|-------|--------------|------------|
| business | biz | v-biz-001 |
| office | off | v-off-001 |
| finance | fin | v-fin-001 |
| travel | tra | v-tra-001 |
| health | hea | v-hea-001 |
| technology | tec | v-tec-001 |
| hr | hr | v-hr-001 |
| manufacturing | mfg | v-mfg-001 |

---

## Task 1: Create Vocabulary Data Tests

**Files:**
- Create: `src/data/__tests__/vocabulary-data.test.ts`

- [ ] **Step 1: Create test file with all vocabulary tests**

```typescript
import { describe, expect, it } from 'vitest'
import { businessVocabulary } from '../vocabulary/business'
import { officeVocabulary } from '../vocabulary/office'
import { financeVocabulary } from '../vocabulary/finance'
import { travelVocabulary } from '../vocabulary/travel'
import { healthVocabulary } from '../vocabulary/health'
import { technologyVocabulary } from '../vocabulary/technology'
import { hrVocabulary } from '../vocabulary/hr'
import { manufacturingVocabulary } from '../vocabulary/manufacturing'
import { VocabularyWord } from '../../types'

const allVocabulary: { name: string; data: VocabularyWord[]; prefix: string; topic: string }[] = [
  { name: 'business', data: businessVocabulary, prefix: 'v-biz-', topic: 'business' },
  { name: 'office', data: officeVocabulary, prefix: 'v-off-', topic: 'office' },
  { name: 'finance', data: financeVocabulary, prefix: 'v-fin-', topic: 'finance' },
  { name: 'travel', data: travelVocabulary, prefix: 'v-tra-', topic: 'travel' },
  { name: 'health', data: healthVocabulary, prefix: 'v-hea-', topic: 'health' },
  { name: 'technology', data: technologyVocabulary, prefix: 'v-tec-', topic: 'technology' },
  { name: 'hr', data: hrVocabulary, prefix: 'v-hr-', topic: 'hr' },
  { name: 'manufacturing', data: manufacturingVocabulary, prefix: 'v-mfg-', topic: 'manufacturing' },
]

describe('Vocabulary data completeness', () => {
  it.each(allVocabulary)('$name has exactly 50 words', ({ data }) => {
    expect(data).toHaveLength(50)
  })

  it('has 400 total words across all topics', () => {
    const total = allVocabulary.reduce((sum, v) => sum + v.data.length, 0)
    expect(total).toBe(400)
  })
})

describe('Vocabulary data structure', () => {
  it.each(allVocabulary)('$name words have correct ID prefix', ({ data, prefix }) => {
    data.forEach((word) => {
      expect(word.id).toMatch(new RegExp(`^${prefix}\\d{3}$`))
    })
  })

  it.each(allVocabulary)('$name words have correct topic field', ({ data, topic }) => {
    data.forEach((word) => {
      expect(word.topic).toBe(topic)
    })
  })

  it.each(allVocabulary)('$name words have all required fields', ({ data }) => {
    data.forEach((word) => {
      expect(word.id).toBeTruthy()
      expect(word.word).toBeTruthy()
      expect(word.ipa).toMatch(/^\/.*\/$/)
      expect(word.meaning).toBeTruthy()
      expect(word.partOfSpeech).toMatch(/^(noun|verb|adjective|adverb|preposition|conjunction)$/)
      expect(word.example).toBeTruthy()
    })
  })

  it.each(allVocabulary)('$name words have sequential IDs from 001 to 050', ({ data, prefix }) => {
    for (let i = 0; i < 50; i++) {
      const expectedId = `${prefix}${String(i + 1).padStart(3, '0')}`
      expect(data[i].id).toBe(expectedId)
    }
  })
})

describe('Vocabulary data uniqueness', () => {
  it('has no duplicate word IDs across all topics', () => {
    const allIds = allVocabulary.flatMap((v) => v.data.map((w) => w.id))
    const uniqueIds = new Set(allIds)
    expect(uniqueIds.size).toBe(allIds.length)
  })

  it('has no duplicate words within each topic', () => {
    allVocabulary.forEach(({ name, data }) => {
      const words = data.map((w) => w.word.toLowerCase())
      const uniqueWords = new Set(words)
      expect(uniqueWords.size).toBe(words.length, `Duplicate word found in ${name}`)
    })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail (files don't exist yet)**

Run: `npx vitest run src/data/__tests__/vocabulary-data.test.ts`
Expected: FAIL with import errors for missing files (travel, health, technology, hr, manufacturing)

- [ ] **Step 3: Commit test file**

```bash
git add src/data/__tests__/vocabulary-data.test.ts
git commit -m "test: add vocabulary data completeness tests

- Tests for 8 topics × 50 words = 400 total
- Validates ID format, required fields, uniqueness
- TDD: tests written before expanding data

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 2: Create Travel Vocabulary (50 words)

**Files:**
- Create: `src/data/vocabulary/travel.ts`

- [ ] **Step 1: Create travel.ts with 50 TOEIC travel vocabulary words**

Create file `src/data/vocabulary/travel.ts` with 50 words related to: đặt phòng, sân bay, chuyến bay, khách sạn, hành lý, visa, lịch trình, điểm đến, phương tiện, công tác.

Structure per word:
```typescript
{
  id: 'v-tra-001',  // Sequential 001-050
  word: 'reservation',
  ipa: '/ˌrez.ərˈveɪ.ʃən/',
  meaning: 'sự đặt trước, đặt chỗ',
  partOfSpeech: 'noun',
  example: 'I made a reservation at the hotel for three nights.',
  synonyms: ['booking'],
  topic: 'travel',
}
```

Word list to include (50 words):
1. reservation, 2. itinerary, 3. departure, 4. arrival, 5. luggage,
6. passport, 7. boarding, 8. destination, 9. accommodation, 10. terminal,
11. fare, 12. delay, 13. cancel, 14. confirm, 15. transfer,
16. check-in, 17. check-out, 18. vacancy, 19. occupancy, 20. complimentary,
21. refund, 22. customs, 23. immigration, 24. declare, 25. domestic,
26. international, 27. round-trip, 28. one-way, 29. layover, 30. connection,
31. aisle, 32. window, 33. overhead, 34. turbulence, 35. announcement,
36. gate, 37. lounge, 38. porter, 39. bellhop, 40. concierge,
41. suite, 42. amenities, 43. voucher, 44. reimbursement, 45. expense,
46. receipt, 47. currency, 48. exchange, 49. visa, 50. transit

- [ ] **Step 2: Run tests to check travel vocabulary**

Run: `npx vitest run src/data/__tests__/vocabulary-data.test.ts`
Expected: Still FAIL (other topics missing), but travel imports should work

- [ ] **Step 3: Commit travel vocabulary**

```bash
git add src/data/vocabulary/travel.ts
git commit -m "feat(vocab): add travel vocabulary (50 words)

- Airport, hotel, booking, transportation vocabulary
- TOEIC 550+ target level

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 3: Create Health Vocabulary (50 words)

**Files:**
- Create: `src/data/vocabulary/health.ts`

- [ ] **Step 1: Create health.ts with 50 TOEIC health vocabulary words**

Create file `src/data/vocabulary/health.ts` with 50 words related to: bảo hiểm y tế, khám bệnh, thuốc, bệnh viện, triệu chứng, chăm sóc sức khỏe, nghỉ phép bệnh, an toàn lao động.

Word list to include (50 words):
1. prescription, 2. symptom, 3. diagnosis, 4. treatment, 5. pharmacy,
6. medication, 7. appointment, 8. examination, 9. insurance, 10. coverage,
11. claim, 12. policy, 13. benefit, 14. deductible, 15. premium,
16. clinic, 17. hospital, 18. emergency, 19. ambulance, 20. physician,
21. specialist, 22. referral, 23. checkup, 24. vaccine, 25. injection,
26. allergy, 27. infection, 28. fever, 29. headache, 30. fatigue,
31. recover, 32. healing, 33. condition, 34. chronic, 35. acute,
36. preventive, 37. wellness, 38. hygiene, 39. sanitation, 40. contagious,
41. outbreak, 42. quarantine, 43. leave, 44. absence, 45. sick,
46. injury, 47. safety, 48. hazard, 49. protective, 50. regulation

- [ ] **Step 2: Run tests to check health vocabulary**

Run: `npx vitest run src/data/__tests__/vocabulary-data.test.ts`
Expected: Still FAIL (other topics missing), but health imports should work

- [ ] **Step 3: Commit health vocabulary**

```bash
git add src/data/vocabulary/health.ts
git commit -m "feat(vocab): add health vocabulary (50 words)

- Medical, insurance, safety, wellness vocabulary
- TOEIC 550+ target level

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 4: Create Technology Vocabulary (50 words)

**Files:**
- Create: `src/data/vocabulary/technology.ts`

- [ ] **Step 1: Create technology.ts with 50 TOEIC technology vocabulary words**

Create file `src/data/vocabulary/technology.ts` with 50 words related to: phần mềm, phần cứng, mạng, bảo mật, cập nhật, cài đặt, thiết bị, hệ thống, dữ liệu, hỗ trợ kỹ thuật.

Word list to include (50 words):
1. software, 2. hardware, 3. network, 4. security, 5. password,
6. update, 7. install, 8. download, 9. upload, 10. backup,
11. restore, 12. database, 13. server, 14. storage, 15. bandwidth,
16. wireless, 17. router, 18. modem, 19. browser, 20. website,
21. application, 22. program, 23. operating, 24. compatible, 25. upgrade,
26. malware, 27. virus, 28. firewall, 29. encryption, 30. authentication,
31. troubleshoot, 32. technical, 33. support, 34. helpdesk, 35. maintenance,
36. device, 37. laptop, 38. monitor, 39. keyboard, 40. peripheral,
41. configuration, 42. settings, 43. default, 44. customize, 45. interface,
46. digital, 47. online, 48. offline, 49. connectivity, 50. outage

- [ ] **Step 2: Run tests to check technology vocabulary**

Run: `npx vitest run src/data/__tests__/vocabulary-data.test.ts`
Expected: Still FAIL (other topics missing), but technology imports should work

- [ ] **Step 3: Commit technology vocabulary**

```bash
git add src/data/vocabulary/technology.ts
git commit -m "feat(vocab): add technology vocabulary (50 words)

- IT, software, hardware, security vocabulary
- TOEIC 550+ target level

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 5: Create HR Vocabulary (50 words)

**Files:**
- Create: `src/data/vocabulary/hr.ts`

- [ ] **Step 1: Create hr.ts with 50 TOEIC HR vocabulary words**

Create file `src/data/vocabulary/hr.ts` with 50 words related to: tuyển dụng, phỏng vấn, hợp đồng lao động, đào tạo, đánh giá, thăng chức, sa thải, phúc lợi, kỷ luật, nghỉ phép.

Word list to include (50 words):
1. recruitment, 2. candidate, 3. applicant, 4. interview, 5. resume,
6. qualification, 7. experience, 8. reference, 9. background, 10. hire,
11. employ, 12. contract, 13. probation, 14. orientation, 15. training,
16. development, 17. workshop, 18. seminar, 19. certification, 20. skill,
21. performance, 22. evaluation, 23. appraisal, 24. feedback, 25. promotion,
26. advancement, 27. transfer, 28. relocation, 29. compensation, 30. salary,
31. wage, 32. bonus, 33. incentive, 34. benefit, 35. pension,
36. retirement, 37. termination, 38. resignation, 39. layoff, 40. severance,
41. discipline, 42. policy, 43. compliance, 44. grievance, 45. harassment,
46. diversity, 47. inclusion, 48. attendance, 49. leave, 50. overtime

- [ ] **Step 2: Run tests to check HR vocabulary**

Run: `npx vitest run src/data/__tests__/vocabulary-data.test.ts`
Expected: Still FAIL (manufacturing missing), but HR imports should work

- [ ] **Step 3: Commit HR vocabulary**

```bash
git add src/data/vocabulary/hr.ts
git commit -m "feat(vocab): add HR vocabulary (50 words)

- Recruitment, training, compensation, policy vocabulary
- TOEIC 550+ target level

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 6: Create Manufacturing Vocabulary (50 words)

**Files:**
- Create: `src/data/vocabulary/manufacturing.ts`

- [ ] **Step 1: Create manufacturing.ts with 50 TOEIC manufacturing vocabulary words**

Create file `src/data/vocabulary/manufacturing.ts` with 50 words related to: nhà máy, dây chuyền, chất lượng, kiểm tra, nguyên liệu, vận chuyển, kho hàng, đóng gói, an toàn, bảo trì.

Word list to include (50 words):
1. factory, 2. plant, 3. facility, 4. assembly, 5. production,
6. manufacturing, 7. process, 8. operation, 9. equipment, 10. machinery,
11. raw, 12. material, 13. component, 14. part, 15. inventory,
16. stock, 17. warehouse, 18. storage, 19. shipment, 20. delivery,
21. packaging, 22. label, 23. container, 24. pallet, 25. forklift,
26. quality, 27. inspection, 28. defect, 29. reject, 30. standard,
31. specification, 32. tolerance, 33. compliance, 34. certification, 35. audit,
36. maintenance, 37. repair, 38. breakdown, 39. downtime, 40. efficiency,
41. productivity, 42. output, 43. capacity, 44. shift, 45. supervisor,
46. technician, 47. operator, 48. safety, 49. hazard, 50. procedure

- [ ] **Step 2: Run tests to check manufacturing vocabulary**

Run: `npx vitest run src/data/__tests__/vocabulary-data.test.ts`
Expected: Still FAIL (existing topics need expansion), but manufacturing imports should work

- [ ] **Step 3: Commit manufacturing vocabulary**

```bash
git add src/data/vocabulary/manufacturing.ts
git commit -m "feat(vocab): add manufacturing vocabulary (50 words)

- Factory, quality, logistics, maintenance vocabulary
- TOEIC 550+ target level

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 7: Expand Business Vocabulary (10 → 50 words)

**Files:**
- Modify: `src/data/vocabulary/business.ts`

- [ ] **Step 1: Expand business.ts from 10 to 50 words**

Keep existing 10 words (v-biz-001 to v-biz-010), add 40 new words (v-biz-011 to v-biz-050).

Additional words to add (40 words):
11. acquisition, 12. merger, 13. partnership, 14. investor, 15. stakeholder,
16. shareholder, 17. dividend, 18. profit, 19. loss, 20. margin,
21. strategy, 22. objective, 23. target, 24. forecast, 25. projection,
26. competitor, 27. competition, 28. market, 29. segment, 30. niche,
31. expansion, 32. growth, 33. decline, 34. recession, 35. recovery,
36. launch, 37. promote, 38. advertise, 39. campaign, 40. brand,
41. customer, 42. client, 43. vendor, 44. supplier, 45. distributor,
46. retail, 47. wholesale, 48. export, 49. import, 50. trade

- [ ] **Step 2: Run tests to check business vocabulary count**

Run: `npx vitest run src/data/__tests__/vocabulary-data.test.ts`
Expected: Business topic should pass (50 words)

- [ ] **Step 3: Commit expanded business vocabulary**

```bash
git add src/data/vocabulary/business.ts
git commit -m "feat(vocab): expand business vocabulary (10 → 50 words)

- Added 40 new words for strategy, competition, trade
- TOEIC 550+ target level

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 8: Expand Office Vocabulary (12 → 50 words)

**Files:**
- Modify: `src/data/vocabulary/office.ts`

- [ ] **Step 1: Expand office.ts from 12 to 50 words**

Keep existing 12 words (v-off-001 to v-off-012), add 38 new words (v-off-013 to v-off-050).

Additional words to add (38 words):
13. memorandum, 14. correspondence, 15. attachment, 16. forward, 17. reply,
18. draft, 19. revision, 20. approval, 21. signature, 22. authorization,
23. priority, 24. urgent, 25. postpone, 26. reschedule, 27. reminder,
28. notification, 29. announcement, 30. circulation, 31. distribution, 32. filing,
33. archive, 34. retrieve, 35. photocopy, 36. printer, 37. scanner,
38. stationery, 39. supplies, 40. requisition, 41. procurement, 42. inventory,
43. conference, 44. presentation, 45. projector, 46. whiteboard, 47. bulletin,
48. reception, 49. directory, 50. extension

- [ ] **Step 2: Run tests to check office vocabulary count**

Run: `npx vitest run src/data/__tests__/vocabulary-data.test.ts`
Expected: Office topic should pass (50 words)

- [ ] **Step 3: Commit expanded office vocabulary**

```bash
git add src/data/vocabulary/office.ts
git commit -m "feat(vocab): expand office vocabulary (12 → 50 words)

- Added 38 new words for communication, equipment, procedures
- TOEIC 550+ target level

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 9: Expand Finance Vocabulary (12 → 50 words)

**Files:**
- Modify: `src/data/vocabulary/finance.ts`

- [ ] **Step 1: Expand finance.ts from 12 to 50 words**

Keep existing 12 words (v-fin-001 to v-fin-012), add 38 new words (v-fin-013 to v-fin-050).

Additional words to add (38 words):
13. account, 14. balance, 15. deposit, 16. withdrawal, 17. transfer,
18. payment, 19. receipt, 20. statement, 21. audit, 22. compliance,
23. ledger, 24. journal, 25. entry, 26. reconciliation, 27. discrepancy,
28. depreciation, 29. amortization, 30. accrual, 31. fiscal, 32. quarter,
33. annual, 34. interest, 35. principal, 36. loan, 37. mortgage,
38. credit, 39. debit, 40. equity, 41. investment, 42. portfolio,
43. dividend, 44. yield, 45. return, 46. risk, 47. insurance,
48. premium, 49. reimbursement, 50. allocation

- [ ] **Step 2: Run tests - all vocabulary tests should pass**

Run: `npx vitest run src/data/__tests__/vocabulary-data.test.ts`
Expected: PASS - All 8 topics with 50 words each

- [ ] **Step 3: Commit expanded finance vocabulary**

```bash
git add src/data/vocabulary/finance.ts
git commit -m "feat(vocab): expand finance vocabulary (12 → 50 words)

- Added 38 new words for accounting, banking, investment
- TOEIC 550+ target level

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 10: Update Vocabulary Page with All Topics

**Files:**
- Modify: `src/pages/Vocabulary/index.tsx:1-18`

- [ ] **Step 1: Update imports and allTopics array**

Replace the imports and allTopics section:

```typescript
import { Routes, Route, useNavigate } from 'react-router-dom'
import { FlashcardSession } from './FlashcardSession'
import { VocabQuiz } from './VocabQuiz'
import { businessVocabulary } from '../../data/vocabulary/business'
import { officeVocabulary } from '../../data/vocabulary/office'
import { financeVocabulary } from '../../data/vocabulary/finance'
import { travelVocabulary } from '../../data/vocabulary/travel'
import { healthVocabulary } from '../../data/vocabulary/health'
import { technologyVocabulary } from '../../data/vocabulary/technology'
import { hrVocabulary } from '../../data/vocabulary/hr'
import { manufacturingVocabulary } from '../../data/vocabulary/manufacturing'
import { useAppContext } from '../../context/AppContext'
import { getWordsToReview } from '../../hooks/useSpacedRepetition'
import { VocabularyWord } from '../../types'
import { ProgressBar } from '../../components/ProgressBar'

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

- [ ] **Step 2: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS - No TypeScript errors

- [ ] **Step 3: Run all tests**

Run: `npm test`
Expected: PASS - All tests pass

- [ ] **Step 4: Commit vocabulary page update**

```bash
git add src/pages/Vocabulary/index.tsx
git commit -m "feat(vocab): register all 8 topics in Vocabulary page

- Added travel, health, technology, hr, manufacturing imports
- Updated allTopics with Vietnamese labels
- Total: 400 words across 8 topics

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 11: Update Legacy Test and Final Verification

**Files:**
- Modify: `src/data/__tests__/task2-data.test.ts:21-24`

- [ ] **Step 1: Update legacy test to expect 50 words**

The old test expects 10 business words. Update it:

```typescript
  it('provides 50 business vocabulary words', () => {
    expect(businessVocabulary).toHaveLength(50)
    expect(businessVocabulary[0].topic).toBe('business')
  })
```

- [ ] **Step 2: Run all tests for final verification**

Run: `npm test`
Expected: PASS - All tests pass (including updated legacy test)

- [ ] **Step 3: Run build for final verification**

Run: `npm run build`
Expected: PASS - Build succeeds

- [ ] **Step 4: Commit legacy test update**

```bash
git add src/data/__tests__/task2-data.test.ts
git commit -m "test: update legacy test to expect 50 business words

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Acceptance Criteria Checklist

After completing all tasks, verify:

- [ ] 8 files in `src/data/vocabulary/` (business, office, finance, travel, health, technology, hr, manufacturing)
- [ ] Each file has exactly 50 words
- [ ] Total: 400 unique words
- [ ] All words have: id, word, ipa, meaning, partOfSpeech, example, topic
- [ ] IDs follow convention: v-{abbrev}-{001-050}
- [ ] `npm run build` passes
- [ ] `npm test` passes
- [ ] Vocabulary page shows 8 topics with Vietnamese labels
