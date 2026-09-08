# AC9E4LA01 — independent review

Date: 2026-09-08 UTC. Reviewer separate from author. **Current status: initial every-item bank review completed; corrections required. No full-code or publication approval.**

## Reviewed identity and scope

- Canonical bank: `assets/assessment-banks/year4/english/ac9e4la01.json`.
- SHA-256 at both start and end of initial review: `6a0b7e5c5077c7684156d2145e55ac76d2038dc4286bea04c3cc48dd53e8b1ab`.
- Examined **every item AC9E4LA01-P-001 through P-048 and AC9E4LA01-T-001 through T-016**, without skipping any question or fields: prompt, all selected-response options and key, explanation summary/hint, audio prompt, visual metadata, curriculum coverage, difficulty/stage, and all adult model/acceptance/response/completion fields.
- Composition: 36 selected-response + 12 adult-reviewed Practice; 12 selected-response + 4 adult-reviewed Test. All 64 audio prompts exactly reproduce their question. All visual fields declare `type: none`; no non-existent diagram is needed to answer these language tasks.
- Root independently reported the structural production validator passes: 64 unique items, 48/16 counts, and balanced selected-response key positions. These structural checks are not substituted for the substantive review recorded here.
- Source authority and limits: `OFFICIAL-FIRST-TEN.md`, `AC9E4LA01-SOURCES.md`, `AC9E4LA01-MAPPING-REVIEW.md`. IXL evidence belongs to root's sole browser research; this reviewer did not operate IXL or claim further progression.

## Required corrections sent to author

| Item | Finding | Required repair |
| --- | --- | --- |
| P-023 | Key says the group has heard two views, but the stem only states two members have not been asked. Group size/heard count is not supplied. | Supply the missing group/heard context, or remove the unsupported count from the key. Keep audio consistent with any stem change. |
| P-046 | The model asks Dr Patel about planning a bridge, but the prompt does not identify their work. The model silently assumes an engineering role. | Give the visitor a clear relevant job in the prompt, or make the model genuinely job-neutral. Keep prompt/audio/model/rubric aligned. |
| P-048 | Acceptance requires preserving a time although the task specifies no time. This could wrongly reject a valid response without an invented time. | Require the same task; preserve a time only if the learner elects to include one. |
| T-004 | Correct answer is obvious from metalinguistic distractors about numbers, politeness and all informal language. As part of an all-difficulty-1 Test it adds little contextual reasoning. | Use a concrete audience/precision choice with plausible near misses and one defensible best answer. |
| T-006 | Directly copying an introduced name is contrasted with plainly invented familiarity/titles. | Add a relationship/role or stated-preference context requiring an appropriate choice among plausible alternatives, without making cultural assumptions. |
| T-008 | Every distractor attacks the person; correctness is detectable without using the actual concern. | Include plausible courteous near misses that fail to preserve the concern or invite discussion, so language/content reasoning is required. |
| T-011 | All distractors are extreme universalising claims. | Assess the actual local source limit using plausible reporting alternatives; preserve the named-community scope. |
| T-013 | Adult task is almost the same paired request as P-037, swapping paper for ruler and office assistant for leader. | Include a genuine role/purpose/context shift, for example with a familiar person in a more formal activity, plus actual messages and an explanation. Do not merely swap nouns. |

The Test quality repairs are a bounded correction, not a request to rewrite the entire bank. At this review identity all 12 selected-response Test items have `recognise`/difficulty 1. Several are suitable entry-level checks, but the Test needs meaningful reasoning/application alongside them. Update stage/difficulty labels to reflect the revised task rather than merely relabelling the same easy questions.

## Substantive coverage and observations

### E1 — context/formality shifts

Read and checked P-001–008, P-031–033, P-037–039, P-048 and T-001–004, T-013–014. The bank includes group discussion to report, familiar versus unfamiliar requests, audience background knowledge, precision, contractions and idioms. Explanations appropriately reject formal-equals-rude/informal-equals-rude binaries and emphasise preserving meaning. Actual message production is required in the adult items. Initial selected-response keys are linguistically defensible; Test depth and P-048 rubric repairs remain as above.

