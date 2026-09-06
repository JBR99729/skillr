"""Scoped content maintenance for AC9MFN03, AC9EFLY12 and AC9SFU03.

Topic HTML is canonical. Classroom panels copy its reviewed blocks verbatim.
No Practice/Test banks or other curriculum codes are changed.
"""
from pathlib import Path
from html import escape
import re
import sys
import json
from lxml import html, etree

ROOT = Path(__file__).resolve().parents[1]
CODES = {'AC9MFN03': ('maths', 'math', 'Counting and comparing'),
         'AC9EFLY12': ('english', 'english', 'CVC words'),
         'AC9SFU03': ('science', 'science', 'Objects and materials')}

def svg(label, body, width=500, height=140):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-label="{escape(label)}">{body}</svg>'

def dots(n, x=30, y=40, gap=27):
    return ''.join(f'<circle cx="{x+(i%10)*gap}" cy="{y+(i//10)*32}" r="8" fill="#2457a0" stroke="#17243a"/>' for i in range(n))

COMPARE = svg('Row A has eight closely spaced counters. Row B has six widely spaced counters.', '<text x="8" y="38">A</text>'+dots(8,40,32,23)+'<text x="8" y="100">B</text>'+dots(6,40,94,65))
TWENTY = svg('Collection C contains twenty counters arranged in two rows of ten.', dots(20,45,35,35),500,90)
HEN = svg('A hen', '<path d="M160 80 Q125 25 110 58 L92 32 L92 85 Q106 122 175 119 Q230 115 227 72 L230 43 Q238 12 258 29 Q276 48 251 64 L251 90 Q240 134 183 131" fill="#fff" stroke="#17243a" stroke-width="4"/><path d="M246 28 Q235 6 245 9 Q255 1 258 23" fill="#a52a2a" stroke="#17243a"/><path d="M267 40 L286 49 L263 55" fill="#dda025" stroke="#17243a"/><circle cx="256" cy="38" r="3"/><path d="M147 76 Q166 117 211 82 M178 130 L175 148 L161 149 M207 128 L210 148 L225 149" fill="none" stroke="#17243a" stroke-width="3"/>',380,160)
SUN = svg('The sun', '<circle cx="185" cy="75" r="35" fill="#f4c95d" stroke="#17243a" stroke-width="3"/>'+''.join(f'<path d="M185 20 L185 5" transform="rotate({i*45} 185 75)" stroke="#17243a" stroke-width="3"/>' for i in range(8)),380,155)
PENCIL = svg('A pencil with a wooden body around a graphite core and a rubber eraser held by metal.', '<path d="M50 65 L330 65 L330 105 L50 105 L16 85 Z" fill="#e8c28e" stroke="#17243a" stroke-width="3"/><path d="M16 85 L31 76 L31 94 Z" fill="#333"/><path d="M65 78 L320 78 M65 92 L320 92" stroke="#8c6030"/><rect x="330" y="65" width="28" height="40" fill="#ccd4dc" stroke="#17243a"/><path d="M358 65 L384 65 Q403 85 384 105 L358 105 Z" fill="#d79696" stroke="#17243a"/>',430,145)
BOXES = '<div class="sound-boxes" aria-label="Three empty sound boxes"><span></span><span></span><span></span></div>'

def answer(text):
    return '<details class="foundation-answer"><summary>Show answer and teaching guidance</summary><p>'+text+'</p></details>'

def block(title, body):
    return f'<article class="content-block foundation-focus-block"><h3>{title}</h3>{body}</article>'

