# LA07–LA12 wrapper and assessment runtime — independent integration review

Reviewed 9 September 2026 Australia/Sydney (8 September UTC) by `/root/la03_author` in an **independent integration reviewer** role. Root authored all54 wrappers reviewed here. This reviewer authored LA10 content/media, so this report **does not independently approve LA10 teaching, question quality, artwork, clips or worksheet PDFs**; `/root/la05_author` owns that separate content/media/PDF review. Shared engineering source changes have their own implementer/reviewer gate and are not reapproved here. No wrapper, shared helper, publisher, ledger or Git state was changed by this integration review.

## Decision

**PASS for all54 root-authored AC9E4LA07–LA12 wrappers and the final staged banks' scoped actual-runtime simulations, at the recorded hashes.** This is not a browser playback, live-network, PWA, deployment, production-PDF visual or publication approval. Root must complete those separate gates. The two discovered integration defects below were corrected by root and rechecked before this decision.

Read the complete existing assessment harness and relevant actual UI/runtime/result/review paths, including screen visibility and preparation cleanup. Inspected all54 wrapper DOMs, configurations, preparation text, scripts and local resource links. Independently executed the actual final staged assessment logic for all six codes, then separately tested LA10 media persistence through full five-question attempts. All input hashes in the resulting reports were compared again with current files after root's corrections; no moving-target hash discrepancy remains in this reviewed scope.

## Findings and root corrections

1. Both final LA10 MP4 files were temporarily absent from the materialised workspace although wrappers/Topic referenced them. Root restored the exact existing Git objects after explaining that the sparse-tree operation had removed their local materialisation; no clip was regenerated. This reviewer rechecked existence and exact frozen SHA-256 values:
   - Football: `c75a18e4e14a7946126486d43431e02266dd0bd2f8a0be8ae82ba35c2adc06de`
   - Kite: `ae4e073b5039f6433238d8d4b6d409f7475b1d1c51cb1a847b68dd8d251a1e25`
   Complete remote-tree integrity remains root's separate publication gate; this report independently verifies the current local bytes.
2. LA10's activity hub initially included the fresh Test kite clip. Root replaced that with the Practice football preparation/clip. This reviewer rechecked the hub and all eight mode wrappers: football belongs to the Practice journey, kite to the Test journey. The fresh Test scene is no longer exposed by the general activity hub.

## All54 wrappers

Nine routes per code were read: activity hub; Practice entry/result/retake/review; Test entry/result/retake/review. Checks cover the actual final HTML rather than generated expectations alone:

- Canonical URLs, code-specific titles, breadcrumbs and existing same-code Topic/Classroom/Worksheet/Practice/Test journey are present. Every relative or absolute local link inspected resolves to an existing resource; resource links do not accidentally enter another code. No stale24/40-question bank claim remains.
- Each wrapper contains exactly one marked authored preparation section with same-code Topic and Classroom links. Practice supplies its approved model; Test supplies neutral evidence/response reminders without question keys or worked Test answers. LA12 retains the explicit punctuation access support. This integration review checks accurate copying/placement and absence of answer injection; code content approval belongs to the separate reviewers.
- The twelve entry configs retain five-question shuffled attempts and shuffled answers. They use the exact code/mode bank, `20260909-year4-english-la07-la12-v1`, distinct existing result/storage identities and `requireAdultReviewSupport:true`. Adult support loads before the quiz runtime; authored preparation retention follows runtime. The actual runtime resolves the saved Review/Retake URLs to the matching mode.
- Each Review page loads the adult helper before the separate review script. Result pages use their correct code/mode key and result script, with working Review/Retake links. Retake pages link back to their own entry mode. The hub retains working primary resource actions, including the actual Classroom route.
- LA10 entry pages each contain one ordinary controlled video in a static `.card` directly under `#quizApp`, outside every `.screen`. Their correct source, factual text description, download fallback and pending-viewing direction remain present. Result/Review/Retake wrappers keep the appropriate same-mode clip for that journey; no duplicate video occurs within a wrapper. No autoplay was added.

The wrapper inventory, every final wrapper SHA-256, actual configs/script arrays and preparation text are saved in **`la07-la12-runtime-independent/wrappers.json`**. The54 hashes were rechecked against current files at completion.

## Final staged assessment simulations

Independently ran the existing production assessment harness against each code after root confirmed final staging, including LA10's final reviewed corrections and LA11's final source-reference corrections.

