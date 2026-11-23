# US CCSS discovery experiment — 23 November 2026

Owner request: add relevant US CCSS references, preferably around familiar US learning topics, and experiment within the same 48 strong pages used for the NSW/Victorian SEO release.

## Registered scope

Population: the existing 48-page manifest. Sixteen pages receive a treatment; sixteen remain paired comparison pages; sixteen are held out. Allocation is fixed in `data/us-ccss-experiment-20261123.json` using the recorded SHA-256 seed within predeclared year/subject/learning-family pairs. The pairs are broad content strata, not fresh traffic-matched pairs, and do not establish statistical power.

The three Science guides receive no CCSS treatment. Other held-out pages include repeating-pattern guides without a directly inspected standalone CCSS match. Australian year labels are not converted automatically to US grades.

The treatment changes descriptions (including existing social and primary LearningResource descriptions), adds one short static paragraph inside the existing resource-information disclosure, and adds one exact official US standard reference to that page’s primary LearningResource. All search titles, AC9 codes, NSW/Victorian references, existing alignment objects, authored lessons, examples, answers, resource destinations, samples, prices, scripts, images, IDs, canonicals and indexing settings are preserved. No new URL, visitor tracking, keyword meta tag, framework-wide claim, test bank or US course is created.

## Source-checked relationships

Each official individual standard below was opened. Its scope was compared with specific examples in the existing visible `#topic-guide`. The manifest retains an observed same-page anchor, a short evidence excerpt, the baseline page hash, the US grade and the partial-support boundary. These checks concern the proposed relationship; they are not a new full teacher review or certification of every lesson/assessment.

