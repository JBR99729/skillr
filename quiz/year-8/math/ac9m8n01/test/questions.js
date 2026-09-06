"use strict";
const raw=[
[25,"Historical π approximation","Which value is a historical approximation of π?",["√2","3.1415926","355/113","1.618"],2,"355/113 is a very accurate rational approximation of π.","A fraction can approximate an irrational number."],
[26,"Golden ratio equation","The golden ratio satisfies:",["φ = 1 + 1/φ","φ = 2φ","φ = φ − 1","φ = √φ"],0,"The golden ratio satisfies φ = 1 + 1/φ.","This relationship leads to φ ≈ 1.618."],
[27,"A-series paper and √2","Which shape or design system uses a √2 side ratio?",["A-series paper","Golden rectangle","Square","Regular pentagon"],0,"A-series paper uses the 1:√2 ratio.","The shape stays similar when folded in half."],
[28,"Circumference formula","The circumference formula is:",["C = 2r","C = πr","C = 2πr","C = πr²"],2,"Circumference is C = 2πr, or C = πd.","Area uses πr², not circumference."],
[29,"Circumference from diameter","A circle has diameter 10 cm. Its circumference is:",["10π","5π","20π","π"],0,"C = πd = 10π cm.","Use diameter directly when given."],
[30,"Area from radius","A circle has radius 7 cm. Its area is:",["7π","14π","49π","98π"],2,"A = πr² = π × 7² = 49π cm².","Square the radius."],
[31,"Constant circle ratio","Which ratio is constant for all circles?",["r/d","C/r","C/d","A/r"],2,"C/d is always π for every circle.","This is one way to define π."],
[32,"Diameter from circumference","If C = 31.4 cm, the diameter is approximately:",["5 cm","7 cm","10 cm","15 cm"],2,"d = C ÷ π ≈ 31.4 ÷ 3.14 = 10 cm.","Use C = πd."],
[33,"Circumference approximation","A circle has radius 3 cm. Its circumference is approximately:",["6 cm","9.42 cm","18.84 cm","28.26 cm"],2,"C = 2πr ≈ 2 × 3.14 × 3 = 18.84 cm.","Remember the factor 2."],
[34,"Area from diameter","A circle has diameter 8 cm. Its area is:",["16π","32π","64π","8π"],0,"The radius is 4 cm, so A = π × 4² = 16π cm².","Halve the diameter before finding area."],
[35,"Circle exact value","For a circle with rational non-zero diameter, the circumference is usually written exactly using:",["Diameter only","π","A terminating decimal","A whole number"],1,"C = πd, so the exact circumference is written using π.","Do not replace π with 3.14 unless approximating."],
[36,"Definition of π","Which statement is true?",["π = C/d","π = C/r","π = r/d","π = A/r"],0,"π is the circumference divided by the diameter of a circle.","C/d is constant for all circles."],
[37,"Area with irrational radius","If r = √2 cm, the area is:",["2π","√2π","π","4π"],0,"A = πr² = π(√2)² = 2π.","Square the radius first."],
[38,"Perfect square check","Which square root is rational?",["√18","√25","√30","√50"],1,"√25 = 5, so it is rational.","Perfect-square roots are rational."],
[39,"Comparing irrational numbers","Which comparison is correct?",["√8 < √7","√8 > √7","π < 3","√2 > 2"],1,"Since 8 > 7, √8 > √7.","Square root is increasing for positive numbers."],
[40,"Exact versus approximate","Which statement best distinguishes exact and approximate values?",["π is exactly 3.14","√2 is exactly 1.41","22/7 is a rational approximation to π","Every decimal approximation is irrational"],2,"22/7 is rational and approximates π, but it is not exactly π.","Rounded decimals are approximations."]
];
window.skillrTestQuestions=raw.map(([sourceNumber,skill,question,answers,correct,summary,hint],i)=>({id:`ac9m8n01-t-${String(i+1).padStart(3,"0")}`,curriculumCode:"AC9M8N01",bank:"test",section:sourceNumber<=27?"Section C — Golden ratio and historical π":"Section D — π, circles and exact values",sourceNumber,skill,printable:true,type:"single",question,audioPrompt:question,visual:"",visualHtml:"",visualMeta:{type:"none",alt_text:""},answers,correct,explanation:`${summary}\nHint: ${hint}`,structuredExplanation:{summary,hint},qualitySchema:"production-v1"}));
window.skillrExamQuestions=window.skillrTestQuestions;
window.quizQuestions=window.skillrTestQuestions;
