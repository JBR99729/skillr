# AC9M4M02 author report

Authoring checkpoint: 2026-09-08. This is scoped curriculum content maintenance on `content/year4-maths-third-five-current`; no author commit, publication, runtime bank generation, shared-code edit or ledger update was performed.

## Status and gates

- **Local bank review:** independent reviewer solved every item and inspected every original bank diagram. Mathematical content PASS after the correction loop below. This is not a source-comparison or publication approval.
- **Full resources:** strengthened Topic, native Classroom View and eight standalone written homework tasks authored; reviewer checked teaching and all worksheet objects and requested the narrow corrections recorded below. Final teaching, worksheet objects and the exact production PDF all passed independent local review; no content correction remains. The reviewer records the final artifact identity in the INDEPENDENT-REVIEW report.
- **Actual IXL/Khan comparison: HOLD.** No opened help/worked-example panel or representative question progression was observed. Search/catalogue matches and page navigation are candidate evidence only. Browser remained root-owned and unavailable.
- **External-source pause:** all author external requests stopped when root relayed the user's “too many requests” report. No retries or alternate access routes were attempted.
- **Publication:** pending root-owned gates. Do not add this code to the reviewed ledger or claim an overall independent PASS from this author report.

## Official scope

Exact ACARA v9 description: recognise ways of measuring and approximating the perimeter and area of shapes and enclosed spaces, using appropriate formal and informal units

Full official descriptor and elaborations were read in `THIRD-FIVE-ACARA-SOURCE.json`, sourced from ACARA's April 2024 Mathematics linked-data release. The root-retrieved primary local JSON-LD SHA256 is `4d6b7a01d10517dc97ad709055c62c171b9b90ea33e0d0fc395e9bd2f96e48b1`. Every E-numbered statement appears with teaching expansion in Topic and Classroom in original source order. Raw release LaTeX delimiters are removed for clean display. Public curriculum references use [QCAA Mathematics resources](https://www.qcaa.qld.edu.au/p-10/aciq/version-9/learning-areas/p-10-mathematics).

The shared IXL research log was retrieved by root before the delegated work: version 17, 43,357 bytes, historical Year 3 material. It does not certify this Year 4 code.

## Authored resources and preservation

The baseline had 24 Practice and 16 Test questions repeating two templates with generic reasoning-pathway diagrams. Those weak items and diagrams were replaced with **48 Practice and 16 Test** questions: 42/13 four-choice selection items and 6/3 adult-reviewed practical tasks. Each item has reviewed wording, audio text, unique choices and key where applicable, explanation, hint and accessible representation. Practical items require actual measuring/making/drawing evidence and accept mathematically valid alternatives.

The static Topic and current native Classroom structure, free/no-login resource links, metadata, current related-resource sections and exact optional video block were preserved. Native Classroom `example-board` and `example-card` wrappers remain, with a single-column model grid to preserve legibility. No shared layout or runtime architecture was rebuilt. Generic “explain using the model above” answer placeholders were replaced with actual worked answers. The worksheet now uses its dedicated `worksheet-questions.js` through the existing production generator (`18.3-year4-workspace`, root-maintained pagination guard), with matching visible questions and answer guides.

Exact retained Topic video-block SHA256: `731217d7ea23f3cae75b217826dff0a8921fbd824c60bb13474d0f51ff64578b`.

## Elaboration and assessment coverage

| Strand | Primary authored evidence |
| --- | --- |
| E1 — boundary sums, unit choice, irregular/curved string measurement | P001/P003/P005/P007–P021/P038/P044/P047; T001–T005/T015; complete boundary and string models; W001/W003 |
| E2 — create rectangles and efficient boundary addition | P009–P014/P043; T008/T014; 24-square-unit rectangle investigation and explicit drawings; W001/W002 |
| E3 — coverage, full/fractional tiles and comparisons | P002/P004/P006/P016–P017/P022–P028/P033–P038; T004/T006–T008/T010–T011; halves and quarter-parts models; W001/W004/W006/W007 |
| E4 — move one square repeatedly, including parts, with no gaps/overlaps | P029–P034/P045–P046; T009/T016; actual marked/numbered repeated placements on rectangles and triangles; W005/W006 |
| E5 — public Ranger mapped land-area/fire-planning context | P039–P041/P048; T012; specific ALFA/Mimal public context and invented area map; W008 |

Preserved useful teaching includes 4-by-6 rectangle area 24 square units/perimeter 20 units, all four area-24 rectangle arrangements and their boundary sums, string-versus-tile measurement, and the perimeter/area unit distinction. Replaced the imprecise rule that small partial squares could simply be omitted with explicit combined-part estimates and lower/upper coverage bounds. Neither circle/triangle formulas nor later-year formal square-unit conversions are introduced as core content.

## Author-observed primary source; independent artifact check pending

