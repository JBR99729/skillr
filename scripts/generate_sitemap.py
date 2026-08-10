#!/usr/bin/env python3
"""Generate clean XML and human-readable sitemaps from indexable HTML pages."""

from __future__ import annotations

import html
import re
import subprocess
from collections import defaultdict
from datetime import date
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://skillrhub.com"
SKIP = {
    "year1/maths/year-2-halves-quarters-and-eighths-in-everyday-life-activities-and-worksheets-ac9m2m02.html",
    "quiz/grade-k/math/vocabulary/voabulary/index.html",
    "quiz/year-2/math/addition-substraction-daily/index.html",
    "year2/maths/addition-substraction-daily/index.html",
}
SECTION_LABELS = {
    "foundation": "Foundation",
    "year1": "Year 1",
    "year2": "Year 2",
    "year3": "Year 3",
    "year4": "Year 4",
    "year5": "Year 5",
    "year6": "Year 6",
    "year7": "Year 7",
    "year8": "Year 8",
    "year9": "Year 9",
    "year10": "Year 10",
    "quiz": "Practice and quizzes",
    "worksheets": "Worksheets",
}


def route(path: Path) -> str:
    value = path.as_posix()
    if value == "index.html":
        return "/"
    if value.endswith("/index.html"):
        return "/" + value[: -len("index.html")]
    return "/" + value


def page_title(source: str, path: Path) -> str:
    for tag in ("h1", "title"):
        match = re.search(rf"<{tag}[^>]*>(.*?)</{tag}>", source, re.I | re.S)
        if match:
            text = re.sub(r"<[^>]+>", " ", match.group(1))
            text = html.unescape(re.sub(r"\s+", " ", text)).strip()
            text = re.sub(r"\s*[|–-]\s*(SkillrHub|Skillr Education)\s*$", "", text, flags=re.I)
            if text:
                return text
    return path.stem.replace("-", " ").title()


def is_indexable(source: str) -> bool:
    robots = re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)', source, re.I)
    return not robots or "noindex" not in robots.group(1).lower()


def last_modified(path: Path) -> str:
    try:
        value = subprocess.check_output(
            ["git", "log", "-1", "--format=%cs", "--", path.as_posix()],
            cwd=ROOT,
            text=True,
        ).strip()
        return value or date.today().isoformat()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return date.today().isoformat()


def main() -> None:
    pages = []
    seen = set()
    for absolute in sorted(ROOT.rglob("*.html")):
        if ".git" in absolute.parts:
            continue
        relative = absolute.relative_to(ROOT)
        if relative.as_posix() in SKIP:
            continue
        source = absolute.read_text(encoding="utf-8", errors="replace")
        if not is_indexable(source):
            continue
        url_path = route(relative)
        if url_path in seen:
            raise ValueError(f"Duplicate sitemap route: {url_path}")
        seen.add(url_path)
        pages.append((url_path, page_title(source, relative), last_modified(relative)))

    xml_lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url_path, _, modified in pages:
        encoded_path = quote(url_path, safe="/%-._~")
        xml_lines.extend(("  <url>", f"    <loc>{BASE}{encoded_path}</loc>", f"    <lastmod>{modified}</lastmod>", "  </url>"))
    xml_lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(xml_lines) + "\n", encoding="utf-8")

    sections = defaultdict(list)
    for item in pages:
        first = item[0].strip("/").split("/", 1)[0] or "site"
        sections[first].append(item)
    order = ["site", "foundation"] + [f"year{i}" for i in range(1, 11)] + ["quiz", "worksheets"]
    ordered = [key for key in order if key in sections] + sorted(set(sections) - set(order))
    groups = []
    for key in ordered:
        label = "Main pages" if key == "site" else SECTION_LABELS.get(key, key.replace("-", " ").title())
        links = "".join(
            f'<li><a href="{html.escape(url_path, quote=True)}">{html.escape(title)}</a></li>'
            for url_path, title, _ in sections[key]
        )
        groups.append(f'<section class="sitemap-section"><h2>{html.escape(label)}</h2><ul>{links}</ul></section>')
    document = f'''<!DOCTYPE html>
<html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Website Sitemap | SkillrHub</title><meta name="description" content="Browse SkillrHub learning pages by year level, curriculum topic, worksheet and quiz.">
<meta name="robots" content="index, follow"><link rel="canonical" href="{BASE}/sitemap.html"><link rel="stylesheet" href="/style.css"></head>
<body><div class="container"><nav class="main-nav"><a href="/">Home</a><a href="/sitemap.html" aria-current="page">Sitemap</a><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/how-to-use-skillr.html">User guide</a><a href="/privacy-policy.html">Privacy Policy</a></nav>
<nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Sitemap</li></ol></nav>
<main><h1>Website sitemap</h1><p>Find SkillrHub topic guides, worksheets and practice activities by section.</p>{''.join(groups)}</main>
<footer><p>&copy; 2026 Skillr Education. All rights reserved.</p></footer></div></body></html>'''
    (ROOT / "sitemap.html").write_text(document, encoding="utf-8")
    print(f"Updated sitemap.xml and sitemap.html with {len(pages)} indexable URLs.")


if __name__ == "__main__":
    main()
