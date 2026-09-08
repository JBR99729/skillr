# AC9E4LA01 author preservation audit

Date: 2026-09-08. Status: **preservation/gap audit only; no source research, authorship approval or publication claimed**. The root owns the sole IXL research tab and will supply the verified source brief before authorship begins. The user's later instruction to start the first ten English codes supersedes the old Science-download hold for this batch; the unresolved Science browser-download confirmation remains a separate recorded limitation.

## Instructions and inspected artifacts

Read in full: `AGENTS.md`, `docs/static-curriculum-architecture-v2.md`, `docs/skillr-long-life-curriculum-content-standard.md`, and `reports/year4-english-review/QUEUE.md`.

Audit baseline: local HEAD `883cee463da1492cf439696ad02b571abc0fcab7`, branch `codex/year4-english-full-review`.

| Resource | Exact repository path |
| --- | --- |
| Canonical bank | `assets/assessment-banks/year4/english/ac9e4la01.json` |
| Topic Guide | `year4/english/ac9e4la01-language-used-to-develop-relationships-in-formal-and-informal/index.html` |
| Classroom View | `year4/english/ac9e4la01-language-used-to-develop-relationships-in-formal-and-informal/teacher-slides/index.html` |
| Homework page | `quiz/year-4/english/ac9e4la01/worksheet/index.html` |
| Published Practice | `quiz/year-4/english/ac9e4la01/practice/questions.js` and `practice/practice-questions.js` |
| Published Test | `quiz/year-4/english/ac9e4la01/test/questions.js` |
| Same-code legacy teaching data | `assets/year4-english-data-la1.js`, `AC9E4LA01` object |
| Repository curriculum record | `data/curriculum-units.json`, `AC9E4LA01` object |

All 56 existing canonical stems, choices, keys, summaries and hints were read. A Node VM comparison establishes 40 Practice and 16 Test published items match canonical question text, choice order, key and lower-case ID. This is equivalence evidence, not quality approval.

## Preservation findings

- Preserve the existing Topic Guide metadata, canonical, resource links, optional-video and curriculum-equivalents owned blocks, native disclosure architecture and free/no-login journey.
- Preserve and strengthen the existing same-request pencil example, game-captain role example, context/evidence-before-judgement principle and caution against generalising one cultural example to all First Nations Peoples or Countries/Places.
- The Classroom View already contains static teaching HTML in native `details name="lesson"`, with the matching examples copied from the Topic Guide. Retain this shell and navigation. Do not replace it with a runtime lesson renderer or expose the tracked legacy `slide-01.png` as a new delivery architecture.
- Useful same-code content survives in `assets/year4-english-data-la1.js`: formality is a continuum rather than polite/rude; clear communication matters more than complicated words; familiar people may use respectful informal requests; audience-switch and conversation-repair models; tone is more than voice volume. Incorporate these pedagogical strengths directly into canonical static HTML rather than reactivating the legacy renderer.
- Repository Git history is shallow. The available path-scoped history ends at `2f51947` (2026-09-08, reviewed Maths release), which is not evidence that this English content originated there. No earlier strong page has been recovered or claimed; any required deeper-history retrieval belongs to root.

## Substantive gaps requiring correction

1. **Repetition:** Practice contains five scenarios reused eight times each, with only ten unique unordered answer sets. Test contains two scenarios reused eight times each, with six unique unordered answer sets. Stem rephrasing and answer rotation do not establish meaningful variety.
2. **Ambiguous keys:** T005 asks which response to a museum guide to reject first, but both the casual/vague response and the command are unsuitable; it arbitrarily keys the casual response. T013 similarly arbitrarily rejects the highly formal cousin message over a command. Replace these with specific, answerable reasoning tasks.
3. **Cultural assumption:** P005–006, P015–016, P025–026 and P035–036 assume the visiting Elder should be called Aunty May without a stated invitation/preference. Source-informed teaching must recognise local protocols, individual preference and permission; no universal greeting or address rule is supported by this audit.
4. **Coverage:** Existing bank chiefly tests polite requests versus obviously rude alternatives. It lacks substantive inclusive-language assessment, group-discussion to group-report shift, expertise independent of age, cultural variation and authentic language performance.
5. **Topic Guide:** Goals, four-step progression, misconceptions and formative assessment are largely generic feature/evidence prompts. Elaborations are listed but not each explicitly taught with a worked example, teacher action, observable evidence and misconception remedy. Vocabulary, differentiated support/core/extend and concrete exit-ticket answers need code-specific repair.
6. **Classroom View:** Questions-and-answers and practice/review panels repeat generic instructions rather than actual modelled questions with answers. Copy repaired canonical Topic content into this static view; do not independently invent a divergent lesson.
7. **Homework:** The present page loads Practice questions and generic `worksheet-pdf.js`, with no code-owned `worksheet-questions.js`. It does not itself provide eight separately authored homework tasks with adult guidance and response space. Legacy worksheet runtime may replace the page; root must narrowly guard the new authored worksheet and verify actual PWA flow.

