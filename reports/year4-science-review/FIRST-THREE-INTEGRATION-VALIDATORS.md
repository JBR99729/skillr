# First-three Year 4 Science integration validation

Independent reviewer, 2026-09-08. Scope AC9S4U01/U02/U03, with retained legacy contracts for other nine Science codes.

- PASS production bank validator for each first-three canonical bank: 48 Practice and 16 Test; U03 includes four adult-reviewed practical Practice tasks.
- PASS pre-module notes validator all 12: first-three prose counts 142, 146, 151; reviewed 48/16 banks, ID uniqueness against actual length, exact new note cache version, actual static Topic/Classroom paths and visible model titles. Other nine retain legacy provenance and 40/16 banks. Latest memory clues preserved; first-three metadata no longer cites absent legacy slide roles.
- PASS static Science topic validator 12/12 after restoring actual classroom example cards. Class membership is checked as HTML tokens, preserving support for multiple CSS classes.
- PASS topic-module validator directly in checkout after adding two existing tracked sparse fixtures (legacy live route and logo). First-three static content, eight distinct written tasks with answers/rubrics and authored-loader guard checked; retained legacy export and other-nine route assertions unchanged.
- PASS topic layout, static curriculum architecture, static loader guards, curriculum read-aloud. Learning-order validator reports zero in-scope pages because its locked roots exclude Year 4; not claimed as Year 4 coverage.
- PASS production worksheet PDF regression: four-page long-text/symbol fixture and three-page two-model fixture using exact current generator and exact HEAD missing fixture assets in isolated test root. Root also independently ran this gate. Actual first-three Science PDFs received separate author-independent page reviews.
- Pre-module browser flow was not launched by this reviewer (root owns browser/runtime verification). Corrected stale global eight-question test expectation to five only after verifying all 24 current Science Practice/Test wrapper configurations are five. Existing notes validator independently asserts five across all 12. No production attempt length changed. Syntax checked.
- Runtime ownership validator is not triggered by these Science changes; missing sparse unrelated Year 3 assets were not treated as regressions.

Triggered workflows inspected: Science static pages, Science pre-module notes (includes flow/read-aloud/topic modules), F–10 layout, static curriculum architecture. Runtime-content-ownership workflow is Foundation/Year 3 scoped and not triggered.

## Final edited-file identities

- `quiz/assets/year4-science-pre-module-notes.js`: `9de9907787ceca80390eec85af8e9770220a3a185c1e3db7729eb8587e551b43`
- `scripts/validate_year4_science_pre_module_notes.mjs`: `f2587644de2e24c45e8dce6dddbbe3b4270e24b8e7d76c683060714b2a9be956`
- `scripts/validate_year4_science_pre_module_flow.mjs`: `b014c3467d75bc5abdea84c4013309323ab86e00c83d28ec3bb1c3d17e753ea3`
- `scripts/validate_year4_science_static_topic_pages.mjs`: `3e3ce4fee8ab8a3bb62061f7607d7176b70d3cae380034483b0e1fc6ab56029b`
- `scripts/validate_year4_science_topic_modules.mjs`: `bdd2cfca1857e0adaae5fa2b29448453f086ed8c4ad0ce96c8c5136382faa822`
