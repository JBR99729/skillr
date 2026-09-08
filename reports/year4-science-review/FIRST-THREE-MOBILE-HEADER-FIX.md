# Independent mobile header fix review

2026-09-08. **PASS for the two-line production fix.** CI mobile rerun remains the final rendered-layout gate.

The Science pre-module flow passed24desktop cases but failed H01Practice at375px and U04Test at320px. Supplied CI measurements placed the mobile Menu at369px/right428px on375px and314px/right373px on320px; utility controls extended to522px and467px respectively. The identical147px overrun at both widths points to a full-width brand followed by fixed-width controls.

The actual cause is the existing `style.css` rule inside `@media (max-width:480px)`: `.main-nav a, nav a { width:100%; }`. The shared header brand is an anchor inside a navigation element; its `flex:0 0 auto` preserves this full available width. The responsive header selector previously did not reset width. This also explains the absence of the defect at500px. The earlier CSS-load-race hypothesis was superseded by these measurements and the matching cascade rule.

Inspected production change: `width:auto` added only to `.skillr-site-header .site-header__brand` in `assets/site-navigation.css`. Its specificity overrides the broad mobile anchor rule, allowing the brand to take its intrinsic width while retaining existing Menu and utility control sizes. Other navigation link widths, quiz content, pre-module content and overflow assertions are unchanged. The loader requests `20260908-responsive3` to fetch the revised stylesheet. The service worker explicitly routes `/assets/pwa-register-legacy.js` through its network-first branch.

The temporary validator diagnostic was restored: `git diff` and status show no change to `scripts/validate_pre_module_flow.mjs`. No overflow-hiding rule or test weakening ships. Independent review performed by source/cascade inspection using root-supplied CI measurements; this agent did not claim a fresh browser render.

## Reviewed file identities

- `assets/site-navigation.css` — SHA256 `409f7f8c7bc162167dc4dbb5f982e66da8c410e62a46c8d677364ee7b6ade27d`
- `assets/pwa-register-legacy.js` — SHA256 `36fdeb3b7340ee58447043942cf276df8934d450274329a420640f40a7d20d47`
- `style.css` — SHA256 `758a79ccf2ead3121ddc6252260a53e453c4c74b47b1d310c81573ddccc13af4`
- `scripts/validate_pre_module_flow.mjs` — SHA256 `2ea30236ab50e63c74bda0b186ff59b9ed29a3732e572250a7b19fcdbe72e794`
