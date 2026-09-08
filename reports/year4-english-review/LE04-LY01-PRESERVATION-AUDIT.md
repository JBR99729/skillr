# AC9E4LE04–AC9E4LY01 preservation audit

Audit date: 2026-09-08 UTC. Scope: AC9E4LE04, AC9E4LE05, AC9E4LY01 only. Baseline: `a20a0e705b9caed93132f907bdc66499da4bb3f6` in `english-next-six`.

**Status: initial preservation/content-gap audit; none of these three codes is approved for publication.** No production content, verification ledger or release state was changed. This report is not final every-item approval, visual/render QA, source benchmarking or proof of live deployment.

## Instructions and evidence

Read `AGENTS.md`, `docs/static-curriculum-architecture-v2.md`, `docs/skillr-long-life-curriculum-content-standard.md`, `docs/english-topic-page-quality-standard.md`, `docs/english-student-question-authoring-standard.md` and `reports/year4-english-review/OFFICIAL-FIRST-TEN.md`. Inspected canonical assessment JSON, runtime Practice/Test exports, static Topic Guide and Classroom View HTML, worksheet wrapper and worksheet PDF bank-selection implementation. Grouped every canonical item by its option set to reveal repeated stimuli; examined representative questions, answers and explanations from every distinct option group. This does not replace final independent inspection of each authored item.

The required `svgSkillrHub-IXL-Research-Log.md` was not present in this checkout. Root reports reading current v24 and finding no observed benchmark evidence for this next batch. Root alone handles IXL/browser research. At this checkpoint the root observed relevant IXL catalogue links for LE04/LE05, but lesson opening required sign-in; LY01 had no directly mapped catalogue link. These are reported access/mapping facts, **not inspected teaching/help/progression evidence**. No Khan lesson was inspected by this auditor; existing video labels are not evidence of current suitability.

## Exact official scope

