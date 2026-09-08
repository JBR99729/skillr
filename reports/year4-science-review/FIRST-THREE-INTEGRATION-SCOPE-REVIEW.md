# Independent integration scope and source-claim review

2026-09-08. PASS for inspected root integration changes. This review covers technical integration and claim wording, not self-approval of the U01 content authored by this agent.

- The shared quiz runtime and bootstrap are unchanged. The new preparation helper matches only Year4ScienceU01–03 Practice/Test and preserves the same explicitly authored node after initialization.
- The science worksheet, general subject worksheet, subject quick-read and interactive visual helper guards require a targeted code and explicit authored marker. Existing unmarked legacy worksheet behavior was exercised by the runtime control cases. Other code/year/subject behavior is not rewritten by these branches.
- The new review adapter checks bank version, question ID, exact question/explanation and correct answer before adding a model. The SVG allowlist is restricted to local paths belonging to the current U01–03 code with a named fragment. Actual negative runtime cases cover changed question/answer/explanation/version and foreign/external sources.
- The worksheet PDF expression retains the existing Maths code set and adds exactly AC9S4U01, AC9S4U02 and AC9S4U03. A comparison over generated combinations of three subjects,11years,ninestrands and21code suffixes found only these three new matches. The surrounding conditions still require self-check type, matching curriculumCode and exact code-w-### identity. This affects retained writing space, not scoring or the question content.
- Pre-module note changes concern U01/U03 model references. They do not remove the required reading screen or change the gate. Its actual screen and Continue control are exercised by the runtime harness. Source-specific teaching review is assigned separately.

FIRST-THREE-SOURCE-COMPARISON.md was checked for correspondence between the observations supplied by root and the claims made. The document separates inspected entry questions from completed answers/worked feedback, names unobserved IXL stages, records obscured/unfinished tasks, states that the Khan forces video was not played, and distinguishes teacher-background material from Year4 requirements. It does not claim an exhaustive competitor audit. The initial author reports saying the author did not observe IXL are historical/role-specific and do not contradict root's later observations. This audit did not independently repeat root's browser sessions.

The ledger records reviewed content for three codes; the year-and-subject badge remains off while nine codes are outside this batch. Partial external-platform sampling remains explicitly disclosed. No source-stage completion is inferred from counts or validators.

Runtime and PWA results, final reviewed artifact identities and VM limitations are recorded separately in FIRST-THREE-INDEPENDENT-RUNTIME-QA.json/md. PDF rendering, deployment and live browser acceptance remain separate gates.
