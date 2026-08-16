# Skillr Repository Instructions

## Curriculum topic guides and teacher slides

Before creating, rebuilding or reviewing any curriculum topic guide or teacher slide, read and follow:

- `docs/skillr-long-life-curriculum-content-standard.md`

The **Topic Guide + Teacher Slide standard (v1.1)** is mandatory for all new and rebuilt curriculum codes.

Non-negotiable rules:

- Treat every curriculum code as a unique teaching concept.
- Reuse structure and visual components, never irrelevant generic lesson content.
- Conceptual correctness and clarity take priority over visual polish.
- Visual finish may be approximately 7/10 when it is clean, accurate, readable and useful.
- Incorrect, ambiguous, overlapping, clipped or conceptually mismatched visuals fail.
- Every elaboration must be explicitly and visually taught.
- The topic guide and teacher slide must use the same concept, examples, terminology and visual models.
- Prefer one shared code-specific lesson source that renders both resources.
- A code is not complete until it passes the release gates in the standard.

- Every canonical specification must define Must teach, Prerequisites, May support informally and Must not overteach.
- Every slide must store Teacher does, Teacher says/asks, Student does, What to look for and What to do if incorrect.
- Use 20–30 second formative checkpoints after appropriate major conceptual steps.
- Include concise Support, Core and Extend adaptations within the concept boundary.
- Every checkpoint and mastery item requires an expected answer, acceptable evidence, likely error and remediation.
- Prefer validated parameterised illustrations that can be reused safely across pages, slides, activities and questions.
- Read `docs/canonical-lesson-specification-v1.1.md` before authoring a code.
- This format is locked for every Skillr teacher slide in every year and subject: teacher slides are live 16:9 presentation resources for direct display from a laptop or tablet to a classroom screen. Show exactly one slide at a time. Place Previous, Next and a dynamic `current / total` indicator such as `1 / 12` in the page toolbar above the slide, never inside the teaching canvas. Fit the complete 16:9 slide within the available device viewport without distortion, horizontal overflow or unnecessary blank page space below it. Download, print and save-as-PDF features must be blocked; every slide must carry a repeated SkillrHub watermark and a footer containing its curriculum code. A teacher slide must not be released if any part of this format is missing.
- Do not run Playwright tests as a routine, pre-commit or release requirement. Use focused source validators, DOM assertions and human review for teacher-slide release gates. Run Playwright only when the user explicitly requests it.



## Locked architecture change control

The Topic Guide + Teacher Slide v1.1 structure is frozen.

The v1.1 pipeline is: Curriculum code → canonical lesson specification → approved parameterised models → topic guide / teacher slides / activities / questions. Nothing downstream may invent the concept again.

- Continue using the locked structure even when producing hundreds of codes; vary the concept-specific content, illustrations and teaching progression, not the architecture.
- Cosmetic, responsive, accessibility, overlap and correctness fixes are allowed.
- If a request would structurally change the topic guide or teacher-slide system, stop before editing, identify the conflict and recommend retaining the approved structure.
- Do not implement a structural change in that turn.
- A structural change may proceed only after a later, separate user confirmation containing the exact words: `Unlock Topic Guide + Teacher Slide v1.1`.
- A content or slide update is not complete unless the topic guide and teacher slide remain aligned from the same code-specific lesson specification.
