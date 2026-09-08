# AC9E4LA01 runtime changes — independent review

2026-09-08 UTC. Reviewer: `english_la02_la04_audit`, separate from the runtime implementation author. Scope is the five production helper changes and scoped VM regression only. No curriculum content, browser, IXL, actual production PDF rendering, adult-response submission or publication approval is claimed.

Read current runtime audit and implementation diffs; inspected the quiz wrapper, shared runtime cleanup, PWA legacy route/load behaviour, worksheet selection/drawing context and code-owned activity script integration state. Did not change implementation source or commit any files.

## Initial finding — correction required

**R1 — authored preparation disappears at the explicit `index.html` Practice route.**

Initial `assets/year4-english-authored-preparation.js` route guard accepts only `practice`, `practice/`, `test`, `test/`; it returns before capturing the authored node at `/quiz/year-4/english/ac9e4la01/practice/index.html`. `quiz/assets/script-runtime-v115.js` recognises explicit `index.html` activities and its Practice initializer removes `.pre-read-notes`. Therefore this valid resource route loses its authored teaching notes.

Independent read-only VM reproduction used the exact production Practice cleanup block and the actual new retention utility, with a same-node DOM model and DOMContentLoaded registration order:

| Route suffix | Authored node survives | Registered callbacks |
| --- | --- | ---: |
| `practice/` | Yes | 2 |
| `practice/index.html` | **No** | 1 |

The initial regression passes **117 checks**, but tests only no-slash/trailing-slash routes. It does not include explicit `index.html` and consequently misses R1. Requested correction: extend only the LA01 retention guard to accept the explicit index route and add both Practice/Test index regression cases and out-of-scope controls. Do not broaden unrelated legacy routes merely to pass the new test.

## Other implementation assessment

- New quick-read, worksheet and visual-layer escape clauses are restricted to Year 4 English AC9E4LA01 plus an explicit authored marker. Existing Science/Maths guard logic is retained. Canonical Topic/Classroom behaviour is not rewritten by these additions.
- The legacy helpers already return on explicit `index.html` because their pre-existing route regexes exclude it; that return is safe for the authored activity. It is the new retention utility's omission, not those untouched legacy paths, that causes R1.
- The PDF reservation addition requires `self-check`, AC9E4LA01, an authored worksheet body marker, matching `curriculumCode` and exact lower-case `-w-` three-digit ID. The extra marker condition is bypassed for existing Maths/Science codes, preserving their previous reservation semantics. The change reserves room; it does not itself prove that long tasks/answer pages render without clipping.
- The retention utility preserves node identity and text and avoids duplicating a node already inside the start card. This fits the architecture's no-runtime-curriculum-authoring rule. It is intentionally not a general mutation observer or lesson renderer.
- The load-order contract matters: the actual `quiz/assets/script.js` wrapper parser-inserts `script-runtime-v115.js` using `document.write`. A normal non-async retention script immediately after that wrapper and before DOMContentLoaded can register after the runtime initializer, capture the static note, and restore it after cleanup. Loading it before runtime registration or dynamically after cleanup would not satisfy that contract. Final authored HTML must be inspected and integration-tested; the initial current LA01 pages did not yet load the new utility or carry the new authored marker/adult configuration.
- `RUNTIME-AUDIT.md` mentions an additional “Formality is a continuum” removal. That production branch is explicitly scoped to Year 7, so it is not an LA01 threat. The generic Practice `.pre-read-notes` removal is the relevant LA01 behaviour.

## Test execution and limits

Initial independent executions succeeded:

- `node scripts/validate_year4_english_la01_runtime.mjs` — 117 checks passed (R1 still reproducible separately).
- `node scripts/validate_static_topic_loader_guards.mjs` — passed.
- `node --check` for all five changed/new production helper files — passed.
- `git diff --check` — passed.

The guard regression uses a sentinel at first legacy data access. This is useful evidence that authored cases return early and unmarked/other-code controls still enter their original path; it does not execute the entire legacy renderer, asynchronous PWA script injection or browser event loop. The retention test executes the production cleanup block, not the whole quiz initializer. The PDF test evaluates the actual allocation expression, not `createPdf` or visual output. Its stated no-browser/no-PDF limitation is accurate. Keep those integration gates separate rather than treating a larger assertion count as proof of complete resource operation.

## Initial reviewed identities (not release approval)

