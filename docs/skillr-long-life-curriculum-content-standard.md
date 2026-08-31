# Skillr Long-Life Curriculum Content Standard

> **Architecture notice (2026-08-17):** The live-renderer Topic Guide + Teacher Slide v1.1 architecture has been explicitly unlocked and superseded by `docs/static-curriculum-architecture-v2.md`. Continue using this document for curriculum correctness, elaboration coverage, concept boundaries, misconceptions, differentiation, assessment alignment and visual-quality principles only where they do not conflict with v2. For delivery architecture, v2 is authoritative: topic teaching content is static HTML/CSS with native disclosure sections, and teacher presentations are fixed branded PPTX/PDF assets generated and visually verified before publication.

This standard applies to curriculum topic pages, teacher slides, Quick Reads, worksheets and future content builds.

## 0. Topic Guide + Teacher Slide v1.1 — superseded for delivery architecture

The v1.1 content-quality principles remain useful, but its live-browser rendering requirements are no longer valid. Any requirement for runtime curriculum rendering, browser-built teacher decks, or blocking fixed PDF delivery is superseded by Static Curriculum Architecture v2.

### Priority order

1. Conceptual and factual correctness.
2. Clear teaching of the concept.
3. Complete coverage of the content description and every elaboration.
4. Alignment between the topic guide and teacher presentation.
5. Visual polish.

A beautiful but inaccurate, ambiguous or conceptually mismatched resource fails. A simple, clean and accurate visual can pass.

### Locked thresholds

| Area | Minimum requirement |
| --- | --- |
| Concept correctness | Pass/fail: no mathematical, scientific, linguistic or factual error |
| Concept clarity | The learner can understand what is happening and why |
| Elaboration coverage | 100% of listed elaborations explicitly taught |
| Topic-guide/presentation alignment | Same concept, examples, terminology and visual models |
| Visual finish | At least 7/10: clean, readable, accurate and classroom-usable |
| Generic filler | None |
| Topic delivery | Teaching content exists directly in static HTML |
| Topic compactness | Native `<details>` / `<summary>` disclosure sections where useful |
| Presentation delivery | Fixed 16:9 PPTX/PDF assets generated ahead of publication |
| Presentation branding | Repeated `SkillrHub • skillrhub.com` watermark plus `CURRICULUM_CODE • SkillrHub • skillrhub.com` footer on every slide |
| Presentation QA | No clipping, overlap, cropped labels, footer collisions or broken glyphs |

## Canonical lesson pipeline and safeguards

Every code should still follow this teaching hierarchy:

**Curriculum code → canonical lesson specification → approved models → static topic guide / fixed teacher presentation / activities / questions**

Nothing downstream may silently reinterpret or extend the mathematics, science, language concept or curriculum meaning.

### Concept boundary

Every canonical specification must state:

- **Must teach:** the precise concept and required curriculum coverage.
- **Prerequisite knowledge:** what students are expected to know before the lesson.
- **May support informally:** useful representations or language that aid understanding.
- **Must not overteach:** later-year formality, algorithms, terminology or generalisations that must not be introduced as the target concept.

### Teacher-action layer

Every teacher presentation should retain, in source/master notes or authoring data where appropriate:

1. Teacher does
2. Teacher says or asks
3. Student does
4. What to look for
5. What to do if incorrect

### Formative checkpoints

- Add focused 20–30 second checkpoints after major conceptual steps where useful.
- Store the prompt, expected response, evidence to observe and continue/reteach decision.
- Checkpoints must diagnose the concept just taught.

### Support / Core / Extend

Every code should define concise adaptations that remain inside the same curriculum boundary.

### Expected answers and mastery evidence

Every checkpoint/mastery item should store correct outcome, acceptable evidence, likely misconception and remediation.

### Visual models

- Reusable validated components may still be used during authoring.
- Under v2, the final topic page contains the rendered teaching content directly in HTML and the final teacher deck contains the rendered model directly in the fixed presentation asset.
- Runtime curriculum rendering is not required for publication.

## 1. Unique teaching for every curriculum code

- Treat every curriculum code as a different teaching problem.
- Reuse structure and visual components, never irrelevant generic lesson content.
- Do not reuse another code's explanation, example, misconception or activity unless it genuinely teaches the new code and has been deliberately adapted.
- Each code requires its own concept interpretation, elaboration map, worked examples, misconceptions, activity and mastery evidence.
- Avoid generic filler such as “Which learning goal best matches this topic?” or “Which classroom activity best practises this topic?”

