# AC9E4LA01 independent production-PDF review

Reviewed 2026-09-08 UTC by `english_la05_la07_audit`, not the LA01 author. **Final decision: PASS for the corrected worksheet content and two production-PDF artifacts identified below.** PDF-01 is resolved. This is not full-code approval or publication approval.

## Final corrected-artifact recheck

Root corrected W005's model with explicit newline-separated A/B/A/B turns and regenerated two actual production PDFs in `/workspace/scratch/1b8e561832f8/english-la01-pdf-release/`. Independently checked the new production-results binding and recomputed the three input hashes and both PDF hashes. Rendered both PDFs again using `pdftoppm -scale-to 1600 -png` and opened **all ten new PNGs with `view_image`**, including pages whose layout appeared unchanged. This is a fresh all-page review, not approval inferred from the first render or text checks.

Approved frozen input identities:

| Source | SHA-256 |
| --- | --- |
| `quiz/year-4/english/ac9e4la01/worksheet/index.html` | `ca50660d114cf1551ae156bd5f3eef80479d617f6c9a481d5cbfe0cef045e701` |
| `quiz/year-4/english/ac9e4la01/worksheet/worksheet-questions.js` | `b7c15d5981da4442b05dc99e701f312cd99102d2196b6ac93c768b99886f338d` |
| `quiz/assets/worksheet-pdf.js` | `15a70148fceba08227dede727814417d74519ad79156c6d24ca4608b476018c0` |

Approved production outputs (both 5 pages):

| PDF filename under `english-la01-pdf-release/` | SHA-256 |
| --- | --- |
| `1-language-for-formal-and-informal-relationships-worksheet.pdf` | `f5432f72d6a817d2bdcbd5ddc3e29043b3d681fe99b0935b9710449829a7b31d` |
| `2-language-for-formal-and-informal-relationships-worksheet.pdf` | `59ed711b71f758f460573e38aedae7cf7209b9b6c8e4a412bcfde4d5707efca8` |

### Final page-by-page findings

| Corrected page | Content actually inspected | Result |
| --- | --- | --- |
| PDF 1 page 1 | Header, Q1 W001 invitations, Q2 W006 visitor | PASS: complete prompts and four adjacent response lines each; all margins/footer clear. |
| PDF 1 page 2 | Q3 W007 Elder checklist, Q4 W003 expertise, Q5 W002 report | PASS: complete text, writing blocks and numbering; no splits or collisions. |
| PDF 1 page 3 | Q6 W008 timetable, Q7 W004 garden, Q8 W005 dialogue | PASS: all task text and four response lines per task fit together clearly. |
| PDF 1 page 4 | Answers and adult criteria 1–5 | PASS: matches shuffled questions; all five answer/criteria sets fit completely, with footer clearance. |
| PDF 1 page 5 | Answers and adult criteria 6–8 | PASS: W005 Answer 8 visibly has four separate A/B/A/B dialogue lines, followed by intact criteria. No continuation ambiguity, clipping or glyph defects. |
| PDF 2 page 1 | Header, Q1 W007 Elder checklist, Q2 W008 timetable | PASS: complete prompts and four adjacent response lines; no margin/footer problem. |
| PDF 2 page 2 | Q3 W006 visitor, Q4 W001 invitations, Q5 W005 dialogue | PASS: all task text and response blocks intact; no prompt/response separation. |
| PDF 2 page 3 | Q6 W002 report, Q7 W003 expertise, Q8 W004 garden | PASS: complete questions, four writing lines each, safe margins and footer. |
| PDF 2 page 4 | Answers/criteria 1–4 and Answer 5 model | PASS: corrected W005 model visibly has four separate A/B/A/B lines; complete model stays on page 4, clear of footer. |
| PDF 2 page 5 | Explicit “Answer 5 continued”, criteria 5, Answers/criteria 6–8 | PASS: continuation header correctly identifies the remaining criteria; no missing words, split model, glyph problem or footer overlap. |

Both complete answer guides preserve the source models/criteria and match their own shuffled question order. Four full-width response lines remain adjacent to every learner prompt. All eight tasks and adult criteria retain the substantive content checks recorded below. PDF-01 is closed: the model now shows the product required by the prompt. No remaining blocking worksheet-content or PDF-layout finding was observed. This approval applies only to the frozen identities above; other code resources, runtime/live download, independent full-code approval and release integrity remain separate gates.

### Final rendered page identities