| File | Initial SHA-256 |
| --- | --- |
| `assets/year4-english-authored-preparation.js` | `4204fb03d1f0d5a72fb06b2f705ce20018379180abd20d34f72b6c796d50a59e` |
| `assets/year4-subject-quick-read.js` | `070b110e530944b6bf04cc6f7fb05eb65011cdab8c9a9039d1c3ec9c5f0dc6a4` |
| `assets/year4-subject-worksheet-page.js` | `d8b68e57f40c223350fef5ef1d7929fcbc76dcb73298a1d5ecadae6761b30abb` |
| `assets/curriculum-visual-layer-interactive.js` | `2c4b6213f5268819040f37de332cfab9d0bfaa9088bb9c52b4e09de672dca303` |
| `quiz/assets/worksheet-pdf.js` | `15a70148fceba08227dede727814417d74519ad79156c6d24ca4608b476018c0` |
| `scripts/validate_year4_english_la01_runtime.mjs` | `042752ba92051f0b4408d1eadb46593b583bc736eec4177c62c64fc75c32d2bc` |

## Correction and independent recheck

The implementation author corrected R1 with a narrow retention matcher accepting only AC9E4LA01 `(practice|test)(?:/index.html|/?)`. The three legacy helper route regexes were not broadened. The regression now tests all six allowed route forms, with/without summary, duplicate inclusion, actual Practice cleanup, explicit listener registration, and nonmatching code/worksheet/review/result/extra-descendant routes.

Independent recheck results:

- Updated scoped runtime regression: **132 checks passed**.
- Re-ran the separate independent same-node reproduction against all six route suffixes. `practice`, `practice/`, `practice/index.html`, `test`, `test/`, and `test/index.html` all retain the authored node. The explicit-index Practice reproduction changed from failure to success.
- Separately executed the actual quick-read, worksheet and visual-layer helpers on all six relevant explicit-index routes with a throwing DOM sentinel. All returned without DOM access, confirming these legacy route exclusions remain safe no-ops.
- Static-topic loader regression, syntax checks for the corrected utility/test, and `git diff --check` passed again.

Corrected reviewed identities:

| File | Corrected SHA-256 |
| --- | --- |
| `assets/year4-english-authored-preparation.js` | `a69981e2e621deff62f2c4fcb78ba81bc9f186fee8c6786bb6bab781522de6cc` |
| `scripts/validate_year4_english_la01_runtime.mjs` | `64fd83106cf91089ee25fe677962050f163b208b508565499aa2885936edeb3d` |

The other four implementation identities remain the hashes recorded above. The initial R1 finding is preserved here for an honest correction/recheck trail.

## Disposition

**R1 corrected and independently rechecked. Scoped implementation review passes at the recorded corrected identities.** This is not complete LA01 resource or release approval. The post-publisher integration recheck below closes the local HTML/configuration and simulated assessment-flow gates. Production PDF generation/all-page review and live resource navigation remain separate. This report cannot approve curriculum content, the code's verified ledger status or a release by itself.

## Post-publisher HTML and local assessment integration recheck

Reviewed the actual nine frozen LA01 activity HTML files after root staged the approved-shape banks through the publisher **without `--reviewed`**, and after the runtime author restored the hub's intended “Choose a resource” summary. Read each full student-facing page, its inline configuration, script tags, route/data keys and local resource links. Also inspected the authored worksheet's configuration, marker and loading order; worksheet final identity is separately pending its W005 model-layout correction.

Independent assertions passed for 70 recorded metadata/configuration/script-order/report-identity checks, plus local-link and result-key checks across all ten pages:

- Canonicals, meta descriptions and robots directives match the preceding committed versions. Both attempt configurations retain every previous key/value, including storage/result keys, five-question limits, shuffle flags, name requirements and result/review/retake values; the deliberate additions are the non-empty authored bank version and `requireAdultReviewSupport:true`.
- Each attempt loads its versioned published bank, the adult helper, production UI once, the quiz wrapper, authored retention utility, guarded quick-read helper, guarded visual helper, then PWA. These curriculum/support scripts are normal parser-ordered scripts, not `async`/`defer`. The marked static preparation node is available before runtime initialization. The wrapper inserts the shared runtime before the following retention script, satisfying the already-tested DOMContentLoaded listener order.
- Both review pages load the adult helper **before** `separate-review.js`; both result pages retain their matching `data-result-key` and result script. Retake links target the same-code matching mode. All inspected same-origin resource links resolve to existing local files and do not drift to another curriculum code.
- Hub copy accurately distinguishes 48 Practice, 16 Test, five shuffled questions per attempt, automatic selected-response checking, adult-reviewed writing/speaking, and eight distinct homework tasks. Attempt/review/retake copy expressly says saving or ticking work ready does not award credit. Result copy states pending work needs an adult check before treating the result as complete. No full-test auto-marking promise remains in these inspected pages.
- Worksheet config precedes the dedicated worksheet bank and production PDF helper; guarded worksheet/visual helpers precede PWA. The body has `data-skillr-authored-worksheet="true"`, count is eight, and the page does not load Practice questions as its worksheet source.

