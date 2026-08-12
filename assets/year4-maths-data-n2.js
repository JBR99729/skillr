(() => {
  "use strict";
  if (!window.SkillrYear4MathsRegister) throw new Error("Year 4 Maths base data is not loaded.");
  window.SkillrYear4MathsRegister({
    AC9M4N04: {
      slug:"ac9m4n04-count-by-fractions-including-mixed-numerals-locate-and",
      title:"Counting with Fractions and Mixed Numerals",
      subtitle:"Locate improper fractions and mixed numerals on number lines",
      desc:"count by fractions including mixed numerals; locate and represent these fractions as numbers on number lines",
      routine:"Choose step size → Partition each whole equally → Count beyond one → Rename → Locate and compare",
      learn:"Fractions are numbers that can be counted and located on a continuous number line. An improper fraction and a mixed numeral can represent the same point, such as 7/4 = 1 3/4.",
      model_title:"Count by quarters beyond one whole",
      model_visual:{type:"numberline",start:0,end:3,marks:[[0.25,"1/4"],[0.5,"2/4"],[0.75,"3/4"],[1,"4/4 = 1"],[1.25,"5/4 = 1 1/4"],[1.75,"7/4 = 1 3/4"],[2.5,"10/4 = 2 1/2"]]},
      model_note:"Every interval represents one quarter. Crossing a whole does not change the step size or denominator.",
      apply_title:"Rename between improper fractions and mixed numerals",
      apply_visual:{type:"table",rows:[["Improper fraction","Whole groups","Mixed numeral"],["7/4","4/4 + 3/4","1 3/4"],["11/5","10/5 + 1/5","2 1/5"],["9/2","8/2 + 1/2","4 1/2"]]},
      apply_note:"Count how many complete denominator-sized groups fit in the numerator, then keep the remainder over the same denominator.",
      quick_visual:{type:"fraction-set",items:[[4,4,"1"],[4,3,"3/4"],[4,2,"1/2"]]},
      activities:[
        {title:"Human fraction line",text:"Mark equal quarter intervals on a floor number line and stand at 3/4, 5/4, 1 1/2 and 9/4.",visual:{type:"numberline",start:0,end:2.5,marks:[[0.75,"3/4"],[1.25,"5/4"],[1.5,"1 1/2"],[2.25,"9/4"]]}},
        {title:"Count and rename",text:"Count by thirds from 0 to 3, recording improper fractions and mixed numerals at every whole and beyond.",visual:{type:"flow",items:["0","1/3","2/3","3/3 = 1","4/3 = 1 1/3","5/3","6/3 = 2"]}},
        {title:"Missing-point challenge",text:"Use interval size and neighbouring labels to identify missing fractions on partially labelled number lines.",visual:{type:"numberline",start:1,end:3,marks:[[1.25,"?"],[1.5,"1 1/2"],[2,"2"],[2.75,"?"]]}}
      ],
      mistakes:[
        ["Denominator changes after one whole","The denominator keeps naming the same-sized parts."],
        ["Mixed numeral treated as multiplication","1 3/4 means one whole and three quarters, not 1 × 3/4."],
        ["Unequal number-line intervals","Equal fraction steps require equal distances."],
        ["Improper fractions cannot be numbers","They are valid numbers greater than or equal to one."]
      ],
      quick:["Count by fifths from 4/5 to 9/5.","Rename 7/4 as a mixed numeral.","Rename 2 2/3 as an improper fraction.","Locate 5/2 on a number line.","Explain why 8/4 = 2."],
      mastery:["Count by fractions","Cross whole numbers","Use mixed numerals","Rename improper fractions","Locate and compare on number lines"],
      worksheet:[
        {type:"single",question:"Which mixed numeral is equivalent to 7/4?",answers:["1 3/4","1 7/4","3 1/4","7 1/4"]},
        {type:"fill-blank",question:"Complete the count by thirds.",template:"2/3, 3/3, 4/3, {{blank}}, 6/3"},
        {type:"single",question:"Which improper fraction is equivalent to 2 1/5?",answers:["11/5","3/5","10/5","21/5"]},
        {type:"text",question:"Draw or describe a number line from 0 to 3 showing 5/4, 1 3/4 and 9/4."},
        {type:"match",question:"Match each improper fraction to its mixed numeral.",matchLeft:["9/2","11/5","8/3"],matchRight:["2 2/3","2 1/5","4 1/2"]},
        {type:"fill-blank",question:"Complete the equivalence.",template:"2 3/4 = {{blank}}/4"},
        {type:"text",question:"Order 5/4, 1 1/2, 7/4 and 2 from smallest to largest. Show a common representation."},
        {type:"text",question:"A student changes the denominator from 4 to 5 after reaching 4/4. Explain why the counting sequence is incorrect."},
        {type:"text",question:"Create a fraction-counting sequence with step size 3/8 that crosses two whole numbers. Write every term as an improper fraction and label three terms as mixed numerals.",enrichment:true},
        {type:"text",question:"Design a number-line puzzle where three labels are missing but can be determined uniquely. Include mixed numerals and justify each missing value.",enrichment:true}
      ]
    },
    AC9M4N05: {
      slug:"ac9m4n05-solve-problems-involving-multiplying-or-dividing-natural",
      title:"Multiplying and Dividing by Multiples and Powers of 10",
      subtitle:"Use multiplicative place-value relationships rather than zero tricks",
      desc:"solve problems involving multiplying or dividing natural numbers by multiples and powers of 10 without a calculator, using the multiplicative relationship between the place value of digits",
      routine:"Identify factor or divisor → Track place-value shift → Calculate → Interpret units → Check inverse",
      learn:"Multiplying by 10, 100 or 1 000 makes each digit worth 10, 100 or 1 000 times as much. Dividing reverses this relationship when the quotient is a natural number.",
      model_title:"Track the value of digits through ×10 and ×100",
      model_visual:{type:"place-shift",rows:[["thousands","hundreds","tens","ones"],["","","3","7"],["","3","7","0"],["3","7","0","0"]],steps:["37 × 10 = 370","37 × 100 = 3 700"]},
      model_note:"The digits shift to places with greater value; zeros fill empty positions. This is more reliable than memorising 'add zeros'.",
      apply_title:"Use multiples of 10 by separating factors",
      apply_visual:{type:"flow",items:["24 × 30","24 × 3 × 10","72 × 10","720"]},
      apply_note:"Rewrite 30 as 3 × 10. For division, use inverse factor relationships such as 4 800 ÷ 60 = 480 ÷ 6 = 80.",
      quick_visual:{type:"table",rows:[["Calculation","Result"],["46 × 10","460"],["460 ÷ 10","46"],["32 × 200","6 400"],["6 400 ÷ 200","32"]]},
      activities:[
        {title:"Digit-value tracker",text:"Use place-value cards to show how the value of each digit changes in 406 × 10 and 406 × 100.",visual:{type:"place-shift",rows:[["1000","100","10","1"],["","4","0","6"],["4","0","6","0"]],steps:["406 → 4 060"]}},
        {title:"Factor the multiple",text:"Solve ×20, ×40 and ×300 problems by separating the single-digit factor and power of 10.",visual:{type:"strategy",items:[["18 × 20","18 × 2 × 10"],["35 × 40","35 × 4 × 10"],["12 × 300","12 × 3 × 100"]]}},
        {title:"Inverse-chain check",text:"Check multiplication and division problems using related inverse facts.",visual:{type:"flow",items:["28 × 50 = 1 400","1 400 ÷ 50 = 28","1 400 ÷ 28 = 50"]}}
      ],
      mistakes:[
        ["Add zeros rule used blindly","Place-value reasoning explains when and why placeholder zeros appear."],
        ["30 treated as 3","Remember the extra factor of 10."],
        ["Division shift in wrong direction","Division by 10 makes each digit worth one tenth as much."],
        ["Units ignored","Interpret whether the answer counts items, cost, length or groups."]
      ],
      quick:["Calculate 47 × 100.","Calculate 3 600 ÷ 100.","Solve 24 × 30 using factors.","Solve 4 800 ÷ 60.","Explain why 406 × 10 is 4 060."],
      mastery:["Multiply by powers of 10","Divide by powers of 10","Factor multiples of 10","Use inverse checks","Explain digit-value changes"],
      worksheet:[
        {type:"single",question:"What is 47 × 100?",answers:["4 700","470","47 000","147"]},
        {type:"fill-blank",question:"Complete the place-value relationship.",template:"3 600 ÷ 100 = {{blank}}"},
        {type:"single",question:"Which expression is equivalent to 24 × 30?",answers:["24 × 3 × 10","24 × 3","24 × 300","24 + 30"]},
        {type:"text",question:"Explain how place value changes when 406 is multiplied by 100."},
        {type:"match",question:"Match each calculation to its result.",matchLeft:["32 × 200","4 800 ÷ 60","7 200 ÷ 80"],matchRight:["80","6 400","90"]},
        {type:"fill-blank",question:"Complete the factorisation.",template:"35 × 40 = 35 × 4 × {{blank}}"},
        {type:"text",question:"Solve 1 260 ÷ 30 without a calculator. Show how the divisor can be factored."},
        {type:"text",question:"A student says 53 × 20 = 1 060 because they first found 53 × 2. Explain every step and confirm whether the answer is correct."},
        {type:"text",question:"Develop two different mental strategies for 48 × 250 and compare their efficiency.",enrichment:true},
        {type:"text",question:"Create a practical problem whose calculation is 7 200 ÷ 80. Solve it using place-value and factor reasoning, then check with multiplication.",enrichment:true}
      ]
    },
    AC9M4N06: {
      slug:"ac9m4n06-develop-efficient-strategies-and-use-appropriate-digital-tools",
      title:"Efficient Calculation Strategies and Digital Tools",
      subtitle:"Choose, compare and justify methods for the four operations",
      desc:"develop efficient strategies and use appropriate digital tools for solving problems involving addition and subtraction, and multiplication and division where there is no remainder",
      routine:"Estimate → Analyse numbers → Choose strategy/tool → Solve → Check → Compare efficiency",
      learn:"Efficiency means choosing a method that is accurate, understandable and well suited to the numbers and context. Mental strategies, written methods and digital tools each have appropriate uses.",
      model_title:"Compare strategies for 2 998 + 467",
      model_visual:{type:"strategy",items:[["compensation","3 000 + 467 − 2 = 3 465"],["partition","2 998 + 400 + 60 + 7"],["written algorithm","align place values and regroup"]]},
      model_note:"Compensation is especially efficient because 2 998 is close to 3 000, but another correct strategy may be clearer for a different learner.",
      apply_title:"Choose a multiplication or division strategy",
      apply_visual:{type:"strategy",items:[["36 × 24","36 × 20 + 36 × 4"],["936 ÷ 8","800 ÷ 8 + 136 ÷ 8"],["4 872 − 1 996","4 872 − 2 000 + 4"]]},
      apply_note:"Use place value, distributive thinking, inverse facts and friendly numbers. Use digital tools when data volume or verification justifies them, not to replace reasoning.",
      quick_visual:{type:"cards",items:["mental","written","diagram","calculator","spreadsheet","inverse check"]},
      activities:[
        {title:"Strategy comparison",text:"Solve one calculation in two ways and compare number of steps, error risk and clarity.",visual:{type:"compare",items:["1 999 + 586 by compensation","1 999 + 586 by written algorithm"],note:"same answer, different efficiency"}},
        {title:"Tool decision",text:"Sort tasks by whether mental calculation, written working, a calculator or a spreadsheet is most appropriate.",visual:{type:"table",rows:[["Task","Likely tool"],["49 + 51","mental"],["class survey totals","spreadsheet"],["check 3 276 ÷ 7","calculator after reasoning"]]}},
        {title:"Remainder check",text:"Identify division situations that divide exactly and use multiplication to verify.",visual:{type:"fact-network",centre:"936",facts:["936 ÷ 8 = 117","117 × 8 = 936","800 ÷ 8 = 100","136 ÷ 8 = 17"]}}
      ],
      mistakes:[
        ["One method used for every problem","Analyse the numbers before choosing a strategy."],
        ["Calculator answer accepted without checking","Estimate and interpret the result."],
        ["Partial products omitted","Record every partitioned part before recombining."],
        ["Efficiency confused with speed only","A method should also be reliable and communicable."]
      ],
      quick:["Choose a strategy for 1 999 + 586.","Solve 36 × 24 by partitioning.","Check 936 ÷ 8 with multiplication.","When is a spreadsheet appropriate?","Compare mental and written methods."],
      mastery:["Choose efficient strategies","Use all four operations","Use digital tools appropriately","Check with inverse/estimate","Compare methods"],
      worksheet:[
        {type:"single",question:"Which is an efficient first step for 2 998 + 467?",answers:["3 000 + 467 − 2","2 998 + 2 + 467 + 2","ignore the 998","multiply the numbers"]},
        {type:"fill-blank",question:"Complete the partitioned multiplication.",template:"36 × 24 = 36 × 20 + 36 × {{blank}}"},
        {type:"single",question:"Which tool is most appropriate for quickly totalling hundreds of survey entries after the calculation method is understood?",answers:["spreadsheet","guessing","a ruler","a clock"]},
        {type:"text",question:"Solve 4 872 − 1 996 using compensation and explain each adjustment."},
        {type:"match",question:"Match the task to a sensible strategy or tool.",matchLeft:["49 + 51","36 × 24","large class data totals"],matchRight:["spreadsheet","partition multiplication","mental make-100"]},
        {type:"fill-blank",question:"Complete the inverse check.",template:"936 ÷ 8 = 117, so 117 × {{blank}} = 936."},
        {type:"text",question:"Solve 2 304 ÷ 6 using place-value partitioning. Show that every partial quotient is accounted for."},
        {type:"text",question:"A student uses a calculator for 49 + 51 and says it is always the most efficient tool. Evaluate the claim."},
        {type:"text",question:"Solve 3 996 + 2 487 using two strategies. Evaluate efficiency, clarity and likelihood of error for each.",enrichment:true},
        {type:"text",question:"Design a decision guide that helps a Year 4 student choose among mental, written, diagrammatic and digital methods for a calculation.",enrichment:true}
      ]
    }
  }, ["AC9M4N04","AC9M4N05","AC9M4N06"]);
})();
