(() => {
  "use strict";
  if (!window.SkillrYear4MathsRegister) throw new Error("Year 4 Maths base data is not loaded.");
  window.SkillrYear4MathsRegister({
    AC9M4M03: {
      slug:"ac9m4m03-solve-problems-involving-the-duration-of-time-including",
      title:"Duration, am/pm and Time Conversions",
      subtitle:"Solve elapsed-time problems across hours, noon and midnight",
      desc:"solve problems involving the duration of time including situations involving “am” and “pm” and conversions between units of time",
      routine:"Identify start/end → Mark am or pm → Bridge to friendly time → Add intervals → Convert units → Check context",
      learn:"Duration measures elapsed time, not the difference between clock digits. Breaking a journey across whole hours, noon or midnight reduces errors, and units must be converted consistently.",
      model_title:"Find duration from 9:35 am to 1:10 pm",
      model_visual:{type:"time-line",items:[["9:35 am","start"],["10:00 am","+25 min"],["1:00 pm","+3 h"],["1:10 pm","+10 min"]],duration:"Total duration = 3 h 35 min"},
      model_note:"Bridge to a whole hour, then count hours and remaining minutes. The interval crosses noon, so am changes to pm.",
      apply_title:"Convert and compare durations",
      apply_visual:{type:"table",rows:[["Duration","Equivalent"],["2 h 15 min","135 min"],["150 min","2 h 30 min"],["1 day 6 h","30 h"],["90 s","1 min 30 s"]]},
      apply_note:"Use 60 minutes per hour, 60 seconds per minute and 24 hours per day. Keep clock time and duration notation distinct.",
      quick_visual:{type:"cards",items:["12:00 noon","12:00 midnight","24 h = 1 day","60 min = 1 h","elapsed time ≠ subtraction of digits"]},
      activities:[
        {title:"Timeline jumps",text:"Solve elapsed-time tasks by recording jumps to the next hour, then across larger intervals.",visual:{type:"time-line",items:[["2:48 pm","start"],["3:00 pm","12 min"],["5:00 pm","2 h"],["5:27 pm","27 min"]],duration:"2 h 39 min"}},
        {title:"Schedule comparison",text:"Compare travel, lesson and event durations written in mixed units.",visual:{type:"table",rows:[["Event","Start","Finish","Duration"],["lesson","9:10 am","10:25 am","1 h 15 min"],["trip","11:45 am","2:05 pm","2 h 20 min"]]}},
        {title:"Midnight crossing",text:"Use a 24-hour timeline to solve a duration that starts before midnight and ends after midnight.",visual:{type:"flow",items:["10:50 pm","+1 h 10 min","12:00 midnight","+35 min","12:35 am","1 h 45 min"]}}
      ],
      mistakes:[
        ["Subtracting clock digits directly","Use elapsed intervals; 1:10 − 9:35 is not ordinary place-value subtraction."],
        ["12 am and 12 pm reversed","12:00 pm is noon and 12:00 am is midnight."],
        ["Minutes treated as hundredths of an hour","An hour has 60 minutes."],
        ["am/pm omitted","Without it, a duration may be ambiguous."]
      ],
      quick:["Find 9:35 am to 1:10 pm.","Convert 2 h 15 min to minutes.","Find 10:50 pm to 12:35 am.","Explain 12 pm and 12 am.","Compare 145 min and 2 h 20 min."],
      mastery:["Use am/pm correctly","Calculate elapsed time","Cross noon/midnight","Convert time units","Interpret schedules"],
      worksheet:[
        {type:"single",question:"What is the duration from 9:35 am to 1:10 pm?",answers:["3 h 35 min","4 h 25 min","3 h 25 min","2 h 35 min"]},
        {type:"fill-blank",question:"Complete the conversion.",template:"2 h 15 min = {{blank}} minutes"},
        {type:"single",question:"Which time is noon?",answers:["12:00 pm","12:00 am","1:00 am","11:59 pm"]},
        {type:"text",question:"Use a timeline to find the duration from 2:48 pm to 5:27 pm."},
        {type:"match",question:"Match each duration to an equivalent.",matchLeft:["150 min","1 day 6 h","90 s"],matchRight:["1 min 30 s","30 h","2 h 30 min"]},
        {type:"fill-blank",question:"Complete the midnight duration.",template:"10:50 pm to 12:35 am is {{blank}} h {{blank}} min."},
        {type:"text",question:"A movie begins at 6:45 pm and lasts 1 h 58 min. Find the finishing time and show the interval jumps."},
        {type:"text",question:"A student says 3:20 pm to 5:05 pm is 2 h 15 min by subtracting 20 from 05. Explain the error and correct duration."},
        {type:"text",question:"Create a one-day timetable with five events, including one that crosses noon. Calculate all gaps and durations, then check the total scheduled time.",enrichment:true},
        {type:"text",question:"Design a multi-day travel problem that requires converting days to hours and crossing midnight. Solve it with a labelled timeline.",enrichment:true}
      ]
    },
    AC9M4M04: {
      slug:"ac9m4m04-estimate-and-compare-angles-using-angle-names-including-acute",
      title:"Estimating and Comparing Angles",
      subtitle:"Use right-angle and turn benchmarks to classify acute, obtuse, straight, reflex and full-turn angles",
      desc:"estimate and compare angles using angle names including acute, obtuse, straight angle, reflex and revolution, and recognise their relationship to a right angle",
      routine:"Identify vertex and arms → Compare with 90° → Compare with 180° → Name angle → Estimate turn → Justify",
      learn:"Angle size measures turn. A right angle is 90°, a straight angle is 180°, a full revolution is 360°, acute angles are less than 90°, obtuse angles are between 90° and 180°, and reflex angles are between 180° and 360°.",
      model_title:"Classify angles using benchmark turns",
      model_visual:{type:"angle-set",items:[[45,"acute"],[90,"right"],[135,"obtuse"],[180,"straight"],[270,"reflex"],[360,"revolution"]]},
      model_note:"Estimate by comparing the turn with a quarter, half, three-quarter or full revolution. Arm length and page orientation do not determine angle size.",
      apply_title:"Order and estimate unlabeled angles",
      apply_visual:{type:"table",rows:[["Visual estimate","Name","Benchmark relation"],["about half of 90°","acute","≈45°"],["a little more than 90°","obtuse","≈110°"],["more than 180°","reflex","≈240°"],["one complete turn","revolution","360°"]]},
      apply_note:"The goal is a sensible estimate and classification, not exact protractor measurement. Explain which benchmark supports the estimate.",
      quick_visual:{type:"cards",items:["acute < 90°","right = 90°","90° < obtuse < 180°","straight = 180°","180° < reflex < 360°","revolution = 360°"]},
      activities:[
        {title:"Angle benchmark cards",text:"Sort angle diagrams by comparing each with a square corner and straight line.",visual:{type:"angle-set",items:[[30,"acute"],[95,"obtuse"],[180,"straight"],[225,"reflex"]]}},
        {title:"Turn and estimate",text:"Use body turns or a rotating arrow to make quarter, half, three-quarter and full turns, then connect to angle names.",visual:{type:"flow",items:["quarter turn 90°","half turn 180°","three-quarter turn 270°","full turn 360°"]}},
        {title:"Same angle, new position",text:"Rotate or extend angle arms and explain why the angle size remains unchanged.",visual:{type:"compare",items:["short arms at 60°","long arms at 60°","rotated 60°"],note:"same turn"}}
      ],
      mistakes:[
        ["Long arms mean large angle","Angle size depends on turn, not line length."],
        ["Reflex angle identified as smaller interior angle","Specify which turn is being measured; reflex is the larger turn over 180°."],
        ["Orientation changes angle name","Rotating a diagram does not change the angle."],
        ["Straight angle called a line only","A straight angle represents a half turn of 180°."]
      ],
      quick:["Classify 45°, 120° and 250°.","Estimate an angle slightly greater than 90°.","Explain a straight angle.","Compare reflex and obtuse angles.","Why do arm lengths not matter?"],
      mastery:["Use right-angle benchmark","Classify named angles","Estimate turn size","Recognise reflex/revolution","Justify comparisons"],
      worksheet:[
        {type:"single",question:"Which angle is obtuse?",answers:["120°","45°","90°","270°"]},
        {type:"fill-blank",question:"Complete the benchmark.",template:"A straight angle is {{blank}}°."},
        {type:"single",question:"Which angle is reflex?",answers:["240°","140°","80°","180°"]},
        {type:"text",question:"Explain how a right-angle benchmark helps classify an angle estimated at 70°."},
        {type:"match",question:"Match each angle to its name.",matchLeft:["35°","90°","180°"],matchRight:["straight","acute","right"]},
        {type:"fill-blank",question:"Complete the turn relationship.",template:"A full revolution is {{blank}} right angles."},
        {type:"text",question:"Order 80°, 95°, 180°, 225° and 360° from smallest to largest and name each angle type."},
        {type:"text",question:"A student says a rotated acute angle becomes obtuse because it points down. Explain why orientation is irrelevant."},
        {type:"text",question:"Create six angle estimates, one for each named category, and justify every estimate using right-angle or turn benchmarks.",enrichment:true},
        {type:"text",question:"Draw or describe two different turns between the same pair of rays: one acute or obtuse and one reflex. Explain how both can be valid angles.",enrichment:true}
      ]
    }
  }, ["AC9M4M03","AC9M4M04"]);
})();
