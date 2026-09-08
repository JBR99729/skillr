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

### PR827 CI hold

**Subsequent user direction: Continue.** Root corrected exactly118 resource-anchor labels from `Homework` to `Worksheet`, with same-code worksheet hrefs and all other page bytes preserved. Independent all118 diff/hash/target review passes in `PR827-LABEL-FIX-INDEPENDENT.md` and its JSON manifest. No validator or workflow was weakened. The single LA01 link repair subsequently passed the complete-tree optional-video CI check (run34243946526); eight of nine workflows passed before the label patch. Scheduled continuation is re-enabled; root currently owns the foreground release. The temporary hold below is historical, superseded by this minimal approved correction and fresh CI gate.

PR827 is open and not merged. Initial head `e000d20917170fe311722065b529eb95e532f0fc` and latest-main-preserving head `b1cdd4d23d1d7a7ed767344611bb073a21b50939` both passed seven of nine workflows: release integrity, static curriculum architecture, question-bank quality, progressive ordering, topic layout, static-site audit and Years1–7 resource audit. The English static workflow fails on 118 pre-existing Year6–10 `Homework` labels, with no Year4 failures in its full-tree CI log. Those topic pages and the validator are not changed by this PR. First evidence: https://github.com/JBR99729/skillr/actions/runs/34243171719/job/102118278747 . Fixing those118 pages exceeds this Year4 code batch; no bypass or unrelated edits are authorised here.

The optional-video workflow's separate one-page drift is LA01's Quick Learning read link. Adding the reviewed `id="topic-guide"` made that the shared builder's preferred anchor. Root corrected only that href from `#skillr-written-lesson` to `#topic-guide`, without changing teaching text or video content. Final Topic hash and independent correction verification are in `AC9E4LA01-VIDEO-LINK-RECHECK.md`; all other content/PDF hashes remain unchanged. A fresh CI run will verify the full-tree video output.

The release is paused before main merge/Pages/live verification. No English main release or live download success is claimed. Preserve the complete draft and request owner direction for the existing out-of-batch label failures. Resume at this publication gate, then proceed to LA02 only after the current code's release is completed.

The existing scheduled continuation was paused after this non-transient scope blocker was confirmed, preventing repeated blocked runs or a duplicate researcher. It is not marked complete. Resume after the owner authorises/resolves the out-of-batch label check and preserves this checkpoint.

Latest-main refresh: `cec61bbafcfa350fa3ca629033bf61eea408be36`, complete tree `82123dccdfb3692a6e8cd123eeff551833c81d1b`, is now merged and its later revision-card map changes preserved. Independent final six-case compatibility PASS is appended to `LA01-RUNTIME-INDEPENDENT.md`; unrelated map contents are not claimed as reviewed by this English release. The final candidate includes this release report, so its file count is 18,696 against latest-main 18,675, with zero deletions.

Save the complete candidate tree to the existing non-forced branch, verify expected head and latest main, pass required CI, merge through the normal PR workflow, verify Pages, then exercise live homepage and LA01 Topic → Classroom → Worksheet → Practice → Test journey. Record actual live observations, including any download-event limitation without treating a timeout as success. Only then mark release complete and advance to LA02's first unreviewed primary-source interaction in the existing single IXL tab.
