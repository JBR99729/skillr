#!/usr/bin/env python3
"""Validate that every XML sitemap URL is unique, indexable and canonical."""
from __future__ import annotations

import html
import re
import sys
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parents[1]
BASE = "https://skillrhub.com"
SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
IGNORED_PARTS = {".git", "node_modules", "playwright-report", "test-results"}


def route(path: Path) -> str:
    value = path.as_posix()
    if value == "index.html":
        return "/"
    if value.endswith("/index.html"):
        return "/" + value[: -len("index.html")]
    return "/" + value


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


def robots_content(source: str) -> str:
    for pattern in (
        r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)',
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']robots["\']',
    ):
        match = re.search(pattern, source, re.I)
        if match:
            return re.sub(r"\s+", "", match.group(1).lower())
    return ""


def is_noindex(source: str) -> bool:
    return "noindex" in robots_content(source)


def topic_variant_canonical(relative: Path) -> str | None:
    parts = list(relative.parts)
    try:
        variant_index = next(
            index for index, part in enumerate(parts)
            if part in {"topic-practice-1", "topic-practice-2"}
        )
    except StopIteration:
        return None
    canonical_parts = parts[:variant_index]
    if canonical_parts[-1] != "worksheet":
        canonical_parts.append("worksheet")
    return normalise_route("/" + "/".join(canonical_parts) + "/")


def is_query_compatibility_page(relative: Path) -> bool:
    value = relative.as_posix()
    teacher_compatibility = (
        value.startswith("worksheets/")
        and (
            value.endswith("/teacher-slides/live.html")
            or value.endswith("/teacher-slides/viewer/index.html")
        )
    )
    daily_drill_compatibility = (
        value.startswith("quiz/") and value.endswith("/daily-drills/practice.html")
    )
    return teacher_compatibility or daily_drill_compatibility


def file_for_route(value: str) -> Path:
    relative = value.lstrip("/")
    if not relative:
        return ROOT / "index.html"
    if value.endswith("/"):
        return ROOT / relative / "index.html"
    return ROOT / relative


def main() -> None:
    errors: list[str] = []
    route_sitemaps: dict[str, list[str]] = defaultdict(list)
    sitemap_files = sorted(ROOT.glob("sitemap-*.xml"))

    for sitemap in sitemap_files:
        root = ET.parse(sitemap).getroot()
        expected_tag = f"{{{SITEMAP_NS}}}urlset"
        if root.tag != expected_tag:
            errors.append(f"{sitemap.name}: expected a URL set, found {root.tag}")
            continue
        for location in root.iter(f"{{{SITEMAP_NS}}}loc"):
            raw_url = (location.text or "").strip()
            parsed = urlparse(raw_url)
            if parsed.scheme != "https" or parsed.netloc != "skillrhub.com":
                errors.append(f"{sitemap.name}: unexpected URL host: {raw_url}")
                continue
            if parsed.query or parsed.fragment:
                errors.append(f"{sitemap.name}: query or fragment URL is not canonical: {raw_url}")
            if "/index.html" in parsed.path:
                errors.append(f"{sitemap.name}: index.html URL is not a clean folder route: {raw_url}")
            sitemap_route = normalise_route(raw_url)
            route_sitemaps[sitemap_route].append(sitemap.name)

            page = file_for_route(parsed.path)
            if not page.is_file():
                errors.append(f"{sitemap.name}: URL has no local HTML page: {raw_url}")
                continue
            source = page.read_text(encoding="utf-8", errors="replace")
            if is_noindex(source):
                errors.append(f"{sitemap.name}: noindexed URL must not be in any sitemap: {raw_url}")
            canonical = canonical_path(source)
            if canonical is None:
                errors.append(f"{sitemap.name}: sitemap page has no canonical: {raw_url}")
            elif canonical != sitemap_route:
                errors.append(
                    f"{sitemap.name}: noncanonical URL {raw_url} points to {canonical}"
                )

    for sitemap_route, owners in sorted(route_sitemaps.items()):
        if len(owners) > 1:
            errors.append(
                f"{sitemap_route}: duplicate URL across child sitemaps: {', '.join(owners)}"
            )

    indexable_count = 0
    noindex_count = 0
    for page in sorted(ROOT.rglob("*.html")):
        if set(page.parts) & IGNORED_PARTS:
            continue
        relative = page.relative_to(ROOT)
        page_route = normalise_route(route(relative))
        source = page.read_text(encoding="utf-8", errors="replace")
        robots = robots_content(source)
        canonical = canonical_path(source)
        owners = route_sitemaps.get(page_route, [])
        variant_canonical = topic_variant_canonical(relative)
        if variant_canonical is not None:
            if "noindex" not in robots or "follow" not in robots:
                errors.append(f"{page_route}: topic-practice variant must be noindex,follow")
            if canonical != variant_canonical:
                errors.append(
                    f"{page_route}: topic-practice variant must canonicalise to {variant_canonical}"
                )
        if relative.as_posix() == "quiz/year-7/math/ac9m7n01/drill/index.html":
            expected_drill_canonical = "/quiz/year-7/math/ac9m7n01/practice"
            if "noindex" not in robots or "follow" not in robots:
                errors.append(f"{page_route}: legacy drill route must be noindex,follow")
            if canonical != expected_drill_canonical:
                errors.append(
                    f"{page_route}: legacy drill canonical must be {expected_drill_canonical}"
                )
        if is_query_compatibility_page(relative):
            if "noindex" not in robots or "follow" not in robots:
                errors.append(f"{page_route}: query-string compatibility page must be noindex,follow")

        if "noindex" in robots:
            noindex_count += 1
            if owners:
                errors.append(
                    f"{page_route}: noindexed page appears in {', '.join(owners)}"
                )
            continue

        indexable_count += 1
        if canonical is None:
            errors.append(f"{page_route}: indexable page has no canonical")
        elif canonical != page_route:
            errors.append(
                f"{page_route}: indexable duplicate points to canonical {canonical}; add noindex"
            )
        if not owners:
            errors.append(f"{page_route}: indexable canonical page is missing from all child sitemaps")

    root_index = ET.parse(ROOT / "sitemap.xml").getroot()
    root_children: list[str] = []
    for location in root_index.iter(f"{{{SITEMAP_NS}}}loc"):
        raw_url = (location.text or "").strip()
        parsed = urlparse(raw_url)
        if parsed.scheme != "https" or parsed.netloc != "skillrhub.com":
            errors.append(f"sitemap.xml: unexpected child sitemap host: {raw_url}")
            continue
        child = ROOT / Path(parsed.path).name
        if not child.is_file():
            errors.append(f"sitemap.xml: referenced child sitemap is missing: {child.name}")
        root_children.append(raw_url)
    if len(root_children) != len(set(root_children)):
        errors.append("sitemap.xml: duplicate child sitemap references")

    if errors:
        print("\n".join(errors[:200]))
        if len(errors) > 200:
            print(f"... {len(errors) - 200} additional errors omitted")
        print(f"FAIL: {len(errors)} sitemap index-quality errors.")
        sys.exit(1)

    print(
        f"PASS: {len(route_sitemaps)} unique sitemap URLs are indexable and self-canonical; "
        f"{indexable_count} indexable pages are represented once and {noindex_count} "
        f"noindexed pages are absent from all {len(sitemap_files)} child sitemaps."
    )


if __name__ == "__main__":
    main()
