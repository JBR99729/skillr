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

## Scope and stopping rule

- After each code, run Section A scoped to that code.
- Before the nightly production build, run Section B.
- Once the applicable checks pass, stop QA.
- Fix and retest failed checks; repeat related checks only where the fix could affect them.
- Do not add extra QA rounds or broader audits unless the owner requests them.
