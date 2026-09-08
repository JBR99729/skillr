# AC9M4A01 independent review

Status: HOLD

Reviewed: 8 September 2026. Reviewer: `reviewer_placevalue`, separate from author `author_placevalue`. All 64 questions, 12 SVGs, companion teaching resources, worksheet/PDF and scoped wrapper copy have passed the substantive checks recorded below. Final code approval remains on HOLD because actual A01 IXL worked examples/questions and the Khan supplement have not yet been inspected.

Scope: AC9M4A01 only, including every final Practice/Test stem, choice, key, explanation, hint and visual; Topic Guide, Classroom View, worksheet/homework and scoped wrapper teaching copy. Root owns publishing, the review ledger and release/live gates.

## Required research log and current status

The reviewer retrieved and read the current top of `svgSkillrHub-IXL-Research-Log.md`. It is the historical Year 3 English active queue, followed by archived Science work. It contains no completed AC9M4A01 source comparison or approval. The owner's current Year 4 Maths batch governs this work.

AC9M4A01 is absent from `data/content-verification-status.json` at this audit. Existing published activities are not treated as reviewed content.

## Independently verified official scope

The official descriptor is: “find unknown values in numerical equations involving addition and subtraction, using the properties of numbers and operations”.

Primary source: [ACARA Mathematics v9 JSON-LD, April 2024 release](https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/MAT/export/MRAC/2024/04/LA/MAT.jsonld), downloaded by root through the official machine-readable curriculum route. Full-source SHA256: `4d6b7a01d10517dc97ad709055c62c171b9b90ea33e0d0fc395e9bd2f96e48b1`. The reviewer independently read the descriptor and all four elaborations in the downloaded Year 4 extract, located their complete statement nodes in the primary JSON-LD, and verified that all five descriptions match exactly. Linked-reference stubs were excluded from that comparison.

| Official elaboration | Meaning independently checked | Required teaching and assessment evidence |
| --- | --- | --- |
| E1 | Addition can be reordered without changing its total, demonstrated with materials, diagrams and number lines, including three addends. | Reorder two and three addends; find useful known groups; explain why a matching total is preserved. A model must show the actual quantities. |
| E2 | Uniform units and balance scales model equivalent addition/subtraction sentences and help determine an unknown. | Interpret equality as equal values, including an operation on each side; solve missing quantities and check both sides. Use a genuine balance or equivalent-unit model. |
| E3 | Relational reasoning explains true addition/subtraction equations; number lines can show a common difference. | Judge and justify equivalence, identify an incorrect change, preserve a sum or difference appropriately, and show equal distances on a number line. Do not reduce this to evaluating isolated answers. |
| E4 | Part-part-whole diagrams and bars explain the inverse relationship of addition and subtraction. | Find missing parts and wholes, identify the role of a subtraction unknown, and use a related addition/subtraction fact to solve and verify the result. |

The reviewed bank must vary missing addend, total, minuend, subtrahend and difference; place the unknown on either side of the equals sign; include operations on both sides, regrouped addition, genuine contexts, explanation choices and error repair. Formal algebraic manipulation, negative-number arithmetic, inequalities and multiplication/division equations are not required as core A01 content. Friendly whole-number examples can expose the relationship without unnecessary calculation or reading burden. Zero-valued unknowns should be handled correctly when used.

Addition's commutative property must not be attributed to subtraction. A constant sum requires compensating changes in opposite directions; a constant difference requires the same change to both compared quantities. Adding or subtracting an equal amount on both sides of an equation is a separate equality-preserving relationship. Explanations must keep these ideas distinct.

## Existing-resource audit

Baseline bank: `assets/assessment-banks/year4/math/ac9m4a01.json`, SHA256 `75536ae9c823d5ef8a495f9dbc86ddcf1ffd3b1a51d3991fabfee0c10dafedd0`.

