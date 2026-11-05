# Breadcrumbs, curriculum context and mobile audit — 5 November 2026

Baseline: `3d4ef2257bd7e1f0be849c1a9ba249227e044adb`.

The latest discovery repair already supplies subject-hub backlinks and related
lesson links. This change preserves that work and does not add a second related
navigation system. Titles, H1s, canonicals, sitemap choices and practice/assessment
destinations are retained.

## Breadcrumb and menu findings

- Audited navigation destinations and fragments in all 9,539 source HTML files,
  including 1,349 search-eligible pages and 8,190 excluded pages.
- Completed visible Home → Year → Subject → Code breadcrumb hierarchies on
  381 topics; 52 of these had no semantic breadcrumb navigation on this baseline.
- All 676 active topics have a visible breadcrumb, a subject-hub link and at
  least two related topic links after the combined repairs.
- Breadcrumb JSON-LD is checked semantically. Valid optional strand levels
  remain; JSON formatting and a human-readable leaf label are not defects.
- The combined source navigation check reports no missing destination or
  fragment. This is not a claim that every external site or menu was live-tested.
- The common header menu was opened and closed on a phone-width topic and a
  768px tablet. A breadcrumb subject link returned to its proper hub using
  keyboard navigation. Installation help and the break-timer dialog opened and
  closed without changing the timer setting.
- The header button labelled “App” opens installation help rather than the
  student practice app. Its text is clarified to “Install”; its action is retained.

## Curriculum comparisons

Added 27 source-linked v8.4–v9.0 planning notes: all 24 Year 5 Maths topics,
plus Year 2 clock reading, Year 3 clock reading and Year 4 duration/conversions.
Related old codes are named only where supported by QCAA's comparison documents.
New or reorganised outcomes do not receive invented one-to-one mappings.

Two topics also name specifically inspected US and England content:

| Australian topic | US reference | England reference |
| --- | --- | --- |
| AC9M5N01 — decimal place value and comparison | Grade 5, CCSS 5.NBT.A.3 | Year 5 decimals to three decimal places |
| AC9M5N06 — multiplication of larger numbers | Grade 5, CCSS 5.NBT.B.5 | Year 5 multiplication by one- or two-digit numbers |

These are related-content comparisons, not official endorsements, identical
assessment coverage or blanket grade conversions. Method and scope differences
are stated on the pages. No global keyword-stuffing or URL migration is included.
Official source locators and the checked date are retained in
`data/verified-curriculum-context.json`.

## Fresh mobile performance evidence

Google PageSpeed Insights, mobile, 5 November 2026 (Australia/Sydney):

| Page | Performance | LCP | TBT | CLS | Accessibility / SEO |
| --- | ---: | ---: | ---: | ---: | --- |
| Homepage | 99 | 0.8 s | 140 ms | 0 | 100 / 100 |
| Year 5 Maths hub | 97 | 1.1 s | 100 ms | 0 | 100 / 100 |
| AC9M5N01 decimal lesson | 90 | 2.6 s | 20 ms | 0 | 100 / 100 |

Reports:
- https://pagespeed.web.dev/analysis/https-skillrhub-com/uw9bh8isrn?form_factor=mobile
- https://pagespeed.web.dev/analysis/https-skillrhub-com-year5-curriculum-maths/61y5pmda1l?form_factor=mobile
- https://pagespeed.web.dev/analysis/https-skillrhub-com-year5-maths-ac9m5n01-interpret-compare-and-order-numbers-with-more-than-2-decimal/ilu2xsdk07?form_factor=mobile

These are single-run laboratory results for the live pages before this candidate
is published. Google reported no real-user field data. They do not certify
site-wide Core Web Vitals or every device. The lesson's 2.6 s lab LCP is an
improvement opportunity; image delivery and blocking CSS were flagged.

The homepage fits 320px and 390px widths, its year links retain 44px targets,
and the sampled hub and topic fit the phone viewport. A worked decimal diagram
scrolls within its figure instead of widening the page. On the sampled lesson,
the practice/dashboard preview pushes the H1 about 1,900px below the top at
320px; a skip-to-learning link exists. This remains a mobile journey review
item rather than evidence that Google cannot read the lesson.

## Content-quality scope and remaining work

All 676 active topics received source pattern checks. The checks still flag
67 secondary English guides for generic teaching-framework wording; 40 of those
also ask for two comparison texts without necessarily supplying them. These
overlap and must not be summed. The code/path-specific queue is stored in
`data/seo-editorial-review-20261105.json`.

This is not 676 independent teacher reviews, a Google quality score or proof of
a duplicate-content penalty. No mass rewriting of these lessons is bundled
with navigation fixes. Code-specific text evidence, annotated answers and
independent teacher review remain required before closing the editorial queue.

## Preservation and verification

Reference: the approved Year 1 Maths static topic pattern. Retained sections:
topic heading and introduction; preview and its current availability state;
authored teaching, models, focuses and answers; native disclosures; worksheet
and Classroom View; matching optional product; practice/assessment destinations;
floating practice action; video and its ordering; existing discovery navigation;
metadata and runtime scripts. This is a navigation/context repair, not another
layout migration or a claim of full Year 1 style parity.

`python scripts/validate_breadcrumb_context.py BASE` checks all 676 paths and
schemas, and checks preservation of existing text, section headings, details
summaries, links and scripts against the baseline on every changed topic.
The existing discovery and Search/AI integrity checks also pass. Complete-tree
release integrity must pass before creating the review branch.
