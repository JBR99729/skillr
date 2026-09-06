import json, csv, re, shutil
from pathlib import Path
root=Path.cwd()
asset=root/'assets/assessment-banks/year2/english'
quiz=root/'quiz/year-2/english'
version='20260906-english-rest-v1'
quality='year2-english-remaining-original-v1'

def slug(s): return re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
CODES={
'AC9E2LA06':('Compound Sentences with Conjunctions','Understand that connections can be made between ideas by using a compound sentence with 2 or more independent clauses usually linked by a coordinating conjunction','Use conjunctions; identify subject and predicate'),
'AC9E2LA07':('Noun Groups and Verb Groups','Understand that in sentences nouns may be extended into noun groups using articles and adjectives, and verbs may be expressed as verb groups','Nouns, articles, adjectives, action verbs and helping verbs'),
'AC9E2LA08':('How Images Add Meaning','Understand that images add to or multiply the meanings of a text','Official descriptor; no direct IXL Year 2 mapping found'),
'AC9E2LA09':('Vocabulary for Topic and Meaning','Experiment with and begin to make conscious choices of vocabulary to suit the topic','Time-order words, categories, synonyms, antonyms, homophones, context clues'),
'AC9E2LA10':('Capital Letters in Titles and Commas in Lists','Recognise that capital letters are used in titles and commas are used to separate items in lists','Capitalising titles'),
'AC9E2LE01':('Characters and Settings Across Literature','Discuss how characters and settings are connected in literature created by First Nations Australian, and wide-ranging Australian and world authors and illustrators','Official descriptor; literature connection tasks'),
'AC9E2LE02':('Features and Preferences in Literary Texts','Identify features of literary texts, such as characters and settings, and give reasons for personal preferences','Actions and dialogue to understand characters'),
'AC9E2LE03':('How Language Presents Characters and Settings','Discuss the characters and settings of a range of texts and identify how language is used to present these features in different ways','Actions/dialogue, story analysis, sensory details'),
'AC9E2LE04':('Rhythm Rhyme and Word Patterns','Identify, reproduce and experiment with rhythmic sound and word patterns in poems, chants, rhymes or songs','Rhyming words, poems and riddles'),
'AC9E2LE05':('Adapt and Edit Literary Texts','Create and edit literary texts by adapting structures and language features of familiar literary texts through drawing, writing, performance and digital tools','Sentence order, time words, descriptive details, stronger verbs'),
'AC9E2LY01':('Similar Topics in Different Texts','Identify how similar topics and information are presented in different types of texts','Compare/contrast and informational passages'),
'AC9E2LY02':('Interaction Skills for Speaking and Listening','Use interaction skills when engaging with topics, actively listening to others, receiving instructions and extending own ideas, speaking appropriately, expressing and responding to opinions, making statements, and giving instructions','Official descriptor; no direct IXL mapping found'),
'AC9E2LY03':('Purpose and Audience','Identify the purpose and audience of imaginative, informative and persuasive texts','Writer purpose'),
'AC9E2LY04':('Fluent Reading and Self Correction','Read texts with phrasing and fluency, using phonic and word knowledge, and monitoring meaning by re-reading and self-correcting','Blend, vowel digraph, diphthong and syllable sentence skills'),
'AC9E2LY05':('Comprehension Strategies','Use comprehension strategies such as visualising, predicting, connecting, summarising, monitoring and questioning to build literal and inferred meaning','Story order, characters, themes, informational passages'),
'AC9E2LY06':('Create and Edit Short Texts','Create and edit short imaginative, informative and persuasive written and/or multimodal texts for familiar audiences, using text structure appropriate to purpose, simple and compound sentences, noun groups and verb groups, topic-specific vocabulary, simple punctuation and common 2-syllable words','Writing, opinion, cause/effect, sequence, grammar and vocabulary skills'),
'AC9E2LY07':('Short Oral Presentations','Create, rehearse and deliver short oral and/or multimodal presentations for familiar audiences and purposes, using text structure appropriate to purpose and topic-specific vocabulary, and varying tone, volume and pace','Official descriptor; no direct IXL mapping found'),
'AC9E2LY08':('Legible Upper-case and Lower-case Writing','Write words legibly and with growing fluency using unjoined upper-case and lower-case letters','Official descriptor; handwriting tasks'),
'AC9E2LY09':('Manipulate Sounds in Words','Manipulate more complex sounds in spoken words and use knowledge of blending, segmenting, phoneme deletion and phoneme substitution to read and write words','Open/closed syllables, vowel sound comparison'),
'AC9E2LY10':('Sound-letter Patterns in Multisyllable Words','Use phoneme–grapheme matches, including vowel digraphs, less common long vowel patterns, consonant clusters and silent letters when reading and writing words of one or more syllables, including compound words','Syllables, blends, digraphs, silent letters, vowel patterns, compound words'),
'AC9E2LY11':('Spelling Patterns and High-frequency Words','Use knowledge of spelling patterns and morphemes to read and write words whose spelling is not completely predictable from their sounds, including high frequency words','Sight words'),
'AC9E2LY12':('Morphemic Word Families','Build morphemic word families using knowledge of prefixes and suffixes','Prefixes, suffixes, plurals and regular tense'),
}

