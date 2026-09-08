# Year 4 Science release and English handoff checkpoint

Recorded 2026-09-08. Content release: published. Final live PDF download confirmation: unresolved. English remains held at AC9E4LA01.

## Published identity and completed gates

- [PR826](https://github.com/JBR99729/skillr/pull/826) merged by expected-head squash after all 14 final PR workflow runs passed for `d6e576476de30787a126a236b9a0137b2f7e2380`.
- Main merge commit: `c8391301be36838384da37f1117ed0ea48eb5aaf`. Its complete tree equals the locally reviewed candidate: `0f9d7ab5d60ac9b4b701abf745102e756f3b6e59`.
- Release integrity compared exact then-current main `ad23ae9f73c12e4228e58f689ccfdda4b52e858a`: 18,621 to 18,672 files, zero deleted paths, core files and CNAME preserved. All 163 intended changed paths passed static architecture validation.
- All 13 workflows for the merge commit completed successfully, including the [Pages deployment](https://github.com/JBR99729/skillr/actions/runs/34233828028), [main release integrity](https://github.com/JBR99729/skillr/actions/runs/34233830090), Foundation–Year 4 rollout, worksheet/QA layers, bank quality and full-site static audit.
- Independent final PR verification confirmed [26/26 real Chrome launch checks](https://github.com/JBR99729/skillr/actions/runs/34233648173), 12/12 Science notes/modules, read-aloud, Foundation 12/12 and a full audit with zero violations. Detailed content/PDF/model reviews and final hashes remain in the per-code reports and FINAL-SIX-RELEASE.md.
- The two narrowly scoped Foundation compatibility repairs are independently approved in FOUNDATION-RELEASE-GATE-FIX.md and FOUNDATION-METADATA-GATE-FIX.md. No validator was weakened and no Foundation teaching body was rewritten.

## Live checks after successful deployment

The existing cloud-browser site tab was reused. The single IXL tab was not used for new research.

- Homepage loaded normally. The Year 4 Science hub displayed its generated Content Verified link and all 12 code cards.
- All six inquiry Topic Guides and all six Classroom Views loaded with same-code resource links and native lesson disclosures. I05 Topic initially returned an empty immediate read; one normal re-navigation loaded the full reviewed page. No persistent error was observed.
- I01 Topic's worked-thinking disclosure opened with the reviewed observation/question/prediction model. Its Classroom visual disclosure opened; the three material/food-chain/magnet SVG images reported loaded and the page was visually inspected.
- All six worksheet pages displayed eight distinct tasks, their adult answer/review section and the Download PDF homework control. The eight repeated task headings inside the answers section are answer labels, not extra homework items.
- I06 Practice showed the reviewed material-evidence preparation model, the mandatory shared note, then Question 1 of 5. Selecting the correct introduced-predator definition produced score 1 and the authored explanation. A client click timeout at the note button was followed by a fresh state check and normal keyboard activation, which launched successfully.
- I04 Test showed the reviewed 60/40/20 cm graph preparation. Entering a synthetic “Release QA” label led through the mandatory note to Question 1 of 5. No real student data was submitted.

## Unresolved live PDF handoff

On the live I06 worksheet, the normal export control entered “Preparing PDF...” and returned to “Download PDF homework”. No PDF application error was present in the browser console and no JavaScript alert was open. The production handler's source logs and alerts on generation failures, but the observed absence of errors does not establish that a file reached the user.

The documented `waitForEvent('download')` mechanism returned no file within 15 seconds for a keyboard activation and a subsequent mouse activation. No live download path or bytes were captured. Browser-extension metadata errors appeared separately in console output; their relationship to this timeout is unknown. The six actual five-page PDFs generated with the production export code were already inspected by independent reviewers before release; those checks remain valid but are not a captured live browser download.

An attempted read of the browser Downloads page was rejected by the cloud browser URL security policy. That route was stopped. Do not try alternate browser internals, raw CDP, profile files, security-setting changes or other workarounds for the blocked page. Normal website export via the documented browser API remains the permitted verification path.

## Resume boundary

The English continuation branch is `codex/year4-english-full-review`; its QUEUE.md is the authoritative saved status. No English researcher is active and no English source observation or authored resource has been completed. English remains 0/28 and its verified badge stays off.

First refresh the actual main/checkpoint and cloud-browser state. Make one bounded normal website export attempt and, if a non-empty downloaded path is returned, inspect that production PDF and close this confirmation gap. If the same timeout remains, preserve the checkpoint and report only new evidence; do not repeat export attempts in a loop or bypass the rejected browser route. Treat this as a current verification timeout, not proof of a site defect or a permanent IXL/access block.

Only after the Science-first gate is satisfied, refresh the full latest svgSkillrHub-IXL-Research-Log.md and start AC9E4LA01, with IXL primary in one human-paced tab, supplementary free sources, exact ACARA elaboration coverage, Topic/Classroom/8 homework/48+16, separate author/reviewer roles and complete-tree publication. Continue code by code through all 28 without an arbitrary batch cap.