BLOCKS = {
 'AC9MFN03': [
  block('Count small groups, then build to 20', '<p>Start with 5 objects. Move each object once as you count. Say the total. Repeat with 12, then 20 objects; use a counted area to avoid counting an object twice.</p>'+TWENTY+'<p>Point to every counter. How many are in collection C?</p>'+answer('20. Two rows help us keep track, but children may count each counter once. If the total changes, move counted objects into a separate area and try again.')),
  block('Does a longer row always have more?', COMPARE+'<p>Which row has more counters? Show how you know.</p>'+answer('A has 8 and B has 6. A has more, even though B stretches farther. Match one counter from each row; two in A remain unmatched.')),
  block('Are there enough for everyone?', '<p>Put out 6 toy animals and 5 plates. Give each animal one plate. Does every animal have a plate? What should we change?</p>'+answer('One animal has no plate. Add one plate to make 6. Look for one-to-one matching, rather than guessing from the space the plates occupy.')),
  block('Important questions and answers', '<p>You counted 12 counters. I moved them farther apart without adding or removing any. How many are there now?</p>'+answer('12. Moving counters changes their arrangement, not their number. Recount or match to the original collection if the child is unsure.')+'<p>What does the last number you say when counting tell you?</p>'+answer('It tells how many objects are in the whole collection, provided each object was counted once.')),
  block('Assessment-style questions and review hints', '<p>Count a new collection of 17 objects. Make a second collection with the same number. Show that they match.</p><p>Review hint: move each object once, say the total, then pair the collections.</p>'+answer('Both collections contain 17. Accept accurate counting and/or one-to-one matching as evidence; do not require a written explanation.')),
  block('Exit ticket', '<p>Give the child 14 counters. Ask them to count the counters, rearrange them and tell you the total again.</p>'+answer('14 before and after. Continue when the child counts once per object and keeps the total after rearranging. If not, return to 5 counters and model moving each counter once.'))
 ],
 'AC9EFLY12': [
  block('Say it, map it, read it', '<p>Adult: say “hen”. Child: repeat it and move one counter for each sound. Use letters h, e and n to record the sounds, then blend them to read the word.</p>'+HEN+'<div class="sound-boxes" aria-label="Letters h, e, n in sound order"><span>h</span><span>e</span><span>n</span></div><p>Use letter sounds when blending. Use the picture to confirm meaning after reading.</p>'),
  block('Try a new word', SUN+'<p>Say it. Write the sounds. Read your word.</p>'+BOXES+answer('sun: s, u, n in order. Adult: name the picture if needed. If the vowel is missing, say the word again and focus on its middle sound.')),
  block('Important questions and answers', '<p>A child writes “hn” for hen. Which sound and letter are missing?</p>'+answer('The middle vowel sound, represented by e. Say hen, move three counters and put one letter under each counter.')+'<p>Read “can”. Change c to m. Read the new word. What stayed the same?</p>'+answer('man. The middle vowel a and final consonant n stay the same; only the first sound and letter change.')),
  block('Assessment-style questions and review hints', '<p>Adult: say “bed” without showing the spelling. Ask the child to write it. Then show “map” and ask the child to read it.</p><p>Review hint: say the sounds in order for spelling; point under the letters and blend for reading.</p>'+answer('bed; map. Check spelling and reading separately. Use familiar, previously taught letter-sound correspondences.')),
  block('Exit ticket', '<p>Adult: say “pen”. Child: write the word. Adult: show “sit”. Child: read the word.</p>'+answer('pen; sit. Look for all three sound positions in order and blending without guessing. If needed, use counters and reteach the uncertain letter-sound correspondence.'))
 ],
 'AC9SFU03': [
  block('One object, several materials', PENCIL+'<p>Look closely at a pencil with an eraser. Name two materials. Describe one property you can observe.</p>'+answer('Possible materials: wood, graphite, metal and rubber. Possible observations: the wooden body is stiff; the rubber eraser is softer than the metal holder. Use the actual pencil: some pencils have different parts.')),
  block('Sort by what you observe', '<p>Place a fabric scrap, wooden block and metal spoon on a tray. Look and gently feel. Sort them by one property, such as flexible or stiff. Explain your rule.</p>'+answer('For these samples, the fabric may bend easily while the block and spoon stay stiff. Accept a different grouping when supported by what the child observes. Colour alone does not identify a material.')),
  block('Look closer and record', '<p>Look at a fabric scrap with your eyes, then through a magnifying glass. Draw what you notice. Tell a partner what the magnifying glass helped you see.</p>'+answer('Accept observed detail such as threads, gaps or a woven pattern. Record what is visible in this sample; do not require every fabric to look the same.')),
  block('Important questions and answers', '<p>Is “spoon” a material? Can two spoons be made from different materials?</p>'+answer('Spoon names an object. Spoons can be made from materials such as metal, wood or plastic. Inspect examples rather than assuming every spoon is metal.')+'<p>Can two materials share a property?</p>'+answer('Yes. A wooden block and a metal spoon can both be hard. One property does not uniquely identify a material.')),
  block('Assessment-style questions and review hints', '<p>Choose two safe objects. Name a material in each. Say one property they share and one difference you observe.</p><p>Review hint: “This is a ____. It is made from ____. I notice ____.”</p>'+answer('Answers depend on the objects. Check that the child distinguishes object names, materials and observable properties. Accept pointing and spoken descriptions.')),
  block('Exit ticket', '<p>Look at the pencil. Name two materials and describe one property you can observe. Point to the part you mean.</p>'+answer('For this pictured pencil: wood and rubber; the wood is stiff, or the rubber eraser is soft. Accept other accurate observations and adapt to the actual pencil. Reteach with object → material → property if the child gives only object names.'))
 ]}

