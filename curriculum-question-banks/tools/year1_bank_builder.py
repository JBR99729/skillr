#!/usr/bin/env python3
"""Render deterministic Year 1 Pass 1 curriculum question banks.

The subject build scripts hold the authored teaching points, stimuli, answers and
coverage notes.  This module only applies the shared Markdown structure and the
accessible delivery requirements for early-years interactions.
"""

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SUBJECT_DIRECTORIES = {
    "Mathematics": "mathematics",
    "Science": "science",
    "English": "english",
}

ITEM_TYPES = [
    "Short response",
    "Matching",
    "Demonstration",
    "Short response",
    "Sequencing",
    "Drawing response",
    "Short response",
    "Extended response",
    "Short response",
    "Matching",
    "Sequencing",
    "Short response",
    "Demonstration",
    "Drawing response",
    "Extended response",
    "Extended response",
]

DELIVERY = {
    "Matching": (
        "Online, provide movable cards with drag, tap-to-place and keyboard "
        "controls. On paper, students draw lines between matching entries."
    ),
    "Sequencing": (
        "Online, provide movable cards with drag, tap-to-place and keyboard "
        "controls. On paper, students number or rewrite the cards in order."
    ),
    "Demonstration": (
        "Provide the named classroom materials or an equivalent labelled visual. "
        "Accept a teacher-observed demonstration or a written description."
    ),
    "Drawing response": (
        "Online, provide a simple drawing or selectable-diagram tool with a "
        "keyboard-labelled alternative. On paper, students draw and label."
    ),
}

PRACTICE_SECTIONS = [
    ("## Tier 1 — Knowledge and terms", 0, 2),
    ("## Tier 2 — Core skill practice", 2, 4),
    ("## Tier 3 — Guided application", 4, 6),
    ("## Tier 4 — Problem solving and reasoning", 6, 8),
]

EXAM_SECTIONS = [
    ("## Section A — Core knowledge", 8, 11),
    ("## Section B — Application and problem solving", 11, 14),
    ("## Section C — Extended response and analysis", 14, 16),
]


def render_item(identifier: str, item: tuple[str, str, str, str], item_type: str) -> str:
    title, question, marking_key, coverage = item
    lines = [f"### {identifier} — {title}", "", f"**Type:** {item_type}", ""]
    if item_type in DELIVERY:
        lines.extend([f"**Delivery:** {DELIVERY[item_type]}", ""])
    lines.extend(
        [
            f"**Question:** {question}",
            "",
            f"**Marking key:** {marking_key}",
            "",
            f"**Coverage:** {coverage}",
            "",
        ]
    )
    return "\n".join(lines)


def render_bank(spec: dict[str, object]) -> str:
    items = spec["items"]
    quick = spec["quick_read"]
    if not isinstance(items, list) or len(items) != 16:
        raise ValueError(f"{spec['code']}: expected exactly 16 authored items")
    if not isinstance(quick, list) or len(quick) < 4:
        raise ValueError(f"{spec['code']}: Quick Read is incomplete")

    lines = [
        "---",
        f"curriculum_code: {spec['code']}",
        f"subject: {spec['subject']}",
        "year_level: Year 1",
        f"description: {spec['description']}",
        "batch: 1",
        "practice_questions: 8",
        "exam_questions: 8",
        "worksheet_questions: 10",
        "worksheet_practice_selection: 5",
        "worksheet_exam_selection: 5",
        "quick_read_status: authored",
        "review_status: authored",
        "---",
        "",
        f"# {spec['code']} — Pass 1 question bank",
        "",
        "## 60-second Quick Read",
        "",
    ]
    lines.extend(f"- **{label}:** {text}" for label, text in quick)
    lines.extend(["", "## Practice questions", ""])

    for heading, start, end in PRACTICE_SECTIONS:
        lines.extend([heading, ""])
        for index in range(start, end):
            lines.append(
                render_item(
                    f"P{index + 1:02d}",
                    items[index],
                    ITEM_TYPES[index],
                )
            )

    lines.extend(["## Exam questions", ""])
    for heading, start, end in EXAM_SECTIONS:
        lines.extend([heading, ""])
        for index in range(start, end):
            lines.append(
                render_item(
                    f"E{index - 7:02d}",
                    items[index],
                    ITEM_TYPES[index],
                )
            )
    return "\n".join(lines).rstrip() + "\n"


def write_banks(specs: dict[str, dict[str, object]]) -> list[Path]:
    written: list[Path] = []
    for code, spec in specs.items():
        if code != spec.get("code"):
            raise ValueError(f"Spec key/code mismatch: {code}/{spec.get('code')}")
        subject = str(spec["subject"])
        output = (
            ROOT
            / "banks"
            / "year-1"
            / SUBJECT_DIRECTORIES[subject]
            / code.lower()
            / "batch-1.md"
        )
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(render_bank(spec), encoding="utf-8")
        written.append(output)
    return written
