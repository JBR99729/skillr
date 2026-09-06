#!/usr/bin/env python3
"""Upgrade canonical Foundation–Year 7 English topic pages while preserving URLs/resources.

Years 8–10 are rendered directly from the repo's rich authored English registries
by migrate_upper_english_static_final.mjs and are intentionally left untouched here.
"""
from __future__ import annotations
import html, re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
ROOTS=[ROOT/'foundation',*[ROOT/f'year{n}' for n in range(1,8)]]

def clean(s): return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',str(s or '')))).strip()
def esc(s): return html.escape(str(s),quote=True)
def year_of(p):
    x=next(x for x in p.parts if x=='foundation' or re.fullmatch(r'year\d+',x)); return 0 if x=='foundation' else int(x[4:])
def code_of(s): return re.search(r'AC9E[A-Z0-9]+',s).group(0)
def description_of(s):
    m=re.search(r'<strong>Content description:</strong>\s*(.*?)</li>',s,re.I|re.S) or re.search(r'<p class="curriculum-hero__lead">(.*?)</p>',s,re.I|re.S)
    if not m: raise ValueError('content description not found')
    return clean(m.group(1))
def elaborations_of(s): return [clean(x) for x in re.findall(r'<strong>E\d+:</strong>\s*(.*?)</li>',s,re.I|re.S)]
def terms(d,e):
    t=' '.join([d,*e]).lower(); vocab=['audience','purpose','context','language','vocabulary','pronouns','values','text structure','paragraph','sentence','clause','syntax','punctuation','image','visual','multimodal','representation','voice','character','setting','plot','theme','literary','rhetorical','evidence','argument','perspective','cohesion','modality','tone','spelling','phoneme','grapheme','morpheme','reading','writing','speaking','listening']
    return list(dict.fromkeys(x for x in vocab if x in t))[:6] or ['meaning','language choices','audience']
def overview(d,e,y):
    k=', '.join(terms(d,e))
    if y<=2:return f"Students learn to {d.rstrip('.')}. Teach the idea through short spoken, visual and written examples, then change the example to check genuine transfer. Useful lesson language includes {k}."
    if y<=5:return f"Students learn to {d.rstrip('.')}. They identify the relevant language or text feature, point to evidence and explain how it contributes to meaning or purpose. Key concepts include {k}."
    return f"Students learn to {d.rstrip('.')}. They identify precise evidence and explain or evaluate how a language, structural, literary or multimodal choice shapes meaning, representation, audience response or purpose. Key concepts include {k}."

def first_nations_card(t):
    if 'welcome to country' in t or 'acknowledgement of country' in t:
        return ('Country/Place protocols','A Welcome to Country is delivered by Traditional Owners or authorised custodians. An Acknowledgement of Country can be given by others. Teach the distinction respectfully and use local, authoritative guidance rather than inventing language or protocol.')
    if 'first nations' in t or 'aboriginal' in t or 'torres strait' in t:
        return ('Use source-based cultural evidence','When a text, language name or cultural protocol is discussed, identify the source and describe what it supports without treating one example as representing all First Nations Peoples or Countries/Places.')
    return None

