import fs from "node:fs";
import path from "node:path";

const root=path.resolve(import.meta.dirname,"..");
const sections=[
  ["Exact values and decimal approximations",[
    ["Why is √2 usually kept in surd form during a calculation?",["It makes the value larger","It keeps the calculation exact","It turns the result into an integer","It removes algebra"],1,"Exact surd notation avoids premature rounding error."],
    ["Which value approximates √2?",["2","1.414","1/2","4"],1,"√2 is approximately 1.414."],
    ["Which value approximates √3?",["1.732","3.000","1.414","2.236"],0,"√3 is approximately 1.732."],
    ["What can happen when an intermediate decimal is rounded too early?",["The final answer may lose accuracy","The answer becomes exact","The surd vanishes without error","The calculation becomes impossible"],0,"Later operations can compound the initial rounding error."],
    ["Which is an exact representation of √5?",["2.236","√5","2.24","2.2"],1,"√5 is exact; each listed decimal is rounded."],
    ["Exact surds help avoid rounding error.",["True","False"],0,"An exact surd preserves the value until approximation is required.","true-false"],
    ["Which answer is exact?",["1.414","1.73","√2","2.236"],2,"√2 is exact rather than rounded."],
    ["Which answer is an approximation?",["3√5","√12","2√3","3.464"],3,"3.464 is a rounded decimal."],
    ["What does exact representation mean?",["A rounded decimal","A value written without approximation","A number with two decimal places","A calculator display only"],1,"Exact representation has no rounding error."],
    ["Which expression keeps the value exact?",["√3 ≈ 1.732","√3 = 1.7","√3","√3 = 2"],2,"Leaving √3 as a surd preserves its exact value."]
  ]],
  ["Square-root misconceptions",[
    ["Which statement is valid in general?",["√(a+b)=√a+√b","√(a+b) is not generally √a+√b","√(a+b)=ab","√(a+b)=a+b"],1,"Square roots do not distribute over addition."],
    ["Evaluate √(9+16).",["7","25","5","√9+√16"],2,"√25=5."],
    ["Evaluate √9+√16.",["5","7","25","√25"],1,"3+4=7."],
    ["Which comparison disproves distribution over addition?",["√(9+16)=5 but √9+√16=7","√4=2","√25=5","√36=6"],0,"The two sides give different values."],
    ["Which rule is incorrect in general?",["√a·√b=√(ab)","(√a)²=a","√(a+b)=√a+√b","√9=3"],2,"The addition rule is false in general."],
    ["The step √(4+9)=√4+√9 is valid.",["True","False"],1,"Square roots do not distribute over addition."],
    ["Evaluate √(4+9).",["5","√13","2+3","13"],1,"The sum under the root is 13."],
    ["Evaluate √4+√9.",["√13","5","13","√36"],1,"2+3=5."],
    ["Which statement is true?",["√25=√9+√16","√(9+16)=√9+√16","√(9+16)≠√9+√16","5=7"],2,"The left side is 5 and the right side is 7."],
    ["The identity √a·√b=√(ab) is a rule for which operation?",["Addition","Subtraction","Multiplication","Rounding"],2,"It is the product rule for suitable non-negative values."]
  ]],
  ["Like and unlike surds",[
    ["Which pair contains like surds?",["3√2 and 4√2","√2 and √5","2√3 and 3√5","√7 and √11"],0,"Like surds have the same radicand."],
    ["Simplify 3√2+4√2.",["7√4","12√2","7√2","√14"],2,"Add the coefficients of like surds."],
    ["Why can 3√2+4√2 be combined?",["The coefficients differ","The radicands match","The answer is rational","The roots disappear"],1,"Both terms contain √2."],
    ["Enter the radicand in 5√7.",[],7,"The radicand is the number under the root sign.","number"],
    ["Which expression cannot be combined into one exact surd term?",["2√3+5√3","7√6−3√6","√2+√5","4√8+2√8"],2,"√2 and √5 are unlike surds."],
    ["Simplify 8√3−5√3.",["3√3","13√3","3√6","40√3"],0,"Subtract the coefficients."],
    ["Simplify 6√5+2√5.",["12√5","8√5","8√10","6√10"],1,"Add the coefficients of √5."],
    ["Which is the correct general rule?",["a√c+b√c=(a+b)√c","a√c+b√c=ab√c","a√c+b√c=(a+b)c","a√c+b√c=√(a+b+c)"],0,"The distributive law combines coefficients of like surds."],
    ["Simplify 10√7−4√7.",["6√7","14√7","40√7","6√14"],0,"10−4=6."],
    ["Which expression contains unlike surds?",["2√5+3√5","4√6−√6","7√2+5√3","9√11−2√11"],2,"The radicands 2 and 3 differ."]
  ]],
  ["Simplifying entire surds",[
    ["What should be done first when simplifying √45?",["Round it","Find a perfect-square factor","Add 45","Divide by 2"],1,"A perfect-square factor allows part of the root to be extracted."],
    ["Which is a perfect-square factor of 45?",["2","5","9","7"],2,"45=9×5."],
    ["Simplify √45.",["9√5","3√5","5√3","√9"],1,"√45=√(9×5)=3√5."],
    ["Simplify √20.",["2√5","5√2","4√5","10√2"],0,"√20=√(4×5)=2√5."],
    ["Simplify √80.",["8√10","4√5","2√10","16√5"],1,"√80=√(16×5)=4√5; the ambiguous 2√20 distractor has been removed."],
    ["Simplify 2√45.",["3√5","5√3","6√5","9√2"],2,"2×3√5=6√5."],
    ["Simplify ¼√80.",["√5","4√5","2√5","½√5"],0,"¼×4√5=√5."],
    ["Simplify 2√45−√20.",["4√5","8√5","6√5","2√5"],0,"6√5−2√5=4√5."],
    ["Simplify 2√45−√20+¼√80.",["5√5","9√5","3√5","7√5"],0,"6√5−2√5+√5=5√5."],
    ["Why simplify entire surds before adding or subtracting?",["To force decimals","To reveal like surds","To remove irrational values","To make coefficients zero"],1,"Simplification reveals matching radicands."]
  ]],
  ["Worked-example reasoning",[
    ["After simplifying every term in 2√45−√20+¼√80, which surd remains?",["√2","√3","√5","√10"],2,"Every term becomes a multiple of √5."],
    ["Simplify 2√(9×5).",["2√14","6√5","18√5","3√10"],1,"√9=3, then multiply by 2."],
    ["Simplify √(4×5).",["2√5","4√5","5√2","10"],0,"√4=2."],
    ["Simplify ¼√(16×5).",["4√5","√5","¼√5","16√5"],1,"¼×4√5=√5."],
    ["Evaluate 6√5−2√5+√5.",["9√5","4√5","5√5","3√5"],2,"6−2+1=5."],
    ["Which expression is equivalent to √80?",["4√5","5√4","8√5","2√10"],0,"√80=4√5."],
    ["Which expression is equivalent to √20?",["10√2","2√5","4√5","5√2"],1,"√20=2√5."],
    ["Which expression is equivalent to √45?",["3√5","9√5","5√3","15√3"],0,"√45=3√5."],
    ["Which final answer is exact?",["11.18","5√5","11.2","5.25"],1,"5√5 is exact."],
    ["What skill is used in 6√5−2√5+√5?",["Collecting like terms","Expanding brackets","Rounding","Solving equations"],0,"The common factor √5 is retained while coefficients combine."]
  ]],
  ["Exact fractional coefficients",[
    ["Simplify √12.",["2√3","3√2","4√3","6√2"],0,"√12=√(4×3)=2√3."],
    ["Simplify √27.",["9√3","3√3","2√3","3√9"],1,"√27=√(9×3)=3√3."],
    ["Simplify √75.",["25√3","5√3","3√5","15√5"],1,"√75=√(25×3)=5√3."],
    ["Simplify ⅒√12.",["⅕√3","⅒√3","⅖√3","2√3"],0,"⅒×2√3=⅕√3."],
    ["Simplify ⅓√27.",["3√3","√3","⅓√3","9√3"],1,"⅓×3√3=√3."],
    ["Simplify ⅙√75.",["⅚√3","⅙√3","5√3","⅗√3"],0,"⅙×5√3=⅚√3."],
    ["Which matches ⅒√12+⅓√27−⅙√75 after simplifying each surd?",["⅕√3+√3−⅚√3","½√3+⅓√3−⅙√3","2√3+3√3−5√3","⅒√3+⅓√3−⅙√3"],0,"The three coefficients are 1/5, 1 and 5/6."],
    ["What common denominator combines 1/5, 1 and 5/6?",["10","30","15","6"],1,"The lowest common multiple of 5 and 6 is 30."],
    ["Evaluate 1/5+1−5/6.",["11/30","7/30","1/6","13/30"],0,"6/30+30/30−25/30=11/30."],
    ["If ⅒√12+⅓√27−⅙√75=b√3, what is b?",["7/30","11/30","5/6","1/5"],1,"The exact coefficient is 11/30."]
  ]],
  ["Applying exact surd reasoning",[
    ["Why is (11/30)√3 more exact than 0.635?",["It is rounded","It retains the irrational value exactly","It has fewer symbols","It is larger"],1,"The surd form has not been rounded."],
    ["What should be done first in a surd expression?",["Convert to decimals","Simplify using perfect-square factors","Round each root","Ignore coefficients"],1,"Simplifying first preserves exactness and reveals like terms."],
    ["Which expression combines into one surd term?",["2√3+5√3","√2+√5","3√7+2√11","√3+√6"],0,"The two terms have matching radicands."],
    ["Which expression cannot be combined exactly?",["4√5−2√5","7√2+√2","3√2+4√3","9√6−5√6"],2,"The radicands 2 and 3 differ."],
    ["Simplify 4√2+3√2−√2.",["6√2","8√2","7√2","12√2"],0,"4+3−1=6."],
    ["Simplify 5√3−2√3+½√3.",["(7/2)√3","3√3","(5/2)√3","7√3"],0,"5−2+1/2=7/2."],
    ["Simplify √(36×2).",["6√2","36√2","2√6","12√3"],0,"√36=6."],
    ["Simplify 3√8.",["6√2","3√2","9√2","24√2"],0,"√8=2√2, then multiply by 3."],
    ["Simplify √18+√50.",["8√2","2√68","3√2+5√3","15√2"],0,"√18=3√2 and √50=5√2, giving 8√2; the equivalent distractor was removed."],
    ["Simplify √48−√12.",["2√3","4√3","6√3","√36"],0,"4√3−2√3=2√3."]
  ]],
  ["Conceptual and error spotting",[
    ["A student writes √2+√5=√7. What is the error?",["They combined unlike surds","They forgot to square both values","They approximated too late","They multiplied"],0,"Unlike surds cannot be combined by adding radicands."],
    ["The statement 3√2+4√2=7√2 is correct.",["True","False"],0,"The radicands match, so the coefficients add.","true-false"],
    ["A student writes √(9+16)=7. What is the correct value?",["25","5","3","4"],1,"√25=5."],
    ["Which statement is correct?",["√(9+16)=5","√(9+16)=7","√(9+16)=25","√(9+16)=12"],0,"The square root of 25 is 5."],
    ["Which calculation gives a rounded result?",["3√2+4√2=7√2","√45=3√5","√2≈1.414","√80=4√5"],2,"The approximately-equal symbol identifies a decimal approximation."],
    ["What does ≈ mean?",["Exactly equal","Approximately equal","Greater than","Not real"],1,"≈ signals an approximation."],
    ["Which symbol shows exact equality?",["≈","=",">","≠"],1,"The equals sign asserts exact equality."],
    ["Which is a correct exact simplification?",["√12=3.464","√12=2√3","√12=4√3","√12=6"],1,"2√3 is exact."],
    ["Which method best matches AC9M10N01?",["Round before calculating","Compare exact representations with decimal approximations","Avoid exact values","Replace surds with integers"],1,"The curriculum focus compares repeated calculations using exact and approximate representations."],
    ["What is the best exact result for 2√45−√20+¼√80?",["5√5","11.18","5.6","√105"],0,"The exact simplified result is 5√5."]
  ]]
];

