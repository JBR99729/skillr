# Skillr Long-Life Curriculum Content Standard

This standard applies to curriculum topic pages, teacher slides, Quick Reads, worksheets and future content builds.

## 0. Locked Topic Guide + Teacher Slide standard (v1.1)

This is the minimum acceptance standard for every new or rebuilt curriculum code. Older resources can be migrated in batches, but a code must not be described as **Topic Guide + Teacher Slide v1.1 complete** until both resources pass this standard.

The AC9MFN01 Numbers to 20 topic page is the reference level for topic-page structure and visual teaching. It is a quality benchmark, not content to copy into unrelated codes.

### Priority order

1. Conceptual and factual correctness.
2. Clear teaching of the concept.
3. Complete coverage of the content description and every elaboration.
4. Alignment between the topic guide and teacher slide.
5. Visual polish.

A beautiful but inaccurate, ambiguous or conceptually mismatched resource fails. A simple, clean and accurate visual can pass.

### Locked thresholds

| Area | Minimum requirement |
| --- | --- |
| Concept correctness | Pass/fail: no mathematical, scientific, linguistic or factual error |
| Concept clarity | The learner can understand what is happening and why |
| Elaboration coverage | 100% of listed elaborations explicitly taught |
| Topic-guide/slide alignment | Same concept, examples, terminology and visual models |
| Visual finish | At least 7/10: clean, readable, accurate and classroom-usable |
| Generic filler | None |

The 7/10 visual threshold does not permit incorrect labels, misleading proportions, unclear arrows, cropped diagrams, text overlap or unreadable text. It means the illustration may be simple and functional rather than highly polished or photorealistic.

## Canonical lesson pipeline and six safeguards

Every code must follow this hierarchy:

**Curriculum code → Canonical lesson specification → Approved parameterised models → Topic guide / Teacher slides / Activities / Questions**

Nothing downstream may invent, reinterpret or silently extend the mathematics, science, language concept or curriculum meaning. Topic guides, slides, activities and future questions must select from the approved specification and models.

### 1. Concept boundary

Every canonical specification must state:

- **Must teach:** the precise concept and required curriculum coverage.
- **Prerequisite knowledge:** what students are expected to know before the lesson.
- **May support informally:** useful representations or language that aid understanding.
- **Must not overteach:** later-year formality, algorithms, terminology or generalisations that must not be introduced as the target concept.

A resource fails if it is correct in isolation but teaches beyond the intended year-level boundary. For AC9MFN01, for example, showing 14 as one group of 10 and 4 extra may support number understanding; it must not become formal Year 1 place-value-column instruction.

### 2. Teacher-action layer for every slide

Every slide specification must internally contain:

1. **Teacher does**
2. **Teacher says or asks**
3. **Student does**
4. **What to look for**
5. **What to do if incorrect**

Only the elements useful to students need appear on the projector. The full teacher-action layer may appear in a notes or guidance panel.

### 3. Formative checkpoints throughout

- Add a focused 20–30 second checkpoint after each major model or conceptual step where useful.
- Store the prompt, expected response, evidence to observe and immediate decision: **continue** or **reteach**.
- Do not rely only on the final mastery slide.
- Checkpoints must diagnose the concept just taught, not generic attention or recall.

### 4. Small Support / Core / Extend differentiation

Every code must define concise adaptations:

- **Support:** reduce complexity, range or representation while keeping the same concept.
- **Core:** teach the intended year-level outcome.
- **Extend:** deepen representation, reasoning, comparison or transfer without prematurely teaching the next curriculum outcome.

Differentiation should be short and usable inside the same lesson, not three separate resources.

### 5. Expected answers and evidence of mastery

Every checkpoint and mastery item must store:

- correct answer or expected outcome;
- acceptable representations, methods or wording;
- observable evidence of mastery;
- likely misconception or error;
- recommended remediation;
- any answer boundary needed to prevent ambiguous automated marking.

A question alone is incomplete.

### 6. Parameterised approved illustrations

