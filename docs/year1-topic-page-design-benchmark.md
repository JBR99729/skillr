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


## 9 October 2026 — scoped Year 1 rollout

Owner-approved scope: 15 existing Maths guides, 10 Science guides and English AC9E1LA01–AC9E1LA07. The other 23 English guides, subject hubs, presentations, printable files, question banks and tracker are untouched. No new curriculum route is introduced.

The pages reuse the approved opt-in static layout. Each has a plain-language title, a matching paid worksheet card, learning sections with original or retained researched examples and answer reveals, an existing visual worked example, the existing curated video link, visible quiz/test links and a compact Print & Go product-information link. Parents, teachers and school administrators can contact skillrhublearning@gmail.com about customised packs without commercial branding or tailored resources.

Curriculum descriptions, elaboration panels, mappings, research/process notes and extra teaching-resource panels are archived in HTML comments. Complete previous authored bodies remain recoverable in source. Existing visual assets, teacher-viewer routes, metadata and JSON-LD are preserved. New learning HTML is authored before delivery; there is no client-side content renderer.

Copy uses approximately 10 questions per learning strand. Recorded per-pack counts are retained: English LA02–LA07 have 15 test questions; LA01 has 20, most Maths packs have 16, ST02 has 20, and Science packs have 20. Science U02 has 62 practice questions. There is no universal 15-question claim or live-price promise.

### Research provenance

No new external source inspection is claimed. Stored IXL observations are distinguished from catalogue/source-access gaps in the underlying records. The dated materials control the concept boundaries; page examples are original adaptations and existing reviewed visual explanations. No worksheet questions were changed or copied into a new bank.

- Maths: code-specific sections of `Year1_Mathematics_Curriculum_Research_Master.txt` in skillr; the research repo's `year-1/maths/supporting-research/docs/question-bank-reviews/2026-09-06-year1-maths-drills-n01-n02.md` supplements N01/N02. The research repo currently holds that dated Maths supporting file; the full Year 1 Maths master was located in skillr, not falsely attributed to research-.
- Science H01/I01–I06: respective `year-1/science/AC9S1*/[h/i]01.txt` etc. in research-, using their 8 October workbook research/boundaries, plus the dated supporting-research reviews.
- Science U01–U03: `year-1/science/supporting-research/scripts/year1_science_ixl_review/u01.txt`–`u03.txt`, the associated dated U01–U03 review, and code-specific sections in `Year1_Science_Curriculum_Research_Master.txt` in skillr.
- English LA01–LA07: each `year-1/english/AC9E1LA0*/la0*.txt`, plus `year-1/english/topic-refresh/teaching-data.json` from research-. Existing researched six-focus teaching, concept boundaries, inclusive responses and practical observation requirements are retained.

### Page identities and product counts

