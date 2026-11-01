# School-support registration offer — draft, 1 November 2026

Owner direction: position SkillrHub as supplementary practice alongside school; prioritise registration over unrelated navigation. Offer 20 guest questions and 500 total after registration, including the guest questions, shared across Maths, English and Science. Pricing will follow. No competitor-price comparison, guaranteed learning outcome or guaranteed 90% conversion claim.

## Prepared homepage

The main action is “Get 500 free questions”. The headline is “School starts the learning. Practice helps it grow.” The alternative opens a native, keyboard-accessible guest year picker. Search, topic guides, teacher access and supporting information remain available further down. Remove the prominent feedback/Messenger panel, install prompts, competing header links and the homepage advertising loader. Preserve analytics, existing subject/year links and SEO metadata.

## Release blocker

Do not merge the numerical offer into production until the allowance and app messaging match. The connected Supabase project is development (`svyvpdiacpwpdrpzpegb`); the source identifies production as `pkmdzbmygbqgdrzqiids`. Production database access was not available through the connected tool.

The inspected development `private.premium_state` counts `private.premium_usage_ledger` for the account and provides a 500-question preview only when that account is enrolled in the premium rollout. Guest conversion links guest sessions to the account; guest answers are not included by the inspected preview counter. After the preview, existing development logic permits 30 free questions per day. Do not silently activate paid restrictions or change that behaviour while pricing is undecided.

Before release: establish the intended post-preview access, include linked guest answers once without double counting, verify cross-subject totals and account isolation, test the 20th guest and 500th combined answer plus email-confirmed registration, and update the app's existing unlimited-practice wording. Production deployment is not completed by this draft.

## Verification

Homepage structure and inline JavaScript checks passed. Rendered desktop and 375px/768px iframe viewport layouts were inspected in the cloud browser; the guest link opens the year selector. This is responsive layout QA, not real-device or entitlement end-to-end QA. No question-bank content, saved learner history, access limits or prices were changed.