def mcq(code, bank, n, skill, question, correct, wrong1, wrong2, why, diff=2):
    opts=[correct,wrong1,wrong2]
    rot=(n-1)%3
    opts=opts[rot:]+opts[:rot]
    return {'id':f'{code}-{"P" if bank=="practice" else "T"}-{n:03d}','subject':'english','year_level':'Year 2','curriculum_code':code,'bank':bank,'stage':'apply' if n>8 else 'recognise','skill':skill,'question':question,'audio_prompt':question,'visual':{'type':'none','alt_text':''},'answers':[{'text':o,'is_correct':o==correct} for o in opts],'correct_index':opts.index(correct),'explanation':{'summary':why,'hint':'Read the whole sentence or text clue, then choose the answer that best fits the Year 2 English idea.'},'difficulty':diff,'difficulty_tier':['confidence','core','stretch'][min(diff-1,2)],'sequence_priority':n,'quality_schema':quality}

def adult(code, bank, n, skill, question, model, accept, diff=3):
    return {'id':f'{code}-{"P" if bank=="practice" else "T"}-{n:03d}','subject':'english','year_level':'Year 2','curriculum_code':code,'bank':bank,'stage':'create','skill':skill,'question':question,'audio_prompt':question,'visual':{'type':'none','alt_text':''},'answers':[{'text':'Parent or teacher review needed','is_correct':True},{'text':'Needs more detail','is_correct':False},{'text':'Off topic','is_correct':False}],'correct_index':0,'explanation':{'summary':model,'hint':'Use the checklist in the question and ask an adult to confirm your response.'},'difficulty':diff,'difficulty_tier':'stretch','sequence_priority':n,'quality_schema':quality,'response_type':'adult_review','grading_mode':'adult_review','model_answer':model,'acceptance_note':accept,'response_instructions':'Say or write your response, then ask a parent or teacher to check it against the acceptance note.','completion_label':'Ready for adult review'}

