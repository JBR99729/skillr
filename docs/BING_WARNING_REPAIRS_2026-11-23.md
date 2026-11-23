# Bing warning repairs — 23 November 2026

Owner request: use the cloud browser to access Bing Webmaster Tools and fix its warnings. The authenticated inspection covered the main `https://skillrhub.com/` property and the related app property. No report, site, crawl history or warning was deleted or hidden to manufacture a clean result.

## Main site Recommendations

| Observed warning | Bing count | Current finding and action |
| --- | ---: | --- |
| Title too long | 2 | The Year 6 English retired hub is already 36 characters and noindex; AC9E6LA06 is already 67 characters. Verify live and submit the current indexable topic URL for recrawl. |
| Missing description | 2 | Add specific descriptions to the retired AC9M7N05 practice entrance and Year 9 hub; preserve their complete body, noindex and existing handoffs. Update only their generator cases so maintenance retains the fixes. |
| MetaRefresh tag exists | 2 | The same two retired entrances use immediate HTML redirects, native links and JavaScript fallback. Retain this working navigation. GitHub Pages cannot issue per-route HTTP 301s from repository files; removing HTML redirects would break automatic navigation without JavaScript. These warnings remain documented. |
| Insufficient high-quality inbound links | Site-level | External reputation work, not a metadata defect. No unsolicited outreach, purchased links or fabricated endorsements. |

The description repair names AC9M7N05 as rounding and estimation with decimals, checked against the existing curriculum catalogue. It does not reopen the retired player, change the app destination or make a new practice-availability claim.

## Historical Site Scan

The newest saved scan is named `app` but belongs to the main site. Bing displayed “Completed 22 days ago”, 1,000 pages, one error, 88 warnings and five notices. Its ID is `3ac46197-0541-411b-a629-4f6dd94b35a9`.

All 87 long-title URLs were collected from the UI with URL sorting and pagination, then compared with current source and live HTTP responses. All 68 product pages already have titles of 70 characters or fewer; all 19 worksheet-player URLs are intentionally noindex. Every one returned HTTP 200 and matched its source title and indexability. Do not rewrite their content or remove functional routes to erase a historical count.

The scan's missing-description error refers to retired AC9M1N01 practice, already repaired previously. Four missing-H1 notices concern the shared noindex `product.html?id=…` template, which already supplies a static fallback H1. Its multiple-H1 notice refers to `https://app.skillrhub.com/tracker/`; the current production source has one H1 and noindex. These are separately verified previous repairs, not changes made by this patch.

The Start new scan panel showed **Quota left: 0 pages** with scan inputs disabled. A new Site Scan cannot run under that quota. Keep its historical date/counts and distinguish current live checks from a fresh Bing crawl. Sitemap or URL submissions do not constitute a completed scan or guarantee indexing.

## App property

The related app report shows one IndexNow setup recommendation, one backlink recommendation and seven duplicate-title plus seven duplicate-description entries. The description-detail UI exposes five distinct login/practice query URLs; do not equate the aggregate count with seven inspected unique URLs. Live URL testing of the AC9M7N05 entry returned 200, shared app metadata, a homepage canonical and “No SEO/GEO issues found”. The indexed inspection showed last crawl 21 November and indexing allowed.

App repair is isolated in `JBR99729/skillr-app` PR #374: functional root query entries receive a server noindex header while the public homepage stays indexable; add a public IndexNow verification file. Preserve routes, app HTML, security, authentication, banks and learner data. App CI, deployment, live headers and notification acceptance are separate release evidence; an open PR is not a deployed fix.

## Verification and release

The exact observed 87-URL inventory and live checks are in `docs/qa/bing-warnings-20261123.json`. For the two newly repaired HTML files, removing the sole inserted description reproduces the entire previous file byte-for-byte. Both migration generators reproduce the intended files, and their current global read-only checks report zero additional changes. Legacy routing tests, discovery/navigation, sitemap/search integrity and existing SEO experiment preservation checks apply. The complete candidate must retain every existing path and CNAME. Exact-head CI, successful final Pages publication, hosted descriptions and Bing submissions are recorded in the pull request.

This patch does not change the 48-page NSW/Victoria/CCSS experiment or the four exact-descriptor topic pages. Report unresolved external/hosting/quota limits explicitly; do not claim all Bing warnings have disappeared before Bing confirms that result.

## Consolidation workflow correction

After the description merge, the existing consolidation workflow ran its write-only navigation refresh despite a zero-change read-only result. Its automatic commit `7160f250f7ab0da9d9ad2b707426a6beb519bf1f` made unrelated topic-navigation and generated-index changes. Restore that complete automatic delta to the reviewed description-merge tree `75fd33c8fa47f7f48360c800d9e2e884d2746505`, retaining both description fixes. Add a no-op guard so the write-only navigation phase runs only when retired-route/link migration actually changed files.

The regression fixture checks the real write path on already-consolidated routes and an authored lesson. The full-site write command must report zero changes, preserve all 48 experiment pages and four exact-descriptor pages, and leave only the intended guard/test/documentation changes compared with the reviewed description merge. Complete-tree rollback preserves every site path and unrelated subtree; it is a forward corrective commit, not a forced branch reset. Final CI, deployment and live preservation evidence belong in the corrective pull request.