- Build concept models as reusable components with validated parameters rather than fixed one-off images wherever practical.
- Examples include `tenFrame(quantity)`, `numberLine(start, end, highlight, direction)`, `bundleModel(groups, extras)`, `array(rows, columns)`, `fractionModel(parts, shaded)`, `graphModel(data, emphasis)` and subject-appropriate equivalents.
- Define valid parameter ranges, labels, accessibility text and colour semantics.
- Render the same approved component in topic guides, teacher slides, activities, worksheets and questions.
- A renderer must reject or flag invalid parameters rather than drawing a misleading model.
- A fixed illustration is allowed when a concept is genuinely unique or cannot be represented safely by a parameterised component.

### Architecture freeze and change control

The Topic Guide + Teacher Slide v1.1 architecture is frozen for all curriculum codes.

The fixed topic-guide architecture is:

1. Learning goal, success criteria, materials and useful timing.
2. A concept-appropriate teaching progression.
3. Embedded central visual models.
4. A direct visual teaching explanation for every elaboration.
5. Worked example and teacher language.
6. Topic-specific misconceptions and rapid fixes.
7. Immediate warm-up, activity, game or investigation.
8. Quick mastery check.
9. Embedded preview of the matching teacher-slide sequence.
10. Optional formal curriculum reference layer.
11. Worksheet, Practice and Test links.

The fixed teacher-slide architecture is:

1. A selectable, classroom-readable 16:9 sequence.
2. One clear teaching purpose per slide.
3. The same concepts, models, examples, terminology and colour meanings as the topic guide.
4. Enough slides to teach the concept and all elaborations without shrinking everything onto one screen.
5. A teacher-action layer containing Teacher does, Teacher says/asks, Student does, What to look for and What to do if incorrect.
6. Short formative checkpoints after major conceptual steps.
7. Tiny Support, Core and Extend adaptations.
8. Expected answers, acceptable evidence, misconceptions and remediation for checkpoints and mastery items.
9. Navigation back to the topic guide and onward to related resources.

The number of slides and the teaching progression may vary because every code teaches a different concept. The underlying architecture and topic-guide/slide parity may not vary.

#### Permitted without unlocking

- cosmetic improvements to spacing, typography, colour contrast, borders, icons and non-conceptual artwork;
- responsive-layout and projection-readability improvements;
- overlap, clipping, accessibility and broken-link fixes;
- corrections required for conceptual or factual accuracy;
- unique code-specific content authored inside the locked structure.

Cosmetic changes must not alter the teaching meaning, remove elaboration coverage or cause topic-guide/slide divergence.

#### Structural changes require a deliberate unlock

If a request would remove, replace or reorganise a locked structural element, combine the slide sequence into a dense single sheet, separate the topic guide from the slide source, or weaken any release gate:

1. Stop before editing.
2. State that Topic Guide + Teacher Slide v1.1 is locked.
3. Recommend keeping the approved structure.
4. Ask whether the user wants to explicitly unlock the standard.
5. Do not make the structural change in the same turn.
6. Proceed only after a later, separate confirmation using the words **Unlock Topic Guide + Teacher Slide v1.1**.

Ordinary requests such as “change the slides”, “simplify the page”, “make a new layout” or “do it differently” do not unlock the standard.

## 1. Unique teaching for every curriculum code

- Treat every curriculum code as a different teaching problem.
- Reuse the page renderer, layout, validation tools and visual-component library.
- Do not reuse another code's explanation, example, misconception or activity unless it genuinely teaches the new code and has been deliberately adapted.
- Each code requires its own concept interpretation, elaboration map, worked examples, misconceptions, activity and mastery evidence.
- Choose a teaching progression that suits the concept. Do not force Concrete–Pictorial–Abstract onto every subject or topic.
- Appropriate progressions may include:
  - Concrete → Pictorial → Abstract;
  - Observe → Model → Explain;
  - Ask → Collect → Represent → Interpret;
  - Manipulate → Draw → Reason;
  - Predict → Investigate → Explain;
  - Model → Practise → Apply.
- Avoid generic curriculum filler such as “Which learning goal best matches this topic?” or “Which classroom activity best practises this topic?”

## 2. Required topic-guide structure

