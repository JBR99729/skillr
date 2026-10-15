# Software integration findings and repairs

These are author repairs raised through independent tester review. Final acceptance and source identities are in independent-test-report.md and final-source-hashes.json; this table does not replace that review.

| Finding | Repair | Affected scope |
|---|---|---|
| Empty block panels used text that could substitute for observing absence. | Removed “No pieces”; retain labelled empty SVG unit panels. | All block-model zero panels. |
| Whole three-column SVG made phone pieces too small. | Separate countable SVG panels per unit, stacked at narrow widths. Unit counts unchanged. | All block diagrams, phone/tablet/desktop. |
| Runtime removed preparation without its explicit authored contract. | Added data-skillr-authored-preparation="true". | Both launch pages. |
| Legacy Year 2 quick-read overwrote the reviewed preparation. | Honour authored contract before mutating title, intro or notes; bump loader query. | Both launch pages; unflagged legacy resources retain existing behaviour. |
| Regex stopped at first nested section on repeat build, corrupting the launch DOM. | Replace full preparation region up to stable summary sibling; validate balanced sections and Start containment. | Builder and both launch pages. |
| Saved review omitted authored HTML diagrams. | Opt-in preserveQuestionVisuals saves diagrams and separate-review renders them. | N02 saved review; existing visualModel fallback remains. |
| Repeat builder appended review cache suffix. | Match full query and normalise once. Two repeat runs in an isolated temporary copy now leave every file byte-identical. | Builder and two review URLs. Actual review script unchanged. |
| Legacy concept-picture helper injected out-of-scope decimals into preparation. | Exact AC9M2N02 + authored-preparation guard before helper runs; bump wrapper and loader queries. | N02 launch notes; unaffected code paths retain existing behaviour. |

| Fixed Teaching resources shortcut overlaps tablet/phone answer controls. | Hide shortcut only during active N02 questions; preserve it on launch/results. | N02 bank CSS; affected tablet/phone rerender. |
| Adult marks can miss local progress store when helper loads asynchronously. | Load progress-store synchronously before review marking support. | Both N02 review pages; adult incorrect mark + reload/store recheck. |

Root checks: `node --test scripts/tests/ac9m2n02-bank.test.mjs scripts/tests/content-validation.test.mjs` — 10 passed. Syntax checks passed on affected JavaScript. Scoped secret/private-key scan found no matches. Legacy worksheet input matches prior Practice source byte-for-byte. No domain/core-file changes. Complete-tree integrity must pass before branch update.