ELAB = {
 'AC9MFN03': [
  'Move 12 counters one at a time into a counted area. Say the total, spread them out and count again. Ask why the total stays 12.',
  'Compare 8 closely spaced counters with 6 widely spaced counters. Match one-to-one, then count. Ask which group has more and how the child knows.',
  'Set out 6 toy animals and 5 plates. Match one plate to each animal. Ask how many more plates are needed; add one and check.',
  'With an accurately sourced example of a counting representation from a named culture, ask an adult to demonstrate how it records a small quantity. Compare that same quantity using classroom counters; do not assume one representation is used throughout Asia.',
  'Use a locally appropriate, community-approved demonstration of a named body-tallying system. Follow the authorised sequence and guidance; do not invent a generic First Nations counting system.'
 ],
 'AC9SFU03': [
  'Inspect a pencil with an eraser. Point to its wooden body, graphite core, metal holder and rubber eraser where present. Explain that one object can contain several materials.',
  'Observe a fabric scrap with the eyes and then with a magnifying glass. Draw a detail that becomes easier to see, such as threads or gaps.',
  'Sort a fabric scrap, wooden block and metal spoon by an observed property. State the sorting rule, then try a different rule.',
  'Make a small labelled display: object, material and an observed property. Invite a partner to check each label against the sample.',
  'Photograph three safe classroom objects. Add a material label and one observed property to each picture; avoid photographing people.',
  'Compare the wooden body and rubber eraser of a pencil. Discuss why a stiff body is useful for holding and why an eraser needs different properties.',
  'Use a locally appropriate, community-approved example of a utensil made by named First Nations Peoples. Follow the source when identifying its materials and purpose, and respect permissions.'
 ]}