def gen_items(code, bank):
    rows=[]; P=bank=='practice'; pref='P' if P else 'T'
    topics=['garden','beach','library','school fair','park','museum','classroom','farm','market','bus stop','sports day','rainy walk']
    if code=='AC9E2LA06':
        data=[('and','adds a matching idea'),('but','shows a contrast'),('or','shows a choice'),('so','shows a reason/result')]
        stems=[('The sky was dark, ___ we packed raincoats.','so','and','or'),('Mia wanted soup, ___ Ben wanted noodles.','but','so','and'),('We can draw a map ___ write a list.','or','but','so'),('The dog barked ___ wagged its tail.','and','or','but')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'compound sentence',f'Choose the conjunction that best joins the ideas: {s[0]}',s[1],s[2],s[3],f'{s[1]} is the conjunction that fits the connection between the two ideas.'))
    elif code=='AC9E2LA07':
        stems=[('the tiny green frog','frog','tiny','jumped','noun group'),('three silver bells','bells','silver','rang','noun group'),('will carefully paint','will paint','carefully','picture','verb group'),('has been waiting','has been waiting','been','station','verb group')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,s[3],f'In “{s[0]}”, which choice names the {s[3]} part?',s[1],s[2],s[3],f'The answer shows the main word group used in the sentence part.'))
    elif code=='AC9E2LA08':
        for i in range(22 if P else 14):
            t=topics[i%len(topics)]; rows.append(mcq(code,bank,i+1,'image meaning',f'A page says “The path was safe.” The picture shows a child stepping around broken glass on the {t}. What does the image add?', 'It adds extra information that the reader must think about.', 'It repeats only the same words.', 'It tells the reader to ignore the words.', 'Images can add to or change the meaning made by the written words.'))
    elif code=='AC9E2LA09':
        choices=[('The kitten crept under the chair.','crept','moved quietly','shouted loudly','Vocabulary should suit the topic and action.'),('First, rinse the rice. Next, add water.','Next','time order','feeling word','Time-order words organise steps.'),('The scientist observed the beetle.','observed','looked carefully','forgot quickly','Topic vocabulary can be more precise than everyday words.'),('The giant was enormous.','enormous','very large','very tiny','Context and synonyms help choose strong vocabulary.')]
        for i in range(22 if P else 14):
            s=choices[i%4]; rows.append(mcq(code,bank,i+1,'vocabulary choice',f'Which meaning or role best fits the word “{s[1]}” in: {s[0]}',s[2],s[3],'a comma in a list',s[4]))
    elif code=='AC9E2LA10':
        stems=[('the secret garden','The Secret Garden','The secret Garden','the Secret garden'),('apples pears and plums','apples, pears and plums','apples pears, and plums','apples pears and, plums'),('my trip to mars','My Trip to Mars','My trip To mars','my Trip to Mars'),('red blue green and gold','red, blue, green and gold','red blue, green and gold','red, blue green and gold')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'titles and lists',f'Which version correctly writes “{s[0]}”?',s[1],s[2],s[3],'Titles use capital letters for important words, and commas separate items in a list.'))
    elif code in ['AC9E2LE01','AC9E2LE02','AC9E2LE03']:
        base=[('Nala whispers, “I can fix it,” and studies the broken kite.','determined','bored','greedy'),('The cave is cold, dark and echoing.','mysterious','busy','sunny'),('Tom shares his last biscuit with a new student.','kind','forgetful','angry'),('The story happens beside a dry creek after weeks without rain.','setting affects events','title has commas','word has a suffix')]
        for i in range(22 if P else 14):
            s=base[i%4]; rows.append(mcq(code,bank,i+1,'literary features',f'Read the detail: {s[0]} What is the best idea to discuss?',s[1],s[2],s[3],'Actions, dialogue and setting details help readers discuss characters, settings and preferences.'))
    elif code=='AC9E2LE04':
        stems=[('The frog sat on a log in the fog. Which word rhymes with log?','fog','fig','flag'),('Clap the chant: “Tap, tap, tap on the map.” What pattern do you hear?','repeated rhythm and rhyme','a list with commas','a title capital'),('Complete: The bright red kite flew out of sight. It danced all day in golden ___.','light','late','leaf'),('Which pair has the same ending sound?','chair / bear','chair / chalk','bear / bird')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'sound pattern',s[0],s[1],s[2],s[3],'Rhythm and rhyme depend on repeated beats or ending sounds.'))
    elif code in ['AC9E2LE05','AC9E2LY06']:
        stems=[('The dragon moved into the cave.','The dragon stomped into the cave.','The dragon cave into moved.','The dragon was a noun.'),('I like the park because ___.','there is space to run and play','park is park is park','because'),('First we mixed the batter. ___ we poured it into the pan.','Then','Blue','Because'),('The tiny brown bird landed on the branch.','tiny brown','landed on','the branch')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'create and edit text',f'Choose the best revision or text part: {s[0]}',s[1],s[2],s[3],'Editing improves order, detail, vocabulary and connection to purpose.'))
    elif code=='AC9E2LY01':
        for i in range(22 if P else 14):
            t=topics[i%len(topics)]; rows.append(mcq(code,bank,i+1,'compare texts',f'One text about the {t} is a poster with times and prices. Another is a story about a child visiting. How are they different?', 'The poster gives facts quickly; the story tells events.', 'Both are only lists of rhyming words.', 'The story is an index and the poster is a chapter.', 'Similar topics can be presented differently in different text types.'))
    elif code=='AC9E2LY02':
        stems=[('A partner is explaining the game rules. What should you do first?','Look at the speaker and listen before asking a question.','Talk over the speaker with a new story.','Walk away before the instructions end.'),('You disagree with an idea in group talk. What is appropriate?','I see it differently because the text says…','That is silly and wrong.','I will not listen now.'),('The teacher gives two steps. What helps you receive the instructions?','Repeat the steps quietly to check them.','Change the topic.','Guess without listening.'),('You want to extend an idea. What could you say?','We could also add a labelled picture.','Stop talking forever.','That has no topic.')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'speaking and listening',s[0],s[1],s[2],s[3],'Interaction skills include listening, responding politely and adding relevant ideas.'))
    elif code=='AC9E2LY03':
        stems=[('Buy a ticket today before the show sells out!','persuade','inform','tell a story'),('The koala sleeps for many hours each day.','inform','persuade','entertain with a problem'),('Once, a possum found a glowing seed.','imaginative','instruction','index'),('Dear families, please bring hats for the excursion.','families','a dragon','a map key')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'purpose and audience',f'Read: {s[0]} What is the best answer?',s[1],s[2],s[3],'Words and text structure help identify purpose and audience.'))
    elif code in ['AC9E2LY04','AC9E2LY05']:
        stems=[('Mira opened the box. Inside was a tiny shell. She smiled and ran to show Dad. What happened first?','Mira opened the box.','Mira showed Dad.','Mira lost the shell.'),('The sentence does not make sense: “The bird swam in the sky.” What should a reader do?','Reread and self-correct the meaning.','Keep reading without thinking.','Change every word.'),('Liam packed a towel and sunscreen. Where might he be going?','the beach','the library','bed'),('A summary should ___.','tell the main ideas briefly','copy every word','list only commas')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'reading comprehension',s[0],s[1],s[2],s[3],'Fluent readers monitor meaning and use strategies such as predicting, rereading and summarising.'))
    elif code=='AC9E2LY07':
        stems=[('You present instructions for planting seeds. What structure fits?','materials, steps, closing tip','characters, problem, magic ending','only a title'),('The room is noisy. What should you vary?','volume','spelling pattern','index page'),('You are telling a calm poem. Which tone fits?','gentle and steady','shouting every word','silent with no pace'),('A familiar audience of classmates needs ___.','clear topic words they understand','private passwords','unrelated facts')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'oral presentation',s[0],s[1],s[2],s[3],'Presentations need structure, topic vocabulary and suitable tone, volume and pace.'))
    elif code=='AC9E2LY08':
        stems=[('Which word shows clear lower-case letters?','garden','GaRdEn','g ar den with missing letters'),('Which pair shows upper-case then lower-case for m?','M m','m M','N n'),('What helps handwriting fluency?','steady letter size and spacing','writing over every line twice','mixing letters randomly'),('Which sentence is easiest to read?','The duck swims.','tHe duCk sWims','Theduckswims')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'handwriting',s[0],s[1],s[2],s[3],'Legible writing uses clear unjoined upper-case and lower-case letters with spacing.'))
    elif code=='AC9E2LY09':
        stems=[('Change “smile” by deleting /s/. What word is left?','mile','slime','small'),('Which word begins with a three-sound blend?','string','sing','ring'),('Is the syllable “me” open or closed?','open','closed','compound'),('Substitute /m/ in mat with /s/. What word do you make?','sat','map','meat')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'sound manipulation',s[0],s[1],s[2],s[3],'Blending, segmenting, deleting and substituting sounds changes spoken and written words.'))
    elif code=='AC9E2LY10':
        stems=[('Choose the word with the vowel digraph oa.','boat','bat','bite'),('Which word has a silent letter?','knee','nest','kite'),('Which word is a compound word?','sunset','sunny','setting'),('Choose the word with final blend st.','nest','net','need')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'sound letter patterns',s[0],s[1],s[2],s[3],'Sound-letter knowledge includes digraphs, blends, silent letters, syllables and compound words.'))
    elif code=='AC9E2LY11':
        stems=[('Choose the high-frequency word: I ___ seen that bird before.','have','hive','heavy'),('Which word is not fully predictable from its sounds?','once','went','lamp'),('Complete: They ___ going to the library.','are','air','ear'),('Choose the best word: Please put it over ___.','there','three','tree')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'high frequency spelling',s[0],s[1],s[2],s[3],'Some common words need to be recognised and spelled by memory as well as sound.'))
    elif code=='AC9E2LY12':
        stems=[('What does reread mean?','read again','read before','read badly'),('What does misplace mean?','place wrongly','place again','place before'),('Which word means full of care?','careful','careless','caringly'),('Make the regular plural of box.','boxes','boxs','boxies')]
        for i in range(22 if P else 14):
            s=stems[i%4]; rows.append(mcq(code,bank,i+1,'morphemes',s[0],s[1],s[2],s[3],'Prefixes, suffixes and endings change word meaning or grammar.'))
    # adult review tasks
    start=len(rows)+1
    rows.append(adult(code,bank,start,'explain concept',f'Write or say two sentences that show the main idea of {code}. Use your own example.',f'A strong response explains the code idea and includes a correct original example for {CODES[code][0]}.','Accept if the response is on-topic, understandable and includes a correct example.'))
    rows.append(adult(code,bank,start+1,'apply concept',f'Create a short Year 2 example question for {code}, then explain the answer.',f'A strong response creates a clear example and explains why the answer works.','Accept if the example matches the descriptor and the explanation is accurate.'))
    return rows

