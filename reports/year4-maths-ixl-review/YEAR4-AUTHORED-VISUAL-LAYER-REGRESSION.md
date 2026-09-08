# Authored Year 4 models — independent legacy-injection regression

**PASS across all 69 authored Practice, Test and Worksheet resources.**

Root live inspection found an unrelated clock inserted into ST01 Test ahead of the correct data graph. The old helper reproduces this using actual legacy Year 4 data and the actual concept-SVG renderer: one authored SVG becomes two, with added clock labels 3:15,9:35 and60min. Earlier static/marking checks missed the late injection.

The final interactive helper returns early for marked authored Year 4 Maths resources while setting its existing loaded flag. Every one of the69 actual pages explicitly loads this fresh helper before PWA. Running it with legacy data preserves the exact body HTML and original authored SVG node.

The actual curriculum-visual-layer.js wrapper still appends its old v1 script. This is **not** deduplication: executing those old bytes afterward returns through the shared loaded flag and adds no model. The harness executes both the actual wrapper and old helper to verify this protection. Unmarked and out-of-scope cases still perform legacy injection, confirming the guard’s scope.

All72 cases pass:69 preserved resources, reproduced old failure, unmarked compatibility and other-year compatibility. Combined preparation timing also passes: fresh visual guard, shared runtime removal, Year4 preparation reattachment, then late wrapper/old-helper execution leaves the same authored node intact. The36 preparation,25 worksheet and80 marking regressions pass again.

Exact hashes and results are in YEAR4-AUTHORED-VISUAL-LAYER-REGRESSION.json. Network delivery is simulated in its actual execution order; root owns live-browser and deployment evidence. No claim is made that unrelated unmarked legacy models have been corrected.
