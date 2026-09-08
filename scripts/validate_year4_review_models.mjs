import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const adapter=fs.readFileSync(new URL('../quiz/year-4/math/reviewed-number-visuals.js',import.meta.url),'utf8');
const version='20260908-year4-first-five';
const question=(id,file)=>({id,question:'Which fraction is marked?',answers:['3/4','1/4','1/2','1'],correct:0,explanation:'Three of four equal intervals.\nHint: Count intervals.',visualMeta:{type:'svg',asset_path:`/assets/assessment-visuals/year4/math/ac9m4n04/${file}.svg#model`,alt_text:'Four equal intervals with the third marked.'}});
const first=question('ac9m4n04-p-001','one'),second=question('ac9m4n04-p-002','two');
const response=q=>({questionId:q.id,question:q.question,correctAnswer:q.answers[q.correct],explanation:q.explanation});
function render(bank,result,route='/quiz/year-4/math/ac9m4n04/practice/review/'){
  const models=[];let callback;
  const cards=(result?.answers||[{}]).map(()=>({querySelector:selector=>selector==='h2'?{after:svg=>models.push(svg)}:null}));
  const document={body:{dataset:{resultKey:'result',bankVersion:version}},addEventListener:(_,fn)=>{callback=fn;},querySelectorAll:()=>cards,createElementNS:(_,tag)=>({tag,attributes:{},children:[],style:{},classList:{add(){}},setAttribute(k,v){this.attributes[k]=v;},appendChild(el){this.children.push(el);}})};
  vm.runInNewContext(adapter,{window:{quizQuestions:bank},location:{pathname:route},document,sessionStorage:{getItem:()=>typeof result==='string'?result:JSON.stringify(result)}});
  callback();return models;
}
const current=answers=>({bankVersion:version,answers});
assert.equal(render([first,second],current([response(second)]))[0].children[0].attributes.href,second.visualMeta.asset_path,'Duplicate prompts must use the saved question ID');
assert.equal(render([first],{bankVersion:'older',answers:[response(first)]}).length,0,'Do not illustrate a historical bank with current models');
assert.equal(render([first],current([{...response(first),question:'An older prompt'}])).length,0);
assert.equal(render([first],current([{...response(first),correctAnswer:'1/2'}])).length,0);
assert.equal(render([first],current([{...response(first),explanation:'An older explanation'}])).length,0);
for(const source of ['/assets/assessment-visuals/year4/math/ac9m4n05/one.svg#model','https://example.com/one.svg#model','/assets/assessment-visuals/year4/math/ac9m4n04/../secret.svg#model']){
  const q={...first,visualMeta:{...first.visualMeta,asset_path:source}};
  assert.equal(render([q],current([response(q)])).length,0,'Reject unrelated or external models');
}
assert.equal(render([first],null).length,0);
assert.equal(render([first],'{broken').length,0);
assert.equal(render([first],current([response(first)]),'/quiz/year-4/math/ac9m4n06/practice/review/').length,0);
for(const code of ['ac9m4n06','ac9m4n07','ac9m4n08','ac9m4n09','ac9m4a01']){
  const q={...first,id:`${code}-p-001`,visualMeta:{...first.visualMeta,asset_path:`/assets/assessment-visuals/year4/math/${code}/model.svg#model`}};
  assert.equal(render([q],current([response(q)]),`/quiz/year-4/math/${code}/practice/review/`).length,1,`${code}: retain the matching reviewed model`);
}
const unreviewed={...first,visualMeta:{...first.visualMeta,asset_path:'/assets/assessment-visuals/year4/math/ac9m4a02/model.svg#model'}};
assert.equal(render([unreviewed],current([response(unreviewed)]),'/quiz/year-4/math/ac9m4a02/practice/review/').length,0,'Do not extend the adapter beyond reviewed release scope');
assert.equal(render([{...first,visualMeta:{type:'none'}}],current([response(first)])).length,0);
console.log('PASS reviewed Year 4 response models: saved identity, version, answer/explanation, source isolation and missing-data regression checks.');
