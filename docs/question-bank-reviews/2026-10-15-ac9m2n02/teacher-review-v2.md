# AC9M2N02 independent candidate teacher/curriculum QA

Date: 15 October 2026. Reviewer: independent agent `/root/teacher_review_n02`; orchestration model identified by parent as `gpt-6-astra`. This is model teacher/curriculum QA, not a human teacher review or classroom validation.

Target: `JBR99729/skillr`, `skillr-dev`, static website quiz runtime. Reviewed exact candidate version `20261015-ac9m2n02-research-v2`, SHA-256 `712ff75fa91980adeca324ca6994560cc3728f923c09560957890faf252238ca`. Reviewed all 46 candidate records, all 40 legacy prompts/options/explanations and the disposition ledger, current append-only research record, bank standard, relevant AGENTS rules and QA reference standard.

**Verdict: FIX REQUIRED before integration.** All candidate numerical keys and displayed model-answer equalities are mathematically correct. Material visual wording/neutrality and prompt/marking inconsistencies must be corrected and rechecked. Actual rendered assets, player behaviour, grading/progress and device layouts are NOT reviewed by this report; those remain the later independent tester stage.

## Findings

| ID | Severity | Exact affected scope | Finding and required correction |
|---|---|---|---|
| N02-TQA-01 | Material | P-EX09, T05, T10, T14 | Each visual is labelled “Parts of the same number” although its two displayed quantities are unequal. This contradicts the assessed comparison (57/48; 612/620; 45/36; 809/89). Use a neutral comparison label, with no answer/verdict. Check associated accessible labels too. |
| N02-TQA-02 | Material | P-EX08 | Visual “1 hundred = ? tens” uniquely cues the correct option's unit pair before evaluating quantities. Replace with an answer-neutral starting quantity/model or remove this selective cue; preserve 684 and the three trade options if desired. |
| N02-TQA-03 | Material blueprint alignment | P-EX06 | 586 = 5H + ?T + 6O asks for the ordinary tens count only. It does not perform the planned alternative-name missing-part exchange from B06/I03 and largely repeats standard partitioning. Adapt the existing mathematics to require a genuine non-standard missing part/exchange. Recompute and recheck the exact revision. |
| N02-TQA-04 | Material access/response consistency | All 16 adult-review items: P-PN02/06/07/10, P-EX09/10, P-ZR03/06/10, T04/05/06/10/12/14/15 | Every completion label asserts work was done “on paper or with blocks,” but oral responses are explicitly supported. Use a modality-neutral label accepting telling/showing the work to the adult. Preserve required construction for construction items: oral description alone must not silently replace a requested model. No completion tick may auto-certify correctness or mastery. |
| N02-TQA-05 | Material prompt/rubric agreement | T10 | Adult marking requires value/model justification; the student prompt asks only “Is the trade equal? Repair it.” Make the explanation requirement explicit in the prompt so the rubric does not penalise an unrequested response component. |
| N02-TQA-06 | Material valid-answer acceptance | T06 | “4 tens and 7 ones, because 10 ones equal 1 ten” fully answers the prompt. The acceptanceNote additionally requires both totals to be stated as47. Accept valid conservation reasoning without an unnecessary total calculation, or explicitly ask for both totals. |
| N02-TQA-07 | Material review-record accuracy | Legacy P-016 and T-011 dispositions | P-016 uniquely determines435: the after-state is4H2T15O, with4H3T5O before the trade. Unspecified starting tens/ones do not make it ambiguous. Correct the archive rationale, or adapt the useful reverse reasoning. Legacy T-011 has two mathematically correct options:7H14T2O and7H142O both842. Record that the new constrained numeric item repairs this ambiguity, rather than only saying a generic representation improvement. |
| N02-TQA-08 | Required approval dependency | Shared teaching/scaffold used by candidate | Exact scaffold is described in the handoff but is not in the reviewed candidate artifact. Supply the actual text/model specifications before integration: block values, usual grouping versus valid10+ nonstandard groups, meaning of complete tens, response/adult-review expectations, and any H/T/O abbreviations retained in feedback. Check a concrete model of nested tens before its first independent use. This is not approval of absent material. |

Non-blocking refinements:

