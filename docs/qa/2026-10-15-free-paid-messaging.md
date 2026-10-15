# Free and paid resource messaging — 15 October 2026

Base: `492a3fd7bc81aa9d70716d3048dcc3110542927c` (`main`). Scope: the owner's requested website/TPT positioning copy. No pricing, access, curriculum, question-bank, slide, runtime or styling changes.

## Result

- Homepage, Print & Go, Products, Learn and Teach now distinguish free digital practice/teaching notes from optional paid printables purchased separately on TPT. Listing contents control what is included; free TPT samples remain separately labelled.
- Retained 59 existing paid topic-pack cards across Foundation (12), Year 1 (44) and Year 2 (3). Matching cards now say “Matching worksheet pack · Paid”; related bundles keep their distinct label. Existing paid notes now explicitly say optional, and hero notes explain that printable packs are sold separately. All existing covers, counts and purchase/preview links are retained.
- The free handwriting worksheet card and the two learning-support cards are untouched; sharing the `topic-pack` CSS class does not make them paid resources.
- Updated the existing free-learning support paragraph in 181 static product pages and the shared `product.html` template. Future generated product pages inherit that template without a catalogue rebuild.
- The canonical business philosophy and TPT listing master now require this exact sentence near each description opening: “Pairs with free digital practice and teaching notes available at skillrhub.com”. Free samples, paid packs and bundles must describe their actual contents separately.

## Topic reference, retained inventory and preservation

Reference: `year1/maths/ac9m1n01-numbers-to-120/index.html`, the approved commercial topic-page pattern. This is a commercial-paragraph correction in existing cards, not a lesson or layout regeneration.

Intended retained inventory for every affected topic: its existing video/hero, H1 and topic identity; one existing pack panel; all section headings, disclosure summaries and source order; learning goals, teaching focuses, worked examples, answer reveals and illustrations; resource navigation, worksheet, Practice/Test and teacher-viewer destinations; bundle/related-topic navigation; contact/footer; archived authored source.

Final comparison: PASS. All 59 topic pages have exactly the same HTML element/attribute/comment sequence, heading/summary inventory and resource destinations as the base. Masking only `topic-kicker`, `topic-pack__note` and `topic-hero__note` paragraphs produces byte-identical topic source. No new section, competing card, renderer or legacy panel was introduced. This does not claim a fresh curriculum-content review or a redesign of pre-existing sections.

## Validation actually run

- `node scripts/test_print_catalogue.cjs`: PASS for shared search, pagination and catalogue/inventory consistency.
- `node scripts/validate_f10_topic_layout_contract.mjs`: PASS.
- `git diff --check`: PASS.
- Scoped HTML preservation check across all 246 changed HTML files: PASS. Existing link and asset attributes, head metadata and scripts are unchanged. Topic/product HTML structure is unchanged; only the three central discovery pages gain plain explanatory paragraphs.
- Exact required TPT sentence is present in both standing copy standards. Product data, free/paid flags, prices, question counts and assets are unchanged.
- `python scripts/check_print_catalogue.py` reaches an existing `IndexError` at `products/tpt-17912990/index.html`, which has zero JSON-LD blocks both at the base and after this edit. The same pre-existing limitation is recorded in the earlier AC9M2N02 catalogue handoff; this copy change does not repair unrelated schema.
- Browser QA was not run: the managed environment has no supported local preview browser capability. No new CSS or interactive behavior is introduced; no mobile/desktop screenshot pass is claimed.

## Delivery state

Keep this routine copy change in an isolated Git branch for the repository's owner-approved nightly release batch (`docs/QA_REFERENCE_STANDARD.md`, section D). Do not deploy a separate minor production release or cancel/restart production jobs for it. Before a future production merge, refresh main, compare the complete candidate tree with the latest remote base using the release-integrity guard, run the applicable release checks, and verify deployment/live pages.

TPT marketplace descriptions were not edited: this browser is signed out. The standing template and business standard are updated; authenticated seller edits are still needed to apply the wording to existing marketplace listings. No TPT login, purchase, price change or resource-file regeneration was performed.
