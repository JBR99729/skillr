#!/usr/bin/env python3
"""Submit changed, indexable SkillrHub pages to IndexNow.

Usage:
  python3 scripts/submit_indexnow.py <before_sha> <after_sha>

The script maps changed HTML files to their public skillrhub.com URLs, skips
internal/noindex pages, batches URLs, and POSTs them to the shared IndexNow
endpoint. Deleted HTML pages are submitted too so engines can refresh removal
state.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
HOST = "skillrhub.com"
KEY = "7992061fa6bd152443061bdc0a2a1d27"
KEY_LOCATION = f"{SITE}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"
BATCH_SIZE = 500

EXCLUDED_PREFIXES = (
    ".git/",
    ".github/",
    ".githooks/",
    "scripts/",
    "docs/",
    "data/",
    "node_modules/",
    "analytics/",
)
NOINDEX_RE = re.compile(
    r'<meta\b[^>]*name=["\']robots["\'][^>]*content=["\'][^"\']*noindex',
    re.IGNORECASE,
)


def changed_paths(before: str, after: str) -> list[str]:
    if not before or set(before) == {"0"}:
        # Avoid a mass submission if GitHub reports a null previous commit.
        return []
    result = subprocess.run(
        ["git", "diff", "--name-only", before, after],
        cwd=ROOT,
        check=True,
        text=True,
        capture_output=True,
    )
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def public_url(path: str) -> str | None:
    clean = path.replace("\\", "/").lstrip("./")
    if not clean or clean.startswith(EXCLUDED_PREFIXES):
        return None
    if not clean.lower().endswith((".html", ".htm")):
        return None

    disk_file = ROOT / clean
    if disk_file.exists():
        try:
            head = disk_file.read_text(encoding="utf-8", errors="ignore")[:12000]
        except OSError:
            return None
        if NOINDEX_RE.search(head):
            return None

    if clean == "index.html":
        return f"{SITE}/"
    if clean.endswith("/index.html"):
        return f"{SITE}/{clean[:-10]}"
    return f"{SITE}/{clean}"


def submit(urls: list[str]) -> None:
    for start in range(0, len(urls), BATCH_SIZE):
        batch = urls[start : start + BATCH_SIZE]
        payload = json.dumps(
            {
                "host": HOST,
                "key": KEY,
                "keyLocation": KEY_LOCATION,
                "urlList": batch,
            }
        ).encode("utf-8")
        request = urllib.request.Request(
            ENDPOINT,
            data=payload,
            headers={"Content-Type": "application/json; charset=utf-8"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                status = response.status
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            raise SystemExit(f"IndexNow HTTP {exc.code}: {body}") from exc
        print(f"IndexNow submitted {len(batch)} URL(s): HTTP {status}")


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: submit_indexnow.py <before_sha> <after_sha>")
    before, after = sys.argv[1:]
    paths = changed_paths(before, after)
    urls = sorted({url for path in paths if (url := public_url(path))})
    if not urls:
        print("No changed indexable HTML URLs to submit to IndexNow.")
        return
    print(f"Submitting {len(urls)} changed indexable URL(s) to IndexNow.")
    submit(urls)


if __name__ == "__main__":
    main()
