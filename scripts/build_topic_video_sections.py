#!/usr/bin/env python3
"""Add optional static video sections without rewriting existing lesson content.

Edit data/topic-videos.csv, then run this file. No packages, API keys or network
access are needed. --check reports stale output without writing anything.
"""
from __future__ import annotations

import argparse
import csv
import html
import json
import re
import sys
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, quote, urlencode, urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
START = "<!-- skillr-topic-videos:start -->"
END = "<!-- skillr-topic-videos:end -->"
SHORTCUT_START = "<!-- skillr-video-shortcut:start -->"
SHORTCUT_END = "<!-- skillr-video-shortcut:end -->"
SHORTCUT = (SHORTCUT_START + '<p class="skillr-video-shortcut" id="skillr-written-lesson">'
            '<span>Need another explanation?</span> '
            '<a href="#skillr-video-explanation">Watch a video</a></p>' + SHORTCUT_END)
STYLE = '<link rel="stylesheet" href="/assets/css/topic-videos.css">'
FIELDS = ["codes", "video_url", "title", "creator", "min_year", "max_year",
          "focus", "watch_prompt", "after_watching", "source_url", "review_note"]


def video_id(url: str) -> str:
    parsed = urlsplit(url)
    if parsed.scheme != "https" or parsed.username or parsed.password:
        raise ValueError(f"Use an HTTPS YouTube watch URL: {url}")
    if parsed.netloc in ("www.youtube.com", "youtube.com") and parsed.path == "/watch":
        value = parse_qs(parsed.query).get("v", [""])[0]
    elif parsed.netloc == "youtu.be":
        value = parsed.path.lstrip("/")
    else:
        raise ValueError(f"Not a supported YouTube URL: {url}")
    if not re.fullmatch(r"[A-Za-z0-9_-]{11}", value):
        raise ValueError(f"Invalid YouTube video ID: {url}")
    return value


class MainBoundary(HTMLParser):
    """Locate lesson boundaries without reserialising the document."""
    def __init__(self, source: str):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.line_offsets = [0]
        self.line_offsets.extend(m.end() for m in re.finditer("\n", source))
        self.close = None
        self.heading_end = None
        self.hero_close = None
        self.canonical = None
        self.refresh = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link" and "canonical" in attrs.get("rel", "").lower().split():
            self.canonical = attrs.get("href")
        if tag == "meta" and attrs.get("http-equiv", "").lower() == "refresh":
            self.refresh = attrs.get("content", "")

    def handle_endtag(self, tag):
        line, column = self.getpos()
        point = self.line_offsets[line - 1] + column
        if tag == "main" and self.close is None:
            self.close = point
        if tag == "h1" and self.heading_end is None:
            self.heading_end = self.source.index(">", point) + 1
        if tag == "header" and self.heading_end is not None and self.hero_close is None:
            self.hero_close = point


def load_rows():
    units = json.loads((ROOT / "data/curriculum-units.json").read_text())["units"]
    by_code = {unit["code"]: unit for unit in units}
    if len(units) != len(by_code):
        raise ValueError("Duplicate codes in the curriculum inventory")
    videos = defaultdict(list)
    with (ROOT / "data/topic-videos.csv").open(newline="", encoding="utf-8-sig") as stream:
        reader = csv.DictReader(stream)
        if reader.fieldnames != FIELDS:
            raise ValueError("Unexpected video CSV columns")
        for line, row in enumerate(reader, 2):
            if not any(row.values()):
                continue
            if None in row or any(row.get(field) is None for field in FIELDS):
                raise ValueError(f"Malformed CSV row {line}")
            row = {key: value.strip() for key, value in row.items()}
            if any(not row[field] for field in FIELDS):
                raise ValueError(f"Missing required value on row {line}")
            row["id"] = video_id(row["video_url"])
            row["min_year"], row["max_year"] = int(row["min_year"]), int(row["max_year"])
            if not 0 <= row["min_year"] <= row["max_year"] <= 10:
                raise ValueError(f"Invalid year range on row {line}")
            if urlsplit(row["source_url"]).scheme != "https":
                raise ValueError(f"Source must be HTTPS on row {line}")
            codes = row["codes"].split(";")
            if len(codes) != len(set(codes)):
                raise ValueError(f"Repeated curriculum code on row {line}")
            for code in codes:
                if code not in by_code:
                    raise ValueError(f"Unknown code {code} on row {line}")
                year = by_code[code]["yearNumber"]
                if not row["min_year"] <= year <= row["max_year"]:
                    raise ValueError(f"{code} is outside this video's reviewed year range")
                if row["id"] in {video["id"] for video in videos[code]}:
                    raise ValueError(f"Duplicate video for {code}")
                videos[code].append(row)
                if len(videos[code]) > 5:
                    raise ValueError(f"{code} has more than five videos")
    return by_code, videos


