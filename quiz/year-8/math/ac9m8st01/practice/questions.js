"use strict";
const source=[
["A census collects data from:",["A small group","A sample","The entire population","Only volunteers"],2,"census vs sample"],
["Sampling is often preferred when:",["The population is large and a census would be impractical","The population is tiny and everyone is available","A census is legally required","No planning is needed"],0,"census vs sample"],
["Which situation is a census?",["Counting every student enrolled in a school","Estimating average height from 50 students","Surveying 100 people about favourite foods","Measuring screen time for a sample"],0,"census vs sample"],
["Which situation uses sampling?",["Counting every person in a national census","Counting every car in one small car park","Estimating average household income from selected households","Recording every student in one class"],2,"census vs sample"],
["A census is most likely to be impractical when:",["The population is very large","The population is very small","Everyone is in one room","Only one variable is measured"],0,"census vs sample"],
["A major advantage of sampling is that it can:",["Guarantee a correct answer","Save time and cost","Remove all bias","Avoid planning"],1,"census vs sample"],
["A census can still have problems if:",["Some people refuse or cannot respond","The data are numerical","The data are categorical","The population is known"],0,"census vs sample"],
["A sample can give a misleading estimate if:",["It is biased or unrepresentative","It is selected randomly","It represents key groups well","Its method is documented"],0,"census vs sample"],
["Random sampling aims to give:",["Each population member an equal chance of selection","Only volunteers a chance","Only convenient people a chance","Only experts a chance"],0,"sampling methods"],
["Surveying the first 50 people leaving one shopping centre is best described as:",["Random sampling","Convenience sampling","Stratified sampling","Systematic sampling"],1,"sampling methods"],
["Stratified sampling first divides the population into:",["Meaningful subgroups","Random numbers","Equal-sized boxes regardless of context","Only volunteers"],0,"sampling methods"],
["Systematic sampling commonly selects:",["Every nth member after a starting point","Only volunteers","Only the easiest people to reach","One random person only"],0,"sampling methods"],
["Compared with a well-designed random sample, non-random sampling can increase:",["Bias","Representativeness","Objectivity","Precision automatically"],0,"sampling methods"],
["If the sampling method is unbiased, increasing sample size generally reduces:",["Sampling variability","All forms of bias","Measurement error to zero","The population size"],0,"sampling methods"],
["Why is sampling often used instead of a census?",["It can be cheaper and faster","It must be more accurate","It always removes bias","It always uses fewer variables"],0,"sampling methods"],
["To estimate average household income across a city with very different neighbourhoods, a useful approach is:",["Convenience sampling from one suburb","Volunteer sampling online only","Stratified sampling across relevant neighbourhood groups","Surveying one household"],2,"sampling methods"],
["Sampling bias occurs when:",["Some groups are more likely to be selected than others","Every member has the same selection chance","The sample is large","The data are numerical"],0,"bias"],
["Running experimental trials under different temperatures without controlling temperature can introduce:",["Environmental bias or confounding","Random sampling","A census","Stratification"],0,"bias"],
["Observer bias occurs when:",["An observer's expectations influence recording or interpretation","A sensor has high resolution","A random sample is used","All participants respond"],0,"bias"],
["If trials are conducted under different environmental conditions, which issue should be considered?",["Environmental bias","Only sampling bias","Only non-response bias","No possible source of bias"],0,"bias"],
["Surveying only shoppers at one centre may be biased because:",["Shoppers may differ systematically from non-shoppers","Shoppers are guaranteed to be random","Shoppers represent every population equally","Location cannot affect samples"],0,"bias"],
["Non-response bias occurs when:",["Some groups are less likely to respond than others","Everyone responds","Only numerical data are collected","A census is used"],0,"bias"],
["Measurement error is more likely when an instrument is:",["Faulty or poorly calibrated","Carefully calibrated","Checked against a standard","Used within its stated precision"],0,"bias"],
["Which change is most likely to reduce sampling bias?",["Use a better-designed random or representative sampling method","Use only volunteers","Use only convenient participants","Ask fewer groups to participate"],0,"bias"]
];
window.skillrPracticeQuestions=source.map((q,i)=>({id:`ac9m8st01-p-${String(i+1).padStart(3,"0")}`,curriculumCode:"AC9M8ST01",bank:"practice",section:i<8?"E1":i<16?"E2":"E3",sourceNumber:i+1,skill:q[3],printable:true,type:"single",question:q[0],audioPrompt:q[0],visual:"",visualHtml:"",visualMeta:{type:"none",alt_text:""},answers:q[1],correct:q[2],explanation:`${q[1][q[2]]}.`,structuredExplanation:{summary:q[1][q[2]],hint:"Check how the data were collected and whether all groups had a fair chance to be represented."},qualitySchema:"production-v1"}));
window.quizQuestions=window.skillrPracticeQuestions;
