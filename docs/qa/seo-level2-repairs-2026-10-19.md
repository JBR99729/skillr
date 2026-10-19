# Organic-search repair batch — 19 October 2026

Scope: two existing activity pages, plus native Search Console live inspection and one indexing request. No new landing pages, question-bank changes, canonical changes or mass indexability changes.

## Prepared corrections

- AC9M3M03 Practice: replace the generic “Worked example” with a complete 2 minutes = 120 seconds example and a specific base-100 misconception correction.
- AC9S2I01 Test: make the year, topic and assessment purpose explicit in the title, description and H1; replace generic support copy with the actual assessment purpose, independent-work/adult-review instructions and the limitation of a five-question shuffled attempt.
- Preserve every existing resource link, stylesheet/script URL, canonical, robots directive, question bank, question count, storage key, result/review route and runtime configuration on both pages.

## Canonical conflict: retain unique content

The earlier audit observed Google selecting `/quiz/year-2/science/ac9s2i01/quiz/` instead of `/test/`. Before redirecting or deindexing it, source inspection established that it loads a different legacy bank: 50 quiz questions; current Practice and Test contain 24 and 16 production questions. The legacy loader also has separate older Practice/Test arrays. Exact bank equivalence is not established. Therefore this batch does not redirect, remove, cross-canonicalise or deindex the legacy quiz. It differentiates the Test search entry. Google's selection remains pending re-evaluation after recrawling; the conflict is not declared resolved.

## Native Search Console work

- Product `/products/tpt-17737649/`: live test passed (“URL is available to Google”; page can be indexed). Google reported valid Product, Merchant Listing and Breadcrumb items, with noncritical product warnings. Request indexing was accepted into the priority crawl queue. This is not confirmation that indexing or rankings improved.
- AC9M2M04 topic guide: existing index record remains Crawled — currently not indexed, last crawl 11 August. A live test returned Search Console's “Something went wrong; try again in a few hours” service message. No successful live-test or reindex request is claimed for this guide.
- No bulk indexing requests, new sitemap submissions, removals, automated messages or scheduled monitoring were performed.

## Historical 404

The exact obsolete Year 6 financial-mathematics URL produced no result in the GitHub code-search lookup. The 48-page audit sample contained no broken internal target. This does not prove the entire repository has no reference. A relevant replacement for the invalid AC9M6M06 slug has not been verified, so no speculative redirect was added. This low-impact item remains a mapping task.

## Checks before publication

- Both changed HTML pages parsed successfully; one H1, retained nonempty description and self-canonical.
- All original links and asset URLs preserved in order.
- All script tags, inline runtime configuration and question-bank references byte-identical.
- Worked conversion independently checked: 2 × 60 = 120 seconds.
- Complete candidate tree must be compared with the fresh main tree, with zero deleted paths, unchanged core/CNAME files and only these two pages plus this log changed.
- After release, confirm Pages deployment success and live page content and activity start/marking flow. Hosted checks and live verification must be reported from their actual results, not inferred from the commit.

No full curriculum-code or question-bank QA sign-off is implied by this copy-only repair. These changes address observable defects; they are not a claim to have solved the site's organic-reach problem.
