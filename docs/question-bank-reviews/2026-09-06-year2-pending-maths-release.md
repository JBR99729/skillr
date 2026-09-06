# Year 2 Mathematics: remaining nine-code release

## Scope and evidence

AC9M2M01–M05, AC9M2SP01–SP02 and AC9M2ST01–ST02: 24 Practice and 16 Test questions each, 360 original questions. Every new question, all three alternatives, its answer and explanation were individually read and checked. Practical/drawing tasks have model responses and acceptance criteria instead of automatic correctness. The old lost M01 draft was reconstructed and reviewed afresh.

Official authority: the Year 2 Australian Curriculum v9 descriptors and achievement standard, checked against the [QCAA alignment document](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_yr2_as_cd_alignment.pdf). IXL is a teaching reference, not the curriculum authority.

IXL evidence: [public sweep notes](2026-09-06-year2-public-ixl-sweep.md) and [M02 notes](2026-09-06-year2-maths-m02.md). Together these cover 37 distinct skills: 33 mapped skills and four supplementary fraction skills. Worked explanations and representative displayed entry tasks were inspected sequentially in the existing browser. No claim is made to exhaustive adaptive progression or access to IXL's full question bank. Wording and SVG artwork here are original.

## Descriptor coverage

Each row covers P001–P024 and T001–T016 for the named code. Item `skill` tags provide the detailed question-to-component map.

| Code | Assessable coverage in the new bank | Practical tasks (Practice / Test) |
|---|---|---:|
| AC9M2M01 | Measure and compare length, capacity and mass; uniform informal units; aligned endpoints; gaps/overlaps, equal full pours and equal-mass balance units; unit-size effects and smaller units for precision; unfair comparisons and appearance misconceptions | 1 / 1 |
| AC9M2M02 | Identify and represent halves, quarters and eighths of shapes, objects and event durations; equal parts, same whole, alternate partitions, common uses and simple part relationships | 2 / 1 |
| AC9M2M03 | Calendar dates and weekdays; month endings; weeks/fortnights; days between events; forwards/backwards counting and month boundaries; starting-day counting errors | 2 / 2 |
| AC9M2M04 | Read analogue whole, half and quarter hours; distinguish hand roles; moving hour hand; quarter-to names the next hour; twelve boundary; words/digital matches and drawing clocks | 2 / 2 |
| AC9M2M05 | Identify, describe and demonstrate quarter, half, three-quarter and full turns; everyday movement; direction, starting orientation, compositions and reversals; amount versus endpoint, speed or pointer length | 2 / 2 |
| AC9M2SP01 | Recognise, compare and classify 2D shapes by straight/curved boundaries, side counts, opposite/adjacent and parallel sides; varied/rotated/irregular shapes, closure and property-based grouping | 2 / 2 |
| AC9M2SP02 | Locate positions in 2D familiar-space plans; fixed page perspective; relative positions; follow and describe ordered pathways; return routes, obstacles, boundaries and missing moves | 3 / 3 |
| AC9M2ST01 | Acquire categorical data through surveys, observation and experiments; categories and collection rules; lists/tallies/tables and digital entry; actual collection; zero counts, omissions, duplicates and corrections | 3 / 3 |
| AC9M2ST02 | Create and interpret one-to-one picture/bar graphs and tables; compare shared counts and distinct representation features; software where available; titles, labels, keys, scale/baseline; category order, ties, zero, updates, totals and evidence limits | 3 / 3 |

Drawing, collection, measurement and movement are retained as real tasks: 39 questions require adult review. Appropriate digital work permits adult assistance or a paper representation if a device is unavailable. This accommodates access without pretending that a multiple-choice item demonstrates actual data collection or graph creation.

## Corrections and visual review

- M04 P016: explicitly located the hour hand between 7 and 8; proximity alone was ambiguous.
- ST01 P008: removed editorial wording from a distractor for the zero count.
- ST02: added a visible symbol to the one-vote key so the key-counting misconception matches the diagram.
- M05: simplified square-corner wording, made overlapping start/finish rays distinguishable and shortened finishing rays to keep direction labels clear.
- Inspected all 78 distinct rendered SVG models: 7 measurement, 11 fraction, 7 calendar, 24 clock, 8 turn, 12 shape, 2 map and 7 statistics models. Reused diagrams were checked against every associated prompt. All calendar dates, clock hand positions, turn endpoints, routes and category counts were reconciled with answers.

## Integration and release checks

- All nine production-bank validators pass; 360 unique question IDs, 216 Practice and 144 Test questions. Actual multiple-choice answer positions remain balanced within one after excluding adult tasks.
- Nine CSV files preserve the required eight columns and add visual description, asset, embedded standalone SVG, response type and acceptance note. Combined export: 360 rows. Adult tasks have blank multiple-choice options and a model response as the answer.
- Published Practice/Test scripts match the reviewed source questions. Practice compatibility copies agree; every SVG reference resolves to its symbol. SVG and question-script URLs are versioned to avoid displaying a cached old model with a new prompt.
- The nine activity pages report 24 Practice/16 Test. Practice metadata and bank totals corrected from 48 to 24. Existing eight-question attempts remain intact.
- Existing adult-review support is enabled only on these code routes, including result/review pages. Pending responses are excluded from checked scores and block a final pass until reviewed; the existing runtime fails closed if the support does not load. Result keys use a new bank version so old responses do not mix with the release.
- `validate_pending.mjs` checks live/source parity, routes and dependencies, SVG references, actual MCQ balance, adult-review wiring and pending-result semantics.
- Year 2 static topic-page validation passes 18/18, preserving Topic Guide → Teacher Slides → Worksheet → Practice → Test. Content-validation regression suite passes 5/5.
- The complete `Validate Year 2 content` workflow commands pass locally, including syntax checks, existing English-bank checks and Science/English worksheet counts. All 360 CSV rows were parsed back and reconciled with the reviewed JSON; the combined CSV exactly matches the nine per-code files.
- Review-aware publication records all nine codes; the managed Year 2 Mathematics badge activates at 18/18. Ledger and generated About, Editorial Standards, hub, AI index and LLM summaries belong in the same commit. No badge is added manually.

Browser limitation before release: the cloud browser refused the local preview address with `ERR_BLOCKED_BY_CLIENT`; this was not an IXL access block. Local source/integration checks and rendered visual checks completed. Public deployment verification is separate from the commit and must be reported according to its observed status.