Read `assets/pwa-register-legacy.js`'s actual `loadScript`: it strips the requested query string to a base path, detects existing script URLs by that base, and returns the existing-script branch without appending a replacement. A previously loaded static tag without its loaded marker receives load/error listeners and a 250 ms resolve fallback. Thus the explicitly preloaded versioned guarded helpers are recognised when the legacy loader later requests `v=1`; this is **source-based load-order reasoning, not an executed live PWA/network/cache test**. `pwa-register.js` remains after the explicit helpers and appends the legacy loader normally.

Independently read and reran `scripts/validate_year4_english_la01_assessment.cjs` using the existing local linkedom dependency, **without output-file writes**. Result at **2026-09-08 14:57:47 UTC: 55/55 cases passed, zero failures**. Verified all artifact hashes in root's saved `AC9E4LA01-ASSESSMENT-RUNTIME.json` still match the inspected files. The harness executes actual shared assessment/result/review logic in a simulated DOM and establishes:

- all 64 canonical/published items' full-field parity and Practice alias parity;
- all 16 adult items (12 Practice, four Test) accept typed or paper/performance completion only as pending, with zero immediate score and no pass;
- absent adult support fails closed before Start and cannot fall back to self-certified mastery;
- Test models/acceptance notes stay hidden during response and are exposed in Review;
- actual review controls can mark, revise and remark each adult response and update the result;
- pending results have no celebration/share prompt; selected correct/incorrect control cases score appropriately.

Limits remain explicit: individual published items are isolated into one-question test attempts; the harness does not exhaust all possible five-question shuffled combinations, run browser/PWA networking, or review a PDF. The 55-case count is not an independent curriculum-quality claim.

### Frozen nine-page identities

Paths below are relative to `quiz/year-4/english/ac9e4la01/`.

| Page | SHA-256 |
| --- | --- |
| `index.html` | `951391a8153a785dc5a133dfbb78bf47f405c14e5f7f269c711b433a5acf5b36` |
| `practice/index.html` | `3d33537d545a5aeaf5742602dac15456bc90460ee693ccc7d45e40f43e4559cd` |
| `practice/review/index.html` | `a289dc41c070e8d5b7d37f59b9762b8ed631b0e905baf0525c26053efdb71ec7` |
| `practice/result/index.html` | `c2369822c8a543dd9c807a34925696e1c85b26982a1b81984cef55de8b29c64f` |
| `practice/retake/index.html` | `c92b823698a857d948fe7acee6745d83925d735738cb5abaf25e224f1a0ed78d` |
| `test/index.html` | `d4226272cec44e4faf848794e0c1458e174a8ded6b7efa7c35aa68b9d030e2f0` |
| `test/review/index.html` | `e3665367b4d78895d8424eb3609ddc8e8e83f5d5045f797716968936bdf020c4` |
| `test/result/index.html` | `3d5e1961000bf4235205bb3b88127944fd8d2d3172242cd72703af93b0c99438` |
| `test/retake/index.html` | `dc9abb36d8222e95748cb637790b670c30a2e9bdf4381e370b58810dc888d6a8` |

**Post-publisher local integration disposition: PASS for these nine identities and the recorded production helper identities.** Worksheet visual/PDF review and live deployment gates must be completed separately. No browser or IXL interaction was performed by this reviewer, and no implementation source was edited.

## Final frozen worksheet integration recheck

After root reported the separate content and production-PDF reviewers' approval of the corrected worksheet, this reviewer independently rechecked its actual final bytes and integration. Both supplied SHA-256 values match:

| File | Final SHA-256 |
| --- | --- |
| `quiz/year-4/english/ac9e4la01/worksheet/index.html` | `ca50660d114cf1551ae156bd5f3eef80479d617f6c9a481d5cbfe0cef045e701` |
| `quiz/year-4/english/ac9e4la01/worksheet/worksheet-questions.js` | `b7c15d5981da4442b05dc99e701f312cd99102d2196b6ac93c768b99886f338d` |

