# Official curriculum evidence — Year 4 English first ten codes

Verified 2026-09-08 UTC. Evidence-only report by independent curriculum verifier; not author approval, IXL review, question review or publication approval.

## Authority and retrieval

- Official ACARA entry point: https://www.australiancurriculum.edu.au/machine-readable-australian-curriculum (opened 2026-09-08; states files updated 7 June 2024).
- Linked official distribution catalogue: https://www.scootle.edu.au/ec/p/mrac_details (opened; English MRAC/2024/04/LA/ENG JSON-LD link followed).
- English version metadata: https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG.html (opened; version 9, updated April 2024; 1,357 concepts).
- Exact downloaded source: https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/export/MRAC/2024/04/LA/ENG.jsonld
- Local read-only source snapshot: `/tmp/year4-english-official.jsonld`.
- SHA-256 of complete downloaded bytes: `92f7b615fd9713835231cf0c6e6e646393d4645f9c4f9dfc1afe03f8bee5e3f7`.
- Web text extraction rejects the JSON-LD MIME type. A normal public curl download succeeded; parsed the actual JSON-LD rather than assuming catalogue contents.
- QCAA cross-check: https://www.qcaa.qld.edu.au/downloads/aciqv9/english/curriculum/ac9_english_yr4_as_cd_alignment.pdf (official April 2023 four-page PDF opened 2026-09-08). This reproduces matching first-ten descriptors and maps them to reading, interacting and creating achievement-standard evidence; it does not supply all elaborations.
- Source data attribution: Australian Curriculum material © ACARA, licensed CC BY 4.0 subject to ACARA's additional terms; QCAA document expressly identifies that licence and attribution. Exact curriculum wording below is source evidence, not newly authored teaching content.
- No IXL/browser observation was conducted by this verifier. Root remains sole IXL researcher. ACARA remains the authority; IXL primary external benchmark and supplementary free resources must be separately evidenced.

## Method and baseline comparison

Read current repository `AGENTS.md`, `docs/static-curriculum-architecture-v2.md`, `docs/skillr-long-life-curriculum-content-standard.md`, `docs/english-topic-page-quality-standard.md` and `docs/english-student-question-authoring-standard.md` fully before verification.

Repository baseline inspected: `883cee463da1492cf439696ad02b571abc0fcab7` on `codex/year4-english-full-review`. Parsed the downloaded graph by exact `http://purl.org/ASN/schema/core/statementNotation`; retrieved corresponding `http://purl.org/dc/terms/description` and each node's `@id`. Found exactly **10 descriptors and 22 elaborations** for the requested codes. Node identities below are the source identifiers, not guessed website routes.

Compared exact wording against text extracted from the ten existing static Topic Guide HTML files (HTML tags removed; entities/whitespace normalised). All ten descriptors and 21 of 22 elaborations are present verbatim. **AC9E4LA06_E1 differs materially**; details below. Presence alone does not establish substantive teaching or assessment coverage. AC9E4LA01 E4 appends an editorial “(teaching context)” label that is not part of the official wording.

| Code | Official elaborations | Existing exact-wording comparison |
| --- | ---: | --- |
| AC9E4LA01 | 4 | Descriptor and all elaborations present |
| AC9E4LA02 | 2 | Descriptor and all elaborations present |
| AC9E4LA03 | 4 | Descriptor and all elaborations present |
| AC9E4LA04 | 3 | Descriptor and all elaborations present |
| AC9E4LA05 | 2 | Descriptor and all elaborations present |
| AC9E4LA06 | 2 | E1 mismatch; descriptor and E2 match |
| AC9E4LA07 | 1 | Descriptor and all elaborations present |
| AC9E4LA08 | 1 | Descriptor and all elaborations present |
| AC9E4LA09 | 2 | Descriptor and all elaborations present |
| AC9E4LA10 | 1 | Descriptor and all elaborations present |

## Exact official nodes and coverage implications

### AC9E4LA01

**AC9E4LA01**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/2f603bfa-e0d6-44ea-9e16-1a33ec98f76a`
- Exact wording: explore language used to develop relationships in formal and informal situations

**AC9E4LA01_E1**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/dcd1cd40-c5fe-4620-b792-d142a6e47e92`
- Exact wording: recognising that language is adjusted in different contexts; for example, in degree of formality when moving between group discussions and presenting a group report

**AC9E4LA01_E2**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/aaa5dc0d-836e-4a58-8fb5-ebe7379d34aa`
- Exact wording: understanding how age, expertise and familiarity influence the ways in which people interact and how these codes and conventions vary across cultures

**AC9E4LA01_E3**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/3f4d2f7a-f685-4e5d-9445-5d39ba4d8161`
- Exact wording: recognising the importance of using inclusive language

