const metadata = {
  code: 'AC9S6I06',
  title: 'Communicate scientific ideas and findings',
  descriptor: 'write and create texts to communicate ideas and findings for specific purposes and audiences, including selection of language features, using digital tools as appropriate',
  learningIntention: 'We are learning to communicate scientific ideas and findings accurately for a chosen purpose and audience.',
  successCriteria: [
    'identify the purpose, audience and most suitable scientific text type',
    'organise methods, results and conclusions so evidence can be understood and checked',
    'use accurate terminology, quantities, units, graphs, captions and cautious claims',
    'adapt language and digital design without losing accuracy, accessibility or attribution'
  ]
};

let questionNumber = 0;
const q = (skill, stage, question, answers, correct, explanation, hint) => {
  const shift = questionNumber++ % 4;
  const rotated = answers.map((_, index) => answers[(index - shift + 4) % 4]);
  return {skill, stage, question, answers: rotated, correct: (correct + shift) % 4, explanation, hint};
};

const practice = [
  q('purpose','foundation','A student wants another class to repeat a seed test. Which text is most suitable?',['a procedural report','a slogan','a fictional story','an unlabelled photo'],0,'A procedural report supplies materials and ordered steps needed for repetition.','Match the text to repetition.'),
  q('audience','foundation','Which opening best suits a family infographic about saving water?',['Here are three evidence-based ways your family can reduce water use.','Evapotranspiration coefficients are imperative.','Water is cool!!!','Method: Trial 1.'],0,'It addresses families directly and states a clear, useful purpose without sacrificing accuracy.','Choose accessible, purposeful language.'),
  q('accuracy','foundation','Which sentence is scientifically accurate?',['The plant grew 18 mm in seven days.','The plant grew heaps.','The plant loved the lamp.','The lamp made it perfect.'],0,'The sentence reports a measured change with a quantity and unit.','Prefer measurable evidence.'),
  q('units','foundation','Which sentence communicates the measured result completely?',['The water cooled by 12 °C.','The water cooled by 12.','The water cooled lots.','The water was 12 long.'],0,'The number needs a temperature unit to communicate its meaning.','Numbers need units.'),
  q('structure','foundation','Which section tells what equipment and steps were used?',['method','conclusion','title','references'],0,'The method records materials and procedures.','Where could another scientist check what was done?'),
  q('structure','foundation','Where should raw measurements usually appear?',['results table','prediction only','title','audience greeting'],0,'A results table organises observations and measurements transparently.','Find the evidence section.'),
  q('claim evidence','foundation','Which conclusion uses evidence?',['Plants given 20 mL daily had a mean height of 14 cm, 4 cm taller than the 10 mL group.','I liked the experiment.','Green is best.','The answer is obvious.'],0,'It states the pattern and supports it with measured comparison.','Look for a claim plus data.'),
  q('precision','foundation','Which word should replace “really hot” in a report?',['62 °C','awesome','burning-ish','very'],0,'A measured value and unit are more precise than emotive description.','Use measurement.'),
  q('graphs','foundation','Which graph best shows temperature measured every minute?',['line graph','pie chart','decorative icon','word cloud'],0,'A line graph clearly displays change across ordered time points.','Time-series data need ordered points.'),
  q('captions','foundation','Which caption most clearly explains the scientific result shown?',['Figure 1. Mean water temperature decreased from 70 °C to 42 °C over 10 minutes.','Cool graph','Results!!!','Blue line.'],0,'It identifies the figure, variables, units and important pattern.','A caption should explain what the visual shows.'),
  q('accessibility','foundation','What helps readers who cannot see a graph?',['concise alt text describing its variables and main pattern','colour alone','tiny labels','an empty caption'],0,'Alt text communicates the essential content of a visual.','Provide a text equivalent.'),
  q('attribution','foundation','A student uses a CSIRO diagram. What should they do?',['name the creator/source and provide a link or reference','remove the logo and claim it','write found online','give no source'],0,'Attribution allows readers to identify and check the source and respects its creator.','Credit the source.'),
  q('purpose','core','Which purpose best matches a recommendation to council?',['support a decision with evidence and trade-offs','entertain with invented results','hide uncertainty','list steps only'],0,'A recommendation uses evidence to justify a feasible response while recognising limits.','Decision texts justify a choice.'),
  q('audience adaptation','core','A class report says “the dependent variable”. For younger children, which adaptation is accurate?',['the result we measured','the thing we guessed','the equipment we changed','the answer we wanted'],0,'The plain-language phrase preserves the scientific meaning.','Simplify wording, not meaning.'),
  q('audience adaptation','core','For scientists, which detail should remain even if a public poster omits procedural minutiae?',['measurement units and evidence source','decorative border','emoji count','favourite colour'],0,'Units and sources are essential for interpreting and checking evidence.','Integrity stays constant.'),
  q('report order','core','Which order most logically communicates a completed scientific investigation?',['question → method → results → conclusion','conclusion → title → invented data → method','results → unrelated story → question','references → prediction → no evidence'],0,'The sequence shows what was asked, what was done, what was found and what it means.','Follow the investigation chain.'),
  q('method clarity','core','Which instruction is repeatable?',['Add 20 mL water to each pot at 9 am daily for seven days.','Add some water often.','Water carefully.','Keep plants happy.'],0,'It gives quantity, timing, frequency and duration.','Replace vague terms.'),
  q('results vs conclusion','core','Which sentence belongs in results?',['The mean fall time was 2.8 s.','Larger parachutes probably fell more slowly because of air resistance.','We predict 3 s.','Use scissors safely.'],0,'Results report observations; explanations belong in discussion or conclusion.','Separate observation from interpretation.'),
  q('cautious language','core','Which claim stays within the evidence from one class test?',['Under our tested conditions, the shaded trays lost less water.','Shade always prevents evaporation everywhere.','The test proves all climates behave identically.','One result is a universal law.'],0,'The wording limits the claim to the tested conditions.','Do not generalise beyond the evidence.'),
  q('limitations','core','Why should a scientific report include a relevant limitation?',['to explain how a method or evidence constraint affects confidence','to make the report sound negative','to replace results','to excuse invented data'],0,'A relevant limitation helps readers judge how strongly the evidence supports the claim.','Explain an evidence boundary.'),
  q('graph selection','core','Which graph suits mean plant height for four fertiliser amounts?',['column graph','map','word cloud','unscaled drawing'],0,'A column graph compares numerical results across discrete treatment categories.','Compare categories.'),
  q('graph labels','core','Which y-axis label is complete?',['Mean plant height (cm)','Height','Numbers','Plant result'],0,'It names the measured quantity, summary and unit.','Label quantity and unit.'),
  q('caption integrity','core','A graph ranges from 18 to 20 cm. Which caption is least misleading?',['Groups differed by at most 2 cm; note the y-axis begins at 18 cm.','Growth exploded.','One group was infinitely taller.','The axis proves a huge effect.'],0,'It reports the actual difference and discloses the truncated scale.','Describe magnitude and scale honestly.'),
  q('visual density','core','For a family infographic, what is best?',['a clear heading, short accurate points and one labelled visual','six dense paragraphs in 8-point type','pictures without evidence','every raw calculation'],0,'The design reduces reading load while keeping evidence visible.','Select, organise and label.'),
  q('accessibility','core','Which graph design is most accessible?',['distinct line styles plus labels and high contrast','red and green lines distinguished only by colour','tiny pale text','no legend'],0,'Multiple visual cues help colour-blind readers and direct labels reduce ambiguity.','Do not rely on colour alone.'),
  q('digital tools','core','What is a valid reason to use a spreadsheet?',['calculate and graph recorded data while retaining the values','make weak evidence true','remove every uncertainty','choose the conclusion automatically'],0,'A spreadsheet can organise and display data, but it cannot repair evidence or decide interpretation.','Tools support, not guarantee, quality.'),
  q('digital integrity','core','After creating a graph digitally, what must be checked?',['data range, labels, units and scale','only background colour','number of animations','font novelty'],0,'Digital defaults can select wrong data or scales, so scientific and visual checks remain necessary.','Verify the output against the data.'),
  q('attribution','core','Which reference is most useful?',['CSIRO, “Soil moisture”, 2025, URL, accessed 11 Sep 2026','Internet','Google','a website'],0,'Creator, title, date and location make the source identifiable and checkable.','Give enough detail to find it.'),
  q('paraphrasing','core','What should a student do when restating a source in their own words?',['cite the source because the idea still came from it','omit citation because words changed','copy most words without quotation','change the data'],0,'Paraphrasing changes expression, not ownership of the underlying idea or evidence.','Ideas also require attribution.'),
  q('source evaluation','core','Which source is strongest for an Australian rainfall claim?',['Bureau of Meteorology data','an anonymous meme','a fictional diary','an advertisement with no data'],0,'An authoritative agency supplies traceable methods and data relevant to the claim.','Choose relevant, accountable evidence.'),
  q('purpose and format','application','Students must warn classmates about UV exposure using school measurements. Best product?',['a concise safety poster with UV data, action advice and source','a full lab notebook on every wall','an uncaptioned sun photo','a joke without evidence'],0,'A poster suits quick action, while data and attribution preserve integrity.','Fit format to context and purpose.'),
  q('two audiences','application','Which pair accurately adapts the same result?',['Peers: “mean fell 3.2 °C”; families: “it cooled by about 3 °C on average”','Peers: “3.2 °C”; families: “it froze solid”','Peers: exact data; families: invented data','Both: no units'],0,'“Mean fell 3.2 °C” and “cooled by about 3 °C on average” preserve the same finding while adapting detail for each audience.','Meaning must remain stable.'),
  q('irrelevant detail','application','A two-minute community talk recommends shade trees. Which detail is least necessary?',['the presenter’s favourite tree name','local temperature evidence','a feasible recommendation','one limitation'],0,'Personal preference does not support the scientific recommendation.','Keep details that serve purpose and audience.'),
  q('method repair','application','Repair “We tested evaporation normally.”',['We placed 50 mL in identical dishes for 30 minutes and measured mass loss in grams.','We did it well.','We observed water somehow.','The method was normal.'],0,'The repair states quantity, setup, duration, measured outcome and unit.','Operationalise actions.'),
  q('graph critique','application','A graph of mass loss has no units. What is the main problem?',['readers cannot interpret the numerical magnitude','the colours are boring','the title is too scientific','the bars are rectangular'],0,'Without units, values lack defined measurement meaning.','Ask what the numbers represent.'),
  q('caption critique','application','Caption: “Plants love blue light.” What is the best revision?',['In this 14-day test, the blue-light group had 6 mm greater mean growth than the red-light group.','Blue wins!','Plants always prefer blue.','The graph is pretty.'],0,'The revision replaces anthropomorphism and overclaiming with scoped quantitative evidence.','State result, context and magnitude.'),
  q('claim limitation','application','Only two temperature readings were collected. Which conclusion is responsible?',['The two readings suggest cooling, but more measurements are needed to describe the pattern.','Cooling is proven for all objects.','The missing readings can be guessed.','Limitations never matter.'],0,'It reports the observed direction while acknowledging insufficient detail.','Match confidence to evidence.'),
  q('accessibility','application','A video explains a circuit. Which addition most improves access?',['accurate captions and a transcript','faster flashing text','music over speech','colour-only instructions'],0,'Captions and transcripts support readers with hearing, language or playback constraints.','Provide an equivalent form.'),
  q('alt text','application','Which alt text best describes a graph?',['Line graph: water temperature falls from 65 °C at 0 min to 41 °C at 10 min.','graph','blue picture','see above'],0,'It gives the visual type, variables, units and main pattern concisely.','Describe content, not decoration.'),
  q('data ethics','application','A spreadsheet result conflicts with raw measurements. What should happen?',['check formula, cell range and transcription before reporting','delete the raw data','choose the nicer answer','hide the conflict'],0,'The digital process must be audited against source evidence.','Trace output back to inputs.'),
  q('image attribution','application','A licence allows reuse with credit. Which action complies?',['include creator, title, source and licence','crop out attribution','claim authorship','share without conditions'],0,'Credit and licence details meet the stated reuse condition and help readers trace the work.','Follow licence terms.'),
  q('community recommendation','application','Which statement best supports a wetland recommendation?',['Monthly counts fell from 42 to 25 frogs; protect breeding edges while acknowledging seasonal counts are limited.','Frogs are cute, so agree.','Science guarantees this is the only choice.','No evidence is needed.'],0,'It combines evidence, action and an honest limitation.','Use data and qualify the recommendation.'),
  q('technical language','challenge','When is a technical term useful?',['when it expresses an idea precisely and is defined for the audience if needed','whenever it sounds advanced','when it replaces evidence','only in titles'],0,'Terminology serves clarity and precision, not status.','Ask whether the term helps meaning.'),
  q('misleading scale','challenge','Bars of 99 and 100 start at 98, making one appear twice as tall. Best response?',['show a scale appropriate to the message and state the 1-unit difference','keep it because dramatic graphs persuade','remove axis numbers','call it a 100% increase'],0,'The display should not visually exaggerate a small absolute difference.','Check proportional visual impression.'),
  q('integrated communication','challenge','Which report ending is strongest?',['The treated group averaged 12.4 cm versus 10.1 cm; this supports an effect under our conditions, though one-week duration limits generalisation.','Treatment always works.','We were correct.','The graph proves everything.'],0,'It provides comparative evidence, a scoped inference and a relevant limitation.','Claim + evidence + boundary.'),
  q('multimodal design','challenge','A digital presentation includes narration, graph and text. What avoids unnecessary duplication?',['use narration to explain the clearly labelled graph and keep on-screen text concise','read every dense paragraph verbatim','hide graph labels','add unrelated animations'],0,'Complementary modes reduce overload while preserving essential evidence on screen.','Each mode should have a purpose.'),
  q('integrity','challenge','What may change when adapting a scientific report for children?',['word choice, examples and amount of procedural detail','measured results and units to make a better story','the source of evidence','whether uncertainty existed'],0,'Communication choices can change, but scientific facts, evidence and attribution must remain accurate.','Adapt presentation, not truth.'),
  q('review','challenge','Before publishing, which checklist is strongest?',['purpose and audience clear; evidence accurate; units, labels, captions, limitations, accessibility and sources checked','bright colours only','spellcheck only','many technical words'],0,'The complete check covers scientific integrity, communication effectiveness and inclusive access.','Review both science and design.')
];

