#!/usr/bin/env python3
"""Fail when a public canonical HTML route lacks core indexing signals."""
from __future__ import annotations

import html
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
FUNCTIONAL = {"result", "results", "review", "retake", "teacher-slides", "teacher-deck"}
GA_ID = "G-8P22BET45N"
ADSENSE_CLIENT = "ca-pub-7734963540104771"
PROTECTED_PUBLIC_ROUTES = {"/quiz/daily-drills/"}
REQUIRED_ALIAS_REDIRECTS = {
    "/quiz/year-2/math/addition-substraction-daily/":
        "/quiz/year-2/daily-drills/math/addition-subtraction-strategies/",
}


def route(path: Path) -> str:
    value = path.as_posix()
    if value == "index.html":
        return "/"
    if value.endswith("/index.html"):
        return "/" + value[: -len("index.html")]
    return "/" + value


def normalise_route(value: str) -> str:
    path = urlparse(html.unescape(value)).path or "/"
    if not path.startswith("/"):
        path = "/" + path
    if path.endswith("/index.html"):
        path = path[: -len("index.html")]
    return path


def canonical_path(source: str) -> str | None:
    for pattern in (
        r'<link[^>]+rel=["\'][^"\']*canonical[^"\']*["\'][^>]+href=["\']([^"\']+)',
        r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\'][^"\']*canonical',
    ):
        match = re.search(pattern, source, re.I)
        if match:
            return normalise_route(match.group(1))
    return None


def is_noindex(source: str) -> bool:
    robots = re.search(
        r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)',
        source,
        re.I,
    )
    return bool(robots and "noindex" in robots.group(1).lower())


def refresh_target(source: str) -> str | None:
    for pattern in (
        r'<meta[^>]+http-equiv=["\']refresh["\'][^>]+content=["\']([^"\']+)',
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+http-equiv=["\']refresh',
    ):
        match = re.search(pattern, source, re.I)
        if not match:
            continue
        refresh = re.fullmatch(r"\s*0(?:\.0+)?\s*;\s*url\s*=\s*(.+?)\s*", match.group(1), re.I)
        if refresh:
            return normalise_route(refresh.group(1))
    return None


def file_for_route(value: str) -> Path:
    path = normalise_route(value)
    relative = path.lstrip("/")
    if path.endswith("/"):
        return ROOT / relative / "index.html"
    return ROOT / relative


def main() -> None:
    sitemap_urls: set[str] = set()
    for sitemap in ROOT.glob("sitemap-*.xml"):
        for location in ET.parse(sitemap).getroot().iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc"):
            sitemap_urls.add(normalise_route(location.text or ""))

    errors: list[str] = []
    public_count = 0
    excluded_count = 0
    protected_seen: set[str] = set()
    aliases_seen: set[str] = set()

    for absolute in sorted(ROOT.rglob("*.html")):
        if set(absolute.parts) & {".git", "node_modules", "playwright-report", "test-results"}:
            continue
        relative = absolute.relative_to(ROOT)
        source = absolute.read_text(encoding="utf-8", errors="replace")
        url = route(relative)
        noindex = is_noindex(source)
        canonical = canonical_path(source)
        functional = relative.as_posix() == "offline.html" or bool(set(relative.parts) & FUNCTIONAL)

        if url in PROTECTED_PUBLIC_ROUTES:
            protected_seen.add(url)
            if noindex:
                errors.append(f"{url}: protected public hub must not be noindex")
            if functional:
                errors.append(f"{url}: protected public hub must not be treated as functional")

        expected_redirect = REQUIRED_ALIAS_REDIRECTS.get(url)
        if expected_redirect:
            aliases_seen.add(url)
            if not noindex:
                errors.append(f"{url}: legacy alias must be noindex")
            if not canonical or canonical.rstrip("/") != expected_redirect.rstrip("/"):
                errors.append(f"{url}: canonical must point to {expected_redirect}")
            refresh = refresh_target(source)
            if not refresh or refresh.rstrip("/") != expected_redirect.rstrip("/"):
                errors.append(f"{url}: zero-second refresh must point to {expected_redirect}")

            target_file = file_for_route(expected_redirect)
            if not target_file.is_file():
                errors.append(f"{url}: redirect target does not exist: {expected_redirect}")
            else:
                target_source = target_file.read_text(encoding="utf-8", errors="replace")
                target_canonical = canonical_path(target_source)
                if is_noindex(target_source):
                    errors.append(f"{url}: redirect target is noindex: {expected_redirect}")
                if not target_canonical or target_canonical.rstrip("/") != expected_redirect.rstrip("/"):
                    errors.append(f"{url}: redirect target is not self-canonical: {expected_redirect}")

        if noindex or functional:
            excluded_count += 1
            continue

        public_count += 1
        title = re.search(r"<title[^>]*>(.*?)</title>", source, re.I | re.S)
        description = re.search(
            r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)',
            source,
            re.I,
        )
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

    for missing in sorted(PROTECTED_PUBLIC_ROUTES - protected_seen):
        errors.append(f"{missing}: protected public hub file is missing")
    for missing in sorted(REQUIRED_ALIAS_REDIRECTS.keys() - aliases_seen):
        errors.append(f"{missing}: required legacy alias file is missing")

    if errors:
        print("\n".join(errors))
        print(f"FAIL: {len(errors)} SEO indexability errors across {public_count} public pages.")
        sys.exit(1)
    print(
        f"PASS: {public_count} public pages have complete indexability, "
        f"Google Analytics and AdSense Auto ads signals; {excluded_count} utility "
        "or alias pages are intentionally excluded."
    )


if __name__ == "__main__":
    main()