**AC9E4LA01_E4**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/98c4be32-3562-428d-aa06-37fc0b0c31b2`
- Exact wording: exploring cultural respects for First Nations Australian Elders, and greeting conventions between First Nations Australians

Independent coverage implications (not quoted curriculum): Explicitly cover audience/context shifts, relationship factors (age, expertise and familiarity), cultural variation, inclusive language and First Nations Elders/greeting conventions. Require original paired speech/writing and an explanation of changed choices, not only recognising polite sentences. Do not prescribe one greeting for all First Nations communities or equate formality with complicated vocabulary.

### AC9E4LA02

**AC9E4LA02**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/0848a214-fbc7-4577-965c-82ee0875c66e`
- Exact wording: identify the subjective language of opinion and feeling, and the objective language of factual reporting

**AC9E4LA02_E1**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/fb6cd5c6-6655-46b4-a1ed-301adfc3fb8f`
- Exact wording: identifying ways thinking verbs are used to express opinions; for example, “I think”, “I believe”, and ways summary verbs are used to report findings; for example, “we concluded”

**AC9E4LA02_E2**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/fe018c7c-5eb0-4c44-ae89-bb7ce240626f`
- Exact wording: comparing statements that have similar information presented objectively and subjectively; for example, “The man has 6 cats.” “The man has too many noisy cats.”

Independent coverage implications (not quoted curriculum): Cover both thinking verbs and summary/reporting verbs, and compare the same information presented subjectively/objectively. Require attention to supplied wording and evidence; a statement being objectively worded does not by itself prove it true. Do not classify every use of 'I' as opinion or 'we concluded' as automatically reliable.

### AC9E4LA03

**AC9E4LA03**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/752a2ffe-72ea-4321-80c6-f7171cb10afa`
- Exact wording: identify how texts across the curriculum have different language features and are typically organised into characteristic stages depending on purposes

**AC9E4LA03_E1**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/4ee2758f-6f32-433a-8b56-d5654077e3f1`
- Exact wording: identifying the typical stages and language features of texts such as narratives, factual recounts, imaginative recounts, biographies, information reports, explanations, book talks, poetry and arguments for a particular purpose

**AC9E4LA03_E2**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/6501a42a-4778-483c-a5e7-683075c42f73`
- Exact wording: understanding how and why text structure is important in texts such as sequential and causal explanations, and comparative and part-whole information reports

**AC9E4LA03_E3**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/ba6cce0d-15b8-4524-8d6b-4328656fb091`
- Exact wording: recognising that poems have different purposes that influence the organisation into characteristic stages; for example, poems that tell stories, poems that describe and poems that reflect on aspects of life

**AC9E4LA03_E4**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/b85c363e-f484-4780-b555-e7cdf23ff7cc`
- Exact wording: recognising the difference between a text’s form such as a poster, email or list and its organisation into stages depending on its social purpose

Independent coverage implications (not quoted curriculum): Map all named text types; include sequential/causal explanations and comparative/part-whole reports. Distinguish form (poster/email/list) from social purpose and stages. Poems need story, description and reflection purposes without a universal stage formula. Use actual original short text samples, not only genre labels.

### AC9E4LA04

**AC9E4LA04**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/8089f3e7-39e5-42ec-9f03-5acf2ef7352e`
- Exact wording: identify how text connectives including temporal and conditional words, and topic word associations are used to sequence and connect ideas

**AC9E4LA04_E1**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/4519e397-9421-4fdc-94fa-d13281d589bd`
- Exact wording: recognising how authors construct texts that are cohesive and coherent using pronouns that link to something previously mentioned and determiners; for example, “this”, “that”, “these” and “those”, to identify things

**AC9E4LA04_E2**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/6c928e56-cc39-4a66-861a-d371fafc8e7f`
- Exact wording: recognising how authors use text connectives to create links between sentences; for example, “however”, “therefore”, “nevertheless” and “in addition”

**AC9E4LA04_E3**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/925a6a85-1002-4c45-9159-ee392d424d74`
- Exact wording: recognising how text connectives link sections of a text, providing sequences through time; for example, “firstly”, “then”, “next” and “finally”

Independent coverage implications (not quoted curriculum): Descriptor coverage includes conditional words and topic word associations even though the three elaborations foreground pronoun/determiner cohesion, sentence connectives and temporal sequencing. Assess references with clear antecedents, relations between ideas and whole-text cohesion, not connector labels alone.

### AC9E4LA05

**AC9E4LA05**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/15f495d4-5836-4d5b-9da3-1228e5d3058e`
- Exact wording: identify text navigation features of online texts that enhance readability including headlines, drop-down menus, links, graphics and layout

**AC9E4LA05_E1**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/71b6e4ee-bf5f-42bc-a0b9-447de67da9a9`
- Exact wording: investigating the features used for texts such as headings and subheadings in print text, home pages and subpages in digital texts, and how these help the reader select text for a purpose

**AC9E4LA05_E2**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/0a6d2375-7b84-4e01-984b-8c4ea5322af5`
- Exact wording: comparing the features of texts on similar topics online

Independent coverage implications (not quoted curriculum): Use inspectable print/digital examples with headings, home/subpages, dropdown menus, hyperlinks, graphics and layout. Compare two same-topic online texts for a stated reading purpose. Navigation cannot be assessed wholly from abstract definitions; do not require live unsafe external browsing by children.

