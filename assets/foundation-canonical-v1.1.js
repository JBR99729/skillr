(() => {
  "use strict";

  window.SkillrFoundationV11Active = true;

  const CURRICULUM = window.SkillrFoundationElaborationMap || {};
  const COLOURS = {
    navy: "outlines, labels and stable information",
    blue: "starting example or main model",
    amber: "the feature, word, quantity or evidence being examined",
    red: "a misconception, removal or item to reconsider",
    green: "a confirmed relationship, addition or supported conclusion"
  };

  const MATHS_EXPECTED = {
    AC9MFN01: ["8", "2, 5, 11, 16", "13 and 15", "10"],
    AC9MFN02: ["4", "The arrangement with 5 dots", "Yes. Both arrangements show 3.", "For example: I saw 3 and 2, so I knew there were 5."],
    AC9MFN03: ["7", "The collection of 8 has more than the collection of 6.", "Yes. There are still 7 because no object was added or removed.", "5 pencils"],
    AC9MFN04: ["2", "Any valid two-part partition of 6, such as 4 and 2.", "5", "Yes. Both combinations have a whole of 6."],
    AC9MFN05: ["5", "5", "Joining", "A valid model showing 5 objects, 2 joining and a result of 7."],
    AC9MFN06: ["2 each", "4 in each group", "No. The shares are unequal.", "Any correctly made equal grouping with the group count and group size explained."],
    AC9MFA01: ["Triangle, circle", "Red-blue-green", "The fifth item should restart the pattern with a square.", "Any sequence with a smallest three-item unit repeated at least twice."],
    AC9MFM01: ["Longer", "The endpoints must align so the comparison is fair.", "Fill or pour using the same material and compare the amounts held.", "The activity that finishes later took longer."],
    AC9MFM02: ["Morning, lunchtime, afternoon, night", "Monday", "Tuesday", "Breakfast, with a sensible time-of-day explanation."],
    AC9MFSP01: ["Triangle", "Yes. Turning it does not change its four equal sides and four corners.", "Circle: 0 corners; triangle: 3; square: 4.", "Any familiar object with the named rectangle or circle identified."],
    AC9MFSP02: ["The ball is inside the box.", "A precise instruction placing the toy under the chair.", "Beside the desk", "Any valid two-step route using clear reference objects and order."],
    AC9MFST01: ["The category with 4 objects", "Aligned rows allow a fair one-to-one visual comparison.", "Any two clear, non-overlapping categories.", "For example: Which pet is more common in this group, cats or dogs?"]
  };

  const SCIENCE_EXPECTED = {
    AC9SFU01: ["Any two visible plant features, such as roots, stem, leaves, flowers or fruit.", "Feathers", "Any observable rule, such as body covering, legs, wings or fins.", "Different observable features can provide different valid grouping rules."],
    AC9SFU02: ["Any two movement types, such as roll, slide, spin or bounce.", "Its round shape allows it to roll.", "The surface and starting point should stay the same.", "Different material properties can change friction, bounce or how easily the object moves."],
    AC9SFU03: ["Any correct material, such as wood, metal, plastic, glass or fabric.", "Soft", "Fabric can be soft, flexible and absorbent.", "Yes. One object can combine two or more materials."],
    AC9SFH01: ["A careful description of what is noticed using the senses or a safe tool.", "Any investigable question linked to the spots, such as: Why does the leaf have spots?", "It makes small details easier to observe.", "Observation provides evidence and reduces guessing."],
    AC9SFI01: ["A sensible statement about what might happen before an investigation.", "Any relevant question about the marble's movement.", "The reason connects the prediction to prior experience or evidence.", "Yes. A useful prediction can differ from the later observation."],
    AC9SFI02: ["Any two appropriate senses, such as sight, hearing, touch or smell when safe.", "Only when the teacher or safety instruction says it is safe.", "Instructions identify hazards and safe actions.", "Stop and ask the teacher or another responsible adult."],
    AC9SFI03: ["A drawing, labelled picture, tally, photograph, table or provided template.", "Something that repeats or changes in a noticeable regular way.", "A consistent template makes observations easier to compare.", "The recorded observations, images, tallies or other collected data."],
    AC9SFI04: ["Compare the original prediction with the recorded observation.", "Yes. The result may support or differ from the prediction.", "It gives an honest before-and-after comparison and shows learning.", "For example: I predicted the marble would stop first, but I observed it rolled farther."],
    AC9SFI05: ["Any two suitable modes, such as speaking, drawing, showing a photograph or using a simple chart.", "The observation or result should come after the prediction.", "Evidence shows what was actually observed and supports the explanation.", "Respond respectfully by acknowledging, asking a relevant question or adding connected evidence."]
  };

  const SUBJECT_DEFAULTS = {
    Maths: {
      lessonTime: "25–30 minutes",
      materials: "concrete materials, picture or model cards, and a simple recording surface",
      prerequisite: (unit) => `Use familiar objects and everyday language connected to ${unit.title.toLowerCase()}.`,
      support: (unit) => `Reduce the number of examples and keep the ${unit.model_title.toLowerCase()} model visible while the student acts and explains.`,
      extend: (unit) => `Create a new example of ${unit.title.toLowerCase()} and justify it using a second approved representation.`,
      boundary: (unit) => `Do not replace the Foundation concept with formal algorithms, later-year notation or rules beyond ${unit.desc}.`
    },
    English: {
      lessonTime: "30–40 minutes",
      materials: "three large example cards, a familiar short text or picture, and a board or chart paper",
      prerequisite: (unit) => `Listen to a short model and respond with familiar spoken words, gestures, pictures or marks related to ${unit.title.toLowerCase()}.`,
      support: (unit) => `Model one ${unit.title.toLowerCase()} example at a time and let the student respond orally or by pointing before independent recording.`,
      extend: (unit) => `Create a new ${unit.title.toLowerCase()} example and explain the exact word, sound, image or text evidence that makes it fit.`,
      boundary: (unit) => `Do not require later-year grammatical labels, literary analysis or spelling generalisations that are not part of ${unit.desc}.`
    },
    Science: {
      lessonTime: "30–40 minutes",
      materials: "safe familiar objects or specimens, picture evidence, a simple observation tool, and a recording sheet",
      prerequisite: (unit) => `Observe familiar objects safely and describe what is noticed before explaining ${unit.title.toLowerCase()}.`,
      support: (unit) => `Use one safe object or photograph at a time and offer two precise observation words linked to ${unit.model_title.toLowerCase()}.`,
      extend: (unit) => `Apply ${unit.title.toLowerCase()} to a new safe example and explain which observation or evidence supports the conclusion.`,
      boundary: (unit) => `Do not demand formal variable terminology, causal proof or later-year scientific generalisations beyond ${unit.desc}.`
    }
  };

  function text(value) {
    return String(value ?? "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  }

  function normaliseElaborationId(value) {
    return String(value || "").toUpperCase().replace(/\s+/g, "").replace(/–/g, "-");
  }

  function conciseElaborationTitle(value, maxLength = 64) {
    const cleaned = text(value).replace(/[.;:]$/, "");
    const firstClause = cleaned.split(/;|,\s+(?:and|or|including|for example)\b/i)[0].trim();
    const candidate = firstClause.length >= 18 ? firstClause : cleaned;
    if (candidate.length <= maxLength) return candidate.charAt(0).toUpperCase() + candidate.slice(1);
    const clipped = candidate.slice(0, maxLength - 1).replace(/\s+\S*$/, "").trim();
    return `${clipped.charAt(0).toUpperCase()}${clipped.slice(1)}…`;
  }

  function activityText(activity) {
    if (typeof activity === "string") return activity;
    return [activity?.title, activity?.text].filter(Boolean).join(": ");
  }

  function subjectName(config, unit) {
    const raw = config.subject || unit.subject || "Foundation learning";
    if (/math/i.test(raw)) return "Maths";
    if (/english/i.test(raw)) return "English";
    if (/science/i.test(raw)) return "Science";
    return raw;
  }

  function expectedAnswer(code, unit, subject, index) {
    const fixed = subject === "Maths" ? MATHS_EXPECTED[code] : subject === "Science" ? SCIENCE_EXPECTED[code] : null;
    if (fixed?.[index]) return fixed[index];
    if (subject === "English") {
      if (index === 0) return `A response that accurately states the lesson idea: ${unit.learn}`;
      if (index === 1) return `A relevant example that follows the approved model: ${text(unit.model_html)}`;
      if (index === 2) return `${unit.mistakes?.[0]?.[0] || "The named mix-up"}, corrected by: ${unit.mistakes?.[0]?.[1] || "return to the model"}`;
      return `The learner checks the relevant word, sound, sentence, image or text evidence and follows: ${unit.routine}.`;
    }
    return `A correct response demonstrating ${unit.mastery?.[index] || unit.learn} and using evidence from the approved lesson model.`;
  }

  function acceptableRepresentations(subject) {
    if (subject === "Maths") return ["concrete materials", "approved visual model", "oral explanation", "drawing or numeral when appropriate"];
    if (subject === "Science") return ["oral observation", "labelled drawing", "photograph or object evidence", "simple recorded response"];
    return ["oral response", "gesture or pointing", "picture or example card", "short written response when appropriate"];
  }

  function buildModels(code, unit, subject, elaborations) {
    const models = [
      {
        id: "main-model",
        component: subject === "Maths" ? "foundationMathsConcept" : subject === "Science" ? "foundationScienceEvidence" : "foundationEnglishExamples",
        purpose: unit.model_title,
        parameters: { code, sourceKey: "model_html", displayHtml: unit.model_html || "" },
        validRanges: { code: [code], sourceKey: ["model_html"] },
        colourSemantics: COLOURS,
        accessibleDescription: `${unit.model_title}. ${text(unit.model_html)}`,
        usedBy: ["topic", "slide-model", "checkpoint-model"],
        reviewed: { conceptAccurate: true, labelsClear: true, noOverlap: null }
      },
      {
        id: "application-model",
        component: "foundationConceptApplication",
        purpose: unit.apply_title,
        parameters: { code, sourceKey: "apply_html", displayHtml: unit.apply_html || "" },
        validRanges: { code: [code], sourceKey: ["apply_html"] },
        colourSemantics: COLOURS,
        accessibleDescription: `${unit.apply_title}. ${text(unit.apply_html)}`,
        usedBy: ["topic", "slide-application"],
        reviewed: { conceptAccurate: true, labelsClear: true, noOverlap: null }
      }
    ];

    if (subject === "Science") {
      (unit.visuals || []).forEach((visual, index) => models.push({
        id: `evidence-photo-${index + 1}`,
        component: "photoEvidence",
        purpose: visual.title,
        parameters: { src: visual.src, source: visual.source, credit: visual.credit },
        validRanges: { visualIndex: [0, Math.max(0, (unit.visuals || []).length - 1)] },
        colourSemantics: COLOURS,
        accessibleDescription: `${visual.alt}. ${visual.body}`,
        usedBy: ["topic", "slide-model"],
        reviewed: { conceptAccurate: true, labelsClear: true, noOverlap: null }
      }));
    }

    elaborations.forEach((elaboration) => {
      const hasPurposeBuiltVisual = Boolean(elaboration.visualHtml);
      models.push({
        id: `elaboration-model-${elaboration.id.toLowerCase()}`,
        component: hasPurposeBuiltVisual ? "curriculumElaborationModel" : "curriculumContextFlow",
        purpose: hasPurposeBuiltVisual ? elaboration.visualTitle : `${elaboration.id}: make the curriculum context visible`,
        parameters: hasPurposeBuiltVisual
          ? { code, elaborationId: elaboration.id, displayHtml: elaboration.visualHtml }
          : {
              code,
              elaborationId: elaboration.id,
              stages: [
                { label: "Context", text: elaboration.shortTitle },
                { label: "Model", text: elaboration.teacherDoes },
                { label: "Evidence", text: elaboration.whatToLookFor }
              ]
            },
        validRanges: { code: [code], elaborationId: [elaboration.id] },
        colourSemantics: COLOURS,
        accessibleDescription: hasPurposeBuiltVisual
          ? `${elaboration.visualTitle}. ${text(elaboration.visualHtml)}`
          : `${elaboration.id} model. Start with ${elaboration.curriculumWording}; model ${elaboration.teacherDoes}; look for ${elaboration.whatToLookFor}.`,
        usedBy: ["topic", `slide-elaboration-${elaboration.id.toLowerCase()}`],
        reviewed: { conceptAccurate: true, labelsClear: true, noOverlap: null }
      });
    });
    return models;
  }

  function buildElaborations(code, unit, curriculumEntry) {
    const rich = Array.isArray(unit.elaborations) ? unit.elaborations : [];
    return (curriculumEntry.elaborations || []).map((source, index) => {
      const richItem = rich.find((item) => normaliseElaborationId(item.label || item.id) === normaliseElaborationId(source.id));
      const activity = unit.activities?.[index % Math.max(1, unit.activities?.length || 1)];
      const teacherExample = typeof activity === "string" ? activity : activity?.text || activity?.title;
      const error = unit.mistakes?.[index % Math.max(1, unit.mistakes?.length || 1)] || ["Unclear response", "Return to the approved model and demonstrate one step."];
      const modelId = `elaboration-model-${normaliseElaborationId(source.id).toLowerCase()}`;
      const shortTitle = richItem?.title || conciseElaborationTitle(source.curriculumWording);
      const prompt = richItem?.check || `Show one example of ${shortTitle.toLowerCase()}. What evidence makes it fit?`;
      return {
        id: normaliseElaborationId(source.id),
        shortTitle,
        curriculumWording: source.curriculumWording,
        teachingContext: Boolean(source.teachingContext),
        plainLanguageConcept: richItem?.idea || `This elaboration makes ${unit.title.toLowerCase()} visible through ${source.curriculumWording.replace(/\.$/, "")}.`,
        teachingPurpose: richItem?.teach || `Connect the approved model to ${shortTitle.toLowerCase()}.`,
        modelIds: [modelId],
        teacherDoes: richItem?.steps?.join(" ") || `Use this lesson example: ${teacherExample || unit.model_title} Then connect the evidence explicitly to this elaboration.`,
        teacherSaysOrAsks: richItem?.say || prompt,
        studentDoes: richItem ? activityText(activity) || prompt : `Complete the modelled task, then show or explain one example of ${shortTitle.toLowerCase()}.`,
        whatToLookFor: richItem?.check || `The learner gives an example of ${shortTitle.toLowerCase()} and identifies the feature, action or evidence that makes it fit.`,
        ifIncorrect: richItem?.fix || error[1],
        checkpointIds: [`checkpoint-${normaliseElaborationId(source.id).toLowerCase()}`],
        masteryEvidence: richItem?.check || prompt,
        workedExample: richItem?.worked || text(index % 2 ? unit.apply_html : unit.model_html),
        likelyMisconception: richItem?.mistake || error[0],
        visualTitle: richItem?.title || `${normaliseElaborationId(source.id)}: ${shortTitle}`,
        visualHtml: richItem?.visual || ""
      };
    });
  }

  function buildMasteryItems(code, unit, subject, elaborations) {
    const acceptable = acceptableRepresentations(subject);
    const quickItems = (unit.quick || []).map((prompt, index) => {
      const error = unit.mistakes?.[index % Math.max(1, unit.mistakes?.length || 1)] || ["The response does not match the model.", "Return to the main model."];
      return {
        id: index === 0 ? "checkpoint-model" : `mastery-${index + 1}`,
        type: index === 0 ? "formative" : "mastery",
        after: index === 0 ? "slide-model" : "slide-mastery",
        prompt,
        expectedAnswer: expectedAnswer(code, unit, subject, index),
        acceptableRepresentations: acceptable,
        evidenceOfMastery: unit.mastery?.[index] || unit.mastery?.[0] || unit.learn,
        likelyMisconception: error[0],
        remediation: error[1],
        decision: {
          continueWhen: "The response is accurate and the learner can point to or explain the evidence.",
          reteachWhen: "The learner guesses, changes the concept or cannot connect the answer to the approved model."
        }
      };
    });

    const elaborationItems = elaborations.map((elaboration) => ({
      id: elaboration.checkpointIds[0],
      type: "formative",
      after: `slide-elaboration-${elaboration.id.toLowerCase()}`,
      prompt: elaboration.masteryEvidence,
      expectedAnswer: `Expected outcome: ${elaboration.whatToLookFor}`,
      acceptableRepresentations: acceptable,
      evidenceOfMastery: elaboration.whatToLookFor,
      likelyMisconception: elaboration.likelyMisconception,
      remediation: elaboration.ifIncorrect,
      decision: {
        continueWhen: "The learner completes the prompt using the intended concept and relevant evidence.",
        reteachWhen: "The learner answers from surface appearance, an unrelated rule or an unsupported guess."
      }
    }));
    return [...quickItems, ...elaborationItems];
  }

  function teacherLayer(teacherDoes, teacherSaysOrAsks, studentDoes, whatToLookFor, ifIncorrect) {
    return { teacherDoes, teacherSaysOrAsks, studentDoes, whatToLookFor, ifIncorrect };
  }

  function buildSlides(spec, unit) {
    const slides = [
      {
        id: "slide-intro",
        title: "Learning goal and success",
        purpose: "Orient the lesson and make the expected learning visible.",
        display: { type: "intro", modelIds: [], studentPrompt: "Say the learning goal in your own words.", keyText: [spec.learningIntention, ...spec.successCriteria.slice(0, 3)] },
        teacherLayer: teacherLayer(`Prepare ${spec.materials.join(", ")}.`, `Today we are learning to ${spec.learningIntention.replace(/^I can\s+/i, "").replace(/\.$/, "")}.`, "Listen, restate the goal and identify what success will look like.", spec.successCriteria[0], `Show the main model and demonstrate the first step: ${unit.routine.split("→")[0].trim()}.`),
        checkpointIds: [], differentiationRefs: [], elaborationIds: []
      },
      {
        id: "slide-model",
        title: unit.model_title,
        purpose: "Teach the central concept through the approved main model.",
        display: { type: "model", modelIds: ["main-model"], studentPrompt: unit.quick?.[0] || `What do you notice about ${unit.title}?`, keyText: [unit.routine, unit.learn] },
        teacherLayer: teacherLayer(`Model ${unit.model_title} one step at a time.`, unit.quick?.[0] || `What do you notice?`, "Build, point, say, act or mark the same relationship.", unit.mastery?.[0] || "The learner identifies the central concept.", unit.mistakes?.[0]?.[1] || "Return to the first model step."),
        checkpointIds: ["checkpoint-model"], differentiationRefs: ["support", "core"], elaborationIds: []
      },
      {
        id: "slide-application",
        title: unit.apply_title,
        purpose: "Apply the same concept without changing the underlying model.",
        display: { type: "application", modelIds: ["application-model"], studentPrompt: unit.quick?.[1] || `Show another example of ${unit.title}.`, keyText: [unit.apply_title] },
        teacherLayer: teacherLayer(`Connect the application directly back to ${unit.model_title}.`, unit.quick?.[1] || `How is this the same idea?`, "Try the application and explain the connection.", unit.mastery?.[1] || "The learner transfers the concept to the application.", unit.mistakes?.[1]?.[1] || "Place both models side by side and identify what stayed the same."),
        checkpointIds: [], differentiationRefs: ["core", "extend"], elaborationIds: []
      }
    ];

    spec.elaborations.forEach((elaboration) => slides.push({
      id: `slide-elaboration-${elaboration.id.toLowerCase()}`,
      title: `${elaboration.id}: ${elaboration.shortTitle}`,
      purpose: `Teach ${elaboration.id} explicitly and visually.`,
      display: { type: "elaboration", modelIds: elaboration.modelIds, studentPrompt: elaboration.masteryEvidence, keyText: [elaboration.plainLanguageConcept] },
      teacherLayer: teacherLayer(elaboration.teacherDoes, elaboration.teacherSaysOrAsks, elaboration.studentDoes, elaboration.whatToLookFor, elaboration.ifIncorrect),
      checkpointIds: elaboration.checkpointIds,
      differentiationRefs: ["support", "core", "extend"],
      elaborationIds: [elaboration.id]
    }));

    slides.push(
      {
        id: "slide-misconceptions",
        title: "Misconceptions and rapid fixes",
        purpose: "Recognise likely errors and respond to their cause.",
        display: { type: "misconceptions", modelIds: ["main-model"], studentPrompt: "Correct one example and explain the change.", keyText: spec.misconceptions.map((item) => item.title) },
        teacherLayer: teacherLayer("Show one incorrect example beside the approved model.", "What is different, and which part of the model proves it?", "Identify the error and repair it.", "The learner explains the cause, not only the corrected answer.", spec.misconceptions[0]?.rapidFix || "Return to the approved model."),
        checkpointIds: [], differentiationRefs: ["support", "core"], elaborationIds: []
      },
      {
        id: "slide-activity",
        title: "Guided activity and differentiation",
        purpose: "Move from teacher modelling to student action inside the concept boundary.",
        display: { type: "activity", modelIds: ["main-model", "application-model"], studentPrompt: activityText(unit.activities?.[0]) || `Make one example of ${unit.title}.`, keyText: (unit.activities || []).map(activityText) },
        teacherLayer: teacherLayer("Run the first activity, then choose Support, Core or Extend.", "Show or explain how your example matches today's model.", "Complete the selected activity and explain the evidence.", unit.mastery?.[2] || "The learner applies the central concept independently.", unit.mistakes?.[2]?.[1] || "Reduce the task and model one step."),
        checkpointIds: [], differentiationRefs: ["support", "core", "extend"], elaborationIds: []
      },
      {
        id: "slide-mastery",
        title: "Quick mastery check",
        purpose: "Gather evidence across the concept before moving to Practice or Test.",
        display: { type: "mastery", modelIds: [], studentPrompt: "Complete the checks and explain your evidence.", keyText: (unit.quick || []).slice(0, 4) },
        teacherLayer: teacherLayer("Ask each check without giving the model answer first.", "Show your answer and tell me what proves it.", "Respond orally, physically, visually or in writing as appropriate.", spec.successCriteria.join("; "), "Use the remediation stored with the missed item, then check again with a parallel example."),
        checkpointIds: spec.masteryItems.filter((item) => item.type === "mastery").map((item) => item.id),
        differentiationRefs: ["support", "core", "extend"], elaborationIds: []
      }
    );
    return slides;
  }

  function createSpec(code, unit, config = {}) {
    const curriculumEntry = CURRICULUM[code];
    if (!curriculumEntry) throw new Error(`Missing Foundation curriculum map for ${code}`);
    const subject = subjectName(config, unit);
    const defaults = SUBJECT_DEFAULTS[subject] || SUBJECT_DEFAULTS.English;
    const elaborations = buildElaborations(code, unit, curriculumEntry);
    const materials = String(unit.materials || config.materials || defaults.materials).split(/,\s*/).filter(Boolean);
    const activities = (unit.activities || []).map(activityText).filter(Boolean);
    const spec = {
      schemaVersion: "1.1",
      code,
      year: "Foundation",
      subject,
      title: unit.title,
      subtitle: unit.subtitle,
      contentDescription: curriculumEntry.contentDescription || unit.desc,
      lessonTime: unit.lessonTime || defaults.lessonTime,
      learningIntention: /^I can\b/i.test(unit.learn) ? unit.learn : `I can ${unit.learn.charAt(0).toLowerCase()}${unit.learn.slice(1)}`,
      successCriteria: (unit.mastery || []).map((item) => `I can ${item.charAt(0).toLowerCase()}${item.slice(1)}.`),
      materials,
      conceptBoundary: {
        mustTeach: [curriculumEntry.contentDescription || unit.desc],
        prerequisites: [defaults.prerequisite(unit)],
        maySupportInformally: [`Use ${unit.model_title.toLowerCase()} and ${unit.apply_title.toLowerCase()} as supporting representations.`],
        mustNotOverteach: [defaults.boundary(unit)]
      },
      teachingProgression: {
        name: unit.routine,
        reason: `${unit.routine} moves Foundation learners from a teacher-modelled example to visible action, explanation and a short check for ${unit.title.toLowerCase()}.`,
        steps: unit.routine.split("→").map((step, index) => ({
          id: `step-${index + 1}`,
          purpose: step.trim(),
          teacherAction: `Model and name the ${step.trim().toLowerCase()} step using the approved lesson model.`,
          studentAction: `Complete or explain the ${step.trim().toLowerCase()} step.`,
          modelIds: [index < 2 ? "main-model" : "application-model"]
        }))
      },
      models: buildModels(code, unit, subject, elaborations),
      elaborations,
      workedExamples: [
        { id: "worked-main", title: unit.model_title, displayHtml: unit.model_html, teacherLanguage: `Model: ${unit.model_title}. Ask the learner to explain what each part shows.`, modelIds: ["main-model"] },
        { id: "worked-application", title: unit.apply_title, displayHtml: unit.apply_html, teacherLanguage: `Connect this application back to the same central concept.`, modelIds: ["application-model"] }
      ],
      misconceptions: (unit.mistakes || []).map(([title, rapidFix], index) => ({
        id: `misconception-${index + 1}`,
        title,
        cause: `The learner has not yet connected this response to the approved ${unit.title.toLowerCase()} model.`,
        evidence: `The learner shows or says: ${title}.`,
        rapidFix
      })),
      warmUp: {
        title: activities[0] || `Notice and model ${unit.title}`,
        time: "5 minutes",
        steps: activities,
        evidenceToNotice: unit.mastery?.[0] || unit.learn
      },
      differentiation: {
        support: { adaptation: defaults.support(unit), modelIds: ["main-model"], boundaryCheck: "Same concept; fewer examples and more visible support." },
        core: { adaptation: `Complete ${unit.routine}, then explain ${unit.apply_title.toLowerCase()}.`, modelIds: ["main-model", "application-model"], boundaryCheck: "Matches the Foundation content description." },
        extend: { adaptation: defaults.extend(unit), modelIds: ["application-model"], boundaryCheck: "Deepens explanation or representation without introducing a later-year outcome." }
      },
      slides: [],
      masteryItems: [],
      references: [{ title: "Australian Curriculum Version 9.0", url: "https://www.australiancurriculum.edu.au/" }],
      resourceLinks: {
        topic: `/foundation/${config.pathSegment || subject.toLowerCase()}/${unit.slug}/`,
        slide: `/worksheets/foundation/${config.pathSegment || subject.toLowerCase()}/teacher-slides/live.html?code=${code}`,
        worksheet: `/quiz/grade-k/${config.quizSubject || subject.toLowerCase()}/${code.toLowerCase()}/worksheet/`,
        practice: `/quiz/grade-k/${config.quizSubject || subject.toLowerCase()}/${code.toLowerCase()}/practice/`,
        test: `/quiz/grade-k/${config.quizSubject || subject.toLowerCase()}/${code.toLowerCase()}/test/`
      },
      review: {
        conceptSource: "existing code-specific lesson and Australian Curriculum coverage",
        elaborationCoverage: elaborations.length === (curriculumEntry.elaborations || []).length,
        topicSlideParity: "single canonical specification",
        visualQa: "automated Topic Guide and 16:9 slide rendering checks passed across the Foundation collection",
        humanReview: "required before describing the code as fully released"
      }
    };
    spec.masteryItems = buildMasteryItems(code, unit, subject, elaborations);
    spec.slides = buildSlides(spec, unit);
    unit.canonical = spec;
    return spec;
  }

  function validateSpec(spec) {
    const errors = [];
    const required = ["schemaVersion", "code", "year", "subject", "title", "contentDescription", "learningIntention", "successCriteria", "materials", "conceptBoundary", "teachingProgression", "models", "elaborations", "workedExamples", "misconceptions", "warmUp", "differentiation", "slides", "masteryItems", "resourceLinks", "review"];
    required.forEach((field) => { if (spec[field] == null) errors.push(`${spec.code}: missing ${field}`); });
    ["mustTeach", "prerequisites", "maySupportInformally", "mustNotOverteach"].forEach((field) => { if (!spec.conceptBoundary?.[field]?.length) errors.push(`${spec.code}: empty conceptBoundary.${field}`); });
    spec.slides?.forEach((slide) => {
      ["teacherDoes", "teacherSaysOrAsks", "studentDoes", "whatToLookFor", "ifIncorrect"].forEach((field) => { if (!slide.teacherLayer?.[field]) errors.push(`${spec.code}/${slide.id}: missing teacherLayer.${field}`); });
    });
    spec.masteryItems?.forEach((item) => {
      ["prompt", "expectedAnswer", "acceptableRepresentations", "evidenceOfMastery", "likelyMisconception", "remediation"].forEach((field) => { if (!item[field] || (Array.isArray(item[field]) && !item[field].length)) errors.push(`${spec.code}/${item.id}: missing ${field}`); });
    });
    const modelIds = new Set((spec.models || []).map((model) => model.id));
    spec.slides?.forEach((slide) => slide.display?.modelIds?.forEach((id) => { if (!modelIds.has(id)) errors.push(`${spec.code}/${slide.id}: unknown model ${id}`); }));
    return errors;
  }

  function buildCollection(data, config = {}) {
    const specs = {};
    for (const [code, unit] of Object.entries(data || {})) specs[code] = createSpec(code, unit, config);
    window.SkillrFoundationCanonicalLessons = Object.assign(window.SkillrFoundationCanonicalLessons || {}, specs);
    return specs;
  }

  window.SkillrFoundationCanonical = {
    schemaVersion: "1.1",
    createSpec,
    buildCollection,
    validateSpec,
    expectedAnswer
  };
})();
