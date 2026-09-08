# AC9M4N04 independent content review

Status: PASS

Reviewer: `reviewer_fractions` (independent of `author_fractions`). Review date: 8 September 2026 UTC. Scope: one code's bank, all referenced assessment visuals, Topic Guide, Classroom View, worksheet/homework and activity learning support. No bank, publisher, ledger or production branch was modified by this reviewer.

Bank: `assets/assessment-banks/year4/math/ac9m4n04.json`

Bank SHA256: `01c72ae0ff46be34196f04cb979a79fbc1386ea7692f17ad4c7ce24acb12afa2`

## Method and evidence boundary

The reviewer read and independently solved all 64 authored items, including every alternative, keyed answer, explanation, hint, and the eight written/drawing model answers with their adult acceptance criteria. Exact rational-value checks supplement the manual review and found redundant distractors listed below; structural validity and item counts alone are not the basis of judgment. All 19 distinct referenced assessment SVGs were rendered locally at 640×300 and visually inspected, reconciling geometry, quantities, labels, alternative text and keyed responses. These local renders do not replace final live-browser activity/PDF checks by the release integrator.

The supplied `svgSkillrHub-IXL-Research-Log.md` was read first. Its active queue was historical Year 3 English; it did not provide Year 4 Maths approval. Repository AGENTS.md, static architecture v2, long-life curriculum standard and visual policy were read. Official descriptors were independently checked in [QCAA's P–6 v9 sequence](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_p-6_cd_sequence.pdf), page 1, and [Year 4 standards elaborations](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/assessment/ac9_maths_se_yr4.pdf), page 7. The initial client-rendered ACARA website retrieval did not succeed. This was subsequently resolved through the official machine-readable curriculum route documented in `FIRST-FIVE-ACARA-VERIFICATION.md`: the reviewer independently read the descriptor and every linked elaboration directly from the downloaded [April 2024 v9 Mathematics JSON-LD](https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/MAT/export/MRAC/2024/04/LA/MAT.jsonld). The 3,498,203-byte file has SHA256 `4d6b7a01d10517dc97ad709055c62c171b9b90ea33e0d0fc395e9bd2f96e48b1`, independently checked. The current Topic descriptor exactly matches after HTML/whitespace normalisation; all elaborations agree with the earlier QCAA/ESA evidence and the authored coverage map.

## Curriculum coverage audit

N04 requires counting by fractions including mixed numerals, and locating/representing those fractions as numbers on number lines. Its four elaborations were independently read in [ESA Scootle's v9 reproduction](https://www.scootle.edu.au/ec/search?accContentId=AC9M4N04).

| Component | Bank evidence | Resource gate |
| --- | --- | --- |
| Count parts beyond a whole and rename | P006, P010–P018, P026, P030, P037; T002, T005–T006 | Guide/Classroom E1 counts quartered objects beyond one whole |
| Parallel halves, quarters and thirds, with equal positions | P003/P011/P013 thirds; P045 quarter construction; P047 aligned halves/quarters | Guide/Classroom E2 supplies the three aligned lines, also constructed in W04 |
| Mixed/improper names and numberline placement | P007–P013, P017–P019, P026, P033–P034, P040–P047; T001, T005–T007, T013/T015 | Guide/Classroom E3 and nonzero-origin worked example preserve the unit |
| Count tenths and cross whole boundaries | P008, P021, P024, P043/P048; T009 | Guide/Classroom E4 explicitly crosses 10/10 = 1 |

The progression also checks backward counts, nonzero displayed origins, distinguishing tick marks from intervals, identifying the unit across a multi-unit span, and jumps of more than one fractional part. Eight actual drawing/counting tasks preserve “represent” beyond selecting a supplied diagram. No general fraction-operation algorithm or negative-fraction formalism is required.

## Benchmark evidence

The [IXL Australian Year 4 alignment plan](https://au.ixl.com/standards/maths/year-4) was independently inspected as a mapping. The subsequent direct observations by `author_placevalue`, who is separate from the fraction author, are recorded in `FIRST-FIVE-SUPPLEMENTARY-SOURCE-REVIEW.md`. This reviewer critically assessed those observations against the full bank and resources. The researcher actually opened each Learn panel, confirmed its Back to practice controls, read its explanation, inspected its screenshot and verified accepted practice feedback. Hidden/preloaded help is excluded. Parent mode stated that results were not recorded; no new login was needed.

| Observed IXL format | Independently assessed mathematics and comparison | Honest limit |
| --- | --- | --- |
| [O.3 Fractions on number lines](https://au.ixl.com/maths/year-4/fractions-on-number-lines) | Visible help divides 0–1 into two equal intervals and names the midpoint 1/2. Actual practice places a dot at the first of three intervals; 1/3 was accepted, one question/SmartScore 10. Counting spaces within one unit, then counting from the origin, is sound and is tested explicitly by P001/P003/P004/P031 and other authored line items. | One accepted initial proper-fraction question on a zero-origin line; no observed backward, mixed-number or nonzero-origin IXL line stage. |
| [O.17 Identify mixed numbers](https://au.ixl.com/maths/year-4/identify-mixed-numbers) | Visible help separates four whole triangular models from one further third, giving 4 1/3. Rectangle and circle practice models then give 1 2/3 and 1 1/2, both accepted; two questions/SmartScore 19. This correctly preserves the whole and separates whole units from the remainder, matching the demands of authored P006/P037 and the guide’s concrete counting examples. | Two initial model-naming questions, using different shapes. No claim of complete mixed/improper adaptive progression or mastery. |

The observed formats supply a real comparison of interval interpretation and mixed-number model naming. They do not establish complete curriculum coverage by themselves. The bank and resources extend the source sample with ACARA-required forward and backward counts across wholes, improper/mixed renaming, tenths, parallel fraction lines, nonzero displayed origins and actual learner drawings. Each of these extensions has been independently reviewed above and below; they are not attributed to unseen IXL stages. This is sufficient source comparison for the reviewed code, with the limits preserved.

Khan Academy’s [mixed/improper fraction review](https://www.khanacademy.org/math/cc-fourth-grade-math/imp-fractions-2/imp-mixed-numbers/a/mixed-numbers-and-improper-fractions-review) was subsequently inspected by `author_placevalue`, with full rendered definitions, both worked explanations and before/after circle screenshots recorded in the supplementary report. This reviewer assessed the mathematics: 3 4/5 contains three groups of five fifths plus four fifths, giving 19/5; 10/3 contains three groups of three thirds plus one third, giving 3 1/3. The equal-whole regrouping supports ACARA E3 and authored P017/P018/T005/T006, while avoiding the mistake of multiplying the whole-number and proper-fraction parts of a mixed numeral. Its definition includes a numerator equal to the denominator among improper fractions. Two embedded conversion prompts were seen but neither was submitted; no exercise mastery, backward counting, nonzero-line stage or video is claimed. This is supplementary conceptual evidence, with ACARA controlling scope.

## First-pass corrections and disposition

- The original pre-rebuild bank had two correct-valued alternatives (1 and 1 0/2) at P009/P023/T005; independent rational checks confirmed these failures. The replacement bank removes them.
- Initial authored T012 contained two equivalent wrong alternatives 1 1/2 and 3/2. Author replaced 3/2 with 3/4; reviewer re-read the full item and confirmed distinct values and the correct midpoint 2 1/2.
- The initial exact B,D,A,C answer-position cycle was replaced with irregular balanced ordering. Reviewer rechecked 11 keys per position in 44 Practice MCQs and 3 per position in 12 Test MCQs, with all original correct answer texts retained.
- All 19 authored SVGs passed visual review. All 64 authored keys, explanatory calculations, hints and adult response criteria are mathematically sound.

## Resource and activity review

The original Topic Guide and Classroom View were read in full. Defects were sent to the author before rewriting: missing quarter ticks despite an every-interval-is-quarter claim, a thirds activity that asked for 0–3 but stopped at 2, and a “With answers” section without answers. Revised Topic Guide, Classroom View and worksheet/homework content were subsequently read in full and all authored mathematical text passed. The Classroom View reproduces the repaired topic content, including actual answers and an exit ticket. Every new resource SVG was rendered and checked: two for N03, five for N04. The only remaining resource visual check is the browser presentation of the retained CSS models and surrounding layout.

Root-authored practice/test preparation panels were independently read and are mathematically sound: the quarter count 1/2,3/4,1,1 1/4,1 1/2; equal intervals versus tick counts; and inclusion of the mixed numeral whole-number part. The shared review-visual adapter is independently reviewed by `reviewer_placevalue`; its runtime checks remain the integrator's responsibility.

After restoration of the required Classroom example-board/card containers, the entire current Classroom text was re-read. Its seven actual worked-example cards retain the corrected mathematics, all elaborations, important answers, assessment checks and exit ticket. All inline SVGs are byte-identical to the independently inspected Topic Guide models. The direct PDF curriculum-source link was removed only from Classroom navigation; its HTML curriculum references and Topic/report source evidence remain. The Topic Guide’s Classroom instruction was re-read after correction to describe projecting one teaching section at a time, matching the existing expandable panels. The reviewer confirmed a subsequent scoped single-column override on each Classroom example grid, keeping the models full-width. N03’s retained hundredths CSS bar and card/table overflow remain explicit targets for the integrator’s live layout check.

## Every-item review record

The notes below are the reviewer's computations and representation checks. “SVG” means the actual referenced diagram was rendered and visually checked. “Paper” means an adult must inspect the submitted drawing/working; completion alone is not a pass.

| Item | Independently checked result and reasoning | Representation | First-pass result |
| --- | --- | --- | --- |
| AC9M4N04-P-001 | A is at the third of four unit intervals: 3/4. The other numeric choices differ. | SVG | Pass |
| AC9M4N04-P-002 | 3/2 + 1/2 = 2. The four choices are distinct. | Text | Pass |
| AC9M4N04-P-003 | B lies two third-intervals from zero, whereas A=1/3, C=4/3 and D=5/3. | SVG | Pass |
| AC9M4N04-P-004 | Five spaces, rather than six ticks, divide one unit: each is 1/5. | SVG | Pass |
| AC9M4N04-P-005 | 2/3 + 1/3 = 3/3 = 1. | Text | Pass |
| AC9M4N04-P-006 | The diagram has one complete three-part rectangle and two additional thirds: 1 2/3. | SVG | Pass |
| AC9M4N04-P-007 | The origin shown is 1; the first quarter-tick therefore represents 1 1/4. | SVG | Pass |
| AC9M4N04-P-008 | The missing term between 9/10 and 11/10 is 10/10 = 1. | Text | Pass |
| AC9M4N04-P-009 | P lies at five half-intervals from zero: 5/2 = 2 1/2. | SVG | Pass |
| AC9M4N04-P-010 | 7/4 + 1/4 = 8/4 = 2, consistent with the next term 9/4. | Text | Pass |
| AC9M4N04-P-011 | Q is five thirds from zero: 5/3. Denominator 3 measures each whole. | SVG | Pass |
| AC9M4N04-P-012 | Eight intervals of 1/4 total 8/4 = 2. | Text | Pass |
| AC9M4N04-P-013 | The shown origin is 2, so two extra thirds give 2 2/3. | SVG | Pass |
| AC9M4N04-P-014 | 5/2 - 1/2 = 2; the following term is 3/2. | Text | Pass |
| AC9M4N04-P-015 | 3/4 - 1/4 = 2/4 = 1/2. | Text | Pass |
| AC9M4N04-P-016 | 6/3 - 1/3 = 5/3 = 1 2/3; the next term 4/3 confirms the step. | Text | Pass |
| AC9M4N04-P-017 | One complete group of four quarters plus three quarters gives 7/4. | Text | Pass |
| AC9M4N04-P-018 | 8 = 2 × 3 + 2, so eight thirds regroup as 2 2/3. | Text | Pass |
| AC9M4N04-P-019 | C is the third fifth-step after 1: 1 3/5; A,B,D are other positions. | SVG | Pass |
| AC9M4N04-P-020 | The sequence advances by 1/5; after 6/5 comes 7/5 = 1 2/5. | Text | Pass |
| AC9M4N04-P-021 | T is at 1 + 3/10 = 13/10, with ten intervals per unit. | SVG | Pass |
| AC9M4N04-P-022 | Repeated jumps of 2/3 give 2/3, 4/3, 6/3 = 2. | Text | Pass |
| AC9M4N04-P-023 | E is five of eight spaces after zero: 5/8, with no endpoint-count error. | SVG | Pass |
| AC9M4N04-P-024 | 10/10 - 1/10 = 9/10, continuing the backward count across one. | Text | Pass |
| AC9M4N04-P-025 | Two units divided into eight intervals give 2/8 = 1/4 per interval. | SVG | Pass |
| AC9M4N04-P-026 | 7/4 = 4/4 + 3/4 = 1 3/4. Only one proposed pair names the same point. | Text | Pass |
| AC9M4N04-P-027 | Starting at 1, four half-steps add 2 and finish at 3; zero is not the start. | Text | Pass |
| AC9M4N04-P-028 | 2 - 3/4 = 1 1/4; the three landing points in the explanation are correct. | Text | Pass |
| AC9M4N04-P-029 | The missing thirds are 4/3 = 1 1/3 and 7/3 = 2 1/3. | Text | Pass |
| AC9M4N04-P-030 | The fifth quarter is 5/4. Changing the denominator to 5 incorrectly changes the unit. | Text | Pass |
| AC9M4N04-P-031 | Five endpoint-inclusive ticks create four equal spaces: 1/4 per space. | SVG | Pass |
| AC9M4N04-P-032 | 2 1/4 denotes 2 + 1/4, so the additive description is uniquely correct. | Text | Pass |
| AC9M4N04-P-033 | U is midway from 1 to 2 and thus equals 1 1/2, despite line extension to 3. | SVG | Pass |
| AC9M4N04-P-034 | V represents 2 + 2/5 = 12/5. The two unseen wholes still contribute ten fifths. | SVG | Pass |
| AC9M4N04-P-035 | 3 - 1/2 = 2 1/2 and 3 + 1/2 = 3 1/2. | Text | Pass |
| AC9M4N04-P-036 | Three jumps of 3/4 total 9/4 = 2 1/4; intermediate landing 6/4 is correct. | Text | Pass |
| AC9M4N04-P-037 | Three complete rectangles contribute six halves; the extra shaded half makes seven. | SVG | Pass |
| AC9M4N04-P-038 | The two descending fifths after 8/5 are 7/5 and 6/5: 1 2/5, 1 1/5. | Text | Pass |
| AC9M4N04-P-039 | Each successive term differs by 1/2, including crossings of whole numbers. | Text | Pass |
| AC9M4N04-P-040 | 8/4 < 11/4 < 12/4, so the adjacent whole-number bounds are 2 and 3. | Text | Pass |
| AC9M4N04-P-041 | 1 1/3 is one third of the unit interval beyond 1; a third of the entire 0–2 span is different. | Text | Pass |
| AC9M4N04-P-042 | The sequence is 1/5, 3/5, 5/5, 7/5, so the next mixed numeral is 1 2/5. | Text | Pass |
| AC9M4N04-P-043 | 3 - 1/10 = 29/10 = 2 9/10. | Text | Pass |
| AC9M4N04-P-044 | 4/3 = 1 + 1/3, placing it at the first third-tick beyond 1. | Text | Pass |
| AC9M4N04-P-045 | Actual drawing must have eight quarter-spaces across 0–2 and marked positions 3,5,7; 5/4 shares a point with 1 1/4. | Paper | Pass |
| AC9M4N04-P-046 | Actual nonzero-origin drawing needs six third-spaces across 1–3 and correct 5/3,2,7/3 locations; the three-term count is correct. | Paper | Pass |
| AC9M4N04-P-047 | Equal-scale parallel lines place 3/2 and 6/4 together at 1 1/2. Adult criterion checks the drawing, not a completion assertion. | Paper | Pass |
| AC9M4N04-P-048 | Four leftward tenth-jumps from 13/10 land at 12/10,11/10,10/10,9/10. The drawing must extend left of 1. | Paper | Pass |
| AC9M4N04-T-001 | A is three quarters after the shown origin 2, hence 2 3/4. | SVG | Pass |
| AC9M4N04-T-002 | 8/3 + 1/3 = 9/3 = 3; the following 10/3 term is consistent. | Text | Pass |
| AC9M4N04-T-003 | Backward half-count from 3 gives 5/2 = 2 1/2. | Text | Pass |
| AC9M4N04-T-004 | A two-unit span with six equal spaces has step 2/6 = 1/3, not 1/6. | SVG | Pass |
| AC9M4N04-T-005 | 2 3/5 contains ten fifths plus three: 13/5. | Text | Pass |
| AC9M4N04-T-006 | 9 = 4 × 2 + 1, so nine halves regroup as 4 1/2. | Text | Pass |
| AC9M4N04-T-007 | B is the first third-tick after 2 and hence 7/3; all four labelled positions were inspected. | SVG | Pass |
| AC9M4N04-T-008 | 7/4 + 3/4 = 10/4 = 2 1/2. | Text | Pass |
| AC9M4N04-T-009 | 2 - 1/10 = 19/10 = 1 9/10. | Text | Pass |
| AC9M4N04-T-010 | 3/2 + 3 × 1/2 = 3; landing sequence is 2,2 1/2,3. | Text | Pass |
| AC9M4N04-T-011 | Three whole units divided into twelve spaces yield 3/12 = 1/4 per space. | Text | Pass |
| AC9M4N04-T-012 | The midpoint is (2+3)/2=2 1/2. Re-read after replacing duplicate-valued wrong option 3/2 with 3/4; all four alternatives now have distinct values. | Text | Pass |
| AC9M4N04-T-013 | Drawings require nine equal third-spaces, colocated 5/3=1 2/3 and 8/3=2 2/3, and explanation of regrouping without relocation. | Paper | Pass |
| AC9M4N04-T-014 | Five quarter-jumps left from 2 land at 7/4,6/4,5/4,1,3/4; the line must extend left of 1. | Paper | Pass |
| AC9M4N04-T-015 | A 2–3 line divided into fifths places 11/5 and 14/5 at the first and fourth interior ticks. | Paper | Pass |
| AC9M4N04-T-016 | Four jumps each spanning two thirds land at 2/3,4/3,6/3,8/3; mixed forms and nine-space 0–3 line are correct. | Paper | Pass |

## Resource items checked after revision

All five important Q&A answers, all three assessment-style responses, all exit-ticket answers, all worked examples and every elaboration check were independently recomputed. For N03 this includes separate correct 2/5 scale-factor equations,2/3=8/12, fraction/decimal/metre conversions, and array rows/columns. For N04 this includes the complete third-count to 3, nonzero origins, backwards whole crossings, mixed/improper names and the three aligned half/quarter/third number lines. The statements and new SVG geometry agree.

| Written homework item | Independently checked result/evidence | Result |
| --- | --- | --- |
| W01 | Quarter count: 1 3/4,2,2 1/4,2 1/2,2 3/4;2 2/4 accepted. | Pass |
| W02 | Backward thirds: 3,2 2/3,2 1/3,2,1 2/3. | Pass |
| W03 | 5/2 = 2 1/2 and 7/2 = 3 1/2 on a 2–4 line with four equal half-spaces. | Pass |
| W04 | Three aligned lines locate 1 as 2/2 = 4/4 = 3/3. | Pass |
| W05 | 1 6/10 = 16/10 at the sixth tenth-space after 1. | Pass |
| W06 | Four leftward quarter landings: 1 1/4,1,3/4,1/2. | Pass |
| W07 | A 0–2 span divided into ten intervals gives 1/5 per unit interval. | Pass |
| W08 | 10/3 = 3 1/3 at one third beyond 3, between 3 and 4. | Pass |

The dedicated worksheet PDF source was independently read in full. Each of its eight question strings and eight answer/check strings exactly matches the corresponding on-page homework text. Drawing tasks are marked `self-check`; their drawings and explanations must be inspected by an adult. The exact production jsPDF output was then rendered and all three pages for N04 were independently inspected. All eight questions and the answer guide are complete, correctly paired in shuffled order, and mathematically faithful to these source strings. Fractions, mixed numerals, units and the multiplication sign are legible. Working/drawing space is present, with no text clipping or overlap. The local PDF preview passes; the actual live download remains the release integrator's gate.

Inspected exact PDF: `ac9m4n04-homework.pdf`, three pages, SHA256 `3f599826d78fc6c2eaae9fc008a9a32fe7ddbd6b1a40fd66a9ebf1907866b0a0`.

### Inspected resource hashes

- `year4/maths/ac9m4n04-count-by-fractions-including-mixed-numerals-locate-and/index.html` — SHA256 `ed418db5fca25a62490312b4b2714b9f784102a27cac8cddf2146e10abcec937`
- `year4/maths/ac9m4n04-count-by-fractions-including-mixed-numerals-locate-and/teacher-slides/index.html` — SHA256 `51673dc81ef60d05461d44c7fd3ba0593fbe5826d2579d46bef54783abaa8ff9`
- `quiz/year-4/math/ac9m4n04/worksheet/index.html` — SHA256 `accaf536b363536c2a29d2d5c5fd7d702be83bd31e2d60cead285fdbb4a2d923`
- `quiz/year-4/math/ac9m4n04/worksheet/worksheet-questions.js` — SHA256 `7f84245abda6badb814defd2303433bd0d8327037313072f9371378e55d5ee1b`

## Release compatibility re-review

After published release `a329adf8b480`, the reviewer inspected the complete N04 Topic/Classroom diff. The only changes are elaboration markers from `E1.`-style text to bold `E1:`-style text, the Topic QCAA reference URL/label, and a final newline. Numbering and descriptive labels still match the official elaborations. Exact comparison after these transformations confirms that every mathematical statement, question, answer, explanation, SVG and other teaching content is unchanged. The [official QCAA v9 Mathematics landing page](https://www.qcaa.qld.edu.au/p-10/aciq/version-9/learning-areas/p-10-mathematics) was independently opened and confirms the new resource label; it includes the Year 4 v8.4/v9 comparator and Year 4 achievement-standard/content-description links. The current Topic/Classroom hashes above were refreshed. Substantive PASS is preserved; root owns the exact CI rerun and final live checks.

## Final release gate

Independent content/source/PDF review: PASS for the bank hash and resource hashes recorded here. All 64 items, every answer alternative and key, every explanation/hint, eight adult drawing criteria, 19 assessment SVGs, the complete Topic Guide and Classroom View, eight written homework questions/checks, five resource SVGs and all three exact PDF pages have been substantively inspected. Corrections were re-reviewed before approval. Actual IXL sample comparison and official descriptor/elaboration verification are complete within the stated limits.

This content approval is eligible for the review-aware publisher/ledger. The release integrator separately owns real HTML/browser layout, final activity/adult-marking/download behaviour, release integrity, GitHub Actions, Pages and live release checks. These are not claimed as performed by this reviewer and remain required before the release is declared complete. The wider Year 4 Maths badge must remain inactive until every Year 4 Maths code passes its own review.


## Authored preparation compatibility review — 8 September 2026

The reviewer independently read both revised launch panels, their new model captions, alternative labels, SVG references and script order. The reused P001 model was rendered again and inspected: 0 to 1 contains four equal intervals, and A is the third interval after 0, so A = 3/4. Caption and alt label agree. The separate quarter-counting sequence across 1, equal-unit guidance and adult drawing checks remain sound.

The shared quick-read helper now recognises the explicit authored-preparation marker only for N01–N09/A01 and the two stated reviewed bank versions, retaining the existing brand/card styling and approved teaching section. Both launch pages load the versioned helper after the activity script and before PWA registration. This static content/integration reading does not substitute for root’s load-order and live browser checks. No bank question, key or assessment SVG was changed by this compatibility fix.

Current wrapper identities (launch files changed; result/review content previously reviewed):

- `quiz/year-4/math/ac9m4n04/practice/index.html` — SHA256 `491fb348cc5176524622bb00b9b1b76a1ae9ebfef85875b8491581e4651bb923`
- `quiz/year-4/math/ac9m4n04/practice/result/index.html` — SHA256 `390e7ceb989d5e741d8ccfe90cecca692c8844ce3fcc0cf637cf219c046575c8`
- `quiz/year-4/math/ac9m4n04/practice/review/index.html` — SHA256 `197a604ec6c55af7d7f01b154b6eb46076483edbdabb47718e7de501af42af78`
- `quiz/year-4/math/ac9m4n04/test/index.html` — SHA256 `7b0d75933fc89f71a5f236f7796aeae25b1b769705656a85d45240e2358ee361`
- `quiz/year-4/math/ac9m4n04/test/result/index.html` — SHA256 `4f0ca0e0a571dfa7bfdb9e46a59b06408e84f6c383000832ba90e9aee45aba78`
- `quiz/year-4/math/ac9m4n04/test/review/index.html` — SHA256 `bc6f2be816489d0552bf3919967e090b1095ea98c423d841a9ae42f0fdd28e48`
- `assets/year4-maths-practice-quick-read.js` — SHA256 `d5daa920f8a39eaae76a9643ef637c1234b00222e5f5bcfe8a79d209185aa5ed`
