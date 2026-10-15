# AC9M2N02 website bank — 15 October 2026

Target: `JBR99729/skillr`, `skillr-dev`. Base: `6205cd1ff0f8751542c8d8df504d2f88326578ef`. Development-branch code maintenance only. No production-main merge, skillr-app change, public deployment, commercial worksheet certification or classroom-validation claim.

## Scope and evidence

The canonical AC9M2N02 research record supplies 45 directly inspected selected tasks, 15 per researched focus. Existing inspection was reused; no new source observations are claimed. The researched three-focus blueprint determines the original digital bank. Every item is mapped below and in candidate.items.json. Customer-facing prompts, diagrams and metadata contain no source names or internal evidence mapping.

- Practice: 30 questions, 10 each for partition/rename (PN), equal exchanges (EX), zero (ZR). Each sitting uses 10, either mixed or from the chosen focus.
- Test: 16 (PN 5, EX 6, ZR 5), preserving the existing website's higher count above the initial 15-slot blueprint.
- Number, multiple blanks, single choice and adult-reviewed practical/explanation responses. Sixteen tasks need adult review (9 Practice, 7 Test); completion does not automatically mark them correct.
- Year 2 core only. App-specific adaptive/profile and next-year Stretch gates are outside this static website build. No unsupported extension research was invented.

All 40 legacy items were independently read and archived with individual dispositions. Old T011 had two valid choices, repaired with a constrained missing-tens task. Old P016 was determinate (435), archived for redundancy rather than ambiguity.

## Independent teacher review

Reviewer teacher_review_n02 (gpt-6-astra) reviewed every question, answer, rubric, explanation and visual specification. Eight material findings were repaired and rechecked. Exact approved candidate SHA256: `21cef9c153337ab45820d94aa1e72b65c5e8027b7f100e65d871d2e69ef6a52f`. See teacher-review-v2.md and teacher-approval.json. The candidate remains immutable; delivery status is separate.

## Integration

Public bank identity is `20261015-ac9m2n02-v2`; the immutable approved internal candidate retains its provenance label. The builder maps that label out of customer-facing version metadata, queries and storage keys without changing any item.

`scripts/build_ac9m2n02_research_bank.py` refuses an unapproved candidate hash and writes canonical JSON/live aliases. Do not pass this multi-type bank through the old MCQ-only generic publisher. No Content Verified ledger/badge change: this is a dev build, not production release.

Shared changes: opt-in authored sitting length (legacy default five), retaining authored diagrams in saved review, respecting the existing authored-preparation flag in the Year 2 notes enricher. Focus-specific best-score keys and versioned result keys isolate new questions from old results. Prior results are not migrated or deleted.

The old worksheet generator expects its original schema. Its former 24-question input is preserved byte-for-byte in worksheet/legacy-questions.js and its loader now points there. Existing Topic Guide, Teacher Slides and worksheet content remain outside this rebuild, with their routes available. The separate 38-page worksheet produced concurrently and later added to research has different numerical parameters; no workbook-to-bank item identity is claimed and that accepted worksheet is not replaced.

Completed results and adult marks persist locally after reload. Unfinished sittings restart after refresh; resume and Supabase/profile storage were not added or claimed.

## QA status

Independent runtime/visual QA: APPROVED for this dev bank by tester_review_n02. All 46 items across 138 viewport cases and all 18 contact sheets were checked, with 60 sweep functional checks plus final scaffold, keyboard, versioned-key and adult-mark persistence rechecks. See independent-test-report.md, tester-approval.json and final-source-hashes.json. Contact sheets are preserved in visual-evidence/; bulk session screenshot paths in the ledger refer to the original scratch capture. One generic helper-load event from rapid navigation is retained in raw evidence; final normal-context flows recorded zero errors. No real-device, production, account/Supabase or worksheet-fidelity approval is claimed. Root scoped automated checks: 10 passed (5 bank regressions, 5 existing content-validation checks). Balanced launch sections and Start containment also pass.

## Item-to-evidence mapping

