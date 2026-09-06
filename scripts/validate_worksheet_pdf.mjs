#!/usr/bin/env node
// Usage: node scripts/validate_worksheet_pdf.mjs <jspdf.umd.min.js> <linkedom-worker.mjs> <output-dir>
// Regression fixtures exercise the production generator in Node; no browser or quiz submissions.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';

const root=path.resolve(import.meta.dirname,'..');
const [jspdfPath,domPath,outputDir]=process.argv.slice(2);
assert(jspdfPath && domPath && outputDir,'Supply jsPDF 2.5.1, linkedom 0.18.12 worker, and a scratch output directory.');
const {DOMParser}=await import(pathToFileURL(path.resolve(domPath)));
const require=createRequire(import.meta.url);
const sharp=require(require.resolve('sharp',{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || root]}));
fs.mkdirSync(outputDir,{recursive:true});
const records=[];
const context={console,Blob,URL,Uint8Array,ArrayBuffer,DOMParser,
  atob:value=>Buffer.from(value,'base64').toString('binary'),
  btoa:value=>Buffer.from(value,'binary').toString('base64'),
  navigator:{userAgent:'Node PDF regression'},
  XMLSerializer:class{serializeToString(node){return node.toString();}}
};
context.window=context;context.self=context;
vm.createContext(context);
vm.runInContext(fs.readFileSync(jspdfPath,'utf8'),context);
const JsPDF=context.jspdf.jsPDF;
context.jspdf.jsPDF=function(options){
  const doc=new JsPDF(options), drawn=[];
  const text=doc.text.bind(doc),addImage=doc.addImage.bind(doc);
  doc.text=(value,x,y,options)=>{
    const width=doc.getTextWidth(value),page=doc.internal.getCurrentPageInfo().pageNumber;
    drawn.push({kind:'text',value,x,y,width,page,align:options?.align});
    return text(value,x,y,options);
  };
  doc.addImage=(data,type,x,y,w,h,...rest)=>{drawn.push({kind:'image',x,y,w,h,page:doc.internal.getCurrentPageInfo().pageNumber});return addImage(data,type,x,y,w,h,...rest);};
  doc.save=filename=>{
    const dest=path.join(outputDir,filename);fs.writeFileSync(dest,Buffer.from(doc.output('arraybuffer')));
    for(const item of drawn){
      if(item.kind==='image')assert(item.y+item.h<=doc.internal.pageSize.getHeight()-19,'Diagram entered footer');
      else{
        assert(item.y>0 && item.y<doc.internal.pageSize.getHeight(),'Text outside page');
        const right=item.align==='right'?item.x:item.x+item.width;
        assert(right<=doc.internal.pageSize.getWidth()-13,'Text ran past right margin: '+item.value);
      }
    }
    records.push({file:dest,pages:doc.getNumberOfPages(),images:drawn.filter(x=>x.kind==='image').length,text:drawn.filter(x=>x.kind==='text').map(x=>x.value).join('\n')});
  };
  return doc;
};
context.fetch=async url=>{
  if(String(url).startsWith('blob:'))return fetch(url);
  const file=path.resolve(root,String(url).replace(/^\//,''));
  assert(file.startsWith(root+path.sep),'Unexpected file fetch');
  const bytes=fs.readFileSync(file);
  return {ok:true,arrayBuffer:async()=>bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),text:async()=>bytes.toString(),blob:async()=>new Blob([bytes])};
};
context.Image=class{
  set src(url){fetch(url).then(r=>r.arrayBuffer()).then(async bytes=>{
    const svg=Buffer.from(bytes),meta=await sharp(svg).metadata();this.naturalWidth=meta.width;this.naturalHeight=meta.height;
    this.png=await sharp(svg,{density:200}).png().toBuffer();this.onload();
  }).catch(error=>this.onerror(error));}
};
let title='PDF regression: long text and symbols';
context.document={readyState:'loading',title,
  addEventListener(){},querySelector(selector){
    if(selector.includes('quizTitle'))return {textContent:title};
    if(selector.includes('eyebrow'))return {textContent:'Year 3 Maths'};
    return null;
  },
  createElement(tag){
    assert.equal(tag,'canvas');let picture;
    return {getContext:()=>({fillRect(){},drawImage(img){picture=img;}}),toDataURL:()=>`data:image/png;base64,${picture.png.toString('base64')}`};
  }
};
context.quizConfig={worksheetQuestionLimit:4,skillCode:'AC9M3M04'};
const source=fs.readFileSync(path.join(root,'quiz/assets/worksheet-pdf.js'),'utf8');
vm.runInContext(source.replace(/\}\)\(\);\s*$/,'window.pdfTest = { createPdf, answerFor, getPrintableQuestions, printableSvg };})();'),context);
const test=context.pdfTest;
assert.equal(test.answerFor({type:'number',correct:0}),'0');
assert.equal(test.answerFor({type:'single',answers:['zero','one'],correct:0}),'A. zero');
assert.equal(test.answerFor({type:'multiple',answers:['red','blue','green'],correct:[0,2]}),'A. red; C. green');
assert.equal(test.answerFor({type:'single',answers:['one','two'],correct:9}),'');
const longQuestion='Keep every part of this question. '.repeat(65)+'STEM_END_MARKER';
const longChoice='This complete choice contains supporting information. '.repeat(18)+'CHOICE_END_MARKER';
await test.createPdf([
  {id:'long',type:'single',question:longQuestion,answers:[longChoice,'A shorter alternative','The final choice must remain visible.'],correct:0,explanation:'Reasoning ends with EXPLANATION_END_MARKER.'},
  {id:'math',type:'number',question:'Use symbols correctly: 3 × 4 = 12; 2³ = 8; 5 ≥ 2; √9 = 3. What is 12 − 12?',correct:0,explanation:'Subtracting a number from itself gives zero.'},
  {id:'many',type:'single',question:'Every choice must be printed, including the last.',answers:Array.from({length:10},(_,i)=>`Choice ${i+1}: a complete option, ending with OPTION_${i+1}_END.`),correct:9},
  {id:'order',type:'order',question:'Put these numbers in increasing order.',items:['3','1','2'],correct:['1','2','3']}
]);
const first=records.at(-1);assert(first.pages>2);for(const marker of ['STEM_END_MARKER','CHOICE_END_MARKER','EXPLANATION_END_MARKER','OPTION_10_END'])assert(first.text.includes(marker),marker);

