# AC9M4A02 independent review

Reviewer: `reviewer_facts_time`, separate from author `author_facts_time`. Review date: 2026-09-08. Scope: AC9M4A02 only in branch `content/year4-maths-third-five-current`.

## Decision

**Overall HOLD — actual IXL/Khan source comparison is unverified.** All 64 bank items, ten rendered mathematical visuals, both complete Topic/Classroom resources, eight standalone worksheet tasks and all five pages of the exact production homework PDF pass substantive review after correction rechecks. Final generated-bank parity, audio alignment, all nine activity pages and integrated artifact identities are recorded below. No mathematical/content/PDF correction remains open. A mathematical or PDF pass must not be read as overall independent approval, publication authorisation or a ledger/badge change.

## Primary source and scope

Read `AGENTS.md`, `THIRD-FIVE-TEAM-BRIEF.md`, `docs/static-curriculum-architecture-v2.md` and `docs/skillr-long-life-curriculum-content-standard.md`. Read the current shared research-log active/index evidence: it records historical Year 3 research, not a completed Year 4 audit. The root-retrieved version is 17, 43,357 bytes.

Independently opened the full local April 2024 ACARA Mathematics JSON-LD and its A02 content-description node plus all six linked elaboration nodes. Recomputed SHA256: `4d6b7a01d10517dc97ad709055c62c171b9b90ea33e0d0fc395e9bd2f96e48b1`. Primary URL: https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/MAT/export/MRAC/2024/04/LA/MAT.jsonld. The descriptor node ends `261c1d24-0625-4985-b7b0-d192bb23b783`; all six children agree with `THIRD-FIVE-ACARA-SOURCE.json`, including their Year 4 designation.

Exact descriptor: “recall and demonstrate proficiency with multiplication facts up to 10 x 10 and related division facts; extend and apply facts to develop efficient mental strategies for computation with larger numbers without a calculator”.

| Required component | Independent acceptance criterion | Final evidence |
| --- | --- | --- |
| Descriptor: fluent facts and related division | Meaningfully varied facts through 10 × 10; inverse division; unique correct choices and explanations | P001–P012, P025–P032, T001–T010; Topic fact network and Q&A |
| Descriptor: efficient larger mental computation | Extend known facts with place value, partitioning, near facts and/or factor doubling/halving; explain the relationship, not just append zeroes | P033–P042/P048, T011–T014; Topic worked models; W005–W007 |
| E1: arrays and division | Construct an actual array; represent rows/columns accurately; explain both multiplication and related division | P013–P017/P044–P046, T003/T015; E1 expansion; W001/W002/W004 |
| E2: derived strategies | Materials/diagrams and recorded reasoning for doubling, halving, commutativity and one more/fewer group; include the ×3 to ×6 connection | P014–P023, P046, T005–T008; E2 and models; W002–W004 |
| E3: derive 4, 6, 7, 8, 9 from known 2, 3, 5, 10 facts | Cover the named target fact groups using useful connections; preserve the two possible routes to ×9 | P006–P011/P018–P023; explicit E3 strategy menu and both ×9 routes; W003 |
| E4: twos and fives make sevens | Accurate split array, with groups preserved, showing a genuine 2 + 5 split | P015/P045, T004, E4 worked split and own construction; W001 |
| E5: inverse relationship | Establish corresponding division statements from a multiplication fact; do not teach division as commutative | P025–P032/P044/P045/P048, T010/T015; E5 includes coincident square-fact divisions; W001/W004/W005 |
| E6: card games | Student designs rules, creates cards and plays an instructive fact game including recall, recognition and explanation of multiplication and division; selection alone is insufficient | P047/T016, E6 and guided workshop, W008 require real cards/rules/play records |

Year boundary: fluent/derived facts and efficient mental arithmetic are core. Formal algebra, calculators, a written long algorithm or higher-year symbolic generalisations must not replace these goals. Constructed items use the existing adult-review schema; valid alternative constructions must be accepted.

## Baseline findings and corrections sent

The baseline bank had 24 Practice + 16 Test items, split only between `multiplication_facts` and `extend_known_facts`. Introductory inspection found repeated fact-family-choice and ×10-extension stems, decorative pathway visuals and weak explanations. This is not a full final-bank review.

