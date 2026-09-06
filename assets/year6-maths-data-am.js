(() => {
  "use strict";
  if (!window.SkillrYear6Register) throw new Error("Year 6 curriculum base is not loaded.");

  const S = {
    AC9M6A01: {
      slug:"ac9m6a01-and-use-rules-that-generate-visually-growing-patterns-and-number",
      title:"Growing Patterns and Rational-number Rules",
      subtitle:"Connect visual growth, term values and direct or recursive rules",
      desc:"recognise and use rules that generate visually growing patterns and number patterns involving rational numbers",
      learn:"Students identify what changes and what remains constant, represent patterns in tables and diagrams, use recursive and direct rules and test whether a rule generates every term.",
      modelTitle:"Connect a growing tile pattern to a rule",
      modelVisual:{type:"table",data:[["term n","1","2","3","4","n"],["tiles","5","8","11","14","3n + 2"],["growth","","+3","+3","+3","constant +3"]]},
      modelNote:"The recursive rule adds 3 each term. The direct rule 3n + 2 gives any term without generating all previous terms.",
      applyTitle:"Extend patterns involving fractions and decimals",
      applyVisual:{type:"compare",data:[["0.5, 1.0, 1.5, 2.0","add 0.5; term = 0.5n"],["3/4, 1, 1 1/4, 1 1/2","add 1/4; term = n/4 + 1/2"],["visual border growth","count repeated section plus fixed corners"],["digital table","test many terms after defining rule"]]},
      applyNote:"A rule must fit the visual structure and all known terms. Equivalent forms of a rational rule may look different but produce the same values.",
      terms:[["recursive rule","rule describing how to get the next term"],["direct rule","rule connecting term number directly to term value"],["constant difference","same additive change between consecutive terms"]],
      mistakes:[["Rule describes only the next term","A direct rule should work for any term number."],["Constant part omitted","Visual patterns often contain repeated growth plus fixed pieces."],["Rule accepted from two terms only","Test several terms and the visual structure."],["Term number confused with term value","Keep input n separate from output."]],
      quick:["Find the next two terms.","Write a recursive rule.","Test 3n + 2.","Describe fixed and growing parts.","Extend a decimal pattern."],
      questions:{
        choice1:["Which direct rule generates 5, 8, 11, 14 for n = 1,2,3,4?",["3n + 2","3n","n + 4","5n − 2"]],
        fill1:["Complete the recursive rule.","Start at 5 and add {{blank}} each term."],
        choice2:["What is term 20 of 3n + 2?",["62","60","65","23"]],
        fill2:["Complete the rational pattern.","3/4, 1, 1 1/4, {{blank}}"],
        apply:"A border pattern has 4 fixed corner tiles and adds 6 edge tiles per stage. Write recursive and direct rules and find stage 25.",
        enrichment1:"Create two visually different growing patterns with the same number rule. Explain how the structures correspond.",
        enrichment2:"Find two different algebraic-looking rules that are equivalent for all positive integer terms and prove equivalence."
      }
    },
    AC9M6A02: {
      slug:"ac9m6a02-find-unknown-values-in-numerical-equations-involving-brackets",
      title:"Unknown Values with Brackets and Mixed Operations",
      subtitle:"Use equality, operation properties and inverse reasoning",
      desc:"find unknown values in numerical equations involving brackets and combinations of arithmetic operations, using the properties of numbers and operations",
      learn:"Students interpret equality as balance, follow grouping, identify the role of the unknown and use inverse operations or number properties before substituting to check.",
      modelTitle:"Solve 4(□ + 7) = 100",
      modelVisual:{type:"sequence",data:[["Interpret","4 equal groups total 100"],["Undo ×4","□ + 7 = 25"],["Undo +7","□ = 18"],["Substitute","4(18 + 7) = 100"],["Confirm","both sides equal"]]},
      modelNote:"Undo operations in reverse order while respecting brackets. The method follows the structure of the expression rather than moving symbols without meaning.",
      applyTitle:"Use properties to simplify before solving",
      applyVisual:{type:"compare",data:[["6(□ + 4) = 180","divide by 6, then subtract 4"],["3□ + 5□ = 96","combine like multiplicative groups: 8□ = 96"],["5(20 − □) = 35","divide, then solve 20 − □ = 7"],["(□ + 8) ÷ 4 = 9","multiply by 4, then subtract 8"]]},
      applyNote:"The unknown may appear in a subtracted position, so operation order and meaning matter. Always check in the original equation.",
      terms:[["brackets","symbols grouping an expression as one unit"],["inverse operation","operation that reverses another"],["substitution","replacing the unknown with a proposed value"]],
      mistakes:[["Operations undone in written order","Undo the outer operation first."],["Bracket ignored","Treat the grouped expression as one quantity."],["Subtraction assumed commutative","20 − x is not x − 20."],["Check performed on a simplified but altered equation","Substitute into the original."]],
      quick:["Solve 4(x+7)=100.","Solve 5(20−x)=35.","Combine 3x+5x.","Explain reverse order.","Substitute and check."],
      questions:{
        choice1:["What is the unknown in 4(□ + 7) = 100?",["18","32","7","25"]],
        fill1:["Complete the first inverse step.","4(□ + 7) = 100, so □ + 7 = {{blank}}."],
        choice2:["What is the unknown in (□ + 8) ÷ 4 = 9?",["28","44","1","36"]],
        fill2:["Complete the combination.","3□ + 5□ = {{blank}}□."],
        apply:"Solve 7(3 + x) − 14 = 70 and verify by substitution, explaining every inverse step.",
        enrichment1:"Create three equations with brackets that all have solution 12 but require different operation sequences.",
        enrichment2:"Compare solving by inverse operations with solving by expanding brackets for 5(x + 6) = 95."
      }
    },
    AC9M6A03: {
      slug:"ac9m6a03-and-use-algorithms-involving-a-sequence-of-steps-and-decisions",
      title:"Algorithms, Decisions and Emerging Patterns",
      subtitle:"Create, trace, debug and generalise number-generating processes",
      desc:"create and use algorithms involving a sequence of steps and decisions that use rules to generate sets of numbers; identify, interpret and explain emerging patterns",
      learn:"Students write complete algorithms with inputs, ordered operations, decisions, loops and stopping conditions, then analyse output sets and test generalisations.",
      modelTitle:"Trace an even–odd decision algorithm",
      modelVisual:{type:"sequence",data:[["Input","n from 1 to 12"],["Decision","Is n even?"],["Even branch","output 3n"],["Odd branch","output 3n + 1"],["Record","place output in table"],["Analyse","compare parity and differences"]]},
      modelNote:"Every possible input needs a defined path. Output patterns depend on both the arithmetic rule and which inputs follow each branch.",
      applyTitle:"Debug and use loops",
      applyVisual:{type:"table",data:[["problem","repair"],["no ‘no’ branch","define action for false condition"],["loop never stops","add stopping condition"],["step order ambiguous","number instructions and define operations"],["pattern from 3 outputs","test more inputs and seek reasoning"],["digital result only","trace sample inputs manually"]]},
      applyNote:"A program or spreadsheet can generate many outputs, but explanation requires identifying why the pattern emerges.",
      terms:[["decision","condition selecting between paths"],["loop","repeated sequence of steps"],["stopping condition","rule ending repetition"]],
      mistakes:[["Only the yes branch defined","Include every outcome."],["Order of operations unspecified","Use exact language and brackets."],["Loop has no stopping condition","Ensure termination."],["Output pattern described without input rule","Connect pattern to algorithm structure."]],
      quick:["Trace inputs 1–6.","Add a missing branch.","Write a stopping condition.","Describe output parity.","Test a conjecture."],
      questions:{
        choice1:["What must a decision algorithm provide?",["A next step for every possible condition outcome","Only the preferred branch","A random output","No stopping rule ever"]],
        fill1:["Complete the odd branch.","If n is odd, output 3n + {{blank}}."],
        choice2:["Why does a loop need a stopping condition?",["To ensure it eventually ends","To make every output even","To remove inputs","To reverse all operations"]],
        fill2:["Complete the debugging action.","Trace sample inputs step by step to locate the first incorrect {{blank}}."],
        apply:"Create an algorithm generating multiples of 4 or numbers one more than multiples of 4 depending on input parity. Analyse the output sets.",
        enrichment1:"Design two different algorithms that produce identical outputs for inputs 1–5 but diverge later. Explain why broader testing matters.",
        enrichment2:"Create a terminating loop that repeatedly transforms a rational number and investigate an emerging pattern."
      }
    },
    AC9M6M01: {
      slug:"ac9m6m01-convert-between-common-metric-units-of-length-mass-and-capacity",
      title:"Metric Conversions with Decimal Measurements",
      subtitle:"Choose units, convert by place value and interpret precision",
      desc:"convert between common metric units of length, mass and capacity; choose and use decimal representations of metric measurements relevant to the context of a problem",
      learn:"Students connect metric prefixes and powers of ten, convert without changing the measured quantity and choose a decimal representation appropriate to the context and instrument precision.",
      modelTitle:"Convert across related metric units",
      modelVisual:{type:"table",data:[["quantity","larger unit","smaller unit"],["length","2.375 m","2 375 mm"],["mass","3.48 kg","3 480 g"],["capacity","1.625 L","1 625 mL"],["length","0.045 km","45 m"]]},
      modelNote:"Multiplying or dividing the numeral compensates for changing unit size. A smaller unit needs a larger numeral for the same measurement.",
      applyTitle:"Choose useful decimal precision",
      applyVisual:{type:"compare",data:[["road distance","2.35 km more useful than 2 350 m"],["object thickness","4.6 mm more useful than 0.0046 m"],["medicine volume","mL and instrument precision matter"],["shipping mass","kg or tonnes based on scale"]]},
      applyNote:"Do not report more decimal places than the instrument supports. Preserve exact conversions before rounding for presentation.",
      terms:[["metric prefix","prefix such as milli-, centi- or kilo- indicating scale"],["conversion","rewriting the same quantity in another unit"],["precision","measurement detail justified by instrument and purpose"]],
      mistakes:[["Numeral changes in the wrong direction","Smaller units produce larger numerals."],["Quantity and unit both changed inconsistently","Use a conversion relationship."],["Rounding before conversion","Keep exact value until final presentation."],["False precision added","Match instrument capability."]],
      quick:["Convert 2.375 m to mm.","Convert 3.48 kg to g.","Choose a unit for thickness.","Explain conversion direction.","State precision limit."],
      questions:{
        choice1:["What is 2.375 m in millimetres?",["2 375 mm","237.5 mm","23 750 mm","0.002375 mm"]],
        fill1:["Complete the mass conversion.","3.48 kg = {{blank}} g."],
        choice2:["Which unit is most suitable for a thin card’s thickness?",["millimetres","kilometres","litres","kilograms"]],
        fill2:["Complete the capacity conversion.","1.625 L = {{blank}} mL."],
        apply:"A route is 2.75 km, 480 m and 0.625 km. Find total distance in kilometres and metres and discuss a suitable reported precision.",
        enrichment1:"Create a conversion chain using at least four metric units where the final numeral returns to a simple decimal.",
        enrichment2:"Analyse a measurement report with inconsistent units and false precision, then produce a corrected version."
      }
    },
    AC9M6M02: {
      slug:"ac9m6m02-establish-the-formula-for-the-area-of-a-rectangle-and",
      title:"Establishing and Applying the Rectangle Area Formula",
      subtitle:"Connect arrays, multiplication, units and composite practical regions",
      desc:"establish the formula for the area of a rectangle and use it to solve practical problems",
      learn:"Students derive area from rows and columns of square units, explain A = length × width and apply it to missing dimensions, composite spaces and material estimates.",
      modelTitle:"Derive A = l × w from a square-unit array",
      modelVisual:{type:"table",data:[["rectangle","rows","squares per row","area"],["6 cm × 4 cm","4","6","24 cm²"],["l × w","w rows","l per row","lw square units"]]},
      modelNote:"The formula summarises repeated counting of square units. Units are squared because area measures two-dimensional coverage.",
      applyTitle:"Solve practical and missing-dimension problems",
      applyVisual:{type:"compare",data:[["floor 8 m × 5.5 m","44 m²"],["area 72 m², width 8 m","length = 9 m"],["L-shape","large rectangle − missing rectangle"],["tiles","area ÷ tile area; round for whole tiles and waste"]]},
      applyNote:"Check dimensions use compatible units and distinguish area, perimeter and material quantity.",
      terms:[["area","measure of surface coverage in square units"],["dimension","measured length defining a shape"],["composite region","region formed from simpler shapes"]],
      mistakes:[["Perimeter formula used","Area counts covering; perimeter traces boundary."],["Units not squared","Use cm², m² and related square units."],["Length and width in different units","Convert before multiplying."],["Tile count left fractional","Interpret whole items and allowance."]],
      quick:["Derive 6×4 area.","Find a missing dimension.","Decompose an L-shape.","Convert before area.","Interpret tile count."],
      questions:{
        choice1:["What is the area of an 8 m × 5.5 m rectangle?",["44 m²","27 m²","13.5 m²","88 m"]],
        fill1:["Complete the formula.","A = length × {{blank}}."],
        choice2:["A rectangle has area 72 m² and width 8 m. What is its length?",["9 m","64 m","80 m","576 m"]],
        fill2:["Complete the unit.","A 6 cm × 4 cm rectangle has area 24 {{blank}}."],
        apply:"A room is 6.2 m by 4.5 m. Flooring boxes cover 2.4 m². Find boxes required and include a 10% waste allowance.",
        enrichment1:"Design two rectangles with equal area but different perimeters and explain the relationship.",
        enrichment2:"Derive a formula for the area of a rectangular frame by subtracting an inner rectangle, then apply it."
      }
    },
    AC9M6M03: {
      slug:"ac9m6m03-interpret-and-use-timetables-and-itineraries-to-plan-activities",
      title:"Timetables, Itineraries and Journey Duration",
      subtitle:"Plan connected activities and account for waiting, transfer and overnight time",
      desc:"interpret and use timetables and itineraries to plan activities and determine the duration of events and journeys",
      learn:"Students read 12- and 24-hour schedules, connect services, calculate elapsed time across noon or midnight and test whether an itinerary meets transfer, opening-time and duration constraints.",
      modelTitle:"Build a connected journey itinerary",
      modelVisual:{type:"table",data:[["stage","depart","arrive","duration / wait"],["bus","08:35","09:12","37 min"],["transfer","09:12","09:28","16 min"],["train","09:28","11:05","1 h 37 min"],["total","08:35","11:05","2 h 30 min"]]},
      modelNote:"Total journey duration includes waiting and transfer time, not only travel stages. Confirm that the connection is achievable.",
      applyTitle:"Plan activities under timetable constraints",
      applyVisual:{type:"flow",data:["identify fixed times","calculate durations","include travel/transition","check overlap","allow buffer","select feasible itinerary","communicate plan"]},
      applyNote:"A plan may be mathematically possible but impractical without preparation or delay allowance. State assumptions about time zones and dates where relevant.",
      terms:[["timetable","scheduled times for repeated services or events"],["itinerary","planned sequence of activities and journeys"],["transfer time","interval between connected journey stages"]],
      mistakes:[["Travel times added but waits omitted","Include every interval from start to finish."],["Clock digits subtracted as decimals","Use 60-minute hours and timelines."],["Arrival before departure ignored","Check date, midnight and time zone."],["Minimum transfer assumed safe","Consider practical buffer when planning."]],
      quick:["Find 08:35–11:05.","Calculate a transfer wait.","Check overlap.","Cross midnight.","Add a practical buffer."],
      questions:{
        choice1:["What is the total duration from 08:35 to 11:05?",["2 h 30 min","3 h 30 min","2 h 70 min","1 h 30 min"]],
        fill1:["Complete the transfer wait.","09:12 to 09:28 = {{blank}} minutes."],
        choice2:["Which itinerary is feasible?",["A connection departing after arrival plus required transfer time","A service leaving before arrival","Two overlapping events","A negative waiting time"]],
        fill2:["Complete the duration.","22:45 to 00:20 next day = {{blank}} h {{blank}} min."],
        apply:"Plan a day using three activities and two transport services. Include durations, transfer buffers and a justification of feasibility.",
        enrichment1:"Compare two multi-mode itineraries using travel time, cost, transfer risk and arrival constraints.",
        enrichment2:"Create an overnight international-style itinerary with a stated time-zone change and explain every conversion assumption."
      }
    },
    AC9M6M04: {
      slug:"ac9m6m04-the-relationships-between-angles-on-a-straight-line-angles-at",
      title:"Angle Relationships on Lines and at Points",
      subtitle:"Use straight, full-turn and vertically opposite relationships to find unknowns",
      desc:"identify and use the relationships between angles on a straight line, angles at a point and vertically opposite angles to solve problems",
      learn:"Students use 180° on a straight line, 360° at a point and equality of vertically opposite angles, combining relationships without relying only on visual appearance.",
      modelTitle:"Connect three fundamental angle relationships",
      modelVisual:{type:"table",data:[["relationship","equation"],["straight line","a + b = 180°"],["angles at a point","a + b + c + … = 360°"],["vertically opposite","a = c and b = d"],["right angle","parts total 90°"]]},
      modelNote:"The diagram may not be drawn to scale. Mark the relevant relationship and write an equation before calculating.",
      applyTitle:"Solve linked unknown-angle problems",
      applyVisual:{type:"angles",data:[[55,"55°"],[125,"125° supplement"],[90,"right"],[235,"reflex at point"]]},
      applyNote:"A single problem may require vertically opposite equality followed by a straight-line sum or a full-turn total.",
      terms:[["supplementary angles","angles with total 180°"],["vertically opposite angles","opposite angles formed by intersecting lines"],["angles at a point","angles around a point totalling 360°"]],
      mistakes:[["Diagram measured instead of relationship used","Use given values and geometric facts."],["Adjacent and vertically opposite confused","Opposite angles do not share a side."],["180° used around a point","A full turn totals 360°."],["Reflex angle omitted","Include the stated turn region."]],
      quick:["Find a supplement.","Use vertical opposites.","Sum at a point.","Write an equation.","Check 360° total."],
      questions:{
        choice1:["An angle on a straight line is 55°. What is the adjacent angle?",["125°","55°","305°","35°"]],
        fill1:["Complete the straight-line equation.","55° + x = {{blank}}°."],
        choice2:["If one angle formed by intersecting lines is 72°, what is its vertically opposite angle?",["72°","108°","288°","18°"]],
        fill2:["Complete the point relationship.","Angles around a point total {{blank}}°."],
        apply:"Four angles around a point are x, x, 80° and 110°. Find x and explain the equation.",
        enrichment1:"Create a multi-step intersecting-line problem requiring all three relationships and provide a proof-style solution.",
        enrichment2:"Analyse an incorrect solution that assumes a diagram is to scale and repair it using marked relationships."
      }
    }
  };

  window.SkillrYear6Register("maths", S, Object.keys(S));
})();
