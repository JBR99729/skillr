# SkillrHub tutor app — requirements and pilot handoff

Recorded: 10 October 2026 (Australia/Sydney).
Owner: Bhasker. Initial tutor prospect: Mohan.
Scope: product requirements captured from the conversation, not a claim that features are implemented.

## Existing prototype
Standalone file: SkillrHub_Year1_Maths_Pilot.html in this directory.
Code: AC9M1N04, Year 1 Maths. Four practice strands plus quick check.
Current prototype has 15 questions per practice strand and 16 quick-check questions (76 total).
It uses HTML and vanilla JavaScript, automatic marking, review/retries, grey completed questions/strands, browser-local progress, active timers and a printable journey.
No tutor/student authentication, server-side progress, tutor dashboard, email sending or access administration is implemented yet.
Preserve this working prototype as the starting point. New authoring standard below is 10 practice questions per strand; do not silently rewrite the existing prototype.

## Product and catalogue
- Supplementary practice app accompanying the existing print-and-go resources, but usable without buying the PDFs.
- Foundation and Year 1 first, across Maths, Science and English; expand through Year 2 and Year 3, with eventual wider grade/international expansion.
- Much Foundation/Year 1 research and worksheet content already exists. Inspect and reuse relevant material before undertaking new research.
- Aim for at least 3,000 unique questions across the three subjects per grade. Retries do not count as additional unique questions.
- Preserve the existing strand structure within each curriculum code.
- Target 2–3 codes per working day after the shared platform is established.
- F–3 in roughly one month is an aspiration, not a verified delivery commitment. Count remaining codes, assess source readiness and measure initial conversion/QA throughput.
- Initial implementation scope: one or two codes, one tutor and a small number of test student accounts.
- Keep SkillrHub's consistent teal/navy theme, compact editor-style layout and simple HTML/vanilla JS practice interface.

## Account and administration model
- Owner creates BOTH tutor and student accounts; no public self-registration or tutor-created student accounts needed for the initial version.
- Owner links student accounts to the appropriate tutor.
- Owner provides account/access details to the tutor, who passes student details to families/students.
- Student logs in with a unique user ID and password. Student email is not required for login.
- Tutor sees only assigned students; student sees only their own learning data.
- Owner manages activation, expiry, renewals, disabling accounts, password resets and tutor reassignment.
- Student progress belongs to the student account and should survive tutor reassignment.
- Initial number of student accounts is managed by the owner, with no self-service licence checkout.
- No payment integration: collect payments separately and manage access manually.
- Proposed secure onboarding: one-time activation code to choose a password rather than distributing a permanent shared/default password. Implementation choice to confirm during build.
- Add a secure backend/authentication service and database for cross-session account-linked progress. Technology/vendor not selected by this discussion.

## Teaching and learning workflow
- Tutor may teach three one-hour sessions per student per week.
- Proposed one-hour session: 12 Maths + 12 Science + 12 English questions (36 total), with time for teaching and review.
- Treat 36 as a session target, not forced completion; reading demands, explanations and retries affect pace. Preserve unfinished work.
- Tutor can present teaching slides using Zoom screen sharing and solve questions together with students.
- Slides available through tutor account in a fixed full-screen viewer; PPT is the teaching source, not a requirement to expose downloadable PPT files.
- Students then complete individual app practice.
- Proposed reporting distinction: tutor-guided versus independent activity. Do not infer independent mastery from eventual correct answers.

## Question flow and progress
- One question at a time with automatically marked inputs; no adult marking, drawing or handwritten responses required in the digital activity.
- Correct answers grey out and move to the next question.
- Incorrect practice answers show review/explanation; retain the incorrect attempt and allow retries until correct. Keep current tested retry-before-advance behaviour unless owner changes it.
- Strand becomes grey/complete after every question is eventually correct.
- Preserve first answers, incorrect attempts, later corrections, new runs, dates and completion status.
- Track individual strand active time and total code active time, including quick check and retries.
- Unfinished work shows time so far; completed work shows completion date/time and cumulative active time.
- Pause time for hidden/unfocused pages; exclude prolonged idle time as in the prototype.
- Distinguish unique question coverage, first-attempt accuracy and completion after retries.
- Tutor dashboard: assigned students, progress by code/strand, results, retries, time and printable individual journeys.