const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const formatOverrides={
  7:{type:"multiple",question:"Select every exact surd representation.",answers:["√2","3√5","1.414","3.464"],correct:[0,1],explanation:"√2 and 3√5 are exact; the decimals are approximations."},
  24:{type:"fill-blank",question:"Complete the statement with the radicand.",template:"In 5√7, the radicand is {{blank}}.",acceptedAnswers:[["7","seven"]],explanation:"The radicand is the value under the root sign."},
  34:{type:"fill-blank",question:"Complete the exact simplification.",template:"√20 = {{blank}}",acceptedAnswers:[["2√5","2 sqrt 5","2sqrt5"]],explanation:"√20=√(4×5)=2√5."},
  39:{type:"order",question:"Order the stages used to simplify the expression exactly.",items:["Rewrite √45, √20 and √80 using perfect-square factors","Extract 3√5, 2√5 and 4√5","Apply the outside coefficients","Collect the like √5 terms"],correct:["Rewrite √45, √20 and √80 using perfect-square factors","Extract 3√5, 2√5 and 4√5","Apply the outside coefficients","Collect the like √5 terms"],explanation:"Simplify each entire surd before applying coefficients and collecting like terms."},
  54:{type:"fill-blank",question:"Complete the exact coefficient.",template:"(1/10)√12 = {{blank}}√3",acceptedAnswers:[["1/5","⅕","0.2"]],explanation:"(1/10)×2√3=(1/5)√3."},
  57:{type:"multiple",question:"Select every correctly simplified term.",answers:["√12=2√3","√27=3√3","√75=5√3","√20=5√2"],correct:[0,1,2],explanation:"The first three use perfect-square factors correctly; √20=2√5."},
  68:{type:"order",question:"Order the steps for simplifying 3√8.",items:["Factor 8 as 4×2","Write √8 as 2√2","Multiply by the outside coefficient 3","State 6√2"],correct:["Factor 8 as 4×2","Write √8 as 2√2","Multiply by the outside coefficient 3","State 6√2"],explanation:"Extract the perfect-square factor before applying the outside coefficient."},
  78:{type:"multiple",question:"Select every statement that uses exact equality correctly.",answers:["√12=2√3","√45=3√5","√2=1.414","√80=4√5"],correct:[0,1,3],explanation:"The three surd equalities are exact; 1.414 is only an approximation to √2."}
};
const all=[];
for(const [sectionIndex,[section,items]] of sections.entries())for(const [itemIndex,item] of items.entries()){
  const [question,answers,correct,explanation,type="single"]=item;
  const sourceNumber=sectionIndex*10+itemIndex+1;
  all.push({sourceNumber,sectionIndex,section,itemIndex,type,question,answers,correct,explanation,...(formatOverrides[sourceNumber]||{})});
}
const practice=[],test=[];
for(let itemIndex=0;itemIndex<10;itemIndex++)for(let sectionIndex=0;sectionIndex<8;sectionIndex++){
  const item=all.find(x=>x.sectionIndex===sectionIndex&&x.itemIndex===itemIndex);
  (itemIndex<7?practice:test).push(item);
}
const build=(items,bank)=>items.map((item,index)=>({
  id:`ac9m10n01-${bank==="practice"?"p":"t"}-${String(index+1).padStart(3,"0")}`,
  curriculumCode:"AC9M10N01",bank,section:item.section,sourceNumber:item.sourceNumber,skill:item.section,printable:true,
  type:item.type,question:item.question,...(item.type==="number"?{correct:item.correct,tolerance:0}:item.type==="fill-blank"?{template:item.template,acceptedAnswers:item.acceptedAnswers}:item.type==="order"?{items:item.items,correct:item.correct,instruction:"Arrange the steps from first to last."}:{answers:item.answers,correct:item.correct}),
  explanation:item.explanation,structuredExplanation:{summary:item.explanation,hint:`Use the ${item.section.toLowerCase()} rule and keep the value exact until approximation is requested.`},qualitySchema:"production-v1"
}));
const output=(name,items)=>`"use strict";\nwindow.quizQuestions=${JSON.stringify(build(items,name),null,2)};\n`;
const practicePath=path.join(root,"quiz/year-10/math/ac9m10n01/practice/questions.js");
const testPath=path.join(root,"quiz/year-10/math/ac9m10n01/test/questions.js");
fs.mkdirSync(path.dirname(testPath),{recursive:true});
fs.writeFileSync(practicePath,output("practice",practice));
fs.writeFileSync(testPath,output("test",test));

