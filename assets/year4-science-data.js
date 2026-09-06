(() => {
  "use strict";
  if (!window.SkillrYear4SubjectRegister) throw new Error("Year 4 subject data base is not loaded.");

  const S = {
    AC9S4U01:{
      slug:"ac9s4u01-explain-the-roles-and-interactions-of-consumers-producers-and",
      title:"Producers, Consumers, Decomposers and Food Chains",
      subtitle:"Trace feeding relationships and explain how organisms interact within a habitat",
      desc:"explain the roles and interactions of consumers, producers and decomposers within a habitat and how food chains represent feeding relationships",
      learn:"Students explain how producers make food, consumers obtain energy by eating and decomposers break down dead material. They read food-chain arrows as showing the direction of food and energy transfer.",
      modelTitle:"Trace energy through a food chain",
      modelType:"chain",
      model:["Sun","grass — producer","grasshopper — consumer","frog — consumer","snake — consumer"],
      modelNote:"The Sun supplies energy to the producer. Each arrow points from the food source to the organism that obtains energy from it; it does not mean ‘chases’. Decomposers act on dead material from every level.",
      applyTitle:"Predict effects within a habitat",
      applyType:"table",
      apply:[["Change","Likely effect","Reason"],["fewer grass plants","fewer grasshoppers","less food available"],["more frogs","pressure on grasshopper population","more consumers feeding"],["decomposers reduced","dead material builds up","slower nutrient recycling"]],
      applyNote:"Food chains are simplified parts of food webs. Predictions should identify a direct feeding relationship and recognise that habitats contain several interacting chains.",
      terms:[["producer","organism that makes its own food, usually using sunlight"],["consumer","organism that obtains energy by eating other organisms"],["decomposer","organism that breaks down dead material and returns nutrients"],["food chain","sequence representing feeding relationships"],["habitat","place that provides an organism’s needs"]],
      activities:[
        ["Build a food-web wall","Connect local plants and animals with arrows from food to eater; add decomposers to several chains.","chain",["Sun","plant","herbivore","predator","decomposer"]],
        ["Role-card investigation","Sort organisms as producer, consumer or decomposer and justify any organism that has more than one consumer role.","compare",[["producer","grass, algae"],["consumer","rabbit, fish, hawk"],["decomposer","fungi, bacteria"]]],
        ["Change-one-part model","Remove or increase one population in a model habitat and predict two direct and one indirect effect.","flow",["change population","trace feeding link","predict direct effect","look for indirect effect","state uncertainty"]]
      ],
      mistakes:[["Food-chain arrows point to the food","Arrows point from the food source toward the organism receiving energy."],["Decomposers are only at the end","They break down dead material from organisms at every feeding level."],["One food chain represents the whole habitat","Real habitats contain interconnected food webs."],["Every consumer is a predator","Herbivores and omnivores are also consumers."]],
      quick:["What role does grass have?","Explain the direction of a food-chain arrow.","Where do decomposers act?","Predict one effect of fewer producers.","Distinguish a food chain from a food web."],
      mastery:["Classify organism roles","Construct and read food chains","Explain arrow direction","Predict habitat interactions","Use evidence and acknowledge complexity"],
      questions:{
        choice1:["Which organism is a producer?",["grass","frog","hawk","fungus decomposing a log"]],
        fill1:["Complete the food-chain relationship.","grass → grasshopper means the grasshopper gets food and {{blank}} from the grass."],
        choice2:["What is the main role of decomposers?",["break down dead material and recycle nutrients","make sunlight","hunt every consumer","stop all decay"]],
        explain:"Explain why the arrows in grass → grasshopper → frog point in that direction.",
        fill2:["Complete the habitat prediction.","If producer numbers fall greatly, consumers may have less {{blank}} available."],
        apply:"A pond loses much of its algae. Predict effects on two connected organisms and explain the limits of the prediction.",
        enrichment1:"Create a food web with at least 8 organisms, including producers and decomposers. Trace three energy pathways and predict an indirect effect of one population change.",
        enrichment2:"Compare two possible explanations for a decline in a predator population. Identify what habitat data would be needed to decide between them."
      }
    },
    AC9S4U02:{
      slug:"ac9s4u02-sources-of-water-and-describe-key-processes-in-the-water",
      title:"Water Sources and the Water Cycle",
      subtitle:"Connect evaporation, condensation, precipitation and water movement across Earth",
      desc:"identify sources of water and describe key processes in the water cycle, including movement of water through the sky, landscape and ocean; precipitation; evaporation; and condensation",
      learn:"Students identify water in oceans, rivers, lakes, soil, ice, groundwater and the atmosphere, then explain how solar energy and gravity drive continuous movement through the water cycle.",
      modelTitle:"Follow one water particle through the cycle",
      modelType:"cycle",
      model:["ocean or lake","evaporation","condensation in clouds","precipitation","runoff / infiltration","collection"],
      modelNote:"Evaporation changes liquid water to water vapour. Cooling causes condensation into tiny droplets. Precipitation returns water to the surface, and gravity moves it downhill or into the ground.",
      applyTitle:"Connect processes to observations",
      applyType:"table",
      apply:[["Observation","Process or source","Evidence"],["puddle shrinks","evaporation","liquid water enters air as vapour"],["droplets outside cold glass","condensation","water vapour cools on surface"],["rain runs to creek","runoff","gravity moves water downhill"],["well supplies water","groundwater","water stored below surface"]],
      applyNote:"The water cycle has no single starting point. Local weather and landscapes change the pathways and rates, but the processes remain connected.",
      terms:[["evaporation","liquid water changes to water vapour"],["condensation","water vapour cools and forms liquid droplets"],["precipitation","water falls from clouds as rain, snow, sleet or hail"],["runoff","water flows across land"],["groundwater","water stored and moving below Earth’s surface"]],
      activities:[
        ["Bag water-cycle model","Observe sealed water warming, evaporating and condensing; label what the model represents and what it cannot show.","cycle",["warm liquid","vapour","cool surface","droplets","return"]],
        ["Water-source map","Classify visible and hidden sources of fresh and salt water in a landscape diagram.","compare",[["surface water","river, lake, ice"],["groundwater","aquifer, well"],["atmosphere","vapour, cloud droplets"],["ocean","largest saltwater store"]]],
        ["Process evidence stations","Use a cold container, wet cloth and sloped tray to observe condensation, evaporation and runoff.","flow",["observe","name process","record change","identify energy/gravity","explain"]]
      ],
      mistakes:[["Clouds are water vapour","Visible clouds contain tiny liquid droplets or ice crystals; water vapour is invisible."],["Evaporation only happens when boiling","Liquid water evaporates from its surface below boiling point."],["Droplets on a cold glass leak through","They form when water vapour in air condenses on the cool surface."],["The water cycle follows one fixed circle","Water can take many pathways and remain stored for different times."]],
      quick:["Name three water sources.","Explain evaporation and condensation.","What drives runoff?","Why are clouds visible?","Trace a water pathway from ocean to groundwater."],
      mastery:["Identify water stores","Explain key phase changes","Connect Sun and gravity","Interpret observations","Trace multiple cycle pathways"],
      questions:{
        choice1:["Which process changes liquid water into water vapour?",["evaporation","condensation","precipitation","runoff"]],
        fill1:["Complete the cloud process.","When water vapour cools, it can {{blank}} into tiny liquid droplets."],
        choice2:["Which statement best explains runoff?",["Gravity moves water across land toward lower places","Clouds pull water uphill","Water disappears permanently","Only ocean water can flow"]],
        explain:"Explain why droplets form on the outside of a cold drink container without water leaking through it.",
        fill2:["Complete the cycle pathway.","precipitation → runoff or infiltration → {{blank}} in rivers, groundwater or oceans"],
        apply:"Trace water from a mountain snowfield to the ocean and back to the atmosphere, naming processes and stores.",
        enrichment1:"Create a water-cycle model that includes surface water, groundwater, plants and the atmosphere. Explain two limitations of the model.",
        enrichment2:"Compare how the same water-cycle processes operate in a humid tropical location and a dry inland location. Separate stable science from location-dependent rates."
      }
    },
    AC9S4U03:{
      slug:"ac9s4u03-how-forces-can-be-exerted-by-one-object-on-another",
      title:"Frictional, Gravitational and Magnetic Forces",
      subtitle:"Investigate contact and non-contact forces and their effects on motion",
      desc:"identify how forces can be exerted by one object on another and investigate the effect of frictional, gravitational and magnetic forces on the motion of objects",
      learn:"Students describe forces as pushes or pulls between objects, distinguish contact from non-contact forces and use fair tests to investigate how friction, gravity and magnetism change motion.",
      modelTitle:"Compare three forces acting on motion",
      modelType:"compare",
      model:[["friction","contact force opposing sliding or rolling"],["gravity","non-contact attraction toward Earth"],["magnetic force","non-contact attraction or repulsion between suitable magnets/materials"]],
      modelNote:"Forces can start, stop, speed up, slow down or change direction. A force has both a direction and an effect; several forces may act at once.",
      applyTitle:"Plan fair force investigations",
      applyType:"table",
      apply:[["Question","Change","Measure","Keep same"],["Does surface affect slide distance?","surface material","distance travelled","object, slope, start point"],["Does magnet distance affect attraction?","gap","maximum attraction distance","magnets, object"],["Does ramp height affect speed?","height","time or distance","car, surface, release"]],
      applyNote:"A fair comparison changes one tested factor, measures an effect consistently and controls other relevant conditions. Repeat trials because motion can vary.",
      terms:[["force","push or pull between objects"],["friction","contact force that resists relative motion"],["gravity","attractive force between masses, observed near Earth as downward pull"],["magnetic force","attraction or repulsion involving magnets"],["motion","change in position over time"]],
      activities:[
        ["Surface-friction test","Release the same block or toy from the same point onto different surfaces and compare travel distance.","table",[["surface","trial 1","trial 2","trial 3"],["smooth","","",""] ,["rough","","",""]]],
        ["Magnetic-distance test","Increase the gap between a magnet and a paperclip, record the greatest attraction distance and repeat.","flow",["same magnet","change distance","observe attraction","repeat","compare"]],
        ["Force-arrow diagrams","Draw arrows showing direction and relative size of forces in a falling, sliding or stationary situation.","compare",[["falling object","gravity downward"],["sliding block","motion forward, friction backward"],["opposite magnet poles","attraction toward each other"]]]
      ],
      mistakes:[["A moving object must have a forward force","An object can continue moving while forces are balanced or after a push ends, although friction may slow it."],["Gravity only acts while falling","Gravity acts on objects whether they are falling, supported or moving sideways."],["All metals are magnetic","Only some materials, such as iron and many steels, respond strongly to common magnets."],["A fair test changes several things","Change one tested factor and control the others."]],
      quick:["Classify friction as contact or non-contact.","Give two effects of a force.","Why does gravity act on a book on a table?","Name one fair-test control.","Explain magnetic attraction and repulsion."],
      mastery:["Identify pushes and pulls","Distinguish force types","Use force directions","Plan fair investigations","Interpret repeated evidence"],
      questions:{
        choice1:["Which force usually opposes a sliding object?",["friction","magnetism only","light","sound"]],
        fill1:["Complete the gravity statement.","Near Earth, gravity pulls objects generally {{blank}} toward Earth."],
        choice2:["Which investigation is fairest for comparing surfaces?",["Use the same object, slope and release point on each surface","Change the object and surface together","Push harder on rough surfaces","Measure different quantities each time"]],
        explain:"Draw or describe force arrows for a block sliding to the right while friction slows it.",
        fill2:["Complete the magnetic statement.","Like magnetic poles can repel; unlike poles can {{blank}}."],
        apply:"Plan an investigation into how ramp height affects a toy car’s motion. Identify the changed, measured and controlled variables.",
        enrichment1:"Design a fair investigation comparing friction on four surfaces. Include repeated trials, a results table and a method for deciding whether differences are meaningful.",
        enrichment2:"Analyse a parachuting object using gravity and air resistance. Explain how changing force balance changes its motion without claiming gravity switches off."
      }
    },
    AC9S4U04:{
      slug:"ac9s4u04-examine-the-properties-of-natural-and-made-materials-including",
      title:"Natural and Made Materials: Properties and Uses",
      subtitle:"Test fibres, metals, glass and plastics and justify material choices",
      desc:"examine the properties of natural and made materials including fibres, metals, glass and plastics and consider how these properties influence their use",
      learn:"Students distinguish material source from material property, test observable properties consistently and justify why a material is suitable—or unsuitable—for a particular use.",
      modelTitle:"Link material properties to function",
      modelType:"table",
      model:[["Material","Useful properties","Possible use / limitation"],["cotton fibre","flexible, absorbent","clothing; absorbs water"],["steel","strong, tough","structure; may corrode"],["glass","transparent, rigid","windows; brittle"],["plastic","light, mouldable, varied","containers; disposal concerns"]],
      modelNote:"Natural or made describes origin, not quality. A useful decision weighs several properties and sometimes environmental, cost or safety constraints.",
      applyTitle:"Compare materials using fair property tests",
      applyType:"table",
      apply:[["Property","Possible test","Control"],["water resistance","same water volume and time","sample size"],["strength","load until bending/breaking","sample dimensions"],["flexibility","same bend distance or force","length/thickness"],["transparency","same light source","distance/background"]],
      applyNote:"Use measurable criteria rather than preference words. A material may be excellent for one purpose and poor for another.",
      terms:[["property","observable or measurable characteristic of a material"],["natural material","material obtained from plants, animals or Earth with processing"],["made material","material manufactured or substantially transformed by people"],["fibre","thin strand that can form yarn, fabric or composites"],["suitability","how well properties meet the requirements of a use"]],
      activities:[
        ["Property-test stations","Test samples for absorbency, flexibility, transparency and strength using consistent methods.","table",[["sample","absorbency","flexibility","transparency","strength"],["A","","","",""]]],
        ["Design requirement match","Choose a material for a raincoat, window, bridge cable and reusable bottle; justify with at least two properties.","compare",[["raincoat","water-resistant + flexible"],["window","transparent + rigid"],["cable","strong + tough"],["bottle","light + durable"]]],
        ["Trade-off discussion","Compare two suitable materials and identify a benefit, limitation and evidence needed before choosing.","flow",["define need","set criteria","test properties","compare trade-offs","justify choice"]]
      ],
      mistakes:[["Natural means always safe or sustainable","Source alone does not determine impact, safety or suitability."],["Made means plastic only","Glass, alloys, paper and engineered fabrics are also made or processed materials."],["One property decides every use","Most designs balance several properties and constraints."],["Preference replaces evidence","Use test results and criteria, not ‘I like it’. "]],
      quick:["Define a material property.","Distinguish natural and made.","Why is glass useful for windows?","Name a fair-test control.","Explain one material trade-off."],
      mastery:["Classify sources carefully","Test properties fairly","Interpret evidence","Match properties to uses","Evaluate trade-offs"],
      questions:{
        choice1:["Which property makes clear glass useful for a window?",["transparency","absorbency","magnetism","softness"]],
        fill1:["Complete the design relationship.","A material is suitable when its properties meet the use’s {{blank}} and constraints."],
        choice2:["Which is the fairest absorbency comparison?",["Use equal-sized samples, the same water volume and the same time","Use different sample sizes","Pour more water on the preferred sample","Judge only by colour"]],
        explain:"Explain why a strong material may still be unsuitable for a transparent drinking bottle.",
        fill2:["Complete the property statement.","A brittle material can be rigid but may {{blank}} suddenly under impact."],
        apply:"Choose and justify a material for a reusable food container using at least three properties and one limitation.",
        enrichment1:"Design a weighted decision table for two materials competing for the same product. Explain the criteria, evidence and final choice.",
        enrichment2:"Compare a natural fibre and a synthetic fibre without assuming one is automatically better. Identify tests and life-cycle evidence needed for a responsible decision."
      }
    },
    AC9S4H01:{
      slug:"ac9s4h01-examine-how-people-use-data-to-develop-scientific-explanations",
      title:"Using Data to Develop Scientific Explanations",
      subtitle:"Connect claims, patterns, evidence and reasoning",
      desc:"examine how people use data to develop scientific explanations",
      learn:"Students distinguish measurements from opinions, identify patterns across data and build explanations in which a claim is supported by relevant evidence and reasoning rather than a single preferred result.",
      modelTitle:"Build a claim–evidence–reasoning explanation",
      modelType:"evidence",
      model:[["Claim","The dark surface warmed faster"],["Evidence","30°C to 44°C versus 30°C to 37°C in equal time"],["Reasoning","The repeated temperature pattern supports the comparison"]],
      modelNote:"A claim answers the question. Evidence is selected from observations or measurements. Reasoning explains why that evidence supports the claim and notes uncertainty or limitations.",
      applyTitle:"Evaluate the strength of a data-based explanation",
      applyType:"table",
      apply:[["Feature","Stronger explanation","Weaker explanation"],["data","several relevant measurements","one selected value"],["comparison","same conditions","different methods"],["language","in these trials / suggests","always proves"],["limitations","identified","ignored"]],
      applyNote:"Data can support, challenge or refine an explanation. New evidence may change the explanation; this is a strength of science, not a failure.",
      terms:[["claim","proposed answer to a scientific question"],["evidence","relevant observations or measurements"],["reasoning","link explaining how evidence supports the claim"],["pattern","repeated relationship in data"],["limitation","factor restricting confidence or scope"]],
      activities:[
        ["Evidence sort","Sort statements into claim, evidence, reasoning or opinion and explain borderline cases.","compare",[["claim","Dark material warmed faster"],["evidence","44°C after 6 min"],["reasoning","same-time comparison"],["opinion","black looks better"]]],
        ["Graph-to-explanation","Use a simple graph to write one cautious claim, cite two values and explain the pattern.","flow",["read axes","identify pattern","state claim","cite values","explain limitation"]],
        ["Conflicting data review","Compare two groups’ results, check methods and decide whether to combine, repeat or revise the explanation.","table",[["group","result","method check"],["A","44°C","same volume"],["B","40°C","different starting temp"]]]
      ],
      mistakes:[["Any number counts as evidence","Evidence must be relevant to the question and comparison."],["One result proves a universal rule","Use cautious language and repeated evidence."],["Explanation is just a graph description","Reasoning must connect the observed pattern to the claim."],["Conflicting data is deleted","Investigate method, variation and uncertainty."]],
      quick:["Distinguish claim and evidence.","Use two data values in a sentence.","What does reasoning add?","Why use cautious language?","How can new data change an explanation?"],
      mastery:["Identify valid data","Describe patterns","Construct CER explanations","Evaluate fairness and limitations","Revise explanations with evidence"],
      questions:{
        choice1:["Which statement is scientific evidence?",["The water measured 42°C after 5 minutes","The cup looked nicest","I wanted it to be warmer","Everyone knows it works"]],
        fill1:["Complete the explanation structure.","claim + relevant evidence + {{blank}} = a supported scientific explanation"],
        choice2:["Which conclusion is appropriately cautious?",["In our repeated trials, the dark surface warmed faster","Dark surfaces always warm fastest everywhere","One reading proves the rule","The result cannot ever change"]],
        explain:"Use the data 30°C → 44°C and 30°C → 37°C to write a claim–evidence–reasoning explanation.",
        fill2:["Complete the limitation statement.","Confidence is reduced when comparison groups use different starting {{blank}}."],
        apply:"Two groups obtain different results. Explain what method and data checks should occur before revising the explanation.",
        enrichment1:"Create a small data set, graph plan and complete claim–evidence–reasoning explanation. Include one limitation and a next test.",
        enrichment2:"Compare two explanations based on the same data, one overstated and one cautious. Analyse wording, evidence selection and reasoning."
      }
    },
    AC9S4H02:{
      slug:"ac9s4h02-consider-how-people-use-scientific-explanations-to-meet-a-need",
      title:"Using Science to Meet Needs and Solve Problems",
      subtitle:"Translate explanations into design criteria, testing and improvement",
      desc:"consider how people use scientific explanations to meet a need or solve a problem",
      learn:"Students connect a scientific explanation to a practical design, define measurable criteria and constraints, test possible solutions and use evidence to improve rather than claiming one design is perfect.",
      modelTitle:"Turn heat-transfer science into an insulated-container design",
      modelType:"flow",
      model:["need: keep drink cool","science: reduce heat transfer","criteria: temperature after 2 h","choose materials","test","improve"],
      modelNote:"The explanation guides a design feature, but the solution must still meet constraints such as mass, cost, safety and reuse. Testing checks whether it works under stated conditions.",
      applyTitle:"Compare solutions against criteria and constraints",
      applyType:"table",
      apply:[["Criterion","Design A","Design B"],["temperature control","good","very good"],["mass","light","heavy"],["cost","low","higher"],["reuse","moderate","high"]],
      applyNote:"A solution can involve trade-offs. The preferred choice depends on which criteria matter most and what evidence supports each rating.",
      terms:[["need","requirement or problem to address"],["criterion","measurable feature used to judge success"],["constraint","limit such as cost, time, safety or materials"],["prototype","early model used for testing"],["trade-off","gain in one feature paired with a limitation in another"]],
      activities:[
        ["Need-to-science map","Choose a problem and connect it to a scientific explanation, design feature and measurable criterion.","flow",["need","science idea","design feature","test","evidence"]],
        ["Prototype comparison","Test two simple insulating designs under equal conditions and graph temperature change.","table",[["time","A","B"],["0 min","",""],["30 min","",""],["60 min","",""]]],
        ["Trade-off meeting","Rank criteria for different users, then explain why the recommended solution may change.","compare",[["hiker","light + durable"],["hospital","safe + easy to clean"],["school","low cost + reusable"]]]
      ],
      mistakes:[["The first idea is called the solution","Define criteria and compare alternatives before deciding."],["Scientific explanation guarantees success","A design must be tested under relevant conditions."],["Best means best for everyone","Users and constraints can change the preferred trade-off."],["Aesthetic preference used as criterion","Criteria should be measurable or clearly evaluable."]],
      quick:["Define criterion and constraint.","Connect insulation to heat transfer.","Why test a prototype?","Explain one trade-off.","How can data improve a design?"],
      mastery:["Define needs","Use science in design","Set criteria/constraints","Test and compare solutions","Justify improvements with evidence"],
      questions:{
        choice1:["Which is a measurable criterion for an insulated bottle?",["Water remains below 12°C after 2 hours","It looks perfect","Everyone likes it","It is the best"]],
        fill1:["Complete the design process.","need → scientific explanation → design → test → {{blank}}"],
        choice2:["Which statement describes a constraint?",["The design must cost less than $20","The design should reduce heat transfer","The water temperature is measured","The prototype is compared"]],
        explain:"Explain how knowledge of heat transfer could influence two features of an insulated container.",
        fill2:["Complete the evidence decision.","Choose the design that best meets the weighted criteria and stated {{blank}}."],
        apply:"Compare a light low-cost design with a heavier high-performance design for two different users. Justify recommendations.",
        enrichment1:"Design a solution to a practical need using a Year 4 science explanation. Define criteria, constraints, test data and an improvement cycle.",
        enrichment2:"Evaluate a claim that one product is ‘scientifically proven best’. List the evidence, comparisons and conditions required before accepting it."
      }
    },
    AC9S4I01:{
      slug:"ac9s4i01-questions-to-explore-observed-patterns-and-relationships-and",
      title:"Scientific Questions and Evidence-based Predictions",
      subtitle:"Turn observations into testable variables and justified predictions",
      desc:"pose questions to explore observed patterns and relationships and make predictions based on observations",
      learn:"Students use observed patterns to pose focused, testable questions about relationships between variables and write predictions that state an expected outcome plus a reason based on prior evidence.",
      modelTitle:"Move from observation to question and prediction",
      modelType:"flow",
      model:["observe: wet cloth dries faster in sun","identify variables: location and drying time","question: how does location affect drying time?","predict with reason"],
      modelNote:"A testable question names what may be changed or compared and what can be observed or measured. A prediction is not a guess; it is supported by an observation or explanation.",
      applyTitle:"Improve questions for fair investigation",
      applyType:"table",
      apply:[["Weak question","Improved question"],["Which towel is best?","How does towel material affect volume absorbed in 30 seconds?"],["Do plants like light?","How does daily light duration affect plant height over 3 weeks?"],["Are magnets strong?","How does magnet distance affect paperclip attraction?"]],
      applyNote:"Avoid value words such as best unless criteria are defined. One focused relationship is easier to investigate fairly than several changes at once.",
      terms:[["observation","information noticed or measured"],["testable question","question answerable through evidence collection"],["variable","factor that can change or be measured"],["prediction","expected result with an evidence-based reason"],["relationship","way one variable changes with another"]],
      activities:[
        ["Observation walk","Record patterns around the classroom or outdoors, then turn three into testable questions.","flow",["notice","record","name variables","write question","check measurability"]],
        ["Question clinic","Revise opinion, yes/no and multi-variable questions into focused relationship questions.","compare",[["opinion","Which looks best?"],["testable","How does surface affect distance?"]]],
        ["Prediction evidence ladder","Write if–then–because predictions and rate whether the reason comes from observation, prior science or unsupported preference.","sentence",[["If","the surface is rougher"],["then","the block travels less far"],["because","friction is greater"]]]
      ],
      mistakes:[["Question asks for an opinion","Use an observable or measurable outcome."],["Prediction repeats the question","State an expected direction or result and a reason."],["Several variables bundled together","Focus on one relationship at a time."],["Prediction treated as a result","Collect evidence before deciding whether it was supported."]],
      quick:["Write a testable force question.","Identify two variables.","Add a reason to a prediction.","Improve ‘Which is best?’","Explain prediction versus conclusion."],
      mastery:["Use observations","Pose focused questions","Identify variables","Make reasoned predictions","Distinguish prediction from result"],
      questions:{
        choice1:["Which question is most testable?",["How does surface type affect the distance a block slides?","Which surface looks nicest?","Is science fun?","Why is my favourite surface best?"]],
        fill1:["Complete the prediction frame.","If the surface is rougher, then the block may travel a shorter distance because {{blank}} is greater."],
        choice2:["Which statement is a prediction?",["The warmer water will melt the ice faster because it transfers more heat energy","The ice melted in 4 minutes","The timer showed 240 seconds","The water was 35°C"]],
        explain:"Turn the observation ‘a plant near the window grew taller’ into a focused question and justified prediction.",
        fill2:["Complete the question structure.","How does the changed variable affect the {{blank}} variable?"],
        apply:"Improve a question that changes both surface and ramp height at once. Explain why your revision is easier to test fairly.",
        enrichment1:"Develop three connected questions from one observed pattern: descriptive, comparative and relationship-focused. Predict each outcome and rank testability.",
        enrichment2:"Design a question where two plausible predictions can be supported by different prior observations. Explain what investigation could decide between them."
      }
    },
    AC9S4I02:{
      slug:"ac9s4i02-provided-scaffolds-to-plan-and-conduct-investigations-to-answer",
      title:"Planning Fair and Safe Investigations",
      subtitle:"Identify variables, controls, repetitions, measurements and risk controls",
      desc:"use provided scaffolds to plan and conduct investigations to answer questions or test predictions, including identifying the elements of fair tests, and considering the safe use of materials and equipment",
      learn:"Students use a scaffold to connect a question with a fair method, changing one factor, measuring an outcome, controlling relevant conditions, repeating trials and managing hazards before collecting data.",
      modelTitle:"Plan a complete fair test",
      modelType:"table",
      model:[["Element","Paper-towel absorbency plan"],["question","How does brand affect mL absorbed?"],["change","brand"],["measure","volume absorbed in 30 s"],["control","sheet size, water, time"],["repeat","3 trials per brand"],["safety","wipe spills; stable containers"]],
      modelNote:"Fairness does not mean every feature is identical: the tested variable must differ. The measured variable and control conditions make the comparison meaningful.",
      applyTitle:"Use a risk-control sequence",
      applyType:"flow",
      apply:["identify hazard","estimate risk","choose control","teacher check","conduct carefully","respond to spill or breakage","clean up"],
      applyNote:"A hazard is a potential source of harm; a control reduces likelihood or consequence. Safety decisions should match the actual materials and equipment.",
      terms:[["changed variable","factor deliberately changed or compared"],["measured variable","outcome observed or measured"],["controlled variable","relevant condition kept the same"],["hazard","potential source of harm"],["repetition","same condition tested more than once"]],
      activities:[
        ["Plan audit","Highlight changed, measured and controlled variables in sample methods and repair missing controls.","table",[["Question","change","measure","controls"],["surface vs distance","surface","distance","car, ramp, release"]]],
        ["Risk-control cards","Match hazards to proportionate controls and explain why vague instructions such as ‘be careful’ are insufficient.","compare",[["water spill","wipe promptly + walk"],["warm water","teacher-set temperature"],["glass","use safer container where possible"]]],
        ["Pilot and revise","Trial the method once, identify ambiguity or measurement difficulty and revise before full data collection.","flow",["draft method","pilot","notice problem","revise","teacher check","collect"]]
      ],
      mistakes:[["Changing one variable means nothing else matters","Control every relevant condition that could affect the result."],["Repeating means copying the same recorded value","Conduct the trial again and record the new observation."],["Fair means equal outcomes","Fair refers to method, not matching results."],["Safety note says only ‘be careful’","Name the hazard and a specific control."]],
      quick:["Identify changed and measured variables.","Name two controls.","Why repeat?","Distinguish hazard and control.","Explain what a pilot test improves."],
      mastery:["Use planning scaffolds","Identify fair-test elements","Plan repeated measurements","Manage hazards","Revise methods before testing"],
      questions:{
        choice1:["In a test of paper-towel brands, what should be deliberately changed?",["the brand","the sheet size and water volume together","the recording unit each trial","the result after measuring"]],
        fill1:["Complete the fair-test principle.","Change one tested factor and keep relevant conditions the {{blank}}."],
        choice2:["Which is a specific safety control for a water spill?",["Wipe it promptly and keep people from running through it","Be careful","Ignore it until the end","Use more water"]],
        explain:"Plan the changed, measured and controlled variables for a ramp-surface investigation.",
        fill2:["Complete the reliability step.","Conduct at least {{blank}} repeated trials for each condition and compare the pattern."],
        apply:"Write a safe numbered procedure for comparing how two materials insulate warm water. Include measurements and controls.",
        enrichment1:"Design a fair investigation with a difficult-to-control variable. Explain how the scaffold and pilot test reduce uncertainty.",
        enrichment2:"Evaluate two investigation plans that answer the same question. Use fairness, safety, measurement quality and practicality as criteria."
      }
    },
    AC9S4I03:{
      slug:"ac9s4i03-follow-procedures-to-make-and-record-observations-including",
      title:"Observing, Measuring and Recording Accurately",
      subtitle:"Follow procedures, read scaled instruments and use digital tools appropriately",
      desc:"follow procedures to make and record observations, including making formal measurements using familiar scaled instruments and using digital tools as appropriate",
      learn:"Students follow ordered methods, distinguish qualitative and quantitative observations, read scales from their intervals, record units and use digital tools where they improve timing, measurement or organisation.",
      modelTitle:"Read, record and check formal measurements",
      modelType:"table",
      model:[["Time","Temperature","Observation"],["0 min","22°C","clear liquid"],["2 min","28°C","small bubbles"],["4 min","33°C","more bubbles"]],
      modelNote:"A complete measurement includes a number and unit. Read the instrument at eye level where appropriate, calculate interval value and record immediately rather than relying on memory.",
      applyTitle:"Choose instruments and digital tools by purpose",
      applyType:"table",
      apply:[["Quantity","Tool","Recording detail"],["length","ruler or tape","start point + mm/cm"],["mass","balance","g or kg"],["volume","measuring jug/cylinder","mL or L; eye level"],["temperature","thermometer/probe","°C"],["duration","timer","s or min"]],
      applyNote:"Digital tools can improve precision or repeated recording, but students should still understand the quantity, unit, calibration and possible error.",
      terms:[["qualitative observation","description using qualities rather than a measured number"],["quantitative observation","observation containing a number and unit"],["scale interval","value represented by one space between marks"],["precision","level of detail supported by the instrument"],["procedure","ordered method to follow consistently"]],
      activities:[
        ["Instrument-reading circuit","Read several labelled and partially labelled instruments, recording value, unit and interval size.","table",[["tool","interval","reading"],["thermometer","2°C",""],["jug","50 mL",""],["ruler","1 mm",""]]],
        ["Observation upgrade","Rewrite vague notes as precise qualitative or quantitative observations without inventing detail.","compare",[["vague","it got hotter"],["quantitative","temperature rose from 22°C to 33°C"],["qualitative","small bubbles appeared"]]],
        ["Digital-tool judgement","Choose whether a timer, camera, temperature probe or spreadsheet improves an investigation and state what human checks remain.","flow",["identify quantity","choose tool","set unit","record","check plausibility"]]
      ],
      mistakes:[["Number recorded without unit","A measurement needs its unit to communicate the quantity."],["Marks counted instead of intervals","Use the spaces between labelled values to find interval size."],["Digital reading assumed error-free","Check setup, unit, sensor position and reasonableness."],["Procedure reordered casually","Order may affect the conditions and comparability."]],
      quick:["Give qualitative and quantitative observations.","Find a scale interval.","Why read a liquid level at eye level?","Choose a suitable instrument.","Name one digital-reading check."],
      mastery:["Follow procedures","Read scaled instruments","Record units and observations","Use digital tools purposefully","Check precision and plausibility"],
      questions:{
        choice1:["Which is a quantitative observation?",["The water temperature was 28°C","The rock felt rough","The liquid looked clear","The leaf was dark green"]],
        fill1:["Complete the measurement rule.","Record every formal measurement with a number and its {{blank}}."],
        choice2:["Which instrument is most suitable for measuring 250 mL of water?",["a labelled measuring jug or cylinder","a ruler","a compass","a spring scale for force"]],
        explain:"Explain how to find the value of unlabelled marks between 20°C and 30°C when there are 5 equal intervals.",
        fill2:["Complete the observation record.","At 4 minutes the thermometer read {{blank}}°C."],
        apply:"Choose and justify tools for measuring the length, mass, temperature and duration of one investigation. Include units and precision limits.",
        enrichment1:"Design a recording table that combines qualitative and quantitative observations at repeated times. Explain how it prevents missing or ambiguous data.",
        enrichment2:"Compare an analogue and digital instrument for the same quantity. Evaluate precision, readability, setup error and educational value."
      }
    },
    AC9S4I04:{
      slug:"ac9s4i04-construct-and-use-representations-including-tables-simple",
      title:"Tables, Column Graphs and Scientific Models",
      subtitle:"Organise evidence, show relationships and identify patterns without distorting data",
      desc:"construct and use representations, including tables, simple column graphs and visual or physical models, to organise data and information, show simple relationships and identify patterns",
      learn:"Students choose representations for a purpose, transfer data accurately from records to tables or graphs, use labelled scales and explain what a model shows as well as what it simplifies.",
      modelTitle:"Move from observations to table and graph",
      modelType:"table",
      model:[["Surface","Mean distance (cm)"],["tile","145"],["cardboard","92"],["fabric","38"]],
      modelNote:"The table preserves exact values. A column graph makes the comparison visible; bar heights must match the same scale and categories.",
      applyTitle:"Use models to explain a relationship",
      applyType:"flow",
      apply:["rougher surface","greater friction","shorter travel distance in this test","repeat and compare evidence"],
      applyNote:"A model is a purposeful simplification, not the real system. State which relationship it represents and which details or scales it leaves out.",
      terms:[["representation","way of showing data, information or a system"],["column graph","graph using column height to represent values"],["scale","relationship between graph intervals and values"],["model","simplified representation used to explain or predict"],["pattern","regularity or relationship identified in evidence"]],
      activities:[
        ["Table-to-graph conversion","Create a labelled column graph from a table, then audit every bar against the source value.","table",[["category","value","bar checked"],["A","4",""],["B","9",""],["C","6",""]]],
        ["Model limitation labels","Add ‘shows well’ and ‘does not show’ notes to a water-cycle, food-chain or force model.","compare",[["shows","main parts and relationships"],["simplifies","scale, timing, variation, hidden processes"]]],
        ["Representation choice","Choose table, graph, labelled diagram or physical model for four different science questions and justify each.","flow",["identify question","decide exact values or pattern","choose representation","label","interpret"]]
      ],
      mistakes:[["Graph values differ from table","Audit every plotted value against the source."],["Axis intervals change partway","Use a consistent scale unless a break is clearly justified."],["Model treated as exact reality","State simplifications and limits."],["Pattern described without values","Support interpretation with categories, quantities or comparisons."]],
      quick:["When is a table useful?","Label a column graph fully.","Explain a graph scale.","State one model limitation.","Describe a pattern using values."],
      mastery:["Choose suitable representations","Construct accurate tables/graphs","Use consistent labels/scales","Interpret patterns","Evaluate model limitations"],
      questions:{
        choice1:["Which representation best shows exact recorded values?",["a labelled table","an unrelated image","a title only","an unscaled sketch"]],
        fill1:["Complete the graph rule.","Column height must match the source value using a consistent {{blank}}."],
        choice2:["Which statement best describes a scientific model?",["A purposeful simplification used to show important parts or relationships","A perfect copy of reality","A decoration with no explanation","An answer that cannot be revised"]],
        explain:"Describe a correctly labelled column graph for distances 145 cm, 92 cm and 38 cm on three surfaces.",
        fill2:["Complete the pattern statement.","As surface roughness increased, travel distance generally {{blank}} in this investigation."],
        apply:"Choose a representation for showing the water cycle and another for comparing evaporation measurements. Explain the different purposes.",
        enrichment1:"Represent one data set in a table and two graph forms. Evaluate accuracy, readability and which questions each display answers best.",
        enrichment2:"Create a model of a complex science system, then write a model-evaluation statement covering scale, omitted factors and appropriate uses."
      }
    },
    AC9S4I05:{
      slug:"ac9s4i05-findings-with-those-of-others-consider-if-investigations-were",
      title:"Evaluating Investigations and Drawing Conclusions",
      subtitle:"Compare findings, judge fairness, explain variation and propose further questions",
      desc:"compare findings with those of others, consider if investigations were fair, identify questions for further investigation and draw conclusions",
      learn:"Students compare evidence rather than expecting identical results, inspect whether methods were fair, distinguish variation from error and write cautious conclusions that answer the question and suggest a meaningful next investigation.",
      modelTitle:"Compare findings from repeated groups",
      modelType:"table",
      model:[["Group","Mean slide distance","Method note"],["A","92 cm","3 trials"],["B","88 cm","3 trials"],["C","121 cm","different release point"]],
      modelNote:"Groups A and B are reasonably consistent. Group C should trigger a method check before combining results; a different release point may explain the discrepancy.",
      applyTitle:"Use an evaluation checklist",
      applyType:"flow",
      apply:["Does the method answer the question?","Was one factor changed?","Were controls consistent?","Were measurements repeated?","Do data support the conclusion?","What should be tested next?"],
      applyNote:"A different finding does not automatically mean someone is wrong. It may reflect natural variation, measurement uncertainty or a method difference.",
      terms:[["finding","result or pattern identified from evidence"],["fair test","comparison controlling relevant variables"],["variation","differences arising across observations or trials"],["conclusion","statement answering the question using evidence"],["further question","new testable question arising from findings or limitations"]],
      activities:[
        ["Method detective","Compare group methods and identify which differences could explain inconsistent findings.","table",[["feature","A","B"],["release point","top","middle"],["surface","fabric","fabric"],["trials","3","1"]]],
        ["Conclusion ladder","Rank conclusion statements from unsupported to well-supported and revise overconfident wording.","compare",[["weak","It always works"],["better","In our three trials…"],["stronger","The mean was higher under controlled conditions, but more trials are needed"]]],
        ["Next-question workshop","Turn a limitation or unexpected pattern into a focused follow-up question.","flow",["notice uncertainty","identify possible factor","write testable question","predict","plan next comparison"]]
      ],
      mistakes:[["Different findings mean one group cheated","Check variation, measurement and method before judging."],["Fairness judged by equal results","Fairness concerns method and controls."],["Conclusion repeats the procedure","It should answer the question using evidence."],["Further question changes everything","A useful follow-up isolates a factor suggested by the findings."]],
      quick:["Compare two findings with values.","Name one fairness check.","Distinguish variation and method error.","Write a cautious conclusion.","Create a follow-up question."],
      mastery:["Compare data sets","Evaluate fair methods","Discuss variation","Draw evidence conclusions","Propose focused next questions"],
      questions:{
        choice1:["Which difference most threatens a fair comparison?",["Groups release the object from different points","Groups record the same unit","Groups repeat three trials","Groups use the same surface"]],
        fill1:["Complete the conclusion rule.","A conclusion should answer the question and cite relevant {{blank}}."],
        choice2:["Which statement is most scientifically cautious?",["In these trials, the rough surface produced shorter distances","The rough surface always stops every object","One trial proves the explanation","No further test could change the conclusion"]],
        explain:"Compare 92 cm, 88 cm and 121 cm findings when the 121 cm group used a different release point. Explain what should happen next.",
        fill2:["Complete the evaluation.","Repeating trials helps reveal normal {{blank}} and reduces reliance on one result."],
        apply:"Write a conclusion and further question for an investigation where one material kept water 6°C warmer after 30 minutes.",
        enrichment1:"Create three plausible group data sets for the same fair test, including one suspicious result. Evaluate whether it is variation, error or method difference and justify next steps.",
        enrichment2:"Develop an investigation-review rubric covering question, fairness, safety, measurements, representation, conclusion and next question. Apply it to a sample plan."
      }
    },
    AC9S4I06:{
      slug:"ac9s4i06-and-create-texts-to-communicate-findings-and-ideas-for",
      title:"Communicating Scientific Findings and Ideas",
      subtitle:"Adapt structure, vocabulary, evidence and visuals for purpose and audience",
      desc:"write and create texts to communicate findings and ideas for identified purposes and audiences, using scientific vocabulary and digital tools as appropriate",
      learn:"Students organise a scientific message around its purpose, select relevant evidence, use precise vocabulary and labelled visuals, and adapt detail and layout for different audiences without changing the underlying science.",
      modelTitle:"Structure a concise investigation report",
      modelType:"cycle",
      model:["question and prediction","method","results table or graph","finding","conclusion","limitation / next question"],
      modelNote:"The report should let a reader understand what was tested, examine the evidence and see how the conclusion follows. Decorative content must not replace data or labels.",
      applyTitle:"Adapt one finding for different audiences",
      applyType:"table",
      apply:[["Audience / purpose","Useful choices"],["class poster","large labelled visual, short evidence statements"],["teacher report","method detail, units, data and limitations"],["younger students","familiar language plus defined science terms"],["digital presentation","limited text, readable graph, spoken explanation"]],
      applyNote:"Audience adaptation changes vocabulary support, amount of detail and layout—not the data values or scientific meaning.",
      terms:[["purpose","reason the communication is created"],["audience","intended reader, viewer or listener"],["scientific vocabulary","precise field-specific terms"],["caption","text explaining a visual"],["citation or source","information identifying where external evidence came from"]],
      activities:[
        ["Report reconstruction","Order mixed report sections and explain why each belongs where it does.","cycle",["question","method","results","finding","conclusion"]],
        ["Audience rewrite","Rewrite one finding for a class poster, formal report and oral explanation while preserving the evidence.","compare",[["poster","42°C after 5 min — largest rise"],["report","temperature increased by 12°C"],["oral","point to graph and explain"]]],
        ["Visual audit","Check a graph or diagram for title, labels, units, caption, legibility and connection to the spoken or written message.","flow",["purpose","select visual","label","cite evidence","explain","review readability"]]
      ],
      mistakes:[["Communication is a data dump","Select evidence and state the finding it supports."],["Audience adaptation changes facts","Change explanation support and layout, not the evidence."],["Technical vocabulary left unexplained","Use precise terms and define them for the audience."],["Digital slide becomes a paragraph wall","Use a readable visual and concise cues for spoken explanation."]],
      quick:["Name report stages.","Adapt one finding for two audiences.","What makes a graph readable?","Use a precise science term.","State a source or limitation."],
      mastery:["Identify purpose/audience","Organise scientific texts","Use evidence and vocabulary","Create labelled visuals","Review accuracy and readability"],
      questions:{
        choice1:["Which sentence communicates a finding precisely?",["The temperature increased from 22°C to 33°C in 4 minutes","It got hotter somehow","The result was nice","The graph had colours"]],
        fill1:["Complete the communication principle.","Choose detail, vocabulary and layout to suit the purpose and {{blank}}."],
        choice2:["Which feature best supports a report about measurements?",["a labelled graph with units and a finding statement","an unrelated decoration","a title with no evidence","a claim with altered values"]],
        explain:"Outline a report that allows a reader to check how the conclusion follows from the data.",
        fill2:["Complete the precise sentence.","Heat energy {{blank}} from the warmer object to the cooler object."],
        apply:"Communicate the same water-cycle finding for a younger class and for a teacher. Explain what changes and what remains exact.",
        enrichment1:"Create a two-page communication plan combining report text, one graph and one explanatory model for a defined audience. Justify every layout choice.",
        enrichment2:"Evaluate two digital science presentations: one visually clear but missing evidence, and one accurate but overcrowded. Propose an improved synthesis."
      }
    }
  };

  // Retain the authored source so the connected topic, slide and worksheet
  // renderers can reuse every useful teaching element without flattening it.
  window.SkillrYear4ScienceTopicSource = S;
  window.SkillrYear4SubjectRegister("science", S, Object.keys(S));
})();
