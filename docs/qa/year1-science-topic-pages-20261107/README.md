# Year 1 Science illustrated topic pages — 7 November 2026

Status: built for review; not a production release. Next authoring batch: Year 2 Science.
Baseline: `4023119cc0224ea924886cbdb5b5e8ad50c9a91a` in JBR99729/skillr.

## Completed scope

Ten existing canonical pages: AC9S1U01–03, AC9S1H01 and AC9S1I01–06.
Finished the interrupted Year 1 draft using the approved Foundation illustrated sample. Each page contains a topic introduction, learning intention, illustrated worked example with supplied evidence, three distinct teaching steps and answer reveals, two misconception repairs, a differentiated ten-minute activity, three reasoning checks, FAQ, related topics, retained focused explanations and same-code resources.

Retained-section comparison: heading/introduction → topic shortcuts and learning intention → worked example → three teaching steps → misconceptions/activity → tricky questions → FAQ/related topics → existing focused explanations → quiet classroom/worksheet/paid-pack resources → Home/topic-index links. Source inventory matches this list on all ten pages. Legacy process disclosures and duplicate menus are excluded. The existing commercial pack remains clearly optional and paid. One floating Practice now entrance per page matches the production availability ledger. Worksheet and teacher-viewer paths remain aligned with the same code.

All 53 existing focused explanations and answers are preserved exactly in text. Canonical URL, title, description, robots, social metadata and existing LearningResource/other JSON-LD remain unchanged. Breadcrumb JSON-LD matches the Home → Year 1 Science index → topic navigation. Current shared return navigation is retained. The latest source pages contain no optional video block, so no video was removed. No banks, slides, learner records, catalogue or sitemap changed.

Two textbook illustrations from the interrupted draft are included as WebP assets. They retain the original 1536 × 1024 dimensions while reducing combined transfer size from about 5.7 MB to 0.73 MB. Existing plant/bird artwork and paid-pack covers are retained. Every image has descriptive alt text. Illustrations are contextual: all numerical results appear explicitly in the accompanying HTML evidence, and learners are not asked to measure the artwork.

## Teaching review

Reviewer: author teacher-style AI review, not independent sign-off.
Reviewed all ten new worked examples, thirty teaching steps and their answers, thirty reasoning prompts/answers, twenty misconceptions, twenty FAQs and ten activities against the saved research and curriculum scope. The 53 unchanged explanations reuse existing evidence; their preservation is checked automatically, not presented as a fresh independent review.

Key boundaries: plant food is distinguished from soil nutrients; animal needs are checked individually; weather is distinguished from seasonal patterns; force predictions depend on comparable conditions; observation is separated from inference and prediction; units stay consistent; 2 → 4 → 4 is an increase followed by no change; original predictions are kept; fair comparison is distinguished from turn-taking; reports stay within supplied evidence. First Nations material uses place-aware, culturally authorised-source guidance without invented cultural examples.

Evidence reused: `Year1_Science_Curriculum_Research_Master.txt`, the ten current code-specific lessons and their saved research references. Official Year 1 content-description scope rechecked on 7 November 2026 against QCAA's AC v9 alignment:
https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr1_as_cd_alignment.pdf

## Verification completed

- 190 source checks pass across ten pages, including metadata/structured-data preservation, canonicals, three steps, supplied visual evidence, answer HTML, unique IDs, alt text and matching app access.
- Scoped DOM smoke passes: 216 native disclosure open/close checks, 53 preserved explanations, 22 image references, one matching practice entrance per code and internal link/fragment checks. One inherited TpT-hosted cover is an external image reference; local-file checks do not verify its remote availability.
- `node scripts/validate_year1_science_static_topic_pages.mjs` passes 10/10 pages.
- `node scripts/fix_k6_science_teacher_routes.mjs` passes and makes zero repairs.
- Static Curriculum Architecture v2 passes for all 18 changed files. Complete-tree release integrity passes: 19,748 → 19,756 tracked files, zero deleted paths, core files and domain unchanged.

Reproduce scoped DOM checks with an installed jsdom dependency:
`NODE_PATH=/path/to/test/node_modules node scripts/qa_year1_science_topic_pages.cjs 4023119cc0224ea924886cbdb5b5e8ad50c9a91a`

## Remaining verification

The connected browser and shared cloud browser could not reach the local preview (connection refused). Desktop/mobile rendered layout, actual keyboard/touch behaviour and live app authentication/marking/progress have not been certified. DOM smoke is not a browser-layout test. This topic-page change does not alter app behaviour or claim renewed slide/bank certification. Independent teacher sign-off is not claimed. Keep the build in draft review until the outstanding rendered review is completed.

The companion `inventory.json` records every page path and SHA-256; `validation.json` records the source checks; `page-content.json` preserves the new authored teaching data.