const test = [
  q('purpose','assessment','A ranger wants visitors to follow a new track rule supported by erosion data. Best text?',['a brief sign with the rule, evidence reason and clear action','a raw notebook only','an untitled spreadsheet','a fictional ending'],0,'A concise public sign matches immediate decision and action while giving an evidence-based reason.','Fit purpose and setting.'),
  q('audience','assessment','Which sentence best explains insulation to Year 3 students?',['Insulation slows heat transfer, helping warm things stay warm longer.','Thermal conductivity coefficients mediate flux.','Insulation creates heat forever.','It is magic wrapping.'],0,'It is accessible and scientifically accurate without unnecessary jargon.','Simplify accurately.'),
  q('structure','assessment','Where should a reader find whether results supported the prediction?',['conclusion','equipment list','title','reference date'],0,'The conclusion interprets results in relation to the question or prediction.','Find interpretation.'),
  q('method','assessment','Which method detail is essential for repeating a sound-level test?',['distance from meter to source','presenter’s opinion','poster colour','conclusion wording'],0,'Sound level varies with distance, so its measurement setup must be specified.','Include influential setup details.'),
  q('results','assessment','Which statement reports rather than explains?',['The shaded cup lost 6 g of water.','Shade reduced heating, which may have slowed evaporation.','We recommend shade.','Our prediction was sensible.'],0,'It states a measured observation without causal interpretation.','Results first, explanation later.'),
  q('conclusion','assessment','Data are 8.1, 8.0 and 8.2 s for A; 6.0, 6.2 and 6.1 s for B. Best conclusion?',['B had a lower mean time (6.1 s) than A (8.1 s) in these trials.','B is always fastest everywhere.','A and B were identical.','Times have no units.'],0,'It accurately compares means and scopes the statement to collected evidence.','Calculate and qualify.'),
  q('graphs','assessment','A report compares counts in five habitats. Best display?',['column graph with habitat categories and count axis','line graph implying continuous habitat order','pie chart without totals','decorative map only'],0,'Columns compare discrete categories without implying continuous change.','Categories suit columns.'),
  q('caption','assessment','A figure shows three trials, not means. Which caption is accurate?',['Figure 2. Fall times for each of three trials at each parachute size.','Figure 2. Proven average fall time.','Big parachutes always win.','Results.'],0,'It accurately identifies what the figure contains without inventing averaging or certainty.','Describe exactly what is shown.'),
  q('misleading visual','assessment','A pictograph uses one leaf for 10 plants, but half-leaf symbols are unexplained. Best repair?',['add a key including the half-symbol value','use more colours','remove all numbers','enlarge the title'],0,'A complete key lets readers decode quantities accurately.','Explain every symbol.'),
  q('accessibility','assessment','A heat map relies on red–green colour differences. Best improvement?',['add patterns or values and a clear legend','make colours paler','remove labels','animate faster'],0,'Redundant cues make the data readable without colour discrimination.','Do not encode meaning by colour alone.'),
  q('digital tools','assessment','An app automatically chooses a 3D pie chart. What should the author do?',['replace it if distortion makes comparison difficult','accept every default','hide the underlying data','increase perspective'],0,'Tool defaults require human evaluation for accurate, readable representation.','Digital does not mean clear.'),
  q('attribution','assessment','A student modifies an open-licensed diagram. What should the credit indicate?',['original creator/source, licence and that it was adapted','only the student’s name','no credit after modification','search engine name'],0,'Adaptation does not erase the original creator or licence conditions.','Credit origin and changes.'),
  q('two audiences','assessment','Which pair preserves one finding for two audiences?',['Report: “mean decreased 4.6 °C”; announcement: “the average fell by about 5 °C”','Report: “4.6 °C”; announcement: “it doubled”','Report gives data; announcement reverses it','both omit the measured quantity'],0,'Rounding suits the public announcement while preserving direction and approximate magnitude.','Adapt precision honestly.'),
  q('limitation','assessment','A survey includes only one school. Which limitation is most relevant?',['results may not represent students in other schools','the font was blue','tables had lines','the title was short'],0,'The sampling boundary affects generalisation beyond the studied school.','Connect limitation to inference.'),
  q('recommendation','assessment','Which recommendation appropriately combines science and uncertainty?',['Trial the filter because it removed 78% of particles in our test, then monitor performance in real water.','Buy it because one student likes it.','It removes every pollutant forever.','Uncertainty means no decision is possible.'],0,'It uses measured evidence for a proportionate next step and addresses transfer uncertainty.','Evidence can support a monitored action.'),
  q('integrated review','assessment','A family infographic is simple and colourful but omits units, sources and alt text. Best judgement?',['audience-friendly design does not compensate for missing accuracy, traceability and accessibility','it is complete because it is colourful','units matter only to scientists','digital texts need no sources'],0,'Effective adaptation must retain scientific integrity and provide inclusive access.','Check what must remain constant.')
];

