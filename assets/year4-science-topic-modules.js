(() => {
  "use strict";

  const source = window.SkillrYear4ScienceTopicSource || {};
  const units = window.SkillrYear4ScienceData || {};
  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const response = (answer, summary, hint) => ({ answer:clean(answer), summary:clean(summary), hint:clean(hint) });

  Object.entries(source).forEach(([code, spec]) => {
    const unit = units[code];
    if (!unit) return;
    const terms = (spec.terms || []).slice(0, 6);
    const mistakes = (spec.mistakes || []).slice(0, 3);
    const activities = spec.activities || [];
    const q = spec.questions || {};
    const firstTerm = terms[0] || ["evidence", "information used to support an explanation"];
    const choice1 = q.choice1 || ["Which response best fits this science idea?", [spec.modelNote, "An unrelated observation", "A guess without evidence"]];
    const choice2 = q.choice2 || ["Which response best applies the idea?", [spec.applyNote, "Change every variable", "Ignore the evidence"]];
    const modelSteps = Array.isArray(spec.model) ? spec.model.map((item) => Array.isArray(item) ? item.join(": ") : item) : [spec.modelTitle, spec.modelNote];
    const applySteps = Array.isArray(spec.apply) ? spec.apply.slice(0, 4).map((item) => Array.isArray(item) ? item.join(": ") : item) : [spec.applyTitle, spec.applyNote];

    unit.vocabulary = terms.map(([term, definition]) => ({ term, definition }));
    unit.misconceptions = mistakes.map(([misconception, correction]) => ({ misconception, correction }));
    unit.deepDive = [
      spec.learn,
      `${spec.modelTitle} is a useful way to make the idea visible. ${spec.modelNote}`,
      `${spec.applyTitle} helps students transfer the idea to evidence from a new situation. ${spec.applyNote}`
    ];
    unit.workedExamples = [
      { title:spec.modelTitle, steps:modelSteps.slice(0, 6), conclusion:spec.modelNote, visualHtml:unit.model_html },
      { title:spec.applyTitle, steps:applySteps, conclusion:spec.applyNote, visualHtml:unit.apply_html }
    ];
    unit.visualAlt = `${spec.modelTitle}: ${modelSteps.slice(0, 5).join("; ")}. ${spec.applyTitle}: ${applySteps.slice(0, 3).join("; ")}.`;
    unit.slideQuickCheck = spec.quick?.[0] || choice1[0];
    unit.slideExpected = choice1[1]?.[0] || spec.modelNote;
    unit.slideRemediation = mistakes[0]?.[1] || "Return to the visual model, identify the evidence and explain the connection in one sentence.";

    const worksheet = [
      { tier:1, alignment:["taught-concept","worked-example-1"], type:"single", question:choice1[0], options:(choice1[1] || []).slice(0, 3), ...response(choice1[1]?.[0], `The first option applies ${spec.modelTitle.toLowerCase()} accurately.`, `Use the ${spec.modelTitle.toLowerCase()} visual and check what each part represents.`) },
      { tier:1, alignment:["taught-concept","worked-example-2"], type:"single", question:choice2[0], options:(choice2[1] || []).slice(0, 3), ...response(choice2[1]?.[0], `This response uses evidence in the way described by ${spec.applyTitle.toLowerCase()}.`, `Compare each option with the application model before choosing.`) },
      { tier:1, alignment:["vocabulary"], type:"text", question:`In your own words, what does “${firstTerm[0]}” mean in this topic?`, ...response(firstTerm[1], `${firstTerm[0]} is essential vocabulary for explaining this science concept precisely.`, `Look at the vocabulary box and connect the term to the model.`) },
      { tier:2, alignment:["worked-example-1","visual-terminology"], type:"text", question:`Use the first worked example to explain ${spec.modelTitle.toLowerCase()}.`, ...response(spec.modelNote, `A strong response follows the model in order and explains the scientific connection.`, `Name each important stage, object or variable, then explain how they connect.`) },
      { tier:2, alignment:["worked-example-2","taught-concept"], type:"text", question:`Apply ${spec.applyTitle.toLowerCase()} to one new classroom or local example.`, ...response(spec.applyNote, `The new example should preserve the relationship shown in the application model.`, `Choose a familiar situation, identify relevant evidence and use the model to explain it.`) },
      { tier:2, alignment:["misconception-correction"], type:"text", question:`A student says, “${mistakes[0]?.[0] || "The first observation is enough to prove the idea"}.” Correct the student’s thinking.`, ...response(mistakes[0]?.[1] || spec.modelNote, `The correction replaces a realistic misconception with evidence-based science.`, `Return to the model and state exactly which relationship or evidence the student missed.`) },
      { tier:2, alignment:["taught-concept","evidence-practice"], type:"text", question:activities[0]?.[1] ? `${activities[0][0]}: explain what you would observe, record or compare.` : `Describe an investigation or observation that would provide useful evidence for this topic.`, ...response(activities[0]?.[1] || spec.applyNote, `The response identifies an observable process and relevant evidence.`, `State what you would do, what you would record and how it relates to the question.`) },
      { tier:3, alignment:["worked-example-1","vocabulary","visual-terminology"], type:"text", question:`Create a labelled “${spec.modelTitle}” model. Include ${terms.slice(0, 3).map((item) => item[0]).join(", ")} and explain one choice.`, ...response(`Responses vary. A complete response must use ${terms.slice(0, 3).map((item) => item[0]).join(", ")}, accurate evidence and a justified conclusion.`, `A successful model selects relevant features, labels them clearly and links its conclusion to evidence.`, `Plan the model first, label its important parts and explain what each part shows.`) },
      { tier:3, alignment:["worked-example-2","evidence-practice"], type:"text", question:`What evidence could help two students decide between different explanations of “${spec.applyTitle}”?`, ...response(`Responses vary. A complete response compares both explanations, cites relevant evidence and explains any limitation.`, `The stronger evaluation compares both possibilities before making an evidence-based judgement.`, `List the evidence for each explanation before deciding which is stronger.`) }
    ].map((item, index) => ({ id:`${code}-WS-${String(index + 1).padStart(2, "0")}`, ...item }));

    unit.worksheet = worksheet;
    unit.alignmentCoverage = {
      taughtConcept:spec.learn,
      vocabulary:terms.map((item) => item[0]),
      misconceptionCorrection:mistakes[0],
      workedExample1:spec.modelTitle,
      workedExample2:spec.applyTitle,
      visualTerminology:[...new Set([...modelSteps, ...applySteps])].slice(0, 10)
    };
    window.SkillrYear4ScienceWorksheetData[code] = { title:unit.title, yearLabel:"Year 4 Science", questions:worksheet };
  });
})();
