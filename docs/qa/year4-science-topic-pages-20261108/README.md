# Year 4 Science illustrated topic pages — 8 November 2026

Scope: all twelve existing canonical Year 4 Science pages, AC9S4U01–U04, AC9S4H01–H02 and AC9S4I01–I06. This is a review-branch build, not a production deployment. Baseline: `91a8cbea83cf34708581d8689c91b45ccad0ed52` in `JBR99729/skillr`.

## Format and preservation plan

Reference: approved Year 1 Maths AC9M1N01 (`year1/maths/ac9m1n01-numbers-to-120/index.html`) and the integrated illustrated Science format at Year 3 I06. Keep the heading/introduction, useful learning actions, worked example, three teaching focuses with native answer reveals, misconception support, differentiated ten-minute activity, three reasoning questions, FAQ, related topics, retained teaching, matching Classroom View/worksheet resources, one return-navigation block and one floating app entrance.

Retain the 121 original educational disclosures listed per code in `inventory.json`, including curriculum elaborations, original worked models, vocabulary, cultural-safety teaching, misconceptions and mastery evidence. Exclude superseded teacher-slide descriptions, resource-facts/duplicate menus, process disclosures, repeated international mapping, old sidebars and obsolete related lists. No matching printable-pack card was present in these twelve baselines. No question banks, fixed Classroom Views, worksheets, production availability ledger, authentication or learner history are changed.

All lesson text is semantic static HTML; native details work without JavaScript. Existing titles, descriptions, robots, canonical URLs and all structured-data payloads are preserved. Original SVG IDs and references are consistently prefixed within retained content. Existing resource paths remain aligned to their codes. All twelve codes are absent from the published app-bank ledger, so their app entrances lead to the Year 4 Science catalogue with exact canonical topic returns, rather than advertising unavailable practice or assessment banks.

## Authored teaching

Twelve worked examples, 36 distinct teaching focuses and guided checks, 36 reasoning questions with answers, 24 misconception repairs, 24 FAQs and twelve differentiated activities. Exact measurement evidence is supplied as labelled tables and deterministic SVG: ruler at 62 cm with 2 cm intervals, column graph at 62/30/24 cm with a zero baseline, and an explicitly simplified water-cycle pathway. Numerical investigation records are labelled invented models, not actual class trials.

Two textbook-style contextual illustrations are in `assets/images/year4-science/`: garden feeding habitat and materials/forces workbench. Both have descriptive alt text. They are not measurement evidence. The original 1536×1024 artwork was encoded as WebP for delivery; scene composition was not edited. Prompts, paths and evidence identity are in `artwork-and-evidence.json`.

## Research reuse and teaching readiness

Read the current `svgSkillrHub-IXL-Research-Log.md` and the separate Year 4 source comparisons, later free-question collections and instrument-scope closure in `JBR99729/research-`. Exact paths and blob identities are recorded in `reused-research.json`. The historical log contains Year 3 evidence; it is not represented as a completed Year 4 review. The separate Year 4 records include actual, explicitly partial IXL worked/feedback observations, Khan lesson/transcript observations and later original analytical records of accessible external tasks. No fresh IXL progression, watched video or unobserved source task is claimed.

Checked current Year 4 descriptor alignment against QCAA’s official Year 4 achievement-standard/content-description PDF. Newly inspected Primary Connections Year 4 pages support friction observations, fair comparisons, labelled force models and purposeful communication. A fresh Khan water-cycle page retrieval returned no readable text; the saved inspected evidence is reused instead. Sources are teaching evidence, not wording/artwork copied into the product.

- https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr4_as_cd_alignment.pdf
- https://primaryconnections.org.au/teaching-sequences/year-4/access-all-areas/lesson-2-feeling-friction
- https://primaryconnections.org.au/teaching-sequences/year-4/access-all-areas/lesson-7-access-allowed
- https://primaryconnections.org.au/teaching-sequences/year-4/sustain-the-chain

All three focuses per page are supported for this bounded topic-page addition: role/relationship/decomposer reasoning; water stores/state changes/pathways; friction/gravity/magnetism; property testing/material selection; data–pattern–explanation; need–mechanism–solution testing; observation–question–prediction; scaffolded fair/safe planning; instrument–interval–recording; table–column graph–model interpretation; comparison–method audit–further question; audience–evidence/vocabulary–representation. Retained sections continue broader elaboration coverage. No formal Newton calculations, trophic-efficiency calculations, molecular chemistry, specialist sensors or statistical inference are required. Slide/worksheet/app-bank product readiness is not inferred from this page build.

## Independent content review

A separate teacher-style AI reviewer inspected every new worked example, all 36 guided checks and all 36 reasoning questions/answers, FAQs, misconceptions, activities, all 121 retained teaching sections, contextual artwork and exact diagram/data relationships. One medium visual finding was corrected: two water-cycle labels crossed curved arrows. Labels were moved into clear space; the reviewer independently rechecked the exact corrected SVG. No unresolved substantive teacher-content findings remain. Final reviewed HTML hashes are in `independent-teacher-review.md` and match the inventory. This is topic-page review, not a claim of complete question-bank Teacher QA.

## Verification

- Scoped source/preservation QA passes: 12 pages, 121 retained sections, 42 image references, 241 named native disclosures; exact metadata/structured data, unique IDs, valid fragments, code-matched resource routes and app-return destinations.
- Existing Year 4 Science static-topic validator passes 12/12.
- Breadcrumb, navigation-helper and static teacher-display unit checks pass. One initial local unit fixture was absent from the sparse checkout; the unchanged fixture was materialised and the affected test rerun successfully.
- Local Chromium cannot start: its process singleton socket is denied by the execution environment. This is not reported as a browser pass.
- The initial scoped PR browser job passed all 36 page/viewport combinations at 1440, 768 and 390 px with JavaScript disabled, unforced answer clicks and 44 px touch-target checks, plus 12 JavaScript-enabled smoke loads. All 72 screenshots were inspected. Tablet teaching columns made some table headings cramped, so the Year 4 stylesheet now stacks the teaching focuses below 1001 px; the affected browser checks are rerun in CI. Loopback test conditions do not certify production-network performance.
- The separate legacy Years 1–7 curriculum-resource audit fails because it discovers zero codes in 21 retired curriculum-hub redirect pages. The identical failure was reproduced using the unchanged baseline audit, dependencies, inventory and all 21 hub files at `91a8cbea83cf34708581d8689c91b45ccad0ed52`; this build does not alter those files or weaken the audit.
- Complete-tree integrity is checked before review-branch upload; the complete base tree and core/domain files must remain intact with zero deleted paths.
