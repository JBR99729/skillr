# AC9M4N05 author research and review

Date: 8 September 2026. Scope: this code only, in the first-five Year 4 Maths release. Base supplied by root: latest fetched `origin/main`, `f79990bbe92c926e99d1cd01e83ce79a67e23e3b`. Publication, release-tree verification and review-ledger recording belong to root and are not asserted by this report.

## Research log and official descriptor

The required `/workspace/scratch/b2c91567ebe4/research/svgSkillrHub-IXL-Research-Log.md` was retrieved before drafting. Its current top section is **ACTIVE QUEUE — Year 3 English from the sixth code**; the later Science START HERE section is archived, not the active queue. Both sections have been read. Neither supplies verified Year 4 Maths N05 evidence. The current user’s first-five Year 4 Maths instruction supersedes those older queues. No Year 3 observation is represented here as N05 evidence.

The exact N05 code and descriptor were checked against the official [QCAA Year 4 comparison of Australian Curriculum v8.4 and v9.0, page 1](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_yr4_comp.pdf). The official text requires natural-number multiplication **and** division, **multiples and powers** of ten, no calculator, and multiplicative relationships among digit place values. The topic page retains the exact descriptor. It is a QCAA reproduction of ACARA content, not a claim that a current ACARA DOCX was directly downloaded.

The [QCAA Year 4 standard elaborations](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/assessment/ac9_maths_se_yr4.pdf) also identify multiplication of natural numbers by multiples of ten with place-value understanding in the achievement standard. This does not remove the division requirement from the descriptor.

Repository elaboration wording in `data/curriculum-units.json` was read. Its materials, place-value-chart/slider and pattern-generalisation components are mapped to authored teaching below. These are not being presented as a newly retrieved direct ACARA elaboration-file read.

Boundary: no decimal operands, negative numbers, calculator-dependent tasks, remainder calculations or formal exponent notation. Place-value scaling is used with exact whole-number answers. Simple two-step regrouping and comparison contexts require the same arithmetic, not later-year formalism.

## Direct IXL observations