### AC9E4LA06

**AC9E4LA06**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/ba301a5d-7402-4737-8f04-9b4187a285f9`
- Exact wording: understand that complex sentences contain one independent clause and at least one dependent clause typically joined by a subordinating conjunction to create relationships, such as time and causality

**AC9E4LA06_E1**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/32702a29-eff3-4626-9ed7-193ec0938628`
- Exact wording: creating richer, more specific descriptions by using adjectival clauses; for example, “Crossing the mountain range was difficult.” becomes “The mountain pass which had received days of heavy rain was dangerous.”

**AC9E4LA06_E2**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/234e0bc5-ba06-407b-8c40-c8f9a60143b8`
- Exact wording: creating more precise and detailed sentences by adding adverbial clauses; for example, “They crossed the mountain range.” becomes “Although the path was overgrown, they crossed the mountain range.”

Independent coverage implications (not quoted curriculum): Must cover dependent adjectival/relative clauses as well as adverbial clauses. The existing topic E1 is NOT the official current E1: it uses Denise/cocoon adverbial wording. Preserve any useful example as clearly authored supporting teaching, but restore exact current E1 and relative-clause coverage. Show one independent clause and at least one dependent clause; require composing/expanding sentences and explaining time/cause or other relevant meaning relationships.

### AC9E4LA07

**AC9E4LA07**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/0594c08b-9eeb-44d8-92ec-463db2f0ffc8`
- Exact wording: investigate how quoted (direct) and reported (indirect) speech are used

**AC9E4LA07_E1**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/613ded5c-64fc-43e4-b17e-4f05f9bb1d6a`
- Exact wording: investigating examples of quoted (direct) speech; for example, “He said, ‘I’ll go to the park today.’” and reported (indirect) speech; for example, “He told me he was going to the park today.” and why they have been used in different contexts

Independent coverage implications (not quoted curriculum): Teach function/context as well as identifying direct/indirect speech. Conversion should preserve speaker and meaning while changing pronouns/tense/time expressions only when context requires. Do not impose an unconditional tense-backshift rule. LA12 separately targets detailed dialogue punctuation conventions.

### AC9E4LA08

**AC9E4LA08**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/e2984194-9264-4798-8ec8-9ab9722cc4b6`
- Exact wording: understand how adverb groups/phrases and prepositional phrases work in different ways to provide circumstantial details about an activity

**AC9E4LA08_E1**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/638b6472-2ea4-48af-888d-9c41ee623c05`
- Exact wording: investigating in texts how adverb groups/phrases and prepositional phrases can provide details of the circumstances surrounding a happening or state; for example, “At midnight (time) he rose slowly (manner) from the chair (place) and went upstairs (place).”

Independent coverage implications (not quoted curriculum): Contrast grammatical form with function: an adverb group and a prepositional phrase can both add circumstance. Require actual time/place/manner examples and sentence expansion; do not say all adverbs end in -ly, or that all phrases functioning adverbially have identical form.

### AC9E4LA09

**AC9E4LA09**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/ab057624-94e1-42b8-9b3c-b9593f34da01`
- Exact wording: understand past, present and future tenses and their impact on meaning in a sentence

**AC9E4LA09_E1**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/d168f5be-619d-4612-9b15-0cebe5a5db64`
- Exact wording: understanding the tense that types of texts are commonly written in; for example, informative texts are usually written in present tense

**AC9E4LA09_E2**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/7711e80d-c66d-4625-9b1f-886cae86be30`
- Exact wording: identifying the tense in texts they read

Independent coverage implications (not quoted curriculum): Teach past/present/future meaning in context and typical (not universal) tense choices by text type. Include read-and-identify, revise and original sentence evidence. Avoid treating every informative text as obligatorily present tense, or every verb ending in -ed as a complete sufficient tense rule.

### AC9E4LA10

**AC9E4LA10**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/4f3f1f87-7e55-45a9-9907-f4ef0310f93d`
- Exact wording: explore the effect of choices when framing an image, placement of elements in the image and salience on composition of still and moving images in texts

**AC9E4LA10_E1**

- Source node: `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/a6bc69b2-594a-4f4d-8eac-d708fa038056`
- Exact wording: examining visual and multimodal texts, building a vocabulary to describe visual elements and techniques such as framing, composition and salience, and beginning to understand how these choices influence viewer response

Independent coverage implications (not quoted curriculum): Use actual original contrasting visual compositions, not prose-only claims about images. Cover framing, element placement and salience, in both still and moving images. A clearly sequenced storyboard can support discussion but must not be described as watched video evidence. Explain viewer response without asserting every viewer must feel exactly the same. Existing optional ACMI Year5+ suitability gap remains unresolved and is not primary review evidence.

## Release limitation

This report verifies official scope for the first ten codes only. Each code still needs primary IXL evidence or an explicitly documented genuine match/access gap, source-informed original drafting, separate independent review of every final bank item and all five resource surfaces, actual production PDF render review, artifact hashes, runtime checks and review-aware publication. No English code or badge is approved by this evidence-only report.

