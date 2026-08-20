#!/usr/bin/env python3
"""Repair public HTML indexing signals lost during static migrations.

The validator remains strict. This repair pass only adds missing GA4/AdSense
loaders to genuinely indexable public pages, restores required legacy aliases,
and repairs a small set of known Search Console regression snippets.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GA_ID = "G-8P22BET45N"
ADSENSE_CLIENT = "ca-pub-7734963540104771"
FUNCTIONAL = {"result", "results", "review", "retake", "teacher-slides", "teacher-deck"}
SKIP_PARTS = {".git", "node_modules", "playwright-report", "test-results"}

GA = f'''\n<!-- Google Analytics -->\n<script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){{dataLayer.push(arguments);}}\n  gtag('js', new Date());\n  gtag('config', '{GA_ID}');\n</script>\n'''
ADS_LOADER = f'''\n<!-- Google AdSense -->\n<script async src="https://pagead2.googlesyndication.com/pagead/js?client={ADSENSE_CLIENT}" crossorigin="anonymous"></script>\n'''
ADS_META = f'<meta name="google-adsense-account" content="{ADSENSE_CLIENT}">\n'

REQUIRED_ALIASES = {
    "foundation/Maths/foundation-days-of-the-week-and-daily-routines.html":
        "/foundation/maths/foundation-days-of-the-week-and-daily-routines.html",
    "foundation/Maths/foundation-data-collection-sorting-and-comparing-activities.html":
        "/foundation/maths/ac9mfst01-collect-sort-and-compare-data-represented-by-objects-and-images/",
    "quiz/grade-k/math/AC9MFN01/index.html":
        "/foundation/maths/ac9mfn01-name-represent-and-order-numbers-including-zero-to-at-least/",
}

REGRESSION_MARKERS = {
    "quiz/year-10/science/ac9s10i03/test/index.html":
        "Calibration and instrument limits affect measurement quality.",
    "quiz/year-8/math/ac9m8n01/test/index.html":
        "Irrational numbers have decimal representations that are non-terminating, non-repeating.",
    "quiz/year-9/science/ac9s9h03/test/index.html":
        "Adoption of scientific practices can depend on trust, access, cost, values and policy.",
}


def inject_before_head_close(source: str, snippet: str) -> str:
    match = re.search(r"</head\s*>", source, re.I)
    if not match:
        raise ValueError("missing </head>")
    return source[: match.start()] + snippet + source[match.start():]


def is_noindex(source: str) -> bool:
    match = re.search(
        r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)',
        source,
        re.I,
    )
    return bool(match and "noindex" in match.group(1).lower())


def is_functional(path: Path) -> bool:
    relative = path.relative_to(ROOT)
    return relative.as_posix() == "offline.html" or bool(set(relative.parts) & FUNCTIONAL)


def alias_html(target: str) -> str:
    return f'''<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <meta http-equiv="refresh" content="0; url={target}">
  <link rel="canonical" href="https://skillrhub.com{target}">
  <title>Moved | SkillrHub</title>
</head>
<body>
  <p>This page has moved. <a href="{target}">Continue to the current SkillrHub page</a>.</p>
</body>
</html>
'''


def insert_visible_review_note(source: str, marker: str) -> str:
    if marker in source:
        return source
    note = f'<p class="intro-text"><strong>Review focus:</strong> {marker}</p>'
    # Prefer to keep the note in the start card, immediately after the existing intro.
    intro = re.search(r'(<p class="intro-text"[^>]*>.*?</p>)', source, re.I | re.S)
    if intro:
        return source[: intro.end()] + note + source[intro.end():]
    main = re.search(r'<main\b[^>]*>', source, re.I)
    if main:
        return source[: main.end()] + note + source[main.end():]
    return source


def main() -> None:
    changed = 0
    created = 0

    # Restore only the required legacy redirects that are currently absent.
    for relative, target in REQUIRED_ALIASES.items():
        path = ROOT / relative
        if path.exists():
            continue
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(alias_html(target), encoding="utf-8")
        created += 1
        print(f"created alias: {relative}")

    # Repair public indexable HTML site-wide. Noindex and functional routes are untouched.
    for path in sorted(ROOT.rglob("*.html")):
        if set(path.parts) & SKIP_PARTS or is_functional(path):
            continue
        source = path.read_text(encoding="utf-8", errors="replace")
        if is_noindex(source):
            continue
        original = source

        if GA_ID not in source or "googletagmanager.com/gtag/js" not in source:
            try:
                source = inject_before_head_close(source, GA)
            except ValueError:
                continue
        if ADSENSE_CLIENT not in source:
            source = inject_before_head_close(source, "\n" + ADS_META)
        if "pagead2.googlesyndication.com/pagead/js" not in source:
            source = inject_before_head_close(source, ADS_LOADER)

        relative = path.relative_to(ROOT).as_posix()
        marker = REGRESSION_MARKERS.get(relative)
        if marker:
            source = insert_visible_review_note(source, marker)

        if source != original:
            path.write_text(source, encoding="utf-8")
            changed += 1
            print(relative)

    print(f"SEO repair updated {changed} public pages and created {created} legacy aliases.")


if __name__ == "__main__":
    main()
