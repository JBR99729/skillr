"use strict";
const raw=[
[25,"Applied exponent contexts","Product law check","Which uses exponent laws correctly?",["3² × 3³ = 3⁶","3² × 3³ = 3⁵","3² × 3³ = 3¹","3² × 3³ = 3⁹"],1,"Same base multiplication means add exponents: 3² × 3³ = 3⁵.","Do not multiply the exponents for a product."],
[26,"Same-base requirement","Valid product law expression","Which expression can use the product law for powers with the same base?",["2³ × 3³","2³ × 2⁵","3² ÷ 4²","5² + 5³"],1,"2³ × 2⁵ has the same base, so the product law applies.","Exponent product and quotient laws require the same base."],
[27,"Same-base requirement","Different bases","Why can't 2³ × 3⁴ be simplified by adding exponents?",["The exponents are too large","The bases are different","The exponents are negative","A zero exponent is involved"],1,"The product law aᵐ × aⁿ = aᵐ⁺ⁿ applies only when the bases are the same.","Check the base before applying a rule."],
[28,"Same-base requirement","Valid quotient rule expression","Which can be simplified using the quotient rule?",["4³ ÷ 2³","4³ ÷ 4²","3² ÷ 5²","2³ ÷ 3³"],1,"4³ ÷ 4² has the same base, so use the quotient rule.","The base must match."],
[29,"Same-base requirement","Digital tool generalisation","Digital tools show that aᵐ × aⁿ = aᵐ⁺ⁿ only when:",["m = n","a = 1","The bases are equal","The exponents are equal"],2,"The product law depends on multiplying powers of the same base.","Same base first, then add exponents."],
[30,"Same-base requirement","Valid exponent law expression","Which expression is valid for applying exponent laws directly?",["7² + 7³","7² × 7³","7² + 8²","7² ÷ 8²"],1,"7² × 7³ has the same base and multiplication, so the product law applies.","Addition is not an exponent law operation."],
[31,"Zero exponent logic","Why zero power is one","Why is n⁰ = 1 for n ≠ 0?",["Because n = 0","Because dividing equal powers gives 1","Because exponents add","Because n is negative"],1,"n⁴ ÷ n⁴ = 1, but the quotient rule gives n⁴⁻⁴ = n⁰, so n⁰ = 1.","Zero exponent comes from equal powers divided."],
[32,"Zero exponent logic","Zero exponent from quotient","Which expression shows a zero exponent?",["3⁴ ÷ 3⁴","3⁴ ÷ 3³","3⁴ ÷ 3²","3⁴ ÷ 3¹"],0,"3⁴ ÷ 3⁴ = 3⁴⁻⁴ = 3⁰.","Subtract equal exponents to get 0."],
[33,"Zero exponent logic","Evaluate zero power","What is 8⁰?",["0","1","8","Undefined"],1,"8⁰ = 1 because 8 is non-zero.","Any non-zero base to the power 0 equals 1."],
[34,"Zero exponent logic","Evaluate larger base zero power","What is 100⁰?",["0","1","100","10"],1,"100⁰ = 1 because the base is non-zero.","The size of the base does not matter."],
[35,"Zero exponent logic","True zero exponent statement","Which is true?",["3⁰ = 0","3⁰ = 3","3⁰ = 1","3⁰ = 10"],2,"3⁰ = 1 for any non-zero base.","Zero exponent does not mean the answer is zero."],
[36,"Zero exponent logic","Expression equal to one","Which expression equals 1?",["5¹","5⁰","5²","5⁻¹"],1,"5⁰ = 1.","At Year 8, treat zero exponent as the key idea here."],
[37,"Zero exponent logic","Quotient to zero power","Which simplifies to 7⁰?",["7³ ÷ 7³","7³ ÷ 7²","7³ ÷ 7¹","7³ ÷ 7⁰"],0,"7³ ÷ 7³ = 7³⁻³ = 7⁰.","Equal exponents subtract to zero."],
[38,"Zero exponent logic","Power equal to one","Which equals 1?",["9²","9¹","9⁰","9⁻¹"],2,"9⁰ = 1 because 9 is non-zero.","The zero exponent result is 1."],
[39,"Zero exponent logic","General zero exponent rule","Which is correct for n ≠ 0?",["n⁰ = n","n⁰ = 0","n⁰ = 1","n⁰ = n²"],2,"For any non-zero n, n⁰ = 1.","Remember the non-zero base condition."],
[40,"Zero exponent logic","Need for zero exponent","Which shows why the zero exponent is necessary?",["3⁴ = 3²","3⁴ ÷ 3⁴ = 1","3⁴ ÷ 3³ = 3","3⁴ ÷ 3² = 9"],1,"3⁴ ÷ 3⁴ equals 1 and also gives 3⁰ by the quotient rule, so 3⁰ must equal 1.","This links division and zero exponent logic."]
];
window.skillrTestQuestions=raw.map(([n,section,skill,question,answers,correct,summary,hint])=>({id:`ac9m8n02-t-${String(n-24).padStart(3,"0")}`,curriculumCode:"AC9M8N02",bank:"test",section,sourceNumber:n,skill,printable:true,type:"single",question,audioPrompt:question,visual:"",visualHtml:"",visualMeta:{type:"none",alt_text:""},answers,correct,explanation:`${summary}\nHint: ${hint}`,structuredExplanation:{summary,hint},qualitySchema:"production-v1"}));
window.skillrExamQuestions=window.skillrTestQuestions;
window.quizQuestions=window.skillrTestQuestions;
