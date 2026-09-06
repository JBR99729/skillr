"use strict";
const raw=[
["E3","In a Venn diagram, exclusive OR corresponds to:",["Only the overlap","The non-overlap parts of A and B","The entire rectangle","Only the region outside both events"],1,"Exclusive OR includes A only and B only, but excludes the overlap."],
["E3","Inclusive OR corresponds to:",["A only","B only","A or B or both","Neither A nor B"],2,"Inclusive OR is the union A∪B, including the overlap."],
["E3","If P(A∩B) is greater than 0, then A and B are:",["Mutually exclusive","Non-exclusive","Complementary","Impossible"],1,"A positive intersection probability means the events can occur together."],
["E3","Event A is ‘student plays sport’ and event B is ‘student plays music’. These events are best described as:",["Mutually exclusive","Non-exclusive","Complementary","Impossible"],1,"A student may belong to both events."],
["E3","If A and B are mutually exclusive, then P(A∪B) equals:",["P(A)+P(B)","P(A)+P(B)-P(A∩B)","P(A)P(B)","P(A)-P(B)"],0,"For mutually exclusive events P(A∩B)=0, so the addition rule becomes P(A)+P(B)."],
["E3","If A and B overlap, which formula always gives P(A∪B)?",["P(A)+P(B)","P(A)+P(B)-P(A∩B)","P(A)P(B)","P(A)-P(B)"],1,"Subtract the overlap once because it was counted in both P(A) and P(B)."],
["E4","In a simplified two-throw hit/miss model, how many ordered outcomes are possible?",["2","3","4","5"],2,"The ordered outcomes are HH, HM, MH and MM."],
["E4","A two-way table crossing first-throw hit/miss with second-throw hit/miss has how many interior outcome cells?",["1","2","3","4"],3,"Two possibilities for each throw produce 2×2=4 cells."],
["E4","For a simplified Battendi-inspired probability model, assume independent throws with P(hit)=0.30 each time. What is P(two hits)?",["0.09","0.21","0.49","0.70"],0,"Under the stated independence assumption, 0.30×0.30=0.09."],
["E4","For the same independent model with P(hit)=0.30, what is P(at least one hit in two throws)?",["0.30","0.49","0.51","0.91"],2,"Use the complement: 1-P(no hits)=1-(0.70×0.70)=0.51."],
["E4","Let A be ‘first throw is a hit’ and B be ‘second throw is a hit’. Can A and B occur together?",["No, they are mutually exclusive","Yes, they are non-exclusive","No, they are complementary","No, they are impossible events"],1,"Both throws can be hits, so the events overlap."],
["E4","In the independent model with P(hit)=0.30, what is the probability of exactly one hit in two throws?",["0.21","0.42","0.49","0.70"],1,"Exactly one hit is HM or MH: 0.3×0.7 + 0.7×0.3 = 0.42."],
["E4","In the independent model with P(hit)=0.30, what is the probability of at least one hit?",["0.30","0.42","0.49","0.51"],3,"At least one hit includes HH, HM and MH, or use 1-0.7²=0.51."],
["E4","Why may branch probabilities be multiplied along a path in this two-throw tree diagram?",["Because the events overlap","Because the model states the throws are independent","Because the events are mutually exclusive","Because hit and miss are complements"],1,"Multiplication here is justified by the explicit independence assumption."],
["E4","In the independent model, what is P(first throw hit AND second throw miss)?",["0.09","0.21","0.42","0.49"],1,"P(H then M)=0.30×0.70=0.21."],
["E4","In the independent model, what is the probability of no hits in two throws?",["0.30","0.42","0.49","0.70"],2,"No hits means miss then miss: 0.70×0.70=0.49."]
];
window.skillrTestQuestions=raw.map((r,i)=>({id:`ac9m8p02-t-${String(i+1).padStart(3,"0")}`,curriculumCode:"AC9M8P02",bank:"test",section:r[0],sourceNumber:i+25,skill:"two-event probability, Venn diagrams and joint outcomes",printable:true,type:"single",question:r[1],audioPrompt:r[1],visual:"",visualHtml:"",visualMeta:{type:"none",alt_text:""},answers:r[2],correct:r[3],explanation:r[4],structuredExplanation:{summary:r[4],hint:"Check whether the events overlap, whether independence is stated, and whether the question asks for AND, OR, exactly one, at least one or neither."},qualitySchema:"production-v1"}));
window.skillrExamQuestions=window.skillrTestQuestions;
window.quizQuestions=window.skillrTestQuestions;
