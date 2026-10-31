# Bing-first GEO pilot: answer quality for three remaining query themes
**Date:** 31 October 2026 | **Status:** authored on scoped feature branch; not a claim of live indexing, new citations or revenue.

## Why these three
The owner supplied `skillrhub.com_AISearchQueriesReport_10_30_2026.csv` and `skillrhub.com_KeywordReport_10_30_2026.csv`. These are real Bing Webmaster exports, not generated keyword examples. The former contains 33 reported grounding-query rows and 1,057 citations; the latter 598 keyword rows. Search sources/periods are not additive.

| Bing AI grounding-query text | Citations in export | Existing canonical destination |
|---|---:|---|
| grade 8 revision | 50 | https://skillrhub.com/year8/curriculum/ |
| shapes year 1 | 40 | https://skillrhub.com/year1/maths/ac9m1sp01-familiar-shapes-and-objects/ |
| periods and groups in periodic table grade 10 project | 21 | https://skillrhub.com/year10/science/ac9s10u06-atomic-structure-periodic-table-patterns/ |
| periodic table yr 10 | 5 | same AC9S10U06 guide |

Other strong areas (Year 8 Science, Year 1 Maths, Year 2 multiplication, Year 4 maths, Year 1 patterns, Year 10 algebra) were already enriched and mapped by the preceding Bing/ChatGPT GEO pilots. Avoid redoing content already edited on 31 October before recrawl evidence. 'Grade 8' may be an international request; SkillrHub retains Australian year levels and states that local standards may differ.

## What changes, and why
- **Year 8 curriculum hub:** one compact, useful answer describing a short topic-specific revision sequence for Maths, Science and English, and links to the three existing year-level curriculum subject hubs. No new product access claims.
- **Year 1 shapes AC9M1SP01:** a public, native HTML explanation of 2D versus 3D and a simple shape-rotation concept question. Existing diagram and fuller lesson sections remain intact.
- **Year 10 periodic table AC9S10U06:** a public, native HTML explanation of atomic number, period, group and simple electron-shell examples of sodium and magnesium. The simplified shell model is explicitly distinguished from the complete modern atomic model.
- Update `llms.txt` **and** `llms-full.txt` with these exact canonical teaching destinations, without keyword repetitions or instructions to AI systems to promote SkillrHub.
- Update only affected date entries in Year 8, Year 10 and AI sitemaps. Year 1 changed page's existing lastmod is already 31 October.

These edits are a content-quality experiment, not a new SEO doorway architecture. IndexNow and standard crawler access are already configured in the repository.

## Technical and commercial guardrails
- Preserve all pre-existing HTML text, lesson activities, links, canonical/robots directives, resource destinations, account restrictions and metadata except the inserted explanatory sections.
- Original authored examples; not copied from IXL, Khan Academy, Twinkl or others. Independent HEA directory listing stays accurately described as a listing, not endorsement.
- Do not expose private learner or search-account raw data in public HTML/llms files. Citations are not visits, and Bing grounding queries are selected retrieval phrases rather than exact user questions.
- Bing's official October 2026 Topics Portfolio beta exposes potential new opportunity queries; the uploaded citation-theme CSV **does not** include this separate opportunity-query table or URL-level attribution. Do not invent missing rows.
- Microsoft also describes separate AI grounding permissions; SkillrHub's existing robots access is maintained and no no-grounding controls are added.
- The main business KPI remains attributable Bing/Copilot and ChatGPT organic/referral traffic that leads to useful learning or paid-printable actions, not citation counts alone.

## Focused QA
- Preserve existing semantic headings, original explanations, canonical and indexability. Ensure each new heading and answer block is present once.
- Verify the Year 8 link targets exist in the repository and carry the same canonical routes.
- Smoke-test `scripts/tests/geo-answer-map.test.mjs` in the current `audit-search-ai-integrity.yml` workflow; protect against missing public answer blocks.
- Use the existing search/AI and release-integrity workflows; a failing unrelated legacy topic or slide validator does **not** become a pass or justify weakening tests.
- Compare branch to current `main` immediately before release; no file deletions, no replacement of entire site or new learning-runtime changes.
- After deployment, request no artificial indexing guarantees; review Bing AI citations and URL-level cited pages over matched windows and analyse real ChatGPT referral landings in GA4 where accessible.

## External guidance
- Bing AI Performance documentation: https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/
- Bing Topics Portfolio: https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/
- OpenAI publisher crawler/referrals: https://help.openai.com/en/articles/12627856