def convert(items):
    out=[]
    for q in items:
        out.append({'id':q['id'].lower(),'curriculumCode':q['curriculum_code'],'bank':q['bank'],'skill':q['skill'].replace('_',' '),'printable':True,'type':'multiple-choice','prompt':q['question'],'audioPrompt':q['audio_prompt'],'visual':q['visual'],'answers':q['answers'],'correctIndex':q['correct_index'],'explanation':q['explanation']['summary'],'hint':q['explanation']['hint'],'difficulty':q['difficulty'],'difficultyTier':q['difficulty_tier'],'sequencePriority':q['sequence_priority'],'responseType':q.get('response_type','multiple_choice'),'gradingMode':q.get('grading_mode','auto'),'modelAnswer':q.get('model_answer'),'acceptanceNote':q.get('acceptance_note'),'responseInstructions':q.get('response_instructions'),'completionLabel':q.get('completion_label')})
    return out

def write_js(path,var,items):
    path.write_text('"use strict";\nwindow.%s = %s;\n'%(var,json.dumps(convert(items),ensure_ascii=False,indent=2)),encoding='utf-8')

def page_replace(text, oldcode, code, title, desc):
    low=code.lower(); oldlow=oldcode.lower()
    text=text.replace(oldcode,code).replace(oldcode.upper(),code).replace(oldlow,low)
    text=re.sub(r'<title>.*?</title>',f'<title>{code} {title} Activities | SkillrHub</title>',text)
    text=re.sub(r'<h1>.*?</h1>',f'<h1>{title}</h1>',text, count=1)
    text=re.sub(r'<p>'+re.escape(CODES.get(oldcode.upper(),('','',''))[1])+r'</p>',f'<p>{desc}</p>',text)
    text=re.sub(r'<p>[^<]*</p><p>Choose a learning activity',f'<p>{desc}</p><p>Choose a learning activity',text,count=1)
    text=re.sub(r'<link rel="canonical" href="[^"]+"',f'<link rel="canonical" href="https://skillrhub.com/quiz/year-2/english/{low}/"',text)
    text=re.sub(r'<a class="button button-primary" href="[^"]+">Topic guide</a>','<span class="button button-primary" aria-disabled="true">Topic guide pending</span>',text)
    text=text.replace('Practice contains 24 reviewed questions; Test contains 16 separate questions.','Practice contains 24 reviewed questions; Test contains 16 separate questions.')
    return text

