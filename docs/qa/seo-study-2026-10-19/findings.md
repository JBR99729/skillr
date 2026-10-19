# Existing-content SEO study — 19 October 2026

Scope: source audit of published main 791a4fbf255bb884d8bc0a803f756cce09c425dc, union of sitemap URL inventories; Search Console Australian query–page rows for 20 September–17 October 2026 via Windsor.ai. No production edits or publication. Local checkout is stale; source extracted from freshly fetched main. Inventory includes activities, products and hubs, not just the owner's 687 curriculum topics. The JSON topic flag is a broad route heuristic and is not a curriculum-code count.

## Findings

3,389 sitemap-listed HTML pages inspected. Every inspected page has a title, exactly one H1, one nonempty description and a self canonical; no source robots noindex detected. Zero exact duplicate title groups. This checks static source, not Google's selected canonical, rendered DOM, HTTP headers or actual indexed status. Sitemap union includes auxiliary maps and does not establish that every URL is submitted or indexed.

664 repeated-H1 groups and 19 repeated-description groups need classification, not automatic rewriting. Most shared H1s identify the same curriculum topic across guide/activity/practice/test. This is not evidence of a penalty. However headings could distinguish resource purpose more clearly. 28 titles exceed 90 characters; length is only a review flag, not a Google violation.

Seven subject hubs use “Find the next skill. Learn it together.” as their main heading, including Year 1 Science, instead of explicitly identifying year, subject and resource. Their titles already identify the subjects; this is a clarity opportunity, not proof of the impression decline.

Confirmed metadata mismatch: /products/tpt-17737649/ is titled Year 1 Topic Vocabulary Slides (AC9E1LA09) but its description describes punctuation/capital letters and duplicates /products/tpt-17737657/. Inspect the original product before correcting both the generated page and its data source. Another pair, tpt-17745803 and tpt-17746080, shares a text-purpose description; validate identities before deciding whether this is erroneous.

Malformed natural-language activity title: /quiz/year-6/english/ac9e6ly05/ says “Comprehension strategies such as Quiz | Year 6 | AC9E6LY05”. Existing H1 gives the clearer topic: Comprehension, Inference and Critical Evaluation. A targeted title correction is warranted.

## Search evidence and long-tail priorities

Australia query rows are sparse and privacy filtered; absence of a query does not mean zero demand. Observed impressions do not measure total search volume. No keyword-volume estimates were available.

| Priority | Existing destination | Observed evidence | Existing-content opportunity |
| --- | --- | --- | --- |
| 1 | /year1/curriculum/science/ | “year one science”: 17 impressions, position 64.24; “year 1 science”: 1, position 68 | Explicit Year 1 Science heading; describe the actual teaching resources rather than a generic slogan. Test topic-specific child destinations. |
| 2 | /year6/curriculum/english/ | “year 6 english lessons”: 15 impressions, position 84.47; “year 6 english”: 9, position 75.89 | Assess title/H1 wording around Year 6 English lessons and worksheets, while retaining curriculum identity. Direct users to existing specific resources. |
| 3 | /year7/curriculum/english/ | “year 7 english program”: 11 impressions, position 81.64 | Explain existing coverage and navigation; do not claim a complete sequenced program unless verified. |
| 4 | /year7/curriculum/science/ | “year 7 science worksheets”: 1 impression, position 69 | Relevant but weak evidence; validate accessible worksheet offering before making it a title promise. |
| 5 | Existing AC9E6LA05 guide + worksheet | Candidate: “year 6 embedded clauses worksheets”; representative Teach Starter resource inspected in search | Give existing destination a concise human topic H1; retain exact official descriptor separately. Candidate is unvalidated in current GSC rows. |
| 6 | Existing AC9S1U03 guide/product | Candidate: “year 1 pushes and pulls worksheets”; current competitor resource pages and SkillrHub's own TPT product surfaced | Select the resource-specific landing page, clearly distinguish free guide from paid printable. Candidate lacks measured volume. |

Possible wording for a small experiment, subject to resource verification:
- Year 6 hub title: “Year 6 English Lessons & Worksheets | Australian Curriculum | SkillrHub”; H1: “Year 6 English lessons and worksheets”.
- Year 1 Science H1: “Year 1 Science teaching resources”.
- AC9E6LA05 guide H1: “Year 6 Embedded Clauses: Examples and Practice”; preserve full official wording elsewhere. Do not label it a worksheet if the destination is a guide.
- AC9S1U03 guide H1: “Year 1 Pushes and Pulls: Examples and Activities”.

These are proposals, not deployed changes. Avoid blanket code-first title rewrites: many existing topic titles already use year and concept first. Preserve resource-specific purpose across guide, worksheet, slides, practice and test; do not force all five to target the same exact phrase.

## Interpretation and next validation

Enough content exists to test search presentation without adding pages. Basic static tag completeness is not the primary uncovered defect. Resource-intent clarity, some boilerplate and specific factual metadata errors are actionable. None establishes the cause of the full visibility decline. Page Indexing/URL Inspection remains necessary to separate exclusion from weak relevance; current connector only supplies search analytics and sitemap data.

Use a small page-specific experiment after correcting factual errors. Record baseline by URL and Australian query; compare 28-day windows after recrawling, including impressions, query breadth and index status. Keep all other metadata and sitemap strategy stable. No guaranteed lift or fixed indexing timeline.

Sources:
- Google title links: https://developers.google.com/search/docs/appearance/title-link
- Google descriptions: https://developers.google.com/search/docs/appearance/snippet
- Google supported tags: https://developers.google.com/search/docs/crawling-indexing/special-tags
- Representative competitor: https://www.teachstarter.com/au/teaching-resource/embedded-clause-worksheets/
- Representative competitor: https://topteacher.com.au/resource/push-pull-sort-worksheet

Google recommends descriptive, distinct titles and a clear main heading. Descriptions can supply snippets; they are not an indexing switch. Google ignores meta keywords. Metadata changes alone do not establish content competitiveness.
