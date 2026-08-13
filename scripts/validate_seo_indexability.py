#!/usr/bin/env python3
"""Fail when a public canonical HTML route lacks core indexing signals."""
from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
FUNCTIONAL = {"result", "results", "review", "retake", "teacher-slides"}
GA_ID = "G-8P22BET45N"
ADSENSE_CLIENT = "ca-pub-7734963540104771"


def route(path: Path) -> str:
    value = path.as_posix()
    if value == "index.html":
        return "/"
    if value.endswith("/index.html"):
        return "/" + value[: -len("index.html")]
    return "/" + value


def main() -> None:
    sitemap_urls: set[str] = set()
    for sitemap in ROOT.glob("sitemap-*.xml"):
        for location in ET.parse(sitemap).getroot().iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc"):
            sitemap_urls.add(urlparse(location.text or "").path)

    errors: list[str] = []
    public_count = 0
    excluded_count = 0
    for absolute in sorted(ROOT.rglob("*.html")):
        if ".git" in absolute.parts:
            continue
        relative = absolute.relative_to(ROOT)
        source = absolute.read_text(encoding="utf-8", errors="replace")
        url = route(relative)
        robots = re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)', source, re.I)
        noindex = bool(robots and "noindex" in robots.group(1).lower())
        functional = relative.as_posix() == "offline.html" or bool(set(relative.parts) & FUNCTIONAL)
        if noindex or functional:
            excluded_count += 1
            continue

        public_count += 1
        title = re.search(r"<title[^>]*>(.*?)</title>", source, re.I | re.S)
        description = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)', source, re.I)
        canonical = None
        for pattern in (
            r'<link[^>]+rel=["\'][^"\']*canonical[^"\']*["\'][^>]+href=["\']([^"\']+)',
            r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\'][^"\']*canonical',
        ):
            match = re.search(pattern, source, re.I)
            if match:
                canonical = urlparse(match.group(1)).path
                break
        if not title or not re.sub(r"<[^>]+>", "", title.group(1)).strip():
            errors.append(f"{url}: missing title")
        if not description or len(description.group(1).strip()) < 30:
            errors.append(f"{url}: missing or short description")
        if not canonical:
            errors.append(f"{url}: missing canonical")
        elif canonical.rstrip("/") != url.rstrip("/"):
            errors.append(f"{url}: canonical points to {canonical} but page is indexable")
        if url not in sitemap_urls:
            errors.append(f"{url}: missing from XML sitemap")
        if GA_ID not in source or "googletagmanager.com/gtag/js" not in source:
            errors.append(f"{url}: missing Google Analytics loader or property ID")
        if ADSENSE_CLIENT not in source or "pagead2.googlesyndication.com/pagead/js" not in source:
            errors.append(f"{url}: missing AdSense account or Auto ads loader")

    if errors:
        print("\n".join(errors))
        print(f"FAIL: {len(errors)} SEO indexability errors across {public_count} public pages.")
        sys.exit(1)
    print(f"PASS: {public_count} public pages have complete indexability, Google Analytics and AdSense Auto ads signals; {excluded_count} utility or alias pages are intentionally excluded.")


if __name__ == "__main__":
    main()
