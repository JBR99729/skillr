#!/usr/bin/env python3
"""Merge the TpT additions into the latest main sitemap and search index, losslessly.

Called after git merge has checked for conflicts. The original main/feature
snapshots are passed explicitly; other paths are left to git's normal merge.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-11-19"
assert len(sys.argv) == 5, "expected: main-search feature-search main-sitemap feature-sitemap"
main_search = json.loads(Path(sys.argv[1]).read_text())
feature_search = json.loads(Path(sys.argv[2]).read_text())
main_sitemap = Path(sys.argv[3]).read_text()
feature_sitemap = Path(sys.argv[4]).read_text()
report = json.loads((ROOT / "docs/qa/2026-11-19-tpt-import.json").read_text())
ids = report["newIds"]
assert len(ids) == len(set(ids)) == 47
main_items = main_search["items"]
feature_items = feature_search["items"]
main_by_url = {p["u"]: p for p in main_items if not p.get("e")}
feature_by_url = {p["u"]: p for p in feature_items if not p.get("e")}
added = 0
for pid in ids:
    url = f"/products/tpt-{pid}/"
    assert url in feature_by_url, ("No current-branch search document", url)
    if url not in main_by_url:
        obj = feature_by_url[url].copy()
        main_items.append(obj)
        main_by_url[url] = obj
        added += 1
    absolute = "https://skillrhub.com" + url
    needle = f"<loc>{absolute}</loc>"
    assert needle in feature_sitemap, ("No current-branch sitemap URL", absolute)
    if needle not in main_sitemap:
        main_sitemap = main_sitemap.replace(
            "</urlset>", f"<url><loc>{absolute}</loc><lastmod>{DATE}</lastmod></url>\n</urlset>", 1
        )
    assert main_sitemap.count(needle) == 1, ("Duplicate sitemap URL", absolute)
assert "</urlset>" in main_sitemap
assert len([p for p in main_items if p.get("u") in {f"/products/tpt-{pid}/" for pid in ids}]) == 47
(ROOT / "assets/site-search-index.json").write_text(
    json.dumps(main_search, ensure_ascii=False, separators=(",", ":")) + "\n"
)
(ROOT / "sitemap-site.xml").write_text(main_sitemap)
print(json.dumps({
    "mergedNewSearchEntries": added,
    "retainedMainSearchEntries": len(main_items) - added,
    "newSitemapEntriesVerified": 47,
    "latestMainBasePreserved": True,
    "otherMainChangesPreservedByGitMerge": True,
}, indent=2))
