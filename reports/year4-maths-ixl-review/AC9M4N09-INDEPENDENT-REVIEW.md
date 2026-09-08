# AC9M4N09 independent content review

Status: HOLD — all 64 authored items, 10 assessment visuals, the complete authored resource content and all 5 final PDF pages pass substantive independent review. Actual source comparison and root-owned live integration remain open.

Bank SHA256: `928252b5993ed5d17d3abad77728f3b7bcf11501e4eb934ec27cc880917a249b`

Reviewer: `reviewer_fractions`, independent of `author_fractions`. Date: 8 September 2026 UTC. This is a saved review checkpoint, not publication approval. The reviewer edits only independent reports and review artifacts, never the production bank, publisher or ledger.

## Official scope independently verified

The retrieved `svgSkillrHub-IXL-Research-Log.md` was read before the review workflow and checked again for this batch. It contains historical Year 3 English evidence, not N09 approval. Current repository AGENTS.md was read; the ledger records only AC9M4N01–N05 among Year 4 Maths codes. Static architecture, long-life content and visual-policy instructions were read earlier in this review session and remain applicable.

The reviewer read the descriptor and all three linked elaborations directly from the downloaded [official April 2024 v9 Mathematics JSON-LD](https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/MAT/export/MRAC/2024/04/LA/MAT.jsonld), whose provenance is documented in `FIRST-FIVE-ACARA-VERIFICATION.md`. Full source SHA256: `4d6b7a01d10517dc97ad709055c62c171b9b90ea33e0d0fc395e9bd2f96e48b1`. The descriptor node ends in `9c81a6d5-3683-4d03-abe7-f704b6084efc`; its three child links match E1–E3 below.

Exact descriptor: “follow and create algorithms involving a sequence of steps and decisions that use addition or multiplication to generate sets of numbers; identify and describe any emerging patterns”.

| Required component | Independent acceptance criteria for the authored code |
| --- | --- |
| Follow ordered algorithms | State the input/start, order of operations and output timing. Trace intermediate values. A supplied sequence without a runnable rule does not establish algorithm following. |
| Decisions and repetition | Define the tested quantity, both branch destinations and any stop/continue condition. Check equality boundaries, initial output and whether the rule terminates as stated. Visual arrows must match the written logic. |
| Actually create algorithms | Inspect learner-created instructions/flowcharts and sample traces against concrete criteria. A completion tick or selecting a ready-made rule alone does not assess creation. |
| E1: multiples and indefinite extension | Generate multiples of one to ten with appropriate digital assistance, identify/explain patterns and distinguish a chosen finite display limit from the indefinite sequence. Specify positive multiples when zero is intentionally omitted. |
| E2: multiplication flowchart | Create a real flowchart using multiplication by a constant; follow/check it with a calculator or other suitable tool, record the sequence and describe the emerging pattern. Distinguish multiplying each new input from repeatedly multiplying the prior output. |
| E3: spreadsheet formulas/fill-down | Explicitly generate A1:A100 as 1…100, then apply a row-relative multiplication formula. Inspect formula references, initial/middle/final rows and the number pattern. Include practical digital instructions and meaningful error reasoning. |

Curriculum wording © ACARA, under the Australian Curriculum CC BY 4.0 terms. These criteria were applied to the authored bank and complete resource review recorded below.

