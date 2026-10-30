# SkillrHub Answer-to-Action Graph — GEO growth experiment

**Proposed:** 31 October 2026. **State:** experimental design and input processing on a feature branch only; not live, not validated for growth. **Owner objective:** maximise relevant AI citations **and** organic visits by Australian parents, teachers and homeschool families. No promised rankings, traffic or conversions.

## Discovery hypothesis

The novel edge is not more keywords or another `llms.txt`. Connect three kinds of first-party evidence on a single canonical curriculum page:

1. **Real demand:** Preserve every recoverable six-month Google Search Console *exact query* and Bing Webmaster *grounding-query group* with source, period, page, impressions/clicks/citations, and unknowns. The owner's estimate that these cover ~90% of keywords is a working hypothesis, **not** a verified completeness statistic.
2. **Real learning need:** Map related search intents to the official Australian Curriculum V9 outcome, original teaching examples, and teacher-verified misconceptions. Initially use editorially checked misconceptions; only use aggregate learner wrong-answer patterns after explicit privacy/legal review, a minimum sample threshold, and checks that nobody can be identified.
3. **Reason to visit:** Give the direct answer in public HTML, plus an *original interactive step* on the same topic (e.g. change the whole on a percentage model, move a clock's minute hand, show a subtraction regrouping model), or a verified relevant existing worksheet/practice destination. An AI can cite the answer; a learner/parent has a worthwhile next action that cannot be fully experienced in an answer summary.

Call this an **Answer-to-Action Graph**: `actual query → learning intent → canonical code → specific answer + evidence → original experience → meaningful next action`.

### Why this might work, and what is not established

- Google advises unique, people-first content, technical SEO and substantive usefulness—not special GEO hacks or extra AI files: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Bing's AI Performance report includes grouped grounding queries, cited URLs and citation counts. Grouped phrases are **not the exact user prompts** and citations are **not clicks**: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
- Improving answer clarity may improve AI citation eligibility, but a full answer may also remove the need to click. The novel bet is to pair a complete answer with an intrinsically useful original visual or diagnostic action, rather than tease or withhold the answer.
- This is a causal hypothesis to test, not a proven search-engine ranking factor or a novel algorithm inside Google or Bing.

## Reuse rather than replace existing SkillrHub SEO

- The site's `llms.txt`, `llms-full.txt`, `ai-index.json`, AI sitemap, structured information and existing 48 optimised topic guides already exist. Do **not** regenerate them in bulk.
- Keep existing canonical URLs, site taxonomy, curriculum scope, learning content, videos, links and code-specific bank availability.
- Avoid invented "most common mistakes", unsupported evidence claims, keyword-density targets, FAQ/schema spam, fake ratings, artificial citations, mass-produced near-duplicates, and unsupported automatic curriculum equivalence.
- Public factual answers must be in crawlable native HTML, available without JavaScript. Any interactive tool can enhance that content but may not be the only presentation of the explanation.
- Do not publish question banks or private learner telemetry through the GEO pipeline.

## Input inventory and correct interpretation

Use `node scripts/geo-query-planner.mjs --google /path/gsc-6mo.csv --bing /path/bing-search-6mo.csv --ai /path/bing-ai-6mo.csv --out /local/private/geo-queue.json`.

Accept multiple `--google`, `--bing`, and `--ai` arguments for sharded exports; preserve all distinct observed query/page pairs. Output is local and **not** a public asset. Never commit raw private account exports. Stored reports must state their exact period and provider.

- GSC queries: original submitted query strings reported by GSC; query lists may be privacy-thresholded or truncated, so 100% observed coverage is not the same as all searches.
- Bing conventional keywords: original exported keyword/search performance rows with the Bing report's definitions.
- Bing AI grounding query themes: grouped retrieval phrases and observed citations, not exact user prompts, not literal search terms. Never invent the prompts that yielded these themes.
- A given source may show a query against multiple URLs. Preserve those associations for cannibalisation/intent review.
- Label site-operator/curriculum-code-only queries *diagnostic-like for manual review*, not certain bots. Do not discard them from the evidence inventory.
- Separate searches from Australia from all-country data wherever country is available. Preserve branded and non-branded slices.
- If an external connector is blocked, use **dated** saved exports; do not treat an error-message row as zero search traffic.

### Available evidence at experiment creation

- Existing 28 September SEO report: AI grounding themes include **Year 5 percentages** (10 citations), **Year 1 addition** (21), **Year 1 patterns** (25), **Year 5 grid coordinates** (6) and **Year 2 multiplication** (9). These are historic source-specific counts and **not** six-month totals.
- Existing 20 September–17 October Australia GSC sample: year 6 English, year 1 science and year 7 English resource-intent queries appeared; no inference that absent rows had zero demand.
- The selected 48 topic guides were already SEO-enhanced on 28 October. Treat them as recently modified, with potential confounding effects and insufficient post-change observation.
- The six-month full-fidelity Google/Bing exports have **not** been read into this branch. This work must not be described as a six-month keyword rollout.

## Ranking and editorial queue

Group search rows by question intent (explain, teach, troubleshoot, visualise, compare, practise, printable, assess, homeschool planning) and by closest established curriculum destination. Prefer one existing page serving several *natural variants of the same intent*; a query phrase does not justify a new URL.

Prioritise:
- already-cited Bing pages with multiple relevant grounding groups;
- Australian non-branded queries that show real impressions but weak clicks;
- pages where an original model or misconception analysis makes the answer substantially better;
- weakly answered queries for which the site actually has teaching resources or a truthful free practice destination.

Do not equate query frequency with citation value. The output planner score is a heuristic triage rank, not a machine prediction or SEO volume measure.

## Three pilot answer-to-action experiences

These are **candidates subject to exact-query audit, topic-scope check and visual smoke QA**:

| Canonical code | Citable answer (already supported by authored teaching) | Potential original on-site action |
|---|---|---|
| AC9M5N04, Year 5 percentages | "Percent means out of 100. Three quarters is 75%. A percentage only compares amounts meaningfully when you know the whole." | Adjustable shaded hundred-grid to compare two differently sized wholes; linked existing relevant worksheet |
| AC9M3M03, Year 3 time duration | "There are 60 seconds in a minute. Two minutes 15 seconds is 135 seconds." | Adjustable timer: estimate an activity then compare with measured duration; real time-unit worksheet |
| AC9M1N04, Year 1 addition within 20 | "To add 8 + 5 using make ten, split 5 into 2 and 3: 8 + 2 + 3 = 13." | Manipulable ten-frame and optional free code-matched Practice link, only if published |

The concept and diagram must remain accessible and accurate even without the interaction. Avoid adding an unnecessary repeated FAQ or duplicate answer if the current page already satisfies the query. On each candidate, check the live-relevant source and original learning sequence before patching.

## Controlled study, not self-congratulation

**Baseline:** 28–42 days before the *specific treatment deployment* where data permit; export exact pages, queries, Australian traffic, Bing AI citations and site activity. Log existing 28 October title/introduction edits as a confounder. Long historical baselines are descriptive; recent changes require separate before/after treatment analysis.

**Allocation:** choose 12–20 candidate pages and 12–20 matched controls (similar historical impressions, curriculum band, topic, crawl status and update recency), then randomly assign treatment where comparable. Test one intervention: a verified, visible answer + original action with scoped internal link. Controls retain existing content.

**Primary success metric:** growth in *relevant organic search clicks/engaged landings* to treated pages versus controls, with focus on Australia. Distinguish search clicks (GSC/Bing) from total sessions (analytics if available).

**Secondary measures:** incremental Bing cited-page and citation activity, Google Generative AI performance where available, GSC non-branded impressions, topic-specific query breadth, worksheet/practice launch rate, percentage of crawled/indexed candidates, and genuinely helpful feedback.

**Analysis:** compare matched windows and use difference-in-differences and cohort-level bootstrapped confidence intervals if sample is sufficient. Report absolute counts, uncertainty, provider-specific definitions, delays in indexing, small sample limitations, and whether new queries are natural or diagnostic-like. Do not add Bing citations to Google impressions. Do not claim a causal effect merely because both numbers rose.

**Stop conditions:** lower mobile readability, wrong explanation, misleading availability, indexing/canonical regressions, degraded accessibility, or substantial organic-click decline relative to controls.

## Safe release process

1. Import all accessible six-month exports locally; reconcile columns, date coverage, country and query types.
2. Generate a private, lossless query inventory and inspect the top grouped canonical landing pages.
3. Editorially verify selected answer examples, source references and bank availability.
4. Implement **only a small named batch** on this feature branch; preserve all page sections, scripts, links, SEO metadata and public controls.
5. Smoke QA with JavaScript off/on at mobile and desktop, run SEO/indexability/release-integrity checks, compare the complete repository tree and audit all touched paths.
6. Release is separately authorised. No production promotion during design or untested pilot work.
7. Observe Search Console and Bing for several matched weeks before expanding; a six-month history informs selection but does not substitute for a control group.

## Work completed on branch

- `scripts/geo-query-planner.mjs`: local, no-network CSV/JSON ingestion and auditable opportunity queue for six-month exports.
- `data/geo-bing-theme-evidence-20260928.json`: historical Bing AI summary themes with dates/qualifications and conservative code mapping.
- This research design: protects the primary growth objective, gives measurable acceptance criteria, and does not change public page markup.

The actual six-month export cannot be assumed available just because a past report refers to it. Until it is supplied or accessed through a working connector, the pilot must be marked **HISTORICAL SAMPLE**, not completed or rolled out.
