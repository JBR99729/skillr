# Topic videos: owner and maintainer guide

The video supplement has one editable list, `data/topic-videos.csv`, and one shared appearance file, `assets/css/topic-videos.css`. The existing lessons remain ordinary HTML. There is no new plugin, database, subscription, API key or JavaScript player library.

## Simple owner requests

Give your maintainer or assistant the curriculum code and the requested change. For example: “Replace the video for AC9MFN01 with this official YouTube link” or “Remove this unsuitable video from every lesson.” You do not need to edit individual lesson pages.

A removed or blocked video cannot remove the written lesson, Classroom View, worksheet, Practice or Test. Every video also has a normal YouTube watch link. Removing a row from the list removes that recommendation when the supplement is rebuilt. If a code has no recommendations, its video section is omitted.

## Selection rules

- Prefer one concise, accurate explanation. Add alternatives only when they offer another useful explanation, representation or accessibility option. Five is a maximum, not a target.
- Use an official creator upload, check the exact title and creator, and inspect the explanation for the intended year level. Popularity alone is insufficient evidence.
- Keep the Australian curriculum boundary, terminology and examples in view. A supporting clip may cover part of an outcome; describe that part explicitly. Do not imply that one clip teaches the complete outcome.
- Use original watch questions and short follow-up tasks. Do not copy third-party worksheets, transcripts or lesson text into SkillrHub.
- Do not use unauthorised read-alouds, reposts, age-restricted videos, paid videos or sources requiring a separate licence. Embed only through the official player; never download or rehost video files.
- Distinguish TED-Ed animations from TED and TEDx Talks. The [TED usage policy](https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy) places TED-Ed's official YouTube videos under standard YouTube policy; TED/TEDx Talks carry additional conditions. This catalogue excludes TED/TEDx Talks under the owner's preference to avoid additional licences.
- Record what was actually checked. Source descriptions, transcripts and oEmbed metadata are useful evidence, but they do not equal a complete audiovisual review or prove playback on every school network.
- If no suitable source is found, retain the written lesson and record the gap. Do not add an unrelated video to meet a coverage target.

## Editing the list

The CSV has these columns in this exact order:

| Column | What to enter |
| --- | --- |
| `codes` | One curriculum code, or several separated by semicolons |
| `video_url` | The original HTTPS YouTube watch link |
| `title`, `creator` | A clear accurate title and the original creator |
| `min_year`, `max_year` | Reviewed Australian year range; Foundation is 0 |
| `focus` | What this clip explains for these codes |
| `watch_prompt` | A short question to consider while watching |
| `after_watching` | A short original task to apply the idea |
| `source_url` | The primary creator or official video source used for selection |
| `review_note` | Evidence, review limits and any scope or terminology notes |

Row order sets recommendation order. Use a CSV editor or Python's `csv` module so commas and quotation marks are preserved correctly. Review a changed link before adding it; the build does not search YouTube or choose videos automatically.

From the repository root:

```sh
python scripts/build_topic_video_sections.py
python scripts/build_topic_video_sections.py --check
python -m unittest discover -s scripts/tests -p 'test_topic_video_sections.py'
```

The builder validates every input and proposed output before writing. It rejects unknown codes, invalid links, duplicate videos, inappropriate year ranges and more than five videos per code. It edits only its marked video block and its stylesheet link; the surrounding authored HTML must remain identical. Repeating the command produces no further changes.

## Player behaviour and privacy

The video section uses native HTML disclosure controls. An ordinary link loads YouTube's privacy-enhanced player into a named frame, then the learner uses YouTube's Play control. It does not autoplay or load YouTube thumbnails/player resources before that link is selected. No custom player script runs on SkillrHub.

Keep `referrerpolicy="strict-origin-when-cross-origin"` on the load link and frame. YouTube requires a site Referer; suppressing it can cause error 153. Do not hide or cover the player's controls, branding, advertising or links. `rel=0` limits related videos to the same channel; it does not remove recommendations.

The shared “About these videos” notice gives attribution, explains third-party terms and availability, and provides a reporting contact. The Privacy Policy separately explains what happens when the player is loaded. A disclaimer does not grant rights or remove legal duties.

Before enabling embedded videos on children's pages, the owner must confirm the site's designation in Google's [Tag for Child-Directed Treatment tool](https://search.google.com/search-console/coppa). YouTube requires this even with privacy-enhanced embedding. Do not claim that the designation or a disclaimer guarantees legal compliance. See [YouTube embedding guidance](https://support.google.com/youtube/answer/171780?hl=en), [player requirements](https://developers.google.com/youtube/terms/required-minimum-functionality), and [Google's child-directed designation guidance](https://support.google.com/webmasters/answer/3221080?hl=en).

## Release and later replacements

Inspect an updated page on desktop and phone, including keyboard access, the loaded player and the normal watch link. Check the original lesson and its same-code resource links. Confirm the video is playable in the official embed; a successful metadata response alone is insufficient.

Follow `AGENTS.md` for the full Git-tree release checks. Preserve every existing path and `CNAME`, use the latest remote main as the complete base, and use a non-forced update. The video builder is not permission to rebuild teaching pages or question banks. After release, check Pages deployment and the live homepage and affected lesson/Practice route.

For an unavailable or reported video, remove or replace its row and rebuild. Keep the page live. Video availability is not a reason to delete or noindex a useful lesson. No scheduled API service is needed; source checks can be performed during normal content maintenance or after a report.
