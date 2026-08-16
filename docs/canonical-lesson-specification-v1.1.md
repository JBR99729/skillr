# Canonical Lesson Specification v1.1

This contract is required for every new or rebuilt Skillr curriculum code.

## Authority and pipeline

```text
Curriculum code
  → Canonical lesson specification
  → Approved parameterised models
  → Topic guide / Teacher slides / Activities / Questions
```

The canonical specification is the single pedagogical source of truth. Downstream resources may select, condense and lay out approved content; they must not invent, reinterpret or extend the concept independently.

## Required top-level fields

| Field | Purpose |
| --- | --- |
| `schemaVersion` | Must be `1.1` |
| `code`, `year`, `subject` | Curriculum identity |
| `title`, `subtitle` | Student-friendly naming |
| `contentDescription` | Exact authoritative curriculum description |
| `lessonTime` | Honest approximate teaching time |
| `learningIntention` | What students are learning |
| `successCriteria` | Observable evidence, not vague participation |
| `materials` | Minimal usable materials |
| `conceptBoundary` | Must teach / prerequisites / may support / must not overteach |
| `teachingProgression` | Concept-appropriate sequence |
| `models` | Approved parameterised illustrations |
| `elaborations` | Complete visual teaching map |
| `workedExamples` | Modelled teaching examples |
| `misconceptions` | Cause, evidence and rapid remediation |
| `warmUp` | Immediate activity, game or investigation |
| `differentiation` | Support / Core / Extend |
| `slides` | Classroom sequence with teacher-action layers |
| `masteryItems` | Questions plus answers, evidence and remediation |
| `references` | Authoritative and cultural sources where required |
| `resourceLinks` | Topic guide, slide, worksheet, Practice and Test |
| `review` | Concept, elaboration, parity and visual QA status |

## Concept boundary

```js
conceptBoundary: {
  mustTeach: [],
  prerequisites: [],
  maySupportInformally: [],
  mustNotOverteach: []
}
```

- `mustTeach` contains the exact conceptual target.
- `prerequisites` states assumed knowledge and skills.
- `maySupportInformally` allows useful representations that are not the formal target.
- `mustNotOverteach` blocks later-year formality, algorithms, language or generalisation.

The boundary must be reviewed before models, examples or slides are approved.

## Teaching progression

```js
teachingProgression: {
  name: "Concrete → Pictorial → Abstract",
  reason: "Why this progression fits this concept and year level",
  steps: [
    {
      id: "concrete",
      purpose: "",
      teacherAction: "",
      studentAction: "",
      modelIds: []
    }
  ]
}
```

The progression is selected for the concept. It is not automatically CRA.

## Approved parameterised models

```js
models: [
  {
    id: "model-id",
    component: "tenFrame",
    purpose: "What relationship this model teaches",
    parameters: { quantity: 14, frames: 2 },
    validRanges: { quantity: [0, 20], frames: [1, 2] },
    colourSemantics: {
      blue: "starting or grouped quantity",
      amber: "quantity currently examined"
    },
    accessibleDescription: "",
    usedBy: ["topic", "slide-3", "checkpoint-2"],
    reviewed: {
      conceptAccurate: true,
      labelsClear: true,
      noOverlap: true
    }
  }
]
```

Rules:

- Prefer a validated component with parameters over a fixed SVG.
- A component must reject or flag invalid parameters.
- Every colour meaning must also have a label or shape cue.
- Fixed illustrations are permitted for genuinely unique situations.
- `usedBy` supports parity and reuse checks.

## Elaborations

Every listed elaboration is required.

```js
elaborations: [
  {
    id: "E1",
    curriculumWording: "",
    plainLanguageConcept: "",
    teachingPurpose: "",
    modelIds: [],
    teacherDoes: "",
    teacherSaysOrAsks: "",
    studentDoes: "",
    whatToLookFor: "",
    ifIncorrect: "",
    checkpointIds: [],
    masteryEvidence: ""
  }
]
```

A curriculum list without this teaching map does not count as coverage.

