# LA02–LA06 shared integration — independent engineering review

Reviewed 2026-09-09 Australia/Sydney by `la02_author` in a separate **engineering reviewer** role. Root authored the five shared-script changes, three QA-utility changes and nine LA02 activity wrappers reviewed here. This reviewer authored LA02 lesson/bank/homework content, so **this report does not independently approve that content or its PDFs**. `batch_supplement` owns that separate review. No implementation file, wrapper, publisher, ledger or Git state was edited by this engineering review.

## Decision and precise scope

**PASS for the root-authored shared LA01–LA06 marker/route integration and LA02 wrapper/runtime integration at the hashes below, after two corrections were applied and independently rechecked.** This is not blanket approval of LA03–LA06 wrappers, their content, future changed artifacts, browser operation, network loading, Pages or live release. Those code-specific gates remain required as each resource becomes ready.

Read current repository/static/content/English instructions earlier in this assignment; inspected the complete diff against local HEAD for the five shared scripts and three parameterized QA utilities. Read the shared guard/retention/PDF-allocation paths and complete assessment harness. Inspected the nine LA02 wrappers, their configurations, script sequence, result keys, canonical preservation and resource links. Compared the actual DOM report's input hashes with current files and reran the meaningful runtime checks independently.

## Findings, corrections and recheck

1. **LA01 inventory gate was weakened by generic parameterization.** The original exact 16 adult-item inventory had become at least 8 Practice +4 Test, potentially allowing loss of four reviewed LA01 tasks. Root restored explicit LA01 counts of **12 adult Practice +4 adult Test**, while retaining the next-batch minimum. Independently read the corrected conditional and reran LA01: **55/55 PASS**. All existing substantive response/storage/review/negative-control checks remain.
2. **LA02's primary activity-hub Teacher slide button retained a missing fragment target.** The new support link worked, but the original button still used `#teacher-slide`. Root changed that primary link to the actual same-code `teacher-slides/` route. Independently confirmed the fragment is absent and the button points to the existing Classroom View directory. No architecture replacement is involved.

No unresolved engineering blocker was found within this reviewed scope.

## Shared behavior and regression evidence

- The three legacy-content helpers extend only the exact Year 4 English code match from LA01 to LA01–LA06. The relevant authored preparation/worksheet marker must be present before bypassing legacy content. Unmarked resources and LA07, LA10, LE01 controls still enter their legacy paths. Existing Science and Maths branches are unchanged. Scripts' nonmatching `/index.html` route behavior is unchanged; retention explicitly covers those authored entry variants.
- The retention helper remains a small DOM-preservation utility, not a lesson renderer. It captures the existing marked node and start card, loads after the quiz runtime registers its initializer, and restores the **same node** before the summary or appends it when no summary exists. Exact text and node identity remain unchanged; duplicate inclusion does not duplicate the node. Routes are anchored to Practice/Test entry pages only, including slash/no-slash/index.html; unrelated codes, worksheets, review/results and extra path segments are excluded. Missing marker/node/card does not install retention.
- PDF reservation now includes marked LA01–LA06 self-check worksheets, requiring matching curriculumCode and exact same-code `-w-` plus three-digit ID. Unmarked English, Practice IDs, mismatched codes, malformed IDs and non-self-check types retain the prior allowance. Four 9 mm response lines and the 46 mm reservation remain beside a qualifying prompt; the actual paragraph/pagination/drawing implementation is unchanged. Existing Science/Maths allocation remains unchanged. This is an allocation review, **not visual certification of generated pages**.
- Independently ran `node scripts/validate_year4_english_la01_runtime.mjs`: **341 checks PASS**. It executes actual production guard code, the extracted unchanged runtime cleanup block and actual PDF allocation expression in a VM, with preserved negative controls. It is a scoped simulated-environment regression, not a browser test.
- The PDF harness parameterization changes only the bounded code argument and code-owned input paths/assertions. It still invokes the actual production download handler and PDF generator, challenges a second longest-stem-first order, checks every complete task/model/adult-guidance field and page/text margins, and fails closed on visualHtml without real rendering support. Do not use its text/margin PASS as visual approval; every actual page still requires another reviewer.

## LA02 wrappers and actual assessment-flow evidence

All nine wrappers retain their existing canonical URLs, metadata and storage/result identities. The two attempt configs preserve five-question shuffled attempts, existing name requirements and thresholds; only the authored bankVersion and `requireAdultReviewSupport:true` are added. Both load the matching published question bank with `20260909-year4-english-la02-la06-v1`; adult support loads before the quiz runtime, and the marked-node retention helper follows runtime before PWA registration. Both Review pages load adult support before the shared review script. Result pages use their existing correct result key and result script; Retake links resolve to the same mode. The activity hub retains Topic/Worksheet/Practice/Test and now has a working primary Classroom route.