The baseline Topic/Classroom resources contain useful 16 × 7, 25 × 8, 9 × 34 and 168 ÷ 7 mental models to preserve. Baseline elaborations display literal LaTeX, Important questions supply prompts without actual answers, elaboration expansion is incomplete, and the worksheet page lacks eight standalone written tasks.

| Correction ID | Request sent to author | Recheck status |
| --- | --- | --- |
| A02-C01 | Reach at least 48 Practice + 16 Test with meaningful fact/strategy/mental-extension variation | 48+16 individually reviewed; pass |
| A02-C02 | Add genuine array construction and actual card design/create/play with requested evidence matching the rubric | Six adult-review items and worksheet constructions inspected; pass |
| A02-C03 | Teach every E1–E6 expansion, replace raw LaTeX, supply actual worked/question/exit answers, preserve strong existing mental models | Both full resources read; pass |
| A02-C04 | Author eight independent worksheet tasks and matching answers; each must stand alone when shuffled | All eight solved, matched to HTML and checked in the shuffled five-page PDF; pass |
| A02-C05 | Replace generic diagram pathways with mathematically useful visuals and inspect rendered output | All ten rendered and inspected; pass |
| A02-C06 | P041: replace ambiguous “Half of 48 × 10 = 480 gives 240” option/audio with explicit tens calculation, then halving its result | Fixed option/audio re-read; pass |
| A02-C07 | P047 and T016: prompt permits reversed multiplication facts, but rubric requires distinct families; explicitly request different families/products and align instructions | Both prompts and rubrics now explicitly require different products; pass |
| A02-C08 | `a-split23x4`: widths 370 and 65 do not preserve 20:3; make the parts proportional and recenter labels | 400:60 model re-rendered; pass |
| A02-C09 | Restore word-number and sentence/list spacing throughout new teaching/worksheet text; prevent misleading `35.35`/`checks.126` joins | All fixes re-read in both resources, both worksheet copies and final PDF; W006 now separates the sentence from 30 × 4; pass |
| A02-C10 | E6/P047 shorthand doubling example needs the actual 24→48 calculation | Both resources and bank model now show 3 × 8 = 24, then 6 × 8 = 24 + 24 = 48; pass |
| A02-C11 | Align Topic official curriculum reference to QCAA HTML as in Classroom | Both Topic and Classroom use the matching QCAA HTML reference; pass |
| A02-C12 | Root production validator requires audio prompts exactly equal visible questions | All 64 equal; the prior bank hash was reconstructed to prove only 50 audio fields changed, and regenerated runtime matches; pass |
| A02-C13 | Root structural gate requires the native Classroom worked-example card shell | Final five reviewed models use the restored native board/grid/card/label/row structure; pass |

## Source-evidence boundary

The shared log does not certify this code. The author reports IXL page-shell access only; no opened worked-help panel or representative submitted progression was observed. Khan lesson-level evidence remains unavailable. Reviewer has not used the root-exclusive Browser and has not claimed unseen help, video/audio or adaptive progression. Candidate/catalogue alignment must remain labelled as such. Actual source comparison stays **HOLD** until evidence exists.

