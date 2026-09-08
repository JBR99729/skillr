# Authored Year 4 preparation — independent runtime regression

**PASS after a reproduced defect and scoped correction.**

Root live inspection found that Practice initialization removed the first preparation section. The earlier 80-case independent runtime pass tested marking and saved results but did not assert that preparation survived initialization; it missed this defect. The earlier broad integration conclusion is qualified by this correction.

The independent harness reproduced the real ordering: load the bootstrap/runtime, apply the actual quick-read helper to static activity HTML, then dispatch DOMContentLoaded. Against the old HEAD runtime, all eight final Practice guides disappeared (one section to zero); all eight Test guides survived. Against the patched runtime, all 16 guides survive as exactly one section with unchanged inner HTML.

The patch preserves only an explicitly marked authored section on a Year 4 Maths Practice route. Two unmarked legacy cases still remove their first section. The previous M03 two-section layout removes the legacy section and preserves the authored one. A marked section on a Year 3 route is still removed, confirming the year scope. The 80 marking/pending-work/saved-review/helper-failure cases were rerun against the patched runtime and all passed.

The bootstrap runtime URL and all 16 final-eight activity bootstrap URLs request the new cache version. Exact runtime, helper, wrapper and old-runtime hashes plus all before/after results are in FINAL-EIGHT-PREPARATION-RUNTIME-REGRESSION.json. This is offline behavioral verification; root owns live-browser/deployment evidence.
