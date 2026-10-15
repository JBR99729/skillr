# AC9M2N02 independent software QA — final evidence

**Current decision: APPROVED for the requested integrated AC9M2N02 development bank. All applicable local software, visual and fix/recheck gates are complete.** Historical browser setup blockage is resolved and is recorded separately in `initial-blocker-report.md`.

Reviewer: separate tester agent `/root/tester_review_n02`, not the author or teacher reviewer. Target: `JBR99729/skillr`, `skillr-dev`. Approved authored candidate SHA-256: `21cef9c153337ab45820d94aa1e72b65c5e8027b7f100e65d871d2e69ef6a52f`. No production source was changed by this reviewer; no external commit/publication was performed.

## Actual player and visual checks

Used isolated local HTTP and the actual website HTML/runtime, with Chromium `153.0.8010.0` supplied by the official npm package `@sparticuz/chromium@153.0.0` and local Playwright. The package was unpacked without applying archive ownership metadata. This successful HTTP test route required no Cloud Browser file URL, remote user session, raw CDP or policy bypass. External analytics were stubbed to prevent telemetry; assessment/player assets were served from the exact worktree. Only the bank response was narrowed for per-item inspection, using unchanged authored question objects. Whole-sitting checks used the full unmodified bank response.

- 138 distinct item/viewport cases: all 46 at desktop 1280×900, tablet 768×1024 and phone 375×812. This is local Chromium viewport emulation, not real-device certification.
- All 18 final contact sheets were opened and pixel-inspected by the independent reviewer. Full screenshots were also inspected to identify and recheck fit defects. Exact per-case screenshots, hashes and contact references are in `visual-ledger.json` / `.csv`; screenshot-derived sheets are identified in `pixel-inspection.json`.
- All exact stems render. All 12 block models' visible hundred/ten/one counts match their `visualSpec`; all assessed SVG objects fit their viewBox, including 8 hundred flats, 10 rods and the final row of 17 cubes. Charts and part cards contain the correct values/placeholders and remain answer neutral.
- No horizontal overflow, clipped assessed objects, hidden required evidence or tiny assessment objects remains. Empty bounded collections represent zero without written “No pieces” answers. Narrow layouts stack unit panels; phone cubes are about 18 pixels rather than the initial 6 pixels.
- Tablet/phone cases were re-rendered after the floating Teaching resources shortcut was hidden during active questions; it no longer covers diagrams or answer controls. Main answer buttons and text/number/blank controls were verified at least 44×44 pixels. Checkbox labels remain clickable; the measured tablet label is 634×26 pixels, with a native 20-pixel checkbox.

## Functional checks

The final full sweep includes 60 recorded checks, plus targeted final scaffold, keyboard and persistence checks:

- All 46 questions reached the actual player, accepted their correct response or saved their adult response as pending, and saved a one-item completion result. Empty responses are disabled; partial multi-blank responses remain disabled. Incorrect, zero and shuffled selection marking were exercised, with explanatory feedback.
- Practice defaults to 10. PN, EX and ZR each provide exactly 10. The complete Test has 16 distinct items: 9 automatic answers and 7 adult responses. All 16 review diagrams remain present.
- Adult responses do not award independent correctness or a final pass. Both response text and paper/object completion were exercised. Adult “Meets the task” and “Needs more practice” updates persist through Review and Result reloads; local progress was checked as well as session result data.
- Next/end, Review and Retake work. The complete Test's 7 adult marks can produce the updated 16/16 result. Keyboard Enter, Space, tabbing between blanks, start and answer submission work in Practice/Test.
- Completed results reload successfully. **Mid-attempt reload returns to the start screen; the website does not resume the in-flight question/answers.** No resume claim is made.
- An unaffected legacy AC9M2N01 Practice route still produces 5 questions, confirming the shared authored-count opt-in leaves the legacy fallback intact.
- After the last helper guard repair, both launch modes were independently rechecked at all three viewports after network idle: one intact authored scaffold, exact approved notes/examples, no decimal or generic injected model, collapsed worked examples, correct launch DOM containment, and no overflow. Learning may be expanded manually and returns collapsed after retake.

## Defects found, repaired by author, and independently rechecked

1. Written “No pieces” in zero collections: removed, with bounded empty fields retained.
2. Tiny phone block models: replaced with responsive unit panels and normal text spacing; all affected item/viewports rechecked.
3. Review lost `visualHtml`: scoped opt-in persistence and review rendering added; all 16 Test review diagrams verified.
4. Runtime removed the authored Practice scaffold: existing authored-preparation opt-in added.
5. Builder's first-closing-section replacement corrupted nested launch HTML: stable full-region replacement added; containment and hidden start controls verified.
6. Legacy quick-read helper overwrote authored preparation, and another concept helper injected a decimal model outside the Year 2 scope: scoped authored guards added; both modes/all three viewports rechecked against approved notes.
7. Floating resource shortcut overlapped assessment evidence/controls: hidden during active N02 questions; all 92 tablet/phone cases re-rendered.
8. Adult marking could update session results before asynchronously loaded progress support existed, leaving durable progress pending: blocking progress support added to N02 Review pages; actual marking/reload/local-progress checks repeated.

The exact source specification, scalar answers and educational content were preserved. No worksheet-to-bank fidelity or new worksheet certification is claimed.

## Performance and logs

One defined paced HTTP test loaded the largest Practice block diagram, EX08, on a cold local Chromium context at 1280×900: 150 ms initial latency per response, aggregate 200,000 bytes/second in 100 ms ticks. 54 requests / 784,511 bytes were served. Launch loaded in 4,531 ms; the actual question was ready in 4,657 ms, with correct 6/8/4 block counts and no errors. This is one emulated condition, not a universal SLA or a real school-network measurement.

The first 138-case sweep recorded zero console errors. The final rapid tablet/phone refresh sweep recorded one generic `Skillr script load failed: Event` while navigating between cases, without a player exception or failed item. This raw event is retained in `rendered-results.json`; its exact request was not identified. Subsequent final normal-context keyboard/review/result flows recorded zero console or failed-request events (`supplemental-results.json`). Earlier service-worker-disabled diagnostics emitted registration warnings caused by that harness setting; the final normal-context run allowed service workers and was clean. A further optional network-idle diagnostic timed out; it did not establish a new product defect and is not counted as a pass.

## Scope and stopping point

This approves only the requested integrated development bank and relevant local player flow. The final public version `20261015-ac9m2n02-v2` and both versioned Practice/Test result keys were independently rechecked through adult marking, Review/Result reload, Retake, keyboard submission and local progress; both final normal-context runs recorded zero errors. The last version/key/query-only change did not alter question objects or diagrams and did not require repeating the 138 unchanged question pixels. Authentication, Supabase, cross-account isolation, real devices, production deployment, nightly release and production progress were not tested or approved. These are separate gates. All applicable identified failures were returned to the author and rechecked; no broad suite or unrelated code audit was added.

Authoritative evidence: `final-source-hashes.json`, `visual-ledger.json`, `rendered-results.json`, `supplemental-results.json`, `supplemental-test-results.json`, `scaffold-recheck-results.json`, `throttled-load-results.json`, and the 18 final contact sheets. Bulk screenshots remain alongside the local tester evidence.
