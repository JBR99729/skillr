(() => {
  "use strict";
  if (!window.SkillrYear4MathsRegister) throw new Error("Year 4 Maths base data is not loaded.");
  window.SkillrYear4MathsRegister({
    AC9M4N01: {
      slug:"ac9m4n01-and-extend-the-application-of-place-value-to-tenths-and",
      title:"Decimal Place Value: Tenths and Hundredths",
      subtitle:"Name, represent, compare and rename decimals using place value",
      desc:"recognise and extend the application of place value to tenths and hundredths and use the conventions of decimal notation to name and represent decimals",
      routine:"Build the whole → Partition into tenths → Partition into hundredths → Write decimal → Rename → Compare",
      learn:"The decimal point separates whole-number places from fractional places. One tenth is one of 10 equal parts of a whole, one hundredth is one of 100 equal parts, and 10 hundredths equal 1 tenth.",
      model_title:"Represent 3.47 using place value and a hundred grid",
      model_visual:{type:"decimal-place",digits:["","","3","4","7"],labels:["hundreds","tens","ones","tenths","hundredths"],value:"3.47 = 3 ones + 4 tenths + 7 hundredths"},
      model_note:"Read 3.47 as three and forty-seven hundredths, or three ones, four tenths and seven hundredths. The 4 is worth 0.4, not 4.",
      apply_title:"Rename decimals without changing their value",
      apply_visual:{type:"table",rows:[["Representation","Equivalent value"],["0.6","6 tenths"],["0.60","60 hundredths"],["2.35","2 + 3/10 + 5/100"]]},
      apply_note:"A trailing zero to the right of a decimal does not change the value: 0.6 = 0.60. Use place value rather than digit count to compare decimals.",
      quick_visual:{type:"hundred-grid",shaded:47,label:"47/100 = 0.47"},
      activities:[
        {title:"Decimal grid build",text:"Shade 36 hundredths on a 10 × 10 grid, then write it as a fraction, decimal and place-value statement.",visual:{type:"hundred-grid",shaded:36,label:"36/100 = 0.36"}},
        {title:"Place-value rename",text:"Use counters or cards to exchange 10 hundredths for 1 tenth and explain why 0.30 and 0.3 are equal.",visual:{type:"flow",items:["30 hundredths","exchange 10 hundredths × 3","3 tenths","0.30 = 0.3"]}},
        {title:"Decimal comparison",text:"Order 0.8, 0.08, 0.80 and 0.18 by aligning place values and adding placeholder zeros where useful.",visual:{type:"table",rows:[["ones","tenths","hundredths"],["0","8","0"],["0","0","8"],["0","1","8"]]}}
      ],
      mistakes:[
        ["Longer decimal is larger","0.75 is not automatically larger than 0.8; compare tenths first by writing 0.8 as 0.80."],
        ["Decimal point read as punctuation only","The point separates whole-number and fractional place values."],
        ["Tenths and hundredths reversed","Tenths are larger parts than hundredths: 1 tenth = 10 hundredths."],
        ["Trailing zero changes value","0.6 and 0.60 name the same quantity."]
      ],
      quick:["Represent 2.34 in a place-value chart.","Rename 0.7 in hundredths.","Which is greater: 0.56 or 0.6? Explain.","Write 43 hundredths as a decimal.","Explain why 1.20 = 1.2."],
      mastery:["Identify tenths and hundredths","Read and write decimals","Rename tenths as hundredths","Compare decimals","Connect fractions and decimals"],
      worksheet:[
        {type:"single",question:"Which place-value statement represents 3.47?",answers:["3 ones, 4 tenths and 7 hundredths","3 tens, 4 ones and 7 tenths","34 ones and 7 tenths","3 ones and 47 tenths"]},
        {type:"fill-blank",question:"Complete the equivalent representation.",template:"0.6 = {{blank}} tenths = {{blank}} hundredths"},
        {type:"single",question:"Which decimal is greatest?",answers:["0.8","0.75","0.68","0.08"]},
        {type:"text",question:"Represent 2.35 using a place-value chart, expanded notation and a fraction with denominator 100."},
        {type:"match",question:"Match each decimal to an equivalent description.",matchLeft:["0.09","0.9","1.04"],matchRight:["1 one and 4 hundredths","9 tenths","9 hundredths"]},
        {type:"fill-blank",question:"Complete the comparison using >, < or =.",template:"0.70 {{blank}} 0.7"},
        {type:"text",question:"Order 0.56, 0.6, 0.05 and 0.65 from smallest to largest. Explain the first comparison you made."},
        {type:"text",question:"A student says 0.39 is greater than 0.4 because 39 is greater than 4. Correct the reasoning using place value."},
        {type:"text",question:"Create three different decimal representations of the same value using tenths, hundredths, a shaded grid and expanded notation. Prove they are equivalent.",enrichment:true},
        {type:"text",question:"A number has 4 ones and 6 tenths. Renaming one tenth as hundredths gives a different-looking representation. Write both decimals and explain why the value is unchanged.",enrichment:true}
      ]
    },
    AC9M4N02: {
      slug:"ac9m4n02-explain-and-use-the-properties-of-odd-and-even-numbers",
      title:"Properties of Odd and Even Numbers",
      subtitle:"Use pairing, divisibility by 2 and operation patterns to justify parity",
      desc:"explain and use the properties of odd and even numbers",
      routine:"Pair the quantity → Identify parity → Test an operation → Generalise → Justify",
      learn:"An even number can be arranged into pairs with no remainder; an odd number leaves one unpaired. Parity follows predictable patterns under addition, subtraction and multiplication.",
      model_title:"Use pairs to explain odd and even",
      model_visual:{type:"parity",number:9},
      model_note:"Nine is odd because four pairs can be made and one object remains unpaired. A final digit of 0, 2, 4, 6 or 8 identifies an even whole number.",
      apply_title:"Generalise operation patterns",
      apply_visual:{type:"table",rows:[["Operation","Example","Result"],["even + even","8 + 12","even"],["odd + odd","7 + 9","even"],["odd + even","7 + 12","odd"],["even × any whole number","6 × 5","even"],["odd × odd","5 × 7","odd"]]},
      apply_note:"Explain patterns using pairs, not only examples. Two unpaired objects from odd + odd join to form another pair.",
      quick_visual:{type:"cards",items:["E + E = E","O + O = E","E + O = O","E × any = E","O × O = O"]},
      activities:[
        {title:"Pairing proof",text:"Use counters to model 13, 14 and 15, then record the number of pairs and whether one remains.",visual:{type:"parity",number:14}},
        {title:"Operation investigation",text:"Test several odd and even additions, then write a general rule and explain it with pairing.",visual:{type:"strategy",items:[["odd + odd","unpaired + unpaired makes a pair"],["odd + even","one unpaired remains"],["even + even","all pairs remain"]]}},
        {title:"Parity prediction",text:"Predict whether a large calculation is odd or even without finding the exact answer, then verify digitally.",visual:{type:"cards",items:["4 382 + 7 915","326 × 47","9 999 − 624"]}}
      ],
      mistakes:[
        ["Odd means prime","Many odd numbers are composite, such as 9 and 15."],
        ["Every multiplication result is even","Odd × odd is odd."],
        ["A pattern from one example is proof","Test several cases and explain using pairs or factors of 2."],
        ["Subtraction pattern ignored","Parity rules for subtraction match addition when whole-number results are allowed."]
      ],
      quick:["Is 5 706 odd or even? Why?","Predict the parity of odd + odd.","Predict 37 × 25 without calculating.","Explain why even × any whole number is even.","Is 101 − 48 odd or even?"],
      mastery:["Classify odd/even","Use pairing explanations","Apply operation patterns","Predict parity","Justify generalisations"],
      worksheet:[
        {type:"single",question:"Which number is even?",answers:["7 458","7 455","7 451","7 459"]},
        {type:"fill-blank",question:"Complete the parity rule.",template:"odd + odd = {{blank}}"},
        {type:"single",question:"Without calculating exactly, what is the parity of 37 × 25?",answers:["odd","even","cannot be known","both odd and even"]},
        {type:"text",question:"Use a pairing argument to explain why the sum of two odd numbers is even."},
        {type:"match",question:"Match each expression type to its parity.",matchLeft:["even + odd","odd × odd","even × odd"],matchRight:["even product","odd sum","odd product"]},
        {type:"fill-blank",question:"Complete the prediction.",template:"9 999 − 624 is {{blank}} because odd − even has the same parity as odd + even."},
        {type:"text",question:"Determine whether 4 382 + 7 915 is odd or even without finding the exact sum. Explain."},
        {type:"text",question:"A student claims all odd numbers are prime because 3, 5 and 7 are prime. Give a counterexample and explain the distinction."},
        {type:"text",question:"Investigate the parity of the sum of three odd numbers and four odd numbers. Form and justify a general rule for any number of odd addends.",enrichment:true},
        {type:"text",question:"Create two different multi-step calculations with the same parity but very different values. Explain how parity can be predicted at each step.",enrichment:true}
      ]
    },
    AC9M4N03: {
      slug:"ac9m4n03-find-equivalent-representations-of-fractions-using-related",
      title:"Equivalent Fractions and Decimal Connections",
      subtitle:"Use related denominators, scaling and hundred grids to connect fractions and decimals",
      desc:"find equivalent representations of fractions using related denominators and make connections between fractions and decimal notation",
      routine:"Identify equal whole → Scale numerator and denominator → Verify model → Connect to tenths/hundredths → Compare",
      learn:"Equivalent fractions name the same point or amount even though they use different-sized parts. Multiplying or dividing the numerator and denominator by the same factor preserves value.",
      model_title:"Show 1/2 = 2/4 = 5/10 = 50/100",
      model_visual:{type:"fraction-equivalent",items:[[2,1,"1/2"],[4,2,"2/4"],[10,5,"5/10"],[100,50,"50/100"]]},
      model_note:"Each model covers the same proportion of an equal-sized whole. The number of parts changes, but the shaded amount does not.",
      apply_title:"Connect fractions with decimal notation",
      apply_visual:{type:"table",rows:[["Fraction","Hundredths","Decimal"],["1/2","50/100","0.50"],["1/4","25/100","0.25"],["3/4","75/100","0.75"],["3/10","30/100","0.30"]]},
      apply_note:"Fractions with denominators 10 or 100 connect directly to decimal place value. Related denominators can be scaled to tenths or hundredths.",
      quick_visual:{type:"hundred-grid",shaded:75,label:"3/4 = 75/100 = 0.75"},
      activities:[
        {title:"Fraction wall reasoning",text:"Build a fraction wall and identify aligned endpoints for halves, quarters, fifths, tenths and hundredths.",visual:{type:"fraction-set",items:[[2,1,"1/2"],[4,2,"2/4"],[5,3,"3/5"],[10,6,"6/10"]]}},
        {title:"Scale both parts",text:"Generate equivalents for 2/5 by multiplying numerator and denominator by 2, 5 and 10.",visual:{type:"flow",items:["2/5","×2/×2","4/10","×5/×5","10/25","×20/×20","40/100"]}},
        {title:"Fraction–decimal match",text:"Match common fractions to decimal representations and justify using hundredths.",visual:{type:"cards",items:["1/4 ↔ 0.25","3/5 ↔ 0.60","7/10 ↔ 0.70","9/20 ↔ 0.45"]}}
      ],
      mistakes:[
        ["Only numerator changed","Multiply or divide both numerator and denominator by the same non-zero factor."],
        ["Different-sized wholes compared","Equivalent fraction models require equal-sized wholes."],
        ["Denominator treated as decimal digits","1/4 is 0.25, not 0.4."],
        ["Equivalent means identical notation","Equivalent representations look different but have the same value."]
      ],
      quick:["Give two equivalents for 3/5.","Write 1/4 as hundredths and a decimal.","Is 6/10 equivalent to 3/5? Prove it.","Which is greater: 2/5 or 0.45?","Explain why 4/8 = 1/2."],
      mastery:["Generate equivalent fractions","Use related denominators","Connect tenths/hundredths","Convert common fractions to decimals","Compare representations"],
      worksheet:[
        {type:"single",question:"Which fraction is equivalent to 3/5?",answers:["6/10","6/5","3/10","5/3"]},
        {type:"fill-blank",question:"Complete the equivalent fraction.",template:"1/4 = {{blank}}/100"},
        {type:"single",question:"Which decimal is equivalent to 3/4?",answers:["0.75","0.34","0.30","0.04"]},
        {type:"text",question:"Use a diagram or scaling argument to show that 2/3 = 4/6."},
        {type:"match",question:"Match each fraction to its decimal.",matchLeft:["1/2","2/5","9/10"],matchRight:["0.9","0.4","0.5"]},
        {type:"fill-blank",question:"Complete the chain.",template:"3/5 = 6/10 = {{blank}}/100 = 0.60"},
        {type:"text",question:"Compare 2/5 and 0.45. Convert to a common representation and explain."},
        {type:"text",question:"A student writes 2/3 = 4/3 because the numerator was doubled. Explain the correction."},
        {type:"text",question:"Find three equivalent representations for 9/20, including one with denominator 100 and one decimal. Explain every scaling step.",enrichment:true},
        {type:"text",question:"Create two fractions with different denominators that are both equivalent to 0.6. Prove equivalence using both multiplication and a visual model.",enrichment:true}
      ]
    }
  }, ["AC9M4N01","AC9M4N02","AC9M4N03"]);
})();
