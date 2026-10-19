# Bing content-quality repair batch — 19 October 2026

Owner requested repairs to Bing's flagged URLs and publication to public `JBR99729/skillr` main. Private `skillr-app`, question banks, account data, prices and verification badges are outside this batch.

## Evidence and limits

- Bing IndexNow Insights reports 81 content-quality URLs and exposes a 20-URL sample. The export control did not produce a downloadable list in the connected browser. The remaining 61 URLs have not been identified or certified repaired.
- All 20 sample sources and nine title-warning sources were inspected at base `fb13a19e7ede9413eae01056f12821c29ecea9aa`. The nine current titles are already below 70 characters; no title-length mass rewrite is justified.
- A quality label is not a precise defect description. Request acceptance, a 200 response, a complete sitemap and source validation do not establish that Bing has removed its label or indexed/ranked a page.

## Implemented corrections

| Resource | Verified defect | Repair |
| --- | --- | --- |
| AC9M3P02 Practice | Generic instructions labelled a worked example; static preparation was removed/replaced after loading. | Authored results table, checked totals, comparison of variation and a model explanation; lesson/worksheet links. |
| AC9M3ST03 Test | Generic pre-test worked-example claim and repeated practice copy obscured assessment purpose. | Clear investigation-test purpose, categorical/discrete-data reminders, limits of a five-question check and preparation links. No actual Test answer is disclosed. |
| AC9S7U03 Practice | Static generic filler; preparation depended on late script rendering. | Worked eclipse-alignment explanation, distinct seasons/phases/tides guidance, reasoning check and lesson/worksheet links. |
| AC9S9I02 Practice | Entirely generic static preparation; title contained an unnecessary ellipsis. Runtime chose a curriculum-mapping table as its visual. | Complete authored confounding-variable example, reproducibility/error/risk/ethics guidance and a complete descriptive title. |
| AC9M1N05 activity hub | Claimed eight questions per attempt, while the shared runtime selects five; no Teacher Slides link. | Correct five-question-attempt wording, verified 24/16 bank counts, resource-choice guidance, worked story comparison and the existing matching Teacher Slides link. |
| AC9M6SP01 Topic Guide + Classroom View | Generic success criteria and instructional filler instead of cross-section reasoning. | Explicit base/plane/congruence teaching, two original diagrams, three worked comparisons, checked answers and purposeful application. |
| AC9E7LA07 Topic Guide + Classroom View | Wrong-concept examples about polite language/formality on a visual-perspective lesson. | Actual original visual texts, vectors/angle/social-distance/salience teaching, evidence-based comparisons and storyboard transfer. |

The four activity preparations use the existing `data-skillr-authored-preparation="true"` contract. The existing revision-card and quiz-runtime scripts already respect that contract. No shared runtime or question-bank changes are required. Practice preparation uses labelled paragraphs so the old first-list-item intro shim cannot replace the authored introduction.

## Topic preservation, layout and Classroom View parity

Reference: the approved Year 1 AC9M1N05 pattern, with a video-first entry, concise hero, compact teaching focuses and one clear resource path. The existing static HTML architecture is retained; no content renderer is introduced.

Both topic candidates contain exactly one of each locked semantic section in order: learn, prerequisites, teaching, examples, misconceptions, guided-practice, independent-practice, reasoning, important-questions, assessment, mastery, guidance, alignment, resources, related, official-references.

Removed competing quick-learning navigation, sidebars, repeated actions, process disclosures, feedback/promotional panels and obsolete international-equivalence blocks. The duplicate LearningResource schemas and stale equivalence schema were removed; the remaining LearningResource and BreadcrumbList describe the visible content. Existing canonical/indexability, analytics, video credits and protected resource destinations are retained. Neither source page contained a verified matching paid product card; none was invented.

The two existing Classroom View HTML shells are retained. Their teaching bodies are copied directly from the final canonical Topic Guide sections, including the same diagrams, examples, questions and answers. No downloadable PPTX/PDF is exposed. Native disclosures and existing single-open behavior remain. This is a factual/content correction, not a claim that the whole code's questions and worksheets have undergone fresh independent approval.

## Source checks and teaching review scope

- Official code descriptors/elaborations were checked against the repository's ACARA inventory. AC9M6SP01 is also confirmed by the Australian-government-funded Mathematics Hub; AC9E7LA07 by ACARA's Year 7 picture-book work sample.
- Primary IXL benchmark: actual Australian Year 6 plan linked AA.5/ZEY, Cross sections of three-dimensional figures. Opened and read its worked help and inspected its diagram: trace the plane/solid intersection, distinguish the resulting two-dimensional section from the object. A public question was visible; no adaptive progression, submitted response, mastery or audio is claimed.
- Actual Australian IXL Year 7 English standards show AC9E7LA07 without a linked skill. This is a direct-mapping gap, not proof of global skill absence. No uninspected IXL visual-text exercise is claimed as reviewed.
- Supplementary sources actually read: Mathematics Hub Shapes and objects Year 6; ACMI Exploring camera angles and Exploring shot types; ACARA Year 7 picture-book work sample. No new Khan review is claimed. Original diagrams and lesson examples do not reproduce proprietary IXL artwork/questions.
- Teaching checks: congruence includes size; right-prism sections require the stated cutting orientation; cylinder is distinguished from polygonal prism; pyramid apex exception is explicit. Visual-text interpretations require visible evidence and remain qualified rather than prescribing universal viewer emotions.
- First Nations contexts require an attributed, place-specific, approved/adult-supplied source; no invented cultural knowledge or blanket equivalence is asserted.

Sources:

- https://au.ixl.com/maths/skill-plans/australian-curriculum-version-90-year-6
- https://au.ixl.com/math/year-6/cross-sections-of-three-dimensional-figures
- https://au.ixl.com/standards/english/year-7
- https://www.mathematicshub.edu.au/planning-tool/6/space/shapes-and-objects/
- https://www.australiancurriculum.edu.au/resources/work-samples/english/year-7/picture-book
- https://www.acmi.net.au/education/school-program-and-resources/exploring-camera-angles/
- https://www.acmi.net.au/education/school-program-and-resources/exploring-shot-types/

## Candidate checks

- Nine HTML resource files: one H1 each; canonical/robots preserved; local resource targets exist in the complete source tree; JSON-LD parses.
- Four activity configurations, scripts, question banks and controls preserved. Five-question shared-runtime behavior unchanged. AC9M1N05 source banks contain 24 Practice and 16 Test items.
- Topic section order and retained-section inventory compared; legacy blocks removed. Classroom View section bodies match final topic bodies. Four original SVG models rendered and inspected; a camera eye-level mismatch was corrected during review.
- This batch does not record Content Verified status, update the review ledger or certify all questions/worksheets.
- Before moving main: complete-tree comparison, zero deletions, unchanged core paths/CNAME, fresh-head lease. After moving main: Pages deployment, live homepage, affected activities, topic and Classroom View browser checks are required. GitHub Actions and live evidence establish those release results separately.

## Remaining work

The other 14 URLs in Bing's 20-URL sample remain on the review list; they are not marked fixed merely because they return 200 or have substantial content. Full curriculum-code review, where needed, must preserve strong authored content and use the normal scoped workflow. The 61 unexposed URLs require a usable Bing export or an expanded sample. Bing needs to recrawl/reprocess changed resources before its quality/indexing status can be reassessed.