| Australian lesson | Related US code | US grade | Official standard |
| --- | --- | --- | --- |
| AC9MFN01 | K.CC.A.3 | Kindergarten | [Number names and numerals to 20](https://www.thecorestandards.org/Math/Content/K/CC/A/3/) |
| AC9M1N01 | 1.NBT.A.1 | Grade 1 | [Counting and representing numbers to 120](https://www.thecorestandards.org/Math/Content/1/NBT/A/1/) |
| AC9M1N04 | 1.OA.C.6 | Grade 1 | [Addition and subtraction strategies within 20](https://www.thecorestandards.org/Math/Content/1/OA/C/6/) |
| AC9M2N02 | 2.NBT.A.1 | Grade 2 | [Hundreds, tens and ones](https://www.thecorestandards.org/Math/Content/2/NBT/A/1/) |
| AC9M2N05 | 2.OA.C.4 | Grade 2 | [Arrays and repeated addition](https://www.thecorestandards.org/Math/Content/2/OA/C/4/) |
| AC9M2A03 | 2.OA.B.2 | Grade 2 | [Addition strategies within 20](https://www.thecorestandards.org/Math/Content/2/OA/B/2/) |
| AC9M3N01 | 4.NBT.A.2 | Grade 4 | [Reading and comparing whole numbers](https://www.thecorestandards.org/Math/Content/4/NBT/A/2/) |
| AC9M3A03 | 3.OA.B.5 | Grade 3 | [Multiplication properties and strategies](https://www.thecorestandards.org/Math/Content/3/OA/B/5/) |
| AC9M3M04 | 3.MD.A.1 | Grade 3 | [Clock time to the nearest minute](https://www.thecorestandards.org/Math/Content/3/MD/A/1/) |
| AC9M4N03 | 4.NF.A.1 | Grade 4 | [Equivalent fractions with visual models](https://www.thecorestandards.org/Math/Content/4/NF/A/1/) |
| AC9M4A02 | 3.OA.C.7 | Grade 3 | [Multiplication and division facts within 100](https://www.thecorestandards.org/Math/Content/3/OA/C/7/) |
| AC9M4M03 | 3.MD.A.1 | Grade 3 | [Elapsed time in minutes](https://www.thecorestandards.org/Math/Content/3/MD/A/1/) |
| AC9M5N01 | 5.NBT.A.3.b | Grade 5 | [Comparing decimals to thousandths](https://www.thecorestandards.org/Math/Content/5/NBT/A/3/b/) |
| AC9M5N03 | 4.NF.A.2 | Grade 4 | [Comparing fractions with visual reasoning](https://www.thecorestandards.org/Math/Content/4/NF/A/2/) |
| AC9M5N07 | 5.NBT.B.6 | Grade 5 | [Whole-number division strategies](https://www.thecorestandards.org/Math/Content/5/NBT/B/6/) |
| AC9E1LA07 | L.1.1.f | Grade 1 | [Using familiar adjectives](https://www.thecorestandards.org/ELA-Literacy/L/1/1/f/) |

Examples of bounded support: Year 2 doubling supports selected addition facts in 2.OA.B.2, not every fact required for fluency; Year 3 whole-number place value supports 4.NBT.A.2 only up to the US limit of 1,000,000; the Year 4 multiplication guide supports 3.OA.C.7 without certifying individual fluency; Year 5 fraction comparisons connect to US Grade 4 examples with related denominators. The English tag is L.1.1.f for familiar adjectives; noun, pronoun and verb coverage is not incorrectly labelled as that adjective substandard.

Structured data uses `AlignmentObject` with `alignmentType: educationalSubject`, an exact standard URL and a selected-support description. Existing Australian and state mappings are retained. Main educationalLevel stays the Australian year. Schema describes the visible relationship and does not promise a Google rich result or ranking gain.

## Demand and baseline limits

No claim that these are the most popular or highest-volume US codes is made. They are source-checked candidates in number, place value, arithmetic, fractions, time and grammar. The Search Console connector discovered the correct site but rejected data reads under its connected-account/plan limit; the direct browser report was signed out. No account connections, billing settings or credentials were changed. No error response was interpreted as zero traffic.

Baseline analysis is therefore pending, not complete. Historical search exposure used to choose the 48-page pool remains dated evidence; it is not a current US keyword-volume ranking. Raw private analytics are not committed to the public repository.

## Measurement plan

Retrospective baseline: 12 October–22 November 2026 (42 days). Exclude the 23 November rollout day. Observation window: 24 November 2026–4 January 2027 (42 days); query finalized Search Console data after its reporting delay. These are fixed analysis windows, not a reminder or scheduled task.

Primary measure: US organic search clicks for treatment versus paired controls over the same windows. Report absolute clicks/impressions, click-through rate as total clicks divided by total impressions, exact standard-code query coverage and plain-topic query coverage. Keep country and canonical page in the export. Australian clicks and CTR are a guardrail. Do not compare raw sums of page-average CTRs or interpret site exposure as total keyword demand.

The same-day NSW/Victorian update affects both cohorts and is a confounder, alongside crawl latency, different page demand, school holidays and small counts. Report a descriptive difference in changes with uncertainty; no causal-growth or significance claim from a simple rise. If either cohort has little data, call the result inconclusive. Check recrawl/indexability and retain the registered windows rather than moving dates to favour a result.

Rollback or revise if the references are misleading, an indexing/access regression appears, or Australian performance declines materially relative to controls. Reverting this scoped patch removes the pilot; there is no database migration. No automatic follow-up, paid analytics change or new event collection is installed.

## Verification and reproduction

Reference pattern: `docs/year1-topic-page-design-benchmark.md`. Preserve every heading and native disclosure summary, complete authored teaching, visuals and answers, existing resource actions, navigation, same-code routes and section IDs. The sole visible addition is one bounded US-reference paragraph in an existing disclosure.

`python scripts/apply_us_ccss_experiment.py` applies only the sixteen explicit treatments; `--check` performs an idempotency check. The normal topic/sample metadata helper preserves the registered descriptions. `python scripts/validate_us_ccss_experiment.py` independently compares the full 48-page pool against the recorded main base, validates the source anchors, exact new US nodes, description parity and indexability, and proves that all 32 non-treatment pages are byte-identical. It also proves that every old primary alignment and every old equivalence graph is retained.

Per-page hashes and preservation results are in `docs/qa/us-ccss-experiment-20261123.json`. Full topic/sample consistency, free-sample policy, static layout/architecture, search integrity and complete-tree release checks run before merge. Exact-head CI and live publication results are recorded in the pull request; a draft commit is not a live experiment or a measured result.

The original regional metadata validator remains a historical baseline check for the pre-CCSS phase. The CCSS experiment validator is the applicable preservation check for this registered treatment.

Technical references: [Google’s supported metadata](https://developers.google.com/search/docs/crawling-indexing/special-tags), [Schema.org AlignmentObject](https://schema.org/AlignmentObject), and the individual official CCSS sources above.
