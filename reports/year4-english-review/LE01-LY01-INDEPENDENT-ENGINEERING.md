# LE01–LE05 / LY01 independent engineering review

Reviewer: independent_engineering_review (separate from engineering and content authors). Date: 2026-09-08.

## Decision

**FINAL ENGINEERING APPROVAL: eight shared files, all 54 activity wrappers, six dedicated worksheet surfaces and all 384 canonical/published items through actual runtime parity. Exact final identities are in LE01-LY01-INDEPENDENT-ENGINEERING-HASHES.json. Separate independent literary/content and PDF visual reviews, complete-tree release checks and live deployment checks remain required. This report alone does not authorise the review ledger or publication.**

Read `AGENTS.md`, `docs/static-curriculum-architecture-v2.md` and `docs/skillr-long-life-curriculum-content-standard.md`; inspected the complete shared production and validator diffs against this checkout's HEAD, plus surrounding production allocation and initialisation logic. No production files edited by this reviewer.

## Findings

- The four activity utilities extend the existing opt-in from LA01–LA12 to exactly LE01–LE05 and LY01. Anchored code matches exclude LE00, LE06, LY00, LY02 and longer lookalikes. The required authored marker remains exact `true`; unmarked, `false` and `yes` controls continue into the legacy path. Existing maths/science handling is retained.
- Preparation retention preserves the same DOM node after the existing Practice runtime cleanup, retaining full authored markup/media without rendering lesson content from data. The utility does not affect worksheet, result, review or unsupported-code routes. Its script must remain after the quiz runtime in each actual wrapper.
- The PDF change extends existing same-code, correctly formed `-w-NNN`, marked self-check reservations to the six codes. Optional response lines remain integers 4–12 only; invalid types, counts, IDs, cross-code items and unmarked wrappers preserve their prior allowance. LA01–LA06 stay at four lines, LA07–LA12 retain the prior opt-in and unrelated science/maths controls are preserved. Source drawing uses the validated count; the change does not alter image rasterisation, paragraph rendering, selection or answer guides.
- Validators are strengthened, not weakened: actual activity initialisation now requires exact authored preparation node and innerHTML retention and no duplicate. The runtime suite expands positive, negative and invalid-marker coverage. PDF validation merely extends its supported exact codes and expected optional line counts; complete text, raster pixels, image count, bounds and response-line checks remain.
- Existing assessment inventory gate is **at least eight adult-review Practice tasks and four Test tasks per code**. This is unchanged. Draft content must satisfy it; a four-adult Practice plan would fail and has been reported to the coordinator before author freeze.

## Independent execution

1. `node scripts/validate_year4_english_la01_runtime.mjs` — **PASS, 1591 checks**. Executes production guards, production cleanup/retention, and the production PDF reservation expression with bounded positive/negative controls.
2. `node scripts/validate_year4_english_la01_assessment.cjs --linkedom /workspace/scratch/c0dec7faa19d/qa-deps/node_modules/linkedom --code AC9E4LA01 --output /workspace/scratch/687de93465e2/independent-engineering-la01-assessment.json` — **PASS, 55/55 cases**. Real current LA01 wrappers and runtime/result/review scripts in a simulated DOM; includes 64-item canonical/published parity, all 16 adult responses with typed and paper submission, pending scoring, adult mark/revise cycles, missing-helper failure and selected correct/incorrect controls. This establishes a legacy runtime regression control, not a new content approval.

These are local script/DOM checks. No browser, live network, PWA, full PDF visual inspection, content accuracy or release-integrity approval is claimed here. The engineer's earlier production-PDF results are corroborating author evidence only and were not counted as independent rendered-page review.

## Reviewed shared artifact identities

| Path | SHA-256 |
| --- | --- |
| `assets/curriculum-visual-layer-interactive.js` | `bd3c59d6daa296bf6b9eb9ea01cc066cc34c2c34d719211cdb9ec807f789f22f` |
| `assets/year4-english-authored-preparation.js` | `3d2481d94de1cb7fa01c9e5ebf67f358a101e13048a46a7e0d803b5d13ba7455` |
| `assets/year4-subject-quick-read.js` | `77546ac3c3dd05aca47e19809eebf9e45563fd1700d82b6f409a99d7bdb1c3e3` |
| `assets/year4-subject-worksheet-page.js` | `c25853c150c04361436bc57a990a9171177b82c6d736f99b1271642efaa45929` |
| `quiz/assets/worksheet-pdf.js` | `cbd7e0c97f0a212a400d8ca4c1b2d3c88db4f7916ef886e732b3eb5185dc580d` |
| `scripts/validate_year4_english_la01_runtime.mjs` | `dd820c54dace96b95de39f534c5ec6f6455ec278b0f908c982d3a7663e16c8de` |
| `scripts/validate_year4_english_la01_assessment.cjs` | `55360cf23f14944ae00972b3b89d83313fbcb4b30bea53f31d5b0edf60534145` |
| `scripts/validate_year4_english_la01_pdf.mjs` | `75ac44d9164732dac5d48e7fcc8be5f346ec19f53f0fb3442201a246c24b7d6f` |

