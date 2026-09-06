#!/usr/bin/env python3
"""Run the upper-English fixed-slide builder against canonical pages discovered in the checkout.

The curriculum surface is the source of truth; no brittle hard-coded topic count is
used. A failure is raised only when a discovered topic cannot be built or a year
has no canonical English topics.
"""
from __future__ import annotations

from pathlib import Path

import build_upper_english_fixed_slides as builder


def main() -> None:
    total_topics = 0
    total_slides = 0
    per_year: dict[int, int] = {}
    failures: list[str] = []

    for year in builder.YEARS:
        root = builder.ROOT / f"year{year}" / "english"
        pages = sorted(root.glob("ac9e*/index.html")) if root.is_dir() else []
        if not pages:
            failures.append(f"Year {year}: no canonical English topic pages discovered")
            continue
        per_year[year] = len(pages)
        for page in pages:
            try:
                total_slides += builder.build(page, year)
                total_topics += 1
            except Exception as exc:  # surface the exact topic that failed
                failures.append(f"{page.relative_to(builder.ROOT)}: {exc}")

    if failures:
        print("Upper English fixed-slide build failures:")
        for failure in failures:
            print("-", failure)
        raise SystemExit(1)

    print(
        "Built fixed upper-English slides: "
        + ", ".join(f"Year {year}={count} topics" for year, count in sorted(per_year.items()))
        + f"; total={total_topics} topics, {total_slides} slides."
    )


if __name__ == "__main__":
    main()
