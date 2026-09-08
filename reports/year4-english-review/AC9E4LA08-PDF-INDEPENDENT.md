# AC9E4LA08 — independent production PDF review

**PASS for both final five-page PDFs (all ten pages inspected).** Reviewer `/root/batch_supplement`; no LA08 content authorship. This extends `AC9E4LA08-INDEPENDENT-REVIEW.md` with actual production PDF visual review; publication, Pages and live downloading remain separate.

I rendered both supplied production PDFs with Poppler at 110 dpi, opened every page individually at original detail, and read every prompt, model and adult-guidance paragraph. All eight original homework tasks appear in each export, with four adjacent response rules per task. Models and guidance match the appropriate reordered question; time noun groups, adverb-headed groups and full prepositional phrases remain accurately distinguished. Genuine rewriting, comparison, explanation and two-sentence creation requirements survive export. The answer guide starts on its own page and is clearly labelled. No clipping, overlap, missing text, broken glyphs or footer collisions were found.

| Export | Page | Inspected content |
| --- | --- | --- |
| 1 | 1 | W006 Friday noun group/place-adverb replacement; W003 adverb/PP manner comparison. Title, instructions and four rules each. |
| 1 | 2 | W004 reordered circumstances; W007 binocular attachment repair; W002 hedgehog expansion. Four rules each. |
| 1 | 3 | W005 noun/activity attachment; W001 concert groups; W008 original classroom description. Four rules each. |
| 1 | 4 | Answer models and adult guidance for questions 1–6, complete and correctly aligned. |
| 1 | 5 | Answer models and adult guidance for questions 7–8, complete. |
| 2 | 1 | W003 comparison; W008 creation. Title, instructions and four rules each. |
| 2 | 2 | W006 Friday replacement; W004 reordering; W005 attachment. Four rules each. |
| 2 | 3 | W002 hedgehog expansion; W001 concert groups; W007 binocular repair. Four rules each. |
| 2 | 4 | Answer models and adult guidance for questions 1–5, complete and correctly aligned. |
| 2 | 5 | Answer models and adult guidance for questions 6–8, complete. |

An initial image display of page 3 omitted apparent whitespace/rules; reopening the exact unchanged PNG singly showed all four rules immediately beneath every prompt. This was a display artefact, not a PDF defect, and no correction was requested. Independent pdfplumber checks corroborated horizontal-rule totals (9,14,14,2,2 including headers/footers per export), all ten page numbers/footers and text inside margins. The actual production QA additionally records four response lines for each task. All four production input hashes and both PDF hashes were checked against current bytes.

## Production inputs

- `quiz/year-4/english/ac9e4la08/worksheet/index.html`: `46197a2cad3049228ae16b236b510add2597cd8ae7124e2be9111d1543cdea2e`
- `quiz/year-4/english/ac9e4la08/worksheet/worksheet-questions.js`: `8c22b1fcf208b95cab6f994956fb47de0dfc4fb52e803375c4222cdf4b2ddbe4`
- `quiz/assets/worksheet-pdf.js`: `5e05c5a5caa4d2910ee79fd8e7c8247a6975864791f38fe3c7a484311f9d6a8e`
- `scripts/validate_year4_english_la01_pdf.mjs`: `467977729f8f35b6e7d9155c8574c3b5f3e8518bc7a587389199c53480b965eb`

## Inspected production PDFs

- `/workspace/scratch/1b8e561832f8/english-la08-next-six-final-pdf/1-adverb-groups-and-prepositional-phrases-worksheet.pdf` (5 pages): `f45ea2b237cded43a9bc9c8c8aa62e2e2f5ff79cba10f901e249546524f0ee84`
- `/workspace/scratch/1b8e561832f8/english-la08-next-six-final-pdf/2-adverb-groups-and-prepositional-phrases-worksheet.pdf` (5 pages): `c759a3bbe33986fa6f9cf1c9c6e5d09cad1dc9d9a38864c00d50017e0405a75c`

Individual inspected PNGs are in the same directory under `independent-render/`. No implementation or worksheet edits were made.
