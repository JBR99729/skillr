# US Common Core references in topic disclosures

This is a visible reference aid, not a US curriculum rollout, conversion of Australian year labels or announcement of equivalence. The live Australian lesson supplies the evidence. CCSS links point to the specific standard from the initiative's official publisher, and the visible note links each exact US grade and code, explaining that sequences and wording differ. The more detailed overlap and limits are recorded in the data file, not added to the guide. Maths and English only. This does not map Science to Common Core.

The November 2026 discovery experiment remains separate: 16 treatment pages, 16 paired controls and 16 holdouts. The allowlist rejects all 48 registered codes and paths, even existing treatments. Two Year 6 no-visual comparison guides (AC9M6N02 and AC9M6N04) are also protected. Do not expand or retrospectively change that experiment through this script. Nothing changes headings, search descriptions, keywords, structured-data payloads, curriculum paths or learning actions. Where an existing seven-region table includes a generic US grade reference, the specific US reference replaces only that cell. Other region cells remain unchanged. Other guides use the existing native curriculum or resource disclosure, not a second disclosure.

`data/us-ccss-disclosure-references.json` records each Australian code, existing canonical page, native disclosure, exact official standard link, observed lesson evidence, and limits. Scope was checked against the current topic examples and the official Common Core wording. This is a reference check, not a new independent review of question banks. No new curriculum content or publishers' materials are republished.

Run `node scripts/apply_us_ccss_disclosure_references.mjs --check` to check the 23 guides, or `--write` to reapply exactly the allowed changes. After applying to a clean topic refresh, compare against that refresh first. `--verify-base BASE` checks that a standalone patch changes no other files or HTML, including the experiment population. The existing broad equivalents renderer reads the same table-cell generator for listed tables; it need not be run for this work. For non-table guides, reapply the scoped script after a topic refresh that replaced the existing disclosure. A missing marker or evidence is an error to review, not permission to invent alignment.

## Source-checked coverage

