(() => {
"use strict";

const ynum = y => y === "F" ? 0 : Number(y);
const pick = (a,i) => a[((i%a.length)+a.length)%a.length];
const f = n => Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2)));
const levels=["easy","easy","core","core","core","application","application","challenge"];
let CTX={year:"F",skill:""};
const Q=(cycle,pos,type,question,extra={})=>({
  id:`m-${CTX.year}-${CTX.skill}-c${cycle+1}-q${pos+1}`,
  year:CTX.year,subject:"math",skill:CTX.skill,cycle,difficulty:levels[pos],type,question,...extra
});
const set=(year,skill,c,builders)=>{CTX={year:String(year),skill};return builders.map((b,i)=>b(i));};

function numberSet(year,skill,c){
 const y=ynum(year);
 if(y===0){
  const a=4+c*2,n=8+c;
  return set(year,skill,c,[
   p=>Q(c,p,"single",`Which numeral comes after ${a}?`,{answers:[String(a+1),String(a-1),String(a+2)],correct:0,explanation:`${a+1} comes after ${a}.`}),
   p=>Q(c,p,"single","Which collection has more?",{visual:`First:  ${"● ".repeat(3+c%3).trim()}\nSecond: ${"● ".repeat(5+c%3).trim()}`,answers:["Second","First","They are the same"],correct:0,explanation:"The second collection has more dots."}),
   p=>Q(c,p,"true-false",`${n} is greater than ${n-2}.`,{answers:["True","False"],correct:0,explanation:`${n} > ${n-2}.`}),
   p=>Q(c,p,"number","How many dots are shown?",{visual:"● ".repeat(6+c).trim(),correct:6+c,explanation:`There are ${6+c} dots.`}),
   p=>Q(c,p,"fill-blank","Complete the number sequence.",{template:`${a}, ${a+1}, {{blank}}, ${a+3}`,acceptedAnswers:[String(a+2)],explanation:`The missing number is ${a+2}.`}),
   p=>Q(c,p,"single",`Which number is between ${a+2} and ${a+4}?`,{answers:[String(a+3),String(a+1),String(a+5)],correct:0,explanation:`${a+3} is between them.`}),
   p=>Q(c,p,"multiple","Select all numbers greater than 10.",{answers:[String(11+c),String(7+c),String(13+c),String(5+c)],correct:[0,2],explanation:"The first and third numbers are greater than 10."}),
   p=>Q(c,p,"order","Put the numbers from smallest to largest.",{items:[String(12+c),String(8+c),String(10+c)],correct:[String(8+c),String(10+c),String(12+c)],instruction:"Use the arrows to arrange the numbers.",explanation:"Count forward to order them."})
  ]);
 }
 if(y<=3){
  const step=y===1?10:y===2?100:1000;
  const base=y===1?34+c*11:y===2?245+c*73:2430+c*311;
  return set(year,skill,c,[
   p=>Q(c,p,"single",`Which number is ${step} more than ${base}?`,{answers:[String(base+step),String(base+10),String(base-step)],correct:0,explanation:`${base}+${step}=${base+step}.`}),
   p=>Q(c,p,"single","Which number is greatest?",{answers:[String(base+17),String(base+7),String(base-3)],correct:0,explanation:`${base+17} is greatest.`}),
   p=>Q(c,p,"true-false",`${base+25} is greater than ${base+19}.`,{answers:["True","False"],correct:0,explanation:"Compare place values from left to right."}),
   p=>Q(c,p,"number",`What is ${step} less than ${base+step+20}?`,{correct:base+20,explanation:`Subtract ${step}.`}),
   p=>Q(c,p,"fill-blank","Complete the pattern.",{template:`${base}, ${base+10}, {{blank}}, ${base+30}`,acceptedAnswers:[String(base+20)],explanation:"The pattern increases by 10."}),
   p=>Q(c,p,"single",`Which is an expanded form of ${base}?`,{answers:[expanded(base),`${base}+10`,`${Math.floor(base/10)}+${base%10}`],correct:0,explanation:"Expanded form shows the value of each digit."}),
   p=>Q(c,p,"multiple",`Select all numbers less than ${base+20}.`,{answers:[String(base+5),String(base+30),String(base-10),String(base+25)],correct:[0,2],explanation:"Compare each value with the target."}),
   p=>Q(c,p,"order","Order from smallest to largest.",{items:[String(base+45),String(base-15),String(base+10)],correct:[String(base-15),String(base+10),String(base+45)],instruction:"Use place value to arrange them.",explanation:"Compare the highest place first."})
  ]);
 }
 if(y<=5){
  const base=14325+c*2713, dec=2.35+c*.41;
  return set(year,skill,c,[
   p=>Q(c,p,"single",`Round ${base} to the nearest thousand.`,{answers:[String(Math.round(base/1000)*1000),String(Math.floor(base/1000)*1000),String(Math.ceil(base/1000)*1000+1000)],correct:0,explanation:"Look at the hundreds digit to round to the nearest thousand."}),
   p=>Q(c,p,"single","Which decimal is greatest?",{answers:[f(dec+.08),f(dec),f(dec-.11)],correct:0,explanation:"Compare ones, tenths and hundredths."}),
   p=>Q(c,p,"true-false",`In ${base}, moving one place left makes a digit worth 10 times as much.`,{answers:["True","False"],correct:0,explanation:"Our place-value system is base ten."}),
   p=>Q(c,p,"number",`Round ${base+477} to the nearest hundred.`,{correct:Math.round((base+477)/100)*100,explanation:"Use the tens digit to round to the nearest hundred."}),
   p=>Q(c,p,"fill-blank","Complete the decimal sequence.",{template:`${f(dec)}, ${f(dec+.1)}, {{blank}}, ${f(dec+.3)}`,acceptedAnswers:[f(dec+.2)],explanation:"Add 0.1 each time."}),
   p=>Q(c,p,"single",`Which number is ${base} written in standard form?`,{answers:[String(base),String(base+1000),String(base-100)],correct:0,explanation:"Standard form is the usual numeral."}),
   p=>Q(c,p,"multiple",`Select all values between ${f(dec)} and ${f(dec+1)}.`,{answers:[f(dec+.2),f(dec-.1),f(dec+.8),f(dec+1.2)],correct:[0,2],explanation:"Only the first and third lie in the interval."}),
   p=>Q(c,p,"order","Order the decimals from smallest to largest.",{items:[f(dec+.6),f(dec+.03),f(dec+.25)],correct:[f(dec+.03),f(dec+.25),f(dec+.6)],instruction:"Use place value to arrange them.",explanation:"Compare tenths then hundredths."})
  ]);
 }
 if(y===6){
  const k=3+c;
  return set(year,skill,c,[
   p=>Q(c,p,"single",`Which is a factor of ${12*k}?`,{answers:[String(k),String(12*k-1),String(12*k+1)],correct:0,explanation:`${12*k} ÷ ${k} = 12.`}),
   p=>Q(c,p,"single","Which number is prime?",{answers:[pick([23,29,31,37,41,43],c),String(21+2*c),String(35+2*c)],correct:0,explanation:"A prime has exactly two positive factors."}),
   p=>Q(c,p,"true-false",`−${4+c} is less than −${2+c}.`,{answers:["True","False"],correct:0,explanation:"The more negative value is farther left on the number line."}),
   p=>Q(c,p,"number",`What is the absolute value of −${9+c}?`,{correct:9+c,explanation:"Absolute value is distance from zero."}),
   p=>Q(c,p,"fill-blank","Complete the integer equation.",{template:`−${3+c} + {{blank}} = ${2+c}`,acceptedAnswers:[String(5+2*c)],explanation:"Use the difference between the two values."}),
   p=>Q(c,p,"single","Which integer is closest to zero?",{answers:[`−${2+c}`,`−${8+c}`,String(5+c)],correct:0,explanation:"It has the smallest absolute value."}),
   p=>Q(c,p,"multiple",`Select all multiples of ${k}.`,{answers:[String(k*2),String(k*2+1),String(k*3),String(k*4+1)],correct:[0,2],explanation:"Multiples divide exactly by the given number."}),
   p=>Q(c,p,"order","Order from smallest to largest.",{items:[`−${5+c}`,String(1+c),`−${1+c}`],correct:[`−${5+c}`,`−${1+c}`,String(1+c)],instruction:"Arrange the integers.",explanation:"Use their number-line positions."})
  ]);
 }
 if(y===7) return integerPowerSet(year,skill,c);
 if(y===8) return indexSet(year,skill,c,false);
 if(y===9) return indexSet(year,skill,c,true);
 return realNumberSet(year,skill,c);
}