### E2 — age, expertise, familiarity and conventions

Read and checked P-009–016, P-030, P-035, P-039–040, P-046, P-048 and T-005–006, T-013. Relevant expertise is distinguished from age; friendship does not erase a leadership role; requested names are not replaced by invented titles; unfamiliar listeners receive useful context. P-046 needs the missing job context. Test transfer needs the richer role/purpose shift identified above.

### E3 — inclusive language

Read and checked P-017–024, P-032, P-034, P-036, P-041–043, P-047 and T-007–009, T-015. Contexts cover varied contributions, thinking time, caring arrangements, gender assumptions, names, disagreement, silence not proving consent, new participants and communication options. These are actual inclusive-language decisions rather than general curriculum slogans. P-023's unsupported count must be fixed. Adult revisions require meaningful roles and explanations, not simply adding the word everyone.

### E4 — cultural respect and First Nations greeting conventions

Read and checked P-025–030, P-044–045 and T-010–012, T-016. The bank correctly asks for visitor preferences and locally appropriate guidance, limits one community account to its actual scope, and separates permission to speak from recording/sharing. P-026 explicitly supplies the visitor's invitation before using Aunty Jo, avoiding the old bank's unsupported universal title assumption. P-030 does not require constant eye contact as evidence of respect. No invented First Nations language or ceremony appears.

These are respectful **protocol/source-scope tasks**. They must remain connected to explicit same-code Topic/Classroom teaching about the official elaboration; bank metadata alone does not establish that the complete teaching resource explores cultural conventions. No claim that this reviewer has consulted an Elder, reviewed every community's practices or verified a specific greeting is made.

## Genuine performance and pending adult judgement

All 16 adult items have empty answer arrays, null selected-response keys, `grading_mode: adult-review`, actual writing/speaking/communication tasks, example responses and adult acceptance criteria. They ask for paired requests/reports, rehearsal, purposeful questions, inclusive revision, respectful exchanges or a cultural-preparation explanation. Their completion label means ready for an adult, not automatically correct.

The four Test adult items collectively cover E1–E4 and require produced evidence. The current T-013 transfer weakness does not turn the task into a self-tick, but should be repaired to make the independent assessment stronger. Written/usual communication support is offered without grading accent, eye contact or confidence as respect. Equivalent appropriate wording is accepted.

**Runtime still unverified here:** canonical fields do not prove the learner's completed work is stored/displayed, that pending items receive no automatic credit, or that results/review preserve the rubric and actual response. Root's final runtime evidence must demonstrate these behaviours before release.

## Awaiting review before full-code approval

1. Author corrections above and independent recheck of changed items against a new stable bank hash.
2. All final Topic Guide and Classroom View teaching, models, misconceptions, Q&A, assessment hints, exit evidence, differentiation, exact elaborations and mapping caveats.
3. All eight separately authored homework tasks, adult guidance and response spaces.
4. Every page of the actual production-exported worksheet PDF, including all questions, answer/adult notes, pagination, glyphs and clipping/overlap.
5. Final preparation notes and resource/runtime/PWA flow, including authentic adult responses and pending-credit behaviour.
6. Final artifact identities/hashes after corrections. Root's review-aware publisher, complete-tree latest-main integrity, CI, Pages and live release checks remain separate mandatory gates.

No content edits or commits were made by this reviewer. English Content Verified remains off. This initial review does not authorise `--reviewed` publication.

## Independent homework content review — initial pass

Read all eight final-draft homework records (`ac9e4la01-w-001` through `w-008`) and every corresponding static HTML task, model/expected evidence and adult check. This is a separate stable-content review while the author repairs bank findings.

Initial inspected identities:

