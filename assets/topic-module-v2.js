(() => {
  "use strict";
  if (window.__skillrTopicModuleV2RegistryLoaded) return;
  window.__skillrTopicModuleV2RegistryLoaded = true;

  const year7MathsSynthesis = {
    AC9M7N01:["A square courtyard has area 196 m². Find its side length and perimeter, and explain why the negative square root is not used for the side length.","Side length = √196 = 14 m, so the perimeter is 56 m. A physical length is non-negative, so the principal square root is used."],
    AC9M7N02:["Two flashing lights repeat every 72 s and 90 s. Use prime factorisation to find when they next flash together, showing the prime powers you use.","72 = 2³×3² and 90 = 2×3²×5. The LCM is 2³×3²×5 = 360, so they flash together after 360 s."],
    AC9M7N03:["A number is written as 6×10⁵ + 4×10³ + 9×10 + 2. Write the numeral and explain the role of the zero place holders.","The numeral is 604 092. Zero placeholders keep the hundred-thousands-to-ones place values aligned where no coefficient is present."],
    AC9M7N04:["Order −0.6, −5/8, 55% and 0.58 from least to greatest. Convert to a common representation and justify the order.","−5/8 = −0.625, so −0.625 < −0.6 < 0.55 < 0.58. Therefore −5/8, −0.6, 55%, 0.58."],
    AC9M7N05:["A distance is reported as 8.4 km correct to the nearest 0.1 km. Give the interval of possible actual distances and decide whether 8.46 km could have produced the report.","The actual distance satisfies 8.35 ≤ d < 8.45 km. Therefore 8.46 km could not round to 8.4 km to the nearest 0.1 km."],
    AC9M7N06:["A jacket costs $80. It is reduced by 15%, then a $6 delivery fee is added. Find the final cost and explain why adding 15 to 80 would be incorrect.","15% of $80 is $12, so the discounted price is $68; adding $6 gives $74. A percentage is a proportion of the original amount, not a raw dollar amount."],
    AC9M7N07:["At 6 am the temperature is −4°C. It rises 9°C, falls 6°C, then rises 3°C. Find the final temperature and represent the changes as one integer calculation.","−4 + 9 − 6 + 3 = 2, so the final temperature is 2°C."],
    AC9M7N08:["A sports drink uses concentrate and water in the ratio 2:7. How much of each is needed to make 3.6 L, and how do you know the ratio is preserved?","There are 9 equal parts, so each part is 3.6÷9 = 0.4 L. Concentrate = 0.8 L and water = 2.8 L; 0.8:2.8 simplifies to 2:7."],
    AC9M7N09:["Plan A gives 25% off a $240 item plus a $12 fee. Plan B gives 18% off with no fee. Which is cheaper, by how much, and what assumptions are you making?","Plan A costs $240×0.75+$12 = $192. Plan B costs $240×0.82 = $196.80. Plan A is cheaper by $4.80, assuming the discounts apply to the same original price and there are no other fees."],
    AC9M7A01:["A taxi fare is C = 4.50 + 2.20d, where d is kilometres travelled. Find the cost of a 13 km trip and explain what each number in the formula represents.","C = 4.50 + 2.20×13 = $33.10. The 4.50 is the fixed charge and 2.20 is the cost per kilometre."],
    AC9M7A02:["A rectangle has length 3x+2 and width x−1. Write an expression for its perimeter, simplify it, and explain why brackets matter.","P = 2(3x+2)+2(x−1) = 8x+2. Brackets ensure both terms in each side length are doubled."],
    AC9M7A03:["Solve 5x+7=42 using equal operations on both sides, then verify your solution by substitution.","Subtract 7: 5x=35. Divide by 5: x=7. Check: 5×7+7=42, so the solution is verified."],
    AC9M7A04:["A distance–time graph rises from (0,0) to (2,6), stays flat to (4,6), then rises to (6,14). Describe what each segment means and identify which moving segment is steeper.","From 0–2 h the object moves 6 km; from 2–4 h it is stationary; from 4–6 h it moves 8 km. The last moving segment is steeper because its rate is 4 km/h versus 3 km/h."],
    AC9M7A05:["A growing pattern follows y=3x+1. Generate values for x=0,1,2,3, plot the ordered pairs mentally or on paper, and explain what 3 and 1 mean.","The points are (0,1), (1,4), (2,7), (3,10). The 3 is the increase in y for each increase of 1 in x; the 1 is the starting value when x=0."],
    AC9M7A06:["For A=lw, keep w=4 cm and let l take values 2,4,6,8 cm. Create the value table, describe the pattern, then predict what happens if both l and w are doubled.","Areas are 8,16,24,32 cm², so A increases by 8 cm² whenever l increases by 2 cm. Doubling both l and w multiplies area by 4."],
    AC9M7M01:["A parallelogram has base 12 cm and perpendicular height 7 cm. A triangle with base 8 cm and height 5 cm is cut from it. Find the remaining area and state the correct units.","Parallelogram area = 84 cm²; triangle area = 20 cm²; remaining area = 64 cm²."],
    AC9M7M02:["A triangular prism has triangular cross-section base 6 cm, perpendicular height 4 cm and prism length 10 cm. Find its volume and explain why multiplying 6×4×10 directly is wrong.","Cross-section area = 1/2×6×4 = 12 cm², so volume = 12×10 = 120 cm³. Direct multiplication misses the 1/2 in the triangle area."],
    AC9M7M03:["A circular garden has circumference 31.4 m. Using π≈3.14, estimate its diameter and radius, then state the exact relationships used.","d = C/π = 10 m and r = 5 m. The relationships are C=πd and d=2r."],
    AC9M7M04:["Two parallel lines are cut by a transversal. One angle is 68°. Find an alternate angle and the adjacent co-interior partner, naming the relationship used for each.","The alternate angle is 68°. The co-interior partner is 180°−68° = 112°. Alternate angles are equal and co-interior angles sum to 180° when the lines are parallel."],
    AC9M7M05:["A pentagon has four interior angles 112°, 95°, 130° and 108°. Find the fifth angle by first determining the pentagon's interior-angle sum.","A pentagon has (5−2)×180° = 540°. The known angles total 445°, so the fifth angle is 95°."],
    AC9M7M06:["A map scale is 1:25 000. Two locations are 7.6 cm apart on the map. Find the actual distance in kilometres and explain the unit conversion.","7.6×25 000 = 190 000 cm = 1 900 m = 1.9 km."],
    AC9M7SP01:["A block object has a 3-by-2 rectangular top view, but only four cubes are visible from the front. Explain why the top and front views alone may not determine a unique 3D object.","Different cube heights or hidden cubes can produce the same top and front outlines. More information, such as a side view or height labels, is needed for a unique reconstruction."],
    AC9M7SP02:["Classify a quadrilateral with four equal sides and four right angles using every valid class name, and explain why giving only 'square' is incomplete.","It is a square, rectangle, rhombus, parallelogram and quadrilateral. Inclusive classification means a shape belongs to every broader class whose defining properties it satisfies."],
    AC9M7SP03:["Triangle A has vertices (1,1), (4,1), (2,3). Reflect it in the y-axis. Give the image coordinates and state one property preserved by the transformation.","The image vertices are (−1,1), (−4,1), (−2,3). Lengths and angles are preserved, while orientation is reversed."],
    AC9M7SP04:["An algorithm says: rotate a shape 90° clockwise about the origin, repeat 4 times, then stop. Explain the final position and identify the condition that guarantees the algorithm terminates.","Four 90° rotations total 360°, so the shape returns to its starting position. The fixed repeat count of 4 is the termination condition."],
    AC9M7ST01:["For the data 4, 5, 5, 7, 9, 10, 16, calculate the mean, median and range, then explain which statistic is most affected by the value 16.","Mean = 56/7 = 8, median = 7, range = 12. The mean and range are strongly affected by the high value 16; the median is less affected."],
    AC9M7ST02:["Two classes both have median score 68. Class A ranges from 52 to 84; Class B ranges from 64 to 73. Compare the distributions using centre and spread without claiming they are 'the same'.","The centres are equal by median, but Class A has much greater spread. Class B is more tightly clustered, so equal medians do not mean equal distributions."],
    AC9M7ST03:["A school surveys only students in the library at lunchtime about preferred sports. Identify the sampling problem and propose a better method for estimating the whole school's preference.","The sample is biased because library users may not represent the whole school. A random or stratified sample across year levels and locations would better represent the population."],
    AC9M7P01:["A spinner has 8 equal sectors: 3 red, 2 blue and 3 green. Find each colour probability and predict the expected number of blue results in 120 spins.","P(red)=3/8, P(blue)=2/8=1/4, P(green)=3/8. Expected blue results = 120×1/4 = 30."],
    AC9M7P02:["A fair coin simulation gives 7 heads in 10 trials and 503 heads in 1000 trials. Compare both relative frequencies with the theoretical probability and explain the difference.","The relative frequencies are 0.7 and 0.503, compared with theoretical 0.5. Larger samples usually show less relative variation, but an exact 0.5 is not guaranteed." ]
  };

  const modules = new Map();
  function register(module) {
    if (!module || module.schemaVersion !== "2.0" || !module.identity?.code) throw new Error("Invalid SkillrHub topic-module v2 payload.");
    const code = module.identity.code.toUpperCase();
    const synthesis = year7MathsSynthesis[code];
    if (module.identity.year === 7 && module.identity.subject === "Mathematics" && synthesis && module.practiceSheet?.questions) {
      if (module.practiceSheet.questions.length < 10) {
        module.practiceSheet.questions.push({id:`${code}-PS-10`,tier:3,prompt:synthesis[0],answer:synthesis[1],summary:"This synthesis problem combines the chapter's core representation, calculation and reasoning skills.",hint:"Represent the information first, then calculate, interpret and independently check the result."});
      }
      if (module.practiceSheet.questions.length > 10) module.practiceSheet.questions = module.practiceSheet.questions.slice(0,10);
      module.practiceSheet.sheets = [
        {slug:"topic-practice-1",title:"Topic Practice 1",questionIndices:[0,1,2,3,4]},
        {slug:"topic-practice-2",title:"Topic Practice 2",questionIndices:[5,6,7,8,9]}
      ];
    }
    modules.set(code, Object.freeze(module));
  }

  window.SkillrTopicModulesV2 = {register,get(code){return modules.get(String(code||"").toUpperCase());},all(){return [...modules.values()];}};
})();
