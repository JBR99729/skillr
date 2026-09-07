# AC9M3M02 strict validation

Status: VALIDATED.
Publication: PUBLISHED TO MAIN AND DEPLOYED.

Content commit: `70dff249ef35e9ca583be522f3a5f1d4b6a31f34`. Pages run `34084586890` succeeded.

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
- Full-tree release integrity: PASS, 18108 → 18111 files, zero deletions. Connector candidate tree SHA exactly matched the locally validated complete tree. Remote main rechecked immediately before non-forced update.

The legacy verification ledger already includes M02; the required reviewed publisher was run and ledger freshness checked. The strict completion count is now 5/23 after deployment and live QA.

## Deployment and live QA

- Pages build and deployment: SUCCESS.
- CI question-bank quality, runtime content ownership, Year 3 pre-module notes, Year 3 static topic pages, Foundation–Year 4 complete rollout, F–10 layout, static curriculum audit and release integrity: SUCCESS.
- AdSense guard: FAILURE on pre-existing Year 2 Science worksheet routes AC9S2I01–I06 and sitemap.html. Job 101626085094 shows those seven files would be changed by the guard; none was part of this M02 release. Not classified as an M02 bank failure.
- Live homepage loaded successfully.
- Live practice: required pre-read screen appeared; reviewed P034 served; correct tool answer increased score to 1 and showed the authored explanation.
- Live test: QA label used; required pre-read screen appeared; reviewed T007 served; correct 750 g answer increased score to 1 and showed the authored explanation.
- Live test T011: two-jug SVG displayed with readable labelled scales, water levels, units and matching answer choices.
- Live evidence is a smoke test of both modes and one instrument visual, not a claim that all 64 questions were individually clicked in production or that mobile was separately tested. All 64 generated answer mappings and all 24 SVGs were checked locally.
