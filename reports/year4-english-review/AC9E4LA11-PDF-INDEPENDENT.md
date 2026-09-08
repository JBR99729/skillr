# AC9E4LA11 independent production PDF review

Reviewer: `/root/la06_author`, separate from code author `/root/la04_author`. Date: 9 September 2026 Australia/Sydney.

**PASS for the two production PDF artifacts and exact inputs below.** This is not live browser download or release approval.

## Actual generation and all-page inspection

Invoked `scripts/validate_year4_english_la01_pdf.mjs` for AC9E4LA11 using actual jsPDF and the actual production download handler. The second PDF uses deterministic longest-stem-first ordering. The harness checks full question/model/adult-guidance text, text margins and actual response rules. Both generated PDFs have five pages: three student worksheet pages followed by two adult answer-guide pages. All eight tasks have four response lines adjacent to their own prompt. The longer vocabulary-note task has room for its two original sentences and separate brief source notes; separate paper remains an available instruction on the worksheet page.

Rendered both actual PDFs with Poppler at 90 dpi and independently viewed every page: pdf1-1 through pdf1-5 and pdf2-1 through pdf2-5. All ten pages pass: readable text, no clipping, overlap, missing glyphs, split prompt/response blocks or broken numbering. Answer-guide numbering matches each shuffled question order, and all models plus acceptance guidance remain visible. Source-language spellings remain readable. This text-only worksheet has no image placeholders or required media.

The static eight-task worksheet and dedicated homework array were frozen by the author before generation. Bank-only distractor corrections do not change these PDF inputs. Native DOM/harness execution is not a live-browser claim.

## Executed input hashes

- `quiz/year-4/english/ac9e4la11/worksheet/index.html`: `e0893a9a50b11692d85b2301faa0a04ca4fff80e0076d682f6d0205dd7f21978`
- `quiz/year-4/english/ac9e4la11/worksheet/worksheet-questions.js`: `76221b0294fbb92385d326c53dba6e9f53f9c022848ccd7db05f1cc11aa4784b`
- `quiz/assets/worksheet-pdf.js`: `5e05c5a5caa4d2910ee79fd8e7c8247a6975864791f38fe3c7a484311f9d6a8e`
- `scripts/validate_year4_english_la01_pdf.mjs`: `467977729f8f35b6e7d9155c8574c3b5f3e8518bc7a587389199c53480b965eb`

## Output hashes and pages

- `1-synonyms-antonyms-and-precise-vocabulary-worksheet-worksheet.pdf` — 5 pages; SHA-256 `c1e58439ac8760714689e140da6a05af3019a286995e46097eb177b9b728edb7`.
- `2-synonyms-antonyms-and-precise-vocabulary-worksheet-worksheet.pdf` — 5 pages; SHA-256 `8701d7bc15d795914a8afaa47e06fcea7a91bfe4529ed956f936cb92ce73084a`.

Actual artifacts and `production-pdf-results.json` are under `/workspace/scratch/1b8e561832f8/english-la11-pdf-review/`; all ten independent renders are in its `independent-render/` subdirectory. Root retains runtime, latest-main integrity, publication, CI/Pages and live verification gates.
