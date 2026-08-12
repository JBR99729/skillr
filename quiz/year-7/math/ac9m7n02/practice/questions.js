"use strict";
(() => {
  const q=[]; let id=1;
  const add=(prompt,correct,wrong,explanation)=>{const answers=[String(correct),...wrong.map(String)].filter((v,i,a)=>a.indexOf(v)===i);while(answers.length<4)answers.push(`None of these ${answers.length}`);q.push({id:`ac9m7n02-${String(id++).padStart(2,"0")}`,type:"single",question:prompt,answers:answers.slice(0,4),correct:0,explanation});};
  const facts=[[24,"2³ × 3"],[36,"2² × 3²"],[48,"2⁴ × 3"],[60,"2² × 3 × 5"],[72,"2³ × 3²"],[84,"2² × 3 × 7"],[90,"2 × 3² × 5"],[120,"2³ × 3 × 5"],[180,"2² × 3² × 5"],[252,"2² × 3² × 7"],[360,"2³ × 3² × 5"],[504,"2³ × 3² × 7"]];
  facts.forEach(([n,f],i)=>add(`What is the prime factorisation of ${n}?`,f,[facts[(i+1)%facts.length][1],`${n} × 1`,`2 × ${n/2}`],`Continue dividing until every factor is prime: ${n} = ${f}.`));
  [[2,5,32],[2,7,128],[2,9,512],[3,3,27],[3,4,81],[3,6,729],[5,3,125],[5,4,625],[7,2,49],[11,2,121]].forEach(([b,e,v])=>add(`What is ${b}^${e}?`,v,[b*e,v+b,v-b],`${b}^${e} means ${Array(e).fill(b).join(" × ")} = ${v}.`));
  [[18,24,6],[24,36,12],[30,45,15],[42,70,14],[48,72,24],[54,90,18],[60,84,12],[72,120,24],[84,126,42],[96,144,48]].forEach(([a,b,h])=>add(`Find the highest common factor of ${a} and ${b}.`,h,[h/2,h*2,a*b],`Compare prime factors and take each common prime to the smaller exponent; HCF = ${h}.`));
  [[6,8,24],[8,12,24],[9,12,36],[10,15,30],[12,18,36],[14,20,140],[15,24,120],[18,30,90],[21,28,84],[24,36,72]].forEach(([a,b,l])=>add(`Find the lowest common multiple of ${a} and ${b}.`,l,[Math.min(a,b),a*b,l/2],`Take every required prime to the larger exponent; LCM = ${l}.`));
  [["2³ × 3²",72],["2² × 3 × 5",60],["3³ × 5",135],["2 × 5³",250],["2⁴ × 7",112],["3² × 7",63],["2³ × 3 × 11",264],["2² × 3² × 5",180]].forEach(([form,n])=>add(`Which natural number equals ${form}?`,n,[n+10,n-10,n*2],`Evaluate each prime power, then multiply: ${form} = ${n}.`));
  add("Why must a factor tree continue when a leaf is 12?","Because 12 is composite.",["Because 12 is odd.","Because every leaf must be 1.","Because factor trees cannot contain 2."],"Prime factorisation ends only when every leaf is prime.");
  add("Which number is not prime?","1",["2","3","5"],"One has only one positive factor, so it is neither prime nor composite.");
  add("Two different factor trees are drawn for 180. What must be the same?","Their final prime factors and exponents.",["Every intermediate branch.","The order of all branches.","The first factor pair."],"Prime factorisation is unique apart from factor order.");
  add("Which exponent rule is used for an HCF?","Use the smaller exponent of each common prime.",["Use every larger exponent.","Add all exponents.","Ignore common primes."],"An HCF cannot contain more copies of a prime than either number has.");
  add("Which exponent rule is used for an LCM?","Use the larger exponent of every required prime.",["Use only smaller exponents.","Subtract exponents.","Use common primes only."],"The LCM must contain enough prime factors to be divisible by both numbers.");
  add("What smallest number multiplies 540 = 2² × 3³ × 5 to make a perfect square?","15",["6","10","30"],"A square needs even exponents; multiply by 3 × 5 = 15.");
  if(q.length!==56)throw new Error(`AC9M7N02 expected 56 questions, found ${q.length}`); window.quizQuestions=q;
})();
