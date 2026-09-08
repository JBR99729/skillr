# AC9S4I05 author record — final six batch

Author: science_i05_i06_author. Date: 2026-09-08. Independent approval is owned by science_i05_i06_reviewer; this is not self-approval.

## Scope and preservation

Exact descriptor: compare findings with those of others, consider if investigations were fair, identify questions for further investigation and draw conclusions

Baseline was40Practice+16Test with no genuine creation tasks and no item visuals. All original56 prompts,choices,keys and explanations were substantively inspected. Correct ideas were preserved and expanded; repeated abstract recognition and weak distractors were replaced with contextual decisions. Strong static teaching routines were retained: method detective, conclusion ladder and next-question workshop; same-method peer comparison and the distinction between results and methods.

The native static Topic Guide and collapsible Classroom View remain aligned. Their teaching bodies are written directly in HTML; obsolete curriculum renderer imports were removed from these two Topic pages only. All same-code resource routes and existing metadata were preserved. The incorrect one-page teacher PDF wording now describes the actual Classroom View.

## Assessment and coverage

Each code has48Practice:44single-choice and4authentic adult-reviewed writing/creation tasks. Test has16single-choice items. Eight distinct homework tasks require actual written/modelled/practical evidence and adult review, with answers separate from tasks. No formal averages or statistical significance are required.

| Component | Official elaboration | Practice items | Test items |
| --- | --- | --- | --- |
| E1 | identifying instances during investigations where elements may have been changed in error, resulting in an unfair test | 001, 002, 003, 004, 005, 006, 007, 008, 048 | 001, 002, 003 |
| E2 | comparing findings of water use surveys and discussing differences between home and school, or between each other’s homes | 009, 010, 011, 012, 013, 014, 015, 016, 046 | 004, 005, 006 |
| E3 | comparing designed solutions, such as toys, lunchboxes or structures, to determine fitness for purpose of selected materials | 017, 018, 019, 020, 021, 022, 023, 024, 047 | 007, 008, 009 |
| E4 | comparing findings from investigations with peers and asking questions about factors that may have led to any differences in findings | 025, 026, 027, 028, 029, 030, 031, 032, 045 | 010, 011, 012 |
| E5 | identifying unexpected findings and posing questions for further investigation | 033, 034, 035, 036, 037, 038 | 013, 014 |
| E6 | drawing conclusions that reflect their data and information | 039, 040, 041, 042, 043, 044 | 015, 016 |

Four adult Practice tasks require actual work; completion is not automatically correctness. Homework uses different data, audiences or created forms from the Practice/Test items.

## Substantive fixes from independent review

- P047 recommendation now explicitly asks and models comparison of both designs; complete rubric alignment.
- Group model uses same marked point versus higher release point, avoiding a point above the ramp top; Topic text identifies the same surface and changed release.
- P044 explanation no longer misclassifies a prediction as procedure. Six remaining irrelevant distractors replaced with plausible evaluation errors.
- Homework003 explicitly says the roof collapses under the required load; bending alone is not assumed failure.

## Validation and handoff

- Production bank validation PASS:64unique IDs,48Practice+16Test, keypositions11/11/11/11 and4/4/4/4.
- Both worksheet scripts pass syntax checks.
- Year4Science static topic validator PASS12/12.
- Author rendered and inspected all three code models at640x300; no clipped labels or arrows.
- Actual exported PDF review belongs to the independent reviewer; see their report for final page-by-page approval and identity.
- Root owns wrappers, pre-module notes, compatibility guards, publisher/ledger, runtime QA and complete-tree publication.

Shared worked model: Compare group findings (Practice025, groups.svg).

## Authored artifact SHA-256

- `assets/assessment-banks/year4/science/ac9s4i05.json`: `95409aa58108fc0c355f72da5553faad60b062a960052b1be3111ee3bfd00d6e`
- `year4/science/ac9s4i05-findings-with-those-of-others-consider-if-investigations-were/index.html`: `e63f0d160c522de7f0330e8c7e64094d1bfc1c46cec2c2af7a7461e334d4f839`
- `year4/science/ac9s4i05-findings-with-those-of-others-consider-if-investigations-were/teacher-slides/index.html`: `ead42dcdc97abc25e5177d79ba9665e82751075abbd020c1332fcee868163b4e`
- `quiz/year-4/science/ac9s4i05/worksheet/index.html`: `b83b3991ff29e5f900fe9625cbbcd34d2b66d6e8594344269cb27dff587e7759`
- `quiz/year-4/science/ac9s4i05/worksheet/worksheet-questions.js`: `86be62d8efa0ebddf5ed6ab6062e87093f3016e2e7d076b3192ff037a6603b0e`
- `assets/assessment-visuals/year4/science/ac9s4i05/groups.svg`: `f1190fa76bd3bbb724a89243589d3d3b59e826d5b6a067e55c1e046582da8eba`
- `assets/assessment-visuals/year4/science/ac9s4i05/roofs.svg`: `8a847fb34555d24a420f4bf92001f751b5deaa26ca05f8fe5af359210e6e9dd8`
- `assets/assessment-visuals/year4/science/ac9s4i05/survey.svg`: `1b854a3f4187f95c309076acd6ecbe7c938e6f7183f14c464d84e0ba3fb8c621`

## CI follow-up: explicit guided teaching stage

The existing method-detective activity now identifies a “We do” stage: teacher and class identify and explain the method difference together, before partners draft a repeat plan. Both static pages place the curriculum-mapping anchor on the existing official descriptor. This restores recognisable native Classroom View landmarks while retaining content and section IDs. No questions, PDF tasks, validators or runtime were changed.

PR-base recheck: `GITHUB_BASE_REF=main node scripts/validate_static_curriculum_architecture.mjs` PASS, inspecting151 changed files against main. Year4Science static pages12/12 and diff whitespace checks also pass.