- `quiz/year-4/english/ac9e4la01/worksheet/worksheet-questions.js`: SHA-256 `d2c871c5c6195e4e01ef8cdd0f5e0d7543c09ab35881f2087119f30a71642a6e`.
- `quiz/year-4/english/ac9e4la01/worksheet/index.html`: SHA-256 `16b8ad898b99f5f9a8606ff8dff340e96a6fe0bfa74ece463c9832b98e6c5bf6`.
- The author may subsequently change the PDF title/eyebrow; final identity must be recorded after the changes and content fix below.

Read-only VM/parity check: all **24 of 24** strings (8 prompts, 8 examples and 8 adult checks) from the code-owned worksheet data are present in the static page; the page has eight labelled response spaces. No homework prompt is an exact duplicate of a canonical bank prompt. The tasks are genuinely separately worded activities, not bank answer rotations.

| Task | Substantive check | Initial outcome |
| --- | --- | --- |
| W-001 | Two welcoming invitations, same club/time, extra context for a new student. The illustrative room is explicitly identified as invented for the learner's own invitation, not a supplied fact. | Pass content |
| W-002 | Group report preserves three signs, one at gate and two by hall, and explains audience-aware wording. | Pass content |
| W-003 | Two distinct method questions recognise younger person's relevant expertise without claiming age alone determines expertise. | Pass content |
| W-004 | Three meaningful garden roles, choice and support, no forced job allocation by gender/disability/assumed ability; adult safety reminder. | Pass content |
| W-005 | Four-line conversation should show both preferences, respectful disagreement and joint next step. Current model is only a prose summary, and adult check does not mention the required four-line form. | Correction required |
| W-006 | Actual greeting, work question and thanks use supplied preferred title; usual communication supports allowed; no accent/eye-contact/confidence grading. | Pass content |
| W-007 | Teacher-supported preference/local-guidance/recording/sharing checklist and limit on generalisation; does not require external child contact, invent a greeting or claim consultation occurred. | Pass content |
| W-008 | Comparison distinguishes precision from relationship-sensitive wording and creates a friendly version retaining timetable meaning; no required contraction or word-count rule. | Pass content |

**W-005 required fix sent to author:** provide an actual four-line model dialogue with both stated preferences, a respectful disagreement and shared next step. Retain acceptance of other suitable dialogues and make the adult check explicitly check the four-line requirement. Update code-owned data and static HTML consistently; regenerate the actual production PDF afterwards.

Static worksheet teaching and tasks remain available without script assembly. Response spaces are intended for print/paper, not misrepresented as editable input fields. No copying of a bank item or standalone self-tick is presented as completed language work.

**Not yet approved:** final PDF pagination/layout, actual download output, final helper/PWA runtime preservation, and final hashes after W-005/title corrections. Root reports actual five-page exports/text-margin checks; the independent visual inspection has not yet occurred and is not inferred from that report.

## Independent static teaching review — initial pass

Read all currently saved Topic Guide and Classroom View teaching: learning intention/success criteria, vocabulary and boundary, relationship/continuum models, discussion-to-report transformations, role/expertise/familiarity, inclusion examples, cultural-learning guidance, four-step sequence, support/core/extend, misconceptions, important Q&A, assessment questions/answers/hints, exit ticket/model/adult evidence, exact curriculum section and references. Also read the retained optional-video, curriculum-equivalents, related-resource and footer text. The author is still repairing mappings and models, so this is **not a final-hash approval**.

### Strengths retained and strengthened

- The useful same-code pencil requests and game-captain role examples remain; continuum, clear language, context and conversation-repair teaching are restored in actual static HTML, without restoring a runtime lesson renderer.
- E1 has explicit report transformation, E2 distinguishes age from relevant experience and role/familiarity, and E3 has concrete inclusive revisions with reasons. The learner must identify an exact language choice and produce actual messages.
- Both views carry consistent code-specific teaching and adult evidence, not independent divergent lessons. The classroom native disclosure shell and same-code journey remain.
- Misconceptions are particular to this code rather than generic advice; differentiation remains within the code and supports varied communication without treating a self-tick as mastery.
- All four exact official elaborations are present, including E4 without the earlier editorial parenthesis in the quoted wording. Their substantive coverage must still satisfy the limitation below.

