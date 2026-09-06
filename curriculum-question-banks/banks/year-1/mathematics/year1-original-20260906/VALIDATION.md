# Import verification - 6 September 2026

- All 600 rendered prompts, explanations, answer keys and semantic models match the canonical JSON.
- All 205 visuals render as semantic HTML or SVG; counter totals and equal-square geometry were checked.
- Completed 60 simulated attempts through the actual quiz runtime: three Practice sets and one Test for each of 15 codes.
- Every Practice set contains six MCQs and two short tasks, ordered by authored difficulty. Three sets cover all 24 questions without repetition.
- Tests contain all 16 questions in authored order, with shuffled choice positions.
- Adult tasks remain pending, do not award correctness for submission, and block Test passes and certificates until checked.
- Adult review, correction of a previous mark, updated best scores, result pages and the same dashboard attempt were exercised together.
- Malformed numeric sequences, wrong operators and wrong values are rejected; every canonical automatically checked answer is accepted.
- The 30 launch pages, 90 supporting routes, versioned result keys, titles, canonicals and curriculum links were checked.
- All 15 worksheet banks are byte-for-byte copies of their preceding Practice banks, keeping the existing single-page worksheet generator intact.
- CSV roundtrip: all 600 rows and metadata match the canonical source.
- Existing Year 2 quiz rendering, marking and progress pass a regression check. A missing Year 1 support file safely disables starting the new quiz.
- Repository gate: `node scripts/validate_year1_maths_static_topic_pages.mjs` passes for 15/15 codes.
- JavaScript syntax and Git whitespace checks pass.

The DOM/runtime checks use jsdom 26 installed outside the repository, with audio, canvas and navigation platform APIs stubbed. They are not browser screenshot or device-layout tests. The separate US Letter workbook was rendered and visually inspected before delivery.

To repeat the runtime checks, install jsdom 26 in a test environment and run:

```sh
NODE_PATH=/path/to/test/node_modules node scripts/validate-year1-visual-bank.cjs
NODE_PATH=/path/to/test/node_modules node scripts/validate-year1-visual-bank.cjs --legacy
```
