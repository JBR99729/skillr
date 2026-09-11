const metadata = {
  code: 'AC9S6I03',
  title: 'Observe, measure and record with reasonable precision',
  descriptor: 'use equipment to observe, measure and record data with reasonable precision, using digital tools as appropriate',
  learningIntention: 'We are learning to select and use suitable equipment, units and recording methods so scientific data have reasonable precision.',
  successCriteria: [
    'match a measured variable to suitable analogue or digital equipment and units',
    'read scales correctly and record values only to the resolution supported by the instrument',
    'use consistent procedures and tables to produce comparable data',
    'distinguish instrument resolution, repeat-measurement precision and accuracy'
  ]
};

const q = (skill, stage, question, answers, correct, explanation, hint) => ({skill, stage, question, answers, correct, explanation, hint});

const practice = [
  q('equipment','foundation','Which tool is best for measuring the length of a leaf?',['stopwatch','ruler','balance','thermometer'],1,'A ruler measures length; centimetres or millimetres are suitable units.','Match the tool to the variable.'),
  q('units','foundation','Which unit is most appropriate for recording the mass of an apple?',['grams','litres','seconds','degrees Celsius'],0,'Grams are an appropriate metric unit for the relatively small mass of an apple.','Mass is not volume.'),
  q('equipment','foundation','Which tool measures 40 mL of water most suitably?',['metre ruler','spring balance','measuring cylinder','stopwatch'],2,'A measuring cylinder is graduated for liquid volume.','Look for a vessel with a volume scale.'),
  q('units','foundation','Which unit is reasonable for the time a toy car takes to cross a desk?',['kilometres','grams','millilitres','seconds'],3,'Seconds are appropriate for a short duration.','Time needs a time unit.'),
  q('temperature','foundation','Which instrument measures water temperature?',['thermometer','ruler','balance','beaker'],0,'A thermometer measures temperature, normally in degrees Celsius in this context.','Choose the temperature tool.'),
  q('observation','foundation','Which is a quantitative observation?',['the soil feels gritty','the flower is yellow','the seedling is 63 mm tall','the liquid smells sharp'],2,'63 mm is a measured numerical observation with a unit.','Quantitative data include numbers.'),
  q('units','foundation','A classroom doorway height is most reasonably recorded in',['millilitres','metres','grams','seconds'],1,'Metres are a sensible length unit for a doorway.','Consider the size and quantity.'),
  q('recording','foundation','Which record is scientifically complete?',['plant: 12','plant: tall','plant height: 12 cm','plant: about twelve things'],2,'It identifies the variable, value and unit.','A number needs meaning and a unit.'),
  q('scale reading','foundation','A ruler has marks every 1 mm. A leaf tip is at 54 mm. What should be recorded?',['54 mm','54.00 mm','about 5 m','54 mL'],0,'54 mm matches the scale and quantity without unsupported digits.','Use the marked scale.'),
  q('digital tools','foundation','Which digital tool can automatically record temperature every minute?',['digital balance','data-logging temperature probe','calculator','camera flash'],1,'A logging probe can collect temperature at regular intervals.','Choose a sensor for the variable.'),
  q('volume','foundation','To read water in a measuring cylinder, your eye should be',['well above the liquid','level with the meniscus','below the bench','closed'],1,'Eye-level viewing reduces parallax error.','View the scale straight on.'),
  q('precision','foundation','Measurements of 10.2, 10.2 and 10.3 cm are',['closely grouped and therefore precise','perfectly accurate by definition','low resolution because decimals appear','not measurements'],0,'Close repeated readings show good repeat-measurement precision. Accuracy requires a trusted reference.','Precision concerns agreement among repeats.'),
  q('resolution','core','What is the resolution of a ruler whose smallest divisions are 1 mm?',['1 cm','10 mm','1 mm','0.01 mm'],2,'Resolution is the smallest marked or displayed increment, here 1 mm.','Find the smallest division.'),
  q('precision','core','Which set has the greatest repeat-measurement precision?',['8.1, 8.2, 8.1 g','7, 9, 11 g','4, 8, 12 g','2, 7, 14 g'],0,'The readings 8.1, 8.2 and 8.1 g have the smallest spread, so they agree most closely.','Compare the spreads.'),
  q('resolution vs precision','core','A probe displays 21.37°C but repeat readings range from 19.80°C to 23.10°C. Which statement is sound?',['It is accurate because it is digital.','Its fine resolution does not make the readings precise.','Its resolution is 1°C.','The range proves the true value.'],1,'The 0.01°C display gives fine resolution, while the wide spread indicates poor repeat precision.','Displayed increments and repeat agreement differ.'),
  q('accuracy','core','A balance repeatedly reads 12.0 g for a certified 15.0 g mass. The readings are',['precise but inaccurate','accurate but imprecise','both proven valid and accurate','too large to compare'],0,'They agree with one another but are far from the reference, suggesting systematic error.','Compare consistency with closeness to a reference.'),
  q('parallax','core','Which action reduces parallax when reading a thermometer?',['read from an angle','place the scale at eye level','round before looking','change units each trial'],1,'Looking perpendicular to the scale prevents apparent shifts caused by viewing angle.','Align your eye with the reading.'),
  q('meniscus','core','For water in a standard measuring cylinder, volume is commonly read at the',['top of the cylinder','bottom of the meniscus at eye level','highest printed number','rim of the vessel'],1,'The bottom of water’s curved meniscus is read at eye level.','Look at the liquid curve.'),
  q('equipment choice','core','Which tool best compares masses of soil samples near 25 g?',['30 cm ruler','100 mL cylinder','digital balance reading to 0.1 g','wall clock'],2,'A balance with 0.1 g resolution is suited to this mass comparison.','Match both quantity and useful scale.'),
  q('reasonable precision','core','A stopwatch displays hundredths of a second, but a student starts it by hand. Which record is most honest for a roughly 8-second event?',['8.374829 s','exactly 8 s with no uncertainty','8.37 s as displayed, while noting reaction-time limitation','8000 kg'],2,'The displayed value may be recorded, but its last digits are limited by human reaction time and should not be overclaimed.','Consider instrument and procedure.'),
  q('tables','core','Which heading is complete for seedling measurements?',['Height','Results','Seedling height (mm)','Numbers'],2,'The heading gives the variable and unit.','A table heading needs quantity and unit.'),
  q('consistent recording','core','Which column is recorded most consistently?',['8 cm, 82 mm, 0.9 m','8.0 cm, 8.2 cm, 8.1 cm','eight, 8.2 cm, tall','8 cm, blank, maybe 9'],1,'All values use the same unit and decimal convention, making comparisons straightforward.','Look for one unit and format.'),
  q('sampling','core','Soil pH is measured at four sites. What must be recorded with each value?',['only the student name','site identifier and pH value','a guessed colour','the final conclusion'],1,'Linking every measurement to its sampling site preserves its scientific meaning.','Data need context.'),
  q('digital tools','core','Why use a light sensor rather than describing light as “bright” or “dim”?',['it guarantees truth','it produces comparable numerical measurements','it removes the need for units','it never requires calibration'],1,'Numerical sensor readings allow consistent comparison, although calibration and units still matter.','Think measurable comparison.'),
  q('estimation','core','Which statement correctly distinguishes an estimate from a measurement?',['An estimate is a reasoned approximation; a measurement uses an instrument and unit.','They always mean exactly the same thing.','An estimate is always more precise.','A measurement never has uncertainty.'],0,'Estimates approximate; measurements are obtained using defined equipment and units.','One uses a measuring process.'),
  q('range','core','Repeated masses are 14.1, 14.2, 14.1 and 14.8 g. What should be checked?',['whether 14.8 g arose from a procedural or recording issue','whether grams should become litres','whether all values can be replaced by 14.1','whether the balance is a ruler'],0,'The separated reading should be investigated and repeated, not silently changed or discarded.','Notice the unusual value.'),
  q('equipment limits','core','Why is a 1 L kitchen jug unsuitable for measuring 3 mL accurately?',['It is transparent.','Its scale divisions are too coarse for 3 mL.','Litres cannot measure volume.','It is larger than the desk.'],1,'The jug lacks the resolution needed for such a small volume.','Compare the quantity with the smallest division.'),
  q('units','core','Which record is a plausible soil temperature?',['18°C','18 mL','18 g','18 km'],0,'Degrees Celsius measure temperature.','Match unit to variable.'),
  q('zero check','core','Before using a digital balance, a student should',['tare or zero it with the empty container if needed','add two random decimals','hold it sideways','change grams to seconds'],0,'Zeroing removes the container or baseline reading as instructed.','Establish the measurement baseline.'),
  q('repeat method','core','To compare water temperature over time, measurements should be taken',['at random times with different probes','at fixed intervals using the same checked probe position','only when a change looks large','without recording units'],1,'Fixed intervals and consistent probe placement improve comparability.','Keep the measurement procedure consistent.'),
  q('fieldwork','application','Students compare soil compaction at two sites. Which plan gives usable data?',['Press by hand and write hard/soft.','Use the same approved compaction tool, depth rule and units at several labelled points.','Use a different method at every point.','Measure only the wettest-looking spot.'],1,'Consistent equipment, sampling and units produce comparable, more representative records.','Standardise how and where measurements are made.'),
  q('scale reading','application','A cylinder has 2 mL divisions. The meniscus lies exactly on 36 mL. Which entry is justified?',['36 mL','36.000 mL','0.036 g','about 100 mL'],0,'36 mL is supported by the marked scale; extra zeros imply unsupported resolution.','Do not invent finer detail.'),
  q('mixed units','application','Plant heights are 9.5 cm, 102 mm and 0.11 m. What should happen before comparing?',['Convert all to one common length unit.','Remove the largest.','Treat the numbers as already identical units.','Average 9.5, 102 and 0.11 directly.'],0,'Common units are required before numerical comparison or calculation.','Convert before calculating.'),
  q('digital accuracy','application','Which claim about a digital sensor is correct?',['Digital readings are always exact.','More displayed digits guarantee validity.','It may have fine resolution but still be miscalibrated or poorly positioned.','It needs no unit.'],2,'Digital format does not eliminate calibration, positioning or sampling errors.','A display cannot guarantee correctness.'),
  q('instrument selection','application','Rainfall from a brief shower is expected to be 4–8 mm. Which equipment is suitable?',['rain gauge marked in millimetres','bathroom scale','kilometre odometer','one-litre unmarked bucket only'],0,'A millimetre-marked rain gauge directly measures rainfall depth at useful resolution.','Match range, resolution and variable.'),
  q('recording zeros','application','A balance reading remains 0.0 g after a tiny sample is added. Best interpretation?',['The sample has no mass.','The mass may be below the balance’s detectable resolution.','The sample weighs exactly 1 g.','Digital tools cannot measure mass.'],1,'A zero display may mean the change is smaller than the instrument can detect, not that mass is absent.','Consider the detection limit.'),
  q('precision improvement','application','Repeated hand-timed events vary widely. Which change most directly improves procedural precision?',['Use automatic timing gates if suitable.','Write more decimal places.','Change the event each trial.','Use a coarser unit only.'],0,'Automatic timing can reduce variation from human reaction time. Extra digits do not improve the measurements themselves.','Reduce the source of repeat variation.'),
  q('table critique','application','A results table lists “cup A: 24; cup B: 31”. What key information is missing?',['coloured borders','measured variable and unit','student birthdays','a prediction in each cell'],1,'Without the measured quantity and unit, 24 and 31 cannot be interpreted.','Numbers require labels.'),
  q('thermometer','application','A liquid thermometer reads from −10°C to 110°C in 1°C divisions. Which claim is supported?',['Its resolution is 1°C.','It measures mass to 1 g.','It is exact to 0.001°C.','Its range begins at 0°C.'],0,'The smallest division is 1°C and its stated range is −10°C to 110°C.','Separate range from resolution.'),
  q('pH tools','application','Which choice suits a detailed comparison of soil pH at several sites?',['a checked pH meter recorded with site labels','a ruler in centimetres','smelling every sample','guessing from soil colour'],0,'A checked pH meter provides numerical pH readings tied to sampling locations.','Use a tool measuring the target variable.'),
  q('photographs','application','When can photographs strengthen an observation record?',['when taken from a consistent scale and viewpoint with labels','when they replace every measurement','when no sample identity is recorded','when filters alter the colours'],0,'A consistent viewpoint, scale and identifier make images comparable supporting evidence.','Standardise and label images.'),
  q('data logger','application','A probe logs temperature every 30 seconds. What should the table or file also state?',['temperature unit and elapsed-time unit','only the probe colour','the preferred conclusion','no headings'],0,'Both variables and their units are needed to interpret logged values.','Automated data still need metadata.'),
  q('uncertainty','application','Two students read 47 mL and 49 mL from the same coarse cylinder. Best response?',['Discuss eye level and meniscus rule, then repeat consistently.','Average them and claim perfect accuracy.','Add four decimal places.','Change millilitres to metres.'],0,'Standardising the viewing and meniscus method addresses likely reading variation.','Repair the reading procedure.'),
  q('observation vs inference','application','Which statement is an observation rather than an inference?',['The plant is unhealthy because the soil is poor.','The leaf has six brown patches, each about 2–4 mm wide.','The insect dislikes sunlight.','The water must be polluted.'],1,'The patch count and width are directly observable and measurable; the others interpret causes.','Choose what was directly detected.'),
  q('reasonable precision','assessment','A seedling grows about 3 mm per day. Which ruler is most useful?',['one marked only every 10 cm','one with 1 mm divisions','a kilometre scale','an unmarked stick'],1,'Millimetre divisions can detect changes of the expected size.','Match resolution to the change.'),
  q('recording','assessment','Which entry provides the clearest and most complete raw-data record?',['Trial 3, water temperature after 5 min: 28.4°C','warm after a while','28.400000 exactly','good result'],0,'It identifies trial, variable, time condition, value and unit without an unsupported claim of exactness.','Include context, value and unit.'),
  q('precision vs resolution','assessment','Instrument A reads to 0.1 g and gives 20.1, 20.1, 20.2 g. Instrument B reads to 0.01 g and gives 19.62, 20.51, 19.88 g. Which is correct?',['B is necessarily more accurate.','A has coarser resolution but the listed repeats are more precise.','A has finer resolution.','B’s repeats are closer together.'],1,'A displays larger increments, yet its repeated values have a much smaller spread.','Compare increment and spread separately.'),
  q('integrated measurement','assessment','Which sequence represents strong measurement practice?',['define variable → choose suitable instrument and unit → check/zero → read consistently → record with supported precision','choose decimals → guess → add a unit later','change tools each trial → omit headings','write conclusion → invent data'],0,'The sequence links purpose, equipment, checking, correct use and transparent recording.','Follow the measurement chain.')
];

