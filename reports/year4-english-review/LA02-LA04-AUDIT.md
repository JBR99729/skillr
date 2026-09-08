# AC9E4LA02–LA04 preservation and gap audit

2026-09-08 UTC. Read-only content audit for the first-ten English review; **not source research, final independent approval, PDF QA or publication approval**. Root remains the sole IXL researcher. No browser or IXL interaction was performed by this agent. No curriculum content was changed.

## Scope and evidence

Read `AGENTS.md`, `docs/static-curriculum-architecture-v2.md`, `docs/skillr-long-life-curriculum-content-standard.md`, `docs/english-topic-page-quality-standard.md`, `docs/english-student-question-authoring-standard.md`, and `reports/year4-english-review/OFFICIAL-FIRST-TEN.md`. Official coverage below relies on that dated independent ACARA source report; no new source-verification claim is made here.

Inspected the three canonical JSON banks, every distinct question/answer/explanation family and all item stems, all three published Practice and Test arrays, current static Topic and Classroom teaching content, worksheet HTML and shared worksheet selection logic, curriculum-unit metadata, existing video provenance, and the relevant source entries in `scripts/rebuild_year4_english_actual_banks.mjs` (inspection only; do not run this broad generator).

Local Git history is shallow (`git rev-parse --is-shallow-repository` returned `true`). The available `git log` for these Topic pages reaches only `2f51947` (“Publish reviewed Year 4 Maths A02 and M01–M04 resources”). Therefore this audit **does not establish that no stronger pre-shallow historical content exists**. Current useful material is identified below; retrieve deeper history before any wholesale replacement. The current bank generator contains the same seven context seeds per code, not an additional stronger lesson.

## Exact paths and preserved delivery

| Code | Topic directory under `year4/english/` |
| --- | --- |
| AC9E4LA02 | `ac9e4la02-the-subjective-language-of-opinion-and-feeling-and-the-objective/` |
| AC9E4LA03 | `ac9e4la03-how-texts-across-the-curriculum-have-different-language/` |
| AC9E4LA04 | `ac9e4la04-how-text-connectives-including-temporal-and-conditional-words/` |

For each directory preserve `index.html` (12 native details elements), `teacher-slides/index.html` (9 native details elements; current Classroom View) and its existing routes/assets. The Classroom View is already authored static HTML, not a runtime teaching-content renderer. Do not replace it with another presentation architecture. `slide-01.png` also exists; this audit did not visually inspect that legacy asset.

For each lower-case code `c`, the canonical and published assessment paths are:

- `assets/assessment-banks/year4/english/c.json`
- `quiz/year-4/english/c/practice/questions.js`
- `quiz/year-4/english/c/practice/practice-questions.js` (currently byte-identical alias)
- `quiz/year-4/english/c/test/questions.js`
- `quiz/year-4/english/c/worksheet/index.html`
- Existing Practice/Test entry, result, review and retake routes must remain intact.

The curriculum-unit `teacherSlideUrl` metadata still names a legacy `/worksheets/year4/english/teacher-slides/c-teacher-slide.pdf` path; current Topic resource links instead correctly use the same-code `/teacher-slides/` Classroom View route. Do not use that legacy metadata as authority for a new public teacher PDF link.

## Shared bank and worksheet findings

Each code has **40 Practice +16 Test**, not the required 48+16. All 56 items use single-choice recognition; stage labels `recognise`, `explain`, `discriminate`, `apply`, `verify` do not represent distinct response forms or authentic composing performance.

Canonical files are arrays with keys `id`, `subject`, `year_level`, `curriculum_code`, `bank`, `stage`, `skill`, `question`, `audio_prompt`, `answers` (`text`/`is_correct` objects), `correct_index`, and `explanation` (`summary`/`hint`). Published arrays use `window.skillrPracticeQuestions` / `window.skillrTestQuestions`, lower-case IDs, `curriculumCode`, `printable`, `type:"single"`, `audioPrompt`, `visual`, `visualHtml`, string-array `answers`, `correct`, `explanation`, `structuredExplanation`, and `qualitySchema:"production-v1"`.

