# Static Curriculum Architecture v2

Effective: 2026-08-17

This document supersedes the live-renderer architecture in Topic Guide + Teacher Slide v1.1. It applies to Foundation-Year 10 Maths, English and Science.

## 1. Topic pages are static HTML

The canonical curriculum topic page must contain its teaching content directly in `index.html`.

Required properties:

- Semantic HTML carries the lesson content.
- Shared CSS controls appearance.
- The page must still contain the complete teaching content if JavaScript is disabled or removed.
- Client-side JavaScript must not fetch, select, assemble or inject the lesson body.
- Analytics, reporting, accessibility helpers and PWA registration are permitted because they are not curriculum-content renderers.
- Long topic guides must use native `<details>` / `<summary>` disclosure sections to remain compact without JavaScript.
- The first high-value section may use `<details open>`; secondary sections should normally be collapsed.
- Every migrated topic page must link directly to the fixed `.pptx` teacher presentation for the same curriculum code.

Recommended structure:

1. Hero: curriculum code, year, subject and plain-language topic title.
2. Resource buttons: Topic Guide, Teacher Slides, Practice Sheet/Worksheet, Practice, Test.
3. `<details open>` What students learn / key concept.
4. `<details>` Key vocabulary and representations.
5. `<details>` Teaching progression / worked examples.
6. `<details>` Curriculum elaborations and how each is taught.
7. `<details>` Misconceptions and quick fixes.
8. `<details>` Support / Core / Extend.
9. `<details>` Quick check / mastery evidence.
10. `<details>` Formal curriculum references / international mapping / related topics.

## 2. Content preservation and restoration

Do not treat the current file as automatically authoritative when a user reports lost or changed content.

Before bulk rewriting a topic page:

1. Inspect Git history for the page and its canonical lesson data.
2. Identify the last strong, curriculum-correct authored version.
3. Preserve useful authored explanations, examples, elaboration teaching, misconceptions and links.
4. Remove only content that is incorrect, duplicated, generic, off-year-level or clearly superseded.
5. Never replace a strong topic page with a generic curriculum-description template.
6. Keep the topic inside its curriculum boundary; later-year extension content must not silently become the core lesson.

## 3. Teacher presentations are fixed PPTX assets

Teacher presentations must be generated ahead of publication as fixed 16:9 `.pptx` files. Runtime browser code must not assemble the teaching deck from JSON, JavaScript curriculum objects, live HTML hosts or renderer scripts.

Publication rules:

- The canonical teacher-slide asset is `.pptx`.
- The topic page must link directly to that fixed PPTX.
- A fixed PDF may also be exported from the PPTX for browser preview or printing, but PDF is optional and does not replace the PPTX master.
- The website must never recreate the deck at runtime.

## 4. Mandatory branding

Every teacher slide must permanently include:

- visible SkillrHub branding;
- a subtle repeated `SkillrHub • skillrhub.com` watermark across the slide background; and
- a persistent footer exactly following the pattern:

`CURRICULUM_CODE • SkillrHub • skillrhub.com`

The curriculum code must be the code for that topic. Branding must be baked into the PPTX artwork. Website CSS or JavaScript must not be responsible for adding it.

## 5. Slide safe-area and overlap rules

A teacher presentation fails release if any slide contains:

- clipped or truncated text;
- text on top of another text block;
- image/image collision that harms readability;
- text unintentionally covering a diagram or image;
- cropped diagram labels;
- content extending outside the 16:9 slide canvas;
- footer or watermark collision with teaching content;
- broken glyphs, black squares or missing symbols;
- unreadably small text caused by forcing too much content onto one slide.

Images must preserve aspect ratio and fit controlled bounding boxes. Reserve a protected footer safe area on every slide. If content does not fit cleanly, create another slide rather than shrinking the whole lesson.

## 6. Render verification gate

Every generated PPTX must follow a render-first verification loop:

1. Generate the fixed PPTX.
2. Export/render it to PDF and/or slide images for QA.
3. Inspect every rendered slide for overlap, clipping, broken glyphs, off-canvas content, branding, watermark and footer presence.
4. Correct the PPTX source.
5. Re-render until clean.

A presentation is not publication-ready merely because the PPTX file was created successfully.

## 7. Alignment rules

The static topic guide and fixed teacher presentation must agree on curriculum code, year, subject, central concept, curriculum elaborations, terminology, worked examples, visual relationships, misconceptions and year-level boundary.

Practice, Test and Daily Drill systems may remain interactive. They must not be rewritten as part of the static topic/slide migration unless separately requested.

## 8. Forbidden architecture

Do not introduce or restore any of the following for canonical curriculum teaching content:

- empty `topicRoot`, `slideRoot` or `deck` containers populated by curriculum JavaScript;
- runtime iteration of `slides`, `teachingSlides`, `models`, lesson JSON or similar objects to construct the canonical teacher deck;
- `teacher-slides/live.html` or equivalent live renderer as the canonical teacher resource;
- separate renderer versions per year as the primary source of topic content;
- content that disappears when a script fails to load;
- website-only watermark/footer injection for teacher presentations;
- bulk generators that overwrite authored topic HTML without Git-history/content-preservation checks.

## 9. Release validation

A migrated topic is complete only when:

- core teaching content is present directly in the HTML source;
- the page uses native collapsible sections where needed;
- no curriculum-content renderer is required;
- all resource links work;
- a fixed `.pptx` teacher asset exists and is linked directly;
- every teacher slide has branding, watermark and the curriculum-code footer;
- rendered slide QA passes with no overlap or clipping;
- topic and teacher presentation are curriculum-aligned; and
- protected interactive features remain intact.

## 10. Change control

This v2 architecture is locked after the user's explicit 2026-08-17 unlock and migration decision.

A future structural change may proceed only after a later user message containing the exact phrase:

`Unlock Static Curriculum Architecture v2`