## Schema and integration notes for root

- Canonical bank is a flat JSON array. Existing fields: `id`, `subject`, `year_level`, `curriculum_code`, `bank`, `stage`, `skill`, `question`, `audio_prompt`, `answers[{text,is_correct}]`, `correct_index`, `explanation{summary,hint}`.
- The existing review-aware publisher supports `grading_mode: "adult-review"`, `model_answer`, `acceptance_note`, `response_instructions` and `completion_label`, emitting `type:"self-check"`, `gradingMode:"adult-review"` and `responseType:"short_answer"`. Use actual written/spoken evidence with adult guidance, never recognition or self-attestation as mastery.
- Reviewed Science banks provide a compatible adult-work shape (`answers:[]`, `correct_index:null`, plus explicit model/rubric), but Science-specific runtime guards must not be assumed to cover English. Root owns any narrowly scoped shared-helper update and runtime proof.
- `assets/year4-subject-worksheet-page.js` currently rewrites the English worksheet body from legacy data; its authored-resource escape is Science-only. `assets/curriculum-visual-layer-interactive.js`, `assets/year4-subject-quick-read.js`, and actual PWA loader flow require scoped integration review before release.
- Preserve all published question paths. Author updates the canonical bank; root runs the publisher only after independent approval and handles ledger/shared generated changes. English badge must stay off until all 28 codes are reviewed and published.

## Drafting plan awaiting verified source brief

Target 48 meaningful Practice items and 16 independent Test items, with original contexts and genuine speaking/writing work. Cover contextual formality shifts, role/age/expertise/familiarity, inclusive cooperation and source-limited local cultural protocols. Proposed structure: varied selected-response recognition, comparison, evidence-based reasoning and revision, plus adult-reviewed paired-register messages, short oral role-play and inclusive-language revision. Exact distribution and scenarios will be finalised after root's IXL and ACARA evidence.

Eight distinct homework tasks should span comparing two requests, changing group talk into a report, expertise/role-sensitive questions, inclusive invitation repair, respectful disagreement, audience-specific message writing, a brief rehearsed spoken interaction, and a source-limited protocol/permission decision. These are planning categories, not completed authored tasks or verified source observations. They must not duplicate bank questions.

Pending: verified source brief; authored resources; independent every-item/content review; actual exported-PDF all-page review; artifact hashes; runtime/resource-flow QA; publication and live verification.

## Source-informed authored draft checkpoint

The preceding preservation-only status is superseded by this checkpoint, not by a publication approval. Read the complete root source brief `AC9E4LA01-SOURCES.md`, official evidence `OFFICIAL-FIRST-TEN.md`, runtime audit `RUNTIME-AUDIT.md`, independent mapping report `AC9E4LA01-MAPPING-REVIEW.md`, and both English-specific authoring/Topic standards before drafting. Root alone conducted IXL research. No author browsing, IXL interaction, commit, push or review-ledger mutation occurred.

Saved original draft resources:

- Canonical **48 Practice +16 Test**, comprising **36 selected-response +12 adult-reviewed Practice** and **12 selected-response +4 adult-reviewed Test**. Four-option keys are balanced **9/9/9/9** and **3/3/3/3** respectively. Every prompt has identical visible/audio wording; adult work has task-specific models and acceptance criteria.
- Eight distinct code-owned homework prompts, example responses and adult checks in `worksheet/worksheet-questions.js`, mirrored in static worksheet HTML with eight response areas. The page uses the production PDF exporter, a dedicated question bank and the authored worksheet marker. All **24 prompt/model/check strings** match between data and HTML.
- Static Topic and Classroom teaching: learning goals, vocabulary, comparison/repair models, all four elaborations, modelled group-discussion to report transformation, roles/expertise, inclusion, cultural-source limits, a practical four-step sequence, support/core/extend, misconceptions, actual Q&A and an original exit ticket. The twelve core/mapping bodies match exactly between Topic and Classroom after DOM parsing. Existing metadata, video block and related-resource journey remain; hash links resolve.
- Root assigned code-owned Practice/Test/Review/Result/Retake/activity-hub HTML to the runtime author to work alongside this teaching/content author. Those integrations are not claimed as this author's work or independently approved here.

