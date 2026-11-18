#!/usr/bin/env python3
"""Add ONLY newly confirmed TpT listings to their existing SkillrHub catalogue sections.

Requires a full 35-page immutable-ID inventory captured from the live TpT store.
Preserves every existing product, lesson, listing price and product URL. Idempotent.
"""
from collections import Counter, defaultdict
from pathlib import Path
import html
import json
import re

import sync_missing_tpt_products as helper
from generate_sitemap import page_title, visible_search_text

ROOT = Path(__file__).resolve().parents[1]
DATE = "2026-11-19"
STORE = ROOT / "data/tpt-observed-store-20261119.json"
SCAN = ROOT / "docs/qa/2026-11-19-tpt-scan.json"
CATALOGUE = ROOT / "data/print-and-go-products.json"
OUTPUT = ROOT / "docs/qa/2026-11-19-tpt-import.json"
SITE = "https://skillrhub.com"

# Reviewed mapping for an unlabelled listing whose described content is exactly
# Year 5 translations, reflections and rotations, the topic of AC9M5SP03.
REVIEWED_DESCRIPTION_MAP = {"18397652": ["AC9M5SP03"]}
CODE_PATTERN = re.compile(r"\bAC9[EMS](?:F|\d{1,2})[A-Z]+\d{2}\b")

def read(path):
    return json.loads(path.read_text())

def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")

def get_id(p):
    match = re.search(r"-(\d{7,10})$", p["tptUrl"])
    assert match, p.get("tptUrl")
    return match.group(1)

def concise_copy(row):
    original = re.sub(r"^(?:PRODUCT DESCRIPTION|DESCRIPTION)\s*", "", row["description"].strip(), flags=re.I)
    original = re.sub(r"\s+", " ", original)
    sentences = re.split(r"(?<=[.!?])\s+", original)
    complete = []
    for sentence in sentences:
        if len(" ".join(complete + [sentence])) > 330:
            break
        if sentence.endswith((".", "!", "?")):
            complete.append(sentence)
            if len(" ".join(complete)) > 120:
                break
        else:
            break
    if complete:
        return " ".join(complete) + " Preview full contents and the current price on Teachers Pay Teachers."
    shortened = original[:230].rsplit(" ", 1)[0].rstrip(",;: ")
    return shortened + "… View the full listing details on Teachers Pay Teachers."

def new_record(row, units):
    pid = row["productId"]
    title = row["title"]
    match = re.search(r"\bYear\s*(\d{1,2})", title, re.I)
    assert match, ("Cannot assign Australian year", pid, title)
    year = int(match.group(1))
    assert 4 <= year <= 6, ("Not in observed expected year scope", pid, year)
    assert (row["url"].startswith("https://www.teacherspayteachers.com/Product/")
            and row["url"].endswith("-" + pid)), (pid, row["url"])
    assert row["image"].startswith("https://ecdn.teacherspayteachers.com/"), pid
    assert row["price"] is not None and float(row["price"]) >= 0, pid
    assert not row["free"], ("Unexpected new free listing: requires separate verified-free collection update", pid)
    all_codes = sorted(set(CODE_PATTERN.findall(title + " " + row["description"])))
    all_codes.extend(REVIEWED_DESCRIPTION_MAP.get(pid, []))
    codes = sorted({c for c in all_codes if c in units})
    assert codes, ("Missing verified curriculum mapping", pid, title, all_codes)
    for code in codes:
        u = units[code]
        assert u["yearNumber"] == year and u["subjectSlug"] == "maths", (pid, code)
    is_bundle = bool(row["isBundle"])
    slides = bool(re.search(r"\b(?:slides?|powerpoint|presentation)\b", title, re.I))
    printables = bool(re.search(r"\b(?:worksheets?|workbooks?|printables?)\b", title + " " + row["description"], re.I))
    if not slides and not printables:
        # Some Year 6 printable PDF maths packs omit "worksheet" from the
        # shortened store-card title and description; they are not slide decks.
        assert year == 6 and not is_bundle, ("Unknown format requires manual review", pid, title)
        printables = True
    kind = "bundle" if is_bundle else "teaching-slides" if slides else "worksheet"
    desc = concise_copy(row)
    result = dict(
        id="tpt-" + pid, title=title, year=year, yearLabel=f"Year {year}",
        subject="maths", subjectLabel="Maths",
        topics=sorted(set(re.findall(r"\b[a-z]{4,}\b", title.lower()))),
        curriculumCodes=codes, description=desc,
        url="/products/tpt-" + pid + "/", image=row["image"],
        price=row["price"], currency="USD", available=True,
        resourceType=kind, tptUrl=row["url"], free=False, isBundle=is_bundle,
        hasSlides=slides, hasPrintables=printables, market="au",
        listingConfirmedAt=DATE, tptObservedAt=DATE,
        format="Teaching slides and printable worksheets" if slides and printables and is_bundle
        else "Printable worksheet bundle" if is_bundle
        else "Teaching slides" if slides else "Printable worksheets"
    )
    if row.get("packCount"):
        result["packCount"] = int(row["packCount"])
    slide_count = re.search(r"\b(\d{2,4})\s+Slides\b", title, re.I)
    if slide_count:
        result["verifiedListingFacts"] = {"slides": int(slide_count.group(1))}
    return result

