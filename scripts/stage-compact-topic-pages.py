from collections import Counter
from html import escape, unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json
import re
import subprocess

VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
REMOVED_CLASSES = {
    'topic-resources', 'topic-next', 'topic-custom-packs',
    'topic-footer', 'skillr-feedback-card', 'skillr-discovery-links',
    'source-development-notes', 'skillr-app-funnel', 'skillr-quick-learning',
}
REMOVED_IDS = {'ready-check', 'skillr-topic-practice-now'}
NUMBERS = 'foundation/maths/ac9mfn01-name-represent-and-order-numbers-including-zero-to-at-least/index.html'
STYLE = '<link rel="stylesheet" href="/assets/css/compact-topic.css?v=1">'

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

def plain(html):
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', html)).strip()

def text(source, element):
    return plain(source[element.start + len(element.opening):source.rfind('</', element.start, element.end)])

def simplify(source, page, code, bank):
    nodes = Inventory(source).elements
    if not any(node.tag == 'h1' for node in nodes):
        raise ValueError(f'No topic heading in {page}')
    heading = next(node for node in nodes if node.tag == 'h1')
    main = next(node for node in nodes if node.tag == 'main')
    hero = next((node for node in nodes if node.classes & {'curriculum-hero', 'static-topic-hero', 'topic-hero'} and node.start < heading.start < node.end), None)
    removed = []
    for node in nodes:
        if any(start <= node.start < end for start, end in removed):
            continue
        adult_note = 'topic-adult-note' in node.classes and node.parent and 'topic-learning-guide' in node.parent.classes
        if adult_note or node.classes & REMOVED_CLASSES or node.attrs.get('id') in REMOVED_IDS:
            if node.end == node.start + len(node.opening):
                raise ValueError(f'Unclosed {node.opening} in {page}')
            removed.append((node.start, node.end))

    panel = re.search(r'<!-- skillr-topic-first:start -->.*?<!-- skillr-topic-first:end -->', source, re.S)
    if panel:
        removed = [span for span in removed if not panel.start() <= span[0] < panel.end()]
        removed.append(panel.span())
    gone = lambda node: any(start <= node.start < end for start, end in removed)
    actions = {}
    for node in nodes:
        if node.tag != 'a' or not (href := node.attrs.get('href')):
            continue
        path = urlsplit(href).path.lower()
        if path.rstrip('/').endswith(('/teacher-slides', '/teacher-deck')) or path in {'teacher-slides/', 'teacher-deck/'}:
            actions.setdefault('Teacher slides', href)
        elif re.search(r'/' + code.lower() + r'/worksheet/(?:index\.html)?$', path):
            actions.setdefault('Topic worksheet', href)
    for label, folder in [('Teacher slides', 'teacher-slides'), ('Teacher slides', 'teacher-deck')]:
        if (page.parent / folder / 'index.html').is_file():
            actions[label] = folder + '/'
            break
    if 'Topic worksheet' not in actions:
        year, subject = page.parts[:2]
        grade = 'grade-k' if year == 'foundation' else 'year-' + year[4:]
        for directory in (['math', 'maths'] if subject == 'maths' else [subject]):
            route = f'quiz/{grade}/{directory}/{code.lower()}/worksheet/'
            if Path(route, 'index.html').is_file():
                actions['Topic worksheet'] = '/' + route
                break
    practice = ''
    if bank.get('practice'):
        mode = 'try' if bank.get('guestPractice') else 'login'
        practice = f'<a id="skillr-topic-practice-now" class="compact-topic-practice" data-floating-practice="{code}" data-practice-placement="lesson_bar" href="https://app.skillrhub.com/?{mode}=1&amp;skill={code}" data-curriculum-code="{code}">Practise →</a>'
    if bank.get('assessment'):
        actions['Assessment'] = f'https://app.skillrhub.com/?assessment={code}'
    title = unescape(text(source, heading))
    # Keep the original H1 and its markup; the short bar label is plain text.
    title = re.sub(rf'^{code}:\s*|\s*\({code}\)$', '', title, flags=re.I)
    links = ''.join(f'<a href="{escape(href, quote=True)}">{label}</a>' for label, href in actions.items())
    nav = f'<nav class="compact-topic-links" aria-label="Topic resources">{links}</nav>' if links else ''
    bar = f'<div class="compact-topic-bar"><strong>{escape(title)}</strong>{practice}</div>'
    offer = '<div class="compact-topic-offer"><span>Save your practice progress with a free account.</span><a href="https://app.skillrhub.com/?signup=1">Register free →</a></div>' if bank.get('practice') else ''
    edits = [(start, end, '') for start, end in removed]
    body = next(node for node in nodes if node.tag == 'body')
    original_class = body.attrs.get('class', '')
    if original_class:
        opening = re.sub(r'(\bclass=["\'])', r'\1compact-topic-page ', body.opening, count=1)
    else:
        opening = body.opening[:-1] + ' class="compact-topic-page">'
    edits.append((body.start, body.start + len(body.opening), opening))
    edits.append((source.index('</head>'), source.index('</head>'), STYLE))
    position = hero.start if hero else heading.start
    edits.append((position, position, bar))
    position = hero.end if hero else heading.end
    edits.append((position, position, offer + nav))
    for node in nodes:
        if gone(node):
            continue
        if node.tag == 'section' and 'curriculum-topic-section' in node.classes and main.start < node.start < main.end:
            section_heading = next((item for item in nodes if item.parent is node and item.tag == 'h2'), None)
            if section_heading and section_heading.end > section_heading.start and node.end > section_heading.end:
                summary = escape(unescape(text(source, section_heading)))
                if summary:
                    opening = node.opening.replace('<section', '<details', 1)
                    close = source.rfind('</section', node.start, node.end)
                    edits.append((node.start, node.start + len(node.opening),
                                  f'{opening}<summary><strong>{summary}</strong></summary><div class="curriculum-detail-body">'))
                    edits.append((close, node.end, '</div></details>'))
        if node.tag == 'details' and 'open' in node.attrs and main.start <= node.start < main.end:
            opening = re.sub(r'\s+open(?:\s*=\s*(?:"[^"]*"|\x27[^\x27]*\x27|[^\s>]+))?(?=\s|>)', '', node.opening, flags=re.I)
            edits.append((node.start, node.start + len(node.opening), opening))
        if node.tag == 'a' and (href := node.attrs.get('href', '')).startswith('#'):
            target = next((item for item in nodes if item.attrs.get('id') == href[1:]), None)
            if target and gone(target):
                edits.append((node.start, node.end, ''))
    for start, end, replacement in sorted(edits, reverse=True):
        source = source[:start] + replacement + source[end:]
    return re.sub(r'<!-- skillr-(facebook-feedback|discovery):start -->\s*<!-- skillr-\1:end -->', '', source)

banks = {bank['code']: bank for bank in json.loads(Path('data/app-question-banks.json').read_text())['codes']}
counts = Counter()
for year in ['foundation', *(f'year{i}' for i in range(1, 11))]:
    for subject in ['maths', 'science', 'english']:
        for page in sorted(Path(year, subject).glob('ac9*/index.html')):
            code = page.parent.name.split('-')[0].upper()
            source = page.read_text()
            if re.search(r'http-equiv=["\']refresh', source, re.I) and 'noindex' in source:
                counts['redirects'] += 1
                continue
            if str(page) == NUMBERS:
                source = subprocess.check_output(['git', 'show', f'b15c7cc979be913762e6648ad7e63356ab38dc5d:{page}'], text=True)
                counts['reference'] += 1
            else:
                source = simplify(source, page, code, banks.get(code, {}))
                counts[subject] += 1
            if page.match('year2/science/ac9s2u01*/index.html'):
                source = re.sub(r'(?m)^ +$', '', source)
            page.write_text(source)
print(dict(counts))
