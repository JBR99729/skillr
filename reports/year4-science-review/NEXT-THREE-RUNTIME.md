# U04/H01/H02 runtime integration QA

Result: **70/70 production-script runtime cases PASS;18/18 PWA duplicate-load cases PASS.** No implementation fixes were needed. Expected release bank version: `20260908-year4-science-next-three`.

Adapted the previously established first-three production harness for AC9S4U04, AC9S4H01 and AC9S4H02 after the root confirmed wrapper integration was ready. Executed the actual local production scripts in a linkedom VM, including the existing shared quiz runtime, authored preparation helper, adult-review support, result/review scripts and legacy content helpers. No protected shared runtime was modified.

Evidence covers:

- All192 canonical-to-published question identities, audio prompts, options, keys, explanations and visual metadata;48Practice+16Test per code.
- Explicit intended practical mix:4adult-review items in H02Practice (P045–048), none in the other five banks. Every practical prompt was submitted through both typed-response and paper-response paths, initially remained unmarked/pending and was only scored after the adult’s review action. Missing adult-support helper prevents starting.
- Correct and incorrect single-answer marking, saved code/mode/version/question/answer/explanation identity and same-code review routes.
- Every published single-answer visual model’s saved-review rendering, including secondary U04 models. Saved models reject mismatched bank version, question text, explanation, correct answer, a different curriculum code’s asset and an external asset.
- All six authored preparation nodes survive shared initialization and subsequent legacy quick-read/concept helpers as the same node with unchanged content and no generic injected picture.
- All three authored worksheet bodies and PDF buttons survive legacy worksheet/visual helpers; all three unmarked controls still enter their original legacy renderer. Dedicated homework banks retain8same-code tasks each.
- The actual PWA `loadScript` function recognises explicitly included fresh guarded helpers on all nine routes and does not append the old cached quick-read/worksheet or visual script again (18cases).

`NEXT-THREE-RUNTIME.json` records individual results, tested implementation hashes, all canonical/published/wrapper/homework hashes and harness hashes. Reproducible harness files are `qa-output/science-next-three-runtime.cjs` and `qa-output/science-next-three-pwa.cjs` in the scratch workspace.

These are DOM/runtime tests, not a live browser, network deployment or PDF visual-render pass. PDF review, independent authored-content approval and post-deployment live checks remain separate evidence. The QA author was H01’s content author, so this runtime result does not replace the separate independent H01 content review by `sweep_space_reviewer`.
