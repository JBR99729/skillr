"""Scoped, original LA11 authoring. No published/runtime files are changed."""
import json
import re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3]
code='AC9E3LA11'
rows=[]
def add(strand,i,q,c,w,why,hint):
 rows.append(dict(strand=strand,bank='practice' if i<6 else 'test',question=q,correct=c,wrong=w,summary=why,hint=hint))
# Genuine changes to the assessed contractions, not an interchangeable context prefix.
for i,(full,short,sentence,wrong) in enumerate([
 ('I am',"I'm",'ready to begin.',["I'am","Im'","Im"]),
 ('you are',"you're",'welcome to join us.',["your","you'are","youre'"]),
 ('we have',"we've",'packed the picnic.',["we'ave","weve'","wev'e"]),
 ('she will',"she'll",'bring the paints.',["she'ill","shell'","shel'l"]),
 ('they are',"they're",'waiting at the gate.',["their","theyre'","they'are"]),
 ('he is',"he's",'building a model.',["h'es","hes'","heis'"]),
 ('we are',"we're",'walking to the oval.',["were","wer'e","we'are"]),
 ('I have',"I've",'found the missing sock.',["Iv'e","Ive'","I'ave"]),
]):
 add('form_contraction',i,f'Rewrite only “{full}” as a contraction: “The note says that {full} {sentence}”',short,wrong,f'{short} combines {full}; the apostrophe marks the omitted letters.','Keep the letters that remain in their original order.')
for i,(short,full,other) in enumerate([
 ("don't",'do not',['does not','did not','will not']), ("isn't",'is not',['it is','was not','has not']),
 ("weren't",'were not',['we are','are not','will not']), ("hasn't",'has not',['had not','have not','he is']),
 ("couldn't",'could not',['can not','would not','could have']), ("won't",'will not',['would not','was not','want not']),
 ("haven't",'have not',['had not','has not','he has']), ("wouldn't",'would not',['will not','would have','could not'])
]):
 add('expand_negative',i,f'Write the two words represented by “{short}”.',full,other,f'{short} means {full}.'+(' Won’t has an unusual spelling; remember its full form.' if short=="won't" else ' The contraction keeps the negative meaning.'),'Expand the whole contraction, not just its ending.')
for i,(full,short,lost,wrong) in enumerate([
 ('she is',"she's",'the i in is',['the s in she','the h in she','the s in is']),
 ('we are',"we're",'the a in are',['the e in we','the r in are','the w in we']),
 ('they have',"they've",'the h and a in have',['the v and e in have','the t and h in they','the e and y in they']),
 ('I will',"I'll",'the w and i in will',['the two l letters in will','the I at the start','only the w in will']),
 ('did not',"didn't",'the o in not',['the n in not','the t in not','the i in did']),
 ('you are',"you're",'the a in are',['the u in you','the r in are','the e in are']),
 ('we have',"we've",'the h and a in have',['the v and e in have','the w and e in we','only the h in have']),
 ('was not',"wasn't",'the o in not',['the a in was','the s in was','the n in not']),
]):
 add('omitted_letters',i,f'Compare “{full}” with “{short}”. Which letters does the apostrophe replace?',lost,wrong,f'Compare the full form letter by letter: {lost} disappears; the other letters remain.','The apostrophe marks missing letters, not a space alone.')
for i,(owner,thing,wrongnoun) in enumerate([
 ('girl','helmet','girls'),('rabbit','hutch','rabbits'),('teacher','desk','teachers'),('dog','lead','dogs'),
 ('artist','brush','artists'),('bird','nest','birds'),('pilot','map','pilots'),('farmer','tractor','farmers')
]):
 c=f"the {owner}'s {thing}"
 add('singular_possession',i,f'One {owner} owns a {thing}. Which phrase shows this ownership?',c,[f'the {wrongnoun} {thing}',f"the {wrongnoun}' {thing}",f"the {owner} {thing}'s"],f'The owner is one {owner}. Add apostrophe-s to {owner}, not to {thing}.','Find the owner before placing the apostrophe.')
for i,(owners,thing) in enumerate([
 ('players','boots'),('horses','paddock'),('sisters','bedroom'),('visitors','coats'),('bees','hive'),('bakers','aprons'),('ducks','pond'),('drivers','keys')
]):
 singular=owners[:-1]
 add('regular_plural_possession',i,f'Show the ownership: the {thing} belonging to several {owners}.',f"the {owners}' {thing}",[f"the {singular}'s {thing}",f'the {owners} {thing}',f"the {owners}'s {thing}"],f'{owners.capitalize()} already ends in s. Add an apostrophe after that s to show possession by more than one.','Write the plural owner first; then add the apostrophe.')
for i,(owners,thing,one) in enumerate([
 ('children','games','child'),('women','bags','woman'),('men','hats','man'),('people','ideas','person'),('mice','nests','mouse'),('geese','feathers','goose'),('children','drawings','child'),('women','bicycles','woman')
]):
 add('irregular_plural_possession',i,f'The {thing} belong to several {owners}. How should the ownership phrase be written?',f"the {owners}'s {thing}",[f"the {owners}' {thing}",f"the {one}'s {thing}",f'the {owners} {thing}'],f'{owners.capitalize()} is plural but does not end in s. Its possessive form adds apostrophe-s.','Do not change an irregular plural back to a singular owner.')
