# Year 4 authored worksheet preservation — independent regression

**PASS: all 23 authored worksheets survive the legacy renderer and PWA loader.**

Root live inspection found a second real integration defect: a late legacy renderer replaced authored worksheet HTML and removed its Download PDF control. Earlier static/PDF checks did not execute this late replacement and missed the issue. The old renderer reproduces the failure with actual SP01 legacy data.

The final correction marks authored worksheet bodies and explicitly loads the fresh guarded renderer after the authored bank and before PWA startup. The renderer returns immediately for the marker. All 23 actual authored banks remain the same object and content after loading all ten legacy Year 4 data scripts; executing the new renderer then preserves the exact body HTML and the same Download PDF button node.

The harness also executes the actual, unmodified PWA loadScript function extracted from its source. Requesting the older v5 renderer finds the explicit fresh script by its base path and appends no duplicate. Both the already-loaded and fallback-timer branches pass across all 23 pages. An unmarked page still renders the legacy worksheet, confirming compatibility.

All 25 cases pass: 23 preserved worksheets, the reproduced old failure and the unmarked compatibility case. Exact wrapper/renderer/PWA hashes and case evidence are in YEAR4-AUTHORED-WORKSHEET-RUNTIME-REGRESSION.json. The full PWA navigation/serviceworker flow and network were not simulated; root owns live-browser evidence. PDF exports were separately reviewed; this test confirms their existing control survives.
