(() => {
  "use strict";

  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[char]));
  const q = (type, question, extra = {}) => ({ type, question, ...extra });
  const board = (html) => `<div class="y2-vector-board">${html}</div>`;
  const tiles = (items) => `<div class="y2-vector-row">${items.map((item) => `<span class="y2-vector-tile">${esc(item)}</span>`).join("")}</div>`;
  const flow = (items) => `<div class="y2-vector-flow">${items.map((item, index) => `<span>${esc(item)}</span>${index < items.length - 1 ? '<b>→</b>' : ''}`).join("")}</div>`;
  const timeline = (items) => `<div class="y2-vector-timeline">${items.map((item) => `<div><i></i><strong>${esc(item[0])}</strong><small>${esc(item[1])}</small></div>`).join("")}</div>`;
  const table = (rows) => `<div class="y2-vector-table">${rows.flatMap((row) => row.map((cell) => `<span>${esc(cell)}</span>`)).join("")}</div>`;
  const orbit = () => `<div class="y2-orbit" role="img" aria-label="Sun, Earth and Moon model"><div class="sun">Sun</div><div class="earth-orbit"><div class="earth">Earth<div class="moon-orbit"><span>Moon</span></div></div></div></div>`;
  const soundWave = () => `<div class="y2-sound-model" role="img" aria-label="Vibrating object making sound"><div class="string"><span></span></div><div class="waves"><i></i><i></i><i></i></div><strong>vibration → sound</strong></div>`;
  const materialChange = () => `<div class="y2-material-model"><span class="material-strip">straight</span><b>→ bend →</b><span class="material-strip bent">bent</span><b>→ twist →</b><span class="material-strip twisted">twisted</span></div>`;
  const safety = () => `<div class="y2-safety-model"><span>1. Ask</span><span>2. Plan</span><span>3. Check safety</span><span>4. Test fairly</span><span>5. Record</span></div>`;
  const report = () => `<div class="y2-report-model"><div><strong>Question</strong><span>What did we test?</span></div><div><strong>Observation</strong><span>What did we notice?</span></div><div><strong>Finding</strong><span>What does the evidence show?</span></div></div>`;

  const UNITS = {
    AC9S2U01: {
      slug: "ac9s2u01-earth-is-a-planet-in-the-solar-system-and-identify",
      title: "Earth and Patterns in the Sky",
      subtitle: "Recognise Earth as a planet and observe repeating sky patterns",
      desc: "recognise Earth is a planet in the solar system and identify patterns in the changing position of the sun, moon, planets and stars in the sky",
      routine: "Observe → Compare → Record → Find a pattern → Explain",
      learn: "Earth is a planet in the solar system. From Earth, the Sun, Moon, planets and stars appear in different positions at different times, and many of these changes follow repeating patterns.",
      model_title: "Place Earth in a simple solar-system model",
      model_html: board(`${orbit()}<p>The Sun is a star. Earth travels around the Sun, and the Moon travels around Earth.</p>`),
      apply_title: "Track an apparent sky pattern",
      apply_html: board(`${timeline([["Morning","Sun appears low"],["Middle of day","Sun appears higher"],["Evening","Sun appears low again"]])}<p>We describe what appears to change in the sky and record observations safely from the ground.</p>`),
      hero_visual: board(`${orbit()}${timeline([["morning","east"],["midday","high"],["evening","west"]])}`),
      quick_visuals: [{ label: "Solar system", html: orbit() }, { label: "Sky pattern", html: timeline([["morning","low"],["midday","high"],["evening","low"]]) }, { label: "Remember", html: tiles(["Sun = star","Earth = planet","Moon = natural satellite"]) }],
      activities: [
        { title: "Shadow watch", text: "Mark the end of a safe outdoor shadow at two or three different times and compare its direction and length.", visual_html: timeline([["first mark","long"],["later mark","shorter"],["final mark","longer"]]) },
        { title: "Sky diary", text: "Draw the Moon or bright sky objects on several evenings and note the date and position.", visual_html: tiles(["date","drawing","position","pattern"]) },
        { title: "Orbit model", text: "Use three labelled circles to model the Sun, Earth and Moon and describe which object travels around which.", visual_html: orbit() }
      ],
      mistakes: [["Calling Earth a star", "Earth is a planet; the Sun is the nearest star."], ["Saying the Sun disappears", "Earth turns, so our location faces toward or away from the Sun."], ["Looking directly at the Sun", "Never look directly at the Sun; use shadows or teacher-provided images instead."]],
      quick: ["Is Earth a planet or a star?", "What travels around Earth?", "Describe one repeating pattern seen in the sky.", "Why must we never look directly at the Sun?"],
      mastery: ["Identify Earth as a planet", "Identify the Sun as a star", "Describe the Moon's relationship to Earth", "Record sky observations", "Recognise repeating patterns"],
      worksheet: [
        q("single", "Which statement is correct?", { answers: ["Earth is a planet", "Earth is a star", "The Moon is the Sun", "The Sun travels around Earth each day"] }),
        q("fill-blank", "Complete the sentence.", { template: "The {{blank}} is a star and Earth is a planet." }),
        q("single", "Which object travels around Earth?", { answers: ["the Moon", "the Sun every day", "all stars", "no object"] }),
        q("text", "Describe one way the apparent position of the Sun changes from morning to evening."),
        q("match", "Match each object to its description.", { matchLeft: ["Sun", "Earth", "Moon"], matchRight: ["planet", "star", "natural satellite of Earth"] }),
        q("text", "Explain a safe way to investigate a daily Sun pattern without looking at the Sun."),
        q("fill-blank", "Complete the pattern.", { template: "morning → middle of day → {{blank}}" }),
        q("text", "A student says the Sun switches off at night. Explain the better scientific idea."),
        q("text", "Design a three-day sky observation diary. State what you would record and how you would look for a pattern.", { enrichment: true }),
        q("text", "Use a labelled model to explain the relationships among the Sun, Earth and Moon.", { enrichment: true })
      ]
    },

    AC9S2U02: {
      slug: "ac9s2u02-different-actions-to-make-sounds-and-how-to-make-a",
      title: "Sound and Vibration",
      subtitle: "Explore actions that make sounds and observe vibrating objects",
      desc: "explore different actions to make sounds and how to make a variety of sounds, and recognise that sound energy causes objects to vibrate",
      routine: "Make sound → Observe vibration → Change action → Compare sound",
      learn: "Sounds are produced when objects vibrate. Plucking, striking, shaking, blowing or rubbing can start vibrations, and changing the vibration can change the sound.",
      model_title: "Connect a vibration to a sound",
      model_html: board(`${soundWave()}<p>A ruler, string, drum skin or elastic band moves back and forth while it makes sound.</p>`),
      apply_title: "Change the action and compare the sound",
      apply_html: board(`${tiles(["pluck gently","pluck strongly","short string","long string"])}<p>Change one feature, listen carefully and describe what changed.</p>`),
      hero_visual: board(`${soundWave()}${flow(["pluck","vibrate","hear sound"])}`),
      quick_visuals: [{ label: "Cause", html: soundWave() }, { label: "Actions", html: tiles(["strike","shake","pluck","blow"]) }, { label: "Compare", html: tiles(["loud/soft","high/low","long/short"]) }],
      activities: [
        { title: "Elastic-band guitar", text: "Pluck elastic bands safely and observe the movement before changing the tension.", visual_html: soundWave() },
        { title: "Sound action sort", text: "Sort instruments or objects by whether they are struck, shaken, plucked, blown or rubbed.", visual_html: tiles(["drum: strike","bell: shake","string: pluck","whistle: blow"]) },
        { title: "One-change comparison", text: "Change only one feature, such as string length, and describe how the sound changes.", visual_html: flow(["same object","change length","compare sound"]) }
      ],
      mistakes: [["Sound without vibration", "Look or feel carefully: the sound-making object vibrates, even when the movement is small."], ["Changing many things at once", "Change one feature so the comparison is useful."], ["Calling loud and high the same", "Loud/soft describes volume; high/low describes pitch."]],
      quick: ["What must an object do to make sound?", "Name two actions that can start vibrations.", "What is the difference between loud and high?", "Why change only one feature in a comparison?"],
      mastery: ["Identify vibration", "Name sound-making actions", "Compare sounds", "Change one feature", "Use loud/soft and high/low correctly"],
      worksheet: [
        q("single", "What usually happens when an object makes sound?", { answers: ["It vibrates", "It becomes a new material", "It stops moving forever", "It must become hot"] }),
        q("fill-blank", "Complete the cause-and-effect sentence.", { template: "A vibrating object can produce {{blank}}." }),
        q("single", "Which action is most likely to make a drum sound?", { answers: ["striking it", "looking at it", "covering it with paper", "placing it still"] }),
        q("text", "Describe how you could use an elastic band to observe vibration."),
        q("match", "Match each object to a sound-making action.", { matchLeft: ["drum", "maraca", "guitar string"], matchRight: ["pluck", "strike", "shake"] }),
        q("text", "Explain the difference between a loud sound and a high sound."),
        q("fill-blank", "For a fair comparison, change only {{blank}} feature at a time.", { template: "For a fair comparison, change only {{blank}} feature at a time." }),
        q("text", "A student says a ruler cannot be moving because the vibration is too fast to see clearly. Explain."),
        q("text", "Plan a safe investigation that compares the sounds made by a long and a short vibrating string.", { enrichment: true }),
        q("text", "Create a labelled cause-and-effect diagram showing an action, a vibration and a sound.", { enrichment: true })
      ]
    },

    AC9S2U03: {
      slug: "ac9s2u03-that-materials-can-be-changed-physically-without-changing-their",
      title: "Physical Changes to Materials",
      subtitle: "Bend, twist, stretch and break materials while recognising what stays the same",
      desc: "recognise that materials can be changed physically without changing their material composition and explore the effect of different actions on materials including bending, twisting, stretching and breaking into smaller pieces",
      routine: "Identify material → Apply action → Observe change → Decide what stayed the same",
      learn: "A material can change shape or size without becoming a different material. Bending, twisting, stretching and breaking into smaller pieces are physical changes.",
      model_title: "Change shape while keeping the same material",
      model_html: board(`${materialChange()}<p>The object looks different, but it is still made from the same material.</p>`),
      apply_title: "Compare the effects of different actions",
      apply_html: board(`${table([["Action","Effect"],["bend","changes direction"],["stretch","becomes longer"],["break","smaller pieces"]])}<p>Describe the action and the observable result.</p>`),
      hero_visual: board(`${materialChange()}${tiles(["bend","twist","stretch","break"])}`),
      quick_visuals: [{ label: "Actions", html: materialChange() }, { label: "Observe", html: table([["before","after"],["straight","bent"],["whole","pieces"]]) }, { label: "Remember", html: tiles(["shape may change","size may change","material stays the same"]) }],
      activities: [
        { title: "Action stations", text: "Safely bend paper, twist modelling clay and stretch an elastic material, then record each effect.", visual_html: tiles(["paper: bend","clay: twist","elastic: stretch"]) },
        { title: "Before-and-after draw", text: "Draw an object before and after a physical change and label what changed.", visual_html: flow(["before","action","after"]) },
        { title: "Material detective", text: "Decide whether the material stayed the same after cutting, folding or breaking.", visual_html: tiles(["paper → pieces","clay → new shape","foil → folded"]) }
      ],
      mistakes: [["Shape change means new material", "A bent paper strip is still paper."], ["Action and effect mixed", "Name the action first, then describe the result."], ["Unsafe breaking or stretching", "Only use teacher-approved materials and procedures."]],
      quick: ["Is folded paper still paper?", "What can stretching change?", "Give an example of breaking into smaller pieces.", "What must be checked before changing a material?"],
      mastery: ["Identify material", "Describe bending", "Describe twisting and stretching", "Describe breaking", "Explain what stays the same"],
      worksheet: [
        q("single", "Which is a physical change?", { answers: ["folding paper", "turning paper into glass", "making water into metal", "changing wood into plastic"] }),
        q("fill-blank", "Complete the sentence.", { template: "A bent paper strip is still made of {{blank}}." }),
        q("single", "Which action usually makes an elastic band longer?", { answers: ["stretching", "looking", "labeling", "cooling without touching"] }),
        q("text", "Describe one difference between bending and breaking a material."),
        q("match", "Match each action to an effect.", { matchLeft: ["bend", "twist", "break"], matchRight: ["turn around itself", "form smaller pieces", "change direction or curve"] }),
        q("text", "Explain why cutting paper changes its size but not its material composition."),
        q("fill-blank", "A physical change can alter shape or {{blank}} while the material stays the same.", { template: "A physical change can alter shape or {{blank}} while the material stays the same." }),
        q("text", "A student says a clay snake is a different material from a clay ball. Correct the idea."),
        q("text", "Plan a comparison of how two materials respond to the same bending action.", { enrichment: true }),
        q("text", "Create a four-step diagram showing one material undergoing two different physical changes.", { enrichment: true })
      ]
    },

    AC9S2H01: {
      slug: "ac9s2h01-how-people-use-science-in-their-daily-lives-including-using",
      title: "Science in Daily Life",
      subtitle: "Describe everyday uses of science and use patterns to make predictions",
      desc: "describe how people use science in their daily lives, including using patterns to make scientific predictions",
      routine: "Notice need → Use science → Observe pattern → Predict → Check",
      learn: "People use science to solve problems, make choices and predict what may happen. Predictions are stronger when they are based on an observed pattern or previous evidence.",
      model_title: "Connect a daily need to scientific knowledge",
      model_html: board(`${tiles(["weather forecast","food storage","safe materials","plant care"])}<p>Scientific knowledge helps people make informed choices.</p>`),
      apply_title: "Use a pattern to make a prediction",
      apply_html: board(`${timeline([["Day 1","shadow short at noon"],["Day 2","shadow short at noon"],["Prediction","similar pattern tomorrow"]])}<p>A prediction is not a guess without reason; it uses a pattern or experience.</p>`),
      hero_visual: board(`${flow(["observe pattern","predict","check evidence"])}${tiles(["home","school","community"])}`),
      quick_visuals: [{ label: "Use", html: tiles(["cook safely","choose materials","predict weather"]) }, { label: "Pattern", html: flow(["observe","repeat","predict"]) }, { label: "Evidence", html: tiles(["records","measurements","past observations"]) }],
      activities: [
        { title: "Daily science hunt", text: "Find examples of science helping at home, school or in the community.", visual_html: tiles(["fridge","umbrella","helmet","garden"]) },
        { title: "Pattern prediction", text: "Use a short sequence of observations to predict the next likely result.", visual_html: flow(["wet ground","dark clouds","prediction: rain may continue"]) },
        { title: "Check the prediction", text: "Compare what was predicted with what actually happened and discuss the evidence.", visual_html: table([["prediction","observation"],["likely rain","light rain"]]) }
      ],
      mistakes: [["Prediction means random guess", "Give a reason based on a pattern or previous observation."], ["Science only happens in laboratories", "Science is used in homes, schools, farms, hospitals and many jobs."], ["One observation proves a pattern", "Look for repeated evidence before claiming a pattern."]],
      quick: ["Name one daily use of science.", "What makes a prediction scientific?", "Why repeat observations?", "How can people check a prediction?"],
      mastery: ["Identify daily science uses", "Recognise patterns", "Make evidence-based predictions", "Check predictions", "Explain science decisions"],
      worksheet: [
        q("single", "Which is an everyday use of science?", { answers: ["using a weather forecast to plan", "choosing randomly every time", "ignoring evidence", "refusing to observe"] }),
        q("fill-blank", "Complete the sentence.", { template: "A scientific prediction should use a pattern or previous {{blank}}." }),
        q("single", "Which prediction has the best reason?", { answers: ["The shadow may be shorter at noon because that happened on several clear days", "It will rain because I chose blue", "The plant will grow because I said so", "Any result is equally likely without checking"] }),
        q("text", "Describe one way science is used in your school or home."),
        q("match", "Match the science use to the need.", { matchLeft: ["weather forecast", "refrigerator", "helmet design"], matchRight: ["protect a head", "keep food cool", "plan for conditions"] }),
        q("text", "Explain why repeated observations make a prediction stronger."),
        q("fill-blank", "Observe → find a pattern → make a {{blank}} → check.", { template: "Observe → find a pattern → make a {{blank}} → check." }),
        q("text", "A student calls every guess a scientific prediction. Explain the missing step."),
        q("text", "Choose a daily-life pattern and write a prediction, the evidence behind it and a way to check it.", { enrichment: true }),
        q("text", "Compare two possible decisions and explain how scientific evidence could help choose between them.", { enrichment: true })
      ]
    },

    AC9S2I01: {
      slug: "ac9s2i01-questions-to-explore-observed-simple-patterns-and-relationships",
      title: "Scientific Questions and Predictions",
      subtitle: "Pose investigable questions and predict using experience",
      desc: "pose questions to explore observed simple patterns and relationships and make predictions based on experiences",
      routine: "Notice → Ask → Predict → Give reason → Investigate",
      learn: "A useful scientific question can be explored by observing or testing. A prediction states what may happen and gives a reason based on experience or a pattern.",
      model_title: "Turn an observation into a testable question",
      model_html: board(`${flow(["Ice melts faster in sun","Which place melts ice faster?","I predict the sunny place"])}<p>The question identifies what will be compared.</p>`),
      apply_title: "Write a prediction with a reason",
      apply_html: board(`${tiles(["I predict...","because...","based on..."])}<p>A reason connects the prediction to previous evidence or experience.</p>`),
      hero_visual: board(`${flow(["observe","question","prediction","test"])}`),
      quick_visuals: [{ label: "Question", html: tiles(["What happens if...?","Which...?","How does...?"]) }, { label: "Prediction", html: tiles(["I predict","because","evidence"]) }, { label: "Test", html: flow(["compare","observe","record"]) }],
      activities: [
        { title: "Question sorter", text: "Sort questions into investigable and not yet investigable, then improve unclear questions.", visual_html: tiles(["Which paper absorbs most water?","Is blue the best colour?"]) },
        { title: "Prediction sentence", text: "Complete: I predict ___ because I observed ___.", visual_html: flow(["prediction","reason","evidence"]) },
        { title: "Pattern prompt", text: "Look at a simple repeated observation and pose a question about the relationship.", visual_html: table([["light","plant direction"],["left","leans left"],["right","leans right"]]) }
      ],
      mistakes: [["Question cannot be explored", "Ask about something observable or testable."], ["Prediction without reason", "Use because to connect the prediction to evidence."], ["Question already gives the answer", "Keep the question open until evidence is collected."]],
      quick: ["What makes a question investigable?", "Write a prediction using because.", "Turn one observation into a question.", "Why is a prediction different from a result?"],
      mastery: ["Notice patterns", "Pose investigable questions", "Make predictions", "Give evidence-based reasons", "Keep questions open"],
      worksheet: [
        q("single", "Which question can be investigated by a Year 2 class?", { answers: ["Which paper towel absorbs the most water?", "What is the best thing ever?", "Why is everything interesting?", "Can we know every answer?"] }),
        q("fill-blank", "Complete the prediction frame.", { template: "I predict {{blank}} because {{blank}}." }),
        q("single", "Which statement is a prediction?", { answers: ["I think the ice in sunlight will melt first", "The ice melted in 8 minutes", "We used two cups", "The table is brown"] }),
        q("text", "Write an investigable question about how light affects a shadow."),
        q("match", "Match each part to its role.", { matchLeft: ["observation", "question", "prediction"], matchRight: ["what may happen", "what was noticed", "what will be explored"] }),
        q("text", "Explain why a prediction should include a reason."),
        q("fill-blank", "Observation → question → {{blank}} → investigation.", { template: "Observation → question → {{blank}} → investigation." }),
        q("text", "A student writes, ‘The tall plant will win.’ Improve this into a scientific prediction."),
        q("text", "Create a question and prediction about one factor that may affect how quickly water dries.", { enrichment: true }),
        q("text", "Explain how the same observation could lead to two different useful scientific questions.", { enrichment: true })
      ]
    },

    AC9S2I02: {
      slug: "ac9s2i02-and-follow-safe-procedures-to-investigate-questions-and-test",
      title: "Planning Safe Investigations",
      subtitle: "Suggest safe procedures and test predictions fairly",
      desc: "suggest and follow safe procedures to investigate questions and test predictions",
      routine: "Question → Plan → Safety check → Fair test → Record",
      learn: "A good investigation follows clear steps, manages risks and makes a fair comparison. Students change one factor, keep other important conditions similar and record what happens.",
      model_title: "Plan before touching the materials",
      model_html: board(`${safety()}<p>The teacher checks materials, actions and risks before the test begins.</p>`),
      apply_title: "Make the comparison fair",
      apply_html: board(`${table([["Change","Keep same","Measure"],["amount of light","plant type and water","growth"]])}<p>Changing one factor helps link the result to that factor.</p>`),
      hero_visual: board(`${safety()}${flow(["one change","same conditions","fair comparison"])}`),
      quick_visuals: [{ label: "Plan", html: safety() }, { label: "Fair test", html: tiles(["change one","keep others same","measure result"]) }, { label: "Safety", html: tiles(["teacher check","protect eyes","wash hands","walk"]) }],
      activities: [
        { title: "Risk spotter", text: "Look at an investigation plan and identify unsafe or unclear steps.", visual_html: tiles(["spill","sharp edge","hot water","running"]) },
        { title: "Fair-test planner", text: "Choose one factor to change and list two conditions to keep the same.", visual_html: table([["change","same","same"],["light","water","plant type"]]) },
        { title: "Procedure ordering", text: "Put mixed investigation steps into a safe and logical order.", visual_html: flow(["prepare","test","observe","clean up"]) }
      ],
      mistakes: [["Starting before planning", "Agree on steps and safety first."], ["Changing several factors", "Change one factor for a clearer comparison."], ["Ignoring clean-up", "Safe procedures include clean-up and hand washing where needed."]],
      quick: ["What comes before testing?", "What makes a comparison fair?", "Name one safety step.", "Why record the procedure?"],
      mastery: ["Suggest procedures", "Identify risks", "Follow safety rules", "Plan fair comparisons", "Record steps"],
      worksheet: [
        q("single", "What should happen before an investigation begins?", { answers: ["plan and check safety", "change every factor", "guess the final result", "hide the materials"] }),
        q("fill-blank", "Complete the fair-test rule.", { template: "Change one factor and keep other important conditions {{blank}}." }),
        q("single", "Which is a safe classroom action?", { answers: ["follow the agreed procedure", "taste unknown materials", "run with equipment", "touch hot objects without permission"] }),
        q("text", "Write three ordered steps for a safe water-absorption test."),
        q("match", "Match each planning word to its meaning.", { matchLeft: ["risk", "procedure", "fair test"], matchRight: ["clear ordered steps", "possible harm", "comparison with controlled conditions"] }),
        q("text", "Explain why changing several things at once makes a result harder to interpret."),
        q("fill-blank", "Question → plan → safety check → test → {{blank}}.", { template: "Question → plan → safety check → test → {{blank}}." }),
        q("text", "A group starts pouring before reading the steps. Explain what they should do instead."),
        q("text", "Design a fair and safe investigation comparing how two paper types absorb water.", { enrichment: true }),
        q("text", "Evaluate a procedure that changes both water amount and container size. Explain how to improve it.", { enrichment: true })
      ]
    },

    AC9S2I03: {
      slug: "ac9s2i03-and-record-observations-including-informal-measurements-using",
      title: "Observing, Measuring and Recording",
      subtitle: "Make careful observations and record informal measurements",
      desc: "make and record observations, including informal measurements, using digital tools as appropriate",
      routine: "Observe → Measure → Record → Label → Review",
      learn: "Scientific observations describe what is noticed, while measurements add a quantity. Records should be clear enough for another person to understand what happened.",
      model_title: "Separate an observation from an inference",
      model_html: board(`${table([["Observation","Measurement"],["leaf is green","8 blocks long"],["water looks cloudy","3 cups"]])}<p>Record what can be seen or measured before explaining why.</p>`),
      apply_title: "Choose a suitable informal unit or digital tool",
      apply_html: board(`${tiles(["blocks for length","cups for capacity","photos for change","timer for duration"])}<p>Use the same unit throughout a comparison.</p>`),
      hero_visual: board(`${flow(["look closely","measure","record in table"])}`),
      quick_visuals: [{ label: "Observe", html: tiles(["colour","shape","movement","texture"]) }, { label: "Measure", html: tiles(["blocks","cups","handspans","counts"]) }, { label: "Record", html: table([["item","observation"],["leaf","green, 8 blocks"]]) }],
      activities: [
        { title: "Object observation", text: "Describe a natural object using colour, shape, texture and size without guessing its history.", visual_html: tiles(["green","oval","rough","6 blocks"]) },
        { title: "Informal measure", text: "Measure two classroom objects with identical blocks and compare the results.", visual_html: table([["pencil","7 blocks"],["book","12 blocks"]]) },
        { title: "Digital record", text: "Use a teacher-approved photo or table to record change across observations.", visual_html: timeline([["start","photo"],["later","photo"],["compare","notes"]]) }
      ],
      mistakes: [["Guessing instead of observing", "Record what can be seen or measured first."], ["Changing units", "Use identical units in one comparison."], ["Record lacks labels", "Include item, unit and observation clearly."]],
      quick: ["What is an observation?", "Give one informal measurement unit.", "Why keep units the same?", "What labels belong in a record?"],
      mastery: ["Observe carefully", "Use informal measurements", "Choose suitable tools", "Record in tables", "Separate observation from explanation"],
      worksheet: [
        q("single", "Which is an observation?", { answers: ["The leaf is green and rough", "The leaf is sad", "The leaf chose to grow", "The leaf remembers rain"] }),
        q("fill-blank", "Complete the measurement.", { template: "The pencil is 7 {{blank}} long." }),
        q("single", "Which is best for a fair informal length comparison?", { answers: ["identical blocks", "mixed coins and pencils", "different units for each object", "guessing"] }),
        q("text", "Write two observations and one informal measurement for a classroom object."),
        q("match", "Match the tool or unit to its use.", { matchLeft: ["blocks", "cups", "photo"], matchRight: ["record visible change", "measure informal capacity", "measure informal length"] }),
        q("text", "Explain why ‘the plant is thirsty’ is not a direct observation."),
        q("fill-blank", "A clear record includes the item, the observation and the {{blank}} used.", { template: "A clear record includes the item, the observation and the {{blank}} used." }),
        q("text", "A student measures one object in blocks and another in handspans. Explain the comparison problem."),
        q("text", "Design a table for recording three observations of a seedling over several days.", { enrichment: true }),
        q("text", "Compare when a drawing, photograph, tally or informal measurement would be the best record.", { enrichment: true })
      ]
    },

    AC9S2I04: {
      slug: "ac9s2i04-and-order-data-and-information-and-represent-patterns-including",
      title: "Sorting Data and Representing Patterns",
      subtitle: "Order information and show patterns with tables and models",
      desc: "sort and order data and information and represent patterns, including with provided tables and visual or physical models",
      routine: "Collect → Sort → Order → Represent → Describe pattern",
      learn: "Data becomes easier to understand when it is sorted into meaningful groups, placed in a useful order and represented in a table, sequence or model.",
      model_title: "Sort first, then look for a pattern",
      model_html: board(`${table([["Object","Category"],["feather","animal covering"],["leaf","plant part"],["stone","non-living"]])}<p>Use a clear rule for each category.</p>`),
      apply_title: "Order data to reveal change",
      apply_html: board(`${timeline([["Day 1","2 cm"],["Day 3","4 cm"],["Day 5","6 cm"]])}<p>Ordering by time reveals a growth pattern.</p>`),
      hero_visual: board(`${flow(["sort","order","table","pattern"])}`),
      quick_visuals: [{ label: "Sort", html: tiles(["same feature","different feature","clear categories"]) }, { label: "Order", html: timeline([["first","2"],["next","4"],["last","6"]]) }, { label: "Represent", html: table([["day","height"],["1","2"],["3","4"]]) }],
      activities: [
        { title: "Category sort", text: "Sort a set of observations using one clear rule and explain the categories.", visual_html: tiles(["living","non-living","plant","animal"]) },
        { title: "Order the evidence", text: "Arrange measurements from smallest to largest or earliest to latest.", visual_html: flow(["2 cm","4 cm","6 cm","8 cm"]) },
        { title: "Pattern model", text: "Represent a repeating or increasing pattern with a table or physical model.", visual_html: table([["step","count"],["1","2"],["2","4"],["3","6"]]) }
      ],
      mistakes: [["Categories overlap without reason", "Use a clear rule so each item has a sensible place."], ["Data left unordered", "Choose an order that helps answer the question."], ["Representation changes values", "Keep the original observations and counts accurate."]],
      quick: ["Why sort data?", "Give one useful ordering rule.", "What must stay accurate in a table?", "How can ordering reveal a pattern?"],
      mastery: ["Sort with a rule", "Order data", "Use tables", "Use visual models", "Describe patterns"],
      worksheet: [
        q("single", "Which is a clear sorting rule?", { answers: ["plant parts and animal coverings", "things I like and maybe things", "random piles", "changing the rule for each item"] }),
        q("fill-blank", "Complete the process.", { template: "Collect → sort → order → {{blank}} → describe." }),
        q("single", "Which order best shows growth over time?", { answers: ["earliest to latest", "random", "latest, earliest, middle", "by colour only"] }),
        q("text", "Sort leaf, feather, stone and shell using a clear rule of your choice."),
        q("match", "Match each representation to its strength.", { matchLeft: ["table", "timeline", "physical model"], matchRight: ["shows ordered events", "organises rows and columns", "shows a pattern with objects"] }),
        q("text", "Explain why values must not change when data is moved into a table."),
        q("fill-blank", "Day 1: 2 cm, Day 3: 4 cm, Day 5: {{blank}} cm follows a +2 pattern.", { template: "Day 1: 2 cm, Day 3: 4 cm, Day 5: {{blank}} cm follows a +2 pattern." }),
        q("text", "A student sorts by colour, then changes to size halfway through. Explain the problem."),
        q("text", "Create a table and a visual model for the same simple pattern, then compare them.", { enrichment: true }),
        q("text", "Design two different useful sorting rules for the same collection and explain what each reveals.", { enrichment: true })
      ]
    },

    AC9S2I05: {
      slug: "ac9s2i05-observations-with-predictions-and-others-observations-consider",
      title: "Comparing Evidence and Evaluating Investigations",
      subtitle: "Compare observations with predictions and consider fairness",
      desc: "compare observations with predictions and others’ observations, consider if investigations are fair and identify further questions with guidance",
      routine: "Compare → Check fairness → Explain difference → Ask next question",
      learn: "After an investigation, students compare predictions with observations, compare records with others, decide whether the procedure was fair and identify what could be explored next.",
      model_title: "Compare prediction and observation honestly",
      model_html: board(`${table([["Prediction","Observation"],["sunny cup dries first","sunny cup dried first"]])}<p>A prediction can be supported or not supported; both outcomes provide useful evidence.</p>`),
      apply_title: "Check whether the test was fair",
      apply_html: board(`${tiles(["one factor changed","same amount","same time","same measuring method"])}<p>Differences in method can explain different observations.</p>`),
      hero_visual: board(`${flow(["prediction","observation","compare","evaluate","new question"])}`),
      quick_visuals: [{ label: "Compare", html: table([["predicted","observed"],["faster","slower"]]) }, { label: "Fairness", html: tiles(["one change","same conditions","same measure"]) }, { label: "Next", html: tiles(["What else?","Why different?","How could we improve?"]) }],
      activities: [
        { title: "Prediction check", text: "Compare a written prediction with the recorded result and state whether it was supported.", visual_html: table([["prediction","result"],["paper A absorbs more","paper B absorbs more"]]) },
        { title: "Fair or unfair", text: "Identify the changed factors in two investigation descriptions.", visual_html: tiles(["same cups","different water","different time","fair?"]) },
        { title: "Observation conference", text: "Compare records with a partner and suggest reasons for any differences.", visual_html: flow(["share records","notice difference","check method"]) }
      ],
      mistakes: [["Changing the result to match prediction", "Record what actually happened."], ["Calling every difference an error", "Differences can come from method, measurement or real variation."], ["Fairness checked too late", "Plan fairness before testing and review it afterward."]],
      quick: ["What if a prediction is not supported?", "Name one fair-test feature.", "Why compare with others?", "Give a useful next question."],
      mastery: ["Compare prediction and result", "Compare observations", "Evaluate fairness", "Explain differences", "Pose further questions"],
      worksheet: [
        q("single", "What should a scientist do if the observation does not match the prediction?", { answers: ["record the observation honestly", "change the observation", "hide the result", "repeat the prediction as the answer"] }),
        q("fill-blank", "Complete the evaluation.", { template: "The prediction was {{blank}} or not supported by the observation." }),
        q("single", "Which feature supports a fair test?", { answers: ["only one important factor changed", "different time for every sample", "different measuring methods", "no record"] }),
        q("text", "Explain one reason two groups might record slightly different observations."),
        q("match", "Match each evaluation step to its purpose.", { matchLeft: ["compare", "check fairness", "ask further question"], matchRight: ["decide what to explore next", "look for agreement or difference", "review the procedure"] }),
        q("text", "Describe how to decide whether an investigation comparing two materials was fair."),
        q("fill-blank", "Prediction → observation → compare → evaluate → new {{blank}}.", { template: "Prediction → observation → compare → evaluate → new {{blank}}." }),
        q("text", "A student erases a result because it disagrees with the prediction. Explain why this is unscientific."),
        q("text", "Evaluate a test where one plant received more light and more water than another. Suggest an improved plan.", { enrichment: true }),
        q("text", "Use a surprising observation to write two useful follow-up questions.", { enrichment: true })
      ]
    },

    AC9S2I06: {
      slug: "ac9s2i06-and-create-texts-to-communicate-observations-findings-and-ideas",
      title: "Communicating Scientific Findings",
      subtitle: "Create clear texts using observations, evidence and scientific vocabulary",
      desc: "write and create texts to communicate observations, findings and ideas, using everyday and scientific vocabulary",
      routine: "Question → Method → Observation → Finding → Share",
      learn: "Scientific communication helps another person understand what was investigated, what was observed and what the evidence suggests. Labels, tables, diagrams and precise vocabulary improve clarity.",
      model_title: "Build a simple scientific report",
      model_html: board(`${report()}<p>Use short, accurate statements and connect findings to recorded evidence.</p>`),
      apply_title: "Choose the best text feature",
      apply_html: board(`${tiles(["labelled diagram","table","caption","oral explanation","short report"])}<p>The format should help the audience understand the evidence.</p>`),
      hero_visual: board(`${report()}${flow(["observe","record","explain","share"])}`),
      quick_visuals: [{ label: "Structure", html: report() }, { label: "Features", html: tiles(["title","labels","table","finding"]) }, { label: "Words", html: tiles(["observe","measure","evidence","vibrate","material"]) }],
      activities: [
        { title: "Label a diagram", text: "Add labels and a caption to a simple science model.", visual_html: tiles(["title","arrow","label","caption"]) },
        { title: "Evidence sentence", text: "Complete: We observed ___, so our finding is ___.", visual_html: flow(["observation","evidence","finding"]) },
        { title: "Audience check", text: "Swap reports and check whether another student can identify the question, observation and finding.", visual_html: tiles(["clear?","labelled?","evidence?","scientific words?"]) }
      ],
      mistakes: [["Finding without evidence", "Refer to an observation or measurement."], ["Too many vague words", "Use precise everyday and scientific vocabulary."], ["Diagram without labels", "Labels show what each part represents."]],
      quick: ["What belongs in a finding?", "Why label a diagram?", "Name one scientific word.", "How can you check whether a report is clear?"],
      mastery: ["State the question", "Record observations", "Write findings", "Use text features", "Use scientific vocabulary"],
      worksheet: [
        q("single", "Which sentence communicates a finding with evidence?", { answers: ["The sunny cup dried first; it was empty after 2 hours", "It was good", "I liked the cup", "Science happened"] }),
        q("fill-blank", "Complete the report structure.", { template: "Question → method → observation → {{blank}}." }),
        q("single", "Which feature helps identify parts of a diagram?", { answers: ["labels", "random colours only", "an unrelated joke", "missing arrows"] }),
        q("text", "Write one observation sentence and one finding sentence for a sound investigation."),
        q("match", "Match each feature to its purpose.", { matchLeft: ["table", "caption", "label"], matchRight: ["names a part", "organises data", "explains an image"] }),
        q("text", "Explain why a scientific finding should connect to evidence."),
        q("fill-blank", "A precise word for back-and-forth movement that makes sound is {{blank}}.", { template: "A precise word for back-and-forth movement that makes sound is {{blank}}." }),
        q("text", "A report says only ‘It worked.’ Rewrite it to communicate a useful observation."),
        q("text", "Create a labelled diagram and short report for a fair test of two paper towels.", { enrichment: true }),
        q("text", "Choose between a table, diagram and oral presentation for a set of findings, and justify your choice.", { enrichment: true })
      ]
    }
  };

  const ORDER = ["AC9S2U01", "AC9S2U02", "AC9S2U03", "AC9S2H01", "AC9S2I01", "AC9S2I02", "AC9S2I03", "AC9S2I04", "AC9S2I05", "AC9S2I06"];
  window.SkillrYear2ScienceOrder = ORDER;
  window.SkillrYear2ScienceData = Object.assign(window.SkillrYear2ScienceData || {}, UNITS);
  window.SkillrYear2ScienceWorksheetData = Object.assign(window.SkillrYear2ScienceWorksheetData || {}, Object.fromEntries(Object.entries(UNITS).map(([code, unit]) => [code, { title: unit.title, questions: unit.worksheet, yearLabel: "Year 2 Science" }])));
})();