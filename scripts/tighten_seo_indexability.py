#!/usr/bin/env python3
"""Make indexing intent explicit and repair essential SEO metadata."""
from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
SKIP_PARTS = {"result", "results", "review", "retake", "teacher-slides"}
GA_ID = "G-8P22BET45N"
ADSENSE_CLIENT = "ca-pub-7734963540104771"
GA_SNIPPET = f'''<script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag("js",new Date());gtag("config","{GA_ID}");</script>'''
ADSENSE_SNIPPET = f'''<meta name="google-adsense-account" content="{ADSENSE_CLIENT}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE_CLIENT}" crossorigin="anonymous"></script>'''


def route(path: Path) -> str:
    value = path.as_posix()
    if value == "index.html":
        return "/"
    if value.endswith("/index.html"):
        return "/" + value[: -len("index.html")]
    return "/" + value


def canonical(source: str) -> str | None:
    patterns = (
        r'<link[^>]+rel=["\'][^"\']*canonical[^"\']*["\'][^>]+href=["\']([^"\']*)',
        r'<link[^>]+href=["\']([^"\']*)["\'][^>]+rel=["\'][^"\']*canonical',
    )
    for pattern in patterns:
        match = re.search(pattern, source, re.I)
        if match:
            return match.group(1)
    return None


def title_from_page(source: str, path: Path) -> str:
    heading = re.search(r"<h1[^>]*>(.*?)</h1>", source, re.I | re.S)
    text = re.sub(r"<[^>]+>", " ", heading.group(1)) if heading else ""
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        parts = [part for part in path.parts if part != "index.html"]
        text = " ".join(parts[-4:]).replace("-", " ").title()
    return f"{text} | SkillrHub"


def upsert_robots(source: str, value: str) -> str:
    pattern = r'<meta[^>]+name=["\']robots["\'][^>]*>'
    tag = f'<meta name="robots" content="{value}">'
    return re.sub(pattern, tag, source, count=1, flags=re.I) if re.search(pattern, source, re.I) else source.replace("<head>", f"<head>{tag}", 1)


def main() -> None:
    changed = {"aliases_noindexed": 0, "canonicals_repaired": 0, "titles_added": 0, "analytics_added": 0, "adsense_added": 0}
    for absolute in sorted(ROOT.rglob("*.html")):
        if ".git" in absolute.parts:
            continue
        relative = absolute.relative_to(ROOT)
        if set(relative.parts) & SKIP_PARTS or relative.as_posix() == "offline.html":
            continue
        source = absolute.read_text(encoding="utf-8", errors="replace")
        updated = source
        url = route(relative)
        canonical_url = canonical(updated)
        canonical_path = urlparse(canonical_url).path if canonical_url else None

        if canonical_url == "":
            updated = re.sub(
                r'(<link[^>]+rel=["\'][^"\']*canonical[^"\']*["\'][^>]+href=["\'])[^"\']*',
                rf"\g<1>{SITE}{url}",
                updated,
                count=1,
                flags=re.I,
            )
            changed["canonicals_repaired"] += 1
        elif canonical_path and canonical_path.rstrip("/") != url.rstrip("/"):
            before = updated
            updated = upsert_robots(updated, "noindex, follow")
            if updated != before:
                changed["aliases_noindexed"] += 1

        if not re.search(r"<title[^>]*>\s*[^<]+\s*</title>", updated, re.I | re.S):
            title = title_from_page(updated, relative)
            updated = updated.replace("<head>", f"<head><title>{title}</title>", 1)
            changed["titles_added"] += 1

        robots = re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)', updated, re.I)
        is_public = not (robots and "noindex" in robots.group(1).lower())
        if is_public and not (GA_ID in updated and "googletagmanager.com/gtag/js" in updated):
            updated = updated.replace("</head>", f"{GA_SNIPPET}</head>", 1)
            changed["analytics_added"] += 1
        if is_public and not (ADSENSE_CLIENT in updated and "pagead2.googlesyndication.com/pagead/js" in updated):
            updated = updated.replace("</head>", f"{ADSENSE_SNIPPET}</head>", 1)
            changed["adsense_added"] += 1

        if updated != source:
            absolute.write_text(updated, encoding="utf-8")

    print(changed)


if __name__ == "__main__":
    main()
