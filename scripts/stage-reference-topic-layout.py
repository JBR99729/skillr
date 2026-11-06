"""Add the shared Numbers to 20 preview to existing, authored topic guides."""
import re
import json
from collections import Counter
from html import escape, unescape
from pathlib import Path

# Source-offset inventory preserves authored markup byte for byte outside edits.
from html.parser import HTMLParser

VOID = set('area base br col embed hr img input link meta param source track wbr'.split())

class Element:
    def __init__(self, tag, attrs, start, opening, parent):
        self.tag, self.attrs, self.start, self.opening, self.parent = tag, dict(attrs), start, opening, parent
        self.classes = set((self.attrs.get('class') or '').split())
        self.end = start + len(opening)

class Inventory(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.lines = [0, *(m.end() for m in re.finditer('\n', source))]
        self.source, self.elements, self.stack = source, [], []
        self.feed(source)

    def position_offset(self):
        line, col = self.getpos()
        return self.lines[line - 1] + col

    def opening(self, tag, attrs, empty=False):
        element = Element(tag, attrs, self.position_offset(), self.get_starttag_text(), self.stack[-1] if self.stack else None)
        self.elements.append(element)
        if tag not in VOID and not empty:
            self.stack.append(element)

    handle_starttag = opening

    def handle_startendtag(self, tag, attrs):
        self.opening(tag, attrs, empty=True)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            element = self.stack[index]
            if element.tag == tag:
                element.end = self.source.index('>', self.position_offset()) + 1
                del self.stack[index:]
                break



PREVIEW_HEAD = '<link rel="stylesheet" href="/assets/css/lesson-preview.css">'
EXAMPLE = re.compile(r'^(?:(?:worked|modelled|modeled|sample|guided)\s+(?:example|model|response)|example\b|model text)', re.I)
PROMPT = re.compile(r'^(?:try|question|check|answer|activity|task|practice|assessment|read aloud|teacher|parent|worksheet|related|curriculum|video|what students learn|what you will learn)\b', re.I)
TAKEAWAY = re.compile(r'^(?:why (?:it|this) works|key (?:idea|point)|takeaway|remember|check by|this shows|so\b)', re.I)

def body(source, node):
    return source[node.start + len(node.opening):source.rfind('</', node.start, node.end)]

def cleaned(source, node):
    return ' '.join(unescape(re.sub(r'<[^>]*>', ' ', body(source,node))).split())

def descendants(nodes, root):
    return [n for n in nodes if root.start < n.start < root.end]

def label(source,node):
    return cleaned(source,node).strip(' :—–')

def teaching(source, nodes, main):
    in_main = descendants(nodes, main)
    headings = [n for n in in_main if n.tag in {'summary','h2','h3','h4'}]
    paragraphs = [n for n in in_main if n.tag in {'p','li','dd','figcaption'}]
    choices = []
    for p in paragraphs:
        line = cleaned(source,p)
        if 24 <= len(line) <= 550 and (EXAMPLE.match(line) or re.match(r'^(?:for example|model|scenario)[: ,]',line,re.I)):
            content = re.sub(r'^(?:(?:worked|modelled|modeled|sample|guided)\s+)?example\s*[:—–]\s*','',line,flags=re.I)
            choices.append((0 if content != line else 2,p,'Worked example',content))
    for heading in headings:
        title = label(source,heading)
        if not EXAMPLE.search(title) and not re.search(r'worked examples?|model and|see it, then try|model text|demonstrat',title,re.I):
            continue
        limit = heading.parent.end if heading.parent and heading.parent.tag in {'details','article','section'} else min(main.end, heading.end+2500)
        p = next((p for p in paragraphs if heading.end <= p.start < limit and 24 <= len(cleaned(source,p)) <= 550),None)
        if p:
            choices.append((1,p,title,cleaned(source,p)))
    for index,p in enumerate(paragraphs[:-1]):
        line=cleaned(source,p)
        if re.fullmatch(r'(?:worked |modelled |guided )?example:?|work through the example',line,re.I):
            next_p=paragraphs[index+1]
            example=cleaned(source,next_p)
            if 24<=len(example)<=550 and not PROMPT.match(example):
                choices.append((0,next_p,'Worked example',example))
        if re.match(r'^(?:read it|show it|say it|look at this|model it|example|worked example):',line,re.I) and 24<=len(line)<=550:
            choices.append((1,p,'Worked example',line.split(':',1)[1].strip()))
        if p.parent and p.parent.classes & {'topic-answer','learn-answer','unit-answer'}:
            previous=paragraphs[index-1] if index else None
            answer=cleaned(source,p)
            if previous:
                question=cleaned(source,previous)
                if re.match(r'^(?:try it|question|quick check)[: ]',question,re.I) and 28<=len(answer)<=400:
                    question=re.sub(r'^(?:try it|question|quick check)\s*:\s*','',question,flags=re.I)
                    choices.append((3,p,'Worked example',question+' '+answer))
    chosen = min(choices,key=lambda v:(v[0],v[1].start)) if choices else None
    notes = []
    for heading in sorted(headings,key=lambda h: (not (h.parent and 'topic-focus' in h.parent.classes),h.start)):
        title = label(source,heading)
        if not title or len(title)>105 or EXAMPLE.match(title) or PROMPT.match(title):
            continue
        limit = next((h.start for h in headings if h.start > heading.start), main.end)
        p = next((p for p in paragraphs if heading.end <= p.start < limit and 22 <= len(cleaned(source,p)) <= 330 and not EXAMPLE.match(cleaned(source,p)) and not PROMPT.match(cleaned(source,p))),None)
        if p and (not chosen or p is not chosen[1]) and all(cleaned(source,p)!=item[1] for item in notes):
            notes.append((title,cleaned(source,p)))
        if len(notes)==2:
            break
    # Some older guides teach the concept without a self-contained worked example.
    # Quote the existing lesson rather than inventing an example or its answer.
    fallback = not chosen
    candidates = [(p, cleaned(source,p)) for p in paragraphs]
    candidates = [(p, value) for p, value in candidates if 35 <= len(value) <= 550
                  and not PROMPT.match(value) and not re.search(r'Teachers Pay Teachers|worksheet pack|©|https?://', value, re.I)]
    if not chosen:
        if not candidates:
            return None
        p, content = candidates[0]
        title = 'From the lesson'
    else:
        _,p,title,content=chosen
    for n, value in candidates:
        if len(notes) >= 2:
            break
        if n is p or any(value == note for _, note in notes):
            continue
        notes.append(('Another point to remember' if notes else 'Key idea', value))
    if len(notes) < 2:
        return None
    limit=next((h.start for h in headings if h.start>p.start),main.end)
    takeaway=next((cleaned(source,n) for n in paragraphs if p.end<=n.start<limit and 25<=len(cleaned(source,n))<=260 and TAKEAWAY.match(cleaned(source,n))),None)
    if not takeaway:
        # The authored explanation is the takeaway when no separate statement exists.
        takeaway=content.rsplit('. ',1)[-1] if not fallback and '. ' in content else notes[0][1]
    return title,content,takeaway,notes,fallback

def build(source, path, practice):
    if PREVIEW_HEAD in source or 'numbers-preview' in source:
        return None,'reference'
    nodes=Inventory(source).elements
    h1=next((n for n in nodes if n.tag=='h1'),None)
    main=next((n for n in nodes if n.tag=='main'),None)
    if not h1 or not main or 'compact-topic-bar' not in source:
        return None,'redirect_or_other'
    hero=next((n for n in nodes if n.classes & {'curriculum-hero','static-topic-hero'} and n.start<h1.start<n.end),None)
    if not hero:
        return None,'heading'
    lesson=teaching(source,nodes,main)
    if not lesson:
        return None,'content'
    title,example,takeaway,notes,fallback=lesson
    year,subject,slug=path.parts[:3]
    code=slug.split('-')[0].upper()
    year_label='Foundation' if year=='foundation' else 'Year '+year[4:]
    lead=next((n for n in descendants(nodes,hero) if n.tag=='p' and n.classes & {'curriculum-hero__lead','topic-lead','static-topic-lead'}),None)
    if not lead:
        lead=next((n for n in descendants(nodes,hero) if n.tag=='p' and n.start>h1.end and len(cleaned(source,n))>=35 and not n.classes & {'topic-hero__note','topic-code'}),None)
    lead_text=cleaned(source,lead) if lead else ''
    notes_html=''.join(f'<div><h2>{escape(name)}</h2><p>{escape(note)}</p></div>' for name,note in notes)
    signup=('<aside class="lesson-preview-offer"><div><strong>Keep learning with a free account</strong><p>Save your practice progress. No card needed.</p></div>'
            '<a href="https://app.skillrhub.com/?signup=1">Register free →</a></aside>' if practice else
            '<aside class="lesson-preview-offer"><div><strong>Explore the detailed lesson</strong><p>Read the teaching notes and examples below.</p></div>'
            '<a href="#topic-detailed-lesson">Read the lesson ↓</a></aside>')
    preview=(f'<section class="lesson-preview" aria-label="Lesson preview"><p class="lesson-preview-kicker">{year_label} · {subject.title()} · {code}</p>'
             f'<div class="lesson-preview-title">{source[h1.start:h1.end]}</div>'
             + (f'<p class="lesson-preview-lead">{escape(lead_text)}</p>' if lead_text else '')
             + f'<div class="lesson-preview-example"><h2>{escape(title)}</h2><p>{escape(example)}</p><p class="lesson-preview-takeaway">{escape(takeaway)}</p></div>'
             + signup + f'<div class="lesson-preview-notes">{notes_html}</div></section>')
    # Retain the original action and optional product destinations below the preview.
    # Keep the original header classes and content, with the single H1 moved above it.
    original=source[hero.start:hero.end]
    original=original[:h1.start-hero.start]+original[h1.end-hero.start:]
    original=original.replace(hero.opening,hero.opening.replace('<header','<div',1),1)
    original=original[:original.rfind('</header>')]+'</div>'
    extras='<details class="lesson-preview-extras"><summary>More topic information and resources</summary>'+original+'</details>'
    out=source[:hero.start]+preview+extras+source[hero.end:]
    if practice:
        out=re.sub(r'<div class="compact-topic-offer">[\s\S]*?</div>','',out,count=1)
    if not practice:
        # Insert a jump target without modifying the authored main element.
        out=out.replace(main.opening,'<span id="topic-detailed-lesson"></span>'+main.opening,1)
    out=out.replace('</head>',PREVIEW_HEAD+'</head>',1)
    out=out.replace('<div class="compact-topic-bar"><strong>', '<div class="compact-topic-bar"><strong><span class="lesson-preview-mark" aria-hidden="true">S</span>', 1)
    new_nodes=Inventory(out).elements
    new_main=next(n for n in new_nodes if n.tag=='main')
    assert source[main.start:main.end] == out[new_main.start:new_main.end], path
    old_links={n.attrs.get('href') for n in nodes if n.tag=='a'}
    new_links={n.attrs.get('href') for n in new_nodes if n.tag=='a'}
    assert old_links <= new_links, (path, old_links-new_links)
    assert sum(n.tag=='h1' for n in nodes) == sum(n.tag=='h1' for n in new_nodes), path
    return out,'excerpt' if fallback else 'worked'

def main():
    import argparse
    parser=argparse.ArgumentParser()
    parser.add_argument('--write',action='store_true')
    args=parser.parse_args()
    banks={b['code'] for b in json.loads(Path('data/app-question-banks.json').read_text())['codes'] if b.get('practice')}
    counts=Counter()
    missed=[]
    for year in ['foundation',*(f'year{i}' for i in range(1,11))]:
        for subject in ('maths','english','science'):
            for p in sorted(Path(year,subject).glob('ac9*/index.html')):
                code=p.parent.name.split('-')[0].upper()
                out,status=build(p.read_text(),p,code in banks)
                counts[status]+=1
                if out and args.write:
                    p.write_text(out)
                if status in {'content','heading'}:
                    missed.append(str(p))
    print(dict(counts))
    print('\n'.join(missed))
    if missed:
        raise SystemExit(1)

if __name__=='__main__':
    main()
