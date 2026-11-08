# Independent teacher-style review — Year 6 Science topic pages

Date: 8 November 2026. Reviewer: separate teacher-style AI reviewer (`/root/science_teacher_review`), independent of the author; not a human teacher sign-off.

**Final result: PASS for the exact topic-page batch below after the narrow retained-example repairs and independent recheck. No unresolved substantive teacher-content finding remains.**

## All-item inspection completed

Read every authored field in `page-content.json` and all twelve matching canonical HTML pages: twelve worked examples/evidence sets; all 36 teaching focuses and guided questions/answers; all 36 reasoning questions/answers; 24 FAQs; 24 misconception repairs; twelve activities and all differentiation/safety guidance. Independently checked that every authored text field appears in the correct final HTML. Read every one of the 104 retained educational sections, including every inherited task, model explanation, question/answer, assessment hint and mastery statement.

Checked the twelve descriptors against [QCAA’s official Year 6 AC v9.0 alignment](https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr6_as_cd_alignment.pdf). The source methods and exact twenty evidence-file identities were separately reviewed in `independent-plan-review.md`; historical completion labels are not being substituted for this final authored-content inspection.

## Scientific and numerical checks

- U01 distinguishes physical conditions from living influences and treats growth, health and survival as different outcomes. The invented twelve-seedling model has four matched plants at each 2/6/12 mL daily setting, all starting at 20 mm. Sums 124/172/144 mm give final means 31/43/36 mm and mean increases 11/23/16 mm. All four plants per setting remain alive at day 9. No universal optimum, lifelong-survival or more-water-always-better inference is made.
- U02 separates planetary revolution, axial rotation and tilt-plus-revolution. Southern temperate June/December daylight comparisons, fixed axis direction, polar exceptions, rotation viewpoint and clock-change limits are correct. Independently inspected and CairoSVG-rendered the two-position model: axes have the same vector, their north ends point upper-right, June southern pole points away from the central Sun and December southern pole towards it, and each Sun-facing hemisphere is illuminated. The diagram is explicitly not to scale.
- U03 distinguishes conducting path, component role, charge and energy transfer/transformation. The one-cell model has a closed switch and suitable intact incandescent lamp; the wire path ends at the top and bottom of the lamp symbol, with no hidden bypass. Cell long/short strokes and positive/negative labels agree. Energy outputs include heating; charge is not consumed. Conductor claims are appropriately limited by contacts, apparatus and test conditions. Incandescent polarity is not generalised to LEDs.
- U04 correctly contrasts state changes and ordinary table-salt recovery with cooking/rusting new-substance formation. Evaporation recovers salt without automatically collecting water; filtering does not normally retain dissolved salt. Salt is not a necessary rusting ingredient. Bubbles/colour alone and difficulty reversing alone are not universal chemical-change tests. Mixed physical/chemical events and ordinary classroom reversibility are qualified.
- H01 explains why selected preparation, apparatus/testing and coordinated biological contributions build on the early Fleming observation. It neither claims a lone discoverer nor a complete or equal contribution list. H02 uses the invented plant comparison as bounded decision evidence and distinguishes criteria, stakeholder priorities, practical care and monitoring from a universal watering recommendation.
- I01/I02/I05 maintain consistent variables, baseline, timing, reference points, randomisation/replication and outcome measures. A prediction is not a result; differing methods and natural variation are not automatically dishonesty. Missing hypothetical Group B numbers are not invented. Confounds and consistent reference-point errors are not repaired by merely adding repeats or averaging. Country/Place guidance separates access, collecting, recording and sharing permissions and does not invent consultation or consent.
- I03: five equal intervals span 10 mL, so each is 2 mL and three steps above 30 mL give 36 mL. Independently checked the SVG: zero is y=300, the scale is 5 px/mL, and the concave meniscus has endpoints y=112 and quadratic control y=128, making its bottom y=120 at 36 mL. Arrow and label agree. The example is explicitly separate from small plant doses and does not justify unsupported decimals.
- I04: independently checked all raw values, sums, means, baseline differences and questions against the table. The graph correctly displays mean final height, not height increase or survival. Baseline y=300 and 5 px/mm produce bars of 155/215/180 px for 31/43/36 mm. Labels and categorical 2/6/12 mL settings are correct; equal category spacing is not misrepresented as a numeric horizontal interval scale. I06 keeps data status, values, units, outcomes and limits consistent across audience versions.

## Visuals, safety, navigation and metadata

Viewed both WebP contextual assets and independently rendered/viewed all four new SVGs. The seedling scene contains six pots and is not treated as the actual twelve-plant dataset or a scale measurement. Alternative text matches the visible objects. The material-change still life shows ice/water, white crystals, clear liquid, a rusty screw inside a closed jar and toast; the image is context rather than proof of a chemical mechanism. All answer-bearing values are supplied in labelled HTML/SVG.

Activities provide paper or supplied-data options. Safety guidance addresses eye exposure, school-cell equipment, short circuits, mains, pressure/heat, sharp rusted samples, food/solution tasting, plant care/hygiene, wildlife and cultural permissions. Historical collaboration activities do not request culturing mould or testing medicines. No inappropriate advanced electricity equations, atomic mechanisms or formal statistics are required.

