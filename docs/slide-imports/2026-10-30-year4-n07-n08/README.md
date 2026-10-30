# Year 4 AC9M4N07 and AC9M4N08 teaching-slide import

Destination: JBR99729/skillr, skillr-dev. Add two supplied flattened presentations to /year4/teacher-slides/:

- AC9M4N07: Estimation and Rounding, 97 slides.
- AC9M4N08: Mathematical Modelling, 100 slides.

Source presentation order and artwork are retained. Images were extracted using presentation XML slide order and per-slide image relationships, then converted to WebP (quality 92), preserving aspect ratio at up to 1920 × 1080 pixels. No source PPTX/PDF download is exposed.

The existing same-code teacher-slides routes now use the shared fixed-slide viewer. Existing topic and curriculum-hub links keep working. The Year 4 collection gains two cards and now contains seven decks. Its description and the Year 4 entry-card description include the added topics. The previous five decks and shared runtime are unchanged.

## Validation

- All 197 images decode with correct dimensions, unique hashes within each deck, sequential references and matching manifest hashes. Manifest also records each source image hash and the source PPTX hash.
- All slide contact sheets inspected for import fidelity. Desktop viewer screenshots for both decks and mobile viewer screenshot reviewed.
- Chromium 153.0.8010.0: every slide navigated in order and decoded; previous/next, first/final boundaries, keyboard navigation and fullscreen entry/exit pass for both decks.
- Desktop 1366 × 768, tablet 768 × 1024 and mobile 390 × 844: no horizontal overflow, viewer and controls fit the viewport. Seven collection cards and all cover images verified.
- No JavaScript page errors in the tested flows. External requests were stubbed; this is local browser testing, not live-deployment or network-performance evidence.
- No question banks, topic content, other grade resources or production configuration changed. No production deployment.

## Production review scope

This is an import of the user's supplied artwork, not a fresh curriculum-content certification. As in preceding imports, source footers, watermark treatment and source-authored sequence are preserved. Reconcile the exact website-standard footer/watermark and topic-source-copy requirements before any separately authorised production release.