const worksheet = [
  {question:'Turn this result into a precise results sentence: “The water got colder.” Initial 68 °C; final 44 °C after 10 minutes.',modelAnswer:'The water temperature decreased from 68 °C to 44 °C over 10 minutes, a decrease of 24 °C.'},
  {question:'Write a repeatable three-step method for comparing evaporation from wide and narrow dishes.',modelAnswer:'Add 50 mL of water to identical-material wide and narrow dishes. Place them side by side for 60 minutes under the same conditions. Measure final volume in mL with the same cylinder and repeat three times.'},
  {question:'Organise these report parts: conclusion, question, results, method, title.',modelAnswer:'Title, question, method, results, conclusion.'},
  {question:'Draft a graph title and both axis labels for plant height measured daily for 14 days.',modelAnswer:'Title: Plant height over 14 days. x-axis: Time (days). y-axis: Plant height (cm).'},
  {question:'Rewrite “Blue light makes plants grow way better” as an evidence-based conclusion using means of 46 mm and 39 mm.',modelAnswer:'Under the tested conditions, plants under blue light had a mean growth of 46 mm, 7 mm greater than the red-light group mean of 39 mm.'},
  {question:'Write a caption for a line graph showing temperature falling from 72 °C to 48 °C in 12 minutes.',modelAnswer:'Figure 1. Water temperature decreased from 72 °C to 48 °C during the 12-minute cooling investigation.'},
  {question:'Explain how you would communicate the same soil-moisture finding to scientists and to families.',modelAnswer:'For scientists, report methods, raw data, units, analysis and uncertainty. For families, use plain accurate language, one labelled graph and practical meaning, while retaining key evidence, units and source.'},
  {question:'Write alt text for a column graph where shaded soil lost 9 g water and sunny soil lost 17 g.',modelAnswer:'Column graph comparing mean water loss: shaded soil lost 9 g and sunny soil lost 17 g, so sunny soil lost 8 g more.'},
  {question:'Identify two accessibility faults in a graph using tiny text and red/green colour alone, and repair them.',modelAnswer:'Enlarge labels and use high contrast; add patterns, direct labels or distinct symbols so colour is not the only cue.'},
  {question:'Create a complete attribution placeholder for an adapted CSIRO image.',modelAnswer:'Adapted from: CSIRO, “Image title”, year, URL, accessed date, licence. Changes: labels simplified/cropped as applicable.'},
  {question:'Write a community recommendation from evidence that litter counts fell from 36 to 19 after bins were installed, including one limitation.',modelAnswer:'Retain and trial the new bins more widely because litter fell from 36 to 19 items at the observed site; continue monitoring because the short single-site comparison may not represent other times or locations.'},
  {question:'Make a pre-publication checklist for a digital science text.',modelAnswer:'Check purpose and audience; factual accuracy; method/results distinction; evidence, units and cautious claims; graph scale, labels and captions; relevant limitation; readable layout; alt text/captions/transcript; source attribution and licence.'}
];