## Final wrapper integration review

### AC9E4LE02 — nine wrappers approved

Inspected the complete token-level diff for the Activities page and both Practice/Test start, result, review and retake pages. Existing title, description, robots and canonical metadata are identical to the baseline. Authored mode-specific text matches the author snippets (heading level adapted to the wrapper); full-bank counts are clearly separate from the unchanged five-question shuffled attempt. Adult helper precedes the runtime and Review script; retention utility follows the runtime. Same-code Topic Guide, Classroom View, Worksheet, Practice, Test and review/retake links resolve locally. The original Activities page used only Test preparation; reviewer requested correction and rechecked the author's new HUB snippet, which now describes both eight Practice and four Test adult tasks.

Independent actual assessment run: **43/43 PASS**, including full 64-item canonical/published parity and all 12 adult tasks through typed/paper pending responses, marking/revision and missing-helper controls. Independent static wrapper check: **9/9 PASS**, 116 existing local links/resources found. The unchanged `/icons/apple-touch-icon.png` reference is absent from this checkout, just as in the baseline; this unrelated pre-existing icon defect does not break a curriculum-resource route and was not repaired in this batch.

This approves wrapper engineering only. Content and worksheet/PDF approval are separate.

| Path | SHA-256 |
| --- | --- |

| `quiz/year-4/english/ac9e4le02/index.html` | `e1a90f89e5afe619e405ff8cbc47f187a9283afbba93bcad68f0ec8ad46802a7` |
| `quiz/year-4/english/ac9e4le02/practice/index.html` | `c5fec2a1ad1f26afb7084956ba6321505c7920c8d7fad64c6b78a7833cd64da7` |
| `quiz/year-4/english/ac9e4le02/practice/result/index.html` | `5ca58c962d6622b24f5411763de1dab685f4283077f88023dcdf0af15e20413b` |
| `quiz/year-4/english/ac9e4le02/practice/review/index.html` | `c9cc96368dd47de334c05fde5fe0808a36c70e7ae80fe7fb8cb7d7446e36c211` |
| `quiz/year-4/english/ac9e4le02/practice/retake/index.html` | `39c2c20b3227552cdfcde1e9df0e5d103bea3dc0070517c93c89a9339b3f6a68` |
| `quiz/year-4/english/ac9e4le02/test/index.html` | `04fb7db839c14cb4cee812c9da8f9992e5ba77657d4f51b9a368c515d04061e3` |
| `quiz/year-4/english/ac9e4le02/test/result/index.html` | `988383f56f35195b93bfc5532900a0e98b209be41cbfecf9a611909a29572e79` |
| `quiz/year-4/english/ac9e4le02/test/review/index.html` | `c662f5ff67812c5b66e162f6945f87baba00d4558b3d72c3f7f13644dafea39f` |
| `quiz/year-4/english/ac9e4le02/test/retake/index.html` | `b0e8e681de012c1950938b79331074eff7eefb718983780ff9f9b24cb177d158` |

Historical checkpoint, superseded by the final completion below.

## Follow-up: LE05 linked worksheet task order

The coordinator identified that its linked plan/draft/revise sequence was being shuffled by the existing PDF selector. Independently reviewed the engineer's narrow correction: only exact `AC9E4LE05` from both resolved code and configuration, exact authored worksheet marker, eight printable/dedicated items with matching object identity, same-code self-check type and consecutive `w-001`–`w-008` IDs return a copied authored-order array. Earlier split-bank selection still takes priority; every other code, invalid marker/config/limit/ID/type/count and foreign pool retains existing shuffling. No source array is mutated.

Independent production runtime/selector regression: **PASS, 1,632 checks**, including 41 new actual-selector controls. The actual-production PDF harness additionally asserts LE05 first-download drawn task IDs in order; this is a strengthened assertion, not a substitute for separate complete-page PDF inspection. The three affected shared artifact hashes above have been updated to this approved final order-fix version. Other five shared artifacts retain their prior approved hashes.

### AC9E4LE01 wrapper checkpoint

Nine actual wrappers passed independent authored-snippet, unchanged metadata, configuration, script order and 125 local resource checks. Actual canonical/published assessment: **43/43 PASS**.

