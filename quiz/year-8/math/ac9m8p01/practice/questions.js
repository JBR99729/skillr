"use strict";
const raw=[
["Complementary events","If the probability of winning a prize is 0.37, what is the probability of not winning?",["0.37","0.63","0.73","0.57"],1,"Complementary probabilities sum to 1, so 1 − 0.37 = 0.63."],
["Complementary events","A supermarket promotion gives a rare toy with probability 0.12. What is the probability of not getting the rare toy?",["0.78","0.88","0.92","0.12"],1,"Use 1 − 0.12 = 0.88."],
["Complementary events","The probability of a storm is 0.28. What is the probability of no storm?",["0.62","0.72","0.78","0.82"],1,"Use 1 − 0.28 = 0.72."],
["Complementary events","If Pr(A)=0.64, what is Pr(not A)?",["0.36","0.46","0.64","1.64"],0,"Pr(not A)=1−0.64=0.36."],
["Complementary events","The probability of receiving any toy in a promotion is 0.85. What is the probability of receiving no toy?",["0.05","0.10","0.15","0.25"],2,"No toy is the complement of receiving a toy: 1−0.85=0.15."],
["Complementary events","The probability of drawing a rare card is 0.03. What is the probability of not drawing a rare card?",["0.07","0.93","0.97","0.03"],2,"1−0.03=0.97."],
["Complementary events","A machine fails during a shift with probability 0.18. What is the probability it does not fail during the shift?",["0.72","0.82","0.88","0.92"],1,"1−0.18=0.82."],
["Complementary events","A team wins a match with probability 0.55. What is the probability it does not win?",["0.35","0.45","0.55","0.65"],1,"The complement of winning is not winning, so 1−0.55=0.45."],
["Complementary events","The probability of drawing a blue marble is 0.41. What is the probability of not drawing blue?",["0.49","0.59","0.61","0.69"],1,"1−0.41=0.59."],
["Complementary events","The probability that a website crashes during a test is 0.07. What is the probability it stays online?",["0.93","0.87","0.83","0.97"],0,"1−0.07=0.93."],
["Complement formula","What is the probability of not rolling a 6 on a fair six-sided die?",["1/6","5/6","4/6","2/6"],1,"Five of the six outcomes are not 6, so the probability is 5/6."],
["Complement formula","If the probability of rain is 0.8, what is the probability of no rain?",["0.1","0.2","0.3","0.4"],1,"1−0.8=0.2."],
["Complement formula","For a fair coin, Pr(heads)=0.5. What is Pr(not heads)?",["0.25","0.5","0.75","1"],1,"Not heads means tails, so the probability is 0.5."],
["Complement formula","If Pr(A)=0.92, what is Pr(not A)?",["0.08","0.12","0.18","0.28"],0,"1−0.92=0.08."],
["Complement formula","If Pr(A)=3/8, what is Pr(not A)?",["5/8","3/5","8/3","1/8"],0,"1−3/8=5/8."],
["Complement formula","If Pr(A)=0.37, what is Pr(not A)?",["0.57","0.63","0.67","0.73"],1,"1−0.37=0.63."],
["Complement formula","If Pr(A)=68%, what is Pr(not A)?",["22%","32%","42%","52%"],1,"100%−68%=32%."],
["Complement formula","For any event A and its complement, Pr(A)+Pr(not A) equals:",["0","0.5","1","2"],2,"An event and its complement exhaust all possibilities, so their probabilities sum to 1."],
["Complement formula","If Pr(A)=0.04, what is Pr(not A)?",["0.94","0.96","0.98","0.99"],1,"1−0.04=0.96."],
["Complement formula","If Pr(A)=0.91, what is Pr(not A)?",["0.09","0.19","0.29","0.39"],0,"1−0.91=0.09."],
["Multi-event probability","What is the probability of rolling a 5 or a 6 on a fair six-sided die?",["1/6","1/4","1/3","1/2"],2,"There are 2 favourable outcomes out of 6, so 2/6=1/3."],
["Multi-event complement","What is the probability of rolling neither 5 nor 6 on a fair six-sided die?",["1/3","2/3","1/2","5/6"],1,"The complement of rolling 5 or 6 is 1−1/3=2/3."],
["Exhaustive events","A standard deck contains only red or black cards. What is Pr(red or black)?",["1/4","1/2","3/4","1"],3,"Red and black together cover every card in the deck, so the probability is 1."],
["Multi-event complement","What is the probability of not drawing an ace from a standard 52-card deck?",["4/52","48/52","1/13","1/52"],1,"There are 48 non-aces, so the probability is 48/52=12/13."]
];
window.skillrPracticeQuestions=raw.map((r,i)=>({id:`ac9m8p01-p-${String(i+1).padStart(3,"0")}`,curriculumCode:"AC9M8P01",bank:"practice",section:i<10?"E1":i<20?"E2":"E3",sourceNumber:i+1,skill:r[0],printable:true,type:"single",question:r[1],audioPrompt:r[1],visual:"",visualHtml:"",visualMeta:{type:"none",alt_text:""},answers:r[2],correct:r[3],explanation:r[4],structuredExplanation:{summary:r[4],hint:"Use the complement rule Pr(not A)=1−Pr(A), and check whether the listed outcomes exhaust the sample space."},qualitySchema:"production-v1"}));
window.quizQuestions=window.skillrPracticeQuestions;
