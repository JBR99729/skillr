# SkillrHub Bing / ChatGPT Search evidence checkpoint

**31 October 2026 | Evidence-led GEO/AEO maintenance | Source: user-supplied 30 October Bing CSV exports and public web search.**

## Current evidence, not invented ranking data

- Bing AI Performance CSV: **33 grounding-query rows, 1,057 cited occurrences across those reported rows**. These are grouped AI retrieval phrases, not exact customer prompts, referral clicks, unique people, or ChatGPT citations. Source: `skillrhub.com_AISearchQueriesReport_10_30_2026.csv` (private user attachment; not committed).
- Bing keyword CSV: **598 keyword rows**. Source: `skillrhub.com_KeywordReport_10_30_2026.csv` (private user attachment). **Twelve rows have clicks larger than impressions.** Treat such row-level CTR and any sum-based conclusions cautiously until the exported definitions are reconciled with Bing's native report. The CSV does not encode its start/end dates; it was described by the owner as six-month data. Do not assert an exact six-month date window.
- Bing Topics Portfolio **Opportunity Queries** and individual **cited-page URLs** are NOT present in these two exports. Do not present the 33 cited grounding phrases as competitor-only opportunities or assume which SkillrHub URL was cited.
- Existing site robots.txt permits `OAI-SearchBot`, `Bingbot` and other publicly listed crawlers; this allows discovery at the robots layer but does not confirm actual indexing or a citation.
- The six answer-first curriculum hubs previously added to main, along with HEA and independent comparisons, remain the initial treatment; avoid re-generating them before comparing recrawl and citation data.

## Prioritisation from actually observed Bing AI phrases

| Bing-reported grounding phrase | Reported citations | Source type | Canonical page to review |
|---|---:|---|---|
| year 8 science | 161 | Already cited grounding phrase | https://skillrhub.com/year8/curriculum/science/ |
| maths for year 1 | 112 | Already cited grounding phrase | https://skillrhub.com/year1/maths/ |
| math for year 1 | 98 | Already cited grounding phrase | https://skillrhub.com/year1/maths/ |
| year 1 maths addition | 70 | Already cited grounding phrase | https://skillrhub.com/year1/maths/ac9m1n04-addition-and-subtraction-within-20/ |
| pattern activity for grade 1 | 55 | Already cited grounding phrase | https://skillrhub.com/year1/maths/ac9m1a02-repeating-patterns/ |
| expand and simplify examples | 48 | Already cited grounding phrase; grade unspecified | https://skillrhub.com/year10/maths/ac9m10a01-expand-factorise-and-simplify-expressions-and-solve-equations/ |
| multiplication year 2 | 45 | Already cited grounding phrase | https://skillrhub.com/year2/maths/ |
| maths questions for year 4 | 42 | Already cited grounding phrase | https://skillrhub.com/year4/curriculum/maths/ |
| year 10 algebra | 30 | Already cited grounding phrase | https://skillrhub.com/year10/maths/ac9m10a01-expand-factorise-and-simplify-expressions-and-solve-equations/ |

**Caveat:** This table maps a phrase to a **suitable candidate** on SkillrHub; it does *not* confirm Bing actually cited that URL. Match exact cited-page data in Webmaster Tools before claiming it did. The "expand and simplify" phrase has no age or year qualifier; Year 10 is one useful example, not an exclusive interpretation.

## Small neutral public-retrieval proxy: what came first?

These are single-query public web search observations made on 31 October 2026. They are **not** consumer ChatGPT Search results or fixed ranking positions, and providers may show different results for other users/locations.

