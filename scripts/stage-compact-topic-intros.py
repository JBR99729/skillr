from pathlib import Path
import re

ROOTS = ['foundation', *(f'year{i}' for i in range(1, 11))]
PACK = re.compile(r'<aside\b[^>]*class="topic-pack"[^>]*>[\s\S]*?</aside>')
BUNDLES = re.compile(r'<div\b[^>]*class="topic-bundle-strip"[^>]*>[\s\S]*?</div>')
BUY = re.compile(r'<a\b[^>]*class="[^"]*\btopic-button--buy\b[^"]*"[^>]*>[\s\S]*?</a>')
NOTE = re.compile(r'<p class="topic-hero__note">[\s\S]*?</p>')
HERO = re.compile(r'<header class="curriculum-hero topic-hero">[\s\S]*?</header>')
LINKS = re.compile(r'<nav class="compact-topic-links"[^>]*>[\s\S]*?</nav>')
count = 0
for year in ROOTS:
    for subject in ['maths', 'english', 'science']:
        for path in Path(year, subject).glob('ac9*/index.html'):
            source = path.read_text()
            hero = HERO.search(source)
            if not hero or 'compact-topic-bar' not in source or 'topic-paid-options' in source:
                continue
            original = hero[0]
            pack = PACK.search(original)
            if not pack:
                continue
            without_pack = PACK.sub('', original)
            resources_html = [pack[0], *(m[0] for m in BUY.finditer(without_pack)), *(m[0] for m in BUNDLES.finditer(without_pack))]
            label = 'Optional paid worksheet packs' if re.search(r'\bpaid\b|teacherspayteachers\.com', pack[0], re.I) else 'Worksheet details'
            intro = NOTE.sub('', BUY.sub('', BUNDLES.sub('', without_pack)))
            intro = intro.replace('curriculum-hero topic-hero', 'curriculum-hero topic-hero compact-topic-intro', 1)
            result = source[:hero.start()] + intro + source[hero.end():]
            resources = LINKS.search(result, hero.start() + len(intro))
            if resources is None:
                raise ValueError(f'Missing compact resource links in {path}')
            options = '<details class="topic-paid-options"><summary>' + label + '</summary>' + ''.join(resources_html) + '</details>'
            result = result[:resources.end()] + options + result[resources.end():]
            result = result.replace('</head>', '<link rel="stylesheet" href="/assets/css/compact-topic-intro.css"></head>', 1)
            path.write_text(result)
            count += 1
print(f'Compacted {count} topic introductions')
