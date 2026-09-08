# AC9M4N02 independent content review

Status: PASS

Reviewer: `/root/reviewer_number`, separate from author `/root/author_number`.
Batch: first five Year 4 Mathematics codes, owner-directed full-resource review.
Initial repository baseline: `f79990bbe92c926e99d1cd01e83ce79a67e23e3b`.

## Independent source and coverage audit

The reviewer retrieved `/workspace/scratch/b2c91567ebe4/research/svgSkillrHub-IXL-Research-Log.md` first and read its active section. Its active queue concerns earlier Year 3 English research; it supplies no completed Year 4 Mathematics benchmark. Repository `AGENTS.md`, static curriculum architecture v2 and the long-life content standard were read.

The [QCAA official v9 P–6 Mathematics content sequence](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_p-6_cd_sequence.pdf), page 1, was independently opened. The code requires explaining and applying odd/even properties, not recognition alone.

The [Education Services Australia / Scootle v9 code page](https://www.scootle.edu.au/ec/search?accContentId=AC9M4N02) was independently retrieved with all four elaborations. Their demands are mapped below.

| Required strand | Evidence needed in final resources |
| --- | --- |
| Final digit and pairing | Explain why the ones digit determines odd/even status; include zero accurately |
| Equal sharing | Relate sharing between two people to pairs and a possible leftover, with indivisible objects clearly specified |
| Operation patterns and checks | Apply and explain addition, subtraction and multiplication patterns; distinguish ruling out a wrong answer from proving an answer correct |
| Decision algorithm | Follow an actual flowchart with branches to identify an even subset / numbers divisible by two |

Subtraction tasks must stay within whole-number results. A division result cannot be assigned a universal parity merely because both inputs are even. An example is evidence of a case; a general pairing/array argument is needed for an always-claim.

## Baseline findings supplied to the author

- Baseline Practice had 24 items, Test 16. Both recycle three stem families: recognition, odd-plus-odd and odd-times-odd.
- Context prefixes add reading without mathematical purpose, and explanations are generic.
- Assessment visuals are generic reasoning pathways, not pairing or operation models.
- Topic Guide Important questions use generic prompts instead of exact expected answers.
- The guided activity asks for models of 13, 14 and 15, but displays a generic even-number picture.

## Bank review method and correction log

The reviewer read and solved all 48 Practice and 16 Test items in `assets/assessment-banks/year4/math/ac9m4n02.json`, including every answer alternative, keyed result, summary, hint and visual description. Numerical results and general arguments were checked independently, not accepted because the key matched a validator.

Corrections sent to the author:

1. P001: the distractor “It is odd: every pair has two counters” combines two true statements despite failing to explain oddness. Require an explicitly false distractor so the broad stem has one valid response.
2. P002: equal shares of seven with two left over are possible under the original wording. Require sharing all sixteen with none left over.
3. P040: the summary incorrectly names the “first set” although the keyed set is elsewhere and runtime answers shuffle. Name `14, 26, 38, 50` explicitly; clarify whole-object sharing.
4. P046: specify a positive even counter total before removing one, preserving the whole-number boundary.
5. T016: two distractors repeat the same certainty misconception; a distinct wrong rationale is preferable.

All five corrections were re-read in their complete item context. A second check caught the missing word “equally” in P040's first repair; the final stem now explicitly requires equal sharing of whole objects with none left over. The revised alternatives and summaries are unambiguous. Subsequent sections record the completed teaching-resource and source-evidence reviews.

Final reviewed bank SHA256: `50b62d0d645ef942f050fab73b10cf1998d94865b74ae32e5a8e807beeaaefdd`.

## Per-item solution record

IDs below have prefix `AC9M4N02-`. A Pass includes the stem, all alternatives, answer, summary and hint; referenced models are checked in the visual audit below.

| Item | Independently checked answer and reasoning | Verdict |
| --- | --- | --- |
| P-001 | 13 is odd: six complete pairs and one leftover | Pass after correction |
| P-002 | All sixteen split into two groups of eight, no remainder | Pass after correction |
| P-003 | 13 tens make complete pairs; six ones also pair | Pass |
| P-004 | 4 307 alone ends in an odd digit | Pass |
| P-005 | 0, 28, 104, 730 all even, including zero | Pass |
| P-006 | Two groups of zero leave no remainder | Pass |
| P-007 | 21 − 10 − 10 leaves one whole apple | Pass |
| P-008 | Adding one to 18 gives odd 19; other changes preserve pairs | Pass |
| P-009 | The leftover from each odd collection makes a new pair | Pass |
| P-010 | 248 + 136 = 384; paired collections make an even sum | Pass |
| P-011 | 157 + 263 = 420; odd plus odd is even | Pass |
| P-012 | 24 + 15 = 39; one leftover remains | Pass |
| P-013 | 35 + 48 = 83; other proposed sums are even | Pass |
| P-014 | 9 + 5 = 14 is a direct counterexample with two odd addends | Pass |
| P-015 | Four odd addends form two even pair-sums | Pass |
| P-016 | Two odd addends make even, then the third makes odd | Pass |
| P-017 | 604 − 218 = 386; removing complete pairs preserves evenness | Pass |
| P-018 | 351 − 127 = 224; odd removed from odd leaves even | Pass |
| P-019 | 420 − 137 = 283; even minus odd is odd | Pass |
| P-020 | 325 − 104 = 221; removing pairs preserves the leftover | Pass |
| P-021 | Vertical partners pair all fourteen counters in two rows of seven | Pass |
| P-022 | Six groups of eight each contain complete pairs; product 48 | Pass |
| P-023 | Three groups of five leave three singletons, then one; product 15 | Pass |
| P-024 | 17 × 9 = 153; every other choice includes an even factor | Pass |
| P-025 | 246 + 178 = 424, so odd 423 is impossible | Pass |
| P-026 | 83 − 27 = 56, so odd 55 is impossible | Pass |
| P-027 | 18 × 7 = 126; an even factor rules out odd 127 | Pass |
| P-028 | 36 + 28 = 64; even 62 passes parity but fails exact calculation | Pass |
| P-029 | An odd addend is necessary with odd 37 for an even sum | Pass |
| P-030 | An even hidden factor, including zero, is necessary with an odd factor | Pass |
| P-031 | An odd amount removed from an even total gives an odd result | Pass |
| P-032 | Consecutive whole numbers always include one even factor | Pass |
| P-033 | 582 ends in 2: Yes branch to Even | Pass |
| P-034 | 741 ends in 1: No branch to Odd | Pass |
| P-035 | 340 and 682 pass the even-digit decision; 209 and 515 do not | Pass |
| P-036 | Yes must lead to Even and No to Odd for the given digit test | Pass |
| P-037 | One counter left after removing pairs means the original total was odd | Pass |
| P-038 | 8, 6, 4, 2, 0 follows every removal and the stopping condition | Pass |
| P-039 | 10 000 ends in zero; other choices end in odd digits | Pass |
| P-040 | 14, 26, 38, 50 alone are all divisible by two | Pass after correction |
| P-041 | Changing thousands leaves final digit 9 and oddness unchanged | Pass |
| P-042 | Two odd-sized collections combine into complete pairs | Pass |
| P-043 | 4 × 5 = 20 refutes the claim that every multiple of five is odd | Pass |
| P-044 | Complete in-range list is 102, 104, 106, 108, 110 | Pass |
| P-045 | Any number of even-sized collections has an even total | Pass |
| P-046 | Even → odd → even for removing then restoring one available counter | Pass after correction |
| P-047 | 12 ÷ 2 = 6 and 10 ÷ 2 = 5 demonstrate both possible half-parities | Pass |
| P-048 | 28 + 46 = 74 must be even; all other choices equal odd 75 | Pass |
| T-001 | Eight complete pairs establish that sixteen is even | Pass |
| T-002 | 8 065 is odd; the other totals share exactly as whole counters | Pass |
| T-003 | 900 forms complete pairs and the last two ones form another pair | Pass |
| T-004 | 39 + 57 = 96; the two leftovers complete a pair | Pass |
| T-005 | 164 + 237 = 401; the other three proposed sums are even | Pass |
| T-006 | 506 − 183 = 323; even minus odd is odd | Pass |
| T-007 | 715 − 293 = 422; other differences are odd | Pass |
| T-008 | 24 × 13 = 312; one even factor is sufficient | Pass |
| T-009 | 7 × 9 = 63 supplies two odd factors and an odd product | Pass |
| T-010 | 482 + 156 = 638; parity rejects 637 without identifying the exact answer | Pass |
| T-011 | Odd unknown plus even 58 is necessary for an odd total | Pass |
| T-012 | 6 905 ends in 5: No branch to Odd | Pass |
| T-013 | Complete retained list is 0, 94, 120; zero must be included | Pass |
| T-014 | 11, 9, 7, 5, 3, 1 reaches the correct stopping point | Pass |
| T-015 | Five odd addends leave one odd addend after forming two even sums | Pass |
| T-016 | 42 + 36 = 78; matching the parity of 80 does not prove its value | Pass after refinement |

## Visual audit

All six distinct SVG assets were rasterised and visually inspected at 960 × 450 pixels, displayed in two readable contact sheets. Geometry, counts, labels and alternative text were checked against every referencing question. This is direct inspection of the actual artwork; source-coordinate checks were only supporting evidence.

| SVG under `assets/assessment-visuals/year4/math/ac9m4n02/` | Items | Visual conclusion |
| --- | --- | --- |
| `pairs-13.svg` | P001 | Six boxed pairs plus one unboxed counter; count, grouping and alt text agree |
| `pairs-16.svg` | P002, T001 | Eight complete boxed pairs; all sixteen visible |
| `join-5-7.svg` | P009 | Separate collections show two/three pairs and one leftover each |
| `two-rows-7.svg` | P021 | Two aligned rows of seven allow one-to-one vertical pairing |
| `three-groups-5.svg` | P023 | Three separate boxes each contain five counters; total fifteen |
| `parity-flow.svg` | P033–P035, T012 | Complete decision, Yes/No branches and correct Even/Odd results; labels fit and remain legible |

The SVGs provide mathematical information rather than decorative generic prompts. Colour is reinforced by grouping and position. Alternative text describes the same model without changing the mathematical information available visually.

## Topic Guide and Classroom View substantive review

The complete changed Topic Guide and matching Classroom View content were independently read, including every model, guided activity, Important question and expected answer, quick check, misconception correction and support/core/extend guidance. The six Classroom model cards preserve all reviewed examples.

| Teaching content | Independent conclusion |
| --- | --- |
| Nine-counter pairing model | Four complete pairs and one leftover establish oddness; tens contribute complete pairs, explaining why the ones digit determines parity. |
| Addition and multiplication table | 8 + 12 even; 7 + 9 even; 7 + 12 odd; 6 × 5 even; 5 × 7 odd. Pair/group explanations justify general claims beyond the individual numerical examples. |
| Two odd groups | Pair the two single leftovers while keeping all existing pairs; any two odd whole-number collections therefore combine to an even total. |
| Subtraction table | 18 − 6 = 12 even; 17 − 5 = 12 even; 18 − 5 = 13 odd; 17 − 6 = 11 odd. Pair removal and breaking a pair are accurately distinguished. Results remain whole numbers. |
| Decision flowchart | 354 follows Yes to Even; 731 follows No to Odd. The even filter on 0, 18, 25, 42 retains 0, 18, 42, with zero correctly included. |
| Checking calculation answers | 62 + 28 = 90. Parity rejects 89, but does not prove the even candidate 88 correct. |
| Guided activity 1 | 13 = six pairs + one; 14 = seven pairs; 15 = seven pairs + one. Diagram and explanation agree. |
| Guided activity 2 | Odd + odd gives even; odd + even gives odd; even + even gives even. Each is explained with leftovers, not only guessed from a few examples. |
| Guided activity 3 | 4 382 + 7 915 = 12 297 odd; 326 × 47 = 15 322 even; 9 999 − 624 = 9 375 odd. |
| Important question 1 | 5 706 is even because the ones digit 6 and all higher place-value groups are fully pairable. |
| Important question 2 | Odd + odd is even because its two leftovers form another pair. |
| Important question 3 | 37 × 25 is odd because an odd number of odd groups has one leftover after pairing. |
| Important question 4 | Any whole number of fully pairable even-sized groups remains even, including zero groups. |
| Important question 5 | 101 − 48 = 53 odd; removing 48 removes exactly 24 complete pairs and preserves the single leftover. |
| Quick checks | 347 odd; 5 + 7 = 12 even with a pairing explanation; 3 × 6 = 18 even with grouped reasoning. |
| Misconceptions and extension | First-digit misconception corrected using 3 482; odd × odd remains odd; a single example is not a general proof; subtraction patterns and whole-number boundaries are sound. Division is not given a false universal parity rule. |

The three SVGs reused in teaching resources were directly inspected in the bank visual audit. The Classroom View now loads the existing scoped model stylesheet and retains the complete six examples in numbered, single-column cards. Source counts and pairing labels in the legacy CSS model were checked. Browser layout inspection remains an explicitly delegated root release gate, not a claimed reviewer observation.

Both Practice and Test help sections were re-read after the reviewer-requested refinements. Zero is stated to be even; odd + odd is explained with pairs; generalisation is supported by a pairs/rows explanation followed by examples; an even result does not imply that both inputs were even. All revised help passes.

## Worksheet/homework substantive review

All eight dedicated written tasks and model answers were independently solved. The HTML question list and answer guide match all eight JavaScript records exactly. Each record's `modelAnswer`, `correct` and `explanation` values agree. All reviewer-requested substantive wording corrections were rechecked in context.

| Worksheet item | Independently checked answer and reasoning | Verdict |
| --- | --- | --- |
| W-001 | 19 counters make nine pairs and one leftover, so the collection is odd. | Pass |
| W-002 | Thousands, hundreds and tens form complete pairs; eight ones add four pairs, so 2 408 is even. | Pass |
| W-003 | Maximum equal whole-pencil shares from 27 are 13 each with one left. The revised stem explicitly requires the same number for each child. | Pass after correction |
| W-004 | 46 + 28 even, 35 + 47 even, 35 + 28 odd, with full-pair and leftover explanations. | Pass |
| W-005 | 74 − 26 = 48 even; 75 − 27 = 48 even; 74 − 27 = 47 odd; 75 − 26 = 49 odd. Revised model answers describe each removal, including breaking a pair and preserving a leftover. | Pass after correction |
| W-006 | 8 × 7 = 56 even; pair eight groups into four groups of fourteen. 5 × 9 = 45 odd; five within-group leftovers make two pairs and one leftover. | Pass after strengthened explanation |
| W-007 | Yes → Even; No → Odd. Even: 0 and 286; odd: 151 and 403. The answer explains zero as two equal empty groups. | Pass |
| W-008 | 54 + 32 must be even, rejecting 85. Matching parity of 84 does not prove correctness; exact sum is 86. | Pass |

The PDF skill was used for read-only inspection of all four pages of the actual production-generator export `ac9m4n02-homework.pdf`. All eight shuffled questions and the matching answer guide were read directly. The final equal-sharing, subtraction and multiplication refinements are present in this export. The reviewer also freshly rendered the current PDF with Poppler to confirm the exact final artifact. Text, operation symbols, writing space, headers, footers and page numbers are legible with no clipping or overlapping answer-guide entries. The answer guide remains separate from student questions. This is actual jsPDF output from the unchanged production renderer and repository fonts, not a mock-up.

Inspected worksheet source SHA256: `ab79f4dcada1e17854af592da8129ab9541ee59ae4a896b90fa511106932ce53`.
Inspected PDF SHA256: `53fc6c5eadaf47bf195e237fd9dd25413ebca88ce9af810dd2527587ae72c16b`.

## Actual IXL comparison and evidence limits

The reviewer read the number author's complete source report and challenged its initial C3 sample: accepted subtraction and division alone did not establish an actual addition/product comparison. Researcher `/root/author_placevalue`, separate from the N02 bank author, supplied [supplementary live observations](FIRST-FIVE-SUPPLEMENTARY-SOURCE-REVIEW.md) that close this gap. The reviewer read the full N02 table, recomputed its arithmetic and compared its teaching patterns with the completed resources. Browser observations below are attributed to those researchers; this reviewer did not personally control the final IXL pages.

| Relevant IXL page | Verified observation and reviewed comparison |
| --- | --- |
| [C.1 Even or odd: counting objects](https://au.ixl.com/maths/year-4/even-or-odd-counting-objects) | The supplementary researcher visibly reopened help, confirmed Back to practice controls and inspected twenty ovals in two rows of ten, with the beginning of the paired solution visible; the full explanatory text was read. The bank author separately inspected an eighteen-object paired example and a singleton practice entry. The singleton answer attempt was never confirmed and is not counted as accepted. SkillrHub accurately uses complete pairs and a possible leftover as the explanatory basis. |
| [C.2 Identify even and odd numbers](https://au.ixl.com/maths/year-4/even-or-odd) | The supplementary researcher visibly reopened a worked classification of 4, with the five even and five odd final digits, and inspected the full panel screenshot. The bank author's earlier three accepted two-digit classification questions reached SmartScore 28. This supports an efficient final-digit test; SkillrHub adds the independently checked base-ten justification, zero and larger numerals required for complete coverage. |
| [C.3 Even or odd: arithmetic rules](https://au.ixl.com/maths/year-4/even-or-odd-arithmetic-rules) | The supplementary researcher visibly opened an 11 × 9 worked example with all four product-parity cases, predicted odd, and checked 99. Actual accepted questions in that visit were 55 ÷ 11 = 5 odd, 53 + 24 = 77 odd, and 3 × 6 = 18 even, reaching three questions/SmartScore 28. These distinct practice questions add actual addition and mixed-parity multiplication to the bank author's earlier subtraction/division visit, which had two accepted questions/SmartScore 19. |

All three worked-help panels were revalidated visibly with confirming controls and screenshot inspection, removing uncertainty about hidden preloaded DOM text. The recorded C1 screenshot does not claim that the whole paired solution was simultaneously on screen. Counts belong to separate visits; they are not presented as one uninterrupted adaptive progression. No complete mastery, later-stage range, zero practice question or flowchart task is falsely attributed to IXL.

The observed IXL sequence moves from concrete pairability to numeral recognition and arithmetic classification. SkillrHub preserves that useful progression and adds the official explanatory demand: pairs/rows justify the rules, counterexamples reject universal mistakes, and matching parity is explicitly distinguished from exact correctness. The inspected division task explicitly permits a whole-number quotient; it does not establish a false universal even÷even rule. Division remains a bounded misconception check, not an additional core requirement. The finite observed sample is sufficient for this bounded format/explanation comparison; ACARA and the exhaustive content review establish authored coverage.

| ACARA component | Reviewed authored coverage |
| --- | --- |
| Explain the final-digit rule | P003–P006, P039, P041; T002–T003; base-ten grouping model and W002 |
| Equal sharing between two | P001–P002, P007–P008, P021; T001–T002; paired collections and W001/W003 |
| Addition, subtraction and multiplication patterns; check answers | P009–P032, P042–P048; T004–T011, T015–T016; all four subtraction cases, product/group reasoning and W004–W006/W008 |
| Follow a branching algorithm to identify an even subset | P033–P040; T012–T014; actual Yes/No flowchart, worked trace/filter, pair-removal algorithm and W007 |

Khan Academy is a useful supplementary source across this first-five batch, not a substitute for the official descriptor. The reviewer located a relevant visual parity lesson and arithmetic-pattern article, but did not inspect their full lesson bodies; these candidates are not recorded as completed Khan comparisons. No N02 judgment depends on unseen Khan content, and the absence of a separate N02 Khan observation is not treated as a content blocker.

## Final artifact checkpoint and decision

| Reviewed resource | SHA256 |
| --- | --- |
| Topic Guide `year4/maths/ac9m4n02-explain-and-use-the-properties-of-odd-and-even-numbers/index.html` | `bdee83fef553eb519a5c37e857edbf714a1366c6d9c75d5f72eb4c46bbb1398a` |
| Classroom View `year4/maths/ac9m4n02-explain-and-use-the-properties-of-odd-and-even-numbers/teacher-slides/index.html` | `cbf3cd15f683ed1c270a4ffa669f78a72a83828cef1630ee95fe456f9d9f0c45` |
| Worksheet page `quiz/year-4/math/ac9m4n02/worksheet/index.html` | `e0d88abbeaa27cae176fe72446332774fbadef704360298b37ec40495aea331f` |
| Worksheet data `quiz/year-4/math/ac9m4n02/worksheet/worksheet-questions.js` | `ab79f4dcada1e17854af592da8129ab9541ee59ae4a896b90fa511106932ce53` |

The six SVGs' sorted `[repository path, SHA256]` pairs, encoded as compact JSON with no whitespace, have aggregate SHA256 `146a21efdc5e10cfa9e237429355e435863ff846d2840aec6019cd9aeb99a1c7`.

The Topic Guide's inaccurate fixed-slide-deck promise was corrected and rechecked: it now describes expanding Classroom View sections to project models and worked examples. All 64 assessment items, all six SVGs, all changed teaching mathematics, all eight written tasks and all four PDF pages pass substantive review. There are no unresolved content blockers.

Signed: `/root/reviewer_number`, independent content reviewer, 2026-09-08. Approval is for the reviewed source, content and artifact checkpoint. Root retains the explicit live HTML layout, activity functionality, review-aware publisher/ledger, release integrity and post-publication verification gates; this report does not claim those deployment checks have already happened.
