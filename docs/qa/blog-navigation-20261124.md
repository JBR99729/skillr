# Blog navigation repair — 24 November 2026

Base: `b2012b5c3de84567ef7c78ed63fb2fa888319c94`.

## Scope

- Repair 39 stale section links on 25 blog pages: 24 curriculum-browser links now open Learn, nine teacher-slide links open the matching fixed viewer, and six obsolete printable-directory links open Products.
- Replace 26 additional links through retired aliases with their current destinations: 16 printable-directory links and ten links to the consolidated Class 1–5 India guide, retaining the matching class section.
- Give all 95 indexable blog pages one static, accessible breadcrumb trail and one matching BreadcrumbList. Add 53 missing visible trails and 93 missing schemas; preserve other structured data.
- Preserve all authored article content, titles, descriptions, robots directives, canonicals and sitemaps. The five retired India blog stubs remain byte-identical. Topic guides, activity routes and question banks are outside this change.

## Validation

- `python scripts/validate_blog_navigation.py`: 100 blog pages, 95 indexable blogs, five noindex redirects, 3,670 internal links, zero errors. Checks file and section existence, visible/schema breadcrumb parity, current-page state, canonical/sitemap alignment and indexable breadcrumb destinations.
- A temporary missing-section probe on an existing destination was rejected by the new validator and then removed.
- `python scripts/validate_discovery_navigation.py`: 9,709 HTML pages, 1,320 sitemap URLs, 676 code lessons, zero errors.
- The six existing breadcrumb/routing preservation tests pass. The existing blog CTA validator passes for all 83 main-directory articles after correcting its obsolete printable-directory requirement. Blog campaign builders now use the current Learn destination in their fallback/CTA links; they were not executed or used to regenerate articles.
- `python scripts/validate_us_ccss_experiment.py`: the 16 treatments and 32 byte-identical comparison/held-out pages pass.
- Base/candidate comparison confirms the 95 authored article bodies differ only by the approved anchor replacements and breadcrumb navigation. Other JSON-LD nodes and page metadata are preserved; the five retired blog stubs are unchanged.

The Release integrity workflow now runs the blog validator to catch section-anchor regressions as well as breadcrumb omissions. CI, complete-tree integrity and Pages/live verification are separate release gates. This repair does not establish that these navigation defects caused a measured ranking or impression decline.