def examples(d,e,y):
    t=' '.join([d,*e]).lower(); cards=[]
    fn=first_nations_card(t)
    if any(k in t for k in ['interpersonal','relationship between people','relationships in formal','relationships and roles','social distance','social contexts','politeness','greetings','terms of address','interaction skills']):
        cards=[('Same request, different relationship','Compare “Pass me the pencil, please” to a classmate with “Could I please borrow a pencil?” to a less familiar adult. Identify the words and tone that change with the relationship.'),('Role changes language','A student speaking as a game captain may give clear directions to teammates, but the same student asking a teacher for help uses a different level of directness and formality.'),('Evidence before judgement','Instead of saying one version is “better”, name the audience and context, quote the language choice and explain why it fits that relationship.'),('Transfer','Give students a simple message and a new audience. They rewrite only the language that must change, then explain one choice.')]
    elif any(k in t for k in ['evaluation','evaluating','opinion','feeling','emotion','modality','appreciating texts','preferences','persuasive']):
        cards=[('Opinion plus reason','Move from “I liked the story” to “I found the ending effective because the repeated warning built suspense.” The second response gives a judgement and evidence.'),('Strength of judgement','Compare “might help”, “should help” and “will help”. The modal choice changes how certain or forceful the claim sounds.'),('Subjective and objective wording','“The brilliant new playground is exciting” evaluates; “the playground opened on Monday” reports a checkable fact. Discuss why a writer may choose either.'),('Transfer','Students underline one evaluative word in a fresh sentence, replace it with a weaker or stronger choice and explain the changed effect.')]
    elif any(k in t for k in ['text structure','texts are organised','paragraph','cohesion','cohesive','connective','navigation','table of contents','chapters','pronouns','omitting words','theme position']):
        cards=[('Structure follows purpose','A procedure uses ordered steps because sequence matters; a story may organise events to build tension; an information report groups related facts under headings.'),('Cohesion across sentences','Compare “Mia found a shell. Mia washed the shell.” with “Mia found a shell. She washed it.” The pronoun connects ideas without unnecessary repetition.'),('Paragraph focus','A paragraph is easier to follow when its sentences develop one main idea rather than jumping between unrelated points.'),('Transfer','Give a short mixed-up text. Students choose one structural or cohesive change, make it, and explain how it helps the reader.')]
    elif any(k in t for k in ['sentence','clause','noun group','verb group','verbs represent','tense','adverb','prepositional','nominalisation','abstract nouns','grammar']):
        cards=[('Build the sentence','Start with “Birds fly.” Add precise information: “Small shorebirds fly quickly across the inlet.” Identify what each added word or group contributes.'),('Clause relationship','Compare “We stayed inside because it rained” with “It rained, so we stayed inside.” Both connect ideas, but the clause structure foregrounds the relationship differently.'),('Grammar changes meaning','Compare “The dog chased the ball” with “The ball was chased by the dog.” The event is similar, but the sentence foregrounds different information.'),('Transfer','Students change one grammatical feature in a new sentence, then explain what changed in meaning, emphasis, time or detail.')]
    elif 'punctuation' in t or any(k in t for k in ['apostrophe','quotation marks','semicolon','colon','comma','full stops','capital letters']):
        cards=[('Punctuation marks meaning','Compare “Let’s eat, Grandma!” with “Let’s eat Grandma!” The comma separates the person being addressed and prevents a very different meaning.'),('Dialogue signal','In “Mina said, ‘I found it.’” quotation marks show the exact spoken words and the comma helps introduce them.'),('Apostrophe purpose','Compare “can’t” (missing letters) with “the dog’s lead” (possession). The apostrophe has different jobs that must be identified from context.'),('Transfer','Remove the punctuation from a short sentence. Students restore it, read both versions aloud and justify each mark by its function.')]
    elif any(k in t for k in ['image','visual','multimodal','framing','angle','salience','layout features','figures','tables','diagrams','maps and graphs']):
        cards=[('Words and image together','A caption may name what a photograph shows while the image supplies colour, scale or expression that the words do not. Explain the contribution of each mode.'),('Framing directs attention','A close-up makes a face or object prominent; a wide view can emphasise setting and distance. Ask what the viewer is guided to notice.'),('Layout supports navigation','Headings, labels, diagrams and white space can help readers locate and connect information rather than merely decorate the page.'),('Transfer','Show a new still or multimodal text. Students identify one visual choice and explain how it adds, extends or changes the written meaning.')]
    elif any(k in t for k in ['phoneme','grapheme','phonic','letter-sound','sound-letter','syllable','rhyme','alliteration','blend and segment','consonant','vowel','spelling','morphem','prefix','suffix','word origins','high-frequency','handwriting','letter formation']):
        if any(k in t for k in ['phoneme','grapheme','phonic','letter-sound','sound-letter','blend and segment','consonant','vowel','syllable','rhyme','alliteration']):
            cards=[('Hear the sound first','Say “ship” slowly and identify the three phonemes /sh/ /i/ /p/. Then connect each sound to the grapheme or grapheme group that represents it.'),('Blend for reading','Point to the graphemes in a decodable word, say the sounds without inserting extra sounds, then blend them smoothly into the whole word.'),('Segment for spelling','Say a word, stretch it orally, count the phonemes and choose graphemes that represent each sound. Read the completed word back to check it.'),('Transfer','Change one phoneme or grapheme in a known word and read or spell the new word, explaining what changed.')]
        elif 'handwriting' in t or 'letter formation' in t:
            cards=[('Start point and direction','Model the correct starting point and stroke direction for one letter before students copy it.'),('Size and placement','Compare a correctly sized lower-case letter with one that floats above or drops below the writing line incorrectly.'),('Fluency without rushing','Practise a short repeated letter pattern, keeping formation clear and spacing even before increasing speed.'),('Transfer','Write a short familiar word using the same letter formation and spacing rules, then self-check against the model.')]
        else:
            cards=[('Meaning from word parts','In “unhelpful”, identify un- + help + -ful. Use the base and affixes to predict meaning, then check it in the sentence.'),('Spelling family','Connect related words such as help, helpful and helpless. The stable base helps students read, spell and understand the family.'),('Choose by meaning and pattern','When two spellings sound possible, use known grapheme patterns, morphemes and word origin where appropriate rather than guessing from sound alone.'),('Transfer','Give an unfamiliar related word. Students break it into meaningful or sound-based parts, propose a spelling or meaning and verify it in context.')]
    elif any(k in t for k in ['literary','story','stories','character','setting','plot','point of view','imagery','simile','metaphor','poem','poetry','rhythm','sound patterns','aesthetic','voice as a literary']):
        cards=[('Evidence about character','Instead of “the character is brave”, point to an action, line of dialogue or narrator description and explain how it supports the inference.'),('Setting shapes events','Compare the same event in a crowded city and an isolated forest. Discuss how setting changes what can happen and the mood a reader may experience.'),('Author choice creates effect','A repeated sound, image, metaphor or sentence pattern matters because of what it makes the reader notice, imagine or feel in that moment.'),('Transfer','Use a fresh short extract. Students identify one literary choice, quote or describe the evidence and explain its effect on meaning or response.')]
    elif any(k in t for k in ['comprehension','read texts','decodable','reading','fluency','visualising','predicting','summarising','inferring','monitoring']):
        cards=[('Predict with evidence','Before reading on, make a prediction from the title, picture or previous sentence and name the clue that supports it.'),('Infer, do not guess','If a character shuts the door quietly and whispers, infer a possible reason using those details; distinguish the inference from a fact stated directly.'),('Monitor meaning','When a sentence stops making sense, reread, check a key word, look at surrounding sentences and revise the interpretation.'),('Summarise the important idea','After a short section, state the central idea and the most relevant supporting detail without retelling every event.')]
    elif any(k in t for k in ['plan create','create edit','edit and publish','written and multimodal','write','writing','retell','adapt a familiar','create literary']):
        cards=[('Plan for purpose and audience','Before drafting, state who the text is for and what it should achieve. Choose a structure and language that support that purpose.'),('Draft one clear section','Model a short paragraph or scene, thinking aloud about one deliberate vocabulary, sentence or structural choice.'),('Edit for meaning first','Reread for missing ideas, unclear links and unsuitable language before checking spelling and punctuation.'),('Transfer','Students create a short new section for a changed audience or purpose and annotate one deliberate choice they made.')]
    elif any(k in t for k in ['listen','spoken','oral','presentation','speaking','deliver','conversation','turn-taking']):
        cards=[('Listen for the idea','After a short spoken message, restate the key point before adding a response.'),('Build on another speaker','Use a response such as “I agree with ___ because…” or “I see it differently because…” and connect directly to what was said.'),('Voice supports purpose','Practise pace, volume and emphasis on the same sentence, then discuss which delivery best suits the audience and purpose.'),('Transfer','Give a short speaking task with a new audience. Students plan one key point, deliver it clearly and respond to one follow-up question.')]
    else:
        cards=[]
        for i,x in enumerate(e[:3],1): cards.append((f'Curriculum example {i}',f'Use this context directly: {x}. Ask students to identify the relevant English feature, point to evidence and explain what it contributes to meaning or communication.'))
        while len(cards)<3: cards.append(('Make the concept visible',f'Use a short example of {d.rstrip(".").lower()} and require students to identify the exact evidence before explaining it.'))
        cards.append(('Transfer',f'Change the text, audience or context and ask students to apply {d.rstrip(".").lower()} independently.'))
    if fn and all(fn[0]!=x[0] for x in cards): cards[-1]=fn
    return cards[:4]

