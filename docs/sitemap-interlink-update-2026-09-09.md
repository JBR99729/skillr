# Sitemap and internal-link maintenance — 9 September 2026

Published sitemap entry point: https://skillrhub.com/sitemap.xml

The submitted sitemap remains 13 child maps and 1,036 canonical URLs. No URLs were added or removed. The full generated set, including the separate practice map, contains 2,517 unique self-canonical, indexable pages. Practice/Test utilities remain outside the submitted root index. There are 315 lastmod updates reflecting available recent page history and this release's link edits; established dates are retained when shallow Git history cannot establish a change.

## Link improvements

- Fixed four missing destinations affecting six links: Foundation counting/number-recognition worksheet and practice links, and two Year 3 time topic-guide links.
- Added relevant worksheet-guide links to seven Foundation–Year 6 Maths worksheet hubs, including the Year 2 twos facts guide.
- Linked four previously undiscoverable articles from Blogs and lesson/assessment resources from the matching Year 1, 2 and 4 teaching hubs.
- Replaced 31 redirecting Science topic-guide links with canonical destinations in the Year 9 and 10 curriculum hubs. Existing Classroom View URLs remain in place.
- Connected About, Ben and Vani guidance, and the How to use page. Added terms/citation-policy links from About.
- Restored Learn, Teach, Products and Homeschool links in the human sitemap, increasing its curated links from 59 to 63. Updated the tidy script so refreshes retain them.

## Validation

The static-link audit covers the 1,036 submitted pages. Excluding sitemap.html as a discovery source, pages without another incoming link fell from 41 to zero. Missing local link destinations fell from four to zero. This checks static anchors and local target existence; it does not establish external-link health, fragment validity, search rankings or search-engine indexing.

Both sitemap validators pass: unique URLs, correct hosts, local page existence, canonical/indexability checks, noindexed-page exclusions and submission-map membership. A shallow-history regression check confirms that a boundary commit cannot replace a published date when page history is unavailable.

Reusable audit: `python scripts/audit_submitted_internal_links.py`.

References: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [crawlable-link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
