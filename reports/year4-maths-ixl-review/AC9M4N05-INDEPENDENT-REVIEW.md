# AC9M4N05 independent review

Status: PASS

Reviewed: 8 September 2026. This is independent substantive content approval of the bank and companion resources identified below, following correction and revalidation of the IXL worked-example evidence. Root retains the separate release-integrity, live HTML layout, browser activity, Actions and Pages gates; their completion is not claimed here.

Bank SHA256: `415772825c56946cb4426654d0e0f0fbbe39f4e264a5e1c6cdc3a9f81a262a44`

Reviewer: `reviewer_placevalue`, separate from author `author_placevalue`.

Scope: Year 4 Maths AC9M4N05 question bank, every answer choice, explanation, hint and question visual; same-code Topic Guide, Classroom View and worksheet/homework. The final approval identifies the exact bank SHA256 and reviewed resource files.

## Independent curriculum check

The reviewer first retrieved `svgSkillrHub-IXL-Research-Log.md`. Its active queue was historical Year 3 English; it contained no completed Year 4 N05 evidence. It was not treated as current N05 approval.

The exact N05 descriptor was verified in the [QCAA Australian Curriculum v9 P–6 mathematics sequence](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_p-6_cd_sequence.pdf), page 1, and cross-checked in the [QCAA Year 4 standard elaborations](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/assessment/ac9_maths_se_yr4.pdf), page 5. These require natural-number multiplication and division involving both multiples and powers of 10, solved without a calculator using relationships among digit place values. The sequence places decimal multiplication/division by powers of 10 in Year 6 N06; decimal inputs are therefore not introduced as this bank's core demand.

Root subsequently retrieved the directly linked official [ACARA Mathematics v9 JSON-LD](https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/MAT/export/MRAC/2024/04/LA/MAT.jsonld), with provenance recorded in `FIRST-FIVE-ACARA-VERIFICATION.md`. The reviewer independently read the downloaded N05 descriptor and E1–E3 extract and confirmed the complete source SHA256 `4d6b7a01d10517dc97ad709055c62c171b9b90ea33e0d0fc395e9bd2f96e48b1`. E1 supports the physical/virtual materials activity, E2 the place-value chart and slider reasoning, and E3 teacher-led digital pattern exploration followed by independent no-calculator application. These agree with the reviewed teaching and assessment scope.

The review distinguishes these necessary components:

| Component | Required evidence |
| --- | --- |
| Powers of 10 | Multiplication and exact division by 10, 100 and 1 000, including internal zeros |
| Multiples of 10 | Multiplication and exact division by factors such as 20, 30, 60, 200, 300, 4000 and 7000 |
| Multiplicative place value | Interpret the value of a digit, connect units/tens/hundreds and justify changes in place value |
| Efficient reasoning | Decompose a multiple into a small factor and power of 10; use equivalent chains and inverse checks |
| Problems | Identify an operation and interpret the answer in meaningful, familiar contexts |
| Independent evidence | Online response choices plus written explanations, model construction and practical prompts in companion resources |

## Existing-resource findings communicated to the author

- The starting bank contained 24 Practice and 16 Test items. Twenty assessed multiplication by powers of ten and twenty assessed division by powers of ten. It did not assess multiplication/division by other multiples of 10.
- Many stems added an unrelated location before a bare calculation. Explanations repeated a general rule without working the particular numbers; generic SVG pathways did not demonstrate the quantities.
- The Topic Guide contained useful place-value and factor-chain examples worth preserving. Its final checks drifted to general operations (`6 × 24`, `96 ÷ 4`) and mentioned remainders, rather than assessing N05 specifically.
- The Classroom View flattened a place-value chart into an unstructured string of headings and digits. Important questions had generic instructions instead of specific worked answers. These were identified as review corrections.
- A `406 × 100` chart needs a ten-thousands column. Any retained four-column chart must be explicitly limited to `406 × 10`.

## Source inspection and limitations