| Code | Guide | Practice / Test |
| --- | --- | --- |
| AC9E1LA01 | `year1/english/ac9e1la01-how-language-facial-expressions-and-gestures-are-used-to/index.html` | 60 / 20 |
| AC9E1LA02 | `year1/english/ac9e1la02-language-to-provide-reasons-for-likes-dislikes-and-preferences/index.html` | 60 / 15 |
| AC9E1LA03 | `year1/english/ac9e1la03-how-texts-are-organised-according-to-their-purpose-such-as/index.html` | 60 / 15 |
| AC9E1LA04 | `year1/english/ac9e1la04-how-repetition-rhyme-and-rhythm-create-cohesion-in-simple-poems/index.html` | 60 / 15 |
| AC9E1LA05 | `year1/english/ac9e1la05-how-print-and-screen-texts-are-organised-using-features-such/index.html` | 60 / 15 |
| AC9E1LA06 | `year1/english/ac9e1la06-that-a-simple-sentence-consists-of-a-single-independent-clause/index.html` | 60 / 15 |
| AC9E1LA07 | `year1/english/ac9e1la07-that-words-can-represent-people-places-and-things-nouns/index.html` | 60 / 15 |
| AC9M1A01 | `year1/maths/ac9m1a01-skip-counting-pattern-sequences/index.html` | 60 / 16 |
| AC9M1A02 | `year1/maths/ac9m1a02-repeating-patterns/index.html` | 60 / 16 |
| AC9M1M01 | `year1/maths/ac9m1m01-comparing-length-mass-capacity-and-duration/index.html` | 60 / 16 |
| AC9M1M02 | `year1/maths/ac9m1m02-measuring-length-with-informal-units/index.html` | 60 / 16 |
| AC9M1M03 | `year1/maths/ac9m1m03-time-years-months-weeks-days-and-hours/index.html` | 60 / 16 |
| AC9M1N01 | `year1/maths/ac9m1n01-numbers-to-120/index.html` | 60 / 16 |
| AC9M1N02 | `year1/maths/ac9m1n02-partitioning-tens-and-ones/index.html` | 60 / 16 |
| AC9M1N03 | `year1/maths/ac9m1n03-skip-counting-and-equal-groups/index.html` | 60 / 16 |
| AC9M1N04 | `year1/maths/ac9m1n04-addition-and-subtraction-within-20/index.html` | 60 / 16 |
| AC9M1N05 | `year1/maths/ac9m1n05-additive-problem-solving-and-money/index.html` | 60 / 16 |
| AC9M1N06 | `year1/maths/ac9m1n06-equal-sharing-and-grouping/index.html` | 60 / 16 |
| AC9M1SP01 | `year1/maths/ac9m1sp01-familiar-shapes-and-objects/index.html` | 60 / 16 |
| AC9M1SP02 | `year1/maths/ac9m1sp02-directions-and-location/index.html` | 60 / 16 |
| AC9M1ST01 | `year1/maths/ac9m1st01-collecting-categorical-data/index.html` | 60 / 16 |
| AC9M1ST02 | `year1/maths/ac9m1st02-representing-and-comparing-data/index.html` | 60 / 20 |
| AC9S1H01 | `year1/science/ac9s1h01-science-in-daily-life/index.html` | 60 / 20 |
| AC9S1I01 | `year1/science/ac9s1i01-questions-patterns-and-predictions/index.html` | 60 / 20 |
| AC9S1I02 | `year1/science/ac9s1i02-safe-investigation-procedures/index.html` | 60 / 20 |
| AC9S1I03 | `year1/science/ac9s1i03-making-and-recording-observations/index.html` | 60 / 20 |
| AC9S1I04 | `year1/science/ac9s1i04-sorting-data-and-representing-patterns/index.html` | 60 / 20 |
| AC9S1I05 | `year1/science/ac9s1i05-comparing-observations-and-predictions/index.html` | 60 / 20 |
| AC9S1I06 | `year1/science/ac9s1i06-communicating-scientific-ideas/index.html` | 60 / 20 |
| AC9S1U01 | `year1/science/ac9s1u01-needs-of-plants-and-animals/index.html` | 60 / 20 |
| AC9S1U02 | `year1/science/ac9s1u02-daily-and-seasonal-changes/index.html` | 62 / 20 |
| AC9S1U03 | `year1/science/ac9s1u03-pushes-and-pulls/index.html` | 60 / 20 |

### Validation

All 32 guides passed static content, unchanged title/description/robots/canonical/JSON-LD, unique IDs, valid visible internal routes and fragments, correct resource mapping, hidden clutter, authored-source preservation and retained existing teaching-image checks. Browser checks covered all 32 pages at 320, 390 and 1440px with JavaScript disabled; collapsed and expanded content had no page overflow, and native disclosures worked. Representative paid-link and section-open analytics were checked across all three subjects. Six desktop/mobile page samples were visually reviewed. The final contact note was included in subsequent targeted mobile checks.

No independent curriculum-content verification or new Content Verified status is claimed. This is a scoped UX/learning-support commit, not a question-bank release.

### English LA08 added — 9 October 2026

The owner expanded the selected English topic batch through AC9E1LA08. Its completed research record `research-/year-1/english/AC9E1LA08/la08.txt` (blob `5e1ad05223afa9d581c8b1dc9468779c41d3093d`) and `worksheet/research-blueprint.json` supply six focuses: observe clues, compare representations, combine words and images, interpret diagrams/signs, follow sequences and compare text purposes. The existing authored worked example is retained. Two original inline SVG models make the flower comparison and growth sequence visible. No external artwork or source questions are reproduced. The optional authentic museum extension keeps the named artist and publisher guidance.

Product information reflects the existing listing and final research release: 61 pages, 60 practice questions, 15 separate test questions and five additional vocabulary/dictation questions. Quiz/Test routes, the existing video ID and SEO values/JSON-LD are preserved; the video plays in the same shared in-page player. Previous curriculum/resource panels remain archived in comments. The page passed static metadata/content checks and browser overflow/expanded-content checks at 320, 390, 768 and 1440 pixels without JavaScript. This design maintenance does not claim an independent topic-page approval or alter content-verification status.
