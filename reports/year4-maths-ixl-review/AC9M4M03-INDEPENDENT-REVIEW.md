# AC9M4M03 independent review

Reviewer: `reviewer_facts_time`, separate from author `author_facts_time`. Review date: 2026-09-08. Scope: AC9M4M03 only in branch `content/year4-maths-third-five-current`.

## Decision

**Overall HOLD — actual IXL/Khan source comparison is unverified.** Mathematical/content review has passed for all 64 bank items, all 12 rendered symbols, both complete Topic/Classroom resources and all eight independent worksheet tasks after correction rechecks. The authored cultural claims agree with the public source text actually inspected. All five pages of the exact production homework PDF also pass. Final generated-bank parity, audio alignment, all nine activity pages and integrated artifact identities are recorded below. No mathematical/content/PDF correction remains open. A mathematical or PDF pass must not be read as overall independent approval, publication authorisation or a ledger/badge change.

## Primary source and scope

Read `AGENTS.md`, `THIRD-FIVE-TEAM-BRIEF.md`, `docs/static-curriculum-architecture-v2.md` and `docs/skillr-long-life-curriculum-content-standard.md`. Read the current shared research-log active/index evidence: it records historical Year 3 research, not a completed Year 4 audit. The root-retrieved version is 17, 43,357 bytes.

Independently opened the full local April 2024 ACARA Mathematics JSON-LD and its M03 content-description node plus all three linked elaboration nodes. Recomputed SHA256: `4d6b7a01d10517dc97ad709055c62c171b9b90ea33e0d0fc395e9bd2f96e48b1`. Primary URL: https://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/MAT/export/MRAC/2024/04/LA/MAT.jsonld. The descriptor node ends `4c8c7f2d-2898-4cca-bdf7-594418e0ad66`; all three children agree with `THIRD-FIVE-ACARA-SOURCE.json`, including their Year 4 designation.

Exact descriptor: “solve problems involving the duration of time including situations involving ‘am’ and ‘pm’ and conversions between units of time”. The primary uses curly double quotation marks around am and pm; the wording is unchanged here.

| Required component | Independent acceptance criterion | Final evidence |
| --- | --- | --- |
| Descriptor/E1: durations, including am and pm | Varied elapsed-time, start-time and finish-time problems with explicit same/next-day context where needed; bridge whole hours, noon and midnight correctly | P001–P024/P044–P046, T001–T005/T010–T012/T016; worked Topic/Classroom/E1; W001–W003/W005 |
| Descriptor/E2: unit conversions | Base 60 for seconds/minutes/hours; correctly handle whole and mixed units, comparison and practical problems | P025–P040, T006–T009, E2 and conversion model; W004/W006/W007 |
| E2: timetable or exercise routine | Student constructs a self-contained timetable/routine including activities and rests; every time and duration needed by the rubric is requested | P047/T015, E2 timetable and guided named routine; W006/W007 |
| E3: First Nations accounts of cyclic time | Publicly sourced, accurately attributed accounts connect repeating sun, moon and star phenomena to time; no generic single-culture claim or invented traditional account | P041/P042/P048, T013/T014, E3 expansion and exit task4, W008; actual source text checked against claims |

Year boundary: practical duration and conversions are core. Do not require time-zone arithmetic, daylight-saving calculations, formal decimal-hour methods or a formal 24-hour conversion syllabus. Mention noon/midnight explicitly where 12 am/pm could confuse, and distinguish clock labels from elapsed durations.

## Baseline findings and corrections sent

The baseline bank had 24 Practice + 16 Test items, split only between `elapsed_time` and `convert_time_units`. Introductory inspection found repeated start-plus-minutes and whole-hours-to-minutes stems. P003, for example, gives 11:45 and accepts 13:00 without an am/pm or 24-hour framing. This is not a full final-bank review.

The baseline Topic/Classroom resources contain useful timeline/60-based examples to preserve. They label a 12-hour-labelled model a “24-hour timeline”, provide Important questions without actual answers, paraphrase rather than fully teach the elaborations, and substitute cultural-safety boilerplate for an E3 account. The worksheet page lacks eight standalone written tasks.

