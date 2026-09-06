(() => {
  "use strict";
  if (!window.SkillrYear4MathsRegister) throw new Error("Year 4 Maths base data is not loaded.");
  window.SkillrYear4MathsRegister({
    AC9M4M01: {
      slug:"ac9m4m01-interpret-unmarked-and-partial-units-when-measuring-and",
      title:"Reading Scales, Partial Units and Digital Instruments",
      subtitle:"Interpret unmarked intervals and compare length, mass, capacity, duration and temperature",
      desc:"interpret unmarked and partial units when measuring and comparing attributes of length, mass, capacity, duration and temperature, using scaled and digital instruments and appropriate units",
      routine:"Identify attribute/unit → Read labelled endpoints → Count equal intervals → Find interval value → Read partial position → Record and compare",
      learn:"A scale can be read even when not every mark is labelled. The difference between labelled values is divided by the number of equal intervals, and measurements must include an appropriate unit.",
      model_title:"Determine the value of unlabelled intervals",
      model_visual:{type:"scale",min:0,max:1,intervals:10,value:0.7,label:"0.7 L = 700 mL"},
      model_note:"From 0 to 1 litre there are 10 equal intervals, so each interval is 0.1 L or 100 mL. Read spaces, not just the number of marks.",
      apply_title:"Interpret partial units across different instruments",
      apply_visual:{type:"table",rows:[["Instrument","Scale information","Reading"],["thermometer","20–30°C, 5 intervals","26°C at third mark"],["balance","0–2 kg, 4 intervals","1.5 kg at third mark"],["timer","digital","02:35 = 2 min 35 s"]]},
      apply_note:"The interval size changes from instrument to instrument. Digital displays still require unit interpretation and attention to place value or time notation.",
      quick_visual:{type:"cards",items:["difference ÷ intervals","read from zero/reference","estimate between marks","include unit","compare in common units"]},
      activities:[
        {title:"Mystery scale",text:"Label missing values on scales with different endpoints and interval counts, then explain the calculation.",visual:{type:"scale",min:200,max:500,intervals:6,value:350,label:"each interval = 50 g"}},
        {title:"Instrument stations",text:"Read a ruler, balance, measuring jug, thermometer and digital timer, recording values and units.",visual:{type:"strategy",items:[["ruler","length"],["balance","mass"],["jug","capacity"],["thermometer","temperature"],["timer","duration"]]}},
        {title:"Compare after conversion",text:"Convert related units before comparing measurements such as 1.25 L and 1 180 mL.",visual:{type:"table",rows:[["Measure A","Measure B","Comparison"],["1.25 L","1 180 mL","1 250 mL > 1 180 mL"],["1.4 kg","1 350 g","1 400 g > 1 350 g"]]}}
      ],
      mistakes:[
        ["Counting marks rather than intervals","Determine the spaces between labelled values."],
        ["Assuming every scale uses ones","Calculate the interval value from endpoints and number of intervals."],
        ["Comparing different units directly","Convert to a common unit first."],
        ["Digital display copied without interpretation","State whether 02:35 means time of day or a duration, and include units."]
      ],
      quick:["Find interval size from 0 to 1 L in 10 spaces.","Read 350 g on a 200–500 g scale with 50 g intervals.","Compare 1.25 L and 1 180 mL.","Interpret 02:35 on a timer.","Explain why marks and intervals differ."],
      mastery:["Calculate interval values","Read partial units","Use scaled/digital instruments","Convert related units","Record and compare accurately"],
      worksheet:[
        {type:"single",question:"A scale runs from 0 to 1 L in 10 equal intervals. What is each interval?",answers:["0.1 L","1 L","0.01 L","10 L"]},
        {type:"fill-blank",question:"Complete the equivalent measurement.",template:"0.7 L = {{blank}} mL"},
        {type:"single",question:"Which measurement is greater?",answers:["1.25 L","1 180 mL","They are equal","Cannot compare"]},
        {type:"text",question:"A thermometer is labelled 20°C and 30°C with 5 equal intervals. Explain the value of each interval and the third mark after 20°C."},
        {type:"match",question:"Match the instrument to the attribute.",matchLeft:["thermometer","balance","measuring jug"],matchRight:["capacity","temperature","mass"]},
        {type:"fill-blank",question:"Complete the comparison in common units.",template:"1.4 kg = {{blank}} g, so it is greater than 1 350 g."},
        {type:"text",question:"Explain how to interpret 02:35 on a digital timer and how it differs from 2:35 pm."},
        {type:"text",question:"A student counts 7 marks between 0 and 600 mL and says each interval is about 86 mL. Explain how to count intervals correctly if there are 6 spaces."},
        {type:"text",question:"Design a scale with labelled endpoints but unlabelled intermediate marks that has an interval value of 25 units. Provide three readings and solutions.",enrichment:true},
        {type:"text",question:"Compare three measurements expressed in mixed units of mass or capacity. Convert, order and explain why the chosen common unit is efficient.",enrichment:true}
      ]
    },
    AC9M4M02: {
      slug:"ac9m4m02-ways-of-measuring-and-approximating-the-perimeter-and-area-of",
      title:"Perimeter and Area of Shapes and Enclosed Spaces",
      subtitle:"Measure boundary length, cover surfaces and approximate irregular regions",
      desc:"recognise ways of measuring and approximating the perimeter and area of shapes and enclosed spaces, using appropriate formal and informal units",
      routine:"Identify boundary or surface → Choose unit → Measure/count → Calculate or approximate → Label units → Compare",
      learn:"Perimeter measures distance around a boundary in linear units. Area measures surface coverage in square units. Shapes can share an area but have different perimeters, or share a perimeter but have different areas.",
      model_title:"Compare perimeter and area on a grid",
      model_visual:{type:"area-grid",rows:4,cols:6,perimeter:20,area:24},
      model_note:"A 4 by 6 rectangle has area 24 square units and perimeter 4 + 6 + 4 + 6 = 20 units. Square units and linear units communicate different attributes.",
      apply_title:"Approximate an irregular enclosed space",
      apply_visual:{type:"table",rows:[["Grid square type","Counting strategy"],["fully inside","count 1"],["more than half inside","approximate 1"],["less than half inside","combine or omit consistently"],["boundary","trace for perimeter estimate"]]},
      apply_note:"Approximations should state a method and level of precision. Use the same square unit throughout and distinguish the boundary from the covered region.",
      quick_visual:{type:"cards",items:["perimeter = around","area = covering","cm vs cm²","count shared edges once","approximation needs method"]},
      activities:[
        {title:"Same area, new perimeter",text:"Build several rectangles with 24 square tiles and compare their perimeters.",visual:{type:"strategy",items:[["1 × 24","P = 50"],["2 × 12","P = 28"],["3 × 8","P = 22"],["4 × 6","P = 20"]]}},
        {title:"String and tiles",text:"Measure an object’s boundary with string and cover its surface with square units, then describe the difference.",visual:{type:"flow",items:["trace boundary","measure string","cover surface","count square units","compare attributes"]}},
        {title:"Irregular area estimate",text:"Overlay a grid on a leaf or playground plan and establish a consistent rule for partial squares.",visual:{type:"cards",items:["whole squares","paired halves","boundary uncertainty","reasonable range"]}}
      ],
      mistakes:[
        ["Perimeter and area formulas confused","Ask whether the problem concerns around or covering."],
        ["Area unit written as cm","Area uses square units such as cm²."],
        ["Internal grid lines counted in perimeter","Only the outer boundary contributes."],
        ["Approximation presented as exact","Use approximately and describe the method or range."]
      ],
      quick:["Find area and perimeter of a 5 × 7 rectangle.","Why can equal-area rectangles have different perimeters?","Choose units for a classroom floor area.","Approximate partial squares consistently.","Explain cm versus cm²."],
      mastery:["Distinguish perimeter/area","Calculate rectangles","Use formal/informal units","Approximate irregular regions","Compare shapes and justify"],
      worksheet:[
        {type:"single",question:"What is the area of a 4 by 6 rectangle?",answers:["24 square units","20 units","10 square units","48 units"]},
        {type:"fill-blank",question:"Complete the perimeter.",template:"A 5 by 7 rectangle has perimeter {{blank}} units."},
        {type:"single",question:"Which unit is suitable for the area of a book cover?",answers:["cm²","cm","mL","seconds"]},
        {type:"text",question:"Draw or describe two different rectangles with area 24 square units and compare their perimeters."},
        {type:"match",question:"Match the attribute to the description.",matchLeft:["perimeter","area","approximate area"],matchRight:["estimate covered region with partial squares","distance around a boundary","number of square units covering a surface"]},
        {type:"fill-blank",question:"Complete the area statement.",template:"A 9 by 3 rectangle covers {{blank}} square units."},
        {type:"text",question:"Explain why the internal lines of a tiled rectangle are not included in its perimeter."},
        {type:"text",question:"A student writes the area of a desk as 4 m. Explain the missing information and correct unit."},
        {type:"text",question:"Investigate every whole-number rectangle with area 36 square units. Order the perimeters and explain which rectangle minimises perimeter.",enrichment:true},
        {type:"text",question:"Create a method to estimate the area and perimeter of an irregular park on a grid map. State assumptions and a reasonable range for each result.",enrichment:true}
      ]
    }
  }, ["AC9M4M01","AC9M4M02"]);
})();