| Versioned item | Focus | Response | Existing inspected evidence |
|---|---|---|---|
| AC9M2N02-V2-P-PN01 | PN | fill-blank | N02-B01, N02-B02 |
| AC9M2N02-V2-P-PN02 | PN | self-check | N02-B01, N02-B02, N02-B16 |
| AC9M2N02-V2-P-PN03 | PN | fill-blank | N02-B13, N02-B15 |
| AC9M2N02-V2-P-PN04 | PN | fill-blank | N02-B10, N02-B11 |
| AC9M2N02-V2-P-PN05 | PN | number | N02-B05, N02-K01, N02-B09 |
| AC9M2N02-V2-P-PN06 | PN | self-check | N02-B16 |
| AC9M2N02-V2-P-PN07 | PN | self-check | N02-B01, N02-B02, N02-B17 |
| AC9M2N02-V2-P-PN08 | PN | single | N02-M03, N02-M04 |
| AC9M2N02-V2-P-PN09 | PN | fill-blank | N02-M01, N02-M02, N02-M06 |
| AC9M2N02-V2-P-PN10 | PN | self-check | N02-B17, N02-M03, N02-M04, N02-M05, N02-M06 |
| AC9M2N02-V2-P-EX01 | EX | fill-blank | N02-B04, N02-I01, N02-W07 |
| AC9M2N02-V2-P-EX02 | EX | fill-blank | N02-I04, N02-I05, N02-N01 |
| AC9M2N02-V2-P-EX03 | EX | number | N02-I01, N02-I02, N02-I03 |
| AC9M2N02-V2-P-EX04 | EX | number | N02-I04, N02-I05 |
| AC9M2N02-V2-P-EX05 | EX | fill-blank | N02-B05, N02-N01, N02-N02 |
| AC9M2N02-V2-P-EX06 | EX | number | N02-B06, N02-I03 |
| AC9M2N02-V2-P-EX07 | EX | fill-blank | N02-B07, N02-B08, N02-N03, N02-N04 |
| AC9M2N02-V2-P-EX08 | EX | single | N02-I01, N02-N01, N02-W07 |
| AC9M2N02-V2-P-EX09 | EX | self-check | N02-W10, N02-I01, N02-N03 |
| AC9M2N02-V2-P-EX10 | EX | self-check | N02-W10, N02-M03, N02-N04 |
| AC9M2N02-V2-P-ZR01 | ZR | fill-blank | N02-B14, N02-C01 |
| AC9M2N02-V2-P-ZR02 | ZR | fill-blank | N02-M08, N02-K03 |
| AC9M2N02-V2-P-ZR03 | ZR | self-check | N02-C02, N02-M07 |
| AC9M2N02-V2-P-ZR04 | ZR | number | N02-K01, N02-K02, N02-B12 |
| AC9M2N02-V2-P-ZR05 | ZR | number | N02-K03 |
| AC9M2N02-V2-P-ZR06 | ZR | self-check | N02-W12, N02-B14, N02-C01 |
| AC9M2N02-V2-P-ZR07 | ZR | fill-blank | N02-R02, N02-R06, N02-M07 |
| AC9M2N02-V2-P-ZR08 | ZR | number | N02-R01, N02-R03, N02-R04 |
| AC9M2N02-V2-P-ZR09 | ZR | single | N02-R05, N02-M07, N02-M08 |
| AC9M2N02-V2-P-ZR10 | ZR | self-check | N02-R05, N02-R06, N02-C02 |
| AC9M2N02-V2-T01 | PN | fill-blank | N02-B13, N02-B15 |
| AC9M2N02-V2-T02 | PN | fill-blank | N02-B10, N02-B11 |
| AC9M2N02-V2-T03 | PN | number | N02-B05, N02-K01, N02-B09 |
| AC9M2N02-V2-T04 | PN | self-check | N02-B01, N02-B02, N02-B17 |
| AC9M2N02-V2-T05 | PN | self-check | N02-M03, N02-M04, N02-M05, N02-M06 |
| AC9M2N02-V2-T06 | EX | self-check | N02-B04, N02-W07 |
| AC9M2N02-V2-T07 | EX | fill-blank | N02-N01, N02-N02 |
| AC9M2N02-V2-T08 | EX | number | N02-I01, N02-I02, N02-I03, N02-I04, N02-I05, N02-B06 |
| AC9M2N02-V2-T09 | EX | fill-blank | N02-B07, N02-B08, N02-N03, N02-N04 |
| AC9M2N02-V2-T10 | EX | self-check | N02-W10, N02-I01, N02-N03 |
| AC9M2N02-V2-T11 | ZR | number | N02-B14, N02-C01 |
| AC9M2N02-V2-T12 | ZR | self-check | N02-M07, N02-M08, N02-C02 |
| AC9M2N02-V2-T13 | ZR | number | N02-R01, N02-R02, N02-R03, N02-R04 |
| AC9M2N02-V2-T14 | ZR | self-check | N02-R05, N02-W12 |
| AC9M2N02-V2-T15 | ZR | self-check | N02-M07, N02-M08, N02-R06 |
| AC9M2N02-V2-T16 | EX | fill-blank | N02-I04, N02-I05, N02-N01 |
