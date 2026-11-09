# PR 972 publication preflight — 9 November 2026

The owner authorised merging the reviewed Science batch to main. The eight
Science HTML files, models, images and teaching-review records are unchanged
from reviewed head `7402f7a0d3afe5cfe52738824c9c110c614dbe93`.

The release check exposed existing availability drift from main commit
`cccd6026f37e06e2b348a29f0f1e123a3feb17da`: nine retired player routes for each
of AC9M8M03–M06 still opened the general catalogue. All 36 baseline files were
byte-identical to main `622953ea584ed79d07d4cd4b270b7a2031abd9ba`.
Regenerated only those 36 redirect HTML files with the existing
`retire_legacy_quiz_routes.moved_page` helper and current published catalogue.
Each now opens the matching `?login=1&skill=CODE` practice entry. The helper,
availability catalogue, app banks, assessments and learning content are unchanged.
Old score/query/identity data is not forwarded. This does not certify app runtime.

Checks on the complete checkout:

- Five retired-route regression tests passed.
- All 6,473 retired routes: zero sync changes required.
- All 73 retired learning hubs: zero consolidation changes required.
- Static discovery: 9,547 HTML pages, 676 lessons, zero errors.
- Six breadcrumb/routing preservation tests passed.

The separate Years 1–7 resource audit has an existing 21-error conflict with
retired curriculum hubs. It is not a Science content defect. No check is disabled
and no retired hub is revived. Current release-tree and hosted workflow outcomes
are recorded on the PR before merging; production deployment/live checks follow
the merge. Previous teacher and browser evidence applies to the byte-identical
Science pages and assets.
