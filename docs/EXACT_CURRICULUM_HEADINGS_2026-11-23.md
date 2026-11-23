# Exact curriculum wording pilot — 23 November 2026

Owner request: put exact curriculum descriptions in the H1 and search metadata on some code pages.

Four existing Australian Curriculum v9.0 Mathematics pages receive the code followed by the complete, unabridged content description in their sole visible H1, meta description, existing Open Graph/Twitter description fields and same-page LearningResource descriptions. The national descriptor is copied from the existing curriculum catalogue and checked against the official QCAA Australian Curriculum v9.0 alignment documents linked in the manifest. Punctuation and wording are preserved; the code and colon are a prefix.

| Code | Existing topic | Official description source |
| --- | --- | --- |
| AC9M4N04 | Counting and locating fractions | [QCAA Year 4, page 1](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_yr4_as_cd_alignment.pdf) |
| AC9M5A01 | Multiplication and division fact families | [QCAA Year 5, page 1](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_yr5_as_cd_alignment.pdf) |
| AC9M6N01 | Integers and Cartesian coordinates | [QCAA Year 6, page 1](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_yr6_as_cd_alignment.pdf) |
| AC9M6A01 | Growing patterns with rational numbers | [QCAA Year 6, page 2](https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_yr6_as_cd_alignment.pdf) |

These pages sit outside all 48 pages registered in the NSW/Victoria and US CCSS experiment, leaving its treatment, comparison and held-out pages unchanged. This pilot uses Australian descriptors; it does not assert that they are the exact wording of a US or state standard.

Search titles retain their current concise topic wording. All teaching paragraphs, subheadings, worked examples, answers, resource links, free-sample notices, code/year labels, IDs, assets, scripts, navigation, curriculum alignments, canonicals and indexing remain as before. No new pages or practice banks are created. A full descriptor can exceed a typical snippet length; search engines may truncate or rewrite snippets. No search uplift or full curriculum-resource review is claimed.

The explicit scope, previous H1, existing title, source links and baseline hashes are in `data/exact-curriculum-headings-20261123.json`. Run `python scripts/apply_exact_curriculum_headings.py` to apply only these four pages; add `--check` to verify idempotency. The shared topic metadata helper preserves this wording during future sample maintenance. Do not run a site-wide generator to apply this pilot.

`docs/qa/exact-curriculum-headings-20261123.json` records exact wording, metadata consistency and preservation against the complete recorded base. Existing topic/sample, static-layout, CCSS preservation, search-integrity and release-integrity checks apply. Exact-head CI and live deployment evidence are recorded in the pull request.
