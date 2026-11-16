# Bing keyword-led SEO maintenance — 16 November 2026

Source: owner-uploaded `skillrhub.com_KeywordReport_11_16_2026.csv` (738 query rows). The export does not state its reporting period and does not map queries to landing pages. Thirteen rows report clicks greater than impressions; use query themes directionally, not aggregate CTR as a performance baseline. Query groups below overlap and are not search-volume estimates.

| Search theme | Matching rows | Reported impressions | Reported clicks | Existing destination |
| --- | ---: | ---: | ---: | --- |
| Homeschool | 9 | 44 | 0 | `/homeschooling-australia/` |
| Year 1 maths / tens and ones / partitioning | 36 | 71 | 18 | `/worksheets/year1/maths/` and its existing topic guides |
| Year 4 science / AC9S4U | 5 | 11 | 2 | `/worksheets/year4/science/` |
| Framing / salience / visual grammar / social distance / camera angle | 3 | 16 | 1 | Existing Year 7 visual-language guide; no claim that this one guide covers every visual-composition query |
| New evidence / scientific knowledge | 12 | 32 | 0 | Existing AC9S7H01 guide |

Changes: focused titles, social descriptions, collection metadata and introductions on the three existing resource hubs; ordinary static homepage links to these hubs and relevant English/science explanations. Homeschool copy directs parents to today's tasks. Canonical URLs and sitemap architecture are preserved. No new keyword doorway pages or question-bank changes. Paid printables remain labelled paid; only the verified free-TpT directory is offered as a free printable route. No third-party book/PDF or competitor searches have been added as product claims.

Related app patch: replace Cloudflare's blanket SPA fallback with `not_found_handling = "none"` in production and development; real file routes, Worker routes and root-query app entry remain. Add static app-home links back to the three public resource hubs and focused routing/indexability regression checks.

Local validation: four HTML pages have one H1, one main, unique IDs, valid JSON-LD, an indexable robots declaration and one canonical. Five added resource destinations returned HTTP 200 without redirects. App routing/indexability tests passed 3/3. Deployment and hosted-response checks are separate; a source commit is not evidence of deployment or Bing indexing.

Follow-up: inspect the app homepage in Bing URL Inspection, compare live HTML with Bing's last crawled HTML, and request indexing after the hosted fix is verified. Do not claim that sitemap submission, IndexNow or search indexing occurred unless separately observed. Bing visibility is not guaranteed.

## Direct Bing account inspection and warning repairs

The Recommendations screen reported two title warnings (Year 6 English curriculum hub and AC9E6LA06) and insufficient links from high-quality external domains. The curriculum hub is already a retired noindex route with a short title; preserve its selected-year/subject handoff. Shorten AC9E6LA06's title and preserve that exact reviewed title in the topic metadata generator.

The latest saved Site Scan was completed 15 days before this inspection: 1,000 pages, one missing-description error, 87 long-title warnings, one meta-refresh warning, four missing-H1 notices and one multiple-H1 notice. All 87 long-title URLs were collected through the UI: 68 product pages and 19 retired worksheet-player URLs. Of the product pages, 67 still needed shorter titles; one was already short. Limit the patch to those 67 HTML title/OG title fields; leave full product headings, content, prices, purchase links, structured product data and canonical URLs unchanged. The product builder now uses a concise title helper to prevent regenerated long titles; tests preserve free/sample/part distinctions, whole words and meaningful identity.

The missing description and meta-refresh warning both concern `/quiz/year-1/math/ac9m1n01/practice/`. Add a description, retain noindex and its matching-code handoff for existing bookmarks. A server-side 301 requires hosting-layer support that GitHub Pages does not provide; do not pretend an HTML redirect is an HTTP 301 or remove a working handoff solely to clear a scan warning.

The four missing-H1 notices all concern `product.html?id=...`. Add a static fallback H1 and a no-JavaScript catalogue link to the shared, already-noindex template. Product rendering replaces that section, so it does not add a second product H1. The multiple-H1 notice concerns separate hidden guest/workspace/admin states in `/tracker/`, not a public topic guide. Keep private application state outside the public homepage indexing strategy; do not rewrite functional hidden screens merely to satisfy SEO notices.

Validation: 67 product titles are below 70 characters, with no truncation; all retain one H1, valid structured data and canonical markup. Two title-helper tests pass. AC9E6LA06 metadata generation is idempotent and leaves the body and canonical untouched. Deployment and a fresh Bing crawl are required before dashboard counts can change. External backlink authority cannot be repaired by local metadata edits; no outreach or purchased links were performed.
