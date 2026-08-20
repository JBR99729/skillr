#!/usr/bin/env python3
"""Prepare a crawl-focused sitemap index for Google Search Console.

The full site search index can still include quiz/practice utilities, but Google XML
sitemap submissions should prioritise canonical curriculum/topic pages, hubs,
blogs and worksheet content. The large practice/test utility sitemap is kept as a
file for compatibility but is deliberately removed from the root sitemap index.
"""
from __future__ import annotations

import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
ET.register_namespace("", SITEMAP_NS)

ROOT_INDEX = ROOT / "sitemap.xml"
EXCLUDED_CHILDREN = {
    "https://skillrhub.com/sitemap-practice.xml",
}


def main() -> None:
    if not ROOT_INDEX.is_file():
        raise SystemExit("sitemap.xml was not generated")

    tree = ET.parse(ROOT_INDEX)
    root = tree.getroot()
    sitemap_tag = f"{{{SITEMAP_NS}}}sitemap"
    loc_tag = f"{{{SITEMAP_NS}}}loc"

    removed: list[str] = []
    for node in list(root.findall(sitemap_tag)):
        loc = node.find(loc_tag)
        value = (loc.text or "").strip() if loc is not None else ""
        if value in EXCLUDED_CHILDREN:
            root.remove(node)
            removed.append(value)

    ET.indent(tree, space="  ")
    tree.write(ROOT_INDEX, encoding="utf-8", xml_declaration=True)

    # Validate the referenced sitemap set and guard against accidental quiz URLs.
    referenced: list[Path] = []
    seen_urls: set[str] = set()
    duplicate_urls: list[str] = []
    for node in root.findall(sitemap_tag):
        loc = node.find(loc_tag)
        value = (loc.text or "").strip() if loc is not None else ""
        if not value.startswith("https://skillrhub.com/"):
            raise SystemExit(f"Unexpected sitemap host: {value}")
        child = ROOT / value.rsplit("/", 1)[-1]
        if not child.is_file():
            raise SystemExit(f"Referenced child sitemap is missing: {child.name}")
        referenced.append(child)

        child_root = ET.parse(child).getroot()
        for url_loc in child_root.iter(f"{{{SITEMAP_NS}}}loc"):
            url = (url_loc.text or "").strip()
            if not url.startswith("https://skillrhub.com/"):
                raise SystemExit(f"Unexpected URL host in {child.name}: {url}")
            if "/quiz/" in url:
                raise SystemExit(
                    f"Quiz/practice utility leaked into Google sitemap {child.name}: {url}"
                )
            if url in seen_urls:
                duplicate_urls.append(url)
            seen_urls.add(url)

    if duplicate_urls:
        sample = "\n".join(sorted(set(duplicate_urls))[:20])
        raise SystemExit(f"Duplicate URLs found across Google child sitemaps:\n{sample}")

    print(
        "Prepared Google sitemap index: "
        f"{len(referenced)} child sitemaps, {len(seen_urls)} crawl-priority URLs; "
        f"removed {len(removed)} utility sitemap(s)."
    )


if __name__ == "__main__":
    main()