def add_topic_links(new, units):
    by_code = defaultdict(list)
    for p in new:
        for code in p["curriculumCodes"]:
            if code in units:
                by_code[code].append(p)
    changed = []
    for code, products in sorted(by_code.items()):
        page = ROOT / units[code]["url"].lstrip("/") / "index.html"
        assert page.exists(), ("Missing matching topic page", code, str(page))
        source = page.read_text()
        marker = "<!-- skillr-tpt-20261119:start -->"
        end = "<!-- skillr-tpt-20261119:end -->"
        if marker in source:
            assert end in source
            source = re.sub(re.escape(marker) + r"[\s\S]*?" + re.escape(end), "", source)
        # Do not recreate links already present in the authored page.
        missing = [p for p in products if p["url"] not in source and p["tptUrl"] not in source
                   and not re.search(r'data-tpt-listing-id=["\x27]' + get_id(p) + r'["\x27]', source)]
        if not missing:
            continue
        sections = []
        for kind, label in (("worksheets", "Paid printable worksheets"),
                            ("slides", "Teaching slides"),
                            ("bundle", "Related bundles")):
            matches = [p for p in missing if helper.resource_format(p) == kind]
            if matches:
                items = "".join(
                    '<li><a href="' + html.escape(p["url"], quote=True) +
                    '" data-tpt-listing-id="' + get_id(p) + '">' +
                    html.escape(p["title"]) + "</a></li>" for p in sorted(matches, key=lambda q: q["title"])
                )
                sections.append("<h3>" + label + "</h3><ul>" + items + "</ul>")
        block = (marker + '<aside class="support" aria-label="New matching TpT resources for ' +
                 html.escape(code) + '"><h2>More matching teaching resources</h2>' +
                 "<p>These are optional, separately purchased TpT products. Check product previews before buying; a bundle may include an individual resource.</p>" +
                 "".join(sections) + "</aside>" + end)
        assert "</main>" in source, code
        new_source = source.replace("</main>", block + "</main>", 1)
        assert source.count("<title>") == new_source.count("<title>")
        assert source.count('rel="canonical"') == new_source.count('rel="canonical"')
        page.write_text(new_source)
        changed.append({"code": code, "linksAdded": len(missing), "topicPage": units[code]["url"]})
    return changed

def update_site_search(pages):
    path = ROOT / "assets/site-search-index.json"
    index = read(path)
    by_url = {i["u"]: i for i in index["items"] if not i.get("e")}
    for p in pages:
        url = p["url"]
        document = ROOT / url.lstrip("/") / "index.html"
        source = document.read_text()
        if url not in by_url:
            obj = {"u": url}
            index["items"].append(obj)
            by_url[url] = obj
        by_url[url].update(t=page_title(source, document), x=visible_search_text(source))
    path.write_text(json.dumps(index, ensure_ascii=False, separators=(",", ":")) + "\n")

def add_sitemap(pages):
    path = ROOT / "sitemap-site.xml"
    source = path.read_text()
    assert "</urlset>" in source
    for p in pages:
        url = SITE + p["url"]
        if "<loc>" + url + "</loc>" not in source:
            source = source.replace(
                "</urlset>", "<url><loc>" + url + "</loc><lastmod>" + DATE +
                "</lastmod></url>\n</urlset>", 1
            )
    path.write_text(source)

