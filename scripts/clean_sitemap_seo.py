#!/usr/bin/env python3
"""Clean the generated human sitemap without changing XML crawl coverage.

The XML sitemap generator intentionally discovers canonical, indexable HTML pages.
This post-processing step keeps the browser-facing sitemap readable and globally
positioned while preserving the generated link inventory.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITEMAP = ROOT / "sitemap.html"


def main() -> None:
    source = SITEMAP.read_text(encoding="utf-8")

    replacements = {
        "<title>Learning Resources Sitemap | SkillrHub</title>":
            "<title>Free Learning Resources Sitemap | SkillrHub</title>",
        'content="Browse SkillrHub learning resources by year level and subject, including curriculum guides, practice, tests and printable worksheets."':
            'content="Browse free SkillrHub learning resources by year level and subject, including topic guides, teacher slides, worksheets, practice and tests for learners worldwide."',
        'content="Find Australian Curriculum learning resources from Foundation to Year 10."':
            'content="Find free curriculum-linked Maths, English and Science learning resources from Foundation to Year 10 for learners worldwide."',
        '"description":"Browse SkillrHub learning resources by year level and subject."':
            '"description":"Browse free SkillrHub topic guides, teacher slides, worksheets, practice and tests by year level and subject."',
        "<h1>Learning resources sitemap</h1>":
            "<h1>Free learning resources sitemap</h1>",
        "<p>Choose a year level or browse our main resource collections. Individual curriculum activities remain discoverable through each year and subject hub.</p>":
            "<p>Browse SkillrHub by year level and subject. Topic guides, teacher slides, printable worksheets, online practice and tests are organised through each curriculum hub for fast discovery worldwide.</p>",
    }
    for old, new in replacements.items():
        source = source.replace(old, new)

    # The generator can place root .html pages into one-item sections named from
    # the filename (for example About.Html). Merge those links into Main pages.
    singleton_pattern = re.compile(
        r'<section class="sitemap-section"><h2>([^<]+\.Html)</h2><ul>(.*?)</ul></section>',
        re.I | re.S,
    )
    singleton_links: list[str] = []

    def collect(match: re.Match[str]) -> str:
        singleton_links.append(match.group(2))
        return ""

    source = singleton_pattern.sub(collect, source)
    if singleton_links:
        main_pattern = re.compile(
            r'(<section class="sitemap-section"><h2>Main pages</h2><ul>)(.*?)(</ul></section>)',
            re.I | re.S,
        )
        extra = "".join(singleton_links)
        source, count = main_pattern.subn(lambda m: m.group(1) + m.group(2) + extra + m.group(3), source, count=1)
        if count != 1:
            raise RuntimeError("Could not locate Main pages section in sitemap.html")

    # Avoid stale, narrow messaging if the exact generated strings change later.
    source = source.replace("Find Australian Curriculum learning resources from Foundation to Year 10.",
                            "Find free curriculum-linked Maths, English and Science learning resources from Foundation to Year 10 for learners worldwide.")

    SITEMAP.write_text(source, encoding="utf-8")
    print(f"Cleaned human sitemap SEO: {SITEMAP.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