def misconceptions(d,e,y):
    t=' '.join([d,*e]).lower()
    if y<=2:return [('Naming without showing','Ask students to point to, say or demonstrate the exact sound, word, sentence, image or text clue.'),('One memorised example','Change the word, picture, sentence or audience and check the same skill again.'),('Guessing','Ask: What did you hear, see or read that proves it?')]
    if any(k in t for k in ['phoneme','grapheme','spelling','morphem','phonic']):return [('Sound-only guessing','Use both the spoken sound structure and the relevant grapheme/morpheme knowledge.'),('Counting letters as sounds','Segment phonemes orally before mapping them to one or more letters.'),('One rule fits every word','Use the taught pattern, morpheme or word origin and check exceptions in context.'),('No verification','Read the word back in the sentence and check that spelling and meaning both fit.')]
    if any(k in t for k in ['image','visual','multimodal']):return [('Feature spotting','Naming a camera angle, colour or sound is not analysis; explain its effect.'),('One fixed effect','Interpret the feature in context and alongside other modes.'),('Separate-mode lists','Explain how image, words and sound reinforce, contradict or qualify one another.'),('Retelling','Analyse how the representation was constructed, not only what it shows.')]
    return [('Feature spotting','Explain how the exact feature shapes meaning, communication or response.'),('Retelling','Select precise evidence and analyse it rather than repeating content.'),('Automatic effect','Interpret choices through audience, purpose, context and surrounding text.'),('Vague explanation','Replace “this makes it better” with the exact feature, evidence and likely effect.')]