STYLE = '''.foundation-focus-block{margin:14px 0;padding:18px;border:1px solid #cbd5e1;border-radius:10px;break-inside:avoid}.foundation-focus-block svg,.foundation-sheet svg{display:block;width:100%;max-width:500px;height:auto;max-height:155px;margin:8px 0}.foundation-answer{margin:12px 0;padding:10px;border:1px solid #ccd5e0}.foundation-answer summary{font-size:1rem;cursor:pointer}.sound-boxes{display:flex;gap:0;margin:12px 0}.sound-boxes span{display:inline-block;width:54px;height:54px;border:2px solid #17243a;text-align:center;font:32px/50px Arial}.foundation-sheet{background:white;color:#17243a;font-family:Arial,sans-serif;max-width:760px;margin:24px auto;padding:32px;border:1px solid #ccd5e0}.foundation-sheet h1{font-size:25px}.foundation-sheet h2{font-size:21px}.foundation-sheet .task{margin:15px 0;padding:10px 0;border-bottom:1px solid #d1d5db;break-inside:avoid}.foundation-sheet .task p{font-size:17px;line-height:1.4;margin:6px 0}.work-space{height:38px;border-bottom:1px solid #9aa8ba}.drawing-space{height:65px;border:1px solid #9aa8ba;margin-top:8px}.adult-note{font-size:13px!important;color:#475569}.sheet-links{display:flex;gap:15px;flex-wrap:wrap;margin:16px 0}.sheet-links a,.sheet-links button{padding:10px;font:inherit}.foundation-sheet footer{font-size:11px;border-top:1px solid #ccd5e0;padding-top:8px}.answer-sheet li{margin:10px 0;line-height:1.45}@page{size:Letter;margin:14mm}@media print{body{background:white!important;margin:0}.screen-only,body>aside{display:none!important}.foundation-sheet{width:auto;max-width:none;border:0;padding:0;margin:0;break-after:page}.foundation-sheet:last-child{break-after:auto}.foundation-sheet .task p{font-size:14px}.foundation-sheet svg{max-height:85px}.foundation-sheet .task{margin:9px 0;padding:5px 0}.foundation-sheet h1{font-size:22px}.foundation-sheet h2{font-size:18px}.work-space{height:25px}.drawing-space{height:45px}.sound-boxes span{width:40px;height:40px;font:24px/36px Arial}.answer-sheet{display:none!important}body.print-answers .answer-sheet{display:block!important}}'''

def inner(el):
    return (el.text or '')+''.join(etree.tostring(c,encoding='unicode',method='html') for c in el)

def set_inner(el, markup):
    for c in list(el): el.remove(c)
    el.text=None
    for c in html.fragments_fromstring(markup):
        if isinstance(c,str): el.text=(el.text or '')+c
        else: el.append(c)

def write(p,doc):
    p.write_text('<!doctype html>\n'+etree.tostring(doc,encoding='unicode',method='html'))

def section_doc(code):
    return html.fragment_fromstring('<details class="curriculum-topic-section foundation-focused-teaching" id="foundation-focused-teaching"><summary><strong>Worked teaching sequence and checks</strong></summary><div class="curriculum-detail-body">'+''.join(BLOCKS[code])+'</div></details>')

def topics():
 for code,(subject,_,_) in CODES.items():
    p=next((ROOT/'foundation'/subject).glob(code.lower()+'*/index.html'))
    doc=html.parse(str(p)).getroot()
    for old in doc.xpath('//*[@id="foundation-focused-teaching"]'): old.getparent().remove(old)
    if code=='AC9EFLY12':
        for old in doc.xpath('//article[contains(@class,"curriculum-worked-example")]'): old.getparent().remove(old)
        for d in doc.xpath('//details'):
            if 'Australian Curriculum elaborations' in ''.join(d.xpath('./summary//text()')):
                unit=next(u for u in json.loads((ROOT/'data/curriculum-units.json').read_text())['units'] if u['code']==code)
                set_inner(d.xpath('./div')[0], '<p><strong>Content description:</strong> '+escape(unit['description'])+'</p><p>Use the worked examples to connect each spoken sound with its taught letter, then blend the letters to read the word.</p><p><a href="https://www.qcaa.qld.edu.au/p-10/aciq/version-9/learning-areas/p-10-english" target="_blank" rel="nofollow noopener">Australian Curriculum v9.0 — English (QCAA)</a></p>')
    if code=='AC9SFU03':
        for d in doc.xpath('//*[@id="mastery"]/div'):
            set_inner(d,BLOCKS[code][-1])
    if code=='AC9MFN03':
        for d in doc.xpath('//details'):
            if 'Try it in different ways' in ''.join(d.xpath('./summary//text()')):
                set_inner(d.xpath('./div')[0], '<ol><li>Count 5 objects, then 12, then 20. Move each object once.</li><li>Compare two collections by matching one object from each.</li><li>Rearrange a counted collection. Explain why its total stays the same.</li></ol>')
    for i,para in enumerate(doc.xpath('//p[strong[contains(text(),"Learning connection:")]]')):
        if code in ELAB and i<len(ELAB[code]): set_inner(para,'<strong>Teaching example:</strong> '+ELAB[code][i])
    target=doc.xpath('//*[@id="topic-guide"]') or doc.xpath('//main')
    target[0].insert(1,section_doc(code))
    head=doc.find('head')
    if not head.xpath('./link[@href="/assets/foundation-three-packages.css?v=20260906"]'):
        head.append(html.fragment_fromstring('<link rel="stylesheet" href="/assets/foundation-three-packages.css?v=20260906">'))
    write(p,doc)