// Exercise production SVG resolution and rasterisation with actual, approved
// inline and external-symbol diagrams. Reading these fixtures never edits banks.
const banks={window:{}};vm.createContext(banks);
vm.runInContext(fs.readFileSync(path.join(root,'quiz/year-3/math/ac9m3m04/practice/experience-teacher-questions.js'),'utf8'),banks);
const clock=Object.values(banks.window).find(Array.isArray).find(q=>q.visualHtml?.includes('<svg'));
banks.window={};
vm.runInContext(fs.readFileSync(path.join(root,'quiz/year-1/math/ac9m1n06/practice/questions.js'),'utf8'),banks);
const groups=Object.values(banks.window).find(Array.isArray).find(q=>q.visualHtml?.includes('<use'));
title='PDF regression: original question diagrams';
await test.createPdf([clock,groups]);
const visual=records.at(-1);assert.equal(visual.images,2);assert(!visual.text.includes(clock.visual),'Visual answer leaked as alt text');
const expanded=await test.printableSvg(groups.visualHtml);assert(!expanded.includes('<use'));assert(expanded.includes('<circle'));
context.skillrWorksheetQuestions=[clock,groups,clock,{id:'x',type:'single',question:'X?',answers:['A','B'],correct:0},{id:'y',type:'single',question:'Y?',answers:['A','B'],correct:1}];
assert.equal(test.getPrintableQuestions().length,4);assert.equal(new Set(test.getPrintableQuestions().map(q=>q.id)).size,4);
fs.writeFileSync(path.join(outputDir,'pdf-regression-results.json'),JSON.stringify(records.map(({text,...r})=>r),null,2)+'\n');
console.log(JSON.stringify(records.map(({text,...r})=>r),null,2));
