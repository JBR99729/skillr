# M06 release validation

7 September 2026. **DRAFTED — content and repository checks passed; deployment/live-flow verification pending.** No publication success is asserted by this pre-release checkpoint.

Readiness evidence and original per-ID allocation are in M06-READINESS-COVERAGE.md. Older M06-EVIDENCE.md retains historical blocked checkpoints; they are superseded by the readiness record after restored login and further inspection.

## Checks completed

- All 64 authored questions and their four options, correct answers, hints and explanations reviewed for arithmetic, units, ambiguous alternatives and curriculum relevance.
- Exact counts: 48 practice and 16 test. All existing P001-P024 and T001-T016 IDs, code, skill and bank assignments preserved; P025-P048 added. Schema preserved.
- Four answer positions balanced: 12 each in practice, 4 each in test. No exact duplicate prompts, answer options or practice/test copies. No review-status choices.
- Replaced the eight repeated question families with notation/renaming, real denomination collections, exchanges, constrained representations, minimum coins, ordering and value-error reasoning. Test arrangements differ from practice items; common subskills intentionally recur for assessment.
- Enumerated Australian coin combinations independently for the minimum-coin answers (75c, $4.60, $2.50 without $2 coins, $3.70, and 50c restricted to 20c/10c/5c). All minima confirmed. The fixed-four-coin $1.40 problem has the unique combination 20c,20c,50c,50c.
- Nine authored labelled coin/note SVG diagrams rendered using Inkscape and inspected together. Values, row labels, note counts and comparison totals match the questions. No clipping or overlap observed at the rendered size. Models explicitly say they are not actual size.
- Production validator PASS: 64 unique IDs, correct positions and required counts.
- Generated practice/test scripts executed in isolated Node VM contexts: all 64 IDs, prompts, correct answers, explanations and SVG references match the source bank; compatibility practice files are identical.
- Review-aware publisher ran and verification-status check passed. It records M06 but does not activate the whole Year 3 Maths badge. Its 14 historically reviewed codes must not be interpreted as 14 completed reviews under this newer mandatory sweep.

## Limits and pending release checks

IXL evidence is a documented representative sample from all nine relevant pages, including every expanded worked example, not exhaustive adaptive progression or mastery. Multiple choice assesses selecting representations and reasoning; it does not prove unaided physical money handling. New questions/diagrams are original and do not reproduce IXL assets.

The cloud browser rejected the local preview URL with ERR_BLOCKED_BY_CLIENT. No claim of a local browser flow test is made. Generated-data integration is checked; live homepage, M06 practice/test flow and deployed diagram rendering must be checked after Pages succeeds. Keep final whole-code completion pending until that check. No quiz renderer, dashboard implementation, product links, topic guide, slides or worksheets were changed.
