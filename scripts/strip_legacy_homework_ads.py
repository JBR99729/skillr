#!/usr/bin/env python3
"""Strip all AdSense loader variants from legacy Practice-backed Homework shells."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def legacy(text: str, rel: str) -> bool:
    return "/worksheet/" in f"/{rel}" and bool(
        re.search(r'<script\s+src="[^"]*/practice/[^"]+\.js', text, re.I)
        and ("worksheetQuestionLimit" in text or "homeworkQuestionLimit" in text)
    )


def main() -> None:
    changed = 0
    for path in ROOT.rglob("*.html"):
        if ".git" in path.parts or "node_modules" in path.parts:
            continue
        rel = path.relative_to(ROOT).as_posix()
        text = path.read_text(encoding="utf-8")
        if not legacy(text, rel):
            continue
        original = text
        text = re.sub(r'<meta\s+name="google-adsense-account"\s+content="[^"]+"\s*/?>', "", text, flags=re.I)
        text = re.sub(
            r'<script\b[^>]*src="https://pagead2\.googlesyndication\.com/[^"]+"[^>]*></script>',
            "",
            text,
            flags=re.I,
        )
        if re.search(r'<meta\s+name="robots"\s+content="[^"]*"\s*/?>', text, re.I):
            text = re.sub(
                r'<meta\s+name="robots"\s+content="[^"]*"\s*/?>',
                '<meta name="robots" content="noindex, follow">',
                text,
                count=1,
                flags=re.I,
            )
        else:
            text = text.replace("</title>", '</title><meta name="robots" content="noindex, follow">', 1)
        if text != original:
            path.write_text(text, encoding="utf-8")
            changed += 1

    failures = []
    for path in ROOT.rglob("*.html"):
        if ".git" in path.parts or "node_modules" in path.parts:
            continue
        rel = path.relative_to(ROOT).as_posix()
        text = path.read_text(encoding="utf-8")
        if legacy(text, rel) and (
            "pagead2.googlesyndication.com" in text
            or "google-adsense-account" in text
            or not re.search(r'<meta\s+name="robots"\s+content="noindex,\s*follow"', text, re.I)
        ):
            failures.append(rel)
    print(f"legacy homework ad/index protections changed: {changed}")
    if failures:
        print("Unprotected legacy Homework:")
        for rel in failures[:100]:
            print("-", rel)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
