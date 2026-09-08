# LA07–LA12 — shared engineering author handoff

**Frozen for independent engineering review, not independently approved.** Implementer `/root/la02_author`, 9 September 2026 Australia/Sydney. This subtask does not approve code-owned teaching or worksheets (especially this author's LA08 content), all-page visual PDF quality, live browser operation or release. No git, browser/IXL, wrapper or code-owned content changes were made in this engineering role.

## Bounded production changes

The three legacy helpers and the preparation-retention helper now match exact LA01–LA12 (anchored `(?:0[1-9]|1[0-2])`) instead of LA01–LA06. An authored preparation/body marker is still required. Retention continues to preserve the exact existing node and its order; no text extraction/recreation or teaching rendering was added. Existing route handling, including retention's explicit index.html variant, is preserved. Unmarked pages, LA13, LA00, LE/LY, unrelated modes and existing Science/Maths paths retain their previous behaviour.

The production PDF reservation guard extends that exact marked same-code worksheet range. Root subsequently authorised a concrete response-space fix for LA12 W008: **only marked LA07–LA12 self-check homework with the same curriculumCode and valid same-code `-w-` three-digit ID** may use an optional integer `responseLines` from 4 to 12. Invalid/missing values default to four. Reservation is count × 9 + 10 mm and actual drawing uses the same validated count. LA01–LA06 and Science/Maths ignore this new optional value and retain four lines/their previous reservation. LA12 author supplied W008 `responseLines:8` and expanded its static HTML space. No other production PDF resolver, font, paragraph, pagination, image or answer-guide logic changed.

## Existing harness changes

The assessment utility only extends its accepted code argument to LA12. It preserves every substantive gate, particularly LA01's exact 12 adult Practice +4 adult Test inventory. The runtime utility exercises all twelve marked codes and negative LA13/LA00/LE controls, exact node identity/order after the production runtime cleanup, invalid/absent markers, unchanged legacy access, and the actual production allocation expression. It adds meaningful optional-line-count boundary/type/scope tests, not an independent replacement allocation implementation.

The PDF utility still invokes the actual production download handler followed by a longest-stem-first order. It still checks every full task, model and adult explanation, text margins and pagination. For visual worksheets it now loads actual `@napi-rs/canvas` (available through the primary runtime), exposes browser-like Image/canvas APIs, and decodes the actual Blob URL produced by production `rasteriseSvg`. The production `printableSvg` resolver is executed unchanged, including its actual `<use>` resolution. Native canvas draws the decoded SVG on the production white backing and supplies its actual PNG to jsPDF. There are no blank placeholders, rewritten production renderer, removed completeness assertions or substituted PDF.

Controls exercise real `<use>` expansion and verify red and blue pixels at known positions; a missing symbol must reject before rendering. Raster PNG hashes, dimensions and nonwhite pixel counts are recorded; a blank raster fails. Every SVG question must produce a real embedded image inside page margins. Unsupported non-SVG visual forms and unavailable native rendering fail closed. All text-only worksheets remain dependency-free. Actual horizontal response rules are counted per task (excluding fixed running-header/footer rules) and checked against the bounded expected count. Input hashes snapshot the actual page, bank and production source read for the run, avoiding a later file mutation being misreported as the executed source. This is a native-canvas simulation of browser image APIs, not evidence of live browser equivalence or live downloading.

## Executed checks and evidence

- Runtime/guard regression: **690/690 PASS** at the frozen source below.
- Existing LA01 actual assessment simulation: **55/55 PASS**, keeping its original 16 adult responses and substantive gates. LA08 actual assessment simulation: **43/43 PASS**. This does not self-approve LA08 teaching content.
- LA01 production PDF regression: all eight tasks still draw four lines. In deterministic longest-first order, all **five decoded PDF page-content streams are byte-for-byte identical** between prior HEAD's production PDF script (`e49d7b681c2024bedaf23256d6b8e82be900f579846f1057f17b18ee2c3051f4`) and the changed script. Whole-file IDs/timestamps were not compared. The final later production change was comment-only; the operative expressions are those tested. Earlier LA02–LA06 keep the same unchanged default expression path; no unsupported claim of regenerating every older PDF is made.
- LA10 final engineering run: two actual production PDFs, six SVG question images each, actual 1600×750 raster images and all eight four-line responses. Complete questions/models/guidance and text/image margins pass. A rendered page from the preceding same-logic LA10 run was inspected to confirm visible artwork, labels and writing space. **This one-page engineering spot check is not all-page visual approval.** Independent reviewers must inspect every page from final code content.
- LA12 final engineering run: two actual production PDFs, W008 exactly eight lines and seven tasks exactly four. Text completeness/margins pass. These are production artifacts available for independent all-page review.
- Syntax and scoped whitespace checks pass. No new broad dependency or package-lock change was introduced.

Complete actual input/output hashes, raster hashes/counts, per-task response counts and page counts are saved in `LA07-LA12-ENGINEERING-QA.json`. Source/worksheet authors may still apply independent content corrections; those require refreshed PDFs and input hashes. The engineering author has not marked any content verified or published anything.

## Reproduction

```bash
node scripts/validate_year4_english_la01_runtime.mjs
node scripts/validate_year4_english_la01_assessment.cjs --linkedom /workspace/scratch/c0dec7faa19d/qa-deps/node_modules/linkedom --code AC9E4LA01 --output /workspace/scratch/1b8e561832f8/la01-next-six-compatibility.json
node scripts/validate_year4_english_la01_pdf.mjs /workspace/scratch/c0dec7faa19d/qa-deps/node_modules/jspdf/dist/jspdf.umd.min.js /workspace/scratch/c0dec7faa19d/qa-deps/node_modules/linkedom/worker.js /workspace/scratch/1b8e561832f8/la10-next-six-engineering-frozen-pdf AC9E4LA10
```

`PDF_CANVAS_PATH` can name an installed @napi-rs/canvas package; otherwise the harness checks the primary runtime's node_modules and normal Node resolution. Actual final LA12 files are under `/workspace/scratch/1b8e561832f8/la12-next-six-engineering-frozen-pdf/`. LA10 files are in the corresponding LA10 directory above.

## Frozen engineering artifact SHA-256

- `assets/curriculum-visual-layer-interactive.js`: `d7cf4bb6f9378015f7c2cf76fc675e51d5171cda18fce93fc5e87a6bdf376a37`
- `assets/year4-english-authored-preparation.js`: `cbfa439229830f7347faa033c621be4351f1f263edd3420cd7579b614bef16a4`
- `assets/year4-subject-quick-read.js`: `44719e44cec06bcd8a099898afd05cc781d4075bf99342fedd620122cfe82381`
- `assets/year4-subject-worksheet-page.js`: `fcca35b07f229657b9edfb3c77594efb327d63c331f9c877b1a957c82c36b575`
- `quiz/assets/worksheet-pdf.js`: `5e05c5a5caa4d2910ee79fd8e7c8247a6975864791f38fe3c7a484311f9d6a8e`
- `scripts/validate_year4_english_la01_runtime.mjs`: `e0b7e0fabcf048dfb96a8c9f976a788f9874dca500042aa02b35f341407f5b87`
- `scripts/validate_year4_english_la01_assessment.cjs`: `04bb6080be58a06603126bee637c85ae5861324b85fd6782bf0ec9df0a7030fe`
- `scripts/validate_year4_english_la01_pdf.mjs`: `467977729f8f35b6e7d9155c8574c3b5f3e8518bc7a587389199c53480b965eb`
