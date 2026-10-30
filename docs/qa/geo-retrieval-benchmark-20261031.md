# SkillrHub: answer-retrieval baseline — 31 October 2026

**Purpose:** Learn which sources are surfaced for representative Australian parent/teacher education questions, and make evidence-led improvements to SkillrHub's public pages and `llms.txt`.

**Crucial limitation:** This is a **public web-search retrieval proxy**, not an instrumented consumer ChatGPT Search session, official ChatGPT ranking, Copilot ranking, or AI citation audit. Search tool results can be affected by query batching, location, index freshness, and provider coverage. The "first surfaced" note is the first returned item in *that specific single-query run*, not a stable ordinal search rank. We did not direct the search engines to cite SkillrHub. Queries collected from Bing are grouped grounding phrases, not the original prompts used by customers. No AI-generated answer citing these pages was directly observed.

## Neutral prompt sample

| ID | Natural search question | Run type | Sources observed in public retrieval | SkillrHub surfaced directly? | Follow-up |
|---|---|---|---|---|---|
| P01 | Where can I find free Australian Curriculum Year 1 Science worksheets and simple investigations? | Single | Aussie Primary Academy first, Kuraplan, Noooli, Twinkl | Not in inspected returned set | Strengthen existing Year 1 Science answer hub and code links; do not invent worksheet counts |
| P02 | Where can I get Year 6 English lessons and worksheets on formal language and objective versus subjective statements? | Single | WA curriculum guidance/IXL references, Twinkl, Noooli | Not in inspected returned set | Provide original mini-lesson examples and specific code paths |
| P03 | What is an alternative to IXL for Year 1 Australian Curriculum Maths? | Single | IXL's Year 1 alignment page first, education resource catalogues, Australian practice alternatives | Not in inspected returned set | Keep independent, accurate IXL comparison + direct Year 1 V9 route |
| P04 | Free Australian Curriculum Year 8 Science lessons and worksheets for home learning | Single | South Australian Education home-learning guidance first, Kuraplan, HEA directory | Not directly in inspected returned set (HEA does list SkillrHub) | Explain original available Year 8 topics, and keep an independent source trail |
| P05 | Year 2 multiplication equal groups worksheets Australian Curriculum | Batched | Teach Starter equal-group resources, **SkillrHub existing AC9M2N05 practical article** | **Yes, article retrieved** | Link Year 2 hub to discovered original detailed resource; do not create another competing page |
| P06 | Year 4 maths questions about odd/even, fractions and perimeter | Batched | ACARA work sample, Kuraplan Year 4 worksheets | Not in inspected returned set | Preserve newly authored worked answers on Year 4 canonical hub |
| P07 | Year 1 maths addition and patterns free practice Australian Curriculum | Batched | IXL curriculum skills, HEA directory and other primary curriculum resources | Not directly in inspected returned set | Strengthen existing curriculum answer path rather than add keywords |
| P08 | Australian Curriculum homeschooling resources and alternatives to paid sites | Batched | HEA free-resource directory, NSW government home-schooling resources | Not directly in inspected returned set (HEA listing contains SkillrHub) | Maintain verified HEA listing as evidence of independent discoverability, not endorsement |
| P09 | Year 3 time duration minutes and seconds worksheets | Batched | Teach Starter, Noooli, 3P Learning and official curriculum | Not in inspected returned set | Add original Year 3 duration explanation to answer-first discovery guide |
| P10 | Teaching Year 5 percentages with hundred grids | Batched | Mathematics Hub official planning resource | Not in inspected returned set | Point to original Year 5 percentage grid and note which concept it teaches |

