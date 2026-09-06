"use strict";
(() => {
  const LEVELS = ["easy","easy","core","core","core","application","application","challenge"];
  const YN = y => y === "F" ? 0 : Number(y);
  const EARLY_CONTEXTS=[
    "Mia uses counters","Noah checks a number card","A class sorts objects","Zoe draws a quick model","Arun uses a number line",
    "A group shares blocks","Lina checks a pattern","Jai compares two answers","A class records a result","Theo uses a ten-frame",
    "Isla explains her thinking","A group checks with objects","Maya makes a maths picture","Leo tests a rule","A class solves a short puzzle",
    "Ruby counts carefully","Finn checks a classmate's answer","A group uses place-value blocks","Ava acts out the number story","Sam looks for what repeats",
    "A class estimates first","Nina checks each step","Omar uses a simple table","Ella compares two methods","Kai finds the mistake",
    "A group makes equal groups","Ivy labels a shape","Max measures carefully","A class reads a small graph","Ana checks the final answer"
  ];
  const CONTEXTS=[
    "A student checks a worked example","A class compares two strategies","A group models the problem","A student estimates before calculating","A class analyses a number pattern",
    "A group checks a claim","A student uses a table","A class interprets a diagram","A group explains its reasoning","A student finds an error",
    "A class applies the rule","A group compares representations","A student tests an example","A class chooses an efficient method","A group verifies the result",
    "A student completes a challenge","A class discusses a misconception","A group uses inverse operations","A student checks whether the answer is reasonable","A class connects the symbols to the context",
    "A group records its calculations","A student identifies the important information","A class checks each step","A group solves a practical problem","A student compares exact values",
    "A class generalises a pattern","A group justifies its choice","A student uses a known fact","A class evaluates two solutions","A group completes a final accuracy check"
  ];
  function repairSingleChoices(item,set,pos){
    if(item.type!=="single"||!Array.isArray(item.answers)||item.answers.length!==3||!Number.isInteger(item.correct)) return;
    const correct=String(item.answers[item.correct]);
    const unique=[correct];
    item.answers.forEach((answer,index)=>{if(index!==item.correct&&!unique.includes(String(answer))) unique.push(String(answer));});
    const numeric=Number(correct);
    const fraction=correct.match(/^(-?\d+)\/(\d+)$/);
    const candidates=Number.isFinite(numeric)
      ?[numeric+1,numeric-1,numeric+10,numeric-10,numeric*2].map(String)
      :fraction
        ?[`${Number(fraction[1])+1}/${fraction[2]}`,`${fraction[1]}/${Number(fraction[2])+1}`,`${fraction[2]}/${fraction[1]}`]
        :/√/.test(correct)
          ?["√2","√4","4√2","8"]
          :["the pattern stops","the previous item","a different value"];
    for(const candidate of candidates){if(unique.length===3) break;if(!unique.includes(candidate)) unique.push(candidate);}
    while(unique.length<3) unique.push(`another result ${set+pos+unique.length}`);
    item.answers=unique.slice(0,3);
    item.correct=0;
  }
  const q = (year, skill, set, pos, type, question, extra={}) => {
    const context=(year==="F"||Number(year)<=2?EARLY_CONTEXTS:CONTEXTS)[set%30];
    const item={
      id:`m-${year}-${skill}-s${set+1}-q${pos+1}`,
      year, subject:"math", skill, set,
      difficulty:LEVELS[pos], type, question:`${context}. ${question}`, ...extra
    };
    repairSingleChoices(item,set,pos);
    item.audioPrompt=item.audioPrompt||item.question;
    item.hint=item.hint||({
      single:"Work out the idea first, then compare every choice.",
      "true-false":"Check the whole statement before deciding.",
      number:"Work step by step and enter only the number.",
      text:"Use the precise mathematical word or value.",
      "fill-blank":"Read the complete sentence with each possible value.",
      multiple:"Check every choice because more than one can be correct.",
      order:"Work out each value before arranging the items."
    }[type]||"Use the information in the question and check your answer.");
    if(type==="single"&&Array.isArray(item.answers)&&item.answers.length===3&&Number.isInteger(item.correct)){
      const target=(set*8+pos)%3;
      const shift=(item.correct-target+3)%3;
      item.answers=[...item.answers.slice(shift),...item.answers.slice(0,shift)];
      item.correct=target;
    }
    return item;
  };
  const topicMeta = (year, skill) =>
    window.SkillrDailyCatalog?.years?.[year]?.math?.find(t => t.id === skill || t.slug === skill);
  const support = (year, skill) => window.SkillrMathQuickReview?.[year]?.[skill];

  function vocab(year,skill,set,s){
    const kv=s.keywords, n=kv.length, at=i=>kv[(2*set+i)%n];
    const a=at(0),b=at(1),c=at(2),d=at(3);
    return [
      q(year,skill,set,0,"single",`Which term means "${a[1]}"?`,{answers:[a[0],b[0],c[0]],correct:0,explanation:`${a[0]} means ${a[1]}.`}),
      q(year,skill,set,1,"single",`Which definition best matches "${b[0]}"?`,{answers:[b[1],c[1],d[1]],correct:0,explanation:`${b[0]} means ${b[1]}.`}),
      q(year,skill,set,2,"true-false",`"${c[0]}" means ${c[1]}.`,{answers:["True","False"],correct:0,explanation:"The definition is correct."}),
      q(year,skill,set,3,"text",`Type the mathematical term for: ${d[1]}.`,{correct:d[0],acceptedAnswers:[d[0]],explanation:`The term is ${d[0]}.`}),
      q(year,skill,set,4,"fill-blank","Complete the vocabulary sentence.",{template:`{{blank}} means ${a[1]}.`,acceptedAnswers:[a[0]],explanation:`The missing term is ${a[0]}.`}),
      q(year,skill,set,5,"single",`Which term best fits this idea: ${c[1]}?`,{answers:[c[0],a[0],b[0]],correct:0,explanation:`Use ${c[0]}.`}),
      q(year,skill,set,6,"multiple","Select the two correctly matched term-definition pairs.",{answers:[`${a[0]} — ${a[1]}`,`${b[0]} — ${c[1]}`,`${c[0]} — ${c[1]}`,`${d[0]} — ${a[1]}`],correct:[0,2],explanation:"The first and third pairs are correctly matched."}),
      q(year,skill,set,7,"single",`Which term best matches "${b[1]}"?`,{answers:[b[0],c[0],d[0]],correct:0,explanation:`The correct term is ${b[0]}.`})
    ];
  }

  function addsub(year,skill,set){
    const y=YN(year);
    let a,b;
    if(y===0){a=4+(set%6);b=1+(set%4);}
    else if(y===1){a=7+(set%12);b=2+((set*2)%8);}
    else if(y===2){a=34+(set*3)%55;b=12+(set*5)%35;}
    else if(y<=4){a=230+(set*31)%700;b=40+(set*13)%180;}
    else {a=1200+(set*137)%7000;b=230+(set*47)%900;}
    const sum=a+b,diff=a-b,step=y>1?10:1;
    return [
      q(year,skill,set,0,"single",`${a} + ${b} = ?`,{answers:[String(sum),String(sum+step),String(sum-step)],correct:0,explanation:`${a}+${b}=${sum}.`}),
      q(year,skill,set,1,"single",`${a} − ${b} = ?`,{answers:[String(diff),String(diff+step),String(diff-step)],correct:0,explanation:`${a}−${b}=${diff}.`}),
      q(year,skill,set,2,"true-false",`${b} + ${a} = ${sum}.`,{answers:["True","False"],correct:0,explanation:"Addition is commutative."}),
      q(year,skill,set,3,"number",`A collection has ${a} items and gets ${b} more. How many are there now?`,{correct:sum,explanation:"Add the quantities."}),
      q(year,skill,set,4,"fill-blank","Complete the number sentence.",{template:`${a} + {{blank}} = ${sum}`,acceptedAnswers:[String(b)],explanation:`The missing addend is ${b}.`}),
      q(year,skill,set,5,"single",`Which can check ${a} − ${b} = ${diff}?`,{answers:[`${diff}+${b}=${a}`,`${a}+${b}=${diff}`,`${diff}-${b}=${a}`],correct:0,explanation:"Use the inverse operation."}),
      q(year,skill,set,6,"multiple",`Select all expressions equal to ${sum}.`,{answers:[`${a}+${b}`,`${b}+${a}`,`${sum+2}−2`,`${sum}−1`],correct:[0,1,2],explanation:"The first three expressions have the same value."}),
      q(year,skill,set,7,"order","Order the calculations from smallest answer to largest.",{items:[`${a}−${b}`,`${a}+${b}`,`${a}+1`],correct:[`${a}−${b}`,`${a}+1`,`${a}+${b}`],instruction:"Calculate or estimate each value.",explanation:"Compare the results."})
    ];
  }

  function multiplication(year,skill,set){
    const y=YN(year);
    let each,groups;
    if(y===0){
      each=2+(set%2);groups=2+(set%3);
      const total=each*groups;
      return [
        q(year,skill,set,0,"single",`There are ${groups} equal groups with ${each} counters in each. How many counters altogether?`,{answers:[String(total),String(groups+each),String(total+1)],correct:0,explanation:`Count ${each} in each equal group to get ${total}.`}),
        q(year,skill,set,1,"single",`Share ${total} counters equally into ${groups} groups. How many are in each group?`,{answers:[String(each),String(groups),String(total)],correct:0,explanation:`Each group gets ${each}.`}),
        q(year,skill,set,2,"true-false",`${groups} groups with ${each} in each are equal groups.`,{answers:["True","False"],correct:0,explanation:"Every group has the same amount."}),
        q(year,skill,set,3,"number",`How many objects are in ${groups} equal groups of ${each}?`,{correct:total,explanation:`The total is ${total}.`}),
        q(year,skill,set,4,"fill-blank","Complete the sharing sentence.",{template:`Share ${total} equally into ${groups} groups: {{blank}} in each group.`,acceptedAnswers:[String(each)],explanation:`Each group has ${each}.`}),
        q(year,skill,set,5,"single","Which description shows equal groups?",{answers:["3, 3, 3 objects","2, 3, 4 objects","1, 2, 3 objects"],correct:0,explanation:"Equal groups have the same number in every group."}),
        q(year,skill,set,6,"multiple","Select all descriptions of equal groups.",{answers:["2 and 2","3 and 3 and 3","2 and 3","4 and 4"],correct:[0,1,3],explanation:"The selected groups have matching group sizes."}),
        q(year,skill,set,7,"order","Order the group totals from smallest to largest.",{items:["2 groups of 2","4 groups of 2","3 groups of 2"],correct:["2 groups of 2","3 groups of 2","4 groups of 2"],instruction:"Count the total in each set.",explanation:"The totals are 4, 6 and 8."})
      ];
    }
    else if(y===1){each=[2,5,10][set%3];groups=2+(set%8);}
    else if(y===2){each=set<18?2:[5,10][set%2];groups=3+(set%9);}
    else if(y===3){each=[2,3,4,5,10][set%5];groups=3+(set%9);}
    else if(y===4){each=2+(set%9);groups=2+((set*3)%9);}
    else {each=4+(set%8);groups=12+((set*7)%35);}
    const total=each*groups;
    return [
      q(year,skill,set,0,"single",`${groups} × ${each} = ?`,{answers:[String(total),String(total+each),String(Math.max(0,total-each))],correct:0,explanation:`${groups} × ${each} = ${total}.`}),
      q(year,skill,set,1,"single",`${total} ÷ ${each} = ?`,{answers:[String(groups),String(each),String(groups+1)],correct:0,explanation:`${total} ÷ ${each} = ${groups}.`}),
      q(year,skill,set,2,"true-false",`${groups} equal groups of ${each} contain ${total} altogether.`,{answers:["True","False"],correct:0,explanation:"The multiplication fact confirms the statement."}),
      q(year,skill,set,3,"number",`There are ${groups} groups with ${each} items in each. How many items altogether?`,{correct:total,explanation:`${groups} × ${each} = ${total}.`}),
      q(year,skill,set,4,"fill-blank","Complete the fact family.",{template:`${each} × {{blank}} = ${total}`,acceptedAnswers:[String(groups)],explanation:`The missing factor is ${groups}.`}),
      q(year,skill,set,5,"single",`Which related division fact matches ${groups} × ${each} = ${total}?`,{answers:[`${total} ÷ ${each} = ${groups}`,`${total} ÷ ${groups} = ${groups}`,`${each} ÷ ${total} = ${groups}`],correct:0,explanation:"Division reverses the multiplication relationship."}),
      q(year,skill,set,6,"multiple",`Select all expressions equal to ${total}.`,{answers:[`${groups}×${each}`,`${each}×${groups}`,`${total}÷1`,`${groups}+${each}`],correct:[0,1,2],explanation:"The first three expressions equal the same total."}),
      q(year,skill,set,7,"order","Order the products from smallest to largest.",{items:[`${each}×${Math.max(1,groups-1)}`,`${each}×${groups+1}`,`${each}×${groups}`],correct:[`${each}×${Math.max(1,groups-1)}`,`${each}×${groups}`,`${each}×${groups+1}`],instruction:"Use known multiplication facts.",explanation:`Each step changes by ${each}.`})
    ];
  }

  function fractions(year,skill,set){
    const den=[2,3,4,5,6,8,10,12][set%8];
    const num=Math.min(den-1,1+(set%(Math.max(1,den-1))));
    return [
      q(year,skill,set,0,"single",`Which fraction represents ${num} of ${den} equal parts?`,{answers:[`${num}/${den}`,`${den}/${num}`,`1/${den}`],correct:0,explanation:"The numerator counts selected parts and the denominator counts equal parts."}),
      q(year,skill,set,1,"single","Which pair is equivalent?",{answers:["1/2 and 2/4","1/3 and 1/4","2/3 and 3/2"],correct:0,explanation:"1/2 and 2/4 represent the same amount."}),
      q(year,skill,set,2,"true-false",`${den}/${den} is equal to 1 whole.`,{answers:["True","False"],correct:0,explanation:"All equal parts together make the whole."}),
      q(year,skill,set,3,"number",`How many ${den}ths make one whole?`,{correct:den,explanation:`${den}/${den}=1.`}),
      q(year,skill,set,4,"fill-blank","Complete the equivalent fraction.",{template:"1/2 = {{blank}}/10",acceptedAnswers:["5"],explanation:"Five tenths is one half."}),
      q(year,skill,set,5,"single","Which fraction is greatest?",{answers:["3/4","1/2","1/4"],correct:0,explanation:"Three quarters is greatest."}),
      q(year,skill,set,6,"multiple","Select all fractions greater than 1/2.",{answers:["3/4","5/8","1/4","7/10"],correct:[0,1,3],explanation:"The first, second and fourth are greater than one half."}),
      q(year,skill,set,7,"order","Order from smallest to largest.",{items:["1/4","3/4","2/4"],correct:["1/4","2/4","3/4"],instruction:"Use the common denominator.",explanation:"With equal denominators, compare numerators."})
    ];
  }

  function percentRatio(year,skill,set){
    const pct=[10,20,25,30,40,50,60,75][set%8], base=40+20*(set%10), value=base*pct/100;
    const r=2+(set%5);
    return [
      q(year,skill,set,0,"single",`${pct}% of ${base} = ?`,{answers:[String(value),String(value+10),String(base-value)],correct:0,explanation:`${pct}% of ${base} is ${value}.`}),
      q(year,skill,set,1,"single",`Simplify the ratio ${r}:${2*r}.`,{answers:["1:2","2:1","1:4"],correct:0,explanation:"Divide both parts by the same factor."}),
      q(year,skill,set,2,"true-false","A unit rate compares a quantity with 1 unit of another quantity.",{answers:["True","False"],correct:0,explanation:"That is the definition of a unit rate."}),
      q(year,skill,set,3,"number",`A $${base} item is discounted by ${pct}%. How many dollars is the discount?`,{correct:value,explanation:`The discount is $${value}.`}),
      q(year,skill,set,4,"fill-blank","Complete the equivalence.",{template:"0.25 = {{blank}}%",acceptedAnswers:["25"],explanation:"0.25 = 25%."}),
      q(year,skill,set,5,"single","Which has the lowest unit price?",{answers:["$6 for 3 items","$10 for 4 items","$15 for 5 items"],correct:0,explanation:"The unit prices are $2, $2.50 and $3."}),
      q(year,skill,set,6,"multiple","Select all representations equal to 50%.",{answers:["1/2","0.5","50/100","0.05"],correct:[0,1,2],explanation:"The first three equal 50%."}),
      q(year,skill,set,7,"order","Order from smallest to largest.",{items:["20%","0.5","3/4"],correct:["20%","0.5","3/4"],instruction:"Convert to a common form.",explanation:"0.2 < 0.5 < 0.75."})
    ];
  }

  function indices(year,skill,set){
    const base=2+(set%5), e1=2+(set%3), e2=2+((set+1)%3);
    return [
      q(year,skill,set,0,"single",`Simplify ${base}^${e1} × ${base}^${e2}.`,{answers:[`${base}^${e1+e2}`,`${base}^${e1*e2}`,`${base}^${Math.abs(e1-e2)}`],correct:0,explanation:"Add exponents when multiplying equal bases."}),
      q(year,skill,set,1,"single",`Evaluate ${base}².`,{answers:[String(base**2),String(base*2),String(base**3)],correct:0,explanation:`${base}²=${base**2}.`}),
      q(year,skill,set,2,"true-false",`${base}^${e1+2} ÷ ${base}² = ${base}^${e1}.`,{answers:["True","False"],correct:0,explanation:"Subtract exponents when dividing equal bases."}),
      q(year,skill,set,3,"number",`Evaluate ${base}³.`,{correct:base**3,explanation:`${base}³=${base**3}.`}),
      q(year,skill,set,4,"fill-blank","Complete the index law.",{template:`${base}³ × ${base}^{{blank}} = ${base}⁷`,acceptedAnswers:["4"],explanation:"3+4=7."}),
      q(year,skill,set,5,"single","Which number is irrational?",{answers:["√2","0.75","3/8"],correct:0,explanation:"√2 cannot be expressed as a ratio of integers."}),
      q(year,skill,set,6,"multiple","Select all rational numbers.",{answers:["0.2","3/7","√3","−5"],correct:[0,1,3],explanation:"The first, second and fourth are rational."}),
      q(year,skill,set,7,"order","Order from smallest to largest.",{items:["−√9","0","√4"],correct:["−√9","0","√4"],instruction:"Evaluate the roots.",explanation:"−3 < 0 < 2."})
    ];
  }

  function algebra(year,skill,set,kind){
    const x=2+(set%8), a=2+(set%4), b=3+(set%7), rhs=a*x+b;
    if(kind==="quadratic"){
      const r1=2+(set%5),r2=3+((set*2)%5),sum=r1+r2,prod=r1*r2;
      return [
        q(year,skill,set,0,"single",`Expand (x + ${r1})(x + ${r2}).`,{answers:[`x² + ${sum}x + ${prod}`,`x² + ${prod}x + ${sum}`,`x² + ${sum}`],correct:0,explanation:"Multiply each term and collect like terms."}),
        q(year,skill,set,1,"single",`Factorise x² + ${sum}x + ${prod}.`,{answers:[`(x + ${r1})(x + ${r2})`,`(x − ${r1})(x − ${r2})`,`(x + ${sum})(x + 1)`],correct:0,explanation:"Find two numbers that add to the x coefficient and multiply to the constant."}),
        q(year,skill,set,2,"true-false",`x² − ${r1*r1} = (x − ${r1})(x + ${r1}).`,{answers:["True","False"],correct:0,explanation:"This is a difference of two squares."}),
        q(year,skill,set,3,"number",`If x=${r1}, evaluate x² + ${r2}x.`,{correct:r1*r1+r2*r1,explanation:"Substitute and simplify."}),
        q(year,skill,set,4,"fill-blank","Complete the factorisation.",{template:`x² + ${2*r1}x + ${r1*r1} = (x + {{blank}})²`,acceptedAnswers:[String(r1)],explanation:"This is a perfect-square trinomial."}),
        q(year,skill,set,5,"single",`Which values solve (x − ${r1})(x − ${r2}) = 0?`,{answers:[`x=${r1} or x=${r2}`,`x=${sum}`,`x=${prod}`],correct:0,explanation:"Use the zero-product property."}),
        q(year,skill,set,6,"multiple","Select all expressions equivalent to x² − 9.",{answers:["(x−3)(x+3)","x²+0x−9","(x+3)²","x·x−9"],correct:[0,1,3],explanation:"The first, second and fourth simplify to x²−9."}),
        q(year,skill,set,7,"order","Order the steps to solve x² − 5x + 6 = 0.",{items:["x = 2 or x = 3","(x−2)(x−3)=0","Factorise the quadratic"],correct:["Factorise the quadratic","(x−2)(x−3)=0","x = 2 or x = 3"],instruction:"Arrange the method.",explanation:"Factorise, use zero product, then solve."})
      ];
    }
    if(kind==="linear" || kind==="functions"){
      return [
        q(year,skill,set,0,"single",`For y=${a}x+${b}, what is y when x=${x}?`,{answers:[String(rhs),String(rhs+a),String(x+b)],correct:0,explanation:"Substitute the x-value."}),
        q(year,skill,set,1,"single",`In y=${a}x+${b}, what is the gradient?`,{answers:[String(a),String(b),String(a+b)],correct:0,explanation:"The coefficient of x is the gradient."}),
        q(year,skill,set,2,"true-false",`The y-intercept of y=${a}x+${b} is ${b}.`,{answers:["True","False"],correct:0,explanation:"Set x=0."}),
        q(year,skill,set,3,"number",`For y=${a}x+${b}, find y when x=0.`,{correct:b,explanation:"The y-intercept is b."}),
        q(year,skill,set,4,"fill-blank","Complete the substitution.",{template:`If y=${a}x+${b} and x=2, y={{blank}}`,acceptedAnswers:[String(2*a+b)],explanation:"Substitute x=2."}),
        q(year,skill,set,5,"single","Which relationship is linear?",{answers:["constant increase for each equal x-step","repeated percentage multiplication","random changing step"],correct:0,explanation:"A linear relation has constant rate of change."}),
        q(year,skill,set,6,"multiple","Select all features of a straight-line relation.",{answers:["constant gradient","constant first difference for equal x-steps","can be written y=mx+b","constantly changing gradient"],correct:[0,1,2],explanation:"The first three describe linear relations."}),
        q(year,skill,set,7,"order","Order the steps to graph a linear rule from a table.",{items:["Plot the points","Choose x-values","Calculate matching y-values"],correct:["Choose x-values","Calculate matching y-values","Plot the points"],instruction:"Arrange the graphing steps.",explanation:"Generate paired values before plotting."})
      ];
    }
    return [
      q(year,skill,set,0,"single",`If x=${x}, evaluate ${a}x+${b}.`,{answers:[String(rhs),String(rhs+a),String(x+b)],correct:0,explanation:`${a}×${x}+${b}=${rhs}.`}),
      q(year,skill,set,1,"single",`Solve x + ${b} = ${x+b}.`,{answers:[String(x),String(x+b),String(b)],correct:0,explanation:`x=${x}.`}),
      q(year,skill,set,2,"true-false","3(x + 2) = 3x + 6.",{answers:["True","False"],correct:0,explanation:"Distribute 3 to both terms."}),
      q(year,skill,set,3,"number",`Solve ${a}x = ${a*x}.`,{correct:x,explanation:`Divide both sides by ${a}.`}),
      q(year,skill,set,4,"fill-blank","Complete the substitution.",{template:`If x=${x}, then 2x+1={{blank}}`,acceptedAnswers:[String(2*x+1)],explanation:"Substitute and simplify."}),
      q(year,skill,set,5,"single","Which expression is equivalent to 4(x+3)?",{answers:["4x+12","4x+3","x+12"],correct:0,explanation:"Distribute 4 to both terms."}),
      q(year,skill,set,6,"multiple","Select all expressions equivalent to 5x + 10.",{answers:["5(x+2)","5x+5+5","10+5x","5(x+10)"],correct:[0,1,2],explanation:"The first three simplify to 5x+10."}),
      q(year,skill,set,7,"order","Order the steps to solve 2x + 3 = 11.",{items:["x = 4","2x = 8","Subtract 3 from both sides"],correct:["Subtract 3 from both sides","2x = 8","x = 4"],instruction:"Arrange the solution steps.",explanation:"Undo addition, then multiplication."})
    ];
  }


  function patterns(year,skill,set){
    const patterns=[["red","blue"],["circle","square"],["clap","stamp"],["A","B","B"],["star","circle","square"]];
    const pat=patterns[set%patterns.length], seq=[...pat,...pat,...pat].slice(0,6), next=pat[6%pat.length], unit=pat.join(", ");
    return [
      q(year,skill,set,0,"single",`What comes next? ${seq.join(", ")}, ___`,{answers:[next,pat[0],pat[pat.length-1]],correct:0,explanation:`The repeating unit is ${unit}.`}),
      q(year,skill,set,1,"single","Which is a repeating pattern?",{answers:["red, blue, red, blue","red, blue, green, yellow","1, 2, 4, 7"],correct:0,explanation:"The red-blue unit repeats."}),
      q(year,skill,set,2,"true-false","A repeating pattern has a unit that occurs again in the same order.",{answers:["True","False"],correct:0,explanation:"That is the key feature of a repeating pattern."}),
      q(year,skill,set,3,"number",`How many items are in the repeating unit: ${unit}?`,{correct:pat.length,explanation:`The unit contains ${pat.length} items.`}),
      q(year,skill,set,4,"fill-blank","Complete the pattern.",{template:"circle, square, circle, {{blank}}",acceptedAnswers:["square"],explanation:"Circle and square alternate."}),
      q(year,skill,set,5,"single",`What is the smallest repeating unit in ${[...pat,...pat].join(", ")}?`,{answers:[unit,pat.slice(0,Math.max(1,pat.length-1)).join(", "),"the whole sequence"],correct:0,explanation:`The unit is ${unit}.`}),
      q(year,skill,set,6,"multiple","Select all repeating patterns.",{answers:["A B A B","1 2 1 2","A B C D","clap stamp clap stamp"],correct:[0,1,3],explanation:"The selected sequences repeat a unit."}),
      q(year,skill,set,7,"order",`Arrange one repeating unit for ${[...pat,...pat].join(", ")}.`,{items:[...pat].reverse(),correct:pat,instruction:"Use the arrows to arrange one complete unit.",explanation:`The repeating unit is ${unit}.`})
    ];
  }

  function mixedEarly(year,skill,set){
    const n=3+(set%8);
    return [
      q(year,skill,set,0,"single","Which word compares length?",{answers:["longer","heavier","fuller"],correct:0,explanation:"Longer and shorter compare length."}),
      q(year,skill,set,1,"single","Which shape has 3 straight sides?",{answers:["triangle","square","circle"],correct:0,explanation:"A triangle has three straight sides."}),
      q(year,skill,set,2,"true-false","A container with greater capacity can hold more.",{answers:["True","False"],correct:0,explanation:"Capacity describes how much a container can hold."}),
      q(year,skill,set,3,"number",`A data display shows ${n} cats and ${n+3} dogs. What is the dog frequency?`,{correct:n+3,explanation:`The dog frequency is ${n+3}.`}),
      q(year,skill,set,4,"fill-blank","Complete the position sentence.",{template:"The ball is over the box, so the ball is {{blank}} the box.",acceptedAnswers:["above","over"],explanation:"Above describes the position."}),
      q(year,skill,set,5,"single",`Which event lasts longer: ${10+n} minutes or ${15+n} minutes?`,{answers:[`${15+n} minutes`,`${10+n} minutes`,"They are equal"],correct:0,explanation:"The greater number of minutes is the longer duration."}),
      q(year,skill,set,6,"multiple","Select all measurement attributes.",{answers:["length","mass","capacity","banana"],correct:[0,1,2],explanation:"Length, mass and capacity are measurement attributes."}),
      q(year,skill,set,7,"order","Order the data counts from fewest to most.",{items:[`red: ${n+2}`,`blue: ${n-1}`,`green: ${n+5}`],correct:[`blue: ${n-1}`,`red: ${n+2}`,`green: ${n+5}`],instruction:"Compare the frequencies.",explanation:"Order the numerical counts."})
    ];
  }

  function orderOperations(year,skill,set){
    const a=2+(set%7),b=3+((set*2)%6),c=2+((set*3)%5);
    const ans=a+b*c;
    return [
      q(year,skill,set,0,"single",`${a} + ${b} × ${c} = ?`,{answers:[String(ans),String((a+b)*c),String(a*b+c)],correct:0,explanation:"Complete multiplication before addition."}),
      q(year,skill,set,1,"single",`(${a} + ${b}) × ${c} = ?`,{answers:[String((a+b)*c),String(ans),String(a+b+c)],correct:0,explanation:"Brackets are completed first."}),
      q(year,skill,set,2,"true-false","Multiplication and division are completed before addition and subtraction unless brackets change the order.",{answers:["True","False"],correct:0,explanation:"That is the standard order of operations."}),
      q(year,skill,set,3,"number",`Calculate ${a*c} ÷ ${c} + ${b}.`,{correct:a+b,explanation:"Complete division before addition."}),
      q(year,skill,set,4,"fill-blank","Complete the expression.",{template:`${a} + {{blank}} × 2 = ${a+2*b}`,acceptedAnswers:[String(b)],explanation:`The missing value is ${b}.`}),
      q(year,skill,set,5,"single","Which operation should be completed first in 7 + 4 × 3?",{answers:["multiplication","addition","either"],correct:0,explanation:"Multiplication comes before addition."}),
      q(year,skill,set,6,"multiple","Select all expressions equal to 14.",{answers:["2+3×4","(2+5)×2","20−3×2","4+5×2"],correct:[0,1,2,3],explanation:"Each expression evaluates to 14 using the correct order."}),
      q(year,skill,set,7,"order","Order the steps for 5 + 3 × 4.",{items:["Add 5 + 12","Calculate 3 × 4","Get 17"],correct:["Calculate 3 × 4","Add 5 + 12","Get 17"],instruction:"Arrange the calculation steps.",explanation:"Multiply first, then add."})
    ];
  }

  function geometry(year,skill,set,kind){
    if(kind==="trig" || kind==="pythagoras"){
      const T=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,12,15]][set%5], [a,b,h]=T;
      return [
        q(year,skill,set,0,"single",`A right triangle has legs ${a} and ${b}. What is the hypotenuse?`,{answers:[String(h),String(a+b),String(h+1)],correct:0,explanation:`${a}²+${b}²=${h}².`}),
        q(year,skill,set,1,"single","Which ratio defines sin θ?",{answers:["opposite / hypotenuse","adjacent / hypotenuse","opposite / adjacent"],correct:0,explanation:"SOH: sine = opposite/hypotenuse."}),
        q(year,skill,set,2,"true-false","The hypotenuse is opposite the right angle.",{answers:["True","False"],correct:0,explanation:"That defines the hypotenuse."}),
        q(year,skill,set,3,"number",`With hypotenuse ${h} and one leg ${a}, find the other leg.`,{correct:b,explanation:`√(${h}²−${a}²)=${b}.`}),
        q(year,skill,set,4,"fill-blank","Complete Pythagoras' theorem.",{template:"a² + b² = {{blank}}²",acceptedAnswers:["c"],explanation:"c represents the hypotenuse."}),
        q(year,skill,set,5,"single","If opposite=6 and hypotenuse=10, sin θ equals",{answers:["0.6","1.6","0.4"],correct:0,explanation:"6/10=0.6."}),
        q(year,skill,set,6,"multiple","Select all correct right-triangle ratios.",{answers:["sin=opp/hyp","cos=adj/hyp","tan=opp/adj","tan=hyp/opp"],correct:[0,1,2],explanation:"SOH–CAH–TOA gives the first three."}),
        q(year,skill,set,7,"order","Order the steps to find a missing side using Pythagoras.",{items:["Take the positive square root","Substitute known lengths","Rearrange for the missing square"],correct:["Substitute known lengths","Rearrange for the missing square","Take the positive square root"],instruction:"Arrange the method.",explanation:"Substitute, rearrange, square root."})
      ];
    }
    if(kind==="coordinates"){
      const x=1+(set%5),y=2+((set*2)%6),dx=2+(set%4);
      return [
        q(year,skill,set,0,"single",`Translate (${x},${y}) by +${dx} in the x-direction.`,{answers:[`(${x+dx},${y})`,`(${x},${y+dx})`,`(${x-dx},${y})`],correct:0,explanation:"Change x; keep y."}),
        q(year,skill,set,1,"single","Which point is the origin?",{answers:["(0,0)","(1,0)","(0,1)"],correct:0,explanation:"The axes meet at (0,0)."}),
        q(year,skill,set,2,"true-false","Coordinates are written in the order (x,y).",{answers:["True","False"],correct:0,explanation:"x-coordinate comes first."}),
        q(year,skill,set,3,"number",`What is the x-coordinate of (${x},${y})?`,{correct:x,explanation:"The first coordinate is x."}),
        q(year,skill,set,4,"fill-blank","Complete the coordinate.",{template:`Move (${x},${y}) up 3 units → (${x}, {{blank}})`,acceptedAnswers:[String(y+3)],explanation:"Moving up changes y."}),
        q(year,skill,set,5,"single","Which transformation is a slide?",{answers:["translation","reflection","rotation"],correct:0,explanation:"A translation slides a shape."}),
        q(year,skill,set,6,"multiple","Select all transformations that preserve lengths.",{answers:["translation","reflection","rotation","non-uniform stretch"],correct:[0,1,2],explanation:"Rigid transformations preserve lengths."}),
        q(year,skill,set,7,"order","Order these x-coordinates from left to right.",{items:["x=4","x=−2","x=1"],correct:["x=−2","x=1","x=4"],instruction:"Think about the number line.",explanation:"Smaller x-values lie farther left."})
      ];
    }
    const L=4+(set%10),W=3+((set*2)%7),area=L*W,per=2*(L+W);
    return [
      q(year,skill,set,0,"single",`Area of a rectangle ${L} cm by ${W} cm is`,{answers:[`${area} cm²`,`${per} cm²`,`${L+W} cm²`],correct:0,explanation:"Area = length × width."}),
      q(year,skill,set,1,"single","Which angle is greater than 90° but less than 180°?",{answers:["obtuse","acute","right"],correct:0,explanation:"That is an obtuse angle."}),
      q(year,skill,set,2,"true-false","Area is measured in square units.",{answers:["True","False"],correct:0,explanation:"Area is two-dimensional."}),
      q(year,skill,set,3,"number",`Find the perimeter of a rectangle ${L} cm by ${W} cm.`,{correct:per,explanation:"Perimeter = 2(length+width)."}),
      q(year,skill,set,4,"fill-blank","Complete the metric conversion.",{template:"1 km = {{blank}} m",acceptedAnswers:["1000"],explanation:"1 kilometre equals 1000 metres."}),
      q(year,skill,set,5,"single","Which unit is suitable for classroom floor area?",{answers:["m²","cm³","km"],correct:0,explanation:"Square metres measure room-sized area."}),
      q(year,skill,set,6,"multiple","Select all quantities measured in square units.",{answers:["area","surface area","perimeter","volume"],correct:[0,1],explanation:"Area and surface area use square units."}),
      q(year,skill,set,7,"order","Order the lengths from smallest to largest.",{items:["0.5 m","75 cm","1 m"],correct:["0.5 m","75 cm","1 m"],instruction:"Convert to a common unit.",explanation:"50 cm < 75 cm < 100 cm."})
    ];
  }

  function stats(year,skill,set){
    const k=set%4,data=[2+k,4+k,4+k,6+k,9+k],mode=4+k;
    return [
      q(year,skill,set,0,"single",`What is the median of ${data.join(", ")}?`,{answers:[String(data[2]),String(data[4]),String(data[0])],correct:0,explanation:"The median is the middle ordered value."}),
      q(year,skill,set,1,"single",`What is the mode of ${data.join(", ")}?`,{answers:[String(mode),String(data[4]),"There is no mode"],correct:0,explanation:`${mode} occurs most often.`}),
      q(year,skill,set,2,"true-false","A larger representative sample can reduce random sampling variation.",{answers:["True","False"],correct:0,explanation:"Larger representative samples are often more stable."}),
      q(year,skill,set,3,"number",`Find the range of ${data.join(", ")}.`,{correct:data[4]-data[0],explanation:"Range = maximum − minimum."}),
      q(year,skill,set,4,"fill-blank","Complete the probability statement.",{template:"The probability of a certain event is {{blank}}.",acceptedAnswers:["1","100%"],explanation:"A certain event has probability 1."}),
      q(year,skill,set,5,"single","Which sample is most likely biased for a whole-school survey?",{answers:["only one sports team","random students from each year","a stratified school sample"],correct:0,explanation:"One sports team may not represent the whole school."}),
      q(year,skill,set,6,"multiple","Select all measures of centre.",{answers:["mean","median","mode","range"],correct:[0,1,2],explanation:"Range measures spread."}),
      q(year,skill,set,7,"order","Order probabilities from least likely to most likely.",{items:["0.75","0.1","0.5"],correct:["0.1","0.5","0.75"],instruction:"Compare values from 0 to 1.",explanation:"Larger probability means more likely."})
    ];
  }

  const FOUNDATION_SUBITISING = [
    {
      "question": "Look quickly. Which number names this pair?",
      "visual": "● ●",
      "answers": [
        "1",
        "2",
        "3"
      ],
      "correct": 1,
      "explanation": "A pair shows 2."
    },
    {
      "question": "Which amount is shown by the triangle?",
      "visual": "  ●\n● ●",
      "answers": [
        "2",
        "3",
        "4"
      ],
      "correct": 1,
      "explanation": "The triangle has 3 dots."
    },
    {
      "question": "Name the amount in the four-dot square.",
      "visual": "● ●\n● ●",
      "answers": [
        "3",
        "4",
        "5"
      ],
      "correct": 1,
      "explanation": "Two and two make 4."
    },
    {
      "question": "Which number matches this five-dot cross?",
      "visual": "  ●\n● ● ●\n  ●",
      "answers": [
        "3",
        "4",
        "5"
      ],
      "correct": 2,
      "explanation": "Four outside dots and one centre dot make 5."
    },
    {
      "question": "Which card matches the shown group?",
      "visual": "Shown: ● ● ●",
      "answers": [
        "A vertical card with 3 dots",
        "A card with 2 dots",
        "A card with 4 dots"
      ],
      "correct": 0,
      "explanation": "Both cards show 3."
    },
    {
      "question": "Which collection has fewer?",
      "visual": "A: ● ●\nB: ● ● ● ●",
      "answers": [
        "A",
        "B",
        "They are the same"
      ],
      "correct": 0,
      "explanation": "Two dots are fewer than four."
    },
    {
      "question": "Which parts describe this group of 5?",
      "visual": "● ●   ● ● ●",
      "answers": [
        "2 and 3",
        "1 and 3",
        "2 and 2"
      ],
      "correct": 0,
      "explanation": "The visible parts are 2 and 3."
    },
    {
      "question": "A four-dot card is spread out. How many dots are still there?",
      "visual": "●        ●\n    ●        ●",
      "answers": [
        "3",
        "4",
        "5"
      ],
      "correct": 1,
      "explanation": "Spacing does not change the quantity."
    },
    {
      "question": "In Snap, which card matches a five-finger hand?",
      "answers": [
        "3 dots",
        "4 dots",
        "5 dots"
      ],
      "correct": 2,
      "explanation": "Five fingers match 5 dots."
    },
    {
      "question": "Which order goes from fewer dots to more dots?",
      "answers": [
        "2, 3, 5",
        "5, 3, 2",
        "3, 2, 5"
      ],
      "correct": 0,
      "explanation": "Two, three, five is increasing order."
    },
    {
      "question": "How many filled spaces are in this five-frame?",
      "visual": "● ● ● ○ ○",
      "answers": [
        "2",
        "3",
        "5"
      ],
      "correct": 1,
      "explanation": "Three spaces are filled."
    },
    {
      "question": "Which number word matches this vertical pair?",
      "visual": "●\n●",
      "answers": [
        "one",
        "two",
        "three"
      ],
      "correct": 1,
      "explanation": "The vertical pair shows two."
    },
    {
      "question": "Which other arrangement shows the same amount?",
      "visual": "Shown: ● ●\n       ●",
      "answers": [
        "● ● ●",
        "● ● ● ●",
        "● ●"
      ],
      "correct": 0,
      "explanation": "Both arrangements have 3 dots."
    },
    {
      "question": "Two dots and two dots make which whole?",
      "visual": "● ●   ● ●",
      "answers": [
        "3",
        "4",
        "5"
      ],
      "correct": 1,
      "explanation": "Two and two make 4."
    },
    {
      "question": "A five-frame has one empty space. How many counters are filled?",
      "visual": "● ● ● ● ○",
      "answers": [
        "3",
        "4",
        "5"
      ],
      "correct": 1,
      "explanation": "Four spaces are filled."
    },
    {
      "question": "Who has more: Mia with 5 counters or Leo with 3?",
      "answers": [
        "Mia",
        "Leo",
        "They are equal"
      ],
      "correct": 0,
      "explanation": "Five is more than three."
    },
    {
      "question": "A die face shows 4. Which collection matches it?",
      "answers": [
        "2 buttons",
        "4 buttons",
        "5 buttons"
      ],
      "correct": 1,
      "explanation": "The matching collection contains 4."
    },
    {
      "question": "The card is turned upside down. What happens to its 3 dots?",
      "answers": [
        "It shows 2",
        "It still shows 3",
        "It shows 4"
      ],
      "correct": 1,
      "explanation": "Turning a card does not change its quantity."
    },
    {
      "question": "Which collection belongs in the middle: 1 dot, 4 dots, 3 dots?",
      "answers": [
        "1 dot",
        "3 dots",
        "4 dots"
      ],
      "correct": 1,
      "explanation": "The order is 1, 3, 4."
    },
    {
      "question": "Which sentence matches a group seen as 4 and 1?",
      "answers": [
        "4 + 1 = 5",
        "3 + 1 = 4",
        "2 + 2 = 4"
      ],
      "correct": 0,
      "explanation": "Four and one make 5."
    },
    {
      "question": "Look at the slanting pattern. How many dots?",
      "visual": "●\n  ●\n●",
      "answers": [
        "2",
        "3",
        "4"
      ],
      "correct": 1,
      "explanation": "The slanting pattern has 3 dots."
    },
    {
      "question": "Which card shows the same amount as the word four?",
      "answers": [
        "● ● ●",
        "● ● ● ●",
        "● ● ● ● ●"
      ],
      "correct": 1,
      "explanation": "A row of 4 matches the word four."
    },
    {
      "question": "Which is more: a four-dot square or a two-dot diagonal?",
      "answers": [
        "The four-dot square",
        "The two-dot diagonal",
        "They are the same"
      ],
      "correct": 0,
      "explanation": "Four is more than two."
    },
    {
      "question": "A group has 3 red counters and 1 blue counter. How many altogether?",
      "visual": "🔴 🔴 🔴   🔵",
      "answers": [
        "3",
        "4",
        "5"
      ],
      "correct": 1,
      "explanation": "Three and one make 4."
    },
    {
      "question": "Which card completes a memory pair for this amount?",
      "visual": "● ● ● ● ●",
      "answers": [
        "A five-finger picture",
        "A four-dot die",
        "A three-dot triangle"
      ],
      "correct": 0,
      "explanation": "Both representations show 5."
    },
    {
      "question": "Both cards have 4 dots, but one card is wider. Which statement is true?",
      "answers": [
        "The wider card has more",
        "Both show 4",
        "The narrow card has more"
      ],
      "correct": 1,
      "explanation": "Card width does not change the quantity."
    },
    {
      "question": "How many more counters fill this five-frame?",
      "visual": "● ● ● ○ ○",
      "answers": [
        "1",
        "2",
        "3"
      ],
      "correct": 1,
      "explanation": "Two spaces are empty."
    },
    {
      "question": "Which number names this single counter?",
      "visual": "🟡",
      "answers": [
        "1",
        "2",
        "3"
      ],
      "correct": 0,
      "explanation": "One counter represents 1."
    },
    {
      "question": "Which row orders the card amounts correctly?",
      "answers": [
        "5, 4, 2",
        "2, 4, 5",
        "4, 2, 5"
      ],
      "correct": 1,
      "explanation": "Two, four, five goes from fewer to more."
    },
    {
      "question": "Nina sees 2 dots on top and 3 below. What whole should she name?",
      "visual": "● ●\n● ● ●",
      "answers": [
        "4",
        "5",
        "2"
      ],
      "correct": 1,
      "explanation": "Two and three make 5."
    }
  ];

  function foundationSubitising(year,skill,set){
    const {type="single",question,...extra}=FOUNDATION_SUBITISING[set];
    return q(year,skill,set,1,type,question,extra);
  }

  function genericNumber(year,skill,set){
    const y=YN(year);
    if(y===0){
      const a=2+((set*3)%14), b=Math.min(20,a+3);
      return [
        q(year,skill,set,0,"single",`Which numeral comes after ${a}?`,{answers:[String(Math.max(0,a-1)),String(a+1),String(Math.min(20,a+2))],correct:1,explanation:`${a+1} comes after ${a}.`}),
        foundationSubitising(year,skill,set),
        q(year,skill,set,2,"true-false",`${b} is greater than ${a}.`,{answers:["True","False"],correct:0,explanation:`${b} comes after ${a}.`}),
        q(year,skill,set,3,"number","How many dots are shown?",{visual:"● ● ● ● ● ●",correct:6,explanation:"There are 6 dots."}),
        q(year,skill,set,4,"fill-blank","Complete the number sequence.",{template:`${a}, ${a+1}, {{blank}}, ${a+3}`,acceptedAnswers:[String(a+2)],explanation:"Count forward by 1."}),
        q(year,skill,set,5,"single",`Which number is between ${a} and ${a+2}?`,{answers:[String(a+1),String(a),String(a+2)],correct:0,explanation:`${a+1} is between them.`}),
        q(year,skill,set,6,"multiple","Select all numbers greater than 10.",{answers:["8","12","6","15"],correct:[1,3],explanation:"12 and 15 are greater than 10."}),
        q(year,skill,set,7,"order","Put the numbers from smallest to largest.",{items:["12","8","10"],correct:["8","10","12"],instruction:"Use the arrows to arrange the numbers.",explanation:"Count forward to order the numbers."})
      ];
    }
    if(y<=3){
      const max=y===0?20:y===1?120:y===2?1000:10000;
      const base=y===0 ? 2+((set*3)%15) : 10+((set*37 + y*101)%Math.max(30,max-(y===1?30:y===2?200:2000)));
      const step=y===0?1:y===1?10:y===2?100:1000;
      return [
        q(year,skill,set,0,"single",`Which number is ${step} more than ${base}?`,{answers:[String(base+step),String(base+10),String(Math.max(0,base-step))],correct:0,explanation:`Add ${step}.`}),
        q(year,skill,set,1,"single","Which number is greatest?",{answers:[String(base+7),String(base+17),String(base-3)],correct:1,explanation:`${base+17} is greatest.`}),
        q(year,skill,set,2,"true-false",`${base+25} is greater than ${base+19}.`,{answers:["True","False"],correct:0,explanation:"Compare place values."}),
        q(year,skill,set,3,"number",`What is ${step} less than ${base+step+20}?`,{correct:base+20,explanation:`Subtract ${step}.`}),
        q(year,skill,set,4,"fill-blank","Complete the pattern.",{template:`${base}, ${base+10}, {{blank}}, ${base+30}`,acceptedAnswers:[String(base+20)],explanation:"The pattern increases by 10."}),
        q(year,skill,set,5,"single",`Which is closest to ${base+50}?`,{answers:[String(base+49),String(base+60),String(base+30)],correct:0,explanation:"Compare distances."}),
        q(year,skill,set,6,"multiple",`Select all numbers less than ${base+20}.`,{answers:[String(base+5),String(base+30),String(base-10),String(base+25)],correct:[0,2],explanation:"The first and third are less."}),
        q(year,skill,set,7,"order","Order from smallest to largest.",{items:[String(base+45),String(base-15),String(base+10)],correct:[String(base-15),String(base+10),String(base+45)],instruction:"Compare place values.",explanation:"Order from least to greatest."})
      ];
    }
    const a=Number((2.35+(set%20)*0.17).toFixed(2)), b=Number((0.4+((set*3)%10)*0.1).toFixed(2));
    const sum=Number((a+b).toFixed(2)),diff=Number((a-b).toFixed(2));
    return [
      q(year,skill,set,0,"single",`${a} + ${b} = ?`,{answers:[String(sum),String(sum+1),String(sum-1)],correct:0,explanation:`The sum is ${sum}.`}),
      q(year,skill,set,1,"single",`${a} − ${b} = ?`,{answers:[String(diff),String(diff+0.5),String(diff-0.5)],correct:0,explanation:`The difference is ${diff}.`}),
      q(year,skill,set,2,"true-false","−7 is less than −3.",{answers:["True","False"],correct:0,explanation:"−7 lies farther left on a number line."}),
      q(year,skill,set,3,"number",`Round ${1234+set*17} to the nearest hundred.`,{correct:Math.round((1234+set*17)/100)*100,explanation:"Use the tens digit to choose the nearest hundred."}),
      q(year,skill,set,4,"fill-blank","Complete the decimal sequence.",{template:`${a}, ${Number((a+0.1).toFixed(2))}, {{blank}}, ${Number((a+0.3).toFixed(2))}`,acceptedAnswers:[String(Number((a+0.2).toFixed(2)))],explanation:"The sequence increases by 0.1."}),
      q(year,skill,set,5,"single","Which is closest to zero?",{answers:["−8","−2","5"],correct:1,explanation:"−2 has the smallest absolute value."}),
      q(year,skill,set,6,"multiple","Select all rational numbers.",{answers:["0.25","−4","√5","7/8"],correct:[0,1,3],explanation:"The first, second and fourth are rational."}),
      q(year,skill,set,7,"order","Order from smallest to largest.",{items:["−3","0.5","−1"],correct:["−3","−1","0.5"],instruction:"Use the number line.",explanation:"−3 < −1 < 0.5."})
    ];
  }


  function integerFactors(year,skill,set){
    const isYear5Factors=year==="5"&&skill==="factors-multiples-place-value";
    const n=isYear5Factors?12+2*set:12+2*(set%12);
    const m=isYear5Factors?18+3*set:18+3*(set%10);
    const neg=isYear5Factors?2+set:2+(set%9);
    const year5Primes=[
      29,31,37,41,43,47,53,59,61,67,
      71,73,79,83,89,97,101,103,107,109,
      113,127,131,137,139,149,151,157,163,167
    ];
    const prime=isYear5Factors?year5Primes[set]:29;
    const compositeA=isYear5Factors?9*(set+3):21;
    const compositeB=isYear5Factors?10*(set+4):35;
    const g=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){const t=b;b=a%b;a=t;}return a||1;};
    const gf=g(n,m);
    return [
      q(year,skill,set,0,"single",`Which is a factor of ${n}?`,{answers:["2",String(n+1),String(n+3)],correct:0,explanation:`2 divides ${n} exactly.`}),
      q(year,skill,set,1,"single",`Which integer is greatest?`,{answers:[`−${neg+3}`,`−${neg}`,String(neg-1)],correct:2,explanation:"A positive integer is greater than negative integers."}),
      q(year,skill,set,2,"true-false",`−${neg+4} is less than −${neg}.`,{answers:["True","False"],correct:0,explanation:"The more negative value lies farther left on the number line."}),
      q(year,skill,set,3,"number",`Find the greatest common factor of ${n} and ${m}.`,{correct:gf,explanation:`The greatest common factor is ${gf}.`}),
      q(year,skill,set,4,"fill-blank","Complete the integer equation.",{template:`−${neg} + {{blank}} = ${neg+1}`,acceptedAnswers:[String(2*neg+1)],explanation:`The missing value is ${2*neg+1}.`}),
      q(year,skill,set,5,"single","Which number is prime?",{answers:[String(prime),String(compositeA),String(compositeB)],correct:0,explanation:`${prime} has exactly two positive factors: 1 and ${prime}.`}),
      q(year,skill,set,6,"multiple",`Select all factors of ${n}.`,{answers:["1","2",String(n),String(n+1)],correct:[0,1,2],explanation:`1, 2 and ${n} divide ${n} exactly.`}),
      q(year,skill,set,7,"order","Order the integers from smallest to largest.",{items:[`−${neg+5}`,String(neg),`−${neg}`],correct:[`−${neg+5}`,`−${neg}`,String(neg)],instruction:"Use the number line.",explanation:"Negative values come before positive values."})
    ];
  }

  function scientificNotation(year,skill,set){
    const a=2+(set%7), power=3+(set%5), whole=a*(10**power);
    return [
      q(year,skill,set,0,"single",`Write ${whole} in scientific notation.`,{answers:[`${a} × 10^${power}`,`${a} × 10^${power-1}`,`${a*10} × 10^${power}`],correct:0,explanation:`${whole} = ${a} × 10^${power}.`}),
      q(year,skill,set,1,"single",`Which is equal to ${a} × 10^${power}?`,{answers:[String(whole),String(a*(10**(power-1))),String((a+1)*(10**power))],correct:0,explanation:"Move the decimal point according to the power of ten."}),
      q(year,skill,set,2,"true-false","10^-3 = 0.001.",{answers:["True","False"],correct:0,explanation:"A negative power of ten represents a reciprocal power."}),
      q(year,skill,set,3,"number",`What is the exponent in ${a} × 10^${power}?`,{correct:power,explanation:`The exponent is ${power}.`}),
      q(year,skill,set,4,"fill-blank","Complete the scientific notation.",{template:`0.00${a} = ${a} × 10^{{blank}}`,acceptedAnswers:["-3","−3"],explanation:"The decimal moves three places to become the coefficient."}),
      q(year,skill,set,5,"single","Which is written correctly in scientific notation?",{answers:["4.2 × 10^6","42 × 10^5","0.42 × 10^7"],correct:0,explanation:"The coefficient should be at least 1 and less than 10."}),
      q(year,skill,set,6,"multiple","Select all expressions equal to 10^6.",{answers:["10^2 × 10^4","10^8 ÷ 10^2","(10^3)^2","10^3 + 10^3"],correct:[0,1,2],explanation:"Index laws give 10^6 for the first three."}),
      q(year,skill,set,7,"order","Order from smallest to largest.",{items:["2 × 10^3","7 × 10^2","1 × 10^4"],correct:["7 × 10^2","2 × 10^3","1 × 10^4"],instruction:"Compare powers of ten and coefficients.",explanation:"700 < 2000 < 10000."})
    ];
  }

  function surds(year,skill,set){
    const a=2+(set%5);
    return [
      q(year,skill,set,0,"single",`Simplify √${a*a*2}.`,{answers:[`${a}√2`,`2√${a}`,String(a*2)],correct:0,explanation:`√(${a*a}×2) = ${a}√2.`}),
      q(year,skill,set,1,"single","Which number is irrational?",{answers:["√5","0.125","7/8"],correct:0,explanation:"√5 is irrational."}),
      q(year,skill,set,2,"true-false","Every terminating decimal is rational.",{answers:["True","False"],correct:0,explanation:"A terminating decimal can be written as a fraction of integers."}),
      q(year,skill,set,3,"number",`Evaluate √${(a+3)**2}.`,{correct:a+3,explanation:`The principal square root is ${a+3}.`}),
      q(year,skill,set,4,"fill-blank","Complete the exact simplification.",{template:"√50 = {{blank}}√2",acceptedAnswers:["5"],explanation:"50 = 25×2."}),
      q(year,skill,set,5,"single","Which interval contains √30?",{answers:["5 to 6","4 to 5","6 to 7"],correct:0,explanation:"25 < 30 < 36."}),
      q(year,skill,set,6,"multiple","Select all rational numbers.",{answers:["−4","0.375","√7","11/5"],correct:[0,1,3],explanation:"The first, second and fourth are rational."}),
      q(year,skill,set,7,"order","Order from smallest to largest.",{items:["√4","√16","√9"],correct:["√4","√9","√16"],instruction:"Evaluate the roots first.",explanation:"2 < 3 < 4."})
    ];
  }

  function simultaneous(year,skill,set){
    const x=2+(set%6),y=1+((set*2)%5),sum=x+y,diff=x-y;
    return [
      q(year,skill,set,0,"single",`Solve x+y=${sum} and x−y=${diff}.`,{answers:[`x=${x}, y=${y}`,`x=${y}, y=${x}`,`x=${sum}, y=${diff}`],correct:0,explanation:"Add the equations to eliminate y, then substitute back."}),
      q(year,skill,set,1,"single","Which method removes a variable by adding or subtracting equations?",{answers:["elimination","factorisation","rounding"],correct:0,explanation:"Elimination combines equations to remove one variable."}),
      q(year,skill,set,2,"true-false","A solution to simultaneous equations must satisfy both equations.",{answers:["True","False"],correct:0,explanation:"Both equations must be true for the same values."}),
      q(year,skill,set,3,"number",`If x+y=${sum} and y=${y}, find x.`,{correct:x,explanation:`x=${sum}−${y}=${x}.`}),
      q(year,skill,set,4,"fill-blank","Complete the substitution.",{template:`If x+y=${sum} and x=${x}, y={{blank}}`,acceptedAnswers:[String(y)],explanation:`y=${y}.`}),
      q(year,skill,set,5,"single","Which pair solves x+y=7 and x−y=1?",{answers:["x=4,y=3","x=3,y=4","x=7,y=1"],correct:0,explanation:"4+3=7 and 4−3=1."}),
      q(year,skill,set,6,"multiple","Select all valid first steps when solving simultaneous linear equations.",{answers:["eliminate one variable","substitute one equation into the other","check a final pair in both equations","ignore one equation"],correct:[0,1,2],explanation:"The first three are valid parts of solution methods."}),
      q(year,skill,set,7,"order","Order the elimination steps.",{items:["Solve for the remaining variable","Combine equations to eliminate a variable","Substitute back to find the second variable"],correct:["Combine equations to eliminate a variable","Solve for the remaining variable","Substitute back to find the second variable"],instruction:"Arrange the method.",explanation:"Eliminate, solve, then back-substitute."})
    ];
  }

  function exponential(year,skill,set){
    const initial=100+20*(set%8),rate=[5,10,20][set%3],factor=1+rate/100;
    const one=Number((initial*factor).toFixed(2)),two=Number((initial*factor*factor).toFixed(2));
    return [
      q(year,skill,set,0,"single",`What multiplier represents ${rate}% growth?`,{answers:[String(factor),String(rate/100),String(1-rate/100)],correct:0,explanation:`${rate}% growth uses ${factor}.`}),
      q(year,skill,set,1,"single",`${initial} grows by ${rate}%. What is the value after one period?`,{answers:[String(one),String(initial+rate),String(initial-rate)],correct:0,explanation:`${initial}×${factor}=${one}.`}),
      q(year,skill,set,2,"true-false","Exponential growth repeatedly multiplies by the same growth factor.",{answers:["True","False"],correct:0,explanation:"Exponential change is multiplicative."}),
      q(year,skill,set,3,"number",`A value of ${initial} grows by ${rate}% for one period. Find the new value.`,{correct:one,explanation:`Multiply by ${factor}.`}),
      q(year,skill,set,4,"fill-blank","Complete the growth factor.",{template:`A 5% increase uses multiplier {{blank}}.`,acceptedAnswers:["1.05"],explanation:"100%+5%=105%=1.05."}),
      q(year,skill,set,5,"single","Which relationship shows exponential growth?",{answers:["multiply by 1.05 each period","add 5 each period","stay constant"],correct:0,explanation:"Repeated multiplication by a fixed factor greater than 1 is exponential growth."}),
      q(year,skill,set,6,"multiple","Select all statements true for a 10% decay.",{answers:["multiplier is 0.9","90% remains each period","the same percentage is removed from the current amount","subtract the same fixed number every period"],correct:[0,1,2],explanation:"Percentage decay is multiplicative, not a fixed subtraction."}),
      q(year,skill,set,7,"order","Order the steps for repeated percentage growth.",{items:["Apply the factor for each period","Convert the percentage to a multiplier","Start with the initial value"],correct:["Start with the initial value","Convert the percentage to a multiplier","Apply the factor for each period"],instruction:"Arrange the modelling steps.",explanation:"Identify the initial value and factor before repeated multiplication."})
    ];
  }

  function fallback(year,skill,set,s){
    return vocab(year,skill,set,s);
  }

  function generate(year,skill){
    year=String(year);
    const meta=topicMeta(year,skill), s=support(year,skill);
    if(!meta || !s) return [];
    const kind=meta.kind;
    const out=[];
    for(let set=0;set<30;set++){
      let arr;
      if(skill.includes("scientific-notation")) arr=scientificNotation(year,skill,set);
      else if(skill==="real-numbers-surds") arr=surds(year,skill,set);
      else if(skill==="linear-simultaneous-equations") arr=simultaneous(year,skill,set);
      else if(skill==="exponential-growth-decay") arr=exponential(year,skill,set);
      else if(skill==="integers" || skill==="number-properties-integers" || skill.includes("factors-multiples")) arr=integerFactors(year,skill,set);
      else if(skill==="fractions-decimals") arr=fractions(year,skill,set);
      else if(kind==="vocabulary") arr=vocab(year,skill,set,s);
      else if(kind==="multiplication") arr=multiplication(year,skill,set);
      else if(kind==="fractions") arr=fractions(year,skill,set);
      else if(kind==="percent" || kind==="ratio") arr=percentRatio(year,skill,set);
      else if(kind==="addsub") arr=addsub(year,skill,set);
      else if(kind==="operations") arr=orderOperations(year,skill,set);
      else if(kind==="indices") arr=indices(year,skill,set);
      else if(["algebra","equations","linear","functions","quadratic"].includes(kind)) arr=algebra(year,skill,set,kind);
      else if(["geometry","coordinates","pythagoras","trig"].includes(kind)) arr=geometry(year,skill,set,kind);
      else if(kind==="stats" || kind==="probability") arr=stats(year,skill,set);
      else if(["number","integer","rational","decimal"].includes(kind)) arr=genericNumber(year,skill,set);
      else if(kind==="patterns") arr=patterns(year,skill,set);
      else if(kind==="mixed-early") arr=mixedEarly(year,skill,set);
      else arr=fallback(year,skill,set,s);
      out.push(...arr);
    }
    return out;
  }

  window.SkillrDailyMath={generate,questionsPerTopic:240,setsPerTopic:30};
})();