Read-only VM evaluation confirmed each published item's question, answer order and correct index matches its canonical counterpart. All current visual fields are empty. Text-to-speech metadata repeats the question prompt; future tasks depending on visible text, selection or visual evidence need deliberate audio treatment rather than an automatic prompt copy.

The same repetition schedule affects all three codes:

- Practice contexts 1–5 recur in P001–010 (two prompts each), P011–020 (two rationale prompts each), P021–030 (two correction prompts each) and P031–040 (two “apply” prompts each). Thus forty items derive from **five contexts**, each used eight times.
- Test T001–008 repeat one new context; T009–016 repeat a second. Only **two contexts** supply sixteen Test items.
- P011–020 reuse a generic implausible distractor, “Because the longest or most complicated option must be correct.” T004/T012 use generic test-taking advice (“Choose the option with the most words”; “Ignore the context…”). These inflate count without assessing the English skill.
- T005 and T013 ask which option to “reject first” while providing **two rejectable options**, but record only one key. This is an ambiguity blocker in every code, detailed below.

All three worksheet pages say “separate 8-question worksheet” but load only `/practice/questions.js`. No code-owned `worksheet-questions.js` exists. `quiz/assets/worksheet-pdf.js` prefers `skillrWorksheetQuestions`/`quizWorksheetQuestions`, otherwise falls back to Practice/Exam arrays; it shuffles the printable pool and takes the configured eight. Therefore the current worksheet is a random sample of repeated Practice MCQs, **not eight distinct homework tasks**. Add a dedicated same-code original worksheet bank using the existing supported path; include adult guidance, acceptable evidence and writing/response space. No actual production PDF was generated or reviewed by this audit.

## AC9E4LA02 — subjective and objective language

### Preserve

The existing playground pair (“brilliant…exciting” versus opening on Monday) usefully contrasts evaluation with a checkable claim. The bean growth, temperature and race-time examples provide concrete measurable reports; the council-notice example usefully separates what a source states from a writer's reaction. Preserve these as limited, improved examples rather than cloning them eight times. The optional-video follow-up already asks the learner to write a factual classroom report and an opinion and explain how to check the factual claim; this is stronger than the bank's current performance demand.

### Required corrections and gaps

| Coverage | Current state | Needed before approval |
| --- | --- | --- |
| Descriptor: opinion/feeling versus factual-reporting language | Subjective/objective contrast present but context prompts often omit which purpose is requested | Name the exact task: identify evaluation, choose objective wording, compare information or cite evidence; distinguish objective wording from verified truth |
| E1 thinking verbs and summary verbs | Exact elaboration is pasted, but no worked teaching of `I think`/`I believe` or `we concluded`; current banks lack those target expressions | Contextual examples identifying and using both kinds; a conclusion needs supporting findings and is not automatically true because of its reporting verb |
| E2 same information presented subjectively/objectively | Several pairs change content instead of preserving the same information; official cat pair is only listed | Several original controlled comparisons; revise evaluation without inventing facts, annotate the changed words and explain the effect |

Specific item defects:

- P003/P004/P033/P034 say only “reviewing a new playground”; all three options could legitimately occur in a review. P023/P024 wrongly frame “The climbing frame is 2.4 metres high” as a mistake requiring replacement with an opinion. Ask explicitly for subjective evaluation instead.
- P007/P008/P037/P038 ask about “writing about a school concert” without requiring opinion; both factual options are appropriate for that broad purpose. P027/P028 similarly call objective reporting a correction problem with no explicit subjective target.
- T001/T002/T006/T007/T008 repeat the documentary-review version of this under-specified task. A running time and reef-footage fact can both be useful in a review. T005 cannot uniquely reject the running-time sentence rather than the reef-footage sentence.
- T013 asks which sports-result option to reject first: both “Mia ran brilliantly” and “Mia was clearly the most impressive athlete” are subjective; no unique first rejection is justified.
- “Opinion plus reason” and modal strength examples are not wrong, but currently occupy half of the four core examples while E1 is untaught. Keep useful evaluation reasoning as supporting material; rebalance towards the exact descriptor and elaborations.

