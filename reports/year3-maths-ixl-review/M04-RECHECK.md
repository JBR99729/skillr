# M04 recheck - in progress

User direction: preserve previously rewritten N01-N07 and A01-A03 and existing M01-M03/P01 drafts. Do not re-author completed work. Continue in curriculum order from M04. Preserving work does not upgrade its verification status.

## Direct browser evidence

In the existing signed-in Parent tab, opened and expanded Learn with an example on:

- [FF.1 Match clocks and times](https://au.ixl.com/maths/year-3/match-clocks-and-times): digital notation to spoken time, reading either side of the colon.
- [FF.2 Match analogue and digital clocks](https://au.ixl.com/maths/year-3/match-analogue-and-digital-clocks): identify the preceding hour, count minute intervals, match representations.
- [FF.3 Read clocks and write times](https://au.ixl.com/maths/year-3/read-clocks-and-write-times): shorter hour hand, longer minute hand, five-minute counts and numeric entry.
- [FF.5 Identify times written in words](https://au.ixl.com/maths/year-3/identify-times-written-in-words): convert half-past language to numeric time.

FF.8 time-unit example was inspected earlier; preserve that evidence instead of repeating it. Initial practice tasks were read on these four pages. Clock pictures themselves still need visual inspection; DOM descriptions alone do not establish visual QA. These initial examples do not demonstrate the complete nearest-minute progression.

## Existing bank findings

The production bank contains 24 practice and 16 test items. Its first eight prompts repeat one time using context prefixes. Several tasks concern moving forwards/backwards in time instead of the core clock-reading relationship. Some questions describe the exact hand readings in text rather than requiring interpretation of the visual.

## Draft coverage requirements

Exactly 48 practice and 16 test questions. Preserve existing IDs and add P025-P048. Include actual analogue clock interpretation to individual minutes; digital-to-analogue matching; spoken, digital and analogue equivalence; past/to language; hour-hand movement through the hour; correct 12-hour wrap; zero-padded minute notation; and reasoning about reversed hands or reading the next hour too early. Different numbers alone must not provide the entire variety.

## Draft checkpoint

The 48 practice and 16 test draft is now in `repair-drafts/ac9m3m04.json`, built by `scripts/year3_clock_m04_draft.mjs`. It contains 22 diagram-based items (including six four-clock selection panels). It covers direct readings, representation matching, single-minute ticks, past/to wording, zero padding, hour-hand movement and error reasoning. No old prefix-expansion content was reused.

The actual FF.3 practice clock was inspected by screenshot, showing a half-hour reading. A further expanded worked explanation was read on that page. Full nearest-minute adaptive progression is not yet documented.

Production-schema validation passes: 48/16, unique IDs, four distinct options, balanced answer positions, no duplicate prompt/visual/answer combinations. Existing IDs are preserved and P025-P048 added.

Do not treat this record as completion. Remaining: deeper IXL progression samples, final answer and distractor review, rendered desktop/mobile checks, and release validation. No main publication.

## Fresh sequential FF.3 progression — 7 September 2026

Existing signed-in Parent session, one IXL tab. Actual clock screenshots read; numeric hour/minute fields entered manually. Readings so far: 6:30, 1:45, 11:45, 11:20 correct; 10:20 initially misread as 10:15, corrective explanation inspected (short hand between 10 and 11; long hand at 4; count four five-minute intervals); then 3:30, 10:15, 11:30, 7:45 correct. Nine answered, score 57. Next 1:30 observed and entered, not yet submitted at this checkpoint. Individual-minute reading has not yet appeared. This records the error honestly and does not claim full adaptive coverage.

FF.3 follow-up: 1:30, 2:15, 7:49, 4:45, 12:40, 4:25 and 6:35 answered correctly. Sixteen total answered, score 82. The actual 7:49 clock was visually inspected and its accessible clock description cross-checked; this directly verifies an individual-minute task, with short hand approaching eight and minute hand one tick before 10. Closely spaced hands and the twelve-to-one hour interval also observed. Next 2:20 viewed but not answered. Later adaptive stages remain unobserved.

FF.1 fresh actual progression: digital 8:00 to eight o’clock; digital 9:45 to nine forty-five; analogue 4:15 to four fifteen (screenshot inspected), all correct, three answered score 28. Next analogue 12:30 accessible description and distractors inspected but not answered. Observed change from digital to analogue input; distractors confuse hour or minute value. Prior expanded example remains the instructional evidence. Higher minute precision within this matching page remains unobserved.

FF.2 fresh actual progression: analogue 1:15, 7:45, 12:30 matched to digital images; all three screenshots inspected and correct selections accepted, score 28. Distractors varied minutes, hour and next-hour confusion. Next 2:15 description/options seen but not answered. Reverse direction and higher adaptive precision on this page not observed; digital-to-analogue tasks in the planned bank are curriculum-alignment inference, not a claim of directly observed IXL progression.

FF.5 actual progression: eight o’clock→8:00; eleven o’clock→11:00; half past eleven→11:30; five to five→4:55; ten to four→3:50; quarter past eight→8:15, six correct, score 61. Next ten to six observed but not answered. Formats include whole hour, half hour, quarter past and minutes to next hour. Higher adaptive/single-minute written phrases not observed.

FF.8 actual sample: 60 seconds in a minute and 60 minutes in an hour both entered correctly; two answered score 28, third repeats seconds per minute. Only the hours–minutes relationship is core M04; seconds belong chiefly to M03. Further unit-conversion progression is not observed and not claimed as M04 core.