## Reports and parent communication
- Printable journey must be compact: one line per strand with results, retries, completion status/date and time, plus total code time.
- Preserve detailed answer history separately and provide export.
- Reports support homeschool learning evidence; do not claim jurisdiction approval, full curriculum coverage or verified independent mastery.
- Desired later feature: email progress to the parent after a session.
- Proposed control: tutor finishes session, previews report, adds optional comments and confirms sending.
- Email summary: subjects/skills, first-attempt accuracy, retries, completion, active time, tutor comments and suggested next steps.
- Parent address supplied with permission; record send status and prevent duplicate sends.
- Direct email is not a dependency for the first one/two-code QA pilot; printable reports first.

## Content authoring and QA
- Per strand: one worked example plus 10 original practice questions with sensible progression.
- Separate test: fresh, similar, slightly harder questions assessing the same taught skills within the grade boundary.
- Exact test question count is not newly decided here; preserve established code-specific requirements until confirmed.
- Research references: IXL primary teaching/assessment benchmark, Khan supplementary, and suitable additional free resources to fill gaps. Australian Curriculum controls official scope.
- Use inspected saved research; do not describe uninspected skills as researched.
- Create original wording/examples/questions. Free access does not imply permission to reproduce proprietary question sets.
- Owner explicitly requested authoring followed by independent QA with a different model.
- Reviewer independently solves/checks questions, answer keys, worked examples, ambiguity, distractors, curriculum alignment and progression.
- Fix flagged issues and recheck corrected content; test actual automatic marking.
- Proposed test behaviour: withhold answers until submission and preserve first-attempt results separately from retries.
- Tutor/student feedback refines content; add a question-specific Report a problem action as a proposed feedback mechanism.
- Do not claim 99% accuracy without measured evidence; feedback supplements pre-release checks.

## Environments and release
- Establish separate QA and production environments before real tutor/student account rollout.
- Separate databases, accounts and configuration; do not copy test students or test activity into production.
- Flow: build/adapt → independent content review → functional/security checks in QA → production release.
- Verify permissions isolate tutors and students, progress saving works and reports/timers are correct.
- Protect real student progress through schema/content updates; retain stable question IDs and plan question version handling.
- Keep a recoverable prior release and appropriate data backup/migration safeguards.
- The dedicated pilot branch is storage/development only. This requirements save does not authorise merging or deploying the app to the live site.

## Latest commercial offer — replaces earlier alternatives
Currency assumed AUD; tax treatment and final customer terms not yet decided.
- Tutor account: $50 per tutor per year, INCLUDING dashboard/report access and available teaching slides for Maths, Science and English.
- This REPLACES the earlier $20 tutor annual/setup fee and the separate $2/month/subject slide add-on.
- Student paid pilot: $5 PER ACTIVE STUDENT PER MONTH for the first six paid months, including the three subjects.
- No minimum student count. Tutor annual fee still applies during the paid phase even with zero students; student charges apply only to enabled accounts.
- Owner manually manages billing/access. Suggested deactivation rule: stop the next month's student charge; precise billing terms to finalise.
- Printables, worksheets, printable tests and activities are charged separately, e.g. through TPT.
- App should provide standalone value; do not imply printables are included.
- Earlier $5/subject/month and $100/student/year ideas are NOT the current agreed pilot offer.
- Student pricing after the six-month paid pilot is not settled; disclose it before enrolling paying users.

## Free testing programme
- Up to 50 free student accounts while building the agreed Foundation AND Year 1 catalogue across Maths, Science and English.
- Do not confuse this with six months of paid access or free access until the eventual F–12 catalogue is finished.
- Tutor fee also waived during this free testing phase (proposed approach discussed).
- Start operational testing with 5–10 students, address issues, then expand toward 50.
- Clearly show available codes and planned additions; do not sell planned features as already delivered.
- Ask participating tutors for practical feedback on questions, independent usability, progress/report usefulness and session fit.
- Proposed transition: give 30 days' notice after the agreed catalogue is complete and tested; paid continuation is optional, with no automatic charge.
- Confirm the precise catalogue checklist and free-to-paid terms with Mohan before recruitment.

## Next implementation session
1. Inspect existing app infrastructure and select a minimal secure auth/database approach.
2. Establish QA/production separation.
3. Implement owner-created tutor/student accounts, assignment and access controls.
4. Connect existing one-code practice flow to durable per-student progress.
5. Add minimal tutor progress dashboard and printable reports.
6. Verify with synthetic test accounts before inviting real students.
7. Add second code, then continue catalogue conversion and independent QA.
