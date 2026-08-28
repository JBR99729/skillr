#!/usr/bin/env python3
"""Validate every F-10 curriculum-card Teacher slide link."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
STAGES = ["foundation", *[f"year{year}" for year in range(1, 11)]]
SUBJECTS = ["maths", "science", "english"]
CARD_RE = re.compile(
    r'<article class="curriculum-unit-card">(?P<body>.*?)</article>',
    re.I | re.S,
)
CODE_RE = re.compile(r'<span class="curriculum-badge">(AC9[A-Z0-9]+)</span>', re.I)
SLIDE_RE = re.compile(r'<a[^>]+href="([^"]+)"[^>]*>Teacher slide</a>', re.I)


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


def local_target(href: str) -> Path:
    path = urlsplit(href).path
    target = ROOT / path.lstrip("/")
    return target if target.suffix else target / "index.html"


def main() -> int:
    checked = 0
    errors: list[str] = []

    for stage in STAGES:
        for subject in SUBJECTS:
            index = ROOT / stage / "curriculum" / subject / "index.html"
            if not index.exists():
                errors.append(f"{index.relative_to(ROOT)}: missing curriculum index")
                continue

            for match in CARD_RE.finditer(read(index)):
                body = match.group("body")
                code_match = CODE_RE.search(body)
                slide_match = SLIDE_RE.search(body)
                code = code_match.group(1).upper() if code_match else "UNKNOWN"
                if not slide_match:
                    errors.append(f"{index.relative_to(ROOT)} {code}: missing Teacher slide link")
                    continue

                href = slide_match.group(1)
                checked += 1
                parsed = urlsplit(href)
                target = local_target(href)

                if not target.exists():
                    errors.append(f"{index.relative_to(ROOT)} {code}: missing target {href}")
                    continue

                target_html = read(target)
                if parsed.fragment:
                    anchor = re.escape(parsed.fragment)
                    if not re.search(rf'id=["\']{anchor}["\']', target_html, re.I):
                        errors.append(f"{index.relative_to(ROOT)} {code}: missing fragment target {href}")

                target_code = re.search(r"\bAC9[A-Z0-9]+\b", target_html, re.I)
                if target_code and target_code.group(0).upper() != code:
                    errors.append(
                        f"{index.relative_to(ROOT)} {code}: destination identifies "
                        f"{target_code.group(0).upper()} ({href})"
                    )

    print(f"Teacher slide links checked: {checked}")
    if errors:
        print(f"Errors: {len(errors)}", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    print("All curriculum-card Teacher slide links resolve correctly.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