| Australian guide | US Common Core partial references |
| --- | --- |
| [AC9EFLY09](/foundation/english/ac9efly09-and-generate-rhyming-words-alliteration-patterns-syllables-and/) | [RF.K.2.a](https://www.thecorestandards.org/ELA-Literacy/RF/K/2/a/), [RF.K.2.b](https://www.thecorestandards.org/ELA-Literacy/RF/K/2/b/) |
| [AC9EFLY10](/foundation/english/ac9efly10-sentences-into-individual-words-orally-blend-and-segment-single/) | [RF.K.2.e](https://www.thecorestandards.org/ELA-Literacy/RF/K/2/e/) |
| [AC9EFLY11](/foundation/english/ac9efly11-and-name-all-upper-and-lower-case-letters-graphs-and-know/) | [RF.K.1.d](https://www.thecorestandards.org/ELA-Literacy/RF/K/1/d/), [RF.K.3.a](https://www.thecorestandards.org/ELA-Literacy/RF/K/3/a/) |
| [AC9EFLY12](/foundation/english/ac9efly12-consonant-vowel-consonant-cvc-words-by-representing-sounds-with/) | [RF.K.3.d](https://www.thecorestandards.org/ELA-Literacy/RF/K/3/d/) |
| [AC9M1N05](/year1/maths/ac9m1n05-additive-problem-solving-and-money/) | [1.OA.A.1](https://www.thecorestandards.org/Math/Content/1/OA/A/1/) |
| [AC9M1ST02](/year1/maths/ac9m1st02-representing-and-comparing-data/) | [1.MD.C.4](https://www.thecorestandards.org/Math/Content/1/MD/C/4/) |
| [AC9M6A01](/year6/maths/ac9m6a01-and-use-rules-that-generate-visually-growing-patterns-and-number/) | [6.EE.C.9](https://www.thecorestandards.org/Math/Content/6/EE/C/9/) |
| [AC9M6A02](/year6/maths/ac9m6a02-find-unknown-values-in-numerical-equations-involving-brackets/) | [6.EE.B.5](https://www.thecorestandards.org/Math/Content/6/EE/B/5/) |
| [AC9M6M01](/year6/maths/ac9m6m01-convert-between-common-metric-units-of-length-mass-and-capacity/) | [5.MD.A.1](https://www.thecorestandards.org/Math/Content/5/MD/A/1/) |
| [AC9M6M02](/year6/maths/ac9m6m02-establish-the-formula-for-the-area-of-a-rectangle-and/) | [3.MD.C.7.a](https://www.thecorestandards.org/Math/Content/3/MD/C/7/a/), [3.MD.C.7.b](https://www.thecorestandards.org/Math/Content/3/MD/C/7/b/), [4.MD.A.3](https://www.thecorestandards.org/Math/Content/4/MD/A/3/) |
| [AC9M6M03](/year6/maths/ac9m6m03-interpret-and-use-timetables-and-itineraries-to-plan-activities/) | [3.MD.A.1](https://www.thecorestandards.org/Math/Content/3/MD/A/1/) |
| [AC9M6M04](/year6/maths/ac9m6m04-the-relationships-between-angles-on-a-straight-line-angles-at/) | [4.MD.C.7](https://www.thecorestandards.org/Math/Content/4/MD/C/7/) |
| [AC9M6N01](/year6/maths/ac9m6n01-situations-including-financial-contexts-that-use-integers/) | [6.NS.C.5](https://www.thecorestandards.org/Math/Content/6/NS/C/5/), [6.NS.C.6.c](https://www.thecorestandards.org/Math/Content/6/NS/C/6/c/), [6.NS.C.7.a](https://www.thecorestandards.org/Math/Content/6/NS/C/7/a/) |
| [AC9M6N03](/year6/maths/ac9m6n03-apply-knowledge-of-equivalence-to-compare-order-and-represent/) | [4.NF.A.1](https://www.thecorestandards.org/Math/Content/4/NF/A/1/), [4.NF.A.2](https://www.thecorestandards.org/Math/Content/4/NF/A/2/) |
| [AC9M6N05](/year6/maths/ac9m6n05-solve-problems-involving-addition-and-subtraction-of-fractions/) | [5.NF.A.1](https://www.thecorestandards.org/Math/Content/5/NF/A/1/) |
| [AC9M6N06](/year6/maths/ac9m6n06-multiply-and-divide-decimals-by-multiples-of-powers-of-10/) | [5.NBT.A.2](https://www.thecorestandards.org/Math/Content/5/NBT/A/2/) |
| [AC9M6N07](/year6/maths/ac9m6n07-solve-problems-that-require-finding-a-familiar-fraction-decimal/) | [6.RP.A.3.c](https://www.thecorestandards.org/Math/Content/6/RP/A/3/c/) |
| [AC9M6P01](/year6/maths/ac9m6p01-that-probabilities-lie-on-numerical-scales-of-0-1/) | [7.SP.C.5](https://www.thecorestandards.org/Math/Content/7/SP/C/5/) |
| [AC9M6P02](/year6/maths/ac9m6p02-conduct-repeated-chance-experiments-and-run-simulations-with-an/) | [7.SP.C.6](https://www.thecorestandards.org/Math/Content/7/SP/C/6/), [7.SP.C.7](https://www.thecorestandards.org/Math/Content/7/SP/C/7/) |
| [AC9M6SP02](/year6/maths/ac9m6sp02-locate-points-in-the-4-quadrants-of-a-cartesian-plane/) | [6.NS.C.6.b](https://www.thecorestandards.org/Math/Content/6/NS/C/6/b/), [6.NS.C.8](https://www.thecorestandards.org/Math/Content/6/NS/C/8/) |
| [AC9M6ST01](/year6/maths/ac9m6st01-interpret-and-compare-data-sets-for-ordinal-and-nominal/) | [6.SP.A.2](https://www.thecorestandards.org/Math/Content/6/SP/A/2/), [6.SP.B.4](https://www.thecorestandards.org/Math/Content/6/SP/B/4/) |
| [AC9M6ST02](/year6/maths/ac9m6st02-statistically-informed-arguments-presented-in-traditional-and/) | [7.SP.A.1](https://www.thecorestandards.org/Math/Content/7/SP/A/1/) |
| [AC9M6ST03](/year6/maths/ac9m6st03-plan-and-conduct-statistical-investigations-by-posing-and/) | [6.SP.A.1](https://www.thecorestandards.org/Math/Content/6/SP/A/1/), [6.SP.B.5.b](https://www.thecorestandards.org/Math/Content/6/SP/B/5/b/) |