Every completed topic guide must include:

1. A student-friendly title, learning intention and observable success criteria.
2. Materials and an honest lesson-time guide where useful.
3. A central concept explanation using a progression appropriate to the topic.
4. Clean embedded visual models that teach the central concept.
5. A direct visual explanation for every listed elaboration; a collapsed curriculum list alone does not count.
6. A visible or teacher-accessible concept boundary that controls year-level depth.
7. At least one worked teaching example with clear teacher language.
8. Topic-specific misconceptions with rapid corrective actions.
9. A short, practical warm-up, game, investigation or group activity.
10. Formative checkpoints throughout and a final quick mastery check that assesses what the page taught.
11. Concise Support, Core and Extend adaptations.
12. Expected answers, acceptable evidence and remediation for mastery items.
13. An embedded live teacher-slide preview and a full-screen link.
14. Formal curriculum wording and references kept available without dominating the main teaching flow.
15. Links to the worksheet, Practice and Test resources.

Curriculum jargon belongs in the reference layer. The main lesson must explain the actual concept in plain, precise teaching language.

## 3. Required teacher-slide standard

- The teacher slide is the classroom-display version of the topic guide, not a separately invented lesson.
- Topic guide and teacher slide must be rendered from the same code-specific lesson data wherever technically possible.
- The slide must reuse the same central models, examples, terminology, colour meanings and misconception language.
- Condense the content for projection; do not change the underlying teaching idea.
- Use one main teaching purpose per slide. Add selectable slides when one screen would omit or over-compress an essential concept or elaboration.
- All essential elaborations must remain teachable from the slide sequence.
- Text must be readable from the back of a classroom and must not overlap, clip or sit on top of diagrams.
- Diagrams must retain accurate labels and relationships at presentation size.
- Include a clear route back to the full topic guide and onward to the worksheet, Practice and Test.

A code fails the standard if the topic guide is updated but the teacher slide continues to teach an older, different or incomplete version of the concept.

## 4. Visual-model acceptance standard

Visuals exist to explain, not decorate.

A passing visual must:

- represent the concept accurately;
- make the intended relationship immediately identifiable;
- use high contrast and readable labels;
- avoid collisions, overlap, clipping and unnecessary detail;
- remain usable on desktop, mobile and classroom-display layouts;
- include meaningful accessible text or an equivalent description;
- use consistent colours and symbols when the same idea appears on the topic page and teacher slide.

Simple SVG diagrams, clean icons and functional illustrations are acceptable. Prefer approved parameterised components so the same model can be reused safely across resources. Stock imagery is optional and must not replace a required mathematical, scientific or explanatory model.

For early years, prefer concrete and pictorial representations. For later years, use diagrams, graphs, tables, models or source evidence only where they materially clarify the concept.

## 5. Additive improvement

- Preserve useful existing content, curriculum wording, links, metadata and resources.
- Add missing explanation, examples, visual models, reasoning prompts or accessibility support.
- Do not remove an existing curriculum elaboration merely to simplify a page.
- Replace content only when it is incorrect, unsafe, duplicated or demonstrably misleading.

## 6. Complete curriculum-code coverage

- Treat the content description and every listed elaboration as required coverage strands.
- Map each elaboration to:
  - the exact curriculum wording in the reference layer;
  - a plain-language teaching interpretation;
  - a visual model, example, investigation or application;
  - a teacher action or useful teaching phrase;
  - a likely misconception and response where relevant;
  - observable student evidence or a mastery indicator.
- The main lesson may teach the central concept first, but related contexts and applications must remain visible within the topic lesson.

## 7. Worldwide audience

- Keep the Australian Curriculum code and exact elaboration wording clearly identified.
- Teach the underlying concept in language understandable to students and teachers worldwide.
- Use internationally familiar names, objects and situations where possible.
- Avoid examples that assume one country, climate, school system, family structure or cultural practice is universal.
- Label location-dependent information explicitly.

### Currency

- Retain Australian-dollar examples required by the Australian Curriculum.
- Add local-currency examples in parallel where useful; do not erase the original Australian example.
- Keep the mathematical place-value, unit-price, budget or change relationship unchanged.

