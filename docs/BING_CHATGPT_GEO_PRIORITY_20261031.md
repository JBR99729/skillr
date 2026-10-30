# Bing and ChatGPT Search: SkillrHub GEO measurement and content pilot

**31 October 2026 | Primary channels: Bing/Copilot + ChatGPT Search | Release scope: six existing public curriculum hubs.**

## Goal and decision rule

Make AI-assisted discovery a measurable SkillrHub acquisition channel for Australian homeschool parents, teachers, tutors and families. The business KPI is **engaged referral sessions and qualified learning or printable-resource actions**, not raw citations alone. Optimise for Bing/Copilot citations and links plus ChatGPT referrals; maintain conventional crawlability without prioritising a Google content campaign.

Do not treat the owner's qualitative "Bing has about 10x Google's visibility" as a harmonised ratio: Bing and Google reports have different definitions and periods. Record source-specific windows and measures.

## Evidence and selection

The owner supplied six-month-labelled exports on 31 October:
- `skillrhub.com_AISearchQueriesReport_10_30_2026.csv`: **33 Bing AI grounding-query rows; 1,057 reported citations across those rows**, not unique ChatGPT mentions or clicks.
- `skillrhub.com_KeywordReport_10_30_2026.csv`: **598 Bing keyword rows**, not a complete list of every user's searches.
- `https___skillrhub.com_-Performance-on-Search-2026-10-31.zip`: Google comparison/background; not used to prioritise Bing/Copilot experiments.
- Preserve exact source row strings and provider date boundaries in the private analytics audit; do not commit account-level exports.

These **Bing AI grounding phrases** were prominent in the supplied report and guided the choice of topic hubs. Bing explains that grounding queries are **grouped retrieval phrases**, *not* the actual user prompts and *not* evidence that a particular page was cited: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c

| Bing AI grounding phrase | Citation count in supplied report | Topic intent selected |
|---|---:|---|
| year 8 science | 161 | Year 8 Science hub |
| maths for year 1 | 112 | Year 1 Maths hub |
| math for year 1 | 98 | Year 1 Maths hub |
| year 1 maths addition | 70 | Year 1 addition worked example |
| multiplication year 2 | 45 | Year 2 equal groups |
| maths questions for year 4 | 42 | Year 4 Maths hub |
| maths questions year 4 | 30 | Year 4 Maths hub |

Other selected topics: Year 1 Science and Year 6 English. These are suitable existing destinations, not claims that Bing cited the exact URLs. **Read Bing's Pages view or grounding-query-to-page mapping before making a cited-page claim.**

## What the six-hub edit changes

1. `/year8/curriculum/science/`: answer what Year 8 Science teaches; show four specific canonical topic paths and one accurate example.
2. `/year1/maths/`: clear Year 1 addition, patterns and shapes answer, with original examples and existing topic links.
3. `/year2/maths/`: equal groups and division answer, related existing teaching guides and check.
4. `/year4/curriculum/maths/`: odd/even, fractions and perimeter examples, with matching topic links.
5. `/year1/science/`: living things, seasons and forces, with age-appropriate investigations and links.
6. `/year6/curriculum/english/`: concrete Year 6 lesson starters on register, objectivity and embedded clauses.

All new text is **native, publicly crawlable HTML** on existing canonical hubs; it requires no JavaScript and supplies enough context to be useful without clicking into the practice app. The existing hub and topic navigation, structured data, sitemaps, title/meta except two scoped description improvements, learning and payment flows remain unchanged. Only the six changed sitemap entries receive updated `lastmod`.

## ChatGPT Search: measurable and unmeasurable

**First-party publisher guidance:** https://help.openai.com/en/articles/12627856 and https://help.openai.com/en/articles/9237897-chatgpt-search

- Allow `OAI-SearchBot` in `robots.txt` and don't block its published IP ranges at the host/CDN. `GPTBot` (training) and `ChatGPT-User` (user-initiated fetch) are different agents. Permission for one does not prove crawl success or ranking.
- OpenAI says ChatGPT Search referral URLs automatically carry `utm_source=chatgpt.com`. This enables **click-through tracking**, not an official citation impressions report.
- There is currently **no documented publisher ChatGPT Search Console** exposing a site's total answer impressions, exact prompt list, ranked position, or sitewide citation counts. "Rank #1 in ChatGPT" is not a stable metric: results can differ between question, conversation, date, location and product mode.
- The six pilot public hub pages contain existing GA4 tag `G-8P22BET45N` in their source. That proves **tag presence only**, not receipt, consent or data accuracy. No GA4 account data were accessible during this work.