def classrooms():
 for code,(subject,_,_) in CODES.items():
    p=next((ROOT/'foundation'/subject).glob(code.lower()+'*/index.html'))
    topic=html.parse(str(p)).getroot()
    cp=p.parent/'teacher-slides/index.html'; doc=html.parse(str(cp)).getroot()
    stack=doc.xpath('//div[contains(concat(" ",normalize-space(@class)," ")," section-stack ")]')[0]
    stack.set('data-single-open','')
    # Keep navigation, curriculum mappings, related links and contact panels.
    # Replace only generic lesson panels with exact topic-source HTML.
    for d in list(stack):
        text=''.join(d.xpath('./summary//text()'))
        if not any(x in text for x in ['Related Classroom','Contact SkillrHub','Curriculum mapping']): stack.remove(d)
    source_blocks=topic.xpath('//*[@id="foundation-focused-teaching"]/div/article')
    for i,b in enumerate(source_blocks):
        title=''.join(b.xpath('./h3//text()'))
        panel=html.fragment_fromstring(f'<details><summary><span>{escape(title)}</span><span>{"Clean visual examples" if i==0 else "Teach and check"}</span></summary><div class="panel">'+etree.tostring(b,encoding='unicode',method='html')+'</div></details>')
        stack.insert(i,panel)
    # Preserve the original topic's elaborations, vocabulary and strong models.
    extra=[]
    for d in topic.xpath('//details[not(ancestor::details)]'):
        title=''.join(d.xpath('./summary//text()'))
        if any(t in title.lower() for t in ['curriculum coverage','curriculum alignment','curriculum elaborations','key vocabulary','key words','model and worked','see it, then try','worked and modelled']):
            body=''.join(etree.tostring(c,encoding='unicode',method='html') for c in d if c.tag!='summary')
            if len(''.join(d.itertext()).strip())>50: extra.append(f'<details><summary><span>{escape(title)}</span><span>Topic source</span></summary><div class="panel"><article class="content-block">{body}</article></div></details>')
    for fragment in reversed(extra): stack.insert(len(source_blocks),html.fragment_fromstring(fragment))
    # Start with the exact published curriculum description and learning goal.
    curriculum=topic.xpath('//p[strong[contains(text(),"Content description:")]]')
    learning=topic.xpath('//p[strong[contains(text(),"Learning intention:") or contains(text(),"Learning goal:")]]')
    intro=''.join(etree.tostring(x,encoding='unicode',method='html') for x in [*(curriculum[:1]),*(learning[:1])])
    stack.insert(0,html.fragment_fromstring('<details open><summary><span>Curriculum and learning intention</span><span>Start here</span></summary><div class="panel"><article class="content-block">'+intro+'</article></div></details>'))
    for d in stack.xpath('./details'): d.set('name','lesson')
    head=doc.find('head')
    if not head.xpath('./link[@href="/assets/foundation-three-packages.css?v=20260906"]'): head.append(html.fragment_fromstring('<link rel="stylesheet" href="/assets/foundation-three-packages.css?v=20260906">'))
    write(cp,doc)