const updatePage=(bank,count,source)=>{
  const file=path.join(root,`quiz/year-10/math/ac9m10n01/${bank}/index.html`);
  let html=fs.readFileSync(file,"utf8");
  const label=bank==="practice"?"Practice":"Test";
  const title=`AC9M10N01 Exact Surds and Decimal Approximations ${label}`;
  const description=`${label} Year 10 exact surds, simplifying surds, like surds and decimal approximations with a ${count}-question AC9M10N01 bank.`;
  html=html.replace(/<title>[^<]*<\/title>/,`<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${description}">`)
    .replace(/<h1 id="quizTitle">[^<]*<\/h1>/,`<h1 id="quizTitle">Exact Surds and Decimal Approximations</h1>`)
    .replace('<p class="intro-text">Read the quick preparation notes, then start when you are ready.</p>',`<p class="intro-text">Work through a mixed selection from ${count} authored questions on exact values, surd rules, simplifying and decimal approximation.</p>`)
    .replace('"shuffleQuestions":false','"shuffleQuestions":true')
    .replace(/<script src="\/quiz\/year-10\/math\/ac9m10n01\/(?:practice|test)\/questions\.js"><\/script>/,`<script src="${source}"></script>`);
  fs.writeFileSync(file,html);
};
updatePage("practice",56,"/quiz/year-10/math/ac9m10n01/practice/questions.js");
updatePage("test",24,"/quiz/year-10/math/ac9m10n01/test/questions.js");