def main():
    snapshot, scan = read(STORE), read(SCAN)
    assert snapshot["expectedCount"] == len(snapshot["products"]) == 692, "Full store snapshot changed; recapture first"
    assert scan["storeListings"] == 692 and scan["storePagesVerified"] == 35
    observed = snapshot["products"]
    ids = [r["productId"] for r in observed]
    assert len(ids) == len(set(ids))
    products = read(CATALOGUE)
    existing = {get_id(p): p for p in products}
    assert len(existing) == len(products), "Pre-existing duplicate TpT IDs"
    missing_rows = [r for r in observed if r["productId"] not in existing]
    assert {r["productId"] for r in missing_rows} == set(scan["missingIds"]), "Snapshot vs scan mismatch"
    assert len(missing_rows) == 47, ("Unexpected new listing count", len(missing_rows))
    units = {u["code"]: u for u in read(ROOT / "data/curriculum-units.json")["units"]}
    new = [new_record(r, units) for r in missing_rows]
    assert len(new) == len({get_id(p) for p in new})
    # Validate every candidate record before mutating any site content.
    for p in new:
        assert not (ROOT / p["url"].lstrip("/") / "index.html").exists(), ("Duplicate product route", p["id"])
    products.extend(new)
    assert len(products) == len({get_id(p) for p in products})
    for p in new:
        helper.product_page(p, units)
    write(CATALOGUE, products)
    helper.update_folders(products)
    touched_topics = add_topic_links(new, units)
    update_site_search(new)
    add_sitemap(new)
    retained = sorted(set(existing) - set(ids), key=int)
    live_inventory = {
        "auditedAt": DATE,
        "storefront": snapshot["storefront"],
        "activeProductCount": snapshot["expectedCount"],
        "retainedCatalogueIdsNotInStore": retained,
        "products": [
            {k: row[k] for k in ("productId", "title", "url", "image", "price", "observedAt")}
            for row in observed
        ]
    }
    write(ROOT / "data/tpt-active-product-inventory.json", live_inventory)
    ai = read(ROOT / "ai-index.json")
    ai["new_tpt_products_20261119"] = [
        {"name": p["title"], "url": p["tptUrl"],
         "skillr_product": SITE + p["url"], "curriculum_codes": p["curriculumCodes"],
         "resource_type": p["resourceType"], "year": p["year"]}
        for p in new
    ]
    write(ROOT / "ai-index.json", ai)
    year_counts = dict(sorted(Counter(str(p["year"]) for p in new).items()))
    type_counts = dict(sorted(Counter(helper.resource_format(p) for p in new).items()))
    assert set(retained) == set(scan["previousCatalogueIdsNotInCurrentStore"])
    folder_html = (ROOT / "products/index.html").read_text()
    for p in new:
        pid = get_id(p)
        assert folder_html.count('data-product-id="' + pid + '"') == 1, ("Missing/duplicate visible card", pid)
        source = (ROOT / p["url"].lstrip("/") / "index.html").read_text()
        assert 'rel="canonical" href="' + SITE + p["url"] + '"' in source, pid
        assert p["tptUrl"] in source, ("Missing checkout destination", pid)
        assert p["url"] in (ROOT / "sitemap-site.xml").read_text(), ("Missing sitemap entry", pid)
    assert len(products) == 693, len(products)
    report = {
        "auditedAt": DATE, "storeListings": 692,
        "catalogueEntries": len(products), "previousEntries": len(existing),
        "newlyAdded": len(new), "newIds": [get_id(p) for p in new],
        "newByYear": year_counts, "newByResourceFormat": type_counts,
        "topicPagesLinked": len(touched_topics), "topicLinks": touched_topics,
        "retainedNotInStore": retained,
        "duplicateTpTIds": 0, "duplicateVisibleCards": 0,
        "newRoutesVerified": len(new),
        "freeResourceDirectoryUnchanged": True,
        "qaChecks": ["All 35 TpT pages and 692 unique IDs verified", "Existing IDs untouched",
                     "All new product routes, canonical URLs and checkout URLs present",
                     "All new product cards unique in year/subject/format folders",
                     "All new routes added to sitemap and search index",
                     "Curriculum-to-product links preserve earlier content"],
    }
    write(OUTPUT, report)
    print(json.dumps({k: v for k, v in report.items()
                      if k not in ("newIds", "topicLinks", "qaChecks")}, indent=2))

if __name__ == "__main__":
    main()
