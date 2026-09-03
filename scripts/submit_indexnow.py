#!/usr/bin/env python3
"""Submit changed public SkillrHub URLs to IndexNow.

Usage:
  python3 scripts/submit_indexnow.py <before_sha> <after_sha>

The script maps changed repository files to their public skillrhub.com URLs,
filters out non-public/internal assets, batches the URLs, and POSTs them to the
shared IndexNow endpoint. Deleted public pages are submitted too so engines can
refresh removal state.
"""
from __future__ import annotations

import json
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
EXCLUDED_BASENAMES = {
    "AGENTS.md",
    "README.md",
    "package.json",
    "package-lock.json",
}
PUBLIC_TEXT_EXTENSIONS = {".html", ".htm", ".xml", ".txt", ".json", ".webmanifest"}


def changed_paths(before: str, after: str) -> list[str]:
    if not before or set(before) == {"0"}:
        # First push on a branch/repository: avoid mass-submitting the whole site.
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
    if not clean or clean in EXCLUDED_BASENAMES or clean.startswith(EXCLUDED_PREFIXES):
        return None

    p = Path(clean)
    if p.suffix.lower() not in PUBLIC_TEXT_EXTENSIONS:
        return None

    # Never notify search engines about question-bank/data implementation files.
    lowered = clean.lower()
    if any(part in lowered for part in ("questions.js", "/assets/", "/quiz/assets/")):
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
            # 202 means accepted; 200 means OK. Surface other responses as failures.
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
        print("No changed public URLs to submit to IndexNow.")
        return
    print(f"Submitting {len(urls)} changed public URL(s) to IndexNow.")
    submit(urls)


if __name__ == "__main__":
    main()