## Teacher-slide specification

```js
slides: [
  {
    id: "slide-1",
    title: "",
    purpose: "One main teaching purpose",
    display: {
      modelIds: [],
      studentPrompt: "",
      keyText: []
    },
    teacherLayer: {
      teacherDoes: "",
      teacherSaysOrAsks: "",
      studentDoes: "",
      whatToLookFor: "",
      ifIncorrect: ""
    },
    checkpointIds: [],
    differentiationRefs: ["support", "core", "extend"],
    elaborationIds: []
  }
]
```

The teacher-action layer may be hidden from the projector view but must remain immediately available to the teacher.

## Formative checkpoints and mastery items

```js
masteryItems: [
  {
    id: "checkpoint-1",
    type: "formative",
    after: "slide-3",
    prompt: "",
    expectedAnswer: "",
    acceptableRepresentations: [],
    evidenceOfMastery: "",
    likelyMisconception: "",
    remediation: "",
    decision: {
      continueWhen: "",
      reteachWhen: ""
    }
  }
]
```

Every checkpoint or mastery item requires all of these fields. A prompt alone is incomplete.

Formative checkpoints should usually take 20–30 seconds and follow major conceptual models rather than only appearing at the end.

## Differentiation

```js
differentiation: {
  support: {
    adaptation: "",
    modelIds: [],
    boundaryCheck: ""
  },
  core: {
    adaptation: "",
    modelIds: [],
    boundaryCheck: ""
  },
  extend: {
    adaptation: "",
    modelIds: [],
    boundaryCheck: ""
  }
}
```

- Support reduces range, steps or representational load without changing the target concept.
- Core teaches the intended outcome.
- Extend deepens reasoning or representation without crossing `mustNotOverteach`.

## Output rules

### Topic guide

The renderer uses the complete specification: learning information, progression, central models, every elaboration, worked examples, misconceptions, warm-up, differentiation, mastery evidence, slide preview, references and resource links.

### Teacher slides

The renderer selects the slide sequence from the same specification. It may shorten language for projection but must retain the approved purpose, models, example values, terminology and colour meanings.

The live renderer must show exactly one 16:9 slide at a time, with visible Previous and Next controls, Left Arrow and Right Arrow keyboard navigation, and a dynamic `current / total` indicator derived from the rendered sequence. Every slide must include a repeated low-contrast SkillrHub watermark and a curriculum-code footer. Download, print and save-as-PDF pathways must be blocked in normal, embedded and full-screen modes.

This renderer contract is locked and mandatory for every teacher slide across all years, subjects and curriculum codes. Failure of any delivery requirement blocks release.

### Activities and questions

Activities, worksheets and future questions may use only approved concepts and models from the specification. They must not introduce new formality or a contradictory representation.

## Required validation

### Automatic

- required fields present;
- every elaboration mapped;
- every slide has all five teacher-action fields;
- every checkpoint has expected answer, acceptable evidence, misconception and remediation;
- all model IDs resolve;
- parameters fall within valid ranges;
- topic-guide/slide examples and terminology match;
- one slide visible at a time with a correct dynamic `current / total` indicator;
- Previous, Next, Left Arrow and Right Arrow navigation reaches every slide;
- 16:9 framing, repeated watermark and curriculum-code footer appear on every slide;
- download, print and save-as-PDF controls and shortcuts are blocked;
- balanced HTML/SVG, unique IDs and accessible descriptions;
- no overflow, clipping or label collision at target sizes.

### Human

- concept and year-level boundary are correct;
- teaching progression suits the concept;
- models teach the intended relationship cleanly;
- elaborations are genuinely explained;
- differentiation remains inside the boundary;
- expected answers and remediation are pedagogically sound.

## Completion state

A code is complete only when:

1. its canonical specification is approved;
2. its topic guide is rendered and reviewed;
3. its teacher-slide sequence is rendered and reviewed;
4. parity checks pass;
5. conceptual and visual QA pass.

Generating files alone is not completion.
