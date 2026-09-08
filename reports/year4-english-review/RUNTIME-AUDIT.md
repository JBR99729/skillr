# Year 4 English authored-resource runtime audit

Date: 2026-09-08. Baseline local HEAD: `883cee463da1492cf439696ad02b571abc0fcab7`.

Initial status: **read-only implementation proposal, not resource approval or executed browser/PDF QA**. In that audit phase only this report was written. Root subsequently authorised the narrowly scoped implementation recorded at the end of this report. No bank, HTML, publisher, ledger or branch was changed by this agent. No browser or IXL tab was used. Root owns integration and source research.

Read in full: `AGENTS.md`, `docs/static-curriculum-architecture-v2.md`, `docs/skillr-long-life-curriculum-content-standard.md`, and `reports/year4-english-review/AC9E4LA01-AUTHOR.md`. Inspected the actual publisher, production schema validator, quiz wrapper/runtime, adult-response helper, result/review scripts, worksheet generator, shared legacy loaders and released AC9S4I01 resources. Existing native-details Topic Guide/Classroom View remains protected; these recommendations concern only authored activity resource preservation and already-supported adult marking.

## Findings and smallest safe changes

| Target | Current behaviour / evidence | Narrow implementation proposal |
| --- | --- | --- |
| `assets/year4-subject-worksheet-page.js` | Science-only authored guard; otherwise a matching English worksheet with legacy data replaces `document.body.innerHTML`. | Add a separately scoped English approved-code guard requiring `data-skillr-authored-worksheet="true"`; retain all legacy behaviour for unreviewed codes and unmarked pages. Start with LA01; expand the explicit allowlist only with approved resources. |
| `assets/year4-subject-quick-read.js` | Science-only authored-preparation guard; English loader overwrites `.pre-read-notes` from legacy data. | Add matching approved-English-code + authored-preparation guard, without rewriting unrelated quick reads. |
| `assets/curriculum-visual-layer-interactive.js` | Reviewed Maths/Science activity guards avoid adding legacy models; no equivalent English guard. | Add approved-English-code + appropriate authored preparation/worksheet marker guard on Year 4 quiz routes only. Do not broaden canonical topic behaviour. |
| `quiz/assets/worksheet-pdf.js` | Four writing lines are drawn for every `self-check`, but `keepWrittenWorkspace` only reserves their full space beside reviewed Maths/Science stems. | Add approved English codes to this existing keep-together regex. Continue requiring same `curriculumCode` and exact `ac9e4la01-w-001` style ID. No new PDF renderer is needed. |
| Code-owned Practice/Test HTML | Current LA01 lacks `requireAdultReviewSupport` and the adult helper. | Set a new scoped `bankVersion` and `requireAdultReviewSupport:true`; load `/quiz/assets/year1-maths-support.js?v=20260906-y1-original-v1` before `/quiz/assets/script.js`. Preserve five-question shuffled attempts, keys, result/review paths and free access. |
| Code-owned Practice/Test Review HTML | Current LA01 loads only `separate-review.js`; no adult marking helper. | Load the same adult helper before `separate-review.js` in both review routes. The stored non-empty `bankVersion` plus loaded helper enables actual parent/teacher marking controls. No global review script change is required. |
| Authored preparation retention | `script-runtime-v115.js` removes the first `.pre-read-notes` in Practice. Guarding legacy injectors alone does not retain an authored note. Its separate “Formality is a continuum” cleanup is inside the Year 7 guard and is not an LA01 failure path. | Reuse the released Science node-retention utility pattern in a small English-scoped utility: capture the existing authored node, reinsert that same node after shared runtime cleanup/DOMContentLoaded. Do not generate lesson content. Alternatively a carefully tested marker-aware shared cleanup fix is possible but has broader scope. |

The parent PWA loader is significant: `pwa-register.js` loads `assets/pwa-register-legacy.js`, whose English activity routes load `year4EnglishData` and the subject quick-read/worksheet helper. Deleting direct script tags from the new page is therefore insufficient. The loader's `v=1` URLs also make cache/version coverage worth testing. The released Science pattern explicitly loads versioned guarded helpers before PWA, so the legacy loader's existing-script detection can recognise the already-loaded asset; follow and verify that pattern rather than removing PWA.

Do not reuse the Science pre-module-notes generator as English content. The author's approved static preparation notes should carry their own models and examples. An authored-node retention utility is infrastructure only.

