# First three Year 4 Science codes — independent runtime audit

2026-09-08. **PASS:63/63 runtime cases and18/18 PWA deduplication cases.** Exact cases and reviewed artifact SHA256 identities are in FIRST-THREE-INDEPENDENT-RUNTIME-QA.json.

Executed actual published question files, actual shared quiz runtime, required pre-module notes, production question UI, adult-review support, separate-review, science visual adapter, authored preparation helper, legacy science data, legacy quick-read and both worksheet helpers. No production code was edited for this audit. This is a technical integration review; separate agents review authored science content.

| Coverage | Cases | Result |
|---|---:|---|
| Correct and incorrect MCQ outcomes, each code and mode |12|PASS|
| U03 Practice written/paper adult evidence remains pending with zero auto-credit, then adult can mark saved review |2|PASS|
| U03 adult helper missing: Start disabled with explanatory alert |1|PASS|
| Authored preparation retains same DOM node and exact content through shared initialization and legacy quick-read/visual scripts |6|PASS|
| Saved model refuses mismatched bank version, question, explanation, correct answer, foreign code source or external source |36|PASS|
| Three authored worksheet bodies/PDF buttons retained plus three unmarked legacy renderer controls |6|PASS|
| Actual PWA loadScript deduplicates18 old-cache script requests to fresh guarded scripts |18|PASS|

All result cases preserve code, mode, question identity, exact explanation, correct-answer identity, expected review route and bankVersion20260908-year4-science-first-three. All six modes require the actual Read Before You Start screen; the harness asserts it is displayed and clicks its real Continue button. The production gate is not disabled. U01/U02 and U03Test are MCQ-only; U03Practice has four published adult-review tasks, and representative actual adult task is checked through written and paper flows.

Worksheet tests include actual legacy science renderer and general subject renderer, legacy science data and interactive visual helper. Positive cases keep the exact body and original PDF control. Negative unmarked cases really render a legacy sheet, demonstrating the test is not vacuously passing from missing data.

The harness executes one selected real bank item per isolated scoring case for deterministic results while preserving answer shuffling. It uses a linkedom DOM and stubs browser audio, timers and network interfaces. This establishes script behavior, not browser paint, elapsed-time behavior, PDF appearance, live download or deployment success. Root owns those separate gates. No source-verification badge claim is made.

Final refresh: repeated all63 runtime cases and18 PWA checks after the pre-module note/source/cache updates. AllPASS; artifact hashes refreshed to the final current files.