def topic_sources(unit):
    """Follow existing, agreeing same-code redirects without changing routing."""
    url = "https://skillrhub.com" + unit["url"]
    prefix = unit["url"].rsplit("/", 2)[0] + "/" + unit["code"].lower() + "-"
    sources = []
    visited = set()
    while url not in visited:
        visited.add(url)
        parsed = urlsplit(url)
        if (parsed.scheme != "https" or parsed.netloc != "skillrhub.com"
                or parsed.query or parsed.fragment or not parsed.path.startswith(prefix)
                or not parsed.path.endswith("/") or ".." in parsed.path.split("/")):
            raise ValueError(f"Invalid same-code topic destination for {unit['code']}: {url}")
        path = ROOT / (parsed.path.lstrip("/") + "index.html")
        source = path.read_bytes().decode("utf-8")
        sources.append((path, source))
        boundary = MainBoundary(source)
        if boundary.refresh is None:
            return sources
        match = re.fullmatch(r"\s*0\s*;\s*url\s*=\s*(.*?)\s*", boundary.refresh, re.IGNORECASE)
        if not match or not boundary.canonical:
            raise ValueError(f"Unclear topic redirect for {unit['code']}: {path}")
        target = urljoin(url, match[1].strip("\"'"))
        if target != urljoin(url, boundary.canonical):
            raise ValueError(f"Redirect and canonical disagree for {unit['code']}: {path}")
        url = target
    raise ValueError(f"Topic redirect loop for {unit['code']}")


def section(code, videos):
    esc = html.escape
    cards = []
    for index, video in enumerate(videos):
        frame_name = f"skillr-video-{code.lower()}-{video['id']}"
        embed = (f"https://www.youtube-nocookie.com/embed/{video['id']}"
                 "?playsinline=1&rel=0&cc_load_policy=1&cc_lang_pref=en")
        report = "mailto:skillrhublearning@gmail.com?" + urlencode({
            "subject": f"SkillrHub video issue: {code}",
            "body": (f"Lesson code: {code}\n"
                     f"Video: https://www.youtube.com/watch?v={video['id']}\n\n"
                     "Please describe the problem (for example, unavailable, incorrect or unsuitable):\n\n"
                     "Please do not include personal student information."),
        }, quote_via=quote)
        # The parent page's ordinary link targets this named frame. This sends
        # the site's Referer, which YouTube requires, without a player API or JS.
        # The local placeholder makes no third-party request. The official
        # player loads on request, and playback requires its own Play control.
        poster = ("<!doctype html><html lang=\"en\"><meta charset=\"utf-8\">"
                  '<meta name="viewport" content="width=device-width,initial-scale=1">'
                  '<style>body{margin:0;font:16px system-ui;color:#17334d;background:#eef5fb}'
                  'div{box-sizing:border-box;min-height:200px;height:100vh;display:flex;'
                  'flex-direction:column;gap:12px;align-items:center;justify-content:center;'
                  'padding:24px;text-align:center}'
                  'b{font-size:1.15rem}span{font-size:.85rem}</style>'
                  f'<div><b>{esc(video["title"])}</b>'
                  '<span>Select “Load video player” above, then press Play.</span></div></html>')
        cards.append(
            f'<details class="skillr-video-card"{" open" if index == 0 else ""}>'
            f'<summary>{"Recommended: " if index == 0 else "Another explanation: "}{esc(video["title"])}</summary>'
            f'<p><strong>{esc(video["creator"])}</strong> — {esc(video["focus"])}</p>'
            f'<p><strong>As you watch:</strong> {esc(video["watch_prompt"])}</p>'
            f'<p><a class="skillr-video-load" href="{esc(embed, quote=True)}" target="{frame_name}" '
            'referrerpolicy="strict-origin-when-cross-origin">Load video player</a> '
            '<span class="skillr-video-privacy">Loads YouTube in this lesson. See the video notice below.</span></p>'
            f'<iframe class="skillr-video-frame" title="{esc(video["title"], quote=True)} by {esc(video["creator"], quote=True)}"'
            f' name="{frame_name}" srcdoc="{esc(poster, quote=True)}" width="640" height="360"'
            ' referrerpolicy="strict-origin-when-cross-origin"'
            ' allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'
            f'<p><strong>Try it:</strong> {esc(video["after_watching"])}</p>'
            '<p>Video unavailable, inaccurate or unsuitable for this year? '
            f'<a href="{esc(report, quote=True)}">Report a video problem to SkillrHub</a> by email. '
            'You can continue with the written lesson and practice resources.</p></details>'
        )
    return (START + '\n<details class="curriculum-topic-section skillr-topic-videos" id="topic-videos">'
            '<summary><strong>Watch an explanation</strong></summary><div class="curriculum-detail-body">'
            '<p id="skillr-video-explanation" tabindex="-1">Optional videos to support this lesson. Choose an explanation, then try the short task. '
            'The written lesson and practice resources also work without video.</p>'
            '<p><a href="#skillr-written-lesson">Back to the lesson</a></p>'
            + "".join(cards) +
            '<details class="skillr-video-notice"><summary>About these videos</summary>'
            '<p>These videos are provided by independent creators and played through YouTube. '
            'Rights remain with their respective owners. Inclusion does not imply that a creator or YouTube endorses SkillrHub.</p>'
            '<p>YouTube’s <a href="https://www.youtube.com/static?template=terms" target="_blank" rel="noopener noreferrer">terms</a> '
            'and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a> '
            'apply to its player. Advertising, recommendations and external links may appear, '
            'and videos may change or become unavailable. SkillrHub’s written lessons and practice resources remain available separately.</p>'
            f'<p>To report a content, suitability or rights concern, email <a href="mailto:skillrhublearning@gmail.com?subject=Video%20concern%20{code}">'
            'skillrhublearning@gmail.com</a> with the lesson code and video link. '
            'Please do not include personal student information.</p></details>'
            '</div></details>\n' + END)