function expanded(n){
 const s=String(n), parts=[];
 for(let i=0;i<s.length;i++){const d=Number(s[i]);if(d)parts.push(String(d*10**(s.length-i-1)));}
 return parts.join(" + ");
}

function integerPowerSet(year,skill,c){
 const b=2+c%4,s=(5+c)**2;
 return set(year,skill,c,[
  p=>Q(c,p,"single",`What is √${s}?`,{answers:[String(5+c),String(s),String(10+2*c)],correct:0,explanation:`√${s}=${5+c}.`}),
  p=>Q(c,p,"single",`What is (−${3+c}) + ${8+c}?`,{answers:["5",String(11+2*c),"−5"],correct:0,explanation:"Adding the positive value moves right on the number line."}),
  p=>Q(c,p,"true-false",`${b}³ means ${b} × ${b} × ${b}.`,{answers:["True","False"],correct:0,explanation:"The exponent shows repeated equal factors."}),
  p=>Q(c,p,"number",`Calculate ${b}².`,{correct:b*b,explanation:`${b}²=${b*b}.`}),
  p=>Q(c,p,"fill-blank","Complete the power.",{template:`{{blank}}² = ${s}`,acceptedAnswers:[String(5+c)],explanation:`${5+c}²=${s}.`}),
  p=>Q(c,p,"single","Which has the greatest value?",{answers:[String(c+1),"0",`−${c+1}`],correct:0,explanation:"A positive number is greater than zero and a negative number."}),
  p=>Q(c,p,"multiple","Select all perfect squares.",{answers:["16","30","25","49"],correct:[0,2,3],explanation:"16, 25 and 49 are whole-number squares."}),
  p=>Q(c,p,"order","Order from smallest to largest.",{items:[`−${7+c}`,String(2+c),`−${2+c}`],correct:[`−${7+c}`,`−${2+c}`,String(2+c)],instruction:"Arrange the integers.",explanation:"Compare number-line positions."})
 ]);
}

function indexSet(year,skill,c,scientific){
 const b=2+c%4;
 if(!scientific){
  return set(year,skill,c,[
   p=>Q(c,p,"single",`Simplify ${b}² × ${b}³.`,{answers:[`${b}⁵`,`${b}⁶`,`${b}¹`],correct:0,explanation:"Add exponents when multiplying equal bases."}),
   p=>Q(c,p,"single","Which number is irrational?",{answers:["√2","0.75","3/8"],correct:0,explanation:"√2 cannot be written as a ratio of integers."}),
   p=>Q(c,p,"true-false",`${b}⁶ ÷ ${b}² = ${b}⁴.`,{answers:["True","False"],correct:0,explanation:"Subtract exponents in division with equal bases."}),
   p=>Q(c,p,"number",`Evaluate (−${b})².`,{correct:b*b,explanation:"Squaring a negative value gives a positive result."}),
   p=>Q(c,p,"fill-blank","Complete the index law.",{template:`${b}³ × ${b}{{blank}} = ${b}⁷`,acceptedAnswers:["4"],explanation:"3+4=7."}),
   p=>Q(c,p,"single","Which decimal is recurring?",{answers:["1/3 = 0.333…","1/4 = 0.25","1/2 = 0.5"],correct:0,explanation:"One third has a recurring decimal expansion."}),
   p=>Q(c,p,"multiple","Select all rational numbers.",{answers:["0.2","√3","3/7","−5"],correct:[0,2,3],explanation:"Terminating decimals, fractions and integers are rational."}),
   p=>Q(c,p,"order","Order from smallest to largest.",{items:["−√9","0","√4"],correct:["−√9","0","√4"],instruction:"Evaluate the roots, then order.",explanation:"−3 < 0 < 2."})
  ]);
 }
 const k=2+c;
 return set(year,skill,c,[
  p=>Q(c,p,"single",`Write ${k*1000000} in scientific notation.`,{answers:[`${k} × 10⁶`,`${k} × 10⁵`,`${k*10} × 10⁶`],correct:0,explanation:`${k*1000000}=${k}×10⁶.`}),
  p=>Q(c,p,"single","Simplify x³ × x².",{answers:["x⁵","x⁶","2x³"],correct:0,explanation:"Add the exponents."}),
  p=>Q(c,p,"true-false","10⁻³ = 0.001.",{answers:["True","False"],correct:0,explanation:"A negative exponent gives a reciprocal power of ten."}),
  p=>Q(c,p,"number",`Evaluate ${b}³.`,{correct:b**3,explanation:`${b}³=${b**3}.`}),
  p=>Q(c,p,"fill-blank","Complete the scientific notation.",{template:`${k/10} = ${k} × 10{{blank}}`,acceptedAnswers:["-1","−1"],explanation:"Moving the decimal one place left gives 10⁻¹."}),
  p=>Q(c,p,"single","Which is greatest?",{answers:[`${1+c/10} × 10⁵`,`${2+c} × 10⁴`,`${8-c/2} × 10³`],correct:0,explanation:"The 10⁵ term is greatest here."}),
  p=>Q(c,p,"multiple","Select all expressions equal to a⁶.",{answers:["a²×a⁴","a³+a³","a⁸÷a²","(a³)²"],correct:[0,2,3],explanation:"Index laws give a⁶ for the selected expressions."}),
  p=>Q(c,p,"order","Order from smallest to largest.",{items:["2 × 10³","7 × 10²","1 × 10⁴"],correct:["7 × 10²","2 × 10³","1 × 10⁴"],instruction:"Compare powers of ten.",explanation:"700 < 2000 < 10000."})
 ]);
}

function realNumberSet(year,skill,c){
 const b=2+c%4;
 return set(year,skill,c,[
  p=>Q(c,p,"single",`Which integer is closest to √${48+c}?`,{answers:["7","6","8"],correct:0,explanation:"7²=49, which is close to the radicand."}),
  p=>Q(c,p,"single","Which value is irrational?",{answers:["√5","0.125","7/11"],correct:0,explanation:"√5 is irrational."}),
  p=>Q(c,p,"true-false","Every terminating decimal is rational.",{answers:["True","False"],correct:0,explanation:"It can be written as a fraction of integers."}),
  p=>Q(c,p,"number",`Evaluate ${b}⁴.`,{correct:b**4,explanation:`${b}⁴=${b**4}.`}),
  p=>Q(c,p,"fill-blank","Complete the exact value.",{template:"√81 = {{blank}}",acceptedAnswers:["9"],explanation:"9²=81."}),
  p=>Q(c,p,"single",`Which interval contains √${30+c}?`,{answers:["5 to 6","4 to 5","6 to 7"],correct:0,explanation:"25 is below the radicand and 36 is above it."}),
  p=>Q(c,p,"multiple","Select all rational numbers.",{answers:["−4","√7","0.375","11/5"],correct:[0,2,3],explanation:"Integers, terminating decimals and integer fractions are rational."}),
  p=>Q(c,p,"order","Order from smallest to largest.",{items:["√4","√16","√9"],correct:["√4","√9","√16"],instruction:"Evaluate the roots first.",explanation:"2 < 3 < 4."})
 ]);
}

