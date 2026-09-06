"use strict";
const q=(id,skill,question,answers,correct,summary,hint)=>({id,curriculumCode:"AC9M7N07",bank:"test",skill,printable:true,type:"single",question,audioPrompt:question,answers,correct,explanation:`${summary}\nHint: ${hint}`,structuredExplanation:{summary,hint},qualitySchema:"production-v2"});
window.skillrTestQuestions=[
q("ac9m7n07-t-001","ordering","Which list is ordered from least to greatest?",["−14, −6, 0, 3, 9","−6, −14, 0, 3, 9","9, 3, 0, −6, −14","−14, 0, −6, 3, 9"],0,"Numbers increase as you move right on a number line.","Order negatives first, then zero, then positives."),
q("ac9m7n07-t-002","magnitude","Which statement is true?",["−15 has greater magnitude than 12","−15 is greater than 12","12 and −15 have equal magnitude","Magnitude of −15 is −15"],0,"|−15|=15, which is greater than 12.","Magnitude is distance from zero."),
q("ac9m7n07-t-003","difference","What is the distance between −11 and 6?",["17","5","−17","11"],0,"6−(−11)=17.","Distance is non-negative."),
q("ac9m7n07-t-004","integer subtraction","Evaluate −13 − (−8).",["−5","−21","5","21"],0,"−13+8=−5.","Subtracting a negative becomes addition."),
q("ac9m7n07-t-005","integer addition","Evaluate −17 + 9.",["−8","8","−26","26"],0,"Opposite signs: 17−9=8 and the larger magnitude is negative.","Compare magnitudes."),
q("ac9m7n07-t-006","multi-step","Evaluate 9 − 14 − (−6) + (−3).",["−2","4","−14","2"],0,"9−14+6−3=−2.","Rewrite subtraction of negatives first."),
q("ac9m7n07-t-007","temperature application","A town is −7°C at 6 am. It warms by 9°C, then cools by 5°C. Final temperature?",["−3°C","7°C","−21°C","3°C"],0,"−7+9−5=−3°C.","Translate rises and falls into signed operations."),
q("ac9m7n07-t-008","bank balance","A balance is −$24. A deposit of $40 is followed by a $19 payment. What is the balance?",["−$3","$35","$3","−$83"],0,"−24+40−19=−3.","Work through each transaction in order."),
q("ac9m7n07-t-009","elevation","A lift starts on floor −3, rises 8 floors, then descends 6 floors. Where does it stop?",["−1","5","11","−17"],0,"−3+8−6=−1.","Rising is positive; descending is negative."),
q("ac9m7n07-t-010","error analysis","A student claims −4−(−9)=−13. What is the correct evaluation?",["5","−13","13","−5"],0,"−4−(−9)=−4+9=5.","Subtracting a negative reverses the direction."),
q("ac9m7n07-t-011","unknown integer","Find x if x−(−6)=−2.",["−8","4","8","−4"],0,"x+6=−2, so x=−8.","Rewrite the subtraction first."),
q("ac9m7n07-t-012","unknown integer","Find x if −7+x=5.",["12","−12","2","−2"],0,"x=12 because −7+12=5.","Think about the movement needed from −7 to 5."),
q("ac9m7n07-t-013","comparison reasoning","Which statement must be true if a<b?",["a lies to the left of b on a number line","|a|<|b|","a and b have different signs","a is negative"],0,"a<b means a is positioned to the left of b.","Inequality compares value, not necessarily magnitude."),
q("ac9m7n07-t-014","displacement vs distance","A diver moves from −20 m to −5 m, then to −18 m. What total distance is travelled?",["28 m","2 m","13 m","38 m"],0,"Distance is 15+13=28 m.","Add absolute changes, not final displacement."),
q("ac9m7n07-t-015","multi-step context","A game score starts at 4. Penalties change it by −7, −5 and +9. What is the final score?",["1","−17","15","−1"],0,"4−7−5+9=1.","Treat each score change as a signed integer."),
q("ac9m7n07-t-016","challenge","Two integers have a difference of 12 and one is −7. Which could be the other integer?",["5 or −19","5 only","−19 only","19 or −5"],0,"Numbers 12 units from −7 are 5 and −19.","Distance 12 means move 12 right or 12 left.")];
window.quizQuestions=window.skillrTestQuestions;