- The baseline contains 24 Practice and 16 Test items. All 40 alternate between a missing first addend and a missing subtrahend. The `balanced_equations` skill label does not correspond to an actual two-sided expression-balancing task.
- Every item has three choices. Only two generic summaries and two generic hints are used throughout. They do not work through each item's numbers or distinguish the roles of different subtraction unknowns.
- Short location prefixes do not create meaningful mathematical contexts. The totals and differences increase mechanically while the underlying demand remains the same.
- The 40 SVG symbols are generic Represent → Reason → Check pathways. They do not show the quantities, equality, bar relationships or number-line distances needed for this code.
- The Topic Guide contains useful seeds worth preserving: the missing-addend example `348 + □ = 725`, the missing minuend `□ − 286 = 439`, the missing subtrahend `900 − □ = 347`, friendly grouping in `38 + □ + 62 = 145`, and balancing `125 + □ = 80 + 90`. These need specific complete reasoning and real models.
- The official elaboration text currently exposes raw `\square` and `\space` sequences to readers. Native mathematical characters and accurate E1–E4 labels must be retained in the corrected static teaching content.
- The Classroom View flattens tables/models into long strings and repeats generic instructions. Important questions lack specific answers. Actual reviewed examples should use the existing `example-board` and `example-card` containers.
- The worksheet route imports the Practice bank and asks the shared renderer to sample eight items. A dedicated set of written tasks should assess model construction and explanation as well as calculation.
- The Topic Guide describes a fixed slide deck although the current Classroom View uses expandable sections. Its flow description should match the actual existing resource.
- The Practice/Test wrapper sections labelled Worked example and Common mistake contain generic study instructions. Root was asked to replace these with a concrete A01 example and a specific unknown-role or equality misconception; final wording remains to be reviewed.

These findings and the complete coverage criteria were sent to the author before draft completion. Existing resource shells, URLs, free access and same-code links are to be preserved.

## Supplementary-source work

IXL: author research is pending. Seven relevant pages have been identified by the author; identification is not accepted as actual-page evidence. Final review requires visibly opened worked examples/help, real questions and accurately bounded progression observations. The previous N05 hidden/preloaded-panel issue must not recur in the evidence claims.