[IXL's Australian Year 4 alignment page](https://au.ixl.com/standards/maths/year-4) lists eight relevant N05 skills. Each actual skill page below was opened and the stated real practice tasks were inspected. A later provenance check found that initial DOM snapshots included preloaded hidden worked examples after mouse-click timeouts. Those initial examples are not counted as visibly opened help. On 8 September the author re-opened **all eight** Learn panels with Space, confirmed Back to practice controls, read the actual expanded explanations, and inspected a rendered screenshot for each. The worked-example column below now records only this verified visible revalidation; practice counts remain the independently confirmed earlier observations. The browser showed **Parent results not recorded** throughout. No credential was requested or handled.

The browser connection intermittently returned CDP or selector timeouts even when an interaction later took effect. Every claimed accepted response was confirmed from the subsequent visible question and statistics. A timeout alone was never counted as acceptance. Research was serialised with the other agents after shared-browser contention.

| Actual IXL skill | Worked explanation actually read | Actual practice and progression actually observed | Authoring consequence |
| --- | --- | --- | --- |
| [H.1 Multiplication patterns over increasing place values](https://au.ixl.com/maths/year-4/multiplication-patterns-over-increasing-place-values) | Visible example: 6 × 3, 30, 300 and 3000 gives 18, 180, 1800 and 18000. Explanation explicitly names 3 ones/tens/hundreds/thousands and 18 of the same unit. Screenshot inspected. | One four-row missing-factor task, with products from 24 through 24000 and fixed factor 8. No response submitted. | Include scaling relationships, unknown factors and repeated factors of ten, not just numerical products. |
| [H.2 Multiply by a multiple of ten using place value](https://au.ixl.com/maths/year-4/multiply-by-a-multiple-of-ten-using-place-value) | Visible 30 × 4 chain: 30 is 3 tens, 3 tens × 4 is 12 tens, then 120. Every stage and final numeral inspected in the expanded-panel screenshot. | Two accepted tasks: final numeral in a 50-by-8 chain, then in a 20-by-7 chain. Confirmed 2 questions / SmartScore 26. The third visible task, 7-by-40, removes both the intermediate number of tens and the final numeral. It was not submitted. | Provide tens/hundreds/thousands units and progressively remove supports. One standard-form answer alone is weaker evidence than a completed or explained chain. |
| [H.3 Multiply by a multiple of ten](https://au.ixl.com/maths/year-4/multiply-by-a-multiple-of-ten) | Visible 3 × 40 solution uses 3 × 4 = 12 and restores the end zero to obtain 120. Expanded-panel screenshot inspected. | One visible symbolic task, 2-by-30; no response submitted. | Retain fluency questions but explain the factor of ten rather than teaching an unexplained zero rule. |
| [I.1 Multiply numbers ending in zeros](https://au.ixl.com/maths/year-4/multiply-numbers-ending-in-zeros) | Visible vertical 70 × 8 solution uses 7 × 8 = 56 and restores the end zero to obtain 560. Expanded-panel screenshot inspected. The earlier hidden hundreds example is not claimed as visible help. | One vertical 80-by-2 item answered correctly; confirmed 1 question / SmartScore 10. The next horizontal task, 50-by-5, was visible and unsubmitted. | Cover both arrangements, multiples of hundreds and multiple factors containing tens. The observed early tasks do not prove later adaptive difficulty. |
| [I.9 Multiply numbers ending in zeros: word problems](https://au.ixl.com/maths/year-4/multiply-numbers-ending-in-zeros-word-problems) | Visible seating context uses 30 rows of 20, solves the 3-by-2 fact and restores both end zeros to obtain 600 seats. Expanded-panel screenshot inspected. The earlier hidden 2-by-7000 example is not claimed as visible help. | A 50-groups-of-30 context was answered correctly; confirmed 1 question / SmartScore 10. The next visible money context uses 3 equal donations of 8000; unsubmitted. | Include genuine equal-group contexts with both factors containing tens, plus multiples of thousands and interpretation of units. |
| [K.1 Division patterns over increasing place values](https://au.ixl.com/maths/year-4/division-patterns-over-increasing-place-values) | Visible missing-divisor pattern: 3, 30, 300 and 3000 divided by 3 give 1, 10, 100 and 1000. Explanation names ones/tens/hundreds/thousands. Expanded-panel screenshot inspected. | One four-row task divides 9, 90, 900 and 9000 by 9; no response submitted. | Teach quotient scaling and explicitly name units. This observation is division of multiples, not division **by** a multiple of ten. |
| [K.2 Divide numbers ending in zeros by one-digit numbers](https://au.ixl.com/maths/year-4/divide-numbers-ending-in-zeros-by-one-digit-numbers) | Visible long-division example 20 ÷ 1 uses 2 ÷ 1 and restores one end zero. Expanded-panel screenshot inspected. This particular revalidation is a simple identity-divisor example; the earlier hidden 40000 ÷ 8 explanation is not claimed as visible help. | One visible horizontal 1600-divided-by-2 task; no response submitted. | Explain why the answer retains a particular place value; formal long division is unnecessary for this bank's mental-calculation target. |
| [L.1 Divide numbers ending in zeros: word problems](https://au.ixl.com/maths/year-4/divide-numbers-ending-in-zeros-word-problems) | Visible grouping context: 420 balloons in bundles of 7. Explanation uses 42 ÷ 7 = 6, then 42 tens ÷ 7 = 6 tens = 60 bundles. Expanded-panel screenshot inspected, including the distinction between bundle size and number of bundles. | One visible card-sharing task with total 150 and 5 groups; no response submitted. | Keep group-count versus group-size meanings explicit and state equal grouping when needed. |

**Evidence limits:** these are observed worked examples, initial real tasks and the limited accepted progression stated above. No IXL skill was sampled to mastery or to its final adaptive stage. No direct observed Year 4 IXL question here divides by 30, 300 or 7000; the alignment page's division links used one-digit divisors in this sample. Division **by** multiples and powers of ten is therefore deliberately supplied as **ACARA-led original content**, supported by common place-value units and inverse multiplication checks. It is not falsely attributed to an unseen IXL question. Two-step transfer, explanation choice and error-analysis formats in SkillrHub are also original authoring decisions.

No IXL prompt or explanation is copied into the bank. The small arithmetic descriptions above record evidence only. IXL's end-zero shortcut is accompanied in SkillrHub by unit reasoning; it is not adopted as a general rule without explanation.

## Khan Academy supplement

The independent reviewer subsequently read the complete rendered primary Khan transcripts of [Place value when multiplying and dividing by 10](https://www.khanacademy.org/math/cc-fourth-grade-math/imp-place-value-and-rounding-2/imp-how-10-relates-to-place-value/v/place-value-when-multiplying-and-dividing-by-10) and [Dividing whole numbers by 10](https://www.khanacademy.org/math/cc-fourth-grade-math/imp-place-value-and-rounding-2/imp-how-10-relates-to-place-value/v/dividing-whole-numbers-by-10). The reviewer reports that the first connects a tenfold change to named place-value units; the second links grouping in tens to digit-value changes in larger totals. These are independent transcript observations, not this author claiming video playback or submitted Khan exercises. They support the bank’s place-value reasoning and do not establish division-by-multiples coverage. The precise examples and observation limits are recorded in the independent report. End-zero shortcuts are treated as consequences within the specified whole-number cases, not universal rules.

## Coverage map

| Assessable component | Practice evidence | Test evidence | Teaching and written evidence |
| --- | --- | --- | --- |
| Multiply by 10, 100, 1000; preserve internal and existing zeros | P001–P012 | T001, T007, T015 | Worked example 1 has a real chart for 406, 4060 and 40600; worksheet W001 requires drawing and explaining a chart. |
| Divide exactly by powers of ten; inverse and scaling relationships | P013–P024 | T002, T003, T009 | Worked example 2 explains hundreds as groups and inverse checks; W002 explains thousands. |
| Multiply by multiples of ten, hundred and thousand | P025–P036, P048 | T004, T005, T010, T011, T013, T016 | Worked example 3 includes tens, hundreds, two factors with tens and thousands; W003, W005 and W007. |
| Divide by multiples, using the same unit for dividend and divisor | P037–P048 | T006, T008, T010, T012–T014, T016 | Worked example 4 includes common tens, hundreds and thousands units; W004, W006 and W008. |
| Solve real problems and interpret total, group size and group count | P005, P008, P019–P020, P031–P032, P035–P036, P043, P047–P048 | T007–T008, T013–T015 | Worked example 5 solves a two-stage packing problem. Worksheet contexts require written working and units. |
| Explain multiplicative digit-value relationships and diagnose errors | P003, P006–P012, P016–P018, P022–P025, P033–P034, P044–P046 | T003, T009, T011–T012, T015–T016 | Key vocabulary, chart, precise worked answers, misconceptions, assessment questions and exit-ticket guidance. |
| Use materials, charts and pattern generalisation before unsupported mental work | P003, P016, P024–P025, P032, P043 | T007 and reasoning items | Materials regrouping activity; static chart/slider activity; teacher-led optional pattern exploration, followed by no-calculator questions. |

## Substantive author review and independent corrections

All 48 Practice and 16 Test stems, four choices, correct keys, explanations, hints and six visuals were reviewed for mathematical meaning and year-level fit. Numerical answers were computed from the stated quantities; inverse checks and unit relationships were examined separately. Distractors target missing powers of ten, adding instead of multiplying, internal-zero loss, wrong units and scaling only one number in a division. Correct-option balance is 12/12/12/12 in Practice and 4/4/4/4 in Test.

Independent reviewer findings corrected before handoff:

- P013: clarified that 840 contains 84 groups of ten, avoiding ambiguous grouping of tens.
- P018: a **digit's value** changes; the digit itself does not shrink.
- P042: removed a hint that gave the answer directly.
- T009: separated the two possible starting calculations clearly.
- T011: corrected a dimensionally misleading equality between a bare number and hundreds.
- T008: identified the money as ticket-sale receipts.
- Topic/Classroom and worksheet W005/W007: repaired bare-number-to-hundreds equalities while retaining correct results and explanations.
- Defined powers of ten precisely and distinguished them from other multiples.
- W001 uses the existing supported self-check worksheet type to provide more chart-writing space in the PDF.

After inspecting actual IXL I.9 practice involving multiples of thousands, P031 was strengthened to multiplication by a multiple of 1000 and P041 to division by a multiple of 1000. The corresponding tens/hundreds/thousands transfer is explicitly taught in both canonical Topic Guide and its copied Classroom View. The independent reviewer re-solved both replacement items, checked every choice/explanation/hint and verified both added paragraphs; all passed at the handoff hash recorded below.

The worksheet has eight independently authored written tasks and a dedicated `worksheet-questions.js`, using the renderer's existing `skillrWorksheetQuestions` interface. It is no longer a random reuse of the Practice bank. Root must confirm the generated PDF and local/live interaction before release.

## Visual review

Six new SVGs use a 640 × 300 symbol contract and descriptive alt text. All were rendered with CairoSVG and inspected at native size by the author and the independent reviewer. Existing unrelated/old SVG assets were preserved.

| Asset | Mathematical relationship and visual review |
| --- | --- |
| `p003-chart.svg` | Columns and digits show 406 correctly before ×10; no target answer supplied. |
| `p016-chart.svg` | Columns and digits show 5800 correctly before ÷100. |
| `p024-pattern.svg` | The same total is divided by 10, 100 and 1000; the final quotient is missing. |
| `p032-bar.svg` | Seven equal sections, each 40 cm; count, labels and total bracket agree. |
| `p043-ribbon.svg` | Whole 960 cm and sample 30 cm labelled separately; explicit not-to-the-same-scale note avoids a false geometric ratio. |
| `t007-print.svg` | Directional arrow relates 320 cards to a special run by ×100, with target unknown. |

No overlap, clipping, wrong digit/column position, broken glyph or answer-only visual was found. The diagram that requires equal lengths uses seven equal widths. The ribbon is a labelled quantity model, not a to-scale measurement exercise.

## Scoped preservation and remaining release gates

Changed only N05 bank/assets, its Topic Guide, existing Classroom View content, and worksheet route/bank. Preserved canonical URL, CSS shell, resource links and free/no-login flow. No shared renderer, ledger, global metadata, publisher or Git ref was changed by this author. Zero files were deleted.

`node scripts/validate_production_question_bank.mjs assets/assessment-banks/year4/math/ac9m4n05.json` passes the structural schema/count/answer-position check. This is a separate mechanical check and is not the basis of the content verdict.

Root still owns: final independent evidence acceptance, review-aware publication and ledger, exact-base complete-tree integrity, non-forced publication, generated verification-status files, Actions, Pages and live activities. This five-code batch must not activate the Year 4 Maths subject badge unless every Year 4 Maths curriculum code has separately passed and been recorded.

## Handoff SHA-256 snapshot

| File | SHA-256 |
| --- | --- |
| `assets/assessment-banks/year4/math/ac9m4n05.json` | `415772825c56946cb4426654d0e0f0fbbe39f4e264a5e1c6cdc3a9f81a262a44` |
| `assets/assessment-visuals/year4/math/ac9m4n05/p003-chart.svg` | `a6f91968c6a89c2f40e69db2bf977f016ab8ab91337ff51dd4101f557211a2ac` |
| `assets/assessment-visuals/year4/math/ac9m4n05/p016-chart.svg` | `aa4e7a94d384e0c9298c3ebac77b76eb5f120f1892bc82774b3aed0a371812d8` |
| `assets/assessment-visuals/year4/math/ac9m4n05/p024-pattern.svg` | `445d196cb25c179526243fc4420283e8f8c19d1bac4c226f6223f23b63457ac6` |
| `assets/assessment-visuals/year4/math/ac9m4n05/p032-bar.svg` | `3b43a93821f9241af6b2d447f0efc820bb14b621b04778e9960a0a8e2d40b0ee` |
| `assets/assessment-visuals/year4/math/ac9m4n05/p043-ribbon.svg` | `8213778b88fd419e9752320f46aaffcb8d9da9fd25a4cc737f6283333c645045` |
| `assets/assessment-visuals/year4/math/ac9m4n05/t007-print.svg` | `8d4a0d1dafb026941570d979f6d480f023963117071fcfca01d7fa0d0217ee68` |
| `year4/maths/ac9m4n05-solve-problems-involving-multiplying-or-dividing-natural/index.html` | `d7935e7d216686e8f8ba4a29ff220eb0d56281814bd9cc8744e720d868248fac` |
| `year4/maths/ac9m4n05-solve-problems-involving-multiplying-or-dividing-natural/teacher-slides/index.html` | `fb809ed086c137ba96188334c6fbe6f6931f8b7aaf48c39ac2a714b2c2d0b0f3` |
| `quiz/year-4/math/ac9m4n05/worksheet/index.html` | `c1eb3d9db25451a53fe7bfa2adbd684c45e0b11b9b195bb75b2945d654f31413` |
| `quiz/year-4/math/ac9m4n05/worksheet/worksheet-questions.js` | `275d8af72581a1458455f3656e215bee48d946abac3246df286896e16847408e` |
