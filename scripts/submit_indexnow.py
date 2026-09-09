#!/usr/bin/env python3
"""Submit changed or authoritative sitemap-listed SkillrHub pages to IndexNow.

Usage:
  python3 scripts/submit_indexnow.py <before_sha> <after_sha>
  python3 scripts/submit_indexnow.py --all

Normal pushes submit only changed public URLs. Manual ``--all`` mode performs a
reconciliation from the root sitemap index only, so IndexNow receives the same
canonical search inventory used by mainstream search engines. A change to this
script or the IndexNow workflow also triggers one reconciliation automatically.
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
from urllib.parse import unquote, urlparse

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
CANONICAL_RE = re.compile(
    r'<link\b[^>]*rel=["\'][^"\']*canonical[^"\']*["\'][^>]*href=["\']([^"\']+)["\']',
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
        head = disk_file.read_text(encoding="utf-8", errors="ignore")[:20000]
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


def local_html_for_url(url: str) -> Path | None:
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.netloc != HOST:
        return None

    path = unquote(parsed.path).lstrip("/")
    if not path:
        candidate = ROOT / "index.html"
    elif parsed.path.endswith("/"):
        candidate = ROOT / path / "index.html"
    else:
        candidate = ROOT / path

    if candidate.suffix.lower() not in {".html", ".htm"}:
        return None
    return candidate if candidate.is_file() else None


def is_search_indexable(url: str) -> bool:
    page = local_html_for_url(url)
    if page is None:
        return False

    try:
        source = page.read_text(encoding="utf-8", errors="ignore")[:20000]
    except OSError:
        return False

    if NOINDEX_RE.search(source):
        return False

    match = CANONICAL_RE.search(source)
    if match:
        canonical = match.group(1).strip().rstrip("/")
        if canonical != url.rstrip("/"):
            return False

    return True


def sitemap_urls() -> list[str]:
    """Return indexable page URLs referenced by the authoritative root sitemap."""
    root_index = ROOT / "sitemap.xml"
    if not root_index.is_file():
        raise SystemExit("Authoritative sitemap.xml was not found.")

    try:
        root = ET.parse(root_index).getroot()
    except (ET.ParseError, OSError) as exc:
        raise SystemExit(f"Could not parse sitemap.xml: {exc}") from exc

    urls: set[str] = set()
    sitemap_locs = root.findall(".//{*}sitemap/{*}loc")
    if not sitemap_locs:
        raise SystemExit("sitemap.xml does not contain child sitemap entries.")

    for loc in sitemap_locs:
        if not loc.text:
            continue
        sitemap_url = loc.text.strip()
        parsed = urlparse(sitemap_url)
        if parsed.scheme != "https" or parsed.netloc != HOST:
            continue
        child = ROOT / Path(parsed.path).name
        if not child.is_file():
            raise SystemExit(f"Missing sitemap child: {child.name}")

        try:
            child_root = ET.parse(child).getroot()
        except (ET.ParseError, OSError) as exc:
            raise SystemExit(f"Could not parse {child.name}: {exc}") from exc

        for url_loc in child_root.findall(".//{*}url/{*}loc"):
            if not url_loc.text:
                continue
            url = url_loc.text.strip()
            if is_search_indexable(url):
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
            "User-Agent": "SkillrHub-IndexNow/1.2 (+https://skillrhub.com/)",
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
        print(f"Reconciling {len(urls)} authoritative indexable page URL(s) with IndexNow.")
        submit(urls)
        return

    if len(sys.argv) != 3:
        raise SystemExit(
            "usage: submit_indexnow.py <before_sha> <after_sha> | --all"
        )

    before, after = sys.argv[1:]
    paths = changed_paths(before, after)
    urls = sorted({url for path in paths for url in public_urls(path)})

    if INDEXNOW_MACHINERY.intersection(paths):
        urls = sorted(set(urls).union(sitemap_urls()))
        print("IndexNow machinery changed; including one authoritative sitemap backfill.")

    if not urls:
        print("No changed indexable public URLs to submit to IndexNow.")
        return

    print(f"Submitting {len(urls)} indexable public URL(s) to IndexNow.")
    submit(urls)


if __name__ == "__main__":
    main()