const test = [
  q('equipment','assessment','A class must measure how much water evaporates from 50 mL samples. Which paired measurements are strongest?',['ruler and seconds','initial and final mass on the same checked balance, in grams','temperature by touch','photos without a scale'],1,'Mass loss measured consistently in grams can quantify evaporation.','Choose a measurable change.'),
  q('scale','assessment','A ruler is marked every 5 mm. Which record overclaims its resolution?',['75 mm','7.5 cm','75.000 mm','approximately 75 mm'],2,'Thousandths of a millimetre are unsupported by 5 mm divisions.','Compare decimals with divisions.'),
  q('units','assessment','Which set contains only correctly matched variables and units?',['volume—mL; mass—g; time—s','temperature—kg; length—L; mass—°C','time—mm; volume—s; length—g','pH—km; mass—mL; time—°C'],0,'Millilitres, grams and seconds correctly match volume, mass and time.','Match each physical quantity.'),
  q('parallax','assessment','Two observers obtain different cylinder readings because one looks down at the scale. What is the best correction?',['both read the correct meniscus at eye level','use different units','select the larger value','add decimal places'],0,'A shared eye-level meniscus procedure reduces viewing-angle error.','Standardise the viewing position.'),
  q('precision','assessment','Which repeated readings are least precise?',['5.0, 5.1, 5.0 cm','12.2, 12.2, 12.3 cm','8.1, 11.7, 6.4 cm','20.0, 20.1, 20.0 cm'],2,'The readings 8.1, 11.7 and 6.4 cm have the widest spread and therefore the poorest repeat agreement.','Compare ranges.'),
  q('digital tools','assessment','A logger produces 200 light readings. What remains essential?',['record sensor unit, interval, position and site','assume automation guarantees validity','delete unexpected values automatically','remove timestamps'],0,'Digital collection still needs units, sampling details and transparent data handling.','Automation does not remove method details.'),
  q('accuracy','assessment','A thermometer is 2°C high when checked in two known reference conditions. This suggests',['a systematic calibration error','perfect accuracy','a unit conversion only','high resolution proves truth'],0,'A consistent offset from references indicates systematic calibration error.','Compare against standards.'),
  q('resolution','assessment','A balance changes only in steps of 1 g. What is its display resolution?',['0.01 g','0.1 g','1 g','10 kg'],2,'Its smallest displayed increment is 1 g.','Find the smallest change shown.'),
  q('fieldwork','assessment','Which record best supports comparison of soil moisture across sites?',['site code, date/time, depth, probe reading and unit for every sample','wet or dry from memory','one unlabeled number per day','different depths chosen after seeing results'],0,'Sampling context and consistent readings allow defensible comparisons.','Each value needs location and method context.'),
  q('reasonable precision','assessment','A 10 mL cylinder has 0.2 mL divisions. Which result is most defensible?',['6.4 mL','6.437829 mL','exactly 6 mL regardless of scale','6.4 g'],0,'6.4 mL matches the marked increments and correct unit.','Record what the scale supports.'),
  q('mixed units','assessment','Lengths are 84 mm, 8.9 cm and 0.091 m. Which is greatest?',['84 mm','8.9 cm','0.091 m','all are equal'],2,'They equal 84 mm, 89 mm and 91 mm respectively.','Convert all to millimetres.'),
  q('observations','assessment','Which record combines qualitative and quantitative evidence?',['solution was pale blue and measured 32 mL','solution was nice','32 without a unit','it probably reacted'],0,'Colour is qualitative and 32 mL is quantitative, both directly recorded.','Look for description plus measurement.'),
  q('equipment limits','assessment','A temperature difference is expected to be 0.2°C. Which tool is most appropriate?',['a thermometer with 5°C divisions','a checked probe resolving 0.1°C','a ruler','touch comparison'],1,'A 0.1°C resolution can detect the expected difference; coarse divisions cannot.','Resolution must be finer than the expected change.'),
  q('data table','assessment','Which table design is strongest for cooling water?',['Elapsed time (min) | Temperature Trial 1 (°C) | Trial 2 (°C) | Trial 3 (°C)','Time | Stuff','Student | Guess','Hot | Cold'],0,'It names both variables, units and repeated trials.','Choose interpretable headings.'),
  q('precision vs accuracy','assessment','Four arrows cluster tightly 8 cm from a target centre. As a measurement analogy, they show',['high precision but low accuracy','high accuracy and low precision','fine resolution only','no pattern'],0,'The cluster is consistent but not close to the accepted target.','Cluster means precision; centre means accuracy.'),
  q('measurement plan','assessment','Which plan best measures daily plant growth?',['measure from soil line to highest growing point with the same mm ruler at the same time daily and record in a labelled table','use a different starting point each day','estimate tall/short at random times','photograph without labels or scale'],0,'Defined endpoints, equipment, timing, unit and recording make the measurements comparable.','Look for a fully standardised method.')
];

