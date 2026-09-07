# Teach & Explain

Public browsing starts at `/teach-and-explain.html`, then year, subject and topic/product.
Use the existing shared `data/print-and-go-products.json` catalogue for both shops:
`resourceType: "worksheet"` or `resourceType: "teaching-slides"`. Legacy entries default
to worksheet. Search keeps the two resource types separate and paginates at 24 results.

No paid slide product has been published in this release. Empty year and subject cards
are noninteractive. Do not invent a purchase URL, slide count, preview or completion claim.

## Publish a finished slide pack

1. Complete and review the actual pack and publish its TPT listing.
2. Add a record using the existing worksheet fields, plus `resourceType`, `includes`
   (array), `learningGoals` (array) and `format` (text). Use year 0 for Foundation,
   subjects `maths`, `science` or `english`, and a unique URL shaped like
   `/teach-and-explain/year-3/maths/time-teaching-slides/`.
3. Supply an actual preview image under `/assets/`, accurate USD price and TPT URL.
   Describe explicitly whether worksheets are included or sold separately in `includes`.
4. Set `available: true` only when purchase and preview links work. Run
   `python scripts/generate_teach_explain.py` to build the static catalogue and details.
5. Add populated routes to `sitemap-site.xml`, verify links, and follow the repository
   release-integrity instructions. For large subjects add static listing pagination
   before allowing the initial browse page to grow beyond 24 cards.

Each generated page includes a sample-request email button. The sample request asks
teachers to follow SkillrHub on TPT and email the year, subject and topic/code. Reviews
are optional and honest; a positive review is never a condition of receiving a sample.
No emails are sent automatically and no follow verification or account system is added.

Classroom Display's existing final commercial section links to both shops and the
sample request. `assets/resource-links.js` additionally matches published slide packs
by exact curriculum code and links to their details. Existing free classroom content
and controls remain intact; commercial links do not replace teaching content.

## Site-wide shortcuts

`assets/resource-links.js` provides one native collapsible floating menu with Print & Go
and Teach & Explain. It is loaded via shared PWA, share/footer, homework and slide-viewer
helpers. Standalone HTML pages include it directly. New standalone pages must include
`<script src="/assets/resource-links.js?v=1" defer></script>` before `</body>`.
The menu closes on Escape/outside click, hides during fullscreen and print, and reserves
bottom spacing. Keep the guard: several helpers may load on the same page.
