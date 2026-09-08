# Foundation release-gate repair — independent review

Status: APPROVED. Reviewer: science_i01_i02_reviewer. Date: 2026-09-08.

## Verified baseline failure

The pre-existing main commit was `ad23ae9f73c12e4228e58f689ccfdda4b52e858a`. Independently queried GitHub Actions [Audit static curriculum site run 34231506361](https://github.com/JBR99729/skillr/actions/runs/34231506361): push event, completed with failure, created 2026-09-08T13:21:56Z, head SHA matching that main commit. Job `102078530305` failed at “Enforce static Teacher Slides architecture”. Its logs identify this exact resource and the message “static Teacher Slides host must provide page-by-page navigation”. Thus this failure predates the Year 4 Science PR changes.

## Cause and bounded correction

The existing Foundation AC9MFN02 Classroom View already provides nine static native lesson disclosures, meaningful “We do” teaching, a curriculum-mapping anchor and the shared Classroom CSS. The unchanged audit's native Classroom recognition also requires the resource-kind marker and SkillrHub contact reference; both were absent. Consequently the audit misclassified the page as a slide deck and demanded page navigation.

Reviewed exactly two additions to `foundation/maths/ac9mfn02-and-name-the-number-of-objects-within-a-collection-up/teacher-slides/index.html`:

1. Add truthful `data-resource-kind="Teacher Display Page"` metadata to the existing body.
2. Add a small visible footer containing the curriculum code, SkillrHub/site branding and the existing content-feedback mailto link.

The footer is after the closing display-board section and before `</main>`. It does not create another grid row inside the teaching board.

## Independent preservation and gate checks

- Byte-for-byte comparison proves the final file equals the baseline plus only those two additions.
- All nine complete disclosure blocks are byte-for-byte identical, including their teaching, worked examples, SVGs, answers and related resources.
- Existing resource navigation, metadata, stylesheets and teaching structure are unchanged.
- The actual unchanged `hasTeacherDisplayPage()` function returns false for the baseline and true for the corrected resource.
- `scripts/audit_static_teacher_slides.mjs` remains byte-for-byte identical to the baseline. No global audit requirement was weakened.
- The only modified Foundation path is this Classroom View file. This review authorises no Foundation content sweep or architecture change.

Root owns final full CI rerun, release integrity and deployment verification. This scoped review does not assert a separate browser visual test.

## Artifact identity

| Artifact | SHA-256 |
| --- | --- |
| Baseline Classroom View at main ad23 | `abebc73b5db2a0a9f2181861852a15ec0ec523b7a5f63f01936ca1bea20625d9` |
| Final approved Classroom View | `961cf9eb7539cc2fd505928e0b7f94f8234834e07c2c1ffe9ccb5fb6337ac940` |