### Measurement

- Teach SI metric units as the curriculum standard.
- Local customary units may be added as comparisons or extensions, not as replacements.

### Seasons and environment

- State the location or hemisphere when seasonal patterns matter.
- Add a locally relevant parallel example for international classrooms.

### Cultural knowledge

- Retain Australian-specific First Nations content and label it clearly.
- Use accurate, authorised and respectful sources.
- Do not merge, generalise or replace First Nations Australian knowledge with another cultural example.
- International teachers may add a separately sourced local cultural connection alongside the Australian strand.

## 8. Durable content

- Prefer stable concepts, definitions, diagrams and examples over short-lived trends.
- Avoid unnecessary references to current public figures, prices, software versions or temporary events.
- When a current example is pedagogically useful, label its date and keep the enduring concept independent of that example.
- Use generic brands and fictional names unless a real source is essential and properly attributed.

## 9. Assessment alignment

- Worksheet questions must be authored from the topic lesson, not copied from Practice or Test banks.
- Core worksheet: 8 questions using an appropriate mixture of multiple choice, fill-in-the-blank, matching and written response.
- Enrichment: 2 separate questions requiring explanation, comparison, creation, investigation or generalisation.
- Practice and Test Quick Reads should summarise the topic-page teaching and use the same models where useful.
- Assessment must not introduce a representation or interpretation that contradicts the topic guide or teacher slide.

## 10. Release gates

For every curriculum code, verify all of the following before release:

1. The central concept is mathematically, scientifically, linguistically or factually correct.
2. The teaching sequence suits the specific concept.
3. Every elaboration is explicitly and visually taught.
4. Examples genuinely demonstrate the stated concept.
5. Misconceptions are topic-specific and the fixes address their causes.
6. The topic page and teacher slide use the same source concepts, models, examples and terminology.
7. The teacher slide remains readable at classroom-display size.
8. Visuals render without overlap or clipping at desktop and mobile widths.
9. Units, labels, vocabulary, arrows and answer choices are unambiguous.
10. The warm-up and mastery check can be used immediately.
11. Worksheets assess what the lesson taught.
12. Australian curriculum contexts are preserved and international examples do not distort them.
13. No generic filler or irrelevant copied material remains.
14. Existing useful content and navigation have been preserved.
15. The concept boundary prevents accidental overteaching.
16. Every slide has a complete teacher-action layer.
17. Formative checkpoints appear after appropriate major models.
18. Support, Core and Extend remain inside the concept boundary.
19. Every checkpoint and mastery item includes expected answers, acceptable evidence, misconceptions and remediation.
20. Illustrations use approved parameterised models where practical and validate their inputs.
21. No downstream resource invents or reinterprets the concept outside the canonical specification.

### Automatic checks

Where possible, validation should check:

- presence of a visual-teaching entry for every elaboration;
- balanced HTML and SVG elements;
- duplicate IDs;
- missing accessible labels;
- broken internal resource links;
- topic-guide/teacher-slide source parity;
- required canonical-specification fields;
- teacher-action fields for every slide;
- expected-answer and remediation fields for every checkpoint;
- valid Support/Core/Extend entries;
- approved component names and safe parameter ranges;
- responsive overflow and label collisions.

### Human review

Automation cannot certify conceptual quality by itself. A reviewer must confirm that the models, explanations and activities teach the correct concept cleanly.

## 11. Scaling rule for the full curriculum

- Scale the shared renderer and component library, not repeated generic content.
- Store one unique structured lesson specification per curriculum code using `docs/canonical-lesson-specification-v1.1.md`.
- Define concept boundaries before authoring downstream resources.
- Reuse approved parameterised visual models across the topic guide, slides, activities and questions.
- Keep teacher-action notes, formative checkpoints, differentiation and answer evidence in the canonical specification.
- Generate the complete topic guide and condensed teacher-slide sequence from that specification.
- Process codes in manageable batches and require the release gates for each code.
- A batch is not complete merely because all pages were generated; every code must pass conceptual and elaboration review.
