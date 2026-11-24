# Year 2 Science illustrated topic pages — 7 November 2026

Status: review build; not published. Next ten-code batch after this: Year 3 Science.
Baseline: `4023119cc0224ea924886cbdb5b5e8ad50c9a91a` in JBR99729/skillr.

## Scope

Ten existing canonical topic pages: AC9S2U01–03, AC9S2H01 and AC9S2I01–06.

The approved illustrated Foundation/Year 1 pattern is applied to this bounded Year 2 batch. Every page has a plain-language title and learning intention, worked example with supplied evidence, three distinct teaching steps with answer reveals, topic-specific misconceptions, a differentiated ten-minute activity, three reasoning checks, FAQ, two related topics, retained teaching and same-code classroom/worksheet resources. The front-of-page section order is consistent across the batch; legacy menus, duplicate resource selectors, process disclosures and international mapping blocks are excluded.

All 75 selected existing educational sections are retained with exactly matching text. Their per-page summary inventories are recorded in `inventory.json`; they include concepts, worked applications, curriculum elaboration coverage, guided activities, revision and misconception support. Duplicate/competing navigation and obsolete teacher-resource descriptions are not brought into the new shell. Existing Classroom View and written worksheet routes remain available. Two inherited astronomy tables gain column-header scope attributes for accessibility.

Canonical URLs, title tags, descriptions, social metadata, robots and existing structured data are preserved. Only breadcrumb structured data is updated to match the visible Home → Year 2 Science index → topic path. Essential teaching and answer reveals are static HTML. No bank, slide, worksheet, app, learner history, sitemap or catalogue is changed.

## App availability

The current production availability ledger lists matching practice for AC9S2U01, AC9S2U02 and AC9S2U03. These three use their verified free-account routes. The other seven have a clearly labelled Explore the app entrance to the app catalogue and an availability note within resources. They do not advertise matching practice or assessments as published. No ledger entries are invented or changed.

## Illustrations and evidence

Two original textbook-style illustrations show a sound-investigation station and physical changes to paper, modelling dough and ice. The image prompts and deployed asset paths are in `artwork.json`. Both are 1536 × 1024 WebP assets; their combined transfer size is about 554 KB. Images have descriptive alt text. They are contextual, not measurements or before/after quantitative claims.

The astronomy relationship model is a deterministic accessible SVG identifying the Sun as a star, Earth as a planet and the Moon as Earth's natural satellite. It is expressly not to scale and does not depict a particular date's alignment. The page separately teaches repeated sky-position observations. All exact counts and measurements used in new questions are supplied in the local HTML tables.

## Evidence and author teacher-style review

Reviewer: author AI teacher-style review; no independent sign-off.

Reused the current authored lessons and these saved research records:
- `docs/question-bank-reviews/2026-09-06-year2-science-u02-u03-h01.md`
- `docs/question-bank-reviews/2026-09-06-year2-science-u01-i04-i06.md`
- `docs/question-bank-reviews/2026-09-06-year2-science-i01-i03.md`

Their IXL limitations remain explicit; no new complete IXL worked-example/adaptive-progression review is claimed. The unchanged 75 sections preserve existing evidence rather than receiving a new independent certification.

Official scope and selected explanations checked on 7 November 2026:
- QCAA Year 2 AC v9 content-description alignment: https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr2_as_cd_alignment.pdf
- ACARA Year 2 Sound travel work sample: https://www.australiancurriculum.edu.au/resources/work-samples/science/year-2/ws02-sound-travel
- ACARA Year 2 All twisted up work sample: https://www.australiancurriculum.edu.au/resources/work-samples/science/year-2/ws03-all-twisted-up
- Primary Connections sound-energy explanation: https://primaryconnections.org.au/science-content/physical-science-big-ideas/energy
- NASA Moon visibility: https://www.nasa.gov/solar-system/why-can-you-see-the-moon-during-the-day-we-asked-a-nasa-scientist-episode-19/
- NASA solar-system facts: https://science.nasa.gov/solar-system/solar-system-facts/

Reviewed all ten new examples, thirty teaching steps and answers, thirty reasoning questions and answers, twenty misconceptions, twenty FAQs and ten activities. Key checks: apparent sky movement versus physical motion; daytime Moon; shadow-data limits; source and receiving-object vibrations; loudness versus pitch; material identity after bending, twisting, stretching and tearing; irreversible physical changes; evidence-based predictions; consistent informal units; original data order and display keys; honest partial agreement; fair comparisons; findings limited to the supplied evidence. Cultural examples are not invented; existing place-aware and authorised-source guidance is retained.

Student competence is demonstrated through explanations, questions, records and representations. An adult may read prompts, supervise practical work, scribe dictated responses and support accessibility. Answer reveals support learning; viewing an answer or succeeding with assistance is not independent mastery.

## Checks completed

- 150 source checks pass: ten pages × fifteen checks. Evidence is in `validation.json`.
- Scoped DOM smoke passes: 75 educational sections retained verbatim; metadata/structured-data preservation; all internal links and fragments; nine local image references; 175 native disclosure open/close checks; appropriate published-bank/catalogue routes.
- Year 2 Science static-topic validator passes 10/10 pages.
- K–6 Science teacher-route validation passes with zero repairs.
- Complete-tree integrity and static-architecture checks run on the final review commit before upload.

Reproduce scoped DOM smoke with jsdom installed:
`NODE_PATH=/path/to/test/node_modules node scripts/qa_year2_science_topic_pages.cjs 4023119cc0224ea924886cbdb5b5e8ad50c9a91a`

## Remaining verification

The connected browser could not reach the local preview (connection refused), as in the previous batch. Desktop/mobile rendering, actual keyboard/touch behaviour and live app authentication/marking/progress remain unverified. DOM smoke does not certify browser layout. Existing slide, worksheet and bank content was not rebuilt or independently recertified. This is a review build, not a production release.