- Official QCAA descriptor text: independently inspected. A Web PDF screenshot request failed; no screenshot-based visual inspection of that source is claimed.
- Khan Academy: the reviewer independently read the complete rendered transcripts of [Place value when multiplying and dividing by 10](https://www.khanacademy.org/math/cc-fourth-grade-math/imp-place-value-and-rounding-2/imp-how-10-relates-to-place-value/v/place-value-when-multiplying-and-dividing-by-10) (5:15) and [Dividing whole numbers by 10](https://www.khanacademy.org/math/cc-fourth-grade-math/imp-place-value-and-rounding-2/imp-how-10-relates-to-place-value/v/dividing-whole-numbers-by-10) (7:09). The first connects 7 hundreds × 10 to 7 thousands, then 212 tens ÷ 10 to 212 ones. The second builds division from counting equal groups of ten before reasoning about larger totals and digit values. This supports the rewritten unit-first explanations. The source's end-zero shorthand is used only as a consequence of the stated whole-number multiplication/exact-division cases. These were transcript inspections, not video playback or animation QA; no Khan exercise was submitted. They do not supply direct division-by-30 or division-by-300 benchmarking.
- IXL: the reviewer critically read all eight actual-page entries in `AC9M4N05-AUTHOR.md`, including task formats, confirmed counts and observed limits. Two accepted H.2 tasks reached 26, with a third prompt removing an intermediate step; I.1 and I.9 each had one confirmed answer and a further visible prompt. H.1 and K.1 used multirow place-value patterns. The reviewer did not repeat the author's page interactions and does not claim to have done so. A later source-method correction found that DOM snapshots could include preloaded worked-example text while the panel remained hidden. Approval was placed on HOLD because those earlier observations did not establish visibly expanded panels. The author then opened all eight Learn panels using Space, confirmed their Back to practice controls, read the expanded explanation and inspected a rendered screenshot for every panel. The corrected evidence below was critically re-reviewed; the source hold is now resolved. Earlier hidden examples remain excluded, and no exhaustive adaptive-stage or mastery evidence is claimed.
- A critical distinction is retained: the observed IXL division skills divide large multiples by one-digit divisors. No observed IXL task directly divided by 30, 300 or 7000. The bank's required division-by-multiples coverage is original ACARA-led work, independently solved using common-unit and inverse reasoning. An independent search of the current [IXL Year 4 skills catalogue](https://au.ixl.com/maths/year-4/skills) did not identify a named exact division-by-multiples skill; that is not proof that no suitable IXL question exists elsewhere. Higher-demand transfer and error-analysis questions are original decisions, not unseen IXL evidence.

| Corrected visible IXL example reported by author | Independent source-comparison assessment |
| --- | --- |
| H.1: 6 × 3, 30, 300, 3000 gives 18, 180, 1800, 18000, with named units. | Supports multiplicative place-value patterns through thousands. |
| H.2: 30 × 4 is 3 tens × 4, then 12 tens = 120. | Supports unit-first chains and the observed removal of scaffolding in actual practice. |
| H.3: 3 × 40 uses the 3 × 4 fact and one end zero. | Correct fluency shortcut; SkillrHub explicitly explains the factor of ten. |
| I.1: vertical 70 × 8 uses 7 × 8 = 56, then 560. | Supports vertical arrangement and tens scaling. The earlier hidden hundreds example is excluded. |
| I.9: 30 rows of 20 seats give 600 seats. | Supports meaningful equal groups and two factors containing tens. The earlier hidden 2 × 7000 example is excluded; thousands remain supported by actual 3 × 8000 practice and the curriculum. |
| K.1: 3, 30, 300, 3000 divided by 3 give 1, 10, 100, 1000. | Supports quotient scaling with named units, while retaining the one-digit-divisor limitation. |
| K.2: 20 ÷ 1 uses 2 ÷ 1 and one end zero. | A weak identity-divisor example; it is not inflated into difficult division evidence. The actual 1600 ÷ 2 task and L.1 supplement it. The hidden 40000 ÷ 8 example is excluded. |
| L.1: 420 balloons in bundles of 7 gives 42 tens ÷ 7 = 6 tens = 60 bundles. | Supports grouping meaning, quotient units and common-fact reasoning. |

These corrected observations are sufficient for the sampled IXL comparison when combined with the independently read Khan place-value transcripts and complete official descriptor/elaborations. They do not replace the independent solution and coverage review of the original N05 questions, especially division by multiples of ten.

## Final review record

All 64 final items have been independently solved. Every choice was checked against the stem for unique correctness, including choices containing a proposed answer plus a reason. The summary and hint were read separately from the key. The verdicts below include the six wording/hint repairs and two later coverage replacements. The final bank contains 48 Practice and 16 Test items, four distinct choices per item and 16 keys in each A/B/C/D position overall. Mechanical checks confirmed that each key agrees with the single correct-choice flag; these checks support rather than replace the substantive verdicts.

| Item | Independently established answer and reasoning | Verdict |
| --- | --- | --- |
| P-001 | D: 10 groups of 7 are 70 counters; regrouping gives 7 tens. | PASS |
| P-002 | B: 46 × 10 = 460; 4 tens become 4 hundreds and 6 ones become 6 tens. | PASS |
| P-003 | B: the 4 changes from 400 to 4000; chart shows 406 accurately. | PASS |
| P-004 | B: 73 × 100 = 7300, comprising 7000 and 300. | PASS |
| P-005 | A: 9 boxes of 1000 contain 9000 paper clips. | PASS |
| P-006 | D: 120 × 100 = 12000; both non-zero digits change value by a factor of 100. | PASS |
| P-007 | A: 508 × 10 = 5080; the internal empty place is retained. | PASS |
| P-008 | C: 10 copies of 204 pages require 2040 printed pages. | PASS |
| P-009 | B: 6200 ÷ 62 = 100; the 6 changes from tens to thousands. | PASS |
| P-010 | A: 23400 is 100 times 234; the difference is not the requested factor. | PASS |
| P-011 | A: 18 × 10 × 10 = 1800 = 18 × 100. | PASS |
| P-012 | C: the 3 represents 300 before and 30000 after multiplication. | PASS |
| P-013 | D: 840 contains 84 groups of 10; revised explanation distinguishes units. | PASS |
| P-014 | D: 5600 is 56 hundreds, so the quotient is 56. | PASS |
| P-015 | D: 47000 contains 47 thousands. | PASS |
| P-016 | C: 800 ÷ 100 = 8; the chart correctly locates the 8 in hundreds. | PASS |
| P-017 | D: 6030 ÷ 10 = 603; zero marks the empty tens place in the quotient. | PASS |
| P-018 | B: 9200 ÷ 100 = 92; revised wording concerns digit values, not changing digit symbols. | PASS |
| P-019 | A: 1800 sheets form 18 bundles of 100. | PASS |
| P-020 | A: 730 balloons form 73 packets of 10. | PASS |
| P-021 | C: inverse multiplication gives 28 × 100 = 2800. | PASS |
| P-022 | B: the quotients are 640 and 64; the first is 10 times the second. | PASS |
| P-023 | C: 35 × 1000 = 35000 checks the exact division. | PASS |
| P-024 | C: 36000 ÷ 1000 = 36; table entries preserve the same dividend. | PASS |
| P-025 | B: 7 × 3 tens = 21 tens = 210. | PASS |
| P-026 | D: 14 × 20 = 14 × 2 × 10 = 280. | PASS |
| P-027 | A: 32 × 40 = 128 tens = 1280. | PASS |
| P-028 | C: 18 × 300 = 54 hundreds = 5400. | PASS |
| P-029 | C: 60 × 50 = 6 × 5 × 100 = 3000. | PASS |
| P-030 | B: 240 × 30 = 24 × 3 × 100 = 7200. | PASS |
| P-031 | C: 6 crates of 4000 contain 24 thousands, or 24000 tiles; every alternative has the wrong operation or scale. | PASS |
| P-032 | D: seven equal 40 cm sections total 280 cm; all seven sections are shown. | PASS |
| P-033 | B: replacing 70 with 7 × 10 gives 26 × 7 × 10 = 1820. | PASS |
| P-034 | C: 30 is 10 times 3, so 24 × 30 is 10 times 72. | PASS |
| P-035 | C: 16 × 200 = 32 hundreds = 3200 beads. | PASS |
| P-036 | D: the halls contain 600 and 400 seats; the difference is 200. | PASS |
| P-037 | B: 36 tens divided into groups of 3 tens gives 12 groups. | PASS |
| P-038 | A: 84 tens divided into groups of 4 tens gives 21 groups. | PASS |
| P-039 | C: 560 tens divided into groups of 7 tens gives 80 groups. | PASS |
| P-040 | A: 72 hundreds divided into groups of 3 hundreds gives 24 groups. | PASS |
| P-041 | B: 42 thousands divided into groups of 7 thousands gives 6 groups; 6 × 7000 = 42000. | PASS |
| P-042 | D: 450 tens divided into groups of 5 tens gives 90 groups; revised hint does not supply 90. | PASS |
| P-043 | D: 960 cm ÷ 30 cm per piece = 32 pieces; different drawing scales are explicitly disclosed. | PASS |
| P-044 | B: 4800 ÷ 60 and 480 ÷ 6 both equal 80; other expressions do not. | PASS |
| P-045 | A: the two group counts are 120 and 12, so groups of 300 yield one tenth as many. | PASS |
| P-046 | D: 2400 ÷ 40 = 60, and only 60 × 40 returns 2400. | PASS |
| P-047 | A: 16000 g ÷ 200 g per packet = 80 packets. | PASS |
| P-048 | A: 12 × 50 = 600 screws, then 600 ÷ 20 = 30 full bags. | PASS |
| T-001 | D: 702 × 100 = 70000 + 200 = 70200. | PASS |
| T-002 | A: 86000 contains 86 thousands. | PASS |
| T-003 | D: the 7 changes from value 700 to value 70 in quotient 470. | PASS |
| T-004 | B: 36 × 80 = 288 tens = 2880. | PASS |
| T-005 | B: 900 × 40 = 36 thousands = 36000. | PASS |
| T-006 | C: 96 hundreds divided into groups of 3 hundreds gives 32 groups. | PASS |
| T-007 | B: the labelled arrow requires 320 × 100 = 32000 cards. | PASS |
| T-008 | A: 1800 ÷ 20 = 90 tickets; 90 − 80 = 10 over capacity. | PASS |
| T-009 | A: inverse calculations give possible starting numbers 60 and 6000; revised stem states one unknown operation. | PASS |
| T-010 | C: 420 ÷ 20 = 21, followed by 21 × 100 = 2100. | PASS |
| T-011 | B: 26 groups of 4 hundreds make 104 hundreds, or 10400; revised reason keeps the units correct. | PASS |
| T-012 | C: both original numbers are renamed in hundreds; 144 ÷ 6 = 24 groups. | PASS |
| T-013 | C: 40 × 18 = 720 seedlings; 720 ÷ 60 = 12 trays. | PASS |
| T-014 | D: 1200 ÷ 30 = 40 packs and 1200 ÷ 60 = 20 packs; difference 20. | PASS |
| T-015 | D: with 60 bags fixed, 10 times the amount per bag requires 10 × 4800 = 48000 counters. | PASS |
| T-016 | A: 1260 ÷ 30 = 42; the missing ones digit is 2. | PASS |

### Corrections independently rechecked

P-013 now clearly names 840 as 84 tens before counting groups of 10. P-018 now scales the digit's value, without suggesting the symbol changes. P-042's hint no longer supplies the answer 90. T-008 explicitly ties the money to ticket sales. T-009 now states that one of two operations was performed. T-011 now states that 26 groups of 4 hundreds make 104 hundreds, rather than asserting that `26 × 4` alone produces hundreds. All six changes were read back from the bank after the author applied them, with answers recalculated and unchanged.

After the IXL source comparison, P-031 and P-041 were replaced to include multiples of 1000 explicitly. Both replacements, all four new choices, their summaries and hints were independently re-reviewed. The new Topic/Classroom examples `5 × 6000 = 30000` and `42000 ÷ 6000 = 7` were also solved and checked for correct thousands units. No new SVG was introduced by these replacements.

### All distinct question SVGs

Each file below was independently rendered with CairoSVG at its native 640 × 300 size and visually inspected, not merely parsed. The diagrams have clear labels, correct quantities and clean bounds. Each bank alt text conveys the same task data as the visible model without supplying the unknown answer.

| Asset | Visual judgement |
| --- | --- |
| `p003-chart.svg#p003-chart` | PASS: empty thousands, 4 hundreds, 0 tens, 6 ones; ×10 instruction |
| `p016-chart.svg#p016-chart` | PASS: 5 thousands, 8 hundreds, 0 tens, 0 ones; ÷100 instruction |
| `p024-pattern.svg#p024-pattern` | PASS: three division rows, fixed 36000 dividend, correct two known quotients and one unknown |
| `p032-bar.svg#p032-bar` | PASS: seven equal sections, each labelled 40 cm, total brace and unknown total |
| `p043-ribbon.svg#p043-ribbon` | PASS: 960 cm whole and 30 cm example piece; explicit different-scale note |
| `t007-print.svg#t007-print` | PASS: 320 cards → ×100 → unknown cards, with readable arrow and labels |

### Scoped launch and review code inspection

The reviewer independently inspected root's `quiz/year-4/math/reviewed-number-visuals.js` and the N05 Practice/Test launch and review wrappers. Initial feedback identified the weakness of ID-plus-prompt-only matching for historical image-dependent questions. The revised adapter also checks the saved bank version, explanation and correct-answer text. Legacy attempts without a matching version retain text review without borrowing a newer diagram. The asset regex is limited to same-code SVG paths and symbol fragments, and rejects traversal and external URL schemes. DOM creation and attribute assignment avoid interpolating saved data as HTML. N05 script order is bank → generic review → visual adapter, so the cards exist before the adapter decorates them. All six N05 paths fit the allowed pattern.

The new N05 launch example correctly reasons through `24 × 30 = 72 tens = 720` and inverse grouping. The common-mistake note distinguishes the extra factor 3 from multiplying only by 10. The review instruction preserves the no-calculator expectation. The same bank version is used by launch and review pages. Static code review passes; root retains the actual browser execution and live-deployment gate.

The reviewer also checked the new ongoing curriculum-code review section in `AGENTS.md`; it faithfully records the owner's scoped full-resource review instruction and separate independent approval requirement, without authorising a broad rebuild or architecture change.

## Companion-resource substantive review

The Topic Guide and Classroom View retain the current static resource flow and design shell. Their complete teaching text was independently read. All five worked explanations, associated arithmetic, guided tasks, specific important-question answers, three assessment checks, exit-ticket answers and misconception repairs are correct after the repairs below. The chart now has the necessary ten-thousands column and correctly aligns 406, 4060 and 40600. All five worked-example text/model blocks were compared with their Classroom copies and match exactly. Teacher-led initial pattern checking is separated from the student's required no-calculator work.

Required resource corrections were applied and read back: the Topic/Classroom `12 × 3` line now distinguishes the fact 36 from 36 hundreds; worksheet W005 and W007 likewise distinguish bare multiplication facts from hundreds. The definition of a power of ten now uses repeated multiplication by ten. The old off-code general-operation checks and unsupported remainder instruction were replaced with N05-specific assessment and inverse checks.

Release follow-up: the existing Classroom View `example-board` and `example-card` design containers were restored around the five actual reviewed worked examples. Cards use full-width rows for the place-value chart, headings remain in normal flow, and paragraph spacing is retained. Every visible word and calculation was compared before and after this bounded layout repair and is identical; all five worked-example texts still match the Topic Guide. The unchanged static topic validator passes all 23 Year 4 Maths pages. Browser layout verification remains a separate root-owned gate. A subsequent text-only correction accurately describes projecting and expanding Classroom View sections; the previous fixed-slide-deck instruction was removed. The How-to-use sentence also now names the actual Topic Guide → Classroom View → Homework → Practice → Test flow, using root-reviewed wording.

| Written worksheet item | Independent solution and verdict |
| --- | --- |
| W001 | PASS: 307, 3070, 30700; the 7 is worth 7, 70, 700. Drawn chart supplies constructed rather than selected evidence. |
| W002 | PASS: 64000 ÷ 1000 = 64, using 64 thousands and inverse multiplication. |
| W003 | PASS: 17 × 40 = 68 tens = 680. |
| W004 | PASS: 420 tens ÷ 7 tens = 60; inverse gives 4200. |
| W005 | PASS: 23 × 300 = 69 hundreds = 6900 buttons; repaired explanation preserves the units. |
| W006 | PASS: 9600 g ÷ 400 g per bag = 24 bags; inverse returns the original mass. |
| W007 | PASS: 18 × 200 = 36 hundreds = 3600; 360 is ten times too small. |
| W008 | PASS: 8 × 80 = 640 labels; 640 ÷ 40 = 16 packets. |

The dedicated worksheet JavaScript and static answer guide contain the same eight tasks and solutions. They are separate written tasks, not a random reuse of the Practice bank. The reviewer inspected the unchanged PDF renderer's explicit worksheet-bank interface and support for the supplied task types. W001 was changed locally to its supported self-check type to provide four writing lines for the chart and explanation.

Root generated the actual three-page homework PDF using the unchanged worksheet renderer, real jsPDF 2.5.1 and repository fonts. The independent reviewer then visually inspected all three rendered pages at full size: eight readable tasks across two pages, matching shuffled answer order on a separate third page, the corrected unit explanations, four chart-writing lines and clear footer spacing. No clipped text, overlap, broken multiplication/division glyph, wrong answer mapping or missing task was found. The PDF generation flow was exercised offline; no browser click/download success is inferred from that offline check.

## Coverage conclusion and release boundary

The final bank satisfies the complete N05 mathematical scope in the reviewed range: powers and multiples of ten through thousands, multiplication and exact division, digit-value reasoning, zeros, missing values, equivalent chains, grouping, comparisons, inverse checks and meaningful two-step transfer. Practice progresses through four concept groups; the test mixes fluency, explanations, error analysis and unfamiliar applications. Reading demand is proportionate to Year 4 and no later-year decimal arithmetic, negative-number operation, remainder algorithm or formal exponent manipulation is required. Companion written construction and explanations provide evidence that online multiple choice alone cannot establish.

All reviewed mathematical content passes. This does not claim exhaustive IXL adaptive mastery, student trial evidence, or completion of the remaining Year 4 Maths curriculum codes. The subject-wide Content Verified badge must remain off until every Year 4 Maths code passes the ledger requirements.

One attempt to view the local Topic Guide in the cloud browser returned `ERR_BLOCKED_BY_CLIENT`; it was not retried. The six question SVGs and the three-page homework PDF were independently rendered and visually inspected as above. Root retains the live HTML Topic Guide/Classroom layout and browser resource-flow checks, followed by release-integrity, Actions and Pages verification. Publication/deployment success is not asserted by this content-review report.

## Reviewed artifact identity

| Artifact | SHA256 |
| --- | --- |
| `assets/assessment-banks/year4/math/ac9m4n05.json` | `415772825c56946cb4426654d0e0f0fbbe39f4e264a5e1c6cdc3a9f81a262a44` |
| `year4/maths/ac9m4n05-solve-problems-involving-multiplying-or-dividing-natural/index.html` | `d7935e7d216686e8f8ba4a29ff220eb0d56281814bd9cc8744e720d868248fac` |
| `year4/maths/ac9m4n05-solve-problems-involving-multiplying-or-dividing-natural/teacher-slides/index.html` | `fb809ed086c137ba96188334c6fbe6f6931f8b7aaf48c39ac2a714b2c2d0b0f3` |
| `quiz/year-4/math/ac9m4n05/worksheet/index.html` | `c1eb3d9db25451a53fe7bfa2adbd684c45e0b11b9b195bb75b2945d654f31413` |
| `quiz/year-4/math/ac9m4n05/worksheet/worksheet-questions.js` | `275d8af72581a1458455f3656e215bee48d946abac3246df286896e16847408e` |

The six SVG artifact hashes are recorded in the author's handoff table. The reviewer independently rendered those same six assets and confirmed their paths, symbols and content. Any later mathematical, wording or visual change requires re-review of the affected item/resource before this approval is reused.
