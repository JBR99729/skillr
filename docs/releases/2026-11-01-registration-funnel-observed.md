# Registration funnel — observed production admin data

Observed 1 November 2026, approximately 01:59 UTC, using the existing signed-in production administrator UI. Read-only: no account, learner profile, answer, signup submission, email export or consent was created or changed.

| Last 30 days: guest sessions started in this window | Count |
| --- | ---: |
| Guest practice starts | 30 |
| Sessions answering at least one question | 7 |
| Answered questions | 81 |
| Registration prompts | 4 |
| Registration clicks | 2 |
| Signup forms accepted | 1 |
| New email-confirmed registrations | 0 |

The UI reports 0.0% confirmed registrations per guest session started. These are browser guest-session cohorts, not unique people, homepage visits or a marketing conversion rate. Existing-account sign-ins and test sessions are excluded according to the UI definition. The 30-day window and starting year determine cohort attribution; answers across skills stay in the cohort.

The largest observed numerical loss is before a first answer (23 of 30 sessions). Only one accepted signup and no confirmed registration does not establish an email-delivery defect; confirmation needs an authorized end-to-end test. Small counts do not support an estimated conversion lift from the new page.

Already published homepage improvements: Year 7 Maths resources tile, balanced eight-tile mobile grid and two direct free-account signup links with signup intent tracking. Separate signup presentation changes clarify password length, country/calendar use and email confirmation, and fix consent wrapping. Authentication/submission logic is unchanged.

Year 7 exact app mappings are prepared separately in draft PR 890 for all 30 topics (31 pages), preserving distinct Practice and Assessment intent. Do not release them until active/published matching production banks and authenticated destinations are verified. The public Year 7 guest route is unavailable. Production admin Alignment mapping search for AC9M7 also displayed no matches, but that view is not a full bank-availability proof. Connected database tooling currently exposes DEV only.
