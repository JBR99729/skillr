# Ben and Vani: shared learning companions

The owner approved these names, the photo-inspired character artwork, five age
bands, and a site-wide rollout in the implementation conversation. The characters
are fictional learning guides. They do not claim to be real friends, collect
personal information, or encourage emotional dependence.

## Change once

`assets/companions/config.js` owns names, colours, artwork windows, Foundation–2,
3–4, 5–6, 7–8 and 9–12 age bands, voice, topic notes and presentation policy.
`companions.css` owns all responsive and print styling. `companions.js` owns
optional learning navigation. Update these shared files to update connected pages.
No subject/year-specific mascot runtime is required.

The approved reference artwork is used unchanged, with CSS displaying portraits
from each age band. Source photographs are not published. A generated transparent
atlas did not meet the consistency requirement and is not shipped.

## Preserve learning

Canonical topic and Classroom View teaching remains authored static HTML. The
guide walks existing sections and individual numbered worked-example steps;
it does not fetch, paraphrase, replace or generate the lesson. All content and
resource links remain available without JavaScript. Show me again revisits the
authored step; it does not claim to create a new explanation. Let me try restores
the original disclosure state. No timers or forced advancement are introduced.

Practice uses only the active shuffled question's authored `hint` when available.
Otherwise it gives an explicitly general getting-started prompt. Answers and
explanations are never used as pre-answer hints. Feedback stays owned by the quiz
engine. During an active Test the guide is hidden; scoring, attempts, navigation
and existing banks are untouched. No Content Verified status is changed.

Year 9 onward uses quieter portraits and copy. AC9S9U02 has an explicit factual
reproduction note; other clearly titled reproduction/puberty lessons use a neutral
note. Sensitive lessons omit character pictures. These are presentation policies,
not age gates: curriculum-appropriate content remains available at its assigned
year level. No student personal experiences are solicited.

The hide preference is stored only on the current browser/device. Blocking storage
does not break lessons. Classroom guides sit outside teaching artwork and are hidden
in fullscreen. Existing fixed slide assets and published PDF files are preserved.
Printable worksheet HTML has a compact guide; existing download generators keep
their own output. Embedding mascots into pre-existing PDFs requires a separately
validated regeneration of those files, and is not claimed by this UI release.

## Coverage and maintenance

The five existing shared utility entrypoints load the same idempotent loader.
Pages without those entrypoints receive only a deferred script tag. Run
`node scripts/wire_companions.mjs` after adding new standalone pages, and
`node scripts/wire_companions.mjs --check` to audit coverage. Redirect pages and
archived/report artifacts are excluded. Legal/error pages load no companion UI.

Release with the complete-tree checks in AGENTS.md. Preserve source content, all
resource routes, the domain and unrelated changes, and check Pages deployment.

## SkillrHub messages and story

About introduces the pair and includes the short fictional story “One small step,
together”. Updates records the launch and links to a working lesson. Route-specific
welcome copy lives in `config.siteMessages`. Existing feedback cards, information
callouts and elements marked `data-skillr-message` receive a small companion badge.
Use `data-companion="ben"` or `data-companion="vani"` to choose a speaker. Hiding
companions also hides these badges. Sensitive lessons suppress them.

For subsequent transient announcements, the shared `SkillrCompanions.announce`
method accepts `{ title, message, speaker }`. It inserts text only, respects hidden
guidance, and does not display announcements during an active test.

## Implementation verification

The release was checked with Node syntax checks, the idempotent wiring audit and
DOM integration tests. The wiring audit covered 9,238 non-redirect HTML pages;
46 redirects were excluded. The 61 pages receiving direct script tags were
compared byte-for-byte after removing that exact addition. Their original content
was unchanged. Other existing HTML changes are the explicit Home, About and
Updates brand sections. Existing question banks and slide artwork are unchanged.

DOM checks covered Foundation, Year 4 Maths and English, Classroom View, Year 9
reproduction, worksheets, year hubs and Home; individual worked steps, repeats,
restored disclosures, hidden preferences, blocked storage, correct shuffled hints,
answer non-disclosure, neutral topic notes and test independence. A real quiz-engine
integration check started Practice, answered a question, and verified the normal
score and feedback with the companions mounted. These are structural/behavioural
checks; they are not a claim of browser screenshot testing or a new curriculum
content verification pass.
