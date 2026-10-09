# Topic Print & Go links

Owner requested paid individual worksheet links immediately after the free printable resource, with available term and full-year subject options near the top of matching topic pages. The owner also requested clear descriptions of the curated paid contents and actual Practice/Test counts.

`python3 scripts/link_topic_print_options.py` adds only owned HTML blocks and one scoped stylesheet link. It uses available paid printable catalogue records and exact curriculum-code/year/subject matches. It retains the previously documented Year 2 full-year workbook crosswalk. Slides-only bundles are excluded. Unpublished bundle links and universal question-count claims are never generated.

57 topic pages have published pack options; 38 have an individual printable pack and 46 have a related bundle or full-year workbook. Year 1 Maths and Science show matching term/year bundles. English currently shows its published individual packs. Existing free learning resources and authored lesson HTML are preserved.

Verification: `python3 scripts/validate_topic_print_options.py BASE` checks original HTML preservation, catalogue membership, local free routes, free→paid ordering, and idempotence. The F–10 topic layout contract remains unchanged.
