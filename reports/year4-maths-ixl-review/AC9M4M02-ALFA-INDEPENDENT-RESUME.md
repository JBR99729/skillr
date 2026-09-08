# AC9M4M02 independent ALFA primary-source resume review

Final status: **ALFA primary source and corrected citation PASS**. Other source/browser/release gates remain outside this approval. The initial correction request below is retained as review history and closed by the final recheck.

Reviewer: `/root/independent_m02_source`, separate from the original author and original reviewer. Inspected 2026-09-08. Scope: the outstanding ALFA primary-artifact gate only; no content authorship, publication or ledger update.

## Evidence and method

Read `AGENTS.md`, the v2 architecture/content standards, M02 author report, source observation and independent review. Root retrieved the shared research log first; local log SHA256 `608d892aa97073932449f3e15f250940a15dff15ca36042eb514c1e03a4b109c`. Its historical evidence does not certify M02.

Independently opened [ALFA (NT) Limited Annual Report 2020](https://www.alfant.com.au/images/files/ALFA-ANNUAL-REPORT-2020_email.pdf), then downloaded that exact original PDF and rendered its 30th PDF page (zero index 29) with Poppler. Visually inspected the complete spread and read its text. The web screenshot request timed out; the subsequent original-file download and local render succeeded. This is direct primary-artifact inspection, not adoption of the author's excerpt.

Original PDF: 7,563,087 bytes; 37 PDF pages; SHA256 `ea9752188dc86a2315e6429b5f6dfb66bc906aaedb89181435ecfde62d0e1818`. Temporary review artifacts are `/workspace/scratch/b2c91567ebe4/research/m02-alfa-2020-independent.pdf` and `m02-alfa-2020-independent-p30.png` in the same directory. The PDF is evidence only and is not added to public website assets.

## Primary observation and citation defect

The Mimal wildfire-tool spread describes mapping unburned patches and assessing their wildfire risk. Staff and Rangers use GIS information, including past fire, vegetation and access, alongside local Indigenous knowledge. It supports the limited authored context that mapped land patches contribute to wildfire planning. It does not provide a classroom area-only burn-decision rule, nor does it say Rangers use the lesson's invented equal-square model.

**Correction required:** the actual rendered spread is printed **56–57**, not **58–59**. The full text is on printed page 56; page 57 is its accompanying photograph. Both footers are visible in the original PDF rendering and confirmed by local page-specific text extraction. The previous web extraction's footer adjacency led to an incorrect printed-page citation. PDF page index 29 was correct.

At inspection, both Topic and Classroom cite pages 58–59. Their locator must change to 56–57, with corresponding correction notes in source reports. Do not silently treat the historical erroneous locator as verified. This reviewer has not edited the authored resources and will independently recheck a separate editor's fix.

## Authored-claim comparison

| Authored resource/item | Independent finding |
| --- | --- |
| Topic and Classroom E5 public context | Factual paraphrase supported. Printed-page citation needs correction. |
| Topic/Classroom invented map and limitation | A = 12, B = 9, difference 3 equal area units is an explicitly invented comparison; no claim that this is actual Ranger data. |
| P039 and its audio/explanation | Correctly asks for area as land coverage and limits the public-source claim to mapping/planning. |
| P040/P041 and T012, all choices/feedback/alt text | Original grid comparison and model limitations are consistent; no unsupported cultural or real-site inference. |
| P048, model answer and adult rubric | Requires an invented map, explicit parts, common units and limits of the model; valid equality accepted. |
| W008 complete prompt and answer | Original fractional comparison correctly gives 12 square units for each patch. Source context is bounded; no actual burn direction. |

No substantive Ranger-context or mathematical correction identified. The citation-only correction remains required. Existing independent full-bank, diagram and PDF reviews retain their own scope; this source review does not repeat or replace them.

## Reviewed artifact identity before citation correction

All **22** entries in the original independent report's final SHA256 manifest matched local files exactly during this review. The directly compared source-context artifacts are:

| Artifact | SHA256 |
| --- | --- |
| `assets/assessment-banks/year4/math/ac9m4m02.json` | `be54929ca950294e70655feb92cd9e7953afbee1f5f9ee66db09ea71be711516` |
| `assets/assessment-visuals/year4/math/ac9m4m02.svg` | `56e54f911906709e3e0e850af8a1b4a37d32d87b66412f9b65fb5ddd9f8283d6` |
| `year4/maths/ac9m4m02-ways-of-measuring-and-approximating-the-perimeter-and-area-of/index.html` | `2515a556e758612cfc64f2d6a8cea20401f6b04538c46e596ff65aa818ffa069` |
| `year4/maths/ac9m4m02-ways-of-measuring-and-approximating-the-perimeter-and-area-of/teacher-slides/index.html` | `1061bbd2f403c33f6a31ea60257b564edbdec517a576a687a25d5003cc195b78` |
| `quiz/year-4/math/ac9m4m02/worksheet/worksheet-questions.js` | `14475a5e9c2b58cfc55a9f56a1a36a87547092fb7017a6685bfe307d3939572f` |

## Gate verdict

- Independent ALFA original-artifact access and factual-content comparison: **PASS**.
- Final authored citation: **CORRECTION REQUIRED**, pending separate editor and independent recheck.
- Actual IXL/Khan inspection, live browser, release checks and publication: outside this review; no approval implied.
- No reviewed-ledger or Year 4 badge change authorised by this report.

## Final separate-editor correction recheck: PASS

Root, not this reviewer, corrected exactly one visible `58–59` to `56–57` in each of Topic and Classroom. I independently checked the final bytes: replacing the single new locator with the old locator exactly reconstructs each previously reviewed SHA256 identity. No other authored HTML, diagram, answer, resource link or teaching content changed. Both citations now agree with the viewed original PDF.

Root also corrected the source-observation locator and appended a clearly labelled explanation superseding its historical ALFA-only HOLD; this preserves the distinction between the earlier author's observation and this independent primary-artifact check. I read that complete report diff and found it accurate. Historical source limitations in older reports remain historical, not current ALFA verdicts.

| Final artifact | SHA256 |
| --- | --- |
| `year4/maths/ac9m4m02-ways-of-measuring-and-approximating-the-perimeter-and-area-of/index.html` | `5c1741596c1bd4bf0d0da04eeeb074d2171fda94b3ea75a613f9a68e63a60a4e` |
| `year4/maths/ac9m4m02-ways-of-measuring-and-approximating-the-perimeter-and-area-of/teacher-slides/index.html` | `17f4381522b2286e441795d1692d12bfe6f6487dbecaf9d07e27775621f4fb20` |
| `reports/year4-maths-ixl-review/AC9M4M02-SOURCE-OBSERVATION.md` | `31a65e804476b1b76324756ce605f1dcc0e8728cd585c4441619d6fc47f9b274` |

The correction request is closed. **Independent ALFA factual-context/citation gate: PASS.** No substantive content correction remains from this source review. This narrow verdict does not close actual IXL/Khan, live-browser, release or ledger gates; overall publication approval remains with their assigned reviewers and root. This reviewer wrote only this report.
