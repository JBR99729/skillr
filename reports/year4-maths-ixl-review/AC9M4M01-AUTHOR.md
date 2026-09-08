# AC9M4M01 author report

Authoring checkpoint: 2026-09-08. This is scoped curriculum content maintenance on `content/year4-maths-third-five-current`; no author commit, publication, runtime bank generation, shared-code edit or ledger update was performed.

## Status and gates

- **Local bank review:** independent reviewer solved every item and inspected every original bank diagram. Mathematical content PASS after the correction loop below. This is not a source-comparison or publication approval.
- **Full resources:** strengthened Topic, native Classroom View and eight standalone written homework tasks authored; reviewer checked teaching and all worksheet objects and requested the narrow corrections recorded below. Final teaching, worksheet objects and the exact production PDF all passed independent local review; no content correction remains. The reviewer records the final artifact identity in the INDEPENDENT-REVIEW report.
- **Actual IXL/Khan comparison: HOLD.** No opened help/worked-example panel or representative question progression was observed. Search/catalogue matches and page navigation are candidate evidence only. Browser remained root-owned and unavailable.
- **External-source pause:** all author external requests stopped when root relayed the user's “too many requests” report. No retries or alternate access routes were attempted.
- **Publication:** pending root-owned gates. Do not add this code to the reviewed ledger or claim an overall independent PASS from this author report.

## Official scope

Exact ACARA v9 description: interpret unmarked and partial units when measuring and comparing attributes of length, mass, capacity, duration and temperature, using scaled and digital instruments and appropriate units

Full official descriptor and elaborations were read in `THIRD-FIVE-ACARA-SOURCE.json`, sourced from ACARA's April 2024 Mathematics linked-data release. The root-retrieved primary local JSON-LD SHA256 is `4d6b7a01d10517dc97ad709055c62c171b9b90ea33e0d0fc395e9bd2f96e48b1`. Every E-numbered statement appears with teaching expansion in Topic and Classroom in original source order. Raw release LaTeX delimiters are removed for clean display. Public curriculum references use [QCAA Mathematics resources](https://www.qcaa.qld.edu.au/p-10/aciq/version-9/learning-areas/p-10-mathematics).

The shared IXL research log was retrieved by root before the delegated work: version 17, 43,357 bytes, historical Year 3 material. It does not certify this Year 4 code.

## Authored resources and preservation

The baseline had 24 Practice and 16 Test questions repeating two templates with generic reasoning-pathway diagrams. Those weak items and diagrams were replaced with **48 Practice and 16 Test** questions: 42/13 four-choice selection items and 6/3 adult-reviewed practical tasks. Each item has reviewed wording, audio text, unique choices and key where applicable, explanation, hint and accessible representation. Practical items require actual measuring/making/drawing evidence and accept mathematically valid alternatives.

The static Topic and current native Classroom structure, free/no-login resource links, metadata, current related-resource sections and exact optional video block were preserved. Native Classroom `example-board` and `example-card` wrappers remain, with a single-column model grid to preserve legibility. No shared layout or runtime architecture was rebuilt. Generic “explain using the model above” answer placeholders were replaced with actual worked answers. The worksheet now uses its dedicated `worksheet-questions.js` through the existing production generator (`18.3-year4-workspace`, root-maintained pagination guard), with matching visible questions and answer guides.

Exact retained Topic video-block SHA256: `25972566031a104ee71598482664409674ec1f47ea734cab0a24e1a214b61032`.

## Elaboration and assessment coverage

| Strand | Primary authored evidence |
| --- | --- |
| E1 — analog/digital mass and interval meaning | P001–P008, P045; T001–T002; mass models and actual scale station; homework W001/W003 |
| E2 — attribute, unit, instrument and useful precision | P007, P009–P016, P044–P045; T003–T005/T015; zero alignment and mm models; W002/W003 |
| E3 — length, mass, capacity, temperature, whole/part readings | P001–P027, P043–P046/P048; T001–T009/T015; tape, jug, scales and thermometer models; W001–W005/W007 |
| E4 — unmarked clock minutes and short durations | P028–P031; T010–T011; explicit five-minute interval subdivision; W006 |
| E5 — timers/alarms and elapsed duration | P032–P036/P047; T012/T016; actual start/countdown/alert evidence; W006 |
| E6 — construct and calibrate a scaled instrument | P037–P039/P043/P046; T014; paper-ruler and direct measured-volume cup workshop; W007 |
| E7 — public Ranger instruments and local modelling | P040–P041/P048; T013; specific JCU temperature-logger context, classroom observations/invented examples; W008 |

Preserved useful teaching includes the 0–1 L scale in ten intervals, 0.7 L = 700 mL, 20–30 °C in five spaces, 0–2 kg in four spaces, 02:35 as minutes:seconds, 1.25 L versus 1180 mL, 1.4 kg versus 1350 g, mystery-scale and instrument stations. Added real nonzero ruler measurement, quarter/half units, nearest-minute clocks, alarm/timer operation and calibrated instrument creation. The original generic answer prompts were not retained.