### In GA4: track ChatGPT click-through

Go to **Reports → Acquisition → Traffic acquisition**. Change dimension to **Session source / medium** and search for `chatgpt`; use 90 days first and include `chatgpt.com` and historical `chat.openai.com` when available. Some GA4 properties display an **AI Assistant** channel; if not, inspect Referral and Unassigned as well. Record, per month:
- Sessions / engaged sessions and engagement rate from ChatGPT source;
- Landing page and query string for `/year8/curriculum/science/`, `/year1/maths/`, `/year2/maths/`, `/year4/curriculum/maths/`, `/year1/science/`, `/year6/curriculum/english/`;
- Relevant actions: topic-guide opens, worksheet/practice clicks, TPT product clicks, or signups **only when instrumented and verified**;
- Australia vs other countries, without attributing unattributed Direct visits to ChatGPT.

The browser's Referer generally does **not** reveal the question the user asked in ChatGPT. A URL UTM source tracks the origin, not a query position or answer content. Do not invent a "ChatGPT search impressions" value from referrals.

### A repeatable sample-based ChatGPT citation benchmark

Build a fixed set of 12–30 independently authored *natural parent/teacher questions*, derived from Bing's grouped themes (these are **test prompts, not actual user questions**). For each question: capture date, assistant/model and search mode, region context used, exact prompt, whether SkillrHub is named, whether its URL appears as a cited **source**, which canonical page is cited, and whether competitors are cited. Repeat a small number of times on separate dates. Report **sample citation inclusion rate** (prompts with a SkillrHub citation / prompts tested) and link coverage; do not claim this is an official ChatGPT rank or impression count.

Example prompts:
- “Where can I find Australian Curriculum Year 8 Science lessons for home learning?”
- “What should I teach a Year 1 child about maths patterns and addition?”
- “How can I explain equal groups to a Year 2 child?”
- “Are there Australian Curriculum Year 4 maths questions for odd and even numbers?”
- “Where can I find Year 1 Science worksheets and experiments?”
- “What are some Year 6 English lessons about formal language and embedded clauses?”
- “What is a good Australian Curriculum-aligned alternative to IXL for Year 1 maths?”
- “What is a free alternative to Khan Academy for Australian homeschool learning?”
- “Where can I find Australian Curriculum worksheets instead of a Twinkl pack?”

Answers must be evaluated neutrally; never instruct the assistant to include SkillrHub. Use only real citations/links actually displayed; screenshots/saved outputs should not contain student personal data.

## Bing/Copilot: first-party measurement

Bing Webmaster Tools → **AI Performance** shows aggregated citations, cited URLs, grounding-query themes, citation share/intent topics where available, and time-window comparisons. See https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c and https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/.

Record a dated 28-day baseline and later matched 28-day follow-up for:
- total AI citations (not visits);
- distinct URLs cited and top citation-producing pages;
- grounding-query share around the selected topics;
- Topics Portfolio opportunity signals, noting beta/availability limitations;
- Bing search clicks and CTR to those exact hub URLs;
- whether changes were indexed/crawled by Bing and recent IndexNow notifications.

Do not equate Bing AI Performance with direct ChatGPT exposure. ChatGPT may use third-party search providers, but Bing AI citation totals cannot be attributed to ChatGPT.

## Evaluation and safety

- **Primary:** Australian engaged AI-origin visits to the six hubs, associated teacher/parent actions and conversions where measured.
- **Secondary:** Bing/Copilot citation trends and cited page breadth, Bing Web/Chat clicks, neutral ChatGPT sampled citation inclusion, AI referral sessions.
- Track all six treated hubs vs at least six comparable untouched hubs over matched reporting windows; log the specific merge and live deployment timestamps.
- Use sitewide FAQ/schema only when supported by visible content. No hidden keyword lists, purchased citations, doorway pages, fake reviews or competitor misrepresentation.
- The HEA free-resource directory listing is a relevant independent referral/trust reference, **not** an endorsement or accreditation.
- Stop and repair if page intent becomes inaccurate, a link is broken, an existing resource disappears, mobile rendering degrades or technical SEO checks fail.

## Operational gaps

- Actual Bing **page-level citation** export needed to identify which individual pages were cited.
- GA4 account access needed to compute real ChatGPT visits, landing pages and engagement. The existing GA4 tag alone is not a verified referral count.
- Cross-platform keyword counts and Bing AI citations cannot be converted into a precise forecast of ranking, sessions, or revenue.
