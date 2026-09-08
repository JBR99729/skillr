# Third-five resume: independent release audit

Date: 2026-09-08. Reviewer: `/root/release_audit`, independent of batch authors and source researchers. Scope: release evidence and reviewed artifact identity for draft PR #819, AC9M4A02 and AC9M4M01–M04. This reviewer did not author curriculum resources, use a browser, run the publisher, change the ledger, commit, merge or deploy.

**Decision: HOLD for main publication; narrow resumed draft checkpoint is supported.** The preserved draft passes complete-tree integrity and existing final content-review identity checks. The independently inspected ALFA original source and separate-editor citation correction now PASS. Actual IXL/Khan and live-browser gates remain HOLD. Nine successful checks apply to a37, not a later checkpoint; the updated draft must obtain checks for its own commit.

## Commit and complete-tree evidence

- Root explicitly fetched both named refs during this resume. `origin/main` remains `348109b09c055ee54a56abf74ef77b3f27d6ba1c`, complete tree `aaf34b572ddb19f2076da16d8a84dd53b4962070`.
- The named draft ref and current local HEAD resolve to `a37a42d6454aa8623a68eced97ad4c51ae9683b3`, complete tree `c38b051fd1739db1465c675f4a84ed00747958ed`.
- The initial local historical HEAD, `3c157a80a6c2611de94a45eff531732930f806a2`, has exactly the same complete tree as a37. Its different commit identity did not imply stale resource bytes. Root subsequently switched to the exact remote draft.
- Main is an ancestor of the draft. `node scripts/check_release_integrity.mjs origin/main HEAD` passed: **18,459 → 18,488 files, zero deleted paths**, core files and domain preserved.
- Exact main-to-draft diff: **118 paths, 29 added and 89 modified**. The set is the five code banks/resources, narrow shared activity/PDF wiring, and batch reports. No Year 3 route is changed; `data/content-verification-status.json` is unchanged.
- Comparing earlier published main `c3a1073ccf167a3153c1528a079125a7c144cf48` to current main identifies 706 upstream paths. All 701 non-overlapping paths remain unchanged in the draft. The only five overlaps are the five Topic pages. Each of their three documented video-navigation insertions occurs exactly once in the final authored page; final page hashes match the integration record's release identities. Newer video, home-learning and LLM-guide changes are preserved.

These are exact-tree observations for the recorded draft and base, not permission to publish from a partial tree or overwrite later main changes. Re-read main immediately before promotion, rebuild on its complete tree if advanced, and rerun integrity on the final candidate.

## Independent report and identity audit

Read AGENTS.md, THIRD-FIVE-CHECKPOINT.md, the five independent reports' decisions/correction rechecks/final manifests, and THIRD-FIVE-TOPIC-INTEGRATION.json. The prior reviewers are separate from their corresponding authors. No local mathematical/content/PDF correction is left open in their final decisions; actual source and browser limitations remain explicit.

All **114 repository-file hash rows** in those five reports match the initial a37 draft bytes. Repeated shared-file rows are counted per report rather than represented as 114 unique files. Six additional M04 PNG rows also match at the documented `/workspace/scratch/b2c91567ebe4/qa-pdfs/` location. None of these identity checks is a new substantive question review or a new rendered-page inspection.

| Code | Matching repository manifest rows | Existing local review decision | Remaining source gate at a37 |
| --- | ---: | --- | --- |
| AC9M4A02 | 21 | All 64 items, teaching, eight homework tasks and exact PDF PASS | Actual IXL help/questions and Khan inspection |
| AC9M4M01 | 22 | All 64 items, final four-choice sets, teaching, homework and exact PDF PASS | Actual IXL help/questions and Khan inspection |
| AC9M4M02 | 22 | All 64 items, final four-choice sets, teaching, homework and exact PDF PASS | IXL/Khan plus independent ALFA original-artifact inspection |
| AC9M4M03 | 21 | All 64 items, teaching, homework, attributed cultural text and exact PDF PASS | Actual IXL help/questions and Khan inspection |
| AC9M4M04 | 28 | All 64 items, 46 models, teaching, homework and exact PDF PASS | Actual IXL help/questions and Khan inspection |

All five production PDF files remain available locally and their recalculated SHA256 values agree with the checkpoint:

| Code | Exact reviewed PDF SHA256 |
| --- | --- |
| AC9M4A02 | `96e6e708f5aad3551af2a6eb7e01348fc166429d9cd276552a87127ea2de8527` |
| AC9M4M01 | `8742fd4a173076230bdbe5378f752fc5974f37623edb748fe65ac4a4ce64e9c5` |
| AC9M4M02 | `c2351cc65d79178bc66e4f05e482d103726daf19f45b9369cd68f9f310b24acd` |
| AC9M4M03 | `ea60432598780c86696759baf612081758ef52a0af54e71c49eaffc3c5a9a4e1` |
| AC9M4M04 | `6ff586e756072d341f23fb916ef2b6b6d21cbb23f4312e6a0acf603ef59ff673` |

Historical identities embedded in the reports are explicitly superseded review checkpoints. They are not unresolved hash mismatches. In particular, M01/M02 earlier three-choice banks and v18.2 PDFs were replaced and rechecked; M02's intermediate Topic hash `47b0099d...` was superseded by the independently rechecked citation-only `<cite>` change, final `2515a556...`. A02/M03/M04 inspected PDFs retain their honestly recorded v18.2 provenance; independent source review established the v18.3 image-only amendment leaves these image-free worksheet tasks on the same pagination branch.