def remove_marked_block(source, start, end):
    if source.count(start) != source.count(end) or source.count(start) > 1:
        raise ValueError("Ambiguous or damaged video section markers")
    if start in source:
        if source.index(end) < source.index(start):
            raise ValueError("Video section end marker precedes its start")
        source = source[:source.index(start)] + source[source.index(end) + len(end):]
    return source


def without_owned_block(source):
    source = remove_marked_block(source, START, END)
    source = remove_marked_block(source, SHORTCUT_START, SHORTCUT_END)
    return source.replace(STYLE, "")


def update_source(source, block):
    clean = without_owned_block(source)
    if not block:
        return clean
    source = remove_marked_block(source, SHORTCUT_START, SHORTCUT_END)
    if source.count(START) == 1:
        result = source[:source.index(START)] + block + source[source.index(END) + len(END):]
    else:
        preferred = ["<!-- skillr-curriculum-equivalents:start -->", "<!-- skillr-facebook-feedback:start -->"]
        point = next((clean.index(marker) for marker in preferred if marker in clean), None)
        if point is None:
            point = MainBoundary(clean).close
        if point is None:
            raise ValueError("No safe insertion point; lesson left untouched")
        result = clean[:point] + block + clean[point:]
    boundary = MainBoundary(result)
    shortcut_point = boundary.hero_close if boundary.hero_close is not None else boundary.heading_end
    if shortcut_point is None:
        raise ValueError("No lesson heading for video shortcut; lesson left untouched")
    result = result[:shortcut_point] + SHORTCUT + result[shortcut_point:]
    if STYLE not in result:
        if result.count("</head>") != 1:
            raise ValueError("Expected one head; lesson left untouched")
        result = result.replace("</head>", STYLE + "</head>", 1)
    if without_owned_block(result) != clean:
        raise ValueError("Content preservation check failed")
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    by_code, videos = load_rows()
    outputs = []
    for code, unit in by_code.items():
        sources = topic_sources(unit)
        for alias, alias_source in sources[:-1]:
            # Redirect stubs carry no teaching content. Remove only our old
            # supplement, retaining all routing metadata and existing wording.
            cleaned = without_owned_block(alias_source)
            if cleaned != alias_source:
                outputs.append((alias, cleaned))
        path, source = sources[-1]
        result = update_source(source, section(code, videos[code]) if videos[code] else "")
        if source != result:
            outputs.append((path, result))
    # Validate the entire input and all proposed output before the first write.
    if not args.check:
        for path, result in outputs:
            path.write_bytes(result.encode("utf-8"))
    count = sum(bool(videos[code]) for code in by_code)
    print(f"{count}/{len(by_code)} curriculum codes have selected videos; {len(outputs)} pages {'need updating' if args.check else 'updated'}.")
    if args.check and outputs:
        return 1
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (ValueError, OSError) as error:
        print(f"Video update stopped: {error}", file=sys.stderr)
        sys.exit(2)
