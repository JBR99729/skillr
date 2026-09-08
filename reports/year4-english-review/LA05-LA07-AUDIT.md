# AC9E4LA05–LA07 preservation and gap audit

Date: 2026-09-08 UTC. Scope: read-only repository audit; only this report was written. No IXL/browser activity, external research, content edits, commit, publication, PDF rendering or completion approval. Root remains sole IXL researcher. These codes remain pending.

## Baseline and method

Inspected complete current `AGENTS.md`, static curriculum architecture v2, long-life content standard, English topic-page quality standard, English student-question authoring standard and `reports/year4-english-review/OFFICIAL-FIRST-TEN.md`. Official wording below is based on that separate verifier's ACARA evidence, not an independent new source fetch.

Baseline HEAD: `883cee463da1492cf439696ad02b571abc0fcab7`. Read all three canonical banks, grouped repeated answer sets to inspect their actual choices/explanations, compared published question/choice/key content programmatically, read static Topic and Classroom teaching content, worksheet pages/selection implementation, curriculum metadata and preserved authored lesson specifications.

The checkout is shallow (`git rev-parse --is-shallow-repository` = true). `git log --all` for the LA06 topic exposes only shallow-boundary commit `2f51947`. This does **not** prove no stronger historical version exists. Useful stronger same-code specifications were found in the current complete tree; recover these deliberately instead of continuing the generic current teaching text. Deep historical comparison remains a pre-replacement preservation check if required by the author/root.

### Exact resource paths

All paths below are repository-relative. Set `{code}` to lowercase `ac9e4la05`, `ac9e4la06` or `ac9e4la07`.

| Code | Topic directory under `year4/english/` | Preserved authored specification |
| --- | --- | --- |
| AC9E4LA05 | `ac9e4la05-text-navigation-features-of-online-texts-that-enhance/` | `assets/year4-english-data-la1.js`, AC9E4LA05 object |
| AC9E4LA06 | `ac9e4la06-that-complex-sentences-contain-one-independent-clause-and-at/` | `assets/year4-english-data-la1.js`, AC9E4LA06 object |
| AC9E4LA07 | `ac9e4la07-investigate-how-quoted-direct-and-reported-indirect-speech-are/` | `assets/year4-english-data-la2.js`, AC9E4LA07 object |

- Topic: the directory above plus `index.html`.
- Classroom View: same directory plus `teacher-slides/index.html`; retain this current static native-details architecture and route. An old `slide-01.png` is also in each directory; it is not proof of current Classroom visual approval.
- Canonical bank: `assets/assessment-banks/year4/english/{code}.json`.
- Published Practice: `quiz/year-4/english/{code}/practice/questions.js` and identical mirror `practice/practice-questions.js`.
- Published Test: `quiz/year-4/english/{code}/test/questions.js`.
- Worksheet: `quiz/year-4/english/{code}/worksheet/index.html`.
- Practice/Test entry, result, review and retake routes already exist under the corresponding activity directory and must remain intact.
- Existing SVG bank asset: `assets/assessment-visuals/year4/english/{code}.svg`; no current published item in these three banks references a visual. SVG presence is not assessed visual evidence.
- Shared curriculum metadata: `data/curriculum-units.json`; the three `teacherSlideUrl` values still point to old `/worksheets/year4/english/teacher-slides/{code}-teacher-slide.pdf` routes. Do not use these legacy metadata targets to replace the actual Classroom View route.

## Shared bank and worksheet findings

Each code has **40 Practice +16 Test**, all published as `type: "single"`, three choices each, no visual/visualHtml, no authentic production response field. Practice mirror is byte-identical. All 56 published question strings, choice arrays and correct indices match canonical source in the same order for each code.

Canonical JSON is an array. Item fields are `id`, `subject`, `year_level`, `curriculum_code`, `bank`, `stage`, `skill`, `question`, `audio_prompt`, `answers: [{text,is_correct}]`, `correct_index`, `explanation: {summary,hint}`. Published items use lowercase `id`, `curriculumCode`, `bank`, `skill`, `printable`, `type`, `question`, `audioPrompt`, `visual`, `visualHtml`, string `answers`, `correct`, combined `explanation`, `structuredExplanation`, `qualitySchema: "production-v1"`. Preserve supported schema/renderer behavior; do not merely add invented response types that the runtime ignores.

