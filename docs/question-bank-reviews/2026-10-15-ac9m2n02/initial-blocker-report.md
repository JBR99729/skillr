# AC9M2N02 independent software QA — partial, blocked

Date: 15 October 2026 (UTC). Reviewer: separate tester agent `/root/tester_review_n02`; not the author or teacher reviewer. Destination inspected: `JBR99729/skillr`, branch `skillr-dev`, local worktree `/workspace/scratch/5631e3fa90bc/skillr-dev-bank`. No commit, publication or production-source changes were made by this reviewer.

**Decision: NOT APPROVED. Rendered software QA is pending because no usable local browser was available and the proposed cloud file transport was explicitly blocked.** This is an environment blocker, not an observed bank malfunction. Source checks are not substituted for the required actual UI checks.

## Exact identities

The approved authored candidate read by this reviewer has SHA-256 `21cef9c153337ab45820d94aa1e72b65c5e8027b7f100e65d871d2e69ef6a52f`.

The integrated Practice JS has SHA-256 `c64a257ff779ece05abd71c1a13ec6054a547b49977703e41f8e96b8f6a44f1d`. Test JS: `e5eb573c1abf53590685ad61a76870610d594c6e2484ae08bce19728c9abbe43`. Canonical JSON: `95b2c56548a5660ad7468527e74c1e5c7b28d45736de635895172565dae896b6`.

Shared runtime `quiz/assets/script-runtime-v115.js`: `4262faf7629cb4cddd1a681753aa8a6a0e05c2b5bc1f356f6d7b4f03c37b0a6f`. Loader `quiz/assets/script.js`: `17988c3ffd46be90a8ca8a52b4a39f6afc4036afc047f45953319df155c62c28`. All inspected runtime/support/content hashes and per-item evidence are in `static-results.json`.

## Checks actually completed

Executed `node tester-qa/static-audit.cjs` against the integrated artifacts, using Node's VM to evaluate the authored bank scripts, not synthetic copied question objects. All assertions passed:

- Exactly 46 distinct IDs, 30 Practice and 16 Test. Each Practice focus PN, EX and ZR contains exactly 10 items.
- All 46 integrated stems, correct answers, choices, templates, model answers, adult grading modes/instructions/acceptance notes/completion labels match the approved source. Explanations and hints also match.
- 16 fill-blank, 11 number, 3 single-choice, 16 self-check. All 16 self-checks explicitly use adult-review grading. Template blank counts match expected answer counts.
- Each blocks SVG's individual `data-unit="hundred"`, `data-unit="ten"` and `data-unit="one"` count matches its exact `visualSpec`. Chart/parts authored values are present in the integrated HTML. This establishes authored DOM counts, not pixel visibility/readability.
- Both launch pages declare the correct authored attempt count, 10 Practice / 16 Test. Learning-support `<details>` is collapsed in source, with no `open` attribute.
- Shared runtime's explicit authored-count opt-in preserves fallback 5 when no valid authored count is provided. The fallback expression was verified in source; no live legacy route was exercised.

Manual source inspection also confirmed separate result storage is written only at completion, adult responses are saved as `pendingReview:true,isCorrect:null`, pending review blocks passed/completion celebration, review buttons can change adult marks and update the same session result key, and result/review launch pages refer to the versioned result keys. These are source observations; the corresponding actual browser flows remain unverified.

## Browser blocker and attempts

A local HTTP server was started on `127.0.0.1:8765` for the unmodified worktree. The separately available Playwright package's Chromium executable was absent. A filesystem search found no usable browser executable. Both available Playwright package versions' official Chromium installers returned a zero/truncated download followed by `Error: End of central directory record signature not found. Either not a zip file, or file is truncated.` Install attempts were stopped; neither completed.

The parent suggested a cloud browser file-transport test. Opening `file:///home/oai/share/5631e3fa90bc/skillr-dev-bank/quiz/year-2/math/ac9m2n02/practice/index.html` was rejected before navigation. Exact refusal:

> Browser Use rejected this action due to browser security policy. Reason: The browser URL policy blocks this action. Cloud browser cannot visit the requested page. The requested URL protocol is not allowed. Allowed protocols: "http:", "https:". The agent must not attempt to achieve the same outcome via workaround, indirect execution, raw CDP or browser commands, alternate browser surfaces, or policy circumvention. Proceed only with a materially safer alternative that does not require this blocked browser action; if none exists, stop and request user input.

No attempt was made to circumvent that refusal. No external signed-in browser session was used, no file-transport replica was produced, and no fabricated screenshot/contact sheet exists.

## Pending required actual-player checks

All actual rendered checks are pending: all 46 items on desktop/tablet/phone; screenshot-pixel and contact-sheet inspection; visible SVG counts; answer-neutral diagrams; no clipping/overflow/tiny objects; touch targets; correct/incorrect/empty/zero/multi-blank/selection flows; each adult pending state and adult marking/result reload; default sitting and focus filtering; complete 16-item Test; Next/end/review/retake; completed result saving/reload; exact mid-attempt reload behavior; live legacy count fallback; no runtime console errors. No pass is claimed for these.

Two source-informed points need honest observation when a sanctioned browser becomes available:

1. No in-flight index/answer persistence was identified. `currentQuestionIndex`, current answers and quiz history are initialized in memory and reset on start; session result writes occur at completion. Do not describe mid-attempt reload as resume without actual evidence.
2. The review history stores `visualModel`, whereas this new bank uses `visualHtml`. Thus authored diagrams do not appear to be persisted into review cards by the current source. Check whether question/model/marking text is sufficient for each adult review task; do not claim review visual parity without inspection.

No source defects were repaired by the tester. Any eventual functional or visual failure must be repaired by the author and independently rechecked in the affected scope. Educationally meaningful repairs also require teacher recheck. Stop once the applicable checks actually pass.
