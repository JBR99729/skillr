#!/usr/bin/env python3
"""Capture the current public TpT store with explicit page-count and unique-ID checks.

This discovery step does not edit SkillrHub's published product catalogue.
Only cards inside the actual result list (data-testid=ProductRow) count.
"""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import json
import math
import re
import time

ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-11-19"
BASE = "https://www.teacherspayteachers.com/store/skillrhub"
OUT = ROOT / "data/tpt-observed-store-20261119.json"
REPORT = ROOT / "docs/qa/2026-11-19-tpt-scan.json"

def fetch(page):
    url = f"{BASE}?page={page}"
    last = None
    for attempt in range(3):
        try:
            req = Request(url, headers={
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml",
                "Accept-Language": "en-AU,en;q=0.9",
            })
            with urlopen(req, timeout=35) as response:
                assert response.status == 200, (url, response.status)
                raw = response.read(3000000).decode("utf-8", "replace")
            assert "data-testid=\"ProductRow\"" in raw, ("missing product list", page)
            return raw
        except Exception as exc:
            last = exc
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"TpT page {page} unavailable: {last}")

def parse(page, html):
    soup = BeautifulSoup(html, "html.parser")
    cards = soup.select('[data-testid="ProductRow"]')
    products = []
    for card in cards:
        identifier = re.fullmatch(r"product-row-(\d{7,10})", str(card.get("id", "")))
        assert identifier, ("missing stable TpT listing ID", page)
        pid = identifier.group(1)
        heading = card.select_one("h2 a[href*='/Product/']")
        assert heading, ("missing heading", page, pid)
        title = heading.get_text(" ", strip=True)
        href = urljoin(BASE, heading["href"])
        assert re.search(r"/Product/[^?#]+-" + pid + r"$", href), (pid, href)
        image = card.select_one("picture img[src^='https://ecdn.teacherspayteachers.com/']")
        assert image, ("missing source image", page, pid)
        description = card.select_one('[class*="cardDescription"]')
        assert description, ("missing description", page, pid)
        sidebar = card.select_one('[data-testid="prc-sidebar"]')
        assert sidebar, ("missing price", page, pid)
        pricing_text = sidebar.get_text(" ", strip=True)
        amounts = re.findall(r"\$\s*([\d,]+(?:\.\d{2})?)", pricing_text)
        free = bool(re.search(r"\bFREE\b", pricing_text, re.I))
        if free:
            price = "0.00"
        else:
            assert amounts, ("unknown price", page, pid, pricing_text[:200])
            price = f"{float(amounts[-1].replace(',', '')):.2f}"
        bundle = re.search(r"Bundle\s*\((\d+)\s+products?\)", card.get_text(" ", strip=True), re.I)
        products.append({
            "productId": pid,
            "title": title,
            "url": href,
            "image": image["src"],
            "price": price,
            "free": free,
            "isBundle": bundle is not None,
            "packCount": int(bundle.group(1)) if bundle else None,
            "description": description.get_text(" ", strip=True),
            "observedAt": DATE,
            "storePage": page,
        })
    return products

def main():
    first_html = fetch(1)
    match = re.search(r'placeholder="Search all\s+(\d+)\s+resources"', first_html)
    assert match, "Cannot prove live store listing count"
    expected = int(match.group(1))
    assert 1 <= expected <= 10000, expected
    n_pages = math.ceil(expected / 20)
    all_pages = {1: parse(1, first_html)}
    if n_pages > 1:
        with ThreadPoolExecutor(max_workers=3) as pool:
            futures = {pool.submit(fetch, page): page for page in range(2, n_pages + 1)}
            for future in as_completed(futures):
                page = futures[future]
                all_pages[page] = parse(page, future.result())
    rows = []
    for page in range(1, n_pages + 1):
        group = all_pages[page]
        expected_page = min(20, expected - 20 * (page - 1))
        assert len(group) == expected_page, ("page-size mismatch", page, len(group), expected_page)
        rows.extend(group)
    ids = [r["productId"] for r in rows]
    assert len(rows) == expected, (len(rows), expected)
    assert len(set(ids)) == expected, ("duplicate listing between store pages", len(set(ids)), expected)
    catalogue = json.loads((ROOT / "data/print-and-go-products.json").read_text())
    known_ids = [re.search(r"-(\d{7,10})$", row["tptUrl"]).group(1) for row in catalogue]
    assert len(known_ids) == len(set(known_ids)), "Existing SkillrHub catalogue has duplicates"
    missing = sorted(set(ids) - set(known_ids), key=int)
    stale = sorted(set(known_ids) - set(ids), key=int)
    observed = {
        "storefront": BASE,
        "auditedAt": DATE,
        "expectedCount": expected,
        "pages": n_pages,
        "source": "Public TpT result cards; full pagination; exact immutable listing IDs",
        "products": rows
    }
    report = {
        "auditedAt": DATE,
        "storeListings": expected,
        "storePagesVerified": n_pages,
        "previousCatalogueEntries": len(catalogue),
        "previousUniqueCatalogueIds": len(set(known_ids)),
        "missingCount": len(missing),
        "missingIds": missing,
        "previousCatalogueIdsNotInCurrentStore": stale,
        "freeStoreListings": sum(r["free"] for r in rows),
        "newFreeListingIds": [r["productId"] for r in rows if r["free"] and r["productId"] in missing],
        "safeToImport": True,
        "note": "Read-only scan. Missing listings are not published until reconciled in the catalogue."
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(observed, ensure_ascii=False, indent=2) + "\n")
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({k: v for k,v in report.items() if k not in ("missingIds", "previousCatalogueIdsNotInCurrentStore")}, indent=2))
    print("FIRST_MISSING", missing[:20])

if __name__ == "__main__":
    main()