### Repetition is structural, not just similar subject matter

Each code has only **five Practice situations, two Test situations and 16 unique unordered answer-text sets across 56 items**. Practice stages rotate the same situations and options rather than requiring transfer to new language/text evidence:

- Situation 1: P001/P002/P021/P022/P031/P032 share the same three options; P011/P012 repeat its explanation options.
- Situation 2: P003/P004/P023/P024/P033/P034; P013/P014 explanation pair.
- Situation 3: P005/P006/P025/P026/P035/P036; P015/P016 explanation pair.
- Situation 4: P007/P008/P027/P028/P037/P038; P017/P018 explanation pair.
- Situation 5: P009/P010/P029/P030/P039/P040; P019/P020 explanation pair.
- Test situations use T001–T008 and T009–T016 respectively. Six items in each block reuse the same three answer texts; T003/T011 select the already-given explanation and T004/T012 select the hint.

Across all three codes, explanation-choice distractors include “Because the longest or most complicated option must be correct” and “Because surface appearance matters more than meaning”; hint-choice distractors include “Choose the option with the most words” and “Ignore the context and use the first familiar form.” These are generic filler, not plausible code-specific misconceptions. P021–P030 append the same generic “wording or form that only looks familiar” advice. Stage labels do not turn these repetitions into meaningful variety.

**All six T005/T013 items are ambiguous reject-first questions:** each presents two incorrect/poor alternatives but keys only one, without a priority criterion. Examples: LA06 T005 keys the fragment “After the ice melted.” while “We measured because after the ice.” is also rejectable; LA07 T013 keys quoted `whether...` wording while inverted indirect-question syntax is also wrong. LA05 T013 asks which to reject first but both pale text on a busy image and hidden unlabelled alerts impede the stated purpose. Re-author these as specific, unambiguous tasks rather than changing only the key.

### Worksheets are not a distinct eight-task homework resource

All three worksheet pages declare `worksheetQuestionLimit:8`, load the corresponding **Practice** `questions.js`, jsPDF 2.5.1 and `/quiz/assets/worksheet-pdf.js?v=18`. There is no code-owned worksheet-question file. Current shared generator (internal version 18.4) chooses an explicit worksheet bank if present, otherwise Practice/Test; it shuffles the printable pool and takes eight. These pages therefore randomly sample the repeated single-choice Practice items, not eight separately authored homework tasks.

Root/author should supply eight distinct aligned tasks with sufficient response space, adult guidance and acceptable evidence through the supported explicit worksheet-bank path. Review all pages of the **actual production-generated PDF**, including answer/adult guidance pages; this audit has not generated or visually approved any PDF.

## AC9E4LA05 — navigation and readability

### Preserve/recover

The authored specification is substantially stronger than current HTML. It has a useful feature / reader use / quality-check table covering headline, drop-down menu, hyperlink, graphic and layout; descriptive-versus-vague link examples; caption/relevance checks; page-path tracing; mobile layout sketch; and specific misconceptions (“Navigation is only the top menu”, “Every image improves readability”). Recover these into static Topic HTML and copy the reviewed source into Classroom View. Keep accessibility as a supporting principle in age-suitable language, not a developer terminology assessment.

Current Topic and Classroom “examples” primarily teach text-purpose structure, pronoun cohesion and paragraph focus. They belong more naturally to LA03/LA04 and do not model this code's actual online navigation. The four-step sequence, misconceptions and formative task are generic. Exact E1/E2 are listed but not substantively taught through inspectable resources. “Questions and answers” in Classroom View contains only a direction to use an unspecified fresh example, not a question/answer.

### Coverage and drafting requirements

- Descriptor: explicitly show headlines, drop-down menus, links, graphics and layout in original readable page examples.
- E1: compare purposeful use of print headings/subheadings with digital home/subpages. Model an actual information-seeking route from a given question to a location and evidence, not only a definition.
- E2: show two **same-topic** online texts and compare their features for a stated reader purpose. Current bank's isolated school, weather, reef, museum and tablet situations do not perform this comparison.
- Add an original print extract, an original home/subpage pair and a same-topic webpage comparison. Static HTML/SVG mockups or safe local examples avoid requiring children to browse unknown sites.
- Include authentic reading/navigation evidence: identify destination labels on a supplied page, trace a route and locate requested information; annotate or redesign one navigation feature and justify its effect. A local visible dropdown is useful if already supported, but no new interaction framework is necessary to provide assessable examples.

