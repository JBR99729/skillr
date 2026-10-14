# SkillrHub QA Reference Standard

Effective: 14 October 2026. Owner-approved standard for QA after building each skill (curriculum code) and before the nightly production build.

Use only the applicable checklist below. This replaces older, broader QA procedures for these two stages.

## A. After Building Each Skill (Code)

### Software QA

- [ ] Skill loads + correct title/code shown
- [ ] All questions appear (no missing/duplicates)
- [ ] Progress saves & reloads
- [ ] Correct / Incorrect marking works
- [ ] Feedback/explanation shows
- [ ] Next / Finish / Restart buttons work
- [ ] Touch targets large enough
- [ ] Images/shapes/counters render correctly
- [ ] Works on mobile + tablet + desktop
- [ ] No console errors

### Teacher QA

- [ ] Questions match the curriculum code
- [ ] All answers mathematically correct
- [ ] Explanations accurate & child-friendly
- [ ] No ambiguous questions
- [ ] Language age-appropriate
- [ ] Feedback helpful (not just Correct/Incorrect)
- [ ] Consistent with other skills

## B. Before Nightly Production Build

### Critical Path

- [ ] All changed skills load without error
- [ ] Login + session persists after refresh
- [ ] Progress saves to Supabase and reloads correctly
- [ ] Progress belongs to the correct student profile + skill code, under the authorised account
- [ ] Correct/Incorrect marking works
- [ ] No console errors (especially 401/403 from Supabase)
- [ ] No broken images

### Stack Checks

- [ ] Cloudflare deployment succeeded
- [ ] Production site shows the latest version (hard refresh)
- [ ] Supabase env variables are correct in Cloudflare
- [ ] New progress appears in Supabase table

### Final Content

- [ ] Correct curriculum codes
- [ ] No wrong answers / placeholders
- [ ] One old skill still works

**Rule: Any Critical Path failure → Do not submit the nightly build.**

The per-code checklist covers educational quality. The nightly checklist adds authentication, progress persistence and deployment verification for the Supabase + Cloudflare stack. Verify deployment success and the latest production version after deployment, before declaring the nightly release complete.

## C. Additional Checks — Only When Applicable

These checks are part of this standard at the timings below. Do not repeat the full set for every code or every nightly build.

### Before Launch; Repeat After Auth, Database or Permission Changes

- [ ] With a second unrelated account, verify that another family's progress cannot be read or modified through the app's data API (RLS/permissions enforce this, not just hidden UI).
- [ ] Student, parent and tutor views show the correct data; parents/tutors can access only students they are authorised to access, and their progress is accurate.

### Before Launch; Repeat After Saving or Network Changes

- [ ] A network failure or Supabase error shows a clear message and retry option; the app does not hang.
- [ ] A failed save never displays "saved"; retrying saves progress to the correct student profile and skill.

### When Shared UI or Images Change

- [ ] Keyboard access, readable contrast and tablet usability work for the affected flow.
- [ ] Check loading performance for an affected skill with the largest image/question load, using a stated device and network condition (including slow school Wi-Fi or a defined throttled profile). Do not claim a universal 3–4 second pass without a defined test condition.

### Automated Build Check

- [ ] Check shipped files and production logging for leaked secret/service-role keys, access tokens or personal data. Exercise relevant flows to check runtime logs.

Supabase publishable keys and legacy `anon` keys are intended for browser use; their presence alone is not a security failure. Secret and `service_role` keys must never be exposed in public clients. RLS and permissions must enforce access to user data. Reference: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys).

This checklist defines required checks; it does not assert that automated scanning or any other check has already been implemented or passed.

## Scope and stopping rule

- After each code, run Section A scoped to that code.
- Before the nightly production build, run Section B; complete its deployment verification after deployment.
- Run Section C only at its stated timings; use the automated build check for builds.
- Once the applicable checks pass, stop QA.
- Fix and retest failed checks; repeat related checks only where the fix could affect them.
- Do not add extra QA rounds or broader audits unless the owner requests them.