function operationsSet(year,skill,c){
 const y=ynum(year);
 if(y<=4){
  const a=y===0?4+c%3:y===1?8+c:y===2?34+3*c:y===3?238+31*c:1245+137*c;
  const b=y===0?2+c%2:y===1?4+c%4:y===2?15+2*c:y===3?74+9*c:286+31*c;
  const s=a+b,d=a-b;
  return set(year,skill,c,[
   p=>Q(c,p,"single",`${a} + ${b} = ?`,{answers:[String(s),String(s+1),String(s-1)],correct:0,explanation:`${a}+${b}=${s}.`}),
   p=>Q(c,p,"single",`${a} − ${b} = ?`,{answers:[String(d),String(d+2),String(d-2)],correct:0,explanation:`${a}−${b}=${d}.`}),
   p=>Q(c,p,"true-false",`${b} + ${a} = ${s}.`,{answers:["True","False"],correct:0,explanation:"Addition is commutative."}),
   p=>Q(c,p,"number",`There are ${a} counters and ${b} more are added. How many now?`,{correct:s,explanation:`Add to get ${s}.`}),
   p=>Q(c,p,"fill-blank","Complete the number sentence.",{template:`${a} + {{blank}} = ${s}`,acceptedAnswers:[String(b)],explanation:`The missing addend is ${b}.`}),
   p=>Q(c,p,"single",`Which checks ${a} − ${b} = ${d}?`,{answers:[`${d} + ${b} = ${a}`,`${a} + ${b} = ${d}`,`${d} − ${b} = ${a}`],correct:0,explanation:"Use the related addition fact."}),
   p=>Q(c,p,"multiple",`Select all expressions equal to ${s}.`,{answers:[`${a}+${b}`,`${s}−1`,`${b}+${a}`,`${s+2}−2`],correct:[0,2,3],explanation:"The selected expressions equal the target."}),
   p=>Q(c,p,"order","Order the calculations from smallest answer to largest.",{items:[`${a}−${b}`,`${a}+${b}`,`${a}+1`],correct:[`${a}−${b}`,`${a}+1`,`${a}+${b}`],instruction:"Compare the calculation results.",explanation:"Work out or estimate each result."})
  ]);
 }
 const a=12.5+1.2*c,b=3.4+.3*c,s=Number((a+b).toFixed(2)),d=Number((a-b).toFixed(2));
 return set(year,skill,c,[
  p=>Q(c,p,"single",`${f(a)} + ${f(b)} = ?`,{answers:[f(s),f(s+1),f(s-1)],correct:0,explanation:`The sum is ${f(s)}.`}),
  p=>Q(c,p,"single",`${f(a)} − ${f(b)} = ?`,{answers:[f(d),f(d+.5),f(d-.5)],correct:0,explanation:`The difference is ${f(d)}.`}),
  p=>Q(c,p,"true-false","3/5 + 2/5 = 1.",{answers:["True","False"],correct:0,explanation:"The numerators add to the denominator."}),
  p=>Q(c,p,"number",`Calculate ${(4+c)*3} ÷ 3.`,{correct:4+c,explanation:"Division reverses multiplication."}),
  p=>Q(c,p,"fill-blank","Complete the equation.",{template:`${f(a)} + {{blank}} = ${f(s)}`,acceptedAnswers:[f(b)],explanation:`The missing value is ${f(b)}.`}),
  p=>Q(c,p,"single","Which keeps the value of an addition unchanged?",{answers:["Add 1 to one addend and subtract 1 from the other","Add 1 to both addends","Subtract 1 from both addends"],correct:0,explanation:"Compensation changes addends in opposite directions."}),
  p=>Q(c,p,"multiple","Select all expressions equal to 1.",{answers:["1/2+1/2","1.2−0.1","0.25+0.75","2÷2"],correct:[0,2,3],explanation:"The selected expressions equal 1."}),
  p=>Q(c,p,"order","Order from smallest to largest.",{items:["1/4","0.5","3/4"],correct:["1/4","0.5","3/4"],instruction:"Convert to comparable forms if useful.",explanation:"0.25 < 0.5 < 0.75."})
 ]);
}

function multiplicationSet(year,skill,c){
 const y=ynum(year);
 if(y===0){
  const g=2+c%3,e=2+c%2,t=g*e;
  return set(year,skill,c,[
   p=>Q(c,p,"single",`${g} equal groups have ${e} counters in each. How many altogether?`,{answers:[String(t),String(g+e),String(t+1)],correct:0,explanation:`There are ${t} counters altogether.`}),
   p=>Q(c,p,"single",`Share ${2*(2+c%3)} counters equally between 2 children. How many each?`,{answers:[String(2+c%3),String(4+c%3),String(1+c%3)],correct:0,explanation:"Equal sharing gives the same number to each child."}),
   p=>Q(c,p,"true-false","Equal groups have the same number in each group.",{answers:["True","False"],correct:0,explanation:"That is what makes the groups equal."}),
   p=>Q(c,p,"number",`How many objects are in ${g} groups of ${e}?`,{correct:t,explanation:`Count ${e}, ${g} times.`}),
   p=>Q(c,p,"fill-blank","Complete the equal-sharing sentence.",{template:`Share ${t} equally into ${g} groups: {{blank}} in each group.`,acceptedAnswers:[String(e)],explanation:`Each group has ${e}.`}),
   p=>Q(c,p,"single","Which shows equal groups?",{answers:["3, 3, 3 objects","2, 3, 4 objects","1, 2, 3 objects"],correct:0,explanation:"Each group must contain the same number."}),
   p=>Q(c,p,"multiple","Select all equal-group descriptions.",{answers:["2 and 2","2 and 3","3 and 3 and 3","4 and 4"],correct:[0,2,3],explanation:"The selected groups have equal sizes."}),
   p=>Q(c,p,"order","Order the totals from smallest to largest.",{items:["4 groups of 2","2 groups of 2","3 groups of 2"],correct:["2 groups of 2","3 groups of 2","4 groups of 2"],instruction:"Count each total, then arrange.",explanation:"The totals are 4, 6 and 8."})
  ]);
 }
 if(y===1){
  const table=pick([2,5,10],c),k=2+c,t=table*k;
  return set(year,skill,c,[
   p=>Q(c,p,"single",`What comes next? ${table}, ${2*table}, ${3*table}, ___`,{answers:[String(4*table),String(3*table+1),String(5*table)],correct:0,explanation:`Skip-count by ${table}.`}),
   p=>Q(c,p,"single",`${k} groups of ${table} means which repeated addition?`,{answers:[Array(k).fill(table).join(" + "),`${k}+${table}`,`${table}+${k}+1`],correct:0,explanation:"Repeat the group size once for each group."}),
   p=>Q(c,p,"true-false",`${k} groups of ${table} make ${t}.`,{answers:["True","False"],correct:0,explanation:`${k}×${table}=${t}.`}),
   p=>Q(c,p,"number",`How many in ${k} equal groups of ${table}?`,{correct:t,explanation:`The total is ${t}.`}),
   p=>Q(c,p,"fill-blank","Complete the skip-count pattern.",{template:`${table}, ${2*table}, ${3*table}, {{blank}}, ${5*table}`,acceptedAnswers:[String(4*table)],explanation:`Add ${table} each time.`}),
   p=>Q(c,p,"single",`Which multiplication sentence matches ${k} groups of ${table}?`,{answers:[`${k} × ${table} = ${t}`,`${k}+${table}=${t}`,`${t}−${table}=${k}`],correct:0,explanation:"Groups × amount in each group gives the total."}),
   p=>Q(c,p,"multiple",`Select all multiples of ${table}.`,{answers:[String(2*table),String(3*table+1),String(4*table),String(5*table)],correct:[0,2,3],explanation:`The selected values occur when skip-counting by ${table}.`}),
   p=>Q(c,p,"order","Order the equal-group totals.",{items:[`4 groups of ${table}`,`2 groups of ${table}`,`3 groups of ${table}`],correct:[`2 groups of ${table}`,`3 groups of ${table}`,`4 groups of ${table}`],instruction:"Arrange from smallest total to largest.",explanation:"More groups of the same size make a larger total."})
  ]);
 }
 if(y===2){
  const table=c<4?2:pick([5,10],c),k=4+c,t=table*k;
  return factSet(year,skill,c,table,k,t);
 }
 if(y===3){const table=pick([2,3,4,5,10],c),k=6+c;return factSet(year,skill,c,table,k,table*k);}
 if(y===4) return mixedFactSet(year,skill,c);
 if(y===5){
  const a=23+7*c,b=4+c%5,t=a*b;
  return set(year,skill,c,[
   p=>Q(c,p,"single",`${a} × ${b} = ?`,{answers:[String(t),String(t+a),String(t-b)],correct:0,explanation:`${a}×${b}=${t}.`}),
   p=>Q(c,p,"single",`${t} ÷ ${b} = ?`,{answers:[String(a),String(b),String(a+b)],correct:0,explanation:`${t}÷${b}=${a}.`}),
   p=>Q(c,p,"true-false",`${b} is a factor of ${t}.`,{answers:["True","False"],correct:0,explanation:"It divides the product exactly."}),
   p=>Q(c,p,"number",`A carton has ${b} rows of ${a}. How many items?`,{correct:t,explanation:`Multiply ${a} by ${b}.`}),
   p=>Q(c,p,"fill-blank","Complete the division.",{template:`${t} ÷ {{blank}} = ${a}`,acceptedAnswers:[String(b)],explanation:`The divisor is ${b}.`}),
   p=>Q(c,p,"single","Which is a factor of the product?",{answers:[String(a),String(t+1),String(a+1)],correct:0,explanation:`${a} is one of the factors used to make the product.`}),
   p=>Q(c,p,"multiple",`Select all factors of ${t}.`,{answers:["1",String(t+1),String(a),String(b)],correct:[0,2,3],explanation:"1 and both original factors divide the product."}),
   p=>Q(c,p,"order","Order the products from smallest to largest.",{items:[`${a}×${b-1}`,`${a}×${b+1}`,`${a}×${b}`],correct:[`${a}×${b-1}`,`${a}×${b}`,`${a}×${b+1}`],instruction:"Compare products with the same first factor.",explanation:`Increasing the second factor by 1 adds ${a}.`})
  ]);
 }
 if(y===6){
  const a=1.2+.2*c,b=3+c%3,t=Number((a*b).toFixed(2));
  return set(year,skill,c,[
   p=>Q(c,p,"single",`${f(a)} × ${b} = ?`,{answers:[f(t),f(t+1),f(t-1)],correct:0,explanation:`The product is ${f(t)}.`}),
   p=>Q(c,p,"single",`Which is ${b} × 1/${b}?`,{answers:["1",`1/${b}`,String(b)],correct:0,explanation:`${b} copies of 1/${b} make one whole.`}),
   p=>Q(c,p,"true-false","Multiplying a positive number by 0.5 halves it.",{answers:["True","False"],correct:0,explanation:"0.5 is one half."}),
   p=>Q(c,p,"number",`${b} lots of ${f(a)} L equals how many litres?`,{correct:t,explanation:`${f(a)}×${b}=${f(t)}.`}),
   p=>Q(c,p,"fill-blank","Complete the scaling.",{template:`${b*12} ÷ {{blank}} = 12`,acceptedAnswers:[String(b)],explanation:`Divide by ${b}.`}),
   p=>Q(c,p,"single","Which scale factor gives 25% of a quantity?",{answers:["0.25","2.5","25"],correct:0,explanation:"25%=0.25."}),
   p=>Q(c,p,"multiple","Select all expressions equal to half of 20.",{answers:["20×0.5","20×2","20÷2","1/2×20"],correct:[0,2,3],explanation:"The selected expressions equal 10."}),
   p=>Q(c,p,"order","Order the products.",{items:["0.5×20","1.5×20","1×20"],correct:["0.5×20","1×20","1.5×20"],instruction:"Arrange from smallest to largest.",explanation:"Compare the scale factors."})
  ]);
 }
 return proportionalSet(year,skill,c);
}

