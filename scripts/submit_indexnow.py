#!/usr/bin/env python3
"""Submit changed or sitemap-listed SkillrHub pages to IndexNow.

Usage:
  python3 scripts/submit_indexnow.py <before_sha> <after_sha>
  python3 scripts/submit_indexnow.py --all

Normal pushes submit only changed public URLs. Manual ``--all`` mode performs a
one-time reconciliation from the site's sitemap files so important existing
pages are not missed. A change to this script or the IndexNow workflow also
triggers one reconciliation automatically, which safely backfills the new
implementation after deployment.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
HOST = "skillrhub.com"
KEY = "7992061fa6bd152443061bdc0a2a1d27"
KEY_LOCATION = f"{SITE}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"
STREAM_LIMIT = 100
LARGE_RELEASE_BATCH_SIZE = 500
MAX_RETRIES = 3
INDEXNOW_MACHINERY = {
    ".github/workflows/indexnow.yml",
    "scripts/submit_indexnow.py",
}

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


def sitemap_urls() -> list[str]:
    """Return every canonical site URL listed in local sitemap XML files."""
    urls: set[str] = set()
    sitemap_files = sorted(ROOT.glob("sitemap*.xml"))
    if not sitemap_files:
        raise SystemExit("No sitemap XML files found for IndexNow reconciliation.")

    for sitemap_file in sitemap_files:
        try:
            root = ET.parse(sitemap_file).getroot()
        except (ET.ParseError, OSError) as exc:
            raise SystemExit(f"Could not parse {sitemap_file.name}: {exc}") from exc

        for loc in root.findall(".//{*}loc"):
            if not loc.text:
                continue
            url = loc.text.strip()
            if not url.startswith(f"{SITE}/") and url != f"{SITE}/":
                continue
            # Sitemap index entries point to XML inventories, not pages to index.
            if url.lower().split("?", 1)[0].endswith(".xml"):
                continue
            urls.add(url)

    return sorted(urls)


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
            "User-Agent": "SkillrHub-IndexNow/1.1 (+https://skillrhub.com/)",
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
    if not urls:
        print("No URLs to submit to IndexNow.")
        return

    if len(urls) <= STREAM_LIMIT:
        print("Using streaming IndexNow mode (one changed URL per notification).")
        for position, url in enumerate(urls, start=1):
            status = post_urls([url])
            print(f"IndexNow {position}/{len(urls)}: HTTP {status} {url}")
        return

    print(
        f"Large release/reconciliation detected ({len(urls)} URLs); using "
        f"{LARGE_RELEASE_BATCH_SIZE}-URL batches."
    )
    for start in range(0, len(urls), LARGE_RELEASE_BATCH_SIZE):
        batch = urls[start : start + LARGE_RELEASE_BATCH_SIZE]
        status = post_urls(batch)
        print(
            f"IndexNow submitted URLs {start + 1}-{start + len(batch)} "
            f"of {len(urls)}: HTTP {status}"
        )


def main() -> None:
    if len(sys.argv) == 2 and sys.argv[1] == "--all":
        urls = sitemap_urls()
        print(f"Reconciling {len(urls)} sitemap-listed page URL(s) with IndexNow.")
        submit(urls)
        return

    if len(sys.argv) != 3:
        raise SystemExit(
            "usage: submit_indexnow.py <before_sha> <after_sha> | --all"
        )

    before, after = sys.argv[1:]
    paths = changed_paths(before, after)
    urls = sorted({url for path in paths for url in public_urls(path)})

    # Deploying an IndexNow fix should immediately backfill all canonical pages;
    # otherwise the fix itself would submit zero public URLs and Bing could keep
    # reporting historical gaps until those pages happened to change again.
    if INDEXNOW_MACHINERY.intersection(paths):
        urls = sorted(set(urls).union(sitemap_urls()))
        print("IndexNow machinery changed; including a one-time sitemap backfill.")

    if not urls:
        print("No changed indexable public URLs to submit to IndexNow.")
        return

    print(f"Submitting {len(urls)} indexable public URL(s) to IndexNow.")
    submit(urls)


if __name__ == "__main__":
    main()
