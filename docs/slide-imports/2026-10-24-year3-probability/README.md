# Year 3 probability teaching-slide import

Destination: JBR99729/skillr, skillr-dev. User requested integration of the two attached flattened decks. Development branch only; no main merge or deployment.

- AC9M3P01: 83 slides, Chance, Outcomes and Likelihood.
- AC9M3P02: 83 slides, Repeated Chance Experiments and Variation.
- Existing teacher-slides routes now serve the supplied decks in the shared fixed-image viewer. Existing topic and legacy redirect links continue to resolve to these routes.
- Source slide order, teaching content and artwork are retained. PPTX slide images were extracted via their per-slide relationship, and PDF pages rendered at 2x. Images are WebP, approximately 1920 × 1080, quality 92. Original PPTX/PDF files are not exposed.
- No topic guide, question bank, shared runtime or production configuration was changed.

## Validation

- Both sources contain 83 pages/slides. All 166 resulting images decode; each deck has 83 unique file hashes, sequential references and no missing image paths.
- All source slides inspected in contact sheets, with full-size checks of covers and a dense model slide. No conversion-related clipping found.
- Existing viewer executed against a DOM test double: complete forward/back traversal, boundary buttons, keyboard navigation, fullscreen API handlers and copy/drag/context-menu prevention pass. This is a logic check, not a real browser result.
- Source HTML contains matching title/code, back-to-topic link, responsive sizing and no PDF/PPTX download links.
- Real browser, touch/fullscreen and device rendering checks remain unverified: Chromium is absent and the browser download failed. No claim of a complete browser QA pass or timed loading performance.

## Production review notes

The uploaded decks were preserved rather than reauthored. They use their supplied SkillrHub/code/year footer; they do not include the website standard's repeated watermark and exact code/domain footer. Their sequence follows the supplied deck, not an extraction from the existing topic guide. This development import is not certification of the standard's production-release gates. Reconcile those presentation requirements and complete browser checks before a separate production release.
