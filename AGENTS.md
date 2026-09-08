# Skillr Repository Instructions

## RED ALERT: preserve the complete site on every release

On 2026-09-06, a changed-files-only Git tree replaced main and removed the site and CNAME. This caused a production outage. Site integrity takes precedence over content throughput.

- Before any publication, read the current remote main commit and its tree. When using the GitHub tree API, `base_tree_sha` MUST be that complete tree. Never publish a tree built only from changed files, and never replace directory tree entries with partial subtrees.
- Before moving main, compare the complete candidate tree with that exact remote base. Run `node scripts/check_release_integrity.mjs BASE CANDIDATE` when the objects are available locally. For connector publication, perform the equivalent complete-tree comparison through GitHub: zero deleted paths, all core files present, unchanged CNAME, and only intended paths modified. A truncated tree response is not sufficient verification; traverse subtrees or fetch the Git objects.
- Any unexpected deletion blocks publication. Intentional deletion needs a separately reviewed maintenance change; never waive the check to publish a question bank.
- Re-read remote main immediately before updating it. If it advanced, rebuild on the new complete tree and repeat verification. Use a non-forced update only.
- After publication, verify the Pages deployment succeeded and load the live homepage and an affected practice route. A successful commit alone is not a successful deployment.
- The Release integrity workflow is a detection check until repository rules require it before merging and Pages deployment depends on it. Do not claim it alone prevents direct API pushes or deletion of the workflow itself.

## Current operating mode: stability / QA freeze

### Ongoing curriculum-code review standard

The owner confirmed this full-resource review standard on 2026-09-08. Apply it to each curriculum code being reviewed, while keeping work scoped to the requested code batch:

- Retrieve `svgSkillrHub-IXL-Research-Log.md` before research and check the latest repository review status. Reuse observed evidence and distinguish it from proposed teaching ideas or unverified source matches.
- Verify the exact official ACARA v9 descriptor and map every assessable component. Compare the actual relevant IXL skill pages, opened worked examples/help and representative questions across the observed progression. A catalogue listing is not a completed comparison. Use relevant Khan Academy lessons as supplementary conceptual evidence, within the Australian year-level boundary. Record inspected sources and any access or progression limits honestly.
- Substantively review every question, answer choice, correct answer, explanation and visual. Check meaningful variety, unambiguous answers, age suitability and complete curriculum coverage. Year 3 and above require at least 48 Practice and 16 Test questions per code; counts and structural validators do not establish content quality.
- Review and strengthen the same code's Topic Guide, Classroom View and worksheet/homework alongside its Practice and Test banks. Correct gaps and weak explanations, provide useful worked examples and mathematical/scientific/language models, and keep the resources consistent. Preserve strong existing content, current design, functionality, free access, no-login access and the existing resource flow. Do not use this instruction as permission for a broad rebuild or an architecture change.
- Use parallel research/authoring with separate independent reviewers when running the owner's delegated review workflow. The independent reviewer must inspect the final authored content, identify corrections by question/resource, recheck fixes and record the reviewed artifact identity before publication. An author cannot independently approve their own work.
- Publish only reviewed content through the review-aware publisher and ledger below. Preserve the complete latest main tree, unrelated changes and all existing paths; perform non-forced updates and verify release checks, GitHub Actions, Pages and live activities. A year-and-subject Content Verified badge remains off until every code in that group is reviewed.

### Content verification badge release condition

When publishing a reviewed production bank, use the review-aware publisher:

`node scripts/publish_production_question_bank.mjs PATH_TO_BANK.json --reviewed`

If a code was published through a specialised script, immediately run:

`node scripts/update_content_verification_status.mjs --record CURRICULUM_CODE`

The command is the required review ledger update. It refuses to record a code unless both published question files exist. A year-and-subject badge activates only when every code listed on that subject's curriculum hub is recorded as reviewed. Commit the ledger and all generated About, Editorial Standards, subject-hub, `ai-index.json`, `llms.txt` and `llms-full.txt` changes with the final code release. Never add or claim a verified badge manually. Run `node scripts/update_content_verification_status.mjs --check` before publishing any verification-status change.