const topicSections = [
  {heading:'Purpose and audience come first',body:'Decide what the text must achieve and who will use it. A repeatable procedure, peer results report, family infographic, community recommendation and class presentation need different structures and levels of detail.'},
  {heading:'Accuracy does not change',body:'Audience adaptation may change vocabulary, examples and visual density, but not measurements, units, evidence, uncertainty or attribution. Plain language must remain scientifically correct.'},
  {heading:'Structure a scientific report',body:'A useful sequence is title and question, prediction where relevant, materials and method, results, discussion or explanation, conclusion, limitations and sources. Keep observations separate from interpretations.'},
  {heading:'Methods another person can follow',body:'Replace vague words with materials, quantities, timing, measurement endpoints, units and ordered actions. Include the conditions needed to reproduce the investigation.'},
  {heading:'Claims need evidence and boundaries',body:'State the observed pattern, cite comparative values, explain what they support and limit the claim to tested conditions. Acknowledge limitations that affect confidence or generalisation.'},
  {heading:'Graphs and captions',body:'Choose a graph for the data relationship, label axes with quantities and units, use an honest scale and write a caption that identifies the figure and main pattern without overclaiming.'},
  {heading:'Clear digital design',body:'Use headings, readable type, short blocks and visuals that serve the message. Check spreadsheet ranges and automated chart choices; digital tools can improve organisation but do not guarantee clarity or correctness.'},
  {heading:'Accessible communication',body:'Do not rely on colour alone. Use contrast, direct labels, patterns, alt text for informative visuals, captions and transcripts for media, and meaningful link text.'},
  {heading:'Attribute sources',body:'Credit evidence, images and ideas with creator, title, date, source location and licence where relevant. Paraphrased ideas still need citation; adaptations should be identified.'},
  {heading:'Review before publishing',body:'Check purpose, audience, accuracy, structure, evidence, units, claims, limitations, visual honesty, accessibility, spelling and source attribution.'}
];