## Exact supported question schemas

Canonical bank is a flat JSON array. Required common fields enforced by `validate_production_question_bank.mjs`:

```js
{
  id: "AC9E4LA01-P-001", subject: "english", year_level: "Year 4",
  curriculum_code: "AC9E4LA01", bank: "practice", // or "test"
  stage: "apply", skill: "specific_skill_name",
  question: "Original task prompt", audio_prompt: "Original task prompt",
  visual: {type: "none"},
  answers: [], correct_index: null,
  grading_mode: "adult-review",
  model_answer: "An illustrative acceptable response, not a single mandatory script.",
  acceptance_note: "Task-specific observable criteria and acceptable alternatives.",
  response_instructions: "Write here, or perform the task with an adult who checks the actual evidence.",
  completion_label: "I have completed the spoken or written task with an adult ready to check it.",
  explanation: {summary: "Useful teaching/review explanation.", hint: "A targeted support cue."}
}
```

This is a **schema illustration, not authored curricular content**. Use actual task-specific language and age-appropriate performance evidence. `stage` is retained in the canonical bank but is not emitted by this publisher. `visual` must be present; SVG requires `asset_path` and `alt_text`. Selected-response Year 4 items require **four** distinct answer objects `{text,is_correct}`, one valid `correct_index`, and near-even correct-position distribution within each bank. `audio_prompt` must equal visible question exactly; `audio_answers`, where supplied, must match the number/order of visible choices and distinguish punctuation/spelling meaning without revealing the key.

The publisher maps adult fields to:

```js
{
  type: "self-check", gradingMode: "adult-review", responseType: "short_answer",
  answers: [], correct: item.model_answer,
  modelAnswer: item.model_answer, acceptanceNote: item.acceptance_note,
  responseInstructions: item.response_instructions, completionLabel: item.completion_label
}
```

`year1-maths-support.js` is already subject-independent for adult marking despite its historical filename. It renders a textarea and paper/performance completion checkbox; saving produces `isCorrect:null, pendingReview:true`. A checkbox records the existence of work only, not mastery. Pending work cannot pass or earn immediate credit. Practice then shows the example and guidance; Test defers these to review. The review page offers “Meets the task” / “Needs more practice”, updates stored marking and recalculates the result. Parent/teacher judgement is a trust-based marking interface, not authenticated proof of adult identity.

**Critical failure mode:** without the helper and fail-closed config, `type:"self-check"` falls back to the generic self-check renderer/evaluator, whose self-confirmation checkbox can award automatic credit. Therefore test missing-helper behaviour, not just successful rendering.

No publisher change is needed for adult responses. `--reviewed` also updates the release ledger and must remain reserved for independently approved final artifacts. The publisher writes `practice/questions.js`, `practice/practice-questions.js`, and `test/questions.js`; it does not author worksheets or update their HTML. Its activity-hub copy still says “auto-marked Test” in some existing pages; correct that code-owned wording when Test includes adult-reviewed tasks.

## Eight-task worksheet schema and production PDF

Use a code-owned `quiz/year-4/english/ac9e4la01/worksheet/worksheet-questions.js` with:

```js
"use strict";
window.skillrWorksheetQuestions = [{
  id: "ac9e4la01-w-001", curriculumCode: "AC9E4LA01",
  type: "self-check", printable: true,
  question: "Original homework task, distinct from Practice/Test.",
  correct: "Example response / expected evidence.",
  explanation: "Task-specific adult review criteria."
}];
```

Supply exactly eight distinct tasks, actual response space in static page HTML, and the same eight model/guidance entries in an adult disclosure. The page must set `window.quizConfig={skillCode:"AC9E4LA01",worksheetQuestionLimit:8}` **before** loading `worksheet-pdf.js`; the generator captures the count at evaluation time. Load the dedicated worksheet bank before the generator. The explicit worksheet bank has priority over Practice/Test arrays; do not load a practice bank as homework's content source.

The production PDF generator shuffles all printable items, takes up to the configured count, prints the matching answer guide in that generated order, and gives `self-check` tasks four ruled lines. It embeds the actual supplied question/explanation text and uses separate answer pages. A schema/count test is not a PDF visual review. Generate actual production outputs, inspect every page including answer guidance, and record final bank/HTML/helper/PDF hashes. Repeatedly sampled order layouts and a longest-stem layout are useful for confirming the keep-together fix; do not assume one shuffle proves all layouts.

