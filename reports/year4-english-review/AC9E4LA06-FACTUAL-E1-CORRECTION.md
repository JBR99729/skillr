# AC9E4LA06 — narrow official elaboration correction

Date: 2026-09-08 UTC. Status: factual correction drafted and structurally checked; not full-code review, IXL review, question-bank approval, publication or Content Verified approval.

## Authority and exact scope

Used the exact ACARA v9 `AC9E4LA06_E1` wording independently verified in `reports/year4-english-review/OFFICIAL-FIRST-TEN.md`, sourced there from the official English April 2024 JSON-LD node `http://vocabulary.curriculum.edu.au/MRAC/2024/04/LA/ENG/32702a29-eff3-4626-9ed7-193ec0938628`.

The current official elaboration concerns richer descriptions using **adjectival clauses**, with the mountain-pass `which had received days of heavy rain` example. The previous Denise/cocoon wording concerned an adverbial clause and was incorrectly attributed as the current official E1.

Changed only these three content files:

1. `data/curriculum-units.json`: exact text substitution in AC9E4LA06 `elaborations` E1 and `questionCoverage` E1. No JSON reformatting, other curriculum nodes, descriptors, E2 or resource URLs changed.
2. `year4/english/ac9e4la06-that-complex-sentences-contain-one-independent-clause-and-at/index.html`: corrected the official E1 in the existing static Curriculum Coverage section. Preserved the Denise/cocoon sentence immediately after the official list under **Supporting teaching example — not official elaboration wording**, identifying its dependent adverbial clause and time relationship.
3. `year4/english/ac9e4la06-that-complex-sentences-contain-one-independent-clause-and-at/teacher-slides/index.html`: copied that same corrected coverage content and separately labelled support paragraph verbatim into the existing Classroom View section. A final newline was also added by the patch tool.

No banks, worksheets, legacy specifications, shared runtime, publisher, review ledger, badge or other curriculum codes were changed by this correction. Existing unrelated working-tree changes were preserved.

## Safety checks

- `git diff --check` on the three scoped files: PASS.
- Parsed `data/curriculum-units.json`: PASS.
- Compared metadata bytes to the current HEAD version: the entire file is identical after reversing exactly **two** substitutions of the verified E1 wording. Both parsed substitutions belong to AC9E4LA06_E1, one in each specified metadata array.
- Extracted official E1 directly from the verifier report and asserted exact text match in both metadata entries and once in each HTML page: PASS.
- Asserted the Topic and Classroom curriculum-coverage content, including the preserved support paragraph, is identical: PASS.
- Reversed only the official-text replacement and support-paragraph insertion and compared each HTML page to HEAD: all remaining bytes unchanged, apart from a final newline. Therefore resource links, canonicals, scripts, native-details structure and all other teaching sections are preserved.
- The first byte-comparison attempt hit Node's default child-process output buffer on the large metadata file. Repeated with an explicit 32 MiB buffer; all assertions passed. No source changes were needed for that diagnostic failure.

No browser/runtime navigation or visual review was conducted for this narrow correction. The root reviewer reported independently checking the metadata scope and Topic/Classroom diff; final independent sign-off and any release checks remain root-owned.

## Artifact identities

SHA-256 at handoff; these identify the narrow factual patch, not approval of the full LA06 resource set:

| File | SHA-256 |
| --- | --- |
| `data/curriculum-units.json` | `aaf1309235fafcd9dd589b986e79604fbdc7bac65a0fb7b7e0a7063209afa73e` |
| LA06 Topic `index.html` | `b5e55f4895eddf9883665b2aef8e79422e5056c8e70f55f0707cbb3f6be44bb6` |
| LA06 Classroom `teacher-slides/index.html` | `6108df5cbddd81514e4dd70fbac4f836c23d2534330888b502d921262a630522` |

## Still pending

Root independent factual-patch review, 2026-09-08: read the exact verified ACARA E1 and all three final diffs, including preserved support wording. Independently executed the metadata byte comparison: exactly two intended E1 replacements and no other byte changes; JSON parses. The replacement restores adjectival-clause attribution and the retained cocoon example correctly identifies an adverbial time clause. **The narrow factual correction is approved for inclusion in an integrity-checked release at the hashes above. This is not approval of the full LA06 code and must not record LA06 in the Content Verified ledger.** CI/deployment/live verification remains required for any release containing the patch.

This correction restores exact official attribution; it does **not** resolve the larger substantive gaps in `LA05-LA07-AUDIT.md`. LA06 still needs primary IXL observation/limits, relative/adjectival-clause teaching and authentic composition evidence, strengthened Topic/Classroom resources, eight distinct homework tasks, 48+16 varied questions, independent full-resource/PDF review, runtime checks and approved publication. English Content Verified must remain off.
