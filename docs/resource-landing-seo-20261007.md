# Resource landing page SEO — 7 October 2026

Goal: help Australian teachers, homeschool families and parents recognise relevant printable resources and teaching support.

- Print & Go now leads with Australian Curriculum worksheets and printable packs, rather than a generic TpT product catalogue. Its introduction explains subjects, year/topic/code search and the TpT preview/download step.
- Teach & Explain targets teaching slides and explanation resources, while `/teach/` targets free teaching resources by year. Titles, descriptions, headings, social metadata and CollectionPage descriptions agree with their different purposes.
- Contextual links connect these landing pages to free worksheets and homeschool planners. Product and homeschool hub cards use descriptive resource names.

Only five existing landing pages changed. Canonicals, robots directives, sitemap membership, curriculum pages, product data, catalogue cards, scripts, prices, app registration messaging and the 124-listing curriculum directory are preserved. No ranking or traffic increase is claimed; the changes require recrawling and subsequent Search Console measurement to assess their effect.

Verification: Search/AI integrity audit passed with zero errors/warnings. Focused HTML checks passed for a single H1, valid JSON-LD, existing internal targets, unchanged canonicals/robots/scripts, and unchanged Print & Go product cards and resource directory. Release integrity checked before publication.

Existing catalogue checker limitation: `check_print_catalogue.py` treats an unchanged external TpT product URL as a local `/Product/.../index.html` file and fails before checking offers. The catalogue data and checker were not modified in this release.

Maintenance: legacy landing-page generators can overwrite authored copy. Preserve these targeted titles, descriptions and introductions if those generators are updated or used later.
