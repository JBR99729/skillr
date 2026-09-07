# Print & Go catalogue

Hierarchy: `/print-and-go.html` -> year -> subject -> product detail.
Only categories with published, available products are clickable. Empty categories
remain noninteractive and must not have indexable placeholder pages.

## Adding a product

- Add its record to `data/print-and-go-products.json` using the existing fields.
- Create a static detail page and a compact card on its year/subject listing.
- Activate the relevant year and subject links only when the product is published.
- Give new populated pages unique titles, descriptions, canonicals and breadcrumbs.
- Keep Product offers consistent with the live seller listing. Do not invent reviews.
- Add populated pages to `sitemap-site.xml` and link from related practice/results.
- Check the cover, price, curriculum links and purchase destination.

Search uses the shared index, scoped by body `data-year` and `data-subject`.
All search terms must match; results paginate at 24 products. Search state does not
create URL variants. Static navigation works without JavaScript or if loading fails.
As a subject grows beyond 24 products, split its static browse listing into linked,
self-canonical numbered pages too; search pagination is already independent.

Run `node scripts/test_print_catalogue.cjs` and
`python scripts/check_print_catalogue.py`, followed by the repository release guard.
Verify the live navigation and search after Pages deploys.
