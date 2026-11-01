#!/usr/bin/env python3
"""Refresh legacy SkillrHub topic and subject pages without replacing authored lessons.

Run on skillr-dev: python scripts/refresh_existing_question_bank_pages.py
Only pages containing existing practice + test routes are upgraded. Year 1 Maths
reference pages and already upgraded pages are deliberately untouched.
"""
from __future__ import annotations

import html
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MARKER = "skillr-question-bank-pathway:v1"
CODE_RE = re.compile(r"AC9[A-Z0-9]+", re.I)
LINK_RE = re.compile(r'href=["\']([^"\']+)["\']', re.I)
SUBJECTS = {"maths": "Maths", "english": "English", "science": "Science"}
YEAR_FOLDERS = ["foundation"] + [f"year{n}" for n in range(1, 11)]


def year_label(folder: str) -> str:
    return "Foundation" if folder == "foundation" else f"Year {folder[4:]}"


def links_for(source: str, year: str, subject: str, code: str) -> tuple[str, str] | None:
    # Use the actual existing linked routes, not invented assessment URLs.
    links = [html.unescape(value) for value in LINK_RE.findall(source)]
    practice = next((value for value in links if re.search(r"/quiz/[^\s\"']+/" + re.escape(code.lower()) + r"/practice/?", value, re.I)), None)
    test = next((value for value in links if re.search(r"/quiz/[^\s\"']+/" + re.escape(code.lower()) + r"/test/?", value, re.I)), None)
    return (practice, test) if practice and test else None


def teach_link(source: str) -> str | None:
    links = [html.unescape(value) for value in LINK_RE.findall(source)]
    return next((value for value in links if "teacher-slides/" in value and not value.startswith("#")), None)


def update_topic(path: Path, year: str, subject: str) -> tuple[bool, str | None]:
    source = path.read_text(encoding="utf-8")
    code_match = CODE_RE.search(path.parent.name)
    if not code_match:
        return False, None
    code = code_match.group().upper()
    if (year == "year1" and subject == "maths") or MARKER in source or "topic-learning-page" in source:
        return False, code
    routes = links_for(source, year, subject, code)
    if not routes:
        return False, code
    # Respect authored lesson, canonical URL, existing source evidence and curriculum mapping.
    practice, test = routes
    slides = teach_link(source)
    slide_action = (f'<a href="{html.escape(slides, quote=True)}">Classroom View</a>' if slides else "")
    block = (
        f'<!-- {MARKER} -->\n'
        '<section class="bank-learning-path" aria-label="Learn and practise this topic">'
        '<p class="bank-learning-path__eyebrow">Your learning pathway</p>'
        '<h2>Learn the idea. Try it. Check your progress.</h2>'
        '<p>Start with the short lesson below. Practise one skill at a time, then try the topic test when you feel ready.</p>'
        '<nav class="bank-learning-path__actions" aria-label="Topic activities">'
        '<a href="#topic-guide">1. Learn the idea</a>'
        f'<a href="{html.escape(practice, quote=True)}">2. Practise</a>'
        f'<a href="{html.escape(test, quote=True)}">3. Check with a test</a>'
        f'{slide_action}</nav>'
        '<p class="bank-learning-path__note">Try a question, check the feedback, and have another go. Every step counts.</p>'
        '</section>\n'
    )
    # Insert directly above the topic lesson; not above the title or navigation.
    point = re.search(r'<details\b[^>]*\bid=["\']topic-guide["\']', source, re.I)
    if point is None:
        point = re.search(r'<section\b[^>]*\bid=["\']topic-guide["\']', source, re.I)
    if point is None:
        return False, code
    source = source[:point.start()] + block + source[point.start():]
    css = '<link rel="stylesheet" href="/assets/css/question-bank-pathway.css?v=1">'
    source = re.sub(r'</head>', css + '\n</head>', source, count=1, flags=re.I)
    path.write_text(source, encoding="utf-8")
    return True, code


def update_hub(path: Path, year: str, subject: str, topics: list[tuple[str, Path]]) -> bool:
    if not path.is_file() or not topics:
        return False
    source = path.read_text(encoding="utf-8")
    if MARKER in source or "year1-learning-hub" in source:
        return False
    # Only create links to real existing topic files. Never invent quiz or test claims.
    cards = []
    for code, topic in sorted(set(topics)):
        data = topic.read_text(encoding="utf-8")
        title_match = re.search(r"<h1[^>]*>(.*?)</h1>", data, re.I | re.S)
        title = re.sub(r"<[^>]+>", "", title_match.group(1)).strip() if title_match else code
        title = html.unescape(re.sub(r"\s+", " ", title))
        url = "/" + topic.parent.relative_to(ROOT).as_posix() + "/"
        routes = links_for(data, year, subject, code)
        actions = f'<a href="{html.escape(url, quote=True)}">Learn topic</a>'
        if routes:
            actions += f'<a href="{html.escape(routes[0], quote=True)}">Practice</a><a href="{html.escape(routes[1], quote=True)}">Test</a>'
        cards.append(f'<article class="bank-hub-topic"><p>{html.escape(code)}</p><h3><a href="{html.escape(url, quote=True)}">{html.escape(title)}</a></h3><nav>{actions}</nav></article>')
    section = (
        f'<!-- {MARKER} -->'
        '<section class="bank-hub" id="learning-topics" aria-labelledby="bank-hub-heading">'
        f'<p class="bank-learning-path__eyebrow">{html.escape(year_label(year))} · {html.escape(SUBJECTS[subject])}</p>'
        '<h2 id="bank-hub-heading">Choose a topic to learn</h2>'
        '<p>Build confidence with a short explanation, practise the skill, and then check what you know.</p>'
        f'<div class="bank-hub-grid">{"".join(cards)}</div></section>'
    )
    match = re.search(r'</main>', source, re.I)
    if not match:
        return False
    source = source[:match.start()] + section + source[match.start():]
    source = re.sub(r'</head>', '<link rel="stylesheet" href="/assets/css/question-bank-pathway.css?v=1">\n</head>', source, count=1, flags=re.I)
    path.write_text(source, encoding="utf-8")
    return True


def main() -> None:
    touched = []
    grouped: dict[tuple[str, str], list[tuple[str, Path]]] = defaultdict(list)
    for year in YEAR_FOLDERS:
        for subject in SUBJECTS:
            directory = ROOT / year / subject
            if not directory.is_dir():
                continue
            for topic in sorted(directory.glob("ac9*/index.html")):
                code_match = CODE_RE.search(topic.parent.name)
                if not code_match:
                    continue
                code = code_match.group().upper()
                grouped[(year, subject)].append((code, topic))
                changed, _ = update_topic(topic, year, subject)
                if changed:
                    touched.append(topic.relative_to(ROOT).as_posix())
    for (year, subject), topics in sorted(grouped.items()):
        for hub in (ROOT / year / subject / "index.html", ROOT / year / "curriculum" / subject / "index.html"):
            if update_hub(hub, year, subject, topics):
                touched.append(hub.relative_to(ROOT).as_posix())
    print(f"Refreshed {len(touched)} existing pages; protected reference and already-updated pages.")
    for page in touched:
        print(page)


if __name__ == "__main__":
    main()
