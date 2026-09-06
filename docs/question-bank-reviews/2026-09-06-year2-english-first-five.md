# Year 2 English: AC9E2LA01–AC9E2LA05

Status: rebuilt and locally validated; not deployed. Each code has 24 practice and 16 test items, including two adult-review tasks in each bank. Total: 200 questions, 180 multiple-choice and 20 open/practical tasks. The previous 40-practice banks were substantively replaced, not shortened by stripping repeated prompt suffixes.

## Authority and scope

The [QCAA alignment document reproducing Australian Curriculum v9 Year 2 English](https://www.qcaa.qld.edu.au/downloads/aciqv9/english/curriculum/ac9_english_yr2_as_cd_alignment.pdf) was read for the five descriptors. IXL is a teaching benchmark, not a substitute for the descriptor. The [IXL Year 2 plan](https://au.ixl.com/english/skill-plans/australian-curriculum-version-90-year-2) was checked directly in the browser.

| Code | Assessed components | Bank implementation | IXL comparison limit |
|---|---|---|---|
| AC9E2LA01 | Language choices vary with context and interaction roles | Requests, clarification, greetings, hosting, leading, participating, disagreement, audience familiarity, tone, setting and role-play | No direct skill listed under this code in IXL's Year 2 plan; do not claim direct example equivalence |
| AC9E2LA02 | Language expressing appreciation and reasons for preferences | Original short passages, language effects, precise response vocabulary, supported likes/dislikes, contrasting preferences and personal response | Three mapped vocabulary skills are supporting evidence; full text appreciation requires additional original tasks |
| AC9E2LA03 | Different organisation and language features across curriculum purposes | Procedures, reports, narrative, recount, persuasion, poetry, invitations, letters, maths explanations and science reports | IXL's mapped comparison task covers one organising pattern, not all purposes |
| AC9E2LA04 | Cohesion using personal/possessive reference and inferable omission | Reference chains, ownership, agreement, ambiguity repair, omitted nouns/actions, short replies and reconstruction | Two mapped pronoun skills; ellipsis supplied from the official descriptor |
| AC9E2LA05 | Navigation using chapters, contents, indexes, side-bars, drop-downs and links | Concrete entries, page ranges, category routes, destination checks and demonstrated print/screen navigation | No direct skill listed under this code in IXL's Year 2 plan |

## Worked-example evidence

All six distinct mapped skills below were opened. Their question, key idea and solution were read. Current practice questions were also inspected where visible. This is representative evidence, not a review of every adaptive level.

| Skill | Observed teaching/task design | Decision for SkillrHub |
|---|---|---|
| [Find the words with related meanings](https://au.ixl.com/ela/year-2/find-the-words-with-related-meanings) | Select related vocabulary; explain semantic similarities and distinctions | Use precise appreciation words in an actual reader-response context |
| [Describe the difference between related words](https://au.ixl.com/ela/year-2/describe-the-difference-between-related-words) | Short two-choice semantic decisions with explicit reasoning | Distinguish intensity and nature of a response without excessive reading |
| [Order related words based on meaning](https://au.ixl.com/ela/year-2/order-related-words-based-on-meaning) | Arrange vocabulary along a labelled dimension | Include mild/strong response distinctions; avoid treating vocabulary ordering alone as text appreciation |
| [Compare and contrast in informational passages](https://au.ixl.com/ela/year-2/compare-and-contrast-in-informational-passages) | Read a passage, sort shared/distinct properties and attend to comparison signals | Include original comparisons and signal-language questions, alongside other text structures |
| [Identify personal pronouns](https://au.ixl.com/ela/year-2/identify-personal-pronouns) | Select a pronoun in a sentence; singular/plural and noun replacement explained | Extend identification into meaningful reference across connected sentences |
| [Identify possessive pronouns](https://au.ixl.com/ela/year-2/identify-possessive-pronouns) | Select an ownership word; explain the possessor it replaces | Include ownership reference, standalone possessives and clarity in context; avoid terminology disputes over determiners |

Additional access checks: Analytics → Questions initially opened the account's skill-selection screen. A later specific report attempt opened a promotional page; the subsequent plan showed a Sign in link. No historical attempts were reviewed or copied. A hover attempt on the comparison skill produced no additional question text in the inspected page state. No extra evidence is claimed from it.

## Editorial and technical review

Each authored row was checked for its target component, correct response, distractors, explanation, readable language and meaningful task differences. Individual item records are in each code's QA log. Text preferences allow supported disagreement. Open responses use explicit acceptance criteria; accent and incidental spelling are not substituted for the target skill. Navigation tasks require demonstration on a real or prepared interface, not merely naming a feature.

All source questions are text-only and original. IXL passages and question banks are not reproduced. Codes and retained ID ranges remain stable: P-001–P-024 and T-001–T-016. Surplus old P-025–P-040 are retired rather than retained as repeated filler.

Passed checks:

- Five production-bank validators: required data, IDs, answers, balance, duplicate checks and minimum counts.
- All 200 CSV rows match the JSON question, ID, correct answer/model and explanation.
- All ten practice/test banks match rebuilt source data; actual multiple-choice answer positions are balanced.
- Attempt counts match bank counts; stale 40-practice and 12-test descriptions corrected in scoped activity/start pages.
- Local links/dependencies, versioned result keys and adult-review support wiring checked.
- Adult response evaluation remains pending/unmarked until reviewed; pending work cannot produce a passing result.

The local rebuild has not received a live browser smoke test or deployment verification. No whole-year verified badge or release ledger entry is added in this change. Topic guides and slides are outside this bank-only rebuild and their links are preserved.

## Reproduction

Authoring source: `scripts/year2_english_first5_review.py`.
CSV export: `scripts/export_year2_english_first5_review.mjs` (run with the primary artifact-tool runtime; uses the five existing QA-log titles).
Local rebuild: `node scripts/rebuild_year2_english_first5_review.mjs`.
Integration checks: `node scripts/validate_year2_english_first5_review.mjs`.

Before a future release, use the review-aware publisher and record these five reviewed codes, include the generated ledger changes, and perform the live check. The other 22 English codes remain outside this batch.
