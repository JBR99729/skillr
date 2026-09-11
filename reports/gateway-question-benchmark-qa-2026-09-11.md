# Gateway question benchmark QA — 11 September 2026

Purpose: item-by-item quality review of the gateway-code Practice and Test banks against the Australian Curriculum v9 boundary, current IXL Australia mapped skill progression, and Khan Academy conceptual teaching patterns. Strong questions are retained; questions are rewritten only when ambiguity, curriculum drift, weak authenticity, shallow/meta wording, poor distractors, inappropriate difficulty, or insufficient bank depth is found.

## AC9M1M03 — COMPLETE

Reviewed individually: 48 Practice + 16 Test = 64 items.

Decision: 59 retained; 5 rewritten.

Rewritten Practice: P019, P020, P025, P048. Rewritten Test: T009.

Reasons: removed Year-2-leaning month-length recall, an ambiguous duration estimate, a meta summary item and tautological relative-day wording; strengthened month/season cycles, appropriate-unit selection and authentic calendar transfer.

Benchmark: current IXL Australia Year 1 mapping — days, months, seasons and calendar reading. Khan used only as a conceptual-quality reference for sensible time units and explanations.

## AC9M3M03 — COMPLETE

Reviewed individually: 48 Practice + 16 Test = 64 items.

Decision: all 64 retained.

Benchmark: current IXL Australia mapping — elapsed time, elapsed-time word problems and relationships among seconds/minutes/hours; Khan Grade 3 elapsed-time progression and bridge-to-the-hour reasoning.

Strengths: fixed unit relationships, estimates, conversions, mixed-unit comparisons, timelines, cross-hour/noon elapsed time, start/finish reasoning and misconception-based distractors.

## AC9M3M04 — COMPLETE

Reviewed individually: 48 Practice + 16 Test = 64 items.

Decision: all 64 retained.

Benchmark: current IXL Australia mapping — match clocks and times, analogue/digital matching, read/write times, written-time identification and time-unit relationships; Khan Grade 3 nearest-minute clock reasoning.

Strengths: exact-minute analogue reading, individual minute ticks, realistic hour-hand movement, analogue/digital/written-form transfer, leading-zero notation and distractors based on wrong-hour, ±1-minute and five-minute-counting misconceptions.

## AC9M4M03 — COMPLETE

Reviewed individually: 48 Practice + 16 Test = 64 items.

Decision: 58 retained; 6 re-authored.

Re-authored Practice: P041, P042, P043, P048. Re-authored Test: T013, T014.

Reason: these six items drifted from the AC9M4M03 time-duration standard into cultural/seasonal-cycle knowledge. The replacement items directly assess fractions of an hour, finding start time, transport/schedule reasoning and multi-step duration constraints.

Benchmark: current IXL Australia mapping — am/pm, time-unit conversion, mixed time units, elapsed time, start/end times, transportation schedules and fractions of time units; Khan Grade 4 elapsed-time and start-time reasoning.

Implementation: reviewed replacements are applied through `quiz/year-4/math/ac9m4m03/benchmark-overrides.js` and loaded by both Practice and Test launch pages. The launch-page preparation notes were tightened to the same benchmark boundary.

## AC9E5LY06 — COMPLETE

Reviewed individually: 48 Practice + 16 Test = 64 items.

Decision: 63 retained; 1 re-authored.

Re-authored Practice: P037.

Reason: the previous question treated a comma after a short introductory phrase as mandatory, which is too style-dependent for a clean assessment. It was replaced with an unambiguous introductory dependent-clause punctuation item.

Benchmark: current IXL Australia AC9E5LY06 mapping — purpose, organisation, relevance, topic/concluding sentences, connectives, expanded language choices and punctuation; Khan used as the conceptual benchmark for purpose, structure, audience and revision reasoning.

Strengths: real planning and drafting decisions, paragraph organisation, multimodal choices, dialogue punctuation, specialist vocabulary, revision versus proofreading, imaginative/informative/persuasive transfer and publication checks.

## AC9S7I06 — COMPLETE

Reviewed individually: existing 24 Practice + 16 Test = 40 live items.

Decision on existing items: all 40 retained. No existing item required rewriting.

Depth correction: the live Practice bank contained only 24 items, below the gateway 48-question standard. Added 24 new benchmarked Practice items, producing 48 Practice + 16 Test = 64 learner-assessment items.

New coverage includes: natural-resource claims including fossil-fuel evidence, source credibility, comparison groups, reproducibility, instrument resolution, sampling bias, causal overreach, conflicting evidence, model boundaries, systematic/random error mechanisms, claim scope and integrated method-data-claim evaluation.

Benchmark: IXL Australia AC9S7I06 explicitly maps evaluation of natural-resource/fossil-fuel claims; Khan middle-school science emphasises evidence-supported conclusions, data quality, competing explanations and iterative testing.

Implementation: the original 24 strong Practice questions are retained and `practice/benchmark-extension.js` adds P025–P048 at runtime. The Practice launch page now loads the full 48-item bank.

## AC9S8I06 — COMPLETE

Reviewed individually: existing 24 Practice + 16 Test = 40 live items.

Decision on existing items: all 40 retained. No current live item required rewriting.

Important verification: an older/stale version previously observed contained senior-level p-value/statistical-power wording. That item is not present in the current live `main` Practice or Test bank, so no such terminology remains in the reviewed live set.

Depth correction: the live Practice bank contained only 24 items. Added 24 benchmarked Practice items, producing 48 Practice + 16 Test = 64 learner-assessment items.

New coverage includes: fossil-fuel/resource-use claims, fair life-cycle comparisons, source transparency, assumptions, model extrapolation, shared calibration bias, representativeness, method sensitivity, operational definitions, observational versus causal claims, non-replication, absolute environmental claims, selective data exclusion, instrument detection limits and integrated evaluation of conflicting evidence.

Benchmark: IXL Australia AC9S8I06 explicitly maps evaluation of natural-resource/fossil-fuel claims. Khan middle-school/Grade 8 scientific practice benchmarks emphasise analysing descriptive data features and error sources, evaluating experimental designs, evidence from multiple sources and recognising model limitations.

Implementation: `practice/benchmark-extension.js` adds P025–P048 at runtime and the Practice launch page now loads the full 48-item bank.

## FINAL STATUS

All seven gateway codes have completed the requested question-by-question benchmark pass.

- AC9M1M03: 64 reviewed; 5 rewritten.
- AC9M3M03: 64 reviewed; 0 rewritten.
- AC9M3M04: 64 reviewed; 0 rewritten.
- AC9M4M03: 64 reviewed; 6 rewritten.
- AC9E5LY06: 64 reviewed; 1 rewritten.
- AC9S7I06: 40 existing reviewed and retained; 24 new Practice items added to reach 64 total.
- AC9S8I06: 40 existing reviewed and retained; 24 new Practice items added to reach 64 total.

QA reopening rule: do not repeat this general benchmark audit on unchanged banks. Reopen only after a material question-bank/runtime change, Australian Curriculum or benchmark change, or a specific reported defect.