Reviewer also searched for relevant official Khan resources and directly opened [Distributive property review](https://www.khanacademy.org/math/arithmetic-home/multiply-divide/properties-of-multiplication/a/distributive-property-review) and [Distributive property when multiplying](https://www.khanacademy.org/math/cc-third-grade-math/3rd-basic-multiplication/distributive-property/v/using-the-distributive-property-when-multiplying). Both opens returned zero lines. Search snippets do not count as a completed lesson review. Root then directed all external calls paused after the user's “too many requests” report; this reviewer complied.

## Final substantive review record

First bank checkpoint: all 48 Practice and 16 Test items were individually read and independently solved. Every answer option, correctness flag/key, summary, hint, audio prompt/audio answer wording, and six adult-review model/rubric/instruction sets was checked. Audio wording was read; playback was not claimed. No arithmetic or keyed-answer error was found. The option wording and game prompt/rubric issues were identified at that checkpoint, then corrected and rechecked; all are closed. Distractors were checked as false or non-matching to the specific question: adding factors, adjacent facts, omitted partial products, incorrect group adjustment, reversed division and place-value errors are distinguishable from the correct response.

| Item | Independently checked result and reasoning |
| --- | --- |
| P001 | 14; double 7 |
| P002 | 24; 16 + 8 |
| P003 | 45; half of 90 |
| P004 | 100; ten tens |
| P005 | 8 shells; eight ones |
| P006 | 24; double 12 |
| P007 | 42; 35 + 7 |
| P008 | 64; double 32 |
| P009 | 81; 90 − 9 |
| P010 | 56; 40 + 16 |
| P011 | 54; 60 − 6 |
| P012 | 70 cups; seven tens |
| P013 | 28; four actual rows of seven |
| P014 | 3 × 8 = 8 × 3; same 24 counters rotated |
| P015 | 6 × 2 + 6 × 5 = 42; 12 blue + 30 gold |
| P016 | 48; two arrays of 24 |
| P017 | 30; five of ten equal rows |
| P018 | Double 18 to obtain 36 |
| P019 | 56; double 28 |
| P020 | 60 − 6 = 54; subtract an entire group |
| P021 | 42; 36 + 6 |
| P022 | 40 − 8 = 32; remove two groups of four |
| P023 | 9 × 5 = 45; three lots of three groups |
| P024 | Six rows of seven contain 42, not 6 + 7 |
| P025 | 9; 7 × 9 = 63 |
| P026 | 9; 8 × 9 = 72 |
| P027 | 7 counters per child; 42 ÷ 6 |
| P028 | 8 bags; 56 ÷ 7 |
| P029 | 5; 8 × 5 = 40 |
| P030 | 10; ten tens in 100 |
| P031 | 1; one group of seven |
| P032 | 24 ÷ 4 = 6; product is the whole |
| P033 | 480; 48 tens |
| P034 | 2100; 21 hundreds |
| P035 | 80; 56 tens ÷ 7 |
| P036 | 92; 80 + 12; corrected 20:3 bar proportion re-rendered and passed |
| P037 | 114; 120 − 6 |
| P038 | 50 × 4 = 200; reciprocal factor changes |
| P039 | 306; 340 − 34 |
| P040 | 24; 140 ÷ 7 + 28 ÷ 7 = 20 + 4 |
| P041 | 240; half of 480; corrected option/audio clarification passed |
| P042 | 6 × 4 = 24, whereas 6 × 40 = 240 |
| P043 | 40 + 16 = 56 and 56 ÷ 7 = 8 |
| P044 | 40 ÷ 5 = 8 and 40 ÷ 8 = 5 |
| P045 | Actual 6 × 7 split array, parts 12 and 30, total 42, both inverse divisions; rotated equivalent accepted |
| P046 | Actual 3 × 9 and doubled 6 × 9 arrays; 27 and 54, with row-count explanation |
| P047 | Twelve physical cards, three families with different products, rules and three actual played turns; corrected prompt/rubric alignment passed |
| P048 | 16 × 7 = 112 and 112 ÷ 7 = 16; valid partitioning or doubling plus inverse check |
| T001 | 72; 80 − 8 |
| T002 | 9; 6 × 9 = 54 |
| T003 | 63; seven actual rows of nine |
| T004 | 63; 45 blue + 18 gold |
| T005 | 40; half of 80 |
| T006 | 6 × 8 = 48; array rotation |
| T007 | 72; double 36 |
| T008 | 48; 40 + 8 |
| T009 | 10; 7 × 10 = 70 |
| T010 | 36 ÷ 9 = 4 |
| T011 | 192; 180 + 12 |
| T012 | 203; 210 − 7 |
| T013 | 80; 72 tens ÷ 9 |
| T014 | 25 × 12 = 300; halve one factor and double the other |
| T015 | Actual 8 × 7 array with two visible valid groupings, total 56, both inverse facts; alternative groupings accepted |
| T016 | Eight physical cards, two families with different products, workable rules and two played turns; corrected prompt/rubric alignment passed |

Ten original 640 × 300 symbols were rendered with CairoSVG and visually inspected individually in two full-resolution labelled contact sheets. Array quantities, colour splits, labels, rotation, spacing and bounds are correct in `a-array4x7`, `a-rotate3x8`, `a-split6x7`, `a-double3x8`, `a-half10x6`, `a-array5x8`, `a-cards`, `a-array7x9` and `a-split9x7`. `a-split23x4` initially needed A02-C08; its corrected 400:60 geometry was re-rendered and passed. These are mathematical SVG renders, not a claim about a live browser route. Review images are in scratch `reviewer-facts-time/a02-visuals/`.

Correction recheck: P038 now explicitly doubles 25 and halves 8; P041 now first computes 48 × 10 = 480 then halves 480. Both prompt/option/audio/explanation combinations pass. P047/T016 now ask for different products, and both final acceptance notes explicitly contain the same condition. `a-split23x4` was re-rendered after changing widths to 400 and 60. Its 20:3 ratio, labels and layout pass.

Root's new preparation material was read in both Practice/Test launch pages and all six result/review/retake pages for this code, and compared with `THIRD-FIVE-ACTIVITY-PREPARATION.json`. The actual six-row, 2+5 coloured array was already visually checked. Caption 12 + 30 = 42, mental extension 60 × 7 = 420, inverse 420 ÷ 7 = 60, and 23 × 4 = 80 + 12 = 92 all pass. Strategy focus, whole-group misconception, required paper/cards, actual played-work and adult checking reminders are appropriate. This wrapper content has no pending mathematical correction.

## Topic, Classroom and worksheet substantive review

Read all final teaching text in both static Topic and native Classroom resources, including their actual prompts, worked answers, E1–E6 expansions, teacher questions, expected responses, remediation, four guided activities, six Important questions/answers, five misconceptions, prerequisites/boundary, Support/Core/Extend, three assessment-style items and three exit-ticket tasks/answers. The original useful 16 × 7 = 112, 25 × 8 = 200, 9 × 34 = 306 and 168 ÷ 7 = 24 examples are preserved and fully worked. The fact-network extensions 14 × 8 = 112, 7 × 16 = 112, 70 × 8 = 560 and guided 19 × 6 = 114, 32 × 4 = 128, 15 × 8 = 120 are correct. Extension 25 × 12 = 300 and 196 ÷ 7 = 28 remains mental strategy work. Exit responses 48, both inverse facts for 63, and 18 × 5 = 90 with an inverse check are correct. Every elaboration has actual teaching/actions and observable evidence, rather than a descriptor-only listing.

The three Topic/Classroom SVG models reuse independently rendered and approved array symbols. Static teaching remains directly in HTML with native details/summary sections; no curriculum-content JavaScript assembly was added. The original title, description and canonical were compared with HEAD and are unchanged. At the pre-integration checkpoint, the complete optional-video marker block matched HEAD byte-for-byte. The subsequent upstream navigation additions are checked below; preservation is not a claim of having watched the video.

All eight dedicated worksheet JS tasks, correct answers and explanations were read, solved and matched against the HTML task/answer guide. All 24 text fields agree after whitespace normalisation. None depends on a previous task or unseen bank item; source/context and requested construction evidence are in each prompt. The page provides general separate-paper instructions, and W001/W002 explicitly provide them for larger drawings. Alternatives are accepted where construction or strategy can vary.

| Worksheet task | Independent solution / complete evidence |
| --- | --- |
| W001 | Actual 5 × 7 array split 5+2: 25 + 10 = 35; 35 ÷ 5 = 7 and 35 ÷ 7 = 5; explain known fives/twos |
| W002 | Actual successive 2 × 9, 4 × 9 and 8 × 9 models: 18, 36, 72; row size stays nine while rows/total double |
| W003 | 60 − 6 = 54 and 3 × 18 = 54; distinguish nine of ten groups from three lots of three groups |
| W004 | Turn 4 × 8 to 8 × 4; total 32 unchanged; both inverse divisions and actual/modelled turn |
| W005 | 18 × 6 = 108 and 126 ÷ 7 = 18; correct partitions, smaller facts and inverse checks |
| W006 | 35 × 4 = 120 + 20 = 140; multiply both parts by four; labelled model and correction of the omitted product |
| W007 | 25 × 12 = 50 × 6 = 100 × 3 = 300; explain balanced double/half factor changes |
| W008 | Twelve created cards with three distinct products, written workable rules, and three real recorded turns including matching, strategy and inverse check; example 6 × 7 = 42 valid |

Final punctuation/reference rechecks, generated runtime comparison, integrated identities and every-page production PDF inspection are complete. Structural validators/counts remain supporting checks only.

## Final integration and evidence recheck

The final P003/P006/P008 explanations explicitly identify the halved/doubled quantities; the P048 rubric accepts efficient 8 × 7 then doubling. These final wording changes were re-read with their questions, options and keys and pass. For the last audio-only correction, applying the previous normalisation function in the author's local script to the final questions reproduces the exact previously reviewed bank SHA256 `7902797751a93d0af853ecc3b6a4b4addaa5c1da599eb60fd3091bae13b2bba9`. That equality independently confirms that only the 50 `audio_prompt` values changed. All 64 final prompts equal their visible questions exactly. This is text/TTS-contract verification; spoken playback was not tested.

Both final Practice/Test runtime files were evaluated locally and all 64 records compared with source: question, audio, options, key, structured explanation/hint, visual metadata, difficulty/order, adult model answer, acceptance note, response instructions and completion label agree. The Practice alias file is byte-identical. Adult items use the expected self-check/short-answer runtime form.

The activity hub and all eight Practice/Test launch/result/review/retake pages contain the reviewed preparation/focus wording. The hub now offers a direct native Classroom View link. The existing adult-review support script is now loaded by both launch, result and review pages. Its source is unchanged from HEAD; source inspection confirms that paper-work completion stays pending rather than earning correct-answer credit until an adult marks it. This reviewer checked wiring/source and data parity; root's separate offline runtime observations are not represented as an independent live-browser test.

The final Classroom HTML restores one native `example-board`, one single-column `example-grid`, and five each of `example-card`, `example-label` and `example-row`. All five final card contents were read and agree with the reviewed teaching. No full live-page rendering is claimed. The author report's source limitations were checked against the reviewer's actual observations: IXL shell-only details remain author-reported, Khan opens returned no lesson content, and the preserved video content was not watched. Source HOLD remains in force.

## Exact production homework PDF review

Reviewed the root-exported five-page production PDF from the dedicated worksheet bank and real v18.2 PDF code, then visually inspected every rendered page at `/workspace/scratch/b2c91567ebe4/qa-pdfs/ac9m4a02-page-1.png` through `ac9m4a02-page-5.png`. Independently recomputed PDF SHA256: `96e6e708f5aad3551af2a6eb7e01348fc166429d9cd276552a87127ea2de8527`. Earlier candidate PDFs are superseded.

| PDF page | Content and independent visual/content result |
| --- | --- |
| 1 | Questions 1=W001 and 2=W004. The split-array task and turn-array task are complete, readable and correctly spaced, with working lines; larger first drawing has explicit extra-paper guidance. |
| 2 | Questions 3=W002, 4=W007 and 5=W008. Successive arrays, two equal-product steps and actual card creation/play are all requested. Long prompts wrap cleanly; each has working space and required separate-paper/cards directions. |
| 3 | Questions 6=W003, 7=W006 and 8=W005. Both ×9 routes, the omitted partial-product error and larger mental/inverse work retain all instructions. All multiplication/division signs and lines render correctly. |
| 4 | Answers 1–6 match the shuffled tasks exactly: 35 with both inverses, 32 with rotation, 18/36/72, 300, genuine 12-card evidence, and 54 by both methods. Worked paragraphs stay together and punctuation does not create false decimals. |
| 5 | Answers 7–8 are complete: 140 with the repaired sentence before 30 × 4, then 108 and 18 with partitions/inverse checks. No continuation or orphaned line comes from the previous page. |

All five pages pass margins, wrapping, glyphs, footer/page numbering, workspace and question/answer separation. No clipping, overlap or misleading punctuation remains. This is exact offline production-output review, not a live Download PDF click.

Root subsequently changed the shared generator to v18.3 and the worksheet HTML cache query. The additional generator branch reserves actual image height only when an authored worksheet question has an image. Independently inspected the diff and confirmed these eight dedicated tasks have no visual fields, so their reviewed no-image layout branch is unchanged. The final v18.3 HTML identity is listed below; the exact visually reviewed PDF remains the v18.2-generated artifact above.

## Upstream Topic navigation integration recheck

Read `THIRD-FIVE-TOPIC-INTEGRATION.json` and independently compared this Topic with HEAD/base `c3a1073ccf167a3153c1528a079125a7c144cf48` and local `origin/main` `348109b09c055ee54a56abf74ef77b3f27d6ba1c`. Removing exactly three unique upstream insertions from main reproduces the base bytes; removing those same insertions from the current Topic reproduces its previously reviewed authored SHA256. Only the secondary “Watch a video” shortcut, video target ID/tabindex and “Back to the lesson” link were added. Both target IDs and matching links occur once, and the final video marker block matches upstream exactly. Reviewed teaching is unchanged; all other recorded artifacts remain byte-identical. The Topic hash below identifies the integrated version. This local markup check does not claim playback/live navigation testing or alter source HOLD.

## Reviewed artifact identities

Independently recomputed after the final author corrections and root runtime/cache integration. Paths below are relative to the reviewed repository unless absolute. These identities identify the mathematical/content/PDF pass only; overall source comparison remains **HOLD**.

| Artifact | SHA256 |
| --- | --- |
| `assets/assessment-banks/year4/math/ac9m4a02.json` | `60ea1a6e301039cb20e12fe7c25b899366b49b24fff0fe2b9bac5d87051d8495` |
| `assets/assessment-visuals/year4/math/ac9m4a02.svg` | `7847fdbe2d48a8f189ef1c03befa0988f6b7f154628395c3faa59e5ba6f0be3c` |
| `year4/maths/ac9m4a02-recall-and-demonstrate-proficiency-with-multiplication-facts-up/index.html` | `b2037a0b2ec5aaefe9d1fcb7da1ea5f133005b2fc7611667250c253fc681fa09` |
| `year4/maths/ac9m4a02-recall-and-demonstrate-proficiency-with-multiplication-facts-up/teacher-slides/index.html` | `3364ed93f16e557c1de5af4b7d3aca2cc554b22786594ad52a6035568213d237` |
| `quiz/year-4/math/ac9m4a02/worksheet/index.html` | `b98c882e385e7ad1800ac736f81b61f7a8c0658cd3790812788432fc4529ae03` |
| `quiz/year-4/math/ac9m4a02/worksheet/worksheet-questions.js` | `6c337f0005a101332d89df0b404387a8b377a617f7da316a15efb8115bff9855` |
| `quiz/year-4/math/ac9m4a02/practice/questions.js` | `3dc0c136add528ebde72a45200fbd8870bad94f0c00b334b1db05bcbb2c0cb29` |
| `quiz/year-4/math/ac9m4a02/practice/practice-questions.js` | `3dc0c136add528ebde72a45200fbd8870bad94f0c00b334b1db05bcbb2c0cb29` |
| `quiz/year-4/math/ac9m4a02/test/questions.js` | `39137d7164513b22cc605c71a483bd922cb3bd650551eb48a0c0f201186812a1` |
| `quiz/year-4/math/ac9m4a02/index.html` | `b8e80591d5bd28a823d42f0eb97d8791fcd89afd00ad959c17265ad86977779d` |
| `quiz/year-4/math/ac9m4a02/practice/index.html` | `d5162f39982eb9f2ac3f1febc30964a081855aa46a46ea83f66a7b4eb586242a` |
| `quiz/year-4/math/ac9m4a02/practice/result/index.html` | `7e45aef799fe5f43649c34d3a7ecb6c909da05d0a8466ea2a5594a9a21440075` |
| `quiz/year-4/math/ac9m4a02/practice/review/index.html` | `62b79c826bb7975f8bb7776d8f117bfddf2fe518541058d47b33add2372bb76d` |
| `quiz/year-4/math/ac9m4a02/practice/retake/index.html` | `156ee57d3dfd470585f3c27346b8c82ff75e31cd7a272f986a932b9ca83096a2` |
| `quiz/year-4/math/ac9m4a02/test/index.html` | `ecfaf7b00569563d2fc60bcb433c9d32550da9e7d42c0079942ec162d81e4155` |
| `quiz/year-4/math/ac9m4a02/test/result/index.html` | `0c129f8e9a8fee10746e026709fa007847595264cc181fc0c7b653e58a313581` |
| `quiz/year-4/math/ac9m4a02/test/review/index.html` | `5558c0424245496f9ee1458ef8df0cf7033268e103c37c14f66c66dcbbf8e70a` |
| `quiz/year-4/math/ac9m4a02/test/retake/index.html` | `3f892fa6434d7d0556704b26df4c85f681db736f30e5a50cd064672d5ca285b8` |
| `/workspace/scratch/b2c91567ebe4/qa-pdfs/ac9m4a02-homework.pdf` | `96e6e708f5aad3551af2a6eb7e01348fc166429d9cd276552a87127ea2de8527` |
| `quiz/assets/year1-maths-support.js` | `220bc7a4b8b4fa82b01771f3ca0fc60649705e0097a96a9cef5616d289663803` |
| `quiz/assets/worksheet-pdf.js` | `f6846aecfd609c5563b5adf850ad8f32e75f2b2ffe0521ad599b3f3135dd1ea2` |

No commit, publication, ledger edit, badge change or full independent approval was performed by this reviewer.
