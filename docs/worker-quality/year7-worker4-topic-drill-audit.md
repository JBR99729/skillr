# Year 7 Worker 4 Topic and Daily Drill Audit

Date: 2026-08-25

Scope: Year 7 Maths, Science and English topic pages, followed by Year 7 Daily Drill banks only.

## Topic Page Audit

- Checked 72 Year 7 topic pages across Maths, Science and English.
- Preserved strong authored teaching content, diagrams, curriculum mappings, resource links and feedback cards.
- Maths and English topic pages already had substantial static in-page teaching, worked examples, disclosure sections and aligned resource links.
- Science AC9S7U01, AC9S7U02, AC9S7U03 and AC9S7U06 had strong content but long always-open section stacks. These were converted to native `<details>` disclosure sections while keeping the key concept section open.
- No new diagrams were added. Existing diagrams were retained because they teach classification, food webs, Earth-Sun-Moon geometry and mixture separation directly.

## Daily Drill Audit

- Existing `docs/year7-stem-quality-audit-2026-08.md` documents prior deep pedagogical QA for Year 7 STEM, including drill selection/runtime fixes.
- Current generation audit passed for all 23 Year 7 Daily Drill skills across Maths, Science and English.
- Generated counts matched expected banks: 240 Maths questions per drill skill, 200 Science and English questions per drill skill.
- Validated answer/index shape, unique single-choice options, explanations and available quick-read/quick-review support.
- No Daily Drill rewrites were made because the current banks are already documented and generation-valid for this pass.

## Remaining Recommendation

Future improvement should be selective P1 authoring only where earlier audit notes identify small pools or repeated stems. Do not rewrite strong Daily Drill banks wholesale.
