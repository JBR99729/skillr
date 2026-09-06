(() => {
  "use strict";
  if (!window.SkillrYear5Register) throw new Error("Year 5 curriculum base is not loaded.");
  const mk=(s)=>({...s,activities:s.activities||[
    {title:"Build and annotate the model",text:`Represent ${s.title.toLowerCase()} and label the quantities, operations and constraints.`,visual:s.modelVisual},
    {title:"Compare efficient strategies",text:"Solve the application in two ways and compare efficiency, clarity and likelihood of error.",visual:s.applyVisual},
    {title:"Transfer and verify",text:"Create or solve an unfamiliar context, interpret the answer and verify it independently.",visual:{type:"cards",data:(s.quick||[]).slice(0,4)}}
  ],mastery:s.mastery||["Represent the problem","Choose an efficient strategy","Calculate accurately","Interpret the context","Estimate or use an inverse to verify"]});

  const S={
    AC9M5N06:mk({
      slug:"ac9m5n06-solve-problems-involving-multiplication-of-larger-numbers-by",
      title:"Multiplying Larger Numbers",
      subtitle:"Use place value, distributive strategies and digital tools appropriately",
      desc:"solve problems involving multiplication of larger numbers by one- or two-digit numbers, choosing efficient calculation strategies and using digital tools where appropriate; check the reasonableness of answers",
      learn:"Students multiply larger numbers by one- or two-digit factors using partitioning, area models, written algorithms and compensation, selecting a method that fits the numbers and checking with estimation.",
      core:"Multiplication of larger numbers can be decomposed into place-value partial products and recombined without changing the product.",
      modelTitle:"Use an area model for 326 × 24",
      modelVisual:{type:"table",data:[["","300","20","6"],["×20","6 000","400","120"],["×4","1 200","80","24"],["total","7 200","480","144"],["product","","","7 824"]]},
      modelNote:"Partition 326 and 24, find every partial product, then combine. The model shows why the written algorithm works rather than treating it as a digit rule.",
      applyTitle:"Choose between partitioning, compensation and a written algorithm",
      applyVisual:{type:"compare",data:[["998 × 37","1 000 × 37 − 2 × 37"],["326 × 24","area model or written partial products"],["48 × 25","halve 48 and double 25: 24 × 50"],["digital tool","verify or handle many repeated cases after setup"]]},
      applyNote:"Estimate first: 326 × 24 is about 300 × 25 = 7 500, so 7 824 is reasonable. A digital answer still requires a correct mathematical setup.",
      terms:[["partial product","product of partitioned parts"],["distributive property","multiplying across a sum of parts"],["reasonableness","whether an answer fits an estimate and context"]],
      mistakes:[["A partial product is omitted","Record every place-value combination."],["Place values are misaligned","Track the value of tens and hundreds, not only digits."],["Calculator replaces reasoning","Formulate and estimate before using a tool."],["Estimate is treated as exact","Use it to check scale, not replace the product."]],
      quick:["Estimate 326 × 24.","Find all partial products.","Use compensation for 998 × 37.","Solve 48 × 25 mentally.","Check a digital result."],
      questions:{
        choice1:["What is 326 × 24?",["7 824","7 344","7 624","78 240"]],
        fill1:["Complete the partial product.","326 × 20 = {{blank}}"],
        choice2:["Which is an efficient strategy for 998 × 37?",["1 000 × 37 − 2 × 37","998 + 37","1 000 × 37 + 2 × 37","ignore the 8"]],
        explain:"Use an area model or written partial products to solve 427 × 36. Label each place-value contribution.",
        fill2:["Complete the estimate.","326 × 24 is approximately 300 × 25 = {{blank}}."],
        apply:"A school orders 38 boxes with 126 books in each. Find the total, choose an efficient strategy and explain a reasonableness check.",
        enrichment1:"Solve 1 998 × 48 using two strategies and compare efficiency, transparency and error risk.",
        enrichment2:"Create a multiplication problem where an incorrect answer has the correct final digits but an unreasonable magnitude. Explain how estimation detects it."
      }
    }),
    AC9M5N07:mk({
      slug:"ac9m5n07-solve-problems-involving-division-choosing-efficient-strategies",
      title:"Division and Interpreting Remainders",
      subtitle:"Choose efficient strategies and express remainders to suit the context",
      desc:"solve problems involving division, choosing efficient strategies and using digital tools where appropriate; interpret any remainder according to the context and express results as a whole number, decimal or fraction",
      learn:"Students use place-value partitioning, fact relationships and written division, then decide whether a remainder means extra groups, leftovers, a fraction, a decimal or a rounded whole number.",
      core:"A division quotient and remainder must be interpreted according to what is being shared, grouped or measured.",
      modelTitle:"Divide 1 258 by 24 and interpret the remainder",
      modelVisual:{type:"table",data:[["step","calculation"],["estimate","1 200 ÷ 24 ≈ 50"],["52 groups","24 × 52 = 1 248"],["remainder","1 258 − 1 248 = 10"],["result","52 remainder 10 = 52 10/24"]]},
      modelNote:"The arithmetic result is 52 remainder 10, but the context determines whether to write 52 5/12, 52.416…, 52 full groups with 10 left, or 53 containers needed.",
      applyTitle:"Match remainder interpretations to contexts",
      applyVisual:{type:"table",data:[["Context","Interpretation"],["people in buses","round up to enough buses"],["complete teams","whole teams + people left"],["length shared equally","fraction or decimal length"],["items per person","whole share + leftovers"],["money divided","decimal to suitable cents"]]},
      applyNote:"Do not apply one remainder rule automatically. State the unit and practical meaning before choosing the form.",
      terms:[["quotient","result of division"],["remainder","amount left after forming complete equal groups"],["interpretation","meaning assigned to the numerical result in context"]],
      mistakes:[["Remainder discarded automatically","It may change the practical decision."],["Always round up","Some contexts need leftovers, fractions or decimals instead."],["Division estimate omitted","Estimate helps select quotient size and detect errors."],["Remainder larger than divisor","A valid remainder is smaller than the divisor."]],
      quick:["Estimate 1 258 ÷ 24.","Interpret 52 r10 as a fraction.","Decide buses needed for 125 people in 24-seat buses.","Check with multiplication.","Explain when a decimal is suitable."],
      questions:{
        choice1:["What is 1 258 ÷ 24 as a quotient and remainder?",["52 remainder 10","51 remainder 34","53 remainder 2","52 remainder 24"]],
        fill1:["Complete the inverse check.","24 × 52 + {{blank}} = 1 258"],
        choice2:["125 people travel in 24-seat buses. How many buses are required?",["6","5","5 remainder 5 buses","5.2 buses"]],
        explain:"Divide 947 by 18 and give two different valid interpretations of the remainder for two different contexts.",
        fill2:["Complete the fractional remainder.","52 remainder 10 = 52 {{blank}}/24"],
        apply:"A 17.5 m ribbon is shared equally among 8 groups. Express the result as a decimal length and explain why rounding to a whole group is unsuitable.",
        enrichment1:"Create four contexts for the same division calculation where the remainder is discarded, rounded up, written as a fraction and written as a decimal.",
        enrichment2:"Compare place-value partitioning and a written algorithm for 4 738 ÷ 36. Include estimate, quotient, remainder and inverse check."
      }
    }),
    AC9M5N08:mk({
      slug:"ac9m5n08-check-and-explain-the-reasonableness-of-solutions-to-problems",
      title:"Estimation and Reasonableness in Context",
      subtitle:"Select useful estimation strategies for calculations and financial decisions",
      desc:"check and explain the reasonableness of solutions to problems including financial contexts using estimation strategies appropriate to the context",
      learn:"Students choose rounding, front-end estimation, compatible numbers or upper/lower bounds according to the decision being made, then compare estimates with exact solutions and explain any difference.",
      core:"The best estimate depends on purpose: a quick magnitude check, a safe budget and a close approximation may require different choices.",
      modelTitle:"Estimate a shopping total before exact calculation",
      modelVisual:{type:"table",data:[["Item","Price","Safe estimate"],["book","$18.95","$19"],["game","$31.40","$32"],["2 pens","2 × $4.80","$10"],["estimated total","","about $61"],["exact total","","$59.95"]]},
      modelNote:"Rounding upward gives a safe sufficiency estimate. For checking an exact total, nearest-dollar rounding may be closer but could underestimate the cash needed.",
      applyTitle:"Choose an estimation method for the decision",
      applyVisual:{type:"compare",data:[["magnitude check","round large numbers to one significant place"],["financial budget","round costs up or use upper bounds"],["close approximation","round to nearby compatible values"],["division check","use nearby divisible numbers"]]},
      applyNote:"Explain the strategy, precision and whether the estimate is expected to be high, low or balanced. Reasonable does not mean identical.",
      terms:[["compatible numbers","nearby numbers that calculate easily together"],["upper estimate","estimate likely at or above the exact amount"],["precision","level of detail retained in an estimate"]],
      mistakes:[["Same rounding method used everywhere","Match estimation to purpose."],["Financial estimate rounds down unsafely","A sufficiency check may need an upper estimate."],["Exact answer accepted without comparison","Check scale and context."],["Estimate reported without approximation language","Use about, approximately or a range."]],
      quick:["Estimate a $59.95 total safely.","Choose compatible numbers for 1 258 ÷ 24.","Check 327 × 48.","Explain upper versus balanced estimate.","State suitable precision."],
      questions:{
        choice1:["Which estimate is safest for checking whether $60 is enough for $18.95 + $31.40 + $9.60?",["Round up to about $61, then calculate exactly","Round everything down to $50","Assume exactly $60","Ignore cents and the second item"]],
        fill1:["Complete the magnitude estimate.","327 × 48 ≈ 300 × 50 = {{blank}}"],
        choice2:["Which numbers are compatible for estimating 1 258 ÷ 24?",["1 200 ÷ 24","1 000 ÷ 23","1 258 ÷ 25 without explanation","12 ÷ 24"]],
        explain:"Choose and justify two estimation methods for 6 782 + 3 949, one quick and one closer.",
        fill2:["Complete the language.","An estimate should state its method and level of {{blank}}."],
        apply:"Estimate and then calculate a weekly budget with five expenses. Explain whether the estimate was high, low or balanced and why.",
        enrichment1:"Create a financial scenario where a low estimate produces a wrong decision even though it is numerically close. Explain a safer method.",
        enrichment2:"Develop an estimation decision tree for addition, multiplication, division and money. Test it on four examples and revise weak branches."
      }
    }),
    AC9M5N09:mk({
      slug:"ac9m5n09-mathematical-modelling-to-solve-practical-problems-involving",
      title:"Mathematical Modelling in Multi-step Situations",
      subtitle:"Formulate, calculate, validate and communicate practical and financial solutions",
      desc:"use mathematical modelling to solve practical problems involving additive and multiplicative situations including financial contexts; formulate the problems, choosing operations and efficient calculation strategies, using digital tools where appropriate; interpret and communicate solutions in terms of the situation",
      learn:"Students identify quantities and constraints, choose diagrams, tables or equations, solve multi-step models, test assumptions and communicate recommendations that make sense in the original situation.",
      core:"A mathematical model preserves the relationships and constraints needed for a decision while simplifying irrelevant detail.",
      modelTitle:"Compare excursion transport options",
      modelVisual:{type:"table",data:[["Option","Capacity","Fixed cost","Per person","For 73 people"],["A","40","$120","$8","2 buses: $824"],["B","25","$70","$9","3 buses: $867"],["constraint","73 people + 5 adults","","","recalculate capacity"]]},
      modelNote:"The model must include all travellers, capacity and cost rules. An option that appears cheaper may fail a constraint or require additional units.",
      applyTitle:"Use a modelling cycle",
      applyVisual:{type:"flow",data:["understand situation","define quantities/constraints","represent","formulate operations","solve","validate","interpret/recommend"]},
      applyNote:"Digital tools help compare many scenarios after the formula is understood. State assumptions and test whether reasonable changes affect the recommendation.",
      terms:[["constraint","condition a valid solution must satisfy"],["assumption","stated simplification accepted for the model"],["validation","checking calculations, constraints and whether the model answers the question"]],
      mistakes:[["All numbers used automatically","Select only relevant quantities and relationships."],["Constraint checked after recommendation only","Build constraints into the model."],["Tool output accepted without formula check","Explain cells, operations or equations."],["Final number lacks interpretation","State what should be done and why."]],
      quick:["Identify a constraint.","Choose a representation.","Write a multi-step equation.","Validate a recommendation.","State one assumption."],
      questions:{
        choice1:["What is the first modelling priority?",["Identify the question, quantities and constraints","Add every number","Open a calculator immediately","Choose the cheapest-looking option"]],
        fill1:["Complete the modelling cycle.","formulate → solve → {{blank}} → interpret"],
        choice2:["Why might a cheaper transport option be invalid?",["It may not meet the capacity constraint","It uses whole numbers","It has a table","It can be estimated"]],
        explain:"Create a model for 78 students and 6 adults travelling in 32-seat buses. Include number of buses, cost assumptions and an interpretation.",
        fill2:["Complete the spreadsheet principle.","Explain the mathematical formula before trusting the digital {{blank}}."],
        apply:"Compare two phone or event plans with fixed and per-use costs. State assumptions, calculate several cases and recommend by context.",
        enrichment1:"Build a model with at least three competing options and two constraints. Conduct a sensitivity check showing when the recommendation changes.",
        enrichment2:"Critique a flawed financial model that ignores one cost and rounds too early. Rebuild it and explain the effect on the decision."
      }
    }),
    AC9M5N10:mk({
      slug:"ac9m5n10-and-use-algorithms-involving-a-sequence-of-steps-and-decisions",
      title:"Algorithms for Factors, Multiples and Divisibility",
      subtitle:"Create, test and debug step-and-decision processes with digital tools",
      desc:"create and use algorithms involving a sequence of steps and decisions and digital tools to experiment with factors, multiples and divisibility; identify, interpret and describe emerging patterns",
      learn:"Students write precise algorithms that test divisibility or generate number sets, trace inputs through decisions, use digital tools for repeated cases and distinguish observed patterns from proven rules.",
      core:"An algorithm needs ordered steps, complete decision branches and a defined output for every valid input.",
      modelTitle:"Create a factor-testing algorithm",
      modelVisual:{type:"sequence",data:[["Input","natural number n"],["Set divisor","d = 1"],["Decision","Does n ÷ d give a whole number?"],["Record","If yes, record d"],["Repeat","increase d until d × d > n"],["Output","all paired factors"]]},
      modelNote:"Stopping at the square root avoids retesting reversed factor pairs, but every recorded factor below the root must be paired with n ÷ d.",
      applyTitle:"Use digital tools to investigate patterns",
      applyVisual:{type:"table",data:[["Input","divisible by 3?","divisible by 6?","factor count"],["18","yes","yes","6"],["21","yes","no","4"],["24","yes","yes","8"],["30","yes","yes","8"]]},
      applyNote:"A table or program can reveal patterns quickly. Test counterexamples and use number properties before stating a generalisation.",
      terms:[["algorithm","finite ordered instructions for a task"],["decision branch","different next steps determined by a condition"],["debugging","finding and correcting an error or ambiguity"]],
      mistakes:[["One decision branch missing","Define what happens for both yes and no outcomes."],["Loop never stops","Include a clear stopping condition."],["Pattern from small sample claimed as proof","Test more cases and use reasoning."],["Digital result hides procedure","Trace at least one input manually."]],
      quick:["Trace a factor algorithm for 24.","Write a stopping condition.","Debug a missing no branch.","Describe one divisibility pattern.","Test a counterexample."],
      questions:{
        choice1:["What must every decision in an algorithm include?",["A defined next step for each possible outcome","Only a yes branch","A decorative diagram","A guessed result"]],
        fill1:["Complete the factor test.","If n ÷ d is a whole number, then d is a {{blank}} of n."],
        choice2:["Why can factor testing stop after the square root when factor pairs are recorded?",["Remaining factors are paired with earlier factors","All later numbers are prime","Division stops working","The input becomes zero"]],
        explain:"Trace a factor-finding algorithm for 36 and show where each factor pair is recorded.",
        fill2:["Complete the debugging rule.","A repeating process needs a clear {{blank}} condition."],
        apply:"Create an algorithm that classifies numbers from 1 to 100 as divisible by 2, 3, both or neither. Describe the output pattern.",
        enrichment1:"Design and test an efficient algorithm for finding common factors of two numbers. Compare it with listing both complete factor sets.",
        enrichment2:"Use a digital table to investigate a divisibility conjecture, find or search for a counterexample and explain what evidence would constitute a proof."
      }
    })
  };

  window.SkillrYear5Register("maths",S,Object.keys(S));
})();
