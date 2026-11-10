# Scoped validation

Exact candidate source: GitHub PR #987 initial head `d18b243cd63e430739b51cacce94e3971c2f2c9a`, complete tree `21a0169dfae28c0df1c3d353f6491d3635195784`. The local reviewed tree and GitHub-created tree are identical.

Actual local checks:

- `python scripts/qa_year2_english_topic_pages_batch3.py 1eebd0af9ae0cc14fc714f0b3b4f3d1a8ac4cffc`: PASS seven pages, 312 authored fields, 35 retained sections, 150 native disclosures; exact metadata, declared bounded corrections, seven retained SVG identities, resources, navigation, IDs/ARIA, availability-aware app entrances and field inclusion.
- `node scripts/validate_static_topic_loader_guards.mjs`: PASS.
- `node scripts/validate_f10_topic_learning_order.mjs`: PASS 128 permanently locked pages; affected Year2 guides use the dedicated source check above.
- `node scripts/validate_f10_topic_layout_contract.mjs`: PASS shared contract.
- `node --test scripts/tests/test_static_teacher_display.mjs scripts/tests/test_breadcrumb_preservation.mjs`: five tests PASS.
- `node scripts/validate_static_curriculum_architecture.mjs`: PASS actual 41 changed candidate paths after local commit.
- `node scripts/check_release_integrity.mjs BASE HEAD`: PASS complete 20,171 → 20,205 files; zero deleted paths, core files and CNAME preserved.

The local browser failed before any page load due to Chromium socket/ptrace EPERM. Actual hosted browser checks and pixel inspection remain pending in this initial record. The draft PR does not change main.


## Completed hosted and independent closure

Run 42755195623 succeeded. Actual downloaded artifact 13734967988 ZIP SHA256 `3518aca0b95de6b3bba48e319fa18dc67fecfbb4f966ede34843dcd67154e209` exactly matches GitHub’s artifact digest. Results SHA256 is recorded in `browser-evidence.json`; problems `[]`. Complete and fresh final reviewers individually inspected all 22 model captures. Root inspected all 42 top/lesson viewport frames through seven original-pixel contact sheets. Final reviewer additionally inspected 10 risk viewport frames.

All 14 applicable initial-head workflows succeeded. The19 actual page/style/utility/harness dependencies have unchanged bytes in the final evidence update. Its only workflow change adds the actual CTA stylesheet to the trigger list. The final exact-head CI closure will be recorded on PR #987. No teaching/browser dependency was revised after successful review.
