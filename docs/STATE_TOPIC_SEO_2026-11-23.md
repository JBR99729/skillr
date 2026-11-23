# NSW and Victorian discovery for 48 strong topic pages

Owner-authorised scope: improve the existing strong topic pages for NSW/Victorian search discovery and merge to main. Reuse the 48-page shortlist in `data/seo-priority-48-20261028.json`: 43 Maths, two English and three Science guides. Its saved Search Console observations are historical exposure evidence, not current keyword volume. The owner's reported 80% regional share was not independently measured in this change.

## Result

Each selected page has a distinct topic-first title naming NSW and VIC and retaining its AC9 code. Titles are 52–69 characters; descriptions are 136–159 characters. Existing Open Graph/Twitter tags and the same-page LearningResource descriptions agree with the search copy. No exact state outcome equivalence or full syllabus coverage is claimed.

Example title: `Year 1 Skip Counting | NSW & VIC Curriculum | AC9M1A01`.

Example description: `Explore Year 1 skip-counting patterns by 2s, 5s and 10s. Free examples; NSW and Victorian curriculum links (AC9M1A01). Paid worksheets optional.`

Six Year 4 pages retain their existing visible state-reference tables. The other 42 gain one short, static curriculum-planning paragraph inside their existing resource-information disclosure. The links identify the official NSW subject syllabus and Victorian Curriculum framework, and ask teachers to compare local content and sequence. These framework references do not certify the existing code crosswalk. VCAA automated retrieval was blocked; no newly inspected exact VCAA mapping is asserted.

The current sample/topic copy helper reads the bounded metadata manifest so subsequent sample maintenance preserves the owner's regional wording. The patcher accepts only these 48 explicit paths and supports a non-writing `--check`.

## Preservation and verification

Reference: `docs/year1-topic-page-design-benchmark.md`, AC9M1N01. Retain every existing H1, heading, native disclosure summary, authored explanation, model, answer, image, script, same-code activity route, paid offer, genuine free sample, navigation link and section ID. No additional learning section or competing action is introduced. The sole visible addition is the reference paragraph described above. Existing canonical URLs, robots policy, sitemap inventory and educationalAlignment objects are unchanged.

`scripts/validate_state_topic_seo.py` compares each complete page against the original Git base after allowing only the specified search metadata fields and the new reference paragraph. It parses every JSON-LD block, checks metadata uniqueness/length/parity, visible state references, self-canonicals, indexability and sitemap inclusion. The exact per-page artifact hashes and results are recorded in `docs/qa/state-topic-seo-20261123.json`.

Executed:

- `python scripts/apply_state_topic_seo.py --check`: 48 selected, zero further changes.
- `python scripts/validate_state_topic_seo.py --base origin/main`: 48/48 pass.
- `python scripts/test_free_sample_topic_seo.py`: two tests pass; observed samples and existing teaching/action inventories preserved.
- `python scripts/test_topic_learning_seo.py`: full 676-topic metadata/sample consistency check passes.
- `node scripts/audit_search_ai_integrity.mjs`: 1,320 sitemap pages, 13 child maps, zero errors/warnings.
- `node scripts/validate_f10_topic_layout_contract.mjs`: pass.
- `git diff --check`: pass.

The global resource-copy normalizer initially reported 37 pre-existing findings outside the selected pages, verified against unchanged main. Exact-head CI identified one of those as a normalizer bug: it incorrectly rewrote the homepage label `See free worksheet samples on TpT` as a paid-resource claim, despite its verified free-directory destination. The guard now preserves that exact existing label; the homepage is unchanged and the existing free-sample regression test covers it. The remaining unrelated findings are not silently rewritten or certified as fixed. Main's existing scheduled discovery audit already failed before this change: run `45045518354`, job `137279161430`, reports 676 pending discovery rewrites. This change does not certify those unrelated findings or claim a fully green baseline.

Release integrity, exact-head CI and Pages/live delivery evidence are recorded in the pull request after publication. A commit or merge alone is not a deployment check. No question banks, teacher slides, authentication or progress code changed; no new teacher recertification or browser interaction audit is claimed.

## Reproduction

Apply: `python scripts/apply_state_topic_seo.py`.

Check: `python scripts/apply_state_topic_seo.py --check` and `python scripts/validate_state_topic_seo.py --base BASE_SHA`.

Rollback by reverting this scoped change; there is no database change.

Google reference guidance: https://developers.google.com/search/docs/appearance/title-link and https://developers.google.com/search/docs/appearance/snippet. Titles/descriptions express the existing page content; search engines choose their displayed titles and snippets.