function mixedFactSet(year,skill,c){
 const tabs=[2,3,4,5,6,7,8,9,10], t=i=>tabs[(c+i)%tabs.length], k=i=>2+((c*2+i*3)%9);
 const a=t(0),ka=k(0),pa=a*ka,b=t(1),kb=k(1),pb=b*kb,d=t(2),kd=k(2),pd=d*kd;
 return set(year,skill,c,[
  p=>Q(c,p,"single",`${a} × ${ka} = ?`,{answers:[String(pa),String(pa+a),String(pa-a)],correct:0,explanation:`${a}×${ka}=${pa}.`}),
  p=>Q(c,p,"single",`${pb} ÷ ${b} = ?`,{answers:[String(kb),String(b),String(kb+1)],correct:0,explanation:`${pb}÷${b}=${kb}.`}),
  p=>Q(c,p,"true-false",`${kd} × ${d} = ${pd}.`,{answers:["True","False"],correct:0,explanation:"The order of factors does not change the product."}),
  p=>Q(c,p,"number",`Calculate ${t(3)} × ${k(3)}.`,{correct:t(3)*k(3),explanation:`The product is ${t(3)*k(3)}.`}),
  p=>Q(c,p,"fill-blank","Complete the fact.",{template:`${t(4)} × {{blank}} = ${t(4)*k(4)}`,acceptedAnswers:[String(k(4))],explanation:`The missing factor is ${k(4)}.`}),
  p=>Q(c,p,"single",`Which division fact matches ${t(5)} × ${k(5)} = ${t(5)*k(5)}?`,{answers:[`${t(5)*k(5)} ÷ ${t(5)} = ${k(5)}`,`${t(5)*k(5)} ÷ ${k(5)} = ${t(5)+1}`,`${t(5)} ÷ ${k(5)} = ${t(5)*k(5)}`],correct:0,explanation:"Use the inverse relationship between multiplication and division."}),
  p=>Q(c,p,"multiple","Select all correct multiplication facts.",{answers:[`${t(6)}×${k(6)}=${t(6)*k(6)}`,`${t(7)}×${k(7)}=${t(7)*k(7)+1}`,`${t(7)}×${k(7)}=${t(7)*k(7)}`,`${t(8)}×${k(8)}=${t(8)*k(8)}`],correct:[0,2,3],explanation:"Check each product."}),
  p=>Q(c,p,"order","Order the products from smallest to largest.",{items:[`2×${3+c}`,`5×${3+c}`,`10×${3+c}`],correct:[`2×${3+c}`,`5×${3+c}`,`10×${3+c}`],instruction:"Compare products with the same second factor.",explanation:"For a positive factor, larger first factors give larger products."})
 ]);
}

function factSet(year,skill,c,table,k,t){
 return set(year,skill,c,[
  p=>Q(c,p,"single",`${table} × ${k} = ?`,{answers:[String(t),String(t+table),String(t-table)],correct:0,explanation:`${table}×${k}=${t}.`}),
  p=>Q(c,p,"single",`${t} ÷ ${table} = ?`,{answers:[String(k),String(table),String(k+1)],correct:0,explanation:`${t}÷${table}=${k}.`}),
  p=>Q(c,p,"true-false",`${k} × ${table} = ${t}.`,{answers:["True","False"],correct:0,explanation:"The order of factors does not change the product."}),
  p=>Q(c,p,"number",`Calculate ${table} × ${k+1}.`,{correct:table*(k+1),explanation:`The answer is ${table*(k+1)}.`}),
  p=>Q(c,p,"fill-blank","Complete the multiplication fact.",{template:`${table} × {{blank}} = ${t}`,acceptedAnswers:[String(k)],explanation:`The missing factor is ${k}.`}),
  p=>Q(c,p,"single",`Which related division fact belongs to ${table} × ${k} = ${t}?`,{answers:[`${t} ÷ ${table} = ${k}`,`${t} ÷ ${k} = ${table+1}`,`${table} ÷ ${k} = ${t}`],correct:0,explanation:"Related multiplication and division use the same three numbers."}),
  p=>Q(c,p,"multiple",`Select all expressions equal to ${t}.`,{answers:[`${table}×${k}`,`${table}+${k}`,`${k}×${table}`,`${t}÷1`],correct:[0,2,3],explanation:"The selected expressions equal the product."}),
  p=>Q(c,p,"order","Order from smallest product to largest.",{items:[`${table}×${k-1}`,`${table}×${k+1}`,`${table}×${k}`],correct:[`${table}×${k-1}`,`${table}×${k}`,`${table}×${k+1}`],instruction:"Use known facts to arrange them.",explanation:`Each step changes by ${table}.`})
 ]);
}

