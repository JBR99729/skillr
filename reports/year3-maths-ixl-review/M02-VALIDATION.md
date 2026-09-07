# AC9M3M02 strict validation

Status: VALIDATED locally.
Publication: NOT YET PUBLISHED. Deployment and live QA pending.

- Exact ACARA workbook descriptor and elaborations reread; source hash matches the saved official extraction.
- Sequential actual IXL skill and expanded-example observations, coverage boundaries and unobserved adaptive stages recorded before drafting in M02-READINESS-COVERAGE.md.
- Replaced 16 repeated prompt families with 64 authored tasks: 48 practice and 16 test. All existing IDs, bank assignments, code, subject, year and legacy skill tags preserved.
- 24 original ruler, labelled scale, digital scale and measuring-jug diagrams. All rendered and visually reviewed. Label-to-outline collisions found in the first rendering were fixed and all diagrams rerendered.
- Correct answers, distractors and explanations manually reviewed. Four answer choices and one correct answer per question. Distribution 12/12/12/12 practice and 4/4/4/4 test.
- Both routes retain five-question shuffled attempts and required pre-module notes. Added an unscored adult-observed measurement task with observable criteria; MCQ scores do not certify hands-on measuring.
- Production bank validator: PASS.
- Generated practice/test source checked against all JSON questions, choices and correct indices: PASS. Preserved identity comparison against pre-change bank: PASS.
- Route script ownership checked: one mode-specific reviewed questions.js, new cache version, no experience-teacher override: PASS.
- Runtime content ownership, Year 3 static topic pages, Year 3 pre-module notes, Foundation classroom rollout and content-verification ledger checks: PASS.
- Full-tree release integrity: pending candidate commit.

The legacy verification ledger already includes M02; the required reviewed publisher was run and ledger freshness checked. The strict completion count remains 4/23 until this release is deployed and live QA is complete.
