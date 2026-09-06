# Year 1 Maths original bank

Owner-requested one-time import, 6 September 2026. Version: `20260906-y1-original-v1`.

Large independently authored banks across all Year 1 Maths curriculum codes.
Each code has separate Practice and Test banks.
The source includes multiple-choice items, short tasks and semantic visuals.
Some short tasks have explicit automatic acceptance rules, while others require
an adult to check the requested evidence.

`bank-data.json` and `year1-maths-bank.csv` are the editorial source snapshot.
`scripts/import-year1-visual-bank.py` performs the explicitly scoped import.
The runtime serves short shuffled attempts from the relevant bank.

Drawings, models and explanations are saved for adult review. They do not award
correctness for completion. The Review answers page provides the model, marking
guidance and adult marking controls. Pending tasks are excluded from accuracy;
a Test cannot pass until every task has been marked.
Best scores and attempt results use the new bank version.
Historical dashboard attempts remain available and carry their original version.

The existing single-page worksheet generator has its prior bank preserved in
each code's `worksheet/questions.js`; it cannot yet render these full visual
prompts without truncation. Topic Guides, Teacher Slides and worksheets keep
their existing routes. The separate US Letter workbook contains the full new
bank with answers and explanations at the back; it is not published here.

IXL references record representative format observations, not copied questions
or an adaptive-bank scrape. Curriculum and reference links remain editorial
metadata and are not presented as product affiliation or endorsement.
