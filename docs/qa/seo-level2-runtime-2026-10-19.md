# Level 2 runtime correction — 19 October 2026

Live testing of the updated AC9S2I01 Test showed the authored Test briefly, then a legacy script replaced the complete body with a Quiz and selected its older bank. The URL remained `/test/`. This is a verified user-facing content-ownership defect; it is a plausible contributor to duplicate canonical selection, not proof of Google's historical reasoning.

Corrections:
- Restrict `year2-science-quiz-page.js` to actual legacy `/quiz/` routes. Practice, Test and Worksheet pages retain their authored HTML and runtime settings.
- Make the legacy bank loader preserve both `production-v2` and `skillr-reviewed-*` banks. Previously only the AC9S2U01 production-v2 bank was protected.
- Refresh cache keys for the changed legacy scripts and their bootstrap. No question data, storage keys, counts, resource URLs or canonical URLs change.
- Add regression coverage for 30 current mode/code routes, legacy quiz behaviour, ordinary legacy loading, and preservation of the real 24-question Practice / 16-question Test banks for AC9S2I01.

The regression suite fails against the original scripts and passes against the corrected scripts. Four changed runtime files also pass Node syntax checks. Publication requires a complete-tree comparison, preserving all current main files and changing only the listed runtime/test/workflow/log files.

The earlier copy repair is commit `eeb81f77555cfedd2bc637a074730b710f992b34`; its sitemap-refresh descendant deployed successfully. Its broad static curriculum audit failed at breadcrumb-schema normalisation (742 eligible pages, changed=742, missing=0, invalid=0). That script examines Foundation/Year subject hubs and topic pages, none of which the copy repair changed. The other affected checks passed. Do not claim the broad audit passed or silently regenerate 742 pages as part of this runtime fix.

Google actions: the product tpt-17737649 live test and indexing request succeeded. The clock-guide live test returned a temporary Search Console service error. Index status and canonical selection still require later observation; no ranking improvement is claimed.