function fractionSet(year,skill,c){
 const y=ynum(year);
 if(y<=1){
  const total=6+2*c;
  return set(year,skill,c,[
   p=>Q(c,p,"single","Which means one half?",{answers:["1 of 2 equal parts","1 of 3 equal parts","2 unequal parts"],correct:0,explanation:"A half is one of two equal parts."}),
   p=>Q(c,p,"single",`Half of ${total} is ?`,{answers:[String(total/2),String(total),String(total/2+1)],correct:0,explanation:`Split ${total} into 2 equal groups.`}),
   p=>Q(c,p,"true-false","Two halves make one whole.",{answers:["True","False"],correct:0,explanation:"Two equal halves make the whole."}),
   p=>Q(c,p,"number",`Share ${total} counters into 2 equal groups. How many in each?`,{correct:total/2,explanation:`Each half has ${total/2}.`}),
   p=>Q(c,p,"fill-blank","Complete the sentence.",{template:"A half is 1 of {{blank}} equal parts.",acceptedAnswers:["2","two"],explanation:"A whole split equally into two gives halves."}),
   p=>Q(c,p,"single","Which description definitely shows halves?",{answers:["2 equal parts","2 different-sized parts","3 equal parts"],correct:0,explanation:"Halves must be equal."}),
   p=>Q(c,p,"multiple","Select all true statements about halves.",{answers:["Halves are equal parts","A half is bigger than the whole","Two halves make a whole","A whole can be split into halves"],correct:[0,2,3],explanation:"Halves are equal parts of a whole."}),
   p=>Q(c,p,"order","Order from smallest to largest.",{items:["half of 4","half of 8","half of 6"],correct:["half of 4","half of 6","half of 8"],instruction:"Work out each half first.",explanation:"The values are 2, 3 and 4."})
  ]);
 }
 if(y===2){
  const d=pick([2,4,8],c),total=d*(2+c%3),name=d===2?"half":d===4?"quarter":"eighth";
  return set(year,skill,c,[
   p=>Q(c,p,"single",`One of ${d} equal parts is called`,{answers:[`a ${name}`,"a whole","a third"],correct:0,explanation:`One of ${d} equal parts is a ${name}.`}),
   p=>Q(c,p,"single",`What is 1/${d} of ${total}?`,{answers:[String(total/d),String(d),String(total-d)],correct:0,explanation:`${total}÷${d}=${total/d}.`}),
   p=>Q(c,p,"true-false",`${d} pieces of size 1/${d} make one whole.`,{answers:["True","False"],correct:0,explanation:"All equal parts together make the whole."}),
   p=>Q(c,p,"number",`Divide ${total} into ${d} equal groups. How many in each?`,{correct:total/d,explanation:`${total}÷${d}=${total/d}.`}),
   p=>Q(c,p,"fill-blank","Complete the fraction.",{template:`One of ${d} equal parts is 1/{{blank}}.`,acceptedAnswers:[String(d)],explanation:`The denominator is ${d}.`}),
   p=>Q(c,p,"single","Which is larger for the same whole?",{answers:["1/2","1/4","They are equal"],correct:0,explanation:"A half is larger than a quarter."}),
   p=>Q(c,p,"multiple","Select all unit fractions.",{answers:["1/2","2/4","1/4","1/8"],correct:[0,2,3],explanation:"A unit fraction has numerator 1."}),
   p=>Q(c,p,"order","Order from smallest to largest.",{items:["1/2","1/8","1/4"],correct:["1/8","1/4","1/2"],instruction:"Assume equal wholes.",explanation:"For unit fractions, a larger denominator means a smaller part."})
  ]);
 }
 if(y<=5){
  return set(year,skill,c,[
   p=>Q(c,p,"single","Which pair is equivalent?",{answers:["1/2 and 2/4","1/3 and 1/4","2/3 and 3/2"],correct:0,explanation:"1/2 and 2/4 name the same amount."}),
   p=>Q(c,p,"single","Which fraction is closest to 1?",{answers:["7/8","1/8","2/8"],correct:0,explanation:"7/8 is one eighth away from 1."}),
   p=>Q(c,p,"true-false","4/4 equals 1 whole.",{answers:["True","False"],correct:0,explanation:"All four quarters make the whole."}),
   p=>Q(c,p,"number",`How many eighths are equal to ${1+c%3}/4?`,{correct:2*(1+c%3),explanation:"Multiply numerator and denominator by 2."}),
   p=>Q(c,p,"fill-blank","Complete the equivalent fraction.",{template:"1/2 = {{blank}}/8",acceptedAnswers:["4"],explanation:"Four eighths equals one half."}),
   p=>Q(c,p,"single","Which is greatest?",{answers:["3/4","5/8","1/2"],correct:0,explanation:"3/4 = 0.75."}),
   p=>Q(c,p,"multiple","Select all representations equal to 1/2.",{answers:["0.5","0.2","50%","2/4"],correct:[0,2,3],explanation:"The selected forms all equal one half."}),
   p=>Q(c,p,"order","Order from smallest to largest.",{items:["25%","1/2","0.75"],correct:["25%","1/2","0.75"],instruction:"Convert to a common form.",explanation:"0.25 < 0.5 < 0.75."})
  ]);
 }
 return proportionalSet(year,skill,c);
}

function proportionalSet(year,skill,c){
 const pct=pick([10,20,25,50,75],c),base=40+20*c,val=base*pct/100;
 return set(year,skill,c,[
  p=>Q(c,p,"single",`${pct}% of ${base} = ?`,{answers:[f(val),f(val+10),f(base-val)],correct:0,explanation:`${pct}% of ${base} is ${f(val)}.`}),
  p=>Q(c,p,"single",`Simplify the ratio ${2*(c+2)}:${4*(c+2)}.`,{answers:["1:2","2:1","1:4"],correct:0,explanation:"Divide both parts by their common factor."}),
  p=>Q(c,p,"true-false","A rate compares quantities with different units.",{answers:["True","False"],correct:0,explanation:"Examples include km/h and dollars/kg."}),
  p=>Q(c,p,"number",`A $${base} item is discounted by ${pct}%. How many dollars is the discount?`,{correct:val,explanation:`The discount is $${f(val)}.`}),
  p=>Q(c,p,"fill-blank","Complete the equivalence.",{template:"0.25 = {{blank}}%",acceptedAnswers:["25"],explanation:"Multiply the decimal by 100."}),
  p=>Q(c,p,"single","Which is the lowest unit price?",{answers:["$6 for 3 items","$10 for 4 items","$15 for 5 items"],correct:0,explanation:"The unit prices are $2, $2.50 and $3."}),
  p=>Q(c,p,"multiple","Select all representations equal to 50%.",{answers:["1/2","0.05","0.5","50/100"],correct:[0,2,3],explanation:"The selected forms equal one half."}),
  p=>Q(c,p,"order","Order from smallest to largest.",{items:["20%","0.5","3/4"],correct:["20%","0.5","3/4"],instruction:"Convert to a common form.",explanation:"0.2 < 0.5 < 0.75."})
 ]);
}

