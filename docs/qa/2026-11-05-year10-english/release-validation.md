# Scoped release validation — PR 911

Owner requested publication to main on 5 November 2026. Scope remains AC9E10LA01, AC9E10LA07 and AC9E10LE01 guides and the original LA07 visual assets.

## Final reference-link repair

The architecture validator rejects every direct PDF hyperlink, including an external curriculum citation. Each guide now links to the verified QCAA P–10 English HTML resource page, which contains the Year 10 achievement-standard/content-description alignment document. The link label describes that resource accurately. No teaching, question, answer, visual or curriculum wording was changed after the recorded independent review.

Final HTML SHA-256 values (supersede whole-file hashes only; authored teaching and the four asset hashes are unchanged):

- AC9E10LA01: `65d30ff31e0326c2790e834001ff179d295601e2d8fd0a73166a5a7d6c0feadf`
- AC9E10LA07: `b71ee434fdb8ccab609fa13e177f1936dc0cea37ddf39a557b10067d7d436b92`
- AC9E10LE01: `768b6e9995c0f2d92344ef222303eb639559e78be4933cc134c3ff40f265e129`

## Relevant checks

- Static curriculum architecture: PASS against main.
- Static topic loader guards: PASS.
- Static teacher-display recognition tests: 3 PASS.
- Three guides: one H1 each, unique IDs, local fragment targets and referenced local visual assets PASS.
- Whitespace/diff check: PASS.
- Complete-tree release integrity must pass for the committed candidate immediately before publication, preserving the latest full main tree and CNAME.

## Existing full-site check failures

The same validator inputs were checked against main `f08fb022bb7432ac17f0761f87d88699aebd0a36` and the candidate, restoring the three baseline source files for the comparison. Validator scripts and curriculum data are unchanged.

- F–10 English validator: 630 failures on each; complete diagnostic output is byte-identical. It expects legacy activity routes and treats external app URLs as local filesystem routes.
- Breadcrumb check: eligible=742, changed=740, missing=0, invalid=0 on both; it requests serialization updates across the existing site.
- Optional video check: 666/676 codes have selected videos; all 676 canonical outputs are already stale on main and remain flagged in this candidate.

These checks have not passed and are not waived or disabled. No broad generator or validator change was made to force a green result. This scoped repair adds no new failures to those checks. Normal repository merge requirements still apply.

Deployment success and the live homepage, affected guides and an existing practice route must be verified after publication; a merged commit alone is not evidence of a live deployment.
