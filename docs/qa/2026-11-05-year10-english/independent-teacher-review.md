Latest review status: **PASS for the bounded corrected artifact set** — see final independent recheck and exact hashes at the end. The initial HOLD is retained as review history.

# Independent teacher review — bounded Year 10 English topic-guide correction

Review date: 2026-11-05. Reviewer: independent teacher-review agent; no lesson files authored or rewritten by this reviewer.

**Decision: HOLD for fixes and exact-artifact recheck.** No Critical finding. Three High findings and four Medium findings below. This is a topic-guide correction review, not a PPTX/worksheet/question-bank build approval. Existing teacher-slide assets and app banks are outside the authored-change scope and are not independently approved by this review.

## Reviewed artifact identity

Paths are relative to `/workspace/scratch/259f3734fae5/skillr-fix/`. These hashes identify the initial frozen candidate, not any later corrected version.

| Artifact | SHA256 |
|---|---|
| year10/english/ac9e10la01-how-language-can-have-inclusive-and-exclusive-social-effects-and/index.html | 454a580c6a4cf1d6a581a5e16be35601a20c0d67d380fb9b44a05c0ad5514ee1 |
| year10/english/ac9e10la07-evaluate-the-features-of-still-and-moving-images-and-the/index.html | 520b8bcc36a15a30fd84f7a768b762aa2d34917c5acd8f3db796dc508a9da366 |
| year10/english/ac9e10le01-analyse-representations-of-individuals-groups-and-places-and/index.html | e5b50fd4e17d069977b8171d9a7d3afcfb17c89d8f1b4c92499fc33bffc6f82c |
| year10/english/ac9e10la07-evaluate-the-features-of-still-and-moving-images-and-the/entrance-frame-1.png | a991a098ce07e644c4b49be6a355db3b764c9a2e380c6dd4863fe242df336adc |
| year10/english/ac9e10la07-evaluate-the-features-of-still-and-moving-images-and-the/entrance-frame-2.png | 9d941444f89b3806cad01177470cbcd7b0bcf3e09c5d15bcdb87ca96b9a2f66b |
| year10/english/ac9e10la07-evaluate-the-features-of-still-and-moving-images-and-the/entrance-frame-3.png | e5714fab31b2c2d9fc96a8fbdc69928298492ad41db0578649ddc8a439059ac2 |
| year10/english/ac9e10la07-evaluate-the-features-of-still-and-moving-images-and-the/entrance-sequence.gif | fc63eda673f09c8a6a52b38ba2c7b21026452b23c7d1d6b8aeb5f7727895cecd |

## Findings requiring correction

### H1 — LA07 entrance evidence contradicts the lesson

Location: AC9E10LA07 `#examples`, line 104; all four entrance assets.

I opened and visually inspected the three PNGs. Frame 2 labels the main entrance as having steps, but depicts a doorway ending at one flat ground/baseline: visible stairs are absent. Frame 3 reuses the same façade/doorway and adds a ramp, rather than showing a distinct side entrance in a wider view. There is no visible side-entrance sign despite the alt text and model claiming a signed side entrance. The sequence therefore does not supply the key visual evidence for an unchanged building whose access information is gradually revealed. Captions cannot establish the missing visual relationships.

Recommended fix: construct all panels from one consistent building model with visible main steps and a physically distinct, signed level side route. Crop/compose frame 2 to omit the side route, and frame 3 to reveal it while retaining the original stepped entrance. Keep the student, building and route relationships consistent and update all PNGs/GIF, alternative text and model together. The representation should locate the barrier in the environment and retain the existing warning against assuming one route guarantees complete accessibility.

### H2 — Same-section stimulus availability fails

Locations: AC9E10LA07 `#reasoning` line 109 and `#mastery` line 111; AC9E10LE01 `#reasoning` line 109.

LA07 asks students to reorder three frames available only inside a different, normally collapsed section. Its exit ticket refers to the two clean-up pictures but supplies only a verbal recap. LE01 asks students to compare supplied Oodgeroo/Dickens excerpts but does not place the words or attributed context in that section. This violates the repository's explicit same-openable-section evidence rule and makes independent section use unreliable.

