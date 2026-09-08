# AC9M4M04 author review — third five

Status: **HOLD for full approval.** Local authored mathematical, item, visual and resource review has passed the separate reviewer's correction loop. Exact production-PDF inspection and actual IXL/Khan lesson/help/question observations remain pending at this checkpoint. This report is not publication authority; root owns generated runtime banks, wrappers, shared code, ledger and release. Nothing was committed or published by this author.

## Scope, instructions and official source

Work is confined to AC9M4M04 in `skillr-third-five` on `content/year4-maths-third-five-current`. Read the third-five team brief, AGENTS.md, Static Curriculum Architecture v2 and the long-life content standard; inspected the current complete Topic/Classroom/worksheet HTML and available page history. The team brief records root's initial retrieval of the research log (version 17, 43,357 bytes), whose historical Year 3 evidence does not certify Year 4. No historical review or other code's release status is transferred to M04.

The exact descriptor and every elaboration were read from `THIRD-FIVE-ACARA-SOURCE.json`, then checked against the actual statement nodes and all four child links in the complete official [April 2024 Mathematics release](https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/MAT/export/MRAC/2024/04/LA/MAT.jsonld). Independently recomputed whole-file SHA256: `4d6b7a01d10517dc97ad709055c62c171b9b90ea33e0d0fc395e9bd2f96e48b1`.

Exact descriptor: estimate and compare angles using angle names including acute, obtuse, straight angle, reflex and revolution, and recognise their relationship to a right angle

- E1: classifying the interior angles of a range of shapes, using examples of angles to identify acute, obtuse, right and reflex angles
- E2: identifying angles within the environment and estimating whether they are acute, obtuse right or reflex
- E3: creating a right-angle template using cardboard or a double-folded piece of paper and using it to compare angles in the environment, commenting on whether they are smaller than or greater than a right angle
- E4: using different measuring tools such as a spirit level or set squares to determine whether lines or objects are straight, square or perpendicular (at right angles)

The formal E2 line retains the source export's missing comma between “obtuse” and “right”; teaching prose distinguishes the four names clearly. Public references use the [QCAA v9 Mathematics resources page](https://www.qcaa.qld.edu.au/p-10/aciq/version-9/learning-areas/p-10-mathematics), without direct teacher/PDF downloads.

## Coverage and authored content

The previous bank relied on recurring degree-labelled classification and revolution-count questions with generic “Represent / Reason / Check” visuals. The new questions use original mathematical angle diagrams and complete textual setups. Sound existing ideas are retained and developed: the amount of turn, benchmark angle cards, quarter/half/full turns, and invariance under arm extension and rotation. Degree measurement with a protractor and angle-sum theorems are not core content.

| Required component | Practice / Test evidence | Teaching and written evidence |
| --- | --- | --- |
| Estimate, name and compare acute, right, obtuse, straight, reflex and revolution relative to right angles | P001–P014, P031–P034, P041–P042, P048; T001–T003, T006–T008, T012, T015 | Six named benchmark models; distinct angles within a type; about half and one-and-a-half right angles; W001–W002, W005–W006. |
| E1 interior angles of varied shapes, including an inward reflex corner | P015–P020, P045; T004–T005, T013 | Shaded polygon model with marked A right, B obtuse, C acute and D reflex; actual concave construction; W004. |
| E2 environmental identification and estimation | P021–P025, P043; T009, T014 | Scissors, door/gate top views, book cover, opened card and turning pointer; estimate-before-check object records; W003. |
| E3 actual template construction and use | P026–P030, P043–P044; T010, T014–T015 | Exact second-fold alignment or cardboard traced from a checked square corner; actual placement at vertex and one arm; retained physical template and before/after records; W003. |
| E4 choose and actually use tools for straight, square, perpendicular and level/vertical checks | P035–P040, P046–P047; T011, T016 | Straightedge, set-square placement and supervised spirit-level model/record; neither one matching set-square edge nor a bubble alone establishes an arbitrary right-angle join; W007–W008. |
| Genuine drawing/doing and evidence-based explanation | P043–P048; T014–T016 | Actual folds, card construction, traced/rotated angles, concave shape, set-square line drawing and spirit-level record; explicit task-specific acceptance criteria. |

There are **48 Practice items** (42 four-choice items and 6 adult-reviewed practical responses) and **16 Test items** (13 four-choice items and 3 adult-reviewed practical responses). Correct-choice distributions are Practice 10/11/11/10 and Test 4/3/3/3. All text-only stems are self-contained. Every audio prompt exactly matches its visible stem. Every question, alternative, key, explanation, hint, audio prompt, visual and practical model/criterion was reviewed during authoring and the independent correction loop; structural counts alone are not treated as content approval.

