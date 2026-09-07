# Year 3 Maths — reconciled completion audit

Checked 7 September 2026 against main including `d1c77237` (the newer teaching-slide catalogue change does not alter these banks).

## Corrected headline

**15 of 23 codes have reviewed replacement banks published to main.** This comprises N01–N07, A01–A03 and M02–M06. The previous 5/23 headline counted only the latest strict closeout reports and obscured ten earlier reviewed releases. Those ten are not unwritten or unpublished.

**8 codes still have identified content work:** M01 needs substantive repetition repair; SP01–SP02, ST01–ST03 and P01–P02 need completion and expansion from 24 to 48 practice questions each.

This is not a retroactive claim that all 15 have a complete evidence trail for every step of the newest strict workflow. Five (M02–M06) have explicit strict validation/deployment/live-QA closeouts. Ten earlier Number/Algebra banks have curriculum/IXL review reports and release evidence; their remaining strict evidence gaps must be reconciled individually, preserving completed work rather than automatically rewriting it.

## Per-code state

| Code | Practice / test | Current structural validator | Content / release state | Evidence |
|---|---:|---|---|---|
| AC9M3A01 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3A01.md](AC9M3A01.md); release `90f2e795` |
| AC9M3A02 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3A02.md](AC9M3A02.md); release `90f2e795` |
| AC9M3A03 | 48 / 16 | PASS | Reviewed replacement published; strict closeout needs reconciliation | [AC9M3A03.md](AC9M3A03.md); release `90f2e795` |
| AC9M3M01 | 48 / 16 | PASS | Legacy bank still needs substantive repetition repair | THIRD-FIVE-RECHECK.md; 48 context-prefixed legacy prompts |
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
| AC9M3SP01 | 24 / 16 | FAIL | Legacy 24/16 bank; completion and expansion pending | SPACE-START.md |
| AC9M3SP02 | 24 / 16 | FAIL | Legacy 24/16 bank; completion and expansion pending | SPACE-START.md |
| AC9M3ST01 | 24 / 16 | FAIL | Legacy 24/16 bank; completion and expansion pending | Current bank count and structural check |
| AC9M3ST02 | 24 / 16 | FAIL | Legacy 24/16 bank; completion and expansion pending | Current bank count and structural check |
| AC9M3ST03 | 24 / 16 | FAIL | Legacy 24/16 bank; completion and expansion pending | Current bank count and structural check |

## Checks and evidence boundaries

- All 23 production JSON banks counted and run through the current production validator: 16 pass structure, 7 fail the current Year 3 requirements. Structure alone does not establish instructional quality.
- All 46 practice/test HTML routes inspected locally: each loads its own code-specific questions.js; none loads experience-teacher-questions.js.
- Current Year 3 pre-module notes validator: 23/23 PASS. Some earlier releases had pre-module failures; current passing status is recorded separately rather than treating those old failures as permanently outstanding.
- Earlier Number/Algebra review reports explicitly record actual IXL skill pages, worked examples and initial live question formats, coverage maps, original authoring and checks. Their limitations concern sampled progression and, for Number codes, use of secondary curriculum sources at initial authoring. The later official ACARA workbook extraction is present for all 23 codes. No claim that IXL's entire adaptive system was completed is required or made.
- Original Number/Algebra publication commits and Pages successes verified in GitHub Actions: N01 e88164b0 / Pages 34036397171; N02–N04 344ffe43 / Pages 34038477642; N05–N07 d9b53167 / Pages 34039926285; A01–A03 90f2e795 / Pages 34047140999. Each also passed the question-bank quality workflow. Later release checks confirm the site was preserved.
- M04 required a later route fix at feb355cf; current route ownership was checked, so the initial M04 rewrite is not treated as sufficient by itself.
- M02–M06 detailed live/validation reports remain the authority for their individual smoke-test limits.
- The legacy ledger lists 16 Year 3 Maths codes, including M01. That ledger is not a reliable standalone count of substantively completed rewrites: M01 still contains the documented repeated-prefix bank.

## Totals and next work

- Reviewed replacement banks published: **15 codes / 960 questions**.
- M01 legacy bank requiring repair: **64 questions** already present; it is not a question-count shortfall.
- Seven remaining legacy banks: **280 questions** (7 × 40).
- Total current questions: **1304**. Target at 48 practice + 16 test per code: **1472**. Net shortfall: **168 practice questions**.
- Content priority: M01, SP01, SP02, ST01, ST02, ST03, P01, P02. Maintain a separate targeted strict-evidence closeout list for N01–N07 and A01–A03; do not classify these ten as blank, unpublished or automatically requiring a full rewrite.
