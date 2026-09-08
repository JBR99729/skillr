# AC9E4LE01–LE03 preservation and scope audit

Status: preparation started; **not independent final-content approval and not publication approval**. Audit baseline: `a20a0e70` on the isolated `english-next-six` checkout. No production resources, review ledger or release refs were changed by this audit.

## Evidence and limits

Read `AGENTS.md`, `docs/static-curriculum-architecture-v2.md`, `docs/skillr-long-life-curriculum-content-standard.md`, `docs/english-topic-page-quality-standard.md` and `docs/english-student-question-authoring-standard.md`. Root confirmed retrieval of the current Library `svgSkillrHub-IXL-Research-Log.md` v24: evidence covers LA01–LA12, with no inspected LE01–LE03 skill progression. This auditor did not independently retrieve that file and does not claim its source work.

Root's current IXL catalogue observations: LE01 has no linked skill; LE02 lists story elements/sensory/figurative effects; LE03 lists character actions/dialogue, comparison, inference and illustrations. These are **catalogue observations only**, not opened lesson/help/question reviews. Root exclusively handles IXL and access; this auditor used no Browser, IXL or Khan session. Existing optional videos are inventoried below, not newly verified supplementary evidence.

Opened [ACARA's machine-readable entry point](https://www.australiancurriculum.edu.au/machine-readable-australian-curriculum), which links the distribution catalogue and states files updated 7 June 2024. Reused the exact official source URL established in `OFFICIAL-FIRST-TEN.md`: [English JSON-LD](https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/export/MRAC/2024/04/LA/ENG.jsonld). Public curl download and JSON parse succeeded. SHA-256: `92f7b615fd9713835231cf0c6e6e646393d4645f9c4f9dfc1afe03f8bee5e3f7`, identical to the prior verified snapshot. Browserless web extraction of the metadata page returned an internal safe-open error; actual JSON-LD retrieval supplied the evidence. Parsed exact statementNotation, description and node identity: **3 descriptors, 11 elaborations**. Exact scope is appended below. Australian Curriculum material © ACARA, CC BY 4.0 subject to ACARA's additional terms.

Read all three static Topic Guides and Classroom Views, worksheet wrappers, canonical banks and emitted question exports; inspected question/answer/explanation patterns and specific content defects. This is an initial preservation/content audit, not final substantive approval of every question. No live runtime, production PDF or rendered Classroom View visual QA was performed. The local topic Git history returned only the available baseline commit `2f519478`; older strong versions have not been independently recovered. Before substantial replacement, root should inspect full remote history if available, preserving useful existing explanations.

## Resource inventory and common findings

| Code | Canonical bank | Practice / Test | Context variety observed | Visuals in published bank exports |
|---|---|---:|---|---:|
| AC9E4LE01 | `assets/assessment-banks/year4/english/ac9e4le01.json` | 40 / 16 | 5 Practice situations repeated across stages; 2 Test situations repeated eight times | 0 |
| AC9E4LE02 | `assets/assessment-banks/year4/english/ac9e4le02.json` | 40 / 16 | 5 Practice situations repeated across stages; 2 Test situations repeated eight times | 0 |
| AC9E4LE03 | `assets/assessment-banks/year4/english/ac9e4le03.json` | 40 / 16 | 5 Practice situations repeated across stages; 2 Test situations repeated eight times | 0 |

All three are below the **48 Practice / 16 Test** minimum. Each bank has only 14 distinct explanation summaries, including template-appended variants. Merely appending eight questions would not address the underlying repetition. Stage labels recognise/explain/discriminate/apply frequently reuse the same answer, with a changed stem and rotated options; they do not establish increasing challenge or transfer.

Both emitted Practice files expose 40 questions, and Test exposes 16. The worksheet at `quiz/year-4/english/CODE/worksheet/index.html` says “separate 8-question worksheet”, but imports the existing Practice `questions.js` and sets only `worksheetQuestionLimit:8`. `getPrintableQuestions()` in `quiz/assets/worksheet-pdf.js` shuffles and slices the available pool. Thus the current homework is a random Practice selection, not separately authored lesson-aligned writing/discussion evidence. Preserve the route and download journey while authoring dedicated eight-task content and answers, as in the established reviewed-code workflow.

The static Topic Guides retain the exact descriptors and all elaboration wording. LE01 E4 and LE03 E4 append “(teaching context)”, which is editorial rather than official wording. Do not omit those elaborations or treat their inclusion as substantive coverage. All three Classroom Views copy the generic topic examples; “Questions and answers / With answers” contains a generic instruction to use an unseen text, with no actual question or answer. Repair canonical topic content first, then copy it to the existing fixed Classroom View; preserve the current architecture, canonical URLs, resource flow, branding, free/no-login access and existing utilities. No broader redesign is proposed.

## AC9E4LE01 — storylines, ideas and relationships across contexts

Topic: `year4/english/ac9e4le01-similar-storylines-ideas-and-relationships-in-different/index.html`; Classroom View is its `teacher-slides/index.html` child.

**Preserve and develop:** The source-based cultural-evidence caution is valuable: one text must not be treated as representing all First Nations Peoples or Countries/Places. Retain the distinctions between a surface similarity and an underlying idea, and between shared caring relationships and different ways of expressing care. P003's retelling principle and P005's quiet-actions/direct-conversation contrast are useful teaching ideas when supported with actual extracts. The topic's “evidence about character” and “setting shapes events” prompts can become concrete paired examples. The existing optional Khan “Reading (and comparing) multiple books” video route remains a candidate supplement requiring root's verification.

**Specific defects:**

- P001/P002 ask which comparison “best demonstrates the skill”, but supply neither story. The keyed answer asserts different reasons for leaving and family expectations that the stem never establishes. Supply two short texts and ask for a defensible comparison.
- P007/P008 refer to a First Nations story and another story about Country/place without naming or supplying either. The answer is a respectful general principle; it cannot demonstrate that the learner has recognised similarities in actual First Nations literature. Do not replace missing literary evidence with invented cultural knowledge.
- P011–P020 contain the distractor “Because the longest or most complicated option must be correct.” This tests test-taking habits rather than the reading target.
- T005 asks which option to “reject first”; both “texts cannot be compared because one uses pictures” and “must have exactly the same effect” are rejectable. There is no supplied criterion making the keyed priority uniquely correct. T013 repeats this issue with technology and a superficial two-character comparison.
- The topic/Classroom View's four examples remain general instructions rather than paired literary texts. Nature across historical periods (E2) and everyday life in particular historical/cultural settings (E3) are listed but not explicitly demonstrated.

**Scope map and drafting plan:**

| Required component | Proposed evidence and resource repair |
|---|---|
| Similar storylines, ideas and relationships across different contexts | Three worked paired extracts: identify event pattern, shared idea and relationship separately; point to one detail from each text and one meaningful difference. |
| E1 plots/characters, shared idea such as friendship, Australian authors | Inspect and attribute suitable Australian literary sources for class reading; use original SkillrHub pairs for independent practice, clearly labelled original rather than attributed to external authors. |
| E2 nature across time periods | Pair two original, explicitly fictional period contexts for concept practice; use inspected literary source evidence for curriculum reading breadth. Ask how each text presents nature, using words/actions rather than assuming all people of an era think alike. |
| E3 everyday life, mealtimes/family in historical/cultural contexts, world authors | Select accessible attributed world-author texts; compare specific depicted routines and relationships. Do not infer a whole culture from one fictional family. |
| E4 similarities in literature by First Nations Australian authors | Inspect suitable named works/authors with lawful access, identify particular shared storylines/ideas, and provide a teacher-led comparison with source-specific prompts and acceptable evidence. Original generic prose cannot fulfil this author-specific component. |

Plan 48 varied Practice items across plot/idea (12), relationships (12), time/nature/everyday context (12), and evidence-based comparisons/source-aware reading (12), with no cosmetic pairs. Final allocation depends on genuine source availability. Create 16 unseen Test items covering the scope, plus an eight-task authored homework with at least two paired-text written comparisons. Authentic performance: learner discusses or writes a comparison using evidence from each of two actually read texts; teacher observes shared idea plus a contextual difference, without requiring both responses to be identical. Author-specific breadth remains an explicit source-dependent requirement.

## AC9E4LE02 — effects of literary structure and language when sharing opinions

Topic: `year4/english/ac9e4le02-the-effects-of-text-structures-and-language-features-in-literary/index.html`; Classroom View is its `teacher-slides/index.html` child.

**Preserve and develop:** Keep the “I liked the story” → opinion-with-reason model, the distinction between an uneasy mood and proof of danger (P009), and the concepts of flashback, resolution, repetition and withheld information. The existing optional Khan “Figurative language” video is a supplementary candidate, not complete coverage of structure or speaking/sharing. Preserve the normal literary metalanguage; flashback, tension and resolution are expressly in E3 and are not out-of-year extensions.

**Specific defects:**

- P001/P002 describe a flashback in abstract, without showing the opening and time shift. Replace with a short text that lets the student identify the shift and explain curiosity.
- P005/P006 key “patience” for the repeated phrase “still we wait”. Without surrounding lines, the phrase could show impatience, worry or longing. Add a poem whose wording supports the chosen effect, with plausible competing interpretations.
- P003/P004 state that short sentences speed pace and tension without the actual chase wording; model the effect in this passage rather than teaching a universal sentence-length rule.
- Topic examples “might help / should help / will help” and the new-playground fact/opinion contrast do little to teach effects of literary structure. Retain only useful supporting opinion language in a concise location, and replace the main examples with story/poem analysis. The misconception list's camera angle and separate-mode wording is overly generic for this code.
- T005/T013 again ask which distractor to reject “first” without a priority criterion. T001 offers interrupted speech but no actual dialogue; the pupil chooses a general feature/effect claim.
- E2 noun-group imagery is quoted officially but not modelled; E3 flashback/tension/resolution are listed but not explained in the topic's teaching content. No substantive exchange of opinions is provided.

**Scope map and drafting plan:**

| Required component | Proposed evidence and resource repair |
|---|---|
| Effects of text structures | Original before/after plot-order example; flashback with clear time cues; tension-building point; resolution and justified sense of closure. |
| Effects of language features | Short original poem/story extracts with specific noun groups, repetition, sensory choices and sentence rhythm; explain likely effects with wording evidence. |
| E1 appreciation and discussion | Two plausible, different reader responses with evidence; model respectful agreement/disagreement and accept justified variations. |
| E2 grammar/literary language | Explicit noun-group image comparison; prompt “Which words help you picture … and how?” before naming the noun group. |
| E3 flashback, tension, resolution in opinions | Define each through the same short model, then use an unfamiliar text and ask for an opinion supported by one relevant term/detail. |

Plan 48 Practice items: 12 structure/flashback, 12 tension/resolution, 12 language imagery/rhythm, 12 evidence-supported responses. All questions should give the text needed; feature spotting can be an early step but not the whole target. Plan 16 Test items across those areas with unseen extracts. Homework: eight separately authored tasks including two written opinions and one partner-sharing instruction with a self-check/teacher observation alternative. Authentic performance: an actual spoken or written opinion linking feature, exact detail and reader effect; MCQ selection cannot establish the sharing component alone. Keep figurative-device taxonomy proportionate, leaving LE04's sustained device/wordplay focus to that code.

## AC9E4LE03 — character, setting and plot tension through words and illustrations

Topic: `year4/english/ac9e4le03-how-authors-and-illustrators-make-stories-engaging-by-the-way/index.html`; Classroom View is its `teacher-slides/index.html` child.

**Preserve and develop:** Retain choices/consequences as character evidence, setting as pressure on action, and the distinction between an illustration suggesting vulnerability and proving failure. P001's returned wallet, P003's storm/jetty, P005's disagreement and T001's gradual clues are useful seeds for original extracts. Keep source-based cultural caution. Current optional “Plot Mountain!” by Scratch Garden is unverified in this audit; it cannot stand in for author/illustrator evidence or imply every story has one fixed structure.

**Specific defects:**

- P005/P006 ask about two friends arguing but provide no dialogue to analyse. Write the exchange so differences in motives/likes/personal qualities can be inferred.
- P007/P008 and related P017/P018/P027/P028/P037/P038 describe a tiny character under a huge cliff without supplying an illustration. All published bank visual/visualHtml fields are empty. Actual inspectable artwork, accessible description and PDF rendering are required to assess illustrator choices.
- P009/P010 and later forms contain malformed phrasing such as “In a character ignores a warning and later becomes lost”. More importantly, the stem assumes a causal link without giving the warning or action; an original cause-and-consequence extract can support the inference.
- T009/T010 assert a shy character's growth without supplying earlier behaviour. Give the before/after evidence. T005/T013 repeat the ambiguous “reject first” template.
- Topic/Classroom View examples are the same generic prose used in LE01. Appearance/behaviour/speech (E1) and dialogue qualities (E2) need actual words; E4's First Nations illustration component has only a descriptor and cultural caution, no named author/illustrator or viewed work.

**Scope map and drafting plan:**

| Required component | Proposed evidence and resource repair |
|---|---|
| Character development, E1 appearance/behaviour/speech | Three connected short scenes showing how selected descriptions/actions/speech build a character; avoid assuming appearance proves moral character. |
| E2 dialogue reveals likes/dislikes/personal qualities | Actual paired speaker lines, specific inferred quality and quoted support; believable near-miss distractors distinguish the speakers. |
| Setting makes story engaging | Compare a scene's weather/place/time with a changed setting and explain how the problem or choices change. |
| Plot tension and E3 choices/consequences | Pause at a decision, name what could be gained/lost, cite how the author makes the reader care, then trace a supported consequence. |
| Illustrations and E4 First Nations authored stories | Original practice pictures for visual reasoning plus genuinely inspected, attributed First Nations story/illustration evidence for the author-specific component. Ask how image and words contribute together; do not fabricate community-specific meanings or impersonate an artist's cultural voice. |

Plan 48 Practice items: 12 character/appearance/action/speech, 12 dialogue/motive, 12 setting/choice/tension, 12 word-and-picture reasoning. Plan 16 unseen Test items across all components and eight separate homework tasks including annotated illustration and a short spoken/written explanation. Authentic performance: discuss one author's detail and one illustrator's visible choice in a read/viewed story, connecting both to engagement with character, setting or tension. For E4, use a named, verified First Nations authored story rather than an invented generic “First Nations story”.

## Next handoff and release conditions

1. Root completes relevant IXL help and representative-question observations, or records a genuine lack of matching skill/access/progression explicitly; supplements follow that primary check.
2. Resolve the source-dependent First Nations/Australian/world-author reading examples for LE01 and First Nations illustrated story for LE03. Catalogue labels, metadata alone and uninspected books cannot be recorded as reviewed literary evidence.
3. Draft concrete static topic repairs with elaboration coverage, meaningful model answers, support/core/extend and authentic performance rubrics; preserve good principles and links. Copy approved canonical content into Classroom Views, and prepare distinct worksheet items/answers and 48P/16T banks.
4. Independent reviewers inspect the final exact authored artifacts, including every option/explanation/visual, require fixes by ID/resource, recheck fixes and record hashes. This report does not satisfy that gate.
5. Render and inspect every final Classroom View page and actual generated worksheet/assessment PDF; test worksheet selection, visual persistence, navigation, score/review and the full resource journey. Only then use the review-aware publisher/ledger and release integrity workflow. The Year 4 English group badge stays off until every listed code qualifies.

## Exact official scope

The statements below are extracted verbatim from the downloaded official JSON-LD. Node suffixes identify the specific source concepts under `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/`.

- **AC9E4LE01** — recognise similar storylines, ideas and relationships in different contexts in literary texts by First Nations Australian, and wide-ranging Australian and world authors
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/3381ee02-03dc-49f3-9d94-e0af106a4836`

- **AC9E4LE01_E1** — comparing the plots and characters in 2 literary texts with similar ideas; for example, 2 literary texts that explore friendship in texts by wide-ranging Australian authors
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/7da5462b-eb2e-4910-a267-dc5be45b9339`

- **AC9E4LE01_E2** — commenting on how literary texts set in different time periods present ideas about nature
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/0b5cd15d-cac1-4f9a-a2fa-916222fd2743`

- **AC9E4LE01_E3** — discussing how everyday life, such as mealtimes and family relationships, is depicted in particular historical and cultural contexts in texts by wide-ranging world authors
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/08b15a22-8a1c-4295-9ebb-0469f5432d86`

- **AC9E4LE01_E4** — recognising similar storylines and ideas in literature by First Nations Australian authors
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/6f028d4e-d776-4327-a372-6391007881e2`

- **AC9E4LE02** — describe the effects of text structures and language features in literary texts when responding to and sharing opinions
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/e9bd24c2-4750-4848-961a-67e2752cb74a`

- **AC9E4LE02_E1** — sharing and discussing understanding of the effects of literary techniques on their appreciation of texts
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/9f98cd0d-4136-4d54-9ace-a55a857445a7`

- **AC9E4LE02_E2** — sharing responses to texts using appropriate language to talk specifically about grammar and literature; for example, “The use of the noun groups to describe the character really helps to create images for the reader.”
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/347bc7a2-f9bb-49bb-90b8-15d4ec7a5460`

- **AC9E4LE02_E3** — using language appropriate to a text such as “flashback”, “tension” and “resolution” when sharing opinions about plot structure
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/921e75bc-5c46-4852-91d0-6bf3e657093c`

- **AC9E4LE03** — discuss how authors and illustrators make stories engaging by the way they develop character, setting and plot tensions
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/ac0fabba-451c-447c-8d33-ab6a76c88272`

- **AC9E4LE03_E1** — examining an author’s choice of language to describe a character’s appearance, behaviour and speech
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/62198fb0-290f-4f03-87b9-afb9df1c290d`

- **AC9E4LE03_E2** — discussing what is learnt about a character through dialogue such as their likes, dislikes or personal qualities
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/9e7e2fbf-4151-4d5a-afa6-735e28734807`

- **AC9E4LE03_E3** — identifying moments in the plot where characters are faced with choices, and commenting on how the author makes the reader care about their decisions and the consequences
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/772a9129-6cc9-4c13-85ee-3b2987c602f6`

- **AC9E4LE03_E4** — identifying how illustrations contribute to the meaning of stories by First Nations Australian authors
  - Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/51378541-7feb-4fc0-ab71-d5011be619b7`

## Baseline artifact identities

- `assets/assessment-banks/year4/english/ac9e4le01.json` — SHA-256 `622eecb5a7863540d19e7b4635e38c6c98df9966851d53768fca3818567d800e`
- `year4/english/ac9e4le01-similar-storylines-ideas-and-relationships-in-different/index.html` — SHA-256 `7527e68fb042679d0afca61daadc751c05eeff5ecef3a02d1ea0a617257b99c5`
- `assets/assessment-banks/year4/english/ac9e4le02.json` — SHA-256 `38696bd22db5de141700be3abb0688c722f7fbc3b74abd651bdd91e2e9a783ad`
- `year4/english/ac9e4le02-the-effects-of-text-structures-and-language-features-in-literary/index.html` — SHA-256 `0c68f32cf6140a03b3831db326c91481e1a532a7270fe4d7944be73f57965ebf`
- `assets/assessment-banks/year4/english/ac9e4le03.json` — SHA-256 `7406f03b5a5c5962d5a7a78dee340cc66b9bbcdb70dd908927d3b1b5575bcc85`
- `year4/english/ac9e4le03-how-authors-and-illustrators-make-stories-engaging-by-the-way/index.html` — SHA-256 `601bbd5da44b52a64bc2470db484084aa18de42bf126595243be6eea93dd0d2a`
