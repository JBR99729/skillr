#!/usr/bin/env python3
import argparse
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
STAGES = ["foundation", *[f"year{year}" for year in range(1, 11)]]
SUBJECTS = ["maths", "english", "science"]
CODE_RE = re.compile(r"\bAC9[A-Z0-9]+\b", re.I)
SLIDE_LINK_RE = re.compile(
    r'href=["\']([^"\']*(?:teacher-deck|teacher-slides|teacher-slide)[^"\']*)["\']',
    re.I,
)
DIRECT_DECK_RE = re.compile(r'href=["\'][^"\']+\.(?:pdf|pptx)(?:[?#][^"\']*)?["\']', re.I)
LIVE_MARKERS = (
    "data-skillr-teacher-host",
    "slideProgress",
    "slide-progress",
    "teacherGuidance",
    "teacher-guidance",
    "Previous",
    "Next",
)


def read(path):
    return path.read_text(encoding="utf-8", errors="ignore")


def inventory_codes(stage, subject):
    index = ROOT / stage / "curriculum" / subject / "index.html"
    if not index.exists():
        return [], f"missing curriculum index: {index.relative_to(ROOT)}"
    return sorted({match.group(0).upper() for match in CODE_RE.finditer(read(index))}), None


def find_topic(stage, subject, code):
    root = ROOT / stage / subject
    if not root.exists():
        return None, "subject topic root missing"
    prefix = code.lower()
    matches = [
        directory
        for directory in root.iterdir()
        if directory.is_dir()
        and (directory.name.lower() == prefix or directory.name.lower().startswith(prefix + "-"))
        and (directory / "index.html").exists()
    ]
    if len(matches) == 1:
        return matches[0], None
    if not matches:
        return None, "no code-prefixed topic directory with index.html"
    return None, f"ambiguous topic directories: {[directory.name for directory in matches]}"


def resolve_link(topic_dir, href):
    path = urlsplit(href).path
    candidate = ROOT / path.lstrip("/") if path.startswith("/") else topic_dir / path
    if candidate.suffix.lower() != ".html":
        candidate /= "index.html"
    try:
        candidate = candidate.resolve()
        candidate.relative_to(ROOT.resolve())
    except (OSError, ValueError):
        return None
    return candidate


def inspect_topic(topic_dir, code):
    html = read(topic_dir / "index.html")
    errors = []
    warnings = []
    if code.lower() not in html.lower():
        errors.append("topic page does not identify its curriculum code")
    if DIRECT_DECK_RE.search(html):
        errors.append("topic page exposes a direct PDF/PPTX teacher-slide download")
    links = [match.group(1) for match in SLIDE_LINK_RE.finditer(html)]
    links = [
        link
        for link in links
        if not link.startswith("#")
        and not re.search(r"\.(?:pdf|pptx)(?:[?#]|$)", link, re.I)
    ]
    if not links:
        warnings.append("no live Teacher Slides link detected")
        return None, errors, warnings
    viewer = resolve_link(topic_dir, links[0])
    if viewer is None or not viewer.exists():
        errors.append(f"Teacher Slides target is missing or outside the repository: {links[0]}")
        return None, errors, warnings
    return viewer, errors, warnings


def inspect_viewer(viewer, code):
    html = read(viewer)
    errors = []
    warnings = []
    if DIRECT_DECK_RE.search(html) or re.search(r"\bdownload\s*=", html, re.I):
        errors.append("Teacher Slides viewer exposes a PDF/PPTX download")
    if not any(marker.lower() in html.lower() for marker in LIVE_MARKERS):
        warnings.append("live slide host/navigation markers not detected in the route HTML")
    if code.lower() not in html.lower() and "data-skillr-teacher-host" not in html:
        warnings.append("curriculum code or shared live-slide host marker not detected")
    return errors, warnings


def main():
    parser = argparse.ArgumentParser(description="Audit F-10 routes against the locked live v1.1 architecture.")
    parser.add_argument("--strict", action="store_true", help="Fail when migration warnings remain.")
    args = parser.parse_args()
    records = []
    inventory_errors = []

    for stage in STAGES:
        for subject in SUBJECTS:
            codes, inventory_error = inventory_codes(stage, subject)
            if inventory_error:
                inventory_errors.append({"stage": stage, "subject": subject, "error": inventory_error})
                continue
            for code in codes:
                record = {"stage": stage, "subject": subject, "code": code, "topic": None, "viewer": None, "errors": [], "warnings": []}
                topic_dir, topic_error = find_topic(stage, subject, code)
                if topic_error:
                    record["errors"].append(topic_error)
                else:
                    record["topic"] = str((topic_dir / "index.html").relative_to(ROOT))
                    viewer, errors, warnings = inspect_topic(topic_dir, code)
                    record["errors"].extend(errors)
                    record["warnings"].extend(warnings)
                    if viewer:
                        record["viewer"] = str(viewer.relative_to(ROOT))
                        errors, warnings = inspect_viewer(viewer, code)
                        record["errors"].extend(errors)
                        record["warnings"].extend(warnings)
                records.append(record)

    summary = {
        "curriculum_codes": len(records),
        "topic_routes_found": sum(bool(record["topic"]) for record in records),
        "live_slide_routes_found": sum(bool(record["viewer"]) for record in records),
        "codes_with_errors": sum(bool(record["errors"]) for record in records),
        "codes_with_migration_warnings": sum(bool(record["warnings"]) for record in records),
        "inventory_errors": len(inventory_errors),
    }
    report = {"standard": "Topic Guide + Teacher Slide v1.1", "summary": summary, "inventory_errors": inventory_errors, "records": records}
    output = ROOT / "tmp" / "f10-curriculum-v11-audit.json"
    output.parent.mkdir(exist_ok=True)
    output.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")

    print("F-10 CURRICULUM V1.1 AUDIT")
    print(json.dumps(summary, indent=2))
    print(f"Report: {output.relative_to(ROOT)}")
    has_errors = bool(inventory_errors) or any(record["errors"] for record in records)
    has_warnings = any(record["warnings"] for record in records)
    if has_errors:
        print("ERROR: broken or unsafe public resource routes were detected.", file=sys.stderr)
    if has_warnings:
        print("NOTICE: legacy migration gaps remain; see the JSON report.")
    return 1 if args.strict and (has_errors or has_warnings) else 0


if __name__ == "__main__":
    sys.exit(main())