Forty bank symbols use the existing external-SVG schema and exact `0 0 640 300` viewBox. Orange marks the intended angle; the separate right-angle benchmark is green, including its arc. Reflex and full turns show long/complete arcs, and concave interior arcs remain inside shaded shapes. Diagrams vary orientation, size and arm length deliberately. Six further standalone SVG teaching models show the benchmarks, four interior types, actual paper folding, template placement, tool use and invariance. All 46 final SVGs were rendered with CairoSVG and visually inspected by the author; the reviewer independently rendered and inspected all 46 as well.

## Correction loop

The author and independent reviewer identified and corrected initial geometry issues: the P015 triangle's apex is now clearly acute, P016 rectangle vectors are exactly perpendicular, P017 marks the genuinely obtuse upper-left corner, and P039's set-square corner is exactly at the line intersection. T004 was rebuilt twice; the final leftmost corner uses vectors (50, -85) and (50, 85), with dot product -4725 and an approximately 119-degree interior opening. The supplementary numeric calculation is author QA only and does not appear in pupil tasks. All final marked-shape keys match the rendered geometry.

T004 says leftmost corner, T009 labels the open gate correctly, and T013 describes the outside gap as lower-right. Benchmark arcs changed to green so orange has one consistent meaning. Alt text describes the visible arms and arcs without supplying an added comparison conclusion. P043 makes optional angle names explicit in the rubric; P047 now asks how to check the untested support join. Practical answers accept correct alternative constructions, orientations and observed level/not-level outcomes, and estimates may be corrected after checking.

The resource review moved the reflex/revolution teaching diagrams away from their labels, corrected the singular acute benchmark caption, moved the interior-model D label clear of its arc, and added white SVG backgrounds. The tool worked question now refers to an **unchecked** support. The template routine follows the marked arc and explicitly considers straight/full-turn boundaries, including exact straight angles and revolutions. W003 explicitly asks for each object name so its prompt and evidence guide agree.

## Topic, Classroom and homework

The Topic Guide has complete static teaching, exact official wording and actual `<strong>E1:</strong>` through `<strong>E4:</strong>` markers, five worked sequences, real answers to important/assessment questions, tool and folding actions, checkpoints with remediation, guided activities, misconceptions, Support/Core/Extend and an evidence-based exit ticket. Classroom View contains identical authored teaching bodies in its existing native expandable design and retains the recognised `Clean one-page examples` heading and native example cards. The full-width worked-model treatment preserves readable diagrams.

Original heads, metadata, canonicals and public resource journeys are unchanged. The optional video marker block is byte-identical to the original; SHA256 `d51bfc2c20de3dc7023c8507c23960f1afc78eb63d7c5a98041fa685e8e5e463`. Static teaching remains available without curriculum-rendering JavaScript. Existing related-resource, public mapping, feedback and optional resource material remains intact.

Eight written tasks were separately authored for the worksheet, with complete matching answer/evidence guides in both HTML and the dedicated `worksheet-questions.js`. Their IDs are `ac9m4m04-w-001` through `ac9m4m04-w-008`. Each is self-contained under PDF shuffling and independently specifies its material, setup, drawing/action and required record. Large constructions explicitly use separate paper. The page loads `/quiz/assets/worksheet-pdf.js?v=18.2-year4-workspace` and its dedicated data, rather than borrowing Practice items. Root owns the exact PDF export and the reviewer owns independent inspection of every exported page.

## Source observations and explicit limits

External source calls were stopped when root relayed the user's request to pause them. No Browser, sign-in, identity change or alternative access attempt was used by this author.

