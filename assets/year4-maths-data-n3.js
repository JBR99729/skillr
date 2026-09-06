(() => {
  "use strict";
  if (!window.SkillrYear4MathsRegister) throw new Error("Year 4 Maths base data is not loaded.");
  window.SkillrYear4MathsRegister({
    AC9M4N07: {
      slug:"ac9m4n07-choose-and-use-estimation-and-rounding-to-check-and-explain",
      title:"Estimation, Rounding and Reasonableness",
      subtitle:"Select a useful level of accuracy and check calculations and financial transactions",
      desc:"choose and use estimation and rounding to check and explain the reasonableness of calculations including the results of financial transactions",
      routine:"Identify purpose → Choose rounding level → Estimate → Calculate → Compare → Explain reasonableness",
      learn:"A useful estimate is close enough for the purpose and simple enough to calculate mentally. Rounding to tens, hundreds or thousands should be chosen deliberately rather than automatically.",
      model_title:"Choose different estimates for the same calculation",
      model_visual:{type:"rounding",start:3400,end:3500,marks:[[3426,"3 426"],[3400,"3 400"],[3430,"3 430"],[3500,"3 500"]],answer:"3 426 rounds to 3 430 (nearest 10) or 3 400 (nearest 100)"},
      model_note:"The best rounding level depends on the question. A quick reasonableness check may need only hundreds; a shopping budget may need closer dollar estimates.",
      apply_title:"Estimate a financial total and change",
      apply_visual:{type:"money-model",items:[["book",18.95,1],["game",31.40,1],["pen",4.80,2]],operation:"$19 + $31 + $10 ≈ $60",total:"Exact total $59.95; $60 budget is just enough"},
      apply_note:"Estimate before calculating, then compare the exact amount. In money contexts, consider whether rounding up gives a safer budget.",
      quick_visual:{type:"strategy",items:[["nearest 10","487 ≈ 490"],["nearest 100","1 462 ≈ 1 500"],["front-end estimate","$28.70 + $43.20 ≈ $70"]]},
      activities:[
        {title:"Rounding purpose sort",text:"Choose whether nearest 10, 100 or 1 000 is suitable for different checks and explain the choice.",visual:{type:"cards",items:["weekly attendance","stadium crowd","grocery budget","distance travelled"]}},
        {title:"Estimate then calculate",text:"Estimate 2 684 + 1 937, calculate exactly and state whether the exact answer is reasonable.",visual:{type:"flow",items:["2 700 + 1 900","≈ 4 600","exact 4 621","reasonable"]}},
        {title:"Safe shopping estimate",text:"Round prices strategically so a budget estimate does not underestimate the required money.",visual:{type:"money-model",items:[["item A",12.60,1],["item B",7.75,2]],operation:"$13 + 2 × $8",total:"about $29"}}
      ],
      mistakes:[
        ["Always round to the same place","Choose precision based on purpose."],
        ["Estimate accepted as exact","Use approximately and distinguish estimate from exact result."],
        ["Financial estimate rounds down unsafely","Rounding up may be more useful when checking whether money is sufficient."],
        ["Reasonable means identical","An exact answer should be close to, not equal to, the estimate."]
      ],
      quick:["Round 3 426 to nearest 10 and 100.","Estimate 2 684 + 1 937.","Is 6 912 reasonable for 3 480 + 3 398?","Estimate a $59.95 purchase.","Explain when rounding up is useful."],
      mastery:["Round to suitable place","Choose estimation strategy","Check calculations","Estimate money safely","Explain reasonableness"],
      worksheet:[
        {type:"single",question:"What is 3 426 rounded to the nearest hundred?",answers:["3 400","3 430","3 500","3 000"]},
        {type:"fill-blank",question:"Complete the estimate.",template:"2 684 + 1 937 ≈ 2 700 + 1 900 = {{blank}}"},
        {type:"single",question:"Which estimate is safest for checking whether $60 is enough for an exact total near $59.95?",answers:["about $60, then calculate exactly","about $50 and stop","exactly $100","ignore the total"]},
        {type:"text",question:"Choose and justify a rounding level for estimating 18 742 + 9 386."},
        {type:"match",question:"Match each value to its nearest hundred.",matchLeft:["1 462","3 951","8 049"],matchRight:["8 000","1 500","4 000"]},
        {type:"fill-blank",question:"Complete the reasonableness check.",template:"3 480 + 3 398 is about 3 500 + 3 400 = {{blank}}, so 6 878 is reasonable."},
        {type:"text",question:"Estimate and calculate the total of $18.95, $31.40 and two items costing $4.80 each. Compare the results."},
        {type:"text",question:"A student rounds every price down to the nearest dollar when deciding whether a budget is enough. Explain the risk."},
        {type:"text",question:"Create one calculation where rounding to the nearest thousand is useful and another where it is too imprecise. Explain both choices.",enrichment:true},
        {type:"text",question:"Design a financial reasonableness problem with a budget, several prices, an estimate and an exact calculation. Include a decision about whether the purchase can proceed.",enrichment:true}
      ]
    },
    AC9M4N08: {
      slug:"ac9m4n08-mathematical-modelling-to-solve-practical-problems-involving",
      title:"Mathematical Modelling in Multi-step Problems",
      subtitle:"Formulate, solve, interpret and communicate additive, multiplicative and financial situations",
      desc:"use mathematical modelling to solve practical problems involving additive and multiplicative situations including financial contexts; formulate the problems using number sentences and choose efficient calculation strategies, using digital tools where appropriate; interpret and communicate solutions in terms of the situation",
      routine:"Understand context → Define quantities → Represent → Formulate operations → Solve → Validate → Communicate",
      learn:"A mathematical model simplifies a real situation while preserving the relationships needed to answer the question. Strong solutions explain assumptions, operations, units and the meaning of the result.",
      model_title:"Model a fundraising order with cost and revenue",
      model_visual:{type:"money-model",items:[["ticket",12,48],["hall hire",180,1],["materials",95,1]],operation:"Revenue 48 × $12 = $576; costs $180 + $95 = $275",total:"surplus $301"},
      model_note:"The model separates revenue and costs, then subtracts to answer the practical question. Every number is connected to a context and unit.",
      apply_title:"Compare two possible plans",
      apply_visual:{type:"table",rows:[["Plan","Capacity","Cost","Cost per student"],["A","40","$320","$8"],["B","60","$420","$7"],["Need","52 students","","choose B"]]},
      apply_note:"A lower total cost is not always the best model if it fails the constraints. Interpret solutions against capacity, budget and other conditions.",
      quick_visual:{type:"flow",items:["context","diagram/table","number sentence","calculation","validation","context answer"]},
      activities:[
        {title:"Constraint detective",text:"Identify the quantities, question and constraints in a class excursion problem before calculating.",visual:{type:"cards",items:["52 students","bus capacity","ticket cost","maximum budget","adult places"]}},
        {title:"Model comparison",text:"Represent the same situation with a bar model, table and number sentence, then compare what each makes clear.",visual:{type:"strategy",items:[["bar model","part–whole relationship"],["table","multiple options"],["number sentence","calculation structure"]]}},
        {title:"Digital verification",text:"Use a spreadsheet to compare several price/quantity options after deriving the formula manually.",visual:{type:"table",rows:[["quantity","unit price","total"],["10","$7.50","$75"],["20","$7.10","$142"],["30","$6.80","$204"]]}}
      ],
      mistakes:[
        ["All numbers used automatically","Include only quantities relevant to the question and model."],
        ["Constraint ignored","A mathematically cheaper option may not meet capacity, time or safety needs."],
        ["Answer lacks units or context","State what the result means in the situation."],
        ["Digital output replaces formulation","Set up the mathematical relationship before using the tool."]
      ],
      quick:["Model revenue from 48 tickets at $12.","Identify a constraint in a transport problem.","When is a table better than one number sentence?","Check a model using estimation.","Write a context conclusion."],
      mastery:["Identify quantities/constraints","Choose representations","Formulate multi-step operations","Use digital tools purposefully","Validate and communicate"],
      worksheet:[
        {type:"single",question:"A fundraiser sells 48 tickets at $12 each. What is the revenue?",answers:["$576","$60","$480","$36"]},
        {type:"fill-blank",question:"Complete the surplus model.",template:"Revenue $576 − costs ($180 + $95) = ${{blank}}"},
        {type:"single",question:"A bus holds 40 people but 52 students need transport. Why is the cheaper 40-seat option unsuitable?",answers:["It does not meet the capacity constraint","It uses addition","Its price is a whole number","It has too many seats"]},
        {type:"text",question:"Model and solve: 7 teams need 9 bibs each. Bibs are sold in packs of 10. How many packs are needed? Explain the interpretation."},
        {type:"match",question:"Match each representation to its strength.",matchLeft:["bar model","comparison table","spreadsheet"],matchRight:["testing many options efficiently","showing part–whole structure","comparing constraints and alternatives"]},
        {type:"fill-blank",question:"Complete the capacity calculation.",template:"52 students need buses holding 20 each, so at least {{blank}} buses are required."},
        {type:"text",question:"A school can buy 25 books at $8 each or 30 books at $7.20 each. Compare total cost and cost per book, then recommend an option for a need of 28 books."},
        {type:"text",question:"A student calculates 7 × 9 = 63 bibs and says 6 packs of 10 are enough. Explain the modelling error."},
        {type:"text",question:"Create a multi-step financial model involving income, two costs and a minimum target. Solve it, state assumptions and test whether the target is met.",enrichment:true},
        {type:"text",question:"Develop two competing models for a class event, each with different constraints. Use a table or spreadsheet structure to justify a final recommendation.",enrichment:true}
      ]
    },
    AC9M4N09: {
      slug:"ac9m4n09-follow-and-create-algorithms-involving-a-sequence-of-steps-and",
      title:"Algorithms that Generate Number Sets",
      subtitle:"Use ordered steps and decisions involving addition or multiplication to investigate patterns",
      desc:"follow and create algorithms involving a sequence of steps and decisions that use addition or multiplication to generate sets of numbers; identify and describe any emerging patterns",
      routine:"Define input → Follow ordered steps → Apply decision → Record output set → Identify pattern → Test generalisation",
      learn:"An algorithm is a precise sequence of instructions. Repeating addition or multiplication rules can generate number sets, while decisions route inputs through different steps and produce patterns worth explaining.",
      model_title:"Generate a set with a decision rule",
      model_visual:{type:"algorithm",steps:["Start with 1 to 10","Is the input even?","Yes: ×3","No: +5","Record output","Compare sets"]},
      model_note:"For inputs 1–10, the odd path gives 6, 8, 10, 12, 14 and the even path gives 6, 12, 18, 24, 30. The overlap and spacing are part of the pattern analysis.",
      apply_title:"Use an input–output table to test a rule",
      apply_visual:{type:"table",rows:[["Input","Rule ×4 + 2","Output"],["1","4 + 2","6"],["2","8 + 2","10"],["3","12 + 2","14"],["4","16 + 2","18"]]},
      apply_note:"Several inputs reveal that outputs increase by 4. Explain both the recursive pattern and the direct rule.",
      quick_visual:{type:"cards",items:["ordered steps","decision","loop","input","output","pattern","debug"]},
      activities:[
        {title:"Flowchart walk",text:"Follow an even/odd algorithm physically using number cards, then compare outputs.",visual:{type:"algorithm",steps:["input","even?","×4","odd?","+3","output"]}},
        {title:"Rule machine",text:"Generate an output set for ×5 − 2 and describe first differences.",visual:{type:"table",rows:[["in","out"],["1","3"],["2","8"],["3","13"],["4","18"]]}},
        {title:"Debug and improve",text:"Find ambiguous wording, wrong order or a missing branch in a peer algorithm and rewrite it precisely.",visual:{type:"compare",items:["add 3 then double","double then add 3","if odd? no instruction"],note:"precision changes output"}}
      ],
      mistakes:[
        ["Steps reordered","Algorithms depend on exact sequence."],
        ["Decision has no complete branches","Every possible outcome needs a defined next step."],
        ["Pattern stated from too few outputs","Test enough inputs to support the description."],
        ["Recursive and direct rules confused","One describes how outputs change; the other links input directly to output."]
      ],
      quick:["Apply ×4 + 2 to input 7.","Why must both decision branches be defined?","Describe outputs 6, 10, 14, 18.","Compare add-3-then-double with double-then-add-3.","Create a rule generating multiples of 6."],
      mastery:["Follow algorithms","Use decisions","Generate number sets","Describe recursive/direct patterns","Debug and create rules"],
      worksheet:[
        {type:"single",question:"For the rule ×4 + 2, what is the output for input 5?",answers:["22","28","12","7"]},
        {type:"fill-blank",question:"Complete the output sequence for ×5 − 2.",template:"3, 8, 13, {{blank}}, 23"},
        {type:"single",question:"Why must an algorithm define both yes and no branches?",answers:["So every possible decision result has a next step","To make the page longer","Because every output is even","So steps can be changed randomly"]},
        {type:"text",question:"Follow this algorithm for inputs 1–6: if even, multiply by 3; if odd, add 5. Record and compare the outputs."},
        {type:"match",question:"Match each input to its output for the rule ×3 + 4.",matchLeft:["2","5","8"],matchRight:["28","10","19"]},
        {type:"fill-blank",question:"Complete the first-difference pattern.",template:"Outputs 6, 10, 14, 18 increase by {{blank}} each time."},
        {type:"text",question:"Explain how changing the order in add 3 then double versus double then add 3 affects input 6."},
        {type:"text",question:"An algorithm says 'if the number is odd, add 2' but gives no instruction for even inputs. Explain and repair the flaw."},
        {type:"text",question:"Create an algorithm with a decision that generates two overlapping number sets. Record outputs for inputs 1–12 and explain the overlap.",enrichment:true},
        {type:"text",question:"Design two different algorithms that produce the same first four outputs but diverge later. Explain why limited testing could miss the difference.",enrichment:true}
      ]
    }
  }, ["AC9M4N07","AC9M4N08","AC9M4N09"]);
})();
