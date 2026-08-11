#!/usr/bin/env python3
"""Build a human-readable progress checkpoint for the staged question banks."""

from __future__ import annotations

import argparse
import json
import re
from collections import defaultdict
from pathlib import Path


FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---\n", re.DOTALL)


def metadata(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    match = FRONT_MATTER_RE.search(text)
    if not match:
        return {}
    values: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if ":" in line:
            key, value = line.split(":", 1)
            values[key.strip()] = value.strip()
    return values


def level_slug(level: str) -> str:
    if level == "Foundation Year":
        return "foundation"
    return level.lower().replace(" ", "-")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", type=Path)
    args = parser.parse_args()

    manifest = json.loads((args.root / "manifest.json").read_text(encoding="utf-8"))
    in_scope = [unit for unit in manifest["units"] if unit["scope"] == "generate"]

    completed: dict[str, dict[str, str]] = {}
    authored_total = 0
    for path in sorted((args.root / "banks").rglob("batch-1.md")):
        data = metadata(path)
        try:
            practice = int(data.get("practice_questions", "0"))
            exam = int(data.get("exam_questions", "0"))
        except ValueError:
            continue
        authored_total += practice + exam
        if practice >= 8 and exam >= 8:
            completed[data.get("curriculum_code", "")] = data

    grouped_total: dict[tuple[str, str], int] = defaultdict(int)
    grouped_done: dict[tuple[str, str], int] = defaultdict(int)
    for unit in in_scope:
        key = (unit["level"], unit["subject"])
        grouped_total[key] += 1
        if unit["code"] in completed:
            grouped_done[key] += 1

    level_order = ["Foundation Year"] + [f"Year {year}" for year in range(1, 11)]
    subject_order = ["English", "Mathematics", "Science"]
    launch_questions = len(completed) * 16
    target_questions = len(in_scope) * 16
    percentage = (len(completed) / len(in_scope) * 100) if in_scope else 0

    lines = [
        "# Pass 1 progress",
        "",
        f"- Completed curriculum codes: **{len(completed)} / {len(in_scope)}**",
        f"- Completion: **{percentage:.2f}%**",
        f"- Launch questions complete: **{launch_questions:,} / {target_questions:,}**",
        f"- Total questions authored, including reserve: **{authored_total:,}**",
        "- Launch target per code: **8 Practice + 8 Test**",
        "- Planned worksheet selection: **5 Practice + 5 Test**",
        "",
        "| Level | Subject | Codes complete | Codes total | Progress |",
        "| --- | --- | ---: | ---: | ---: |",
    ]
    for level in level_order:
        for subject in subject_order:
            total = grouped_total[(level, subject)]
            if total == 0:
                continue
            done = grouped_done[(level, subject)]
            lines.append(
                f"| {level} | {subject} | {done} | {total} | {done / total * 100:.1f}% |"
            )

    lines.extend(["", "## Completed codes", ""])
    if completed:
        for code in sorted(completed):
            lines.append(f"- {code}")
    else:
        lines.append("- None yet")

    remaining = [unit for unit in in_scope if unit["code"] not in completed]
    lines.extend(["", "## Next in manifest order", ""])
    for unit in remaining[:10]:
        lines.append(f"- {unit['code']} — {unit['description']}")
    lines.append("")

    qa_dir = args.root / "qa"
    qa_dir.mkdir(parents=True, exist_ok=True)
    (qa_dir / "progress.md").write_text("\n".join(lines), encoding="utf-8")
    (qa_dir / "progress.json").write_text(
        json.dumps(
            {
                "completedCodes": len(completed),
                "totalCodes": len(in_scope),
                "completionPercent": round(percentage, 2),
                "launchQuestionsCompleted": launch_questions,
                "launchQuestionsTarget": target_questions,
                "authoredQuestionsIncludingReserve": authored_total,
                "worksheetRule": {"practice": 5, "exam": 5, "total": 10},
                "completed": sorted(completed),
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()

