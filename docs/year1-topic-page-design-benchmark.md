# Year 1 topic-page commercial design benchmark

Pilot: AC9M1N01, Numbers to 120. This shell supports the existing static topic-guide architecture; it does not change lesson delivery, question banks or Classroom Views.

## Purpose

Drive informed purchases of matching SkillrHub TpT worksheet packs while providing useful learning support before, during and after paper practice. Measure useful lesson engagement rather than adding content to increase page length.

## Page hierarchy

1. Short topic title and year/subject. Formal curriculum labels stay out of the visible learning flow.
2. One primary action: view the matching worksheet pack on TpT. A secondary action starts the free guide.
3. Actual pack cover and confirmed contents. Distinguish paid-pack question counts from free online question-bank counts.
4. Relevant strand, term and yearly bundle links near the top; disclose overlapping contents.
5. On-page navigation: learn, worked example, teaching help, worksheets/resources.
6. Visible learning goals and a worked example. Preserve code-specific explanations, illustrations, questions, hints and answers in static HTML.
7. Native expandable teaching support, practical activities, learning focuses and revision. Use useful, plain-language section labels.
8. A contextual worksheet purchase action after the lesson.
9. At the owner's explicit request on 9 October 2026, comment out the curriculum/reference sections, extra teaching-resource panels, video notices, tracker promotion and oversized feedback panel. Retain those sections in HTML comments for restoration. The underlying resource routes remain unchanged.
10. Provide the next relevant topic, a route back to the subject catalogue and a simple contact link.

## Visual rules

- Restrained navy/teal palette, white learning panels, generous spacing and consistent typography.
- Clear primary/secondary buttons; avoid several equal-weight promotions in the hero.
- Single-column learning content. No empty or hidden commercial sidebar.
- Mobile stacks the hero and product information; resource cards become one column.
- Keep real learning visuals prominent; avoid decorative stock images and invented product previews.
- Keyboard focus stays visible. Content and native disclosures work without JavaScript.
- Shared CSS is opt-in through `topic-learning-page`; unchanged pages are unaffected.

## Measurement

The pilot records existing-style `tpt_outbound_click` events with curriculum code, placement, product ID and destination. It also records on-page section clicks and user-opened learning sections. It does not infer purchases or learner mastery. Default-open sections do not count as user engagement.

## Rollout

Start with this first Year 1 Maths topic. Use the benchmark for subsequent Year 1 topics only after checking each page's teaching content, real product destination, pack contents, worked example and mobile presentation. Reuse the shell and hierarchy, not another topic's learning copy. Keep metadata and all existing resource routes unless a specific defect requires correction.

## Research-based learning revision — 9 October 2026

Owner instruction: use the available research repository to support learning on the page. The six learning focuses now use original short explanations, worked steps, examples and answer reveals instead of the earlier general guide panels. Earlier useful authored content remains in source comments for recovery.

Evidence read:

- `JBR99729/research-`, `year-1/maths/supporting-research/docs/question-bank-reviews/2026-09-06-year1-maths-drills-n01-n02.md`, blob `3a245fadcecc386ac27db0cac469713312a9c018`. Its recorded IXL live-question and worked-example observations support number names, grouped quantities, before/after, lines/order, number-chart movements and comparisons. The record distinguishes unverified live audio and observed entry tasks from later adaptive progression.
- `JBR99729/skillr`, `Year1_Mathematics_Curriculum_Research_Master.txt`, blob `61e26fac30f5dcd002416282be2b5753329d87f9`, AC9M1N01 section. Its existing IXL/Khan observations support six teaching steps, decade/hundred crossings, mixed-length ordering, misconceptions and the range to 120.

| Visible focus | Evidence used | Page teaching decision |
| --- | --- | --- |
| Read and write numbers | R: names; master quantity/name/numeral connections | Connect numeral, spoken name and tens/ones; explain the zero in 105. |
| Show tens and ones | Q: counted/grouped collections; master concrete materials | Original diagram with four exact ten-groups and seven ones; count full tens before loose counters. |
| One more and one less | L: forwards/backwards, missing positions | Model 68/69/70 and the neighbouring numbers around 110. |
| Count past 99 | L/C: crossings and relative location; master 99/100 boundary | Explain ten tens, 100/101, zero tens in 103, and equal number-line steps. |
| Use the 120 chart | H: missing cells and relative neighbours | Exact static 1–120 chart, horizontal ±1, vertical ±10 and the row-end distinction. |
| Compare and order | C/L: place-by-place comparison and mixed-digit ordering | Explain hundreds/tens/ones, 58 versus 85, order 89/98/108, and connect words with comparison signs. |

These are adaptations of saved observed task patterns, not copies of source questions or claims of new live research. Formal partition algorithms and numbers beyond 120 stay outside the teaching scope. The paid pack and its 60/16 counts are unchanged. This is a topic-page revision, not a workbook, question-bank or Classroom View rebuild; no independent-review or content-verification badge is claimed.
