#!/usr/bin/env python3
"""Normalise Year 10 Maths topic-page section order to the AC9M10N01 standard.

AC9M10N01 is the canonical layout standard. Topics AC9M10A05 onward were built
from older authored detail blocks plus additive v2 blocks, so this script only
reorders/combines those existing blocks. It preserves the mathematical content,
resource URLs, feedback card, analytics, canonical metadata and state mappings.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

EXPECTED_IDS = [
    "learn",
    "prerequisites",
    "teaching",
    "examples",
    "misconceptions",
    "guided-practice",
    "independent-practice",
    "reasoning",
    "important-questions",
    "assessment",
    "mastery",
    "guidance",
    "alignment",
    "resources",
    "related",
    "official-references",
]

DETAIL_RE = re.compile(
    r'<details class="curriculum-topic-section"[^>]*>\s*'
    r'<summary><strong>(?P<title>[\s\S]*?)</strong></summary>\s*'
    r'<div class="curriculum-detail-body">(?P<body>[\s\S]*?)</div></details>',
    re.I,
)
MAIN_RE = re.compile(
    r'(?P<open><main class="[^"]*\bcurriculum-layout\b[^"]*">)(?P<body>[\s\S]*?)'
    r'(?P<feedback><!-- skillr-facebook-feedback:start -->)',
    re.I,
)


def section(section_id: str, title: str, body: str) -> str:
    return (
        f'<section class="curriculum-topic-section" id="{section_id}">'
        f'<h2>{title}</h2>{body}</section>'
    )


def load_cfg() -> dict[str, dict]:
    cfg: dict[str, dict] = {}
    for name in ("config-1.json", "config-2.json"):
        cfg.update(json.loads((ROOT / "data/year10-maths-v2" / name).read_text()))
    return cfg


def items_from(body: str) -> list[str]:
    return re.findall(r'<li>([\s\S]*?)</li>', body, flags=re.I)


def key(title: str) -> str:
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', title)).strip().lower()


def build_important_qa(independent_body: str, solutions_body: str) -> str:
    qs = items_from(independent_body)
    ans = items_from(solutions_body)
    if len(qs) < 3 or len(ans) < 3:
        raise ValueError("Independent-practice question/answer bank is too small")
    pairs = []
    for q, a in zip(qs[:3], ans[:3]):
        pairs.append(f'<dt><strong>{q}</strong></dt><dd>{a}</dd>')
    return '<dl>' + ''.join(pairs) + '</dl>'


def normalize_page(code: str, page: Path) -> None:
    text = page.read_text()
    m = MAIN_RE.search(text)
    if not m:
        raise ValueError(f"{code}: curriculum main/feedback boundary not found")

    region = m.group("body")
    blocks = list(DETAIL_RE.finditer(region))
    if len(blocks) < 15:
        raise ValueError(f"{code}: expected authored + v2 detail blocks, found {len(blocks)}")

    by_title: dict[str, tuple[str, str]] = {}
    for block in blocks:
        title = block.group("title").strip()
        by_title[key(title)] = (title, block.group("body").strip())

    def require(exact: str) -> str:
        k = key(exact)
        if k not in by_title:
            raise ValueError(f"{code}: missing section {exact!r}")
        return by_title[k][1]

    teaching_parts = [require("What you need to know")]
    cheat_keys = [k for k in by_title if "cheat sheet" in k]
    if not cheat_keys:
        raise ValueError(f"{code}: missing concept cheat-sheet block")
    for ck in cheat_keys:
        teaching_parts.append(by_title[ck][1])

    examples_key = next((k for k in by_title if "worked examples" in k), None)
    if not examples_key:
        raise ValueError(f"{code}: missing worked examples")

    independent = require("Independent practice — 10 important questions to solve")
    solutions = require("Solutions with explanations")
    review = require("Review hints")
    alignment = require("Curriculum alignment")
    elaborations = require("Australian Curriculum v9.0 and elaborations")
    official = require("Official curriculum references")
    international = require("International curriculum alignment")

    ordered = ''.join([
        section("learn", "Learning goals: what you will learn", require("Learning goals: what you will learn")),
        section("prerequisites", "Prerequisite knowledge", require("Prerequisite knowledge")),
        section("teaching", "Concept teaching", ''.join(teaching_parts)),
        section("examples", "Worked examples", by_title[examples_key][1]),
        section("misconceptions", "Common misconceptions and corrections", require("Common mistakes")),
        section("guided-practice", "Guided practice", require("Guided practice")),
        section(
            "independent-practice",
            "Independent practice",
            independent
            + '<details class="unit-answer"><summary><strong>Check answers and explanations</strong></summary>'
            + solutions
            + '</details>',
        ),
        section("reasoning", "Reasoning and problem-solving task", require("Reasoning and problem-solving task")),
        section("important-questions", "Important questions and answers", build_important_qa(independent, solutions)),
        section(
            "assessment",
            "Assessment-style questions",
            require("Assessment-style question") + '<h3>Review hints</h3>' + review,
        ),
        section("mastery", "Exit ticket: mastery check", require("Exit ticket / mastery check")),
        section("guidance", "Teacher and parent guidance", require("Teacher and parent guidance")),
        section(
            "alignment",
            "Curriculum alignment",
            alignment
            + '<details class="unit-answer"><summary><strong>Australian Curriculum elaborations</strong></summary>'
            + elaborations
            + '</details>',
        ),
        section("resources", "Practice and teaching resources", require("Resources")),
        section("related", "Related Year 10 Mathematics topics", require("Related Year 10 Maths topics")),
        section(
            "official-references",
            "Official curriculum references",
            official
            + '<details class="unit-answer"><summary><strong>Other curriculum comparisons retained</strong></summary>'
            + international
            + '</details>',
        ),
    ])

    replacement = m.group("open") + '<div id="topic-guide">' + ordered + '</div>' + m.group("feedback")
    text = text[:m.start()] + replacement + text[m.end():]
    page.write_text(text)


def validate_all_year10() -> None:
    errors: list[str] = []
    for page in sorted((ROOT / "year10/maths").glob("*/index.html")):
        text = page.read_text()
        ids = re.findall(r'<section class="curriculum-topic-section" id="([^"]+)"', text, flags=re.I)
        positions = []
        for section_id in EXPECTED_IDS:
            if section_id not in ids:
                errors.append(f"{page}: missing {section_id}")
                break
            positions.append(ids.index(section_id))
        if positions and positions != sorted(positions):
            errors.append(f"{page}: section order differs from AC9M10N01 standard: {ids}")
    if errors:
        raise SystemExit("\n".join(errors))


def normalize_all() -> None:
    cfg = load_cfg()
    for code, item in cfg.items():
        normalize_page(code, ROOT / item["path"] / "index.html")
    validate_all_year10()
    print(f"Normalised {len(cfg)} Year 10 Maths pages; all 21 pages match the AC9M10N01 section order.")


if __name__ == "__main__":
    normalize_all()