Recommended fix: repeat the actual three still frames with captions/timing in LA07 reasoning, repeat the actual two clean-up SVGs in its exit ticket, and repeat the bounded attributed excerpts/context in LE01 reasoning. Use unique SVG title/description IDs on repeated illustrations. Preserve qualified interpretation language.

### H3 — LE01 E1 is only partly taught

Locations: AC9E10LE01 `#examples` worked example 3, `#teaching`, `#alignment` E1/lesson mapping.

The Mara microfiction successfully teaches an anti-hero and connects her ethical tensions to one contemporary setting. E1 also specifies retelling/adaptation across contexts. No supplied paired version or model explains what changes when a cultural/story pattern is adapted to a different context. The general instruction to evaluate versions is not an enacted model or practice task. The current mapping overstates complete E1 coverage.

Recommended fix: add a short paired original version in a clearly different stated context, or an attributed source-reviewed comparison, and explicitly analyse retained anti-hero pattern, changed motives/stakes/values, and how each context explains the representation. No need to invent or invite students to rewrite First Nations cultural stories.

### M1 — LA07 moving-image control

Location: AC9E10LA07 `#examples` line 104 and entrance-sequence.gif.

Pillow inspection confirms three 2200 ms frames and `loop: 0` (indefinite repeat). Opening worked examples exposes an automatic animation lasting beyond five seconds, with no specific pause/hide control or reduced-motion handling. A still-frame alternative helps comprehension but does not itself stop adjacent movement.

Recommended fix: make the animation a clearly labelled opt-in native disclosure that users can close to hide it, keeping still frames available independently; or provide an accessible pause/stop mechanism. Check the final browser behaviour and ensure no essential evidence requires motion.

### M2 — LE01 E2 audience evaluation needs an explicit teaching step

Location: AC9E10LE01 `#guided-practice` line 107 and `#alignment` E2.

The Dempsey analogy is a concrete modernisation example and the model correctly avoids claiming observed audience reactions. However, the task and answer only explain how it could help a new reader, then state actual responses need evidence. They do not yet evaluate contemporary audience responses as stated in E2.

Recommended fix: model and ask for two defensible, explicitly predicted contemporary audience responses grounded in the supplied analogy and its attributed context; evaluate their usefulness/limits. Alternatively supply actual attributed reception evidence. Keep predicted response distinct from empirical fact and keep the narrative's particular cultural context intact.

### M3 — Retained navigation implies a matching test exists and duplicates an action

Locations: all three topic pages, `curriculum-hero` lines 97–98 and optional-video after-navigation line 119.

The pages correctly state that questions for these codes are coming soon. Yet “Test your understanding” and “Topic Test” point to the generic app homepage, and the main resource row repeats the identical “Browse app practice” link twice. These are retained shell defects rather than defects introduced by the new examples, but they are within the reviewed HTML and conflict with the no-silent-reroute/no-duplicate-action completion rule.

Recommended fix: suppress the unavailable matching-test links or label a genuine generic app browse destination honestly, remove the duplicate browse link, and keep the same-code Classroom View/Worksheet routes. Do not advertise a bank as live without production evidence. This review has not verified remote app-bank availability or marking/progress.

### M4 — Retained generic introductory language is malformed

Locations: all three `curriculum-hero__lead` paragraphs line 97; LE01 topic-first title line 94.

The lead mechanically inserts the content-description verb after “how”, producing phrases such as “how understand how…” and “how evaluate… shapes meaning”. LE01's early topic title ends mid-phrase (“First Nations Australian, a”). The correct full descriptor exists later, but these are prominent student-facing fragments.

Recommended fix: replace only these short introductory lines with accurate student-friendly sentences and a complete short LE01 title; preserve canonical/SEO metadata unless an actual defect requires changing it.

## Pedagogical review and coverage judgement

I read all authored explanations, worked models, questions, answers, misconceptions, differentiation and exit checks in the three HTML files. The replacements are substantially stronger than the generic placeholder versions and use evidence appropriate for Year 10 without requiring university theory. Answers generally distinguish observation, inference, intention and actual audience response. Multiple defensible interpretations are accepted with textual support.