| Corrected PNG | SHA-256 |
| --- | --- |
| `1-page-1.png` | `d267290a491713ae9bcb5165341083efb2cff1d0b6448fce5c6127a09e106f66` |
| `1-page-2.png` | `bb6987b8e0b4d6066a36dbed8a0ec8ae550cbca503c8bd1376b4cd21e5d87b8c` |
| `1-page-3.png` | `f55e68e9a6609fbdb34b74bdbd833b2de5e106b0d85a0291649c11a10c3bca93` |
| `1-page-4.png` | `c9de8bcbcb1210cd1e821f0a9a03fc369f9e7a7373fcdeffcfeb08bd628033d9` |
| `1-page-5.png` | `3c7b7fafa1d76b94f92b1ab1a48c11e32cc03b14a4536dd0dba45a1c6b4cf1a3` |
| `2-page-1.png` | `df809c2c0a3683bd6b973bfb1d13cf2f10c4187628d60effe057cf74cf4f15ff` |
| `2-page-2.png` | `0a2a9ead40f76c959b65179fb3d364095dd4d65e9565de28f5426db8444b1af2` |
| `2-page-3.png` | `3ef7335678d10025c56cdb67fef6bac1e2d9ad2ecc42ed10e3d2012eb31f88ab` |
| `2-page-4.png` | `0bf667ad4efe801642c06b1d31c7f244e71cb48f5487a4a1643852f70fdfc0ad` |
| `2-page-5.png` | `5f32300853a4eb60a87b06eccfcd6aa07619196b48a6246726013e9088d0aae2` |

## Historical first-pass review — superseded by corrected-artifact PASS above

The evidence below preserves the initially rejected hashes, original finding and correction trail. It is not the current release target.

## Reviewed evidence and method

Read the PDF skill in full (read-only review; no PDF authoring operation), `AC9E4LA01-SOURCES.md`, official AC9E4LA01 descriptor/E1–E4 in `OFFICIAL-FIRST-TEN.md`, and all eight final worksheet tasks, models and adult criteria in `quiz/year-4/english/ac9e4la01/worksheet/worksheet-questions.js`.

Reviewed two actual production-generated PDFs in `/workspace/scratch/1b8e561832f8/english-la01-pdf-final/`, not an independently recreated worksheet. Read `production-pdf-results.json` and independently recomputed the PDF/input SHA-256 values. The three source hashes match the production results exactly:

| Source | SHA-256 |
| --- | --- |
| Worksheet `index.html` | `a676a9b5fb0754dd83a73a4c6a17fee9625f2f0888d038a90937af9ce353eaad` |
| Worksheet `worksheet-questions.js` | `7e9ffb06a0de0a04f21c5c02a76961a77f682b0ab10f5105b2a88e7356306fd3` |
| `quiz/assets/worksheet-pdf.js` | `15a70148fceba08227dede727814417d74519ad79156c6d24ca4608b476018c0` |

PDF 1: `1-language-for-formal-and-informal-relationships-worksheet.pdf`, 5 pages, SHA-256 `d0c77297849097ae88e28d538225b677cb2a2c0c598e23778dd750d93077b529`.

PDF 2: `2-language-for-formal-and-informal-relationships-worksheet.pdf`, 5 pages, SHA-256 `340c6ac191939e55d00299f80ca2cbd7c0e8936d1decbb16f8ef1974c3d70883`.

Rendered both complete PDFs with `pdftoppm -scale-to 1600 -png` and opened **all ten page PNGs using `view_image`**, including both answer-guide continuation pages. No browser or IXL activity. No source edits, commits, publisher or ledger changes.

## Required correction PDF-01

**W005 model does not demonstrate four separately displayed dialogue lines.** In PDF 1 page 4, Answer 3; and PDF 2 page 4, Answer 5, the A/B/A/B model is displayed as one continuously wrapped paragraph. The prompt requests a four-line conversation and the adult guidance checks four dialogue lines. The turn labels distinguish speakers semantically, but the model should show each of the four turns starting on its own line. This is a presentation mismatch between the asked-for product and model.

Root was alerted immediately. Correct the model rendering/source through the supported multiline path, regenerate the actual production PDFs and recheck every resulting page because answer-guide pagination can change. New output/source hashes must replace the approval target; the current hashes above remain the rejected pre-correction evidence.

No other blocking issue was observed in the ten pages. In particular, the continuation headings are explicit and no content is visibly lost where adult guidance continues onto page 5.

## Page-by-page visual findings

W identifiers refer to the eight source homework IDs, not the shuffled PDF numbering.

