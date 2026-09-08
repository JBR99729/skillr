# AC9E4LA08–LA10 preservation and gap audit

Audit date: 2026-09-08 UTC. Role: read-only pre-authoring audit; not source research, final independent approval or publication approval. No browser or IXL interaction was conducted. Root remains sole IXL researcher. Only this report was authored.

## Scope and evidence

Read `AGENTS.md`, `docs/static-curriculum-architecture-v2.md`, `docs/skillr-long-life-curriculum-content-standard.md`, both English topic/question quality standards and `reports/year4-english-review/OFFICIAL-FIRST-TEN.md`. Inspected current static Topic Guide and Classroom View lesson text, all canonical bank items, published bank schema/content parity, worksheet route/configuration, current generator source and legacy SVG source text.

The official report establishes exact ACARA descriptors and all four elaborations across these three codes. This audit uses that verified evidence; it does not claim a separate external-source verification. No IXL or supplementary lesson is approved by this report.

Local history is shallow (`git rev-parse --is-shallow-repository` returned `true`). The available Topic Guide history stops at `2f51947` ("Publish reviewed Year 4 Maths A02 and M01–M04 resources"). Consequently, this audit cannot certify that no stronger older Topic Guide exists. Inspect deeper same-path history before a substantive replacement. Preserve the useful current examples identified below meanwhile.

## Exact resource paths and schema

Repository root: `/workspace/scratch/c0dec7faa19d/year4-sweep`.

| Code | Topic directory under `year4/english/` |
| --- | --- |
| AC9E4LA08 | `ac9e4la08-how-adverb-groups-phrases-and-prepositional-phrases-work-in` |
| AC9E4LA09 | `ac9e4la09-past-present-and-future-tenses-and-their-impact-on-meaning` |
| AC9E4LA10 | `ac9e4la10-the-effect-of-choices-when-framing-an-image-placement-of` |

For each listed directory preserve `index.html` and the current static native-details `teacher-slides/index.html` Classroom View route. A `teacher-slides/slide-01.png` also remains in the tree; its existence is not proof of the current Classroom View's content quality. Classroom HTML carries lesson content directly and loads only `/assets/resource-links.js?v=1` as its external script. Do not replace this shared shell or introduce a runtime lesson renderer.

For lowercase code `ac9e4la08`, `ac9e4la09` or `ac9e4la10`:

- Canonical bank: `assets/assessment-banks/year4/english/{code}.json`.
- Practice bank: `quiz/year-4/english/{code}/practice/questions.js` and its byte-identical `practice-questions.js` alias.
- Test bank: `quiz/year-4/english/{code}/test/questions.js`.
- Activity shells: `quiz/year-4/english/{code}/practice/index.html`, `test/index.html`, and same-mode `result/`, `review/`, `retake/` routes.
- Worksheet: `quiz/year-4/english/{code}/worksheet/index.html`.
- Legacy visual sprite: `assets/assessment-visuals/year4/english/{code}.svg` (read through Git; sparse checkout may not materialise it).
- Current generator of these weak banks: `scripts/rebuild_year4_english_actual_banks.mjs`, code definitions around lines 64–87. Do not run its broad rebuild.
- Curriculum metadata: `data/curriculum-units.json`, corresponding code nodes. Its `teacherSlideUrl` still names legacy `/worksheets/year4/english/teacher-slides/{code}-teacher-slide.pdf`; preserve the actual linked Classroom View route rather than restoring this public PDF target.

Canonical banks are arrays of 56 objects, with `id`, `subject`, `year_level`, `curriculum_code`, `bank`, `stage`, `skill`, `question`, `audio_prompt`, `answers: [{text,is_correct}]`, `correct_index`, and `explanation: {summary,hint}`. All current items have three choices and one flagged key.

Published objects use lowercase IDs, `curriculumCode`, `bank`, `skill`, `printable: true`, `type: "single"`, `question`, `audioPrompt`, empty `visual` and `visualHtml`, string-array `answers`, numeric `correct`, string `explanation`, `structuredExplanation`, and `qualitySchema: "production-v1"`. Practice exports `window.skillrPracticeQuestions`/`window.quizQuestions`; Test exports `window.skillrTestQuestions`/`window.skillrExamQuestions`/`window.quizQuestions`. A deterministic comparison found no canonical-to-published mismatch in prompts, choices, keys or explanation summaries.

## Shared substantive failures

| Check | LA08 | LA09 | LA10 |
| --- | ---: | ---: | ---: |
| Practice / Test items | 40 / 16 | 40 / 16 | 40 / 16 |
| Distinct source contexts generating Practice | 5 | 5 | 5 |
| Distinct source contexts generating Test | 2 | 2 | 2 |
| Published question visuals | 0 | 0 | 0 |
| Published response types | single only | single only | single only |
| Dedicated worksheet bank loaded | no | no | no |