const worksheet = [
  {question:'Choose equipment and units for measuring leaf length, soil mass, water volume, temperature and elapsed time.',modelAnswer:'Use a ruler in mm or cm; balance in g; measuring cylinder in mL; thermometer or checked probe in °C; stopwatch in s or min.'},
  {question:'Explain the measurement chain from defining a variable to recording it.',modelAnswer:'Define exactly what will be measured, choose an instrument with suitable range and resolution, select a unit, check or zero the instrument, use a consistent reading method and record the value and unit in a labelled table.'},
  {question:'A cylinder has 1 mL divisions. Explain why 42.000 mL is not a reasonable record.',modelAnswer:'The extra decimal places claim precision finer than the instrument’s 1 mL resolution. Record 42 mL when the meniscus is on that mark.'},
  {question:'Distinguish resolution from repeat-measurement precision.',modelAnswer:'Resolution is the smallest increment an instrument can detect or display. Precision is how closely repeated measurements agree; fine resolution does not guarantee close repeats.'},
  {question:'A balance reads 9.8, 9.8 and 9.9 g for a certified 12.0 g mass. Evaluate the readings.',modelAnswer:'They are precise because they cluster closely, but inaccurate because they are far from 12.0 g, suggesting calibration or systematic error.'},
  {question:'Write complete headings for recording temperature every two minutes for three trials.',modelAnswer:'Elapsed time (min) | Temperature Trial 1 (°C) | Temperature Trial 2 (°C) | Temperature Trial 3 (°C).'},
  {question:'Explain and correct parallax error when reading water volume.',modelAnswer:'Viewing from above or below shifts the apparent scale position. Put the cylinder upright on a level surface and read the correct meniscus at eye level.'},
  {question:'Plan consistent field records for soil pH at four approved sites.',modelAnswer:'Use the same checked pH meter and sampling depth; record site code, date/time, sample number and pH for several points at each site, cleaning the probe as instructed between readings.'},
  {question:'When would a data logger be more appropriate than manual measurements?',modelAnswer:'Use it when many readings at fixed short intervals are needed, such as temperature during cooling. Still record sensor, unit, interval, position and calibration/check details.'},
  {question:'Convert 8.4 cm, 92 mm and 0.105 m to millimetres and order them.',modelAnswer:'8.4 cm = 84 mm; 92 mm = 92 mm; 0.105 m = 105 mm. Order: 84 mm, 92 mm, 105 mm.'},
  {question:'Improve this record: “The plant was bigger and the soil was wet.”',modelAnswer:'For example: “Plant height was 126 mm from soil line to highest growing point; soil-moisture probe read 38% at 2 cm depth.” Include actual instrument units used.'},
  {question:'Design a measurement-quality checklist for a Year 6 investigation.',modelAnswer:'Define variable; choose suitable range/resolution; state unit; check/zero equipment; define endpoints and viewing rule; keep timing/position consistent; repeat; label raw-data table; retain anomalies and note limitations.'}
];