# Original worksheet items: prompt, visual/response, explained answer.
TASKS = {
 'AC9MFN03': [
  ('Count. Write how many.',svg('Seven counters',dots(7),500,75)+'<div class="work-space"></div>','7. Each counter is counted once.'),
  ('Draw 5 counters.', '<div class="drawing-space"></div>','Any arrangement of exactly 5 counters.'),
  ('Circle the row with more. Show how you know.',COMPARE,'A: 8 is more than 6. Match counters or count each row.'),
  ('Count collection C. Write the total.',TWENTY+'<div class="work-space"></div>','20. Accept one-by-one counting; rows help keep track.'),
  ('Make 12 counters. Spread them out. How many now?','<div class="work-space"></div>','12. Rearranging does not add or remove counters.'),
  ('Draw 6 animals as circles. Draw one plate for each.','<div class="drawing-space"></div>','6 animals and 6 plates matched one-to-one.'),
  ('Draw two groups with the same number. Join matching pairs.','<div class="drawing-space"></div>','Any two equally sized groups with one-to-one pairs. Use up to 20 per group.'),
  ('Make a group of 17. Make another group with fewer. Tell an adult how you checked.','<div class="drawing-space"></div>','First group: 17. Second: fewer than 17. Accept counting or matching as evidence.'),
  ('Make two groups with a difference of 3. Draw them.','<div class="drawing-space"></div>','For example, 8 and 5. Match pairs to show 3 left over. Keep collections within the taught range.')],
 'AC9EFLY12': [
  ('Read: cat. Draw what it means.','<div class="drawing-space"></div>','Read cat by blending c-a-t. Accept a recognisable cat drawing or spoken identification.'),
  ('Say it. Write the sounds. Read your word.',HEN+BOXES,'hen: h-e-n. Name the picture aloud if needed; do not show its spelling first.'),
  ('Say it. Write the sounds. Read your word.',SUN+BOXES,'sun: s-u-n. Check the middle vowel as well as the first and final sounds.'),
  ('Read: map. Say each sound. Write the word.',BOXES,'map: m-a-p in order.'),
  ('Listen to your adult. Write the word.',BOXES,'Adult says dog. Expected d-o-g. Adult may repeat the spoken word without spelling it.'),
  ('Read: can. Change c to m. Read your new word.',BOXES,'man. The first sound changes; a and n remain.'),
  ('A child wrote hn for hen. Add the missing letter.',BOXES,'hen. Add e for the middle vowel sound.'),
  ('Listen. Write. Read it back.',BOXES,'Adult says bed. Expected b-e-d. Listen for the child blending the completed word.'),
  ('Read: sit. Change s to p. Read the new word.',BOXES,'pit. Only the first letter/sound changes. Accept oral explanation.')],
 'AC9SFU03': [
  ('Look at the pencil. Point to two different materials.',PENCIL,'Wood, graphite, metal and rubber are shown. Accept any two; compare with an actual pencil.'),
  ('Draw a safe object. Tell an adult what it is made from.','<div class="drawing-space"></div>','Accept an accurate object/material pairing, such as a wooden block made from wood.'),
  ('Feel a fabric scrap and a wooden block. Circle a word for each.<br>Fabric: bendy / stiff<br>Block: bendy / stiff','', 'Usually fabric: bendy; wooden block: stiff. Accept observations appropriate to the actual samples.'),
  ('Sort fabric, a wooden block and a metal spoon.<br>Draw what bends easily on the left. Draw what stays stiff on the right.','<div class="drawing-space"></div>','Typical grouping: fabric / block and spoon. Check the samples; ask how the child decided.'),
  ('Look closely at fabric with a magnifying glass. Draw a detail.','<div class="drawing-space"></div>','Accept visible threads, gaps or other actual detail. Ask what became easier to see.'),
  ('Find two spoons made from different materials. Draw them.','<div class="drawing-space"></div>','For example, metal and wood. Same object type can use different materials.'),
  ('Circle the property word: soft / chair / spoon','', 'soft is a property; chair and spoon name objects.'),
  ('Choose two safe objects. Tell an adult one way they feel the same.','<div class="work-space"></div>','For example, both feel smooth. Accept observed similarities; do not infer material from one property alone.'),
  ('Look at the pencil again. Why are its body and eraser different?','<div class="work-space"></div>','The stiff body can be held for writing. The eraser has a different job and material. Accept a simple explanation tied to observed parts.'),
  ('Sort three safe objects using your own rule. Draw your groups.','<div class="drawing-space"></div>','Accept a stated observable property and consistent grouping. Ask the child to explain their rule.')]
}

