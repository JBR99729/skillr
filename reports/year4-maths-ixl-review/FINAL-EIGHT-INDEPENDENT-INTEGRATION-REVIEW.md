# Final eight Year 4 Maths — independent integration review

Reviewer: sweep_curriculum_sources, independent of root integration author. Date: 2026-09-08.

**Integration PASS for the hashed local candidate.** Source-comparison and deployment/live gates remain separate.

## Corrections required and rechecked

- Saved-review model adapter originally accepted only symbol fragments while Space banks used standalone SVG paths. Root/Space author added an explicit model ID and normalized references to #model; final bank and preparation references resolve to actual IDs. Existing geometry remains independently reviewed by the Space reviewer.
- Adult-reviewed tasks could fall back to automatic self-check marking if their support file failed to load. Root set requireAdultReviewSupport=true using the existing runtime fail-closed check. All 17 Year 4 codes containing adult tasks now have the flag and exactly one support loader in both activities (34 configs).
- Against the current checkout HEAD, the 10 earlier wrappers changed are A02 and M01–M04 Practice/Test. Their only config difference is the new flag; everything outside quizConfig is byte-identical. Earlier canonical banks are unchanged. This is a directly evidenced marking correction within the all-Year 4 sweep.

## Final checks

- All 16 final-eight Practice/Test authored guides were read and compared with their identified bank items. Stems, answers, summary explanations, hints and visual asset references exactly match the final source item. Materials and adult-review instructions fit the relevant code. Every attempt is configured for 5 questions; the guide accurately distinguishes an attempt from the full bank.
- All 32 final-eight Result/Review pages load adult marking support once. All 16 Review pages carry the new bank version, load their corresponding bank before separate-review.js, and load the model adapter afterward. The adapter also checks saved bank version, question text, explanation and answer before attaching a current visual to an older attempt.
- The shared quick-read change extends only the explicit Year 4 code list and final-eight bank version; an authored-preparation marker is still required, so legacy data cannot overwrite approved preparation for this candidate.
- The local SVG adapter extension allows hyphenated code-specific filenames while preserving the local same-code directory/path, SVG extension and fragment checks. All final preparation IDs resolve.
- Worksheet PDF v18.4 changes only version text and the explicit final-eight code guard. The existing self-check, curriculumCode and worksheet-ID checks remain. It reserves prompt/diagram plus writing space. Chance PDFs were independently inspected in the code reports; Space/Statistics PDF visual QA is separately owned.
- All eight worksheet wrappers request v18.4. All final Practice/Test pages load production-question-ui, adult support and the quick-read helper once.
- Independently evaluated all 23 published JavaScript banks in isolated Node VM contexts: each has 48 Practice and 16 Test, total 1,472 published questions. Every final-eight published item (512) matches canonical source stem, audio, choices, key, visual metadata, structured explanation and adult-response guidance. Published explanation formatting was checked against its intended adult-review convention. No mismatches.
- All 23 codes retain one Topic Guide, its Classroom View and worksheet route. Review ledger remains 5/23 (N01–N05); the Year 4 Maths hub does not show Content Verified. Counts/resource existence do not claim every source comparison is complete.

## Artifact identities

Exact candidate integration files are enumerated in FINAL-EIGHT-INDEPENDENT-INTEGRATION-HASHES.json. Full 23 source/published counts and resource/ledger status are recorded in YEAR4-ALL-23-INDEPENDENT-INVENTORY.json. No browser, remote write or publication was performed by this reviewer. Any subsequent content/integration mutation requires comparison against these hashes and a focused recheck.
