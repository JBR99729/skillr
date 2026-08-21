"use strict";
const raw=[
["A triangular prism has triangle base 14 cm, perpendicular triangle height 8 cm and prism length 9 cm. Find its volume.",["252 cm³","504 cm³","1008 cm³","126 cm³"],1,"Cross-section area=56 cm²; 56×9=504 cm³."],
["A prism has volume 728 cm³ and length 14 cm. What is its cross-sectional area?",["42 cm²","52 cm²","56 cm²","104 cm²"],1,"728÷14=52 cm²."],
["A rectangular prism has volume 960 cm³, width 8 cm and height 10 cm. Find its length.",["10 cm","12 cm","14 cm","16 cm"],1,"960÷(8×10)=12 cm."],
["A triangular prism has volume 420 cm³ and length 10 cm. Its triangular base is 14 cm. Find the perpendicular height of the triangle.",["3 cm","6 cm","8 cm","12 cm"],1,"Cross-section area=42; ½×14×h=42 gives h=6."],
["Prism A has B=36 cm²,h=8 cm. Prism B has B=24 cm²,h=12 cm. Which statement is correct?",["A is larger","B is larger","Volumes are equal","Cannot tell"],2,"Both are 288 cm³."],
["A prism's base area rises by 25% and its perpendicular length rises by 20%. By what percentage does volume change?",["20%","25%","45%","50%"],3,"1.25×1.20=1.50, so volume rises 50%."],
["A tank has base area 3.6 m² and depth 1.5 m. What volume does it hold?",["2.4 m³","5.1 m³","5.4 m³","7.2 m³"],2,"3.6×1.5=5.4 m³."],
["A 7.2 m³ tank is filled to 75% capacity. How much water is in it?",["1.8 m³","5.4 m³","6.0 m³","9.6 m³"],1,"0.75×7.2=5.4 m³."],
["A prism has cross-sectional area 0.32 m² and length 250 cm. Find volume in m³.",["0.08","0.8","8","80"],1,"250 cm=2.5 m; 0.32×2.5=0.8 m³."],
["A student uses surface area instead of cross-sectional area in V=Bh. Why is this wrong?",["Surface area includes all outside faces rather than one constant cross-section","Surface area is always smaller","Surface area has cubic units","Volume never uses area"],0,"V=Bh requires one cross-sectional area, not total external area."],
["If a prism is sheared while cross-sectional area and perpendicular separation remain fixed, which quantity definitely remains unchanged?",["Surface area","Volume","Slanted edge length","Perimeter of side faces"],1,"Volume remains Bh."],
["A prism has B=45 cm² and h=16 cm. To keep volume constant while h increases to 20 cm, what must B become?",["36 cm²","40 cm²","48 cm²","56.25 cm²"],0,"Original V=720; 720÷20=36 cm²."],
["A building floor is 240 m² and each storey is 3.2 m high. Estimate the enclosed volume for 5 identical storeys.",["1200 m³","3840 m³","768 m³","2400 m³"],1,"Total height=16 m; 240×16=3840 m³."],
["Which unit is appropriate for prism volume when all lengths are measured in millimetres?",["mm","mm²","mm³","m³ only"],2,"Volume uses cubic units."],
["A prism has volume 1500 cm³ and B=75 cm². If its length is reduced by 4 cm while B stays fixed, what is the new volume?",["900 cm³","1200 cm³","1500 cm³","1800 cm³"],1,"Original h=20 cm; new h=16 cm; V=75×16=1200 cm³."],
["A triangular prism and a rectangular prism both have length 20 cm and volume 1200 cm³. What must be true?",["They have equal cross-sectional areas","They have equal perimeters","They have equal side lengths","They have identical shapes"],0,"B=V/h=60 cm² for both."]
];
window.skillrTestQuestions=raw.map((r,i)=>({id:`ac9m7m02-t-${String(i+1).padStart(3,'0')}`,curriculumCode:'AC9M7M02',bank:'test',skill:'prism volume reasoning',printable:true,type:'single',question:r[0],audioPrompt:r[0],visual:'',visualHtml:'',visualMeta:{type:'none',alt_text:''},answers:r[1],correct:r[2],explanation:`${r[3]}\nHint: Use V = cross-sectional area × perpendicular prism length.`,structuredExplanation:{summary:r[3],hint:'Use V = cross-sectional area × perpendicular prism length.'},qualitySchema:'production-v1'}));
