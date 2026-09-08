# PR828 CI fix — independent review

Decision: **PASS for the nine-file CI repair only.** Reviewed in the isolated release checkout against HEAD `d33880132ab4946af559d7b43c80706b0de6599b`. This approval does not replace prior full-content/PDF reviews or establish CI, deployment or live verification.

## Scope and exact changes

I inspected every line of the complete working-tree diff: nine HTML files, 17 insertions and 17 deletions. No bank, worksheet, shared runtime, lesson body or assessment content changes occur in this diff.

- LA02–LA06 Classroom View body elements gain `data-resource-kind="Teacher Display Page"`. Existing body classes remain intact. This identifies the already-existing static native-details architecture to the unchanged validator; it does not introduce a new rendering path.
- The five four-step section labels become “Four steps: I do, We do, You do, Check”. I read the underlying four steps for each code. Each proceeds from explicit modelling through guided work, learner application and formative checking. The label accurately describes those existing, unchanged steps.
- LA04–LA06 existing curriculum coverage details gain the missing `curriculum-mapping` ID. LA02–LA03 already have that anchor.
- LA02–LA05 generated Quick Learning links change the absent `#skillr-written-lesson` target to the existing `#topic-guide` target.
- LA03 restores the generator-owned estimated-time sentence and preserves the full original advice, “Explore one group of examples at a time. Use two or three short sessions if helpful.”, immediately after the generated block in its own `curriculum-session-note` paragraph. The specific pacing advice remains visible and is outside the block the generator replaces.

## Independent checks

All nine files have unique IDs. Every affected local `#topic-guide` or `#curriculum-mapping` link has exactly one matching target. All five Classroom files have exactly one curriculum-mapping anchor; all four modified Topic Guides have exactly one topic-guide anchor.

Every Classroom content-block body is byte-identical to HEAD. Every modified Topic Guide curriculum-detail-body is byte-identical to HEAD. Exact shared teaching-body parity with each corresponding Topic Guide remains: LA02 6 bodies, LA03 10, LA04 12, LA05 8, LA06 11. Additional Classroom alignment/resource panels are unchanged, intentionally Classroom-specific content.

I also read the unchanged `hasTeacherDisplayPage` validator predicate. The additions satisfy its existing static-page identification requirements while preserving native details, lesson grouping, classroom styling and feedback contact. They are truthful markers for the current architecture, not a validator bypass.

The root reports that the unchanged static validator passes and the optional-video builder's exact per-code output was checked. Those executions are root evidence, not independently rerun here. My approval covers the inspected diff, its truthful semantics, body preservation, anchors and hashes below. No visual/PDF regeneration is required by this diff because worksheet sources and every teaching body are unchanged; release CI and live checks remain root responsibilities.

## Final artifact hashes

| File | SHA-256 |
| --- | --- |
| `year4/english/ac9e4la02-the-subjective-language-of-opinion-and-feeling-and-the-objective/index.html` | `aac28fc247240dcfcf411a5b6c3a8000e6f0d26f026de1863cfef1c0d36f376f` |
| `year4/english/ac9e4la02-the-subjective-language-of-opinion-and-feeling-and-the-objective/teacher-slides/index.html` | `1d567327f4fe4525910b677945bd165e7b78791736783605ea120472ccfc1a75` |
| `year4/english/ac9e4la03-how-texts-across-the-curriculum-have-different-language/index.html` | `a03c87285437a6b50aa6408e8c7be5e0e2fc3023c9140b330f6f3eb040810f04` |
| `year4/english/ac9e4la03-how-texts-across-the-curriculum-have-different-language/teacher-slides/index.html` | `065354757070526c25bb28935616598601befc0fd5dcee1fee99bb78ff12fdee` |
| `year4/english/ac9e4la04-how-text-connectives-including-temporal-and-conditional-words/index.html` | `ade5424409ecec8664302eda4508980b2e8c1c57f8fd6de778b865e128da99ff` |
| `year4/english/ac9e4la04-how-text-connectives-including-temporal-and-conditional-words/teacher-slides/index.html` | `f3ea28268c9afd7a0e5433f208cf8a8effd67237e4709b5566948dcef9d39944` |
| `year4/english/ac9e4la05-text-navigation-features-of-online-texts-that-enhance/index.html` | `3b01432db48dc8f588f99a28fa85f3f3e8da51f1bfee058683ec745a1d669a5c` |
| `year4/english/ac9e4la05-text-navigation-features-of-online-texts-that-enhance/teacher-slides/index.html` | `a660ad3b6aa85c52fd554e403559575bcfeaa3f10127ac7cb8c8d0a081ad95d2` |
| `year4/english/ac9e4la06-that-complex-sentences-contain-one-independent-clause-and-at/teacher-slides/index.html` | `6ba9e40b4aaead94abc22c66a627aa2e6440a74e92afabf74cb30e3a56c55e81` |
