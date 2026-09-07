# AC9M3M01, AC9M3SP01, AC9M3SP02 and AC9M3ST01 validation

Date: 2026-09-07

## Status at content-release preparation

| Code | Readiness gate | Draft | Local validation | Publication |
|---|---|---|---|---|
| AC9M3M01 | PASS | 48 practice + 16 test | VALIDATED | Pending |
| AC9M3SP01 | PASS | 48 practice + 16 test | VALIDATED, with physical-making limitation below | Pending |
| AC9M3SP02 | PASS | 48 practice + 16 test | VALIDATED, with freehand-creation limitation below | Pending |
| AC9M3ST01 | PASS | 48 practice + 16 test | VALIDATED | Pending |

Each readiness map records the exact ACARA descriptor, analyst decomposition, exact IXL URLs, directly observed live/example evidence, unobserved progression and pre-draft allocation. All questions and explanations are independently authored by SkillrHub; no IXL stem, worked solution or answer set was copied.

## Local checks

- `validate_production_question_bank.mjs`: PASS for all four banks; 64 unique IDs and prompts per code, exact 48/16 counts, four options, one correct answer, and 12/12/12/12 practice plus 4/4/4/4 test answer-position distributions.
- Reviewed publisher: PASS for all four code-specific production routes and review-ledger updates.
- Question-quality ratchet: PASS WITH LEGACY DEBT; touched content introduced no templated stems and reduced repository legacy debt.
- Year 3 Maths pre-module notes: 23/23 PASS.
- Year 3 Maths static topic pages: 23/23 PASS.
- Foundation classroom rollout regression check: PASS.
- Route ownership: practice and test pages load their code-specific question files; no `experience-teacher-questions.js` override is present.
- AC9M3SP02 map artwork rendered and visually checked for readable grid labels, landmarks and clipping.

## Assessment limitations

- AC9M3SP01 selected-response questions assess features, comparison, classification, construction planning and fitness for use. They cannot independently prove that a student physically made an object; an adult-observed hands-on construction remains required for that component.
- AC9M3SP02 selected-response questions assess map interpretation, completion choices, relative location, legends and representation quality. They cannot independently prove freehand creation; an adult-observed draw-and-explain map task remains required.
- AC9M3ST01 covers the IXL-observed tally/table/graph-recording depth and ACARA-driven acquisition and spreadsheet components. IXL was not credited for acquisition-method or spreadsheet content that was not present in the inspected Year 3 skills.

Publication and live QA are deliberately reported separately and must be added only after the complete-tree release, Pages success and live practice/test checks.
