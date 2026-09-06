# SkillrHub F–10 Topic Page Layout Standard

Status: **LOCKED**

This is the required macro learning order for canonical SkillrHub curriculum topic pages from Foundation to Year 10 across Mathematics, Science and English.

The standard is based on the AC9M10N01 topic-page architecture, but the visual presentation must remain age-appropriate. Foundation pages should not be made to look like Year 10 pages; Year 10 pages should not be simplified into early-primary activity cards. The invariant is the educational sequence and semantic structure.

## Locked section order

Every migrated, new, or edited canonical F–10 topic page must expose these section IDs exactly once and in this order:

1. `learn` — Learning goals / what you will learn
2. `prerequisites` — Prerequisite knowledge
3. `teaching` — Explicit concept teaching
4. `examples` — Worked examples, modelled examples or model texts
5. `misconceptions` — Common misconceptions and corrections
6. `guided-practice` — Guided practice
7. `independent-practice` — Independent practice
8. `reasoning` — Reasoning and problem-solving / interpretation / analysis
9. `important-questions` — Important questions and answers
10. `assessment` — Assessment-style questions and review hints
11. `mastery` — Exit ticket / mastery check
12. `guidance` — Teacher and parent/carer guidance
13. `alignment` — Curriculum alignment
14. `resources` — Practice and teaching resources
15. `related` — Related and prerequisite topics
16. `official-references` — Official curriculum references

The section heading text may be age- and subject-appropriate, but the semantic ID and relative order are fixed.

## Age-band presentation rules

### Foundation–Year 2

- Use concrete, pictorial and short oral/interactive teaching.
- Sections may contain cards, visual models, games, teacher prompts or expandable groups.
- Worked examples may be demonstrated with objects, pictures or spoken modelling.
- Important questions may be oral prompts rather than written exam questions.
- Assessment should be brief and developmentally appropriate.
- The 16 semantic wrappers still remain in the locked order.

### Years 3–6

- Use concise explicit teaching, visual examples and progressively independent practice.
- Reasoning should require explanation, comparison or justification, not only calculation/recall.
- Assessment and mastery should be short enough for classroom/home use.

### Years 7–10

- Use explicit teaching, multiple worked examples, misconceptions, independent practice and unfamiliar application.
- Reasoning and assessment should reflect secondary-school expectations.
- Curriculum alignment may be more detailed, but must remain after the learning/assessment flow.

## Subject adaptation

The same semantic roles apply to all subjects:

- Mathematics `examples` = worked mathematical examples.
- Science `examples` = model investigations, data interpretation or worked scientific reasoning.
- English `examples` = model texts, annotated passages, worked language/literary analysis or exemplars.

Do not rename or reorder the semantic IDs to fit a subject. Change the visible heading/content instead.

## Technical and SEO rules

- One canonical lesson URL per curriculum concept.
- Essential teaching content must be present in static HTML.
- One clear H1 containing the topic identity; curriculum code should be visible where applicable.
- Preserve canonical tags, breadcrumbs, analytics and existing valid resource routes.
- Do not place curriculum/state mapping before the core teaching flow.
- Do not insert promotional, international-mapping or unrelated blocks between the 16 locked sections.
- Optional supplementary references may appear after `official-references`.
- Internal links must remain crawlable HTML links.

## Resource action contract

The existing F–10 action-layout contract remains separate and complementary: Learn → Practice → Test are the primary learning actions, with secondary resources handled by the existing More resources pattern where that runtime applies.

## Enforcement and migration policy

- Year 10 Mathematics is fully migrated and is validated on every CI run.
- Any **new or edited** canonical F–10 Mathematics, Science or English topic page must satisfy this layout before merge.
- Legacy F–9 pages that have not yet been migrated are not bulk-rewritten merely to satisfy the lock. When one is next edited, migration to this standard is part of that change.
- A deterministic, marker-delimited supplementary curriculum-equivalence block may be added after the core teaching flow without triggering an unrelated legacy-page migration, provided stripping that generated block leaves the topic byte-for-byte unchanged. Permanently locked roots remain fully validated.
- Once an entire year/subject root is migrated, add it to the permanently locked roots in `scripts/validate_f10_topic_learning_order.mjs` so every page in that root is checked even when untouched.

This contract is a release guardrail. Content can improve continuously; the learning sequence must not drift.