const built=[...build(practice,"practice"),...build(test,"test")];
if(all.length!==80||practice.length!==56||test.length!==24)throw new Error("Bank count mismatch");
if(new Set(built.map(x=>x.id)).size!==80||new Set(built.map(x=>x.question)).size!==80)throw new Error("Duplicate ID or prompt");
for(const bank of ["practice","test"]){const rows=built.filter(x=>x.bank===bank),wanted=bank==="practice"?7:3;for(const [section] of sections)if(rows.filter(x=>x.section===section).length!==wanted)throw new Error(`${bank}/${section} split mismatch`);}
for(const item of built){if(!item.explanation||!item.structuredExplanation.summary||!item.structuredExplanation.hint)throw new Error(`${item.id}: feedback missing`);if(item.type==="number"){if(!Number.isFinite(item.correct))throw new Error(`${item.id}: invalid number`);}else if(item.type==="fill-blank"){if(!item.template?.includes("{{blank}}")||!item.acceptedAnswers?.length)throw new Error(`${item.id}: invalid fill-blank schema`);}else if(item.type==="order"){if(!item.items?.length||item.items.length!==item.correct?.length)throw new Error(`${item.id}: invalid order schema`);}else if(item.type==="multiple"){if(!item.answers?.length||!Array.isArray(item.correct)||item.correct.length<2)throw new Error(`${item.id}: invalid multiple schema`);}else if(!Array.isArray(item.answers)||!Number.isInteger(item.correct)||!item.answers[item.correct])throw new Error(`${item.id}: invalid choice schema`);}
console.log(`Built AC9M10N01: ${practice.length} practice + ${test.length} test questions across 8 sections.`);
