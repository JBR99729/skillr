# Year 4 Maths pending-resource sweep — final eight

Date: 2026-09-08. Base main: 2f5194781e20b89263ec7b7bb493bca3947c6e17. Owner requested all pending Year4Maths resources, 48Practice+16Test, and main publication. This is a content/resource completion release with explicitly incomplete external-source comparison, following the same owner-authorized distinction as the preceding release. No new verification-ledger entries or badge.

## Reviewed resources

SP01–SP03, ST01–ST03 and P01–P02: eight Topic Guides, eight Classroom Views, eight separately authored homework banks (64 tasks), and 512 assessment items. Every code now has 48Practice+16Test. Across all23Year4Maths codes:1,104Practice+368Test=1,472 published items. Earlier15banks are unchanged in this release.

Official ACARA primary JSONLD provides the exact eight descriptors and38elaborations, separately mapped in the source report. Authors and separate independent reviewers inspected every final question, choice, answer, explanation, hint, model and worksheet task. Corrections and final SHA256identities are in the per-code author and independent reports. Counts and validators do not substitute for substantive content review.

The existing resource flow and shared UI remain. Activity preparation now uses approved code-specific source examples and diagrams. Existing adult-review support is wired through activities/results/reviews. The fail-closed flag is enabled for all17Year4codes containing practical work; only10earlier A02/M01–M04 wrappers needed this additional flag. The shared quick-read and saved-review adapters extend only explicit Year4scope. PDFv18.4 extends the existing keep-writing-space rule to the eight new homework banks.

## Evidence

- Independent source-to-published comparison: all512items exactly match; all23published48+16 counts confirmed.
- Independent runtime:80/80 cases using actual production scripts in offline VM/linkedom, including MCQ correct/incorrect, written/drawn work pending with zero credit, adult marking, missing helper fail-closed, saved identities and review models. Deterministic one-item fixtures; not a claim of browser/full-five shuffle testing.
- All35actual worksheet PDF pages visually inspected independently:Space15,Statistics12,Chance8. Source tasks self-contained for shuffled printing. A writing-space split was fixed and rerendered before approval.
- Production PDF regression passed:long content/endmarkers, maths symbols, all choices, inline and external-symbol diagrams, no footer collision.
- All23canonical banks pass the current four-choice/adult-review-aware production validator. All23static TopicGuides pass, F–10topic action contract passes, saved-review model regression passes all23scope/eightactualfixtures, responsive CSS/HTML contract passes,36changed JavaScript files parse, and no new broken local references.
- Legacy validate_year4_assessment_banks.mjs still assumes threechoices, mandatoryvisuals and8-question attempts, so it reports baseline schema mismatches against the current four-choice/adult-review/five-attempt architecture. It is not used to claim this release passes that obsolete schema. Its structural count remains23/1,472. An unrelated Year3ownership gate could not run in sparse checkout; full repository CI remains the release gate. No validation rule was weakened.

## Honest source status

Direct IXL observations used one tab with individually read interactions. P01 comparison skill:8accepted questions/SmartScore60. ST01 pictograph:worked example+3accepted/SmartScore37; next clipped graph left unsubmitted. SP01 composition andSP03rotation worked examples inspected. SP02coordinate-map example documented as a boundary mismatch, not Australian letter-number-cell coverage. Khan public graph article and first Explain model inspected. These finite observations do not establish all code components/progression. Other source comparisons remain incomplete; no copied proprietary questions.

Verification ledger stays5/23(N01–N05), ContentVerified remains off. This release completes pending authored resource bundles, not the separate end-to-end source-verification backlog.

## Release gate

Package must preserve the complete latest main tree, zero deleted paths, unchanged CNAME/core/shared navigation and only intended modifications. Re-read main before non-forced merge. Require PRchecks, then verify Pages and live homepage/affected routes. Deployment evidence is recorded after the actual merge; none is claimed by this prepublication report.
