"""Static discovery inventory shared by the repair and release check.

Only HTML anchors count. Archived comments and JavaScript strings do not.
"""
from collections import defaultdict, deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, urlunsplit
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://skillrhub.com/'
STYLE = '/assets/css/site-discovery.css?v=20261105'
START = '<!-- skillr-discovery:start -->'
END = '<!-- skillr-discovery:end -->'
OWNED = re.compile(re.escape(START) + r'[\s\S]*?' + re.escape(END))


def normalize(url):
    p = urlsplit(url)
    path = p.path or '/'
    if path.endswith('/index.html'):
        path = path[:-10]
    return urlunsplit((p.scheme.lower(), p.netloc.lower(), path, '', ''))


def route(relative):
    return normalize(ORIGIN + relative)


class Document(HTMLParser):
    def __init__(self, relative, source):
        super().__init__(convert_charrefs=True)
        self.relative, self.source, self.url = relative, source, route(relative)
        self.hrefs, self.links, self.title, self.headings = [], set(), [], []
        self.meta, self.canonical, self.base = {}, '', None
        self.head, self.in_title = False, False
        self.head_end, self.main_end, self.body_end = None, None, None
        self.lines = [0]
        self.lines.extend(m.end() for m in re.finditer('\n', source))
        self.feed(source)
        self.links = {normalize(urljoin(self.base or self.url, href)) for href in self.hrefs}

    def source_position(self):
        line, col = self.getpos()
        return self.lines[line - 1] + col

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'head': self.head = True
        if tag == 'title' and self.head: self.in_title = True
        if tag == 'base' and self.head and a.get('href'): self.base = urljoin(self.url, a['href'])
        if tag == 'a' and a.get('href'): self.hrefs.append(a['href'])
        if tag == 'link' and 'canonical' in a.get('rel', '').lower().split():
            self.canonical = normalize(urljoin(self.url, a.get('href', '')))
        if tag == 'meta' and self.head:
            self.meta[a.get('name', '').lower()] = a.get('content', '')

    def handle_endtag(self, tag):
        if tag == 'head': self.head = False; self.head_end = self.source_position()
        if tag == 'title': self.in_title = False
        if tag == 'main': self.main_end = self.source_position()
        if tag == 'body': self.body_end = self.source_position()

    def handle_data(self, text):
        if self.in_title: self.title.append(text)

    @property
    def name(self):
        return ' '.join(' '.join(self.title).split()).removesuffix(' | SkillrHub')

    @property
    def indexable(self):
        return not any('noindex' in self.meta.get(key, '').lower() for key in ('robots', 'googlebot'))

    @property
    def code(self):
        m = re.match(r'^(?:foundation|year\d+)/(?:maths|science|english)/(ac9[a-z0-9]+)-', self.relative, re.I)
        return m.group(1).upper() if m and self.relative.count('/') == 3 else None


def inventory(root=ROOT):
    docs = {}
    for path in sorted(root.rglob('*.html')):
        relative = path.relative_to(root).as_posix()
        if relative.startswith('.git/'): continue
        doc = Document(relative, path.read_text(encoding='utf-8'))
        docs[doc.url] = doc
    return docs


def graph(docs):
    incoming = defaultdict(set)
    for url, doc in docs.items():
        for target in doc.links:
            if target in docs and target != url: incoming[target].add(url)
    depth, queue = {ORIGIN: 0}, deque([ORIGIN])
    while queue:
        url = queue.popleft()
        for target in docs[url].links:
            if target in docs and target not in depth:
                depth[target] = depth[url] + 1
                queue.append(target)
    return incoming, depth


def sitemap_urls(root=ROOT):
    urls, pending, seen = set(), ['sitemap.xml'], set()
    while pending:
        relative = pending.pop()
        if relative in seen: continue
        seen.add(relative)
        tree = ET.parse(root / relative).getroot()
        locations = [el.text.strip() for el in tree.iter() if el.tag.endswith('}loc')]
        if tree.tag.endswith('sitemapindex'):
            pending.extend(urlsplit(url).path.lstrip('/') for url in locations)
        else:
            urls.update(normalize(url) for url in locations)
    return urls


def subject_hub(doc):
    year, subject = doc.relative.split('/')[:2]
    return ORIGIN + year + '/curriculum/' + subject + '/'


def insert_block(source, relative, block):
    source = OWNED.sub('', source)
    doc = Document(relative, source)
    position = doc.main_end if doc.main_end is not None else doc.body_end
    if position is None: raise ValueError(f'{relative}: no safe navigation insertion point')
    output = source[:position] + START + block + END + source[position:]
    if STYLE not in output:
        doc = Document(relative, output)
        if doc.head_end is None: raise ValueError(f'{relative}: missing head')
        output = output[:doc.head_end] + f'<link rel="stylesheet" href="{STYLE}">' + output[doc.head_end:]
    return output
