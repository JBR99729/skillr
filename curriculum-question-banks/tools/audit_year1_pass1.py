#!/usr/bin/env python3
"""Audit Year 1 bank coverage and the early-years delivery contract."""

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BANK_ROOT = ROOT / "banks" / "year-1"
QA_ROOT = ROOT / "qa"
PLACEHOLDER_RE = re.compile(
    r"Which learning goal|Which classroom activity|This matches AC9|"
    r"answers may vary|\bTODO\b|\bTBD\b|placeholder",
    re.IGNORECASE,
)


def main() -> None:
    manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
    expected = {
        unit["code"]: unit
        for unit in manifest["units"]
        if unit["scope"] == "generate" and unit["level"] == "Year 1"
    }
    found: dict[str, Path] = {}
    errors: list[str] = []
    subject_counts: Counter[str] = Counter()

    for path in sorted(BANK_ROOT.rglob("batch-1.md")):
        text = path.read_text(encoding="utf-8")
        code_match = re.search(r"^curriculum_code: (\S+)$", text, re.MULTILINE)
        subject_match = re.search(r"^subject: (.+)$", text, re.MULTILINE)
        if not code_match or not subject_match:
            errors.append(f"{path}: missing code or subject metadata")
            continue
        code = code_match.group(1)
        subject = subject_match.group(1)
        found[code] = path
        subject_counts[subject] += 1

        checks = {
            "8 Practice questions": len(re.findall(r"^### P\d{2}\b", text, re.MULTILINE)) == 8,
            "8 Test questions": len(re.findall(r"^### E\d{2}\b", text, re.MULTILINE)) == 8,
            "10-question worksheet": "worksheet_questions: 10" in text,
            "5 Practice worksheet sample": "worksheet_practice_selection: 5" in text,
            "5 Test worksheet sample": "worksheet_exam_selection: 5" in text,
            "60-second Quick Read": "## 60-second Quick Read" in text,
            "worked teaching example": bool(
                re.search(r"(?:Worked|Observable) example", text)
            ),
            "visual or interaction guidance": bool(
                re.search(r"Visual (?:model|interaction)", text, re.IGNORECASE)
            ),
            "accessible tap/keyboard delivery": "tap" in text.lower()
            and "keyboard" in text.lower(),
            "paper alternative": "paper" in text.lower(),
            "interactive item": "**Type:** Matching" in text
            or "**Type:** Sequencing" in text,
            "no placeholder stems": not PLACEHOLDER_RE.search(text),
        }
        for label, passed in checks.items():
            if not passed:
                errors.append(f"{code}: failed {label}")

        manifest_unit = expected.get(code)
        if manifest_unit is None:
            errors.append(f"{code}: not a Year 1 in-scope manifest code")
        elif f"description: {manifest_unit['description']}" not in text:
            errors.append(f"{code}: description differs from sanitised manifest")

    missing = sorted(set(expected) - set(found))
    extra = sorted(set(found) - set(expected))
    errors.extend(f"{code}: missing bank" for code in missing)
    errors.extend(f"{code}: unexpected bank" for code in extra)

    result = {
        "status": "passed" if not errors else "failed",
        "expectedCodes": len(expected),
        "completedCodes": len(found),
        "subjectCounts": dict(sorted(subject_counts.items())),
        "practiceQuestions": len(found) * 8,
        "testQuestions": len(found) * 8,
        "launchQuestions": len(found) * 16,
        "worksheetQuestionsPerAttempt": 10,
        "worksheetPracticeSelection": 5,
        "worksheetTestSelection": 5,
        "errors": errors,
    }
    QA_ROOT.mkdir(parents=True, exist_ok=True)
    (QA_ROOT / "year1-pass1-audit.json").write_text(
        json.dumps(result, indent=2) + "\n", encoding="utf-8"
    )
    lines = [
        "# Year 1 Pass 1 audit",
        "",
        f"- Status: **{result['status'].upper()}**",
        f"- Curriculum codes: **{result['completedCodes']} / {result['expectedCodes']}**",
        f"- Mathematics: **{subject_counts['Mathematics']} / 15**",
        f"- Science: **{subject_counts['Science']} / 10**",
        f"- English: **{subject_counts['English']} / 30**",
        f"- Practice questions: **{result['practiceQuestions']}**",
        f"- Separate Test questions: **{result['testQuestions']}**",
        f"- Launch questions: **{result['launchQuestions']}**",
        "- Worksheet rule: **5 Practice + 5 Test without replacement**",
        "",
        "## Automated gates",
        "",
        "Every Year 1 bank was checked for exact counts, curriculum-code coverage,",
        "sanitised descriptions, a worked 60-second Quick Read, visual/interaction",
        "guidance, tap and keyboard access, a printable alternative, at least one",
        "interactive matching or sequencing task, and absence of placeholder stems.",
        "The repository-wide bank validator separately checks IDs, tier/section",
        "distribution, item fields, answer/rubric presence, options, banned content",
        "and exact or near-duplicate prompts.",
        "",
    ]
    if errors:
        lines.extend(["## Errors", "", *[f"- {error}" for error in errors], ""])
    (QA_ROOT / "year1-pass1-audit.md").write_text(
        "\n".join(lines), encoding="utf-8"
    )
    if errors:
        raise SystemExit("\n".join(errors))
    print(
        f"Audited {len(found)} Year 1 codes: "
        f"{result['practiceQuestions']} Practice + {result['testQuestions']} Test"
    )


if __name__ == "__main__":
    main()
