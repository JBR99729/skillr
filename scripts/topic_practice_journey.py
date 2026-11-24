"""Conservative static next actions after authored examples on bank-backed guides."""
import html
import json
import re
from functools import lru_cache
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INLINE = re.compile(r'\n<!-- skillr-practice-journey:start -->[\s\S]*?<!-- skillr-practice-journey:end -->\n')
SECONDARY = ' data-skillr-worksheet-secondary'
ANCHOR = re.compile(r'<a\b[^>]*>[\s\S]*?</a>', re.I)
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())


@lru_cache(maxsize=1)
def protected_codes():
    # Keep both sides of the active metadata comparison and the two
    # no-visual Year 6 comparison guides byte-stable for this rollout.
    experiment = json.loads((ROOT / 'data/us-ccss-experiment-20261123.json').read_text())
    ccss = {item['code'] for item in experiment['population']} if experiment['status'] == 'active' else set()
    return ccss | {'AC9M6N02', 'AC9M6N04'}


def plain(value):
    return ' '.join(html.unescape(re.sub(r'<[^>]+>', '', value)).split())


class LessonSlot(HTMLParser):
    """Find a complete, visibly authored example in the primary lesson, not nav."""
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.offsets = [0, *[m.end() for m in re.finditer(r'\n', source)]]
        self.stack = []
        self.ends = []
        self.feed(source)
        self.close()

    def byte_position(self):
        line, col = self.getpos()
        return self.offsets[line - 1] + col

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = (attrs.get('class') or '').split()
        if tag in VOID:
            return
        ancestors = self.stack
        active = any(p[0] == 'main' or p[4] for p in ancestors) and not any(p[3] for p in ancestors)
        inert = (tag in ('nav', 'details', 'template', 'aside', 'dialog') or
                 'hidden' in attrs or attrs.get('aria-hidden') == 'true' or
                 bool(set(classes) & {'hero', 'shortcuts', 'static-topic-sidebar', 'lesson-lab'}))
        explicit = tag in ('div', 'section', 'article') and bool(set(classes) & {'example', 'lesson-preview-example'})
        preview_shell = tag == 'section' and 'lesson-preview' in classes and attrs.get('aria-label') == 'Lesson preview'
        self.stack.append((tag, self.byte_position(), active and explicit and not inert, inert, preview_shell))

    def handle_startendtag(self, tag, attrs):
        # SVG shapes and other explicit self-closing elements have no scope.
        pass

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            name, start, eligible, _, _ = self.stack[index]
            if name != tag:
                continue
            self.stack[index:] = []
            if eligible:
                end = self.source.index('>', self.byte_position()) + 1
                example = self.source[start:end]
                # The marked section must actually teach something with a heading and prose.
                if re.search(r'<h[2-4]\b', example, re.I) and re.search(r'<p\b', example, re.I):
                    self.ends.append(end)
            return


def insert(source, code, subject, bank, target, starter=False):
    if not bank or not bank.get('practice') or code in protected_codes():
        return source
    clean = INLINE.sub('', source).replace(SECONDARY, '')
    slot = min(LessonSlot(clean).ends, default=None)
    if slot is None:
        return clean
    title = re.search(r'<h1\b[^>]*>([\s\S]*?)</h1>', clean, re.I)
    name = re.sub(r'^AC9[A-Z0-9]+\s*[:·–-]\s*', '', plain(title[1]) if title else '', flags=re.I).strip()
    concise = (0 < len(name) <= 48 and 1 <= len(name.split()) <= 8 and
               not re.search(r'(?:\.{3}|…|^year \d+ (?:maths|english|science)$)', name, re.I))
    label = ('Try 5 questions' if starter else f'Free practice: {name}' if concise
             else 'Practise this skill for free')
    note = 'No account needed' if bank.get('guestPractice') else 'Free account required'
    url = html.escape(target, quote=True)
    link = (f'\n<!-- skillr-practice-journey:start -->\n<p class="skillr-practice-next">'
            f'<a class="skillr-inline-practice" data-skillr-app-cta data-curriculum-code="{code}" '
            f'data-curriculum-subject="{subject}" data-practice-placement="after_worked_example" '
            f'data-funnel-location="after_worked_example" href="{url}">{html.escape(label)}'
            f'<small>{note}</small></a></p>\n<!-- skillr-practice-journey:end -->\n')
    rewritten = clean[:slot] + link + clean[slot:]

    def secondary(match):
        anchor = match[0]
        text = plain(anchor)
        if re.search(r'\bpaid\s+(?:printable\s+)?worksheet|\bbuy\s+(?:the\s+)?worksheet', text, re.I):
            return anchor.replace('>', SECONDARY + '>', 1)
        return anchor
    # Business links and labels remain; only explicitly paid worksheet buttons
    # get a quieter visual treatment when a verified practice action is present.
    return ''.join(part if part.startswith('<!--') else ANCHOR.sub(secondary, part)
                   for part in re.split(r'(<!--[\s\S]*?-->)', rewritten))
