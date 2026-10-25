# Year 4 Maths teaching-slide collection

Destination: JBR99729/skillr, skillr-dev. User requested the supplied decks under a fresh Year 4 grade collection. This change adds /year4/teacher-slides/ with exactly two cards, linked from the existing Year 4 and Year 4 Maths hubs. Existing curriculum content and other grades are preserved.

- AC9M4N01, Tenths and Hundredths: 94 slides.
- AC9M4N02, Odd and Even Numbers: 98 slides.

The existing code-specific teacher-slides routes serve the new fixed image decks using the shared viewer. Deck headers link back to the new Year 4 collection and the matching topic guide. Source artwork and presentation order are preserved; source PPTX files are not publicly exposed. Presentation XML slide order and image relationships were used for extraction. WebP images are approximately 1920 × 1080, quality 92.

## Checks

- All 192 images decode, have sequential references and unique hashes within each deck, and match the import manifest. Two initially empty conversion outputs were regenerated and the complete final set rechecked.
- All slides inspected in contact sheets. Covers and browser views checked at presentation size. This is an import-fidelity review, not a new curriculum-content certification.
- Real Chromium 153.0.8010.0 local browser check: every slide navigated sequentially and its image decoded; previous/next, last-slide boundary, keyboard navigation and fullscreen entry/exit passed for both decks.
- Desktop 1366 × 768, tablet 768 × 1024 and mobile 390 × 844: no horizontal overflow; viewer and controls fit within each viewport. Collection cards respond to mobile width.
- No JavaScript page errors in tested flows. External network calls were stubbed; this is not a live deployment or network-performance test. No real-touch hardware claim.
- Collection links, topic return links, grade-hub entry points, titles and counts checked. No PDF/PPTX download links.
- Existing Year 3 decks and shared viewer assets are unchanged. No production merge or deployment.

## Separate production review

As with the preceding Year 3 import, supplied artwork is retained as requested. Supplied footers and slide sequence do not constitute certification against the website standard's exact domain/footer, repeated-watermark or topic-source-copy requirements. Reconcile those source-presentation requirements before a separately authorised production release.
