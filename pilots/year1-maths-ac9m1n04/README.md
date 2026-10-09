# Year 1 Maths practice pilot — AC9M1N04

Saved 10 October 2026 for continuation. Standalone HTML and vanilla JavaScript; open SkillrHub_Year1_Maths_Pilot.html in a browser. No build step or dependencies.

## Current behaviour
- Four strands of 15 questions plus a 16-question quick check (76 total).
- One question at a time, automatic marking, review and retry until correct.
- Correct questions and completed strands turn grey.
- Browser-local progress and detailed attempt history; optional learner label.
- Active time per strand and total code time, including quick check and retries. Hidden/unfocused tabs and inactivity beyond 60 seconds are excluded.
- Compact editor-style layout; printable journey uses one row per strand with completion date, first/latest results, rechecks, runs, time and status.
- JSON journey export preserves detailed answers.

## Handoff
This is a prototype stored on a dedicated branch, not a live-site release. It has no accounts, payment access, cloud sync or live-tracker integration. Preserve the question flow and timing when continuing. The question bank and all styling/scripts are embedded in the HTML.

Validation completed: answer-key and retry checks, save/restore, timer pause/resume, mobile width, five-row printed summary and total/strand time calculations. Homeschool report is supporting evidence, not a jurisdiction-approved report or independent-mastery certification.
