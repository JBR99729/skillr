# Year 3 Science topic pages — complete content set

7 November 2026. All twelve Year 3 codes are built on the review branch; this is not a production release.

Completion commit baseline: `43349bfe19be14c26bc6fc5aabbba3dbd7a228c1` (the first ten-page review build).
Original content-preservation baseline: `4023119cc0224ea924886cbdb5b5e8ad50c9a91a`.

## Completed set

AC9S3U01–U04, AC9S3H01–H02 and AC9S3I01–I06.
The first ten pages are unchanged in this completion patch. The two remaining pages, I05 and I06, now use the same illustrated static format. All twelve retain their canonical routes, metadata, code-aligned resources and teaching content.

The combined inventory and authored-data files cover all twelve pages: twelve worked examples, thirty-six teaching steps, thirty-six reasoning checks, twenty-four FAQs, twenty-four misconception repairs and twelve differentiated ten-minute activities. Ninety-two original educational sections are retained across the set, subject to the three factual/clarity corrections documented with batch 1 and the I06 navigation cleanup described below.

### I05 — evaluating investigations and conclusions

Compare two groups' findings, consider method and measurement differences, evaluate scientific fairness, identify further questions and draw conclusions limited to the evidence. The supplied cup records begin at 36°C; group A ends at 33/28°C and group B at 32/27°C for sleeve/no-sleeve comparisons. The temperature decreases are checked as 3/8°C and 4/9°C respectively. Both groups show less cooling with the sleeve. The example does not claim an actual classroom trial, a universal result or an explanation of every small difference.

### I06 — communicating scientific findings

Identify audience and purpose, choose a suitable text/representation, communicate precise observations and conclusions, use scientific vocabulary and select appropriate digital tools. The page contrasts a concise family poster with a method-rich teacher report while keeping the evidence unchanged. Its column graph shows temperature decreases of 3°C and 8°C, rather than final temperatures; the worked explanation and error checks make that distinction explicit. A short report model, audience comparisons, peer-check activity and accurate captions support actual text creation.

## Preservation and scoped repair

I05 retains seven original teaching sections; I06 retains eight. The source comparison checks all 92 retained sections against the original baseline, with only the three documented batch-1 factual corrections and removal of an injected I06 navigation block allowed.

The inherited I06 report-layout model contained page-return navigation inside its example body and used nested `<main>` elements in two diagram instances. The accidental navigation and obsolete markers are removed. Those example bodies now use content divs with a scoped CSS class that retains the report-diagram layout. The lesson has one page main and one proper return-navigation block. All underlying example labels, vocabulary, explanations and guided learning remain. Matching rules were added only for this new content class; the first ten pages' HTML and diagram styles are unchanged.

The existing heat-investigation artwork is reused, with descriptive alt text. No new generated image or binary asset is added in this completion patch. Quantities are supplied in HTML and exact SVG graphs; blank screens in contextual artwork do not act as measurement evidence.

## Teacher-style author review and evidence

Reviewer: author AI teacher-style review, not independent sign-off.
Reviewed both new worked examples, six steps and answers, six reasoning questions/answers, four misconception repairs, four FAQs, two activities, the report model and the graph/table/calculation agreement. Reused the inspected original code lessons, the Year 3 curriculum map and the sources recorded in batch 1. The QCAA Year 3 alignment explicitly includes I05 comparison/fairness/further-question/conclusion skills and I06 audience/purpose/vocabulary/digital-tool communication. Primary Connections' inspected Year 3 sequence alignment also provides relevant investigation and communication contexts. No new IXL progression inspection, watched-video or classroom-trial claim is made.

- https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr3_as_cd_alignment.pdf
- https://primaryconnections.org.au/teaching-sequences/year-3/scorching-swings-and-slides
- `curriculum-question-banks/qa/year3-science-curriculum-map.md`
- `docs/qa/year3-science-topic-pages-batch1-20261107/README.md`

Adults may support reading, scribing, accessibility and practical safety. Answer reveals are learning support, not proof of independent mastery. The activities require students to create a conclusion, further question and audience-appropriate explanation.

## Verification

- 216 source checks pass: twelve pages × eighteen checks.
- Full-set DOM smoke passes: 92 retained teaching sections with the recorded exceptions, preserved metadata/structured data, twelve image references, correct internal links/fragments, 212 native disclosure open/close checks, accessible SVG labels and accurate graph geometry/table values.
- All twelve source pages have exactly one H1, one page main and one return-navigation block.
- The existing Year 3 Science static-topic validator passes 12/12 pages.
- K–6 teacher-route validation passes with zero repairs.
- Static architecture and complete-tree release integrity run on the final completion commit before upload. This patch must not delete paths or alter CNAME/core files.

Reproduce full-set DOM smoke with jsdom installed:
`NODE_PATH=/path/to/test/node_modules node scripts/qa_year3_science_topic_pages_complete.cjs 4023119cc0224ea924886cbdb5b5e8ad50c9a91a`

## Remaining release checks

Content build is complete for Year 3. Desktop/mobile rendered review remains unverified; the earlier local-preview connection refusals have not been resolved. DOM checks do not certify real browser layout, keyboard or touch behaviour. No independent sign-off, app authentication/marking/progress check or recertification of unchanged slides/worksheets/banks is claimed. No matching Year 3 app practice is currently listed in the production availability ledger, so catalogue entrances remain clearly labelled. Live production is unchanged.