## Targeted verification proposal

1. Run `node scripts/validate_production_question_bank.mjs assets/assessment-banks/year4/english/ac9e4la01.json`; independently check every final item and worksheet task, with no shared Practice/Test stems and genuine performance where required.
2. Compare canonical and all three published banks by ID, type, choice order, key, full explanation, audio and adult metadata. Inspect 48+16 counts and meaningful variation separately.
3. Add an English-scoped VM/DOM regression patterned on `reports/year4-science-review/FINAL-SIX-RUNTIME.json` and `scripts/validate_year2_english_adult_fix.cjs`: every adult task accepts typed evidence and paper/performance completion as pending, not correct; absent helper disables Start; Test does not expose answer during response; review can mark and update result; pending result has no pass/certificate/share celebration.
4. Exercise actual PWA load order with both guarded helpers already loaded and loader-injected legacy data. Assert authored worksheet main/title/tasks/button survive, and authored preparation node/text is retained after shared runtime and DOMContentLoaded. Confirm unmarked English controls and existing Science/Maths routes still take their previous path.
5. Generate PDFs through the unchanged production `createPdf` path with actual authored bank and page config, not browser print or an independently recreated PDF. `scripts/validate_worksheet_pdf.mjs` demonstrates the jsPDF/linkedom production harness; it also has generic long-stem/SVG fixtures. A code-specific harness should assert eight unique task IDs, answer correspondence, full strings and whitespace/page bounds. Render every final PDF page for independent visual review.
6. Load real Topic → Classroom View → Worksheet → Practice → Test, including Review/Retake/result routes and live deployment afterward. Mobile/desktop checks must include menu/breadcrumb integrity and no duplicate legacy panels. Keep all curriculum teaching in static HTML; no renderer restoration.
7. Record exact final artifact hashes and independent corrections/rechecks before `--reviewed`; run generated badge check and latest-main complete-tree integrity verification. English badge stays off until every required English code is approved/published.

## Existing validator pitfalls (do not misread as content defects)

- `scripts/validate_year4_english_student_facing.mjs` hard-codes **40** Practice items and four ten-item stage slices. It must receive an explicit reviewed-code compatibility update or a scoped replacement when a bank reaches 48; do not truncate approved content to satisfy this obsolete assumption.
- `scripts/validate_year4_english_tts.mjs` hard-codes **three** distinct spoken answer choices, even though the current Year 4 production schema requires four. It also does not exempt adult items with zero choices. Any use as a gate requires a corrected selected/adult branch and matching choice count, preserving actual speech-distinction tests rather than weakening them.
- The generic production validator enforces at least one correct choice in each answer position. An all-adult bank would therefore fail its distribution check; proposed mixed banks should keep balanced selected-response subsets. No validator change is needed for a normal mixed LA01 bank.
- Current generic publisher fields are only single-choice or adult self-check. Varied tasks can include contextual comparison, revision, evidence reasoning and authentic writing/speaking within those modes; introducing unsupported rich-response types would need separate schema/runtime work and is not part of this minimal proposal.

No live/runtime/PDF pass is claimed by this report. Root should include these checks in the current code's integration and independent review, not treat this read-only audit as approval.

## Authorised LA01-only implementation — 2026-09-08

Root subsequently assigned scoped preservation fixes and regression tests. Implemented draft changes:

- Added **AC9E4LA01 only**, plus authored marker, to the three legacy-helper escape paths identified above. Unmarked LA01 and other English codes retain legacy paths; existing Science/Maths guards remain unchanged.
- Added AC9E4LA01 to production PDF full-writing-space reservation, additionally requiring the worksheet body marker, matching curriculum code and exact three-digit homework ID. Existing Maths/Science reservation semantics remain unchanged.
- Added `assets/year4-english-authored-preparation.js`: same-node retention on LA01 Practice/Test only, mirroring the released Science utility. It must load after the quiz runtime registers its DOMContentLoaded initializer and before that event fires. It never authors, extracts or rewrites curriculum content.
- Added `scripts/validate_year4_english_la01_runtime.mjs`, a dependency-free VM regression. **117 checks passed**, covering authored return-before-mutation/data access; unmarked/other-code legacy entry controls; existing Science/Maths scope; actual production Practice cleanup followed by retained node identity/order; duplicate inclusion; missing/out-of-scope nodes; exact production PDF workspace allocation expression and four-line drawing branch.

