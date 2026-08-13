# Topic-module upgrade progress: Foundation–Year 2

This manifest records completion against the connected Topic Guide + Teacher Slides + Practice Sheet standard. A code is complete only when all three resources pass together.

## Foundation Maths

- Status: validated; PR and merge references pending publication.
- Codes (12): AC9MFN01, AC9MFN02, AC9MFN03, AC9MFN04, AC9MFN05, AC9MFN06, AC9MFA01, AC9MFM01, AC9MFM02, AC9MFSP01, AC9MFSP02, AC9MFST01.
- Topic Guides: 12/12 include the existing deep-dive, two worked examples, misconceptions, accessible visual models and connected links, plus four structured child-friendly vocabulary entries.
- Teacher Slides: 12/12 retain all 124 existing code-specific slides. The required learning-intent, concept-model, guided-application and quick-check slides are identified as the four core slides; the remaining 76 slides remain available as optional extensions and teacher support.
- Practice Sheets: 12/12 provide 9 questions in a 3 Warm-Up / 4 Core / 2 Challenge sequence, with complete answers and an individual summary and actionable hint for every question.
- Preserved content: accurate legacy questions remain in the aligned sequence. Any useful tenth legacy item omitted from the nine-question student sheet is retained in canonical data as `preservedOptionalQuestions`; no useful lesson, visual, slide, teacher note or resource link was deleted.
- Atomic alignment: every practice question carries the exact topic concept, one code vocabulary term and the worked-model method; the scoped validator checks this parity and all internal worksheet/Practice/Test links.
- Validation: `scripts/validate_foundation_maths_topic_modules.mjs` PASS 12/12; existing Foundation v1.1 and classroom-rollout validators PASS; JavaScript syntax and `git diff --check` PASS. Representative topic, slide and printable worksheet browser checks completed.

## Remaining batches

- Foundation English: pending
- Foundation Science: pending
- Year 1 Maths, English and Science: pending
- Year 2 Maths, English and Science: pending