Confirmed the final body authored marker, exact worksheet canonical, real `downloadPdfButton`, LA01 config and eight-question limit. Configuration precedes the dedicated bank; its eight unique IDs all match AC9E4LA01 and the supported self-check schema. No Practice bank is loaded as the homework source. Script order remains dedicated worksheet bank → jsPDF → production PDF helper → guarded worksheet helper → guarded visual helper → PWA, with no async/defer on those script tags. Thus the final layout correction has not displaced the required guard or PDF initialization order.

**Final scoped local runtime/integration disposition: PASS for the nine frozen activity pages, corrected shared helpers and these two final worksheet identities.** This reviewer independently approves that implementation/integration scope only. The separate content/PDF approval belongs to its recorded reviewers; no rendered-PDF or live-browser inspection is attributed to this reviewer. Complete-tree release integrity, CI/Pages and live verification remain root's publication gates.

## Latest-main compatibility — a725862

Before root's merge, independently inspected exact Git objects from new remote main `a72586289d1d1459c7a7931d8ce102e7e7a280bb`. The complete path diff from prior base `c8391301be36838384da37f1117ed0ea48eb5aaf` lists only the new `assets/f10-revision-card.js` and an eight-line additive loader in `pwa-register.js` (70 added lines total). No existing LA01/shared-helper file changes appear in that intervening diff.

| Exact latest-main file | SHA-256 |
| --- | --- |
| `assets/f10-revision-card.js` | `26156206011e430306efcb2b79af25d5039d931728532605ab6134bbcdeb564a` |
| `pwa-register.js` | `a10f42c5a8e8f759301834aa4a7fff9dc3e165c284297694c7b8ab5e9c731d24` |

The new revision helper finds the start card and returns immediately if it contains `[data-skillr-authored-preparation="true"]`, before any style creation, topic fetch, fallback or render. The new PWA clause appends this helper on canonical Practice/Test routes only; its regex does not match explicit `index.html`. The exact helper's own route regex also returns on explicit-index variants. Existing versioned LA01 helper order and PWA existing-script handling are unaffected by these additive changes.

Independent safe local DOM execution used the exact new-main revision helper, frozen LA01 Practice/Test HTML, actual shared Practice cleanup block and corrected retention utility. Tested all six no-slash/trailing-slash/explicit-index variants **before and after** cleanup/retention: **6/6 passed** with the same authored node and unchanged text, no topic fetch, no added style and no duplicate revision card. This is a focused compatibility test, not an execution of the full PWA network loader. Under the already-verified parser/DOMContentLoaded ordering, external script execution cannot interrupt the synchronous cleanup/retention listener dispatch; before that dispatch the static marker exists, and afterwards the same marked node is restored.

**Qualified compatibility disposition: no LA01 blocker identified in these exact latest-main changes; scoped compatibility PASS.** Preserve both new-main files through the complete-tree merge, then rerun release checks against the merged candidate and verify the real live route. This review does not approve the revision helper's broader unmarked F–10 behaviour or claim browser/network execution. No implementation source was changed by this reviewer.

## Final latest-main compatibility — cec61bb

Remote main advanced again to `cec61bbafcfa350fa3ca629033bf61eea408be36`. Bounded independent recheck inspected its exact revision-helper source. The intervening three-file diff changes `assets/f10-revision-card.js`, adds `assets/f10-revision-cards-data.js` and adds `reports/f10-revision-card-coverage.json`; it does not change PWA or LA01 resources. The new helper uses a static map for unmarked activities, but retains its authored-marker return **before style creation, map access/loading, topic fetch or render**.

| Exact cec61bb file | SHA-256 |
| --- | --- |
| `assets/f10-revision-card.js` | `d0c4245afe4f24f1f93cd1c316f8e7bf579bf27a1be469fdc2a545ae6742b413` |
| `pwa-register.js` (unchanged) | `a10f42c5a8e8f759301834aa4a7fff9dc3e165c284297694c7b8ab5e9c731d24` |

Re-executed the exact new helper against the same frozen LA01 DOM and production cleanup/retention lifecycle in all six Practice/Test route variants: **6/6 passed**. A throwing window/map-access sentinel and throwing fetch sentinel were never reached. No style or script was added, no revision card appeared, and the exact authored preparation node/text survived. The PWA source hash is identical to the preceding reviewed version.

**Final bounded compatibility disposition: PASS against cec61bb; no LA01 blocker identified.** This supersedes a725862 as the final compatibility base. The unrelated map contents and coverage report were not substantively reviewed or approved; preserve them as latest-main work. Root must still preserve the complete latest tree and perform the final integrity/deployment/live gates. This report is frozen after this compatibility addendum; no source implementation was edited by this reviewer.
