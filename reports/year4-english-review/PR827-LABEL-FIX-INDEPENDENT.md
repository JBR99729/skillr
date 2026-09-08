# PR827 — independent review of 118 navigation-label corrections

2026-09-08 UTC. Reviewer `english_la02_la04_audit`, separate from implementation author/root. This follows the owner's “Continue” direction after the recorded baseline blocker. Scope is **navigation text only**, not a curriculum review or broad content rewrite.

## Exact change verified

Before implementation, independently inspected one original failing anchor in each year (AC9E6LA01, AC9E7LA01, AC9E8LA01, AC9E9LA01, AC9E10LA01). Every `Homework` anchor already linked to its own code's `/worksheet/` resource and exactly matched `worksheetUrl` in the curriculum catalogue. `Worksheet` is therefore the accurate replacement label; no destination change is needed.

After implementation, independently compared the actual final bytes of **all 118 pages** with Git base `6a8b6957edf38f60efcb4a54a3a982382c6361f0` and asserted for each page:

1. The original contains exactly one `<a href="SAME_CODE_WORKSHEET_URL">Homework</a>` anchor.
2. The final file equals the original file with **only that exact anchor's text changed to `Worksheet`**. All other bytes—including teaching content, models, metadata, other navigation labels and every link destination—are unchanged.
3. No literal `>Homework<` label remains under the unchanged validator's whitespace-tolerant check.
4. The unchanged same-code worksheet target's `index.html` exists in the complete tracked Git tree, regardless of sparse local materialisation.
5. The changed upper-English path set equals these exact 118 Topic pages; no additional upper-English path is altered.

| Year | Independently checked pages |
| --- | ---: |
| 6 | 23 |
| 7 | 24 |
| 8 | 23 |
| 9 | 23 |
| 10 | 25 |
| Total | 118 |

Also independently verified `scripts/validate_f10_english_static_topic_pages.mjs`, its workflow and `assets/curriculum.css` remain byte-identical to the review base. No validator weakening, workflow bypass, lesson edit or worksheet rewrite occurred. `git diff --check` passes for all affected pages.

## Final identities and disposition

`PR827-LABEL-FIX-INDEPENDENT.json` records every code, path, existing worksheet URL, original Git blob and final SHA-256. Its file SHA-256 is `07c475598e50fa5c505b9b964f43a55163a40922c0d33f18deaf2bb65a2c74d0`. The ordered row-array fingerprint is `0b1337efcee2683f117b39d1ce2e3fa2b3945366f65a3042a51ada3701945d5f` (SHA-256 of compact JSON row array in catalogue order).

**Independent scoped review: PASS for all 118 exact text-only corrections at the recorded final page hashes.** This addresses the 118 previously proven baseline label failures; it does not approve the unchanged upper-year curriculum content or assert that all global CI checks have now passed. Root must run the full-tree release checks/CI and deployment verification. This reviewer made no implementation edits, browser/IXL interactions or commits.
