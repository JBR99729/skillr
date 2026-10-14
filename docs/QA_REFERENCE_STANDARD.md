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

### Critical Path (Block if any fail)

- [ ] All changed skills load without error
- [ ] Login + dashboard work
- [ ] Progress saves correctly
- [ ] Correct/Incorrect marking works
- [ ] No console errors on main flows
- [ ] No broken images on today's skills

### Final Content Check

- [ ] Correct curriculum codes showing
- [ ] No wrong answers or mismatched explanations
- [ ] No placeholder / test text left
- [ ] One previously working skill still functions

### Build Hygiene

- [ ] Production environment variables set
- [ ] No test data visible
- [ ] Version/build number updated

**Rule: Any Critical Path failure → Do not submit the nightly build.**

## Scope and stopping rule

- After each code, run Section A scoped to that code.
- Before the nightly production build, run Section B.
- Once the applicable checks pass, stop QA.
- Fix and retest failed checks; repeat related checks only where the fix could affect them.
- Do not add extra QA rounds or broader audits unless the owner requests them.