| Path | SHA-256 |
| --- | --- |
| `quiz/year-4/english/ac9e4le01/index.html` | `a8e0dab6c09ea4929707a30e6abcdcbe19398309bd6e95d100af823cf5af9f42` |
| `quiz/year-4/english/ac9e4le01/practice/index.html` | `ebaed82f910a6ab5a21d74d59e321086a19284373e260c46ef21a1d73b5c218b` |
| `quiz/year-4/english/ac9e4le01/practice/result/index.html` | `875b73e8aa2860a1e8ecb2a56fd04a89b90939b4fcd2564e125118f44aed8312` |
| `quiz/year-4/english/ac9e4le01/practice/review/index.html` | `539c44abb8ee64fe95436dc7063eff73824c699c63c09f4521cf3ae6fd406e06` |
| `quiz/year-4/english/ac9e4le01/practice/retake/index.html` | `53b12706ff32244bf98e01908ef6ef47286549f619004f877076cda330fd47e3` |
| `quiz/year-4/english/ac9e4le01/test/index.html` | `d099c9373cd567239fc89515419910def10595f9f8639f0baff7076f3fdfd097` |
| `quiz/year-4/english/ac9e4le01/test/result/index.html` | `9d7ae63f8ec63c9f81a2d4ed0c6ab6b66fdadb1a9b84653b400ac3f5f545fc3e` |
| `quiz/year-4/english/ac9e4le01/test/review/index.html` | `2ca4680a3cbf12561fd1dc094b479141cd9365dc7061f313e607eefc25e8f243` |
| `quiz/year-4/english/ac9e4le01/test/retake/index.html` | `6df31587db1b40ed9f18a879986504319371a676930ae46fcca599ed39f6b70b` |

### AC9E4LE03 wrapper checkpoint

Nine actual wrappers passed independent authored-snippet, unchanged metadata, configuration, script order and 125 local resource checks. Final rerun: **43/43 PASS**, including exact canonical/published parity and corrected Review reference descriptions.

| Path | SHA-256 |
| --- | --- |
| `quiz/year-4/english/ac9e4le03/index.html` | `64c8efa2f73eae8e8064e98a46a993fcbd3b15ab99edda1a6507c8627a999ae3` |
| `quiz/year-4/english/ac9e4le03/practice/index.html` | `fa816620d132f908439e2052ba40e55a4c5e44797bec51fa5d2b2cc32fddc8cc` |
| `quiz/year-4/english/ac9e4le03/practice/result/index.html` | `a1a075e5525d348054cfb9127614c336bd98aa7c75ed1866c8c183bee8c4a18d` |
| `quiz/year-4/english/ac9e4le03/practice/review/index.html` | `781757efd31708855459f808c7e36152a59033e1820de6462d4ec8fd3eaa0cca` |
| `quiz/year-4/english/ac9e4le03/practice/retake/index.html` | `d703aa2e3547ebe82d4e96c9287909aaafca530633cfe3af7753ee06c1fdc417` |
| `quiz/year-4/english/ac9e4le03/test/index.html` | `110554d1446c5bb32e835169cf54913a718631d8b0921957c6c3ec95974256fd` |
| `quiz/year-4/english/ac9e4le03/test/result/index.html` | `bb00986ec8f5f884023a4663328ef66560c5ef51263fb50e2dcab0f40f1f2cc7` |
| `quiz/year-4/english/ac9e4le03/test/review/index.html` | `deae0a126a922ec18b31970c4828d13028867fec965a4dd821713a356b4a6c7b` |
| `quiz/year-4/english/ac9e4le03/test/retake/index.html` | `5f3f2ea0a5dd161c6f6546643eebc82e44b3d31ddbf2ac58c177a2f5b925a98b` |

### AC9E4LE04 wrapper checkpoint

Nine actual wrappers passed independent authored-snippet, unchanged metadata, configuration, script order and 125 local resource checks. Actual canonical/published assessment: **43/43 PASS**.