1. Query: “Where can I find free Year 1 Maths worksheets aligned with Australian Curriculum V9?” First returned source in this web search sample: [Lesson Creator Year 1 Maths](https://www.lessoncreator.com.au/curriculum/mathematics/year-1); other surfaced sources include [Noooli Year 1 worksheets](https://noooli.com/worksheets/maths/year-1) and [Aussie Primary Academy](https://aussieprimaryacademy.github.io/aussie-primary-academy/maths.html). No SkillrHub URL surfaced in the inspected first set.
2. Query: “Where can an Australian Year 10 student learn to expand factorise and simplify algebra expressions with worked examples?” First returned source in this web search sample: [Mathematics Hub Year 10 planning tool](https://www.mathematicshub.edu.au/planning-tool/10/algebra/formulate-and-manipulate-expressions/). Other surfaced sources included [IXL Year 10 alignment](https://au.ixl.com/standards/maths/year-10) and [Algebra Review](https://classmathematics.com.au/resources/nsw/year-10/maths-core/algebra/algebra-review/). No SkillrHub URL surfaced in the inspected first set.
3. In a multi-query exploration, sources included [Teach Starter equal-group worksheets](https://www.teachstarter.com/au/teaching-resource/year-2-multiplication-strategies-worksheet-pack/), [ACARA Year 4 odd/even](https://www.australiancurriculum.edu.au/resources/work-samples/mathematics/year-4/ws01-odd-and-even), [NSW home-schooling resources](https://www.nsw.gov.au/education-and-training/home-schooling/educational-programs/department-resources-to-support-home-schooling) and [HEA free resources](https://www.hea.edu.au/free). Multi-query results are not a stable first-result ranking.

**User-value observation:** Leading third-party pages give a very clear topic, Australian year, curriculum descriptor, sample lesson/worksheet, visible access conditions and a meaningful next action. Improving these qualities on existing SkillrHub pages is more defensible than repeating hundreds of keywords in `llms.txt`.

## ChatGPT Search measurements

- The installed search tool provides public web retrieval, not a consumer ChatGPT Search session. No directly observed ChatGPT citation answer is included in this checkpoint. Thus a ChatGPT citation rate is **UNTESTED**, not zero.
- `data/geo-chatgpt-neutral-prompts.json`: twelve unbranded, neutral questions based on curriculum needs and Bing-reported themes, with the relevant existing target pages. The public seed has zero observations.
- `scripts/geo-chatgpt-scorecard.mjs`: accepts **only** directly inspected ChatGPT Search answers with real citation URLs, date and search-enabled evidence. Its result is **UNTESTED** until actual user-session observations are collected. An observed sample rate is not an official sitewide ranking or impression measure.
- OpenAI confirms ChatGPT Search can add `utm_source=chatgpt.com` to links: https://help.openai.com/en/articles/12627856 . Existing GA4 page tags may measure click-through sessions once the GA4 property is connected and reporting is verified; UTM does not reveal original prompts.

## Data access and action queue

1. **Connect Bing Webmaster data.** The available Windsor.ai app has no connected `bing_webmaster` account, and the user's linked browser has no Bing Webmaster tab accessible in this chat. For a live exact opportunity/cited-page audit, connect the `bing_webmaster` source through its secure authorisation form using the site's Bing Webmaster API key and website property, or export the **Topics Portfolio → Opportunity Queries** and **Citations & Pages → Pages** tables from Bing directly. Never paste a Bing API key into a repository or chat. Connection is a user action.
2. **Connect GA4.** The available Windsor.ai app has no connected `googleanalytics4` property. Authorise it through the secure OAuth form, select the SkillrHub GA4 property, then read source/medium and landing-page metrics; do not invent ChatGPT visits from web hits. Connection is a user action.
3. **Run actual ChatGPT Search questions** in independent consumer search sessions (not this conversation's primed web search) or in Work mode where the cloud browser can interact with the site. Record actual answer citations and source links; re-run the same set on other dates.
4. For Bing, prioritise **genuine Opportunity Queries** from Topics Portfolio and compare affected page citation share and referral clicks across matched date ranges; avoid treating existing high-citation phrases as absent-site opportunities.
5. Send HEA correction to the directory operator via their public contact channel. Completed: correction email sent from SkillrHub Learning's connected Gmail account on 31 October; a daily conditional check is enabled to detect the corrected public listing. Until HEA changes the title, it still reads “Skrillrhub”; its description accurately names SkillrHub.

## Decision

This checkpoint makes only a small, truthful AI-discovery improvement: add two already-authored canonical topic routes to the answer-first `llms.txt` section (Year 1 patterns and Year 10 algebra) and an evidence-gated citation benchmark. **No additional mass-generated SEO pages, no hidden prompts or review claims, no student-data changes and no production revenue or citation lift asserted.**