Each Practice context is recycled eight times through recognise/explain/revise/apply stem variants. For example P001/P002 and P031/P032 reuse the same scenario, choices and key; relabelling the latter "independently" does not make a new transfer task. Each Test context is likewise repeated eight times. The 56-item count therefore disguises seven substantive situations. Every code needs substantive re-authoring, not merely eight appended Practice questions.

P011–P020 repeatedly use the generic distractor "Because the longest or most complicated option must be correct." T003/T011 use "Because surface appearance matters more than meaning." T004/T012 ask which hint should guide a decision rather than directly assess the target. These distractors and teacher-style stem wrappers fail the English authoring standard's requirement for plausible, task-specific near misses.

All three codes' T005 and T013 ask "Which option would you reject first" without a stated priority. Two answers in each are rejectable. These are release-blocking ambiguous single-answer items:

- LA08 T005: both "every checks afternoon" word order and the alternative ending "returns blue" are defective; T013: both "moved branch carefully fallen" and "moved with around" are defective.
- LA09 T005: both mismatched "pack ... last night ... waited ... now" and "will pack last night ... wait yesterday" are defective; T013: both "met ... tomorrow" and "are met ... yesterday" are defective.
- LA10 T005: hiding the bilby and using an unrelated traffic image both fail the stated purpose; T013: immediately revealing the solution and an equally prominent cluttered composition can both undermine the intended suspense. The supplied explanation does not establish a unique first rejection.

Every worksheet page advertises a separate eight-question worksheet but imports that code's `practice/questions.js`, sets `worksheetQuestionLimit:8` and loads `/quiz/assets/worksheet-pdf.js?v=18`. The shared generator prioritises a dedicated `skillrWorksheetQuestions` bank if supplied; none is supplied here. It otherwise shuffles/selects from Practice, so these are not eight distinct homework tasks independently authored from the lesson. New tasks need code-specific adult guidance, acceptable evidence and response/drawing space. Shared PDF support already includes `self-check` and written workspace; use supported schema rather than inventing a parallel generator. The actual generated PDFs were NOT produced or visually reviewed in this audit.

## AC9E4LA08 — adverb groups and prepositional phrases

### Preserve

The current Topic/Classroom example "Birds fly" expanded to "Small shorebirds fly quickly across the inlet" is useful if it explicitly separates adjective/noun detail from the target circumstantial additions. The bank's phrases `across the rocky track`, `surprisingly softly`, `before sunrise`, `After lunch` and `beneath the warm rock` are linguistically useful model material. Preserve or adapt a representative subset, not all repeated variants. The cyclist sentence usefully combines manner and place/route.

The official E1 time/manner/place example is present verbatim. Keep it as attributed curriculum wording and add original worked teaching rather than leaving it as an isolated quote.

### Gaps and boundary

Topic and Classroom define their key vocabulary as "meaning, language choices, audience" rather than adverb group, preposition, phrase and circumstance. Their other core models compare complex/compound clauses and active/passive voice. These are not LA08's teaching target. Current generic misconceptions ("Feature spotting", "Retelling", etc.) do not teach likely phrase errors.

Explicitly distinguish **form** (adverb group versus prepositional phrase) from **function** (time/place/manner circumstance). Use paired grammatical forms serving the same function, not the false rule that every adverbial is a prepositional phrase. Teach that adverbs need not end in `-ly`. Current `every afternoon` correctly functions as a time circumstance but is not a prepositional phrase or an adverb-headed group; do not relabel it as either when reusing it. Keep richer grammar outside the target unless needed to explain this contrast simply.

Authentic evidence needed: read a short original passage, identify an activity/state and associated circumstance, classify the detail with justification, compare changed phrase placement, and compose/expand original sentences with time/place/manner detail. A student's own sentence and explanation must be collected through writing/oral/adult-check tasks, not inferred from a selected answer. Teacher guidance should accept more than one valid expansion and check whether the phrase attaches to the intended activity.

Existing optional Khan video (`data/topic-videos.csv` row AC9E4LA08) is "Prepositional phrases", YouTube ID `7dOBMUESkqk`. Its stored 2026-09-08 note records only original-channel metadata and available source text, not full audiovisual playback; it covers only one part of the code. This audit did not open it. It is not evidence of reviewed IXL or complete adverb-group teaching.

## AC9E4LA09 — tense and meaning

### Preserve

Bank model concepts are sound where contextualised: past events, present generalisations/habits, `will` for future plans, irregular `saw`, deliberate time shifts, and present continuous expressing a future arrangement when time is explicit. These seven ideas provide useful material to build from. Keep the nuance that future time is not expressed only through `will`, and that legitimate time changes can require a tense shift.

