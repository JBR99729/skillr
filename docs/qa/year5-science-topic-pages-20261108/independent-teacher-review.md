# Independent teacher-style review — Year 5 Science topic pages

Date: 8 November 2026. Reviewer: separate teacher-style AI reviewer (`/root/science_teacher_review`), independent of the author; not a human teacher sign-off. **Result: PASS for the exact topic-page batch below after the corrections and independent rechecks recorded here. No unresolved substantive teacher-content finding.**

## All-item scope

Read all twelve final canonical HTML pages and every new authored field in `page-content.json`: twelve worked examples with supplied evidence, all 36 teaching focuses and guided questions/answers, all 36 reasoning questions/answers, 24 FAQs, 24 misconception repairs, twelve ten-minute activities, all differentiation and safety instructions. Independently checked that every authored text field is present in its matching final HTML. Read every retained teaching section: 108 were initially inspected, then the 24 obsolete reference/related blocks were removed, leaving the final 84 educational sections (seven per code). All 84 were compared with baseline `67510cd16f929f6ebbf633cbc6f1a6486c9a9398`; their normalised teaching text is unchanged except the single documented U04 factual repair.

Checked the full twelve descriptors against [QCAA’s official Year 5 AC v9.0 alignment](https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr5_as_cd_alignment.pdf), including all inquiry components and Country/Place permission planning. Research sufficiency and actual saved source identities were separately reviewed in `independent-plan-review.md`; this content review checks what was actually authored rather than inheriting that earlier planning decision.

## Scientific, numerical and representation checks

- U01 links particular structures/behaviours to named habitat challenges and mechanisms; mulga, little penguin, bogong moth and mountain pygmy-possum examples preserve species/season distinctions. Insulation slows heat transfer rather than making heat; no trait guarantees survival or represents conscious instant evolutionary choice.
- U02 distinguishes weathering in place, erosion/removal, transportation and deposition while allowing overlapping processes. Slow/rapid change is supported by stated conditions/time evidence, not a fixed speed assigned to a process. Classroom models are not natural-rate calibrations.
- U03 traces source → object → eye, distinguishes opaque transmission from reflection and explains blocked-path shadows. Reflection/refraction are separated; the new explanation and independent check explicitly retain the normal-incidence exception. No Sun/laser/unsafe-light experiment is required.
- U04 explains observable properties through arrangement and motion and distinguishes a liquid from a pourable collection of solid grains. Inspected all three new SVGs, independently rendered them with CairoSVG and viewed the resulting images. Each state has exactly twelve dots of radius 7; particle identity/size are unchanged. Solid vibration, close liquid rearrangement and distributed gas motion are represented separately and explained by labels/keys. Model limitations are explicit; compression reduces gaps rather than particle size.
- H01 uses the bounded historical role record: early Fleming observation followed by connected preparation, tests/apparatus and coordinated biological work. It explains contribution mechanisms and building on work, without sole-discoverer, equal-role or complete-history claims. No medical advice or culture/mould practical is included. H02 distinguishes runoff observations, proposed causes, response mechanisms, practical/value criteria and monitored decisions; the school case is explicitly hypothetical.
- I01–I02 use a coherent changed-variable/measured-outcome/control model. The final card-to-screen distance is 10 cm, not the earlier draft planning value of 20 cm. Torch distances use a specified front reference to the card plane; shadow height uses a consistent top-to-bottom nearest-centimetre rule. All numerical records are expressly invented models, not class measurements or measurements read from artwork. Three resets/runs reveal variation rather than promising identical readings.
- I03: independently checked subtraction 18.4 − 12.0 = 6.4 cm; five intervals per centimetre mean 0.2 cm = 2 mm. The enlarged 16–20 cm SVG has x=100 at 16 cm and 120 px/cm; its end pointer at x=388 is exactly 18.4 cm. The supplied 12.0 cm start is explicitly outside the enlarged section. Rendered/viewed the final SVG; labels, intervals, pointer, table and answers agree.
- I04: independently checked the complete repeated-data table and all question references. The graph is Run 1 only: (10,20), (20,15), (30,13). SVG axes start at zero, x=90+15d and y=300−10h; points (240,100), (390,150), (540,170) are correct. Both units and Run 1 identity are visible. The connecting line is described as a pattern indicator, not extra measured data. Independently rendered/viewed the final graph.
- I05 conclusions agree with all supplied repeats: shadows at torch distance 10 cm are 19–21 cm and at 30 cm are 13–14 cm. Group B’s 20 cm card-to-screen method is a clearly different hypothetical method; no absent numeric dataset is invented. Method differences, systematic setup problems, variation and dishonest fabrication are distinguished. I06 preserves the same data/mechanism/limits across audience versions, defines vocabulary and selects purposeful visual/digital tools.

## Artwork, safety and navigation

