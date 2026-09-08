# Year 4 Maths: second-five checkpoint

Current publication direction, 8 September 2026: the owner subsequently requested, “First comit old codes to main”, after the outstanding source checks had been disclosed. The release now carries the independently checked mathematical content while retaining the source-audit HOLD. No next-five code is marked fully reviewed in the verification ledger, and no source inspection is claimed. See `SECOND-FIVE-PUBLICATION.md` for this publication decision and its limits.

Original draft checkpoint status: HOLD — actual IXL worked-example/question comparison and supplementary Khan lesson inspection remain incomplete. The draft checkpoint did not constitute approval for the review ledger.

The owner requested AC9M4N06–N09 and AC9M4A01 next, with the same whole-resource standard as the first five. The shared research log was retrieved before research. Exact official ACARA descriptors and all 22 elaborations were checked against the directly linked primary machine-readable release; see `SECOND-FIVE-ACARA-VERIFICATION.md`.

| Code | Scope | Practice | Test | Distinct assessment SVGs | Author / independent reviewer |
| --- | --- | ---: | ---: | ---: | --- |
| AC9M4N06 | Efficient four-operation strategies and appropriate digital tools | 48 | 16 | 11 | author_number / reviewer_number |
| AC9M4N07 | Estimation, rounding and reasonableness, including finance | 48 | 16 | 9 | author_number / reviewer_number |
| AC9M4N08 | Practical mathematical modelling, including financial contexts | 48 | 16 | 11 | author_fractions / reviewer_fractions |
| AC9M4N09 | Create and follow algorithms with decisions; explain patterns | 48 | 16 | 10 | author_fractions / reviewer_fractions |
| AC9M4A01 | Unknown values in addition and subtraction equations | 48 | 16 | 8 | author_placevalue / reviewer_placevalue |

All 320 bank items have received independent mathematical review of every choice, key, explanation, hint and visual, followed by correction rechecks. This content check does not satisfy the outstanding source-comparison gate. Per-code reports record the frozen source hashes, coverage, concrete corrections and artifact identities. N08/N09 each include eight genuinely constructed tasks using the existing adult-review flow. Each code also has strengthened static Topic and Classroom teaching, complete worked examples and eight separately authored written homework tasks.

The production publisher was run locally without `--reviewed` to create a concrete integration checkpoint. No next-five code was recorded in `data/content-verification-status.json`. The first five remain the only reviewed Year 4 Maths codes, out of 23. The Year 4 badge stays off; the completed Year 3 English badge and generated About, Editorial Standards and AI/LLM verification content are preserved. The verification generator's `--check` reports CURRENT.

`SECOND-FIVE-RUNTIME-QA.json` records 14 passing offline DOM integration cases using the actual repository runtime and authored question data: model MCQs in both modes for all five codes, plus N08/N09 paper completion, pending adult review, marking and score/result updates in both modes. These checks also retain authored preparation and attach the correct SVG to a saved answer. They do not claim live browser success. The separately reviewed saved-model adapter extends only the existing code allow-list; identity, version, question, explanation, answer and SVG-path guards remain intact.

The exact PDF exports use the production renderer and repository fonts. Independent page inspection identified an N09 task that depended on another task despite shuffled ordering, prompt/rubric mismatches, a split grouped number and orphaned writing rows. The tasks now state their own premises and requested evidence. Larger diagram tasks explicitly request separate paper. A narrowly guarded v18.1 pagination correction reserves the complete four-line writing block with the next-five dedicated self-check prompts. Other question types and curriculum codes retain their previous layout allowance. Final PDF verdicts and hashes are recorded in each independent report.

All 21 final v18.1 PDF pages passed independent visual and mathematical review: four pages each for N06, N07, N08 and A01, and five for N09. Each answer guide matches its actual shuffled question order. Prompt and response blocks remain together, larger diagrams have explicit separate-paper instructions, and no clipped text, orphaned writing line, incorrect glyph or missing/mismatched answer was found. This is approval of the actual exported documents; browser download controls still require a live check.

Local static-topic, learning-order, route-integrity, static-site and saved-model checks pass. These validate integration and do not establish substantive content quality. `validate_year4_maths_second_five.mjs` deliberately still requires independent PASS and all ten ledger entries; it is not run or weakened to certify this HOLD checkpoint.

## Source access and remaining work

The per-code AUTHOR reports list verified relevant IXL skill URLs and Khan candidates. Catalogue matches, search snippets and hidden preloaded IXL example text are not recorded as inspected lessons. Public web access currently returns the IXL page shell and empty Khan lesson bodies. The browser has repeatedly failed to inspect visible page content, including on SkillrHub, through connection timeouts. A metadata lookup confirmed the current IXL tab URL as `https://au.ixl.com/maths/year-4/properties-of-addition`, but its screenshot failed. No sign-out or sign-in requirement has been observed.

Before full review approval, reopen actual relevant IXL skills, visibly open their help/example panels, inspect representative questions and any observed progression, and compare the resulting evidence with the authored content. Read relevant primary Khan lessons as supplementary evidence within the ACARA year boundary. Revise any affected content, obtain independent re-review and update exact artifact hashes. Only then run the publisher with `--reviewed` and generate/check verification content. The owner's intervening request prioritises committing the mathematically reviewed content to main; it does not establish completion of these source checks. Every publication still uses the latest complete main tree, zero unexpected deletions and a non-forced update, followed by Actions, Pages and live verification. Source-audit and outstanding live-browser checks remain HOLD.

The first-five preparation correction is already live at `bb9e0e56b9d1c194abf33c2e43f0b2b9e679439b`; all nine workflows and Pages passed, and all changed public assets matched the complete candidate bytes. Its remaining live interactive browser gate and the unrelated topic-video preservation are documented in `FIRST-FIVE-RELEASE.md`.

## Latest-main integration

This checkpoint was integrated on the complete main commit `bb9e0e56b9d1c194abf33c2e43f0b2b9e679439b`, tree `ac63c03f265c07b32390b4d551f56b7ac9c69bf1`. All unrelated main changes are retained. For each of the five Topic pages, the intervening main difference was verified to consist exactly of its optional video block and stylesheet link. Those exact bytes were preserved alongside the independently reviewed authored content. One N06 text merge conflict was resolved using this verified additive construction; the other four automatic merges matched that construction exactly.

`SECOND-FIVE-TOPIC-INTEGRATION.json` records the authored-page hash, complete integrated-page hash and unchanged video-block hash for all five routes. Removing only those two preserved additions reproduces the corresponding independently reviewed authored page byte-for-byte. This records preservation and content identity; it does not claim new source/playback approval of the unrelated video supplements. The overall source and live gates remain HOLD.
