# AC9E3LE01 substantive literature repair candidate

7 September 2026. Draft only: no production source, runtime, verification ledger or main ref changed by this authoring task. Root release review and deployment checks are still required.

## Curriculum and evidence

The exact descriptor and component map are recorded in LA11-LY04-SWEEP.md, using the [QCAA official ACARA v9 sequence](https://www.qcaa.qld.edu.au/downloads/aciqv9/english/curriculum/ac9_english_p-6_cd_sequence.pdf): discuss characters, events and settings in different contexts in literature by First Nations Australian, wider Australian and world creators. The shared research log version 17 was refreshed by the coordinating task. The rendered IXL v9 Year 3 plan has no matching LE01 skill. No IXL progression or literature-provenance verification is invented.

This code requires authentic works. Original generic stories with an Indigenous-sounding setting are not substituted for First Nations creators. Nor are publisher blurbs described as full-book readings.

## Usable source resolution

The source-access gap narrowed materially: Fremantle Press supplies the complete **Wombat and Mother Earth** story as a [free classroom extract](https://fremantlepress.com.au/2019/05/22/three-free-extracts-from-fremantle-press-titles-to-use-in-your-classroom-this-naidoc-week/). The page attributes it to **Helen Milroy**, documents her **Palyku** identity, and identifies junior readers aged six to nine. The entire story extract was read, rather than inferred from its synopsis. Four short, distinct scene-analysis tasks use bounded paraphrases, with explicit author/title attribution. No story text or illustrations are copied. The four complete displayed prompts (including repeated credits and scene labels), model responses and acceptance notes total 160 words; the scene/question/model portion alone is 92 words. Explanations do not duplicate the models. Shared directions and rubric scaffolding are original assessment instructions, not extra story detail. There is no claim of permission to republish the full book, and no link to a paid book is required to answer any task.

The First Nations sample is deliberately narrow: one named contemporary work, four selected scene discussions, three in Practice and one in Test. This is coverage of an authentic work, not a survey of First Nations Australian literature or cultures. Every answer can be made from the supplied scene. Broad cultural generalisations are absent.

Public-domain literature provides the remaining substantive contexts:

- [The Tale of Peter Rabbit, Beatrix Potter](https://www.gutenberg.org/files/14838/14838-h/14838-h.htm): full prose read in earlier work; the corrected eight-item seed was preserved and reused. One fresh Test scene added. Illustrations not inspected or assessed.
- [Dot and the Kangaroo, Ethel C. Pedley](https://www.gutenberg.org/files/18891/18891-h/18891-h.htm): selected Chapters I–II read, with source-specific summaries of the lost-child encounter, differing experiences of the bush, travel assistance, rocky descent and approach to water. The whole novel is not claimed as reviewed. Racist depictions in other parts of this historical work are not used; the selected bank scenes are not represented as First Nations literature. No source illustrations used.
- [Alice’s Adventures in Wonderland, Lewis Carroll](https://www.gutenberg.org/files/11/11-h/11-h.htm): selected Chapters I–II read, including curiosity, the fall, doors/key, changes of scale and changed expectations. The whole novel is not claimed as reviewed. No instructions to imitate drinking unfamiliar substances; the questions concern fictional consequences and setting.
- [The Fables of Aesop, retold by Joseph Jacobs, 1894](https://www.gutenberg.org/files/28/28-h/28-h.htm): named fables used were read. Authorship is labelled as the Aesopic tradition retold by Jacobs, not as a claim that one historically certain author wrote every tale. Fables test particular actions, objects, obstacles and comparisons; they do not ask for the same generic moral repeatedly.

Sources investigated but not used: Magabala’s The Little Corroboree Frog publisher page/teacher notes and Allen & Unwin’s Walk With Us page remained summary/audio candidates; no full-book reading or audio playback claimed. The [Living Archive of Aboriginal Languages licence](https://livingarchive.cdu.edu.au/user-license-agreement/) explicitly restricts derivative and commercial use, so its accessible stories were not assumed available for adapted rehosting. A general online-access licence is not treated as permission to recreate a work. No outside person was contacted.

## Substantive changes and coverage

64 tasks, 48 Practice plus 16 Test. All 56 existing IDs retained, with eight additional Practice IDs. There are 24 MCQ and 24 adult-reviewed discussion tasks in Practice; 8 MCQ and 8 adult-reviewed tasks in Test. MCQ answer positions balance 6/6/6/6 and 2/2/2/2.

| Source | Tasks | Assessment emphasis |
|---|---:|---|
| Helen Milroy, Wombat and Mother Earth | 4 | Need and response; reversal of helping roles; shelter and rest; mutual benefit in the ending |
| Ethel C. Pedley, Dot and the Kangaroo | 14 | Familiar/unfamiliar setting; misunderstanding; character knowledge and abilities; assistance; cautious approach; setting as evidence of earlier journeys |
| Beatrix Potter, Peter Rabbit | 9 | Boundary crossing; different choices; obstacles; discovery; viewpoint; escape route; consequences; limits of inference |
| Lewis Carroll, Alice | 10 | Curiosity; loss of control; hidden access; scale and changing obstacles; care; contrasting settings; expectations |
| Aesopic tradition/Joseph Jacobs | 27 | Varied fables and cross-text comparisons, including objects, practical constraints, intentions, choices, weather and unequal access |

The Aesop group includes four fables reserved for Test (The Fox and the Stork; The Cock and the Pearl; The Fox and the Mask; The Dog in the Manger). Some Test tasks revisit known works through different episodes; they are not represented as all-unseen books. Two comparisons explicitly credit Potter/Carroll in the prompt and carry the second source URL in metadata.

The bank is not eight generic prompts cycled eight times. Eight corrected Peter Rabbit seed questions are retained once each; the other 56 tasks are authored separately. Repeated works are used for different scene evidence and genuinely different discussion demands. Counts and literal string uniqueness are only structural evidence, not the editorial justification.

## Review and limitations

Authoring pass checked all keyed claims against the supplied details and selected sources, including distinctions between what a character fears and what actually occurs. Open responses have task-specific guidance and accept supported alternatives. Examples are not compulsory answers. Adult responses must remain pending until an adult evaluates them; MCQ results cannot verify the learner’s ability to discuss.

`node scripts/validate_production_question_bank.mjs reports/year3-english-ixl-review/drafts/ac9e3le01.json` passes. Explicit ID comparison confirms all 56 existing IDs remain. No live/runtime QA was performed by this authoring agent. The required existing adult-review helper must be present in Practice/Test and corresponding results/review pages, with bank version and support flag configured as in other mixed banks. The coordinating reviewer must inspect the full candidate before running the reviewed publisher. This report does not mark the code or Year 3 English verified.

Reproducible authoring source: drafts/build_le01.py. Candidate: drafts/ac9e3le01.json. These are scoped files only.

## Coordinating review and release candidate

Coordinating agent reviewed all 64 prompts/keys/acceptance notes, read the complete Milroy publisher extract independently, and spot-checked actual Jacobs/Pedley text for source-specific details. A second agent independently reviewed all 64 supplied scenes, answers and rubrics and found no incorrect MCQ keys or eight-prompt recycling. Its three refinements were applied: P016 model uses only the supplied change from unhappy to supported travel; P018 contrasts fear with the Kangaroo's known route without asserting an unstated landing-point thought; P048 limits the benefit to shelter from morning sunlight. Additional clarification makes the fragile pot's feared damage explicit, states the uninterrupted country meal, supplies the dog's reflected food, and avoids labelling an unspecified wind cold. None changes a source into an invented First Nations narrative.

All four Milroy displayed prompts (including repeated credits), model responses and acceptance notes total 165 words after the precision edit. No source quotations are used. No original source illustrations are assessed. The full text of other books is not claimed as reviewed beyond the specific scope above.

Reviewed publisher integrated 48 Practice/16 Test, with 32 genuine discussion tasks remaining pending for adult assessment. Existing adult helper, bank version and fail-closed flags present on scoped routes; all64 source/runtime questions, keys, choices and adult guidance match, and the Practice mirror matches. Entry guidance describes source-based discussion. No shared runtime, print/PDF or topic/classroom/worksheet redesign. Year 3 English ledger 20/28; the remaining eight are LY05–LY12, whose research-ahead report is included without recording them reviewed. Complete-tree release and live checks follow.
