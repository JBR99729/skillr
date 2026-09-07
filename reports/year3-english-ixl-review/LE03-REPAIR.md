# AC9E3LE03 substantive repair — 7 September 2026

## Scope and authority

This draft replaces the unsupported/generic answer patterns identified in the earlier review. It contains 48 Practice and 16 Test tasks, retaining all 56 previous IDs and adding eight Practice IDs. It is a code-level repair, not a declaration that all Year 3 English has been reviewed.

Official ACARA v9 coverage was checked in the QCAA P–6 English sequence and the rendered IXL v9 alignment plan, as recorded in LA11-LY04-SWEEP.md: discuss how language and illustrations portray characters and settings, and explore how settings and events influence narrative mood.

- Authority: https://www.qcaa.qld.edu.au/downloads/aciqv9/english/curriculum/ac9_english_p-6_cd_sequence.pdf
- Alignment plan: https://au.ixl.com/english/skill-plans/australian-curriculum-version-90-year-3
- Shared research log v17 was refreshed by the coordinating agent at this work boundary; relevant prior evidence is reused, not represented as newly repeated browsing.

## Actual IXL evidence reused

LA11-LY04-SWEEP.md records actual worked explanation and entry-question inspection for `use-actions-and-dialogue-to-understand-characters`. It demonstrates action/dialogue-based feelings and traits, with two choices at the observed entry. That entry was not submitted; later progression is not claimed.

NEXT-TEN-SWEEP.md records worked help, actual question progression and visual inspection for `compare-mythological-illustrations`, and illustrated fantasy, historical fiction, science fiction and realistic fiction skills. The mythological comparison reached two accepted responses; each of the four genre samples reached four accepted responses in one story. The fantasy and realistic samples included picture-dependent evidence. Some other questions were answerable from prose despite accompanying pictures. These observations support evidence selection, inference and image/text combination, not claims of complete adaptive mastery.

The bank contains original prose and original simple vector illustrations. No IXL story, picture or question is reproduced. More varied prose/poetry mood contexts are ACARA-led applications; they are not represented as unseen IXL stages.

## Coverage and editorial decisions

| Component | New tasks |
|---|---|
| Character portrayal through words/actions | Giving, helping, admitting an error, persistence, caution, conflicting speech/action, responsiveness and changed behaviour; claims remain local to the scene |
| Setting through language | Sensory orchard, market, tunnel, bakery, snow, farewell, fog and domestic shelter passages |
| Illustrated portrayal | Eight original scenes, two distinct reasoning tasks per scene; visible evidence is combined with supplied prose |
| Setting and narrative mood | Calm, tense, welcoming, mysterious, hopeful, lonely, festive and contrasting interior/exterior scenes |
| Events changing mood | Lost pet returned, failed model/help, interrupted argument, guiding lights, surprising reveal and safe catch |
| Discussion and uncertainty | 48 adult-reviewed explanations accept different defensible readings and distinguish possibility from a fact the passage does not establish |

There are 48 distinct text-only literary situations plus eight distinct illustrated situations with two different discussion demands each. This is not eight underlying prompts repeated across 64 questions. The 16 MCQs have one supported answer; 12 Practice answers occupy each position three times and four Test answers occupy each position once. Test texts and scenes differ from Practice.

Every answer and acceptance note was checked against its own supplied evidence during authoring. Particular controls: no invented contents of a letter or basket; no invented reasons for absence; no inferred footprint-maker identity; smoke only suggests possible warmth; pictures do not prove unseen facial expressions or occupants; possible emotions are not treated as universal body-language rules. Adult models are examples rather than mandatory personal reactions.

## Validation and release boundary

Production schema validator passes: 64 unique IDs, 48/16 counts, four-position distribution. All 56 old IDs are preserved and all 16 SVG references resolve to existing assets. These structural results do not by themselves establish content quality.

All eight SVGs were rendered to a contact sheet and visually inspected by the visual agent and the authoring agent. External `use` references to each root `#scene` were compared with direct renders and matched in CairoSVG. The images have a 640×300 viewBox, clear evidence and no clipped required details. Accessible descriptions state visible evidence; they do not invent private thoughts or unseen events. Browser runtime SVG loading remains a release integration check.

Draft authoring files: `drafts/build_le03.py`, `drafts/ac9e3le03.json`; assets under `assets/assessment-visuals/year3/english/le03/`. No publisher, verification-ledger update, git commit or deployment was performed by this authoring agent. The coordinating agent must integrate the existing adult-review helper and check Practice/Test/result/review behaviour, release integrity, Actions/Pages and live routes before claiming publication complete.

Final illustration refinement: the storm scene now depicts Wren leaning towards the hut with an arm near the face; the garden depicts the gardener's invitation gesture; the snowy cabin depicts the traveller facing the cabin with a bag. Corresponding tasks now explicitly discuss illustrated character portrayal. The first storm question concerns Wren's words and posture, while the second concerns weather/destination mood. The snowy scene separates visible traveller information from the unknown footprint-maker. All revised scenes were rendered and visually re-inspected. Removed an overstatement about “repeated” hesitation in P031 because the passage describes one hesitation episode. Final schema validation still passes.

## Integration review

Coordinating agent read all 64 questions, supported keys and acceptance notes and visually inspected the final eight-scene contact sheet. A second independent agent also reviewed all 64 and all eight scenes, finding no substantive unsupported-answer or illustration-context blocker. Applied its three clarity refinements: P020 explicitly requests two details, P033 calls its figurative image a comparison, and T014 asks which idea is supported rather than calling a present-tense alternative a prediction. Scoped entry guidance now explains evidence-based discussion and adult checking. Source/runtime parity, preserved IDs, Practice mirror and helper load order were checked. Publication/live SVG loading remains to be recorded below.

## Published verification

Published main ec94fde64926f816109e84af89e52d99343bf7e4, complete tree 8210ac11d094351b83c6393c3cc3501c98209042, non-forced update; release integrity preserved 18,265 files with no deletion. All seven Actions runs passed, including Pages deployment. Live Practice completed four discussion QA responses and one correct MCQ: result correctly showed 1/1 checked answers, five tasks completed and four pending adult checks. The actual Wren/storm illustration loaded through the external SVG reference and was visually inspected on the question page; feedback matched the character-posture task. Live Test loaded the distinct library scene and adult discussion controls; its actual SVG was visually inspected. These are integration checks, not assessments of a real learner's literary discussion.

The illustrated Test response saved as pending with model hidden; live homepage loaded afterwards. No shared runtime change was needed.
