# AC9M2N02 worksheet catalogue link — 15 October 2026

Owner requested published TPT product17959670 in Print & Go and its matching Year2 topic. Scope: one existing approved worksheet listing; no question-bank, slide-viewer, app, pricing or curriculum-content changes.

## Implementation

- Added `tpt-17959670` to the catalogue and active inventory (194 unique products). Preserved historical full-audit date and recorded this as a scoped owner-supplied listing addition.
- Added the accepted original square cover under `assets/tpt-17959670-cover.png` and a static detail page at `/products/tpt-17959670/`.
- Added a card to Print & Go's existing Year2 place-value section and its complete static browse fallback. Search uses the same shared catalogue record.
- AC9M2N02's single matching-pack panel now points to the worksheet (38 A4 pages;30Practice;15Test;5additionaldictation;completekeys). The previous31-slide product link remains once in the resources section. Existing teaching and all free journey routes retained.
- Added reciprocal topic-guide link, local Product/LearningResource metadata and sitemap entry. No confirmed live price could be read (TPT denied unauthenticated retrieval); omitted price and display “See current price on TPT”. No price or live screenshot was invented.

## Topic parity and preservation

Reference: `year1/maths/ac9m1n01-numbers-to-120/index.html` (approved Year1 commercial topic pattern). Intended retained inventory: one video-first entry; same H1/hero; one primary matching worksheet-pack panel; written guide; three focus disclosures with worked examples and answer disclosures; common mistakes; independent readiness; free resources; related/next-topic navigation; contact/footer. Matching teaching product remains a secondary text link in Resources, not an extra competing panel.

Final source inventory matches:17 heading/summary entries, nine summaries; only the pack heading changes. The entire `topic-learning-guide` section is byte-identical to the base. One matching worksheet CTA, one previous teaching-product link, one H1, no duplicate IDs. No legacy panel or disclosure was introduced. Canonical/title/description and other SEO tags retained, apart from adding one related-product JSON-LD record.

## Validation actually run

- `node scripts/test_print_catalogue.cjs`: PASS, catalogue/inventory IDs and search/pagination integrity.
- Additional shared-search execution: PASS for AC9M2N02, Year2 place value, regrouping and zero with Year2/Maths/worksheet filters; Year1 exclusion checked.
- `node scripts/validate_f10_topic_layout_contract.mjs`: PASS.
- Scoped actual HTML checks: PASS new product and topic JSON-LD parse, local links/images resolve, H1/ID uniqueness, reciprocal product/topic links, accepted counts, unknown price omitted from visible copy and Offer.
- `git diff --check`: PASS.
- Full catalogue checker reached unrelated existing product pages `tpt-17912990` and `tpt-17913187`, which have no JSON-LD; it cannot pass globally. New product's schema and all catalogue-page local links were checked separately. No unrelated products edited to mask this pre-existing warning.
- Full Year2 static validator reports existing AC9M2M01 missing wrapper/content marker/teacher link. The requested AC9M2N02 checks pass; its teaching section and all protected routes are preserved. No unrelated skill rebuild was performed.
- Browser-control capability unavailable in this environment; no desktop/mobile interaction or screenshot pass is claimed. Existing shared CSS and native HTML structures retained; square cover has width/height1500 and preserved aspect ratio.

Release process: compare complete candidate tree against latest main with `check_release_integrity.mjs`; require zero deletions/unchanged CNAME, recheck main before merge, inspect relevant CI and Pages outcome, then verify live homepage, Print&Go, product, topic and existing Practice route. Final outcome is reported in the task handoff; file existence/commit alone is not a deployment claim.