The official E3 example's short “fill down” description must be made operationally clear. A usable plan is A1 = 1, A2 = A1+1 copied through A100, then B1 = A1*4 copied through B100. This produces 4, 8, …, 400, rather than a column of copied ones or repeated multiplication of the previous output. [Microsoft's primary fill-down documentation](https://support.microsoft.com/en-us/excel/fill-a-formula-down-into-adjacent-cells) confirms that relative references adjust for each row; software terminology should remain simple and the lesson must not require a SkillrHub login.

## Baseline audit and author feedback

Baseline commit: `c587e68fd9175c008308cb4b162158f22ee88203`. Baseline bank `assets/assessment-banks/year4/math/ac9m4n09.json` has SHA256 `f109340e5e0a1dafae3829bbb85a1608f081cf851a599dd8ce35d318c64a5e1b`, with 24 Practice and 16 Test items. This hash identifies the deficient baseline, not an approved bank.

All 40 baseline stems, alternatives, keyed answers, explanations and hints were read. They repeat either double-then-add-three or the same positive multiples-of-six stopping rule. Generic context prefixes do not create meaningful variety. There is no actual learner algorithm creation, spreadsheet work, constant-multiplication flowchart or substantive decision tracing across varied inputs.

The current Topic/Classroom teaching content and worksheet were audited. Specific feedback was sent to the author:

- Replace the apparent flowcharts that visually sequence both yes/no branches in one downward chain; they do not show the required routing. The stated odd/even output calculations are useful, but the diagram must execute them correctly.
- Preserve a clear input–output comparison and rule-order contrast, using readable Year 4 language and complete worked reasoning.
- Turn copied elaboration text into usable creation, calculator and spreadsheet activities, with explicit start/output/stop rules and both branches.
- Provide actual answers in the Classroom “With answers” section and eight substantive on-page worksheet tasks with matching PDF source/checks.
- Keep addition/multiplication algorithms central and avoid using higher-year formalism as a substitute for the stated code.

## Source-comparison checkpoint

The [IXL Year 4 standards map](https://au.ixl.com/standards/maths/year-4) was independently read as a mapping only. N09 maps to M.18 and N.1–N.8. Useful distinct formats include input/output rules, multiplication-pattern explanation, geometric recurrence and debugging. No N09 actual worked example or accepted practice observation is yet claimed by this reviewer. Actual decisions, learner creation and spreadsheet requirements may need ACARA-led original teaching if the external sample does not contain them; unseen IXL stages must not be presented as observed. Khan material remains a supplementary conceptual source within the Australian Year 4 boundary.

## Activity-wrapper teaching checkpoint

The reviewer independently read the new Quick preparation/guide and Unit focus text across Practice and Test launch, result and review pages. Its algorithm explicitly records the initial 3, then repeats add 4/check against an inclusive 19 limit. The complete recorded output is 3, 7, 11, 15, 19; the next calculated 23 fails the check and is not output. Both the order and stopping timing are correct and clearly stated. The text distinguishes one selected branch from reviewing both possible branches, and asks for a precise start, repeated step and stop rule when creating an algorithm. Reading level and adult-check instructions are suitable. Final wrapper identities are recorded below. Root’s executed offline runtime evidence was independently assessed; live rendering and activity flow remain root’s integration gate.

## Exhaustive authored-bank checkpoint

The reviewer independently read and traced all 48 Practice and 16 Test items, including every alternative, keyed result, explanation, hint, audio prompt, model answer and adult marking criterion. Draft bank SHA256: `aee7b9935cf2839d2507cbaf0b032c43aa804206df3eda67a60f6e1007311d31`. All intended numerical outputs are correct; the issues below concern precise wording and accepting mathematically valid constructions, not changing arithmetic to fit a key. Manual content review is the basis of this checkpoint.

The bank meaningfully varies operation order, separate inputs versus previous outputs, both decision branches, updated-value tests, inclusive/strict boundaries, empty output, unreachable stops, output counts, error diagnosis, explained patterns and finite-list limitations. Positive multiples of every number from one to ten are represented across the collection. The eight adult tasks require actual creation of algorithms/flowcharts or practical digital work; their evidence cannot be supplied by ticking a completion box alone.

The author received a concrete correction batch. P044 must name its correct algorithm without a shuffled-choice ordinal. P038 must specify the same-row input-times-four rule because another alternative also references A2. P026 must say “a multiple of 6 and even”, avoiding the ambiguous “even multiple”. P009 must request an explicit odd-input operation without asserting that an if-without-otherwise is always invalid. P045/T013 must allow equivalent input-counter multiplication constructions; P046/T015 must allow a safe initial record followed by a correctly placed loop test; P047 must accept any correct justified pattern permitted by its open prompt. T014 must describe changes in input/output values rather than ambiguous counts. P025's unexplained “parity” wording and T007's implicit row placement also required simple clarifications. The author applied changes to exactly these 12 items, including a stronger P009 distractor that still concerns the even branch. The reviewer independently re-read every changed item in full. All corrections resolve the issues, and all 56 multiple-choice items now have a uniquely appropriate correct answer. Final corrected bank SHA256: `928252b5993ed5d17d3abad77728f3b7bcf11501e4eb934ec27cc880917a249b`. No assessment visual changed.

| Official scope | Substantive authored evidence |
| --- | --- |
| Follow sequences of steps | P001–P003/P014/P016/P018/P019 and T001/T004/T006 explicitly distinguish operation order, initial values and output timing. |
| Follow and create decisions | P004–P010/P012/P013/P015/P020/P021/P031/P032/P044, T002/T003/T005/T012 and adult P045–P047/T013–T015 include real decisions, exact boundaries, loop routes and construction. |
| E1 multiples and patterns | P011/P021–P028/P041–P045 and adult T013 include multiples, explained odd/even/digit/gap patterns and the difference between finite recording and indefinite mathematical extension. |
| E2 multiplication flowcharts | P016–P019/P030/P039/P040, T004/T009/T011/T012 and adult P046/T015 distinguish prior-value multiplication, include real calculator tracing and require independent checks. |
| E3 spreadsheet creation | P033–P038 and T007/T008 explicitly teach relative references and input generation. Adult P048/T016 require an actual 100-row spreadsheet, initial/later/final values, a later formula and justified gaps. |

## Assessment visual inspection

All 10 distinct SVGs were independently rendered at 640 × 300 using CairoSVG and visually inspected in the two contact sheets and individual outputs under `/workspace/scratch/b2c91567ebe4/research/reviewer-n09-visuals/`. Every rendered table entry, flowchart operation, yes/no route, return arrow, inequality and output destination was compared with the complete item. Text is legible and no branch is incorrectly drawn as the next sequential operation. All 10 assessment visuals pass this inspection; no visual correction was requested. This is standalone asset QA, not a claim of live browser rendering.

| SVG / item | Independent visual finding |
| --- | --- |
| p-003 | Input table correctly applies ×5 then +2 to 1,2,3 and leaves input4's output unknown; column labels and working are aligned. |
| p-004 | The even? diamond routes Yes to ×3 and No to +5; both paths merge at one record-output step. |
| p-008 | Pairs 1→4,2→4,3→6,4→8 match the candidate branch rule and retain repeated outputs. |
| p-012 | Start4 enters n<20 before recording; Yes records then adds4, returning to the test; No stops. |
| p-013 | Start5 enters n≤20; record/add5/return flow includes20 and excludes25. |
| p-017 | Start1 enters n≤30; record/×3/return flow includes27 and excludes81. |
| p-033 | Each changing input 1,2,3,4 is multiplied by4, with outputs4,8,12,16 rather than geometric recurrence. |
| t-002 | Input>5 diamond sends equality5 through No/+3; Yes/×2 is a separate alternative. |
| t-003 | Start4, n≤16, record/add4/return and No/stop route correctly include both4 and16. |
| t-010 | Inputs1…5 map to4,7,10,13,16 under ×3 then +1; every row is correct and readable. |

## Item-level manual review

Each row records independent tracing and content reasoning. Changes requested in individual rows were subsequently applied and independently re-reviewed as recorded above. Item-level content passes are not publication approval while the remaining gates are open.

| Item | Checkpoint verdict | Independent solution and content reasoning |
| --- | --- | --- |
| AC9M4N09-P-001 | Bank content pass | (5 + 3) × 2 = 16. The explanation traces 8 before doubling and distinguishes reversing the steps; alternatives are unique. |
| AC9M4N09-P-002 | Bank content pass | 8 × 3 + 4 = 28. Intermediate 24 and final 28 are correct; other choices follow changed operations/order. |
| AC9M4N09-P-003 | Bank content pass | Each separate input follows ×5 then+2:1→7,2→12,3→17,4→22. Rendered table and unknown final entry match the stem and key. |
| AC9M4N09-P-004 | Bank content pass | Even 6 follows the ×3 branch to 18; odd 7 follows +5 to 12. Rendered yes/no routes join only at recording, rather than applying both operations. |
| AC9M4N09-P-005 | Bank content pass | 3 + 2 = 5 is odd, so the otherwise operation gives 5 + 4 = 9. It correctly uses the updated value; T005 provides a separate case where odd/even status changes. |
| AC9M4N09-P-006 | Bank content pass | 4 fails at-least 5 and becomes 7;5 meets equality and doubles to 10. The boundary explanation is correct and the output pair unique. |
| AC9M4N09-P-007 | Bank content pass | Independent inputs 1,2,3,4 give 5,4,7,8 under odd+4/even×2. Output ordering is explicit; no assumption of increasing outputs. |
| AC9M4N09-P-008 | Bank content pass | Among the stated rules, even×2/odd+3 uniquely fits all pairs 1→4,2→4,3→6,4→8. The rendered table agrees; no unique extrapolation beyond the stated choices is claimed. |
| AC9M4N09-P-009 | Corrected content pass | The keyed otherwise-add 1 instruction explicitly supplies an operation for odd inputs. Requested wording avoids the false implication that every algorithm with an if but no otherwise is inherently incomplete; an unchanged-input path can also be intentional. |
| AC9M4N09-P-010 | Bank content pass | 7 is below 10, so only +5 runs and the output is 12. The explanation correctly rejects subsequently running the alternate multiply branch. |
| AC9M4N09-P-011 | Bank content pass | Start 10, repeated+10 and an inclusive 50 bound give 10,20,30,40,50. The next 60 is tested and excluded. |
| AC9M4N09-P-012 | Bank content pass | Rendered test-before-record chart starts 4, adds 4 and requires n<20:4,8,12,16 are recorded;20 is rejected. Start, return route and strict sign agree. |
| AC9M4N09-P-013 | Bank content pass | Rendered start 5/add 5 chart allows n≤20, so 5,10,15,20 are recorded and 20 is last. The 25 test exits; equality is correctly included. |
| AC9M4N09-P-014 | Bank content pass | Starting 2 is not output: add 5 before each record produces 7,12,17. Exactly three recorded values are requested and the distractors expose timing/count errors. |
| AC9M4N09-P-015 | Bank content pass | 1,5,9,13,… never reaches the exact stop value 10. Positive+4 jumps past 10 then increases; no automatic unstated stop is assumed. |
| AC9M4N09-P-016 | Bank content pass | Including the initial 2, four recorded doublings are 2,4,8,16. The fourth is 16 rather than the next 32. |
| AC9M4N09-P-017 | Bank content pass | Rendered start 1/×3/test≤30 loop records 1,3,9,27 and excludes 81. The return arrow repeats multiplication, not addition or changed inputs. |
| AC9M4N09-P-018 | Bank content pass | The stated previous-value×4 rule gives 128 × 4 = 512. Difference-based, doubling and tripling distractors are wrong and distinct. |
| AC9M4N09-P-019 | Bank content pass | Both lists begin 4,8; repeated+4 next gives 12, whereas doubling next gives 16. Including the start as output 1 is explicit. |
| AC9M4N09-P-020 | Bank content pass | The initial 12 already fails n<10, so no record occurs. The explanation and None key correctly apply the test before the first output. |
| AC9M4N09-P-021 | Bank content pass | Start 7, record while below 30, and add 7 produces exactly 7,14,21,28;35 fails. Wrong starts, multiplication and add-before-first-record omit or change wanted values. |
| AC9M4N09-P-022 | Bank content pass | For exactly the six supplied multiples, ones digits 9,8,7,6,5,4 decrease by 1. The explanation explicitly limits that observation before a later 0→9 wrap. |
| AC9M4N09-P-023 | Bank content pass | Outputs 5,10,15,20,25,30 have ones digits 5,0,5,0,5,0. The start/order prevents the reversed pattern from also being correct. |
| AC9M4N09-P-024 | Bank content pass | Even start 2 plus repeated even 4 stays even:2,6,10,14,18. The explanation justifies continuation and correctly rejects the false all-multiples-of 4 claim. |
| AC9M4N09-P-025 | Corrected content pass | Consecutive inputs multiplied by 3 produce gaps of 3, switching odd/even status. Requested reading-level change replaces unexplained parity jargon; mathematics is sound. |
| AC9M4N09-P-026 | Corrected content pass | 6,12,18,24 are all multiples of 6 and all even. Requested phrase repair avoids even multiple being read as an even multiplier, which would exclude 6 and 18. |
| AC9M4N09-P-027 | Bank content pass | Any positive multiple of 4 can be extended by adding 4. The mathematical rule has no last value even though a written list or physical device is finite. |
| AC9M4N09-P-028 | Bank content pass | Without a stated generating rule,2,4,8 need not uniquely continue 16. The answer correctly separates a plausible doubling rule from certainty. |
| AC9M4N09-P-029 | Bank content pass | 24 + 8 = 32, then 32 + 8 = 40. Replacing 31 alone repairs the intended additive list. |
| AC9M4N09-P-030 | Bank content pass | 18 × 3 = 54 and 54 × 3 = 162. The replacement 54 fits both neighbours; alternatives 48/60/168 do not. |
| AC9M4N09-P-031 | Bank content pass | Recording the initial 3 before doubling yields 3,6,12. Other repairs miss the desired start or change the generating operation. |
| AC9M4N09-P-032 | Bank content pass | n≤10 admits 2,4,6,8,10 and rejects 12. Other supplied conditions either omit 10, stop immediately or admit only 2. |
| AC9M4N09-P-033 | Bank content pass | Rendered input table applies each of 1,2,3,4 ×4 to give 4,8,12,16. The previous-output geometric sequences are different rules, accurately explained. |
| AC9M4N09-P-034 | Bank content pass | Relative fill-down gives A2=2,A3=3,A4=4,A5=5. The formula references the value in the row above, not a fixed A1. |
| AC9M4N09-P-035 | Bank content pass | Filling =A1*4 down two rows gives B3 =A3*4 =12. The reference row changes and multiplier 4 remains fixed. |
| AC9M4N09-P-036 | Bank content pass | Rows 1…100 explicitly contain matching inputs 1…100, so B100=100 × 4=400. The explanation distinguishes this from repeated multiplication of prior outputs. |
| AC9M4N09-P-037 | Bank content pass | With every A cell literally 1, every filled row multiplies 1×4 and returns 4. The correction reasoning properly inspects input values as well as formula references. |
| AC9M4N09-P-038 | Corrected content pass | The intended repair is B2 =A2*4 =8, not previous-output 4×4=16. Requested stem correction specifies the input-times-four rule, because the distractor =A2+4 also literally uses input A2. |
| AC9M4N09-P-039 | Bank content pass | Previous-value×3 from 4 gives 4,12,36,108. Every transition, not merely the first product, matches the calculator-check rule. |
| AC9M4N09-P-040 | Bank content pass | Prediction, entering each stated multiplication and comparing recorded outputs is a purposeful tool check. A device can receive wrong inputs; changed multipliers or unrecorded steps do not verify the algorithm. |
| AC9M4N09-P-041 | Bank content pass | The ordered outputs 4,4,6,8 contain distinct values 4,6,8. The prompt explicitly asks to list each different value once, avoiding duplicate-list ambiguity. |
| AC9M4N09-P-042 | Bank content pass | Changing inputs 1,2,3,4 each multiplied by 1 retain 1,2,3,4. This is correctly distinguished from repeatedly multiplying one fixed value by 1. |
| AC9M4N09-P-043 | Bank content pass | Consecutive increasing inputs differ by one group; under×8 the output gap is 8. The answer explains the relationship rather than merely observing listed values. |
| AC9M4N09-P-044 | Corrected content pass | Start 5/record/add 5/test≤25 records 5,10,15,20,25 and exits at 30. Requested explanation repair removes first-algorithm wording made false by shuffled answer order. |
| AC9M4N09-P-045 | Corrected content pass | Adult creation: six required outputs 6,12,18,24,30,36 with a runnable continue/stop decision excluding 42 and justified pattern. Requested rubric accepts both repeated+6 and equivalent input-counter×6 constructions, as the open prompt permits. |
| AC9M4N09-P-046 | Corrected content pass | Adult flowchart and calculator trace: start 2, repeated×3, record 2,6,18,54 and reject 162. Independent check 18+18+18=54 is correct. Requested rubric accepts equivalent safe initial-record/test ordering while retaining a real chart, both paths and actual tool evidence. |
| AC9M4N09-P-047 | Corrected content pass | Adult branch algorithm outputs 6,4,8,8,10,12 for inputs 1…6, with one output per input and a final stop. All outputs are even; other justified branch-specific patterns are also valid under the prompt and must be accepted. Duplicate outputs are correctly allowed. |
| AC9M4N09-P-048 | Bank content pass | Actual spreadsheet construction: A increases 1…100 using relative +1; B uses matching-row×7, so B1/B2/B10/B100=7/14/70/700 and B10 =A10*7. Rubric requires real digital fill-down evidence and the gap-of 7 reasoning. |
| AC9M4N09-T-001 | Bank content pass | (6 + 4) × 3 = 30. Intermediate 10 and final 30 are correct; reversing operations gives 22, which is appropriately wrong. |
| AC9M4N09-T-002 | Bank content pass | Rendered input>5 decision is false at 5; the No branch adds 3 to yield 8. Strict inequality and branch join agree with caption and key. |
| AC9M4N09-T-003 | Bank content pass | Rendered start 4/add 4/test≤16 loop records 4,8,12,16, then rejects 20. Both initial output and inclusive endpoint are correct. |
| AC9M4N09-T-004 | Bank content pass | Four records including start 1 are 1,5,25,125. The fourth is 125;625 would be a fifth record. |
| AC9M4N09-T-005 | Bank content pass | 4 + 1 changes even 4 to odd 5; testing the new 5 chooses+3 and outputs 8. This meaningfully tests decision timing after the value changes. |
| AC9M4N09-T-006 | Bank content pass | Multiply before recording from 3 gives 6,12,24 over three outputs. The unrecorded start is explicitly distinguished. |
| AC9M4N09-T-007 | Corrected content pass | Same-row input 25 times 8 gives 200. Requested precision adds rows 1…100 to the input description so A25 is explicitly 25. |
| AC9M4N09-T-008 | Bank content pass | Relative fill-down of =A1*9 to B5 gives =A5*9. The input row changes, while operation and 9 stay fixed. |
| AC9M4N09-T-009 | Bank content pass | 20 doubled is 40 and 40 doubled is 80. Replacing 41 with 40 repairs the only incorrect entry. |
| AC9M4N09-T-010 | Bank content pass | Rendered outputs 4,7,10,13,16 rise by 3. One extra input adds one group of 3, while the fixed+1 does not change the gap. |
| AC9M4N09-T-011 | Bank content pass | Repeated previous-value×1 from 5 remains 5 indefinitely. The explanation correctly counters the misconception that multiplication must increase values. |
| AC9M4N09-T-012 | Bank content pass | n≤24 records 3,6,12,24 and rejects next 48. Strict less-than omits 24; other conditions stop prematurely. |
| AC9M4N09-T-013 | Corrected content pass | Adult algorithm must generate 8,16,24,32,40,48 with explicit record/continue/stop rules and explained pattern. Requested rubric accepts equivalent input-counter×8 construction as well as repeated+8, consistent with the open prompt. |
| AC9M4N09-T-014 | Corrected content pass | Adult branch trace yields 2+6=8,3+6=9,4×3=12,5×3=15, with an explicit final stop. Requested model-answer precision states value increases of 1 and 3 within the respective branches instead of ambiguous one-more-input/output wording. |
| AC9M4N09-T-015 | Corrected content pass | Adult flowchart/calculator trace records 1,4,16,64, rejects 256, and checks 16×4 by repeated addition or two doublings. Requested rubric permits mathematically equivalent initial-record ordering while still requiring actual flowchart paths and tool evidence. |
| AC9M4N09-T-016 | Bank content pass | Actual spreadsheet rule =A1*3+2 filled down gives B1/B2/B10/B100=5/8/32/302 and B10 =A10*3+2. The fixed+2 preserves the gap of 3 from one extra input group. Digital evidence, later formula and explanation are explicitly required. |

## Full resource content review

The reviewer read all substantive text in the Topic Guide, Classroom View, worksheet page and dedicated eight-task PDF source, then independently solved every worked example, assessment prompt, exit ticket and worksheet item. Both current Topic descriptors exactly match primary MRAC text. Every linked elaboration also matches after removing inline LaTeX delimiters and rendering multiplication/currency/spacing notation; this preserves meaning while repairing visible raw markup. Manual coverage and mathematics checks, not this text comparison alone, establish the content verdict. The existing navigation, free resource path, Classroom sections and worksheet download remain in place. Full HTML layout/live rendering remains root’s integration gate.

N09's Topic and Classroom teach actual algorithm following and creation, rather than relying on next-term exercises. The initial even×3/odd+5 diagram correctly separates alternatives and processes each input1…10 once. Its branch lists are accurate and repeated output values are intentionally explained. The4×input+2 table gives6,10,14,18, with output30 at input7; the extra constant does not change the gap of4. The learner is explicitly taught to distinguish new-input multiplication from prior-output multiplication.

E1 allows a multiplier from1 to10, digital checking and explained constant gaps; a chosen finite list does not end the mathematical sequence. The start6/add6/test≤30 example records6,12,18,24,30 and rejects36, while a strict<30 test omits30. E2's start1/×2/test≤32 flowchart records1,2,4,8,16,32 and excludes64; both outputs and gaps double. Learners create another chart, use a calculator, check a product and explain the repeated multiplicative change. E3 operationally creates inputs using A1=1 and A2 =A1+1 filled to A100, then applies =A1*4 down B. The examples correctly give B2=8, B10=40 and B100=400, and explain why =B1*4 in B2 would wrongly produce16.

All guided, revision, assessment and exit tasks were independently traced. Even×4/odd+3 on inputs1…6 produces4,8,6,16,8,24; its distinct values are4,6,8,16,24. The5×input+2 rule produces7,12,17,22 and32 at input6. Changing add3-then-double to double-then-add3 at input4 changes14 to11. The exact-stop-at10 rule from1 with+4 never meets its stop; a corrected pre-record≤10 test records1,5,9. Assessment and exit outputs are12;2,6,10,14;1,3,9,27;9;2,5,8,11; and5,10,15,20 respectively. Prompts that create charts or rules require actual runnable work, and all supplied model answers have correct routing and boundary timing.

All six inline SVGs were independently rendered and visually inspected: two proper even/otherwise charts (×3/+5 and×4/+3), the4×input+2 table, the bounded additive-six loop, the bounded doubling loop and the selected spreadsheet rows1/2/3/100. Every operation, arrow, yes/no label, sign, table value and alternative label agrees with the surrounding text. Topic and Classroom contain the same six SVG sources. No branch is falsely shown as a sequential operation.

## Worksheet item-level review

All eight HTML tasks and criteria match their dedicated JS source. Requested corrections were applied and independently read: W002 permits equivalent shared or separate record nodes; W004 explicitly records the start2; W006 requests and checks the explained gap of6. Actual PDF inspection additionally exposed W007's dependency on a preceding task under random ordering. The author repaired W007 in both sources to state all inputs, the intended same-row×6 relationship, and B1's formula/value explicitly. That corrected complete item was independently re-read; it now stands alone.

| Written task | Independent answer and required evidence |
| --- | --- |
| W001 |Exactly3,6,9,12,15,18,21. Require a runnable algorithm, record timing and both decision destinations; repeated+3 and a1…7 input counter multiplied by3 are valid alternatives. |
| W002 |For1,2,3,4, even×5/odd+7 gives8,10,10,20. Require real separate branches, one output/input, next-input processing and final stop. Repeated outputs and equivalent record-node layouts are valid. |
| W003 |At6, add2 then×3 gives8 then24;×3 then+2 gives18 then20. Require both intermediate traces and an explanation of the operation-order effect. |
| W004 |Record the initial2, then8,32,128 under repeated×4;512 is excluded. Require an actual flowchart, both paths, real calculator trace, multiplicative-pattern explanation and an independent check such as two doublings of32. |
| W005 |4,9,14,19,24 skips exact20; the stop never fires. Correct pre-record≤20 logic gives4,9,14,19. Inspect the repaired decisions and recording point; an equivalent safe initial-record order is allowed. |
| W006 |Actual 100-row spreadsheet gives B1/B2/B10/B100=6/12/60/600 and B10 =A10*6. Require changing inputs/references and explained gaps of6, beyond paper predictions alone. |
| W007 |Self-contained repair: B1=6; wrong B2 =B1*6 gives36. Same-row input A2=2 instead needs =A2*6, yielding12. Both value/reference meanings and the repaired formula are required. |
| W008 |Choose any multiplier1…10; generate its first six positive multiples with runnable steps and finite recording stop. Explain a valid pattern from the rule and why another mathematical multiple can always follow. Equivalent addition and input-counter multiplication methods are accepted. |

## Final PDF review — substantive and layout PASS

The reviewer independently inspected all five pages of the final, exact production-generated v18.1 PDF. The printed task order is W003, W005, W007, W001, W008, W004, W002, W006; every answer and criterion matches that order. W007 now explicitly supplies A1:A100 = 1 through 100, the intended same-row multiplication by 6, and B1 =A1*6 showing 6. It therefore remains fully answerable as printed question 3, before the separate spreadsheet-construction task at question 8. Its wrong reference gives 36, while the repaired =A2*6 gives 12.

W002/W004 explicitly direct learners to a separate sheet for their flowcharts, in both the page and PDF source. The final PDF keeps each prompt and all four response lines together. No response line is orphaned, and no text is clipped or overlapped. Questions, complete marking criteria, headers and footers are readable. The final answer paragraph on page 5 remains intact and legible. All five final page images, `n09-1.png` through `n09-5.png`, were visually inspected after the self-contained-question and workspace repairs. The earlier dependent-question PDF and printing checkpoint are superseded by this final approval.

Final PDF: `/workspace/scratch/b2c91567ebe4/qa-pdfs/ac9m4n09-homework.pdf` — SHA256 `813020d3e4331ba27f3c90796dea202066fe71db285d2e6c7835724e244f36f1`.

## Remaining review gates

The final 64-item bank, every distinct assessment visual, complete Topic/Classroom teaching content, all eight written worksheet tasks and their exact PDF source/answer agreement, and every final generated PDF page pass independent substantive review. The completed evidence is recorded above and identified below. Re-review subsequent changes to these authored artifacts.

Overall status remains HOLD because the actual relevant IXL skill pages, opened worked examples and representative questions have not yet been reviewed for this code. A standards-map listing cannot close that gate. Khan evidence is supplementary where readable; candidate links or unread page bodies are not treated as observed explanations. Root must also complete live HTML layout and activity/adult-marking verification and the repository release gates. Offline runtime evidence below does not establish live-browser success. This report does not authorise the reviewed publisher, ledger credit or the Year 4 badge yet.

This is a stable authored-content checkpoint. Root may separately preserve newer main’s unrelated additive video supplements; the hashes here identify the reviewed authored resource bytes before that integration. Any integrated page identity and the unchanged nature of preserved supplements must be documented by root without representing unseen supplements as reviewed here.

## Authored preparation compatibility review — 8 September 2026

The reviewer independently read both revised launch panels, their new model captions, alternative labels, SVG references and script order. The reused P003 table already passed independent rendered inspection: inputs 1, 2 and 3 give 7, 12 and 17, and the caption correctly solves input 4 as 4 × 5 + 2 = 22. The separate add-four loop records 3, 7, 11, 15, 19 and excludes 23. Adult creation guidance and explicit record/decision timing are sound.

The shared quick-read helper now recognises the explicit authored-preparation marker only for N01–N09/A01 and the two stated reviewed bank versions, retaining the existing brand/card styling and approved teaching section. Both launch pages load the versioned helper after the activity script and before PWA registration. This static content/integration reading does not substitute for root’s load-order and live browser checks. No bank question, key or assessment SVG was changed by this compatibility fix.

Current wrapper identities (launch files changed; result/review content previously reviewed):

- `quiz/year-4/math/ac9m4n09/practice/index.html` — SHA256 `d14f623ce4f1ed3f0478c5770423e9e7161c3605ea90a925f46aa1d2e9972cc5`
- `quiz/year-4/math/ac9m4n09/practice/result/index.html` — SHA256 `86cda8d2375b2dc5bf06d46ddaf563a56d8a6caa1a5f55091dee7cb5f6dbe299`
- `quiz/year-4/math/ac9m4n09/practice/review/index.html` — SHA256 `a03faeda5f9a34d6ca47e187a5f837368ad38d094fb0d1a2eeec163c170454a2`
- `quiz/year-4/math/ac9m4n09/test/index.html` — SHA256 `ed8126837f35415c72b27d6a9107d1214633af10b0a8a9ddbc27b02fd8b44cac`
- `quiz/year-4/math/ac9m4n09/test/result/index.html` — SHA256 `6ddf7e1deb077b57774021200f6a71db49325e0bb5120fcd6a98cfe06cce147c`
- `quiz/year-4/math/ac9m4n09/test/review/index.html` — SHA256 `d4a77d2128033516f839d58a5ed364237a63c9b24e5c39e3da19f084cc80a48f`
- `assets/year4-maths-practice-quick-read.js` — SHA256 `d5daa920f8a39eaae76a9643ef637c1234b00222e5f5bcfe8a79d209185aa5ed`

## Final resource and generated activity identities

These hashes identify the exact reviewed content checkpoint; blank-line cleanup in the Classroom files does not alter the reviewed mathematics.

| Artifact | SHA256 |
| --- | --- |
| `year4/maths/ac9m4n09-follow-and-create-algorithms-involving-a-sequence-of-steps-and/index.html` | `5af1642e6c6044130fadc8e7cbc6eb23dcfdb033e2bd17faa51082d57db71edf` |
| `year4/maths/ac9m4n09-follow-and-create-algorithms-involving-a-sequence-of-steps-and/teacher-slides/index.html` | `b5269c6d476abfd5fd462ddf327f08db7b1e4293cbf9acfbfea1a203b41ccd4d` |
| `quiz/year-4/math/ac9m4n09/worksheet/index.html` | `b189a25c6a88c796999b8428ea02c0856d2135de5d781332e34d8b83962e3c77` |
| `quiz/year-4/math/ac9m4n09/worksheet/worksheet-questions.js` | `5c0e05bb509b1affd23c0ae81e3884490d3d0207c440f77085cce0f2b4980247` |
| `quiz/year-4/math/ac9m4n09/practice/questions.js` | `a4de8922469ec4bb7fbebbc75e68802d572d89ec2076f1a87eedf6fbbe1a4174` |
| `quiz/year-4/math/ac9m4n09/test/questions.js` | `c0de1b9d234370732881471787cd61f9177758358764c23526b9cfc61924d642` |
| `quiz/assets/worksheet-pdf.js` | `1b642d25eebbcd2c4e8051578bdf7cba86b164fa26d2f570ba904f0cd4d69c3f` |

The reviewer independently compared all 48 generated Practice and 16 generated Test records with the canonical bank. Question and audio text, visual metadata, answer ordering and correct keys, structured explanations/hints, difficulty/sequence fields, and every adult model answer, marking criterion and response instruction match. This content-field identity check supplements the completed manual item review; it does not replace it. Generated files were prepared without the reviewed publication flag while the source gate remains open.

## Independently assessed offline runtime evidence

The reviewer read root’s executed harness `/workspace/scratch/b2c91567ebe4/qa_activity_runtime.cjs`, its output and the saved repository evidence `SECOND-FIVE-RUNTIME-QA.json`. The code-specific cases are Practice P003 (MCQ), Practice P045 (adult), Test T002 (MCQ), Test T013 (adult); all four pass within the 14-case next-five run. This is offline jsdom using the actual repository runtime, not a live browser, and was executed on an uncommitted draft based on `6190d5120a0ecc5e6d1f11280e2b1e8726a8b192`.

The inspected assertions exercise retained authored preparation/branding, actual question presentation, a correct MCQ submission, result persistence, review-model restoration, and paper responses remaining pending before an adult marks “Meets task”. The adult transition changes pending count from 1 to 0, score from 0 to 1 and pass status from false to true in the isolated one-item cases; the result and review path are checked. These finite cases do not establish all live layouts, audio behaviour, browser compatibility or every possible adult-marking interaction.

| Evidence or runtime | SHA256 |
| --- | --- |
| `reports/year4-maths-ixl-review/SECOND-FIVE-RUNTIME-QA.json` | `59bcf02d7c1f03cd8a531adfa321734c029e9c437bbdbde3b6e6932907330bc8` |
| `/workspace/scratch/b2c91567ebe4/activity-runtime-qa.json` | `6f9a1b52496bd3991a5a44b1094e5f186d7777a93e98edad8bb853dbca810023` |
| `/workspace/scratch/b2c91567ebe4/qa_activity_runtime.cjs` | `0dce31e0f1f8af13ed53d74f93527883ce0785fa886bca1286104cee1f449bd8` |
| `quiz/assets/script.js` | `d4b3615c1cba96dbd326c1c24b055e8293ef71a6f7a16b38c9285b1906ab78a6` |
| `quiz/assets/script-runtime-v115.js` | `cec2900af4c21d950dd97b7b21e981abc95f3c2375ba69e15397b07ef32d33a5` |
| `quiz/assets/year1-maths-support.js` | `220bc7a4b8b4fa82b01771f3ca0fc60649705e0097a96a9cef5616d289663803` |
| `quiz/assets/production-question-ui.js` | `2015730b0045ee57f10ad32171020673e14e7d5cf1e7eb5beea24c4aaa94ef8e` |
| `quiz/year-4/math/reviewed-number-visuals.js` | `f75860be9c493f3c465030856c7f2db19a1f8052c0dd0fb8e1e007aebeeb6834` |
