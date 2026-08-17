#!/usr/bin/env python3
"""Audit SkillrHub curriculum teacher-slide resources.

Reports each AC9 maths topic as OK, MISSING, LEGACY_SLIDE_COUNT, or
MISSING_PROGRESSION. This script is read-only and uses only the standard library.
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

TOPIC_RE = re.compile(r"^ac9m\d+[a-z]+\d+", re.I)
COUNTER_RE = re.compile(r">\s*1\s*/\s*(\d+)\s*<")


def audit(root: Path) -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    for year_dir in sorted(root.glob("year[0-9]*")):
        maths = year_dir / "maths"
        if not maths.is_dir():
            continue
        for topic in sorted(p for p in maths.iterdir() if p.is_dir() and TOPIC_RE.match(p.name)):
            index = topic / "teacher-slides" / "index.html"
            row: dict[str, object] = {
                "year": year_dir.name,
                "topic": topic.name,
                "path": str(index.relative_to(root)),
                "slide_count": 0,
                "progression": False,
                "status": "MISSING",
            }
            if index.is_file():
                text = index.read_text(encoding="utf-8", errors="replace")
                counts = [int(x) for x in COUNTER_RE.findall(text)]
                count = max(counts, default=text.count("data-slide"))
                progression = "/assets/curriculum-progression.js" in text
                row["slide_count"] = count
                row["progression"] = progression
                if count < 5:
                    row["status"] = "LEGACY_SLIDE_COUNT"
                elif not progression:
                    row["status"] = "MISSING_PROGRESSION"
                else:
                    row["status"] = "OK"
            rows.append(row)
    return rows


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit SkillrHub teacher-slide QA status")
    parser.add_argument("--root", default=".", help="repository root")
    parser.add_argument("--json", action="store_true", help="emit JSON instead of text")
    parser.add_argument("--only-failures", action="store_true", help="hide OK rows")
    args = parser.parse_args()

    rows = audit(Path(args.root).resolve())
    if args.only_failures:
        rows = [r for r in rows if r["status"] != "OK"]

    if args.json:
        print(json.dumps(rows, indent=2))
    else:
        for row in rows:
            print(f"{row['status']:22} {row['year']:7} slides={row['slide_count']:<2} progression={str(row['progression']):5} {row['topic']}")
        failures = sum(1 for r in rows if r["status"] != "OK")
        print(f"\nAudited {len(rows)} topics; {failures} need QA work.")
    return 1 if any(r["status"] != "OK" for r in rows) else 0


if __name__ == "__main__":
    raise SystemExit(main())
