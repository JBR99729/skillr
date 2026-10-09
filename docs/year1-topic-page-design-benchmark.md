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
