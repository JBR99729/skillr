# Year 3 Science illustrated topic pages, batch 1 — 7 November 2026

Status: review build; not a production release.
Baseline: `4023119cc0224ea924886cbdb5b5e8ad50c9a91a` in JBR99729/skillr.

## Scope and next work

This batch updates exactly ten existing canonical pages: AC9S3U01–04, AC9S3H01–02 and AC9S3I01–04. Year 3 has twelve Science codes. AC9S3I05 and AC9S3I06 remain unchanged and are next in curriculum order.

The approved illustrated pattern is adapted for Year 3: learning intention, evidence-backed worked example, three teaching steps and answer reveals, topic-specific misconceptions, differentiated ten-minute activity, three reasoning checks, FAQ, related topics, retained teaching, classroom/worksheet resources and return navigation. Native disclosures keep supporting content compact; essential teaching remains in static HTML.

All 77 selected existing educational sections remain, with three documented factual/clarity corrections. The section inventories are in `inventory.json`; the exact corrections and reasons are in `retained-corrections.json`. The scoped check verifies each section against its baseline text, allowing only those explicit corrections. Legacy resource menus, duplicate international mapping, process disclosures and obsolete slide descriptions are excluded. Matching Classroom View and free worksheet paths are retained. No bank, slide, worksheet, learner history, catalogue or sitemap changes are included.

Titles, descriptions, canonical URLs, robots, social metadata and non-breadcrumb structured data are unchanged. Visible and structured breadcrumbs use Home → Year 3 Science index → topic. The existing Year 3 subject-visual stylesheet is retained for the original teaching models, with scoped illustration-page styling added.

## New teaching and representations

Ten original worked examples, thirty teaching steps, twenty misconception repairs, ten activities, thirty reasoning questions/answers and twenty FAQs.

- U01: living/once-living/never-living evidence; flowering-plant cycle; butterfly metamorphosis compared with human development; a new generation does not mean an adult turns back into its original seed or egg.
- U02: observable soil/rock/mineral properties; rocks as one or more minerals; soil as a mixture; property-to-use reasoning and limits of a drainage comparison.
- U03: heat sources, warmer-to-cooler transfer and both objects' temperature changes; thermometer readings are distinguished from heat-energy measurements.
- U04: solid/liquid properties, shape versus state, melting/freezing and adding/removing heat; water expansion on freezing is handled without an unsafe full rigid container.
- H01: claim–evidence–reasoning, cooling decreases of 3°C and 8°C, fair comparisons and revising explanations.
- H02: measurable 32°C design criterion, stability, evidence-based choice and trade-offs.
- I01: soil-drainage patterns, testable questions and reasoned predictions without exact-value guarantees.
- I02: a supplied fair-test scaffold with changed/measured/controlled conditions, safety, repeats and honest records.
- I03: scaled instruments and formal units; an accessible thermometer model reads 28°C using 1°C intervals; digital records need labels, units and checking.
- I04: supplied 48/36/24 mL data, exact zero-based column graph, equal intervals, labelled axes, source fidelity and a 12 mL-per-counter model with stated limits.

The new contextual artwork shows an observation collection and an insulation/temperature station. A previously generated physical-changes illustration is reused. Asset paths and prompts are recorded in `artwork.json`. All image references have descriptive alt text. Exact measurement, scale and graph evidence is supplied in HTML/SVG rather than inferred from generated imagery. Generated display screens are intentionally blank and cannot serve as measurement data.

## Evidence and teacher-style author review

Reviewer: author AI teacher-style review; no independent sign-off.

Reused the current code-specific lessons, `curriculum-question-banks/qa/year3-science-curriculum-map.md` and the existing Year 3 Science teaching-data records. Their historical bank-review labels are not treated as new review of these pages. No fresh complete IXL progression/worked-example inspection is claimed.

Official scope and relevant explanations checked on 7 November 2026:
- QCAA Year 3 AC v9 alignment: https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr3_as_cd_alignment.pdf
- Primary Connections, Making sense of changes: https://primaryconnections.org.au/teaching-sequences/year-3/making-sense-changes
- Primary Connections, Scorching swings and slides: https://primaryconnections.org.au/teaching-sequences/year-3/scorching-swings-and-slides
- Geoscience Australia, Minerals and energy: https://www.ga.gov.au/education/minerals-energy
- National Library of Australia, Circle of life: https://www.library.gov.au/learn/digital-classroom/understanding-living-world/circle-life
- Natural History Museum, Merian's observations: https://www.nhm.ac.uk/discover/maria-sibylla-merian-metamorphosis-art-and-science.html

Public sequence overviews/alignment and textual explanations were inspected; no watched-video, downloaded full-package or completed classroom-trial claim is made. New wording, examples, supplied data and activities are original.

Reviewed all new prompts, answers, tables, models and calculations. The three inherited corrections remove an unsupported first-ever metamorphosis claim, state that thermometers measure temperature rather than heat energy, and align a state-change model heading with its observable-state content. First Nations material remains place-aware and uses authorised-source guidance; no cultural example is invented.

Students may receive reading, scribing, accessibility and safety support from an adult. Answer reveals support learning. Supported success or viewing a solution is not independent mastery. Formative tasks elicit classifications, cycle comparisons, explanations, plans, measurements and source-faithful representations.

## Checks

- 160 source checks pass across the ten pages; per-page results and SHA-256 values are in `validation.json`.
- Scoped DOM smoke passes: 77 retained sections with exactly three allowed corrections, preserved metadata/structured data, internal links/fragments, ten local image references, 177 native disclosure open/close checks, accessible SVG labels, correct table headers and matching worksheet/viewer routes.
- Column-graph bars are checked against 48/36/24 mL source values, common scale and shared zero baseline. The thermometer interval/readout was solved and checked during author review.
- Existing Year 3 static-topic validator passes all twelve routes, including the two unchanged codes. That is a structural check, not a claim those last two pages were rebuilt.
- K–6 Science teacher-route check passes with zero repairs.
- Static-architecture and complete-tree integrity run on the final review commit before upload.

Reproduce scoped DOM smoke with jsdom installed:
`NODE_PATH=/path/to/test/node_modules node scripts/qa_year3_science_topic_pages_batch1.cjs 4023119cc0224ea924886cbdb5b5e8ad50c9a91a`

## Limits

The current production availability ledger has no matching published app practice for these ten codes. Each page therefore uses a clearly labelled app-catalogue entrance and an availability note, without inventing a bank or advertising an unpublished assessment.

Desktop/mobile rendered review remains unverified. Earlier local-preview attempts in this same workspace were refused; no new successful rendered review is claimed for this batch. DOM smoke does not establish actual browser layout or touch/keyboard behaviour. App authentication, marking and progress persistence were not exercised, and existing slides/worksheets/banks were not independently recertified. Keep this as a review build pending rendered review.
