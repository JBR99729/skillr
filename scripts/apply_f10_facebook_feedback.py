#!/usr/bin/env python3
"""Add the approved SkillrHub Facebook feedback card to every canonical F-10 topic page.

The card is deliberately static HTML:
- no Facebook iframe or SDK
- no background Facebook requests
- no database or login
- Facebook opens only after the learner chooses a feedback action

The generated block is marker-delimited and idempotent so future design changes can
be rolled out consistently without hand-editing hundreds of topic pages.
"""
from __future__ import annotations

import argparse
import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR_ROOTS = [ROOT / "foundation", *[ROOT / f"year{n}" for n in range(1, 11)]]
SUBJECTS = ("maths", "science", "english")

FACEBOOK_POST_URL = (
    "https://www.facebook.com/permalink.php?"
    "story_fbid=pfbid02QdD3Q8fBLbvj62UHhTnqwoRDXeQQaVjMirqWvuxZHHogoYCxeybZYubuf7LAjvTdl"
    "&id=61591597270383"
)
FACEBOOK_POST_HREF = FACEBOOK_POST_URL.replace("&", "&amp;")

START_MARKER = "<!-- skillr-facebook-feedback:start -->"
END_MARKER = "<!-- skillr-facebook-feedback:end -->"

GENERATED_RE = re.compile(
    r"<!--\s*skillr-facebook-feedback:start\s*-->[\s\S]*?"
    r"<!--\s*skillr-facebook-feedback:end\s*-->(?:\r?\n)?",
    re.I,
)

# Remove the one-page AC9S7U01 prototype when converting it to the generated form.
LEGACY_PROTOTYPE_RE = re.compile(
    r"<section\b[^>]*aria-labelledby=[\"']skillr-feedback-title(?:-[^\"']*)?[\"'][^>]*>"
    r"[\s\S]*?</section>(?:\r?\n)?",
    re.I,
)

H1_RE = re.compile(r"<h1\b[^>]*>(.*?)</h1>", re.I | re.S)
RELATED_HEADING_RE = re.compile(
    r"<(?:h2|summary)\b[^>]*>\s*(?:<strong>)?\s*Related\b",
    re.I,
)


def topic_pages() -> list[Path]:
    pages: list[Path] = []
    for year_root in YEAR_ROOTS:
        if not year_root.is_dir():
            continue
        for subject in SUBJECTS:
            subject_root = year_root / subject
            if not subject_root.is_dir():
                continue
            for child in subject_root.iterdir():
                if not child.is_dir() or not re.match(r"^ac9[a-z0-9]+", child.name, re.I):
                    continue
                page = child / "index.html"
                if page.is_file():
                    pages.append(page)
    return sorted(pages)


def topic_code(path: Path) -> str:
    match = re.match(r"^(ac9[a-z0-9]+)", path.parent.name, re.I)
    if not match:
        raise ValueError(f"Cannot derive curriculum code from {path}")
    return match.group(1).upper()


def topic_title(source: str, code: str) -> str:
    match = H1_RE.search(source)
    if not match:
        return code
    value = re.sub(r"<[^>]+>", " ", match.group(1))
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value).strip()
    return value or code


def remove_existing_feedback(source: str) -> str:
    source = GENERATED_RE.sub("", source)
    source = LEGACY_PROTOTYPE_RE.sub("", source)
    return source


def feedback_card(code: str, title: str) -> str:
    safe_code = html.escape(code, quote=True)
    safe_title = html.escape(title, quote=True)
    heading_id = f"skillr-feedback-title-{code.lower()}"
    link_common = (
        f'href="{FACEBOOK_POST_HREF}" target="_blank" rel="noopener noreferrer" '
    )
    button_style = (
        "display:inline-flex;align-items:center;justify-content:center;gap:.35rem;"
        "padding:.72rem .92rem;border:1px solid #c7d5ec;border-radius:9px;"
        "background:#fff;color:#173968;text-decoration:none;font-weight:750;line-height:1.2"
    )
    primary_style = button_style.replace(
        "background:#fff;color:#173968", "background:#2457d6;color:#fff"
    ).replace("border:1px solid #c7d5ec", "border:1px solid #2457d6")

    return (
        f"{START_MARKER}\n"
        f'<section class="skillr-feedback-card curriculum-topic-section" '
        f'aria-labelledby="{heading_id}" '
        f'style="border:1px solid #d8e3f7;background:#f7faff;border-radius:14px;padding:18px;margin:24px 0">\n'
        f'  <p style="margin:0 0 .35rem;color:#2457d6;font-size:.82rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase">Help improve SkillrHub</p>\n'
        f'  <h2 id="{heading_id}" style="margin:.2rem 0 .55rem">Questions or feedback?</h2>\n'
        f'  <p style="margin:.35rem 0 .7rem">Ask about this lesson, suggest an improvement or report an error. Facebook opens only when you choose an option below.</p>\n'
        f'  <p style="margin:.35rem 0 .85rem"><strong>Topic reference:</strong> {safe_code} — {safe_title}</p>\n'
        f'  <div style="display:flex;flex-wrap:wrap;gap:10px">\n'
        f'    <a {link_common}style="{primary_style}" aria-label="Ask a question about {safe_code} on Facebook, opens in a new tab">💬 Ask a question</a>\n'
        f'    <a {link_common}style="{button_style}" aria-label="Suggest an improvement for {safe_code} on Facebook, opens in a new tab">💡 Suggest an improvement</a>\n'
        f'    <a {link_common}style="{button_style}" aria-label="Report an error in {safe_code} on Facebook, opens in a new tab">⚠️ Report an error</a>\n'
        f'  </div>\n'
        f'  <p style="font-size:.9rem;margin:.85rem 0 0"><strong>Privacy:</strong> Please don’t share personal student or school information. Younger students should ask a parent, guardian or teacher to post on their behalf.</p>\n'
        f'</section>\n'
        f"{END_MARKER}"
    )


