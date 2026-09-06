# Worker 2 Year 3-4 quality audit - 2026-08-25

Scope: Year 3 and Year 4 Maths, Science and English Topic Pages first, then Year 3-4 Daily Drills. Practice and Test banks were intentionally excluded.

## Topic page audit

- Checked 126 curriculum-code topic pages under `year3/{maths,science,english}` and `year4/{maths,science,english}`.
- Confirmed topic teaching content is present directly in page HTML; no topic page in this scope depends on `topicRoot` or curriculum-data runtime rendering for the canonical topic body.
- Confirmed resource wiring is present across the scope: Teacher Slides, Worksheet, Practice, Test, feedback/report controls and formal curriculum references.
- Preserved strong existing authored content, especially the deep standalone AC9M3M03 and AC9M3M04 time lessons.
- Improved only genuine weaknesses found during the pass:
  - added compact formative quick-check/feedback sections to six Year 4 Maths pages that had good models but weak mastery evidence;
  - opened the first learning section on those same pages so the highest-value teaching content is immediately visible;
  - restored missing report/reference release-gate controls on AC9M3M03 and AC9M3M04.

No decorative diagrams or raster images were added. Existing lightweight HTML/CSS visual models were retained.

## Daily Drill audit

- Year 3 STEM and Year 4 STEM Daily Drills were skipped for rewriting because `docs/year3-stem-quality-audit-2026-08.md` and `docs/year4-stem-quality-audit-2026-08.md` already document them as structurally sound shared pools.
- Year 3-4 English Daily Drills were audited through the shared generator:
  - Year 3 Reading Comprehension: 200 questions, 25 sets, 200 unique IDs, valid answer keys, hints and explanations.
  - Year 3 Vocabulary and Word Meaning: 200 questions, 25 sets, 200 unique IDs, valid answer keys, hints and explanations.
  - Year 3 Language Skills: 200 questions, 25 sets, 200 unique IDs, valid answer keys, hints and explanations.
  - Year 4 Reading Comprehension: 200 questions, 25 sets, 200 unique IDs, valid answer keys, hints and explanations.
  - Year 4 Vocabulary and Word Meaning: 200 questions, 25 sets, 200 unique IDs, valid answer keys, hints and explanations.
  - Year 4 Language Skills: 200 questions, 25 sets, 200 unique IDs, valid answer keys, hints and explanations.

Result: Year 3-4 English Daily Drills meet the >=8.5/10 target without rewriting. They use broad skill pools, 8-question attempts, hints, explanations, quick-review support and 25-set rotation.

## Remaining notes

- Year 3 Maths still includes a small number of older strong pages that use `<section>` rather than `<details>`. They were preserved because their teaching quality is high and changing the structure would be churn rather than a genuine educational improvement.
- This worker did not open or modify Practice/Test banks.
