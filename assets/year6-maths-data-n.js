(() => {
  "use strict";
  if (!window.SkillrYear6Register) throw new Error("Year 6 curriculum base is not loaded.");

  const S = {
    AC9M6N01: {
      slug:"ac9m6n01-situations-including-financial-contexts-that-use-integers",
      title:"Integers on Number Lines and the Cartesian Plane",
      subtitle:"Represent positive and negative values in financial, temperature, elevation and coordinate contexts",
      desc:"recognise situations, including financial contexts, that use integers; locate and represent integers on a number line and as coordinates on the Cartesian plane",
      learn:"Students interpret zero as a reference point, order positive and negative integers, use opposites and locate ordered pairs across all four quadrants.",
      modelTitle:"Locate integers relative to zero",
      modelVisual:{type:"numberline",start:-10,end:10,marks:[[-8,"−8"],[-3,"−3"],[0,"0"],[4,"4"],[9,"9"]]},
      modelNote:"Numbers farther right are greater. Negative values are less than zero; their absolute distance from zero is not the same as their signed value.",
      applyTitle:"Connect integer contexts to coordinates",
      applyVisual:{type:"coordinate",min:-4,max:4,points:[[-3,2,"A"],[2,3,"B"],[-2,-3,"C"],[3,-2,"D"]]},
      applyNote:"Read an ordered pair as horizontal x-coordinate first, then vertical y-coordinate. The signs identify the quadrant and direction from the origin.",
      terms:[["integer","whole number, its negative, or zero"],["opposite","number the same distance from zero on the other side"],["origin","coordinate point (0,0)"]],
      mistakes:[["−8 is greater than −3 because 8 is greater than 3","On the number line, −8 lies farther left and is smaller."],["Negative means a physically impossible quantity","Integers model debt, below-zero temperature, depth and change."],["Coordinates are read y then x","Read x first, then y."],["Absolute distance confused with signed position","Distance from zero is non-negative; position keeps its sign."]],
      quick:["Order −7, −2, 0 and 5.","Find the opposite of −9.","Interpret a bank balance of −$35.","Plot (−3,2).","Name the quadrant of (4,−2)."],
      questions:{
        choice1:["Which integer is greatest?",["−2","−7","−9","−12"]],
        fill1:["Complete the opposite relationship.","The opposite of −8 is {{blank}}."],
        choice2:["Which point lies in Quadrant II?",["(−3,4)","(3,4)","(−3,−4)","(3,−4)"]],
        fill2:["Complete the financial interpretation.","A balance of −$45 represents a debt of ${{blank}}."],
        apply:"A submarine moves from −120 m to −75 m. Describe the direction and size of the change using integers and a number line.",
        enrichment1:"Create four points, one in each quadrant, whose coordinates all have absolute values 2 and 5. Connect them and analyse symmetry.",
        enrichment2:"Design a multi-step financial or elevation problem requiring comparison, change and coordinate representation of integers."
      }
    },
    AC9M6N02: {
      slug:"ac9m6n02-and-describe-the-properties-of-prime-composite-and-square",
      title:"Prime, Composite and Square Numbers",
      subtitle:"Use factor structure to classify numbers and simplify calculations",
      desc:"identify and describe the properties of prime, composite and square numbers and use these properties to solve problems and simplify calculations",
      learn:"Students classify numbers from complete factor sets, recognise square numbers as equal-factor products and use factorisation to solve divisibility and arrangement problems.",
      modelTitle:"Classify numbers through factor pairs",
      modelVisual:{type:"table",data:[["number","factor pairs","classification"],["17","1 × 17","prime"],["18","1×18, 2×9, 3×6","composite"],["25","1×25, 5×5","square and composite"],["1","1 only","neither prime nor composite"]]},
      modelNote:"A prime has exactly two positive factors. A square number has an odd number of positive factors because one pair repeats at the square root.",
      applyTitle:"Use number properties strategically",
      applyVisual:{type:"compare",data:[["factorise 84","2 × 2 × 3 × 7"],["recognise 144","12² and composite"],["simplify 25 × 16","(5²)(4²) = 20² = 400"],["arrange 29 objects","only 1 × 29 rectangle"]]},
      applyNote:"Properties can reduce calculation and explain constraints. Classification may overlap: every square greater than 1 is composite.",
      terms:[["prime number","natural number greater than 1 with exactly two factors"],["composite number","natural number greater than 1 with more than two factors"],["square number","product of a whole number multiplied by itself"]],
      mistakes:[["1 is prime","One has only one positive factor, so it is neither prime nor composite."],["Odd means prime","9, 15 and 21 are odd composite numbers."],["Square and composite treated as exclusive","Most square numbers are composite."],["Factor list stopped too early","Search systematically through factor pairs to the square root."]],
      quick:["Classify 1, 17, 25 and 27.","List factors of 36.","Explain why 49 is square.","Find a prime factor of 84.","Use a square-number shortcut."],
      questions:{
        choice1:["Which number is prime?",["29","21","27","39"]],
        fill1:["Complete the square relationship.","81 = {{blank}}²."],
        choice2:["Which statement about 1 is correct?",["It is neither prime nor composite","It is prime","It is composite","It has exactly two factors"]],
        fill2:["Complete the factorisation.","84 = 2 × 2 × 3 × {{blank}}."],
        apply:"A rectangular display uses 72 tiles. List possible whole-number dimensions and use factor properties to recommend a shape close to a square.",
        enrichment1:"Explain and verify why every square number has an odd number of positive factors.",
        enrichment2:"Create a number-classification puzzle using prime, composite, square and divisibility clues that has one solution."
      }
    },
    AC9M6N03: {
      slug:"ac9m6n03-apply-knowledge-of-equivalence-to-compare-order-and-represent",
      title:"Equivalent Fractions on a Common Number Line",
      subtitle:"Compare halves, thirds, quarters and related fractions and justify their order",
      desc:"apply knowledge of equivalence to compare, order and represent common fractions including halves, thirds and quarters on the same number line and justify their order",
      learn:"Students rename fractions with common denominators, use benchmarks and place proper, improper and mixed forms accurately on one continuous number line.",
      modelTitle:"Compare 2/3, 3/4 and 5/6",
      modelVisual:{type:"fraction",data:[[12,8,"2/3 = 8/12"],[12,9,"3/4 = 9/12"],[12,10,"5/6 = 10/12"]]},
      modelNote:"A common denominator creates equal-sized parts, so numerators can be compared meaningfully. Equivalent forms occupy the same point.",
      applyTitle:"Locate fractions greater than one",
      applyVisual:{type:"numberline",start:0,end:2,marks:[[0.5,"1/2"],[0.75,"3/4"],[1,"1"],[1.25,"5/4"],[1.5,"3/2"],[1.75,"1 3/4"]]},
      applyNote:"Partition each whole into equal intervals and preserve the denominator across whole-number boundaries.",
      terms:[["equivalent fractions","different fraction names for the same value"],["common denominator","shared denominator used for comparison or calculation"],["benchmark","familiar reference value such as 0, 1/2 or 1"]],
      mistakes:[["Larger denominator means larger value","For the same numerator, more parts means smaller parts."],["Different wholes compared","Fractions must refer to equal-sized wholes."],["Improper fraction placed below one","Compare numerator with denominator first."],["Number-line intervals drawn unequally","Equal numerical steps require equal spacing."]],
      quick:["Order 2/3, 3/4 and 5/6.","Show 3/4 = 9/12.","Locate 5/4.","Compare 7/8 and 5/6.","Use 1/2 as a benchmark."],
      questions:{
        choice1:["Which fraction is greatest?",["5/6","3/4","2/3","7/12"]],
        fill1:["Complete the equivalence.","3/4 = {{blank}}/12."],
        choice2:["Which mixed numeral equals 7/4?",["1 3/4","1 7/4","2 1/4","3 1/4"]],
        fill2:["Complete the common-denominator form.","2/3 = {{blank}}/12."],
        apply:"Order 7/8, 5/6, 3/4 and 11/12 using a common denominator or benchmark reasoning and justify each position.",
        enrichment1:"Create five fractions between 2/3 and 3/4 using at least three denominators and prove their order.",
        enrichment2:"Design a number-line puzzle mixing equivalent, improper and mixed fractions with enough clues for a unique solution."
      }
    },
    AC9M6N04: {
      slug:"ac9m6n04-apply-knowledge-of-place-value-to-add-and-subtract-decimals",
      title:"Adding and Subtracting Decimals",
      subtitle:"Use place value, efficient strategies, estimation and digital verification",
      desc:"apply knowledge of place value to add and subtract decimals, using digital tools where appropriate; use estimation and rounding to check the reasonableness of answers",
      learn:"Students align place values, rename when regrouping, choose mental or written strategies and compare exact results with purposeful estimates.",
      modelTitle:"Calculate 18.375 + 6.84 by aligning place values",
      modelVisual:{type:"table",data:[["tens","ones","tenths","hundredths","thousandths"],["1","8","3","7","5"],["","6","8","4","0"],["2","5","2","1","5"]]},
      modelNote:"Write 6.84 as 6.840 to align equal place values. Placeholder zeros clarify structure without changing value.",
      applyTitle:"Choose an efficient subtraction strategy",
      applyVisual:{type:"compare",data:[["32.00 − 9.875","written regrouping"],["19.95 + 7.60","compensation: 20 + 7.60 − 0.05"],["48.6 − 19.9","subtract 20, then add 0.1"],["digital tool","verify after setup and estimation"]]},
      applyNote:"Estimate before calculating: 18.375 + 6.84 is about 18.4 + 6.8 = 25.2, so 25.215 is reasonable.",
      terms:[["place-value alignment","placing equal-value decimal positions in columns"],["regrouping","renaming across adjacent place values"],["compensation","adjusting to friendly numbers then correcting"]],
      mistakes:[["Decimal points not aligned","Align place values, not final digits."],["Zeros added to the left or inside incorrectly","Only trailing placeholder zeros preserve a decimal’s value."],["Estimate omitted","Use it to detect misplaced decimal points."],["Calculator result accepted without context","Check operation, input and magnitude."]],
      quick:["Add 18.375 and 6.84.","Subtract 32 − 9.875.","Use compensation for 48.6 − 19.9.","Estimate first.","Explain placeholder zeros."],
      questions:{
        choice1:["What is 18.375 + 6.84?",["25.215","24.215","25.115","252.15"]],
        fill1:["Complete the equivalent notation.","6.84 = 6.{{blank}} for thousandths alignment."],
        choice2:["Which estimate best checks 48.6 − 19.9?",["about 29","about 68","about 3","about 290"]],
        fill2:["Complete the compensation.","48.6 − 19.9 = 48.6 − 20 + {{blank}}."],
        apply:"A budget has $125.50 and costs of $37.85, $19.995 and $8.60. Calculate the balance, discuss money rounding and check with estimation.",
        enrichment1:"Create two decimal calculations with answers close to 10 where a one-place misalignment produces a plausible-looking but unreasonable result.",
        enrichment2:"Compare written regrouping, compensation and digital verification for a multi-step decimal problem."
      }
    },
    AC9M6N05: {
      slug:"ac9m6n05-solve-problems-involving-addition-and-subtraction-of-fractions",
      title:"Adding and Subtracting Fractions",
      subtitle:"Use equivalent fractions, benchmarks and mixed-number interpretation",
      desc:"solve problems involving addition and subtraction of fractions using knowledge of equivalent fractions",
      learn:"Students generate common denominators, combine equal-sized parts, bridge whole numbers and interpret improper or mixed results in context.",
      modelTitle:"Solve 5/6 − 1/4 using equivalent fractions",
      modelVisual:{type:"fraction",data:[[12,10,"5/6 = 10/12"],[12,3,"1/4 = 3/12"],[12,7,"difference = 7/12"]]},
      modelNote:"The denominator remains 12 because the result counts twelfths. Simplify only when numerator and denominator share a factor.",
      applyTitle:"Choose fraction strategies by relationship",
      applyVisual:{type:"compare",data:[["3/4 + 5/8","rename 3/4 as 6/8"],["7/10 + 3/10","complete one whole"],["1 1/3 − 5/6","rename whole and thirds as sixths"],["5/12 + 1/3","rename 1/3 as 4/12"]]},
      applyNote:"Use diagrams or number lines when crossing a whole or interpreting a word problem; use factor knowledge to select the least useful common denominator.",
      terms:[["equivalent fraction","fraction with the same value in different-sized parts"],["least common denominator","smallest shared denominator useful for calculation"],["mixed numeral","whole number and proper fraction together"]],
      mistakes:[["Numerators and denominators both added","The common denominator names the unchanged part size."],["Fractions combined before renaming","Different denominators name different-sized parts."],["Whole part lost during subtraction","Regroup one whole as denominator-sized parts."],["Final fraction simplified incorrectly","Divide numerator and denominator by the same factor."]],
      quick:["Solve 5/6 − 1/4.","Add 3/4 + 5/8.","Subtract 1 1/3 − 5/6.","Select a common denominator.","Interpret an improper result."],
      questions:{
        choice1:["What is 5/6 − 1/4?",["7/12","4/2","4/12","1/2"]],
        fill1:["Complete the renaming.","1/4 = {{blank}}/12."],
        choice2:["What is 3/4 + 5/8?",["1 3/8","8/12","1 1/8","8/8"]],
        fill2:["Complete the common denominator.","1/3 = {{blank}}/12."],
        apply:"A trail is 2 1/4 km. A walker completes 5/6 km in the morning and 3/4 km later. How much remains? Show regrouping and interpretation.",
        enrichment1:"Create three different fraction expressions with unrelated-looking denominators that equal 1 5/12. Prove each.",
        enrichment2:"Compare least-common-denominator, product-denominator and benchmark strategies for one calculation."
      }
    },
    AC9M6N06: {
      slug:"ac9m6n06-multiply-and-divide-decimals-by-multiples-of-powers-of-10",
      title:"Multiplying and Dividing Decimals by Powers of 10",
      subtitle:"Track changing digit value and factor multiples of ten",
      desc:"multiply and divide decimals by multiples of powers of 10 without a calculator, applying knowledge of place value and proficiency with multiplication facts; using estimation and rounding to check the reasonableness of answers",
      learn:"Students explain how each digit’s place value changes under multiplication or division by 10, 100 and 1 000, then extend this to factors such as 30, 400 and 0.1-related contexts.",
      modelTitle:"Track 4.275 through ×10, ×100 and ÷10",
      modelVisual:{type:"table",data:[["operation","result","digit-value change"],["4.275 × 10","42.75","each digit worth 10 times as much"],["4.275 × 100","427.5","100 times as much"],["4.275 ÷ 10","0.4275","one tenth as much"]]},
      modelNote:"The decimal point is a fixed notation reference; explain changing digit values rather than saying the point physically moves.",
      applyTitle:"Factor multiples of powers of ten",
      applyVisual:{type:"flow",data:["2.4 × 300","2.4 × 3 × 100","7.2 × 100","720"]},
      applyNote:"For 48 ÷ 0.6, scaling both numbers by 10 gives 480 ÷ 6 = 80; this preserves the quotient.",
      terms:[["power of 10","10, 100, 1 000 and related repeated factors"],["place-value shift","change in the value represented by each digit"],["scaling","multiplying quantities by a common factor"]],
      mistakes:[["Add zeros rule used with decimals","Use place value; zeros may be placeholders, not a universal rule."],["Decimal point said to move","Digits change place value relative to the fixed point."],["Factor 300 treated as 3","Include the factor of 100."],["Division estimate omitted","Check quotient magnitude before accepting."]],
      quick:["Calculate 4.275 × 100.","Calculate 72.5 ÷ 10.","Solve 2.4 × 300.","Solve 48 ÷ 0.6.","Explain digit-value change."],
      questions:{
        choice1:["What is 4.275 × 100?",["427.5","42.75","4 275","0.04275"]],
        fill1:["Complete the place-value relationship.","72.5 ÷ 10 = {{blank}}."],
        choice2:["Which expression is equivalent to 2.4 × 300?",["2.4 × 3 × 100","2.4 × 3","24 × 3 only","2.4 + 300"]],
        fill2:["Complete the scaling.","48 ÷ 0.6 = 480 ÷ {{blank}}."],
        apply:"A machine makes 0.375 kg parts. Find the mass of 400 parts and check the result with compatible-number estimation.",
        enrichment1:"Develop two mental strategies for 7.25 × 600 and compare place-value transparency.",
        enrichment2:"Create a set of decimal scaling errors and explain which estimates expose each error."
      }
    },
    AC9M6N07: {
      slug:"ac9m6n07-solve-problems-that-require-finding-a-familiar-fraction-decimal",
      title:"Fractions, Decimals and Percentages of Quantities",
      subtitle:"Find familiar parts, discounts and remaining amounts efficiently",
      desc:"solve problems that require finding a familiar fraction, decimal or percentage of a quantity, including percentage discounts, choosing efficient calculation strategies and using digital tools where appropriate",
      learn:"Students connect equivalent fractions, decimals and percentages, find benchmark parts by division and multiplication and distinguish discount amount from sale price.",
      modelTitle:"Find 25%, 40% and 75% of $240",
      modelVisual:{type:"table",data:[["part","strategy","amount"],["25% = 1/4","240 ÷ 4","$60"],["40% = 4/10","240 ÷ 10 × 4","$96"],["75% = 3/4","240 ÷ 4 × 3","$180"]]},
      modelNote:"Use a familiar equivalent form that makes the quantity easy to partition. A 25% discount is $60; the sale price is $180.",
      applyTitle:"Build discounts and percentage increase in context",
      applyVisual:{type:"compare",data:[["20% discount on $85","discount $17; pay $68"],["10% of 360","36"],["0.5 of 74","37"],["3/5 of 90","54"],["digital tool","compare many prices after formula is set"]]},
      applyNote:"Always identify whether the question asks for the part, the remaining amount or the new total.",
      terms:[["percentage of a quantity","part found by applying a rate per hundred"],["discount","amount removed from an original price"],["sale price","original price minus discount"]],
      mistakes:[["Discount amount reported as final price","Subtract the discount from the original."],["Percent converted to whole number multiplier","20% = 0.20, not 20."],["Quantity divided by percentage number only","Use a fraction, decimal or benchmark strategy."],["Whole not identified","State the original total before finding a part."]],
      quick:["Find 25% of 240.","Find 3/5 of 90.","Calculate a 20% discount.","Distinguish discount/sale price.","Choose a benchmark strategy."],
      questions:{
        choice1:["What is 25% of $240?",["$60","$180","$25","$960"]],
        fill1:["Complete the discount.","20% of $85 = ${{blank}}."],
        choice2:["A $240 item has 25% off. What is the sale price?",["$180","$60","$215","$300"]],
        fill2:["Complete the equivalent form.","40% = {{blank}}/10."],
        apply:"Compare a 30% discount on $120 with a $32 voucher. Calculate both final prices and state which offer is better.",
        enrichment1:"Create two different original prices for which a 25% discount gives whole-dollar sale prices. Explain the structure.",
        enrichment2:"Design a multi-stage promotion involving discount and additional fee. Explain why order matters and verify digitally."
      }
    },
    AC9M6N08: {
      slug:"ac9m6n08-approximate-numerical-solutions-to-problems-involving-rational",
      title:"Estimating with Rational Numbers and Percentages",
      subtitle:"Choose bounds, compatible numbers and safe financial estimates",
      desc:"approximate numerical solutions to problems involving rational numbers and percentages, including financial contexts, using appropriate estimation strategies",
      learn:"Students select rounding, benchmark fractions, compatible numbers and upper or lower bounds according to the decision, then explain expected estimation error.",
      modelTitle:"Estimate a percentage and decimal calculation",
      modelVisual:{type:"table",data:[["calculation","purposeful estimate"],["18.7% of 398","about 20% of 400 = 80"],["63.4 ÷ 7.9","about 64 ÷ 8 = 8"],["$29.95 + $18.60 + $7.85","safe budget: $30 + $19 + $8 = $57"],["3/8 of 79","about 3/8 of 80 = 30"]]},
      modelNote:"The estimate should be simple enough to calculate and close enough for the decision. State whether it is likely high or low.",
      applyTitle:"Use upper and lower bounds for decisions",
      applyVisual:{type:"compare",data:[["cash needed","round costs upward"],["minimum capacity","round demand upward"],["quick reasonableness","round to one useful place"],["range estimate","calculate plausible lower and upper values"]]},
      applyNote:"A balanced estimate is not always safest. Financial sufficiency and capacity decisions often require a deliberate upper bound.",
      terms:[["compatible numbers","nearby values that calculate easily"],["upper bound","value at or above a plausible exact amount"],["benchmark percentage","familiar rate such as 10%, 25%, 50% or 75%"]],
      mistakes:[["Nearest rounding used automatically","Choose strategy from purpose."],["Estimate reported as exact","Use approximation language and precision."],["Bounds direction ignored","A safe budget estimate should not underestimate."],["Early rounding compounds error","Keep exact values when later accuracy matters."]],
      quick:["Estimate 18.7% of 398.","Use compatible numbers for division.","Make a safe budget.","State high/low expectation.","Give an estimation range."],
      questions:{
        choice1:["Which is a useful estimate for 18.7% of 398?",["20% of 400 = 80","2% of 40 = 0.8","187% of 398","398 ÷ 18.7"]],
        fill1:["Complete the compatible estimate.","63.4 ÷ 7.9 ≈ 64 ÷ 8 = {{blank}}."],
        choice2:["Which estimate is safest for checking cash required?",["Round each cost upward appropriately","Round every cost down","Ignore small costs","Use an unrelated average"]],
        fill2:["Complete the benchmark.","3/8 of 80 = {{blank}}."],
        apply:"Estimate the total and percentage saving for a shopping basket, then compare with exact calculation and explain error direction.",
        enrichment1:"Create one problem where a close balanced estimate leads to an unsafe decision but an upper estimate works.",
        enrichment2:"Develop an estimation decision guide for rational-number operations and percentage contexts."
      }
    },
    AC9M6N09: {
      slug:"ac9m6n09-mathematical-modelling-to-solve-practical-problems-involving",
      title:"Mathematical Modelling with Rational Numbers and Percentages",
      subtitle:"Formulate, solve, validate and justify practical and financial decisions",
      desc:"use mathematical modelling to solve practical problems involving natural and rational numbers and percentages, including in financial contexts; formulate the problems, choosing operations and efficient calculation strategies, and using digital tools where appropriate; interpret and communicate solutions in terms of the situation, justifying the choices made",
      learn:"Students identify quantities, rates, percentages, constraints and assumptions, build a model, compare scenarios and communicate a recommendation supported by calculations and sensitivity checks.",
      modelTitle:"Compare two fundraising plans",
      modelVisual:{type:"table",data:[["plan","income","costs","net"],["A: 180 tickets at $12","$2 160","$780 fixed + 15% fee","$1 056"],["B: 150 tickets at $15","$2 250","$1 050 fixed + 8% fee","$1 020"],["decision","A higher net","but test attendance assumptions",""]]},
      modelNote:"The model separates revenue, percentage fees and fixed costs. A recommendation should state assumptions about tickets sold and constraints such as venue capacity.",
      applyTitle:"Use a modelling and sensitivity cycle",
      applyVisual:{type:"flow",data:["define decision","identify quantities/constraints","represent equations/table","calculate scenarios","validate and estimate","change one assumption","recommend and communicate"]},
      applyNote:"Digital spreadsheets can compare many scenarios, but formulas, units and assumptions must be explained and checked.",
      terms:[["model","simplified mathematical representation of a situation"],["constraint","condition a valid solution must meet"],["sensitivity analysis","testing how a result changes when an assumption changes"]],
      mistakes:[["Every number in the context used","Include only relevant quantities and relationships."],["Percentage fee calculated from the wrong base","Identify whether it applies to revenue, cost or balance."],["Cheapest option selected without constraints","Check capacity, quality and requirements."],["Spreadsheet output accepted without formula audit","Explain and verify formulas."]],
      quick:["Identify a percentage fee base.","Write a net-income equation.","Check a capacity constraint.","Test one assumption.","Communicate a recommendation."],
      questions:{
        choice1:["What should a mathematical model identify before calculation?",["quantities, relationships, assumptions and constraints","every number whether relevant or not","a preferred answer","a decorative graph only"]],
        fill1:["Complete the net model.","net result = income − fixed costs − percentage {{blank}}."],
        choice2:["What does a sensitivity check do?",["Tests how the recommendation changes when an assumption changes","Deletes inconvenient data","Guarantees one answer forever","Replaces calculation"]],
        fill2:["Complete the validation step.","Check formulas, units, constraints and the meaning of the {{blank}}."],
        apply:"Model two event plans with fixed costs, ticket price, attendance and a percentage fee. Recommend one and test a lower-attendance scenario.",
        enrichment1:"Create a three-option financial model with a break-even point and identify when the preferred option changes.",
        enrichment2:"Critique a spreadsheet model containing an incorrect percentage reference, early rounding and an ignored constraint."
      }
    }
  };

  window.SkillrYear6Register("maths", S, Object.keys(S));
})();
