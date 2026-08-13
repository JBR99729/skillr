# Topic-module upgrade progress: Foundation–Year 2

This manifest records completion against the connected Topic Guide + Teacher Slides + Practice Sheet standard. A code is complete only when all three resources pass together.

## Foundation Maths

- Status: atomic topic-module release merged in [PR #181](https://github.com/JBR99729/skillr/pull/181), merge `8aede76fcbded59867037a24e69cfb2d58134565`; two-sheet worksheet refinement squash-merged in [PR #186](https://github.com/JBR99729/skillr/pull/186), merge `8cecd5e6d4c74b3b166eacdb133f7c445cbd5af3`.
- Codes (12): AC9MFN01, AC9MFN02, AC9MFN03, AC9MFN04, AC9MFN05, AC9MFN06, AC9MFA01, AC9MFM01, AC9MFM02, AC9MFSP01, AC9MFSP02, AC9MFST01.
- Topic Guides: 12/12 include the existing deep-dive, two worked examples, misconceptions, accessible visual models and connected links, plus four structured child-friendly vocabulary entries.
- Teacher Slides: 12/12 retain all 124 existing code-specific slides. The required learning-intent, concept-model, guided-application and quick-check slides are identified as the four core slides; the remaining 76 slides remain available as optional extensions and teacher support.
- Practice Sheets: 12/12 provide 9 questions in a 3 Warm-Up / 4 Core / 2 Challenge sequence, divided exactly once across stable `topic-practice-1` (5 questions) and `topic-practice-2` (4 questions) routes. Each sheet has its own answer key; every question retains its individual summary and actionable hint.
- Preserved content: accurate legacy questions remain in the aligned sequence. Any useful tenth legacy item omitted from the nine-question student sheet is retained in canonical data as `preservedOptionalQuestions`; no useful lesson, visual, slide, teacher note or resource link was deleted.
- Atomic alignment: every practice question carries the exact topic concept, one code vocabulary term and the worked-model method; the scoped validator checks this parity and all internal worksheet/Practice/Test links.
- Validation: `scripts/validate_foundation_maths_topic_modules.mjs` PASS 12/12; the two-sheet validator PASS 12/12 and protects all 9 Foundation Science legacy worksheet routes; existing Foundation v1.1 and classroom-rollout validators PASS; JavaScript syntax and `git diff --check` PASS. AC9MFM01 and AC9MFN06 desktop/mobile option wrapping, representative printable layouts and cached/uncached Science compatibility were inspected.

## Foundation English

- Status: 29/29 codes complete and independently reviewed as one atomic Topic Guide + Teacher Slides + two-sheet Practice release; publication details will be recorded when this batch merges.
- Codes (29): AC9EFLA01–AC9EFLA09, AC9EFLE01–AC9EFLE05 and AC9EFLY01–AC9EFLY15.
- Topic Guides: 29/29 include complete curriculum identity, oral-language-friendly deep-dives, at least four child-friendly vocabulary terms, two worked examples, three authentic misconceptions with corrections, accessible visual/text models and aligned resource links.
- Teacher Slides: 29/29 preserve all 253 useful code-specific slides. Each deck identifies exactly four projector-ready core roles—learning intention and success criteria, concept refresher, guided worked example and 60-second Turn and Talk—while retaining the remaining 137 slides as optional extensions and teacher support.
- Practice Sheets: 261 questions total, exactly 9 per code in a 3 Warm-Up / 4 Core / 2 Challenge sequence. Each bank is divided exactly once across stable `topic-practice-1` (5 questions) and `topic-practice-2` (4 questions) routes, with a sheet-only answer key and an individual concise summary and actionable hint for every question.
- Preserved content: 290 legacy worksheet questions and each code's prior lesson fields remain in source as `preservedOptionalQuestions` and `preservedLegacyTopicMaterial`; no useful teaching material, product navigation, read-aloud behavior, Practice/Test link, brand asset or export metadata was removed.
- Accessibility and atomic alignment: content uses Foundation-safe spoken cues, descriptive text alternatives and explicit spoken option labels for print-sensitive spelling tasks. Every question records the exact concept, vocabulary and worked method taught by its guide and slides. Public SkillrHub branding remains renderer chrome, while stable code metadata and two-sheet mappings stay exportable for future private unbranded masters.
- Validation: `scripts/validate_foundation_english_topic_modules.mjs` PASS 29/29; 261/261 questions, 116/116 core slides, 58/58 child routes. JavaScript syntax, deterministic publisher, `git diff --check`, exact-answer, TTS, accessibility, cached-renderer, responsive wrapping and live rendered Topic Guide/Slides/worksheet checks PASS. Foundation Maths topic/two-sheet, Foundation Science worksheet compatibility, Foundation v1.1 and classroom-rollout regressions also PASS.

## Remaining batches

- Foundation Science: pending
- Year 1 Maths, English and Science: pending
- Year 2 Maths, English and Science: pending