const vocabulary = [
  {term:'audience',definition:'the people a communication is designed for'},
  {term:'purpose',definition:'what a text is intended to achieve'},
  {term:'procedure',definition:'an ordered account of how an investigation is conducted'},
  {term:'results',definition:'recorded observations and measurements'},
  {term:'conclusion',definition:'an interpretation answering the question using evidence'},
  {term:'caption',definition:'text identifying and explaining a figure, table or visual'},
  {term:'limitation',definition:'a constraint that affects confidence, interpretation or generalisation'},
  {term:'attribution',definition:'credit identifying the creator or source of information or media'},
  {term:'alt text',definition:'a concise text equivalent describing meaningful visual content'},
  {term:'scientific integrity',definition:'communicating methods, evidence, uncertainty and sources honestly and accurately'}
];

const misconceptions = [
  {claim:'Simpler language can be less accurate.',correction:'Plain language should reduce jargon while preserving the exact scientific meaning and evidence.'},
  {claim:'More technical words always improve science writing.',correction:'Use a technical term only when it adds precision, and define it when the audience may not know it.'},
  {claim:'A colourful infographic does not need much evidence.',correction:'Visual appeal cannot replace data, units, accurate claims and sources.'},
  {claim:'Procedure and conclusion are interchangeable.',correction:'A procedure records what was done; a conclusion interprets what the results mean.'},
  {claim:'Digital tools guarantee clarity.',correction:'Authors must check formulas, selections, scales, labels, accessibility and whether the tool output fits the purpose.'}
];