def steps(d,e,y):
    f=', '.join(terms(d,e)[:3])
    if y<=2:return [('Step 1: Explicit Teaching & Modelling',f'Name the target in child-friendly language and demonstrate one concrete example connected to {f}.'),('Step 2: Guided Analysis','Compare or practise a second example together. Students point to, say or show the clue.'),('Step 3: Collaborative / Independent Practice','Create or analyse one example together, then use a fresh familiar example independently.'),('Step 4: Formative Assessment','Use a one-minute check with a new example; require observable evidence rather than a guess.')]
    return [('Step 1: Explicit Teaching & Modelling',f'Define the outcome-specific metalanguage ({f}) and model how to identify the feature, select evidence and explain or use it.'),('Step 2: Guided Analysis','Work through a second example together: What is the choice or feature? Where is the evidence? What does it do here?'),('Step 3: Collaborative / Independent Practice','Students annotate, compare, read, edit, speak or compose with a fresh example, then apply the concept independently.'),('Step 4: Formative Assessment','Use an unseen micro-text, oral task or creation task. Require precise evidence plus a justified explanation or deliberate crafting choice.')]
def mappings(y,code,d):
    stage='Early Stage 1' if y==0 else 'Stage 1' if y<=2 else 'Stage 2' if y<=4 else 'Stage 3' if y<=6 else 'Stage 4'
    vic='Foundation' if y==0 else f'Level {y}'; us='Kindergarten' if y==0 else f'Grade {y}'
    ks='Early Years / Key Stage 1' if y==0 else 'Key Stage 1' if y<=2 else 'Key Stage 2' if y<=6 else 'Key Stage 3'
    nz='Phase 1 (Years 0–3)' if y<=3 else 'Phase 2 (Years 4–6)' if y<=6 else 'Phase 3 (Years 7–8)'
    india='Foundational / early primary' if y==0 else f'Class {y}'
    return [('Australia','Australian Curriculum v9.0',f'{code} — {d}'),('Victoria','Victorian Curriculum F-10 Version 2.0 English',f'{vic} English — closest Language, Literature or Literacy alignment; use the Victorian outcome wording for local assessment.'),('NSW','English K–10 Syllabus (2022)',f'{stage} — closest NSW English outcome alignment; use as a planning comparison, not a one-to-one code conversion.'),('United States','Common Core State Standards for ELA/Literacy',f'{us} — closest Reading, Writing, Speaking and Listening, or Language alignment according to the outcome focus.'),('England','National curriculum in England: English',f'{ks} — closest reading, writing, spoken-language, grammar or literary programme-of-study alignment.'),('Canada','Provincial English Language Arts curricula',f'{"Kindergarten" if y==0 else "Grade "+str(y)} broad ELA alignment; exact outcomes vary by province or territory.'),('New Zealand','The New Zealand Curriculum – English Years 0–10 (2025 statement)',f'{nz} — closest oral language, reading/writing or language-and-text alignment; in effect from 1 January 2026.'),('India','NCERT / CBSE English Language and Literature',f'{india} — broad language, reading, writing or literature alignment; verify the current local course specification.')]
