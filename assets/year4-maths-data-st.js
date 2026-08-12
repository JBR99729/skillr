(() => {
  "use strict";
  if (!window.SkillrYear4MathsRegister) throw new Error("Year 4 Maths base data is not loaded.");
  window.SkillrYear4MathsRegister({
    AC9M4ST01: {
      slug:"ac9m4st01-acquire-data-for-categorical-and-discrete-numerical-variables",
      title:"Collecting and Representing Data with Many-to-One Displays",
      subtitle:"Use digital tools, pictographs and column graphs to answer a purposeful question",
      desc:"acquire data for categorical and discrete numerical variables to address a question of interest or purpose, using digital tools; represent data using many-to-one pictographs, column graphs and other displays or visualisations; interpret and discuss the information that has been created",
      routine:"Define question → Identify variable → Collect accurately → Organise digitally → Choose display/key/scale → Interpret → Discuss limitations",
      learn:"A data display should preserve the collected values and make the purpose easier to answer. In a many-to-one pictograph, one symbol represents several observations, so partial symbols and keys must be interpreted carefully.",
      model_title:"Build a many-to-one pictograph with a key",
      model_visual:{type:"pictograph",key:2,items:[["Walk",8],["Bus",5],["Car",10],["Bike",3]]},
      model_note:"With ● = 2 students, 5 students require two full symbols and one half symbol. The key is part of the data and cannot be ignored.",
      apply_title:"Represent the same data in a column graph",
      apply_visual:{type:"bargraph",labels:["Walk","Bus","Car","Bike"],values:[8,5,10,3]},
      apply_note:"Column heights use the actual frequencies. Select a scale that shows all values clearly and label title, axes/categories and units or frequency.",
      quick_visual:{type:"table",rows:[["Variable type","Example"],["categorical","transport type"],["discrete numerical","number of books read"],["purpose","compare common choices"]]},
      activities:[
        {title:"Survey and spreadsheet",text:"Collect a class categorical variable, enter responses in a spreadsheet and use formulas or sorting to check frequencies.",visual:{type:"table",rows:[["Response","Frequency"],["walk","8"],["bus","5"],["car","10"],["bike","3"]]}},
        {title:"Key selection",text:"Choose a many-to-one key that represents all frequencies clearly, then decide how partial symbols will be shown.",visual:{type:"strategy",items:[["● = 1","simple but many symbols"],["● = 2","half symbols possible"],["● = 5","compact but may need fifth symbols"]]}},
        {title:"Interpret and question",text:"Use a display to write comparison, total and difference statements, then identify one question the data cannot answer.",visual:{type:"cards",items:["most/least","difference","total","fraction of responses","limitation"]}}
      ],
      mistakes:[
        ["Key ignored","Multiply symbols by the key value and interpret partial symbols proportionally."],
        ["Display scale changes frequencies","Representation must match the source data exactly."],
        ["Question and variable mismatch","Collect a variable that directly addresses the purpose."],
        ["Graph interpreted beyond data","Describe what was collected without inventing causes."]
      ],
      quick:["Interpret 2.5 symbols when ● = 2.","Choose a key for frequencies up to 40.","Distinguish categorical and discrete numerical data.","State one graph comparison.","Identify a display limitation."],
      mastery:["Collect purposeful data","Use digital tools","Create many-to-one pictographs","Create column graphs","Interpret and discuss"],
      worksheet:[
        {type:"single",question:"In a pictograph where ● = 2 students, what do 3.5 symbols represent?",answers:["7 students","5 students","6 students","3.5 students"]},
        {type:"fill-blank",question:"Complete the key interpretation.",template:"With ● = 5, four full symbols represent {{blank}} responses."},
        {type:"single",question:"Which is categorical data?",answers:["transport type","number of books read","number of pets","number of goals scored"]},
        {type:"text",question:"Design a many-to-one pictograph for Walk 8, Bus 5, Car 10 and Bike 3 using ● = 2. Explain partial symbols."},
        {type:"match",question:"Match each display feature to its purpose.",matchLeft:["key","column height","title"],matchRight:["states the question/context","shows frequency using scale","explains symbol value"]},
        {type:"fill-blank",question:"Complete the comparison.",template:"Car 10 has {{blank}} more responses than Bus 5."},
        {type:"text",question:"Explain why a key of ● = 5 may be less convenient than ● = 2 for frequencies 8, 5, 10 and 3."},
        {type:"text",question:"A graph has Car at height 12 although the source table says 10. Explain the integrity problem and correction."},
        {type:"text",question:"Represent one data set using a many-to-one pictograph and a column graph. Compare which display is more effective for exact reading, quick comparison and visual appeal.",enrichment:true},
        {type:"text",question:"Design a digital data-collection plan that prevents duplicate entries, checks totals and produces a suitable display. Explain every validation step.",enrichment:true}
      ]
    },
    AC9M4ST02: {
      slug:"ac9m4st02-analyse-the-effectiveness-of-different-displays-or",
      title:"Comparing Data Displays and Distributions",
      subtitle:"Evaluate effectiveness, describe shape and discuss variation",
      desc:"analyse the effectiveness of different displays or visualisations in illustrating and comparing data distributions, then discuss the shape of distributions and the variation in the data",
      routine:"Identify question → Read scale/key → Describe concentration/gaps/extremes → Compare variation → Evaluate display → Support with data",
      learn:"A distribution describes how values are spread and concentrated. Different displays highlight different features, so effectiveness depends on the question, scale, audience and accuracy.",
      model_title:"Read the shape and variation of a dot plot",
      model_visual:{type:"dotplot",values:[4,5,5,5,6,6,7,7,7,7,8,9,12]},
      model_note:"Most values cluster from 5 to 8, there is a gap from 10 to 11 and 12 is a high extreme. Describe evidence rather than calling the graph simply 'spread out'.",
      apply_title:"Compare two distributions",
      apply_visual:{type:"table",rows:[["Feature","Class A","Class B"],["centre/concentration","mostly 6–8","mostly 6–8"],["range","4–12","5–9"],["variation","greater","smaller"],["extreme","12","none obvious"]]},
      apply_note:"Two groups may have similar typical values but different variation. Use range, clusters, gaps and extremes as Year 4 evidence without overclaiming.",
      quick_visual:{type:"compare",items:["dot plot reveals individual values","column graph compares categories","pictograph communicates counts visually","scale can exaggerate differences"],note:"choose for purpose"},
      activities:[
        {title:"Distribution language",text:"Annotate a dot plot with clusters, gaps, common values, range and possible extremes.",visual:{type:"cards",items:["cluster","gap","most common","range","extreme","variation"]}},
        {title:"Display effectiveness",text:"Compare a table, pictograph and graph for the same data using accuracy, readability and purpose criteria.",visual:{type:"table",rows:[["Display","Strength","Limitation"],["table","exact values","pattern less immediate"],["dot plot","distribution visible","needs explanation"],["pictograph","engaging","key can slow exact reading"]]}},
        {title:"Scale critique",text:"Examine two graphs with different vertical scales and explain how appearance can change while data remains the same.",visual:{type:"compare",items:["axis 0–100","axis 70–100","same values, different visual difference"],note:"always inspect scale"}}
      ],
      mistakes:[
        ["Tall-looking difference assumed large","Read the axis scale and actual values."],
        ["Range used as complete description","Also discuss clusters, gaps and common values."],
        ["Extreme value deleted automatically","Investigate whether it is valid before excluding it."],
        ["Best graph declared without purpose","Effectiveness depends on the question and audience."]
      ],
      quick:["Describe the cluster in a dot plot.","Find range from 4 to 12.","Compare two groups with same centre but different spread.","Explain truncated-axis risk.","Choose a display for individual numerical values."],
      mastery:["Read distribution features","Discuss variation","Compare distributions","Analyse scales","Evaluate display effectiveness"],
      worksheet:[
        {type:"single",question:"For values from 4 to 12, what is the range?",answers:["8","16","12","4"]},
        {type:"fill-blank",question:"Complete the distribution term.",template:"A group of many values close together is a {{blank}}."},
        {type:"single",question:"Which display best shows individual numerical values and their distribution?",answers:["dot plot","single title","unlabelled icon","calendar"]},
        {type:"text",question:"Describe the shape of the data 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 8, 9, 12 using clusters, gaps and extremes."},
        {type:"match",question:"Match each feature to its meaning.",matchLeft:["range","gap","cluster"],matchRight:["many values close together","highest minus lowest","interval with no values"]},
        {type:"fill-blank",question:"Complete the comparison.",template:"Class A ranges from 4 to 12 and Class B from 5 to 9, so Class A has {{blank}} variation by range."},
        {type:"text",question:"Explain how starting a vertical axis at 70 instead of 0 can exaggerate a small difference."},
        {type:"text",question:"A student says a table is always better because it shows exact values. Evaluate the claim for a question about distribution shape."},
        {type:"text",question:"Construct two distributions with the same range but noticeably different clustering. Describe how a dot plot would reveal the difference.",enrichment:true},
        {type:"text",question:"Design an evaluation rubric for choosing among tables, pictographs, column graphs and dot plots. Apply it to one data question.",enrichment:true}
      ]
    },
    AC9M4ST03: {
      slug:"ac9m4st03-conduct-statistical-investigations-collecting-data-through",
      title:"Conducting and Communicating Statistical Investigations",
      subtitle:"Plan surveys, record digitally, interpret evidence and report findings",
      desc:"conduct statistical investigations, collecting data through survey responses and other methods; record and display data using digital tools; interpret the data and communicate the results",
      routine:"Pose question → Plan population/method → Collect ethically → Clean and organise → Display → Interpret → Communicate → Reflect",
      learn:"A statistical investigation is a connected process. The question determines the data needed, the method affects data quality and conclusions must be supported by the collected evidence and limited to the population studied.",
      model_title:"Plan an investigation from question to conclusion",
      model_visual:{type:"investigation",items:["question","sample/method","collect","clean","display","interpret","communicate","reflect"]},
      model_note:"A strong plan defines who or what will be observed, how responses will be recorded once, and how the display will answer the original question.",
      apply_title:"Communicate a result with evidence and limitations",
      apply_visual:{type:"table",rows:[["Report element","Example"],["finding","12 of 28 students chose walking"],["comparison","5 more than bus"],["limitation","one Year 4 class only"],["next step","repeat across other classes"]]},
      apply_note:"Avoid claiming the result represents all students unless the collection method supports that conclusion. Include exact evidence and a limitation.",
      quick_visual:{type:"cards",items:["clear question","defined sample","one response each","clean data","appropriate display","evidence conclusion","limitation"]},
      activities:[
        {title:"Question quality test",text:"Revise vague, leading or double questions into clear statistical questions.",visual:{type:"compare",items:["Do you like healthy tasty lunches?","Which lunch option do you choose most often?","How many times per week?"],note:"one clear variable per question"}},
        {title:"Digital data cleaning",text:"Find duplicate entries, inconsistent spellings and missing values in a spreadsheet before graphing.",visual:{type:"table",rows:[["raw","clean"],["Bus / bus","Bus"],["walk ","Walk"],["duplicate ID","remove/check"]]}},
        {title:"Evidence report",text:"Create a one-page result with title, display, two evidence statements, limitation and next question.",visual:{type:"flow",items:["display","finding","comparison","limitation","next question"]}}
      ],
      mistakes:[
        ["Leading survey question","Wording should not push respondents toward an answer."],
        ["Duplicate or inconsistent entries","Clean data before calculating frequencies."],
        ["Conclusion exceeds sample","State who was surveyed and limit the claim."],
        ["Display chosen after writing conclusion","Let the question and data determine the display."]
      ],
      quick:["Improve a leading question.","Why define the sample?","Name two data-cleaning checks.","Write an evidence conclusion.","State a limitation."],
      mastery:["Pose statistical questions","Plan ethical collection","Use digital recording","Interpret evidence","Communicate and reflect"],
      worksheet:[
        {type:"single",question:"Which survey question is least leading?",answers:["Which lunch option do you choose most often?","Don't you agree healthy lunches are best?","Do you like healthy and tasty lunches?","Why is pizza better?"]},
        {type:"fill-blank",question:"Complete the investigation process.",template:"question → collect → organise → display → interpret → {{blank}}"},
        {type:"single",question:"Which is a data-cleaning action?",answers:["standardising Bus and bus to one category","changing values to match a prediction","deleting an unpopular category","counting one response twice"]},
        {type:"text",question:"Plan a survey investigating a Year 4 question. Define the population, variable, collection method and display."},
        {type:"match",question:"Match each report element to its role.",matchLeft:["finding","limitation","next question"],matchRight:["suggests further investigation","states evidence from data","sets a boundary on the conclusion"]},
        {type:"fill-blank",question:"Complete the comparison statement.",template:"Walking received 12 responses and bus 7, so walking had {{blank}} more."},
        {type:"text",question:"Explain why results from one Year 4 class should not automatically be described as the preferences of every Australian child."},
        {type:"text",question:"A student graphs raw spreadsheet entries containing Walk, walk and WALK as separate categories. Explain the problem and correction."},
        {type:"text",question:"Conduct a complete hypothetical investigation and produce a data table, display plan, evidence-based conclusion, limitation and follow-up question.",enrichment:true},
        {type:"text",question:"Compare two sampling methods for the same question. Analyse fairness, practicality and how each method could influence the conclusions.",enrichment:true}
      ]
    }
  }, ["AC9M4ST01","AC9M4ST02","AC9M4ST03"]);
})();
