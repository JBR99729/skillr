# Skillr Repository Instructions

## Curriculum topic guides and teacher slides

The user explicitly unlocked Topic Guide + Teacher Slide v1.1 on 2026-08-17. The old live-renderer architecture is superseded.

Before creating, rebuilding or reviewing any curriculum topic guide or teacher slide, read and follow:

- `docs/static-curriculum-architecture-v2.md`
- `docs/skillr-long-life-curriculum-content-standard.md` for content-quality rules that do not conflict with v2

The **Static Topic Guide + Fixed Teacher Presentation standard (v2)** is mandatory for Foundation-Year 10 across Maths, English and Science.

### Non-negotiable topic-page rules

- Canonical topic content must exist directly in the topic page HTML. Do not require JavaScript to fetch, assemble or render curriculum teaching content.
- Use semantic HTML and shared CSS only for the teaching page. JavaScript may support non-content utilities such as analytics, reporting, accessibility or PWA registration, but removing JavaScript must not remove the teaching content.
- Keep long pages compact with native `<details>` / `<summary>` sections. The learning goal / key concept section may be open by default; supporting sections should normally be collapsed.
- Preserve correct authored content. Before replacing or shortening a topic page, compare Git history and recover useful previous content. Do not silently overwrite a strong topic guide with a generic template.
- Stay inside the curriculum code's year-level boundary. Do not add next-year formalism as core content.
- Topic Guide, teacher presentation, worksheet, Practice and Test links must remain aligned to the same curriculum code.
- Topic pages must remain indexable, accessible and readable without a client-side curriculum renderer.
- Every migrated topic page must link directly to its fixed `.pptx` teacher presentation. A PDF may also be offered as a preview/export, but it is not the canonical teacher-slide asset.

### Non-negotiable teacher-presentation rules

- Teacher presentations are fixed authored assets, not browser-assembled curriculum decks.
- The canonical deliverable is a clean, pre-generated **16:9 PPTX**. PDF is optional only as a fixed preview/export generated from that PPTX.
- The website must link to or serve the fixed PPTX. It must never rebuild slide content at runtime from curriculum JavaScript, JSON, renderers, `live.html` hosts or empty slide containers.
- Every slide must include visible SkillrHub branding and a persistent footer in the form: `CURRICULUM_CODE • SkillrHub • skillrhub.com`.
- Every slide must include a subtle repeated `SkillrHub • skillrhub.com` watermark that does not interfere with teaching content.
- Branding, watermark and footer are part of the PPTX slide artwork itself, not injected by website CSS or JavaScript.
- No slide may ship with clipped text, overlapping text/images, cropped diagrams, unreadable labels, footer collisions or content outside the 16:9 safe area.
- Images and diagrams must fit controlled bounding boxes and preserve aspect ratio.
- The PPTX must be rendered to PDF/images for visual QA before publication. A presentation fails release if any overlap, clipping, broken glyph, missing branding, missing watermark or missing footer is visible.
- Curriculum code, concept, examples and terminology must match the topic guide.

### Protected interactive areas

Do not convert Practice, Test, Daily Drills, Dashboard, search or PWA behavior to static content as part of this migration. Their JavaScript may remain. Only update their links when required to point to the new static topic page or fixed teacher presentation.

### Architecture change control

Static Curriculum Architecture v2 is now locked. Cosmetic, accessibility, factual-correction, broken-link and overlap fixes are allowed. A future structural change requires a later explicit user confirmation containing the exact words:

`Unlock Static Curriculum Architecture v2`

Do not weaken or bypass these rules in bulk-generation scripts, validators or one-off topic rebuilds.