Also passed syntax checks for all five changed/new production JavaScript files, `node scripts/validate_static_topic_loader_guards.mjs`, and `git diff --check`.

These are **implementation-level VM tests**, not complete actual quiz submissions, browser/PWA event-loop/network checks or a rendered PDF review. Those remain mandatory integration/release work. No commit or publication was performed. Independent review remains pending.

Author handoff: use `v=20260908-year4-english-la01-v1` on the new retention utility and the four changed shared helpers. Keep adult helper at its existing `v=20260906-y1-original-v1`. In PDF harnesses mirror the actual body marker, otherwise LA01 correctly uses the old unmarked allocation path.

| Draft implementation file | SHA-256 |
| --- | --- |
| `assets/year4-subject-worksheet-page.js` | `d8b68e57f40c223350fef5ef1d7929fcbc76dcb73298a1d5ecadae6761b30abb` |
| `assets/year4-subject-quick-read.js` | `070b110e530944b6bf04cc6f7fb05eb65011cdab8c9a9039d1c3ec9c5f0dc6a4` |
| `assets/curriculum-visual-layer-interactive.js` | `2c4b6213f5268819040f37de332cfab9d0bfaa9088bb9c52b4e09de672dca303` |
| `quiz/assets/worksheet-pdf.js` | `15a70148fceba08227dede727814417d74519ad79156c6d24ca4608b476018c0` |
| `assets/year4-english-authored-preparation.js` | `4204fb03d1f0d5a72fb06b2f705ce20018379180abd20d34f72b6c796d50a59e` |
| `scripts/validate_year4_english_la01_runtime.mjs` | `042752ba92051f0b4408d1eadb46593b583bc736eec4177c62c64fc75c32d2bc` |

### Independent review correction: explicit `index.html` routes

The independent reviewer reproduced a release blocker: the utility initially excluded `/practice/index.html` even though the shared Practice cleanup accepts it. The narrow correction accepts canonical, no-trailing-slash and explicit `/index.html` routes for **LA01 Practice/Test only**. Tests now assert utility listener installation as well as node survival on all six routes, with and without summary nodes; other-code explicit-index, worksheet and nested review/result routes remain excluded.

Recheck: **132 VM checks PASS**, utility syntax PASS, `git diff --check` PASS. Independent rereview requested; no browser or PDF rendering claimed. Only the two changed implementation hashes supersede the table above:

- `assets/year4-english-authored-preparation.js`: `a69981e2e621deff62f2c4fcb78ba81bc9f186fee8c6786bb6bab781522de6cc`
- `scripts/validate_year4_english_la01_runtime.mjs`: `64fd83106cf91089ee25fe677962050f163b208b508565499aa2885936edeb3d`

### Authorised code-owned activity HTML integration

Root and the LA01 author reassigned these nine pages to the runtime integrator: the activity hub, Practice/Test entry pages and both modes' Review/Result/Retake pages. These draft edits are complete and frozen for root's staged publisher/actual runtime tests; Topic Guide, Classroom View, homework and canonical bank remained with their author.

- Practice/Test use `bankVersion:"20260908-year4-english-la01-v1"`, `requireAdultReviewSupport:true`, the existing adult helper before shared quiz runtime, then authored-node retention and versioned guarded quick-read/visual helpers before PWA. Existing five-question shuffled-attempt settings, storage keys and route configuration remain unchanged.
- Each of the nine pages contains one marked static preparation/focus section. The two entry pages copy the canonical Topic Guide's respectful pencil-request model rather than a Test answer. Written/spoken work is explicitly pending until an adult checks actual evidence; the completion checkbox is not described as mastery.
- Both Review pages load the adult helper before `separate-review.js`. Result/Retake copy explains pending marking; the activity hub opens the real same-code Classroom View route instead of its obsolete teacher-slide fragment.
- A read-only comparison against the captured pre-edit HTML passed **46 checks**: unchanged titles/canonicals, all existing IDs and config values preserved, exactly one authored preparation section per page, fail-closed flags and script ordering. The **132-check** scoped VM suite and `git diff --check` also passed.

Root is responsible for staging published banks without `--reviewed`, running the actual assessment flow and collecting final reviewed hashes. The generic publisher overwrites an activity-hub paragraph beginning “Choose a learning activity.”; root was warned to preserve the authored mixed-marking/count summary when staging. No independent content approval or complete runtime/PDF/live release pass is implied by these static integration checks.
