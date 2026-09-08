# AC9E4LA06 independent production PDF and staging review

Date: 9 September 2026 Sydney. Reviewer: LA05 author, separately reviewing LA06. **PASS for the two production PDFs, all64 staged-bank parity and nine wrappers’ visible wording.** This is not a live deployment or browser-download confirmation.

## Actual production PDFs

Read the production result manifest, rendered both actual PDFs with Poppler at 1500-pixel scale, and individually opened every PNG: export1 pages1–5 and export2 pages1–5, all10 pages. No contact-sheet shortcut or text-only visual approval.

| Export | Pages inspected | Finding |
| --- | --- | --- |
| 1 | 1: Q1–2; 2: Q3–5; 3: Q6–8; 4: answers1–5; 5: answers6–8 | PASS |
| 2 | 1: Q1–2; 2: Q3–5; 3: Q6–8; 4: answers1–5; 5: answers6–8 | PASS |

Every export contains all eight authored tasks once with matching shuffled answer order. Prompts remain with four response lines; no line, heading or answer is clipped, overlapped or hidden by a footer. Text is legible; page numbers, SkillrHub branding and code agree. Answer guides preserve complete models and task-specific adult guidance. The corrected only-if task appears as Q6 in export1 and Q4 in export2 and retains the exact necessary-condition model and acceptance guidance. The three-sentence/relative/time/contrast tasks retain all requested composition and explanation requirements.

- `1-complex-sentences-independent-and-dependent-clauses-worksheet.pdf` —5 pages, SHA256 `9e89d7e0d960076a3896e0a012d9facbb79cb34d6bfa269467ff92368b3b3e86`
- `2-complex-sentences-independent-and-dependent-clauses-worksheet.pdf` —5 pages, SHA256 `7d223bac50bf2d6d8ebfec5e2eb3f7c91d4fccc7227bac9dc27c5d29bae61eae`

### Production input identities

- `quiz/year-4/english/ac9e4la06/worksheet/index.html`: `a8613dea7760f0a841b59c0b1d23613409a1b73de931b44dad8411a4dc92fe46`; current match: True
- `quiz/year-4/english/ac9e4la06/worksheet/worksheet-questions.js`: `710217cafa6e952517492594da617578ec8398d699037b1ca3db1598d025d636`; current match: True
- `quiz/assets/worksheet-pdf.js`: `e49d7b681c2024bedaf23256d6b8e82be900f579846f1057f17b18ee2c3051f4`; current match: True

## Staged bank and wrapper inspection

Independently compared all64 staged records to the corrected canonical bank by ID, code, prompt, audio prompt, every answer, key, structured explanation, visual metadata and every adult model/acceptance/instruction/completion field. Practice 48 and Test16 match exactly; Practice mirror bytes also match. No worksheet task is drawn from those banks.

Read the complete visible text of all nine activity wrappers: hub; Practice attempt, review, result and retake; Test attempt, review, result and retake. The four Practice surfaces use the exact approved shelter/green-roof model. Test uses neutral complete-sentence and genuine-work reminders without exposing Test model answers. Counts correctly distinguish the full48/16 bank from five-question shuffled attempts. Attempt pages explain that saving work does not award credit and an adult checks actual work in Review answers. Resource labels remain on the same code.

### Reviewed staged and wrapper hashes

- `quiz/year-4/english/ac9e4la06/index.html`: `fdc4f63a710c350f09069f6bd29a77de7854aa0bf1b08549160a77077944b0f4`
- `quiz/year-4/english/ac9e4la06/practice/index.html`: `fb8352d385022e0128586981a912809aaa8c1c4f0d2ac804f7fdc4546620c1ef`
- `quiz/year-4/english/ac9e4la06/practice/review/index.html`: `4bc3a0a29127487dfd1c5a5dc0d3834e61d7220f6f99dd7424afcf57cb29c738`
- `quiz/year-4/english/ac9e4la06/practice/result/index.html`: `36bf44af51054f5cf428fb6af3e8b4abe4d0376bb208a82daf15782644164ff3`
- `quiz/year-4/english/ac9e4la06/practice/retake/index.html`: `435446db5011d2ae3454bb0061a4a1fd3b942f64a187a2d8c0786c7bec263199`
- `quiz/year-4/english/ac9e4la06/test/index.html`: `ebbad5161c8ce84d2644e5995357447261a983a8e23f99df0ecdfb9dc6d50f49`
- `quiz/year-4/english/ac9e4la06/test/review/index.html`: `5482a84b9e03c459643b34657b9f9b24dcf24ffc120bf78bf91f605b89c59f57`
- `quiz/year-4/english/ac9e4la06/test/result/index.html`: `57ea7781deb2d8d4a25c69fcfb61e9c14ad6a75f30dbb9420260fba6d5855f98`
- `quiz/year-4/english/ac9e4la06/test/retake/index.html`: `1e33a45a7a13bac79675b02e90aa8fa166219d96d8b755b5d50ca914fdbe9516`
- `quiz/year-4/english/ac9e4la06/practice/questions.js`: `016a80f6d0ce9247d330f09d801434f22d6248bc82dc9a527a1dbe83a0a85848`
- `quiz/year-4/english/ac9e4la06/practice/practice-questions.js`: `016a80f6d0ce9247d330f09d801434f22d6248bc82dc9a527a1dbe83a0a85848`
- `quiz/year-4/english/ac9e4la06/test/questions.js`: `b22b408c1f077909d20bcb4590479e3822e377eaaa5109a71eaf6fdf7911d375`

## Runtime evidence limitation

Read `AC9E4LA06-ASSESSMENT-RUNTIME.json`:55 cases passed, zero failed, using actual shared scripts in a simulated linkedom DOM (not live browser/network/PWA verification). Compared all18 recorded artifact identities: `quiz/assets/script.js` had advanced since that report; the other17 still match. Root was notified to rerun/refresh the assessment gate for the changed script before release. This PDF/staging approval does not claim that stale runtime hash is current. Live resource checks, complete-tree integrity, CI/Pages and publication remain root gates.
