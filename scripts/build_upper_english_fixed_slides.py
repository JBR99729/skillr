#!/usr/bin/env python3
"""Build fixed per-topic Teacher Slide viewers for Years 8–10 English.

Slides are derived from the finalized static topic-page teaching content. No
runtime curriculum registry is loaded by the viewer, so topic pages can link to
a stable page-by-page local Teacher Slides route.
"""
from __future__ import annotations

import html
import re
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = (8, 9, 10)


def clean(value: str) -> str:
    value = html.unescape(re.sub(r'<[^>]+>', ' ', str(value or '')))
    return re.sub(r'\s+', ' ', value).strip()


def esc(value: str) -> str:
    return html.escape(str(value), quote=True)


def code_from(source: str, path: Path) -> str:
    match = re.search(r'AC9E\d+[A-Z]+\d+', source, re.I) or re.search(r'ac9e\d+[a-z]+\d+', path.as_posix(), re.I)
    if not match:
        raise ValueError(f'No curriculum code in {path}')
    return match.group(0).upper()


def h1_from(source: str, code: str) -> str:
    match = re.search(r'<h1>(.*?)</h1>', source, re.I | re.S)
    title = clean(match.group(1)) if match else code
    return re.sub(rf'^{re.escape(code)}\s*[:–—-]?\s*', '', title, flags=re.I) or code


def lead_from(source: str) -> str:
    match = re.search(r'class=["\']curriculum-hero__lead["\'][^>]*>(.*?)</p>', source, re.I | re.S)
    return clean(match.group(1)) if match else ''


def section_text(source: str, pattern: str) -> str:
    for match in re.finditer(r'<details\b[^>]*>(.*?)</details>', source, re.I | re.S):
        chunk = match.group(1)
        summary = clean((re.search(r'<summary[^>]*>(.*?)</summary>', chunk, re.I | re.S) or [None, ''])[1])
        if re.search(pattern, summary, re.I):
            return clean(chunk)
    return ''


def example_items(source: str) -> list[str]:
    items = []
    for match in re.finditer(r'<article\b[^>]*class=["\'][^"\']*curriculum-worked-example[^"\']*["\'][^>]*>(.*?)</article>', source, re.I | re.S):
        chunk = match.group(1)
        title_m = re.search(r'<h3>(.*?)</h3>', chunk, re.I | re.S)
        ps = re.findall(r'<p[^>]*>(.*?)</p>', chunk, re.I | re.S)
        title = clean(title_m.group(1)) if title_m else 'Example'
        body = clean(ps[0]) if ps else clean(chunk)
        if body:
            items.append(f'{title}: {body}')
        if len(items) >= 4:
            break
    return items


def list_items(section: str, limit: int = 4) -> list[str]:
    return [clean(x) for x in re.findall(r'<li[^>]*>(.*?)</li>', section, re.I | re.S) if clean(x)][:limit]


def practice_prompt(source: str) -> str:
    section = section_text(source, r'Practice Thought|Formative Assessment|practice set|practice')
    if section:
        # Prefer the first substantive paragraph/question.
        paragraphs = [clean(x) for x in re.findall(r'<p[^>]*>(.*?)</p>', section, re.I | re.S)]
        for p in paragraphs:
            if len(p.split()) >= 6:
                return p
        lis = list_items(section, 1)
        if lis:
            return lis[0]
    return 'Apply the idea to a fresh text. Identify the exact evidence and explain why the choice matters for meaning, audience or purpose.'


def wrap(value: str, width: int = 58, lines: int = 5) -> list[str]:
    parts = textwrap.wrap(clean(value), width=width, break_long_words=False, break_on_hyphens=False)
    if len(parts) <= lines:
        return parts
    out = parts[:lines]
    out[-1] = out[-1].rstrip(' .,:;') + '…'
    return out


def text_nodes(lines: list[str], x: int, y: int, size: int, gap: int, fill: str = '#172033', weight: int = 400) -> str:
    return ''.join(
        f'<text x="{x}" y="{y + i * gap}" fill="{fill}" font-family="Arial,Helvetica,sans-serif" font-size="{size}" font-weight="{weight}">{esc(line)}</text>'
        for i, line in enumerate(lines)
    )