Authentic evidence should include reading an original short passage containing reporting and evaluation, marking the words that justify a classification, comparing two versions with shared information, and writing/revising an objective report plus a clearly identified personal opinion from supplied observations. Use adult-reviewed evidence for open responses; do not claim the LA02 descriptor itself demands a full extended writing task.

## AC9E4LA03 — text structures across the curriculum

### Preserve

“Structure follows purpose” correctly contrasts ordered procedures, tension in a story and grouped facts in a report. The history recount, geographical report, museum panel and perimeter explanation contexts are useful starting points if replaced with actual original texts. The procedure example is valid broader support but should not crowd out explicitly named elaboration types. The optional-video follow-up comparing instructions and explanation is a usable task seed, not completed modelled content.

### Required corrections and gaps

| Coverage | Current state | Needed before approval |
| --- | --- | --- |
| E1 named text types | List present; current bank focuses science investigation, procedure, history recount, geography, poster, museum panel and maths explanation | Original short narratives, factual and imaginative recounts, biography, information report, explanation, book talk, poetry and argument; show characteristic stages and language in each |
| E2 explanations/reports | Generic “structure follows purpose”; no sequential-versus-causal explanation or comparative-versus-part-whole report model | Inspectable paired text samples with stage labels and explanations of why their structures serve their purposes |
| E3 poem purposes | Exact wording only; no original poems or assessments | Short story, descriptive and reflective poems; explain differing organisation without asserting a universal poem formula |
| E4 form versus organisation/social purpose | Poster context treated as if form fixes one purpose | Compare same-form texts with different purposes and similar-purpose texts in different forms, including poster/email/list |

Specific item defects:

- P001/P002/P031/P032 “science report about evaporation” is under-specified: the keyed aim/method/observation/conclusion structure is specifically an **investigation report**, not every informative report or causal explanation about evaporation. Relabel the context precisely.
- P009/P010 and related rationale/correction items conclude “A poster must communicate actions quickly and clearly.” A sun-safety advice poster does this; posters can instead inform, invite, entertain or persuade without giving an action sequence. Restrict the explanation to the supplied purpose and directly teach form versus purpose.
- P007/P008 use “Hide all facts inside a poem” as an obviously disparaging distractor while poetry is a required text type. Teach different purposeful forms; don't imply poetry cannot convey information.
- T005 offers both a diary with unrelated feelings and a list of character names as rejectable options for a fossil panel. T013 offers both a suspenseful plot twist and weekend details as rejectable for a perimeter explanation. Neither has a defensible unique “reject first” key.
- Core Topic/Classroom “Cohesion across sentences” and “Paragraph focus” are copied verbatim into LA04. They are useful supporting concepts, but currently displace the substantial LA03 genre/stage coverage; preserve only the relevant support while adding code-specific instruction.

Authentic evidence must start from actual readable original texts rather than selecting a teacher's writing plan. Learners should annotate or order stages, identify exact language evidence, compare purpose and structure, explain how organisation helps the reader, and plan/compose a short purposeful example. For this `identify` descriptor, deliberate short creation is supporting evidence, not a claim that a whole genre essay is mandatory per item.

## AC9E4LA04 — connectives and topic cohesion

### Preserve

The Mia/shell pair is a clear pronoun-cohesion model. Current bank seeds show time sequence (seed), result (waterlogged oval), addition (shade), condition (closed track) and a related-word/determiner chain (koalas/these animals). Keep these explanations where accurate, but replace repeated and silly alternatives with plausible, context-driven contrasts. The optional-video follow-up asks learners to write two connected rain/game-plan sentences and explain the relationship; retain that authentic application idea.

### Required corrections and gaps