## Primary source observation

Before the external pause, the author opened [JCU TropWATER's thermal-risk project page](https://www.tropwater.com/projects/thermal-risk-for-inshore-seagrass-on-the-great-barrier-reef). Public text describes working with Traditional Owners and First Nations Land and Sea Rangers to deploy temperature loggers in seagrass habitats, with repeated readings. Named Ranger image credits support the specific names included in the lesson. The independent reviewer also read this page before the pause and confirmed the narrow temperature-logging claim. No photographs or cultural accounts are copied; the classroom readings are explicitly invented or measured locally and cannot be presented as Ranger field data.

## IXL/Khan investigation limits

The author found primary IXL candidate pages for metric scale reading and Year 4 metric-unit comparisons. Opening `https://au.ixl.com/maths/year-4/read-a-scale-metric-units` did not yield inspectable content. A search result for the IXL US Grade 3 metric-scale page was a candidate only, not an Australian Year 4 observed progression. Khan measuring/area candidates were also investigated but did not provide an observed M01 worked progression. The independent reviewer separately reported navigation-only IXL thermometer output. None establishes the required opened-help/question audit. **HOLD retained.**

## Author and independent correction loop

- Author rendered and inspected all 23 bank symbols, then all four additional homework symbols: **27 distinct final SVGs**, each 640×300, with no label collision or clipping.
- Independent reviewer checked all 64 item fields and all bank diagrams; no incorrect numerical key was found.
- Corrected accessible descriptions to preserve the reading task: endpoint labels, count of equal intervals and position in spaces rather than a computed reading. Digital display alt retains the visible digits/unit.
- Corrected the 9:42 and 1:58 hour-hand descriptions to match the properly advanced drawings, and singular interval grammar.
- Homework W005 now asks for half-interval reasoning at 23 °C rather than calling it a partial degree; W007 explicitly asks for a labelled cup drawing.

## Local verification and artifact identity

The final existing production-bank validator passes for each code with four choices on every selection item, Practice key positions 11/11/10/10 and Test positions 4/3/3/3. Exactly 55 additional distractors per code were individually authored after the root detected that the original three-choice pattern did not meet the Year 4 schema. Correct answers and practical tasks were preserved; the independent reviewer has substantively checked every added choice and final four-choice set, confirming one valid key remains. No question, audio prompt, feedback, visual or practical task changed in that schema correction.

Narrow structural consistency checks confirmed 48 Practice +16 Test, unique IDs/choice texts and correct-key agreement, matching question/audio text, valid external-symbol references, eight dedicated worksheet records with synchronized visible questions and answer guides, required exact E-numbered labels, no generic answer placeholders, preserved Topic metadata and byte-identical video blocks. These checks supplement substantive review; they are not content approval. The root exported the actual production PDF, and the independent reviewer inspected every final page. Every shuffled question matches its answer guide; visual prompts, diagrams and four writing lines remain together, and models/glyphs are readable.

Author-rendered PNGs and montages are in `/workspace/scratch/b2c91567ebe4/measurement-qa/`; bank symbols use `m01-*` or `m02-*` and homework-only symbols use `m01-w-*` / `m02-w-*`. Every final distinct diagram was viewed, including all six homework-only diagrams.

| Current artifact | SHA256 |
| --- | --- |
| `assets/assessment-banks/year4/math/ac9m4m01.json` | `7405dd8396e3750080d59f3724ce0b28a306805f9e6dcfae35cea684861b4019` |
| `assets/assessment-visuals/year4/math/ac9m4m01.svg` | `098bceb51a61a3d479920ebf1a26789e63222475672eff2cdaabc61574ee797c` |
| `year4/maths/ac9m4m01-interpret-unmarked-and-partial-units-when-measuring-and/index.html` | `57c21d67714b47daa0303977ef7d89760399c35f0bb59fa59de1f7d54f85d965` |
| `year4/maths/ac9m4m01-interpret-unmarked-and-partial-units-when-measuring-and/teacher-slides/index.html` | `fffbcebc491ede9c6ee804e31fe018fa3d1f91383be3b5ec562435bed18d3f95` |
| `quiz/year-4/math/ac9m4m01/worksheet/index.html` | `3aa0ccba38be1d02092169bd5ee01c04275f08636a8695fcbf5ca3f3f4ae28c9` |
| `quiz/year-4/math/ac9m4m01/worksheet/worksheet-questions.js` | `b15e9deb228a8cd1e59522c9f39cca0c974e8815d9fc612dffa75dea399e4dcc` |

## Exact production PDF reviewed

- Root export: `/workspace/scratch/b2c91567ebe4/qa-pdfs/ac9m4m01-homework.pdf`
- SHA256: `8742fd4a173076230bdbe5378f752fc5974f37623edb748fe65ac4a4ce64e9c5`
- Independent page review: **all 8 pages PASS**; no content correction remains.
- This local PDF/resource result does not close the recorded IXL/Khan source HOLD.
