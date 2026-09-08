# AC9S4I01 independent resource review

Status: APPROVED for authored content and actual worksheet PDF. Shared runtime integration, release integrity, CI/Pages and live checks remain root release gates.

Reviewer: science_i01_i02_reviewer. Author: science_i01_i02_author. Date: 2026-09-08.

## Independently verified curriculum

Official ACARA Science JSON-LD: [MRAC 2024/04 Science JSON-LD](https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/SCI/export/MRAC/2024/04/LA/SCI.jsonld), locally retained `/tmp/u02-science.jsonld`. SHA-256: `50c24e93a6b099111d058cf296022f6575dc4d92592b3406440e5831bf56bd53`.

Descriptor: pose questions to explore observed patterns and relationships and make predictions based on observations

All four elaborations, in official source order:

- AC9S4I01_E1: posing questions about why some materials are used more often than others for particular products
- AC9S4I01_E2: predicting the effect on food chains when living things are removed from or die out in an area
- AC9S4I01_E3: consulting with First Nations Australians about how to predict the location of water sources from observation of landscape features
- AC9S4I01_E4: making predictions about the distances over which magnets will attract or repel each other

The current ACARA work sample [Digital project: Rescuing Rapunzel](https://www.australiancurriculum.edu.au/resources/work-samples/technologies/digital-technologies/years-3-and-4/ws01-digital-project-rescuing-rapunzel) independently confirms the current descriptors and Year 4 inquiry achievement standard. The search-indexed 2021 draft at v8/media/7158 has superseded elaborations and was excluded.

## Baseline substantive review

Read every baseline question, all four choices, answer keys, summaries and hints: 40 Practice + 16 Test per code. Read complete Topic Guide, Classroom View and worksheet shell. Sent the following concrete repairs to the author:

- Add direct food-chain removal and local First Nations consultation coverage; magnet-distance questions must include attraction and repulsion between magnets.
- Make the student pose questions and write observationally justified predictions. Selecting an MCQ does not establish the ability to create either.
- Remove shuffled-option position references in P023, P030 and T006.
- P015 must not present association alone as a demonstrated cause. Yes/no observation questions can be testable; scientific inquiry need not always deliberately manipulate variables.
- Preserve useful wet-cloth question model and improved-question table. Replace generic answer placeholders, stale one-page PDF wording and E3 teaching-context downgrade.

## Final authored review

Read the final authored 48 Practice (44 MCQ + four adult-review tasks), 16 Test and eight independent homework tasks, including every choice, key, explanation, hint, model answer and acceptance note. Read complete updated Topic Guide and Classroom View. All requested authored-content fixes have been applied and independently rechecked. The actual PDF check below also passes.

| Curriculum requirement | Final authored evidence reviewed |
| --- | --- |
| Pose questions and predict from observed patterns | P001–020, P041–045; T011–015; homework 1, 6–8; wet-cloth model and question clinic |
| E1 material selection for product purpose | P005, P008, P011, P018, P039–040, P045; T001–002; homework 2; drip-results model and improved-question table |
| E2 change in food chains | P021–026, P046; T003–005; homework 4; food-to-eater chain and qualified two-link effects |
| E3 landscape/water consultation | P027–032, P047; T006–008, T016; homework 3; teacher-led consultation scaffold, attribution and explicit limits |
| E4 magnet distance predictions | P007, P033–038, P048; T009–010; homework 5; both attraction and repulsion with stated gaps/pole arrangements |

All MCQs have one defensible keyed answer under their stated conditions. Invented model data are identified as classroom examples. Observations are not treated as proof of causation; yes/no and observational questions are expressly allowed. Food-chain effects are qualified, not deterministic exact counts. Lack of visible magnet movement is correctly distinguished from an absolute zero-force claim.

P045–048 require actual written evidence and adult review. P047 and homework 3 assess consultation preparation; they do not claim a consultation took place. The Topic Guide explicitly requires the teacher to arrange appropriate local engagement and to follow guidance on what can be shared. No universal water-finding clue, fabricated cultural quotation or local endorsement is authored.

Independently opened [SA Water Anangu Water Wisdom teacher guide](https://www.sawater.com.au/__data/assets/pdf_file/0006/2592987/Anangu-Water-Wisdom_teachers-guide-2026.pdf), pages 2–4: APY community co-design, respect for local knowledge and consultation with educators/Elders directly support the narrow pedagogical claim. Its combined Years 4–6 curriculum table is not used as the official descriptor; the exact ACARA JSON-LD remains authoritative.

### Corrections requested after final handoff

1. P039 stem requested a reason while the correct choice was a research question. Align the stem with the answer form.
2. E1 Topic/Classroom caption incorrectly described the amount passing through as equal; the added water is equal and the outcome varies.
3. Magnet-model subtitle must make clear that gap is the only changed factor within each pole-arrangement row.
4. Replace Classroom View's duplicated old learning-goal block with the new canonical goals for source consistency.

All four fixes are now resolved. P039 also has four consistently worded question choices; both canonical and Classroom captions match the SVG values.

### Visual inspection

All three authored 640 × 300 SVGs were rasterised with sharp and individually viewed: material-observations, food-chain and magnet-observations. Text, arrows, column alignment and values are legible without overlap or clipping. Bar lengths correctly represent 7, 1 and 10 mL; arrows point from food to eater; magnet rows match all question references. The corrected within-row subtitle was re-rendered and independently inspected cleanly.

### Actual worksheet PDF

Root exported `/workspace/scratch/c0dec7faa19d/qa-output/year4-science-pdfs/ac9s4i01.pdf` through the real production worksheet-PDF runtime. Independently extracted the complete text, rasterised and visually inspected all five pages at 1.25×. Pages 1–3 contain all eight prompts with usable writing space; pages 4–5 contain matching answers and adult criteria. No missing text, broken arrows, overlap, clipping or footer collision. The PDF uses the authored eight tasks, not the legacy nine-item sheet. PASS.


## Reviewed artifact identity

SHA-256 hashes below identify the authored resources at independent approval. Later wrapper/cache-only root changes require separate integration verification; any teaching/question/visual change requires a renewed substantive check.

| Artifact | SHA-256 |
| --- | --- |
| `assets/assessment-banks/year4/science/ac9s4i01.json` | `a9357abb2f16e1c78a14b6b37e09a1d80d8dc7e4ec7462e09ae5ecb109e959aa` |
| `year4/science/ac9s4i01-questions-to-explore-observed-patterns-and-relationships-and/index.html` | `7ce37f64cfebc9213fbf07827edfbc6a420c2efbd50c110f417721cb24b47305` |
| `year4/science/ac9s4i01-questions-to-explore-observed-patterns-and-relationships-and/teacher-slides/index.html` | `12caf910b8a22fa1c6fff7d2b422e20f223fb3d2c25526995ab783db0ac6feae` |
| `quiz/year-4/science/ac9s4i01/worksheet/index.html` | `09208315f39040a6fe578087cd5e87ff0d9b4e5939e427c0b242afc248b4c6a5` |
| `quiz/year-4/science/ac9s4i01/worksheet/worksheet-questions.js` | `082d95ee2175ccd3173533409306b6b6158dfea44546255014fd4fbd1746ccf1` |
| `assets/assessment-visuals/year4/science/ac9s4i01/food-chain.svg` | `e09f11db3ab84bc8689e0c1486e6b6b77daefaec1b25106adb4fb78e276b8c1d` |
| `assets/assessment-visuals/year4/science/ac9s4i01/magnet-observations.svg` | `36af2af120f221a666ee664f9c3d11700e1a2b5afd97d48ca3aff885ef599a54` |
| `assets/assessment-visuals/year4/science/ac9s4i01/material-observations.svg` | `e7b17783fc21c966b50946e01593f68f5c1ae105a2ccf6fd8f97353aa3d648e3` |
| Actual exported worksheet PDF (scratch QA) | `d0882ac287f8eb31d4cfb97862bb20e898f5c9aebe9c128023e54636b7dee1c7` |


## Root preparation integration follow-up

Independently read the final I01 notes object and both Practice/Test authored preparation sections. The wet-cloth memory clue matches the exact canonical worked example and names its current static heading. The two preparation wrappers copy approved P033 with the correct magnet SVG, answer, explanation and hint. Five-question attempt wording and adult-review guidance are accurate; required pre-module notes remain enabled. No source/content mismatch. Shared execution behavior remains covered by root runtime/CI checks.

I01 notes object SHA-256 (JSON.stringify of the exported AC9S4I01 object): `f688d6fed2d48e1ef8fed775a428d5b3d932475541f86fe31a2bab8e4a359793`.

quiz/year-4/science/ac9s4i01/practice/index.html SHA-256: `e578de4e6218c24ecdaac15f96ff112f6bc88f1cfa1fc0615a687dd77b34c2b6`.

quiz/year-4/science/ac9s4i01/test/index.html SHA-256: `e8c4dd63152cc6779eb8452e0bd83a43ccfe6aecc8aa46b7c5cc862a3216d34d`.

Worksheet wrapper integration recheck: all eight rendered prompts, answers and adult criteria remain exact matches to the approved worksheet bank. Root added the fresh scoped helper scripts and cache versions; the worksheet HTML hash above is refreshed to that integrated wrapper.


## Source-link follow-up after PR audit

Independently verified the Topic Guide changed only the SA Water citation href, from the inspected PDF to the official [Anangu Water Wisdom program page](https://www.sawater.com.au/education-and-community/education/the-well/for-teachers/anangu-water-wisdom). The landing page describes APY co-design and community-specific learning and directly links the same teacher-guide PDF. The source title remains accurate and the primary evidence remains discoverable. The exact inspected PDF and page evidence remain recorded above. No teaching text, diagram, question or review criterion changed. This scoped citation correction is approved; the Topic Guide SHA-256 above is refreshed. The global Teacher Slides export checks remain unchanged.