| Coverage | Current state | Needed before approval |
| --- | --- | --- |
| Descriptor temporal/conditional words and topic word associations | Bank has limited examples but Topic/Classroom core is the same four paragraphs as LA03, without worked temporal/conditional models | Explicit teaching of time, condition and topic-word chains across more than one sentence |
| E1 pronouns and determiners | Mia/she/it model; one repeated `these animals` bank context | Clear antecedents; demonstrative determiner + noun (`this/that/these/those`); contrast ambiguous reference with an edited clear version |
| E2 sentence connectives | Result/addition assessed; `however` appears mainly as an incorrect alternative; `nevertheless` only in official list | Model genuine contrast/concession, result and addition with a supplied pair of ideas; explain meaning rather than label recall |
| E3 sequence between sections | Two-sentence seed model and a three-step checklist recur; no substantial section-level sample | Original short multi-step/section text, ordering and explanation of how temporal links connect its sections |

Specific item defects:

- P009/P010 and related items use the nonsensical “They means the school bell” or an unrelated bike sentence as distractors. These do not distinguish plausible antecedent errors or topic association.
- P005/P006 use the fragment “Finally, because more shade would”; P007/P008 use “because maybe”; Test recycling items use “yesterday, fewer because.” Replace malformed filler with meaningful near-misses.
- T005 asks to reject first between an inappropriate contrast link and an ungrammatical fragment. Both are incorrect. T013 similarly offers an incoherent connective sequence and a sentence about pelicans unrelated to the checklist; both are rejectable.
- Semicolons in current oval/recycling examples are correctly used, but they are not the target skill. Two ordinary sentences can isolate the connective relationship and avoid adding punctuation demands unnecessarily.

Authentic evidence should include reading a connected micro-text, identifying what each pronoun/determiner refers to, selecting or explaining a connective from the actual relationship, sequencing text sections, repairing an ambiguous referent, and writing a cohesive short paragraph with a time/condition link and topic associations. Supply adult guidance and acceptable alternatives for original responses rather than marking only one fixed wording correct.

## Existing supplementary-source limitations

`data/topic-videos.csv` records 2026-09-08 metadata/source-text checks, **not full audiovisual playback**:

- LA02 Learn Bright fact/opinion video: current wording correctly treats factual claims as checkable, not necessarily established true.
- LA03 Khan Academy “Comparing text structures”: informative-text support only; linked creator course is Grade 5, so retain the explicit Australian Year 4 boundary and do not claim it covers all named genres.
- LA04 Khan Academy cause/effect video: partial support only; temporal/conditional connectives and topic associations remain separate requirements.

These existing records can guide the sole researcher's next steps; they are not new IXL teaching/help observations and not a completed external-source review.

## Baseline published artifact identities

SHA-256 below identifies the **unreviewed baseline**, not approved final artifacts. Practice `questions.js` and `practice-questions.js` are identical for each code.

| Code | Practice SHA-256 | Test SHA-256 |
| --- | --- | --- |
| AC9E4LA02 | `ed8c637f1ab54d4eeb37aa60852e20e7959b1c71af66559863f2a0e891e8671d` | `a799e0509577dd398c7ac2d20a1685f1a0b6e5abea9aae81bdf451ee937eccf7` |
| AC9E4LA03 | `8d59bd4adcfae9635a27a95a571bfc23158cb4b75638964aa6e21261fd516b69` | `9e410e77ce6d532ede31d009e01af2baf76919ecde6a757af4aeaf9ba9831776` |
| AC9E4LA04 | `04a45790801f5c25e8ebfc82d92008e7c22600c11132997f5d6e2319d11f3c5c` | `fb47e90ea5b2e4a7baabc525ebc1bc5814e52f22f37905dd456cb9fbc7a31b7b` |

## Handoff gate

None of these three codes is complete or independently approved. Before authoring, obtain root's dated primary IXL observations and the relevant supplementary evidence. Then preserve useful examples, close each explicit coverage gap, author meaningful 48+16 banks and eight separate homework tasks, strengthen canonical Topic teaching first and copy its approved wording into the existing Classroom View. A different reviewer must inspect all final questions/choices/keys/explanations, teaching models, metadata and every page of the actual production PDF, recheck corrections, record final hashes and validate the actual runtime/resource journey before review-aware publication. Keep English Content Verified off until all 28 codes satisfy the release condition.
