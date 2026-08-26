export const year10ScienceConfig = {
  AC9S10U01: {
    prerequisites: 'Recall that cells contain genetic material and that chromosomes carry inherited information. Be comfortable with simple probability, ratios and reading a basic family tree or Punnett square.',
    victoria: { codes: ['VC2S10U04'], label: 'Levels 9–10 genetic inheritance, DNA, chromosomes, genes, mitosis, meiosis and Mendelian ratios', strength: 'strong' },
    nsw: { codes: ['SC5-GEV-02'], label: 'Stage 5 Genetics and evolutionary change — DNA and transmission of heritable characteristics', strength: 'strong' },
    reasoning: 'A pedigree and a Punnett square appear to suggest different probabilities for a trait. Explain what each representation can and cannot tell you, then decide whether the evidence actually conflicts.',
    teacherTip: 'Keep chromosome behaviour, allele inheritance and probability connected. Require students to say where each allele came from rather than treating Punnett squares as a grid trick.',
    parentTip: 'Ask your child to explain the difference between DNA, a gene and a chromosome, then use one simple cross to show why probability does not guarantee an exact family outcome.',
    related: ['AC9S10U02', 'AC9S10I06'], diagram: 'genetics'
  },
  AC9S10U02: {
    prerequisites: 'Students should understand inherited variation, genes and populations. AC9S10U01 is the strongest prerequisite because natural selection acts on heritable variation.',
    victoria: { codes: ['VC2S10U05'], label: 'Levels 9–10 evolution by natural selection, variation, isolation, adaptation and evidence', strength: 'strong' },
    nsw: { codes: ['SC5-GEV-01'], label: 'Stage 5 Genetics and evolutionary change — diversity of living things and evolution', strength: 'strong' },
    reasoning: 'A population becomes more resistant to an antibiotic over many generations. Evaluate the claim that individual bacteria changed because they needed to survive.',
    teacherTip: 'Insist on the sequence variation → selection pressure → differential survival/reproduction → population change. This prevents need-based explanations of evolution.',
    parentTip: 'Ask your child whether individuals evolve or populations evolve, and have them explain antibiotic resistance using variation that already existed before selection.',
    related: ['AC9S10U01', 'AC9S10H01'], diagram: 'selection'
  },
  AC9S10U03: {
    prerequisites: 'Students should distinguish a scientific model from a direct observation, know that light carries information, and be comfortable with very large scales and scientific notation.',
    victoria: { codes: ['VC2S10U13'], label: 'Levels 9–10 universe, Big Bang theory and supporting evidence', strength: 'strong' },
    nsw: { codes: ['SC4-OTU-01'], label: 'Stage 4 Observing the Universe provides supporting prior learning; the current Stage 5 focus areas do not contain a direct Big Bang outcome', strength: 'supporting' },
    reasoning: 'Three observations support the Big Bang model: galaxy redshift, cosmic microwave background radiation and light-element abundance. Explain why several independent evidence lines are stronger than one observation alone.',
    teacherTip: 'Teach evidence as evidence for a model, not as “proof”. Make students connect each observation to a prediction of an expanding, evolving universe.',
    parentTip: 'Ask your child to name one observation astronomers make today and explain how it supports a model about the early universe.',
    related: ['AC9S10H01', 'AC9S10H02'], diagram: 'bigbang'
  },
  AC9S10U04: {
    prerequisites: 'Recall energy transfer, the greenhouse effect and the carbon cycle. Students should distinguish weather from climate and be able to interpret a trend graph.',
    victoria: { codes: ['VC2S10U11'], label: 'Levels 9–10 global climate change, greenhouse gases, energy exchanges and mitigation', strength: 'strong' },
    nsw: { codes: ['SC5-ENV-01', 'SC5-EGY-01'], label: 'Stage 5 Environmental sustainability and Energy provide strong supporting alignment for human impacts, energy choices and sustainability', strength: 'strong-partial' },
    reasoning: 'A graph shows rising atmospheric carbon dioxide and rising global mean temperature. Explain what additional evidence is needed before claiming that one graph alone establishes the full causal mechanism.',
    teacherTip: 'Separate the mechanism (energy balance and greenhouse gases) from evidence patterns and from policy choices. Students should be able to explain all three without conflating them.',
    parentTip: 'Ask your child to trace incoming solar energy and outgoing infrared energy, then explain what greenhouse gases change in that energy flow.',
    related: ['AC9S10I05', 'AC9S10H04'], diagram: 'climate'
  },
  AC9S10U05: {
    prerequisites: 'Students should know force as a vector, distinguish speed from velocity and acceleration, use SI units, and rearrange simple equations such as F = ma.',
    victoria: { codes: ['VC2S10U17'], label: 'Levels 9–10 Newton’s laws and quantitative force–mass–acceleration relationships', strength: 'strong' },
    nsw: { codes: ['SC5-WAM-02'], label: 'Stage 5 Waves and motion — explains motion using Newton’s laws', strength: 'strong' },
    reasoning: 'Two objects experience the same net force but have different masses. Predict and justify how their accelerations compare, then state what would change if the forces were balanced.',
    teacherTip: 'Make net force explicit before using F = ma. Free-body diagrams should represent forces on one chosen object, not forces the object exerts elsewhere.',
    parentTip: 'Ask your child to identify all forces acting on one everyday object and decide whether the forces are balanced before calculating anything.',
    related: ['AC9S10I04', 'AC9S10I05'], diagram: 'newton'
  },
  AC9S10U06: {
    prerequisites: 'Recall protons, neutrons, electrons, atomic number and element symbols. Students should already understand that atomic models are representations that changed with evidence.',
    victoria: { codes: ['VC2S10U07'], label: 'Levels 9–10 periodic table organisation, atomic structure and periodic trends', strength: 'strong' },
    nsw: { codes: ['SC4-PRT-01', 'SC5-MAT-01'], label: 'Stage 4 Periodic table and atomic structure is the closest direct foundation; Stage 5 Materials extends property-based reasoning', strength: 'supporting' },
    reasoning: 'Two elements are in the same periodic-table group but different periods. Use outer-electron structure to explain one expected similarity and one expected difference.',
    teacherTip: 'Use the Bohr model only for the curriculum purpose: linking electron shells and outer electrons to periodic organisation and broad property patterns. Do not turn the lesson into senior atomic theory.',
    parentTip: 'Ask your child why elements in the same column often behave similarly and have them connect the answer to outer electrons rather than memorising a table.',
    related: ['AC9S10U07', 'AC9S10H02'], diagram: 'atom'
  },
  AC9S10U07: {
    prerequisites: 'Students should read word and balanced chemical equations, understand conservation of mass and recognise reactants and products. Familiarity with collision ideas helps with reaction-rate explanations.',
    victoria: { codes: ['VC2S10U09'], label: 'Levels 9–10 reaction types, energy changes and factors affecting reaction rates', strength: 'strong' },
    nsw: { codes: ['SC5-RXN-01', 'SC5-RXN-02'], label: 'Stage 5 Reactions — reaction types and factors affecting reaction rate', strength: 'strong' },
    reasoning: 'A powdered solid reacts faster than the same mass in large chunks. Explain the result using particle collisions, then identify a variable that must be controlled to make the comparison valid.',
    teacherTip: 'Keep reaction classification and reaction rate distinct. For rate explanations require a mechanism: how a changed condition alters the frequency or effectiveness of particle collisions.',
    parentTip: 'Ask your child to explain why crushing a solid can speed up a reaction without changing the amount of substance present.',
    related: ['AC9S10U06', 'AC9S10I02', 'AC9S10I05'], diagram: 'reaction'
  },
  AC9S10H01: {
    prerequisites: 'Students should understand evidence, scientific models, repeat investigations and the difference between a claim and a conclusion.',
    victoria: { codes: ['VC2S10H01'], label: 'Levels 9–10 validation of scientific knowledge through critique, replication, publication, peer review and consensus', strength: 'strong' },
    nsw: { codes: ['SC5-DA2-01'], label: 'Stage 5 Data science 2 — verifies the legitimacy of claims using scientific knowledge and data', strength: 'strong-partial' },
    reasoning: 'A single peer-reviewed study reports a surprising effect but later replications disagree. Explain how the scientific community should respond and why peer review alone is not the final step.',
    teacherTip: 'Present validation as a system: transparent methods, critique, replication, publication, peer review and accumulation of evidence. Avoid teaching peer review as a stamp of truth.',
    parentTip: 'Ask your child why one published study is not automatically enough to settle a scientific question.',
    related: ['AC9S10I06', 'AC9S10I07'], diagram: null
  },
  AC9S10H02: {
    prerequisites: 'Students should distinguish science (building explanations), technology (tools and applications) and engineering (designing solutions), while recognising that real projects connect all three.',
    victoria: { codes: ['VC2S10H02'], label: 'Levels 9–10 reciprocal advances among science, engineering and technologies', strength: 'strong' },
    nsw: { codes: ['SC5-DA2-01'], label: 'No single one-to-one Stage 5 outcome; the idea is supporting across Stage 5 focus areas and evidence-based decision making', strength: 'supporting' },
    reasoning: 'Choose a technology such as medical imaging or telescopes. Trace one advance from technology to new scientific evidence and one scientific advance back into improved technology or engineering.',
    teacherTip: 'Require a two-way causal chain. “Science caused technology” is incomplete when the technology later changes what scientists can observe or measure.',
    parentTip: 'Pick an everyday technology and ask what science made it possible and what new scientific questions the technology can now help answer.',
    related: ['AC9S10H01', 'AC9S10H04'], diagram: null
  },
  AC9S10H03: {
    prerequisites: 'Students should be able to distinguish evidence quality from popularity and identify factors such as trust, cost, risk, communication, values and access.',
    victoria: { codes: ['VC2S10H03'], label: 'Levels 9–10 factors affecting broader adoption of scientific knowledge and practices', strength: 'strong' },
    nsw: { codes: ['SC5-DA2-01'], label: 'Stage 5 Data science 2 — evidence-based decisions and verification of claims', strength: 'strong-partial' },
    reasoning: 'Two communities receive the same scientific recommendation but adoption differs. Analyse at least three factors other than “knowing the science” that could explain the difference.',
    teacherTip: 'Separate whether a claim is scientifically well supported from whether society adopts a practice. Adoption can depend on trust, feasibility, values, policy, cost and communication.',
    parentTip: 'Discuss a public-health or environmental recommendation and ask why good evidence does not always lead to immediate widespread adoption.',
    related: ['AC9S10H04', 'AC9S10I07'], diagram: null
  },
  AC9S10H04: {
    prerequisites: 'Students should know that research has limited time, funding and people, and that societies make choices about which problems receive attention.',
    victoria: { codes: ['VC2S10H04'], label: 'Levels 9–10 societal values, needs and priorities influencing scientific research', strength: 'strong' },
    nsw: { codes: ['SC5-DA2-01', 'SC5-ENV-01', 'SC5-EGY-01'], label: 'Stage 5 evidence-based decision making with environmental and energy contexts provides supporting alignment', strength: 'supporting' },
    reasoning: 'A government can fund only one of three research programs. Build a transparent decision framework that considers scientific value, urgency, equity, cost and potential benefit.',
    teacherTip: 'Do not frame social influence as automatically corrupting science. The curriculum target is to examine how legitimate needs, values and constraints shape research priorities.',
    parentTip: 'Ask your child why some diseases, technologies or environmental problems receive more research funding than others.',
    related: ['AC9S10H03', 'AC9S10I07'], diagram: null
  },
  AC9S10I01: {
    prerequisites: 'Students should identify independent, dependent and controlled variables and distinguish an observation from an explanation.',
    victoria: { codes: ['VC2S10I01'], label: 'Levels 9–10 investigable questions, predictions and hypotheses', strength: 'strong' },
    nsw: { codes: ['SC5-WS-02'], label: 'Stage 5 Working scientifically — develops questions and hypotheses for scientific investigation', strength: 'strong' },
    reasoning: 'Rewrite a vague question such as “Does temperature affect reactions?” into a testable question and hypothesis that name measurable variables and a directional prediction.',
    teacherTip: 'Make hypotheses relational and testable. A good hypothesis predicts how a measured dependent variable changes when the independent variable changes and gives a scientific reason.',
    parentTip: 'Take an everyday “I wonder…” question and ask your child what would need to be changed, measured and controlled to test it fairly.',
    related: ['AC9S10I02', 'AC9S10I03'], diagram: null
  },
  AC9S10I02: {
    prerequisites: 'Students should identify variables, write a repeatable method, recognise hazards and distinguish validity from simply obtaining a result.',
    victoria: { codes: ['VC2S10I02'], label: 'Levels 9–10 valid investigations, control of variables, risk, ethics and bias considerations', strength: 'strong' },
    nsw: { codes: ['SC5-WS-03', 'SC5-WS-04'], label: 'Stage 5 Working scientifically — designs and conducts safe, ethical, valid and reliable investigations', strength: 'strong' },
    reasoning: 'Critique an investigation where two variables change at once, the sample is small and measurements are rounded heavily. Prioritise the design fixes that matter most for validity and reproducibility.',
    teacherTip: 'Treat risk, ethics and cultural protocols as design requirements, not a form completed after the method. Students should justify controls and sampling choices.',
    parentTip: 'Ask your child what would make a test “fair” and whether another student could reproduce the same method from the written instructions.',
    related: ['AC9S10I01', 'AC9S10I03'], diagram: null
  },
  AC9S10I03: {
    prerequisites: 'Students should read instrument scales, record units consistently and understand why repeated measurements and adequate sample size reduce the influence of random variation.',
    victoria: { codes: ['VC2S10I03'], label: 'Levels 9–10 precise measurement, appropriate equipment, sample size and repeatable data collection', strength: 'strong' },
    nsw: { codes: ['SC5-WS-01', 'SC5-WS-04', 'SC5-WS-05'], label: 'Stage 5 Working scientifically — accurate observations, conducting investigations and recording/processing data', strength: 'strong-partial' },
    reasoning: 'Two groups measure the same event with instruments of different resolution and different numbers of repeats. Decide which dataset is more useful and explain the trade-off between precision and sample size.',
    teacherTip: 'Make students record instrument resolution and units, not just values. Precision should be appropriate to the instrument rather than invented with extra decimal places.',
    parentTip: 'Use a ruler or kitchen scale and ask your child what the smallest meaningful reading is and why writing extra digits would be misleading.',
    related: ['AC9S10I02', 'AC9S10I04'], diagram: null
  },
  AC9S10I04: {
    prerequisites: 'Students should know graph axes, units, variable types and basic descriptive statistics such as mean, median, range and percentage where appropriate.',
    victoria: { codes: ['VC2S10I04'], label: 'Levels 9–10 tables, graphs, descriptive statistics, models and mathematical relationships for data', strength: 'strong' },
    nsw: { codes: ['SC5-WS-05'], label: 'Stage 5 Working scientifically — selects and uses tools to process and represent data', strength: 'strong' },
    reasoning: 'Given the same dataset, choose between a table, line graph, scatter plot and bar chart. Justify which representation best answers the investigation question and what information another representation would hide.',
    teacherTip: 'Representation choice should follow the variable types and question. Do not let graphing become a formatting exercise detached from interpretation.',
    parentTip: 'Show your child a small dataset and ask which graph type would make the pattern easiest to see and why.',
    related: ['AC9S10I03', 'AC9S10I05'], diagram: null
  },
  AC9S10I05: {
    prerequisites: 'Students should read graphs and tables, distinguish correlation from causation, calculate simple summary statistics and recognise an anomalous value.',
    victoria: { codes: ['VC2S10I05'], label: 'Levels 9–10 analysis of patterns, trends, relationships and anomalies in data and information', strength: 'strong' },
    nsw: { codes: ['SC5-WS-06'], label: 'Stage 5 Working scientifically — analyses data to identify trends, patterns and relationships and draws conclusions', strength: 'strong' },
    reasoning: 'A dataset has an overall trend but one clear anomaly. Explain three possible responses: keep it, repeat the measurement, or exclude it, and state what evidence would justify each decision.',
    teacherTip: 'An anomaly is not permission to delete a point. Students need a reason linked to method, measurement or evidence before excluding data.',
    parentTip: 'Ask your child to point out the main pattern in a graph and then identify any value that does not fit, explaining what they would check next.',
    related: ['AC9S10I04', 'AC9S10I06'], diagram: null
  },
  AC9S10I06: {
    prerequisites: 'Students should distinguish validity, reproducibility, precision and accuracy, and understand that every conclusion has a scope set by the method and evidence.',
    victoria: { codes: ['VC2S10I06'], label: 'Levels 9–10 evaluation of validity, reproducibility, bias, assumptions and uncertainty', strength: 'strong' },
    nsw: { codes: ['SC5-DA2-01', 'SC5-WS-06'], label: 'Stage 5 verifies claims using scientific knowledge/data and analyses evidence to draw conclusions', strength: 'strong' },
    reasoning: 'A conclusion is consistent with the collected data but the method sampled only one location. Decide whether the conclusion is internally supported, broadly valid, both or neither.',
    teacherTip: 'Teach students to evaluate method and conclusion separately. A calculation can be correct while the claim is too broad for the sample or design.',
    parentTip: 'When you see a headline saying “study proves…”, ask your child what sample, method and uncertainty they would want to inspect before accepting the claim.',
    related: ['AC9S10I05', 'AC9S10I07', 'AC9S10H01'], diagram: null
  },
  AC9S10I07: {
    prerequisites: 'Students should identify claims, evidence and reasoning, compare source quality and understand that ethical and cultural protocols can govern access to and use of information.',
    victoria: { codes: ['VC2S10I07'], label: 'Levels 9–10 evidence-based argument, evaluation of claims and ethical/cultural considerations when using information', strength: 'strong' },
    nsw: { codes: ['SC5-WS-08', 'SC5-DA2-01'], label: 'Stage 5 scientific arguments with evidence and verification of claims', strength: 'strong' },
    reasoning: 'Two sources reach different conclusions. Build an argument that weighs sample quality, method, uncertainty, source expertise and any ethical or cultural constraints before deciding which claim is better supported.',
    teacherTip: 'Require students to weigh evidence rather than count sources. Cultural protocols are part of ethical evidence use, especially for knowledge connected to Country/Place and communities.',
    parentTip: 'Choose two conflicting online science claims and ask your child which evidence they would trust more and what further information they need.',
    related: ['AC9S10I06', 'AC9S10I08', 'AC9S10H01'], diagram: null
  },
  AC9S10I08: {
    prerequisites: 'Students should structure a scientific explanation or argument, select relevant evidence and understand that purpose and audience determine language, detail and text features.',
    victoria: { codes: ['VC2S10I08'], label: 'Levels 9–10 communication of scientific ideas, findings and arguments for purpose and audience', strength: 'strong' },
    nsw: { codes: ['SC5-WS-08'], label: 'Stage 5 Working scientifically — communicates scientific arguments with evidence using appropriate scientific language', strength: 'strong' },
    reasoning: 'Communicate the same scientific finding to a Year 10 class and to a local community audience. Explain what information, vocabulary and visual/text features you would change and what must remain scientifically accurate.',
    teacherTip: 'Assess communication choices as well as correctness. Students should justify why a representation, level of detail and vocabulary suit the intended audience and purpose.',
    parentTip: 'Ask your child to explain one science idea twice: first to you in plain language, then as a formal school response. Compare what changes and what scientific meaning must stay the same.',
    related: ['AC9S10I07', 'AC9S10H03'], diagram: null
  }
};
