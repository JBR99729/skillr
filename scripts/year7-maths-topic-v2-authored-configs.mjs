import {year7MathsAMAuthored,year7MathsAMTeaching} from "./year7-maths-topic-v2-am-authored.mjs";

// Canonical selection/configuration for the manually reviewed Year 7 Maths
// Algebra, Measurement, Space, Statistics and Probability topic modules.
// Question content is sourced from the corresponding validated production bank;
// these indices deliberately select distinct, concrete contexts for the two
// worked examples, the 3/4/2 sheet and the concealed quick check.
const codes = [
  "AC9M7A02","AC9M7A03","AC9M7A04","AC9M7A05","AC9M7A06",
  "AC9M7M01","AC9M7M02","AC9M7M03","AC9M7M04","AC9M7M05","AC9M7M06",
  "AC9M7SP01","AC9M7SP02","AC9M7SP03","AC9M7SP04",
  "AC9M7ST01","AC9M7ST02","AC9M7ST03","AC9M7P01","AC9M7P02"
];

export const year7MathsAuthoredConfigs = Object.fromEntries(codes.map(code => [code, {
  practiceIndices: [0, 3, 6, 9, 12, 15, 18],
  testIndices: [0, 4],
  workedExampleSheetIndices: [0, 4],
  quickCheckSheetIndex: 7,
  tiers: [1, 1, 1, 2, 2, 2, 2, 3, 3]
}]));

const clean=value=>String(value||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().replace(/[.!?]+$/,"");
const full=value=>`${clean(value)}.`;

// Build the authored override from the preserved, code-specific teaching model.
// This is intentionally independent of assessment banks: Year 7 legacy topic
// models are the preserved source layer for these modules.
export function applyYear7MathsAuthoredConfig(module,unit,config){
  if(!config)return module;
  const code=module.identity.code;
  const modelAnswer=clean(unit.correctExample||unit.modelNote);
  const applicationAnswer=clean(unit.applyNote);
  const core=clean(unit.core);
  const mistake=unit.mistakes[0];
  module.topic.workedExamples=[
    {title:unit.model_title,steps:[full(`Represent the known quantities in ${unit.model_title.toLowerCase()}`),full(unit.modelNote),full(`Apply the relationship: ${unit.core}`),full(`State ${modelAnswer} and retain the required units or conditions`)],answer:full(modelAnswer),check:full(`Substitute or reconstruct the result independently; it must agree with ${core}`)},
    {title:unit.apply_title,steps:[full(`Identify the new quantities and the deciding condition`),full(unit.applyNote),full(`Carry out the comparison or calculation with labelled values`),full(`Interpret the result in the context and test it independently`)],answer:full(applicationAnswer),check:full(`Use an inverse, alternate representation or counterexample to confirm ${applicationAnswer}`)}
  ];
  const legacy=(unit.worksheet||[]).filter(item=>item.question);
  const answerFor=(item,index)=>{
    if(item.answers?.[0])return clean(item.answers[0]);
    if(item.matchLeft?.length)return item.matchLeft.map((left,i)=>`${left}: ${item.matchRight[item.matchRight.length-1-i]}`).join("; ");
    if(item.template)return clean(item.template.replace("{{blank}}",modelAnswer));
    if(index===3)return modelAnswer;
    if(index===6)return applicationAnswer;
    if(index===7)return clean(mistake[1]);
    return index===8?`${modelAnswer} ${core}`:`${applicationAnswer} ${core}`;
  };
  const picked=[legacy[0],legacy[2],legacy[5],legacy[3],legacy[4],legacy[6],legacy[7],legacy[8],legacy[9]];
  module.practiceSheet.questions=picked.map((item,index)=>({
    id:`${code}-PS-${String(index+1).padStart(2,"0")}`,tier:config.tiers[index],
    prompt:full(item.question),answer:full(answerFor(item,[0,2,5,3,4,6,7,8,9][index])),
    summary:full(index<3?`The result follows directly from the labelled ${unit.model_title.toLowerCase()} model`:`The response applies ${core} to the stated conditions`),
    hint:full(index<3?`Use the labelled model and calculate or reconstruct each required value`:`Identify the quantities, apply ${unit.terms[0][0]} precisely, then verify the result`)
  }));
  const guided=module.topic.workedExamples[0], quick=module.practiceSheet.questions[7];
  module.slides[2]={...module.slides[2],title:`Guided example: ${guided.title}`,body:guided.steps,expectedResponse:guided.answer,remediation:module.practiceSheet.questions[0].hint};
  module.slides[3]={...module.slides[3],body:[quick.prompt,"Explain the evidence, operation or representation that proves the correction."],expectedResponse:quick.answer,remediation:quick.hint,concealAnswer:true};
  return module;
}

export const year7MathsAuthoredOverrides=Object.fromEntries(Object.entries(year7MathsAMAuthored).map(([code,data])=>{const teaching=year7MathsAMTeaching[code];return[code,{
  ...(data.title?{title:data.title}:{}),
  ...(data.learningIntention?{learningIntention:data.learningIntention}:{}),
  deepDive:teaching.deepDive,
  successCriteria:teaching.successCriteria,
	  ...((data.vocabulary||teaching.vocabulary)?{vocabulary:data.vocabulary||teaching.vocabulary}:{}),
  ...(data.misconceptions?{misconceptions:data.misconceptions}:{}),
  ...(data.visuals?{visuals:data.visuals}:{}),
  workedExamples:data.w,
  slides:{
    learning:{body:[`We are learning to ${teaching.successCriteria[0].replace(/^I can /,'').replace(/[.]$/,'')}.`,...teaching.successCriteria],teacherNotes:`Connect the learning intention to the first labelled representation before introducing notation.`,expectedResponse:teaching.successCriteria.join(' '),misconceptionResponse:data.misconceptions?.[0]?.correction||`Ask which stated property or quantity supports the claim.`,remediation:`Name the known quantities and the required result before choosing an operation.`,visualIds:[`${code.toLowerCase()}-model`]},
    refresher:{body:data.refresherBody||teaching.deepDive,teacherNotes:`Reveal the representation in stages and require units, conditions and a verification method.`,expectedResponse:(data.refresherBody||teaching.deepDive)[0],misconceptionResponse:data.misconceptions?.[1]?.correction||`Return to the defining relationship and test the claim with the displayed values.`,remediation:data.q[1].hint,visualIds:[`${code.toLowerCase()}-model`,`${code.toLowerCase()}-application`]},
    guided:{title:`Guided example: ${data.w[0].title}`,body:data.w[0].steps,teacherNotes:`Model each decision aloud and keep the representation connected to the calculation.`,expectedResponse:data.w[0].answer,misconceptionResponse:data.misconceptions?.[2]?.correction||`Require the student to identify the deciding condition rather than infer from appearance or keywords.`,remediation:data.q[0].hint,visualIds:[`${code.toLowerCase()}-model`]},
    quickCheck:{body:[data.q[7].prompt,`Explain the calculation or evidence that proves your answer.`],teacherNotes:`Allow 30 seconds of silent work followed by 30 seconds of partner comparison.`,expectedResponse:data.q[7].answer,misconceptionResponse:data.misconceptions?.[0]?.correction||`Test the claim against the stated values, units and conditions.`,remediation:data.q[7].hint,visualIds:[]}
  },
  questions:data.q
}]}));