| Path | SHA-256 |
| --- | --- |
| `quiz/year-4/english/ac9e4le04/index.html` | `4ffd9aa97b6324de1212e79d2f2d14eb5cb7788b683ebb422257bf8bbb5e5f79` |
| `quiz/year-4/english/ac9e4le04/practice/index.html` | `0cfa52cabae4032e26b054ff8fe6145e790e08e363ddbda2ce5273976f454aaa` |
| `quiz/year-4/english/ac9e4le04/practice/result/index.html` | `5055cc291c6f792ece5fa32a3329e25315a9840f395e45fa033fb6c026d05129` |
| `quiz/year-4/english/ac9e4le04/practice/review/index.html` | `65270b55c6afaa17fe3caaedae36c7ec3a70889d44b451c732ab5ab525ef7bea` |
| `quiz/year-4/english/ac9e4le04/practice/retake/index.html` | `db5c687855f88db237c754c540aa7c9c9488c2a13d11989d92c5aa273d770a08` |
| `quiz/year-4/english/ac9e4le04/test/index.html` | `c4dd88010760ed6cfa5b81f5202386720046696db03643111de7727cf0c19ca5` |
| `quiz/year-4/english/ac9e4le04/test/result/index.html` | `a6a07ffb3a366bb82853313320a5c1dd5b4b7c1402f4d4ea42ba6c4f4dd90d65` |
| `quiz/year-4/english/ac9e4le04/test/review/index.html` | `51bcc644ce5abf8cf295cc155063d4faeab5b172546e9de7400b8598008d31a5` |
| `quiz/year-4/english/ac9e4le04/test/retake/index.html` | `6447ed68bf9081782aff9490a5f4fa5c1e81c966d639713b7cc8821cc6d647ea` |

### AC9E4LE05 wrapper checkpoint

Nine actual wrappers passed independent authored-snippet, unchanged metadata, configuration, script order and 125 local resource checks. Actual canonical/published assessment: **55/55 PASS**.

| Path | SHA-256 |
| --- | --- |
| `quiz/year-4/english/ac9e4le05/index.html` | `3150bf42dd4750ffde08fe95d81abbab15d7b2b3da335265e49c790ca1e5c40a` |
| `quiz/year-4/english/ac9e4le05/practice/index.html` | `178616c33e2d41555c91e355d9d4d610fa511a43fcd12fde1f4de2e6facc9c41` |
| `quiz/year-4/english/ac9e4le05/practice/result/index.html` | `52d40bdb0b418adfd6c04d9f058e0b30443811e736cb2fc6cf15b4fd6d9c237f` |
| `quiz/year-4/english/ac9e4le05/practice/review/index.html` | `dc55551b9d62e7abdc754030071ede5f66354a764beeb3cffd406050e7bc3be7` |
| `quiz/year-4/english/ac9e4le05/practice/retake/index.html` | `eeb7bff7b063a6169acbbef876eeeff90ea0ef9142530eb9e2c05401d489cc8b` |
| `quiz/year-4/english/ac9e4le05/test/index.html` | `13c0ffe30b7b4c9d660511011024cbef40e29357cdff2b7c713783a3f7d4a34d` |
| `quiz/year-4/english/ac9e4le05/test/result/index.html` | `4fb6086c789ce1ea77c852b1b92dbeaac705058cb671a624876e0d7663218660` |
| `quiz/year-4/english/ac9e4le05/test/review/index.html` | `401319426e9c97521635526640b0c4079fc9bceef939035246b7f9fc39a85b1f` |
| `quiz/year-4/english/ac9e4le05/test/retake/index.html` | `18db71919b18cc43bf8df4df2aaafc56104db0b79e3f15141e022e6d82113f12` |

## Final completion

All six actual assessment suites independently pass: LE01/LE02/LE03/LE04 each 43/43, LE05/LY01 each 55/55, total **282/282** cases. All 384 item fields have canonical/published parity. All authored adult tasks passed typed/paper pending-response, mark/revise/result and missing-helper controls; selected correct/incorrect controls pass. Final current input hashes were checked against every executed report before the companion snapshot, with no drift.

All 54 activity wrappers passed independent author-snippet, unchanged title/description/robots/canonical, configuration, script-order and local resource-link checks. All 48 worksheet tasks have complete exact prompts, model answers and adult guidance in static HTML, authored worksheet markers and dedicated banks. LE03/LE04 correctly use relative same-directory bank URLs. After full checkout, the previously missing apple-touch icon exists; no unrelated icon repair was made.

LE03 Review drift was identified after SVG content corrections: the engineer reinserted final author reference snippets. Both actual Review sections now match exactly (four Practice and two Test pictures); all local SVG assets exist. Updated final wrapper hashes replace earlier checkpoint values in this report and are captured in the JSON companion.

The final PDF observer correction was independently inspected: it accumulates complete actually printed stems before assigning response rules. Exact observer blocks were executed with same-first-line distinct prompts (separate five/five counts), truncated full prompt (rejected), and ambiguous full prompt (rejected). All original complete-text, margin, real raster, image-count and response-count gates remain. No production PDF renderer or source content was changed for this correction; complete rendered-page approval belongs to the separate PDF reviewers.

Read-only actual production guard/selector suite remains **1,632 PASS**. No browser, network, PWA or live deployment claim is made by these local script/DOM checks. The companion records final reviewed artifact identities; later changes require affected review/parity to be rechecked.