Independently checked all twelve page titles/descriptions/robots/canonicals and every JSON-LD payload against baseline `3914b2a5d73b0620abf3bbf4e98ee55d0a69c5ac`: unchanged. Each page has one main/H1 and a matching catalogue entrance with `try=1`, `year=6`, `subject=science` and exact canonical `returnTo`. No AC9S6 code is in the published-bank ledger; unavailable code-specific practice/assessment is not advertised. Every Learn link uses Year 6 Science. Static teaching and native disclosures remain available without JavaScript; the shared PWA/navigation loader is present. Classroom View and written-resource paths remain code-matched. Runtime network/destination and whole-page browser/device verification are separate software evidence.

## Findings, corrections and independent recheck

| Resource | Finding | Correction and outcome |
| --- | --- | --- |
| U01 retained investigation routine, “evaluate limitations” | The model answer asserts one pot per light level although the task did not give that sampling detail. | Corrected: the specific sampling given is now explicit in that task. Independent recheck PASS. |
| Retained worked-thinking examples in H02 and I01–I06 | Some legacy MCQ-derived prompts omit choices while their model explanations refer to absent answers, for example “this statement”, “both groups” or “only this plan”. Some examples provide criteria without the actual model sentence/question/heading/conclusion. | Corrected: self-contained open tasks and complete explicit original model answers replace the incomplete pairs while preserving their scientific focus. Independent recheck PASS; exact scope below. |

The exact repair record is `retained-corrections.json`: 40 local paragraph replacements affecting 23 worked examples across eight codes (U01: 1; H02: 5; I01: 3; I02: 3; I03: 2; I04: 2; I05: 2; I06: 5). Independently read every before/after task and explanation and checked its science, givens, response criteria, arithmetic and contextual dependencies.

**Independent delta recheck: PASS.** The U01 sampling limitation is now explicitly supplied in its task. Previously incomplete H02 problem/evidence/stakeholder/option/limitation responses now give complete open examples. I01 supplies actual investigable questions and a clearly approved paper-planning exercise example. I02 supplies a fair-test model, correctly identifies 83 mm = 8.3 cm as an example rather than a missing figure reading, and explains the quantities/timing required for repeatability. I03 gives complete model leaf records. I04 supplies the requested heading and four-week title. I05 explicitly compares 14 versus 9 tomatoes (difference 5 per plant) and states a measurable follow-up. I06 supplies actual audience wording, explicit model givens and complete answers: 38→31°C is a 7°C decrease over five minutes; 24°C is correctly quantity-labelled; shaded 18.2°C versus unshaded 22.4°C is a 4.2°C association, with causation qualified; the supplied 52°C record replaces vague wording without pretending a single adjective is a measurement. Numerical examples are framed as model records and do not claim a conducted field/human/plant experiment.

Independently compared every one of the 104 final retained sections with the exact baseline text after removing only the known navigation utility. The only changes are the 40 ledger replacements in their specified sections; every other retained section is text-identical. Each replacement’s old text occurs exactly once in its reviewed source section, each new text is present in the final HTML, and no unlisted teaching change remains. Final metadata and structured-data identity were rechecked after regeneration; the unchanged new data/models did not require another full review round.

No other substantive new-content, diagram or retained-science defect was identified. This is an all-item topic-page review, not question-bank six-pass QA, app marking/progress checks, slide/worksheet certification or a production browser pass. CairoSVG inspection establishes deterministic model rendering; whole-page desktop/tablet/mobile browser behaviour remains separate software evidence.


## Exact final HTML identities

Paths are the exact mappings in `inventory.json`. All independently recomputed SHA256 values match that inventory.

| Code | SHA256 |
| --- | --- |
| AC9S6U01 | `858fd4b0723bdc0ac6066a7e1e7183b02b49c7c117a39a098a8119306f2fe67e` |
| AC9S6U02 | `4c41484bf73e6da427c1bc5e7f7591d19ce0524fdc948d6623565837b6675a57` |
| AC9S6U03 | `a1849a5b1412a3ed5cfe7fb00d711af51acc8cdb41933b64c89c4a3857a8338a` |
| AC9S6U04 | `6636a3017a42efb345f4e9dfecc137b78201fcc91b05abfa8de7dced42d98efc` |
| AC9S6H01 | `40767af926963069640c0d5ecba2a70fc5c0b303cfa6fddd1508c8e9cf736392` |
| AC9S6H02 | `5953e17fb095d04276e4032782311e59dbc49319733b4e06ad583dec4979dde9` |
| AC9S6I01 | `1df010758b60c91b6724c83c6dda745a5d1ae2b94c5dbd451787d002277d006b` |
| AC9S6I02 | `e327e77895e70661bbf0248d83ae4f1d648dd3f0518158d65bcaab7692f11c67` |
| AC9S6I03 | `0de92bcf899a651a21c8e1a6e940d6cdade228e3c92c05b62bf9d71800de2fcf` |
| AC9S6I04 | `8c11198c78a9f0c8cdcb11527d8e878de5917e00c8e3cba35ab49dbc6a56a4ed` |
| AC9S6I05 | `d15a59ffacb5090083d8e611878b18406c3ac49f516b5d35babf3c4dc047061e` |
| AC9S6I06 | `24912e4b507c2a9a3c614530dec580dbbf28d77e135bccba2fb95d05cf879127` |

## Reviewed repair ledger and viewed contextual assets

- `retained-corrections.json`: `dde7263f18ae446b3f4b21ecb9369fcc3a413c533dad50f8c3fdc98e7abe9f34`
- `materials-changes-still-life.webp`: `eca81e1c79393afdcc86af92aa24f164dadeffc77f8f8659e3ed83db1403b1fb`
- `seedling-study-bench.webp`: `04d07d21e49fdaa50e41bc6d47c071f823cc82b94ec601a30971bd26d5db6791`