function algebraSet(year,skill,c){
 const y=ynum(year);
 if(y===0){
  return set(year,skill,c,[
   p=>Q(c,p,"single","What comes next? red, blue, red, blue, ___",{answers:["red","blue","green"],correct:0,explanation:"The two-item unit repeats."}),
   p=>Q(c,p,"single","Which is a repeating pattern?",{answers:["A B A B A B","A B C D E","1 2 4 7"],correct:0,explanation:"A B repeats as a unit."}),
   p=>Q(c,p,"true-false","A repeating pattern has a part that happens again and again.",{answers:["True","False"],correct:0,explanation:"The repeating unit repeats in order."}),
   p=>Q(c,p,"number","How many items are in the repeating unit: clap, stamp, clap, stamp?",{correct:2,explanation:"The unit is clap, stamp."}),
   p=>Q(c,p,"fill-blank","Complete the pattern.",{template:"circle, square, circle, {{blank}}",acceptedAnswers:["square"],explanation:"Circle and square alternate."}),
   p=>Q(c,p,"single","What is the repeating unit in red, red, blue, red, red, blue?",{answers:["red, red, blue","red, blue","red, red"],correct:0,explanation:"The three-item unit repeats."}),
   p=>Q(c,p,"multiple","Select all repeating patterns.",{answers:["A B A B","A B C D","1 2 1 2","clap stamp clap stamp"],correct:[0,2,3],explanation:"The selected patterns repeat a unit."}),
   p=>Q(c,p,"order","Arrange one repeating unit.",{items:["circle","square","star"],correct:["star","circle","square"],instruction:"For: star, circle, square, star, circle, square.",explanation:"The unit is star, circle, square."})
  ]);
 }
 if(y<=3){
  const step=y===1?2:y===2?5:10,start=3+c;
  return set(year,skill,c,[
   p=>Q(c,p,"single",`What comes next? ${start}, ${start+step}, ${start+2*step}, ___`,{answers:[String(start+3*step),String(start+2*step+1),String(start+4*step)],correct:0,explanation:`Add ${step}.`}),
   p=>Q(c,p,"single","Which rule describes the pattern?",{answers:[`add ${step}`,`subtract ${step}`,"double"],correct:0,explanation:`Each term increases by ${step}.`}),
   p=>Q(c,p,"true-false",`The missing term in ${start}, ${start+step}, ___, ${start+3*step} is ${start+2*step}.`,{answers:["True","False"],correct:0,explanation:"Apply the constant step."}),
   p=>Q(c,p,"number",`Start at ${start} and add ${step} four times. Where do you finish?`,{correct:start+4*step,explanation:`The result is ${start+4*step}.`}),
   p=>Q(c,p,"fill-blank","Complete the pattern.",{template:`${start}, ${start+step}, {{blank}}, ${start+3*step}`,acceptedAnswers:[String(start+2*step)],explanation:`Add ${step}.`}),
   p=>Q(c,p,"single",`Which number breaks an add-${step} pattern starting at ${start}?`,{answers:[String(start+2*step+1),String(start+step),String(start+2*step)],correct:0,explanation:"It does not follow the constant step."}),
   p=>Q(c,p,"multiple","Select all terms in the pattern.",{answers:[String(start+step),String(start+step+1),String(start+3*step),String(start+4*step)],correct:[0,2,3],explanation:"Apply the same rule repeatedly."}),
   p=>Q(c,p,"order","Put the pattern terms in order.",{items:[String(start+2*step),String(start),String(start+step)],correct:[String(start),String(start+step),String(start+2*step)],instruction:`Use the add-${step} rule.`,explanation:"Follow the constant increase."})
  ]);
 }
 if(y<=8){
  const x=2+c,a=2+c%3,b=4+c,r=a*x+b;
  return set(year,skill,c,[
   p=>Q(c,p,"single",`If x=${x}, what is ${a}x+${b}?`,{answers:[String(r),String(r+a),String(x+b)],correct:0,explanation:"Substitute the value of x."}),
   p=>Q(c,p,"single",`Solve x + ${b} = ${x+b}.`,{answers:[String(x),String(x+b),String(b)],correct:0,explanation:`x=${x}.`}),
   p=>Q(c,p,"true-false","3(x + 2) = 3x + 6.",{answers:["True","False"],correct:0,explanation:"Distribute 3 to both terms."}),
   p=>Q(c,p,"number",`Solve ${a}x = ${a*x}.`,{correct:x,explanation:`Divide by ${a}.`}),
   p=>Q(c,p,"fill-blank","Complete the substitution.",{template:`If x=${x}, then 2x+1 = {{blank}}`,acceptedAnswers:[String(2*x+1)],explanation:"Substitute and simplify."}),
   p=>Q(c,p,"single","Which expression is equivalent to 4(x+3)?",{answers:["4x+12","4x+3","x+12"],correct:0,explanation:"Use the distributive law."}),
   p=>Q(c,p,"multiple","Select all expressions equivalent to 5x+10.",{answers:["5(x+2)","5(x+10)","5x+5+5","10+5x"],correct:[0,2,3],explanation:"The selected expressions simplify to 5x+10."}),
   p=>Q(c,p,"order","Order the steps to solve 2x+3=11.",{items:["x = 4","2x = 8","Subtract 3 from both sides"],correct:["Subtract 3 from both sides","2x = 8","x = 4"],instruction:"Arrange the solving steps.",explanation:"Undo addition, then multiplication."})
  ]);
 }
 const r1=2+c,r2=3+c%2,s=r1+r2,prod=r1*r2;
 return set(year,skill,c,[
  p=>Q(c,p,"single",`Expand (x+${r1})(x+${r2}).`,{answers:[`x²+${s}x+${prod}`,`x²+${prod}x+${s}`,`x²+${s}`],correct:0,explanation:"Multiply and collect like terms."}),
  p=>Q(c,p,"single",`Factorise x²+${s}x+${prod}.`,{answers:[`(x+${r1})(x+${r2})`,`(x−${r1})(x−${r2})`,`(x+${s})(x+1)`],correct:0,explanation:"The two numbers add to the x coefficient and multiply to the constant."}),
  p=>Q(c,p,"true-false",`x²−${r1*r1}=(x−${r1})(x+${r1}).`,{answers:["True","False"],correct:0,explanation:"This is a difference of two squares."}),
  p=>Q(c,p,"number",`If x=${r1}, evaluate x²+${r2}x.`,{correct:r1*r1+r2*r1,explanation:"Substitute and simplify."}),
  p=>Q(c,p,"fill-blank","Complete the perfect square.",{template:`x²+${2*r1}x+${r1*r1}=(x+{{blank}})²`,acceptedAnswers:[String(r1)],explanation:"This is a perfect-square trinomial."}),
  p=>Q(c,p,"single",`Which values solve (x−${r1})(x−${r2})=0?`,{answers:[`x=${r1} or x=${r2}`,`x=${s}`,`x=${prod}`],correct:0,explanation:"Use the zero-product property."}),
  p=>Q(c,p,"multiple","Select all expressions equivalent to x²−9.",{answers:["(x−3)(x+3)","(x+3)²","x²+0x−9","x·x−9"],correct:[0,2,3],explanation:"The selected expressions simplify to x²−9."}),
  p=>Q(c,p,"order","Order the steps to solve x²−5x+6=0.",{items:["x = 2 or x = 3","(x−2)(x−3)=0","Factorise the quadratic"],correct:["Factorise the quadratic","(x−2)(x−3)=0","x = 2 or x = 3"],instruction:"Arrange the solution steps.",explanation:"Factorise, then use the zero-product property."})
 ]);
}

function trigSet(year,skill,c){
 const tri=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,12,15],[12,16,20]][c], [a,b,h]=tri;
 return set(year,skill,c,[
  p=>Q(c,p,"single",`A right triangle has legs ${a} and ${b}. Find the hypotenuse.`,{answers:[String(h),String(a+b),String(h+1)],correct:0,explanation:`${a}²+${b}²=${h}².`}),
  p=>Q(c,p,"single","Which ratio defines sin θ?",{answers:["opposite / hypotenuse","adjacent / hypotenuse","opposite / adjacent"],correct:0,explanation:"sin θ = opposite ÷ hypotenuse."}),
  p=>Q(c,p,"true-false","The hypotenuse is opposite the right angle.",{answers:["True","False"],correct:0,explanation:"That is the definition of the hypotenuse."}),
  p=>Q(c,p,"number",`For a right triangle with hypotenuse ${h} and one leg ${a}, find the other leg.`,{correct:b,explanation:`√(${h}²−${a}²)=${b}.`}),
  p=>Q(c,p,"fill-blank","Complete Pythagoras' theorem.",{template:"a² + b² = {{blank}}²",acceptedAnswers:["c"],explanation:"c is the hypotenuse."}),
  p=>Q(c,p,"single","If opposite=6 and hypotenuse=10, sin θ equals",{answers:["0.6","1.6","0.4"],correct:0,explanation:"6÷10=0.6."}),
  p=>Q(c,p,"multiple","Select all correct right-triangle ratios.",{answers:["sin=opp/hyp","tan=hyp/opp","cos=adj/hyp","tan=opp/adj"],correct:[0,2,3],explanation:"SOH–CAH–TOA gives the selected ratios."}),
  p=>Q(c,p,"order","Order the Pythagoras steps.",{items:["Take the square root","Substitute known side lengths","Rearrange for the missing square"],correct:["Substitute known side lengths","Rearrange for the missing square","Take the square root"],instruction:"Arrange the method.",explanation:"Substitute, rearrange, then take the positive root for a length."})
 ]);
}

