# AC9E4LA05 — independent production PDF and staged-resource review

Date: 9 September 2026 Sydney. Reviewer: `la06_author`, separate from the LA05 author and root runtime integrator. **PASS** for the two production PDFs and staged identities below. No live deployment or IXL completion claim is made.

## All ten actual PDF pages inspected

Read `production-pdf-results.json`, verified every recorded production input SHA256 against current repository bytes and both PDF SHA256 values against actual files. Independently rendered both actual PDFs with Poppler at90 dpi into `english-la05-pdf-review/independent-render/`, then viewed all ten full-page PNGs individually. This was not a text-only review or review of a different mock exporter.

Both five-page PDFs have three student pages and two answer-guide pages. In each shuffled version all eight authored tasks occur, each with four adjacent response lines; no prompt is stranded from its response space. The drawing task has usable space for the simple labelled map or its accessible alternative. Inspected every prompt, task number, answer/model and adult-guidance paragraph in actual order: answer guides match the respective shuffled question orders. Header, footer, page number, curriculum code and SkillrHub branding remain readable. No clipping, overlap, missing glyph, truncated model, response-line collision or accidental answer exposure on student pages was found. Examples and criteria retain original information, $4 cost, direction arrows and required alternatives.

| Production file | Pages visually inspected | SHA256 |
| --- | --- | --- |
| `1-navigation-and-readability-in-online-texts-worksheet-worksheet.pdf` | 1–5, all pages | `d7a07d63fdbc98602967ddfd12dc6c6dacde39da32fa6af9b084e7321e53bf35` |
| `2-navigation-and-readability-in-online-texts-worksheet-worksheet.pdf` | 1–5, all pages | `cdece9daa71bf03c26bbefa7179928fa368ddca60b143bf6764561e8e96a1d0d` |

## Staged question parity and nine wrappers

Independently compared every one of64 staged questions to its separately approved canonical item: exact prompt/audio, curriculum code/bank, structured explanation, visual metadata, every selected choice and key, and every adult grading/model/acceptance/response/completion field. Practice mirror is byte-identical. No stale pre-correction P036/P040 or distractor version remains.

Read the visible wording and script/configuration of all nine wrappers: resource hub; Practice/Test attempt, retake, review and result. Practice preparation is the exact approved canonical leaflet model; Test and hub preparation remain neutral and do not disclose Test answers. Both attempt screens accurately state the full48/16 inventory and five-question shuffled attempts. Actual adult work is required and saving alone does not earn credit. Adult-support script loads before the shared runtime/review script; attempt configs require adult support, use the batch bank version and preserve existing storage/canonical routes. Main runtime normalises review/retake URLs from the activity path; relative legacy config values are not interpreted as the final destination. No shared script modifications were made by this reviewer.

Root's `AC9E4LA05-ASSESSMENT-RUNTIME.json` records **43/43 PASS** using actual production runtime/result/review scripts with simulated DOM APIs, including all12 adult items, typed/paper submissions, pending state, adult marks/revision and fail-closed behaviour. This reviewer read the report and corroborated all64 field parity independently; this is not a claim to have operated the live browser, network or PWA.

## Reviewed production inputs

- `quiz/year-4/english/ac9e4la05/worksheet/index.html`: `fe66806bc8166c995ae1a32134020f41f08ff0077ebda5022db9b9a43281c26d`
- `quiz/year-4/english/ac9e4la05/worksheet/worksheet-questions.js`: `f925005b6adf08be6e9e8d482692ca8cfb850cd6baa502967863744d3bb5395d`
- `quiz/assets/worksheet-pdf.js`: `e49d7b681c2024bedaf23256d6b8e82be900f579846f1057f17b18ee2c3051f4`

## Final staged artifact identities

- `quiz/year-4/english/ac9e4la05/index.html`: `e037f3e5e5b49085c629e0ae35f2ac4e353d07588e8ad6f09ce12daee4a0b84b`
- `quiz/year-4/english/ac9e4la05/practice/index.html`: `1fb0e2439579101a72d04db077d2495c9fb746a2e47b5c72901f9957cea383d8`
- `quiz/year-4/english/ac9e4la05/practice/retake/index.html`: `708c7b7c9aafc5a554a5033942a18ef4cbc268f4c4e96096060e6fb491d7ae73`
- `quiz/year-4/english/ac9e4la05/practice/review/index.html`: `b09938bb20bb17f1c79d5731c74f41de12febd0bf409a838542d57aefbbfd9fa`
- `quiz/year-4/english/ac9e4la05/practice/result/index.html`: `410f5f4ca29ff5ba3dd6b3219113f29f2bd5f9e7ef1930d92e04d24668d1749a`
- `quiz/year-4/english/ac9e4la05/test/index.html`: `a31053b0c9ce3d5b8905fb0079f3144c195b33da54030803de085aef5d959a6c`
- `quiz/year-4/english/ac9e4la05/test/retake/index.html`: `95c9d79675f3793bd6432c6207f9e0489d363621c6299f9eec2bee4267a7c8d0`
- `quiz/year-4/english/ac9e4la05/test/review/index.html`: `d8db549c2d4de972ed3f918a7389f9a1bb40687eb96a24f2544448fdac728eb7`
- `quiz/year-4/english/ac9e4la05/test/result/index.html`: `9ba0b5d6281e50902ce049105957cb9f073b486fad466e55015f0cf2201adfa5`
- `quiz/year-4/english/ac9e4la05/practice/questions.js`: `f3b76e68ae6c20bc061f92ad2eeb9b35342a17ff3c1d8dd0a9b0b753ec5b11af`
- `quiz/year-4/english/ac9e4la05/practice/practice-questions.js`: `f3b76e68ae6c20bc061f92ad2eeb9b35342a17ff3c1d8dd0a9b0b753ec5b11af`
- `quiz/year-4/english/ac9e4la05/test/questions.js`: `3fcc09c873468690fbb39cea04248c993e4057e6e0fe53195b44cf6b493906b2`
- `assets/assessment-banks/year4/english/ac9e4la05.json`: `9bd392bfaa06f85d67d9906b2e55619b3c3cd990bc82c9dd1a43c6ba41d1397b`
- `reports/year4-english-review/AC9E4LA05-ASSESSMENT-RUNTIME.json`: `dc4287094b907be70612fd16615c04b8252d48930fb1be751456402e2750b340`

## Release boundary

The earlier `AC9E4LA05-INDEPENDENT-REVIEW.md` independently approves all authored teaching,64 items,8 homework and3 SVGs, including the subsequently fixed worksheet guard marker. This report adds actual all-page production PDF inspection and staged/wrapper review. Root still owns full-tree release integrity, review-aware publishing, CI/Pages and live journey/download verification. English Content Verified remains off until all28 required codes are reviewed and published. No approval is offered here for this reviewer's own LA06 work.
