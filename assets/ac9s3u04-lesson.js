(() => {
  "use strict";

  const teacherLayer = (teacherDoes, teacherSaysOrAsks, studentDoes, whatToLookFor, ifIncorrect) => ({
    teacherDoes,
    teacherSaysOrAsks,
    studentDoes,
    whatToLookFor,
    ifIncorrect
  });

  const models = [
    {
      id: "object-material-sort",
      component: "objectMaterialSort",
      purpose: "Distinguish an object from the material or materials used to make it",
      parameters: {
        examples: [
          { object: "spoon", materials: ["metal", "wood", "plastic"] },
          { object: "window", materials: ["glass", "metal"] }
        ]
      },
      validRanges: { exampleCount: [2, 6], materialsPerObject: [1, 3] },
      colourSemantics: { blue: "object labels", amber: "material labels" },
      accessibleDescription: "A spoon and window are labelled as objects, with metal, wood, plastic and glass labelled as materials.",
      usedBy: ["topic-foundation", "slide-2"],
      reviewed: { conceptAccurate: true, labelsClear: true, noOverlap: true }
    },
    {
      id: "solid-liquid-compare",
      component: "stateContainerCompare",
      purpose: "Compare the observable shape and flow properties of solids and liquids",
      parameters: {
        solid: { substance: "wooden block", containers: ["tray", "bowl"], behaviour: "keeps its own shape" },
        liquid: { substance: "water", containers: ["cup", "bowl"], behaviour: "flows and fills the bottom" }
      },
      validRanges: { containerCount: [2, 3], substanceCount: [2, 4] },
      colourSemantics: { navy: "solid", cyan: "liquid", grey: "container outline" },
      accessibleDescription: "A wooden block keeps its shape when moved from a tray to a bowl, while water flows and fills the bottom of a cup and a bowl.",
      usedBy: ["topic-properties", "slide-3", "slide-4", "checkpoint-properties"],
      reviewed: { conceptAccurate: true, labelsClear: true, noOverlap: true }
    },
    {
      id: "sealed-bag-change",
      component: "sealedBagStateChange",
      purpose: "Track the same water as ice melts and liquid water freezes",
      parameters: {
        stages: [
          { label: "ice", state: "solid", condition: "heat added" },
          { label: "water", state: "liquid", condition: "heat removed" },
          { label: "ice", state: "solid", condition: "frozen again" }
        ],
        sealed: true
      },
      validRanges: { stageCount: [2, 4], sealed: [true, true] },
      colourSemantics: { paleBlue: "solid water", cyan: "liquid water", coral: "heat added", deepBlue: "heat removed" },
      accessibleDescription: "A sealed bag shows ice melting to liquid water when heat is added and water freezing to ice when heat is removed.",
      usedBy: ["topic-change", "slide-5", "slide-6", "slide-7", "checkpoint-change"],
      reviewed: { conceptAccurate: true, labelsClear: true, noOverlap: true }
    },
    {
      id: "heat-direction-cycle",
      component: "stateChangeCycle",
      purpose: "Connect the direction of heat transfer to melting and freezing",
      parameters: {
        states: ["solid", "liquid"],
        transitions: [
          { from: "solid", to: "liquid", heat: "added", process: "melting" },
          { from: "liquid", to: "solid", heat: "removed", process: "freezing" }
        ]
      },
      validRanges: { stateCount: [2, 2], transitionCount: [2, 2] },
      colourSemantics: { coral: "heat added and melting", deepBlue: "heat removed and freezing" },
      accessibleDescription: "A two-way cycle shows that adding heat can melt a solid into a liquid and removing heat can freeze a liquid into a solid.",
      usedBy: ["topic-heat", "slide-6", "checkpoint-heat"],
      reviewed: { conceptAccurate: true, labelsClear: true, noOverlap: true }
    },
    {
      id: "useful-state-changes",
      component: "stateChangeApplication",
      purpose: "Explain why controlled melting and solidifying can be useful",
      parameters: {
        examples: [
          { material: "beeswax", change: "softened or melted, then cooled", use: "shaping and joining" },
          { material: "glass", change: "heated until workable, then cooled", use: "forming a new object" },
          { material: "suitable plastic", change: "softened or melted, then cooled", use: "forming a new product" }
        ]
      },
      validRanges: { exampleCount: [2, 4] },
      colourSemantics: { gold: "useful material", coral: "heating", blue: "cooling" },
      accessibleDescription: "Examples show beeswax, glass and suitable plastics changing state so they can be shaped or recycled, then becoming solid when cooled.",
      usedBy: ["topic-applications", "slide-9", "slide-10", "checkpoint-applications"],
      reviewed: { conceptAccurate: true, labelsClear: true, noOverlap: true }
    }
  ];

  const masteryItems = [
    {
      id: "checkpoint-properties",
      type: "formative",
      after: "slide-4",
      prompt: "A block and some water are moved into new containers. What will each do?",
      expectedAnswer: "The block keeps its own shape. The water flows and fills the bottom of its new container.",
      acceptableRepresentations: ["oral comparison", "labelled drawing", "safe demonstration with a block and water"],
      evidenceOfMastery: "The student uses observable behaviour, not the name or hardness of the substance, to classify each state.",
      likelyMisconception: "All solids are hard, or a liquid has no shape at all.",
      remediation: "Use a soft sponge as a solid and show that water has the shape of the part of the container it occupies.",
      decision: { continueWhen: "both states are explained using shape or flow", reteachWhen: "classification relies only on hardness, wetness or object name" }
    },
    {
      id: "checkpoint-heat",
      type: "formative",
      after: "slide-6",
      prompt: "Complete both arrows: solid plus heat added becomes __; liquid with heat removed becomes __.",
      expectedAnswer: "A liquid; a solid.",
      acceptableRepresentations: ["spoken answer", "melting and freezing labels", "arrows on the state-change model"],
      evidenceOfMastery: "The student connects each direction of heat transfer with the correct state change.",
      likelyMisconception: "Cold is added during freezing.",
      remediation: "Return to the arrows and say heat is transferred away from the liquid; avoid describing cold as a substance.",
      decision: { continueWhen: "both heat directions and outcomes are correct", reteachWhen: "either arrow is reversed or cold is described as being added" }
    },
    {
      id: "checkpoint-change",
      type: "formative",
      after: "slide-7",
      prompt: "Ice melts inside a sealed bag. What changed, and what stayed the same?",
      expectedAnswer: "Its state changed from solid to liquid. It is still water and it stayed inside the sealed bag.",
      acceptableRepresentations: ["oral explanation", "before-and-after drawing", "solid to liquid arrow with water labelled at both ends"],
      evidenceOfMastery: "The student distinguishes a change of state from a change into a different material.",
      likelyMisconception: "The ice disappeared or became a new substance.",
      remediation: "Trace the visible water inside the sealed bag and label both stages water.",
      decision: { continueWhen: "state change and material continuity are both identified", reteachWhen: "the student says the material disappeared or became different" }
    },
    {
      id: "checkpoint-investigation",
      type: "formative",
      after: "slide-8",
      prompt: "Which observation is useful evidence: 'It was nice' or 'Three ice pieces became liquid water after 12 minutes'? Why?",
      expectedAnswer: "The second observation because it records what changed and includes a measurement of time.",
      acceptableRepresentations: ["oral justification", "circling the evidence words", "a table entry"],
      evidenceOfMastery: "The student selects an observable, recordable statement as evidence.",
      likelyMisconception: "An opinion counts as scientific evidence.",
      remediation: "Ask what another person could see, count or measure to check the observation.",
      decision: { continueWhen: "the observable record is selected and justified", reteachWhen: "the opinion is selected or no evidence feature is named" }
    },
    {
      id: "checkpoint-applications",
      type: "formative",
      after: "slide-10",
      prompt: "Why can melting and cooling help form a new glass object?",
      expectedAnswer: "Heating makes the glass workable so it can be shaped; removing heat lets it become solid again.",
      acceptableRepresentations: ["oral sequence", "heat-shape-cool diagram", "labelled arrows"],
      evidenceOfMastery: "The student explains both the useful liquid or workable stage and the return to a solid.",
      likelyMisconception: "Heating creates new glass or every plastic can be melted safely for recycling.",
      remediation: "Keep one material label across the sequence and state that recycling methods depend on the type of material and specialist safe equipment.",
      decision: { continueWhen: "heating, shaping and cooling are sequenced accurately", reteachWhen: "the material is said to become a new substance or cooling is omitted" }
    },
    {
      id: "mastery-final",
      type: "summative",
      after: "slide-12",
      prompt: "Classify oil and an ice cube, then explain what happens to the ice cube when heat is added and when heat is later removed from the melted water.",
      expectedAnswer: "Oil is a liquid because it flows and fills the bottom of its container. Ice is a solid because it keeps its shape. Added heat melts the ice to liquid water; removed heat can freeze the water to solid ice.",
      acceptableRepresentations: ["oral explanation", "labelled four-step diagram", "written response using solid, liquid, melting and freezing"],
      evidenceOfMastery: "The student classifies using observable properties and explains both change directions using heat transfer.",
      likelyMisconception: "Oil is not a liquid because it is not water, or melted ice is no longer water.",
      remediation: "Revisit the container comparison and sealed-bag model before asking the student to explain one direction at a time.",
      decision: { continueWhen: "both classifications and both state changes are accurate", reteachWhen: "any classification lacks observable evidence or a heat direction is reversed" }
    }
  ];

  const slides = [
    {
      id: "slide-1", title: "Solids, liquids and changes of state", purpose: "Launch the lesson with the observable science question",
      display: { modelIds: [], studentPrompt: "How can you tell whether something is a solid or a liquid?", keyText: ["Observe", "Compare", "Explain with evidence"] },
      teacherLayer: teacherLayer("Display a block, cup of water and ice cube.", "What can we observe without guessing what is happening inside?", "Notice, compare and suggest testable descriptions.", "Statements about shape, flow and visible change.", "Replace labels such as hard or wet with: What does it do when moved?"),
      checkpointIds: [], differentiationRefs: ["support", "core", "extend"], elaborationIds: []
    },
    {
      id: "slide-2", title: "Objects are made from materials", purpose: "Separate object names from material names",
      display: { modelIds: ["object-material-sort"], studentPrompt: "Is spoon the object or the material?", keyText: ["Object: what it is", "Material: what it is made from"] },
      teacherLayer: teacherLayer("Sort familiar objects beside material labels.", "Can the same kind of object be made from different materials?", "Name each object and its material or materials.", "Students do not use object and material as interchangeable labels.", "Offer two frames: This is a __. It is made from __."),
      checkpointIds: [], differentiationRefs: ["support", "core"], elaborationIds: []
    },
    {
      id: "slide-3", title: "A solid keeps its own shape", purpose: "Identify the defining observable shape behaviour of solids",
      display: { modelIds: ["solid-liquid-compare"], studentPrompt: "What happens when the block moves to a bowl?", keyText: ["Solid", "Keeps its own shape", "Does not need to be hard"] },
      teacherLayer: teacherLayer("Move a rigid block and a soft sponge between containers.", "What stayed the same even though the container changed?", "Describe and classify both examples.", "Students use keeps its own shape rather than hard.", "Compress the sponge, release it, and distinguish changing under a force from flowing to fill a container."),
      checkpointIds: [], differentiationRefs: ["support", "core", "extend"], elaborationIds: ["E1"]
    },
    {
      id: "slide-4", title: "A liquid flows", purpose: "Identify how liquids behave in containers",
      display: { modelIds: ["solid-liquid-compare"], studentPrompt: "What changes when water is poured into a bowl?", keyText: ["Liquid", "Flows", "Takes the shape of the part of its container it occupies"] },
      teacherLayer: teacherLayer("Pour the same water between two transparent containers.", "Did the amount of water choose a new shape, or did the container give it that shape?", "Observe the surface and bottom of each container.", "Students describe flow and container shape without saying the water vanished or has no shape.", "Trace the visible boundary of the liquid and compare it with the container wall."),
      checkpointIds: ["checkpoint-properties"], differentiationRefs: ["support", "core", "extend"], elaborationIds: ["E1"]
    },
    {
      id: "slide-5", title: "Watch water change state", purpose: "Observe melting and freezing in a sealed bag",
      display: { modelIds: ["sealed-bag-change"], studentPrompt: "What changed? What stayed inside the bag?", keyText: ["Ice: solid water", "Liquid water", "Same material"] },
      teacherLayer: teacherLayer("Show or begin the sealed-bag investigation and record the starting state.", "Where is the water before, during and after melting?", "Draw and label observations at timed intervals.", "Students track the same water through both states.", "Point to the sealed boundary and label every visible stage water."),
      checkpointIds: [], differentiationRefs: ["support", "core"], elaborationIds: ["E2"]
    },
    {
      id: "slide-6", title: "Heat direction explains the change", purpose: "Link added and removed heat to melting and freezing",
      display: { modelIds: ["heat-direction-cycle"], studentPrompt: "Which way is heat transferred for each arrow?", keyText: ["Heat added: melting", "Heat removed: freezing"] },
      teacherLayer: teacherLayer("Trace each arrow with a finger and pair it with ice, butter or chocolate observations.", "What happens when heat is added? What happens when heat is transferred away?", "Complete both state-change sentences.", "Both process names and heat directions are matched correctly.", "Teach one arrow at a time and avoid saying cold is added."),
      checkpointIds: ["checkpoint-heat"], differentiationRefs: ["support", "core", "extend"], elaborationIds: ["E3"]
    },
    {
      id: "slide-7", title: "The material is still there", purpose: "Explain reversibility and material continuity",
      display: { modelIds: ["sealed-bag-change", "heat-direction-cycle"], studentPrompt: "Did melting make a new material?", keyText: ["State changes", "Material stays the same", "The change can be reversed"] },
      teacherLayer: teacherLayer("Compare the first and final ice stages in the sealed bag.", "What evidence shows that the water did not disappear or become a different material?", "Explain the full melt-freeze cycle.", "Students distinguish state from material identity.", "Keep the word water visible under both solid and liquid labels."),
      checkpointIds: ["checkpoint-change"], differentiationRefs: ["support", "core", "extend"], elaborationIds: ["E2", "E3"]
    },
    {
      id: "slide-8", title: "Investigate and record evidence", purpose: "Conduct a fair, observable comparison",
      display: { modelIds: ["sealed-bag-change"], studentPrompt: "What will we observe, keep the same and record?", keyText: ["Observe safely", "Record time and state", "Compare evidence"] },
      teacherLayer: teacherLayer("Set equal sealed samples in warmer and cooler safe locations and provide a recording table.", "Which conditions should stay the same so the comparison is useful?", "Predict, observe at set times and record using words or drawings.", "Records identify state, visible amount and time; comparisons change one main condition.", "Reduce the table to before and after, then model one objective observation."),
      checkpointIds: ["checkpoint-investigation"], differentiationRefs: ["support", "core", "extend"], elaborationIds: ["E2", "E3"]
    },
    {
      id: "slide-9", title: "Useful changes in natural materials", purpose: "Teach the First Nations elaboration respectfully and within evidence",
      display: { modelIds: ["useful-state-changes"], studentPrompt: "How can careful warming make a material useful?", keyText: ["Beeswax and some resins", "Warmed to soften or melt", "Cooled to hold a form"] },
      teacherLayer: teacherLayer("Use an attributed local or authoritative example where available; otherwise discuss the general curriculum example without claiming one practice for all communities.", "Why might softening a material help someone shape, join or repair an object?", "Sequence warming, using and cooling the material.", "Students explain the usefulness of the physical change and avoid generalising cultures.", "Restate that First Nations peoples and practices are diverse and use a verified source before naming a specific community practice."),
      checkpointIds: [], differentiationRefs: ["support", "core", "extend"], elaborationIds: ["E4"]
    },
    {
      id: "slide-10", title: "Changing state can support recycling", purpose: "Apply the reversible state-change model to recycling",
      display: { modelIds: ["useful-state-changes", "heat-direction-cycle"], studentPrompt: "Why are heating and cooling both useful?", keyText: ["Sort", "Heat with specialist equipment", "Shape", "Cool to solid"] },
      teacherLayer: teacherLayer("Model a simplified glass recycling sequence and note that different plastics require different processes.", "At which step can the material take a new shape? When does it hold that shape?", "Order the recycling stages and justify each state.", "Students connect workable or liquid material with shaping and solid material with holding form.", "Return to the state-change arrows and keep safety and material sorting explicit."),
      checkpointIds: ["checkpoint-applications"], differentiationRefs: ["support", "core", "extend"], elaborationIds: ["E5"]
    },
    {
      id: "slide-11", title: "Common ideas to repair", purpose: "Confront misconceptions using observable evidence",
      display: { modelIds: ["solid-liquid-compare", "sealed-bag-change"], studentPrompt: "Which claim needs correcting?", keyText: ["Soft things can be solids", "Liquids have a container-shaped boundary", "Melting does not make the material disappear", "Heat is removed during freezing"] },
      teacherLayer: teacherLayer("Read one misconception at a time and ask students to correct it with a model.", "What observation proves that claim is not always true?", "Choose a model and state the corrected idea.", "Corrections include both a claim and observable evidence.", "Offer the sentence frame: I disagree because the model shows __."),
      checkpointIds: [], differentiationRefs: ["support", "core", "extend"], elaborationIds: ["E1", "E2", "E3"]
    },
    {
      id: "slide-12", title: "Show what you know", purpose: "Check classification and both directions of state change",
      display: { modelIds: ["solid-liquid-compare", "heat-direction-cycle"], studentPrompt: "Classify, explain and support your answer with evidence.", keyText: ["Property", "State", "Heat direction", "Change"] },
      teacherLayer: teacherLayer("Present the final oil-and-ice prompt and allow oral, drawn or written responses.", "What property supports each classification? What happens in both heat directions?", "Complete the mastery response independently.", "Every classification has observable evidence and both arrows are explained accurately.", "Reassess one part at a time after revisiting the matching model."),
      checkpointIds: ["mastery-final"], differentiationRefs: ["support", "core", "extend"], elaborationIds: ["E1", "E2", "E3", "E5"]
    }
  ];

  window.skillrLesson = {
    schemaVersion: "1.1",
    code: "AC9S3U04",
    year: "Year 3",
    subject: "Science",
    title: "Solids, liquids and changes of state",
    subtitle: "Observe properties, investigate heat transfer and explain reversible changes",
    contentDescription: "investigate the observable properties of solids and liquids and how adding or removing heat energy leads to a change of state",
    lessonTime: "Two 45-minute lessons plus observation time for freezing",
    learningIntention: "We are learning to classify solids and liquids by observable properties and explain how adding or removing heat energy can change their state.",
    successCriteria: [
      "I can classify a substance as a solid or liquid using evidence about shape and flow.",
      "I can explain that adding heat can cause melting and removing heat can cause freezing.",
      "I can record observations that show the same material changing state.",
      "I can explain one useful application of a controlled change of state."
    ],
    materials: ["clear containers", "water", "ice cubes", "seal-lock bags", "tray", "wooden block", "sponge", "timer", "observation table", "optional butter or chocolate demonstration managed by the teacher"],
    conceptBoundary: {
      mustTeach: [
        "Solids keep their own shape; liquids flow and take the shape of the part of a container they occupy.",
        "Adding heat energy can change a solid to a liquid by melting.",
        "Removing heat energy can change a liquid to a solid by freezing.",
        "A change of state can be reversed and the material remains the same material.",
        "All five curriculum elaborations are taught through observable examples and evidence."
      ],
      prerequisites: ["Name familiar materials", "Make and record simple observations", "Follow safe teacher-directed investigation procedures"],
      maySupportInformally: ["Matter takes up space and has mass", "Gases are another state studied more fully later", "Temperature observations can support, but do not replace, heat-transfer explanations"],
      mustNotOverteach: ["Formal particle theory", "Gas laws or detailed gas properties", "Latent heat, molecular bonding or chemical equations", "Boiling, evaporation and condensation as assessed targets", "Claims that every plastic can be safely melted and recycled in the same way"]
    },
    teachingProgression: {
      name: "Observe → Compare → Investigate → Explain → Apply",
      reason: "Year 3 students build the state categories from visible behaviour, test a reversible change, then connect evidence to heat transfer and useful applications.",
      steps: [
        { id: "observe", purpose: "Notice shape and flow", teacherAction: "Move solids and liquids between containers", studentAction: "Describe only observable behaviour", modelIds: ["solid-liquid-compare"] },
        { id: "compare", purpose: "Classify from evidence", teacherAction: "Contrast examples and non-examples", studentAction: "Sort and justify classifications", modelIds: ["solid-liquid-compare"] },
        { id: "investigate", purpose: "Track a state change", teacherAction: "Guide the sealed-bag investigation", studentAction: "Predict, observe and record", modelIds: ["sealed-bag-change"] },
        { id: "explain", purpose: "Connect change to heat direction", teacherAction: "Model both state-change arrows", studentAction: "Explain melting and freezing", modelIds: ["heat-direction-cycle"] },
        { id: "apply", purpose: "Explain useful controlled changes", teacherAction: "Present attributed cultural and recycling contexts", studentAction: "Sequence and explain the use", modelIds: ["useful-state-changes"] }
      ]
    },
    models,
    elaborations: [
      {
        id: "E1", curriculumWording: "observing the properties of substances and classifying them as solids (that hold their shape) or liquids (that fill the bottom of containers)", plainLanguageConcept: "Classify from what a substance does when it is moved between containers.", teachingPurpose: "Build accurate solid and liquid categories from observable evidence.", modelIds: ["solid-liquid-compare"], teacherDoes: "Move contrasting examples between containers.", teacherSaysOrAsks: "What keeps its shape? What flows and fills the bottom?", studentDoes: "Observe, classify and justify.", whatToLookFor: "Shape and flow evidence.", ifIncorrect: "Use a soft solid and a thick liquid to disconfirm hard/wet rules.", checkpointIds: ["checkpoint-properties"], masteryEvidence: "Correct classifications supported by an observable property."
      },
      {
        id: "E2", curriculumWording: "investigating ice melting or water freezing in a sealed bag and explaining their observations", plainLanguageConcept: "The same water can be observed as solid ice and liquid water.", teachingPurpose: "Use a contained investigation to show material continuity and reversibility.", modelIds: ["sealed-bag-change"], teacherDoes: "Guide timed observations of a sealed sample.", teacherSaysOrAsks: "What changed and what stayed the same?", studentDoes: "Predict, observe, draw and explain.", whatToLookFor: "Water is tracked through both states.", ifIncorrect: "Label every stage water and trace it inside the sealed boundary.", checkpointIds: ["checkpoint-change", "checkpoint-investigation"], masteryEvidence: "An evidence-based explanation of the state change."
      },
      {
        id: "E3", curriculumWording: "using ice cubes, butter or chocolate to explore how changes of state involve the removal of heat or the addition of heat", plainLanguageConcept: "Heat direction determines whether melting or freezing can occur.", teachingPurpose: "Explain observed changes using added or removed heat energy.", modelIds: ["heat-direction-cycle", "sealed-bag-change"], teacherDoes: "Compare safe heating and cooling examples.", teacherSaysOrAsks: "Where is heat transferred in each change?", studentDoes: "Match each heat direction to a process and state.", whatToLookFor: "Added heat with melting; removed heat with freezing.", ifIncorrect: "Teach one arrow at a time and remove 'cold is added' language.", checkpointIds: ["checkpoint-heat"], masteryEvidence: "Both change directions are named and explained accurately."
      },
      {
        id: "E4", curriculumWording: "investigating how changes of state in materials used by First Nations Australians such as beeswax or resins are important for their use", plainLanguageConcept: "Careful warming and cooling can make some natural materials easier to shape, join or use.", teachingPurpose: "Connect state change to a respectful, evidence-based First Nations context.", modelIds: ["useful-state-changes"], teacherDoes: "Use an authoritative or locally attributed example and acknowledge diversity.", teacherSaysOrAsks: "How does changing the material's state make this use possible?", studentDoes: "Sequence warming, use and cooling.", whatToLookFor: "A scientific explanation without cultural generalisation.", ifIncorrect: "Return to the verified source and separate evidence from assumptions.", checkpointIds: [], masteryEvidence: "The student explains why the controlled physical change is useful."
      },
      {
        id: "E5", curriculumWording: "exploring how changes from solid to liquid and liquid to solid can help us recycle materials such as glass or plastics", plainLanguageConcept: "Some sorted materials can be heated until workable and cooled into a new solid form.", teachingPurpose: "Apply both state-change directions to recycling.", modelIds: ["useful-state-changes", "heat-direction-cycle"], teacherDoes: "Model a simplified specialist recycling sequence.", teacherSaysOrAsks: "When can the material be shaped, and when does it hold the new shape?", studentDoes: "Order and explain the stages.", whatToLookFor: "Heating and cooling have distinct useful roles.", ifIncorrect: "Match each recycling stage to the two-arrow state model.", checkpointIds: ["checkpoint-applications"], masteryEvidence: "A correct heat-shape-cool explanation with appropriate material safety limits."
      }
    ],
    workedExamples: [
      {
        id: "classify-honey-block",
        title: "Classify by behaviour, not by speed or hardness",
        prompt: "Honey flows slowly. A sponge is soft. Which is the liquid and which is the solid?",
        steps: ["Move each between containers", "Observe whether it flows or keeps its own shape", "Honey is a liquid; the sponge is a solid"],
        teacherLanguage: "Slow flow is still flow. Softness does not stop a material from being a solid.",
        modelIds: ["solid-liquid-compare"]
      },
      {
        id: "explain-ice-cycle",
        title: "Explain a reversible change",
        prompt: "An ice cube melts, then the water is frozen again.",
        steps: ["Ice begins as solid water", "Added heat causes melting", "Removed heat causes freezing", "The material remains water"],
        teacherLanguage: "Name the state, the direction of heat transfer and the process at each arrow.",
        modelIds: ["sealed-bag-change", "heat-direction-cycle"]
      }
    ],
    misconceptions: [
      { misconception: "All solids are hard.", cause: "Familiar classroom solids are often rigid.", evidence: "A sponge or modelling clay keeps its own shape without flowing.", remediation: "Classify using shape and flow rather than hardness." },
      { misconception: "A liquid has no shape.", cause: "Everyday shorthand omits the container relationship.", evidence: "Its visible boundary follows the occupied part of its container.", remediation: "Say a liquid does not keep its own shape; it takes a container-shaped boundary." },
      { misconception: "Ice disappears when it melts.", cause: "The solid form is no longer visible.", evidence: "Liquid water remains inside the sealed bag.", remediation: "Label both stages water and compare before-and-after records." },
      { misconception: "Cold is added to freeze water.", cause: "Everyday language treats cold as a substance.", evidence: "Heat energy transfers from the water to cooler surroundings.", remediation: "Use the phrase heat removed or transferred away." }
    ],
    warmUp: {
      title: "Keep shape or flow?",
      duration: "5 minutes",
      instructions: ["Show six familiar substances or photographs", "Students signal keep shape or flow", "Ask one student to justify each choice with an observable property"],
      safety: "Teacher handles all liquids and food materials; do not taste investigation materials.",
      evidence: "Students use shape and flow language rather than hard, soft, wet or dry alone."
    },
    differentiation: {
      support: { adaptation: "Use one obvious solid and one familiar liquid, oral sentence frames and before/after picture cards.", modelIds: ["solid-liquid-compare", "sealed-bag-change"], boundaryCheck: "Keeps the same classification and heat-transfer target." },
      core: { adaptation: "Classify varied examples, complete the sealed-bag record and explain both state-change directions.", modelIds: ["solid-liquid-compare", "sealed-bag-change", "heat-direction-cycle"], boundaryCheck: "Directly assesses AC9S3U04." },
      extend: { adaptation: "Evaluate an unfamiliar thick liquid or soft solid and improve the investigation record or fair comparison.", modelIds: ["solid-liquid-compare", "sealed-bag-change"], boundaryCheck: "Deepens evidence and reasoning without introducing formal particles or gas laws." }
    },
    slides,
    masteryItems,
    references: [
      { title: "Australian Curriculum Version 9.0: AC9S3U04", url: "https://v9.australiancurriculum.edu.au/", purpose: "Authoritative content description and elaborations" },
      { title: "AIATSIS Guide to evaluating and selecting education resources", url: "https://aiatsis.gov.au/education/guide-evaluating-and-selecting-education-resources", purpose: "Cultural resource selection and attribution guidance" }
    ],
    resourceLinks: {
      topicGuide: "/year3/science/ac9s3u04-investigate-the-observable-properties-of-solids-and-liquids-and/",
      teacherSlides: "/year3/science/ac9s3u04-investigate-the-observable-properties-of-solids-and-liquids-and/teacher-deck/",
      worksheet: "/quiz/year-3/science/ac9s3u04/worksheet/",
      practice: "/quiz/year-3/science/ac9s3u04/practice/",
      test: "/quiz/year-3/science/ac9s3u04/test/"
    },
    review: {
      conceptAccurate: true,
      elaborationCoverage: ["E1", "E2", "E3", "E4", "E5"],
      topicSlideParity: "pending renderer validation",
      visualQA: "pending rendered human review",
      assessmentBoundary: "Questions must not assess gas properties, particle theory or unsupported cultural claims."
    }
  };
})();