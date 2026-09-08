# AC9M4N01 — author research, coverage and substantive review

Status: AUTHOR COMPLETE; independent review PASS recorded in [AC9M4N01-INDEPENDENT-REVIEW.md](AC9M4N01-INDEPENDENT-REVIEW.md). Date: 8 September 2026 (UTC).

## Authority and complete coverage

The official ACARA v9 descriptor was verified from the [QCAA Year 4 v8.4–v9 comparison, page 1](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_yr4_comp.pdf), and the six elaborations were read directly from the [Scootle v9 curriculum reproduction](https://www.scootle.edu.au/ec/search?accContentId=AC9M4N01). Exact descriptor (Scootle’s official curriculum reproduction): “recognise and extend the application of place value to tenths and hundredths and use the conventions of decimal notation to name and represent decimals”. The stored cross-thread `svgSkillrHub-IXL-Research-Log.md` was read first; no Year 4 Maths evidence in it was treated as a current benchmark.

| Component | Practice evidence | Test evidence | Teaching / written work |
| --- | --- | --- | --- |
| Equal-part bar model for tenths | P001, P004, P006 | T006, T008 | Whole-bar and ribbon models; W001 |
| Multiplicative whole–tenth–hundredth relationships using materials | P013–015, P019–021, P042 | T004–005 | Enlarged-tenth model and bundle-of-straws explanation; W003 |
| Rename and regroup the same amount | P016–018, P022–024, P043–044, P046, P048 | T004, T006–007, T015–016 | Existing 0.6=0.60 teaching strengthened; W004, W008 |
| Name/represent decimals, distinguish digit/place/value and zero | P002–012, P041, P047 | T001–003 | Place-value chart and worked values; W002 |
| Decimal measures and parts of the next base unit | P025–030 | T008–009 | Ribbon, metres/centimetres and reading lesson; W005 |
| Count mixed notes and coins including larger collections and exchanges | P031–036, P040 | T010–012 | Count-record visual plus play-money activity; W006 |
| Compare spoken/read money and measures, preserving place meaning | P037–039 | T013–014 | Explicit dollar/cents versus metre readings; W007 |

Year-level boundary: decimals to hundredths, including numbers greater than one, not thousandths or decimal multiplication algorithms. Comparison is used sparingly to diagnose place value; it is not substituted for naming and representation. The unit whole is explicitly defined for each material/model. Standard Australian coin and note denominations are used.

## Direct IXL evidence and limitation

Actual Year 4 skill URLs were retrieved from the IXL catalogue, then opened in the authenticated Parent session. Initial author interactions repeatedly timed out. The initial DOM-only Q.1/Q.2 example readings did not establish that the help panel was open, and are not used as worked-example evidence. This was a browser-tool recovery issue, not evidence of an IXL login block, bot block or outage.

Researcher `author_placevalue` subsequently completed the direct comparison in a working exclusive browser window. The [supplementary source report](FIRST-FIVE-SUPPLEMENTARY-SOURCE-REVIEW.md) is the detailed evidence record. Its Q.1, Q.2, P.2 and P.5 entries each document activating Learn, observing the visible panel and Back to practice controls, inspecting the rendered screenshot, and distinguishing accepted practice from attempted input:

- [Q.1 Place values in decimal numbers](https://au.ixl.com/maths/year-4/place-values-in-decimal-numbers): visibly opened chart example 84.5 identifies the tens digit. Two accepted practice responses identify the hundredths digit in 71.42 and the ones digit in 0.7; SmartScore 19. This supports positional naming and the zero placeholder.
- [Q.2 Understanding decimals expressed in words](https://au.ixl.com/maths/year-4/understanding-decimals-expressed-in-words): visibly opened example five point five five becomes 5.55 using the whole-number part and fractional-place chart. Two spoken-decimal responses were accepted, reaching SmartScore 19. This supports writing tenths/hundredths from words, without claiming money/measure reading coverage from this sample.
- [P.2 What decimal number is illustrated?](https://au.ixl.com/maths/year-4/what-decimal-number-is-illustrated): visibly opened 60-hundredth grid explanation connects 60/100 with 0.60 and its place-value chart. One actual ten-strip model with two strips shaded was answered 0.2 and accepted; SmartScore 10. The explicitly defined whole and equal partitions directly informed the comparison.
- [P.5 Decimal number lines](https://au.ixl.com/maths/year-4/decimal-number-lines): visibly opened worked line uses ten equal intervals from 0 to 1 and counts five intervals to 0.5. One matching-format practice response was accepted; SmartScore 10. The sample confirms interval reasoning for tenths, not later hundredth stages.

The authored bank and resources cover ACARA's broader renaming, mixed-note/coin collections and measurement language through original teaching and substantive independent review. These components are not attributed to unobserved IXL stages. No IXL question or diagram was copied, and no full adaptive mastery claim is made. Supplementary Khan inspection is recorded separately when completed.

## Substantive author review and changes

Every old question, option, key and explanation in the 24 Practice +16 Test baseline was read. It repeated only three families (compare nearby lengths, compose two decimal digits, convert a tenth), included irrelevant contextual prefixes and attached decorative process diagrams. The useful concepts were retained but all items were rewritten with substantive explanations and real curriculum breadth. No baseline item was strong enough to keep unchanged.

The new bank contains **48 Practice +16 Test**. Every item was individually solved during authoring, every distractor checked, and the exact mathematical reason written into the feedback. Independent reviewer has separately solved all 64 items; its final review, not this author statement, determines approval. Correct positions are balanced separately within each bank, 12 each in Practice and four each in Test, with no fixed position tied to a question family.

Ten original SVGs represent six tenths, 37 hundredths, four hundredths, one whole plus two tenths, a 6.08 place-value chart, a tenth enlarged into hundredths, 1.4 metres, a mixed-money count record, a decimal number line and 62 hundredths. Each uses a 640×300 `model` symbol, coherent unit size and exact accessible description. The reviewer identified a guide-line/text collision in the enlarged-tenth visual; a background behind the label separates it from the dashed guide lines. Old decorative SVG assets remain on disk for deletion safety but are no longer referenced by this bank.

## Topic Guide → Classroom View → Worksheet/Homework

Scoped teaching corrections preserve the current HTML/CSS design, native disclosure sections, existing resource URLs and free no-login flow. The inaccurate “hundred grid” heading above a place-value chart was corrected. Generic worked-step prompts were replaced with actual calculations and reasoning; all five revision questions now have exact answers. Existing useful teaching was preserved, and missing whole/tenth/hundredth, measurement, large mixed-money and money/measure reading explanations were added.

The existing Classroom View's static content panels now contain the same checked models, worked reasoning and revision answers, with Learning goals initially open. No runtime curriculum generator or new product feature was introduced. The previous unreferenced slide image was retained.

The worksheet has a distinct eight-task written bank at `quiz/year-4/math/ac9m4n01/worksheet/worksheet-questions.js`, selected by the existing `window.skillrWorksheetQuestions` interface. The visible prompts and parent/teacher answer guide match that authored bank. Download PDF uses these eight tasks, with drawing, explaining, renaming, money counting and comparing readings. The independent reviewer inspected all four pages of the exact generated PDF and passed its tasks, answers and layout. Final live routes remain a root release check.


### Final resource-layout checks

The existing Classroom View example-board, example-grid and labelled example-card containers wrap the actual authored models. A single-column arrangement keeps complete diagrams readable. The existing Year 4 model stylesheet is loaded so the place-value, hundred-grid and pairing HTML remains rendered rather than becoming plain unstyled text. The Year 4 static topic validator reports no failures for this code. The source question-bank content did not change during these layout corrections.