def insertion_index(source: str) -> int:
    related = RELATED_HEADING_RE.search(source)
    if related:
        heading_index = related.start()
        section_index = source.rfind("<section", 0, heading_index)
        details_index = source.rfind("<details", 0, heading_index)
        container_index = max(section_index, details_index)
        if container_index >= 0:
            return container_index

    aside = re.search(r"<aside\b", source, re.I)
    if aside:
        content_close = source.rfind("</div>", 0, aside.start())
        if content_close >= 0:
            return content_close

    main_close = source.lower().rfind("</main>")
    if main_close >= 0:
        return main_close

    body_close = source.lower().rfind("</body>")
    if body_close >= 0:
        return body_close

    return len(source)


def render_page(source: str, code: str, title: str) -> str:
    clean = remove_existing_feedback(source)
    card = feedback_card(code, title)
    index = insertion_index(clean)

    # Preserve existing indentation without turning it into a whitespace-only
    # added line. insertion_index points at the opening "<" of the next block,
    # so any trailing spaces/tabs in prefix are that block's indentation.
    prefix = clean[:index]
    suffix = clean[index:]
    indent_match = re.search(r"[ \t]+$", prefix)
    indent = indent_match.group(0) if indent_match else ""
    if indent:
        prefix = prefix[: -len(indent)]
    if prefix and not prefix.endswith(("\n", "\r")):
        prefix += "\n"

    if indent:
        indented_card = card.replace("\n", f"\n{indent}")
        return f"{prefix}{indent}{indented_card}\n{indent}{suffix}"
    return f"{prefix}{card}\n{suffix}"


def validate_page(path: Path, source: str) -> list[str]:
    code = topic_code(path)
    issues: list[str] = []
    if source.count(START_MARKER) != 1 or source.count(END_MARKER) != 1:
        issues.append("must contain exactly one generated feedback block")
        return issues

    block_match = GENERATED_RE.search(source)
    if not block_match:
        issues.append("feedback markers do not form a valid block")
        return issues

    block = block_match.group(0)
    if code not in block:
        issues.append(f"feedback block is missing topic reference {code}")
    if FACEBOOK_POST_HREF not in block:
        issues.append("feedback block does not use the approved pinned Facebook post")
    if block.count("target=\"_blank\"") != 3:
        issues.append("feedback block must expose exactly three deliberate Facebook actions")
    if re.search(r"<iframe\b|connect\.facebook\.net|facebook\.com/plugins", block, re.I):
        issues.append("feedback block must not embed Facebook or load the Facebook SDK")
    return issues


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="verify without changing files")
    args = parser.parse_args()

    pages = topic_pages()
    if len(pages) < 500:
        raise SystemExit(
            f"Refusing incomplete rollout: discovered only {len(pages)} canonical F-10 topic pages"
        )

    if args.check:
        failures: list[str] = []
        for page in pages:
            source = page.read_text(encoding="utf-8", errors="replace")
            for issue in validate_page(page, source):
                failures.append(f"{page.relative_to(ROOT).as_posix()}: {issue}")
        if failures:
            print("F-10 Facebook feedback-card validation FAILED:\n")
            for failure in failures:
                print(f"- {failure}")
            raise SystemExit(1)
        print(f"F-10 Facebook feedback cards: PASS ({len(pages)} topic pages)")
        return

    changed: list[str] = []
    for page in pages:
        source = page.read_text(encoding="utf-8", errors="replace")
        code = topic_code(page)
        title = topic_title(source, code)
        output = render_page(source, code, title)
        if output != source:
            page.write_text(output, encoding="utf-8")
            changed.append(page.relative_to(ROOT).as_posix())

    print(f"Applied Facebook feedback cards to {len(changed)} of {len(pages)} topic pages.")
    for item in changed:
        print(item)


if __name__ == "__main__":
    main()