| Correction ID | Request sent to author | Recheck status |
| --- | --- | --- |
| M03-C01 | Reach at least 48 Practice + 16 Test with meaningful elapsed/start/finish and h/min/s variation | All 48+16 individually reviewed; pass |
| M03-C02 | Make am/pm and day relationships unambiguous; treat noon/midnight and base 60 correctly | All final contexts and calculations individually checked; pass |
| M03-C03 | Add actual timetable/routine construction with complete matching evidence criteria | P047/T015 and W006/W007 inspected; pass |
| M03-C04 | Attribute public E3 accounts to the specific People/person, connect cycles to time and avoid unsupported community-approval claims | Final authored claims match prior inspected source text; pass |
| M03-C05 | Supply actual Topic/Classroom answers and every elaboration expansion; repair the misleading timeline label | Both complete resources read/solved; pass |
| M03-C06 | Author eight independent worksheet tasks/answers; preserve standalone context when shuffled | All eight solved, matched to HTML and checked in the shuffled five-page PDF; pass |
| M03-C07 | P032: both 3 min 5 s and 2 min 65 s equal 185 s; replace the equivalent distractor | Re-read fixed 2 min 55 s; unique correct answer now passes |
| M03-C08 | P037: 2 min and 1 min 60 s are duplicate wrong options; vary one | Re-read fixed 1 min 40 s; passes |
| M03-C09 | P047/T015 must explicitly request the calculation required by rubric; T016 must request elapsed-jump labels and model base-60 explanation | Re-read all three fixed prompts/models/rubrics; passes |
| M03-C10 | `m-cycle` lacks arrowheads although P043 refers to arrows; add the intended dawn→day→dusk→night→dawn direction | Re-rendered arrowheads point correctly; pass |
| M03-C11 | P030 alt adds the precomputed 140-second total absent from the visible model; describe the visible 60 + 60 + 20 groups | Re-read alt now matches visible groups; pass |
| M03-C12 | T015 model uses generic activity 1/2/3 although prompt and rubric require named activities; provide actual suitable names | Re-read marching/arm circles/balancing intervals; pass |
| M03-C13 | Root wrappers: narrow “time is not written in groups of one hundred” to the stated hours/minutes/seconds conversions | Exact corrected wording re-read in source JSON and all eight wrappers; pass |
| M03-C14 | Repair word/number/sentence spacing; replace ambiguous “clock groups minutes in 60 s” and “count in 5 s” | Re-read “an hour contains 60 minutes” and “count in fives” in both resources; pass |
| M03-C15 | E2 model needs the complete rest-inclusive sum; guided routine needs named sequence, matching its prompt | Re-read 20+35+10+25 and named five-part routine; pass |
| M03-C16 | Root-reported worksheet decimal-like/timestamp joins and large schedule space guidance | All eight tasks re-read in JS/HTML and final PDF; W004/W007 punctuation fixed and W006/W007 require separate paper; pass |
| M03-C17 | Root structural gate requires the native Classroom worked-example card shell | Final five reviewed model groups use the restored native board/grid/card/label/row structure; pass |

## Independently inspected cultural sources

On 2026-09-08 the reviewer directly opened the text of both named pages below. This was source-text review, not inspection of embedded audiovisual content or a claim of community consultation.

