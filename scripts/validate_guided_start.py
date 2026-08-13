#!/usr/bin/env python3
"""Validate guided-start coverage and Teacher Slide shell isolation."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
ROUTE_FIELDS = ("url", "practiceUrl", "testUrl", "worksheetUrl")
SLIDE_DEPENDENCIES = (
    "/assets/skillr-svg-runtime.js?v=2",
    "/assets/skillr-concept-svg.js?v=2",
    "/assets/curriculum-cluster-core.js?v=1",
    "/assets/curriculum-visual-layer.js?v=2",
    "/assets/teacher-slide-clusters.js?v=1",
)
SLIDE_SHELL_FORBIDDEN = (
    "/pwa-register.js",
    "serviceWorker",
    "beforeinstallprompt",
    "first-visit-help.js",
    "normalizeSharedChrome",
    "setupUtilityControls",
    "showInstallBanner",
)
NONLEGACY_SLIDE_ROUTES = {
    "/worksheets/foundation/maths/teacher-slides/live.html",
    "/worksheets/foundation/english/teacher-slides/live.html",
    "/worksheets/foundation/science/teacher-slides/live.html",
    "/worksheets/year1/english/teacher-slides/live.html",
    "/worksheets/year1/science/teacher-slides/live.html",
    *{
        f"/worksheets/year{year}/{subject}/teacher-slides/live.html"
        for year in range(8, 11)
        for subject in ("maths", "science", "english")
    },
}


def uses_legacy_slide_enhancements(route: str) -> bool:
    path = route.lower()
    return bool(
        re.fullmatch(r"/worksheets/year1/maths/teacher-slides/live\.html", path)
        or re.fullmatch(r"/worksheets/year[2-7]/(?:maths|science|english)/teacher-slides/live\.html", path)
    )


def local_file(route: str) -> Path:
    path = urlparse(route).path.lstrip("/")
    target = ROOT / path
    return target / "index.html" if route.endswith("/") else target


def normalise_search_text(value: object) -> str:
    return " ".join(re.findall(r"[a-z0-9]+", str(value or "").lower()))


def main() -> None:
    manifest = json.loads((ROOT / "data/curriculum-units.json").read_text(encoding="utf-8"))["units"]
    guided = json.loads((ROOT / "data/guided-start-topics.json").read_text(encoding="utf-8"))["topics"]
    errors: list[str] = []

    source_codes = {unit.get("code") for unit in manifest}
    guided_codes = {unit.get("code") for unit in guided}
    if len(guided) != len(manifest) or guided_codes != source_codes:
        errors.append(
            f"guided topics do not match curriculum manifest: {len(guided)} guided / {len(manifest)} source"
        )

    guided_by_code = {unit.get("code"): unit for unit in guided}
    for source_unit in manifest:
        code = source_unit.get("code") or "unknown code"
        searchable = str(guided_by_code.get(code, {}).get("searchTerms") or "")
        curriculum_parts = [
            source_unit.get("title"),
            source_unit.get("description"),
            source_unit.get("strand"),
            source_unit.get("subStrand"),
            *(item.get("text") for item in source_unit.get("elaborations", [])),
        ]
        for part in curriculum_parts:
            normalised = normalise_search_text(part)
            if normalised and normalised not in searchable:
                errors.append(f"{code}: guided search omits curriculum text: {normalised[:80]}")
                break

    for unit in guided:
        code = unit.get("code") or "unknown code"
        for field in ROUTE_FIELDS:
            target = local_file(str(unit.get(field) or ""))
            if not target.is_file():
                errors.append(f"{code}: missing {field} target {target.relative_to(ROOT)}")
        slide_host = ROOT / "worksheets" / str(unit.get("yearFolder")) / str(unit.get("subjectSlug")) / "teacher-slides/live.html"
        if not slide_host.is_file():
            errors.append(f"{code}: missing live Teacher Slide host {slide_host.relative_to(ROOT)}")

    hosts = sorted(ROOT.glob("worksheets/*/*/teacher-slides/live.html"))
    if len(hosts) != 33:
        errors.append(f"expected 33 Teacher Slide hosts, found {len(hosts)}")
    for host in hosts:
        source = host.read_text(encoding="utf-8")
        if source.count('/assets/display-only.js?v=2') != 1 or '/assets/display-only.js?v=1' in source:
            errors.append(f"{host.relative_to(ROOT)}: display-only.js?v=2 must load exactly once")
        if "/pwa-register.js" in source:
            errors.append(f"{host.relative_to(ROOT)}: PWA/install script must not load")

    display_only = (ROOT / "assets/display-only.js").read_text(encoding="utf-8")
    if display_only.count('/assets/teacher-slide-shell.js?v=2') != 1:
        errors.append("display-only.js must load the isolated Teacher Slide shell exactly once")
    service_worker = (ROOT / "service-worker.js").read_text(encoding="utf-8")
    if 'url.pathname === "/assets/display-only.js"' not in service_worker:
        errors.append("service-worker.js must keep display-only.js on the network-first hot-script path")

    slide_shell = (ROOT / "assets/teacher-slide-shell.js").read_text(encoding="utf-8")
    for dependency in SLIDE_DEPENDENCIES:
        if slide_shell.count(dependency) != 1:
            errors.append(f"teacher-slide-shell.js: expected one dependency load for {dependency}")
    for forbidden in SLIDE_SHELL_FORBIDDEN:
        if forbidden in slide_shell:
            errors.append(f"teacher-slide-shell.js: forbidden site/PWA feature {forbidden}")
    if "setupSlideKeyboard" not in slide_shell or "ArrowRight" not in slide_shell or "ArrowLeft" not in slide_shell:
        errors.append("teacher-slide-shell.js: legacy Previous/Next keyboard navigation is missing")
    whitelist_source = slide_shell[slide_shell.find("const restoreLegacyEnhancements"):slide_shell.find("function loadScript")]
    expected_patterns = (
        r"/^\/worksheets\/year1\/maths\/teacher-slides\/live\.html$/i",
        r"/^\/worksheets\/year[2-7]\/(?:maths|science|english)\/teacher-slides\/live\.html$/i",
    )
    if any(pattern not in whitelist_source for pattern in expected_patterns):
        errors.append("teacher-slide-shell.js: the 19-host legacy whitelist is incomplete")
    if "foundation" in whitelist_source.lower() or "year1\\/(?:maths|english)" in whitelist_source:
        errors.append("teacher-slide-shell.js: a native Foundation/Year 1 deck is in the legacy whitelist")

    host_routes = {f"/{host.relative_to(ROOT).as_posix().lower()}" for host in hosts}
    legacy_routes = {route for route in host_routes if uses_legacy_slide_enhancements(route)}
    if len(legacy_routes) != 19:
        errors.append(f"legacy slide whitelist must contain 19 hosts, found {len(legacy_routes)}")
    leaked_nonlegacy = sorted(NONLEGACY_SLIDE_ROUTES & legacy_routes)
    if leaked_nonlegacy:
        errors.append(f"native/nonlegacy Teacher Slides entered the legacy whitelist: {', '.join(leaked_nonlegacy)}")

    foundation_english_route = "/worksheets/foundation/english/teacher-slides/live.html"
    foundation_english_host = (ROOT / foundation_english_route.lstrip("/")).read_text(encoding="utf-8")
    foundation_renderer = (ROOT / "assets/foundation-v1.1-render.js").read_text(encoding="utf-8")
    native_arrow_handlers = foundation_renderer.count('document.addEventListener("keydown"')
    native_arrow_steps = foundation_renderer.count('["ArrowRight", "PageDown"].includes(event.key)')
    fallback_arrow_handlers = int(uses_legacy_slide_enhancements(foundation_english_route))
    if foundation_english_host.count('/assets/foundation-v1.1-render.js') != 1:
        errors.append("Foundation English does not load its v1.1 slide renderer exactly once")
    if native_arrow_handlers != 1 or native_arrow_steps != 1 or native_arrow_handlers + fallback_arrow_handlers != 1:
        errors.append(
            "Foundation English ArrowRight must advance exactly one slide "
            f"(native handlers={native_arrow_handlers}, fallback handlers={fallback_arrow_handlers})"
        )

    pwa_source = (ROOT / "pwa-register.js").read_text(encoding="utf-8")
    if "/assets/teacher-slide-clusters.js" in pwa_source or "setupSlideKeyboard" in pwa_source:
        errors.append("pwa-register.js still owns Teacher Slide-only behaviour")

    builder_sections = {
        "scripts/build_year9_10_maths_topics.py": "def slide_shell",
        "scripts/build_upper_science_topics.mjs": "function slidePage",
        "scripts/build_upper_english_topics.mjs": 'fs.writeFileSync(path.join(root,"worksheets/year"+year+"/english/teacher-slides/live.html")',
    }
    for relative, marker in builder_sections.items():
        source = (ROOT / relative).read_text(encoding="utf-8")
        section = source[source.find(marker):]
        if marker not in source or "/assets/display-only.js?v=2" not in section:
            errors.append(f"{relative}: generated Teacher Slide host lacks display-only.js?v=2")
        if "/pwa-register.js" in section:
            errors.append(f"{relative}: generated Teacher Slide host still loads the PWA/install script")

    normal_pwa_pages = sum(
        "/pwa-register.js" in path.read_text(encoding="utf-8", errors="replace")
        for path in ROOT.rglob("*.html")
        if "teacher-slides" not in path.parts
    )
    if not normal_pwa_pages:
        errors.append("normal site pages no longer contain the PWA/install script")

    public_pages = 0
    help_entry_pages = 0
    for page in ROOT.rglob("*.html"):
        if ".git" in page.parts or page.name == "offline.html" or "teacher-slides" in page.parts:
            continue
        source = page.read_text(encoding="utf-8", errors="replace")
        robots = re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)', source, re.I)
        if robots and "noindex" in robots.group(1).lower():
            continue
        public_pages += 1
        if "pwa-register.js" in source or "share-button.js" in source or "first-visit-help.js" in source:
            help_entry_pages += 1
        else:
            errors.append(f"{page.relative_to(ROOT)}: public page has no first-visit help loader")

    if errors:
        print("\n".join(errors))
        print(f"FAIL: {len(errors)} guided-start or Teacher Slide errors.")
        sys.exit(1)

    print(
        f"PASS: {len(guided)}/{len(manifest)} curriculum topics have all resource routes; "
        f"{len(hosts)}/33 Teacher Slide hosts are display-only, PWA-free and use an isolated slide shell; "
        f"{len(legacy_routes)}/19 legacy hosts receive fallback navigation; Foundation English ArrowRight advances once; "
        f"first-visit help reaches {help_entry_pages}/{public_pages} public pages; "
        f"PWA controls remain on {normal_pwa_pages} normal pages."
    )


if __name__ == "__main__":
    main()
