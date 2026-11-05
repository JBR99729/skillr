# Remaining SEO and validation repairs — 5 November 2026

The discovery repairs in PR #912 remain intact. This follow-up resolves the
25 failed workflow suites on merge `0a01a9caac45361e02021a3662b097863ffa574b`.
The baseline for this repair is main `3d4ef2257bd7e1f0be849c1a9ba249227e044adb`.

## Final changes

- Static-page validators now check code-specific app links against the existing
  production availability manifest. They reject wrong codes, wrong guest/account
  access, unavailable banks and links to retired players. Separate main-card Test
  buttons are not required: the owner-approved app supplies assessment access.
- Retired Foundation and Year 2 launch checks verify matching HTML/script
  redirects, noindex and native fallback rather than demanding a reactivated
  legacy player. Archived bank counts, identities, adult-response grading and
  renderer protections remain checked.
- Foundation checks inspect current canonical lesson routes and recognize the
  approved authored teaching focuses and classroom-view layout. Worksheet tasks,
  matching answers, tiers, print controls and linked app availability remain gated.
- Breadcrumb checks validate complete JSON-LD blocks semantically, preserve
  authored strand entries and refuse malformed graphs. They no longer rewrite
  valid formatting or risk matching across unrelated script blocks.
- Optional-video checks validate selected video identities, accessible frame
  titles and no autoplay. Current authored video sections remain intact; the
  tool does not restore the obsolete Quick Learning navigation. Videos remain
  optional, and a written lesson need not embed every selected alternative.
- Authored resource-guide articles are validated for substantive content and
  resource links; the older promotional campaign is required only on articles
  which actually contain its markers. Existing campaign claims remain checked.
- The static audit distinguishes authoritative third-party teacher PDFs from
  exposed first-party slide downloads.
- AC9E1LY05's LearningResource now references the site's existing Organization
  and WebSite entities. This is the only HTML change. Removing JSON-LD from the
  before/after versions yields identical bytes: lesson content, links, layout,
  title, description, canonical and indexability are unchanged.
- Workflow path filters include the shared activity contract and regression
  tests. No failing workflow is disabled or configured to ignore errors.
- The PR-only Years 1–7 resource audit now follows the authoritative canonical
  topic inventory, recognizes existing Classroom View and fixed-image formats,
  and distinguishes retained compatibility paths from active viewers. Its old
  six-item legacy exception list is removed: all 427 codes must pass.
- PR validation also exposed the same retired-launch assumption in the reviewed
  Year 1 Science checks. Source question/answer parity and SVG safety checks
  remain active; retired routes must safely redirect rather than run a removed
  player. Scoring claims are limited to any remaining active legacy players.
- Verification-status maintenance now reads the canonical curriculum inventory
  rather than an obsolete badge CSS class. Read-only checks preserve intentionally
  absent badges and optional summaries, ignore archived badge markup and check
  existing published claims against the unchanged review ledger. No new code is
  recorded as reviewed and no badge is activated by this repair.

## Validation

All run steps from the 25 previously failed workflow definitions pass locally,
including their downstream checks which had previously been blocked. Targeted
regressions reject wrong-code links, reactivated players, broken breadcrumb
positions, deleted worksheet answers and empty teaching focuses.

The discovery audit still reports 9,539 HTML pages, 1,349 sitemap URLs, 676 code
lessons and zero errors. Six lessons are two clicks from the homepage and 670
are three clicks away. The Google entity audit and static curriculum audit pass;
the latter reports zero runtime topics, zero missing native disclosures and zero
exposed teacher downloads. Release integrity must additionally pass against the
latest complete main tree before merge.

These checks establish technical and navigation correctness. They do not verify
Google's private indexing decisions, predict impressions or certify the teaching
accuracy of every curriculum resource. No content-review badge is added.
