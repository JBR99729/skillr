# Homepage and signup candidate — independent focused recheck

1 November 2026. Result: **SMOKE PASS after two root fixes**, limited to the named homepage/registration UI changes. This does not certify the unavailable public Year 7 app route, email delivery, account creation or completed registration.

Reviewed local candidates: `home-funnel-stage/index.html`, its `assets/home-landing.css`, and `registration-prod-stage/public/learning/portal.js`. The isolated Chrome preview at `http://terminal.local:4173/home-funnel/view.html` embeds actual candidate homepage/signup UI at 320 and 390 CSS pixels; desktop versions were inspected separately at the existing browser viewport. No credentials, checkbox consent, signup submission, accounts, learner profiles or question attempts were created or changed.

## Findings closed

1. The former seven-tile CSS forced the new eighth tile onto an extra full-width row, leaving Year 6 alone. Root narrowed the spanning selector to `a:last-child:nth-child(odd)`. Fresh 320/390 rendered screenshots and DOM geometry now show eight equal-width tiles in four two-column rows. Year 6 and Year 7 share the last row; no clipped label or extra row remains.
2. The signup consent label previously distributed its bare text and legal anchors as separate flex items, producing a narrow six-line text column at 320. Root grouped the unchanged consent text and anchors in one span beside the unchanged required checkbox. Fresh 320/390 screenshots show normal readable wrapping, with complete links, checkbox and submit control visible and no horizontal overflow. Consent meaning, links and requirement are unchanged.

## Final checks

- Homepage and signup headings, labels, helper text, consent, actions and illustration are readable at 320/390 and desktop. The signup illustration follows the form/navigation rather than preceding its fields. Password and country inputs retain their labels and required validation, with `aria-describedby` pointing to the appropriate visible help. Password still enforces eight characters, Country keeps its existing datalist/maximum, and legal consent remains required.
- The eight homepage destinations preserve F–6 routes. Year 7 points to the already browser-verified `https://skillrhub.com/year7/curriculum/maths/`, preserving access to existing topic/legacy activities. It does not point at or claim a released Year 7 app bank. Year 6, Year 7 and the two new signup links carry the intended existing homepage click-tracking annotations.
- Clicking the candidate's hero signup CTA reached the real production `https://app.skillrhub.com/?signup=1` and displayed the free-account form. The existing production direct entry works; the new candidate hints themselves were inspected in the isolated fixture. No input or submission followed.
- Against production portal blob `0332cc55640b21c7027641f6b27a248365f4a07f`, only the three presentation/helper lines 209, 210 and 223 differ, apart from final newline formatting. All other code, including signin/signup handlers, is identical. A dynamic isolated comparison of `showPracticeLogin(false)` produces byte-identical returning-login HTML. Production and DEV versions of the changed signup renderer and country helper compare exactly equal.
- No conversion rates or improvement claims are inferred. Existing signup-click/request-start instrumentation does not establish email-confirmed registration. PR 890's generic unavailable Year 7 app mapping remains outside this pass and must not be merged on this evidence.

## Exact reviewed SHA-256

| File | SHA-256 |
| --- | --- |
| home-funnel-stage/index.html | `ea7bae99d068abe407a651edfc3895caac54f89753514c16337ee4c583f0b738` |
| home-funnel-stage/assets/home-landing.css | `8942eaccf0f6522faa2190227c22ebd743b86d7134ff6abd204bbb24e9d22ada` |
| registration-prod-stage/public/learning/portal.js | `874df667078bd0f719ff25912a989b0c4cae7abcab796769bb9c7120765f6f67` |

Publication integrity checks and post-deployment smoke remain root's separate next steps. This review performed no publication or authentication change.