Until the owner explicitly lifts this freeze, do **not** add new product features or perform broad curriculum rebuilds. Work is limited to QA, bug fixes, SEO/indexability fixes, accessibility fixes, factual/content corrections, and changes driven by real user, teacher or parent feedback.

Individual curriculum-code maintenance is allowed. A request to fix or improve one curriculum code, or a clearly named small set of curriculum codes, must stay scoped to those codes and must not be expanded into a site-wide rewrite.

Protect the core user journey for every curriculum code: **Topic Guide → Teacher Slides → Practice Sheet / Worksheet → Practice → Test**. A change that breaks, removes, empties or silently reroutes any of these is a release blocker.

Existing mass-build and migration workflows are maintenance tools, not permission to regenerate the site. Do not run, introduce or expand broad generators that rewrite all topic pages, teacher decks, worksheets or practice content unless the owner explicitly asks for that site-wide operation. Prefer the smallest direct patch to the affected curriculum code(s).

SEO is also in light-touch maintenance mode. Preserve the current titles, descriptions, canonicals, sitemap strategy and keyword architecture unless a specific page has a verified defect or the owner explicitly requests an SEO change. Weekly SEO cleanup should be evidence-led from Search Console: prioritise queries/pages ranking worse than position 30, improve only the relevant individual pages, and do not use that cleanup as a reason for site-wide rewrites.

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
- Every migrated topic page must link to a fixed Teacher Slides viewer route for the same curriculum code. Do not expose a public `.pptx` or direct-download teacher-slide link.

### Non-negotiable teacher-presentation rules

- Teacher presentations are fixed authored assets, not browser-assembled curriculum decks.
- A clean, pre-generated 16:9 PPTX may be used as the build/master source, but the PPTX itself must not be publicly linked or exposed as the teacher-facing resource.
- Public delivery is a simple page-by-page slide viewer using pre-rendered fixed slide images/pages generated from the approved presentation. The viewer may use minimal JavaScript only for Previous/Next, slide number, keyboard navigation, fullscreen and copy deterrence; JavaScript must not assemble or alter curriculum content.
- No public Download PPTX or Download PDF control is permitted for Teacher Slides. Do not link directly to the source PPTX/PDF from topic pages or the viewer.
- The public viewer must make casual copying difficult: disable context-menu/right-click over slide content, text/image selection, image dragging and browser print output; intercept common Copy/Save/Print/View Source shortcuts while the viewer has focus or is fullscreen. Do not claim this is DRM or screenshot-proof.
- Every rendered slide must include visible SkillrHub branding and a persistent footer in the form: `CURRICULUM_CODE • SkillrHub • skillrhub.com`.
- Every rendered slide must include a subtle repeated `SkillrHub • skillrhub.com` watermark that does not interfere with teaching content.
- Branding, watermark and footer are baked into the fixed slide artwork before publication, not injected by website CSS or JavaScript.
- No slide may ship with clipped text, overlapping text/images, cropped diagrams, unreadable labels, footer collisions or content outside the 16:9 safe area.
- Images and diagrams must fit controlled bounding boxes and preserve aspect ratio.
- The source presentation must be rendered to PDF/images for visual QA before publication. A presentation fails release if any overlap, clipping, broken glyph, missing branding, missing watermark or missing footer is visible.
- Curriculum code, concept, examples and terminology must match the topic guide.

### Protected interactive areas

Do not convert Practice, Test, Daily Drills, Dashboard, search or PWA behavior to static content as part of this migration. Their JavaScript may remain. Only update their links when required to point to the new static topic page or fixed teacher presentation viewer.

### Architecture change control

Static Curriculum Architecture v2 is now locked. Cosmetic, accessibility, factual-correction, broken-link and overlap fixes are allowed. A future structural change requires a later explicit user confirmation containing the exact words:

`Unlock Static Curriculum Architecture v2`

Do not weaken or bypass these rules in bulk-generation scripts, validators or one-off topic rebuilds.
