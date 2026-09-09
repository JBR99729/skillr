#!/usr/bin/env python3
"""Submit changed, indexable SkillrHub pages to IndexNow.

Usage:
  python3 scripts/submit_indexnow.py <before_sha> <after_sha>

The script maps changed public HTML files and public-facing quiz data files to
their skillrhub.com URLs, skips internal/noindex pages, and notifies IndexNow.
Normal-sized releases are sent one URL at a time so Bing can process fresh
changes as a stream. Very large releases fall back to small batches.
Deleted HTML pages are submitted too so engines can refresh removal state.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
HOST = "skillrhub.com"
KEY = "7992061fa6bd152443061bdc0a2a1d27"
KEY_LOCATION = f"{SITE}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"
STREAM_LIMIT = 100
LARGE_RELEASE_BATCH_SIZE = 50
MAX_RETRIES = 3

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
QUIZ_DATA_RE = re.compile(
    r"^quiz/(year-\d+)/([^/]+)/([^/]+)/(practice|test|worksheet)/"
    r"(?:questions|practice-questions|worksheet-questions)\.js$",
    re.IGNORECASE,
)
ASSESSMENT_BANK_RE = re.compile(
    r"^assets/assessment-banks/year(\d+)/([^/]+)/([^/]+)\.json$",
    re.IGNORECASE,
)


def changed_paths(before: str, after: str) -> list[str]:
    if not before or set(before) == {"0"}:
        return []
    result = subprocess.run(
        ["git", "diff", "--name-only", before, after],
        cwd=ROOT,
        check=True,
        text=True,
        capture_output=True,
    )
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def is_indexable_html(path: str) -> bool:
    disk_file = ROOT / path
    if not disk_file.exists():
        return True
    try:
        head = disk_file.read_text(encoding="utf-8", errors="ignore")[:12000]
    except OSError:
        return False
    return not NOINDEX_RE.search(head)


def route_url(route: str) -> str | None:
    clean_route = route.strip("/")
    index_path = f"{clean_route}/index.html"
    if not is_indexable_html(index_path):
        return None
    return f"{SITE}/{clean_route}/"


def public_urls(path: str) -> list[str]:
    clean = path.replace("\\", "/").lstrip("./")
    if not clean or clean.startswith(EXCLUDED_PREFIXES):
        return []

    if clean.lower().endswith((".html", ".htm")):
        if not is_indexable_html(clean):
            return []
        if clean == "index.html":
            return [f"{SITE}/"]
        if clean.endswith("/index.html"):
            return [f"{SITE}/{clean[:-10]}"]
        return [f"{SITE}/{clean}"]

    quiz_match = QUIZ_DATA_RE.match(clean)
    if quiz_match:
        year, subject, code, mode = quiz_match.groups()
        url = route_url(f"quiz/{year}/{subject}/{code}/{mode}")
        return [url] if url else []

    bank_match = ASSESSMENT_BANK_RE.match(clean)
    if bank_match:
        year_number, subject, code = bank_match.groups()
        urls = []
        for mode in ("practice", "test"):
            url = route_url(f"quiz/year-{year_number}/{subject}/{code}/{mode}")
            if url:
                urls.append(url)
        return urls

    return []


def post_urls(urls: list[str]) -> int:
    payload = json.dumps(
        {
            "host": HOST,
            "key": KEY,
            "keyLocation": KEY_LOCATION,
            "urlList": urls,
        }
    ).encode("utf-8")
    request = urllib.request.Request(
        ENDPOINT,
        data=payload,
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "SkillrHub-IndexNow/1.0 (+https://skillrhub.com/)",
        },
        method="POST",
    )

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return response.status
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            retryable = exc.code == 429 or 500 <= exc.code < 600
            if not retryable or attempt == MAX_RETRIES:
                raise SystemExit(f"IndexNow HTTP {exc.code}: {body}") from exc
            delay = 2 ** (attempt - 1)
            print(f"IndexNow HTTP {exc.code}; retrying in {delay}s.")
            time.sleep(delay)
        except urllib.error.URLError as exc:
            if attempt == MAX_RETRIES:
                raise SystemExit(f"IndexNow network error: {exc}") from exc
            delay = 2 ** (attempt - 1)
            print(f"IndexNow network error; retrying in {delay}s.")
            time.sleep(delay)

    raise SystemExit("IndexNow submission failed unexpectedly.")


def submit(urls: list[str]) -> None:
    if len(urls) <= STREAM_LIMIT:
        print("Using streaming IndexNow mode (one changed URL per notification).")
        for position, url in enumerate(urls, start=1):
            status = post_urls([url])
            print(f"IndexNow {position}/{len(urls)}: HTTP {status} {url}")
        return

    print(
        f"Large release detected ({len(urls)} URLs); using "
        f"{LARGE_RELEASE_BATCH_SIZE}-URL fallback batches."
    )
    for start in range(0, len(urls), LARGE_RELEASE_BATCH_SIZE):
        batch = urls[start : start + LARGE_RELEASE_BATCH_SIZE]
        status = post_urls(batch)
        print(f"IndexNow submitted {len(batch)} URL(s): HTTP {status}")


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: submit_indexnow.py <before_sha> <after_sha>")
    before, after = sys.argv[1:]
    paths = changed_paths(before, after)
    urls = sorted({url for path in paths for url in public_urls(path)})
    if not urls:
        print("No changed indexable public URLs to submit to IndexNow.")
        return
    print(f"Submitting {len(urls)} changed indexable public URL(s) to IndexNow.")
    submit(urls)


if __name__ == "__main__":
    main()
