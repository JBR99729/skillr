"use strict";
const raw=[
["E1","At least one means:",["Exactly one","One or more","Zero or one","Only two"],1,"At least one includes one, two, three, and so on."],
["E1","Exclusive OR means:",["A or B or both","A and B","A or B but not both","Neither A nor B"],2,"Exclusive OR includes outcomes in A only or B only, but excludes the overlap."],
["E1","Inclusive OR means:",["A only","B only","A or B or both","Neither"],2,"Inclusive OR includes A only, B only, and the overlap A and B."],
["E1","‘A and B’ means:",["At least one occurs","Both occur","Only one occurs","Neither occurs"],1,"The word and refers to the intersection: both events occur."],
["E1","‘At least two heads’ in three coin tosses means:",["Exactly two heads","Exactly three heads","Two or three heads","One or two heads"],2,"At least two includes exactly two and exactly three."],
["E1","On a fair die, let A = even and B = prime. Which set is the exclusive-OR event A XOR B?",["{2}","{3,4,5,6}","{2,3,4,5,6}","{1,2,3,4,5,6}"],1,"Even outcomes are {2,4,6}, prime outcomes are {2,3,5}; excluding the overlap 2 leaves {3,4,5,6}."],
["E1","On a fair die, let A = even and B = prime. Which set is the inclusive-OR event A or B?",["{2}","{3,4,5,6}","{2,3,4,5,6}","{1,2,3,4,5,6}"],2,"Inclusive OR is the union of {2,4,6} and {2,3,5}, giving {2,3,4,5,6}."],
["E1","Event A is ‘even number’ and event B is ‘greater than 4’ on a fair die. Which outcome is in A AND B?",["2","4","6","3"],2,"Only 6 is both even and greater than 4."],
["E1","‘At least one success’ is the complement of:",["Exactly one success","Zero successes","All successes","Half the trials succeeding"],1,"The only way at least one success fails is if there are zero successes."],
["E1","Which formula gives the probability of exclusive OR for any two events A and B?",["P(A)+P(B)","P(A)+P(B)-P(A∩B)","P(A)+P(B)-2P(A∩B)","1-P(A∩B)"],2,"Adding P(A) and P(B) counts the overlap twice; exclusive OR removes both copies of the overlap."],
["E2","In a complete two-event probability table, the four cells A∩B, A∩Bᶜ, Aᶜ∩B and Aᶜ∩Bᶜ must sum to:",["0","0.5","1","2"],2,"The four cells are mutually exclusive and exhaustive, so their probabilities sum to 1."],
["E2","If A and B are mutually exclusive, then:",["P(A∩B)=0","P(A∩B)=1","P(A∩B)=P(A)+P(B)","P(A∩B)=P(A)P(B)"],0,"Mutually exclusive events cannot occur together, so their intersection has probability 0."],
["E2","P(A∩B)=0.12, P(A∩Bᶜ)=0.28 and P(Aᶜ∩B)=0.15. What is P(Aᶜ∩Bᶜ)?",["0.35","0.45","0.55","0.65"],1,"Subtract the three known cells from 1: 1-(0.12+0.28+0.15)=0.45."],
["E2","If the four cells of a complete two-event probability table sum to 0.94, the table is:",["Valid","Invalid","Necessarily mutually exclusive","Necessarily complementary"],1,"A complete probability table must total 1."],
["E2","P(A)=0.60 and P(A∩B)=0.25. What is P(A∩Bᶜ)?",["0.15","0.25","0.35","0.40"],2,"Event A is split into A∩B and A∩Bᶜ, so 0.60-0.25=0.35."],
["E2","If P(A∪B)=0.72, what is P(Aᶜ∩Bᶜ)?",["0.18","0.28","0.38","0.72"],1,"Neither A nor B is the complement of A∪B, so 1-0.72=0.28."],
["E2","If A and B are mutually exclusive, which formula is correct?",["P(A∪B)=P(A)+P(B)","P(A∪B)=P(A)P(B)","P(A∪B)=P(A)-P(B)","P(A∪B)=1-P(A)-P(B)"],0,"With no overlap, the addition rule reduces to P(A∪B)=P(A)+P(B)."],
["E2","P(A∩B)+P(A∩Bᶜ) equals:",["P(A)","P(B)","P(A∪B)","P(Aᶜ)"],0,"Those two disjoint cells partition event A."],
["E2","P(Aᶜ∩B)+P(Aᶜ∩Bᶜ) equals:",["P(A)","P(Aᶜ)","P(B)","P(A∪B)"],1,"Those two disjoint cells partition the complement of A."],
["E2","P(A)=0.70, P(B)=0.50 and P(A∩B)=0.30. What is P(Aᶜ∩Bᶜ)?",["0.10","0.20","0.30","0.40"],0,"P(A∪B)=0.70+0.50-0.30=0.90, so neither has probability 0.10."],
["E3","Mutually exclusive events are events that:",["Can occur together","Cannot occur together","Always occur together","Must each have probability 0"],1,"Mutually exclusive events have no common outcomes."],
["E3","For a single fair coin toss, the events ‘head’ and ‘tail’ are:",["Mutually exclusive and complementary","Non-exclusive","Independent","Neither exhaustive nor exclusive"],0,"A single toss cannot be both head and tail, and one of them must occur."],
["E3","The events ‘a student has blonde hair’ and ‘a student has blue eyes’ are generally:",["Mutually exclusive","Non-exclusive","Complementary","Impossible"],1,"A person can have both characteristics, so the events can overlap."],
["E3","In a Venn diagram, an overlap between event circles means the events are:",["Mutually exclusive","Non-exclusive","Complementary","Impossible"],1,"The overlap represents outcomes that belong to both events."]
];
window.skillrPracticeQuestions=raw.map((r,i)=>({id:`ac9m8p02-p-${String(i+1).padStart(3,"0")}`,curriculumCode:"AC9M8P02",bank:"practice",section:r[0],sourceNumber:i+1,skill:"two-event probability language and two-way tables",printable:true,type:"single",question:r[1],audioPrompt:r[1],visual:"",visualHtml:"",visualMeta:{type:"none",alt_text:""},answers:r[2],correct:r[3],explanation:r[4],structuredExplanation:{summary:r[4],hint:"Translate the event language carefully and identify overlap, union, intersection or complement before calculating."},qualitySchema:"production-v1"}));
window.quizQuestions=window.skillrPracticeQuestions;