def svg(code: str, year: int, index: int, total: int, title: str, body: list[str], prompt: str = '') -> str:
    title_lines = wrap(title, 42, 2)
    body_lines: list[str] = []
    for item in body[:4]:
        item_lines = wrap(item, 66, 2)
        if item_lines:
            body_lines.append('• ' + item_lines[0])
            body_lines.extend('  ' + x for x in item_lines[1:])
    body_lines = body_lines[:8]
    prompt_lines = wrap(prompt, 70, 3) if prompt else []
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
<rect width="1600" height="900" fill="#f8fafc"/>
<rect width="1600" height="96" fill="#173a72"/>
<text x="88" y="62" fill="#fff" font-family="Arial" font-size="32" font-weight="700">SkillrHub • Year {year} English</text>
<text x="1510" y="62" text-anchor="end" fill="#fff" font-family="Arial" font-size="25">{index} / {total}</text>
{text_nodes(title_lines, 90, 185, 50, 60, '#173a72', 700)}
<rect x="90" y="330" width="1420" height="340" rx="26" fill="#eef5ff" stroke="#cbdcf3" stroke-width="2"/>
{text_nodes(body_lines, 135, 395, 31, 43)}
{('<rect x="90" y="705" width="1420" height="105" rx="20" fill="#f0fdfa" stroke="#0f766e" stroke-width="3"/>' + '<text x="130" y="745" fill="#0f766e" font-family="Arial" font-size="25" font-weight="700">Student thought</text>' + text_nodes(prompt_lines, 130, 783, 25, 31)) if prompt_lines else ''}
<rect y="845" width="1600" height="55" fill="#173a72"/>
<text x="70" y="881" fill="#fff" font-family="Arial" font-size="24" font-weight="700">{code} • SkillrHub • skillrhub.com</text>
</svg>\n'''


def viewer(code: str, year: int, total: int) -> str:
    figures = ''.join(
        f'<figure class="fixed-slide-viewer__slide" data-slide{" hidden" if i > 1 else ""}><img draggable="false" src="slide-{i:02d}.svg" alt="{code} teacher slide {i} of {total}"></figure>'
        for i in range(1, total + 1)
    )
    return f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>{code} Teacher Slides | SkillrHub</title><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/teacher-slide-viewer.css?v=1"></head><body><nav class="main-nav"><a href="../">Topic Guide</a></nav><main style="padding:clamp(12px,3vw,32px)"><h1>{code} Teacher Slides</h1><p>Use these fixed teaching-summary slides, then move students into Practice.</p><section class="fixed-slide-viewer" data-fixed-slide-viewer tabindex="0"><div class="fixed-slide-viewer__stage">{figures}</div><div class="fixed-slide-viewer__controls"><button type="button" data-slide-previous>Previous</button><span data-slide-counter>1 / {total}</span><button type="button" data-slide-next>Next</button><button type="button" data-slide-fullscreen>Fullscreen</button></div></section></main><script src="/assets/teacher-slide-viewer.js?v=1"></script></body></html>\n'''


def build(page: Path, year: int) -> int:
    source = page.read_text(encoding='utf-8', errors='replace')
    code = code_from(source, page)
    title = h1_from(source, code)
    lead = lead_from(source)
    core = section_text(source, r'What students learn|Core concepts|Outcome Overview')
    core_items = list_items(core, 4)
    if not core_items:
        core_items = [lead] if lead else [f'Explain the {title.lower()} concept using precise English evidence.']
    examples = example_items(source)
    while len(examples) < 4:
        examples.append('Transfer: apply the concept to a fresh text or composition and justify the evidence-to-effect connection.')
    misconceptions = list_items(section_text(source, r'Misconception|Common Student'), 4)
    if not misconceptions:
        misconceptions = ['Do not stop at naming a feature; identify exact evidence and explain its context-specific effect.']
    prompt = practice_prompt(source)

    slides = [
        (title, [lead or f'Learn the core {title.lower()} skill and apply it to a new text.'], 'What relationship or choice should we notice first?'),
        ('What students learn', core_items, 'Explain the main idea in your own words.'),
        ('Worked examples: notice and explain', examples[:2], 'For each example, identify the evidence before explaining the effect.'),
        ('Worked examples: compare and transfer', examples[2:4], 'What changes when audience, context, structure or language choice changes?'),
        ('Common misconceptions', misconceptions, 'Choose one misconception and correct it using precise evidence.'),
        ('Student practice thought', [prompt], 'Answer independently, then open Practice or the worksheet.'),
    ]

    deck = page.parent / 'teacher-slides'
    deck.mkdir(parents=True, exist_ok=True)
    (deck / 'index.html').write_text(viewer(code, year, len(slides)), encoding='utf-8')
    for i, (stitle, body, sprompt) in enumerate(slides, 1):
        (deck / f'slide-{i:02d}.svg').write_text(svg(code, year, i, len(slides), stitle, body, sprompt), encoding='utf-8')
    return len(slides)


def main() -> None:
    topics = slides = 0
    for year in YEARS:
        root = ROOT / f'year{year}' / 'english'
        if not root.is_dir():
            continue
        for page in sorted(root.glob('ac9e*/index.html')):
            slides += build(page, year)
            topics += 1
    if topics != 71:
        raise SystemExit(f'Expected 71 Years 8–10 English topic pages; built {topics}.')
    print(f'Built {slides} fixed slides across {topics} Years 8–10 English topics.')


if __name__ == '__main__':
    main()