| Code | Curriculum and elaboration judgement |
|---|---|
| AC9E10LA01 | Content description well addressed. E1 alignment, E2 first/second-person positioning, E3 assumptions, E4 appeals to belonging/care/values, and E5 inclusive/marginalising language are enacted in worked examples and practice. The distinction between wording and practical access is useful. No substantive answer error found. |
| AC9E10LA07 | Still/moving choices and the sole light/dark/duplicity elaboration are explicitly taught. The mayor example avoids making lighting proof of deceit. Clean-up crop, mayor and bird SVG source geometry agrees with stated comparisons; titles/descriptions and contrast-based explanations are present. Entrance evidence needs H1; self-contained reuse needs H2. |
| AC9E10LE01 | People/groups/places, voice versus author, and supported context are appropriately taught through First Nations Australian, other Australian and world texts. Oodgeroo and Dickens models are bounded interpretations. E3 humour/underdog/bush–city context is concretely addressed. E1 and E2 need the additional steps above before a complete-elaboration claim. |

The Paterson independent answer mentions onlookers absent from the supplied synopsis/excerpt, although the linked full poem supplies them. Prefer adding that small synopsis detail or explicitly making the full-poem reading a prerequisite if retaining that answer detail. This is a low-level clarity recommendation rather than a separate blocking finding.

## Cultural attribution, source use and disability representation

The literary guide names each text/author, attributes the Dempsey account and ABC/Parks Australia partnership, marks SkillrHub microfiction as invented, warns about the deceased First Nations recording, and avoids claiming one community speaks for all peoples. It explicitly avoids student imitation or unauthorised rewriting of cultural narratives. The quotations are bounded and used for close analysis; the Oodgeroo quotation is one short line. No copyrighted image/recording has been copied into this candidate. This review does not provide a legal licence opinion.

The access example's interpretive framing is sound: it avoids personal-failure and cure/saviour assumptions, says a route does not establish complete building access, does not require disclosure or disability imitation, and offers static evidence. H1 concerns visual accuracy, not the inclusion of a wheelchair user. The schematic PNGs share colours, figure style, framing and label treatment; revisions should preserve that consistency.

## Sources actually opened in this independent review

Opened via web retrieval on 2026-11-05 (not claims of playback or full performance inspection):

- QCAA Year 10 content-description alignment PDF: https://www.qcaa.qld.edu.au/downloads/aciqv9/english/curriculum/ac9_english_yr10_as_cd_alignment.pdf — confirms the descriptors/year boundary.
- NFSA/ASO poem transcript: https://aso.gov.au/titles/spoken-word/we-are-going/clip1/ — checked the short quotation and represented place context.
- NFSA/ASO curator's publication notes: https://aso.gov.au/titles/spoken-word/we-are-going/notes/ — checked publication year and activism context.
- ABC Education Dempsey transcript: https://www.abc.net.au/education/garrangarreli-and-the-baby/14015652 — checked the short contemporary analogy and partnership attribution. No video playback claimed.
- Project Gutenberg Paterson collection: https://www.gutenberg.org/cache/epub/213/pg213-images.html#link2H_4_0019 — opened the collection. The displayed retrieval excerpt did not include the entire target poem; the candidate's bounded quote was not independently line-by-line checked against the poem in this pass.
- Project Gutenberg Dickens: https://www.gutenberg.org/files/786/786-h/786-h.htm — checked opening quotation and surrounding schoolroom narration.

Search results from Scootle for all three exact codes reproduce the same elaboration wording as the candidate. I inspected those search results; I did not open ACARA's dynamic curriculum page. The author reports pre-existing November 4 source-reviewed dossiers; I have not represented those dossiers as fresh independent source inspection. ABC disability guidance, ABC shots lesson, optional videos and international mapping destinations were not freshly opened in this pass.

## Architecture, resource alignment and retained-section inventory

Read AGENTS.md, docs/static-curriculum-architecture-v2.md, docs/skillr-long-life-curriculum-content-standard.md, and docs/QA_REFERENCE_STANDARD.md. Source inspection confirms canonical teaching material directly in semantic HTML, native details/summary sections, normally collapsed supporting sections, and no requirement for JavaScript to assemble the lesson. Each page has one open learning-goal section. Local HTML IDs are unique. The still assets exist with correct 720×405 aspect ratio. GIF frames match the PNGs within palette-quantisation differences (maximum channel difference 5/255).

