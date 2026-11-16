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
