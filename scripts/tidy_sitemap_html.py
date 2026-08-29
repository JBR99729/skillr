#!/usr/bin/env python3
"""Write a concise human-readable sitemap for people, not crawlers.

Deep topic discovery belongs in the XML sitemaps and year/subject hubs. This page
keeps only the main F–10 curriculum entrances, resource collections, curriculum
mapping pages and help links so it stays useful instead of becoming a URL dump.
"""
from __future__ import annotations

import html
import json
import re
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://skillrhub.com"
YEARS = [("foundation", "Foundation")] + [(f"year{i}", f"Year {i}") for i in range(1, 11)]
SUBJECTS = [("maths", "Maths"), ("science", "Science"), ("english", "English")]


def file_for_route(route: str) -> Path:
    relative = route.lstrip("/")
    if not relative:
        return ROOT / "index.html"
    if route.endswith("/"):
        return ROOT / relative / "index.html"
    return ROOT / relative


def robots_content(source: str) -> str:
    for pattern in (
        r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)',
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']robots["\']',
    ):
        match = re.search(pattern, source, re.I)
        if match:
            return re.sub(r"\s+", "", match.group(1).lower())
    return ""


def normalise_route(value: str) -> str:
    parsed = urlparse(html.unescape(value))
    path = unquote(parsed.path or "/")
    if not path.startswith("/"):
        path = "/" + path
    if path.endswith("/index.html"):
        path = path[: -len("index.html")]
    return path.rstrip("/") or "/"


def canonical_path(source: str) -> str | None:
    for pattern in (
        r'<link[^>]+rel=["\'][^"\']*canonical[^"\']*["\'][^>]+href=["\']([^"\']+)',
        r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\'][^"\']*canonical',
    ):
        match = re.search(pattern, source, re.I)
        if match:
            return normalise_route(match.group(1))
    return None


def usable(route: str) -> bool:
    page = file_for_route(route)
    if not page.is_file():
        return False
    source = page.read_text(encoding="utf-8", errors="replace")
    return "noindex" not in robots_content(source) and canonical_path(source) == normalise_route(route)


def link(route: str, label: str, *, required: bool = False) -> str:
    if not usable(route):
        if required:
            raise SystemExit(f"Required human sitemap route is unavailable or noncanonical: {route}")
        return ""
    return f'<li><a href="{html.escape(route, quote=True)}">{html.escape(label)}</a></li>'


def section(title: str, items: list[str]) -> str:
    links = "".join(item for item in items if item)
    if not links:
        return ""
    return f'<section class="sitemap-section"><h2>{html.escape(title)}</h2><ul>{links}</ul></section>'


def main() -> None:
    blocks: list[str] = []
    blocks.append(section("Start here", [
        link("/", "Foundation to Year 10 learning resources", required=True),
        link("/worksheets/", "Free worksheets and homework", required=True),
        link("/blogs/", "Australian Curriculum guides and learning articles", required=True),
        link("/updates.html", "Latest SkillrHub updates", required=True),
        link("/why-skillrhub.html", "Why SkillrHub"),
        link("/how-to-use-skillr.html", "How to use SkillrHub"),
    ]))

    for slug, year_label in YEARS:
        items = [
            link(f"/{slug}/curriculum/", f"{year_label} Australian Curriculum", required=True),
        ]
        for subject_slug, subject_label in SUBJECTS:
            items.append(link(
                f"/{slug}/curriculum/{subject_slug}/",
                f"{year_label} {subject_label} curriculum resources",
                required=True,
            ))
        blocks.append(section(year_label, items))

    mapping_items = [
        link("/nsw/mathematics/", "NSW Mathematics curriculum mapping"),
        link("/nsw/stage-5/mathematics/", "NSW Stage 5 Mathematics mapping"),
        link("/victoria/mathematics/", "Victorian Curriculum Mathematics mapping"),
        link("/victoria/year-10/mathematics/", "Victorian Year 10 Mathematics mapping"),
    ]
    blocks.append(section("Curriculum mappings", mapping_items))

    blocks.append(section("Help and information", [
        link("/faq.html", "Frequently asked questions"),
        link("/about.html", "About SkillrHub"),
        link("/contact.html", "Contact SkillrHub"),
        link("/support-skillrhub.html", "Support SkillrHub"),
        link("/privacy-policy.html", "Privacy policy"),
    ]))

    schema = json.dumps({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "SkillrHub Australian Curriculum resources sitemap",
        "url": f"{BASE}/sitemap.html",
        "description": "Browse Foundation to Year 10 Australian Curriculum Maths, Science and English resource hubs, worksheets, guides and curriculum mappings.",
    }, separators=(",", ":"))

    document = f'''<!DOCTYPE html>
<html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Australian Curriculum F–10 Resources Sitemap | SkillrHub</title>
<meta name="description" content="Browse SkillrHub Foundation to Year 10 Australian Curriculum Maths, Science and English hubs, worksheets, guides and curriculum mappings.">
<meta name="robots" content="index,follow"><link rel="canonical" href="{BASE}/sitemap.html">
<meta property="og:title" content="SkillrHub Australian Curriculum Resources Sitemap"><meta property="og:description" content="Find Foundation to Year 10 Australian Curriculum Maths, Science and English learning resources."><meta property="og:type" content="website"><meta property="og:url" content="{BASE}/sitemap.html">
<link rel="manifest" href="/manifest.webmanifest"><link rel="stylesheet" href="/style.css"><script type="application/ld+json">{schema}</script><meta name="google-adsense-account" content="ca-pub-7734963540104771"><script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag("js",new Date());gtag("config","G-8P22BET45N");</script><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script></head>
<body><div class="container"><nav class="main-nav" aria-label="Primary"><a href="/">Home</a><a href="/blogs/">Blogs</a><a href="/worksheets/">Worksheets</a><a href="/updates.html">Updates</a><a href="/sitemap.html" aria-current="page">Sitemap</a><a href="/about.html">About</a></nav><main><header class="sitemap-hero"><p class="eyebrow">Explore SkillrHub</p><h1>Australian Curriculum learning resources sitemap</h1><p>Jump to a Foundation–Year 10 Maths, Science or English curriculum hub, worksheets, guides or curriculum mappings. Individual topic pages are linked from each subject hub so this directory stays quick to scan.</p></header><div class="sitemap-directory">{''.join(blocks)}</div></main><footer><p>&copy; 2026 Skillr Education. All rights reserved.</p><p><a href="/privacy-policy.html">Privacy</a> · <a href="/contact.html">Contact</a></p></footer></div><script src="/pwa-register.js?v=7"></script></body></html>'''

    output = ROOT / "sitemap.html"
    output.write_text(document, encoding="utf-8")
    print(f"Wrote concise human sitemap with {sum(block.count('<li>') for block in blocks)} curated links.")


if __name__ == "__main__":
    main()