| Code | Actual checks passed | Canonical/published items |
|---|---:|---:|
| AC9E4LA07 | 43/43 | 64 |
| AC9E4LA08 | 43/43 | 64 |
| AC9E4LA09 | 43/43 | 64 |
| AC9E4LA10 | 55/55 | 64 |
| AC9E4LA11 | 43/43 | 64 |
| AC9E4LA12 | 55/55 | 64 |
| Total | **282/282** | **384** |

These runs compare every canonical/published item and its full relevant metadata: question/audio, all choices/key, explanation, visual type/path/alternative, adult model/criteria/instructions and compatibility alias. Every adult item is exercised through both typed and paper submission using the actual shared helper, UI, assessment, result and review scripts. Empty work cannot submit; missing adult support fails closed; saved work remains pending/unscored; Test models remain hidden until Review; adult Meets/Needs/Meets changes correctly update saved results; pending work has no celebration/share prompt. Correct/incorrect selected-response controls pass in both modes.

Evidence is in `la07-la12-runtime-independent/AC9E4LA07.json` through `AC9E4LA12.json`, including actual artifact SHA-256 snapshots. All six snapshots match current files. These are genuine production-script executions in a simulated DOM, not live browser sessions; the core harness isolates each item for detailed state-transition checking rather than claiming one whole live attempt for every item.

## LA10 persistent-media challenge

A separate integration challenge reused the harness's actual environment/boot logic and actual staged items, supplying five real selected items per mode (three clip-related and two still-image items). It kept real shuffled question/answer behaviour and identified each displayed question from the supplied set, requiring five distinct items and a five-answer saved result. No production script or source bank was replaced or modified.

**26/26 media/flow checkpoints passed across two complete five-question DOM-simulated attempts.** Before Start, after Start, after each actual answer submission and after each Next control, the same original media node remains connected directly under `#quizApp`; it is outside hidden screens, lacks hidden/is-hidden/display-none state, retains controls, source, access description and pending direction, and is not duplicated. Each actual question-card SVG `<use>` resolves to its staged visual metadata. Final stored results contain five answers,5/5 score and no pending review for these selected-response controls.

Read the actual CSS `.screen`, `.screen[hidden]` and `.is-hidden` rules and the production `showScreen` function. `showScreen` changes only the named Start/pre-module/quiz/result screens, so the static sibling media card is not hidden by those transitions. This supports the DOM/visibility conclusion; **no pixel layout, codec playback, network fetch or live browser claim is made**. Root still needs live playback and resource-flow verification.

Evidence: **`la07-la12-runtime-independent/LA10-PERSISTENT-MEDIA.json`**, with26 checkpoint records, actual five-item IDs per mode, clip-byte hashes and current wrapper/runtime input hashes. Review-only temporary reproduction scripts were `/tmp/la07-la12-wrapper-audit.cjs` and `/tmp/la10-persistent-media-check.cjs`; they did not edit production files.

## Relevant executed source hashes

- Assessment harness: `04bb6080be58a06603126bee637c85ae5861324b85fd6782bf0ec9df0a7030fe`
- Actual assessment runtime: `cec2900af4c21d950dd97b7b21e981abc95f3c2375ba69e15397b07ef32d33a5`
- Production question UI: `2015730b0045ee57f10ad32171020673e14e7d5cf1e7eb5beea24c4aaa94ef8e`
- Authored preparation retention: `cbfa439229830f7347faa033c621be4351f1f263edd3420cd7579b614bef16a4`

This report leaves English Content Verified and release status unchanged. Independent content/PDF approval, review-aware publication, complete latest-main integrity, expected-head merge, CI/Pages and live checks remain separate requirements.

## Final LA08 bounded clarification recheck

After the initial six-code run, LA08 P037 received an independently approved question/audio clarification; its choices, key and explanation remained unchanged. Root restaged the approved final bank. This integration reviewer reran **only LA08**, with **43/43 PASS**, and refreshed `la07-la12-runtime-independent/AC9E4LA08.json`. Every input hash in that refreshed report matches the current executed files. Final LA08 canonical SHA-256: `7faf94576595f7f633a58523f372f0bc94ed7b69a2133e2fc066dc922c710877`. The other five runtime reports and54-wrapper approval are unchanged; combined assessment total remains282/282.