const importantQA = [
  {question:'Can I round data for a general audience?',answer:'Yes, when the rounding is suitable and does not alter the message; retain units and avoid implying false precision.'},
  {question:'What must every evidence graph include?',answer:'A clear title or context, labelled axes, quantities and units, a readable honest scale, and a caption or surrounding explanation.'},
  {question:'Do I cite a source after paraphrasing?',answer:'Yes. The wording is yours, but the idea or evidence still came from that source.'},
  {question:'What makes a conclusion scientific?',answer:'It answers the question using specific results, stays within the evidence and acknowledges important limitations.'}
];

const steps = ['Identify the purpose and audience.','Select the most suitable text type and essential content.','Organise question, method, results, explanation and conclusion logically.','Use accurate terms, quantities, units and evidence.','Choose honest graphs, labels and captions.','Adapt language and layout for clarity and accessibility.','Attribute sources and review every claim before publishing.'];

const slides = [
  {title:'Curriculum',kicker:'AC9S6I06',body:[metadata.descriptor]},
  {title:'Learning intention',body:[metadata.learningIntention,...metadata.successCriteria]},
  {title:'Purpose and audience',body:[topicSections[0].body,'Ask: What should readers understand or do?']},
  {title:'Accuracy stays constant',body:[topicSections[1].body,'Adapt presentation, not truth.']},
  {title:'Report structure',body:[topicSections[2].body,'Question → method → results → conclusion.']},
  {title:'Evidence-based claims',body:[topicSections[4].body,'Use values, units and cautious scope.']},
  {title:'Graphs and captions',body:[topicSections[5].body,'A visual must inform without exaggerating.']},
  {title:'Digital tools',body:[topicSections[6].body,'Check every automated choice.']},
  {title:'Accessibility',body:[topicSections[7].body,'Provide equivalent ways to access meaning.']},
  {title:'Attribution',body:[topicSections[8].body,'Credit evidence, ideas and media.']},
  {title:'Important questions',body:importantQA.map(({question,answer}) => `${question} ${answer}`)},
  {title:'Exit ticket',body:['Adapt one cooling result for a scientific report and a family infographic.','Include a value and unit, caption, limitation, accessibility feature and source credit.']}
];