for i,(sentence,target,c,w,why) in enumerate([
 ('Two cats slept by the door.','cats','More than one cat; no ownership',['One cat owns something','Several cats own something','Missing letters in a contraction'],'Cats names two animals; it does not name an owner.'),
 ("The cat's bowl is empty.","cat's",'One cat owns the bowl',['Several cats own the bowl','More than one cat; no ownership','Cat is is shortened'],'The apostrophe before s marks one owner.'),
 ("The cats' bowls are empty.","cats'",'Several cats own the bowls',['One cat owns the bowls','More than one bowl; no ownership','Cats are is shortened'],'The plural cats already ends in s; the apostrophe follows it.'),
 ("She's carrying a basket.","She's",'She is, with a missing letter',['A basket belonging to she','Several people called She','A plural noun'],'She is carrying can be shortened to She’s carrying.'),
 ('The boys waved.','boys','More than one boy; no apostrophe needed',['One boy owns the wave','Several boys own something','Boy is with a missing letter'],'Boys is an ordinary plural subject, not a possessive form.'),
 ("The children's lunch is ready.","children's",'Possession by several children',['Possession by one child','A contraction of children is','An ordinary plural without ownership'],'Children is already plural; apostrophe-s marks its possession.'),
 ("We're planting seeds.","We're",'A contraction of we are',['A possessive form of we','An ordinary plural noun','A contraction of we were'],'We’re expands to we are in this sentence.'),
 ("The teachers' meeting starts soon.","teachers'",'A meeting for several teachers',['A meeting for one teacher','A contraction of teacher is','An ordinary plural with no relationship'],'The apostrophe follows plural teachers, showing the meeting belongs to that group.')
]): add('interpret_apostrophe',i,f'Read: “{sentence}” What does “{target}” show here?',c,w,why,'Try expanding a contraction or identifying the owner.')
for i,(q,c,w,why) in enumerate([
 ('A shop sign means that it sells apples. Repair “Fresh apple’s for sale”.','Fresh apples for sale',["Fresh apples' for sale","Fresh apple's for sale","Fresh apples's for sale"],'Apples is an ordinary plural; it needs no apostrophe.'),
 ('There is one coach. Repair “The coaches whistle fell.”',"The coach's whistle fell.",["The coaches' whistle fell.",'The coach whistle fell.',"The coach whistle's fell."],'One coach owns the whistle, so coach takes apostrophe-s.'),
 ('There are several students. Repair “The student’s bags are here.”',"The students' bags are here.",["The student's bags are here.",'The students bags are here.',"The students's bags are here."],'The owners are students, plural ending in s; add the apostrophe after s.'),
 ('Expand the contraction without changing meaning: “They’ll arrive after lunch.”','They will arrive after lunch.',['They are arriving after lunch.','They have arrived after lunch.','They would arrive after lunch.'],'They’ll is the contracted form of they will.'),
 ('The kitten licked the paw belonging to it. Choose the word that belongs before “paw” in the sentence.','its',["it's","its'",'it'],'Its shows possession. It’s means it is or it has, which does not fit before paw here.'),
 ('The sentence means “It is getting dark.” Choose its contracted form.',"It's getting dark.",['Its getting dark.',"Its' getting dark.",'It getting dark.'],'It’s expands to it is; its is the possessive word.'),
 ('Several foxes share a den. Repair “The foxe’s den was hidden.”',"The foxes' den was hidden.",["The fox's den was hidden.","The foxes's den was hidden.",'The foxes den was hidden.'],'Foxes is the full plural owner; place an apostrophe after its final s.'),
 ('A writer shortened “We are sure it is safe.” Which revision keeps both meanings?',"We're sure it's safe.",["Were sure its safe.","We're sure its safe.","Were sure it's safe."],'We’re means we are, and it’s means it is. Both contractions need their apostrophes.')
]):add('edit_in_context',i,q,c,w,why,'Check the intended meaning before changing punctuation.')
items=[]
counts={'practice':0,'test':0}
for bank in counts:
 for r in [r for r in rows if r['bank']==bank]:
  n=counts[bank];counts[bank]+=1;idx=n%4
  answers=list(r['wrong']);answers.insert(idx,r['correct'])
  if r['strand'] in ['form_contraction','singular_possession','regular_plural_possession','irregular_plural_possession','edit_in_context']:
   def describe_punctuation(text):
    before=re.findall(r"([A-Za-z]+)'",text)
    note=('apostrophe after '+before[0]) if len(before)==1 else ('apostrophes after '+' and '.join(before)) if before else 'no apostrophe'
    return text+' ('+note+')'
   answers=[describe_punctuation(x) for x in answers]
  item=dict(id=f"{code}-{'P' if bank=='practice' else 'T'}-{n+1:03d}",subject='english',year_level='Year 3',curriculum_code=code,bank=bank,stage='apply',skill='Apostrophes in Contractions and Possession',coverage_strand=r['strand'],question=r['question'],audio_prompt=r['question'],visual={'type':'none'},answers=[{'text':x,'is_correct':j==idx} for j,x in enumerate(answers)],correct_index=idx,explanation={'summary':r['summary'],'hint':r['hint']})
  items.append(item)
assert counts=={'practice':48,'test':16}
out=Path(__file__).with_name('ac9e3la11.json');out.write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n')
print(out)