def worksheets():
 for code,(subject,quiz,title) in CODES.items():
    topic=next((ROOT/'foundation'/subject).glob(code.lower()+'*/index.html'))
    topicurl='/'+str(topic.parent.relative_to(ROOT))+'/'
    base=ROOT/'quiz/grade-k'/quiz/code.lower()/'worksheet'
    tasks=TASKS[code]
    split=5 if code=='AC9SFU03' else 4
    chunks=[tasks[:split],tasks[split:]]
    for page in [base/'index.html',*sorted(base.glob('topic-practice-*/index.html'))]:
        old=html.parse(str(page)).getroot()
        # Retain metadata/analytics. Retire only these pages' content renderers.
        head=old.find('head')
        for s in list(head.xpath('./script[@src]')):
            src=s.get('src','')
            if 'googletagmanager' not in src: head.remove(s)
        for link in list(head.xpath('./link[@rel="stylesheet"]')): head.remove(link)
        head.append(html.fragment_fromstring('<link rel="stylesheet" href="/assets/foundation-three-packages.css?v=20260906">'))
        selected=2 if 'topic-practice-2' in str(page) else 1 if 'topic-practice-1' in str(page) else 0
        nav=f'<nav class="sheet-links screen-only"><a href="{topicurl}">Topic Guide</a><a href="{topicurl}teacher-slides/">Classroom View</a><a href="/quiz/grade-k/{quiz}/{code.lower()}/practice/">Practice</a><a href="/quiz/grade-k/{quiz}/{code.lower()}/test/">Test</a><button type="button" onclick="document.body.classList.remove(\'print-answers\');window.print()">Print student sheets</button><button type="button" onclick="document.body.classList.add(\'print-answers\');window.print()">Print with answer guide</button></nav>'
        if selected: nav+=f'<p class="screen-only"><a href="/quiz/grade-k/{quiz}/{code.lower()}/worksheet/">Both sheets and complete answer guide</a></p>'
        body='<div class="screen-only" style="max-width:760px;margin:auto">'+nav+'</div>'
        for index,chunk in enumerate(chunks,1):
            if selected and index!=selected: continue
            note='Adult: read directions aloud if needed. Accept spoken explanations and drawings. Use safe objects.'
            if code=='AC9EFLY12': note='Adult: name pictures if needed. Use the separate answer guide for the spoken words in questions 5 and 8. Use previously taught letter sounds.'
            body+=f'<section class="foundation-sheet"><p>SkillrHub · Foundation · {code}</p><h1>{title} — Sheet {index}</h1><p>Name: ____________________ Date: __________</p><p class="adult-note">{note}</p>'
            for n,(prompt,visual,_) in enumerate(chunk,1+(index-1)*split):
                tier='Warm-up' if n<=3 else 'Core' if n<=7+(code=='AC9SFU03') else 'Challenge'
                body+=f'<article class="task"><p><strong>{n}. {prompt}</strong></p><p class="adult-note">{tier}</p>{visual}</article>'
            body+=f'<footer>{code} · SkillrHub · skillrhub.com · Sheet {index}</footer></section>'
        indexes=range(split,len(tasks)) if selected==2 else range(split) if selected==1 else range(len(tasks))
        body+=f'<section class="foundation-sheet answer-sheet"><h1>{title} — Answer guide</h1><p>{code} · Adult copy</p><p>Observe the method as well as the answer. Offer a smaller collection, counters, letter cards or a real object when a child needs support.</p><ol>'
        for i in indexes: body+=f'<li value="{i+1}">{tasks[i][2]}</li>'
        body+=f'</ol><footer>{code} · SkillrHub · skillrhub.com</footer></section>'
        ob=old.find('body'); set_inner(ob,body); ob.attrib.clear()
        write(page,old)

if __name__=='__main__':
    (ROOT/'assets/foundation-three-packages.css').write_text(STYLE+'\n')
    mode=sys.argv[1] if len(sys.argv)>1 else 'topics'
    if mode=='topics': topics()
    elif mode=='resources': classrooms(); worksheets()
    else: raise SystemExit('Use topics or resources')