Khan Academy: primary search located [Missing number for 3-digit addition within 1000](https://www.khanacademy.org/math/cc-third-grade-math/imp-addition-and-subtraction/imp-addition-and-subtraction-missing-value-problems/v/missing-number-for-addition-and-subtraction-within-1000) and [Missing number for 3-digit subtraction within 1000](https://www.khanacademy.org/math/cc-third-grade-math/imp-addition-and-subtraction/imp-addition-and-subtraction-missing-value-problems/v/missing-numbers-in-three-digit-subtraction). Web opens returned no lesson body. No explanation, transcript, animation or exercise inspection is claimed yet; a browser window has been requested from root for this missing evidence.

## Independent item review

The reviewer independently solved all 64 authored items and read every answer choice, summary and hint. Each has one correct response to its exact stem, including P017's specified first-two-addends constraint and T015's general statement about a shared unknown. No wrong key or multiply correct choice was found. The text is proportionate to Year 4, and the bank now covers the missing roles and relational reasoning absent from the baseline. All eight referenced question SVGs have now been independently rendered and inspected, as recorded below.

P035 clarity repair completed: its extra list of false-equation value pairs followed a different order from the displayed choices. The author removed the unnecessary list and retained the correct explanation of the two totals of 52. The reviewer read the repaired summary and unchanged hint back; both pass. The repair avoids references to option letters because the application shuffles answers.

| Item | Independently established answer and reasoning | Verdict |
| --- | --- | --- |
| P-001 | A: both expressions have value 25; equality compares values. | Text PASS |
| P-002 | A: 18 + 27 = 45. | Text PASS |
| P-003 | D: 73 − 28 = 45; the result may appear on the left. | Text PASS |
| P-004 | A: 61 − 36 = 25; 36 + 25 = 61. | Text PASS |
| P-005 | D: 80 − 48 = 32. | Text PASS |
| P-006 | C: the removed 26 and remaining 47 form the whole 73. | Text PASS |
| P-007 | A: 90 − 38 = 52 removed. | Text PASS |
| P-008 | D: 64 − 29 = 35, despite the reversed equation layout. | Text PASS |
| P-009 | D: 75 − 33 = 42. | Text PASS |
| P-010 | C: adding zero preserves 56. | Text PASS |
| P-011 | B: subtract zero to preserve 83. | Text PASS |
| P-012 | C: 18 − 18 = 0. | Text PASS |
| P-013 | D: reordering 28 and 17 preserves the sum. | Text PASS |
| P-014 | A: the same three addends need 9; both totals are 29. | Text PASS |
| P-015 | B: 38 + 62 = 100, leaving 46 to reach 146. | Text PASS |
| P-016 | B: 7 + 4 reaches 11, matching 4 + 7. | Text and visual PASS |
| P-017 | A: only 67 + 33 + 8 places the hundred-making pair first. | Text PASS |
| P-018 | A: decreasing one addend by 1 and increasing the other by 1 preserves 50. | Text PASS |
| P-019 | B: subtraction gives its numbers different starting/removed roles. | Text PASS |
| P-020 | C: 49 + 25 = 48 + 26 = 74. | Text PASS |
| P-021 | D: 14 uniform counters on each side require 6 beside the known 8. | Text and visual PASS |
| P-022 | B: 50 + 23 = 47 + 26 = 73. | Text PASS |
| P-023 | D: 61 + 24 = 85, and 85 − 38 = 47. | Text PASS |
| P-024 | C: 80 + 90 = 170, and 170 − 125 = 45. | Text PASS |
| P-025 | A: 70 − 23 = 68 − 21 = 47. | Text PASS |
| P-026 | B: 85 − 27 = 58, so 95 must lose 37. | Text PASS |
| P-027 | C: 72 − 18 = 54; the missing whole is 54 + 36 = 90. | Text PASS |
| P-028 | D: 53 + 17 = 70, so 94 must lose 24. | Text PASS |
| P-029 | A: 120 − 45 = 75, and 75 − 28 = 47. | Text PASS |
| P-030 | C: 83 − 19 = 64, and 64 − 26 = 38. | Text PASS |
| P-031 | C: increasing 215 by 10 requires decreasing 178 to 168. | Text PASS |
| P-032 | C: 31 − 12 = 36 − 17 = 19; both endpoints shift right by 5. | Text and visual PASS |
| P-033 | D: reducing both numbers by 4 preserves the difference 35. | Text PASS |
| P-034 | B: subtracting 47 is subtracting 40 and then 7. | Text PASS |
| P-035 | B: the addition totals are both 52; false comparisons are 16/18, 16/17 and 52/51. | PASS after feedback repair |
| P-036 | B: increasing both numbers by 2 preserves the difference 36. | Text PASS |
| P-037 | D: 92 − 37 finds the missing part 55. | Text and visual PASS |
| P-038 | A: increases of 4, 50 and 3 total 57. | Text and visual PASS |
| P-039 | D: 124 replaces the box in 124 − 48 = 76. | Text PASS |
| P-040 | B: removed 35 plus remaining 62 gives the whole 97. | Text PASS |
| P-041 | C: 38 + 27 = 65; the proposed 92 instead produces 119. | Text PASS |
| P-042 | A: 58 removed plus 147 remaining gives 205 books initially. | Text PASS |
| P-043 | B: $125 − $68 = $57 more needed. | Text PASS |
| P-044 | C: 156 + 37 = 193 points for the greater score. | Text PASS |
| P-045 | A: 84 − 29 = 55 seedlings given away. | Text PASS |
| P-046 | C: both ribbon totals are 65 cm, requiring 25 cm beside 40 cm. | Text PASS |
| P-047 | B: 68 + unknown = 150 and 150 − 68 = unknown express the same missing part 82. | Text and visual PASS |
| P-048 | D: the missing part is 80 − 46 = 34. | Text PASS |
| T-001 | A: 95 − 37 = 58. | Text PASS |
| T-002 | C: 48 removed plus 86 remaining gives the whole 134. | Text PASS |
| T-003 | C: 140 − 75 = 65 removed. | Text PASS |
| T-004 | D: 26 + 74 = 100, leaving 63 to reach 163. | Text PASS |
| T-005 | A: reordering 29 and 18 preserves the total 47. | Text PASS |
| T-006 | B: 16 uniform counters on each side require 4 beside the known 12. | Text and visual PASS |
| T-007 | B: 90 − 36 = 86 − 32 = 54. | Text PASS |
| T-008 | D: 120 − 28 = 92, leaving the missing addend 45 beside 47. | Text PASS |
| T-009 | B: compensate for +10 by reducing the other addend to 79; total 226. | Text PASS |
| T-010 | B: reducing both numbers by 5 preserves the difference 45. | Text PASS |
| T-011 | D: the unknown part is 185 − 79 = 106. | Text and visual PASS |
| T-012 | C: substitute 62 only into the box: 108 − 62 = 46. | Text PASS |
| T-013 | C: before gaining 38, the player had 97 − 38 = 59 points. | Text PASS |
| T-014 | D: both teams finish on 128, requiring a gain of 40 from 88. | Text PASS |
| T-015 | A: any shared whole-number value preserves the sum when addends are reordered. | Text PASS |
| T-016 | A: the removed part is 54, checked by 83 − 54 = 29. | Text PASS |

## Independent visual review

All 12 distinct new SVGs were independently rendered with CairoSVG at their native 640 × 300 size and visually inspected in two contact sheets. This includes all eight question models and all four Topic/Classroom teaching models. The reviewer counted each uniform-counter group, checked number-line coordinates and equal scales, verified proportional part/whole lengths, and read every label. No clipping, overlapping labels, wrong counts, broken mathematical glyphs or misleading scale was found. The 100/103 labels in P038 and the shift labels in P032 are separated clearly after the author's layout correction. All bank alternative texts and all SVG titles/descriptions agree with their models.

| Model | Independent mathematical/visual conclusion |
| --- | --- |
| `guide-commute.svg` | PASS: jumps 5 then 2 and 2 then an unknown 5 share a 0–7 scale and finish; E1 is represented accurately. |
| `guide-balance.svg` | PASS: 6 + 8 counters balance unknown + 10; all known dots are individually countable and equal in size, and the expression matches the displayed group order. |
| `guide-difference.svg` | PASS: intervals 14–27 and 4–17 each span 13 units on identical 0–30 scales. |
| `guide-bar.svg` | PASS: known part 348 and unknown part 377 make whole 725; widths are proportional and the whole bracket spans both parts. |
| `p016.svg` | PASS: 4 + 7 and 7 + unknown 4 finish at 11 on identical scales. |
| `p021.svg` | PASS: 5 + 9 known counters balance 8 + unknown 6; dot counts and level scale agree. |
| `p032.svg` | PASS: 12–31 and 17–36 are equal 19-unit gaps; both endpoints translate right by 5 with correct corresponding arrows. |
| `p037.svg` | PASS: a proportional bar has whole 92 and known part 37, leaving 55. |
| `p038.svg` | PASS: proportional jumps 46→50 (+4), 50→100 (+50), 100→103 (+3) total the missing addend 57. |
| `p047.svg` | PASS: whole 150, part 68 and unknown 82 form an accurate proportional inverse-relationship model. |
| `t006.svg` | PASS: 9 + 7 known counters balance 12 + unknown 4; all displayed dots were counted. |
| `t011.svg` | PASS: whole 185 and part 79 leave 106, with accurate proportions and labels. |

Reviewed bank-content snapshot after the P035 correction: `aee81c5064fc81ea4bb6e2f940515607b35361cd9ad2a12f2078c54b7be90b2e`. This records completed question review, not final source/resource approval.

| Reviewed SVG artifact | SHA256 |
| --- | --- |
| `assets/assessment-visuals/year4/math/ac9m4a01/guide-balance.svg` | `b07d456c8164d11cf2b81876e62567efcb82fffeedeb2bd1fdd242a7d27792d3` |
| `assets/assessment-visuals/year4/math/ac9m4a01/guide-bar.svg` | `2f8ed4e42b21754bea62e33fa56714e46e4e1dcb185e2adb28f003e7bc81c4fc` |
| `assets/assessment-visuals/year4/math/ac9m4a01/guide-commute.svg` | `4b2ba6be8741a6e5ace09c678694b8af4d8a0289dda08cb2082c6f8e3946d00e` |
| `assets/assessment-visuals/year4/math/ac9m4a01/guide-difference.svg` | `3c49856b4f40c814a4c83f483ecad7ecb18baa12d9b2d9ffb2008cf4ea9ca82b` |
| `assets/assessment-visuals/year4/math/ac9m4a01/p016.svg` | `a4513309de895c3b5ef9cad682a6342fe06b2d5987768c323db37aeff3c52019` |
| `assets/assessment-visuals/year4/math/ac9m4a01/p021.svg` | `59758ecc0ff10918681ee6e6dfaf3c078a0c94e28dbb15a36f85f3ecc9e5494b` |
| `assets/assessment-visuals/year4/math/ac9m4a01/p032.svg` | `ad3d576f82e4e26bb452a0eb2276e036281fbbcf781f67eef41adf9ad6cedfe8` |
| `assets/assessment-visuals/year4/math/ac9m4a01/p037.svg` | `fc9587f030f790d6fd70a13eeb21ab374c5778ed740c2b31adf6da7059e862f1` |
| `assets/assessment-visuals/year4/math/ac9m4a01/p038.svg` | `e37653a631cf6d48ab4f85d19ce9d2a4549a611bf4b644d5885eba6c859faaa4` |
| `assets/assessment-visuals/year4/math/ac9m4a01/p047.svg` | `26588bde1255e54d42d5ec3a6e428f98659a545384d93416d8f71443035133ea` |
| `assets/assessment-visuals/year4/math/ac9m4a01/t006.svg` | `e35905db00e0608933e7df9a44a80a8d159fc4611b814f9208f1d72c3ee9f8b9` |
| `assets/assessment-visuals/year4/math/ac9m4a01/t011.svg` | `4bb609ceadeb924f0fe0eb5f600ed2ce0f6c26d5d32d2a92a3ee87d38f57835f` |

## Companion-resource and homework review

The reviewer independently read the complete Topic Guide and Classroom View, including every definition, worked calculation, question, answer, misconception, support prompt and extension. All six worked examples and four guided-activity article texts were compared with their Classroom copies and match. The four actual guide-image alternatives accurately describe the reviewed models. All original strong example numbers were retained with specific reasoning.

| Teaching component | Independently solved result and conclusion |
| --- | --- |
| Worked example 1 | PASS: whole 725 minus known part 348 gives 377; the decomposition through 425 is correct. |
| Worked example 2 | PASS: unknown roles give 54, 725, 553 and 44; substitution checks are correct. The zero cases give 0 and 18 for different reasons. |
| Worked example 3 | PASS: 5 + 2 = 2 + 5; all orders of 2, 2, 3 total 7; grouping 38 and 62 leaves 45 in the retained 145-total equation. |
| Worked example 4 | PASS: 6 + 8 = 4 + 10; 125 + 45 = 80 + 90 = 170. Equal removal gives totals 12. The correction now specifies removal from groups 8 and 9 as one valid choice and accepts other valid group choices. |
| Worked example 5 | PASS: both original gaps are 13; 74 − 38 = 76 − 40 = 36; the one-endpoint counterexample gives 23; compensating addition changes preserve 50. |
| Worked example 6 | PASS: count-on increases 3, 30 and 3 total 36, agreeing with 63 − 27 and the substitution check. |
| Guided activities 1–4 | PASS: constructed groups and jumps preserve 7; balanced removal preserves 12; translated intervals preserve 13; grouping gives 60, and the proposed 72/82 values produce 120/130 respectively. |
| Questions, answers and exit check | PASS: all eight specific Q&A entries match their equations. Exit results are 82 as the starting whole, 23 as the compensating addend, and the equal difference 25. |
| Support and extension | PASS: small uniform-counter models reduce calculation load; the shared-box extension accepts both 5 and 42 and correctly generalises to any shared whole-number value. |

The author repaired the ambiguous balance-removal example after independent feedback. The inherited US row's NGSS/ELA wording and irrelevant NGSS source link were also removed from this Maths resource; the other mapping and metadata structure was preserved. The current flow description accurately names the expandable Classroom View.

The Classroom's six genuine example cards now use a scoped single-column grid, and horizontal figure margins were removed in both copies to preserve model width. These are static layout checks, with no changed mathematics, SVG bytes or shared CSS. Root retains actual HTML browser layout verification.

| Written worksheet item | Independently established response |
| --- | --- |
| W001 | PASS: two labelled journeys from 0 to 13 show 8 + 5 and 5 + 8. |
| W002 | PASS: the initial unknown is 4; one valid equal-removal result is 9 + 4 = 4 + 9. The answer guide explicitly accepts other valid removals of exactly 2 from each side. |
| W003 | PASS: whole 112 has parts 46 and 66; 112 − 46 = 66 and 46 + 66 = 112. |
| W004 | PASS: first box 122 is the whole; second box 37 is the removed part. Both checks give 122 − 37 = 85. |
| W005 | PASS: gaps 16–39 and 21–44 both have length 23; every endpoint increases by 5. |
| W006 | PASS: 47 + 53 = 100, leaving the missing addend 68. |
| W007 | PASS: 87 + unknown = 96 + 34 = 130, so the later collection is 43 cans. |
| W008 | PASS: 71 + 28 = 72 + 27 = 99; increasing both addends instead produces 101. |

Every worksheet question, correct-response string and explanation in `worksheet-questions.js` was compared with the static HTML and matches. Four tasks require model construction; they are separate written tasks using the existing supported self-check interface, with four writing lines each.

Root regenerated the actual homework PDF with the reviewed production renderer v18.1 and actual repository fonts. The reviewer independently viewed all four final rendered pages at native size: the first three contain all eight tasks in shuffled order W007, W001, W005, W008, W004, W006, W002, W003; the fourth contains all eight matching answers and explanations. Every drawing task retains its prompt and all four writing lines on the same page. All boxes, subtraction marks, text, writing areas and footer/page numbers are readable. No wrong answer mapping, clipped text, split writing block, overlap or broken glyph was found. Final PDF SHA256 was independently confirmed as `2256796add510e0835478ce72628aeed31b2fdde8b0c4889cf19e02e8553c079`. This supersedes the earlier v18 PDF inspection and verifies offline generation/output, without claiming that a browser download was clicked.

The narrow v18.1 pagination fix also passes independent code review. Its exact code allowlist N06–N09/A01, matching `curriculumCode`, `self-check` type and anchored worksheet-ID pattern apply to the intended 36 written model tasks; the four A01 text tasks retain the previous allowance. These 40 dedicated tasks have no additional visual content that needs extra reservation. The new 46 mm allowance is exactly the existing 3 mm paragraph gap plus four 9 mm writing rows plus 7 mm end gap; the 5.93 mm stem-line estimate safely rounds up the actual 5.92704 mm line height. Other questions retain 28 mm and images retain the existing 60 mm preflight. A syntax check and direct evaluation of the actual guard passed for all five eligible codes and 44 negative scope cases, including wrong codes, mismatched curriculum, other question types and malformed/cross-purpose IDs. All five dedicated worksheet URLs use the new query version. For A01, reverting that query alone reproduces the previously reviewed HTML hash, establishing that its text and questions did not change. The bank and source HOLD are unchanged.

| Reviewed bank/resource artifact | SHA256 |
| --- | --- |
| `assets/assessment-banks/year4/math/ac9m4a01.json` | `aee81c5064fc81ea4bb6e2f940515607b35361cd9ad2a12f2078c54b7be90b2e` |
| `year4/maths/ac9m4a01-find-unknown-values-in-numerical-equations-involving-addition/index.html` | `a8de39e6a9da1a1d750fef64c533473ff62663009487fcdb7554013efc1f26e9` |
| `year4/maths/ac9m4a01-find-unknown-values-in-numerical-equations-involving-addition/teacher-slides/index.html` | `7b072033216c0d9b8b5d60eab0ae6cfe9a5976f4dc027be50dc6bcd8fb77ca90` |
| `quiz/year-4/math/ac9m4a01/worksheet/index.html` | `25696185da836a776ed8ff0ef1bfe992c28ecf6f0e37d48775a7d5ae5f216124` |
| `quiz/year-4/math/ac9m4a01/worksheet/worksheet-questions.js` | `675cf3db04bd50cb8c29f4caabce94cf071a58677be8264d04860009940923be` |
| `quiz/assets/worksheet-pdf.js` (v18.1) | `1b642d25eebbcd2c4e8051578bdf7cba86b164fa26d2f570ba904f0cd4d69c3f` |

## Scoped wrapper teaching review

The reviewer independently read the final root-authored preparation text on both launch pages and the matching Unit focus text on both result/review pages. All six are accurate. The worked comparison distinguishes `□ − 28 = 46`, where the missing whole is `46 + 28 = 74`, from `74 − □ = 46`, where the missing part is `74 − 46 = 28`. Both substitutions correctly give `74 − 28 = 46`. The equality explanation, inverse relationship, addition's commutativity and qualification that subtraction cannot generally be reversed are suitable for this code. The misconception advice addresses choosing an operation from the unknown's role instead of always subtracting the two visible values.

Static adapter review: the code-path match in `reviewed-number-visuals.js` was extended only from N01–N05 to N01–N09 and A01. Its saved-attempt bankVersion, question ID, prompt, explanation and correct-answer checks remain intact, as does its code-specific SVG path restriction. Both A01 review pages load the bank, generic review renderer and adapter in the correct order. Their `data-bank-version` agrees with both launch configurations at `20260908-year4-second-five`. This is a static review; root retains browser interaction and integration verification. The later Quick Read guard was also independently inspected: the approved code/version plus explicit authored marker preserves the static preparation and existing branding. Both launch pages load the helper before PWA code. Their single model reuses reviewed P016, with matching accessible text and the correct caption that 4 + 7 and 7 + 4 both finish at 11. Complete launch copy was re-read after this change; both pages pass at the refreshed hashes below.

Local integration follow-up: root generated the next five question files without `--reviewed`. The reviewer independently inspected the adapter/validator diff and ran `node scripts/validate_year4_review_models.mjs`, which passes. The allowlist adds only N06–N09 and A01; the new tests require matching models for those five codes and reject unsupported A02. The retained N04-model-on-N06-route check now also exercises cross-code source isolation. Saved ID, version, prompt, explanation and correct-answer checks, malformed/missing-data handling, and traversal/external-source rejection remain intact. Root separately reports 14 passing actual-runtime cases, including MCQ/result/model flow and N08/N09 adult-review states; those were not rerun by this reviewer.

The only new changes to A01's two launch wrappers are the production-question UI script includes. Removing those exact includes reproduces each previously reviewed full-file hash, confirming that no teaching text/model/configuration changed. The wrapper hashes below were refreshed. The bank remains `aee81c5064fc81ea4bb6e2f940515607b35361cd9ad2a12f2078c54b7be90b2e`; A01 is still absent from the review ledger, and the source HOLD is unchanged. This integration pass is not curriculum/source approval.

Reviewed integration identities: `quiz/year-4/math/reviewed-number-visuals.js` SHA256 `f75860be9c493f3c465030856c7f2db19a1f8052c0dd0fb8e1e007aebeeb6834`; `scripts/validate_year4_review_models.mjs` SHA256 `32883c4c31bc1d46141e44e4b7984b019d4723f235d25b9a00fbce2fadcacc6a`.

| Reviewed wrapper | SHA256 |
| --- | --- |
| `quiz/year-4/math/ac9m4a01/practice/index.html` | `77cbe043a82c046f2df1baabc7e8a822ef90db529dfa225064b9929c6575b7f9` |
| `quiz/year-4/math/ac9m4a01/practice/result/index.html` | `861c39be1e35e8fa244c004209cf7ecabf2ba70c750d146faefbf66b6230d8df` |
| `quiz/year-4/math/ac9m4a01/practice/review/index.html` | `93d6995ad2902df9d49952fa53c5b2b0817d4d899c42a4ca67f8047f33e58595` |
| `quiz/year-4/math/ac9m4a01/test/index.html` | `ccf1fa25d4db2bc96a2c7076b9ab653bdfff13114d0e64cddc5ced0261c7e667` |
| `quiz/year-4/math/ac9m4a01/test/result/index.html` | `de43a551fa3bd231c3dbf698f30a3450dab37a07cb46003be2e7c532ee37dd15` |
| `quiz/year-4/math/ac9m4a01/test/review/index.html` | `05259a1133ccda4f8f90f81aae77b008d0af9523b3d23a50fd2d7dc92c0b84ad` |

## Coverage conclusion and remaining gates

The reviewed content now covers the complete descriptor and E1–E4: unknowns in different roles and positions, equal expressions, uniform-unit balance, two/three-addend reordering and grouping, unchanged sums and differences, number-line reasoning, inverse bars, checks, errors and meaningful contexts. The written tasks add construction and explanation that multiple choice cannot establish. Counts and static structure are supporting checks, not the basis of these substantive verdicts.

The source gate remains open. The author must inspect the actual relevant IXL worked examples/help and representative questions, with truthful progression limits. The independent Khan candidates also require a real lesson/transcript read. Browser infrastructure recovery is pending; no new A01 lesson observation or accepted task is inferred from a timeout or a catalogue listing.

Before changing the code verdict to PASS, compare the final source observations with the authored scope and re-review any resulting changes, then confirm the exact bank/resource identities above. Root retains review-aware publication, the ledger, complete-base release integrity, Actions, Pages and live activities. No subject-wide badge approval follows from this single code or batch.
