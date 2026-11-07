# Foundation–Year 3 Science consolidated release

Base: `4023119cc0224ea924886cbdb5b5e8ad50c9a91a`.

Combines the four owner-approved review batches: nine Foundation, ten Year 1, ten Year 2 and twelve Year 3 topic pages. Existing code routes, titles, descriptions, canonical URLs and non-breadcrumb structured data remain. No question banks, teacher slides, worksheet assets, authentication or progress code changes.

Integration repairs: remove Foundation's superseded sidebars, duplicate app actions, resource-facts and equivalence panels while retaining its 85 reviewed educational sections. Keep the other batches' 53 Year 1 focused explanations, 75 Year 2 and 92 Year 3 teaching sections. Restore code-matched worksheets and Classroom View links, one return-navigation block, shared About/Editorial links and current breadcrumb metadata. Use the current main-branch app-button synchronizer for all 41 topics, including exact canonical return destinations and verified access/catalogue filters. Teachings and answer reveals remain native HTML.

The activity validator now accepts the site's canonical `returnTo` parameter only when it equals the page's canonical URL, retaining checks for exact code, published availability and guest/account access. Unit tests reject absent/mismatched canonical returns, wrong access and unknown parameters.

## Local verification

- All four year-level static Science validators: pass (41/41).
- Preservation and DOM checks: pass; 818 native disclosure open/close checks across 41 pages. Foundation compares with its reviewed branch; Years 1–3 compare with the unchanged main baseline, including recorded Year 3 factual corrections.
- Code-aware app buttons: pass across 676 canonical topic pages.
- Discovery navigation, 53,585 internal anchors, breadcrumb normalisation/preservation, search/indexability, Google entity graph, curriculum route integrity, static curriculum and fixed teacher architecture: pass.
- Video policy check and nine related tests: pass; five retired-route tests pass; retirement/hub generators make no changes.
- Rendered verification runs separately in the scoped PR browser job at 1440, 768 and 390 pixels, with JavaScript disabled and a JavaScript-enabled smoke pass. Local Chromium cannot start (`socket(): Operation not permitted`); the connected browser cannot reach the local server. These local limitations are not reported as browser passes.

`pages.json` records the final integrated HTML fingerprints. Historical batch reports describe the artifacts at their original review commits; this release record and the scoped browser artifact describe integration changes. Production deployment and live checks must be verified after the main ref is updated. The previous main Pages deployment timed out during file synchronisation; this is distinct from publishing a Git commit.
