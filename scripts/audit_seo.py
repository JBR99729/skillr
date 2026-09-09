#!/usr/bin/env python3
"""Report repository SEO health without blocking deployments.

Checks the authoritative sitemap inventory for common regressions: missing local
HTML, noindex pages accidentally listed in sitemaps, missing/mismatched canonical
tags, missing title/description/lang/viewport, invalid JSON-LD, duplicate sitemap
URLs, and internal HTTP links to skillrhub.com. The script intentionally exits 0
so it can be introduced safely; warnings are visible in GitHub Actions logs.
"""
from __future__ import annotations

import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
HOST = "skillrhub.com"

TITLE_RE = re.compile(r"<title>(.*?)</title>", re.I | re.S)
DESC_RE = re.compile(r'<meta\b[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\']', re.I)
CANONICAL_RE = re.compile(r'<link\b[^>]*rel=["\'][^"\']*canonical[^"\']*["\'][^>]*href=["\']([^"\']+)["\']', re.I)
NOINDEX_RE = re.compile(r'<meta\b[^>]*name=["\']robots["\'][^>]*content=["\'][^"\']*noindex', re.I)
LANG_RE = re.compile(r'<html\b[^>]*\blang=["\'][^"\']+["\']', re.I)
VIEWPORT_RE = re.compile(r'<meta\b[^>]*name=["\']viewport["\']', re.I)
JSONLD_RE = re.compile(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.I | re.S)
HTTP_INTERNAL_RE = re.compile(r'https?://(?:www\.)?skillrhub\.com', re.I)


def local_html(url: str) -> Path | None:
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.netloc != HOST:
        return None
    rel = unquote(parsed.path).lstrip("/")
    if not rel:
        path = ROOT / "index.html"
    elif parsed.path.endswith("/"):
        path = ROOT / rel / "index.html"
    else:
        path = ROOT / rel
    return path if path.is_file() and path.suffix.lower() in {".html", ".htm"} else None


def authoritative_urls() -> list[str]:
    index = ROOT / "sitemap.xml"
    root = ET.parse(index).getroot()
    urls: list[str] = []
    for loc in root.findall(".//{*}sitemap/{*}loc"):
        if not loc.text:
            continue
        child = ROOT / Path(urlparse(loc.text.strip()).path).name
        if not child.is_file():
            print(f"WARN missing child sitemap: {child.name}")
            continue
        child_root = ET.parse(child).getroot()
        for url_loc in child_root.findall(".//{*}url/{*}loc"):
            if url_loc.text:
                urls.append(url_loc.text.strip())
    return urls


def main() -> None:
    warnings: list[str] = []
    urls = authoritative_urls()
    duplicates = sorted({u for u in urls if urls.count(u) > 1})
    for url in duplicates:
        warnings.append(f"duplicate sitemap URL: {url}")

    for url in sorted(set(urls)):
        page = local_html(url)
        if page is None:
            warnings.append(f"sitemap URL has no local HTML: {url}")
            continue
        source = page.read_text(encoding="utf-8", errors="ignore")
        head = source[:30000]

        if NOINDEX_RE.search(head):
            warnings.append(f"noindex page listed in sitemap: {url}")
        if not TITLE_RE.search(head):
            warnings.append(f"missing title: {url}")
        if not DESC_RE.search(head):
            warnings.append(f"missing meta description: {url}")
        if not LANG_RE.search(head):
            warnings.append(f"missing html lang: {url}")
        if not VIEWPORT_RE.search(head):
            warnings.append(f"missing viewport: {url}")

        canonicals = CANONICAL_RE.findall(head)
        if len(canonicals) != 1:
            warnings.append(f"expected exactly one canonical ({len(canonicals)} found): {url}")
        else:
            canonical = canonicals[0].strip().rstrip("/")
            if canonical != url.rstrip("/"):
                warnings.append(f"canonical mismatch: {url} -> {canonicals[0].strip()}")

        for block in JSONLD_RE.findall(source):
            try:
                json.loads(block)
            except json.JSONDecodeError as exc:
                warnings.append(f"invalid JSON-LD in {page.relative_to(ROOT)}: {exc.msg}")

        for match in HTTP_INTERNAL_RE.finditer(source):
            token = match.group(0).lower()
            if token.startswith("http://"):
                warnings.append(f"internal HTTP URL in {page.relative_to(ROOT)}")
                break

    print(f"SEO audit checked {len(set(urls))} authoritative sitemap URL(s).")
    if warnings:
        print(f"SEO audit found {len(warnings)} warning(s):")
        for warning in warnings:
            print(f"WARN {warning}")
    else:
        print("SEO audit found no warnings in the authoritative sitemap inventory.")

    print("Report-only mode: warnings do not block deployment.")


if __name__ == "__main__":
    main()