Before the external pause the author opened [ALFA (NT) Limited Annual Report 2020](https://www.alfant.com.au/images/files/ALFA-ANNUAL-REPORT-2020_email.pdf), printed pages 58–59, PDF page index 29, section “Mimal Rangers – A new tool to manage wildfire”. Public extraction returned the relevant text at lines 1350–1379. The PDF was not downloaded locally before the pause.

Exact short excerpt (23 words):

> one way for Mimal to better understand this is to map patches of unburnt land and assess the wildfire risk of each patch.

The author-observed text also describes GIS and mapped information, including prior fires and vegetation, alongside local Indigenous knowledge. This supports the narrow context that mapped land patches contribute to wildfire planning. It does not establish a classroom rule for choosing a burn. The original PDF itself remains an independent primary-artifact recheck gate under root coordination; this author observation record must not be relabelled independent source evidence.

The lesson uses an invented equal-square area map with no real site data, cultural account, burn procedure or permission to act on Country/Place. No report photos/maps are reproduced. Classroom's source link goes to the same-code Topic elaboration/source context, avoiding a public PDF link in Classroom.

## IXL/Khan investigation limits

The author investigated primary IXL perimeter/measurement candidates and Khan unit-square/partial-unit-square and perimeter lessons. Opening `https://au.ixl.com/maths/year-4/perimeter` did not produce inspectable content; the Khan partial-unit-square URL returned a disabled fetch and its perimeter-video page returned zero text lines. Catalogue/search titles only identify candidates. Independent reviewer reports of IXL rectangle-perimeter navigation and Khan zero-line output agree with this limitation. No help panel, video, representative questions or observed progression is claimed. **HOLD retained.**

## Author and independent correction loop

- Author rendered and inspected all 17 bank symbols, plus two additional homework symbols: **19 distinct final SVGs**, each 640×300. Initial spacing fixes separated straight-string scale labels, clarified the repeated-unit arrow/callout and revealed overlapping tile outlines; every corrected diagram was re-rendered and inspected.
- Independent reviewer solved all 64 questions and inspected all bank visuals; numerical keys passed.
- Replaced coordinate-tuple alt with accessible descriptions of rows, columns, diagonal coverage and boundary features.
- P021 now uses an informal stick-length unit without naming it a metre; P047 specifies a strip longer than 1 cm so the requested count comparison is meaningful.
- P043/T014 require different side-length pairs; P046 explicitly requests full-square and combined-part counts; P048 accepts equal areas as well as unequal comparisons.
- T011 uses 24 small squares/6 large squares, a consistent 2-by-2 area-unit enlargement; T015 permits matching repeated measurements and asks for possible variation or agreement.
- Land model specifies 3 columns by 4 rows. Resource copy describes the actual native Classroom View. Official curriculum links use the verified public QCAA HTML page.

## Local verification and artifact identity

The final existing production-bank validator passes for each code with four choices on every selection item, Practice key positions 11/11/10/10 and Test positions 4/3/3/3. Exactly 55 additional distractors per code were individually authored after the root detected that the original three-choice pattern did not meet the Year 4 schema. Correct answers and practical tasks were preserved; the independent reviewer has substantively checked every added choice and final four-choice set, confirming one valid key remains. No question, audio prompt, feedback, visual or practical task changed in that schema correction.

Narrow structural consistency checks confirmed 48 Practice +16 Test, unique IDs/choice texts and correct-key agreement, matching question/audio text, valid external-symbol references, eight dedicated worksheet records with synchronized visible questions and answer guides, required exact E-numbered labels, no generic answer placeholders, preserved Topic metadata and byte-identical video blocks. These checks supplement substantive review; they are not content approval. The root exported the actual production PDF, and the independent reviewer inspected every final page. Every shuffled question matches its answer guide; visual prompts, diagrams and four writing lines remain together, and models/glyphs are readable.

Author-rendered PNGs and montages are in `/workspace/scratch/b2c91567ebe4/measurement-qa/`; bank symbols use `m01-*` or `m02-*` and homework-only symbols use `m01-w-*` / `m02-w-*`. Every final distinct diagram was viewed, including all six homework-only diagrams.

| Current artifact | SHA256 |
| --- | --- |
| `assets/assessment-banks/year4/math/ac9m4m02.json` | `be54929ca950294e70655feb92cd9e7953afbee1f5f9ee66db09ea71be711516` |
| `assets/assessment-visuals/year4/math/ac9m4m02.svg` | `56e54f911906709e3e0e850af8a1b4a37d32d87b66412f9b65fb5ddd9f8283d6` |
| `year4/maths/ac9m4m02-ways-of-measuring-and-approximating-the-perimeter-and-area-of/index.html` | `179a9c2003851d73b0e35dea64b350e196e18181c1d5824abe1a84067323480b` |
| `year4/maths/ac9m4m02-ways-of-measuring-and-approximating-the-perimeter-and-area-of/teacher-slides/index.html` | `1061bbd2f403c33f6a31ea60257b564edbdec517a576a687a25d5003cc195b78` |
| `quiz/year-4/math/ac9m4m02/worksheet/index.html` | `f86d516b0feb9065b28bb3e70686af9b1131c98a2c90b4425ba02ef90546eb1f` |
| `quiz/year-4/math/ac9m4m02/worksheet/worksheet-questions.js` | `14475a5e9c2b58cfc55a9f56a1a36a87547092fb7017a6685bfe307d3939572f` |

## Exact production PDF reviewed

- Root export: `/workspace/scratch/b2c91567ebe4/qa-pdfs/ac9m4m02-homework.pdf`
- SHA256: `c2351cc65d79178bc66e4f05e482d103726daf19f45b9369cd68f9f310b24acd`
- Independent page review: **all 6 pages PASS**; no content correction remains.
- This local PDF/resource result does not close the recorded IXL/Khan source HOLD or pending independent ALFA primary-artifact check.