const topicSections = [
  {heading:'The measurement chain',body:'Define the variable, choose a suitable instrument and unit, check or zero the tool, use it consistently, then record every value with enough context. Equipment recognition alone is not scientific measurement.'},
  {heading:'Choose equipment for purpose',body:'Use rulers for length, balances for mass, measuring cylinders for liquid volume, thermometers for temperature and stopwatches for time. Consider the expected range and the size of change, not simply the instrument’s size.'},
  {heading:'Read analogue scales correctly',body:'Find the smallest division, keep the instrument correctly positioned and view the mark or meniscus at eye level. Defined endpoints and a shared reading rule reduce observer variation.'},
  {heading:'Use digital tools thoughtfully',body:'Probes and data loggers can collect frequent, consistent readings. They still require correct placement, units, checks or calibration and documented sampling intervals; digital does not mean exact.'},
  {heading:'Reasonable precision',body:'Record only detail supported by the equipment and method. Extra decimal places do not improve a measurement. Select resolution fine enough to reveal the change relevant to the question.'},
  {heading:'Resolution is not precision',body:'Resolution is the smallest increment displayed or detected. Repeat-measurement precision is the closeness of repeated readings. A fine-resolution sensor can produce widely scattered, imprecise readings.'},
  {heading:'Precision is not accuracy',body:'Precise readings cluster closely; accurate readings are close to a trusted value. A miscalibrated instrument may repeatedly produce precise but inaccurate data.'},
  {heading:'Record usable data',body:'Table headings name variables and units. Keep units, decimal conventions, timing, measurement endpoints and sample labels consistent. Raw observations should remain traceable to their trial or site.'},
  {heading:'Field observations',body:'Authentic field science may combine site labels, photographs, counts and sensor readings such as soil pH or compaction. Use the same sampling rule and obey safety and permission conditions.'},
  {heading:'Evaluate limitations',body:'Check unusual readings rather than hiding them. Identify limitations from scale resolution, reaction time, parallax, calibration, positioning or inconsistent sampling, and propose a specific improvement.'}
];

