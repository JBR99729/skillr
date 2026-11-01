#!/usr/bin/env python3
"""Reversible SEO experiment: remove optional video UI from static topic HTML.

The video catalogue remains in data/topic-videos.csv and is not edited.
This script changes topic HTML only. Restoration is possible by reverting its
HTML changes and removing the experimental suppression setting.
"""
import argparse
import json
import re
from pathlib import Path
from normalize_topic_entry_order import pages, video_ranges

ROOT = Path(__file__).resolve().parents[1]
VIDEO_NAV = re.compile(r'<a\b(?=[^>]*\bhref=["\x27]#(?:video-lesson|topic-videos|skillr-video-explanation)["\x27])[^>]*>.*?</a>', re.I | re.S)
VIDEO_SHORTCUT = re.compile(r'<!-- skillr-video-shortcut:start -->.*?<!-- skillr-video-shortcut:end -->', re.S)
VIDEO_STYLESHEET = re.compile(r'<link\b[^>]*href=["\x27]/assets/css/topic-videos\.css(?:\?[^"\x27]*)?["\x27][^>]*>', re.I)


# Some legacy pages contain an additional unmarked video details/section whose
# surrounding HTML is malformed enough that the general parser has no end span.
# Find its balanced closing tag locally without rebuilding or reserialising HTML.
UNMARKED_VIDEO_OPEN = re.compile(
    r'<(details|section|div)\b[^>]*class=["\x27][^"\x27]*(?:topic-video-lesson|skillr-topic-videos)[^"\x27]*["\x27][^>]*>', re.I
)

def remove_unmarked_videos(source):
    clean = source
    count = 0
    while (match := UNMARKED_VIDEO_OPEN.search(clean)):
        tag = match.group(1)
        tokens = re.compile(r'</?' + re.escape(tag) + r'\b[^>]*>', re.I)
        depth, end = 0, None
        for token in tokens.finditer(clean, match.start()):
            depth += -1 if token.group().startswith('</') else 1
            if depth == 0:
                end = token.end()
                break
        if end is None:
            raise ValueError('Unclosed legacy video block; refusing destructive edit')
        clean = clean[:match.start()] + clean[end:]
        count += 1
        if count > 12:
            raise ValueError('Unexpected repeated video blocks')
    return clean

def strip(source):
    clean = source
    for a,b in reversed(video_ranges(clean)):
        clean = clean[:a] + clean[b:]
    clean = remove_unmarked_videos(clean)
    clean = VIDEO_SHORTCUT.sub('', clean)
    clean = VIDEO_NAV.sub('', clean)
    clean = VIDEO_STYLESHEET.sub('', clean)
    return clean

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--write', action='store_true')
    args = ap.parse_args()
    changed = []
    scanned = 0
    for path in pages():
        source = path.read_text(encoding='utf-8')
        scanned += 1
        candidate = strip(source)
        if UNMARKED_VIDEO_OPEN.search(candidate) or any(token in candidate for token in ('<!-- skillr-topic-videos:start -->', '<!-- skillr-topic-videos:end -->')):
            raise ValueError(f'Unremoved video markers: {path}')
        if candidate != source:
            if strip(candidate) != candidate:
                raise ValueError(f'Not idempotent: {path}')
            changed.append(str(path.relative_to(ROOT)))
            if args.write:
                path.write_text(candidate, encoding='utf-8')
    print(json.dumps({'scanned': scanned, 'changed': len(changed), 'paths': changed[:12]}, indent=2))
    return 0 if args.write or not changed else 1

if __name__ == '__main__':
    raise SystemExit(main())