Viewed both final WebP scenes. The torch/card/screen scene is a coherent contextual setup; its plain ruler has no answer-bearing graduations. The dry-land scene is now accurately described generically rather than used as a mulga identification plate. All answer-bearing numerical information is in labelled HTML/SVG. Activities offer supplied-data/paper alternatives; cautions address wildlife, unstable banks/floodwater, torches/eyes, pressure/heating and cultures. Country/Place instructions distinguish access, collecting, recording and sharing, require appropriate local guidance and never invent consent or restricted knowledge.

Verified one matching catalogue entrance per page, Year 5 Science filters and exact canonical `returnTo`; no Year 5 Science code is in the published-bank ledger. No unpublished code-specific practice/assessment is advertised. All visible Learn links now use Year 5 Science. Existing page titles/descriptions/canonicals and all structured-data payloads match the baseline. Native HTML contains the full teaching, one main and H1, with unchanged code-matched Classroom View and written-resource paths. Runtime destination/network/layout verification remains the author’s separate software evidence.

## Findings and independent rechecks

| Finding | Severity and correction | Independent recheck |
| --- | --- | --- |
| Twelve pages retained duplicate official-reference and related-topic blocks outside the approved pattern. | Medium parity correction: remove those two obsolete blocks per page. | PASS: seven educational sections per code, 84 total; duplicate summaries removed and useful scientific teaching preserved. |
| U04 retained misconception remedy unconditionally said spacing increases when particles are heated. | Medium factual correction: qualify spacing by container/state while retaining particle motion and essentially unchanged particle size. | PASS: final text says “Heating can increase particle motion; spacing may change depending on the container and state. Particle size remains essentially unchanged in this model.” No other retained teaching changed. |
| Dry-land illustration had round yellow flower heads while alt text specifically identified mulga. ANBG describes mulga flowers as spikes. | Medium artwork accuracy correction: rename scene generically, remove species identification from alt text and add a visible explicit non-identification caption. | PASS: all three uses say “A slender-leaved tree…” and visibly state “Illustrated dry-land setting; not a species-identification image. Use the labelled text for the named species examples.” Correct mulga teaching remains separately labelled. Botanical check: [ANBG Acacia aneura](https://www.cpbr.gov.au/gnp/interns-2010/acacia-aneura.html). |
| Author’s software check found visible Learn links copied with Year 4 filters. | Medium navigation correction, recorded as author-detected rather than reviewer-originated. | PASS: independently inspected all twelve final pages; every Learn link uses `year=5&subject=science`. App filters and topic returns also match. |

The narrow corrections and affected dependencies were rechecked; unchanged teaching was not rewritten. This is an all-item topic-page review, not a question-bank six-pass QA certificate, worksheet/deck approval or proof of production browser behaviour. CairoSVG checks establish deterministic model rendering, not complete desktop/tablet/mobile layout verification.

## Exact final HTML identities

Paths are the exact code-to-path mappings in `inventory.json`; all recomputed SHA256 values match that inventory.

| Code | SHA256 |
| --- | --- |
| AC9S5U01 | `c6a614ab4809af44d79d95587ce8d2b8da6ab6c65a798452954e3652b712f55d` |
| AC9S5U02 | `8b52e85467dc980c31e8ca1592049ffe03a6d847d8dc754fc83b40a8f2b82ecf` |
| AC9S5U03 | `310be93a8abb7e6cffd31457216b1281571384fd6748aec28684ac4db5ecc6e6` |
| AC9S5U04 | `746bbceb125bbbf19d1b1a7c4041f8167b85ed103ec1232bd8593038e15edcd2` |
| AC9S5H01 | `ddf6bafd7effa969142e91360df9a694060d1521a1eab5291649d707e16b7efe` |
| AC9S5H02 | `d85e35fa2b96bf82629434aa1e67583fa1a958e246b1aa317793f5e2d6cf6951` |
| AC9S5I01 | `e8a88d908183ed0a6b29d85f8304af9fcfd27971642628f098cd97d7fb1c03cb` |
| AC9S5I02 | `d26a608e11304377797f62453fca413295f944fb2ca7f22ff47734758bec367c` |
| AC9S5I03 | `68869c13ded7a78b2dfcfa06f7ce13ff8ed5ae51f4dc946271542d56f3ca4c11` |
| AC9S5I04 | `40a6bd13357f5962bf7f4c92ea835ec7abd4b95249e144cdf445b60530030885` |
| AC9S5I05 | `41d82db3eb1e3857f8be7c554631a46fd2a65a85aee1580af7ed190bc8d5120a` |
| AC9S5I06 | `2507f6710859261b2ccd2c9ca16348eaf308c3d07b04381ed12343a9d4dfe492` |

## Viewed final contextual assets

- `dry-land-creek.webp`: `b09c7130937c54e2dbb75faf3280e30d4db2a9afce3f12808dc3198dfd0a205f`
- `light-investigation-bench.webp`: `92fa83f4a7a1dd52346bb22a9a663775a674d009241db4c2323415055553c1f3`