const vocabulary = [
  {term:'measurement',definition:'a value obtained by comparing a quantity with a defined unit using a method or instrument'},
  {term:'resolution',definition:'the smallest increment an instrument can detect or display'},
  {term:'precision',definition:'how closely repeated measurements agree'},
  {term:'accuracy',definition:'how close a measurement is to a trusted or accepted value'},
  {term:'range',definition:'the minimum to maximum values an instrument can measure'},
  {term:'parallax error',definition:'an apparent scale shift caused by viewing from an angle'},
  {term:'meniscus',definition:'the curved surface of a liquid used when reading volume'},
  {term:'calibration',definition:'checking or adjusting an instrument against a known reference'},
  {term:'quantitative observation',definition:'an observation recorded as a number with a unit'},
  {term:'qualitative observation',definition:'a descriptive observation such as colour, form or texture'},
  {term:'data logger',definition:'a digital tool that automatically records sensor measurements over time'}
];

const misconceptions = [
  {claim:'A larger instrument is always more precise.',correction:'Useful precision depends on scale resolution, range, condition and method—not physical size.'},
  {claim:'Digital measurements are perfectly accurate.',correction:'Digital tools can be miscalibrated, badly positioned or used with a flawed sampling method.'},
  {claim:'More decimal places improve a measurement.',correction:'Digits beyond the instrument and procedure’s capability are unsupported.'},
  {claim:'Resolution and precision mean the same thing.',correction:'Resolution is the smallest detectable increment; precision is closeness among repeated readings.'},
  {claim:'An estimate and a measurement are interchangeable.',correction:'An estimate is an informed approximation; a measurement uses defined equipment, method and units.'}
];