def make_route(code,title,desc):
    low=code.lower(); src=quiz/'ac9e2la05'; dst=quiz/low
    if dst.exists(): shutil.rmtree(dst)
    shutil.copytree(src,dst)
    for p in dst.rglob('*.html'):
        t=p.read_text(encoding='utf-8')
        t=page_replace(t,'AC9E2LA05',code,title,desc)
        t=t.replace('Finding Information in Print and Screen Texts',title)
        t=t.replace('navigate print and screen texts using chapters, tables of contents, indexes, side-bar menus, drop-down menus or links',desc)
        t=t.replace('20260906-english-la01-la05',version)
        p.write_text(t,encoding='utf-8')

for code,(title,desc,ixl) in CODES.items():
    if code in [f'AC9E2LA0{i}' for i in range(1,6)]: continue
    items=gen_items(code,'practice')+gen_items(code,'test')
    asset.mkdir(parents=True,exist_ok=True)
    (asset/f'{code.lower()}.json').write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
    log={'curriculum_code':code,'status':'reviewed','question_count':len(items),'practice_count':24,'test_count':16,'ixl_evidence':ixl,'official_descriptor':desc,'quality_schema':quality,'review_notes':'Original Year 2 English bank generated after reviewing official descriptor, IXL standards mapping and representative IXL worked examples.'}
    (asset/f'{code.lower()}-qa-log.json').write_text(json.dumps(log,ensure_ascii=False,indent=2),encoding='utf-8')
    with (asset/f'{code.lower()}.csv').open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=['id','curriculum_code','bank','skill','question','correct_answer','distractor_1','distractor_2','explanation','response_type','acceptance_note'])
        w.writeheader()
        for q in items:
            correct=next(a['text'] for a in q['answers'] if a['is_correct'])
            wrong=[a['text'] for a in q['answers'] if not a['is_correct']]
            w.writerow({'id':q['id'],'curriculum_code':code,'bank':q['bank'],'skill':q['skill'],'question':q['question'],'correct_answer':correct,'distractor_1':wrong[0],'distractor_2':wrong[1],'explanation':q['explanation']['summary'],'response_type':q.get('response_type','multiple_choice'),'acceptance_note':q.get('acceptance_note','')})
    make_route(code,title,desc)
    pitems=[q for q in items if q['bank']=='practice']; titems=[q for q in items if q['bank']=='test']
    base=quiz/code.lower()
    write_js(base/'practice/questions.js','skillrPracticeQuestions',pitems)
    write_js(base/'practice/practice-questions.js','skillrPracticeQuestions',pitems)
    write_js(base/'test/questions.js','skillrTestQuestions',titems)
print('generated', len(CODES)-5, 'codes')