Source authority: [ACARA machine-readable curriculum entry](https://www.australiancurriculum.edu.au/machine-readable-australian-curriculum), [English official JSON-LD distribution](https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/export/MRAC/2024/04/LA/ENG.jsonld). Parsed shared freshly retrieved snapshot `/tmp/le-audit-official.jsonld`; complete-byte SHA-256 `92f7b615fd9713835231cf0c6e6e646393d4645f9c4f9dfc1afe03f8bee5e3f7`, matching the previously documented official snapshot. Selected exact `statementNotation` nodes, not guessed routes. Australian Curriculum material © ACARA, CC BY 4.0 subject to ACARA additional terms. Wording below is source evidence, not authored teaching.

### AC9E4LE04

- **AC9E4LE04:** examine the use of literary devices and deliberate word play in literary texts, including poetry, to shape meaning
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/8568ab4c-d31e-448b-ac6c-b371f5d98505`
- **AC9E4LE04_E1:** defining neologisms and puns, and identifying how they are used by authors to create a sense of freshness, originality and playfulness
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/160c6cc6-e563-4e5c-bb71-8c023520f229`
- **AC9E4LE04_E2:** discussing poetic language, including adjectives that engage readers emotionally and bring the poet’s subject matter to life
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/2fed1246-3587-4e3b-b144-62da82f9251c`
- **AC9E4LE04_E3:** exploring emotive language in texts by First Nations Australian poets and authors
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/dfdb5017-7ed0-4aa3-b05a-224a7c0bf5aa`

### AC9E4LE05

- **AC9E4LE05:** create and edit literary texts by developing storylines, characters and settings
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/dc8345b4-63e2-415f-ad21-eae52acb0e50`
- **AC9E4LE05_E1:** creating texts using a range of sentence types, including dialogue and literary devices
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/f16552de-1112-4edf-a731-ce4740bd4851`
- **AC9E4LE05_E2:** collaborating with a peer to edit literary texts by sharing feedback about choices made to develop storylines, characters and settings
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/63bdf8a3-e309-4e26-be9c-3b98aaacd4ad`

### AC9E4LY01

- **AC9E4LY01:** compare texts from different times with similar purposes and audiences to identify similarities and differences in their depictions of events
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/9254ad20-8885-4651-9c5e-a554118b7403`
- **AC9E4LY01_E1:** viewing documentaries and news footage from different periods, comparing the purpose and audience; for example, coverage of major sporting events
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/1972c91e-c99c-4191-a628-885f65e236e2`
- **AC9E4LY01_E2:** comparing the texts used to communicate between family members, noting similarities and differences as a result of changing technology
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/3b2061bf-e08e-41d1-ab6d-949ad0a44a56`

All three existing topic descriptors and all seven elaborations match official wording after stripping HTML/normalising whitespace. LE04 E3 appends `(teaching context)`, an editorial label outside the official wording. Correct wording presence does not establish teaching coverage.

## Preservation baseline and shared defects

| Code | Canonical and runtime Practice | Test | Distinct core Practice stimuli | Distinct core Test stimuli |
| --- | ---: | ---: | ---: | ---: |
| AC9E4LE04 | 40 | 16 | 5 | 2 |
| AC9E4LE05 | 40 | 16 | 5 | 2 |
| AC9E4LY01 | 40 | 16 | 5 | 2 |

Practice is eight below the 48-item minimum for each code. Rewording prompts, shuffling identical options and asking students why the already supplied correct statement works do not create meaningful variety. Each bank has 10 distinct option sets for Practice and 6 for Test, but only five and two underlying contexts respectively. No runtime items contain `visual` or `visualHtml` content. Avoid reporting these counts as a quality pass.

Preserve each canonical URL, static HTML teaching delivery, shared CSS, native disclosure structure, resource navigation, free/no-login access, analytics and relevant existing examples. All three resources link to the same-code Topic → Classroom View → Worksheet → Practice → Test routes in source. Runtime files expose expected arrays (40 Practice/16 Test); duplicated Practice exports agree on counts. Source inspection establishes file presence and link intent, not live runtime or deployment success.

The three worksheet wrappers describe a separate eight-question homework sheet but each loads its own Practice `questions.js`. `quiz/assets/worksheet-pdf.js` uses an explicit worksheet array if supplied; these wrappers supply none, so it randomly selects Practice items. Distinct IDs preserve semantically duplicate questions through the uniqueness filter. This conflicts with the instruction to author homework from the lesson independently of Practice/Test. Add a dedicated code-specific worksheet bank through the existing supported route, with original open responses and useful expected evidence; retain the download flow. Actual resulting PDF rendering and print QA remain required.

Topic and Classroom View share weak content, so agreement between them currently propagates defects. Their formative blocks say to use a fresh example but supply no task/expected response; “Questions and answers” does not contain actual questions and answers. No code has usable Support/Core/Extend, worked elaboration coverage or code-specific mastery evidence. Preserve the current shell, repair canonical topic teaching first, and rebuild/copy only these scoped Classroom Views from reviewed topic wording. No architecture change or broad generation is authorised.

Available `git log` for these pages exposes one baseline commit (`2f519478`); no earlier strong version was recovered in this checkout. Do not infer that no richer historical content exists remotely. The preservation instructions still apply before any replacement.

## AC9E4LE04 — literary devices and deliberate word play

**Preserve/adapt:** The bicycle pun (P-001), playful invented word (P-003), wind personification (P-005), homework hyperbole (P-007), creek simile (T-001), and campfire sound pattern (T-009) are useful small teaching seeds. Keep the sound/meaning and word-choice/effect reasoning, with fewer repeats and stronger distractors. Preserve the cautious topic reminder to identify cultural sources and avoid generalising one example to all First Nations Peoples.

**Specific repairs:**

- P-001/P-002/P-021/P-022/P-031/P-032 repeat the same bicycle sentence and three options; the identical pattern applies to each of the five Practice stimuli. P-011 already supplies the correct explanation in its stem and includes “the longest or most complicated option must be correct” as a distractor. This tests recognition of obvious nonsense more than close reading.
- T-004 asks which general clue should guide the decision; one distractor says to choose the option with most words. Replace this with a fresh, evidence-based comparison or interpretation. T-001–T-008 all return to the same creek image; T-009–T-016 to the same campfire phrase.
- P-009's “helpless joey” rescue appeal introduces emotive wording, but an isolated appeal phrase does not establish poetic context and cannot satisfy First Nations authored-text coverage.
- Topic/Classroom example sequence teaches opinion plus reason, modal strength and subjective/objective wording rather than word play and poetry. Repair examples for this code; retain the evidence-led reasoning principle as a support cue rather than pretending it constitutes coverage.
- Do not define a neologism merely as any unknown or misspelt word. Model deliberate invention and explain intended freshness/playfulness. Do not claim every reader has an identical emotional response.

**Coverage and authentic evidence:**

| Official component | Existing evidence | Required scoped drafting |
| --- | --- | --- |
| E1 neologisms/puns; freshness, originality, playfulness | One pun and one playful word, heavily repeated in bank; not explicitly taught on topic | Explain both concepts through several original short literary contexts; compare plain/revised choices and explain meaning and effect |
| E2 poetic language; emotional adjectives | Isolated emotive phrase and figurative lines | Supply original complete short poems/brief connected extracts, model exact word evidence and likely emotional/image effect |
| E3 emotive language by First Nations poets/authors | Descriptor list and cultural-source caution only | Inspect suitable authentic text by a named First Nations author, confirm identity/source and permitted use; reference/link lawful source without fabricated Indigenous voice or copyrighted substitute passages |
| Descriptor literary texts including poetry | Mainly isolated lines | Read, annotate, explain and compare devices in meaningful literary context; a brief oral reading may support sound effects but is not a substitute for interpretation |

Proposed worksheet evidence: identify exact word(s) in a supplied short poem, explain one effect, compare two plausible alternatives, and explain a pun's two meanings. Include a properly sourced First Nations reading activity once text suitability/use is established. This is a proposal; no source-informed final writing has occurred.

## AC9E4LE05 — creating and editing literary texts

**Preserve/adapt:** Mina's map/crowd opening, Leo's backstage actions, sensory bush setting, Amira's shed dialogue, rising-creek complication and the lost-dog ending are useful original drafting seeds. Specific, effect-linked peer feedback in T-009 is a helpful model. Preserve these strengths in worked before/after writing examples rather than replacing them with generic curriculum restatements.

**Specific repairs:**

- P-001 chooses between a useful scene and obvious filler (“It was a show”; “stories do”). P-003 contrasts a vivid emotion example with “nervous nervous nervous” and “Leo is a character”. Use plausible near-miss revisions with a clear stated purpose so students reason about craft.
- P-011–P-020 supply the correct sentence in the stem and repeat explanation cues, including the “longest or most complicated option” distractor. Test T-001–T-008 repeats one ending; T-009–T-016 repeats one feedback statement.
- T-009 has no actual classmate story to ground the feedback about its setting. Supply a scene and require feedback that follows from evidence in it.
- Topic/Classroom teaches sentence expansion, causal clauses and passive voice, without demonstrating storyline development, a character decision, setting's role, drafting or peer editing. Sentence work may support a story revision but cannot stand as the whole lesson. Passive-voice comparison should not become this code's core target.
- Avoid an absolute “show, never tell” rule. Telling can help pace or summarise; show details when they serve the stated scene purpose. Avoid claiming that every story must follow one rigid plot mountain.

**Coverage and authentic evidence:**

| Official component | Existing evidence | Required scoped drafting |
| --- | --- | --- |
| Descriptor create/edit storyline, character, setting | Selecting good isolated sentences | Model a connected draft with linked events, character motivation/action, setting affecting a choice; independently create and revise a short scene/story |
| E1 range of sentence types, dialogue, literary devices | Dialogue and imagery seeds in answers, no composition | Before/after story segment; demonstrate purposeful varied sentence choices, dialogue and one apt device; student creates their own text |
| E2 peer collaboration and feedback | Choosing a sensible feedback statement, no source scene | Give a partner-feedback protocol with source scene, specific comment, revision and writer explanation; observe or retain feedback/revision evidence |

MCQ can assess editing decisions but cannot demonstrate a student's ability to create a literary text or collaborate. Keep banks as supporting assessment; build an original writing-and-editing worksheet with space for a draft, peer comment, revised section and explanation. Provide teacher criteria/acceptable alternatives, not a single mandatory story. Where working alone, teacher/adult feedback can support practice but should not be recorded as observed peer collaboration unless it occurs.

## AC9E4LY01 — texts from different times

**Preserve/adapt:** Useful principles are that purpose can remain similar across media; newer does not automatically mean truer/better; compare what technology permits without judging families. Family communication and sports reporting contexts are particularly well matched to the elaborations. Preserve the existing try-it prompt to compare same-event accounts and record purpose plus similarities/differences, after giving students actual accessible texts.

**Specific repairs:**

- P-001 discusses an old timetable and current app without supplying either text. P-003 names a wartime letter and video message but provides no content, dates or inspectable evidence. P-005 names sports reports without showing how they depict events. These assess generic media knowledge, not reading/viewing comparison.
- P-007's tourism poster and P-009's school-rule notice do not establish depictions of events, similar audience or dates. T-009's field guide/app pair similarly concerns species identification rather than event depiction. Use only as limited transfer support if connected to the official target; prioritise matched dated event accounts.
- Blanket statements about an app's functions, family message privacy or technology speed need to be grounded in the supplied example; media labels alone do not establish those features.
- T-004 “Separate delivery method from purpose” is a strategy-selection item with silly distractors. Replace it with evidence from a fresh paired stimulus. Neither of the two Test contexts shows a dated account of an event.
- Topic/Classroom “Curriculum example 1/2” simply repeats elaborations and tells a teacher to use them. “Make the concept visible” repeats the entire descriptor instead of modelling a comparison. No actual paired texts, footage, dates or analytical model are present.

**Coverage and authentic evidence:**

| Official component | Existing evidence | Required scoped drafting |
| --- | --- | --- |
| Different times, similar purposes/audiences, event depiction | Old/current labels and generic platform comparisons | Label text dates, represented events, audience and purpose; supply pairs with enough detail to compare emphasis, detail, language and images |
| E1 documentaries/news footage from different periods | Elaboration text and a print-vs-blog bank seed | Inspect lawful age-suitable footage from at least two periods; identify source/date/purpose/audience and model comparison. Transcript/storyboard can support access but must not be called watched footage evidence |
| E2 family communication and changing technology | Named wartime letter/video comparison only | Original clearly labelled fictional dated letter/message pair about comparable family events, or lawfully sourced authentic pair; compare content plus technology consequences from observable evidence |

Do not require that every pair depicts the exact same historical event: the descriptor allows events with comparable communicative purposes and audiences, and elaborations include recurring sporting events/family communication. A same-event historical/later account can be one valid case. Keep year-level work concrete; advanced source historiography is unnecessary.

Proposed worksheet evidence: two supplied dated family texts, a comparison table with exact clues, short paragraph naming a similarity and difference in event portrayal, and a teacher-led viewing comparison with accessible alternatives. No student private communications are needed.

## Source/drafting gates still open

1. Root completes primary IXL teaching/help and representative progression inspection for genuine matches, or records specific access/mapping limits without substituting uninspected skills. Catalogue names are not sufficient.
2. Supplementary Khan/other source inspection addresses actual gaps within Year 4; inspect rather than relying on current embedded video titles. LE04 additionally needs appropriate authentic First Nations literary evidence; LY01 needs actual multi-period footage and accessible contextualised pairs.
3. Author improved static teaching and dedicated homework first, preserve useful seeds and all routes, then create at least 48 meaningfully varied Practice and 16 fresh Test questions per code. Scope includes all elaborations and authentic reading/writing/performance evidence beyond quiz recognition.
4. A separate reviewer must inspect the final exact artifacts, all questions/options/answers/explanations/visuals, resource alignment, worksheet PDF rendering and Classroom View readability, recheck corrections and record hashes. No such final artifacts exist in this audit.
5. Only then may the root use the reviewed publisher/ledger and complete-tree release gates. Keep Year 4 English Content Verified badge off until every Year 4 English code qualifies.

## Inspected artifact fingerprints

SHA-256 below identifies the baseline source files, not approved release artifacts.

- `assets/assessment-banks/year4/english/ac9e4le04.json`: `4e507ac617d946a8aae1f4d2f89d847e2b23131f64eb66b66bb501f3d159bbcf`
- `year4/english/ac9e4le04-examine-the-use-of-literary-devices-and-deliberate-word-play/index.html`: `6f2e5612726e2ced39c6157e0a71e6dd7bfbb4d5ed5baff771112bb16be85dee`
- `year4/english/ac9e4le04-examine-the-use-of-literary-devices-and-deliberate-word-play/teacher-slides/index.html`: `d71b4eb9bd3a3ce8fc40c790086f1fd37bcde797731721a563340dd51d6d8ae0`
- `quiz/year-4/english/ac9e4le04/worksheet/index.html`: `b5b96be5cfa5ec5a6f63a3ef0d6065ad5812da4b542a37da10ab90363f090c5f`
- `assets/assessment-banks/year4/english/ac9e4le05.json`: `6284ea29bbabe6b0d3ab4a74cc339b88ffc72b8e89da5683bc1d4b5b48b51599`
- `year4/english/ac9e4le05-and-edit-literary-texts-by-developing-storylines-characters-and/index.html`: `72805d97e18ac9fce07f80f939f16f60e1af38a7077dd1ecb26a755b3a7ab564`
- `year4/english/ac9e4le05-and-edit-literary-texts-by-developing-storylines-characters-and/teacher-slides/index.html`: `322b7fca5197ec1156a926f7b92d879cc9eeb9ff0a666a5e64fd04f83e3f393f`
- `quiz/year-4/english/ac9e4le05/worksheet/index.html`: `1ed7fe18229601b5c9f104c716e35d3e2b0163d3317b596c72666280f4b9cdad`
- `assets/assessment-banks/year4/english/ac9e4ly01.json`: `7b22a0fab105b0db090723d545bdf8c77b4fb9512422193dff8aa76664041274`
- `year4/english/ac9e4ly01-texts-from-different-times-with-similar-purposes-and-audiences/index.html`: `a9ba299fce1460b8536c03d46fecc73e9126f76836e0764c0dfdafdf9deaa40b`
- `year4/english/ac9e4ly01-texts-from-different-times-with-similar-purposes-and-audiences/teacher-slides/index.html`: `d2a027ca1b1f0833a9f4bf260bf8821d474d3b982c88dd60e42d037ef13b24f7`
- `quiz/year-4/english/ac9e4ly01/worksheet/index.html`: `2ed9fa4898203b1163717fed1645dcfd8643d6e3413398f940daa7f94bc0ffd3`
