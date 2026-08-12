(() => {
  "use strict";
  if (!window.SkillrYear5Register) throw new Error("Year 5 curriculum base is not loaded.");
  const mk=(s)=>({...s,activities:s.activities||[
    {title:"Model and annotate",text:`Represent ${s.title.toLowerCase()} and label the relationship or measurement being used.`,visual:s.modelVisual},
    {title:"Strategy or instrument comparison",text:"Compare two valid methods or tools and justify which better suits the numbers, attribute or purpose.",visual:s.applyVisual},
    {title:"Transfer and verify",text:"Apply the concept to an unfamiliar example, state units or conditions and verify independently.",visual:{type:"cards",data:(s.quick||[]).slice(0,4)}}
  ],mastery:s.mastery||["Represent accurately","Explain the relationship","Choose a suitable method or unit","Apply in context","Check and justify"]});

  const S={
    AC9M5A01:mk({
      slug:"ac9m5a01-and-explain-the-connection-between-multiplication-and-division",
      title:"Multiplication and Division as Inverse Operations",
      subtitle:"Build connected fact families and extend them with place value",
      desc:"recognise and explain the connection between multiplication and division as inverse operations and use this to develop families of number facts",
      learn:"Students use one multiplicative relationship to generate related multiplication and division equations, solve unknowns and extend facts by scaling factors and products.",
      core:"Multiplication combines equal factors and division undoes that relationship by finding a missing factor or number of groups.",
      modelTitle:"Build a fact family from 8 × 14 = 112",
      modelVisual:{type:"table",data:[["relationship","equation"],["multiply","8 × 14 = 112"],["commute","14 × 8 = 112"],["divide by first factor","112 ÷ 8 = 14"],["divide by second factor","112 ÷ 14 = 8"]]},
      modelNote:"The product is the whole and the factors are related parts of the multiplicative structure. Division checks multiplication and solves missing-factor problems.",
      applyTitle:"Scale a fact family while preserving structure",
      applyVisual:{type:"flow",data:["8 × 14 = 112","80 × 14 = 1 120","1 120 ÷ 80 = 14","1 120 ÷ 14 = 80"]},
      applyNote:"Scaling one factor by 10 scales the product by 10. The related division facts change consistently because the relationship is preserved.",
      terms:[["inverse operations","operations that undo one another"],["fact family","set of related equations using the same values"],["factor","number multiplied to form a product"]],
      mistakes:[["Division fact uses a different product","Related facts must preserve the same whole."],["Every order change is allowed","Multiplication is commutative; division generally is not."],["Scaling factor but not product","If one factor changes, the product changes proportionally."],["Fact recalled without explanation","Connect the equation to groups, arrays or missing factors."]],
      quick:["Write four facts for 8, 14 and 112.","Use inverse to check 936 ÷ 8.","Scale 7 × 6 = 42 by 10.","Solve 15 × □ = 180.","Explain why division is not commutative."],
      questions:{
        choice1:["Which fact is related to 8 × 14 = 112?",["112 ÷ 8 = 14","112 ÷ 7 = 14","8 + 14 = 112","14 − 8 = 112"]],
        fill1:["Complete the inverse fact.","15 × 12 = 180, so 180 ÷ 15 = {{blank}}"],
        choice2:["If 7 × 6 = 42, what is 70 × 6?",["420","42","4 200","76"]],
        explain:"Create the complete fact family for 24, 35 and 840 and explain the role of each value.",
        fill2:["Complete the missing factor.","18 × {{blank}} = 270"],
        apply:"Use known facts and scaling to solve 3 600 ÷ 45. Show a related multiplication check.",
        enrichment1:"Create a network of at least ten facts beginning with 9 × 16 = 144, including scaled and partitioned relationships.",
        enrichment2:"Compare missing-factor and equal-sharing interpretations of the same division equation. Show how both connect to one multiplication fact."
      }
    }),
    AC9M5A02:mk({
      slug:"ac9m5a02-find-unknown-values-in-numerical-equations-involving",
      title:"Unknown Values in Multiplication and Division Equations",
      subtitle:"Preserve equality and use inverse operations and properties",
      desc:"find unknown values in numerical equations involving multiplication and division using the properties of numbers and operations",
      learn:"Students identify the role of an unknown, use inverse operations, factor relationships and distributive properties, then substitute the solution to verify both sides of an equation.",
      core:"Solving an equation means finding a value that makes the two expressions equal, not moving numbers by an unexplained rule.",
      modelTitle:"Solve 24 × □ = 1 008",
      modelVisual:{type:"table",data:[["step","reason"],["unknown is a factor","divide product by known factor"],["1 008 ÷ 24","42"],["substitute","24 × 42 = 1 008"],["solution","□ = 42"]]},
      modelNote:"The inverse operation finds the missing factor. Substitution confirms that the equality is true.",
      applyTitle:"Use properties to simplify equations",
      applyVisual:{type:"compare",data:[["□ × 25 = 1 200","1 200 ÷ 25 = 48"],["6 × □ × 5 = 900","group 6 × 5 = 30; □ = 30"],["1 440 ÷ □ = 24","□ = 1 440 ÷ 24 = 60"],["□ ÷ 18 = 35","□ = 35 × 18 = 630"]]},
      applyNote:"Identify whether the unknown is a factor, dividend or divisor. Multiplication can be regrouped; division order cannot be swapped casually.",
      terms:[["equation","statement that two expressions have equal value"],["unknown","value to be determined"],["substitution","replacing a symbol with a value to test the equation"]],
      mistakes:[["Same inverse used for every unknown position","Identify factor, dividend or divisor first."],["Equals sign read as an instruction only","It states balance between expressions."],["Division reversed","a ÷ b is not generally b ÷ a."],["Solution not checked","Substitute into the original equation."]],
      quick:["Solve 24 × □ = 1 008.","Solve □ ÷ 18 = 35.","Solve 1 440 ÷ □ = 24.","Regroup 6 × □ × 5.","Substitute and check."],
      questions:{
        choice1:["What is the unknown in 24 × □ = 1 008?",["42","24","84","1 032"]],
        fill1:["Complete the equation.","{{blank}} ÷ 18 = 35"],
        choice2:["What is the unknown in 1 440 ÷ □ = 24?",["60","34 560","1 416","24"]],
        explain:"Solve 6 × □ × 5 = 900 using a number property and explain the regrouping.",
        fill2:["Complete the substitution check.","24 × 42 = {{blank}}"],
        apply:"A rectangular array has 1 872 objects arranged in 36 equal rows. Write and solve an unknown-value equation for objects per row.",
        enrichment1:"Create four equations with solution 48 where the unknown appears as factor, dividend, divisor and within a grouped product. Verify all.",
        enrichment2:"Solve □ × 24 = 18 × 80 using properties before standard calculation. Compare two valid solution paths."
      }
    }),
    AC9M5M01:mk({
      slug:"ac9m5m01-appropriate-metric-units-when-measuring-comparing-and-estimating",
      title:"Choosing Metric Units and Instruments",
      subtitle:"Measure, compare and estimate length, mass, capacity and temperature",
      desc:"choose appropriate metric units when measuring, comparing and estimating the attributes of length, mass and capacity, and temperature",
      learn:"Students select a metric unit and instrument that produce a useful precision, use familiar benchmarks to estimate and convert related units before comparing measurements.",
      core:"A suitable measurement choice matches the attribute, expected size and precision required by the purpose.",
      modelTitle:"Match attributes, units, instruments and benchmarks",
      modelVisual:{type:"table",data:[["attribute","unit","instrument","benchmark"],["pencil length","mm or cm","ruler","about 15 cm"],["room length","m","tape","door about 2 m"],["apple mass","g","balance","about 150 g"],["water bottle capacity","mL","measuring jug","about 600 mL"],["air temperature","°C","thermometer","room about 20°C"]]},
      modelNote:"Choose the smaller unit when finer precision is needed and a larger unit when the quantity would otherwise require an unwieldy number.",
      applyTitle:"Estimate, measure and compare in common units",
      applyVisual:{type:"table",data:[["comparison","common form"],["1.25 m vs 118 cm","125 cm > 118 cm"],["2.4 kg vs 2 350 g","2 400 g > 2 350 g"],["1.5 L vs 1 480 mL","1 500 mL > 1 480 mL"],["18°C vs 24°C","24°C is 6°C warmer"]]},
      applyNote:"Convert only where it helps comparison. Record units, instrument precision and whether an estimate is reasonable.",
      terms:[["metric unit","standard SI-linked unit used for measurement"],["benchmark","familiar reference measurement used for estimation"],["precision","detail supported by the unit and instrument"]],
      mistakes:[["Unit chosen from object name rather than attribute","One object can have length, mass, capacity and temperature."],["Largest unit assumed most accurate","Precision depends on scale and purpose."],["Different units compared directly","Convert to a common unit."],["Estimate has no benchmark","Reference a known measurement or grouping."]],
      quick:["Choose a unit for desk length.","Estimate a 2 kg object.","Compare 1.25 m and 118 cm.","Choose an instrument for capacity.","Explain precision."],
      questions:{
        choice1:["Which unit best measures the mass of an apple?",["grams","litres","metres","degrees Celsius"]],
        fill1:["Complete the conversion.","1.25 m = {{blank}} cm"],
        choice2:["Which instrument is best for room length?",["measuring tape","thermometer","balance","measuring jug"]],
        explain:"Choose units and instruments for measuring a backpack’s height, mass and internal capacity. Explain each precision choice.",
        fill2:["Complete the capacity conversion.","1.5 L = {{blank}} mL"],
        apply:"Estimate, measure and compare three classroom objects using benchmarks. Discuss estimation error and instrument precision.",
        enrichment1:"Design a measurement decision guide that selects units and instruments from attribute, scale and required precision.",
        enrichment2:"Create a mixed-unit comparison problem involving all four attributes. Convert, order and explain why each common unit is efficient."
      }
    }),
    AC9M5M02:mk({
      slug:"ac9m5m02-solve-practical-problems-involving-the-perimeter-and-area-of",
      title:"Perimeter and Area of Regular and Irregular Shapes",
      subtitle:"Calculate exactly, decompose and approximate practical regions",
      desc:"solve practical problems involving the perimeter and area of regular and irregular spaces using appropriate metric units",
      learn:"Students distinguish boundary length from surface coverage, calculate regular shapes, decompose composite regions and approximate irregular spaces with stated assumptions and metric units.",
      core:"Perimeter uses linear units around a boundary; area uses square units covering a region.",
      modelTitle:"Calculate a composite L-shaped garden",
      modelVisual:{type:"table",data:[["decomposition","dimensions","area"],["large rectangle","8 m × 6 m","48 m²"],["removed rectangle","3 m × 2 m","6 m²"],["garden area","48 − 6","42 m²"],["perimeter","sum outer edges","24 m"]]},
      modelNote:"For area, subtract the missing rectangle. For perimeter, trace only the outer boundary and include the new internal corner edges.",
      applyTitle:"Approximate an irregular area on a grid",
      applyVisual:{type:"compare",data:[["whole squares","count exactly"],["partial squares","combine halves or use a consistent threshold"],["perimeter","trace boundary and estimate curved segments"],["report","state approximately and give unit/range"]]},
      applyNote:"An approximation is defensible when the grid scale, partial-square rule and uncertainty are stated.",
      terms:[["perimeter","distance around a boundary"],["area","surface covered in square units"],["decomposition","breaking a shape into simpler parts"]],
      mistakes:[["Interior grid lines included in perimeter","Trace only the external boundary."],["Linear units used for area","Write cm² or m²."],["Missing rectangle added instead of removed","Check the physical region represented."],["Approximation reported as exact","State method and uncertainty."]],
      quick:["Find area of an L-shape.","Trace a composite perimeter.","Choose m² for a garden.","Approximate partial squares.","Explain perimeter versus area."],
      questions:{
        choice1:["A large 8 m × 6 m rectangle has a 3 m × 2 m corner removed. What is the remaining area?",["42 m²","54 m²","48 m²","36 m²"]],
        fill1:["Complete the unit.","The area of a classroom floor is measured in square {{blank}}."],
        choice2:["Which method is appropriate for an irregular area on a grid?",["Count full squares and combine partial squares consistently","Count only boundary marks","Use linear centimetres","Claim an exact value without a scale"]],
        explain:"Draw or describe an L-shape, calculate its area and perimeter and explain why different decompositions give the same area.",
        fill2:["Complete the rectangle area.","12 m × 7 m = {{blank}} m²"],
        apply:"Plan turf for an irregular school garden using a scale grid. Estimate area, calculate boundary fencing and state uncertainty.",
        enrichment1:"Create two shapes with the same area but substantially different perimeters. Explain the design relationship.",
        enrichment2:"Develop upper and lower estimates for a curved region on a grid, then recommend a practical material quantity including waste allowance."
      }
    }),
    AC9M5M03:mk({
      slug:"ac9m5m03-solve-problems-involving-converting-between-12-and-24-hour-time",
      title:"12-hour and 24-hour Time",
      subtitle:"Convert notation and solve schedules and elapsed-time problems",
      desc:"solve problems involving converting between 12- and 24-hour time",
      learn:"Students convert times around noon and midnight, read schedules and calculate elapsed time using timelines while distinguishing a clock time from a duration.",
      core:"In 24-hour time, hours after noon continue 13–23; midnight begins 00:00 and noon is 12:00.",
      modelTitle:"Convert between 12-hour and 24-hour notation",
      modelVisual:{type:"table",data:[["12-hour","24-hour"],["12:00 am","00:00"],["7:05 am","07:05"],["12:00 pm","12:00"],["3:40 pm","15:40"],["11:59 pm","23:59"]]},
      modelNote:"For pm times after 12:59, add 12 to the hour. For 13:00–23:59, subtract 12 and label pm.",
      applyTitle:"Use timelines for schedule duration",
      applyVisual:{type:"flow",data:["depart 14:35","to 15:00: +25 min","to 17:00: +2 h","arrive 17:18: +18 min","duration 2 h 43 min"]},
      applyNote:"Do not subtract time digits as ordinary decimals. Bridge through whole hours and check whether the interval crosses noon or midnight.",
      terms:[["12-hour time","clock system using am and pm"],["24-hour time","clock system numbering hours from 00 to 23"],["duration","elapsed amount of time between events"]],
      mistakes:[["12 am and 12 pm reversed","12 am is midnight; 12 pm is noon."],["Add 12 to every pm hour","Do not add 12 to 12 pm."],["Minutes treated as hundredths","An hour has 60 minutes."],["Leading zero omitted in formal 24-hour time","Write 07:05 for schedule clarity."]],
      quick:["Convert 3:40 pm.","Convert 00:25.","Explain noon and midnight.","Find 14:35 to 17:18.","Read a timetable."],
      questions:{
        choice1:["What is 3:40 pm in 24-hour time?",["15:40","03:40","13:40","27:40"]],
        fill1:["Complete the conversion.","00:25 = 12:25 {{blank}}"],
        choice2:["Which time is noon?",["12:00","00:00","24:00 am","12:00 am"]],
        explain:"Use a timeline to find the duration from 14:35 to 17:18 and explain each jump.",
        fill2:["Complete the morning time.","7:05 am = {{blank}}:05 in 24-hour notation."],
        apply:"A flight departs at 22:50 and arrives at 01:35 the next day. Find the duration and explain the midnight crossing.",
        enrichment1:"Create a full-day timetable using both notations. Include two duration questions crossing noon and midnight.",
        enrichment2:"Compare two travel schedules with waiting times and connections. Convert all times, calculate total duration and justify the better option."
      }
    }),
    AC9M5M04:mk({
      slug:"ac9m5m04-estimate-construct-and-measure-angles-in-degrees-using-appropriate",
      title:"Estimating, Constructing and Measuring Angles",
      subtitle:"Use degrees, benchmarks and a protractor accurately",
      desc:"estimate, construct and measure angles in degrees using appropriate tools, including a protractor, and relate these measures to angle names",
      learn:"Students estimate from 90°, 180° and 360° benchmarks, align a protractor correctly, select the correct scale and classify measured angles by name.",
      core:"Angle measure is the amount of turn between rays, expressed in degrees; arm length and orientation do not change it.",
      modelTitle:"Measure an angle with a protractor",
      modelVisual:{type:"sequence",data:[["Vertex","place at protractor centre"],["Baseline","align one ray with 0° line"],["Scale","choose scale starting at that ray"],["Read","follow other ray to degree mark"],["Check","estimate category before accepting"]]},
      modelNote:"An estimated acute angle cannot reasonably measure 130°. Benchmark classification is an essential error check.",
      applyTitle:"Construct angles from a stated measure",
      applyVisual:{type:"table",data:[["measure","name","benchmark"],["35°","acute","less than 90°"],["90°","right","quarter turn"],["125°","obtuse","between 90° and 180°"],["180°","straight","half turn"],["245°","reflex","greater than 180°"]]},
      applyNote:"For reflex angles, a standard semicircular protractor may measure the smaller interior angle first; subtract from 360° when the larger turn is required.",
      terms:[["degree","unit measuring angle or turn"],["protractor","tool marked in degrees for measuring and constructing angles"],["baseline","reference ray aligned with the protractor zero line"]],
      mistakes:[["Vertex not at centre","The centre mark must match the angle vertex."],["Wrong protractor scale read","Start from the zero aligned with the baseline ray."],["Arm length affects measure","Only turn matters."],["Reflex angle read as smaller angle","Clarify which turn is required."]],
      quick:["Estimate 70°.","Measure with correct scale.","Construct 125°.","Classify 245°.","Explain a reflex calculation."],
      questions:{
        choice1:["Where should the protractor centre be placed?",["on the angle vertex","at the ray endpoint only","anywhere on the page","on the degree label"]],
        fill1:["Complete the angle name.","125° is an {{blank}} angle."],
        choice2:["If the smaller angle is 115°, what is the reflex angle between the same rays?",["245°","65°","475°","115°"]],
        explain:"Describe every step for measuring an angle and how an estimate detects a wrong-scale reading.",
        fill2:["Complete the turn benchmark.","A straight angle measures {{blank}}°."],
        apply:"Construct and label angles of 38°, 90°, 147° and 225°. Explain the tool or calculation used for each.",
        enrichment1:"Design a protractor error-analysis task with four incorrect diagrams. Explain each alignment or scale error.",
        enrichment2:"Create a composite turn route whose successive angles total more than one revolution. Calculate net orientation and justify."
      }
    })
  };

  window.SkillrYear5Register("maths",S,Object.keys(S));
})();
