"use strict";
(() => {
  const LEVELS=["easy","easy","core","core","core","application","application","challenge"];
  const Q=(year,skill,set,pos,type,question,extra={})=>({
    id:`s-${year}-${skill}-s${set+1}-q${pos+1}`,
    year,subject:"science",skill,set,difficulty:LEVELS[pos],type,question,...extra
  });
  const contexts=[
    "During a class discussion","While reviewing the topic","In a science notebook","During a practical lesson",
    "When checking a model","In a short investigation","While interpreting evidence","During revision",
    "When explaining the idea","In a classroom example","While comparing observations","When checking a claim",
    "During a group discussion","When reading a result","In a science quiz","When making a conclusion",
    "While using scientific vocabulary","When evaluating an explanation","During a demonstration","When analysing a pattern",
    "While checking understanding","When discussing evidence","During independent practice","When explaining to a classmate",
    "While preparing for a test"
  ];
  const support=(year,skill)=>window.SkillrScienceQuickRead?.[year]?.[skill];

  function neg(fact){
    if(fact.startsWith("A ")) return "It is not correct that " + fact.charAt(0).toLowerCase()+fact.slice(1);
    return "It is not correct that " + fact.charAt(0).toLowerCase()+fact.slice(1);
  }

  function setQuestions(year,skill,set,s){
    const facts=s.facts,kv=s.keywords,nf=facts.length,nk=kv.length;
    const f=i=>facts[(2*set+i)%nf], k=i=>kv[(2*set+i)%nk], ctx=contexts[set%contexts.length];
    const k0=k(0),k1=k(1),k2=k(2),k3=k(3),k4=k(4);
    const f0=f(0),f1=f(1),f2=f(2),f3=f(3),f4=f(4);
    const falseText=neg(f2);
    return [
      Q(year,skill,set,0,"single",`${ctx}, which term means "${k0[1]}"?`,{answers:[k0[0],k1[0],k2[0]],correct:0,explanation:`${k0[0]} means ${k0[1]}.`}),
      Q(year,skill,set,1,"single",`${ctx}, which scientific statement is correct?`,{answers:[f1,neg(f3),neg(f4)],correct:0,explanation:f1}),
      Q(year,skill,set,2,"true-false",set%2===0?f2:falseText,{answers:["True","False"],correct:set%2===0?0:1,explanation:set%2===0?f2:`The accurate statement is: ${f2}`}),
      Q(year,skill,set,3,"text",`${ctx}, type the science term for: ${k3[1]}.`,{correct:k3[0],acceptedAnswers:[k3[0]],explanation:`The term is ${k3[0]}.`}),
      Q(year,skill,set,4,"fill-blank","Complete the science vocabulary statement.",{template:`{{blank}} means ${k4[1]}.`,acceptedAnswers:[k4[0]],explanation:`The missing term is ${k4[0]}.`}),
      Q(year,skill,set,5,"single",`${ctx}, which statement is best supported by the Quick Read?`,{answers:[f0,neg(f1),neg(f2)],correct:0,explanation:f0}),
      Q(year,skill,set,6,"multiple","Select the two scientifically correct statements.",{answers:[f3,neg(f0),f4,neg(f2)],correct:[0,2],explanation:`Correct: ${f3} ${f4}`}),
      Q(year,skill,set,7,"single",`A student rejects this accurate idea: "${f4}" Which response best corrects the student?`,{answers:[f4,neg(f4),`The idea cannot be evaluated using science vocabulary.`],correct:0,explanation:f4})
    ];
  }

  function generate(year,skill){
    year=String(year);
    const s=support(year,skill);
    if(!s) return [];
    const out=[];
    for(let set=0;set<25;set++) out.push(...setQuestions(year,skill,set,s));
    return out;
  }

  window.SkillrDailyScience={generate,questionsPerTopic:200,setsPerTopic:25};
})();
