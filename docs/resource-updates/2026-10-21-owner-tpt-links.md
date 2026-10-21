# Owner-supplied TpT reference update — 21 October 2026

Scope: 21 exact owner-supplied listing URLs: 16 Year 3 Maths worksheet packs, four Year 3 teaching-slide packs, and the Foundation yearly workbook. URLs are owner supplied; no live listing, cover, price or pack-content audit is claimed. Current prices/previews remain on TpT. No question bank, app, slide viewer or teaching content was changed.

## Matching and retained page inventory

Worksheet packs map one-to-one to AC9M3A01–A03, M01–M06, SP01–SP02, ST01–ST03 and P01–P02. Slides map only to AC9M3A01, AC9M3A03, AC9M3M01 and AC9M3M02. The Foundation workbook maps to the 12 Foundation Maths codes, with no Year 3 assignment.

Reference: `year1/maths/ac9m1n01-numbers-to-120/index.html`, using the existing Year 3 N01 matching-paid-pack card adaptation. Retained inventory: video-first entry, hero, one matching worksheet-pack card, compact section navigation, learning focuses and worked examples, quick check, learning resources with all free links, and next-topic navigation. Added slide/workbook links are inside the existing resource section. No new competing topic section was introduced. Unchanged existing Foundation individual-pack cards are preserved.

## Validation

- PASS: all 21 exact URLs and all 28 intended topic matches, no cross-code placements.
- PASS: all source outside intended resource/card changes is byte-for-byte preserved on the 28 topics, including teaching, worked answers, metadata and section/navigation inventory.
- PASS: existing free worksheet, practice, test and teacher-viewer links retained.
- PASS: catalogue additions and local generic resource-art asset exist. No unverified product cover or price was invented.
- PASS: `node scripts/validate_f10_topic_layout_contract.mjs`.
- PASS: `node scripts/validate_f10_topic_learning_order.mjs --base HEAD` (128 locked-root pages; no lesson-order changes).
- PASS: `git diff --check`.
- Existing catalogue regression is not green: `node scripts/test_print_catalogue.cjs` fails its catalogue/inventory count assertion. Base already has 230 catalogue entries vs 213 inventory entries. This update adds the same 21 IDs to both, preserving the pre-existing difference (251 vs 234). Unrelated inventory entries have not been inferred, deleted or marked verified.
