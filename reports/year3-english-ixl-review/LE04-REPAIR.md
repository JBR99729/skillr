# AC9E3LE04 substantive repair — 7 September 2026

Status: release candidate; publication and live adult-review QA pending.

## Scope and evidence

Shared research log refreshed: svgSkillrHub-IXL-Research-Log.md remains version 17, modified 2026-09-07T13:37:27Z. Reused repository NEXT-TEN-SWEEP.md and earlier simile observations. Exact official Year 3 descriptor checked in QCAA's ACARA v9 P–6 English sequence, page 3: discussion of device effects on meaning and reader reaction, explicitly including rhythm and onomatopoeia in poetry and prose.
https://www.qcaa.qld.edu.au/downloads/aciqv9/english/curriculum/ac9_english_p-6_cd_sequence.pdf

IXL matching plan identifies sensory details and simile meanings as supporting skills; it does not supply complete rhythm/onomatopoeia coverage. Reused recorded simile worked-example evidence. Opened actual Sort sensory details worked explanation and completed solution, then its actual entry sorting task in authenticated Parent mode (results not recorded): four phrases sorted between sound and touch. Explanation links sensory detail to the reader imagining a scene, with all five senses illustrated. Entry inspected; no accepted submission or later progression claimed. A keyboard selection attempt did not show an observable answer-state change. No source questions copied.
https://au.ixl.com/ela/year-3/sort-sensory-details
https://au.ixl.com/ela/year-3/determine-the-meanings-of-similes

## Authored coverage

64 independent passage/task combinations: 48 Practice and 16 Test. All poems and prose are original. There is no eight-prompt cycling or mismatched poem reference. Supplied pause/performance cues make rhythmic effects assessable without relying on an uninspected audio recording. Slash marks distinguish poem lines. Technical names for metaphor/personification are not demanded; the task is to explain the pictured effect in everyday language.

Practice includes 8 rhythm, 8 onomatopoeia, 8 comparison, 8 sensory, 8 repetition/rhyme/person-like language and 8 integrated-effect items. Test uses new passages and transfer tasks. Four Practice and four Test items require genuine discussion/written explanation with a model and acceptance guidance. Personal reactions can differ if justified from the actual text. The 56 MCQs have four alternatives and balanced correct positions: 11 per position in Practice, 3 in Test.

Editorial review matched all prompts, answers and explanations to their supplied text. Questions distinguish literal events from comparison, and avoid inferring unstated outcomes (for example a wall collapsing). Correct options depend on the supplied words, rather than curriculum-descriptor recitation. Automatic counts alone were not used to approve the content.

## Runtime integration and checks

All 56 original source IDs retained; eight additional Practice IDs. Practice mirror equals main Practice bank. All 64 source/runtime questions, choices and keys agree. Existing adult-review helper is loaded only on this code's Practice/Test/result/review routes. No shared runtime edited. The existing fail-closed requireAdultReviewSupport configuration prevents fallback self-marking if the helper fails to load. A bank version distinguishes these attempts. Pending explanations do not contribute to the marked denominator and cannot produce a passed result until checked; helper summary behaviour checked directly.

Required production validator and review-aware publisher passed; verification ledger now records this code locally (Year 3 English 12/28, no subject badge). Release integrity, remote-base reread/non-force publication, Actions/Pages and live mixed-response QA remain publication gates. No topic/classroom/worksheet regeneration and no print/PDF scripts changed. Speech playback not tested; do not claim it.

## Publication and live QA complete

Published main 4e98904fbdb905ffed7600a4d7c338339dffbcbe, complete tree 5070daf0ce06a5e5a76ecc54260a27d81646f5ac, exact local/candidate tree match. Release integrity 18,233 →18,236 files, zero deletions, core files/CNAME preserved. Remote main reread immediately before non-force update. All seven returned Actions runs including Pages succeeded.

Live Test sampled two written responses and three automatic items. Written submissions left the score unchanged and displayed pending review. Result showed 3/3 checked answers across five tasks, with two awaiting adult review and no final pass. Review showed both actual responses, models and task-specific marking guidance. Marking the two model-generated QA responses as meeting the task updated the result to 5/5 Passed. Retake → Start fresh test worked and retained best score 5. Live Practice loaded a new simile task and accepted the correct answer; deployed homepage loaded. One browser click timed out; subsequent state inspection and retry succeeded. No shared runtime changes were required.
