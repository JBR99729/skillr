# Public landing-page Analytics coverage

The shared loader is `assets/site-analytics.js`. Indexable public HTML that had
no active Google tag now includes that deferred script in its head. Existing
inline tags, homepage loading and homework-runtime tracking are preserved.
The stream remains `G-8P22BET45N`; no new Analytics property is created.

The loader initializes once on production, respects the existing GA disable
flag and QA/review exclusions, disables advertising signals, and omits arbitrary
query parameters, fragments and referrer queries. Campaign parameters and the
public year/subject catalogue filters are retained. No learner/account IDs,
answers, form values or link text are sent by the new navigation event.

`site_navigation_click` records the destination host and path for links to the
main site and app. It measures website navigation, not Google search clicks.

Run `python3 scripts/check_google_tag_coverage.py` to check every tracked HTML
file, or add `--write` to insert the shared loader on missing eligible pages.
The checker parses HTML so commented tags do not count as active tracking.
Redirect stubs, noindex/private/error/offline pages are outside its landing-page
scope. Run `node --test scripts/tests/site-analytics.test.mjs` for initialization,
duplication, production/QA boundaries, URL sanitization and navigation tests.
The small path-filtered workflow alerts on future coverage gaps; it does not
claim to gate the independent GitHub Pages deployment pipeline.

Search Console does not depend on this tag. Missing GA coverage may lose the
original landing page and attribution, but cannot cause missing GSC impressions.
GSC indexing, canonical selection and search visibility require separate review.

After publication, verify the Google script and collection request on one newly
tagged landing page and check GA Realtime with consent/blocking taken into account.
Local/preview hosts do not send production Analytics. Historical missed visits
cannot be recovered. Roll back the added script references and shared loader to
restore prior coverage without changing content or SEO metadata.