const importantQA = [
  {question:'How do I choose an instrument?',answer:'Match it to the variable, expected range and smallest meaningful change, then check that its unit and resolution suit the question.'},
  {question:'Why read a scale at eye level?',answer:'It reduces parallax, which can make a marker or meniscus appear beside the wrong division.'},
  {question:'Does fine resolution guarantee precise results?',answer:'No. Resolution describes the instrument increment; precision depends on agreement among repeats and can be weakened by procedural variation.'},
  {question:'What makes a data table usable?',answer:'Clear variable and unit headings, consistent formats, trial or site identifiers and raw values recorded without silent alteration.'}
];

const steps = ['Define the variable and expected range.','Choose equipment with suitable range and resolution.','Select and state the correct unit.','Check, zero or calibrate as instructed.','Use fixed endpoints, position, timing and eye-level scale reading.','Record raw values consistently in a labelled table.','Repeat, inspect spread and explain measurement limitations.'];

const slides = [
  {title:'Curriculum',kicker:'AC9S6I03',body:[metadata.descriptor]},
  {title:'Learning intention',body:[metadata.learningIntention,...metadata.successCriteria]},
  {title:'The measurement chain',body:[topicSections[0].body]},
  {title:'Choose the right tool',body:[topicSections[1].body]},
  {title:'Read scales well',body:[topicSections[2].body]},
  {title:'Digital tools',body:[topicSections[3].body]},
  {title:'Reasonable precision',body:[topicSections[4].body]},
  {title:'Resolution and precision',body:[topicSections[5].body]},
  {title:'Accuracy',body:[topicSections[6].body]},
  {title:'Record and evaluate',body:[topicSections[7].body,topicSections[9].body]},
  {title:'Questions and answers',body:importantQA.map(({question,answer}) => `${question} ${answer}`)},
  {title:'Exit ticket',body:['Choose equipment and units to measure cooling water.','Explain scale-reading and table rules.','Distinguish resolution from repeat-measurement precision.']}
];