### Specific bank issues

- P007/P008/P027/P028/P037/P038 give a breadcrumb text route without actually showing a site; preserve the breadcrumb concept but provide inspectable page structure.
- P009/P010/P029/P030/P039/P040 ask for general tablet-design advice without a layout to read.
- P005/P006/P025/P026/P035/P036 describe subheadings as allowing a “jump”; ordinary headings help scanning, but are not necessarily clickable jump links. Be precise when modelling either behavior.
- Test T001–T008 only recycles zoo opening hours; T009–T016 only recycles an emergency-page redesign. Replace with distinct page evidence, including E2 comparison. Avoid making a child's task rely on real-time emergency information.

## AC9E4LA06 — complex sentences

### Official E1 mismatch is a release blocker

The separately verified current ACARA E1 concerns **creating richer descriptions using adjectival clauses**, with the mountain-pass `which...` example. Current Topic and Classroom instead label Denise/cocoon adverbial-clause wording as E1. The same incorrect official attribution occurs in `data/curriculum-units.json` under both `elaborations` and `questionCoverage` for AC9E4LA06.

Correct the official wording in every scoped authoritative copy and explicitly teach dependent adjectival/relative clauses as well as adverbial clauses. The cocoon sentence can be retained as a clearly original/supporting adverbial example if useful; it must not remain presented as exact current E1. Do not “fix” this by deleting E1.

### Preserve/recover and correct

The legacy specification has useful main/dependent clause colour-coding, cause/time/condition/contrast examples, clause-order comparison, sentence combining, and specific misconceptions about sentence length and indiscriminate commas. Recover these, using accessible contexts and concise definitions. Its general claim “The dependent clause begins with a subordinating conjunction” is too broad once E1 relative clauses are covered: scope it to the adverbial example. Relative clauses can be introduced by words such as `who`, `which` and `that`; do not insist every dependent clause starts with `because/when/if/although`.

Current Topic/Classroom example “Small shorebirds fly quickly across the inlet” only expands a simple sentence with modifiers, not another clause. The active/passive dog example also does not teach the central complex-sentence target. Preserve the contrast “We stayed inside because it rained” / “It rained, so we stayed inside” as a diagnostic only with an explicit distinction: complex subordinate clause versus coordinated independent clauses. Current wording merely says the structure foregrounds relationships differently and never identifies that distinction.

### Required assessable evidence

- Define independent/dependent clause through complete meaning and clause structure; distinguish a long simple sentence, compound sentence, fragment and complex sentence without expanding into compound-complex syntax as a core target.
- E1: expand a named noun using an adjectival/relative clause, identify the noun described and explain what specific detail was added. No current canonical bank item assesses this.
- E2: create precise adverbial-clause sentences, including time/cause and appropriate condition/contrast; label the independent/dependent parts and explain the meaning relationship.
- Require original composition/combining and revision, not only choosing the longest complete option. Provide adult criteria accepting multiple valid sentences while checking clause type and logical meaning.
- Use varied clause positions; do not teach commas before every conjunction. Include the introductory dependent-clause convention carefully.

### Specific bank issues

- Forty Practice items repeat only rain indoors, kookaburra sunrise, safe swimming condition, lightning cancellation and steep-track contrast. Test repeats ice melting and storm instruction. **Zero adjectival/relative-clause examples in all 56 items.**
- “We will swim if the flags show it is safe” has embedded material in `the flags show it is safe`; simplify the conditional teaching model if students must locate exactly two clauses. Avoid a grammar example being mistaken for a complete beach-safety rule.
- Distractor “Because the track was steep, the group reached the lookout” is grammatical and could have a cause reading in a different context. If contrast is the intended meaning, state the expected obstacle/outcome explicitly, rather than implying the sentence is universally wrong.
- “The match was cancelled although lightning caused the danger” is semantically awkward but the learner should reason about contrast/cause, not merely reject an unnatural sentence. Use plausible alternatives tied to supplied context.
- Current answer audio is not a substitute for visible clause annotation; sentence punctuation/formatting differences need accurate accessible descriptions where the assessment depends on them.

## AC9E4LA07 — quoted and reported speech

### Preserve/recover

