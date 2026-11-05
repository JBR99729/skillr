# Reconciled optional-video experiment

Owner authorised publication of pending main-target PRs on 5 November 2026. This reconciles PR 894 on the complete latest website tree, preserving the later navigation fixes and reviewed Year 10 English examples. The old branch could not be merged mechanically because the same HTML pages had changed since it was prepared.

The original experiment script removes only owned optional-video blocks, video shortcuts, video-specific anchors and the video stylesheet. The catalogue stays in `data/topic-videos.csv`; all lesson content and original teaching animations remain. The suppression setting prevents regeneration while the experiment is active. No search-ranking improvement is asserted.

Local validation:

- Scanned 709 static topic/alias files; exactly 676 canonical guides required changes.
- Compared each transformed guide with the exact transformation of its latest main source. All content outside the video/navigation blocks is byte-preserved; titles, robots, canonicals and H1 markup are unchanged.
- Second removal pass: zero changes. Video-builder check: zero pages retaining video UI.
- Existing optional-video safeguard suite: 7 tests passed.
- Whitespace check passed.

One separate citation repair is required by the architecture validator, which rejects every PDF hyperlink, including publisher references. AC9E1LA08 now links to the National Museum of Australia's verified Year 1 Warakurna/Holiday Time HTML resource page, where the same teacher guide and cultural guidance remain available. No instructional example, answer or image was altered for this repair.

Two fully authored guides (AC9S1U01 and AC9M2A03) use a “Small steps, clear examples” heading that the architecture check does not recognise as teaching. Prefixing that existing heading with “Key concept” makes its purpose explicit without changing any explanations, questions, answers or figures. Preservation comparisons permit only these two heading prefixes and the citation repair in addition to video removal.

The obsolete one-off branch-maintenance workflow from the original draft is not added to main; the normal existing CI and suppression check cover this release.

Before publication, require a complete-tree comparison against refreshed main, current release/discovery checks and applicable CI. Existing unrelated full-site failures must be distinguished from new failures, not disabled or reported as passes. Verify Pages and representative live guides after merge. Restore videos by reverting this experiment and its suppression setting while retaining later lesson changes.
