# AC9M4N07 independent content review

Status: HOLD — actual IXL source comparison and final live release gates remain pending; no publication approval.

Reviewer: `/root/reviewer_number`, separate from author `/root/author_number`.
Scope: second five Year 4 Mathematics codes; this report covers N07 only.
Baseline inspected: `a329adf8b480ad4385f42a2add8853900b277790`.

Stable content/PDF checkpoint: 8 September 2026. All 64 questions, nine SVGs, complete revised teaching resources and all four final v18.1 worksheet pages pass independent substantive review after corrections. The official ACARA descriptor and all three elaborations have been verified. Actual IXL skill/help/question comparison is not complete; the identified Khan candidates have not been read as rendered lessons and supply no completed observation claim. Root retains final rendered HTML, live activity and deployment verification. This HOLD does not indicate a remaining PDF defect.

## Official source and coverage audit

The shared `svgSkillrHub-IXL-Research-Log.md` was retrieved first earlier in this continuing session. Historical observations are not treated as an N07 benchmark. The current `AGENTS.md` full-resource standard was read.

The reviewer independently opened the [QCAA official v9 P–6 Mathematics content sequence](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_p-6_cd_sequence.pdf), page 2, and [Scootle's N07 code page](https://www.scootle.edu.au/ec/search?accContentId=AC9M4N07). This code requires selecting and applying estimates/rounding to explain whether calculations, including financial results, are reasonable.

The complete official MRAC graph supplied for the review was independently parsed from `research/acara-v9-mathematics-2024.jsonld`. The N07 descriptor links to exactly three elaboration nodes E1–E3, each with a reciprocal parent link. Their text agrees with Scootle. Source SHA256: `4d6b7a01d10517dc97ad709055c62c171b9b90ea33e0d0fc395e9bd2f96e48b1`.

| Component | Independent review requirement |
| --- | --- |
| E1: basic-fact bounds | Use manageable known facts to give justified lower and upper estimates, including money. |
| E2: rounded budgets | Build an estimated shopping/excursion budget and explain when rounding upward protects against underestimating the required amount. |
| E3: rounding effects | Compare both-up, both-down and mixed rounding for addition and multiplication; explain a chosen approximation using the actual numbers and purpose. |

The broader descriptor requires a useful range of calculations and financial transactions, rather than only rounded addition. Review criteria sent to the author include subtraction/division estimates where suitable, cost and change checks, choosing precision for a stated purpose, plausible error diagnosis and complete reasoning.

Crucial mathematical limits: mixed upward/downward rounding does not guarantee cancellation or the closest result. An estimate that is reasonable does not prove an exact answer correct. An upward estimated cost within a budget establishes sufficient funds under the stated assumptions; an estimate above the budget does not by itself prove that actual spending exceeds it. If one keyed estimate is required, the rounding place or comparison criterion must be clear. An estimate may happen to equal the exact answer.

## Complete baseline bank review

All 40 baseline questions, answer choices, keys, summaries and hints were independently read and solved. There are 24 Practice and 16 Test items. The arithmetic is correct, but only two repetitive formats are represented.

| Baseline family | Count | Substantive finding |
| --- | --- | --- |
| Rounded addition | 20 | Addends round to the nearest hundred; one plausible estimate is contrasted with two implausible distractors. No justification, purposeful precision choice, interval bound or financial decision is assessed. |
| Ten-times product error | 20 | Every statement is a multiplication by four with an extra final zero; the correct response is always “ten times too large”. No variety of error or estimation strategy. |

Context prefixes do not supply mathematical information. Feedback repeats a general rounded-addend or place-value-error sentence without the individual calculation. Generic reasoning-pathway visuals do not show the quantity, rounding decision or budget. Counts and correct keys cannot establish complete curriculum coverage.

## Baseline teaching/resource review

The complete Topic Guide, Classroom View and worksheet page were read. Correct useful examples include 3 426 rounded to 3 430 or 3 400 for different places; 2 684 + 1 937 = 4 621 compared with 4 600; and the $59.95 shopping total from $18.95 + $31.40 + 2 × $4.80. The upward estimate $13 + 2 × $8 = $29 safely bounds the actual $28.10 total from $12.60 + 2 × $7.75.

One definite teaching correction was sent to the author: the misconception response says an exact answer should be close to, “not equal to,” the estimate. Equality can occur, so the explanation must say that an estimate need not be exact and should be fit for its purpose. Another review prompt asks whether 6 912 is reasonable for 3 480 + 3 398; its replacement answer must distinguish a plausible approximate check from the correct exact sum, 6 878.

All five Important questions lack specific expected answers. The worked-step instructions are generic. The Classroom example board flattens and repeats activities, and the worksheet page provides no visible written tasks or answers while sampling eight old Practice questions. The elaborations appear as raw escaped mathematical markup in the source/text view; revised readable notation needs visual checking. The replacement must supply actual bounds, budget reasoning and rounding-direction comparisons rather than merely repeat the elaboration text.

These findings and all three component criteria were sent to the author before final authoring. Existing resource flow and design, truthful Classroom descriptions, recognised display labels and real curriculum elaboration labels must remain intact.

## Pending substantive review

The root's current Practice and Test Quick preparation, Worked example, Common mistake and Review help were independently read. Six $4.60 tickets cost $27.60, correctly bounded by $24 and $30. Allowing the upper $30 amount covers that stated cost. The help distinguishes a reasonableness check from an exact proof and does not assume that mixed rounding changes cancel. This wrapper content passes its current mathematical review.

Every replacement bank item, choice, key, explanation, hint and visual has now been independently checked, together with the revised teaching resources, final vocabulary refinement and all four pages of the actual worksheet PDF. The outstanding source comparison must use actual IXL pages, visibly opened worked examples and representative questions, with precise limits on any observed progression. Relevant Khan lessons can supply supplementary explanations. No publication PASS is recorded while this source gate is pending.

## Complete replacement-bank review

All 64 replacement items (48 Practice and 16 Test) have now been independently solved. The reviewer read every choice, correct index, explanation and hint and compared each model with its question. Every key is mathematically correct and only one choice satisfies the stated instruction. In particular, an upward estimate exceeding a budget does not prove that the actual bill exceeds it; equality between an estimate and exact answer is possible; mixed rounding is neither necessarily exact nor always closest. Those distinctions are directly assessed, not left as unsupported teaching claims.

Rounding tasks specify the place, direction, halfway rule or comparison criterion when necessary. Financial contexts include exact counts, costs, change, tight thresholds and bounds. All four arithmetic operations occur in estimation tasks. The full bank replaces the baseline's two repeated formats with different calculations, interpretations, counterexamples and reasoning demands. No mathematical correction was needed in this first bank pass. Three actual Test models were added by the author after the first reading; the reviewer reread their full item context and separately rendered and inspected them before recording the current item verdicts.

| Item | Independently verified result or reasoning | Verdict |
| --- | --- | --- |
| P001 | 473 is 27 from 500 and 73 from 400; proportional marked line selects 500. | PASS |
| P002 | Requested nearest hundreds give 400 + 200 = 600. | PASS |
| P003 | Nearest hundreds preserve subtraction: 800 − 300 = 500. | PASS |
| P004 | Six unchanged groups at about 50 give about 300 pencils. | PASS |
| P005 | Compatible dividend 240 gives 240 ÷ 6 = 40, close to 238 ÷ 6. | PASS |
| P006 | $12.65 is above the $12.50 midpoint and rounds to $13. | PASS |
| P007 | Explicit halfway-up convention sends $18.50 to $19. | PASS |
| P008 | Four $2.40 packets cost $9.60, strictly between 4 × $2 and 4 × $3. | PASS |
| P009 | Seven $3.80 lunches cost $26.60, between $21 and $28. | PASS |
| P010 | 8 × 63 = 504 lies between 480 and 560. | PASS |
| P011 | $11 < $4.20 + $7.60 = $11.80 < $13. | PASS |
| P012 | 318 ÷ 6 = 53 lies between the two easy quotients 50 and 60. | PASS |
| P013 | Explicitly use upward table amounts: $4 + $5 + $3 = $12; actual total $9.95. | PASS |
| P014 | Eight tickets at upward price $8 give a sufficient $64 upper estimate. | PASS |
| P015 | Upward tens are $190, $220 and $70; estimate $480 exceeds actual $469. | PASS |
| P016 | Actual $27.60 fits $29 despite a higher upper estimate of $30. | PASS |
| P017 | Summing upper prices bounds actual cost by at most $23; exact equality remains possible. | PASS |
| P018 | Four nearest prices at $6 give $24; upward prices at $7 give $28; actual $24.80. | PASS |
| P019 | 374 + 263 = 637; increases 26 and 37 give the upper estimate 700. | PASS |
| P020 | 478 + 351 = 829; removing 78 and 51 lowers it to 700. | PASS |
| P021 | 244 + 356 = 600; opposite changes of 44 cancel for this addition. | PASS |
| P022 | 347 + 462 = 809; changes −47 and +38 leave estimate 800, 9 below. | PASS |
| P023 | 267 + 351 = 618; changes +3 and −1 give estimate 620, 2 above. | PASS |
| P024 | Distances from 799 are 1, 99, 101 and 201; 800 is uniquely closest. | PASS |
| P025 | 18 × 27 = 486; raising both positive factors gives upper estimate 600. | PASS |
| P026 | 24 × 36 = 864; lowering both positive factors gives lower estimate 600. | PASS |
| P027 | Grids contain 399 and 400 squares; opposite changes in factors do not cancel here. | PASS |
| P028 | From exact 231, estimates 200, 400 and 600 have errors 31, 169 and 369; both-down wins. | PASS |
| P029 | From exact 884, 900 is 16 away and closer than 600, 1 200 or 800. | PASS |
| P030 | Positive-factor bounds give 300 < 518 < 800. | PASS |
| P031 | Close-looking 391 is incorrect; 187 + 214 = 401. | PASS |
| P032 | Three $4.95 packs cost $14.85, near $15; claimed $148.50 has wrong scale. | PASS |
| P033 | Estimated spend $28 gives change near $22; actual change $22.10 is the unique plausible option. | PASS |
| P034 | Four $19.80 items cost $79.20; exact calculation and estimate $80 both support the bill. | PASS |
| P035 | $100 − $48 gives estimated change $52, near exact $52.15. | PASS |
| P036 | 400 ÷ 4 = 100 exposes the tenfold error 990; exact quotient 99. | PASS |
| P037 | Required nearest hundreds give 3 700 + 2 000 = 5 700. | PASS |
| P038 | 280 is closest to 278 among listed compatible dividends; quotient estimate 40. | PASS |
| P039 | All four upward prices total $36; nearest-dollar $33 is below actual $33.60. | PASS |
| P040 | 23 × $9 = $207 covers all tickets; other options undercount or use a lower price. | PASS |
| P041 | $0.95 + $1.10 = $2.05 exceeds $2 despite a nearest-dollar estimate equal to budget. | PASS |
| P042 | Subtracting cost bounds from $20 reverses their order: change is between $2 and $3. | PASS |
| P043 | Raising the starting amount by 18 and lowering the removed amount by 47 raises the difference by 65. | PASS |
| P044 | 4 800 − 2 100 = 2 700, close to exact 2 687. | PASS |
| P045 | 401 + 198 = 599 fails the inverse; correct difference is 411. | PASS |
| P046 | The added 2 occurs six times; estimate 300 exceeds exact 288 by 12. | PASS |
| P047 | Rounding both positive factors upward gives 50 × $22 = $1 100, an upper budget. | PASS |
| P048 | Rounding addends gives 40; rounding exact sum 48 gives 50; the procedures differ. | PASS |
| T001 | Nearest hundreds give 600 + 300 = 900. | PASS |
| T002 | Nearest hundreds give 1 900 − 1 200 = 700. | PASS |
| T003 | Seven groups at nearest ten 60 give about 420 beads. | PASS |
| T004 | Compatible dividend 360 divided by 9 gives estimate 40. | PASS |
| T005 | $23.45 lies below $23.50 and rounds to $23. | PASS |
| T006 | Six $4.30 meals cost $25.80, bounded by $24 and $30; added model checked. | PASS |
| T007 | Three upward prices $9, $7 and $5 total $21; added table checked. | PASS |
| T008 | All thirteen tickets at upward price $7 give sufficient estimate $91. | PASS |
| T009 | Both addends increase; 700 is above exact 569. | PASS |
| T010 | Opposite changes of 46 preserve sum 600 in this addition; added change model checked. | PASS |
| T011 | 30 × 40 = 1 200 is 304 below 32 × 47 = 1 504. | PASS |
| T012 | From exact 252, errors 52, 148 and 348 make 200 uniquely closest. | PASS |
| T013 | Six $9.95 bags cost $59.70, near $60; $597 has incorrect scale. | PASS |
| T014 | Nearest-dollar spend $13 + $15 = $28 leaves about $22; exact change $22.20. | PASS |
| T015 | An upper estimate $45 alone cannot decide whether exact cost fits a $44 budget. | PASS |
| T016 | 914 has plausible scale but exact 726 + 198 = 924 reveals the incorrect display. | PASS |

### All nine bank visuals substantively checked

Every distinct SVG was rendered at 960 × 450 and visually inspected with legible labels. The original six show: a proportional 400–500 number line with 473 correctly placed; four equal purchase counts using price bounds $2 and $3; a complete three-item upward-price table; both increases producing 637 → 700; grids with 19 × 21 = 399 and 20 × 20 = 400 unit squares; and the intentionally incorrect receipt claim clearly identified for checking. The price-bound cells represent one meal/packet each, not proportional monetary lengths.

The three added Test diagrams were then rendered and inspected against the full T006, T007 and T010 questions and alternative text: six price-bound cells per row, the exact three prices and their upward values, and arrows labelled −46 and +46 with both sums 600. Arithmetic, grouping, labels and colour meanings agree. No clipping, collision or incorrect mathematical representation was visible. Subsequent sections record the separate teaching-resource and final PDF review; root retains the live HTML release gate.

Reviewed bank checkpoint SHA256: `5394600beb4df99e515cf578951b57f5744ceaf52e851d718c2b98701b62f175`. This identifies the complete item/model checkpoint. Subsequent sections approve the teaching content and final PDF; actual-source evidence remains on HOLD.

### Launch preparation compatibility review

The reviewer inspected the scoped `assets/year4-maths-practice-quick-read.js` diff and both full authored Practice/Test help sections. The helper recognises the scoped code/version and authored marker, preserves the approved static support inside the existing branded card, and is explicitly loaded before PWA registration. The reused, already inspected number line agrees with its caption: 473 is 27 from 500 and 73 from 400, so it rounds to 500 at the requested hundred place. The six-ticket worked example has actual cost $27.60, strictly between $24 and $30; $30 safely covers those tickets.

The reviewer requested a narrow common-mistake clarification so that equal opposite factor changes would not be read as cancelling in multiplication. Both launches now explicitly distinguish addition from multiplication; the complete revised sentences were reread and pass. Static content and helper-diff review pass. Root retains runtime/load-order, final rendered launch-layout and live activity gates; this review does not claim those checks were performed by the independent reviewer.

| Launch/helper checkpoint | SHA256 |
| --- | --- |
| Practice `quiz/year-4/math/ac9m4n07/practice/index.html` | `5789662ef2c18c73cf4417ff28ef9880c212cb253dffd8a22de99152236a9c5e` |
| Test `quiz/year-4/math/ac9m4n07/test/index.html` | `b3538b92f7dd05444a2de69303006da95c38175d10ded9089910321dee3b131b` |
| Shared helper `assets/year4-maths-practice-quick-read.js` | `d5daa920f8a39eaae76a9643ef637c1234b00222e5f5bcfe8a79d209185aa5ed` |

## Complete revised teaching-resource review

The reviewer read the complete revised Topic Guide and Classroom View, including every model caption and table, all three elaborations, every guided activity and expected response, all five Important answers, all five exit checks, vocabulary, misconceptions and support/core/extend guidance. The seven numbered Classroom model cards preserve the full mathematical working from the Topic Guide in the existing one-column example grid. All four teaching tables have the existing scrollable table wrapper; the relevant table and model styles are loaded. The six embedded model images reuse bank SVGs already rendered and substantively inspected, with correct new alternative text.

| Section | Substantive independent check | Verdict |
| --- | --- | --- |
| Model 1: rounding distance | 473 rounds to 500; 3 426 rounds to 3 430 or 3 400, with distances 4 and 26. Nearest and upward purposes differ. | PASS |
| Model 2: retained financial example | $18.95 + $31.40 + 2 × $4.80 = $59.95. Nearest estimate $60; upward estimate $61. Exact check confirms 5 cents change from $60. | PASS |
| Model 3: bounds | $8 < $9.60 < $12; 50 < 53 < 60 shares; subtracting cost endpoints from $20 correctly reverses change bounds to $2–$3. | PASS |
| Model 4: upward budget | $12 covers actual $9.95; all eight tickets at upward $8 give $64; upper estimate $30 does not prove actual $27.60 exceeds a $29 budget. | PASS |
| Model 5: addition directions | Both-up 700 exceeds 637 by 63; both-down 700 is below 829; equal ±44 changes preserve 600; unequal −47/+38 changes lower 809 to 800; errors identify 800 as closest to 799. | PASS |
| Model 6: product directions | 399 and 400 differ despite opposite factor changes; positive-factor both-up/down bounds are correct; 200 is closest to 231 among the listed estimates; six repeated changes of 2 total 12. | PASS |
| Model 7: all four operations | Estimates/exact results 600/603, 2 700/2 687, 300/288 and 100/99 agree. Receipt claim $148.50 is intentionally wrong; exact $14.85. Nearby 391 does not prove correct sum 401. | PASS |
| E1–E3 coverage | Bounds, financial budgets and every required rounding direction have actual worked teaching and assessment counterparts. | PASS |
| Guided activity 1 | Pupils justify the precision for the context and explain 3 430 versus 3 400. Multiple valid choices are accepted when the purpose is open. | PASS |
| Guided activity 2 | 2 684 + 1 937 = 4 621 versus 4 600 estimate; proposed 6 912 has plausible scale but exact 3 480 + 3 398 = 6 878. | PASS |
| Guided activity 3 | $12.60 + 2 × $7.75 = $28.10; upward $29 is sufficient. $28 is explicitly rounding the final exact total, not each item. Product-error comparison is correct. | PASS |
| Important questions 1–5 | Specific rounding, sum estimate, reasonable-but-incorrect total, 5-cent change and protective-budget explanations all agree with the models. | PASS |
| Exit checks 1–5 | Meal bounds $24–$30; upward budget $21; equal ±46 addition changes; both-down 200 closest to product 252; compatible quotient near 60 rejects 610. | PASS |
| Misconceptions/differentiation | Corrects the former false “not equal” statement; does not generalise mixed cancellation to products or interpret an upper estimate as the actual bill. | PASS |
| Upward-rounding vocabulary | Revised definition uniquely specifies the smallest qualifying whole dollar/multiple and leaves exact multiples unchanged; both pages rechecked. | PASS |

No numerical error was found in the revised resources. The reviewer requested a definition of upward rounding using the smallest whole dollar/stated multiple at least as large as the original value. The author applied this to both Topic and Classroom; the reviewer reread both definitions and confirmed that exact multiples remain unchanged. The correction passes and changes neither the bank nor worksheet.

### All eight written tasks and answers independently solved

The visible worksheet and dedicated data file were read in full. Each student question has a separate, matching expected answer. The `modelAnswer`, `correct` and `explanation` fields agree with the visible guide; no answer depends on a multiple-choice option position. The written tasks require calculations, reasoning and comparisons that extend the online selections.

| Task | Independently verified result and explanation | Verdict |
| --- | --- | --- |
| W001 | 3 486 → 3 490/3 500; hundreds estimate 5 000; exact sum 5 004 is 4 above it. | PASS |
| W002 | Six $3.65 packets total $21.90, strictly between $18 and $24; retain all six in both bounds. | PASS |
| W003 | Upward prices $8 + $13 + $6 + $4 = $31 cover actual $28.20; estimate is an upper amount, not an exact bill. | PASS |
| W004 | Exact sum 800; both-down 700 and both-up 900 each 100 away; mixed 800 exact because +42 and −42 cancel. | PASS |
| W005 | Exact product 372; estimates 300/600/800 have errors 72/228/428, so both-down is closest. | PASS |
| W006 | Nearest spend estimate $22 gives about $18 change; actual spend $21.85 leaves $18.15, which requires exact cents. | PASS |
| W007 | 540 ÷ 9 = 60; 547 ÷ 9 is a little above 60, making 610 unreasonable; no exact decimal quotient is demanded. | PASS |
| W008 | Exact $23.60 fits $25 and leaves $1.40 despite an upward estimate of $26. | PASS |

Root generated the production PDF from this exact dedicated worksheet source. Every page has now passed the visual and mathematical review recorded below. Final rendered HTML layout and live activity behaviour remain root's explicit release gates.

### Reviewed resource checkpoint

| Resource | SHA256 after requested correction |
| --- | --- |
| Topic Guide `year4/maths/ac9m4n07-choose-and-use-estimation-and-rounding-to-check-and-explain/index.html` | `1b96d281f175c76ccb45350f2da7c29c15d39b6bbee0f184f0ce72c349fb111a` |
| Classroom View `year4/maths/ac9m4n07-choose-and-use-estimation-and-rounding-to-check-and-explain/teacher-slides/index.html` | `09a9afff6afd56e2f54b9ba693b0af1d793afb8ea685e20ce83fcfbfe5ce4c5c` |
| Worksheet page `quiz/year-4/math/ac9m4n07/worksheet/index.html` | `81103cb1684797b15e85c3dc3b5876477c9a0fbb442bacb043ff043ff92b3a13` |
| Worksheet data `quiz/year-4/math/ac9m4n07/worksheet/worksheet-questions.js` | `9c1b783c08b6edcc4556adc5391f7357553a3e553904231ea2c4a0b64aeb5abe` |

### Actual production PDF: PASS

Using the PDF review workflow, the reviewer viewed all four rendered pages of the final `ac9m4n07-homework.pdf` produced by production jsPDF renderer v18.1 and repository fonts. The PDF's SHA256 was independently recomputed as `ea51a4b02db0ffb609610604a3ba4bba7fb0b9c583995cead7838c07f8a30b6c`, matching root's exported artifact. The earlier v18 export also passed its four-page review, but this final approval identifies the regenerated artifact and current HTML/source hashes.

All eight printed questions and all eight answer-guide entries were read directly. The final shuffled printed order is W006, W001, W005, W004, W007, W002, W003, W008; the separate answer guide follows that same order. Every calculation, monetary amount, rounding direction, error comparison and conclusion agrees with the independently solved source. Page 1 has questions 1–2, page 2 questions 3–5, page 3 questions 6–8 and page 4 the separate complete answer guide. Each prompt retains all four writing lines on its page. Headers, code labels, operation/currency glyphs, decimals, footers and page numbering are readable. No orphaned line, clipped text, overlap, missing continuation, lost question, mismatched answer or mathematical number broken across lines was observed. This is the actual production PDF, not a visual mock-up or structural-only check.

The reviewer inspected the v18.1 renderer diff: the increased writing allowance applies only to dedicated self-check worksheet tasks whose code is N06–N09 or A01 and whose matching ID has the `-w-` pattern. It does not change mathematical content. The renderer `quiz/assets/worksheet-pdf.js` has SHA256 `1b642d25eebbcd2c4e8051578bdf7cba86b164fa26d2f570ba904f0cd4d69c3f`. Comparison against the previous reviewed worksheet HTML confirms its only subsequent change is the renderer query version, now `18.1-year4-workspace`; the current HTML hash is recorded above.

### Locally generated activity artifacts verified

Root generated the production Practice/Test JavaScript without the `--reviewed` ledger flag for integration checks. The independent reviewer compared all 64 generated items against the reviewed source: complete ordered IDs, question/audio text, all choices, correct indices, structured and combined feedback, difficulty/sequence metadata and visual metadata match exactly. Every rendered model reference and alternative label also agrees. This confirms faithful publication-format conversion after the substantive item review; it is not a replacement for that review.

| Generated local artifact | Count | SHA256 |
| --- | --- | --- |
| `quiz/year-4/math/ac9m4n07/practice/questions.js` | 48 | `9af5e0bb300bd600d5754f0de0f10e4912ba972ffeb5eeb0dd52b67572fc608d` |
| `quiz/year-4/math/ac9m4n07/test/questions.js` | 16 | `06f3facdb590cbc8e220057c1d98b118b0bb8cf7f75a99e72e552b778822f7b7` |

The nine inspected SVGs' sorted `[repository path, SHA256]` pairs, encoded as compact JSON, have aggregate SHA256 `2c0763f66d39ad6735562a8fa2bc590ee43edd5beaca1c83b38dd1ee79f32dbc`. Root separately reports fourteen production-component jsdom integration checks passing, including N07 model MCQs in both modes. Those are local runtime checks, not evidence that the pending bank is already live or independently source-approved. The source HOLD and final deployment/live-layout gates remain in force.