def cards(items):return ''.join(f'<article class="curriculum-worked-example"><h3>{esc(a)}</h3><p>{esc(b)}</p></article>' for a,b in items)
def bullets(items):return ''.join(f'<li><strong>{esc(a)}:</strong> {esc(b)}</li>' for a,b in items)
def mapping_table(rows):return ''.join(f'<tr><td>{esc(a)}</td><td>{esc(b)}</td><td>{esc(c)}</td></tr>' for a,b,c in rows)
def replacement(code,d,e,y):
    cov=''.join(f'<li><strong>E{i+1}:</strong> {esc(x)}</li>' for i,x in enumerate(e)) or '<li>Use the exact content description above as the required learning target.</li>'
    return f'''<section class="curriculum-topic-section" id="topic-guide"><h2>1. Outcome Overview &amp; Core Concepts</h2><p>{esc(overview(d,e,y))}</p><p><strong>Learning target:</strong> {esc(d)}</p></section>
<section class="curriculum-topic-section"><h2>2. Subject-Specific Content &amp; Key Examples</h2><div class="unit-activity-grid">{cards(examples(d,e,y))}</div></section>
<section class="curriculum-topic-section"><h2>3. Common Student Misconceptions</h2><ul>{bullets(misconceptions(d,e,y))}</ul></section>
<section class="curriculum-topic-section"><h2>4. 4-Step Instructional Sequence</h2><div class="unit-activity-grid">{cards(steps(d,e,y))}</div></section>
<section class="curriculum-topic-section"><h2>Curriculum Coverage &amp; Elaborations</h2><p>The content description is the required target. The elaborations below are taught as examples and contexts, not as disconnected checklist wording.</p><ul>{cov}</ul></section>
<section class="curriculum-topic-section"><h2>Practice Thought &amp; Formative Assessment</h2><p>Use a fresh example that has not been modelled. Ask the student to show the exact clue, feature or language choice and explain or use it independently.</p></section>
<section class="curriculum-topic-section"><h2>5. Accurate International Curriculum Mapping</h2><p>The Australian Curriculum code is exact. International entries are current closest alignments for planning and discovery, not one-to-one code equivalents.</p><div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Region</th><th>English / ELA curriculum</th><th>Closest alignment</th></tr></thead><tbody>{mapping_table(mappings(y,code,d))}</tbody></table></div></section>'''
def update_meta(s,code,d,y):
    label='Foundation' if y==0 else f'Year {y}'; desc=f'{code} {label} English lesson: {d.rstrip(".")}. Includes worked examples, misconceptions, explicit teaching and current English/ELA curriculum mapping.'
    s=re.sub(r'<meta name="description" content="[^"]*">',f'<meta name="description" content="{esc(desc)}">',s,count=1,flags=re.I)
    s=re.sub(r'<meta property="og:description" content="[^"]*">',f'<meta property="og:description" content="{esc(desc)}">',s,count=1,flags=re.I)
    return s
def content_bounds(s):
    start_match=re.search(r'<(?:section|details)\b[^>]*\bid=["\']topic-guide["\'][^>]*>',s,re.I)
    if not start_match:return -1,-1
    start=start_match.start(); related_positions=[]
    for pattern in (r'<summary[^>]*>\s*<strong>\s*Related\b',r'<h2[^>]*>\s*Related\b'):
        m=re.search(pattern,s[start:],re.I|re.S)
        if m:related_positions.append(start+m.start())
    if related_positions:
        rp=min(related_positions); end=max(s.rfind('<details',start,rp),s.rfind('<section',start,rp))
    else:
        aside=s.find('<aside class="curriculum-sidebar">',start); end=aside if aside>=0 else -1
    return start,end
def upgrade(p):
    s=p.read_text(encoding='utf-8'); code=code_of(s); d=description_of(s); e=elaborations_of(s); y=year_of(p)
    start,end=content_bounds(s)
    if start<0 or end<0:raise ValueError(f'body anchors not found: {p}')
    out=update_meta(s[:start]+replacement(code,d,e,y)+'\n\n      '+s[end:],code,d,y)
    if out!=s:p.write_text(out,encoding='utf-8');return True
    return False
def main():
    pages=[]
    for r in ROOTS:
        d=r/'english'
        if d.is_dir():pages += [p for p in d.glob('*/index.html') if p.parent.name.lower().startswith('ac9e')]
    changed=0
    for p in sorted(pages):
        try:changed+=int(upgrade(p))
        except Exception as exc:raise RuntimeError(f'{p.relative_to(ROOT)}: {exc}') from exc
    print(f'Upgraded {changed} of {len(pages)} Foundation–Year 7 English topic pages.')
if __name__=='__main__':main()
