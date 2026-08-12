(() => {
  "use strict";
  if (!window.SkillrYear5Register) throw new Error("Year 5 curriculum base is not loaded.");

  const mk = (s) => ({
    ...s,
    activities:s.activities || [
      {title:"Build and annotate the model",text:`Represent ${s.title.toLowerCase()} and label every important quantity or relationship.`,visual:s.modelVisual},
      {title:"Compare two strategies",text:`Solve or interpret the application in two ways, then compare efficiency, clarity and error risk.`,visual:s.applyVisual},
      {title:"Mixed transfer challenge",text:"Apply the concept in an unfamiliar example, explain the deciding relationship and verify the result.",visual:{type:"cards",data:(s.quick || []).slice(0,4)}}
    ],
    mastery:s.mastery || ["Represent the concept accurately","Explain the place-value or number relationship","Select an efficient strategy","Apply it to a new context","Verify and justify the result"]
  });

  const S = {
    AC9M5N01:mk({
      slug:"ac9m5n01-interpret-compare-and-order-numbers-with-more-than-2-decimal",
      title:"Decimals Beyond Hundredths",
      subtitle:"Interpret, compare, order and locate decimals with more than two decimal places",
      desc:"interpret, compare and order numbers with more than 2 decimal places, including numbers greater than one, using place value understanding; represent these on a number line",
      learn:"Students extend place value to thousandths and beyond, align decimal places, use placeholder zeros and locate values between labelled points on a number line.",
      core:"Compare decimals from the highest place value, treating missing places as zero where useful.",
      modelTitle:"Interpret 3.407 by place value",
      modelVisual:{type:"table",data:[["ones","tenths","hundredths","thousandths"],["3","4","0","7"],["value","0.4","0","0.007"]]},
      modelNote:"The zero holds the hundredths place. Read 3.407 as three and four hundred seven thousandths, or 3 + 4/10 + 7/1000.",
      applyTitle:"Order decimals by aligning places and using a number line",
      applyVisual:{type:"numberline",start:3.4,end:3.5,marks:[[3.407,"3.407"],[3.42,"3.420"],[3.45,"3.450"],[3.49,"3.490"]]},
      applyNote:"Writing 3.42 as 3.420 makes the comparison with 3.407 transparent. Number-line position confirms the place-value reasoning.",
      terms:[["thousandth","one of 1 000 equal parts of a whole"],["placeholder zero","zero showing an empty place without changing value"],["decimal place","position to the right of the decimal point"]],
      mistakes:[["More digits means greater value","3.407 is less than 3.42 because 3.407 < 3.420."],["Zero ignored inside a decimal","The zero in 3.407 keeps 7 in the thousandths place."],["Decimal points not aligned","Compare like place values by aligning the decimal points."],["Number-line intervals assumed unequal","Equal numerical steps require equal spatial intervals."]],
      quick:["Write 5.063 in expanded form.","Compare 2.508 and 2.58.","Order 0.905, 0.95 and 0.509.","Locate 3.407 between 3.4 and 3.5.","Explain why 4.7 = 4.700."],
      questions:{
        choice1:["Which place-value statement represents 3.407?",["3 ones, 4 tenths and 7 thousandths","3 ones, 4 hundredths and 7 tenths","34 tenths and 7 hundredths","3 ones and 407 tenths"]],
        fill1:["Complete the equivalent notation.","3.42 = 3.{{blank}}"],
        choice2:["Which decimal is greatest?",["2.58","2.508","2.085","2.505"]],
        explain:"Order 3.407, 3.47, 3.4075 and 3.04, showing aligned place values and a reason for each comparison.",
        fill2:["Complete the expanded form.","5.063 = 5 + 6/100 + {{blank}}/1000"],
        apply:"A digital measurement reads 1.275 m. Locate it between 1.27 m and 1.28 m and explain the precision.",
        enrichment1:"Create four decimals between 4.305 and 4.306. Order them and explain how numbers can exist between adjacent thousandths.",
        enrichment2:"Design a partially labelled decimal number line where three missing values can be uniquely determined. Include values beyond hundredths and justify the interval scale."
      }
    }),
    AC9M5N02:mk({
      slug:"ac9m5n02-express-natural-numbers-as-products-of-their-factors-recognise",
      title:"Factors, Multiples and Divisibility",
      subtitle:"Express numbers as factor products and test divisibility efficiently",
      desc:"express natural numbers as products of their factors, recognise multiples and determine if one number is divisible by another",
      learn:"Students distinguish factors from multiples, generate factor pairs systematically and use multiplication facts and divisibility reasoning to decide whether division gives a whole-number result.",
      core:"A factor divides a number exactly; a multiple is produced by multiplying the number by a whole number.",
      modelTitle:"Build the complete factor set of 36",
      modelVisual:{type:"table",data:[["factor pair","product"],["1 × 36","36"],["2 × 18","36"],["3 × 12","36"],["4 × 9","36"],["6 × 6","36"]]},
      modelNote:"Stop when factor pairs repeat in reverse. The factors of 36 are 1, 2, 3, 4, 6, 9, 12, 18 and 36.",
      applyTitle:"Use divisibility and common multiples",
      applyVisual:{type:"compare",data:[["divisible by 2","last digit even"],["divisible by 5","last digit 0 or 5"],["divisible by 10","last digit 0"],["common multiple","appears in both skip-count sequences"]]},
      applyNote:"A divisibility test is a reasoned shortcut. Confirm unfamiliar cases with multiplication or division rather than relying on a guessed pattern.",
      terms:[["factor","whole number that divides another exactly"],["multiple","product of a number and a whole number"],["divisible","able to be divided with no remainder"]],
      mistakes:[["Factors and multiples reversed","Factors fit into a number; multiples extend outward from it."],["Only small factor pairs listed","Continue systematically until the pair order repeats."],["Divisible means close to a multiple","The quotient must be a whole number with no remainder."],["One is forgotten","1 and the number itself are factors of every positive natural number."]],
      quick:["List factors of 24.","Give five multiples of 7.","Is 126 divisible by 9? Check.","Find a common multiple of 6 and 8.","Explain factor versus multiple."],
      questions:{
        choice1:["Which is a factor of 36?",["9","7","11","14"]],
        fill1:["Complete the factor pair.","36 = 4 × {{blank}}"],
        choice2:["Which number is a common multiple of 6 and 8?",["24","18","32","42"]],
        explain:"Find every factor of 48 systematically and explain how you know the list is complete.",
        fill2:["Complete the divisibility statement.","135 is divisible by 5 because its final digit is {{blank}}."],
        apply:"A club needs to arrange 72 chairs in equal rows. List possible row arrangements and identify which use factor pairs.",
        enrichment1:"Find the smallest number greater than 100 divisible by 6, 8 and 9. Show a common-multiple strategy and verify it.",
        enrichment2:"Create a divisibility mystery number with at least five clues. Ensure the clues identify one number and prove uniqueness."
      }
    }),
    AC9M5N03:mk({
      slug:"ac9m5n03-and-order-fractions-with-the-same-and-related-denominators",
      title:"Comparing and Ordering Fractions",
      subtitle:"Use related denominators, factors and number lines including mixed numerals",
      desc:"compare and order fractions with the same and related denominators including mixed numerals, applying knowledge of factors and multiples; represent these fractions on a number line",
      learn:"Students compare fractions by using common denominators, benchmark fractions and number-line position, including values greater than one expressed as improper fractions or mixed numerals.",
      core:"Fractions can be compared when they refer to the same whole and are rewritten with common-sized parts.",
      modelTitle:"Compare 3/4 and 5/8 using a related denominator",
      modelVisual:{type:"fraction",data:[[4,3,"3/4 = 6/8"],[8,5,"5/8"]]},
      modelNote:"Because 3/4 = 6/8, it is greater than 5/8. Scaling numerator and denominator by the same factor preserves value.",
      applyTitle:"Order mixed numerals on a number line",
      applyVisual:{type:"numberline",start:1,end:3,marks:[[1.25,"1 1/4"],[1.5,"3/2"],[1.625,"1 5/8"],[2.25,"9/4"],[2.5,"2 1/2"]]},
      applyNote:"Compare whole-number parts first, then fractional parts. Use common denominators or convert mixed and improper forms when necessary.",
      terms:[["related denominators","denominators connected by multiplication or common factors"],["benchmark fraction","familiar value such as 0, 1/2 or 1 used for comparison"],["mixed numeral","whole number combined with a proper fraction"]],
      mistakes:[["Larger denominator means larger fraction","With the same numerator, more equal parts means smaller parts."],["Numerators compared when denominators differ","First establish common-sized parts or use a benchmark."],["Mixed numeral whole part ignored","Compare whole numbers before fractional remainders."],["Different-sized wholes used","Fraction comparison assumes the same whole."]],
      quick:["Compare 3/4 and 5/8.","Order 2/3, 3/4 and 5/6.","Locate 1 5/8.","Rename 9/4.","Use 1/2 as a benchmark."],
      questions:{
        choice1:["Which fraction is greater?",["3/4","5/8","They are equal","Cannot compare"]],
        fill1:["Complete the equivalent fraction.","3/4 = {{blank}}/8"],
        choice2:["Which mixed numeral equals 9/4?",["2 1/4","1 3/4","2 3/4","9 1/4"]],
        explain:"Order 2/3, 3/4, 5/6 and 7/12 using related denominators or benchmark reasoning.",
        fill2:["Complete the improper fraction.","1 5/8 = {{blank}}/8"],
        apply:"Four runners complete 1 3/5, 7/4, 1 2/3 and 13/8 laps. Order their distances and show a common representation.",
        enrichment1:"Create five fractions between 1 1/2 and 1 3/4 using at least three denominators. Prove the order.",
        enrichment2:"Design a fraction number-line puzzle mixing improper fractions and mixed numerals with related denominators. Provide a complete solution."
      }
    }),
    AC9M5N04:mk({
      slug:"ac9m5n04-that-100-represents-the-complete-whole-and-use-percentages-to",
      title:"Percentages, Fractions and Decimals",
      subtitle:"Interpret 100% as the whole and connect familiar equivalent representations",
      desc:"recognise that 100% represents the complete whole and use percentages to describe, represent and compare relative size; connect familiar percentages to their decimal and fraction equivalents",
      learn:"Students interpret percentages as parts per hundred, represent relative size with grids and number lines, and connect common percentages such as 10%, 25%, 50% and 75% to fractions and decimals.",
      core:"A percentage compares a part with a whole scaled to 100 equal parts.",
      modelTitle:"Represent 35% on a hundred grid",
      modelVisual:{type:"grid",rows:10,cols:10,on:35,label:"35% = 35/100 = 0.35"},
      modelNote:"The whole must be identified. Thirty-five shaded cells out of 100 represent 35%, but the actual quantity depends on what one whole represents.",
      applyTitle:"Connect familiar percentage equivalents",
      applyVisual:{type:"table",data:[["percentage","fraction","decimal"],["10%","1/10","0.10"],["25%","1/4","0.25"],["50%","1/2","0.50"],["75%","3/4","0.75"],["100%","1","1.00"]]},
      applyNote:"Use equivalent forms to compare relative sizes and solve simple contextual questions. Percentage does not state the actual amount until the whole is known.",
      terms:[["percentage","number of parts per hundred"],["relative size","size of a part compared with its whole"],["equivalent representation","different notation naming the same value"]],
      mistakes:[["100% means 100 objects","It means the complete whole, whatever its size."],["Percent and decimal copied without place-value change","35% = 0.35, not 35.0."],["Percentages compared without the whole","Equal percentages of different wholes can be different amounts."],["25% treated as 25/10","Percent means denominator 100 before simplification."]],
      quick:["Represent 35%.","Convert 50% to fraction and decimal.","Compare 40% and 3/8.","Explain 100%.","Why does the whole matter?"],
      questions:{
        choice1:["Which fraction is equivalent to 25%?",["1/4","1/5","1/25","25/10"]],
        fill1:["Complete the decimal equivalent.","35% = {{blank}}"],
        choice2:["Which value is greatest?",["60%","0.58","1/2","55/100"]],
        explain:"Use a hundred grid and equivalent forms to compare 45%, 2/5 and 0.48.",
        fill2:["Complete the whole statement.","100% = {{blank}} whole."],
        apply:"A survey reports 75% chose option A. Explain what can and cannot be known without the total number surveyed.",
        enrichment1:"Find two different wholes for which 25% produces different actual amounts. Explain relative versus absolute quantity.",
        enrichment2:"Create a comparison set containing percentages, decimals and fractions whose order is not obvious. Provide two verification methods."
      }
    }),
    AC9M5N05:mk({
      slug:"ac9m5n05-solve-problems-involving-addition-and-subtraction-of-fractions",
      title:"Adding and Subtracting Fractions",
      subtitle:"Use same or related denominators and select efficient representations",
      desc:"solve problems involving addition and subtraction of fractions with the same or related denominators, using different strategies",
      learn:"Students rename fractions with common denominators, combine or separate equal-sized parts and interpret results that may cross a whole, using diagrams, number lines and equations.",
      core:"Fractions can be added or subtracted only after the parts have been expressed with a common size.",
      modelTitle:"Add 3/4 + 5/8 by renaming quarters as eighths",
      modelVisual:{type:"fraction",data:[[8,6,"3/4 = 6/8"],[8,5,"+ 5/8"],[8,8,"11/8 = 1 3/8"]]},
      modelNote:"Six eighths plus five eighths equals eleven eighths. The denominator remains 8 because the parts are still eighths.",
      applyTitle:"Use number-line and complement strategies",
      applyVisual:{type:"compare",data:[["common denominator","2/3 − 1/6 = 4/6 − 1/6"],["complement to 1","7/8 + 1/8 = 1"],["bridge a whole","3/4 + 1/2 = 3/4 + 2/4"],["mixed numeral","11/8 = 1 3/8"]]},
      applyNote:"Choose a strategy based on the relationship between denominators and benchmarks. Simplify or rename the final result where useful.",
      terms:[["common denominator","shared denominator representing equal-sized parts"],["complement","amount needed to complete a benchmark such as one whole"],["improper fraction","fraction whose numerator is at least its denominator"]],
      mistakes:[["Numerators and denominators both added","Keep the common denominator because part size does not change."],["Fractions combined before renaming","Different denominators name different-sized parts."],["Whole crossed but not interpreted","Rename an improper result as a mixed numeral when context benefits."],["Same denominator assumed from appearance","Check actual denominator relationship and the same whole."]],
      quick:["Solve 3/4 + 5/8.","Solve 2/3 − 1/6.","Find complement of 7/10.","Rename 13/6.","Choose a strategy for 5/12 + 1/3."],
      questions:{
        choice1:["What is 3/4 + 5/8?",["1 3/8","8/12","8/8","1 1/8"]],
        fill1:["Complete the renaming.","2/3 = {{blank}}/6"],
        choice2:["What is 2/3 − 1/6?",["1/2","1/3","1/6","3/6 plus 1/6"]],
        explain:"Solve 5/12 + 1/3 using a visual or common-denominator strategy and explain why the denominator is valid.",
        fill2:["Complete the complement.","7/10 + {{blank}}/10 = 1"],
        apply:"A recipe uses 3/4 cup of one ingredient and 2/3 cup of another. Find the total and interpret the mixed numeral.",
        enrichment1:"Create two fraction additions with related denominators that both equal 1 1/2. Prove each using different strategies.",
        enrichment2:"Compare common-denominator, number-line and complement strategies for one multi-step fraction problem. Evaluate efficiency and clarity."
      }
    })
  };

  window.SkillrYear5Register("maths", S, Object.keys(S));
})();