- All `misconception` fields repeat hints rather than name likely errors. Record actual internal error targets (for example, counting a rod as1; omitting the existing6 ones; concatenating14 tens). Do not infer a specific misconception from one wrong answer.
- P-EX05/07, P-ZR09, T05/09/16 use compact H/T/O notation in feedback. Expand it for children unless the reviewed scaffold explicitly teaches it. “Contributes” in P-PN06 and “distinguish” in P-ZR09's hint can be simplified without lowering mathematical demand.
- The legacy archive contains a useful positive-error-check task P-020 (a nonstandard form is already correct), and all-ones conversion tasks P-007/P-023. The new bank supports these ideas through open alternatives and complete-tens reasoning, but does not explicitly request all-ones conversion or a positive diagnostic verdict. Consider these for future expansion; no padding is necessary for the accepted46-item scope.
- Most Test items use new data while retaining taught response structures. T02/T03/T04/T07/T11 are close parallel forms of Practice formats. This is acceptable as independent data within a taught assessment but is not evidence of novel task families. No exact candidate Practice/Test question or numerical stimulus-and-answer duplication was found. Do not claim that every Test item has a fundamentally different reasoning method.

## All-item independent solution and specification review

IDs below abbreviate `AC9M2N02-V2-`. PASS means content/specification is sound subject to shared scaffold and later actual-player validation. Where an open item is otherwise PASS, its shared completion-label finding N02-TQA-04 still applies. All listed evidence IDs were matched to the saved inspected-source ledger; all visual counts/values were checked against the prompt and key. No external source task was newly inspected in this review.

| Item | Independent answer / invariant | Item-specific outcome |
|---|---|---|
| P-PN01 |6T4O=64; three blanks6,4,64 |PASS;6 rods and4 ones exact. |
| P-PN02 |8T3O=83; any nonnegative10t+o=83 model with labels |PASS; construction retained; open alternatives correct. |
| P-PN03 |2H3T6O=236;2,3,6,236 |PASS; model counts exact. |
| P-PN04 |400+70+2=472 |PASS; ordered H/T/O request makes expected fields clear. |
| P-PN05 |9+600+20=629 |PASS; rearranges whole parts, not digits. |
| P-PN06 |3H6T4O=364; any equal model and matching equality |PASS; copied numeral correctly insufficient. |
| P-PN07 |6T8O and5T18O both68; require distinct labelled pairs |PASS; classroom sticks context and valid alternatives. |
| P-PN08 |Options148,238,338; only index1 equals238 |PASS; plausible mis-exchanges, correct explanation. |
| P-PN09 |61 complete tens and5 leftover ones=615 |PASS; nested tens distinction correct; scaffold dependency. |
| P-PN10 |3H15T1O=451; other differently grouped equal names valid |PASS; explanation/construction demand retained. |
| P-EX01 |10O=1T and1T=10O |PASS;10-unit stimulus matches both exchange facts. |
| P-EX02 |10T=1H and1H=10T |PASS;10 rods correctly worth100. |
| P-EX03 |76=6T16O |PASS; existing6 ones correctly retained. |
| P-EX04 |267→1H16T7O; answer16 tens |PASS; no confusion with26 complete tens in entire amount. |
| P-EX05 |2H14T3O=3H4T3O=343 |PASS; chart counts valid nonstandard quantities. |
| P-EX06 |586=5H8T6O |FIX TQA-03; numerical answer right, intended exchange absent. |
| P-EX07 |2H9T24O=3H1T4O=314 |PASS; two-stage explanation conserves314. |
| P-EX08 |1H↔10T preserves100; other trades lose9 or90 |FIX TQA-02; unique correct option index2 but visual cues it. |
| P-EX09 |4T8O=48≠57;4T17O=57 |FIX TQA-01; open repair rubric appropriately broad. |
| P-EX10 |1 box14 bundles6 loose=246;2 boxes4 bundles6 loose valid |PASS; other packings meeting fewer10 bundles accepted. |
| P-ZR01 |4H0T6O=406;4,0,6,406 |PASS; empty tens preserves hundreds digit. |
| P-ZR02 |3H2T0O=320 |PASS; model and supplied320 consistent. |
| P-ZR03 |7H0T0O=700 |PASS; model required, both empty usual places identified. |
| P-ZR04 |6+0×10+400=406 |PASS; reordered parts and unit count0 clear. |
| P-ZR05 |530=5H3T0O |PASS; zero loose ones. |
| P-ZR06 |5H2O=502, not52;5 changes from500 to50 |PASS; model counts exact, explanation required. |
| P-ZR07 |704=70T4O |PASS; complete versus separate tens explained. |
| P-ZR08 |3H10T9O=409 |PASS; whole ten group becomes fourth hundred. |
| P-ZR09 |400 has tens digit0 and40 complete tens; index0 |PASS; all options evaluated, other two false. |
| P-ZR10 |600=60T or5H10T;usual6H0T0O |PASS; includes positive tens, both zero meanings and alternatives. |
| T01 |4H6T3O=463;4,6,3,463 |PASS; model counts exact. |
| T02 |825=800+20+5 |PASS; field order follows requested H/T/O. |
| T03 |4O3T7H=734 |PASS; parts reordered correctly. |
| T04 |9T2O and8T12O=92; all distinct10t+o=92 pairs valid |PASS; no false unique example answer. |
| T05 |6H12O=612;5H12T=620;not equal |FIX TQA-01; criterion valid and appropriately requires both totals as asked. |
| T06 |3T17O→4T7O;both47;exchange10O↔1T |FIX TQA-06; correct answer but rubric over-requires stated total. |
| T07 |4H19T2O→5H9T2O=592 |PASS; one hundred correctly added. |
| T08 |842=7H14T2O |PASS; numeric blank removes legacy multi-answer flaw. |
| T09 |2H7T34O→3H0T4O=304 |PASS; combined trades create empty tens place. |
| T10 |3T15O=45;2T16O=36;2T25O=45 repairs |FIX TQA-01/05; alternative equal repairs accepted correctly. |
| T11 |8H0T3O=803 |PASS; block count exact. |
| T12 |640=6H4T0O;ones place empty |PASS; usual model required; alternative model must connect to it. |
| T13 |2H20T7O=407 |PASS; no separate tens after regrouping. |
| T14 |809=8H9O;89=8T9O;zero marks empty tens |FIX TQA-01; mathematical explanation sound. |
| T15 |560=56T0O;zero marks no loose ones |PASS;5H6T0O alone correctly insufficient for only-tens request. |
| T16 |7H3T1O→5H23T1O=731 |PASS; both hundred exchanges retained. |