// Distribute correct positions evenly without changing the authored answer content.
for (const bank of [practice, test]) bank.forEach((item, index) => {
  const target = index % 4;
  if (item.correct === target) return;
  const correctAnswer = item.answers[item.correct];
  item.answers.splice(item.correct, 1);
  item.answers.splice(target, 0, correctAnswer);
  item.correct = target;
});

if (practice.length !== 48) throw new Error(`AC9S6I03 practice count ${practice.length}; expected 48`);
if (test.length !== 16) throw new Error(`AC9S6I03 test count ${test.length}; expected 16`);
if (worksheet.length !== 12) throw new Error(`AC9S6I03 worksheet count ${worksheet.length}; expected 12`);
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
  assessmentHints: ['Match equipment, range and resolution to the variable and expected change.','Write the corrected record with its unit.','Read analogue scales at eye level using the correct meniscus or endpoint.','Do not add unsupported decimal places.','Separate instrument resolution, repeat-measurement precision and accuracy.','Record timing, site and sampling details for digital and field data.'],
  exitTicket: 'Select equipment and units for a cooling-water investigation, explain how to read and record each value, and distinguish resolution from repeat-measurement precision.',
  masteryEvidence: 'The student independently selects and uses suitable analogue or digital equipment, records comparable data with units and reasonable precision, and accurately distinguishes resolution, precision and accuracy.',
  practice,
  test,
  worksheet,
  slides
};