Both official elaborations are present exactly, but listing them alone does not teach them.

### Gaps and boundary

The Topic and Classroom currently duplicate LA08's shorebirds, because/so and active/passive examples. They do not model past/present/future versions of the same event, identify actual verb groups in an informative text or explain tense's effect. Vocabulary is merely "sentence". The optional-video try-it (write yesterday/today/tomorrow versions of walking to school) is more code-specific than the main lesson and may be retained with adult marking guidance.

Use actual short texts, not solely sentence wrappers: an information report's customary present tense, a recount's usual past tense, a plan/prediction's future time, and a justified mixed-time passage. Teach customary choices as tendencies, not universal rules. The report should not suggest every informative text must be present tense. Distinguish time-reference words from the verb group itself. Regular `-ed` and common irregular past forms need explicit examples; avoid a formal perfect-aspect detour as core content.

Authentic evidence needed: read and annotate tense in a micro-text; explain how changing a verb group changes the meaning; edit an accidental inconsistent shift; write three context-appropriate sentences or a short recount with a deliberate time shift and explain it. Adult guidance should accept grammatical alternative future forms when consistent with the specified meaning.

Current bank distractors sometimes include author commentary inside the sentence, e.g. P005/P006 "Our class visiting next Thursday without a finite verb" and P007/P008 "I played cricket every Saturday if the routine is still current." Replace with natural student-language options. The present-tense water example is usable but unnecessarily adds science language to a basic grammar task; an everyday habitual fact can lower irrelevant reading demand.

Existing optional Khan video (`data/topic-videos.csv` row AC9E4LA09) is "Introduction to verb tense", YouTube ID `faUvT7zfsyk`. Stored verification is 2026-09-08 metadata/available source text only, not full audiovisual playback. This audit did not open it; preserve the limitation.

## AC9E4LA10 — framing, placement and salience

### Preserve

Current framing comparison (close-up versus wide view) and the warning that a visual feature has no single fixed effect are useful. Bank concepts concerning turtle salience, crop/context, an isolated character, warning-symbol contrast, football close-up/wide framing and a sequence delaying information are usable ideas. Preserve them as possible original visual models, not as final question wording.

### Gaps and boundary

No current Practice/Test question contains an actual image. The Topic's text says "show a new still or multimodal text" without supplying one. The Classroom "Clean visual examples" board repeats the same prose; it does not give a scene to inspect. Current LA10 therefore measures verbal agreement with claims about images instead of sustained viewing evidence.

Supply original, accessible pairs of still compositions showing what changes in **framing**, **placement** and **salience**, while holding irrelevant details constant. Include an actual moving-image example or an appropriately delivered original short clip alongside still analysis. A labelled storyboard can support planning/comparison but cannot be claimed to be a watched moving image. Put the instructional evidence directly in fixed static assets; do not add a runtime lesson renderer. Media/visual descriptions must be accurate without giving away the tested inference.

The current close-up/wide football answer assumes the unseen close-up reveals emotion. That is plausible, not established by supplied evidence. Current central placement/large size models must not turn into "the largest/central thing is always most salient"; contrast, isolation, focus and context may draw attention elsewhere. Viewer responses need justified possibilities, not claims everyone must feel the same.

Authentic evidence needed: inspect actual original images, cite visible evidence, compare two framings, explain a plausible change in response, sketch/reframe a scene, and plan or create a short sequence with annotated choices. Worksheets need ample drawing/annotation space and adult criteria that reward evidence rather than artistic polish. The primary benchmark may have a genuine matching gap; root must record actual IXL observations/limitations before using supplementary media education resources.

## Legacy assets and release handoff

The three legacy `assets/assessment-visuals/year4/english/{code}.svg` files contain 40 text-card symbols each (24 Practice +16 Test). Their displayed labels include "Worked text 1", "Misconception 1", "Read, compare and justify" and "Correct the mix-up", rather than actual supplied language extracts or image compositions. These are not stronger worked models to restore. Some labels suggest useful task categories (LA08 circumstance sort/misattachment repair, LA09 timeline/meaning comparison, LA10 first-look/reframe), but they are not completed tasks or primary source evidence. Do not delete unrelated/unused assets as part of this content pass.

Before any code is approved: root must provide documented primary IXL benchmark evidence or an explicit genuine match/access gap; author must produce full code-aligned static teaching, same-source Classroom content, 48 meaningful Practice +16 Test, and eight independently authored homework tasks. A separate final reviewer must inspect every item/key/explanation/audio/visual and every production PDF page, request/recheck corrections, record hashes and validate runtime/resource flow. Use the review-aware publisher/ledger and complete latest-main tree checks only after approval. English Content Verified stays off. This audit marks **none of LA08–LA10 complete**.
