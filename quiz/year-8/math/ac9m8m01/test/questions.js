"use strict";
const rawTest = [
  {section:"AC9M8M01_E3", skill:"perimeter accuracy using smaller units", q:"A curved boundary measured using centimetre segments gives 128 cm. Using millimetre segments gives 1310 mm. Which measurement is usually more accurate?", a:["128 cm","1310 mm","Both are equally accurate","Neither measurement is useful"], c:1, e:"Smaller segments usually follow the curve more closely, so the millimetre-segment measurement is usually more accurate."},
  {section:"AC9M8M01_E3", skill:"area accuracy using smaller grid squares", q:"A shape measured with a 1 cm² grid gives 64 squares. A 5 mm by 5 mm grid gives 260 small squares. What area does the refined grid estimate?", a:["64 cm²","65 cm²","260 cm²","130 cm²"], c:1, e:"Each 5 mm by 5 mm square is 0.5 cm × 0.5 cm = 0.25 cm². Area = 260 × 0.25 = 65 cm²."},
  {section:"AC9M8M01_E3", skill:"why small line segments improve perimeter", q:"Why does using smaller line segments improve the perimeter estimate of an irregular boundary?", a:["They reduce area","They follow curves more closely","They automatically increase length","They remove irregularities"], c:1, e:"Smaller segments can trace bends and curves more closely than longer straight segments."},
  {section:"AC9M8M01_E3", skill:"grid refinement calculation", q:"A shape is estimated as 25 cm² using a 1 cm² grid. With a 0.5 cm by 0.5 cm grid, 108 small squares are counted. What is the refined area estimate?", a:["25 cm²","27 cm²","108 cm²","54 cm²"], c:1, e:"Each small square is 0.25 cm². Area = 108 × 0.25 = 27 cm²."},
  {section:"AC9M8M01_E3", skill:"curved boundary accuracy", q:"A curved boundary measured with 1 cm segments is 40 cm. Using 2 mm segments gives 46 cm. Why is the second method usually better?", a:["It is longer","It captures small bends more closely","It uses fewer segments","It reduces the actual size"], c:1, e:"The shorter segments better follow the curve, so they capture small bends that longer segments miss."},
  {section:"AC9M8M01_E3", skill:"choosing the most accurate grid", q:"Which grid is likely to give the most accurate estimate of an irregular area?", a:["1 cm² grid","0.5 cm by 0.5 cm grid","2 cm² grid","5 cm² grid"], c:1, e:"The 0.5 cm by 0.5 cm grid has smaller squares, so it gives finer coverage of the boundary."},
  {section:"AC9M8M01_E3", skill:"perimeter estimate using millimetres", q:"Using millimetres instead of centimetres can improve perimeter estimates because:", a:["Millimetres are smaller units","Millimetres reduce area","Millimetres increase area","Millimetres remove curves"], c:0, e:"Smaller units allow a closer trace of irregular or curved boundaries."},
  {section:"AC9M8M01_E3", skill:"area from refined grid units", q:"A shape measured with a 0.25 cm by 0.25 cm grid has 1100 small squares covered. What is the estimated area?", a:["72 cm²","68.75 cm²","275 cm²","18 cm²"], c:1, e:"Each small square has area 0.25 × 0.25 = 0.0625 cm². Area = 1100 × 0.0625 = 68.75 cm²."},
  {section:"AC9M8M01_E3", skill:"meaning of measurement precision", q:"Increasing measurement precision usually means:", a:["Using larger units","Using smaller units","Using fewer units","Using random units"], c:1, e:"Smaller units usually reduce rounding and boundary-estimation error."},
  {section:"AC9M8M01_E3", skill:"choosing a grid for coastline area", q:"Which grid is best for measuring a highly irregular coastline shape, assuming all are practical to use?", a:["10 cm squares","5 cm squares","1 cm squares","1 mm squares"], c:3, e:"The 1 mm grid has the smallest units, so it can represent the irregular boundary most precisely."},
  {section:"AC9M8M01_E1", skill:"area of rectangle plus semicircle", q:"A water tank base is a rectangle 6 m by 3 m with a semicircle on one short side. The semicircle has diameter 3 m. Use π ≈ 3.14. What is the approximate area?", a:["21.53 m²","25.07 m²","19.57 m²","27.42 m²"], c:0, e:"Rectangle area = 18. Semicircle radius = 1.5, so area = 1/2 × 3.14 × 1.5² = 3.5325. Total ≈ 21.53 m²."},
  {section:"AC9M8M01_E3", skill:"why square millimetres improve accuracy", q:"Why does using square millimetres instead of square centimetres improve area accuracy for an irregular shape?", a:["They reduce the area","They follow curves better","They provide more detailed coverage","They increase perimeter"], c:2, e:"Smaller square units give more detailed coverage around the boundary."},
  {section:"AC9M8M01_E3", skill:"coastline measurement comparison", q:"A coastline measured with 1 cm segments is 320 cm. The same coastline measured with 2 mm segments is 380 cm. Which is usually more accurate?", a:["320 cm","380 cm","Both are exactly equal","Cannot tell because smaller units are never useful"], c:1, e:"The 2 mm segments can follow the irregular coastline more closely."},
  {section:"AC9M8M01_E1", skill:"area of square plus rectangle", q:"A composite shape is made of a 7 cm by 7 cm square and a 7 cm by 3 cm rectangle. What is the area?", a:["70 cm²","63 cm²","77 cm²","56 cm²"], c:0, e:"Area = 7 × 7 + 7 × 3 = 49 + 21 = 70 cm²."},
  {section:"AC9M8M01_E3", skill:"refined grid estimate", q:"A shape measured with a 1 cm² grid is estimated as 40 cm². A refined 0.25 cm² grid counts 180 covered squares. Which area is the refined estimate?", a:["40 cm²","45 cm²","Both equal","180 cm²"], c:1, e:"Refined area = 180 × 0.25 = 45 cm²."},
  {section:"AC9M8M01_E2", skill:"swamp spray area estimate", q:"A swamp covers 68 full squares and 22 half squares on a 1 m² grid. What is the approximate area?", a:["79 m²","68 m²","90 m²","56 m²"], c:0, e:"22 half squares count as 11 full squares. Area ≈ 68 + 11 = 79 m²."}
];
window.skillrTestQuestions = rawTest.map((item, index) => ({
  id: `ac9m8m01-t-${String(index + 1).padStart(3, "0")}`,
  curriculumCode: "AC9M8M01",
  bank: "test",
  section: item.section,
  sourceNumber: index + 25,
  skill: item.skill,
  printable: true,
  type: "single",
  question: item.q,
  audioPrompt: item.q,
  visual: "",
  visualHtml: "",
  visualMeta: { type: "none", alt_text: "" },
  answers: item.a,
  correct: item.c,
  explanation: item.e,
  structuredExplanation: { summary: item.e, hint: "Use the correct unit size, then multiply by the number of units counted." },
  qualitySchema: "production-v1"
}));
window.skillrExamQuestions = window.skillrTestQuestions;
window.quizQuestions = window.skillrTestQuestions;
