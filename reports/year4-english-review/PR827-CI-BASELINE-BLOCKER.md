# PR827 — independent baseline CI blocker verification

2026-09-08 UTC. Read-only diagnosis by `english_la02_la04_audit`. No Topic page, question bank, validator or workflow was changed; no check was bypassed.

## Observed failure

Independently fetched and parsed the complete [F–10 English static validation job log](https://github.com/JBR99729/skillr/actions/runs/34243171719/job/102118278747), job `102118278747`.

- CI checked out merge commit `2995ca6c983072c3af93c3b973297dc1b8274977`, merging PR head `e000d20917170fe311722065b529eb95e532f0fc` into main `c79780d53d1a89bc14b85f8b5b98a45243e27fc5`.
- The executed command was `node scripts/validate_f10_english_static_topic_pages.mjs`.
- Parsed exactly **118 `FAIL` lines**, all with the single reason **`legacy Homework label remains`**. No other failure reason, LA01 failure or missing-page failure appears in this full-tree CI log.

| Affected year | Failed Topic pages |
| --- | ---: |
| Year 6 | 23 |
| Year 7 | 24 |
| Year 8 | 23 |
| Year 9 | 23 |
| Year 10 | 25 |
| Total | 118 |

The parsed failure-code set exactly equals all 118 Year 6–10 English units in the tracked curriculum catalogue; it is not a sampled comparison.

## Independent unchanged-baseline proof

Compared complete tracked Git tree entries, not sparse working-directory existence, between main `c79780d53d1a89bc14b85f8b5b98a45243e27fc5` and local integrated release candidate `4031f847010f545e56e08242645e7d226eb23ff5`.

- **All 118 failing Topic `index.html` paths exist in both trees and have identical Git blob IDs**: their bytes are unchanged.
- The validator, its workflow and shared CSS are also byte-identical:

| File | Identical Git blob ID |
| --- | --- |
| `scripts/validate_f10_english_static_topic_pages.mjs` | `7826b0253560ac1b4b5428582f4b4f1f3977bb68` |
| `.github/workflows/validate-f10-english-static-topic-pages.yml` | `daf50db991963172908fdadea9c3c60fe2f79af6` |
| `assets/curriculum.css` | `5a71b3972897d5919f6f8ee40466f1e1405da3e7` |

- Independently parsed both tracked catalogue versions: every validator-relevant upper-English unit field (`code`, `levelLabel`, `url`, `worksheetUrl`, `practiceUrl`, `testUrl`) is identical for all 118 codes.
- The unchanged validator's deterministic `/>\s*Homework\s*</i` check runs directly on each Topic's HTML. Therefore the same 118 observed label failures necessarily exist on the unchanged main baseline; they were not introduced by the LA01 resource update or LA06 factual correction.
- SHA-256 of the ordered 118-row `{code,year,path,blob}` comparison manifest was `e8660caf54e4f97af4415327865ecdde466341169abb058239b759d6131a6d48`.

The initial remote PR-head tree was independently resolved as `91b21b3925afc7f0c34e3360300df06d17e28033`; root records it matching local pre-main-merge candidate `dea9c802`. The current local candidate tree is `07fc33ebfb760093278cdd688932ea6d712630e5`; root records exact-tree equality with updated remote PR head `b1cdd4d23d1d7a7ed767344611bb073a21b50939`. Those publication mappings are root's recorded release evidence, not a claim that this reviewer reran the newer workflow.

## Conclusion and limits

**Confirmed out-of-batch baseline blocker: 118 unchanged Year 6–10 English Topic labels fail the global check.** The evidence does not justify calling CI green, bypassing the failing check, weakening the validator, or silently editing 118 unrelated pages under a Year 4 request. Preserve the approved LA01 draft/release checkpoint and obtain owner direction for a separately scoped label-maintenance change.

This diagnosis combines the actual full-tree CI failure set with exhaustive tracked-byte equality for the affected inputs. It is not a claim that a second complete baseline workflow was executed. The local checkout contains only 28 of the 284 English Topic files because it is sparse; running the broad validator directly there would report 256 local absences. Those absences are **not missing site paths or a release-tree deletion** and were not used as failure evidence.
