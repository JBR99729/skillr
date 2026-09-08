# LE01–LE05 and LY01 — shared engineering author handoff

Implementer `/root/engineering`. Author evidence only; not independent content, PDF visual, runtime or release approval. This role does not author final code-specific teaching or question banks, record review-ledger entries, publish, or access IXL/Browser.

## Bounded shared change

The existing authored opt-in in the three legacy helpers and preparation-retention utility now recognises exact LA01–LA12, LE01–LE05 and LY01. The preparation/body marker remains mandatory. Retention preserves the original exact node and its position before the summary after the actual Practice cleanup. Unmarked/invalid-marked pages, out-of-range codes, other subjects and other routes retain existing behaviour. No shared teaching renderer or scoring architecture changes were made.

The same-code self-check worksheet PDF reservation guard includes the next six when the worksheet body is marked and the item has a matching curriculumCode and three-digit `-w-` ID. These marked worksheets may use the existing integer `responseLines` field from 4–12, with the same four-line default and shared allocation/drawing count. Invalid value/type/marker/code/ID does not opt in. LA01–LA06 still ignore optional responseLines; all old paths retain existing behaviour. No paragraph, font, visual resolver, pagination or answer-guide renderer was modified.

## Authored wrapper and worksheet integration

All six code batches have nine updated quiz wrappers (activity hub, Practice/Test, and each mode’s Result/Review/Retake), preserving metadata, routes, five-question shuffled attempts and existing resource flow. The same authored mode-specific preparation appears on its mode’s wrappers, with a separate neutral hub preparation. Practice/Test wrappers load the existing adult-response helper before the runtime, require adult support, and carry the batch bankVersion. Both Review wrappers load that helper. LE03 Review displays the supplied same-mode original image references, including the independently corrected descriptions. No question content is generated at runtime.

Authors supplied exact static eight-task worksheet content and dedicated homework banks. This engineering role wired LE01/LE02/LE05/LY01 worksheet shells, authored markers, dedicated bank references and PDF asset version; added response space according to the authored line count and native-disclosure model/criteria copied exactly from authored data. LE03/LE04 authors supplied complete worksheet pages. Authored Practice support replaces the old generic worksheet aside text where this role owns the shell. Canonical questions, Topic Guides, Classroom View and teaching/source decisions remain separately author-owned and independently reviewed.

## LE05 linked worksheet order repair

The first actual production LE05 download revealed that the inherited random worksheet order placed revision before the supplied planning/drafting task. Root explicitly authorised a bounded correctness fix. Only exact LE05 configuration and code, the authored worksheet marker, a dedicated eight-item self-check bank, matching same-code fields, exact w001–w008 IDs and source-object identity can preserve source order. All other paths retain the inherited shuffle, including mixed Practice/Test selection and every other English/Science/Maths code. LY01’s author made its written tasks self-contained; it has no order exception.

The actual production LE05 download now draws w001 through w008 in order. Its second PDF is intentionally longest-stem-first layout stress from the existing QA utility, not a user-facing selection or coherent teaching order. Earlier shuffled LE05 outputs are superseded.

## Validation

The inherited runtime utility now exercises all 18 opt-in codes plus legacy Science/Maths and negative LE00/LE06/LY00/LY02, malformed suffix, invalid marker, missing node, wrong item-code and wrong item-ID controls. It evaluates the actual production allocation expression. Result: **1,632/1,632 PASS**.

The existing assessment utility accepts the next six without reducing any gate: 48 Practice/16 Test, >=8 adult Practice/>=4 adult Test, LA01's exact 12+4 adult inventory, full published/canonical field parity, actual response saving, pending state, missing-helper fail-closed behaviour and adult marking/revision remain. It additionally checks that the actual wrapper's exact authored preparation DOM node and complete inner HTML survive actual runtime initialisation. The original LA01 regression remains **55/55 PASS**.