### Coverage and performance

| Scope | Teaching and original evidence |
| --- | --- |
| E1 — contexts/formality, discussion to report | Paired-request models; preserve-information report transformations; precision/idiom/contraction distinctions; adult requests and reports, including a same-friend role/audience transfer in T013 |
| E2 — age, expertise, familiarity, culture | Game-captain role; younger expert/older beginner; clear requests for unfamiliar listeners; names and non-verbal conventions; actual rehearsed or written exchanges with accessible communication alternatives |
| E3 — inclusion | Family/carer invitations, meaningful roles, quiet contributors, names, gender assumptions and respectful disagreement; original dialogue and invitation revision work |
| E4 — First Nations Elders/greetings | Teacher-supported consultation, invited address, source/community scope, separate recording/sharing permission and no invented cultural authority; authentic preparation-note reasoning. A newly verified First Nations-led source account is being added before final teaching freeze. |

### Independent corrections applied and self-checked

- P023 now supplies a four-member group and two heard views, so the correct response does not invent a count.
- P046 now identifies the visitor as a bridge engineer, supporting the model's bridge question.
- P048 requires time consistency only if the learner includes a time; it no longer demands an unrequested detail.
- T004/T006/T008/T011 now use closer alternatives testing contextual precision, evidence of preferred address, disagreement that preserves the actual concern, and source/permission limits. These four are marked apply/difficulty 3 rather than all Test selected-response items being recognition/difficulty 1.
- T013 now requires authentic planning/report language for a familiar person whose audience/role context changes, rather than a ruler-for-paper noun swap.
- W005 now has an actual four-line model dialogue and a four-line evidence check, not only a summary of what to write. JS/HTML parity was rechecked.
- The repair model now preserves both the checking action and before-lunch deadline. The poster example states the shared large-letter/back-of-room scene before expanding the group's shorthand.
- IXL is labelled the closest inspected Year 5 benchmark, with an explicit Year 4 boundary; Khan/other sources remain supplementary.
- Verified mapping corrections include precise US contextual-language references, broad KS2 rather than unique Year 5, British Columbia rather than unverified Ontario, current New Zealand Phase 2 and an explicitly unverified broad India planning reference.

Self-check evidence: `validate_production_question_bank.mjs` PASS for all 64 items, unique IDs and balanced positions; worksheet parity 24/24; no unresolved Topic/Classroom hash anchors; twelve mirrored teaching/mapping bodies. These do not replace independent item/content/PDF/runtime review. Final artifact hashes and approval belong in the independent review after the remaining source addition and integration settle.

### Author content freeze

Read `AC9E4LA01-E4-SOURCE-REVIEW.md` completely and added the verified Common Ground account to both static teaching pages. The attributed discussion explains the account's context-dependent address and connection-building examples without imposing a greeting script or personal-identity disclosure. IXL remains primary; this First Nations-published source supplies supplementary cultural evidence outside the inspected IXL skill's scope. No author claims to have conducted the independent source retrieval or any local consultation.

W005's four model dialogue turns now use actual newline characters in the data and matching `white-space:pre-line` static HTML so the four turns remain visually distinct. The wording of the independently reviewed model is unchanged. After this final formatting correction, worksheet prompt/model/check parity is still 24/24, and all twelve core/mapping Topic bodies exactly match their Classroom copies. `git diff --check` is clean.

Canonical bank, worksheet and teaching content are now frozen for independent final teaching/PDF recheck. The independent reviewer has separately rechecked the bank corrections and all eight homework tasks; this author does not self-approve them. Root owns final production-PDF regeneration, runtime/visual QA, reviewed publication and live verification. No English publication or Content Verified claim is made by this author checkpoint.
