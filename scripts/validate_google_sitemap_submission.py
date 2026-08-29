#!/usr/bin/env python3
"""Validate the sitemap.xml set intended for Google Search Console submission."""
from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://skillrhub.com"
NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
EXPECTED_CHILDREN = [
    "sitemap-site.xml",
    "sitemap-foundation.xml",
    *[f"sitemap-year{i}.xml" for i in range(1, 11)],
    "sitemap-worksheets.xml",
]
FORBIDDEN_URL_PARTS = (
    "/quiz/",
    "/teacher-slides/",
    "/result/",
    "/results/",
    "/review/",
    "/retake/",
)


def fail(errors: list[str]) -> None:
    if not errors:
        return
    print("\n".join(errors[:200]))
    if len(errors) > 200:
        print(f"... {len(errors) - 200} additional errors omitted")
    print(f"FAIL: {len(errors)} Google sitemap submission errors.")
    sys.exit(1)


def main() -> None:
    errors: list[str] = []
    root_file = ROOT / "sitemap.xml"
    tree = ET.parse(root_file)
    root = tree.getroot()
    expected_root_tag = f"{{{NS}}}sitemapindex"
    if root.tag != expected_root_tag:
        errors.append(f"sitemap.xml: expected sitemapindex, found {root.tag}")

    sitemap_tag = f"{{{NS}}}sitemap"
    loc_tag = f"{{{NS}}}loc"
    lastmod_tag = f"{{{NS}}}lastmod"
    child_names: list[str] = []
    all_urls: set[str] = set()

    for node in root.findall(sitemap_tag):
        loc = node.find(loc_tag)
        lastmod = node.find(lastmod_tag)
        raw = (loc.text or "").strip() if loc is not None else ""
        parsed = urlparse(raw)
        if parsed.scheme != "https" or parsed.netloc != "skillrhub.com":
            errors.append(f"sitemap.xml: unexpected child host: {raw}")
            continue
        name = Path(parsed.path).name
        child_names.append(name)
        child = ROOT / name
        if not child.is_file():
            errors.append(f"sitemap.xml: missing child file {name}")
            continue

        child_root = ET.parse(child).getroot()
        if child_root.tag != f"{{{NS}}}urlset":
            errors.append(f"{name}: expected urlset, found {child_root.tag}")
            continue

        child_dates: list[str] = []
        for url_node in child_root.findall(f"{{{NS}}}url"):
            url_loc = url_node.find(loc_tag)
            url_mod = url_node.find(lastmod_tag)
            url = (url_loc.text or "").strip() if url_loc is not None else ""
            url_parsed = urlparse(url)
            if url_parsed.scheme != "https" or url_parsed.netloc != "skillrhub.com":
                errors.append(f"{name}: unexpected URL host: {url}")
            if url_parsed.query or url_parsed.fragment:
                errors.append(f"{name}: query/fragment URL is not canonical: {url}")
            lowered = url_parsed.path.lower()
            if any(part in lowered for part in FORBIDDEN_URL_PARTS) or lowered.endswith("/teacher-slides.html"):
                errors.append(f"{name}: utility/noindex route leaked into Google sitemap: {url}")
            if url in all_urls:
                errors.append(f"{name}: duplicate URL across submitted child sitemaps: {url}")
            all_urls.add(url)
            if url_mod is not None and (url_mod.text or "").strip():
                child_dates.append((url_mod.text or "").strip())

        root_mod = (lastmod.text or "").strip() if lastmod is not None else ""
        if child_dates and root_mod != max(child_dates):
            errors.append(
                f"sitemap.xml: {name} lastmod {root_mod or '[missing]'} does not match newest child URL {max(child_dates)}"
            )

    if child_names != EXPECTED_CHILDREN:
        errors.append(
            "sitemap.xml: submitted child set/order is not the crawl-priority set; "
            f"found {child_names}, expected {EXPECTED_CHILDREN}"
        )
    if "sitemap-practice.xml" in child_names:
        errors.append("sitemap.xml: practice/test utility sitemap must remain outside the Search Console root index")

    human = (ROOT / "sitemap.html").read_text(encoding="utf-8", errors="replace")
    directory_match = re.search(r'<div class="sitemap-directory">(.*?)</div></main>', human, re.I | re.S)
    if not directory_match:
        errors.append("sitemap.html: missing curated sitemap-directory")
        directory = human
    else:
        directory = directory_match.group(1)
    hrefs = re.findall(r'<a[^>]+href=["\']([^"\']+)', directory, re.I)
    if len(hrefs) != len(set(hrefs)):
        errors.append("sitemap.html: duplicate curated links")
    for href in hrefs:
        lower = href.lower()
        if "/quiz/" in lower or "/teacher-slides/" in lower or lower.endswith("teacher-slides.html"):
            errors.append(f"sitemap.html: utility/Classroom View link should not be in human directory: {href}")
        if lower.startswith("/blogs/") and lower != "/blogs/":
            errors.append(f"sitemap.html: individual blog article makes the human directory too long: {href}")

    required_human = {"/", "/worksheets/", "/blogs/", "/updates.html"}
    for slug, _label in [("foundation", "Foundation"), *[(f"year{i}", f"Year {i}") for i in range(1, 11)]]:
        required_human.add(f"/{slug}/curriculum/")
        for subject in ("maths", "science", "english"):
            required_human.add(f"/{slug}/curriculum/{subject}/")
    missing = sorted(required_human - set(hrefs))
    if missing:
        errors.append(f"sitemap.html: missing required F–10 hub links: {', '.join(missing)}")

    fail(errors)
    print(
        f"PASS: sitemap.xml references {len(child_names)} crawl-priority child maps with "
        f"{len(all_urls)} unique URLs; sitemap.html has {len(hrefs)} curated human links."
    )


if __name__ == "__main__":
    main()
