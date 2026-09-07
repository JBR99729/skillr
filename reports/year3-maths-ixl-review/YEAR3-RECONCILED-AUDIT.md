# Year 3 Maths — reconciled completion audit

Checked 7 September 2026 against main including `d1c77237` (the newer teaching-slide catalogue change does not alter these banks).

## Corrected headline

**19 of 23 codes have reviewed replacement banks published to main.** This comprises N01–N07, A01–A03, M01–M06, SP01–SP02 and ST01. The previous 5/23 headline counted only strict closeout reports and obscured earlier reviewed releases.

**4 codes still have identified content work:** ST02–ST03 and P01–P02 need completion and expansion from 24 to 48 practice questions each.

This is not a retroactive claim that all 19 have a complete evidence trail for every step of the newest strict workflow. Nine (M01–M06, SP01–SP02 and ST01) have explicit strict validation/deployment/live-QA closeouts. Ten earlier Number/Algebra banks have curriculum/IXL review reports and release evidence; their remaining strict evidence gaps must be reconciled individually.

## Per-code state

| Code | Practice / test | Current structural validator | Content / release state | Evidence |
|---|---:|---|---|---|
| AC9M3A01 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3A01.md](AC9M3A01.md); release `90f2e795` |
| AC9M3A02 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3A02.md](AC9M3A02.md); release `90f2e795` |
| AC9M3A03 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3A03.md](AC9M3A03.md); release `90f2e795` |
| AC9M3M01 | 48 / 16 | PASS | Reviewed replacement published; strict closeout recorded | [NEXT-FOUR-VALIDATION.md](NEXT-FOUR-VALIDATION.md); release `2c270ce6` |
| AC9M3M02 | 48 / 16 | PASS | Reviewed replacement published; strict closeout recorded | [M02-VALIDATION.md](M02-VALIDATION.md); release `70dff249` |
| AC9M3M03 | 48 / 16 | PASS | Reviewed replacement published; strict closeout recorded | [M03-VALIDATION.md](M03-VALIDATION.md); release `962510c8` |
| AC9M3M04 | 48 / 16 | PASS | Reviewed replacement published; strict closeout recorded | [M04-VALIDATION.md](M04-VALIDATION.md); release `8c2c0a11` |
| AC9M3M05 | 48 / 16 | PASS | Reviewed replacement published; strict closeout recorded | [M05-VALIDATION.md](M05-VALIDATION.md); release `e93df3db` |
| AC9M3M06 | 48 / 16 | PASS | Reviewed replacement published; strict closeout recorded | [M06-VALIDATION.md](M06-VALIDATION.md); release `9bcf84e9` |
| AC9M3N01 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3N01.md](AC9M3N01.md); release `e88164b0` |
| AC9M3N02 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3N02.md](AC9M3N02.md); release `344ffe43` |
| AC9M3N03 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3N03.md](AC9M3N03.md); release `344ffe43` |
| AC9M3N04 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3N04.md](AC9M3N04.md); release `344ffe43` |
| AC9M3N05 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3N05.md](AC9M3N05.md); release `d9b53167` |
| AC9M3N06 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3N06.md](AC9M3N06.md); release `d9b53167` |
| AC9M3N07 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3N07.md](AC9M3N07.md); release `d9b53167` |
| AC9M3P01 | 24 / 16 | FAIL | Legacy 24/16 bank; completion and expansion pending | Current bank count and structural check |
| AC9M3P02 | 24 / 16 | FAIL | Legacy 24/16 bank; completion and expansion pending | Current bank count and structural check |
| AC9M3SP01 | 48 / 16 | PASS | Reviewed replacement published; hands-on limitation recorded | [NEXT-FOUR-VALIDATION.md](NEXT-FOUR-VALIDATION.md); release `2c270ce6` |
| AC9M3SP02 | 48 / 16 | PASS | Reviewed replacement published; freehand limitation recorded | [NEXT-FOUR-VALIDATION.md](NEXT-FOUR-VALIDATION.md); release `2c270ce6` |
| AC9M3ST01 | 48 / 16 | PASS | Reviewed replacement published; strict closeout recorded | [NEXT-FOUR-VALIDATION.md](NEXT-FOUR-VALIDATION.md); correction `131e2e76` |
| AC9M3ST02 | 24 / 16 | FAIL | Legacy 24/16 bank; completion and expansion pending | Current bank count and structural check |
| AC9M3ST03 | 24 / 16 | FAIL | Legacy 24/16 bank; completion and expansion pending | Current bank count and structural check |

## Checks and evidence boundaries

- All 23 production JSON banks counted and run through the current production validator: 19 pass structure, 4 fail the current Year 3 requirements. Structure alone does not establish instructional quality.
- All 46 practice/test HTML routes inspected locally: each loads its own code-specific questions.js; none loads experience-teacher-questions.js.
- Current Year 3 pre-module notes validator: 23/23 PASS. Some earlier releases had pre-module failures; current passing status is recorded separately rather than treating those old failures as permanently outstanding.
- Earlier Number/Algebra review reports explicitly record actual IXL skill pages, worked examples and initial live question formats, coverage maps, original authoring and checks. Their limitations concern sampled progression and, for Number codes, use of secondary curriculum sources at initial authoring. The later official ACARA workbook extraction is present for all 23 codes. No claim that IXL's entire adaptive system was completed is required or made.
- Original Number/Algebra publication commits and Pages successes verified in GitHub Actions: N01 e88164b0 / Pages 34036397171; N02–N04 344ffe43 / Pages 34038477642; N05–N07 d9b53167 / Pages 34039926285; A01–A03 90f2e795 / Pages 34047140999. Each also passed the question-bank quality workflow. Later release checks confirm the site was preserved.
- M04 required a later route fix at feb355cf; current route ownership was checked, so the initial M04 rewrite is not treated as sufficient by itself.
- M02–M06 detailed live/validation reports remain the authority for their individual smoke-test limits.
- The review ledger lists all 19 published replacement banks.

## Totals and next work

- Reviewed replacement banks published: **19 codes / 1216 questions**.
- Four remaining legacy banks: **160 questions** (4 × 40).
- Total current questions: **1376**. Target at 48 practice + 16 test per code: **1472**. Net shortfall: **96 practice questions**.
- Content priority: ST02, ST03, P01, P02. Maintain a separate targeted strict-evidence closeout list for N01–N07 and A01–A03.