The legacy specification offers direct/reported comparison, useful purpose distinctions (voice/exact wording versus efficient summary), a mixed-report supporting example, attribution responsibility, reporting-verb meaning and an excellent accuracy-audit contrast: `might arrive late` is not equivalent to `promised to arrive late`. Recover and contextualise these.

Current Topic/Classroom has only the official quoted/reported pair, duplicated “Make the concept visible” placeholder paragraphs, generic transfer/assessment instructions and generic misconceptions. It provides no meaningful original model of transforming speech or choosing a form for purpose. Classroom repeats the same weak content, including the duplicate placeholders.

### Coverage and drafting requirements

- Teach both forms in actual supplied short dialogue/report texts, including why a writer chose each in context.
- Show exact original spoken wording before asking for an accurate quotation or report; the current coach/Asha items assert that choices preserve exact words without supplying a source utterance.
- Track attribution, pronouns, tense and time **when context requires**. Do not make backshift or `today/tomorrow` replacement unconditional. Supply who reports, when and to whom for a conversion task. Include a same-day report where retaining the time reference is appropriate.
- LA12 separately targets detailed dialogue punctuation conventions. LA07 may use correct punctuation and recognition, but the 48+16 bank must not become merely a punctuation quiz.
- Include authentic spoken/written evidence: record a short fictional partner utterance, write direct and reported versions, choose one for an original report or story, then explain the choice; preserve uncertainty/commitment and identity. Adult guidance must accept valid context-dependent variants.

### Specific bank issues

- P005/P006/P015/P016/P025/P026/P035/P036 convert Mia's `tomorrow` to `the next day` without a reporting-time context. The explanation asserts that time reference shifts; it is not established by the prompt. The selected option can be a valid report, but must not teach that this shift is always required.
- P001/P002 and repeated variants treat `The coach said that “we kept trying until the final whistle”.` as categorically wrong. Integrating an exact quoted phrase into reported syntax can be legitimate when attribution and viewpoint are clear. Avoid scoring “that + quotation” as automatically invalid; use a fully specified direct-quotation task or a genuinely distorted alternative.
- P009/P010 and repetitions use the odd distractor `Asha said the new garden gives us “a cooler place” without showing whether those were her exact words.` Partial quotation itself is not wrong; quotation marks present wording as exact. Ask learners to compare against an actual source rather than using this meta-judgment in an answer option.
- T009–T016 claim to change a direct question into reported speech but never provide the original direct question. Supply it and a context; then assess preservation of meaning and appropriate word order.
- Many current choices are fragments or overtly nonsensical (“Luca happened the library book”), making recognition trivial. Use plausible pronoun, attribution, modal and context near-misses.
- Plain audio repeats punctuation-dependent prompts but current items lack choice-specific punctuation descriptions. Check accessible rendering/audio of quotation marks where required; do not claim spoken TTS establishes visible quotation accuracy.

## Source limits and release handoff

Existing `data/topic-videos.csv` records LA05 Khan interpreting text features, LA06 Khan complex sentences and LA07 Periwinkle Grade 4 direct/indirect speech. The entries explicitly limit prior verification to original-channel metadata/available source text, **not full audiovisual playback**. LA05 also explicitly does not claim the video covers menus/dropdowns. These are preservation leads only, not completed primary IXL comparisons or newly viewed supplementary lessons.

Before any code is marked reviewed: root must supply actual primary IXL observations/limits; author must complete original exact-code resources; independent reviewer must inspect final questions, keys, explanations, audio/visual metadata, every teaching model and actual production PDF page; corrections must be rechecked; artifact hashes and runtime/resource-flow evidence must be recorded. Publish only independently approved complete-tree work via the review-aware publisher. English Content Verified remains off until all 28 required codes meet the release condition.

Baseline canonical SHA-256 identities (for locating this audit's inputs only, **not final approval hashes**):

| Code | SHA-256 |
| --- | --- |
| AC9E4LA05 | `d9e644c29f9b4ad9280e31d4e2836183bac19240048ba517427876dca6c4e772` |
| AC9E4LA06 | `66595de0361c5ea0a03c5f609a0460f85acf1a6b3a1c15b6d1b5042331ad0c60` |
| AC9E4LA07 | `2cdb02a3fa7db3855ce4eb2268a6871338adcc873fa7aa9f78230b04df199197` |