## 2. Required static topic-guide structure

Every migrated topic guide must contain the correct teaching content directly in its HTML source. Use native disclosure sections to keep long pages compact.

It should include:

1. Student-friendly title, learning intention and observable success criteria.
2. Materials and lesson-time guide where useful.
3. Central concept explanation.
4. Clean visual models where they materially teach the concept.
5. Direct teaching coverage for every elaboration.
6. Concept boundary controlling year-level depth.
7. At least one worked example with clear teacher language.
8. Topic-specific misconceptions with quick corrections.
9. A practical warm-up, game, investigation or group activity where appropriate.
10. Formative checkpoints and a final mastery check.
11. Concise Support, Core and Extend adaptations.
12. Expected answers/evidence/remediation for mastery items.
13. Link to the fixed teacher presentation.
14. Formal curriculum wording/references without dominating the teaching flow.
15. Links to worksheet, Practice and Test resources.

## 3. Required fixed teacher-presentation standard

- The teacher presentation is the classroom-display version of the topic guide, not a separately invented lesson.
- It must be a fixed 16:9 asset generated before publication, not assembled from curriculum JavaScript in the browser.
- It must reuse the same central models, examples, terminology, colour meanings and misconception language.
- Use one main teaching purpose per slide. Add slides when one screen would omit or over-compress essential content.
- Text must be readable and must not overlap, clip or sit on top of diagrams.
- Diagrams must retain accurate labels and relationships at presentation size.
- Every slide must contain visible SkillrHub branding, the repeated watermark and the curriculum-code footer defined in v2.
- Final PDF output must be rendered to images and visually checked before publication.

## 4. Visual-model acceptance standard

Visuals exist to explain, not decorate. A passing visual must:

- represent the concept accurately;
- make the intended relationship immediately identifiable;
- use readable labels and appropriate contrast;
- avoid collisions, overlap, clipping and unnecessary detail;
- include meaningful accessible text or an equivalent description;
- use consistent colours/symbols when the same idea appears on the topic page and teacher presentation.

## 5. Additive improvement and restoration

- Preserve useful existing content, curriculum wording, links, metadata and resources.
- Before bulk rewriting, inspect Git history when prior authored content may have been lost or replaced.
- Recover strong previous explanations, examples, misconceptions and elaboration teaching where appropriate.
- Do not remove an existing curriculum elaboration merely to simplify a page.
- Replace content only when it is incorrect, unsafe, duplicated, generic, off-year-level or demonstrably misleading.
- Never overwrite a strong authored topic guide with a generic curriculum-description template.

## 6. Complete curriculum-code coverage

Treat the content description and every listed elaboration as required coverage strands. Map each to the exact curriculum wording, plain-language interpretation, model/example/investigation, useful teacher language, likely misconception and observable evidence where relevant.

## 7. Worldwide audience

Keep the Australian Curriculum code and exact wording clearly identified while teaching the underlying concept in language understandable internationally. Retain Australian-specific content where required and label it accurately.

## 8. Durable content

Prefer stable concepts, definitions, diagrams and examples over short-lived trends. Avoid unnecessary current-person, price or software references.

## 9. Assessment alignment

- Worksheet questions should be authored from the topic lesson, not copied from Practice or Test banks.
- Practice, Test and Daily Drills may remain interactive under v2.
- Assessment must not contradict the topic guide or teacher presentation.

## 10. Release gates

For every migrated curriculum code, verify:

1. Conceptual/factual correctness.
2. Correct year-level boundary.
3. Complete elaboration coverage.
4. Topic-specific examples and misconceptions.
5. Static topic teaching content is present directly in HTML.
6. Native disclosure sections keep long content manageable.
7. No curriculum-content renderer is required for the topic body.
8. Fixed teacher presentation exists.
9. Every slide contains required branding, watermark and footer.
10. Final teacher PDF has been rendered and checked for clipping, overlap and broken glyphs.
11. Topic guide and teacher presentation remain aligned.
12. Worksheet, Practice and Test links work.
13. Protected interactive systems remain intact.

## 11. Change control

Static Curriculum Architecture v2 is the current locked delivery architecture. Any future structural change requires the explicit unlock phrase defined in `docs/static-curriculum-architecture-v2.md`.