## Resumed correction and source-evidence recheck

Read the complete `AC9M4M02-ALFA-INDEPENDENT-RESUME.md` and `THIRD-FIVE-KHAN-RESUME.md`. The ALFA reviewer inspected the exact downloaded original PDF and rendered spread, independently compared the limited public claims and invented-model boundaries, found the printed-page citation error, and rechecked root's separate edit. Its final source/citation verdict is PASS. The Khan researcher inspected no actual lesson body, transcript, diagram or exercise: its source verdict correctly remains HOLD. Neither report represents the continuing browser failure as expired login.

Independently compared both changed teaching resources with a37: each differs by exactly one visible `58–59` → `56–57` locator replacement. Reversing that replacement reconstructs the prior independently reviewed bytes exactly. All assessment banks, generated questions, diagrams and homework files are unchanged. The source-observation report corrects the locator and explicitly records the new independent evidence without misrepresenting the historical author observation.

| Rechecked corrected artifact | New SHA256 |
| --- | --- |
| M02 Topic | `5c1741596c1bd4bf0d0da04eeeb074d2171fda94b3ea75a613f9a68e63a60a4e` |
| M02 Classroom | `17f4381522b2286e441795d1692d12bfe6f6487dbecaf9d07e27775621f4fb20` |
| M02 source-observation report | `31a65e804476b1b76324756ce605f1dcc0e8728cd585c4441619d6fc47f9b274` |

The original M02 independent manifest and original integration record retain historical Topic `2515a556...` and Classroom `1061bbd2...` identities. They are superseded **only for those two HTML artifacts** by the new independent source-review final manifest above. The other 112 original repository-file hash rows still match. The historical ALFA HOLD is superseded by the narrow new source PASS; the overall IXL/Khan/browser HOLD is unchanged. The ALFA report's before-correction table was checked and corrected to preserve the original identities separately from its final table.

At the completed worktree checkpoint, four tracked changes relative to a37 are the two citation-only HTML edits, the source-observation report and the current checkpoint report. Three new evidence reports are additions: independent ALFA, supplementary Khan, and this audit. Every path in the complete current-main tree still exists locally: **zero missing/deleted main paths**. These seven scoped changes do not waive the required final commit-to-main complete-tree integrity run. No ledger or unrelated site resource was changed by this resumed correction. Root reports fresh static-topic (23/23), architecture and ledger checks passing; this reviewer independently ran `git diff --check`, which passed. New-commit Actions remain root's next gate.

## GitHub checks observed during resume

The GitHub connector returned these nine PR-triggered workflow runs for exact draft commit a37; every run is **completed / success**. The combined commit-status endpoint returned an empty statuses array; Actions evidence comes from the workflow-run endpoint. That endpoint returns the first page of PR-triggered runs and does not establish a Pages deployment.

| Workflow | Run ID |
| --- | --- |
| Validate Year 4 Maths static topic pages | 34186772761 |
| Audit progressive question ordering | 34186772751 |
| Validate F-10 topic layout | 34186772684 |
| Audit static curriculum site | 34186772667 |
| Audit Years 1-7 curriculum resources | 34186772698 |
| Validate static curriculum architecture | 34186772676 |
| Release integrity | 34186772743 |
| Validate optional topic videos | 34186772680 |
| Validate question-bank quality | 34186772672 |

Any subsequent commit needs its own check evidence; these successful runs cannot be attributed to changed resource bytes.

## Ledger and release gates

`node scripts/update_content_verification_status.mjs --check` returned CURRENT. Year 3 English remains among the completed learning areas. The ledger contains exactly AC9M4N01–N05 for Year 4 Maths; A02/M01–M04 and previously published N06–N09/A01 remain absent. Year 4 Maths is five of 23 recorded codes and its badge stays off. No ledger changes were made by this reviewer.

| Gate | Audit status / required next action |
| --- | --- |
| Official ACARA and full local content/PDF reviews | Existing final PASS evidence and a37 artifact identities confirmed; preserve the separate scope of these passes. |
| Actual relevant IXL worked help and representative questions | HOLD. Root must record observed examples/questions and progression limits, then obtain independent comparison sign-off. A shell/catalogue is insufficient. |
| Supplementary Khan lessons | HOLD at a37. Requires actual lesson-level inspection and explicit comparison within Year 4 scope. |
| M02 ALFA independent original-source inspection | PASS in the resumed independent report. Root corrected the printed-page locator to 56–57; the source reviewer and this release reviewer independently rechecked the exact citation-only delta and final hashes. |
| Live browser activity/resource verification | HOLD. Existing offline runtime checks are not live-browser observations. A browser connection timeout does not establish expired IXL login. |
| Independent final approvals after changes | Narrow ALFA correction is independently approved at the new hashes. Overall source approval remains pending IXL/Khan evidence. Recheck any further resulting corrections and bind approval to final bytes. |
| Review-aware publisher and ledger | Pending until review gates close. Run the required `publish_production_question_bank.mjs BANK --reviewed` per code, then verification-status `--check`; inspect generated diffs and preserve Year 3 English. Year 4 badge must remain off until all 23 pass. |
| Final complete-tree publication | Pending. Re-fetch main, preserve unrelated changes, rerun exact-base integrity with zero deletions, and use a non-forced update only. |
| Final Actions, Pages and live routes | Pending for the eventual publication commit. Confirm successful Actions and Pages deployment, then load the live homepage and affected activities/resource flows. Draft checks do not substitute. |

This audit preserves the draft's source HOLD and does not authorize bypassing outstanding review requirements.