function functionsSet(year,skill,c){
 const m=2+c%3,b=1+c,x=3+c,y=m*x+b;
 return set(year,skill,c,[
  p=>Q(c,p,"single",`For y=${m}x+${b}, find y when x=${x}.`,{answers:[String(y),String(y+m),String(x+b)],correct:0,explanation:"Substitute the x-value."}),
  p=>Q(c,p,"single",`In y=${m}x+${b}, what is the gradient?`,{answers:[String(m),String(b),String(m+b)],correct:0,explanation:"The coefficient of x is the gradient."}),
  p=>Q(c,p,"true-false",`The y-intercept of y=${m}x+${b} is ${b}.`,{answers:["True","False"],correct:0,explanation:"Set x=0."}),
  p=>Q(c,p,"number",`For y=${m}x+${b}, find y when x=0.`,{correct:b,explanation:"This is the y-intercept."}),
  p=>Q(c,p,"fill-blank","Complete the rule.",{template:`If y=${m}x+${b} and x=2, then y={{blank}}`,acceptedAnswers:[String(2*m+b)],explanation:"Substitute x=2."}),
  p=>Q(c,p,"single","Which relationship shows exponential growth?",{answers:["Multiply by 1.05 each period","Add 5 each period","Stay constant"],correct:0,explanation:"Repeated multiplication by a factor greater than 1 gives exponential growth."}),
  p=>Q(c,p,"multiple","Select all features of a linear relation.",{answers:["constant gradient","curved with changing gradient","straight-line graph","constant first difference"],correct:[0,2,3],explanation:"Linear relations have constant rate of change."}),
  p=>Q(c,p,"order","Order the steps to plot a linear rule from a table.",{items:["Plot the points","Choose x-values","Calculate matching y-values"],correct:["Choose x-values","Calculate matching y-values","Plot the points"],instruction:"Arrange the graphing steps.",explanation:"Generate values before plotting."})
 ]);
}

function mixedSet(year,skill,c){
 const y=ynum(year);
 if(y<=2){
  return set(year,skill,c,[
   p=>Q(c,p,"single","Which word compares length?",{answers:["longer","heavier","fuller"],correct:0,explanation:"Longer and shorter compare length."}),
   p=>Q(c,p,"single","Which shape has 3 straight sides?",{answers:["triangle","square","circle"],correct:0,explanation:"A triangle has 3 sides."}),
   p=>Q(c,p,"true-false","A container with greater capacity can hold more.",{answers:["True","False"],correct:0,explanation:"Capacity is how much a container can hold."}),
   p=>Q(c,p,"number",`A chart shows ${4+c} cats and ${6+c} dogs. How many dogs?`,{correct:6+c,explanation:`The dog frequency is ${6+c}.`}),
   p=>Q(c,p,"fill-blank","Complete the position word.",{template:"If the ball is over the box, the ball is {{blank}} the box.",acceptedAnswers:["above","over"],explanation:"Above describes the position."}),
   p=>Q(c,p,"single",`Which lasts longer: ${10+5*c} minutes or ${20+5*c} minutes?`,{answers:[`${20+5*c} minutes`,`${10+5*c} minutes`,"They are equal"],correct:0,explanation:"The greater duration lasts longer."}),
   p=>Q(c,p,"multiple","Select all measurement words.",{answers:["length","banana","mass","capacity"],correct:[0,2,3],explanation:"Length, mass and capacity are measurement attributes."}),
   p=>Q(c,p,"order","Order data counts from fewest to most.",{items:[`red: ${5+c}`,`blue: ${2+c}`,`green: ${8+c}`],correct:[`blue: ${2+c}`,`red: ${5+c}`,`green: ${8+c}`],instruction:"Compare the frequencies.",explanation:"Order the numerical counts."})
  ]);
 }
 return geometrySet(year,skill,c);
}

function geometrySet(year,skill,c){
 const L=5+c,W=3+c%2,H=2+c%3;
 return set(year,skill,c,[
  p=>Q(c,p,"single",`Area of a ${L} m by ${W} m rectangle is`,{answers:[`${L*W} m²`,`${2*(L+W)} m²`,`${L+W} m²`],correct:0,explanation:"Area = length × width."}),
  p=>Q(c,p,"single",`Volume of a ${L} cm × ${W} cm × ${H} cm prism is`,{answers:[`${L*W*H} cm³`,`${L*W} cm³`,`${2*(L+W+H)} cm³`],correct:0,explanation:"Volume = length × width × height."}),
  p=>Q(c,p,"true-false","Area is measured in square units.",{answers:["True","False"],correct:0,explanation:"Area covers a 2D region."}),
  p=>Q(c,p,"number",`Find the perimeter of a ${L} cm by ${W} cm rectangle.`,{correct:2*(L+W),explanation:"Perimeter = 2(length + width)."}),
  p=>Q(c,p,"fill-blank","Complete the conversion.",{template:"1 km = {{blank}} m",acceptedAnswers:["1000"],explanation:"1 kilometre is 1000 metres."}),
  p=>Q(c,p,"single","Best unit for classroom floor area?",{answers:["m²","cm³","km"],correct:0,explanation:"Square metres suit a classroom floor."}),
  p=>Q(c,p,"multiple","Select all quantities measured in square units.",{answers:["area","perimeter","surface area","volume"],correct:[0,2],explanation:"Area and surface area use square units."}),
  p=>Q(c,p,"order","Order lengths from smallest to largest.",{items:["0.5 m","75 cm","1 m"],correct:["0.5 m","75 cm","1 m"],instruction:"Convert to a common unit.",explanation:"50 cm < 75 cm < 100 cm."})
 ]);
}

function statsSet(year,skill,c){
 const a=2+c,data=[a,a+2,a+2,a+4,a+7];
 return set(year,skill,c,[
  p=>Q(c,p,"single",`Median of ${data.join(", ")} is`,{answers:[String(a+2),String(a+4),String(a)],correct:0,explanation:"The median is the middle value."}),
  p=>Q(c,p,"single",`Mode of ${data.join(", ")} is`,{answers:[String(a+2),String(a+7),"no mode"],correct:0,explanation:"It occurs most often."}),
  p=>Q(c,p,"true-false","A larger representative sample can give a more stable estimate of a population.",{answers:["True","False"],correct:0,explanation:"Larger representative samples reduce random sampling variation."}),
  p=>Q(c,p,"number",`Find the range of ${data.join(", ")}.`,{correct:7,explanation:"Range = maximum − minimum."}),
  p=>Q(c,p,"fill-blank","Complete the probability statement.",{template:"The probability of a certain event is {{blank}}.",acceptedAnswers:["1","100%"],explanation:"A certain event has probability 1."}),
  p=>Q(c,p,"single","Which sample is most likely biased for a whole school?",{answers:["only one sports team","random students from each year","a stratified sample"],correct:0,explanation:"One team is unlikely to represent the whole school."}),
  p=>Q(c,p,"multiple","Select all measures of centre.",{answers:["mean","range","median","mode"],correct:[0,2,3],explanation:"Mean, median and mode describe centre."}),
  p=>Q(c,p,"order","Order probabilities from least likely to most likely.",{items:["0.75","0.1","0.5"],correct:["0.1","0.5","0.75"],instruction:"Compare values from 0 to 1.",explanation:"Larger probability means more likely."})
 ]);
}

