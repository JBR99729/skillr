#!/usr/bin/env python3
"""Normalize finalized English and Year 10 Science Inquiry pages to Static Curriculum Architecture v2.

This is intentionally a post-processing pass. Authoring scripts own lesson content;
this script owns the non-negotiable static delivery contract:
- native details/summary sections
- static teaching heading discoverability
- local fixed teacher-slide routes
- no curriculum renderer dependencies
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENGLISH_ROOTS = [ROOT / "foundation", *[ROOT / f"year{n}" for n in range(1, 11)]]

RUNTIME_SCRIPT = re.compile(
    r'<script\b[^>]*\bsrc=["\'][^"\']*'
    r'(?:year\d+-(?:maths|science|english)-(?:render|topic)|topic-modules-render|lesson-render|lower-materials-render|foundation-[^"\']*render)\.js'
    r'[^"\']*["\'][^>]*>\s*</script>',
    re.I,
)

SECTION_RE = re.compile(
    r'<section\s+class=["\']curriculum-topic-section(?:\s+teacher-resource)?["\'](?P<attrs>[^>]*)>'
    r'\s*<h2>(?P<title>.*?)</h2>(?P<body>.*?)</section>',
    re.I | re.S,
)


def summary_title(title: str, first: bool) -> str:
    plain = re.sub(r'<[^>]+>', ' ', title)
    plain = re.sub(r'\s+', ' ', plain).strip()
    if first or re.search(r'core concepts|outcome overview|learning', plain, re.I):
        return "What students learn"
    return plain


def convert_sections(source: str) -> str:
    seen = 0

    def repl(match: re.Match[str]) -> str:
        nonlocal seen
        seen += 1
        title = match.group('title')
        body = match.group('body').strip()
        summary = summary_title(title, seen == 1)
        open_attr = ' open' if seen in (1, 2, 3) else ''
        # Retain the descriptive H2 inside the panel for scanability and SEO.
        return (
            f'<details class="curriculum-topic-section"{open_attr}>'
            f'<summary><strong>{summary}</strong></summary>'
            f'<div class="curriculum-detail-body"><h2>{title}</h2>{body}</div>'
            f'</details>'
        )

    return SECTION_RE.sub(repl, source)


def normalize_teacher_link(source: str) -> str:
    # Legacy central live renderers and PDF slide links are replaced by the
    # canonical per-topic fixed viewer. The viewer is generated for Years 8–10
    # and already exists for Foundation–Year 7.
    source = re.sub(
        r'href=["\'][^"\']*/worksheets/(?:foundation|year\d+)/english/teacher-slides/live\.html\?code=[^"\']+["\']',
        'href="teacher-slides/"',
        source,
        flags=re.I,
    )
    source = re.sub(
        r'href=["\'][^"\']*/worksheets/(?:foundation|year\d+)/english/teacher-slides/[^"\']+\.(?:pdf|pptx)[^"\']*["\']',
        'href="teacher-slides/"',
        source,
        flags=re.I,
    )
    return source


def ensure_static_heading(source: str) -> str:
    if re.search(r'What students learn|Key concept|Learning intention|Learning goal', source, re.I):
        return source
    # Science Inquiry pages already use details. Make the first summary satisfy
    # the static content detector without changing the authored body.
    return re.sub(
        r'(<summary><strong>)(Core concepts[^<]*)(</strong></summary>)',
        r'\1What students learn — \2\3',
        source,
        count=1,
        flags=re.I,
    )


def normalize_page(path: Path, english: bool) -> bool:
    source = path.read_text(encoding='utf-8', errors='replace')
    output = convert_sections(source)
    output = ensure_static_heading(output)
    if english:
        output = normalize_teacher_link(output)
        output = RUNTIME_SCRIPT.sub('', output)
    if output != source:
        path.write_text(output, encoding='utf-8')
        return True
    return False


def main() -> None:
    changed: list[str] = []
    for year_root in ENGLISH_ROOTS:
        folder = year_root / 'english'
        if not folder.is_dir():
            continue
        for page in sorted(folder.glob('ac9e*/index.html')):
            if normalize_page(page, english=True):
                changed.append(page.relative_to(ROOT).as_posix())

    science = ROOT / 'year10' / 'science'
    if science.is_dir():
        for page in sorted(science.glob('ac9s10i*/index.html')):
            if normalize_page(page, english=False):
                changed.append(page.relative_to(ROOT).as_posix())

    print(f'Normalized static architecture for {len(changed)} topic pages.')
    for item in changed:
        print(item)


if __name__ == '__main__':
    main()