Retained bounded-task inventory, same on all three pages:

1. Learning goals (`learn`)
2. Before this lesson (`prerequisites`)
3. Key concept and three teaching focuses (`teaching`)
4. Worked examples (`examples`)
5. Questions and answers (`important-questions`)
6. Common mistakes (`misconceptions`)
7. Guided practice (`guided-practice`)
8. Independent practice (`independent-practice`)
9. Reasoning (`reasoning`)
10. Assessment-style practice (`assessment`)
11. Exit ticket (`mastery`)
12. Support/core/extend (`guidance`)
13. Curriculum alignment (`alignment`)
14. Curriculum/text references (`official-references`)
15. Practice/teaching resources (`resources`)
16. Related/prerequisite topics (`related`)
17. Optional video at the end (`topic-videos`)

All 17 are present, in that order. Duplicate checking disclosures and a competing second equivalents disclosure have been removed. Curriculum wording and related references remain in the single alignment area. Main-page CTAs/navigation remain but have M3 defects. No source checking/process disclosure remains visible. This inventory passes preservation/section completeness for the bounded correction; it does not certify full Year 1 style parity. The local year1/maths/ac9m1n01-numbers-to-120/index.html reference itself contains duplicate/legacy sections, so it cannot safely be treated as a clean approved snapshot without the author's approved retained-list record.

Classroom View links name the matching code and local viewer files exist. Worksheet links name the matching code, but no local quiz/year-10/english/CODE/worksheet/index.html files exist in this checkout; whether the routes are supplied by external routing or are already unavailable needs the release owner's route evidence. I did not claim a live worksheet-link pass. Teacher-slide examples and app/worksheet banks are unchanged and not content-approved here. Do not claim they were rebuilt to copy this corrected guide or award a whole-code/bank verified badge from this scoped review.

No desktop/mobile browser rendering, keyboard control, live route, authentication, progress, release-tree or deployment check is claimed by this teacher review. Those belong to the separately scoped software/release evidence. Publication must wait for corrections, an independent recheck, and the exact corrected hashes recorded in an addendum or replacement report.


# Final independent recheck — 2026-11-05

**Final decision: PASS for the bounded correction of these three static topic guides and four LA07 image assets, at the exact final hashes below.** This supersedes the initial candidate HOLD above. All three High and all four Medium findings are closed. No remaining Critical, High or Medium teacher-content finding within the authored correction scope.

I re-read the changed teaching models, prompts, answers and introductions; inspected the repeated evidence/IDs; opened all three corrected PNGs; checked the GIF frame count, duration and correspondence with those PNGs; and independently recalculated all seven hashes against the refreshed author manifest. I caught one incompletely removed duplicate CTA during recheck; the author then removed it and I verified the final main-row links are unique in all three exact HTML files.

| Finding | Recheck result |
|---|---|
| H1 visual evidence | Closed. Corrected images visibly show the original main entrance with three steps and a distinct signed side entrance with a level path. The wider third frame retains both entrances; it does not replace the main doorway. Building/figure style is consistent. Three GIF panels correspond to the PNGs, with palette quantisation differences only. Captions, alternatives and model now agree. |
| H2 same-section evidence | Closed. LA07 reasoning contains all three still frames with timing, and its exit ticket contains the actual two clean-up illustrations. Repeated SVG title/description IDs are unique. LE01 reasoning contains both bounded excerpts and the relevant attributed contexts. |
| H3 LE01 E1 adaptation | Closed. Paired original microfictions retain a rescue/unauthorised warning while changing technology, reward and ethical emphasis. The comparative model evaluates how the contemporary representation supports an anti-hero reading and explicitly avoids generalising about whole historical eras. |
| M1 animation control | Closed at source/teacher-review level. Animation is inside a separate initially closed native disclosure, clearly labelled as optional and closable to hide movement. Static frames remain independently available. The GIF still repeats; movement is an opt-in choice. Browser keyboard/hide verification belongs to the software check. |
| M2 LE01 E2 audience evaluation | Closed. The revised task asks for two possible contemporary responses. The answer evaluates recognition/access and the limits of an everyday analogy for understanding particular cultural significance. These are explicitly predictions, not claimed observed reception. |
| M3 duplicate/misleading navigation | Closed. Each final main resource row has one guide, one same-code Classroom View, one same-code Worksheet and one accurately labelled app-browse link. Quick Learning points to the local exit ticket with the label “Try the exit ticket”. Optional-video generic “Topic Test” links have been removed. |
| M4 malformed intros | Closed. All three leads are grammatical student-friendly explanations; each early topic title is complete. |