- [National Museum of Australia, Sky stories](https://www.nma.gov.au/exhibitions/endeavour-voyage/sky-stories): page text identifies Kirsten Banks as Wiradjuri and attributes to her a connection between the Emu's position in the sky and seasonal timing for finding emu eggs. The page supports a specifically attributed seasonal example; it does not support a claim that all First Nations Peoples share one account. Relevant text: lines 13–29 in the retrieval.
- [ACARA, teacher background for AC9S1U02 E6](https://www.australiancurriculum.edu.au/support-resources/background-information/science_teacher_background_information_AC9S1U02_E6): lines 29–35 describe cyclic sky observations, including Nyangumarta sun/day and moon-phase/month relationships. Its raw consulted-works caveat warns that those works are not recommended classroom resources and may contain inappropriate interpretations; it does not establish community approval for any authored resource. Relevant lesson text can support a concise attributed paraphrase, not invented cultural details.

The final authored claims and task wording were checked against these observations and the cultural-source-text gate passes. This narrow result does not satisfy the separate IXL/Khan comparison gate.

## IXL/Khan source-evidence boundary

The shared log does not certify this code. The author reports IXL page-shell access only and zero returned lesson lines for the attempted Khan time lesson. No opened worked-help panel, representative submitted progression, lesson video or lesson-level Khan explanation has been observed. Reviewer has not used the root-exclusive Browser and has not claimed unseen content. Candidate/catalogue alignment must remain labelled as such. Actual source comparison stays **HOLD** until evidence exists.

Reviewer independently located the official Khan “Susan's break” YouTube candidate and attempted https://www.youtube.com/watch?v=UhMM68fq9FA; direct opening returned a fetch error. A search description does not establish video, worked example or lesson inspection. Root then directed all external calls paused after the user's “too many requests” report; this reviewer complied.

## Final substantive review record

First bank checkpoint: all 48 Practice and 16 Test items were individually read and independently solved. Every option, key/correctness flag, summary, hint, audio prompt/audio answer wording and six adult-review model/rubric/instruction sets was checked. Audio wording was read; playback was not claimed. The sole duplicate-correct-duration defect, one duplicate-distractor pair and prompt/rubric issues were identified above and rechecked after correction. Incorrect minute forms such as 9:75 are explicitly false alternatives, not taught as valid clock labels. All remaining wording and visual correction rechecks below have passed.

| Item | Independently checked result and reasoning |
| --- | --- |
| P001 | 7:30 am Monday; supplied morning/day |
| P002 | 12:00 pm Thursday; noon |
| P003 | 12:00 am Wednesday; starts Wednesday |
| P004 | 25 min; 15 + 10 |
| P005 | 35 min; 45 − 10 within same hour |
| P006 | 50 min; 45 + 5 |
| P007 | 1 h 35 min; 25 + 70 = 95 min |
| P008 | 40 min; 15 + 25 across noon |
| P009 | 1 h 35 min; 30 + 65 = 95 min |
| P010 | 1 h 45 min; 70 + 35 = 105 min Friday→Saturday |
| P011 | 3 h 30 min; 140 + 70 = 210 min Saturday→Sunday |
| P012 | 45 min; after midnight on the same Sunday |
| P013 | 12 h; morning to evening on Monday |
| P014 | 12 h; Monday evening to Tuesday morning |
| P015 | 10:15 am Tuesday; 40 + 15 min after start |
| P016 | 12:25 pm Wednesday; 10 + 25 min across noon |
| P017 | 12:30 am Saturday; 20 + 30 min from Friday night |
| P018 | 4:15 pm Saturday; 1:45 + 2 h + 30 min |
| P019 | 3:25 pm Monday; back 20 + 35 min |
| P020 | 11:25 am Wednesday; back 10 + 35 min across noon |
| P021 | 11:30 pm Monday; back 20 + 30 min across Tuesday midnight |
| P022 | Bus B; latest departure among buses arriving by 9:45 am |
| P023 | 15 min; 10 + 5 across noon |
| P024 | 5 min; 15-min gap less 10-min walk |
| P025 | 180 min; 3 × 60 |
| P026 | 135 min; 120 + 15 |
| P027 | 2 h 30 min; 150 = 120 + 30 |
| P028 | 1 h 15 min; 75 = 60 + 15 |
| P029 | 240 s; 4 × 60 |
| P030 | 140 s; 120 + 20; corrected alt parity passed |
| P031 | 1 min 30 s; 90 = 60 + 30 |
| P032 | 3 min 5 s; 185 = 180 + 5; equivalent distractor corrected and rechecked |
| P033 | 145 min is 5 min longer than 140 min |
| P034 | Equal; 2 min 5 s = 125 s |
| P035 | 2 min 5 s; 75 + 50 = 125 s |
| P036 | 1 min 20 s; 180 − 100 = 80 s |
| P037 | 2 min 40 s; 120 + 40 = 160 s; duplicate false option repaired |
| P038 | 1 h 25 min; 30 + 15 + 40 = 85 min including break |
| P039 | 15 min; 10:50–11:05 am |
| P040 | 100 min; 1 h means 60 min, then add 40 |
| P041 | Returning cycles; Nyangumarta attribution and sun/day, moon/month distinction match the inspected ACARA public text |
| P042 | Recurring time of year; specific Kirsten Banks attribution matches inspected NMA text |
| P043 | Return to dawn; generic daily cycle with corrected clockwise arrowheads re-rendered and passed |
| P044 | 15 min; 5 + 10 across hour |
| P045 | Actual Monday timeline through noon, 25 + 80 = 105 min = 1 h 45 min; alternative valid partitions accepted |
| P046 | Actual Tuesday→Wednesday timeline through midnight, 35 + 65 = 100 min = 1 h 40 min |
| P047 | Wednesday 10:45–11:05, 11:05–11:40, 11:40–11:50, 11:50 am–12:15 pm; 90 min = 1 h 30 min; complete calculation now requested |
| P048 | Two returning daily/lunar sequences; explain day/lunar time connection, attribute Nyangumarta/ACARA, and distinguish exact clock duration; accurate alternatives accepted |
| T001 | 34 min; 52 − 18 |
| T002 | 1 h 45 min; 40 + 65 = 105 min |
| T003 | 1 h 35 min; 45 + 50 = 95 min Saturday→Sunday |
| T004 | 12:30 pm Monday; 25 + 30 min |
| T005 | 11:35 pm Thursday; back 15 + 25 min from Friday |
| T006 | 185 min; 180 + 5 |
| T007 | 3 min 25 s; 205 = 180 + 25 |
| T008 | 1 h 40 min is 5 min longer than 95 min |
| T009 | 3 min; 120 + 60 = 180 s, exactly three rests |
| T010 | 10 min; 10:25–10:35 am Monday |
| T011 | 45 min; 20 + 25 across noon |
| T012 | 12:00 am Sunday; start of Sunday |
| T013 | Return to similar Moon phase marks a cycle; no fixed clock-hour claim |
| T014 | Sky pattern can mark recurring season; does not imply one calendar for all communities |
| T015 | Three 45-s activities and two 15-s rests: 165 s = 2 min 45 s; named marching/arm-circles/balancing intervals end at 9:02:45 am Tuesday |
| T016 | Thursday→Friday timeline, 80 + 25 = 105 min = 1 h 45 min; elapsed hours/day and 60-minute restart explain why minute-digit subtraction fails |

All 12 original 640 × 300 symbols were rendered with CairoSVG and visually inspected in full-resolution labelled contact sheets. The five start/finish/noon/midnight timelines and `m-test-noon` explicitly state “not to scale” while their labels/interval arithmetic are correct. `m-buses`, `m-carnival` and `m-test-schedule` contain accurate, readable cells and day labels. `m-conversion` and `m-seconds` accurately show base-60 groups. `m-cycle` initially needed M03-C10; corrected clockwise directional arrowheads were re-rendered and passed. No clipping, overlaps or unreadable labels were observed. These are mathematical SVG renders, not a claim about live browser routes.

Root's new preparation material was also read in both Practice/Test launch pages and all six result/review/retake pages for this code, and compared with the source entry in `THIRD-FIVE-ACTIVITY-PREPARATION.json`. Noon model 15 + 25 = 40 min, Monday-night example 20 + 15 = 35 min, conversion 2 × 60 + 35 = 155 s, and misconception check 1 h 30 min = 90 min are correct. Source attribution and adult practical-work reminders are appropriate. The broad “groups of one hundred” wording was narrowed as M03-C13 and re-read in all final wrappers and the activity hub.

The full local primary also confirms Year 3 M04 concerns reading nearest-minute clocks, while Year 5 M03 specifically compares and converts 12-/24-hour systems. This supports the retained Year 4 boundary; no extra formal 24-hour conversion syllabus was introduced.

## Topic, Classroom and worksheet substantive review

Read and solved all teaching in both static Topic and native Classroom resources: learning goals and vocabulary, five worked-model groups, E1–E3 wording and full expansions, all teacher questions/expected responses, noon/midnight checkpoints, four guided activities, six Important Q&A pairs, six misconceptions, prerequisites/boundary, Support/Core/Extend, three assessment-style items and four exit tasks with answers/remediation. The retained 9:35 am–1:10 pm example gives 3 h 35 min = 215 min; 10:50 pm Friday–12:35 am Saturday gives 105 min; conversions 135 min, 2 h 30 min, 30 h, 1 min 30 s and 140 s are correct. Guided 2:48–5:27 pm gives 159 min; schedule comparison 140−75 = 65 min is correct; named routine gives 160 s and 9:02:40 am. Extend route 40+15+25 = 80 min is 5 min shorter than 85. Exit answers 45 min, 165 s and Wednesday 12:15 am are correct, with a meaningful cyclic-return/attribution task.

The Topic/Classroom source claims stay within the two public pages actually inspected before the external-call pause. Daily/lunar/seasonal intervals are distinguished; no exact lunar/calendar-month identity is asserted, no universal First Nations calendar is claimed, and students are not asked to invent stories or artwork. The three reused Topic/Classroom SVG models were independently rendered and checked. Static teaching remains directly in HTML with native details/summary sections. Title, description and canonical match HEAD. At the pre-integration checkpoint, the complete optional-video marker block matched HEAD byte-for-byte. The subsequent upstream navigation additions are checked below; preservation is not evidence of video inspection.

All eight worksheet JS tasks and their correct/explanation fields were read and solved, then matched against the HTML task/answer guide: all 24 fields agree after whitespace normalisation. Every task contains its own times, dates, quantities, requested evidence and, for W008, source notes; none depends on a prior shuffled task. W006/W007 explicitly require separate paper for the multirow schedules, and the page provides general larger-drawing guidance.

| Worksheet task | Independent solution / complete evidence |
| --- | --- |
| W001 | Monday 9:47–11:12 am: 13 + 60 + 12 = 85 min = 1 h 25 min; labelled whole-hour timeline |
| W002 | Tuesday 11:38 am–1:07 pm: 22 + 67 = 89 min = 1 h 29 min; noon and jump labels |
| W003 | Friday 10:55 pm–Saturday 12:40 am: 65 + 40 = 105 min = 1 h 45 min; visible day boundary |
| W004 | 2 h 35 min = 155 min; 245 s = 4 min 5 s; 3 min 10 s = 190 s, 5 s longer than 185 s; calculations and units |
| W005 | Thursday start 11:25 am; back 15 then 35 min from 12:15 pm; forward check totals 50 min |
| W006 | Wednesday 10:50–11:05, 11:05–11:35, 11:35–11:45, 11:45 am–12:20 pm; 15+30+10+35=90 min = 1 h 30 min |
| W007 | Friday seven intervals: 3:00:00–3:00:35–3:00:55–3:01:30–3:01:50–3:02:25–3:02:45–3:03:20 pm; 4 × 35 + 3 × 20 = 200 s = 3 min 20 s; four names and three rests |
| W008 | Three supplied daily/lunar/seasonal observations and corresponding return/time connections, specific People/speaker/source attribution, plus exact bus-duration clock/timer limitation |

Final root integration identities and every-page production PDF inspection are complete. Structural validators/counts remain supporting checks only.

## Final integration and evidence recheck

Both final Practice/Test runtime files were evaluated locally and all 64 records compared with source: question, audio, options, key, structured explanation/hint, visual metadata, difficulty/order, adult model answer, acceptance note, response instructions and completion label agree. All 64 audio prompts equal the visible questions, and the Practice alias file is byte-identical. Adult items use the expected self-check/short-answer runtime form. Spoken playback was not tested.

The activity hub and all eight Practice/Test launch/result/review/retake pages contain the reviewed preparation/focus wording. The hub now offers a direct native Classroom View link. The precise base-60 sentence is present throughout: “Use groups of 60 when converting between these units, not groups of 100.” The existing adult-review support script is loaded by both launch, result and review pages and is unchanged from HEAD. Source inspection confirms paper-work completion stays pending without correct-answer credit until adult marking. This reviewer checked wiring/source and data parity; root's separate offline runtime observations are not represented as an independent live-browser test.

The final Classroom HTML restores one native `example-board`, one single-column `example-grid`, and five each of `example-card`, `example-label` and `example-row`. All five final card contents were read and agree with the reviewed teaching. No full live-page rendering is claimed. The author report's evidence statements were compared against actual reviewer observations: the two public cultural-page texts support the specific attributed paraphrases, while IXL shell-only details remain author-reported and no Khan lesson/video was inspected. The cultural text pass does not remove source HOLD.

## Exact production homework PDF review

Reviewed the root-exported five-page production PDF from the dedicated worksheet bank and real v18.2 PDF code, then visually inspected every rendered page at `/workspace/scratch/b2c91567ebe4/qa-pdfs/ac9m4m03-page-1.png` through `ac9m4m03-page-5.png`. Independently recomputed PDF SHA256: `ea60432598780c86696759baf612081758ef52a0af54e71c49eaffc3c5a9a4e1`. Earlier candidate PDFs are superseded.

| PDF page | Content and independent visual/content result |
| --- | --- |
| 1 | Questions 1=W003 and 2=W001. Friday→Saturday midnight and Monday whole-hour tasks retain all dates/am/pm/jump requirements, with clear working lines and readable wrapping. |
| 2 | Questions 3=W004, 4=W006 and 5=W008. Mixed-unit calculations, Wednesday timetable and all three attributed cyclic-time examples are complete. Comma spacing is repaired and the multirow timetable explicitly uses separate paper. |
| 3 | Questions 6=W005, 7=W007 and 8=W002. Thursday backward-noon, Friday seven-row routine and Tuesday forward-noon tasks retain all data. Seven-row work explicitly uses separate paper; each task has writing space. |
| 4 | Answers 1–6 match the shuffled tasks: 105 min, 85 min, 155 min / 4 min 5 s / 5 s longer, the full 90-minute timetable, specific Nyangumarta/Kirsten Banks source connections, and 11:25 am Thursday. All sums, noon/day context and typography are correct; complete answers stay on the page. |
| 5 | Answers 7–8 are complete and correctly grouped. All seven Friday intervals run from 3:00:00 to 3:03:20 pm; 4 × 35 + 3 × 20 = 200 s = 3 min 20 s. Tuesday elapsed time is 22 + 67 = 89 min = 1 h 29 min. The prior timestamp/sentence join is fixed. |

All five pages pass margins, wrapping, glyphs, footer/page numbering, workspace and question/answer separation. No clipping, overlap, lost units or misleading punctuation remains. Public source notes are supplied inside the task, so it remains standalone after shuffling. This is exact offline production-output review, not a live Download PDF click.

Root subsequently changed the shared generator to v18.3 and the worksheet HTML cache query. The additional generator branch reserves actual image height only when an authored worksheet question has an image. Independently inspected the diff and confirmed these eight dedicated tasks have no visual fields, so their reviewed no-image layout branch is unchanged. The final v18.3 HTML identity is listed below; the exact visually reviewed PDF remains the v18.2-generated artifact above.

## Upstream Topic navigation integration recheck

Read `THIRD-FIVE-TOPIC-INTEGRATION.json` and independently compared this Topic with HEAD/base `c3a1073ccf167a3153c1528a079125a7c144cf48` and local `origin/main` `348109b09c055ee54a56abf74ef77b3f27d6ba1c`. Removing exactly three unique upstream insertions from main reproduces the base bytes; removing those same insertions from the current Topic reproduces its previously reviewed authored SHA256. Only the secondary “Watch a video” shortcut, video target ID/tabindex and “Back to the lesson” link were added. Both target IDs and matching links occur once, and the final video marker block matches upstream exactly. Reviewed teaching is unchanged; all other recorded artifacts remain byte-identical. The Topic hash below identifies the integrated version. This local markup check does not claim playback/live navigation testing or alter source HOLD.

## Reviewed artifact identities

Independently recomputed after the final author corrections and root runtime/cache integration. Paths below are relative to the reviewed repository unless absolute. These identities identify the mathematical/content/PDF pass only; overall source comparison remains **HOLD**.

| Artifact | SHA256 |
| --- | --- |
| `assets/assessment-banks/year4/math/ac9m4m03.json` | `f597ae3db671d23e45b99a411ad2ab6597a6dfcba55987b1d1c3982ab88c4d43` |
| `assets/assessment-visuals/year4/math/ac9m4m03.svg` | `9180d43516b4204613abafe341bfc9b2a479546f183e08d24541315b5b84be5c` |
| `year4/maths/ac9m4m03-solve-problems-involving-the-duration-of-time-including/index.html` | `0bfc09ec51a89fa21da771ded45bf220a29dbaef635c4b4be367839e65eda759` |
| `year4/maths/ac9m4m03-solve-problems-involving-the-duration-of-time-including/teacher-slides/index.html` | `41580018ccc4508e5a594829285348616c4eeaa4e9dee0cb585f071f113c0650` |
| `quiz/year-4/math/ac9m4m03/worksheet/index.html` | `f4a0cc7e7818cbeaced19fc8e0c57decc0e251cbebdb13408625ab415b2f5c29` |
| `quiz/year-4/math/ac9m4m03/worksheet/worksheet-questions.js` | `42a6d6cbf494bfbfaa541b0ea9697cd288763b8cfe514a2130c8453a7ee07c24` |
| `quiz/year-4/math/ac9m4m03/practice/questions.js` | `1856c0f5f41c20d935aa9a0551e911263f24f2b7e22162779b2e7afd573ecb51` |
| `quiz/year-4/math/ac9m4m03/practice/practice-questions.js` | `1856c0f5f41c20d935aa9a0551e911263f24f2b7e22162779b2e7afd573ecb51` |
| `quiz/year-4/math/ac9m4m03/test/questions.js` | `8702ad90fb39adcdac8320272b14c276ed7f5e086f96971164744d8a02347683` |
| `quiz/year-4/math/ac9m4m03/index.html` | `7ef3e9289e1d7e4ecae4e995a1660e253f787f29d9392278ed6048cee340afa1` |
| `quiz/year-4/math/ac9m4m03/practice/index.html` | `9a77e5829ead693b2411cdec4abf5067aa7b26d80991d0f4b3b0a52b36295a3c` |
| `quiz/year-4/math/ac9m4m03/practice/result/index.html` | `98bf1351b55dc1ad7c2b0ec3f7e92a41113fa5a35b6c59fa35960ac1b2067c16` |
| `quiz/year-4/math/ac9m4m03/practice/review/index.html` | `f948ec605b798c3fdcf760a694c70553b6df61195601aa4f7755c89fc552cfed` |
| `quiz/year-4/math/ac9m4m03/practice/retake/index.html` | `b081224e7f1bcd15cf88acdea5c14f9cea26de104a5430fa89b0fc9bce912859` |
| `quiz/year-4/math/ac9m4m03/test/index.html` | `41d6b72582f35128004da586b3491b1e036d805503c0827e2040d07042675f46` |
| `quiz/year-4/math/ac9m4m03/test/result/index.html` | `7dc2b951a6124387e693e47471162b1c4d73c3e162b8c734536c489296560928` |
| `quiz/year-4/math/ac9m4m03/test/review/index.html` | `e6bf3d275be46aae8eed518626ab2668d7cffd6c3b8c023f6b6ecc8ad5a5210e` |
| `quiz/year-4/math/ac9m4m03/test/retake/index.html` | `8b4935c8723d05c84f5f79f5be151648dd2cc6e8cd60a56d32a6eb01a06247ed` |
| `/workspace/scratch/b2c91567ebe4/qa-pdfs/ac9m4m03-homework.pdf` | `ea60432598780c86696759baf612081758ef52a0af54e71c49eaffc3c5a9a4e1` |
| `quiz/assets/year1-maths-support.js` | `220bc7a4b8b4fa82b01771f3ca0fc60649705e0097a96a9cef5616d289663803` |
| `quiz/assets/worksheet-pdf.js` | `f6846aecfd609c5563b5adf850ad8f32e75f2b2ffe0521ad599b3f3135dd1ea2` |

No commit, publication, ledger edit, badge change or full independent approval was performed by this reviewer.