if (practice.length !== 48) throw new Error(`AC9S6I06 practice count ${practice.length}; expected 48`);
if (test.length !== 16) throw new Error(`AC9S6I06 test count ${test.length}; expected 16`);
if (worksheet.length !== 12) throw new Error(`AC9S6I06 worksheet count ${worksheet.length}; expected 12`);
for (const [bankName, bank] of [['practice', practice], ['test', test]]) bank.forEach((item,index) => {
  if (item.answers.length !== 4) throw new Error(`${bankName} ${index + 1}: expected four answers`);
  if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct > 3) throw new Error(`${bankName} ${index + 1}: invalid correct index`);
});

export default {
  code: metadata.code,
  descriptor: metadata.descriptor,
  title: metadata.title,
  learningIntention: metadata.learningIntention,
  successCriteria: metadata.successCriteria,
  vocabulary,
  steps,
  topicSections,
  misconceptions,
  importantQA,
  assessmentHints: ['State the purpose and audience before choosing a format.','Keep scientific meaning, values and units accurate when simplifying language.','Separate procedure, results and conclusion.','Support each claim with relevant evidence and scope it to tested conditions.','Check graph type, scale, labels, units and caption.','Include relevant limitations, accessibility features and traceable source attribution.'],
  exitTicket: 'Communicate one investigation finding for two audiences, preserving evidence and units while adapting language, format and visual detail.',
  masteryEvidence: 'The student creates accurate, well-structured and audience-appropriate scientific texts that use evidence, units, honest visuals, cautious conclusions, accessible digital features and source attribution.',
  practice,
  test,
  worksheet,
  slides
};
