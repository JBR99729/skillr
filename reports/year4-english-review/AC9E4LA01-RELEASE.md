# AC9E4LA01 release checkpoint

2026-09-08 UTC. Scope: full LA01 resources plus the separately reviewed narrow LA06 official-elaboration correction; no LA06 full-code approval.

## Pre-publication evidence

- Separate author: `english_la01_author`. Independent content reviewer: `english_curriculum_reviewer`; all 64 questions, choices, keys, explanations, audio/visual metadata, complete static Topic/Classroom teaching and eight distinct homework tasks approved at final hashes in `AC9E4LA01-INDEPENDENT-REVIEW.md`.
- Independent worksheet/PDF reviewer: `english_la05_la07_audit`; two actual production exports, five pages each, all ten pages rendered and opened. Final corrected source/output/page hashes and approval in `AC9E4LA01-PDF-INDEPENDENT.md`.
- Independent implementation/integration reviewer: `english_la02_la04_audit`; 132 scoped safeguards, final nine activity pages, worksheet load order and 55 actual shared-script assessment cases checked. All 16 adult tasks require real response evidence and remain pending until adult judgement. See `LA01-RUNTIME-INDEPENDENT.md` and `AC9E4LA01-ASSESSMENT-RUNTIME.json`. Tests use simulated DOM/browser APIs, not live-browser claims.
- Root reran 132 safeguards, 55 assessment cases, diff whitespace checks and Static Curriculum Architecture v2 validator successfully. Published 48+48 mirror+16 fields match canonical content; reviewed publisher made no changes to frozen banks/pages.
- IXL was the primary external benchmark with the exact limited observed scope in `AC9E4LA01-SOURCES.md`; official ACARA remains the curriculum authority. Khan, NSW and the attributed Common Ground cultural account supplement gaps. Shared research log saved at version 19. No unseen skill or advanced progression is claimed.
- Latest main fetched and merged: `a72586289d1d1459c7a7931d8ce102e7e7a280bb`, complete tree `f7d59e3b45cd35a95320b0556a4076c38ac0e897`. Its new revision-card/PWA changes are preserved and independently checked for compatibility.
- Review-aware publisher recorded **LA01 only**, 1/28 English codes reviewed; generated English Content Verified badge remains OFF. This ledger count is not yet proof of main publication.
- Complete-tree integrity check: 18,673 → 18,693 tracked files, zero deleted paths, all core files and unchanged domain retained. Repeat after the release commit and immediately before merge against refreshed main.

## Remaining publication gates

Latest-main refresh: `cec61bbafcfa350fa3ca629033bf61eea408be36`, complete tree `82123dccdfb3692a6e8cd123eeff551833c81d1b`, is now merged and its later revision-card map changes preserved. Independent final six-case compatibility PASS is appended to `LA01-RUNTIME-INDEPENDENT.md`; unrelated map contents are not claimed as reviewed by this English release. The final candidate includes this release report, so its file count is 18,696 against latest-main 18,675, with zero deletions.

Save the complete candidate tree to the existing non-forced branch, verify expected head and latest main, pass required CI, merge through the normal PR workflow, verify Pages, then exercise live homepage and LA01 Topic → Classroom → Worksheet → Practice → Test journey. Record actual live observations, including any download-event limitation without treating a timeout as success. Only then mark release complete and advance to LA02's first unreviewed primary-source interaction in the existing single IXL tab.