## Whole-bank judgment

The candidate contains30 Practice (10 per PN/EX/ZR) and16 Test (5PN/6EX/5ZR), preserving the higher legacy Test count. Methods include model reading, construction, symbolic composition/decomposition, part rearrangement, multiple representations, missing parts, unit renaming, error diagnosis/repair and explanation. Response types are16 fill-blank,11 number,3 single-choice and16 adult-review tasks. Each Practice focus has easy/medium/difficult items and at least one short familiar context. Only3 questions use options, with correct authored positions1,2,0; semantic shuffle mapping remains a tester concern.

The bank stays within accepted two-/three-digit Year2 scope. No arithmetic algorithm, four-digit core, fabricated source observation, or invented next-year Stretch has been added. The separately stated lack of next-year research means this review approves no Stretch product claim. The accepted static website core scope is distinct from adaptive-app serving specifications.

The open tasks preserve construction and reasoning considerably better than the legacy recognition-only bank. Acceptance notes generally allow valid alternatives and distinguish requested usual grouping from any mathematically valid grouping. Adult review must remain a pending/explicit review state, never automatic correctness for arbitrary typed text or a learner checkbox. Any runtime that collapses these tasks to auto-correct completion would invalidate this educational approval.

Vocabulary is broadly suitable with introduced unit names and adult reading support. Necessary words include hundreds, tens, ones, parts, numeral, grouping, trade/exchange, rename and complete tens. Avoid presenting H/T/O compression or abstract terminology without the reviewed scaffolds. No claim is made that every Year2 child independently decodes all text.

Legacy preservation/adaptation is generally purposeful: replaced recognition items have numeric, construction or explanation responses and changed IDs protect historical attempts. Correct the two inaccurate/incomplete dispositions in TQA-07. Archive retention must be an internal history record, not an assertion that all old items passed current QA.

## Recheck boundary

Supply revised exact candidate/hash and exact scaffold specification. Recheck findings plus directly affected mathematical, language and visual fields; unchanged PASS records retain this review. Do not integrate as teacher-approved until material findings close. Actual browser pixels, accessible descriptions, controls, answer shuffling, adult review, marking, progress and learner/tutor isolation remain the subsequent independent tester gate.

## Correction recheck 1

Reviewed candidate SHA-256 `79b77c3075f862fb76b7921362e7e0b27bd20d315226b5d75212c989e30d7886`, same candidate version string, with exact teaching text now supplied.

