# Independent LE01–LE05 / LY01 architecture and CI review

Reviewer: independent_engineering_review, separate from all six content authors. Read-only production inspection on 2026-09-08; no production files or validators edited.

## Gate discovery and execution

Read workflow path filters and actual commands. After the coordinator expanded the complete checkout, independently executed:

| Gate | Result |
| --- | --- |
| `node scripts/validate_f10_english_static_topic_pages.mjs` | PASS: 284 English topic pages |
| `node scripts/validate_static_topic_loader_guards.mjs` | PASS: canonical static topic/teacher routes and navigation |
| `node scripts/validate_f10_topic_layout_contract.mjs` | PASS: Learn → Practice → Test + More resources |
| `node scripts/audit_static_teacher_slides.mjs` | PASS after concrete author corrections: 679 static decks, 32 redirect shims |
| `node scripts/audit_curriculum_route_integrity.mjs` | PASS: 742 source pages, 15,073 curriculum/resource links, zero missing local targets |
| `python3 scripts/build_topic_video_sections.py --check` | PASS: 666/676 selected-video codes, zero stale pages |
| `python3 -m unittest discover -s scripts/tests -p test_topic_video_sections.py` | PASS: seven preservation/invalid-input tests |

`audit_static_curriculum_site.mjs --fail-on-runtime-topics` passed with zero runtime topics. Its initial single direct-PDF warning identified LE01 publisher teacher-notes links. The author subsequently replaced these with actual publisher landing pages that retain access to the named texts/notes; exact inspected PDF provenance remains in research reports. A subsequent full independent rerun passed with **zero violations**, including zero direct teacher-file links.

The initial full-site failures from missing pages were caused by the explicitly configured sparse checkout, not absent Git-tree paths. They were not waived: the coordinator expanded the checkout and the complete gates above then passed. The previously reported missing apple-touch icon also exists in the complete checkout.

The following gates must run on the final committed candidate because their changed-file selection uses `BASE...HEAD` and cannot see uncommitted work: `GITHUB_BASE_REF=main node scripts/validate_static_curriculum_architecture.mjs`, `node scripts/validate_f10_topic_learning_order.mjs --base BASE`, and `node scripts/check_release_integrity.mjs BASE CANDIDATE`. The coordinator owns that final candidate/release check.

Applicable main-push workflows also include Validate visual worksheet and QA layers and Validate Foundation to Year 4 complete rollout (shared assets / year4 paths). Playwright workflow is manual-only; no automated Playwright run is implied by this batch. Runtime-content-ownership and homework-revenue workflows do not match the scoped changed paths.

## Direct six-code preservation inspection

Inspected all 12 current Topic/Classroom HTML resources and compared them with repository baseline:

- All 12 preserve the complete `<head>` byte-for-byte, including titles, canonicals, descriptions and analytics.
- All 12 preserve every existing named ID and external utility script after author corrections.
- Canonical teaching is actual native HTML with details/summary sections; no lesson or classroom runtime renderer was added.
- Current counts: LE01 Topic/Classroom 20/16 native details, LE02 20/16, LE03 18/14, LE04 17/13, LE05 18/15, LY01 19/16. Subsequent content fixes may add a meaningful section; final hashes remain the release identity.
- The independently executed route audit confirms the same-code Topic/Classroom/worksheet/Practice/Test targets exist. Direct author preparation comparison and runtime retention are recorded separately in the engineering report.

## Corrections identified and rechecked

1. LE01–LE05 Classroom edits had removed the actual curriculum-mapping anchor and, except LE03, meaningful We do guided teaching wording required for the existing native Classroom recognition. Authors restored the real mapping section/ID and labelled their real guided analysis, mirrored into the canonical Topic content. No hidden markers or weakened validators were accepted. LY01 received the same preservation correction. The full teacher architecture audit then passed.
2. LE01 lawful publisher notes were linked directly as PDFs. The existing changed-topic gate prohibits direct PDF links. Author retained named-text access through actual publisher resource landing pages and retained exact observed PDF URLs in research provenance.

This is architecture/engineering review only. It does not approve literary accuracy, every assessment item, printed-page visual quality or live deployment; those require their separate final independent approvals.

## Additional main-push gate confirmation

Independently executed every read-only `run` step verbatim from `validate-foundation-year4-complete.yml` (five steps) and `validate-resource-layers.yml` (four steps): **all nine PASS**. These include Year 4 data quality and all resource routes, 63 expected Teacher Display routes, shared/legacy syntax and wiring and visible wording. No generator/write workflow was executed. Final reviewed Topic/Classroom hashes are included in the engineering JSON companion. Changed-file and release-tree gates remain the coordinator's final committed-candidate check.
