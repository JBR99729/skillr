#!/usr/bin/env python3
"""One-time targeted repair for tracking tags lost during static curriculum migration.

This script is deliberately NOT a site-wide rewriter. It only touches the five
migration cohorts known to have failed SEO validation on 2026-08-17, and only
when a page is missing the required GA4 or AdSense loader.
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GA_ID = "G-8P22BET45N"
ADSENSE_CLIENT = "ca-pub-7734963540104771"

TARGET_GLOBS = (
    "foundation/maths/*/index.html",
    "year3/maths/*/index.html",
    "year8/science/*/index.html",
    "year9/science/*/index.html",
    "year10/science/*/index.html",
)

GA = f'''\n<!-- Google Analytics -->\n<script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){{dataLayer.push(arguments);}}\n  gtag('js', new Date());\n  gtag('config', '{GA_ID}');\n</script>\n'''

ADS_LOADER = f'''\n<!-- Google AdSense -->\n<script async src="https://pagead2.googlesyndication.com/pagead/js?client={ADSENSE_CLIENT}" crossorigin="anonymous"></script>\n'''
ADS_META = f'<meta name="google-adsense-account" content="{ADSENSE_CLIENT}">\n'


def inject_before_head_close(source: str, snippet: str) -> str:
    marker = "</head>"
    if marker not in source.lower():
        raise ValueError("missing </head>")
    index = source.lower().index(marker)
    return source[:index] + snippet + source[index:]


def main() -> None:
    targets: set[Path] = set()
    for pattern in TARGET_GLOBS:
        targets.update(ROOT.glob(pattern))

    changed = 0
    for path in sorted(targets):
        source = path.read_text(encoding="utf-8")
        original = source

        if GA_ID not in source or "googletagmanager.com/gtag/js" not in source:
            source = inject_before_head_close(source, GA)

        if ADSENSE_CLIENT not in source:
            source = inject_before_head_close(source, "\n" + ADS_META)
        if "pagead2.googlesyndication.com/pagead/js" not in source:
            source = inject_before_head_close(source, ADS_LOADER)

        if source != original:
            path.write_text(source, encoding="utf-8")
            changed += 1
            print(path.relative_to(ROOT))

    print(f"Targeted tracking repair updated {changed} curriculum topic pages.")


if __name__ == "__main__":
    main()
