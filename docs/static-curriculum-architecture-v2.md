# Static Curriculum Architecture v2

Effective: 2026-08-17

This document supersedes the live-renderer architecture in Topic Guide + Teacher Slide v1.1. It applies to Foundation-Year 10 Maths, English and Science.

## 1. Topic pages are static HTML

The canonical curriculum topic page must contain its teaching content directly in `index.html`.

Required properties:

- Semantic HTML carries the lesson content.
- Shared CSS controls appearance.
- The page must still contain the complete teaching content if curriculum-rendering JavaScript is disabled or removed.
- Client-side JavaScript must not be required to fetch, select, assemble or inject the lesson body.
- Analytics, reporting, accessibility helpers and PWA registration are permitted because they are not curriculum-content renderers.
- Long topic guides must use native `<details>` / `<summary>` disclosure sections to remain compact without JavaScript.
- The first high-value section may use `<details open>`; secondary sections should normally be collapsed.

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

## 3. Teacher presentations are fixed assets

Teacher presentations must be generated ahead of publication as fixed 16:9 assets. Runtime browser code must not assemble the teaching deck from JSON or JavaScript curriculum objects.

Preferred publication assets:

- editable `.pptx` master when available; and
- classroom-ready `.pdf` generated from the same deck.

A topic page should link to or embed the fixed PDF. A PPTX link may be offered only when intentionally permitted by product policy.

## 4. Mandatory branding

Every teacher slide must permanently include:

- visible SkillrHub branding;
- a subtle repeated `SkillrHub • skillrhub.com` watermark across the slide background; and
- a persistent footer exactly following the pattern:

`CURRICULUM_CODE • SkillrHub • skillrhub.com`

The curriculum code must be the code for that topic. Branding must be baked into the slide/PDF artwork. Website CSS or JavaScript must not be responsible for adding it.

## 5. Slide safe-area and overlap rules

A teacher presentation fails release if any page contains:

- clipped or truncated text;
- text on top of another text block;
- image/image collision that harms readability;
- text unintentionally covering a diagram or image;
- cropped diagram labels;
- content extending outside the 16:9 slide canvas;
- footer or watermark collision with teaching content;
- broken glyphs, black squares or missing symbols;
- unreadably small text caused by forcing too much content onto one slide.

Images must preserve aspect ratio and fit controlled bounding boxes. Prefer `contain` behavior rather than cropping. Reserve a protected footer safe area on every slide.

If content does not fit cleanly, create another slide. Do not shrink the full lesson until it technically fits.

## 6. PDF verification gate

Every generated teacher PDF must follow a render-first verification loop:

1. Generate/export the PDF from the fixed slide source.
2. Render every PDF page to images.
3. Inspect the rendered pages for overlap, clipping, broken glyphs, off-canvas content and branding/footer presence.
4. Correct the source deck.
5. Re-export and re-render until clean.

A PDF is not publication-ready merely because the export command succeeded.

## 7. Alignment rules

The static topic guide and fixed teacher presentation must agree on:

- curriculum code;
- year and subject;
- central concept;
- curriculum elaborations;
- terminology;
- worked examples;
- visual relationships;
- misconceptions and corrections; and
- year-level boundary.

Practice, Test and Daily Drill systems may remain interactive. They must not be rewritten as part of the static topic/slide migration unless separately requested.

## 8. Forbidden architecture

Do not introduce or restore any of the following for canonical topic teaching content:

- empty `topicRoot` / `slideRoot` containers whose lesson content is populated by curriculum JavaScript;
- runtime iteration of `slides`, `teachingSlides`, `models`, lesson JSON or similar objects to construct the canonical teacher deck;
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
- the fixed teacher asset exists;
- every teacher slide has branding, watermark and the curriculum-code footer;
- the teacher PDF passes rendered visual inspection;
- topic and teacher presentation are curriculum-aligned; and
- protected interactive features remain intact.

## 10. Change control

This v2 architecture is locked after the user's explicit 2026-08-17 unlock and migration decision.

A future structural change may proceed only after a later user message containing the exact phrase:

`Unlock Static Curriculum Architecture v2`
