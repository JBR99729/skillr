import fs from 'node:fs';
import path from 'node:path';

const R = path.resolve(import.meta.dirname, '..');
const codes = {
  AC9E6LA02: {
    title: 'Objective, subjective and biased language',
    teach: 'Separate checkable information from judgement, then inspect wording, attribution, selection, omission, images and data before making a qualified judgement about bias.',
    rows: [
      ['objective statement','The survey recorded 186 responses.','It reports a checkable quantity without adding approval or disapproval.','The survey recorded 186 responses, including 94 from junior students.','A factual sentence guarantees that the whole text is unbiased.'],
      ['subjective statement','The new timetable is a wonderful improvement.','The adjective “wonderful” expresses the writer’s positive judgement.','In my view, the new timetable makes transitions easier.','Any sentence containing a number is objective.'],
      ['loaded language','The council dumped its disastrous plan on families.','“Dumped” and “disastrous” push readers towards a negative response.','The council released its plan for public comment.','Loaded words are simply longer words.'],
      ['attributed opinion','The coach said the new rule was unfair.','The opinion is clearly assigned to the coach rather than presented as fact.','The coach described the rule as unfair; the report also summarised the referee’s reasons.','Putting an opinion in quotation marks turns it into a fact.'],
      ['selection bias','The article quotes four opponents but no supporters of the proposal.','The chosen voices represent only one side of the issue.','Add relevant evidence from supporters, opponents and independent sources.','Neutral vocabulary removes selection bias.'],
      ['omission','A canteen advertisement states the snack is low in fat but leaves out its high sugar level.','The missing information could change how readers judge the product.','Report both the fat and sugar figures per serving.','Omitted information cannot create bias because it is not on the page.'],
      ['framing','Only 12% disagreed with the plan.','Beginning with “only” makes the disagreement appear unimportant.','The survey found 88% agreed and 12% disagreed.','Framing changes facts, so the percentages must be false.'],
      ['positive connotation','The determined captain continued training.','“Determined” presents persistence as an admirable quality.','The captain continued training despite the setback.','Connotation is the same as a dictionary definition.'],
      ['negative connotation','The stubborn captain continued training.','“Stubborn” presents the same persistence as unreasonable resistance.','The captain continued training despite advice to rest.','Two near-synonyms always position readers in the same way.'],
      ['sampling bias','A “student opinion” poll asks only members of the debating club.','The sample may not represent the whole student population.','Invite a random mix of students from every year level.','A large heading makes a sample representative.'],
      ['visual bias','A report about crowded parks uses a tightly cropped photo of one busy corner.','The crop may make an unusual scene seem typical of the whole park.','Use a labelled wide view and state when and where the photograph was taken.','Photographs are automatically objective evidence.'],
      ['qualified judgement','The report may favour the proposal because it quotes supporters first and omits the cost estimate.','The claim identifies specific evidence and limits its certainty.','The ordering and omission suggest bias, although more source information is needed.','Identifying bias proves every claim in the text is false.']
    ]
  },
  AC9E6LA03: {
    title: 'Stages, phases and adapted text structures',
    teach: 'Identify a text’s dominant purpose, label its major stages and smaller phases, notice language and multimodal signals, and explain why an author adapts a typical structure.',
    rows: [
      ['information report','Wetlands are defined first; later sections group details about plants, animals and water quality.','Classification followed by grouped description helps readers build organised knowledge.','Use headings for classification, habitat, species and threats.','Every information report must be written in time order.'],
      ['explanation','The text identifies erosion, traces wind and water action, then explains the changed coastline.','A phenomenon-to-causes-to-result sequence answers how or why something occurs.','Move the result after the linked causes so the process is easy to follow.','An explanation and a procedure have the same purpose.'],
      ['procedure','The page states a goal, lists equipment, gives numbered steps and finishes with a safety check.','The order enables a reader to complete a task accurately and safely.','Place the warning immediately before the step where the hazard occurs.','Numbered steps alone prove that a text is a procedure.'],
      ['historical recount','The account establishes the setting, sequences events and closes with their immediate outcome.','Chronology helps readers follow what happened over time.','Add dated evidence and transitions such as “later that year”.','A historical recount should never explain causes.'],
      ['persuasive argument','The writer states a position, gives reasons and evidence, addresses a counterargument and concludes.','The stages build and defend a position while acknowledging another view.','Place the counterargument before the final recommendation.','A persuasive text needs only a strong opinion.'],
      ['narrative','The story introduces the setting, develops a complication and resolves the conflict.','The stages build expectations and show how characters respond to change.','Delay the key solution until after the complication has developed.','Every narrative follows exactly the same number of paragraphs.'],
      ['stage','Three paragraphs together explain how rainfall enters the river system.','A stage is a major functional section and can extend across several paragraphs.','Label the three paragraphs together as the causes stage.','A stage is always one paragraph.'],
      ['phase','Within the results stage, one paragraph reports temperature and another reports growth.','Each smaller move develops one part of the larger results stage.','Use subheadings to distinguish the temperature and growth phases.','A phase is an unrelated decoration.'],
      ['adapted opening','A science report opens with a brief story about finding a sick turtle before classifying plastic pollution.','The anecdote engages readers while the report’s dominant informative purpose remains clear.','Follow the anecdote with an explicit classification and evidence.','Any anecdote changes an information report into a narrative.'],
      ['embedded structure','A proposal uses a cause-and-effect explanation inside its evidence section.','The embedded explanation helps show why the proposed action is reasonable.','Signal the embedded explanation with “because” and return clearly to the recommendation.','A text can contain only one structure.'],
      ['multimodal phase','A diagram and caption show the water cycle between two explanatory paragraphs.','The visual phase represents relationships that are cumbersome to describe in words alone.','Refer to the labelled diagram in the surrounding explanation.','Visuals sit outside a text’s organisation.'],
      ['dominant structure','A creek article describes the damage, explains its causes, compares two repairs and recommends native planting.','Problem–solution dominates even though cause–effect and comparison phases are embedded.','Use headings that make the problem, options and recommendation visible.','One time connective determines the structure of the whole text.']
    ]
  },
  AC9E6LA04: {
    title: 'Cohesion through repetition and word associations',
    teach: 'Build clear links across sentences and paragraphs through purposeful repetition, synonyms, antonyms, category words, pronoun reference and consistent lexical chains.',
    rows: [
      ['purposeful repetition','Mangrove roots trap sediment. These roots also shelter young fish.','Repeating “roots” keeps the technical focus exact across sentences.','Mangrove roots trap sediment. These roots also create sheltered habitat.','All repeated nouns should be replaced with pronouns.'],
      ['synonym chain','The storm damaged the coast. The destructive weather system also closed roads.','A related expression maintains the topic while adding meaning.','The storm damaged the coast. This severe weather event also closed roads.','Any two words with similar meanings can be swapped in every context.'],
      ['category link','Kookaburras and rosellas visited the garden. These birds fed near the fence.','The superordinate term “birds” groups the named species.','Kookaburras and rosellas visited. These native birds fed near the fence.','A category word must repeat every original noun.'],
      ['part–whole link','The bicycle needed repair. Its chain had slipped from the gears.','“Chain” and “gears” are associated parts of the bicycle, sustaining the topic.','The bicycle needed repair because its chain had slipped from the gears.','Word association means the words must rhyme.'],
      ['antonym contrast','The northern slope was dry, but the southern slope remained wet.','The antonyms create a clear contrast within the same topic.','The northern slope was dry; by contrast, the southern slope remained wet.','Antonyms always make a paragraph confusing.'],
      ['pronoun reference','Ava placed the seedling beside the stake. She tied it loosely.','“She” refers to Ava and “it” refers to the seedling; both references are recoverable.','Ava placed the seedling beside the stake and tied the seedling loosely.','A pronoun is clear whenever there are nouns nearby.'],
      ['demonstrative reference','The creek overflowed after heavy rain. This caused the path to close.','“This” points back to the whole preceding event.','The creek overflowed after heavy rain. This flooding caused the path to close.','“This” always has a clear meaning on its own.'],
      ['ambiguous reference','Lena told Priya that she had misread the scale.','“She” could refer to either person, so the participant chain breaks.','Lena said, “Priya, you have misread the scale.”','Readers should always guess the nearest noun.'],
      ['semantic field','Seedlings, canopy, roots and habitat recur throughout the rainforest report.','The related vocabulary forms a lexical chain around the report’s subject.','Keep the rainforest terms consistent and define any new technical word.','A lexical chain is a list placed in one sentence.'],
      ['controlled variation','The habitat supports frogs. This wetland environment also filters water.','The synonym adds variety without losing the shared reference.','The habitat supports frogs. This wetland habitat also filters water.','Writers should avoid repeating key technical terms.'],
      ['broken lexical chain','The report shifts from “solar panels” to “machines” and then “things”.','The increasingly vague substitutes make the topic harder to track.','Use “solar panels”, “the panels” and “this energy system”.','Any substitute automatically improves cohesion.'],
      ['paragraph link','The first paragraph explains habitat loss. The next begins, “This decline also affects food webs.”','The repeated idea “decline” connects the new consequence to the previous paragraph.','Begin the next paragraph by naming the shared idea before adding the consequence.','Paragraphs should not repeat ideas from one another.']
    ]
  },
  AC9E6LA05: {
    title: 'Embedded clauses in complex sentences',
    teach: 'Find the head noun and core clause, recognise clauses embedded inside noun groups, and use restrictive, supplementary, content and non-finite clauses to elaborate, extend or explain precisely.',
    rows: [
      ['relative embedded clause','The sensor that recorded the highest value was recalibrated.','“That recorded the highest value” expands the head noun “sensor”.','The sensor that recorded the highest value was recalibrated after lunch.','Every clause beginning with “that” is a separate main clause.'],
      ['core clause','The athlete who won the regional race thanked her coach.','Removing the embedded information reveals “The athlete thanked her coach.”','The athlete, who won the regional race, thanked her coach.','Removing an embedded clause must leave a fragment.'],
      ['restrictive clause','Students who completed the trial checked their results.','The clause identifies which students checked; the information is essential to the group.','Students who completed the trial checked their results carefully.','All relative clauses need commas.'],
      ['supplementary clause','The students, who had completed the trial, checked their results.','The commas present the clause as extra information about all the students.','The students, who had completed the trial, checked their results twice.','Commas around a relative clause never affect meaning.'],
      ['who clause','The volunteer who designed the poster explained its symbols.','“Who designed the poster” elaborates the person named by “volunteer”.','The volunteer who designed the poster explained each symbol clearly.','“Who” can refer equally well to any object.'],
      ['which clause','The bridge, which opened in 1932, is being restored.','The clause adds supplementary information about the bridge.','The bridge, which opened in 1932, is undergoing careful restoration.','“Which” clauses can never be embedded.'],
      ['content clause','The claim that the device was accurate was tested twice.','“That the device was accurate” expands the meaning of the noun “claim”.','The claim that the device was accurate was tested under controlled conditions.','An embedded clause must always describe a person.'],
      ['non-finite clause','The samples collected near the inlet contained more salt.','“Collected near the inlet” expands “samples” without a finite verb.','The samples collected near the inlet were tested separately.','A group without a finite verb can never expand a noun.'],
      ['position beside head noun','The report described the coral that divers photographed.','Placing the clause beside “coral” makes its reference clear.','The report described the coral that divers photographed during the survey.','An embedded clause can be placed anywhere without ambiguity.'],
      ['nested information','The book that Maya said won the award is on display.','“That Maya said won the award” is embedded inside the noun group headed by “book”.','The award-winning book Maya recommended is on display.','A sentence cannot contain information inside another clause.'],
      ['fragment check','Which was discovered near the creek.','The relative clause has no independent core clause and cannot stand alone here.','The shell, which was discovered near the creek, is now in the museum.','Every clause is a complete sentence.'],
      ['clarity revision','The dog chased the cyclist that was barking loudly.','The clause appears to modify “cyclist”, creating an unintended and illogical meaning.','The barking dog chased the cyclist.','Readers will always attach a clause to the intended noun.']
    ]
  },
  AC9E6LA06: {
    title: 'Precise verbs, elaborated tenses and adverb groups',
    teach: 'Sharpen ideas by choosing precise verbs, using tense and aspect to show time relationships, calibrating modality, and adding only useful adverb groups and prepositional phrases.',
    rows: [
      ['precise verb','The creek surged over the low bank.','“Surged” shows forceful, rapid movement more precisely than “went”.','After the storm, the creek surged over the low bank.','Adding many adjectives is always the best way to sharpen a sentence.'],
      ['simple past','The temperature rose by six degrees.','“Rose” presents the change as a completed past event.','During the trial, the temperature rose by six degrees.','Simple past always means an event happened before another past event.'],
      ['past progressive','The temperature was rising when the timer sounded.','“Was rising” shows an ongoing process interrupted at a past moment.','The temperature was rising steadily when the timer sounded.','Progressive aspect presents every event as completed.'],
      ['past perfect','The temperature had risen before the heater switched off.','“Had risen” places the completed rise before another past event.','By the time the heater switched off, the temperature had risen six degrees.','Past perfect is simply a more formal version of simple past.'],
      ['present perfect','Scientists have monitored the reef since 2018.','The monitoring began in the past and remains relevant to the present.','Scientists have carefully monitored the reef since 2018.','Present perfect names a future event.'],
      ['modality: possibility','The seedlings may recover after rainfall.','“May” presents recovery as possible rather than certain.','With continued rainfall, the seedlings may gradually recover.','“May” and “must” express the same strength.'],
      ['modality: strong obligation','Visitors must remain behind the barrier.','“Must” expresses a strong requirement in this safety context.','For safety, visitors must remain behind the marked barrier.','A strong modal verb always expresses scientific certainty.'],
      ['adverb group of manner','The turtle moved remarkably slowly.','The adverb group explains how the turtle moved.','Across the warm sand, the turtle moved remarkably slowly.','Every adverb tells when something happened.'],
      ['prepositional phrase of place','The lizard sheltered beneath the fallen log.','“Beneath the fallen log” locates the sheltering event.','At midday, the lizard sheltered beneath the fallen log.','A prepositional phrase can only describe time.'],
      ['condition','Under equal conditions, both samples should dissolve at similar rates.','The opening phrase limits the claim to a stated condition.','Under equal conditions, both samples should dissolve at approximately the same rate.','Conditions make a claim less precise.'],
      ['dangling modifier','After crossing the oval, the rain soaked Mia’s jacket.','The opening phrase wrongly makes “the rain” seem to cross the oval.','After Mia crossed the oval, the rain soaked her jacket.','An opening adverbial can logically attach to any noun.'],
      ['selective expansion','At dawn, the exhausted hikers cautiously crossed the narrow bridge.','The time, manner and precise verb serve the scene without overwhelming it.','At dawn, the exhausted hikers cautiously crossed the narrow bridge before the wind strengthened.','More detail always makes an idea sharper.']
    ]
  }
};