### Required teaching repairs

1. **Meaning-preservation model:** under “Repair without changing the meaning”, the original instruction to fix something now becomes a request to check it when convenient. Both action and deadline change. Keep the action and relevant timing, or explicitly describe/justify changing unnecessary pressure in a separately framed task; do not claim literal meaning preservation for the current pair. Sent author; root independently identified the same defect.
2. **Poster transformation context:** the report introduces “large-letter” and “back of the room” although the preceding shared-discussion sentence supplies neither. Add an explicit shared scene establishing those facts before the transformation, so the model does not appear to invent detail while teaching preservation.
3. **Primary benchmark label:** remove the misleading “Year 5 supplementary year-level match” label on IXL. It is the closest inspected Year 5 primary external benchmark, applied within Year 4 bounds, with no direct Year 4 LA01 catalogue match; Khan/other sources are supplementary. Root and reviewer both flagged this.
4. **Mapping repairs:** apply or honestly qualify the evidence from `AC9E4LA01-MAPPING-REVIEW.md`. Final text and structured mapping data should not contradict one another.
5. **E4 substantive source/example gap:** current teaching explains respectful consultation, permission and limits on generalising, but only proposes that a teacher can choose a locally endorsed account about First Nations people greeting one another. It does not yet identify or examine such an account. This is responsible preparation but cannot alone establish completed explicit teaching of the full cultural-greeting elaboration. Add a bounded actually inspected authoritative/community-endorsed account with an appropriate source-specific discussion/model, without copying restricted knowledge or inventing a greeting. If no such source is available, preserve the limitation and keep full-code approval pending rather than claiming all elaborations completely taught.

The E4 concern is not a request for children to perform a cultural greeting or for the author to invent tradition. The existing no-universal-title, no-forced-eye-contact, teacher-supported consultation and non-tokenistic source-scope safeguards should be retained.

Final teaching recheck will follow author freeze, alongside corrected bank/homework, production PDF and preparation/runtime evidence. No completed full-code approval is implied by the initial strengths above.

## Independent correction recheck — canonical bank and homework

Re-read every field of the eight corrected items after the author's bank freeze: P-023, P-046, P-048, T-004, T-006, T-008, T-011 and T-013. A read-only comparison against draft commit `5bc309f` confirms these are the only changed item records; the other 56 retain the text already examined in the complete initial item-by-item review.

| Corrected IDs | Final substantive result |
| --- | --- |
| P-023 | Four members/two views/two unheard now explicitly support the inclusive accurate key. |
| P-046 | Supplied bridge-engineer role now supports the bridge-planning model; adult rubric permits alternative relevant questions. |
| P-048 | Timing consistency is conditional on a learner including a time; no nonexistent supplied deadline is assessed. |
| T-004 | Four contextual interpretations distinguish added precision from an unsupported event change or changed speech purpose; key and explanation correct. |
| T-006 | Supplied self-introduction supports Ms Chen; distractors distinguish a friend's information from the visitor's preference. |
| T-008 | Near misses change the topic, conceal concern or act unilaterally; key preserves the actual bending concern and invites collaboration. |
| T-011 | Plausible overgeneralisation/permission errors contrast with the source-scoped key; no unseen local greeting is asserted. |
| T-013 | Now requires an actual planning request, same-friend/wider-audience report and explanation of role/purpose change. Model and rubric preserve three labels along the bottom. Genuine transfer replaces the former repeated request pattern. |

All eight retain matching audio prompts, correct key/choice pairing or truthful adult-review metadata, accurate explanations, and no fabricated visual asset. The revised apply-stage Test items introduce meaningful context/reason discrimination; authentic Test work remains four adult-reviewed performances, not selected-response recognition alone.

**Final canonical bank content approved**, subject to unchanged hash and the separate production/runtime/publication gates: SHA-256 `2e7d171d2c19fb80e70bbd942033a3f951a6398759f911dd577f883eb5415097` at start and end of correction inspection. This is approval of all 64 canonical items as inspected, not full-code or release approval.

