# Catalogue visibility conclusions

Built 19 October 2026 from current main 791a4fbf255bb884d8bc0a803f756cce09c425dc and Search Console data through Windsor.ai for 20 September–17 October. This is an internal analysis artifact, not a public site feature.

## What the mapping establishes

- 676 unique curriculum-code guides found through 33 subject hubs. Owner expectation is 687; the difference is unresolved, not proof that 11 pages are missing. The mapping uses actual hub links, not inferred slugs.
- 572 of those guides appear with at least one global impression in the returned page data. 104 have no returned global impression row; indexed status remains unknown.
- This rules out the hypothesis that Google never displays most of the mapped topic catalogue globally. It does not establish current indexing of every guide or Australian visibility.
- 598 mapped guides use a code-first H1. This is a presentation pattern worth evaluating, not a demonstrated penalty or permission for bulk changes.
- Leading guide examples: AC9M3M03 220 global impressions; AC9M4N02 90; AC9M3M04 64. These are observed result counts, not search-volume estimates.

## Data reconciliation blocks a stronger Australian claim

Previously retrieved country totals show 202 Australian impressions and 4 clicks. The newly returned Australian page breakdown has only 16 URLs, 110 impressions and no clicks. Adding the country dimension also returns the same 16 Australian URLs. Therefore this breakdown cannot safely establish that all other pages have zero Australian impressions. Potential connector aggregation/filtering or API data differences require reconciliation with the native Search Console export. No automated support message was sent.

The report retains the original returned data, labels absent rows as unreported, and marks indexing unknown. Do not treat the apparent absence of all mapped guides from this Australian breakdown as a confirmed SEO defect.

## Prioritised work using existing resources

1. Reconcile native Search Console Australian page totals and get Page Indexing/URL Inspection samples: high-impression guide AC9M3M03; an unreported guide; Year 1 Science hub; affected practice/test pair. Compare Google-selected canonicals and last crawl dates. These checks distinguish indexing from query relevance.
2. Fix confirmed factual metadata mismatches identified in findings.md. They merit correction independently of any traffic hypothesis.
3. Run one small hub experiment on Year 1 Science, where real Australian query evidence exists and the H1 is generic. Use a clear subject heading and preserve all current content and resource paths.
4. Review one existing topic cluster with observed global visibility and one with existing Australian resource-intent query evidence. Map guide to explain/teach intent, worksheet to print/practice-on-paper intent, interactive Practice to online practice, Test to assessment. Shared topic words are expected; shared query rows are only a review signal, not proof of cannibalisation.
5. Validate narrow candidate searches (embedded clauses Year 6; pushes and pulls Year 1) against existing resource availability and native query exports. No new landing pages, mass keyword variants, invented volume estimates or blanket H1 rewrites.
6. Compare matched 28-day windows after Google recrawls changed URLs. Record Australian impressions and number of distinct queries/pages. Do not use global spikes or total page count as the success measure.

## Files and regeneration

- visibility-report.html: offline searchable catalogue; no external dependencies.
- catalogue-visibility.csv / .json: code-to-guide mapping and metrics.
- australia-pages.json / australia-query_pages.json / global-pages.json / country-pages.json: connector responses retained as evidence.
- heading-metadata-inventory.csv / heading-metadata-audit.json: static source audit.

Regenerate with:

    python3 scripts/build_seo_visibility_study.py --source /path/to/current-main --study docs/qa/seo-study-2026-10-19

The source commit in heading-metadata-audit.json must match that source snapshot. This script does not fetch data, modify public pages, or publish changes.
