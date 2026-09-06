# Worker 3 Year 5-6 quality audit - 2026-08-25

Scope: Year 5 and Year 6 Mathematics, Science and English Topic Pages first, followed by Year 5-6 Daily Drill banks. Practice and Test banks were intentionally excluded.

## Topic Page audit

- Year 5 Mathematics and Science were already documented in `docs/year5-stem-quality-audit-2026-08.md` as strong authored static lessons with concept models, worked thinking, vocabulary, activities, elaborations, revision notes and misconceptions. No rewrite was made.
- Year 6 Mathematics and Science were already documented in `docs/year6-stem-quality-audit-2026-08.md` as strong authored static lessons with the same core lesson features. No rewrite was made.
- Year 5-6 English pages had genuine educational weaknesses: repeated generic examples, generic misconception language and missing hero-level Teacher Slides links. These pages were improved in place while preserving page metadata, resource routes, feedback card, related topics, official references and existing curriculum wording.

## English implementation

Updated 47 English Topic Pages:

- Year 5 English: 24 codes.
- Year 6 English: 23 codes.

Each updated English Topic Page now includes:

- current static page descriptor as the source of truth;
- direct static HTML teaching content;
- an evidence-to-effect concept model;
- worked transfer prompt;
- important vocabulary;
- guided annotation, comparison and creation/revision activities;
- curriculum coverage and elaborations preserved from the current page;
- support/core/extend differentiation;
- revision notes and important questions;
- topic-focused misconception fixes; and
- a fixed Teacher Slides link in the hero and lesson body.

No decorative images were added. Lightweight shared HTML tables/cards were used only where they help students understand the relationship between feature, evidence, effect and transfer.

## Daily Drill audit

- Year 5-6 STEM Daily Drills were skipped for rewriting because the Year 5 and Year 6 STEM QA notes document broad shared pools with large item counts, eight-question sessions, cycle-aware selection and no integrity concerns.
- Year 5-6 English Daily Drills were audited through `english-vocabulary.js` and `english-master-questions.js`.
- Result: 6 English pools generated 1,200 questions total, with 200 items per year/skill pool, unique IDs, explanations, hints, difficulty bands, passage support for reading comprehension and correct page wiring.

Final judgement: Year 5-6 Topic Pages in scope are at or above the standalone-learning threshold after the English update; Year 5-6 English Daily Drills meet the >=8.5/10 target without bank rewrites.