Re-read all eight current homework records and rechecked W-005 against the static worksheet. W-005 now provides four actual alternating dialogue turns with both preferences, respectful disagreement and a shared next step; the adult check explicitly requires four dialogue lines. All **24/24** prompt/model/adult-check strings remain in the static HTML. The seven previously passing tasks remain suitable.

Final homework content identities (start/end unchanged):

- Worksheet data SHA-256 `7e9ffb06a0de0a04f21c5c02a76961a77f682b0ab10f5105b2a88e7356306fd3`.
- Worksheet HTML SHA-256 `a676a9b5fb0754dd83a73a4c6a17fee9625f2f0888d038a90937af9ce353eaad`.

**All eight homework tasks approved for content.** Actual final production PDF visual/layout review is assigned by root to a separate independent reviewer and remains a separate gate; this report does not infer that work from content parity.

## Final frozen teaching review and published-bank parity

Re-read all final Topic Guide and Classroom View teaching after the author's freeze, including the new cultural account, every model/question/answer, differentiation, misconceptions, exit evidence, exact descriptor/elaborations and mappings. The repaired checking request retains its action and before-lunch deadline. The poster scene now establishes the formerly unsupported detail. The IXL reference accurately names the closest inspected Year 5 benchmark while retaining its primary external role; international mappings reflect the verified source scopes and honestly qualify India.

The E4 section now actually explores a linked First Nations-published Common Ground account with an attributed explanation of address/connection conventions and a discussion model. Checked against the complete actual article and provenance recorded in `AC9E4LA01-E4-SOURCE-REVIEW.md`. It preserves non-universality, invitation/preferences, teacher guidance, separate recording/sharing permission, no forced identity disclosure and no imitation script. This closes the initial source/example gap without pretending a local consultation occurred. E1–E4 are substantively taught; no elaboration is silently omitted.

**Topic Guide and Classroom View content approved** at final unchanged inspection hashes:

- Topic Guide: `bd5293acb32b40fec3aa7abc22736dc8fd9d1eded80820f2887461ccd10797f6`.
- Classroom View: `31063d4dd654e1cb5e7b2c9747f9d08e2068c75cf39673fdbf369af7796110f8`.

Read the concise preparation content on both attempts, results, reviews and retakes. It consistently recalls the same-code teaching and points back to the native Topic/Classroom views; it does not claim that selected responses demonstrate completed writing/speaking work. Actual runtime interaction and pending marking remain independently tested by root's runtime reviewer.

A separate read-only VM comparison checked **812 published content fields** across both 48-item Practice mirrors and the 16-item Test bank against the approved canonical source, with **zero mismatches**. Compared prompt, audio, visual metadata, all choice text, key/model, structured explanation, and every adult grading/model/acceptance/response/completion field. This establishes generated-bank content parity, not a claim of browser/runtime success.

### Final format-only homework recheck

After content approval the author inserted newline separators between W-005's four unchanged turns and static `white-space: pre-line`. Re-read the current four-turn model and rechecked **24/24** static/data strings. The latest content-approved identities supersede the earlier worksheet hashes:

- Worksheet data: `b7c15d5981da4442b05dc99e701f312cd99102d2196b6ac93c768b99886f338d`.
- Worksheet HTML: `ca50660d114cf1551ae156bd5f3eef80479d617f6c9a481d5cbfe0cef045e701`.

Root is regenerating production PDFs for this formatting change; final independent PDF approval must name the actual regenerated hashes, not the superseded export.

**Independent curriculum/content review now passes** for the inspected LA01 Topic Guide, Classroom View, 64 questions and eight homework tasks at the identities above. Full-code release still requires the separate actual production-PDF inspection, runtime/resource checks, review-aware ledger/publisher and safe complete-tree publication/CI/Pages/live gates. English's 28-code Content Verified badge remains off. No reviewer content edits or publication actions were made.