| Page image | Actual content checked | Finding |
| --- | --- | --- |
| `1-page-1.png` | Title, name/date, instructions, Q1 W007 Elder visit, Q2 W006 visitor rehearsal | Readable; full prompts and four writing lines adjacent to each; no footer overlap. |
| `1-page-2.png` | Q3 W005 dialogue, Q4 W004 inclusive garden, Q5 W002 group report | All prompts intact; each four-line response block stays with its prompt; margins/footer clear. |
| `1-page-3.png` | Q6 W008 timetable comparison, Q7 W003 origami expertise, Q8 W001 invitations | All full prompts, writing blocks and numbering clear; no clipping. |
| `1-page-4.png` | Answers 1–5, adult criteria 1–4 and beginning of criteria 5 | Answer order matches Q1–Q5. PDF-01 on dialogue model Answer 3. Last guidance line continues, with sufficient clearance above footer. |
| `1-page-5.png` | Explicit “Answer 5 continued”, remainder of criteria 5; Answers/criteria 6–8 | Continuation is accurate and complete. Models and criteria match the correct questions; no missing ending, glyph defects or footer collisions. |
| `2-page-1.png` | Title, name/date, instructions, Q1 W007 Elder visit, Q2 W008 timetable | Complete prompts; four adjacent response lines each; readable hierarchy and safe margins. |
| `2-page-2.png` | Q3 W006 visitor, Q4 W001 invitations, Q5 W005 dialogue | Complete prompts and four writing lines each; prompt and response blocks kept together. |
| `2-page-3.png` | Q6 W002 report, Q7 W003 expertise, Q8 W004 garden | Full tasks; adequate line spacing; all content within page margins and above footer. |
| `2-page-4.png` | Answers/criteria 1–4, Answer 5 dialogue model | Correct shuffled answer order. PDF-01 on Answer 5; its adult criteria continue on the next labelled page without visible loss. |
| `2-page-5.png` | Explicit “Answer 5 continued”, criteria 5; Answers/criteria 6–8 | Continuation maps correctly; all remaining answers complete, readable and clear of footer. |

The title/code/branding and `Page n of 5` footers are consistent on both documents. The code is repeated in the first-page metadata line but is not a readability blocker. Straight quotation/apostrophe glyphs render cleanly. Writing lines are light but visible; each task supplies four full-width lines on the same page as its prompt. No black squares, overlapping text, off-page text, broken symbols or cropped answer endings were observed. All 16 prompt occurrences and all 16 associated answer/criteria occurrences were visually read.

## Content and adult-guidance checks

- **W001:** Two invitations, fixed activity/time and additional newcomer context. The invented room in the model is explicitly identified, not smuggled in as source evidence. Adult criteria allow a suitable invented location and do not equate informal with rude.
- **W002:** Group discussion to report for absent listeners preserves three signs and the one-plus-two locations. Adult criteria require an audience-based explanation and reject meaning-changing padding. Supports E1.
- **W003:** The younger learner's relevant expertise is acknowledged rather than treating age as ability. Requires two different respectful method questions and an explanation. Supports E2.
- **W004:** Three meaningful contributions plus choice/support invitation; criteria guard against gender/disability stereotyping and retain adult safety guidance. Supports E3.
- **W005:** Both preferences, respectful disagreement and shared next step are present in model meaning; criteria accept different suitable dialogues. Only the model's line/turn layout needs correction (PDF-01).
- **W006:** Authentic greeting/question/thanks rehearsal or communication-supported equivalent; preferred title honoured. Criteria inspect actual spoken/written parts, not confidence, accent or compulsory eye contact. Supports relationships and E2.
- **W007:** Checklist addresses preferred greeting/address, appropriate consultation and separate recording/sharing permission. Model/criteria explicitly limit cross-community generalisation; no fabricated greeting, automatic Aunty/Uncle title, simulated consultation or child contact required. Supports E4, with broader official coverage assessed separately across the full code.
- **W008:** Same underlying request, greater precision and audience suitability; acceptable friendly alternatives and contraction flexibility. Does not judge formality by length alone. Supports E1/E2.

These are genuine composition, rehearsal and explanation tasks rather than repeated selected-response bank samples. Models are examples with acceptable-variation criteria, not automatic pass indicators. This PDF review does not establish completeness of the 48+16 banks, all teaching surfaces, IXL progression, live download route or whole-code publication.

## Render identities

These SHA-256 values identify the exact pre-correction rendered pages visually inspected:

| Image | SHA-256 |
| --- | --- |
| `1-page-1.png` | `6978066e0c52ec9282bfad0beae56cd438d270f9f24bf50d95fc43778b3fcc7f` |
| `1-page-2.png` | `4af4af3f9c2097203a3e203c81c1d2e5493581df6c05cb3bae58db6e7a39e908` |
| `1-page-3.png` | `c37273aef828ee62a8fd5536c7616c34262309ddcb0b19b6e5a01facd14c7188` |
| `1-page-4.png` | `7261b52b92ffd731ca8b73c7d2925c07fbb04137d73a0dc12849354fe257c840` |
| `1-page-5.png` | `cba41a45619969d858225cc492380bdf3fbe9f8995623cce366998ae61cd612c` |
| `2-page-1.png` | `df809c2c0a3683bd6b973bfb1d13cf2f10c4187628d60effe057cf74cf4f15ff` |
| `2-page-2.png` | `0a2a9ead40f76c959b65179fb3d364095dd4d65e9565de28f5426db8444b1af2` |
| `2-page-3.png` | `3ef7335678d10025c56cdb67fef6bac1e2d9ad2ecc42ed10e3d2012eb31f88ab` |
| `2-page-4.png` | `a071b62ee414a88cab0f135ecfb337121f960aad2f86ccd5fcf8c268d38fd3f1` |
| `2-page-5.png` | `5f32300853a4eb60a87b06eccfcd6aa07619196b48a6246726013e9088d0aae2` |