The displayed preparation text is checked here only for DOM identity/placement and no answer-key injection by root's wrappers; independent approval of this reviewer's authored words belongs to the separate content reviewer.

Read and hash-checked `AC9E4LA02-ASSESSMENT-RUNTIME.json`: **43/43 PASS**; independently reran the parameterized harness with the same result. It checks canonical/published parity for all 64 fields/items, actual helper/UI/runtime/result/review scripts, and all 12 adult items with both typed and paper submission. Empty work cannot submit, absent adult helper fails closed, responses remain pending/unscored until adult review, Test models/criteria stay hidden until review, Meets/Needs/Meets revisions update saved score and result, and pending results do not show celebrations. Correct/incorrect selected-response controls pass in both modes. It uses actual production logic with simulated DOM/browser APIs and no network; it does not assert browser download or full five-question live-session behavior.

Compatibility rerun for existing LA01: **55/55 PASS**, retaining all 16 reviewed adult tasks and their substantive checks. Existing LA01 content was not edited or reapproved here.

## Reviewed root-authored artifact SHA-256

- `assets/curriculum-visual-layer-interactive.js`: `21ab4a633714061ede2acbf144e4589c28fc4fd6916065b7df629a2d95c93e74`
- `assets/year4-english-authored-preparation.js`: `0e2371feb260f0d509842940394659b68e221de06bae65b04b216b7a4b03abd5`
- `assets/year4-subject-quick-read.js`: `744bcc0fd6e6d9b7f0778a310f478e8776c5f637450133d4085d94d2c247cf0c`
- `assets/year4-subject-worksheet-page.js`: `d31889d7900036e69cff78e6569dc42f20056fd4251261f311d609829144608c`
- `quiz/assets/worksheet-pdf.js`: `e49d7b681c2024bedaf23256d6b8e82be900f579846f1057f17b18ee2c3051f4`
- `scripts/validate_year4_english_la01_runtime.mjs`: `6d6045fc300a45938931be4e9f9e53409dcaad32aab740357c52982dddcc32ca`
- `scripts/validate_year4_english_la01_assessment.cjs`: `6bfa232bfba054f6d3148071ac16bb9e17f77c23909abeb265bfd5d576dbe98d`
- `scripts/validate_year4_english_la01_pdf.mjs`: `5fa129bd96ea357f030d044c9591a421be70e901d005e5c3fd39e7b4391a7b49`
- `quiz/year-4/english/ac9e4la02/index.html`: `61eaef1da70138db0efdb08047e3734f1284ab0e2953a25a257b95e6f887d749`
- `quiz/year-4/english/ac9e4la02/practice/index.html`: `a0486edca067b6b6629cb17f6d4f67b0fb6f0e81acc3acb5e108c0f43b3d270e`
- `quiz/year-4/english/ac9e4la02/practice/result/index.html`: `ac21d45fc7b401fcda5c014e5748dd3d1a0c65b0fd8b3d280964c3ffa691025d`
- `quiz/year-4/english/ac9e4la02/practice/retake/index.html`: `6897b0321bc5a1499235fc3956a2859c041385b737d362f1532ca9d8479c9eff`
- `quiz/year-4/english/ac9e4la02/practice/review/index.html`: `7ca26677aac1f207d461161240b4784c90db990aba4accb3b7cb1413b31f270e`
- `quiz/year-4/english/ac9e4la02/test/index.html`: `d087a3d8e41719a12009ce7183076aaef64aa9c121fa7e1db156b9875de1f38c`
- `quiz/year-4/english/ac9e4la02/test/result/index.html`: `1b04cf11258009e2e626fc967f50559976f0223b9abb2b3fd62bd84060c513a3`
- `quiz/year-4/english/ac9e4la02/test/retake/index.html`: `4464f8a37e7c55f909f567a716ebe3ebfdba26bddcc282173758320a1df84e90`
- `quiz/year-4/english/ac9e4la02/test/review/index.html`: `b09bc056d6ee80016c6487edecc4d2f8f49ac2d79590721e6c487ec029f57e4b`
- `reports/year4-english-review/AC9E4LA02-ASSESSMENT-RUNTIME.json`: `0786a751028f359d7a83b8a86118a171165ed26bf63d5292e0db6e73fdf97e57`
