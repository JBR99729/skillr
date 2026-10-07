# TpT resource context maintenance — 7 October 2026

Scope: the owner requested factual AI-discovery improvements for all listed
TpT curriculum codes while preserving current SEO. This is an additive resource
information change, not a curriculum review or a new verification badge.

## Evidence and coverage

- Inspected all seven pages of the live Skillrhub store: 124 resource listings.
- Reconciled the existing product inventory, Print & Go catalogue and Year 1
  teaching catalogue against the observed product IDs. Added 42 previously
  absent listings and an updated explicit Year 3 fractions bundle mapping.
- Added static resource facts to 102 existing canonical topic pages: Foundation
  Maths (12), Science (9), English (1); Year 1 Maths (15), Science (10), English
  (28); Year 2 Maths (18); Year 3 Maths (5); Year 4 Maths (2); Year 5 Maths (1);
  Year 6 Maths (1).
- Opened the Year 2 full-year workbook listing. Its full description explicitly
  covers all five strands, and the listed topics support its relationship with
  the 18 canonical Year 2 Maths codes.
- Opened the Year 5 reading starter listing. It does not specify a curriculum
  code; it remains in the download directory without an invented exact mapping.
- Other listings without an established exact mapping remain in the directory:
  17621276, 17204859, 17594338, 17204897, 17593227.
- Retained existing catalogue resource names for previously recorded resources;
  the snapshot verifies listing presence, not an exact title/price refresh for
  every old resource. New resource names and URLs are copied from the live store.
- Two pre-existing Classroom View destinations have no repository file:
  AC9E1LE05 and AC9E1LY01. No new link or availability claim is made for them.
  Existing links and lesson content are preserved for separate scoped repair.

## Changes

Each affected topic page has one native collapsed About this resource section:
year, subject, strand, exact code, curriculum version, descriptor, publisher,
worksheet/practice/test links and optional TpT downloads. Existing Classroom
Views are linked where the destination exists. Fraction notation copied from
the source catalogue is expressed as readable fractions in the new facts.

Supplementary JSON-LD references the existing LearningResource ID and connects
related downloads with `subjectOf`. It does not equate paid downloads with the
free page, invent ratings, assert credentials, publish prices or add unverified
answer-key/question-count claims. Publisher identity uses the existing SkillrHub
Organization ID and verified TpT storefront.

Print & Go gains a static collapsed code/download directory alongside its
existing interactive catalogue. A factual JSON directory and links from the
existing AI index and llms files expose the same relationships. These files are
navigation aids, not evidence that an AI system uses them or a ranking promise.

## Validation

`python scripts/validate_tpt_resource_context.py BASE`

The validator compares every changed page with the original Git version after
removing only the owned additions. Existing HTML, title, description, H1,
canonical, lesson content and resource flow must match. It checks every added
local destination and fragment, JSON-LD, matching product/code relationships,
all 124 directory links and preservation of the existing AI index/llms content.

Rebuilding must be idempotent. Complete-tree release integrity and unchanged
CNAME, sitemap, robots.txt and workflows must be checked before main moves.

References used to temper earlier GEO claims:
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

Google does not require special AI markup and states that its search systems
ignore llms.txt. There is no guarantee of recommendations, citations, ranking
gains or unchanged rankings after adding page information.