The inherited production PDF utility accepts the six new codes and matching responseLines scope. LY01’s distinct prompts share their first wrapped line, exposing an inherited observer bug that attributed both tasks’ rules to the first ID. The observer now accumulates the full actually printed prompt and requires a unique authored match before attributing any response rule. Independent tests confirm separate 5/5 counts for the colliding first lines, reject truncated prompts and reject ambiguous full prompts. This changes the QA observer only, not the production renderer or any task. All existing text-completeness, margin, page, real SVG symbol resolution, nonblank native raster, image embedding and actual response-line checks remain. Two LA01 production regression PDFs passed, each five pages with eight four-line responses. These are production-renderer simulations with local jsPDF/linkedom, not live browser downloading or all-page visual approval. The reported executed input hashes are retained; a subsequent usage-comment-only PDF harness edit has no operative effect and must not be confused with that run's snapshot.

## Reproduction and dependencies

Dependencies are already installed; no package or lockfile change was made. Run from the checkout:

```bash
node scripts/validate_year4_english_la01_runtime.mjs
node scripts/validate_year4_english_la01_assessment.cjs --linkedom /workspace/scratch/c0dec7faa19d/qa-deps/node_modules/linkedom --code AC9E4LE01 --output /workspace/scratch/687de93465e2/le01-assessment.json
node scripts/validate_year4_english_la01_pdf.mjs /workspace/scratch/c0dec7faa19d/qa-deps/node_modules/jspdf/dist/jspdf.umd.min.js /workspace/scratch/c0dec7faa19d/qa-deps/node_modules/linkedom/worker.js /workspace/scratch/687de93465e2/le01-production-pdf AC9E4LE01
```

Use each exact code as the final argument. Assessment requires root to stage completed canonical banks into the existing published bank paths first. PDF requires the author's dedicated worksheet HTML/bank. SVG worksheets use the existing real `@napi-rs/canvas` dependency discovered via `CODEX_PRIMARY_RUNTIME_NODE_MODULES`; `PDF_CANVAS_PATH` can explicitly name it. A missing backend or unsupported visual format fails closed.

Complete current shared source SHA-256, actual assessment evidence and executed PDF input/output hashes are in `LE01-LY01-ENGINEERING-QA.json`. All-six staged assessment simulations currently pass 282/282: LE01–LE04 43 each; LE05 and LY01 55 each. These include every genuine adult response through actual pending/mark/revise paths plus selected-answer controls. Late author content corrections require refreshed staging and affected executions; the final freeze is recorded separately.

Independent shared/wrapper engineering approval is in `LE01-LY01-INDEPENDENT-ENGINEERING.md`. Independent question/teaching and all-page PDF approvals belong to their named separate reports; this author handoff does not self-approve those resources. No review-ledger or publication command was run in this role.

## Final engineering freeze

All six final staged assessment input snapshots match the current files exactly: **282/282 PASS, zero artifact drift**. Shared guard/allocation/selector suite: **1,632/1,632 PASS**. The final engineering manifest covers 74 files: eight shared production/QA files, 54 quiz wrappers, six worksheet pages and six dedicated homework banks. See `LE01-LY01-ENGINEERING-RESOURCE-HASHES.json`; canonical/derived bank hashes are also retained inside each actual assessment execution report in `LE01-LY01-ENGINEERING-QA.json`.

Current production-renderer artifacts comprise twelve variants and **83 pages**. First output in each folder is the actual download path; second is explicit longest-stem-first layout stress. These artifacts are for independent PDF review, not newly published static PDFs.

| Code | Scratch directory under `/workspace/scratch/687de93465e2/` | Pages |
|---|---|---:|
| LE01 | `engineering-le01-reviewed-pdf` | 7 + 7 |
| LE02 | `engineering-le02-final-pdf` | 6 + 7 |
| LE03 | `engineering-le03-reviewed-pdf` | 8 + 8 |
| LE04 | `engineering-le04-reviewed-pdf` | 7 + 7 |
| LE05 | `engineering-le05-ordered-final-pdf` | 6 + 6 |
| LY01 | `engineering-ly01-final-reviewed-pdf` | 7 + 7 |

Each folder’s `production-pdf-results.json` records the exact input and output hashes actually executed. The final combined QA report preserves them rather than relabelling earlier executions with newer source hashes. LE02’s reviewed outputs preceded the LE05-only selector correction; the selector explicitly excludes LE02, and the renderer is unchanged. LE03/LE04/LE05 outputs preceded the harness-only complete-prompt observer correction; no production bytes or rendering logic changed for that correction. Independent all-page approvals are separately recorded by the assigned reviewers, including the final LY01 review after spacing/content fixes. This role makes no live browser, deployment or publication claim.
