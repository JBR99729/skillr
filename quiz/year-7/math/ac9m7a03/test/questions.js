"use strict";
const q=(id,skill,question,answers,correct,summary,hint)=>({id,curriculumCode:"AC9M7A03",bank:"test",skill,printable:true,type:"single",question,audioPrompt:question,answers,correct,explanation:`${summary}\nHint: ${hint}`,structuredExplanation:{summary,hint},qualitySchema:"production-v2"});
window.skillrTestQuestions=[
q("ac9m7a03-t-001","substitution","Which value satisfies 5x-7=38?",["9","8","7","10"],0,"5(9)-7=38.","Substitute or solve."),
q("ac9m7a03-t-002","linear equation","Solve 7x-11=24.",["5","4","6","7"],0,"7x=35, so x=5.","Add 11, then divide by 7."),
q("ac9m7a03-t-003","brackets","Solve 4(x-6)=40.",["16","10","14","12"],0,"x-6=10, so x=16.","Divide first, then add 6."),
q("ac9m7a03-t-004","verification","Which line correctly verifies x=9 for 3x+14=41?",["3(9)+14=41","3+9+14=26","27-14=13","9+14=23"],0,"Correct verification substitutes x=9 into the original equation.","Use the original equation unchanged."),
q("ac9m7a03-t-005","variables both sides","Solve 2x+5=3x-12.",["17","7","12","5"],0,"5=x-12, so x=17.","Subtract 2x, then add 12."),
q("ac9m7a03-t-006","balance reasoning","Solve 9x+18=4x+63.",["9","8","10","7"],0,"5x=45, so x=9.","Subtract 4x and 18 from both sides."),
q("ac9m7a03-t-007","backtracking","Solve 6x-27=45.",["12","10","9","14"],0,"6x=72, so x=12.","Reverse -27, then ×6."),
q("ac9m7a03-t-008","expand and solve","Solve 7(x-3)+5=61.",["11","10","12","9"],0,"7x-21+5=61 → 7x=77 → x=11.","Expand and combine constants."),
q("ac9m7a03-t-009","context equation","A number is multiplied by 8 then decreased by 19 to give 53. What is the number?",["9","8","10","7"],0,"8x-19=53 → 8x=72 → x=9.","Form the equation first."),
q("ac9m7a03-t-010","variables both sides","Solve 11x-7=6x+48.",["11","10","9","12"],0,"5x=55, so x=11.","Collect variable terms on one side."),
q("ac9m7a03-t-011","method choice","Which method is most direct for 4x-15=29?",["Backtrack: add 15, then divide by 4","Expand brackets first","Square both sides","Guess without checking"],0,"The equation is a simple two-step chain, so backtracking is efficient.","Reverse the operations."),
q("ac9m7a03-t-012","balance model","Why must the same operation be applied to both sides of an equation?",["To preserve equality","To make x positive","To remove all constants","To make both sides smaller"],0,"Doing the same operation preserves the balance.","Think of equal weights on a scale."),
q("ac9m7a03-t-013","error analysis","A student changes 5x+8=33 to 5x=33. What did they forget?",["Subtract 8 from both sides","Divide both sides by 5","Add 8 to both sides","Multiply by 5"],0,"The +8 must be undone on both sides.","Preserve equality while isolating the variable."),
q("ac9m7a03-t-014","reverse reasoning","An equation has solution x=6. Which equation is true?",["4x+7=31","5x-7=20","3x+14=35","2x+5=20"],0,"4(6)+7=31.","Substitute 6 into each option."),
q("ac9m7a03-t-015","context interpretation","A water-height model gives 5h+32=3h+88. What is h?",["28","24","30","22"],0,"2h=56, so h=28.","Collect h terms, then constants."),
q("ac9m7a03-t-016","solution meaning","After solving an equation, what is the strongest check?",["Substitute the value into the original equation","Repeat the same algebra from memory","Round the value","Choose the nearest option"],0,"Substitution confirms both sides are equal.","Check against the original equation, not a transformed one.")];
window.quizQuestions=window.skillrTestQuestions;