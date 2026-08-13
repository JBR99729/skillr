(() => {
  "use strict";

  window.SkillrYear3MathsV11MeasurementProfiles = {
    "AC9M3M01:E1": {
      plainLanguageConcept: "The attribute being measured determines the metric unit: grams or kilograms describe mass, while millilitres or litres describe liquid capacity.",
      context: "Read labels on a 500 g pasta packet and a 2 L milk bottle.", component: "workedCards", parameters: { Given: "Pasta 500 g; milk 2 L", Model: "solid food mass → g; liquid container capacity → L", Result: "500 grams and 2 litres" }, contract: { items: [2, 6], massUnits: [1, 2], capacityUnits: [1, 2] },
      accessibleDescription: "Two labelled product cards show a pasta packet marked 500 grams and a milk bottle marked 2 litres, with arrows to mass and capacity.",
      teacherDoes: "Displays familiar packaging and separates the numerical amount from the unit and measured attribute.", teacherSaysOrAsks: "What does the unit tell us that the number alone cannot?", studentDoes: "Sorts labels into mass and capacity and explains each choice.", whatToLookFor: "The student uses the package attribute, not its shape, to choose the unit family.",
      checkpointPrompt: "A juice bottle is labelled 600 mL. What attribute and unit are being reported?", expectedAnswer: "Its capacity is 600 millilitres.", acceptableEvidence: ["capacity, measured in millilitres", "600 mL of liquid capacity", "The bottle holds 600 millilitres"], likelyError: "Calls 600 mL the bottle's mass.", remediation: "Compare the label with a measuring jug and identify that millilitres describe how much liquid the container holds."
    },
    "AC9M3M01:E2": {
      plainLanguageConcept: "A known one-kilogram, 500-gram, one-litre or 500-millilitre item can act as a benchmark for estimating an unfamiliar item.",
      context: "Compare a 750 g cereal box with a known 500 g bag and 1 kg bag.", component: "scales", parameters: { Given: "Benchmark masses 500 g and 1 kg; unknown cereal box", Model: "heavier than 500 g but lighter than 1 kg", Result: "A sensible estimate is about 750 g" }, contract: { benchmarkCount: [2, 4], massGrams: [1, 10000], capacityMillilitres: [1, 10000] },
      accessibleDescription: "A comparison scale places the cereal box between labelled 500-gram and one-kilogram benchmark bags.",
      teacherDoes: "Lets students handle benchmark items before placing the unknown between them.", teacherSaysOrAsks: "Which benchmark is it closer to, and what evidence can you feel or see?", studentDoes: "Compares, estimates and explains using relative size or heft.", whatToLookFor: "The estimate lies between the established bounds and includes a metric unit.",
      checkpointPrompt: "A bottle holds more than 500 mL but less than 1 L and seems halfway between. Give a reasonable estimate.", expectedAnswer: "About 750 mL.", acceptableEvidence: ["about 750 mL", "a value near 750 mL with reasoning", "between 500 mL and 1 L, approximately three-quarters of a litre"], likelyError: "Answers 750 L by selecting the wrong-sized unit.", remediation: "Place the bottle beside a 500 mL bottle and one-litre bottle, then retain their shared millilitre scale for the estimate."
    },
    "AC9M3M01:E3": {
      plainLanguageConcept: "Multiplicative comparison estimates an unknown measure by asking how many copies of a familiar benchmark would match it.",
      context: "Estimate a tree using a 1.5 m-tall person and a fish tank using a 1 L carton.", component: "bar", parameters: { Given: "Person 1.5 m; tree about 3 person-heights", Model: "1.5 m + 1.5 m + 1.5 m", Result: "Tree about 4.5 m tall" }, contract: { benchmarkValue: [0.1, 100], copies: [1, 20], estimateValue: [0.1, 2000] },
      accessibleDescription: "Three equal person-height bars of 1.5 metres are stacked beside a tree, reaching an estimated 4.5 metres.",
      teacherDoes: "Aligns repeated benchmark lengths from the same starting point and states that the result is approximate.", teacherSaysOrAsks: "How many benchmark copies fit, and what calculation turns that into a measure?", studentDoes: "Counts copies, multiplies and labels the estimated attribute and unit.", whatToLookFor: "Copies are equal and the estimate is communicated as about, not exact.",
      checkpointPrompt: "A tank appears to hold about 6 one-litre cartons. Estimate its capacity.", expectedAnswer: "About 6 litres.", acceptableEvidence: ["about 6 L", "6 × 1 L = about 6 L", "an estimate of six litres supported by six benchmark copies"], likelyError: "Answers 6 mL because all capacity units are treated as interchangeable.", remediation: "Show one physical litre carton and read its unit aloud for every imagined copy."
    },
    "AC9M3M01:E4": {
      plainLanguageConcept: "Metres are practical for estimating classroom dimensions because the lengths are several human-sized units, not tiny centimetre intervals.",
      context: "Estimate a classroom as 8 m long and 6 m wide.", component: "map", parameters: { Given: "Classroom floor", Model: "Eight 1 m strides along length; six along width", Result: "About 8 m by 6 m" }, contract: { dimensions: [2, 3], metres: [1, 100], benchmarkLength: [1, 1] },
      accessibleDescription: "A top-view classroom rectangle has eight one-metre intervals along its length and six along its width.",
      teacherDoes: "Establishes a one-metre benchmark, estimates both dimensions and then checks with a metre measure.", teacherSaysOrAsks: "Why are metres more useful than millimetres for this room?", studentDoes: "Selects metres, estimates each dimension and compares with measured values.", whatToLookFor: "The student names length and width separately and gives plausible metre estimates.",
      checkpointPrompt: "Choose a suitable unit and estimate the length of a school corridor that is about 20 classroom-door widths long.", expectedAnswer: "Metres; a reasonable estimate is about 20 m if each door is used as an approximately one-metre benchmark.", acceptableEvidence: ["metres with a reasoned estimate near 20 m", "about 20 metres using one-metre door-width benchmarks", "another plausible metre estimate with an explicit benchmark"], likelyError: "Chooses centimetres because a ruler is familiar.", remediation: "Compare one centimetre and one metre physically, then count which benchmark needs a manageable number of repeats."
    },

    "AC9M3M02:E1": {
      plainLanguageConcept: "Ruler and tape marks show unit boundaries; measurement begins at zero and counts the intervals, not merely the printed lines.",
      context: "Make a centimetre tape and measure a tree trunk girth of 64 cm.", component: "ruler", parameters: { Given: "Tape marked 0 to 70 cm", Model: "Start 0 aligned with end point at 64", Result: "Girth 64 cm" }, contract: { minimum: [0, 0], maximumCentimetres: [10, 500], graduationCentimetres: [1, 10] },
      accessibleDescription: "A centimetre tape wraps around a trunk with zero aligned at the start and the meeting point at sixty-four centimetres.",
      teacherDoes: "Constructs evenly spaced marks, labels zero and demonstrates counting spaces between marks.", teacherSaysOrAsks: "Why must zero, not the tape edge or number one, meet the starting point?", studentDoes: "Measures, records and compares objects using the tape.", whatToLookFor: "The tape is taut, begins at zero and the answer includes centimetres.",
      checkpointPrompt: "An object starts at 0 cm and ends at the 37 cm mark. What is its length?", expectedAnswer: "37 cm", acceptableEvidence: ["37 cm", "thirty-seven centimetres", "37 one-centimetre intervals"], likelyError: "Answers 38 cm after counting both endpoint lines.", remediation: "Shade the spaces from 0 to 37 and count intervals rather than boundary lines."
    },
    "AC9M3M02:E2": {
      plainLanguageConcept: "Centimetre grid squares and ruler graduations represent the same one-centimetre intervals, and a partial interval can refine a measurement.",
      context: "Measure a pencil ending halfway between 12 cm and 13 cm.", component: "ruler", parameters: { Given: "Pencil from 0 to halfway between 12 and 13", Model: "12 full centimetres + half a centimetre", Result: "12.5 cm or 12½ cm" }, contract: { lengthCentimetres: [0, 100], graduationCentimetres: [0.5, 1], precisionFractions: [0.5, 0.5] },
      accessibleDescription: "A pencil begins at zero on a centimetre ruler and ends at the halfway tick between twelve and thirteen centimetres.",
      teacherDoes: "Overlays centimetre grid paper with a ruler and matches each square edge to a ruler mark.", teacherSaysOrAsks: "How many complete centimetres are there, and what fraction of the next interval is used?", studentDoes: "Counts full intervals, identifies the half interval and records the measure.", whatToLookFor: "The fractional part describes a fraction of one graduation.",
      checkpointPrompt: "A ribbon reaches halfway between 8 cm and 9 cm. What is its length?", expectedAnswer: "8.5 cm or 8½ cm", acceptableEvidence: ["8.5 cm", "8½ cm", "eight and a half centimetres"], likelyError: "Reports 9 cm by rounding despite being asked for the more accurate measure.", remediation: "Separate the eight full intervals from the half of the ninth interval and name both parts."
    },
    "AC9M3M02:E3": {
      plainLanguageConcept: "Capacity describes how much a container can hold, and millilitres and litres let us compare familiar drink containers consistently.",
      context: "Order 600 mL, 1 L, 2 L and 3 L containers.", component: "units", parameters: { Given: "600 mL, 1 L, 2 L, 3 L", Model: "600 mL < 1000 mL < 2000 mL < 3000 mL", Result: "600 mL < 1 L < 2 L < 3 L" }, contract: { containers: [2, 8], millilitres: [1, 10000], litres: [0.001, 10] },
      accessibleDescription: "Four drink containers increase in capacity from six hundred millilitres to one, two and three litres, with equivalent millilitre labels.",
      teacherDoes: "Uses one litre equals 1,000 millilitres to place all values on one comparison scale.", teacherSaysOrAsks: "Why is 600 mL less than 1 L even though 600 is a larger numeral than 1?", studentDoes: "Converts or benchmarks units, then orders the capacities.", whatToLookFor: "Comparison occurs only after units are made compatible.",
      checkpointPrompt: "Which holds more: 900 mL or 1 L? By how much?", expectedAnswer: "1 L holds 100 mL more.", acceptableEvidence: ["1 L by 100 mL", "1000 mL − 900 mL = 100 mL", "A correct capacity comparison model"], likelyError: "Chooses 900 mL because 900 is greater than 1.", remediation: "Relabel one litre as 1,000 millilitres before comparing the numbers."
    },
    "AC9M3M02:E4": {
      plainLanguageConcept: "Instrument graduations divide a scale into equal values; reading them requires using labelled marks to infer each interval.",
      context: "Read a jug labelled every 100 mL with one halfway mark and scales labelled every 100 g.", component: "scales", parameters: { Given: "Jug labels 0,100,200 mL with midpoint ticks", Model: "Each small interval is 50 mL; liquid at third small interval", Result: "150 mL" }, contract: { labelledInterval: [1, 1000], subdivisions: [1, 10], reading: [0, 10000] },
      accessibleDescription: "A measuring jug shows labels at zero, one hundred and two hundred millilitres, with one equal tick halfway; liquid reaches one hundred fifty millilitres.",
      teacherDoes: "Finds the difference between adjacent labels and divides it by the number of equal spaces.", teacherSaysOrAsks: "What value does each small space represent, and how do you know?", studentDoes: "Determines the interval, counts from a labelled mark and records the unit.", whatToLookFor: "The student counts spaces and keeps mass and capacity units distinct.",
      checkpointPrompt: "A scale has 200 g and 300 g labels with four equal small intervals between them. What does each interval represent?", expectedAnswer: "25 g", acceptableEvidence: ["25 g", "100 g ÷ 4 = 25 g", "Each small space is twenty-five grams"], likelyError: "Answers 20 g by dividing by five visible boundary marks.", remediation: "Trace and count the four spaces between the two labelled marks, then divide the 100 g difference by four."
    },
    "AC9M3M02:E5": {
      plainLanguageConcept: "Numbered beaker graduations support accurate liquid measurement when the interval value is established and the liquid level is read at eye height.",
      context: "Measure 350 mL in a 500 mL beaker marked every 50 mL.", component: "scales", parameters: { Given: "Beaker 0–500 mL; graduations 50 mL", Model: "Count seven intervals from zero", Result: "350 mL" }, contract: { capacityMillilitres: [50, 5000], graduationMillilitres: [1, 500], readingMillilitres: [0, 5000] },
      accessibleDescription: "A five-hundred-millilitre beaker has evenly spaced fifty-millilitre graduations and liquid level at three hundred fifty millilitres.",
      teacherDoes: "Checks the graduation value, places the beaker level and reads the liquid line at eye height.", teacherSaysOrAsks: "Which labelled value can you count from to reduce errors?", studentDoes: "Measures requested capacities and explains the interval count.", whatToLookFor: "The reading uses the bottom of the drawn level consistently and includes millilitres.",
      checkpointPrompt: "A beaker is marked every 25 mL. The liquid is three marks above 100 mL. What is the capacity shown?", expectedAnswer: "175 mL", acceptableEvidence: ["175 mL", "100 + 3×25 = 175 mL", "A correctly labelled beaker reading"], likelyError: "Answers 125 mL by adding one interval only.", remediation: "Touch each of the three spaces and add 25 mL at every move from 100 mL."
    },

    "AC9M3M03:E1": {
      plainLanguageConcept: "Choosing seconds or minutes for a duration depends on how long the event lasts, and an estimate can be checked by timing the event.",
      context: "Estimate and time reading a short paragraph.", component: "timer", parameters: { Given: "Short paragraph", Model: "Estimate 45 s; measured 52 s", Result: "About 1 minute" }, contract: { seconds: [1, 3600], estimates: [1, 3600], trials: [1, 10] },
      accessibleDescription: "A prediction card shows forty-five seconds and a digital timer shows fifty-two seconds for reading the same paragraph.",
      teacherDoes: "Elicits an estimate with a unit, times the reading and compares without treating difference as failure.", teacherSaysOrAsks: "Was seconds or hours the useful unit, and how close was the estimate?", studentDoes: "Estimates, measures and reflects on the difference.", whatToLookFor: "The unit suits the short event and the comparison is numerically accurate.",
      checkpointPrompt: "Would reading one sentence most likely take 8 seconds, 8 minutes or 8 hours?", expectedAnswer: "About 8 seconds.", acceptableEvidence: ["8 seconds", "seconds, because one sentence is a short event", "a nearby number of seconds with clear reasoning"], likelyError: "Chooses minutes because reading is sometimes discussed in minutes.", remediation: "Time one sentence once, then compare the result physically with a full minute."
    },
    "AC9M3M03:E2": {
      plainLanguageConcept: "A workable schedule adds estimated durations and fits the combined time within the available period.",
      context: "Plan a 40-minute class party with a 10-minute game, 15-minute activity, 5-minute snack and 10-minute pack-up.", component: "timeline", parameters: { Given: "10 min, 15 min, 5 min, 10 min", Model: "0–10–25–30–40", Result: "The sequence fits exactly 40 minutes" }, contract: { events: [2, 10], eventMinutes: [1, 180], totalMinutes: [2, 600] },
      accessibleDescription: "A forty-minute timeline is divided into consecutive blocks of ten, fifteen, five and ten minutes.",
      teacherDoes: "Places each event consecutively and accumulates end times.", teacherSaysOrAsks: "How can we tell whether the plan fits before the party begins?", studentDoes: "Orders events, totals durations and revises if the limit is exceeded.", whatToLookFor: "The student includes every event and does not reset time to zero for each block.",
      checkpointPrompt: "Can activities of 12, 8 and 15 minutes fit into 30 minutes?", expectedAnswer: "No. They total 35 minutes, which is 5 minutes too long.", acceptableEvidence: ["No; 35 minutes total", "5 minutes over", "A timeline ending at 35 minutes against a 30-minute limit"], likelyError: "Says yes because each separate activity is shorter than 30 minutes.", remediation: "Join the duration blocks end to end and compare their combined endpoint with 30."
    },
    "AC9M3M03:E3": {
      plainLanguageConcept: "Digital times and countdowns use place positions and unit labels; setting them accurately requires distinguishing minutes from seconds.",
      context: "Set a countdown for 3 minutes 25 seconds.", component: "timer", parameters: { Given: "3 min 25 s", Model: "Minutes field 03 | seconds field 25", Result: "03:25" }, contract: { minutes: [0, 99], seconds: [0, 59], fields: [2, 2] },
      accessibleDescription: "A digital timer display reads zero-three colon twenty-five, with minutes and seconds fields explicitly labelled.",
      teacherDoes: "Labels both fields, checks seconds remain below 60 and starts the timer.", teacherSaysOrAsks: "What does each side of the colon count on this countdown?", studentDoes: "Sets, reads and explains the digital display.", whatToLookFor: "Twenty-five is placed in seconds and the display is read as duration, not time of day.",
      checkpointPrompt: "How should a countdown show 2 minutes 7 seconds?", expectedAnswer: "02:07", acceptableEvidence: ["02:07", "2:07 with minutes and seconds correctly labelled", "two minutes, seven seconds on a digital timer"], likelyError: "Enters 02:70, treating seven seconds as seventy.", remediation: "Use two places for seconds and place a zero before a single-digit second value."
    },
    "AC9M3M03:E4": {
      plainLanguageConcept: "Timing an event provides evidence for refining estimates, and repeated trials reveal natural variation in short durations.",
      context: "Estimate one minute, then check with a sand timer and digital timer.", component: "timer", parameters: { Given: "Student signals one minute without looking", Model: "Estimate signal at 54 s; target 60 s", Result: "Estimate was 6 seconds short" }, contract: { targetSeconds: [1, 600], trials: [1, 10], differenceSeconds: [-600, 600] },
      accessibleDescription: "A sixty-second sand timer is paired with a digital reading of fifty-four seconds and a six-second difference arrow.",
      teacherDoes: "Runs blind estimates, records actual times and uses language short of or longer than.", teacherSaysOrAsks: "What adjustment might improve your next estimate?", studentDoes: "Estimates, measures, calculates the difference and adapts.", whatToLookFor: "The direction of the difference is interpreted correctly.",
      checkpointPrompt: "You estimate 3 minutes, but the timer reads 3 minutes 18 seconds. How far out was the estimate?", expectedAnswer: "18 seconds short.", acceptableEvidence: ["18 seconds short", "The event lasted 18 seconds longer than estimated", "3:18 − 3:00 = 0:18"], likelyError: "Says 18 seconds too long, reversing estimate and measurement.", remediation: "Place the estimate and actual time on a number line and identify which lies farther from zero."
    },
    "AC9M3M03:E5": {
      plainLanguageConcept: "Cycles observed in the sun, moon and stars can organise accounts of time; cultural knowledge must be taught through an authorised source and not reduced to a universal calendar claim.",
      context: "Examine a community-approved seasonal or sky-cycle account alongside a repeating-cycle model.", component: "cycle", parameters: { Given: "Authorised sequence of recurring observations", Model: "Observation A → B → C → returns to A", Result: "A repeating cycle can mark passing time" }, contract: { stages: [2, 12], cyclesShown: [1, 3], culturalSourceApproved: [1, 1] },
      accessibleDescription: "A neutral circular sequence links three authorised sky or seasonal observations; community-specific labels appear only when supplied by the source.",
      teacherDoes: "Introduces provenance, locates the knowledge to its community and models only the stated sequence.", teacherSaysOrAsks: "What evidence shows this account is cyclical rather than a one-time sequence?", studentDoes: "Identifies recurrence and credits the cultural source accurately.", whatToLookFor: "Students describe the authorised account without generalising it to all First Nations peoples.",
      checkpointPrompt: "What feature makes a sequence a cycle?", expectedAnswer: "After its stages, it returns to the starting stage and repeats.", acceptableEvidence: ["It returns to the start and repeats", "A closed-loop diagram with ordered recurring stages", "The same sequence occurs again"], likelyError: "Calls any ordered list a cycle even if it ends permanently.", remediation: "Draw an arrow from the final stage back to the first only when recurrence is supported by the source."
    },

    "AC9M3M04:E1": {
      plainLanguageConcept: "On an analog clock, each small minute mark represents one minute and each numbered interval represents five minutes.",
      context: "Read a clock showing 7:23.", component: "clock", parameters: { Given: "Minute hand at minute mark 23; hour hand just past 7", Model: "4 full five-minute intervals = 20, plus 3 marks", Result: "7:23" }, contract: { hour: [1, 12], minute: [0, 59], minuteMarks: [60, 60] },
      accessibleDescription: "An analog clock has the minute hand on the twenty-third minute mark and the hour hand slightly past seven.",
      teacherDoes: "Counts by fives to 20, then single minute marks to 23, checking the hour hand's position.", teacherSaysOrAsks: "Why is the hour hand no longer pointing exactly at 7?", studentDoes: "Reads and sets times to five minutes and then to the nearest minute.", whatToLookFor: "The student uses the longer hand for minutes and reads 23, not the nearby numeral 5.",
      checkpointPrompt: "The minute hand is two marks after the 6 and the hour hand is between 4 and 5. What time is it?", expectedAnswer: "4:32", acceptableEvidence: ["4:32", "thirty-two minutes past four", "A correctly labelled matching digital time"], likelyError: "Answers 4:08 by reading the 6 as six minutes and counting two more.", remediation: "Count five-minute intervals to the 6 as 30, then add the two individual marks."
    },
    "AC9M3M04:E2": {
      plainLanguageConcept: "Analog, digital and spoken time can represent the same instant; past counts minutes after the hour and to counts minutes before the next hour.",
      context: "Connect 12:45 with quarter to one.", component: "clockpair", parameters: { Given: "Digital 12:45", Model: "Analog minute hand at 9; 45 past 12 = 15 before 1", Result: "quarter to one" }, contract: { hour: [1, 12], minute: [0, 59], representations: [2, 3] },
      accessibleDescription: "A digital display of twelve forty-five sits beside an analog clock with minute hand at nine and hour hand close to one.",
      teacherDoes: "Counts both 45 minutes from 12 and 15 minutes remaining to 1.", teacherSaysOrAsks: "Why does the spoken time name one rather than twelve?", studentDoes: "Matches digital, analog and spoken representations.", whatToLookFor: "For 'to' language, the student names the approaching hour.",
      checkpointPrompt: "Write 10:05 in past language.", expectedAnswer: "5 minutes past 10.", acceptableEvidence: ["5 minutes past 10", "five past ten", "An analog clock with minute hand at 1 and hour hand just past 10"], likelyError: "Says five to ten because the 5 is treated as a direction word.", remediation: "Begin at ten o'clock and move the minute hand forward five minutes while saying after or past."
    },
    "AC9M3M04:E3": {
      plainLanguageConcept: "As the minute hand travels around the clock, the hour hand moves gradually toward the next hour rather than jumping only when sixty minutes pass.",
      context: "Track the hands at 3:00, 3:30 and 3:55.", component: "clockpair", parameters: { Given: "3:00 → 3:30 → 3:55", Model: "Minute hand 12→6→11; hour hand 3→halfway→near 4", Result: "The hour hand progresses continuously toward 4" }, contract: { hour: [1, 12], minute: [0, 59], snapshots: [2, 6] },
      accessibleDescription: "Three clocks show the minute hand moving from twelve to six to eleven while the hour hand moves from three toward four.",
      teacherDoes: "Moves geared or linked clock hands and pauses at several minute positions.", teacherSaysOrAsks: "At 3:55, why should the hour hand be close to 4?", studentDoes: "Predicts and sets both hands consistently for given times.", whatToLookFor: "The hour hand sits proportionally between hour numerals.",
      checkpointPrompt: "Where should the hour hand be at 8:30?", expectedAnswer: "Halfway between 8 and 9.", acceptableEvidence: ["halfway between 8 and 9", "A correct analog clock drawing", "It has travelled halfway from 8 toward 9"], likelyError: "Places the hour hand exactly on 8 while the minute hand is at 6.", remediation: "Move the hour hand halfway through its journey while the minute hand makes half a full turn."
    },

    "AC9M3M05:E1": {
      plainLanguageConcept: "A right angle is a quarter turn, so half and three-quarter turns can be compared as two and three right angles.",
      context: "Turn an arrow from north through quarter, half and three-quarter turns.", component: "angleset", parameters: { Given: "Start facing north", Model: "quarter → east; half → south; three-quarter → west", Result: "1, 2 and 3 right angles" }, contract: { turns: [0.25, 0.75], rightAngleUnits: [1, 3], directions: [4, 4] },
      accessibleDescription: "Three arrow diagrams show quarter, half and three-quarter clockwise turns from north, labelled one, two and three right angles.",
      teacherDoes: "Uses a fixed starting ray and traces each turn without changing the vertex.", teacherSaysOrAsks: "How many quarter turns fit inside a half turn?", studentDoes: "Performs, sketches and compares the turns in right-angle units.", whatToLookFor: "The comparison refers to turn size, not arm length.",
      checkpointPrompt: "How many right angles are in a three-quarter turn?", expectedAnswer: "3 right angles.", acceptableEvidence: ["3 right angles", "three quarter-turns", "A diagram divided into three consecutive right-angle turns"], likelyError: "Answers 4 because a full turn contains four right angles.", remediation: "Trace only three of the four equal quarter sections in a full-turn circle."
    },
    "AC9M3M05:E2": {
      plainLanguageConcept: "A right angle matches a square corner, so a corner template can test everyday objects regardless of their orientation.",
      context: "Test the corners of a book, window and whiteboard.", component: "angle", parameters: { Given: "Square-corner tester", Model: "Tester arms align with both object edges", Result: "The corner is a right angle" }, contract: { referenceAngles: [1, 1], testedCorners: [1, 20], armLengths: [1, 100] },
      accessibleDescription: "An L-shaped right-angle tester is placed exactly over a book corner, with both arms aligned to the book edges.",
      teacherDoes: "Rotates the tester over multiple corners and distinguishes angle opening from side length.", teacherSaysOrAsks: "Does turning the book change the size of its corner angle?", studentDoes: "Tests, classifies and explains object corners.", whatToLookFor: "Both arms align from the same vertex without gaps or overlap.",
      checkpointPrompt: "A square-corner tester fits a window corner exactly. How should the angle be classified?", expectedAnswer: "It is a right angle.", acceptableEvidence: ["right angle", "same as the square-corner reference", "A correct overlay explanation"], likelyError: "Calls it a different angle because the window is tilted in the picture.", remediation: "Rotate the tester with the image and compare the opening while ignoring orientation."
    },
    "AC9M3M05:E3": {
      plainLanguageConcept: "Angles can be smaller than, equal to or greater than a right angle by comparing their openings with a fixed square-corner reference.",
      context: "Compare a partly open door at 60°, square open at 90° and wide open at 120°.", component: "angleset", parameters: { Given: "Three door openings", Model: "60° < right angle; 90° = right angle; 120° > right angle", Result: "smaller, equal, greater" }, contract: { comparisonAnglesDegrees: [1, 359], rightAngleDegrees: [90, 90], examples: [3, 6] },
      accessibleDescription: "Three top-view doors show openings smaller than, equal to and greater than a square-corner right angle.",
      teacherDoes: "Places the same right-angle template at every hinge and compares openings.", teacherSaysOrAsks: "Which door opening leaves a gap inside the right-angle tester, and what does that mean?", studentDoes: "Classifies and orders angles relative to the reference.", whatToLookFor: "The student compares opening size, not door length.",
      checkpointPrompt: "An angle fits inside a right-angle template with space left over. Is it smaller than, equal to or greater than a right angle?", expectedAnswer: "Smaller than a right angle.", acceptableEvidence: ["smaller than a right angle", "less than a right angle", "A diagram showing the angle inside the reference"], likelyError: "Calls it greater because the tester has more empty space.", remediation: "Trace only the angle's two rays and compare how far the second ray has turned from the first."
    },
    "AC9M3M05:E4": {
      plainLanguageConcept: "Turns in an authorised First Nations game can be investigated with right-angle benchmarks while the game's cultural rules and origin remain accurately sourced.",
      context: "Use an approved account of Waayin from the Datiwuy People and model a stated direction change with neutral arrows.", component: "angle", parameters: { Given: "Authorised movement instruction", Model: "Starting arrow, turn arrow and right-angle reference", Result: "The turn is classified relative to a right angle" }, contract: { turnsShown: [1, 6], referenceAngles: [1, 1], culturalSourceApproved: [1, 1] },
      accessibleDescription: "Neutral movement arrows compare an authorised game turn with a square-corner reference; cultural artwork is not invented.",
      teacherDoes: "Names the Datiwuy source, follows only documented instructions and overlays a mathematical turn model.", teacherSaysOrAsks: "How does the right-angle reference help describe this stated turn?", studentDoes: "Performs or traces the turn and explains the comparison without altering the game account.", whatToLookFor: "The mathematical classification is supported and cultural attribution remains specific.",
      checkpointPrompt: "A documented game instruction requires a half turn. How many right angles is that turn?", expectedAnswer: "2 right angles.", acceptableEvidence: ["2 right angles", "two quarter turns", "A half-turn diagram partitioned into two right angles"], likelyError: "Answers one because half turn is confused with half of a right angle.", remediation: "Build a full turn from four right-angle quarters, then select half of the full turn."
    },

    "AC9M3M06:E1": {
      plainLanguageConcept: "One dollar equals one hundred cents, and equivalent coin combinations keep the same total value even when the number of coins changes.",
      context: "Make $1 with two 50c coins, five 20c coins and ten 10c coins.", component: "money", parameters: { Given: "$1 = 100c", Model: "50c+50c; 5×20c; 10×10c", Result: "Each combination is $1" }, contract: { totalCents: [1, 10000], coinValuesCents: [5, 200], combinations: [2, 10] },
      accessibleDescription: "Three rows show two fifty-cent coins, five twenty-cent coins and ten ten-cent coins, each totalling one hundred cents or one dollar.",
      teacherDoes: "Builds and counts each combination in cents before renaming 100 cents as one dollar.", teacherSaysOrAsks: "Why can fewer coins still have the same value?", studentDoes: "Constructs, totals and compares equivalent combinations.", whatToLookFor: "The student compares value rather than coin count or physical size.",
      checkpointPrompt: "Give two different combinations of coins worth $1.", expectedAnswer: "For example, 50c + 50c and 20c + 20c + 20c + 20c + 20c.", acceptableEvidence: ["Any two valid Australian coin combinations totalling 100c", "50c+50c and 10×10c", "Correct coin drawings with totals"], likelyError: "Uses one 50c coin and assumes the large coin is worth one dollar.", remediation: "Write each coin's printed value and add the cent values until the total reaches 100."
    },
    "AC9M3M06:E2": {
      plainLanguageConcept: "Part-part-whole thinking supports equivalent money representations and change by decomposing dollars into cents and counting up to the amount paid.",
      context: "Represent $1.85 and find change from $2 after spending $1.30.", component: "moneyproblem", parameters: { Given: "$1.85; $2.00 − $1.30", Model: "$1+50c+20c+10c+5c; count 20c then 50c", Result: "$1.85 represented; 70c change" }, contract: { totalCents: [1, 100000], parts: [1, 20], changeCents: [0, 100000] },
      accessibleDescription: "A money bar partitions one dollar eighty-five into one dollar, fifty, twenty, ten and five cents; a second count-up moves from one dollar thirty to two dollars by twenty then fifty cents.",
      teacherDoes: "Expresses all values in cents when checking totals and labels count-up jumps.", teacherSaysOrAsks: "How do the 20-cent and 50-cent jumps bridge $1.30 to $2?", studentDoes: "Builds equivalent amounts and calculates change with an addition check.", whatToLookFor: "The change is 70 cents and the decimal notation retains two cent places.",
      checkpointPrompt: "An item costs $1.45 and you pay $2. What change should you receive?", expectedAnswer: "55 cents.", acceptableEvidence: ["55c", "$0.55", "$1.45 + $0.55 = $2.00", "Count up 5c to $1.50 then 50c to $2"], likelyError: "Answers 65 cents after subtracting digits without regrouping across the dollar.", remediation: "Count up from $1.45 to $1.50, then to $2.00 and combine the two jumps."
    },
    "AC9M3M06:E3": {
      plainLanguageConcept: "In a transaction, several valid coin and note combinations can pay the same price; checking the summed value confirms equivalence.",
      context: "Pay $3.40 in two different ways during a class shop role-play.", component: "workedCards", parameters: { Given: "Price $3.40", Model: "$2+$1+20c+20c; $1+$1+$1+20c+10c+10c", Result: "Both total $3.40" }, contract: { priceCents: [5, 100000], combinations: [2, 10], tenderPieces: [1, 30] },
      accessibleDescription: "Two payment cards show different Australian note-and-coin combinations, each with a subtotal calculation of three dollars forty cents.",
      teacherDoes: "Sets a price, limits available play money and asks students to verify each tender in cents.", teacherSaysOrAsks: "How can the shopkeeper prove both payments are exact?", studentDoes: "Selects money, totals it and explains equivalence in the role-play.", whatToLookFor: "Each combination totals exactly 340 cents and uses represented Australian denominations.",
      checkpointPrompt: "Give two different exact payments for $2.20.", expectedAnswer: "For example, $2 + 20c and $1 + $1 + 10c + 10c.", acceptableEvidence: ["Any two valid combinations totalling $2.20", "$2+20c and $1+$1+20c", "Correct play-money models with 220c checks"], likelyError: "Counts pieces rather than values and treats two coins as equivalent to two dollars.", remediation: "Convert each piece to cents, write its value underneath and add the values before accepting payment."
    }
  };
})();