- TQA-01 CLOSED: P-EX09/T10 use “Check the two amounts”; T05 “Compare the two names”; T14 “Compare the two numerals”. No equality verdict is supplied by the labels.
- TQA-02 CLOSED: P-EX08 now specifies6 flats,8 rods,4 ones=684 with neutral “Starting collection” label. The trade options/key remain mathematically correct.
- TQA-03 CLOSED: P-EX06 now requests586=4H+?T+6O; independently recalculated18 tens. Prompt, parts specification, key and explanation agree, and a nonstandard equal-name exchange is now required.
- TQA-04 CLOSED at specification level: all16 open completion labels now say “I have completed the task and shown or told a grown-up my answer.” Required construction/explanation acceptance notes remain intact. Runtime correctness behaviour remains to be tested.
- TQA-05 CLOSED: T10 explicitly requests explanation of why the repaired name preserves the amount.
- TQA-06 CLOSED: T06 now accepts valid4T7O conservation reasoning, with calculation of47 optional.
- TQA-07 CLOSED: both legacy dispositions corrected accurately; P-016 recognised as determinate435 and T-011 explicitly records both previously correct options.
- TQA-08 PARTLY CLOSED: exact scaffold unit key, abbreviations, six notes and examples41/165/203 reviewed. All mathematics and terminology are sound:41=4T1O=3T11O;165=1H6T5O=16T5O;203=2H0T3O=20T3O. Remaining dependency: attach an exact countable nested-tens teaching model specification (for example the165 transformation) to ground complete tens concretely before independent tasks. Text-only equivalences and question-mark parts do not establish that visual requirement. No request is made to redraw every question.

Verdict remains FIX REQUIRED solely for the remaining concrete teaching-visual specification dependency. All other original material findings are closed at candidate-specification level; actual runtime gates remain pending.

## Correction recheck 2

Reviewed candidate SHA-256 `fd1784ed441fdcd6f3c88dc5ab78bfbafc5d8e0203780bcc7b89ef8292a4380a`.

TQA-08 CLOSED at specification level. New `teaching.nestedTensModel` specifies1H6T5O before and0H16T5O after; both total165. Caption describes opening the hundred into10 tens and retaining6 tens and5 ones. This is a teaching demonstration, so displaying its correct endpoint is appropriate. Actual countability, placement before independent nested-unit tasks and pixels remain tester checks.

All46 current keys and explanations were reread after the broad feedback/metadata edit. Numerical meanings remain correct. Actual misconception fields now identify meaningful error targets rather than repeat hints. One metadata refinement: T15 should refer to the zero ones place in560, not a zero tens digit.

New minor copy regressions from mechanical abbreviation expansion were sent for correction: P-EX07 “1 tens”; T16 “1 ones”; missing commas/conjunctions and excess spaces in expanded P-EX05/07, P-ZR09, T05/09/16 explanations; missing numeral-adjacent spaces in the teaching caption (“into10”, “the6”, “and5”, “make165:16”). These do not change the mathematics but should not ship in Year2 teaching copy. Await exact final corrected hash for certification.

## Final targeted recheck and candidate approval

Final exact candidate version: `20261015-ac9m2n02-research-v2`.

Final exact candidate SHA-256: `21cef9c153337ab45820d94aa1e72b65c5e8027b7f100e65d871d2e69ef6a52f`.

Rechecked the six revised student explanations, nested-model caption and T15 internal error target. Commas, conjunctions and singular forms are now correct; caption uses normal word/number spacing; no mathematical meaning changed. T15 now names the empty ones place correctly. All material findings TQA-01 through TQA-08 are CLOSED at candidate-specification level.

**Final verdict: APPROVED FOR BANK INTEGRATION of this exact46-item candidate and its reviewed teaching specifications.** The all-item review plus recorded targeted rechecks covers every final item; unchanged content retains the initial review. Original core scope, counts30P+16T, answer criteria, open-task alternatives, visual count specifications and evidence mappings remain approved. No candidate changes were made by this reviewer.

Approval does not certify a built bank, actual rendered image, automatic marking, adaptive serving, saved progress, deployment or production release. The implementation must preserve the reviewed mathematical tasks and adult-review criteria, render the specified models and show the nested-tens teaching model before independent nested-unit assessment. Independent tester QA must now inspect the actual built student/teacher experience and confirm, in particular, that open responses are never automatically marked correct merely by typing or ticking completion. Educationally meaningful implementation changes return to teacher review.

This remains independent model review, not human teacher sign-off or classroom validation. Optional future variety refinements above are not unresolved defects or a reason to extend the agreed current scope.