The minor Paterson clarity recommendation is also addressed: the supplied synopsis now identifies the barber's amused onlookers, supporting that answer detail. The uncertain source fragment was removed. The source text itself and its bounded quotation were not replaced with new material. No further broad source research was needed for this recheck.

The full retained 17-section inventory remains present and ordered as recorded above. No source-process or competing curriculum-equivalents disclosure was reintroduced. Canonical evidence remains static HTML and local images; every reviewed image element has alternative text. No duplicate HTML IDs were found. The new texts remain within Year 10 interpretation/evaluation boundaries, preserve particular cultural attribution, and distinguish inference from proof.

## Final reviewed artifact hashes

Only these hashes carry this final independent teacher PASS. Recalculate immediately before publication; any content/asset change requires a proportionate recheck of the changed material and a new identity record.

| Artifact | SHA256 |
|---|---|
| year10/english/ac9e10la07-evaluate-the-features-of-still-and-moving-images-and-the/index.html | e1d57539c6ef7e4c56cbb1f26a65bb3e6035bf221ec60743a0e088fecb1eaf37 |
| year10/english/ac9e10la01-how-language-can-have-inclusive-and-exclusive-social-effects-and/index.html | 7446a51488cb43a087c1ba3ff66b2ca24c6ba39d88beba8536fb349ba1ae2c20 |
| year10/english/ac9e10le01-analyse-representations-of-individuals-groups-and-places-and/index.html | 7b9bda96892c64cfaa04515604e048160d23b5264116f2ef3b81e980fc106b1e |
| year10/english/ac9e10la07-evaluate-the-features-of-still-and-moving-images-and-the/entrance-sequence.gif | 8b8b4b547c0d7c3e22f21feff75099067732a76b5c94632fd3d0faaca312acfd |
| year10/english/ac9e10la07-evaluate-the-features-of-still-and-moving-images-and-the/entrance-frame-3.png | 2455646d3cef81294936d34e1a59fd93c20474e63a59be9c710d6c4b8e6029c9 |
| year10/english/ac9e10la07-evaluate-the-features-of-still-and-moving-images-and-the/entrance-frame-1.png | 867aaeb1b3cee283c8470967f470cdfefc6c38added1fcd6bf1ef331e0a02713 |
| year10/english/ac9e10la07-evaluate-the-features-of-still-and-moving-images-and-the/entrance-frame-2.png | 2a5be871be5115defd41495f074dc43ac19fcc13adb70e24dd94980efcd1b865 |

## Remaining verification limits

This PASS applies to the requested static-guide correction and local image evidence. It does not approve unchanged teacher-slide examples, worksheet teaching content, question-bank completeness/marking, app availability, progress, authentication, verified badges, release integrity or deployment. The related source/architecture observations and initial source-inspection limits above remain accurate.

The release author reports separately opening the live LA01 worksheet route in a browser, seeing the correct code and matching guide/Classroom View links; the worksheet retains an older generic lead outside this correction. That is attributed author evidence, not a live check performed by this reviewer. I have not independently browser-tested all three worksheet routes. Full Year 1 presentation parity is not claimed from the local legacy reference. Desktop/mobile render and keyboard behaviour, exact release-tree checks and successful deployment still require the author's separately recorded applicable software/release evidence.

Final identity confirmation: after removal of four trailing spaces on blank line 117 in each HTML, I proved these were whitespace-only changes by reconstructing each prior reviewed hash. After the author completed a rebase preserving concurrent main changes, I recalculated all seven current disk hashes and the corresponding HEAD blob hashes; all match the final table. The final reviewed commit is `71c13a69a732a7e463730ffcc6c963ad77d053bd`. A transient during-rebase missing-file observation was resolved before this final verification; no missing reviewed asset remains.
