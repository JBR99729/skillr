# Australian Curriculum Question Banks

This directory stages quality-reviewed curriculum question banks separately from
the live `quiz/` implementation.

## Scope

- Australian Curriculum v9 English, Mathematics and Science from Foundation to
  Year 10, based on `Australian_Curriculum_Question_Bank_Structure.txt`.
- Foundation Mathematics is excluded because those 12 banks were completed in a
  separate build.
- First Nations content references are excluded at the project owner's request.
- No file under `quiz/` is created, edited or deleted by this workflow.

## Current rollout per curriculum code

| Pass | Practice | Practice distribution | Exam | Purpose |
| --- | ---: | --- | ---: | --- |
| **1 — current** | **8** | 2 questions in each of Tiers 1–4 | **8** | Separate Practice and Test sets for every code |
| Expansion — future | 48 | Completes 14 questions per tier | 16 | Reaches the original 56+24 mastery target |
| **Long-term total** | **56** | **14 questions in each tier** | **24** | Original mastery-module target |

## Directory layout

```text
curriculum-question-banks/
  manifest.json
  coverage-summary.md
  authoring-standard.md
  banks/
    foundation/
      english/
      science/
    year-1/
      english/
      mathematics/
      science/
  qa/
  tools/
```

Each curriculum code has one Markdown file per pass. Markdown is the canonical
authoring format until a separate integration step is approved.

Three Foundation English banks were authored before the rollout was reduced.
Their additional questions remain as reviewed reserve content. Their
`launch_practice_ids` metadata selects 2 questions from each tier for the
8-question Pass 1 set; the other 16 Practice items remain in reserve.

## Completed Pass 1 levels

- Foundation English: 29 codes complete.
- Foundation Science: 9 codes complete.
- Year 1 Mathematics: 15 codes complete.
- Year 1 Science: 10 codes complete.
- Year 1 English: 30 codes complete.

Year 1 contributes 440 Practice questions and 440 separate Test questions. All
Year 1 banks include a worked 60-second Quick Read and early-years visual or
interaction guidance with tap/keyboard and printable alternatives.

## Worksheet-pool rule

The planned worksheet uses 10 distinct questions selected from both sources:

- 5 from the 8-question Practice set;
- 5 from the 8-question Test set;
- no duplicate question IDs within one worksheet.

This rule is metadata only in the staging bank. The live worksheet and quiz code
remain unchanged until integration is separately approved.
