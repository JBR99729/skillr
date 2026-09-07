# AC9M3M03 validation report — Year 3 Mathematics

Status: VALIDATED
Publication status: PUBLISHED TO MAIN AND DEPLOYED

## Curriculum and IXL readiness

- Official descriptor verified from the Australian Curriculum v9 workbook: “recognise and use the relationship between formal units of time including days, hours, minutes and seconds to estimate and compare the duration of events”.
- Assessable components covered: unit relationships, use of unit relationships, estimating duration, comparing duration, elapsed time with minutes/hours/days/seconds.
- IXL pages inspected before drafting: elapsed time, elapsed-time word problems, and relating seconds/minutes/hours. The inspection included worked examples and representative live questions across accessible progression, including crossing an hour/noon and minute-precision elapsed-time examples.
- Unobserved limitation recorded: IXL did not expose a separate Year 3 day-duration or estimation-only skill during this sweep, so those components are grounded in the ACARA descriptor and elaborations rather than claimed as observed IXL progression.

## Bank validation

- 64 original questions: 48 practice and 16 test.
- Existing IDs, curriculum code, bank assignment and skill tags preserved.
- Correct answer distribution is balanced: practice 12/12/12/12; test 4/4/4/4.
- All questions have four options, one correct answer and teaching explanations.
- No review-status wording appears as an answer.
- Three timeline visuals render clearly and are referenced through `ac9m3m03-v2.svg`.

## Checks run

- `node scripts/validate_production_question_bank.mjs assets/assessment-banks/year3/math/ac9m3m03.json` — PASS.
- Generated production practice/test question JavaScript with the reviewed publisher — PASS.
- Generated JavaScript compared back to the reviewed JSON source — PASS.
- Timeline SVG symbols rendered as standalone QA images — PASS.
- Practice/test route script selection inspected: each route loads one code-specific reviewed `questions.js`; no legacy experience-teacher override was present — PASS.
- `node scripts/validate_runtime_content_ownership.mjs` — PASS.
- `node scripts/check_release_integrity.mjs` — PASS, 18105 → 18105 files and no deletions.

Live production QA: Pages deployment succeeded. Practice loaded the reviewed AC9M3M03 bank and marked a correct response with teaching feedback. Test loaded the reviewed AC9M3M03 test bank and required pre-read flow; live question serving was confirmed. Final answer-button marking on the test route could not be completed because the browser automation wrapper timed out on the visible enabled answer button, while local test marking validation passed.
