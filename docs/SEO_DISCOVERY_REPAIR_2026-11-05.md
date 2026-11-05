# Static discovery repair — 5 November 2026

Scope: the navigation and transparency findings in the full-site SEO audit.
This change adds static HTML navigation, not curriculum content or an indexability
rewrite. The baseline is main commit `8cfb00630951d2af428df80d31009e43988d6ef0`.

## Before and after

| Check | Before | After |
| --- | ---: | ---: |
| Indexable pages without an HTML path from the homepage | 231 | 0 |
| Indexable pages without an inbound HTML link | 112 | 0 |
| Code lessons without a parent hub backlink | 63 | 0 |
| Code lessons without a direct subject hub link | 268 | 0 |
| Code lessons with fewer than two related lessons | 219 | 0 |
| Code lessons without a direct About/editorial link | 637 | 0 |

The source inventory contains 9,539 HTML files, 1,349 sitemap URLs, and 676
indexable code lessons. Six lessons remain two clicks from home and 670 remain
three clicks from home. The 8,190 existing `noindex` pages and all sitemap and
canonical choices are retained. The 32 retired lesson slugs already identify an
indexable replacement and are not promoted into new navigation.

## Implementation

- Product guides are linked from a collapsed resource-guide directory inside the
  existing products page, grouped by market and year. Current TpT browsing and
  checkout links remain available. No prices or availability claims were added.
- Supplementary activity pages are linked from the matching subject hub.
  Teaching guides, Foundation articles, US resources, the planner and custom
  resource requests are connected through their existing contextual directories.
- Topic navigation adds only missing subject-hub, related-lesson, About and
  editorial links. Existing useful links are retained.
- Related choices are explicit in `data/topic-related-links.json`. The 219
  mappings were inspected against the existing topic headings and curriculum
  descriptions. They stay within the same subject and the same or adjacent year;
  links are labelled as related lessons, not claims of prerequisite mastery.
- `python3 scripts/repair_discovery_navigation.py` is a dry-run by default.
  `--write` refreshes only its marked navigation blocks and stylesheet reference.
- The existing Release integrity workflow runs
  `python3 scripts/validate_discovery_navigation.py`; no additional workflow or
  scheduled job was created.

## Content preservation and retained sections

Reference: the existing approved Year 1 Maths topic layout, including its static
lesson, matching-resource presentation and floating practice action. This is a
navigation-only change; it does not attempt another layout migration.

Retained: topic heading and introduction; question preview and its existing
state; complete authored lesson and inline visuals; native details and answer
sections; matching optional paid-resource card; Classroom View and worksheet
links; app practice and assessment destinations; the floating practice button;
optional video and its ordering; scripts, metadata and existing navigation.

The repair refuses to write a page unless removing its owned navigation and CSS
reference reproduces that page's original source exactly. This preserves every
existing heading, details summary, CTA, lesson example, answer and link, including
the original content ordering. No new teacher-verification claim was added.

## Verification boundaries

The full source graph and sitemap eligibility are checked without relying on
JavaScript. Internal HTML destinations, missing metadata, source preservation
and idempotency are validated separately. This work does not establish Google
index coverage or ranking, validate author credentials, or constitute a full
review of mathematical content, question banks, app authentication or saved
student progress.