const VOC={
"F":[["numeral","a written symbol for a number"],["quantity","how many or how much"],["equal","the same amount"],["share","divide into groups"],["longer","having more length"],["capacity","how much a container can hold"],["pattern","an arrangement that follows a rule"],["position","where something is"],["shape","the form of an object"],["data","information that is collected"],["more","a greater amount"],["fewer","a smaller number"]],
"1":[["tens","groups of ten in place value"],["ones","single units in place value"],["partition","split a number into parts"],["total","the amount altogether"],["difference","the result of subtraction"],["equal groups","groups with the same number in each"],["half","one of two equal parts"],["duration","how long an event takes"],["capacity","how much a container can hold"],["category","a group used to sort data"],["frequency","how many times something occurs"],["position","where something is located"]],
"2":[["hundreds","groups of one hundred in place value"],["regroup","rename a quantity using different place-value groups"],["inverse","an operation that undoes another"],["factor","a number multiplied by another to make a product"],["product","the result of multiplication"],["quotient","the result of division"],["quarter","one of four equal parts"],["eighth","one of eight equal parts"],["clockwise","turning in the direction of clock hands"],["category","a group used to organise data"],["frequency","the count for a category"],["estimate","a sensible approximate value"]],
"3":[["place value","the value of a digit because of its position"],["multiple","a result of multiplying a number by a whole number"],["factor","a whole number that divides another exactly"],["numerator","the top number in a fraction"],["denominator","the bottom number naming equal parts"],["perimeter","distance around a shape"],["area","amount of surface covered"],["angle","amount of turn between two lines"],["frequency","number of occurrences"],["estimate","a close approximate answer"],["equivalent","having the same value"],["algorithm","a sequence of steps"]],
"4":[["decimal","a base-ten number using a decimal point"],["factor","a number that divides another exactly"],["multiple","a number in a multiplication sequence"],["equivalent fraction","a fraction with the same value as another"],["symmetry","matching parts across a line or around a point"],["perimeter","distance around a boundary"],["area","measure of a two-dimensional region"],["probability","how likely an event is"],["data","collected information"],["mode","the most frequent value"],["estimate","an approximate value"],["strategy","a planned way to solve a problem"]],
"5":[["prime number","a whole number greater than 1 with exactly two positive factors"],["composite number","a whole number greater than 1 with more than two positive factors"],["factor","a number that divides another exactly"],["multiple","a product of a number and a whole number"],["percentage","a number of parts per hundred"],["decimal","a base-ten representation using a decimal point"],["volume","space occupied by a 3D object"],["mean","sum divided by number of values"],["probability","likelihood from 0 to 1"],["coordinate","a number or pair locating a position"],["equivalent","having the same value"],["estimate","an approximate calculation"]],
"6":[["integer","a whole number, positive, negative or zero"],["prime","a whole number greater than 1 with exactly two positive factors"],["common factor","a factor shared by numbers"],["percentage","a proportion out of 100"],["ratio","a comparison of quantities"],["order of operations","rules for calculation order"],["coordinate plane","a plane formed by perpendicular number axes"],["mean","sum divided by number of data values"],["range","maximum minus minimum"],["probability","likelihood from 0 to 1"],["variable","a symbol representing a value"],["equation","a statement that two expressions are equal"]],
"7":[["integer","a positive or negative whole number or zero"],["prime factor","a factor that is prime"],["square root","a number that produces the original when squared"],["rational number","a number expressible as a ratio of integers"],["rate","a comparison of quantities with different units"],["ratio","a multiplicative comparison"],["variable","a symbol for an unknown or changing value"],["expression","numbers, variables and operations without an equals sign"],["equation","a statement that expressions are equal"],["sample space","the set of possible outcomes"],["median","the middle ordered data value"],["formula","a rule written with symbols"]],
"8":[["irrational number","a real number not expressible as a ratio of integers"],["exponent","a number showing repeated multiplication of a base"],["linear relation","a relationship with constant rate of change"],["gradient","rate of change of a straight line"],["factorise","rewrite an expression as a product"],["expand","remove brackets by multiplication"],["inequality","a comparison using signs such as < or >"],["rate","a comparison per unit"],["volume","space inside a 3D object"],["distribution","how data values are spread"],["outlier","a value noticeably distant from the rest"],["simulation","a model imitating a chance process"]],
"9":[["scientific notation","a coefficient multiplied by a power of ten"],["index law","a rule for manipulating powers"],["quadratic","an expression or relation with highest power 2"],["factorise","write an expression as a product"],["gradient","change in y divided by change in x"],["intercept","where a graph crosses an axis"],["similarity","same shape with proportional corresponding lengths"],["hypotenuse","side opposite the right angle"],["sample","a subset selected from a population"],["bias","systematic influence favouring outcomes"],["compound event","an event involving more than one stage"],["trend","a general direction in data"]],
"10":[["surds","exact irrational roots left in radical form"],["quadratic equation","an equation whose highest variable power is 2"],["simultaneous equations","equations solved together for shared unknowns"],["function","a rule assigning each input exactly one output"],["growth factor","a multiplier applied repeatedly in growth"],["trigonometric ratio","a ratio of right-triangle side lengths"],["bivariate data","paired data for two variables"],["correlation","strength and direction of association between variables"],["interquartile range","third quartile minus first quartile"],["validity","how well a method tests what it is intended to"],["probability","numerical measure of likelihood"],["approximation","a value close to an exact value"]]
};

function vocabSet(year,skill,c){
 const list=VOC[String(year)],off=(2*c)%list.length,v=Array.from({length:8},(_,i)=>list[(off+i)%list.length]);
 return set(year,skill,c,[
  p=>Q(c,p,"single",`Which term means "${v[0][1]}"?`,{answers:[v[0][0],v[2][0],v[4][0]],correct:0,explanation:`The term is ${v[0][0]}.`}),
  p=>Q(c,p,"single",`Which definition matches "${v[1][0]}"?`,{answers:[v[1][1],v[3][1],v[5][1]],correct:0,explanation:v[1][1]}),
  p=>Q(c,p,"true-false",`"${v[2][0]}" means ${v[2][1]}.`,{answers:["True","False"],correct:0,explanation:"The definition is correct."}),
  p=>Q(c,p,"text",`Type the term for: ${v[3][1]}.`,{correct:v[3][0],acceptedAnswers:[v[3][0]],explanation:`The term is ${v[3][0]}.`}),
  p=>Q(c,p,"fill-blank","Complete the vocabulary sentence.",{template:`{{blank}} means ${v[4][1]}.`,acceptedAnswers:[v[4][0]],explanation:`The missing term is ${v[4][0]}.`}),
  p=>Q(c,p,"single",`Which term best fits: ${v[5][1]}?`,{answers:[v[5][0],v[6][0],v[7][0]],correct:0,explanation:`Use ${v[5][0]}.`}),
  p=>Q(c,p,"multiple","Select the two correctly matched pairs.",{answers:[`${v[0][0]} — ${v[0][1]}`,`${v[1][0]} — ${v[4][1]}`,`${v[6][0]} — ${v[6][1]}`,`${v[7][0]} — ${v[3][1]}`],correct:[0,2],explanation:"The first and third pairs are correct."}),
  p=>Q(c,p,"single",`Which term means "${v[7][1]}"?`,{answers:[v[7][0],v[2][0],v[5][0]],correct:0,explanation:`The correct term is ${v[7][0]}.`})
 ]);
}

function generate(year,skill){
 year=String(year); const out=[];
 for(let c=0;c<6;c++){
  let s=[];
  if(skill==="maths-vocabulary") s=vocabSet(year,skill,c);
  else if(["number-fluency","number-properties","integers-powers","integers-indices","indices-scientific","real-number"].includes(skill)) s=numberSet(year,skill,c);
  else if(["add-subtract","four-operations","rational-operations"].includes(skill)) s=operationsSet(year,skill,c);
  else if(["multiplication","multiplication-division"].includes(skill)) s=multiplicationSet(year,skill,c);
  else if(["fractions-patterns","fractions","fractions-decimals"].includes(skill)) s=fractionSet(year,skill,c);
  else if(["decimals-percent","fractions-decimals-percent","ratio-percent","rational-ratio-percent"].includes(skill)) s=proportionalSet(year,skill,c);
  else if(["patterns-algebra","algebra-order-operations","algebra-equations","algebra-linear","algebra-quadratics"].includes(skill)) s=algebraSet(year,skill,c);
  else if(["coordinate-functions","functions-growth"].includes(skill)) s=functionsSet(year,skill,c);
  else if(["ratio-trigonometry","pythagoras-trigonometry"].includes(skill)) s=trigSet(year,skill,c);
  else if(skill==="statistics-probability") s=statsSet(year,skill,c);
  else if(skill==="measurement-geometry") s=geometrySet(year,skill,c);
  else if(["measurement-space-data","measurement-data"].includes(skill)) s=mixedSet(year,skill,c);
  out.push(...s);
 }
 return out;
}
window.SkillrDailyMath={generate};
})();
