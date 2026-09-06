# Learning quality refresh · 6 September 2026

This release uses IXL as a teaching-quality benchmark. It adds original SkillrHub explanations, models and questions. It does not reproduce IXL's question bank, claim an affiliation, or certify equivalent quality across every topic.

## Changes

| Area | Delivered scope |
| --- | --- |
| Foundation–Year 10 resource support | All 676 worksheets and 176 existing homework pages link to their own canonical topic explanation and Classroom View. Redirected topic URLs are resolved. |
| Original lessons | 36 lessons: all 15 Year 1 Maths units, all 10 Year 1 Science units, and one English unit in each year from Foundation to Year 10. |
| Classroom teaching | The same 36 authored lessons, with matching values, questions, explanations and visual models copied from committed topic sources. |
| Year 1 elaborations | 108 specific teaching questions and answers replace repeated generated connection paragraphs across 25 topics. Cultural elaborations designated ineligible for questions retain their source context without invented assessment items. |
| Lesson print practice | 144 original questions with answer guides, available for classroom work, independent practice or homework. |
| Upper-year homework | 36 Maths homework pages have eight specific questions each: 288 questions with worked answers or explanatory guidance. These replace identified generic task templates. |
| Shared PDF downloads | 328 worksheet entry points use version 18: flowing pages, full question stems and options, mathematical fonts, retained SVG diagrams, and a separate answer guide in the selected question order. |

The static curriculum architecture, established resource journeys, and existing authored material are retained. Practice/Test banks and scoring behaviour are unchanged. Classroom Views remain static teaching pages; this release does not introduce a presentation renderer or classroom PDF downloads.

## Benchmark evidence

The comparison reviewed IXL's Australian curriculum skill structure and sampled its parent-access worked examples. Useful features were explicit worked reasoning, visual representations, focused skill checks, evidence-based explanations and graduated demand. The new content is independently authored against SkillrHub's existing curriculum descriptors.

Representative references consulted:

- [IXL Australian Curriculum v9 Year 1 Maths plan](https://au.ixl.com/maths/skill-plans/australian-curriculum-version-90-year-1)
- [IXL place-value comparison skill](https://au.ixl.com/maths/year-1/use-place-value-to-compare-numbers-up-to-120)
- [IXL Year 10 evidence evaluation skill](https://au.ixl.com/english/year-10/identify-stronger-and-weaker-evidence-to-support-a-claim)
- [IXL Australian Curriculum v9 Year 7 Science plan](https://au.ixl.com/science/skill-plans/australian-curriculum-version-90-year-7)

## Verification

- Year 1 Maths static-topic validator: 15/15 passed.
- Year 1 Science static-topic validator: 10/10 passed.
- `validate_learning_quality_refresh.py`: all 676 worksheet support blocks, 176 homework support blocks, 36 classroom source copies, 108 elaboration copies, 144 lesson questions and 288 homework answers checked. Destinations and fragment anchors exist; assessment paths are unchanged.
- `validate_worksheet_pdf.mjs`: production generator exercised using long stems, long options, zero answers, multiple answers, mathematical symbols, and existing inline/external-symbol SVG diagrams. Page bounds, complete text and answer order passed. Generated PDFs were extracted and visually inspected.
- JavaScript syntax and whitespace checks passed. Build scripts are repeatable without further file changes.

PDF regression dependencies are jsPDF 2.5.1 (the existing production version), linkedom 0.18.12 for the test DOM, and Sharp for test rasterisation. Production uses browser-native SVG/canvas APIs. The bundled DejaVu print fonts include their licence in `quiz/assets/fonts/LICENSE-DejaVu.txt`.

## Review limits

The inventory and link check cover all 676 curriculum units. Deep content changes cover the specific lessons and homework listed above; all 676 lessons have not been individually compared with IXL. The PDF answer guide reflects the current question bank's answers and explanations, including any pre-existing weaknesses. No new site-wide verification badge or unsupported mastery claim is added.

Authoring data is in `content-quality/`. Commit changes from `scripts/build_learning_support.py --topics` before copying them with `--resources`. Homework repairs use `scripts/repair_authored_homework.py`. The detailed coverage inventory is `reports/learning-quality-rollout.json`.