**Representative source URLs captured in the research search tool:**
- P01: https://aussieprimaryacademy.github.io/aussie-primary-academy/science.html ; https://www.kuraplan.com/au/worksheets/subject/science/year/1
- P02: https://www.twinkl.com.au/resources/australian-resources-australian-curriculum-browser-english-year-6/australian-resources-australian-curriculum-browser-english-year-6-language/australian-resources-australian-curriculum-browser-english-year-6-language-language-for-interaction ; https://noooli.com/worksheets/english/year-6
- P03: https://au.ixl.com/standards/maths/year-1
- P04: https://www.education.sa.gov.au/our-learning-sa/at-home-learning/secondary/year-8?meta_learningArea=Science&meta_series=2 ; https://www.kuraplan.com/au/worksheets/subject/science/year/8
- P05: https://www.teachstarter.com/au/teaching-resource/modelling-equal-groups-in-multiplication-worksheets/ ; https://skillrhub.com/year2/maths/year-2-multiplication-division-arrays-and-equal-groups-activities-and-worksheets-ac9m2n05.html
- P06: https://www.australiancurriculum.edu.au/resources/work-samples/mathematics/year-4/ws01-odd-and-even ; https://www.kuraplan.com/au/worksheets/subject/maths/year/4
- P08: https://www.hea.edu.au/free
- P09: https://www.teachstarter.com/au/teaching-resource/how-long-does-it-take-worksheet-2/ ; https://noooli.com/worksheets/maths/year-3/time
- P10: https://www.mathematicshub.edu.au/planning-tool/5/number/fractions-decimals-and-percentages/

## What this demonstrates, and what it does not

1. The competitor pages commonly present an exact year, topic, resource format, model, free/paid status and accessible teaching detail in one place. That is **an observed user value pattern**, not evidence of a secret ranking signal. Good examples are Noooli's topic-specific free sheets and Teach Starter's exact AC9M2N05 page.
2. The already-discovered SkillrHub Year 2 multiplication guide is a valuable **existing citation candidate**. Connect its explanation to the Year 2 hub rather than creating a near-duplicate "GEO" page.
3. Several public search fetches returned stale SkillrHub content from approximately two months earlier. That does **not** prove current production is stale. Search provider caches and actual crawl dates need separate verification. Verify the current `main` and GitHub Pages release and use Bing Webmaster URL Inspection or a new recrawl to confirm freshness.
4. No directly observed ChatGPT answer, citation, model context or ChatGPT search position was available to measure. Never report "0/10 ChatGPT citation rate" or "SkillrHub ranks last". The sample is only a **public retrieval gap audit**.
5. Bing Webmaster's Topics Portfolio beta (13 October 2026) identifies topic groups, your cited grounding queries and **Opportunity Queries** where other sites appear but yours does not. This is a stronger first-party source of prioritisation than speculating about ChatGPT's undisclosed ranking: https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/

## Decisions taken from the sample

- Promote answer-first, canonical existing topics to the beginning of `llms.txt`; preserve the rest of the file and truthful free/paid/guest access distinctions.
- Add a descriptive link from `/year2/maths/` to the already-retrieved Year 2 equal-groups article, helping the user reach the most detailed original example.
- Add exact topic links for the existing AC9M3M03 Year 3 time and AC9M5N04 Year 5 percentages lesson guides. Do not create new SEO pages.
- Keep Year 1 Maths/Science, Year 4 Maths, Year 6 English and Year 8 Science six-hub content unchanged during this specific iteration, because it was only published on 31 October and needs post-crawl observation before more rewriting.
- Do not infer commercial conversions or AI ranking improvements from this code release.

## Repeatable follow-up experiment

**For Bing/Copilot:** from Bing Webmaster Tools → AI Performance → Topics (Beta), export (or screenshot and transcribe) the *actual* Your Grounding Queries, Opportunity Queries and **cited URL** rows for Year 8 Science, Year 1 Maths, Year 2 multiplication and primary English. Keep 28-day date and URL scopes consistent. Use controlled before/after comparisons after Bing recrawls and include exact clicks.

**For ChatGPT Search:** submit this same fixed P01–P10 set in ChatGPT Search sessions with search enabled and *without mentioning SkillrHub*. Record date/time, query, region context, whether SkillrHub appears as a linked **citation** and the cited canonical URL. Repeat runs at separated dates; do not claim a single universal ranking. A user-hosted Work cloud browser session may execute such browser-based tests when available. This report does **not** pretend to have executed that consumer-UI test.

**For acquisition:** the current GA4 tag can attribute ChatGPT-origin sessions through `utm_source=chatgpt.com` where tracking works; it cannot reveal a user's ChatGPT prompt. Compare engaged visitors, topical landing pages, worksheet/practice starts and commercially meaningful actions, not citation volume alone.

## Quality controls

No scraping of paywalled content, copying competitor teaching expression, private learner data publication, fabricated reviews, keyword stuffing, new near-duplicate landing pages, hidden claims or brand endorsements. Existing learning content, canonical links, student navigation and code availability are preserved.

