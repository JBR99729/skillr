from pathlib import Path
import re
import subprocess

BASE = '7d3ed710a6bc1fb43829eb4245f490ffec27e18b'
topic_path = re.compile(r'^(foundation|year(?:[1-9]|10))/(maths|english|science)/ac9[^/]+/index\.html$')
legacy_links = re.compile(r'<nav\b[^>]*\bclass=["\'](?:skillr-discovery-links|topic-next)["\'][^>]*>([\s\S]*?)</nav>')
anchor = re.compile(r'<a\b[^>]*\bhref=["\']([^"\']+)["\'][^>]*>[\s\S]*?</a>')
for name in subprocess.check_output(['git','diff','--name-only',BASE,'HEAD'], text=True).splitlines():
    if not topic_path.fullmatch(name):
        continue
    path = Path(name)
    source = path.read_text()
    before = subprocess.check_output(['git','show',f'{BASE}:{name}'], text=True)
    existing = {match[1] for match in anchor.finditer(source)}
    links = {}
    for block in legacy_links.finditer(before):
        for match in anchor.finditer(block[1]):
            if match[1] not in existing and match[1].startswith('/'):
                links.setdefault(match[1], match[0])
    year, subject = path.parts[:2]
    required = {
        f'/{year}/curriculum/{subject}/': 'All topics in this subject',
        '/about.html': 'About SkillrHub',
        '/editorial-standards.html': 'Editorial standards',
    }
    for href, label in required.items():
        if href not in existing and 'https://skillrhub.com' + href not in existing:
            links.setdefault(href, f'<a href="{href}">{label}</a>')
    if links:
        disclosure = '<details class="compact-topic-discovery"><summary>Related topics and site information</summary><nav aria-label="Related topics and site information">' + ''.join(links.values()) + '</nav></details>'
        section_nav = source.find('<nav class="topic-section-nav"')
        at = section_nav if 'numbers-bar' in source and section_nav >= 0 else source.index('<main')
        source = source[:at] + disclosure + source[at:]
        if 'numbers-bar' in source:
            source = source.replace('</head>', '<link rel="stylesheet" href="/assets/css/compact-topic.css?v=1"></head>',1)
    if name.startswith('year9/science/'):
        source = re.sub(r'(<a href="/quiz/year-9/science/ac9s9\w+)/worksheet/">Topic worksheet</a>',r'\1/homework/">Topic worksheet</a>',source,count=1)
    path.write_text(source)