| Primary source | What was actually observed | Status / use |
| --- | --- | --- |
| [IXL Year 4: acute, right, obtuse and straight angles](https://au.ixl.com/maths/year-4/acute-right-obtuse-and-straight-angles) | Successful search identified the skill; direct web open returned navigation and membership/sign-in chrome only. No actual skill question or opened help was available. | **HOLD** for actual help/question/progression comparison. |
| [IXL Year 4: estimate angle measurements](https://au.ixl.com/maths/year-4/estimate-angle-measurements) | Direct web open likewise returned the page shell only. | **HOLD**; no degree-measurement progression is imported from its title. |
| [Khan Academy: angle types review](https://www.khanacademy.org/math/cc-fourth-grade-math/plane-figures/imp-angle-introduction/a/angle-types-review) | Primary search snippet surfaced; direct page open returned no lesson body. | **HOLD** for full conceptual supplement; no video, diagram or exercise was inspected. |
| [STABILA Type 80 AS primary manufacturer page](https://www.stabila.com/en/service/press-releases/02-2020-type-80-as-spirit-level-20-cm-short-and-sweet.html) | Opened page states that this spirit level has separate horizontal and vertical vials and measuring surfaces. | Supports using the appropriate vial and distinguishing what is checked. General angle/line reasoning remains ACARA-led; no brand claims are taught to pupils. |

A catalogue/search match, empty lesson page or hidden/preloaded text is not evidence that a help panel or representative question progression was observed. Overall approval remains HOLD until that actual source comparison is completed under root coordination.

## Local verification and remaining gates

- `validate_production_question_bank.mjs` passes all 64 items, answer-position balance, uniqueness, audio alignment, adult-response requirements and counts.
- Exact original-head and video-block comparisons pass for the owned resources. All four primary descriptions and child relationships were checked; all formal descriptor/elaboration strings occur in Topic and Classroom.
- All major teaching body strings occur identically in Topic and Classroom. All eight question, correct and explanation strings match the worksheet page and dedicated data. Every bank fragment and teaching asset link resolves to an existing 640×300 diagram.
- The Year 4 static-topic validator reported no M04 failure. Its batch run currently reports other authors' in-progress card/link findings; root has been notified. This is not represented as a full batch pass.
- Author native-size SVG renders and independent final renders pass. Exact production PDF and all its rendered pages remain a root/reviewer gate at this report checkpoint.
- Runtime publication/wrappers, complete-tree release integrity, actual source review, ledger eligibility, deployment and live-page checks are root responsibilities. No verified badge, ledger record, commit or publication is authorised by this report.

## Frozen authored artifact identities

All paths are relative to the scoped worktree. Changes after these hashes require the relevant review to be repeated.

| Artifact | SHA256 |
| --- | --- |
| `assets/assessment-banks/year4/math/ac9m4m04.json` | `4c57c4e2a122f8cf0b2764edb4deb5d92a7f37bdbaa741058d2c55acb429fcbd` |
| `assets/assessment-visuals/year4/math/ac9m4m04.svg` | `17960787210df60c40563613fb405f5883b90d76544cda4a415f5da47bc12878` |
| `assets/assessment-visuals/year4/math/ac9m4m04-model-benchmarks.svg` | `12df8098df62d854272c8ad35d36541df18f4abda23dc8fa705da75299892920` |
| `assets/assessment-visuals/year4/math/ac9m4m04-model-fold-template.svg` | `9b1dad7784077023d91f024b79ae22ce810b2c82e4607081382203e282258750` |
| `assets/assessment-visuals/year4/math/ac9m4m04-model-interiors.svg` | `7df414d73a71374b6364f733b74ed6864987e65b09908ff18f155003f2bfd6f9` |
| `assets/assessment-visuals/year4/math/ac9m4m04-model-invariance.svg` | `c9ff80bfab19fd7a15271d10857683d8d5b38e1e8ce5844cbe9154c43387fd84` |
| `assets/assessment-visuals/year4/math/ac9m4m04-model-tools.svg` | `f3903c5867a7aeabe8abd12ba56f3cc239314e01aaf74a9ed094407c18e96d4f` |
| `assets/assessment-visuals/year4/math/ac9m4m04-model-use-template.svg` | `3992be280d9fd25baf2b2eb045b8a6f5f12feb16a7203d61f44937f5861dafef` |
| `year4/maths/ac9m4m04-estimate-and-compare-angles-using-angle-names-including-acute/index.html` | `7e8dce506667d8a83701c524179031778eebca4fb33175040b4c0f90008d9f0f` |
| `year4/maths/ac9m4m04-estimate-and-compare-angles-using-angle-names-including-acute/teacher-slides/index.html` | `38f84f865ab2d7f759378e5c9f44e544fd2a69261902833f0c4e441ef84542fa` |
| `quiz/year-4/math/ac9m4m04/worksheet/index.html` | `4047b3a43b312fa71c9cdc181e3badd004cea1961a9d076cc1b59bad2c81aff4` |
| `quiz/year-4/math/ac9m4m04/worksheet/worksheet-questions.js` | `282e73089ee5faf3e6fa69f77fa69b0bf82dc11351c9afa1f806616ba92fc981` |
