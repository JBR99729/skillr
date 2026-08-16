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
- Every migrated topic page must link to the fixed Teacher Slides viewer for the same curriculum code, not to a downloadable presentation file.

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

## 3. Teacher presentations use fixed pre-rendered slides

Teacher presentations must be authored/generated ahead of publication as clean 16:9 decks. A PPTX may be used as the build/master source, but the public website must not expose or link the PPTX.

Public delivery rules:

- The teacher-facing resource is a simple browser viewer that presents one fixed pre-rendered slide at a time.
- Slide artwork/pages are generated from the approved presentation ahead of publication.
- Minimal viewer JavaScript is allowed only for Previous/Next, slide number, keyboard navigation and fullscreen.
- Viewer JavaScript must not construct, rewrite or select curriculum teaching content from lesson data objects.
- No public Download PPTX or Download PDF control is allowed.
- Topic pages must link to the viewer route, not directly to PPTX/PDF assets.
- A teacher should be able to open the viewer on a laptop, tablet or classroom display and move page by page through the lesson.

Because the site is public, displayed slide images/pages cannot be made technically impossible to save by a determined user. The product requirement is therefore: do not expose the editable/downloadable deck file and do not provide a download control.

## 4. Mandatory branding

Every teacher slide must permanently include:

- visible SkillrHub branding;
- a subtle repeated `SkillrHub • skillrhub.com` watermark across the slide background; and
- a persistent footer exactly following the pattern:

`CURRICULUM_CODE • SkillrHub • skillrhub.com`

The curriculum code must be the code for that topic. Branding must be baked into the fixed slide artwork before publication. Website CSS or JavaScript must not be responsible for adding it.

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

Every source presentation must follow a render-first verification loop:

1. Generate/authenticate the fixed source deck.
2. Render every slide to the exact public slide image/page format.
3. Inspect every rendered slide for overlap, clipping, broken glyphs, off-canvas content, branding, watermark and footer presence.
4. Correct the source presentation.
5. Re-render until clean.
6. Verify the public viewer loads slide 1, navigates sequentially through every slide and never exposes a presentation/PDF download.

A presentation is not publication-ready merely because the source deck was created successfully.

## 7. Alignment rules

The static topic guide and fixed teacher presentation must agree on curriculum code, year, subject, central concept, curriculum elaborations, terminology, worked examples, visual relationships, misconceptions and year-level boundary.

Practice, Test and Daily Drill systems may remain interactive. They must not be rewritten as part of the static topic/slide migration unless separately requested.

## 8. Forbidden architecture

Do not introduce or restore any of the following for canonical curriculum teaching content:

- empty `topicRoot`, `slideRoot` or `deck` containers populated by curriculum JavaScript;
- runtime iteration of `slides`, `teachingSlides`, `models`, lesson JSON or similar objects to construct the canonical teacher deck;
- live renderer hosts that generate slide content in the browser;
- public direct links to `.pptx` or teacher-slide `.pdf` downloads;
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
- Teacher Slides opens a fixed page-by-page viewer;
- no PPTX/PDF download link is exposed;
- every rendered teacher slide has branding, watermark and the curriculum-code footer;
- rendered slide QA passes with no overlap or clipping;
- topic and teacher presentation are curriculum-aligned; and
- protected interactive features remain intact.

## 10. Change control

This v2 architecture is locked after the user's explicit 2026-08-17 unlock and migration decision.

A future structural change may proceed only after a later user message containing the exact phrase:

`Unlock Static Curriculum Architecture v2`