const clean = s => String(s).replace(/\s+/g, ' ').trim();
function rotatedOptions(correct, pool, seed) {
  const wrong = [...new Set(pool.filter(x => x !== correct))].slice(0, 3);
  while (wrong.length < 3) wrong.push(['It ignores the evidence in the sentence.','It confuses the feature with a different language choice.','It makes an absolute claim that the example does not support.'][wrong.length]);
  const answers = wrong.map(text => ({text, is_correct:false}));
  answers.splice(seed % 4, 0, {text:correct, is_correct:true});
  return answers;
}
function item(code, bank, n, stage, skill, question, correct, wrongs, summary, hint) {
  const answers = rotatedOptions(correct, wrongs, n + code.charCodeAt(8));
  return {id:`${code}-${bank === 'practice' ? 'P' : 'T'}-${String(n).padStart(3,'0')}`,curriculum_code:code,year_level:'Year 6',subject:'english',bank,stage,skill,question:clean(question),audio_prompt:clean(question),answers,correct_index:answers.findIndex(a=>a.is_correct),explanation:{summary:clean(summary),hint:clean(hint)},difficulty:stage==='foundation'?1:stage==='core'?2:3,difficulty_tier:stage,sequence_priority:n,quality_schema:'research-aligned-original-v2'};
}
function buildPractice(code, cfg) {
  const labels=cfg.rows.map(r=>r[0]), reasons=cfg.rows.map(r=>r[2]), revisions=cfg.rows.map(r=>r[3]), traps=cfg.rows.map(r=>r[4]);
  const out=[];
  cfg.rows.forEach((r,i)=>{
    const [label,example,reason,revision,trap]=r, base=i*4;
    out.push(item(code,'practice',base+1,'foundation',label,`Read: “${example}” Which description best identifies the highlighted language or text choice?`,label,labels,`This is ${label}: ${reason}`,`Name the exact feature before explaining its effect.`));
    out.push(item(code,'practice',base+2,i<6?'foundation':'core',`${label}-effect`,`Why is this choice effective in context: “${example}”?`,reason,reasons,reason,`Connect a precise piece of evidence to what it helps the reader understand.`));
    out.push(item(code,'practice',base+3,i<4?'core':'application',`${label}-revision`,`Which revision best applies ${label} to the idea in “${example}”?`,revision,revisions,`The revision applies ${label} deliberately while keeping the meaning clear.`,`Check meaning, purpose and grammatical or structural accuracy—not just fluency.`));
    out.push(item(code,'practice',base+4,i<8?'core':'challenge',`${label}-misconception`,`A student says, “${trap}” Which response best corrects the misconception?`,`The claim is too broad; the example shows that ${reason.charAt(0).toLowerCase()+reason.slice(1)}`,[...traps,...reasons],`The correction uses evidence from this example instead of an always-or-never rule.`,`Test the claim against the example and look for words such as always, never or guarantees.`));
  });
  return out;
}
function buildTest(code,cfg){
  const labels=cfg.rows.map(r=>r[0]), reasons=cfg.rows.map(r=>r[2]), revisions=cfg.rows.map(r=>r[3]), traps=cfg.rows.map(r=>r[4]);
  return Array.from({length:16},(_,i)=>{
    const r=cfg.rows[i%cfg.rows.length], [label,example,reason,revision,trap]=r, mode=i%4, setting=['a museum label','a school report','a community webpage','a student presentation'][Math.floor(i/4)];
    if(mode===0)return item(code,'test',i+1,'independent',label,`In ${setting}, you read: “${example}” Which analysis is most accurate?`,`${label}: ${reason}`,reasons.map((x,j)=>`${labels[j]}: ${x}`),`${label} is supported by the wording and its function in the whole sentence.`,`Identify, cite and explain.`);
    if(mode===1)return item(code,'test',i+1,'independent',`${label}-purpose`,`For ${setting}, which editing decision best demonstrates control of ${label}?`,revision,revisions,`This option deliberately applies ${label} without changing the intended meaning.`,`Reject choices that merely add length or sound impressive.`);
    if(mode===2)return item(code,'test',i+1,'transfer',`${label}-reasoning`,`While reviewing ${setting}, which statement should an editor reject about “${example}”?`,trap,traps,`The rejected statement is an inaccurate generalisation about ${label}.`,`Select the claim contradicted by the evidence or by the language rule.`);
    return item(code,'test',i+1,'transfer',`${label}-explanation`,`For ${setting}, which explanation would earn full credit for the language choice in “${example}”?`,reason,reasons,reason,`A full-credit explanation links exact evidence to meaning or purpose.`);
  });
}
function asJs(x){return{id:x.id,curriculumCode:x.curriculum_code,bank:x.bank,stage:x.stage,skill:x.skill,printable:true,type:'single',question:x.question,audioPrompt:x.audio_prompt,visual:'',visualHtml:'',visualMeta:{type:'none',alt_text:''},answers:x.answers.map(a=>a.text),correct:x.correct_index,explanation:`${x.explanation.summary}\nHint: ${x.explanation.hint}`,structuredExplanation:x.explanation,qualitySchema:x.quality_schema};}
function writeQuestions(code, p, t){
  const d=path.join(R,'quiz/year-6/english',code.toLowerCase());
  const ps=`"use strict";\nwindow.skillrPracticeQuestions = ${JSON.stringify(p.map(asJs),null,2)};\nwindow.quizQuestions = window.skillrPracticeQuestions;\n`;
  const ts=`"use strict";\nwindow.skillrTestQuestions = ${JSON.stringify(t.map(asJs),null,2)};\nwindow.skillrExamQuestions = window.skillrTestQuestions;\nwindow.quizQuestions = window.skillrTestQuestions;\n`;
  fs.writeFileSync(path.join(d,'practice/questions.js'),ps);
  fs.writeFileSync(path.join(d,'practice/practice-questions.js'),ps);
  fs.writeFileSync(path.join(d,'test/questions.js'),ts);
}
function escapeHtml(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('“','&ldquo;').replaceAll('”','&rdquo;');}
function updateClassroom(code,cfg){
  const unitDir=fs.readdirSync(path.join(R,'year6/english')).find(x=>x.startsWith(code.toLowerCase()+'-'));
  const f=path.join(R,'year6/english',unitDir,'teacher-slides/index.html'); let h=fs.readFileSync(f,'utf8');
  const rows=cfg.rows.slice(0,6).map(r=>`<li><strong>${escapeHtml(r[0])}:</strong> ${escapeHtml(r[1])} <em>Ask:</em> ${escapeHtml(r[2])}</li>`).join('');
  const block=`<details name="lesson" class="research-aligned-lesson"><summary><span>Explicit teaching sequence</span><span>Research aligned</span></summary><div class="panel"><article class="content-block"><h2>${escapeHtml(cfg.title)}</h2><p><strong>Learning intention:</strong> ${escapeHtml(cfg.teach)}</p><ol><li>Model the feature in one short example.</li><li>Ask students to name the exact evidence.</li><li>Connect the evidence to meaning, purpose or clarity.</li><li>Compare a correct and misleading interpretation.</li><li>Guide a revision, then release students to a fresh example.</li></ol><h3>Model and guided checks</h3><ul>${rows}</ul><p><strong>Misconception check:</strong> ${escapeHtml(cfg.rows[10][4])} Students must use evidence to repair the claim.</p><p><strong>Exit check:</strong> Identify the feature, cite evidence, explain its effect and make one justified revision.</p></article></div></details>`;
  h=h.replace(/<details name="lesson" class="research-aligned-lesson">[\s\S]*?<\/details>/,block);
  if(!h.includes('class="research-aligned-lesson"'))h=h.replace('<details name="lesson"><summary><span>Practice and review</span>',block+'\n<details name="lesson"><summary><span>Practice and review</span>');
  fs.writeFileSync(f,h);
}
function updateWorksheet(code,cfg){
  const f=path.join(R,'quiz/year-6/english',code.toLowerCase(),'worksheet/index.html'); let h=fs.readFileSync(f,'utf8');
  const focus=`<p><strong>Learning focus:</strong> ${escapeHtml(cfg.teach)}</p>`;
  h=h.replace(/<p><strong>Learning focus:<\/strong>[\s\S]*?<\/p>/,focus);
  if(!h.includes('<strong>Learning focus:</strong>'))h=h.replace(/(<aside class="lesson-support"[\s\S]*?<p><strong>[^<]+<\/strong><\/p>)<p>[\s\S]*?<\/p>/,`$1${focus}`);
  h=h.replace(/<p>Use this printable homework sheet[\s\S]*?<\/p>/,`<p>Use these original questions after the Topic Guide. Begin with direct recognition, then explain evidence, revise examples and correct a common misconception.</p>`);
  h=h.replace(/worksheetQuestionLimit:\d+/, 'worksheetQuestionLimit:12');
  fs.writeFileSync(f,h);
}

for(const [code,cfg] of Object.entries(codes)){
  const p=buildPractice(code,cfg),t=buildTest(code,cfg);
  fs.writeFileSync(path.join(R,'assets/assessment-banks/year6/english',code.toLowerCase()+'.json'),JSON.stringify([...p,...t],null,2)+'\n');
  writeQuestions(code,p,t); updateClassroom(code,cfg); updateWorksheet(code,cfg);
}
console.log('Rebuilt AC9E6LA02–AC9E6LA06: 48 Practice and 16 Test questions per code; Classroom Views and worksheets aligned.');
