(() => {
  "use strict";
  if (!window.SkillrYear4MathsRegister) throw new Error("Year 4 Maths base data is not loaded.");
  window.SkillrYear4MathsRegister({
    AC9M4A01: {
      slug:"ac9m4a01-find-unknown-values-in-numerical-equations-involving-addition",
      title:"Unknown Values in Addition and Subtraction Equations",
      subtitle:"Use equivalence, inverse operations and number properties to solve and justify",
      desc:"find unknown values in numerical equations involving addition and subtraction, using the properties of numbers and operations",
      routine:"Read both sides → Identify unknown role → Preserve equality → Use inverse/property → Substitute and check",
      learn:"An equation states that two expressions have the same value. Solving means finding a value that preserves equality, not moving symbols by a memorised trick.",
      model_title:"Solve 348 + □ = 725 using a part–whole relationship",
      model_visual:{type:"balance",left:"348 + □",right:"725",note:"□ = 725 − 348 = 377"},
      model_note:"The unknown is a missing addend. Subtraction finds the missing part, and substitution confirms 348 + 377 = 725.",
      apply_title:"Use commutative and associative properties",
      apply_visual:{type:"table",rows:[["Equation","Property/strategy","Unknown"],["□ + 46 = 100","complement","54"],["38 + □ + 62 = 145","38 + 62 = 100","45"],["900 − □ = 347","missing subtrahend","553"]]},
      apply_note:"Rearrange addition when it creates friendly combinations, but do not reverse subtraction without preserving meaning.",
      quick_visual:{type:"cards",items:["missing addend","missing minuend","missing subtrahend","equivalent expressions","substitution check"]},
      activities:[
        {title:"Equation balance",text:"Use balance diagrams or counters to model unknowns on either side of an equation.",visual:{type:"balance",left:"125 + □",right:"80 + 90",note:"both sides must remain equal"}},
        {title:"Friendly grouping",text:"Reorder and group addition terms to solve unknowns efficiently.",visual:{type:"flow",items:["27 + □ + 73 = 160","27 + 73 = 100","100 + □ = 160","□ = 60"]}},
        {title:"Error analysis",text:"Test proposed unknowns by substitution and explain why one value fails.",visual:{type:"table",rows:[["Proposed x","48 + x = 120?"],["72","yes"],["82","130, no"]]}}
      ],
      mistakes:[
        ["Equals sign means 'answer comes next'","It means both sides have equal value."],
        ["Same operation used regardless of unknown role","Identify whether the missing value is an addend, minuend or subtrahend."],
        ["Subtraction treated as commutative","900 − 553 is not the same as 553 − 900."],
        ["No substitution check","Replace the box with the solution and evaluate both sides."]
      ],
      quick:["Solve 348 + □ = 725.","Solve □ − 286 = 439.","Solve 900 − □ = 347.","Use grouping in 38 + □ + 62 = 145.","Explain the equals sign."],
      mastery:["Interpret equality","Identify unknown role","Use inverse operations","Use number properties","Substitute and verify"],
      worksheet:[
        {type:"single",question:"What is the unknown in 348 + □ = 725?",answers:["377","1 073","477","287"]},
        {type:"fill-blank",question:"Complete the equation.",template:"{{blank}} − 286 = 439"},
        {type:"single",question:"What is the unknown in 900 − □ = 347?",answers:["553","1 247","647","457"]},
        {type:"text",question:"Solve 38 + □ + 62 = 145 by using a useful grouping. Explain the property used."},
        {type:"match",question:"Match each equation to its unknown.",matchLeft:["□ + 46 = 100","125 + □ = 170","700 − □ = 258"],matchRight:["45","442","54"]},
        {type:"fill-blank",question:"Complete the substitution check.",template:"348 + 377 = {{blank}}, so 377 satisfies the equation."},
        {type:"text",question:"Solve 1 205 = □ + 468. Show an inverse operation and a check."},
        {type:"text",question:"A student solves 900 − □ = 347 by calculating 347 − 900. Explain why this reverses the relationship."},
        {type:"text",question:"Create three equations with the same unknown value of 275: one missing addend, one missing minuend and one missing subtrahend. Verify each.",enrichment:true},
        {type:"text",question:"Solve □ + 286 = 145 + 398 without first calculating both sides in the standard order. Use properties to make the work efficient and justify every rearrangement.",enrichment:true}
      ]
    },
    AC9M4A02: {
      slug:"ac9m4a02-recall-and-demonstrate-proficiency-with-multiplication-facts-up",
      title:"Multiplication Facts to 10 × 10 and Derived Strategies",
      subtitle:"Recall, connect and extend multiplication and division facts to larger computations",
      desc:"recall and demonstrate proficiency with multiplication facts up to 10 x 10 and related division facts; extend and apply facts to develop efficient mental strategies for computation with larger numbers without a calculator",
      routine:"Recall core fact → Connect inverse → Use commutative/distributive relationship → Scale place value → Check",
      learn:"Fluent facts to 10 × 10 provide a network for division and larger mental calculations. Derived strategies use known facts, doubling, halving, place value and the distributive property.",
      model_title:"Build a fact network around 7 × 8 = 56",
      model_visual:{type:"fact-network",centre:"7 × 8 = 56",facts:["8 × 7 = 56","56 ÷ 7 = 8","56 ÷ 8 = 7","14 × 8 = 112","7 × 16 = 112","70 × 8 = 560"]},
      model_note:"One known fact supports commuted facts, inverse division facts, doubled facts and place-value extensions.",
      apply_title:"Derive larger products mentally",
      apply_visual:{type:"strategy",items:[["16 × 7","10 × 7 + 6 × 7 = 112"],["25 × 8","100 × 2 = 200, or 20×8 + 5×8"],["48 ÷ 6","use 6 × 8 = 48"],["9 × 34","10 × 34 − 34 = 306"]]},
      apply_note:"Choose a relationship that reduces the unknown calculation to facts already known. State the connection rather than presenting only the answer.",
      quick_visual:{type:"cards",items:["commutative","inverse","double/halve","distributive","×10 place value","near fact"]},
      activities:[
        {title:"Fact-family web",text:"Choose one product and create all related multiplication, division and scaled facts.",visual:{type:"fact-network",centre:"6 × 9 = 54",facts:["9 × 6","54 ÷ 6","54 ÷ 9","12 × 9","60 × 9"]}},
        {title:"Derived-fact challenge",text:"Solve two-digit products using near facts or partitioning, then name the base fact used.",visual:{type:"strategy",items:[["19 × 6","20 × 6 − 6"],["32 × 4","30 × 4 + 2 × 4"],["15 × 8","10 × 8 + 5 × 8"]]}},
        {title:"Mental division",text:"Use multiplication facts and place-value partitioning to solve exact division.",visual:{type:"flow",items:["168 ÷ 7","140 ÷ 7 + 28 ÷ 7","20 + 4","24"]}}
      ],
      mistakes:[
        ["Recall without relationships","Use facts as connected families, not isolated answers."],
        ["Partitioning factor not recombined","Add every partial product or quotient."],
        ["Division interpreted backwards","Identify the whole and known factor before selecting the inverse fact."],
        ["Near fact adjustment lost","Subtract or add the exact adjustment after using a friendly fact."]
      ],
      quick:["State facts related to 7 × 8 = 56.","Use 10 × 34 to solve 9 × 34.","Solve 168 ÷ 7 mentally.","Derive 16 × 7.","Explain why doubling one factor doubles the product."],
      mastery:["Recall facts to 10 × 10","Use related division","Use derived facts","Scale with place value","Explain mental strategies"],
      worksheet:[
        {type:"single",question:"Which division fact is related to 7 × 8 = 56?",answers:["56 ÷ 7 = 8","56 ÷ 6 = 8","7 ÷ 56 = 8","56 + 7 = 8"]},
        {type:"fill-blank",question:"Complete the derived fact.",template:"9 × 34 = 10 × 34 − {{blank}}"},
        {type:"single",question:"What is 168 ÷ 7?",answers:["24","21","28","14"]},
        {type:"text",question:"Solve 16 × 7 using the distributive property and identify the facts used."},
        {type:"match",question:"Match each calculation to a helpful derived strategy.",matchLeft:["19 × 6","25 × 8","48 ÷ 6"],matchRight:["use 6 × 8","20 × 6 − 6","100 × 2"]},
        {type:"fill-blank",question:"Complete the fact network.",template:"7 × 8 = 56, so 14 × 8 = {{blank}}."},
        {type:"text",question:"Solve 324 ÷ 9 mentally using place-value partitioning and known facts."},
        {type:"text",question:"A student solves 9 × 34 as 10 × 34 but forgets to subtract 34. Explain the adjustment."},
        {type:"text",question:"Find three efficient derived-fact strategies for 18 × 25. Compare which relies most strongly on known facts and place value.",enrichment:true},
        {type:"text",question:"Create a connected fact network beginning with 8 × 9 = 72 and extending to at least eight multiplication or division facts with larger numbers.",enrichment:true}
      ]
    }
  }, ["AC9M4A01","AC9M4A02"]);
})();
