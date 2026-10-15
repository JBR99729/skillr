# AC9M2N03 topic and Print & Go update

Date: 16 October 2026, Australia/Sydney. Scoped owner request: add published TpT product 17967143 to Print & Go and improve the fractions topic using saved research, matching Year 1 Maths style. This is website/topic maintenance, not a question-bank build or app release.

## Reference and retained-section inventory

Reference: `year1/maths/ac9m1n01-numbers-to-120/index.html`, with its shared `topic-learning-page.css` shell and numbered learning focuses. The explicit parity gate overrides the reference's remaining duplicate checking disclosure.

Intended retained pattern, declared before final comparison:

1. Compact site navigation, breadcrumb and skip link.
2. One optional video-first entry, retaining the existing Scratch Garden video.
3. Short topic hero and one matching paid worksheet card with actual cover, verified counts, preview/current-price link and optional-paid label.
4. In-page navigation.
5. Three native expandable focuses: halves; quarters by halving halves; eighths by halving quarters. First focus open, later focuses collapsed; each has an intention, static model, worked explanation, misconception checks and a try/answer disclosure.
6. Brief vocabulary/materials and adult differentiation/practical-observation guidance.
7. One resource navigation for same-code Teacher Slides, free website worksheet, Practice and Test; topic/next-unit navigation.
8. Existing compact custom-resource contact and footer pattern.

Final source inventory matches this list: PASS. Exactly one video iframe and one matching-product purchase/preview anchor. Three focus disclosures and three answer disclosures. The hero Start learning action is internal. No separate sales CTA after the lesson, competing full-year purchase block, repeated Quick Links sidebar, legacy resource facts, source-checking panel, curriculum-equivalent tables, duplicate video block, expanded Facebook feedback or repeated formal metadata panel remains. Those legacy blocks were removed, not merely hidden. Existing head title, descriptions, canonical and indexability remain; teaching content is directly in static HTML without JS assembly.

## Content and provenance

Read `JBR99729/research-` main `year-2/maths/AC9M2N03/research/research.md` (blob `1801589e9e067a4c079477c4fac20c9e3bd06ea1`), including exact descriptor/action-object mapping, validated three-focus plan, nine misconceptions, scope and source-access limits. Existing page and its recent Git history were inspected before replacement. Useful collection-halving, folding, measurement, unequal-parts and same-whole teaching is retained and expanded inside the three focuses.

The page teaches one-half as one of two equal parts and connections through repeated halving. Area, length, collection, mass and capacity examples use the relevant equality checks. Both halves/all quarters must be halved for a complete partition; halving only one quarter still creates valid eighth-sized pieces. Comparison is explicitly limited to matching wholes. Extension reverses the unit/whole relationship within this code; no later-year algorithms or new fraction families are core targets. Practical skill evidence requires observation.

The owner supplied the published TpT URL. Contents and actual first-page cover were checked against the accepted 39-page worksheet pack from the preceding production task: 30 Practice, 15 separate Test, five additional vocabulary/dictation items, four worked examples, three guided tries, teacher guide, answers and observation record. The public cover is a 900px render of its first page, not a copy of the full paid workbook. No unverified price is published. External checkout/preview/file delivery remain on TpT; no purchase is required for free website resources.

Catalogue/index record, active-inventory record, static no-JS browse card, product details, individual topic-print mapping and sitemap include the new product. All prior catalogue records are byte-equivalent when parsed; no other product page was edited.

## Validation

- Existing `node scripts/test_print_catalogue.cjs`: PASS (search and pagination).
- Actual filter function finds the new item by code, fractions, halves, quarters and eighths under Year 2 / Maths / Paid / Worksheet: PASS.
- Both changed/new content pages: one H1, unique IDs, parseable JSON-LD, working local anchors/assets and same-code worksheet/Practice/Test/Teacher Slides paths: PASS.
- New product schema, catalogue and inventory counts/purchase URL match. No price invented.
- Static source-only teaching and exact diagram equality/part counts checked: PASS. Actual cover opened and visually inspected.
- `git diff --check`: PASS.
- Whole-catalogue `python scripts/check_print_catalogue.py` stops at unchanged `products/tpt-17912990/index.html`, which has no Product JSON-LD in the base commit too. This is an existing unrelated failure. Scoped checks on the new product pass; no broad product regeneration performed.
- Local browser preview unavailable: cloud browser cannot connect to the workspace localhost server. Live desktop verification follows publication. Phone/tablet/touch, defined slow-network and physical printer trials are not claimed.

This record is author validation, not an independent teacher/tester sign-off or a Content Verified badge. Existing app-bank status/review gates and data are unchanged.

## Live desktop verification and bounded correction

Public Pages deployment `38819536365` succeeded (the initial deploy was superseded by the automatic sitemap commit). The live topic displayed the new hero, real cover, 30/15 counts and teaching guide; halves/quarters disclosures, static equal-part diagrams and resource links were inspected. Live QA identified an extra automatic Learning pathway panel from a shared loader. Marked the existing static Continue learning navigation with the loader's supported `data-skillr-learning-path` sentinel, preventing the duplicate without changing shared scripts. This is a single-page runtime parity fix.

Main release integrity, F–10 layout, Foundation–Year 4 rollout, question-bank quality, search/AI integrity and AdSense guards passed. Broad checks retain existing failures outside the scoped content: Year 2 validator names only unchanged AC9M2M01; breadcrumb rebuild reports all 742 eligible pages stale; optional-video rebuild reports all 676 mapped pages stale. No site-wide regeneration was performed to conceal these baseline issues. The new page preserves one video-first entry and removes the superseded duplicate video blocks as the owner explicitly requested.
