"use strict";
const source=[
["Digital measuring devices can improve measurement:",["Precision","Sampling bias automatically","Randomness","Population size"],0,"digital tools"],
["A major advantage of simulation is that it can:",["Test scenarios repeatedly without some real-world risks or costs","Guarantee the real-world result","Remove all uncertainty","Replace every type of data collection"],0,"digital tools"],
["A digital tool can still give inaccurate measurements because of:",["Calibration or sensor issues","Perfect measurement","Unlimited precision","Random sampling"],0,"digital tools"],
["Digital tools can collect:",["Only qualitative data","Only quantitative data","Both qualitative and quantitative data","Neither type"],2,"digital tools"],
["High precision means repeated measurements are:",["Close to each other","Necessarily close to the true value","Free from all error","Always unbiased"],0,"digital tools"],
["Simulations are useful for comparing sampling methods because they allow:",["Repeated trials under controlled settings","Randomness to be removed completely","Bias to disappear automatically","No assumptions to be made"],0,"digital tools"],
["A digital data-collection system can still introduce bias if:",["Its software, sensor placement or selection process is poorly designed","The sample is large","The readings have many decimal places","The data are stored electronically"],0,"digital tools"],
["Large measurement error generally reduces the:",["Reliability of conclusions drawn from the measurements","Population size","Convenience of sampling","Number of variables"],0,"digital tools"],
["An AI system can develop systematic bias if its training data:",["Over-represent some groups and under-represent others","Represent relevant groups appropriately","Are checked for performance across groups","Come from multiple suitable sources"],0,"AI sampling"],
["For an AI training dataset, an important sampling goal is that the data are:",["Representative of the population and task of interest","As convenient as possible","As small as possible","Drawn from only one easy-to-reach group"],0,"AI sampling"],
["If an image model is trained mostly on one demographic, a likely risk is:",["Uneven performance across demographics","Guaranteed perfect accuracy","No sampling bias","Greater fairness automatically"],0,"AI sampling"],
["Which method can help ensure important subgroups are represented in an AI training sample?",["Stratified sampling","Convenience sampling only","Volunteer sampling only","Ignoring subgroup information"],0,"AI sampling"],
["A useful way to check an AI system for sampling-related bias is to:",["Evaluate it on appropriately diverse test data","Evaluate only on its training data","Ignore subgroup results","Reduce the test sample to one group"],0,"AI sampling"],
["Which factor is especially important for useful AI training data?",["Data quality and relevance","The colour of the file icon","Using only one file format","Maximum storage size regardless of content"],0,"AI sampling"],
["Training an AI system on a systematically biased sample can lead to:",["Systematic errors in predictions","Guaranteed fair predictions","Perfect generalisation","Removal of measurement error"],0,"AI sampling"],
["Which action can help reduce representation bias in a dataset?",["Improve representation of relevant under-represented groups","Ignore minority groups","Use a smaller convenience sample","Collect data from only one location"],0,"AI sampling"]
];
window.skillrTestQuestions=source.map((q,i)=>({id:`ac9m8st01-t-${String(i+1).padStart(3,"0")}`,curriculumCode:"AC9M8ST01",bank:"test",section:i<8?"E4":"E5",sourceNumber:i+25,skill:q[3],printable:true,type:"single",question:q[0],audioPrompt:q[0],visual:"",visualHtml:"",visualMeta:{type:"none",alt_text:""},answers:q[1],correct:q[2],explanation:`${q[1][q[2]]}.`,structuredExplanation:{summary:q[1][q[2]],hint:"Distinguish precision, accuracy, measurement error, representativeness and sampling bias."},qualitySchema:"production-v1"}));
window.skillrExamQuestions=window.skillrTestQuestions;
window.quizQuestions=window.skillrTestQuestions;
