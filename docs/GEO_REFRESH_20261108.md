# GEO discovery refresh — 8 November 2026

The year/subject hubs were retired on 7 November in favour of the unified `/learn/` catalogue. Bing's historical citation and Web reports still contain those routes. The former hubs must remain compatibility redirects; historical citations are not permission to restore them or call them current answer pages.

## Published change

- Twenty existing teaching and resource destinations are described in `data/geo-answer-routes.json`, `llms.txt` and `ai-index.json`. Selection follows relevant Bing grounding themes, cited-page evidence and the existing Australian Curriculum resource scope. The list is editorial, not an ordering by rank or predicted performance.
- `llms-full.txt` and `ai-site-map.md` use the current catalogue filters. Filtered views share the `/learn/` canonical. Specific learning answers use a substantive overview or canonical topic guide.
- The existing Year 8 Science curriculum article receives three native FAQ answers about curriculum coverage, example-based revision and resource selection, plus matching FAQPage data. Existing article content, metadata, navigation and resources are retained.
- Neutral benchmark questions are unchanged. Retired target destinations are updated, with the prior targets retained as history. The benchmark remains untested, not a zero-citation result.
- The query planner preserves AI grounding phrases as grouped themes and recognises algebra, shapes and periodic-table topics. Provider-generated topic labels are not accepted as curriculum classification without checking meaning.
- GEO route checks cover current canonical/indexable targets and exclude retired hubs. The existing blog check validates the new catalogue path and verifies redirect destinations rather than requiring an article campaign block on a redirect.

## Evidence and measurement

Authenticated Bing Web, AI Citations & Pages, Topic Portfolio, Keyword Research, Sitemaps, Recommendations, Site Explorer, Backlinks, IndexNow and the latest completed Site Scan were reviewed. Account-level exports and the exact observation windows remain in the private experiment record, outside this public repository. The dated 2026-10-31 documents describe the earlier hub experiment and are historical.

The Web keyword and landing-page exports are separate reports. Do not join them by row order or assume that a sitewide query belongs to a particular URL. Grounding-query-to-page relationships require a filtered Bing report; cited-page totals and sampled grounding counts need not match. A retired hub's past citations do not transfer automatically to its current destination or to the replacement article.

The current Web and AI reports use 8 August–7 November 2026, with chart data available through 4 November. Topic Portfolio was explicitly set to **3M (Jul–Sep)** for the refresh. Its opportunity ranges are ecosystem signals, not SkillrHub impressions, sessions or conversions. Australia is not separately reported in the current country export; the `ww` / Rest of World row cannot be treated as Australia.

Review the same exact URLs, theme groups, country scope and device scope over matched 28-day windows after observed recrawl. Record merge, successful live deployment and crawler dates separately. Compare topic-guide/worksheet activity and qualified referrals where measured, alongside Bing Web clicks and AI citations. Catalogue retirement and the earlier FAQ release are confounders; these changes cannot establish a causal ranking benefit by themselves.

## Bounded next decisions

- Keep Year 10 algebra, Year 8 Science and early primary Maths as the initial observation groups. Do not keep rewriting them before a usable post-change window exists.
- Reading comprehension, KWL charts and exit tickets are candidate teacher needs from Topic Portfolio. Inspect a matching existing Australian resource and corroborating demand before creating content. Exclude unrelated languages, unsupported overseas-grade equivalences and generic global keyword expansion.
- Current sitemaps are healthy. The title warning refers to a page whose current title is already shorter. The older scan's missing-description item is a noindex practice utility. Do not change indexability or mass-rewrite titles to clear stale report entries.
- The backlink report supplies no data. This is not proof that no external links exist. No outreach or link purchasing is included.
- An accepted IndexNow notification is not a verified crawl or index inclusion. Notify changed content once; repeated submission is not evidence of improvement.

No scheduled job or analytics conversion measurement is created by this change.

## Validation

Use `node --test scripts/tests/geo-answer-map.test.mjs`, `node scripts/validate_blog_free_first_campaign.mjs`, `node scripts/audit_search_ai_integrity.mjs`, and `python3 scripts/audit_internal_links.py`. Preserve the complete remote tree and run `node scripts/check_release_integrity.mjs BASE CANDIDATE` before a non-forced publication. Verify Pages and exact live bytes afterward.
