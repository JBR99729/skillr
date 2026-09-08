# Topic video review — 8 September 2026

## Status

The owner authorised publication on 8 September 2026, requested a clear way to report broken or unsuitable videos, and confirmed that playback should be embedded within SkillrHub. This release applies the video supplement to the latest complete main tree, including the newer Year 4 teaching updates. Google child-directed designation remains unverified from the connected account; this record does not claim that it has been completed or that the site is untagged. The owner previously accepted standard YouTube embedding conditions. No paid licence, subscription or separate agreement was purchased or entered into.

All 676 canonical Foundation–Year 10 codes were included in year-wise research. The combined catalogue contains 670 recommendation rows, 408 distinct video IDs and supporting selections for 666 codes (98.5%). Shared rows map closely related codes; there are at most four videos per code in this version, under the enforced maximum of five. A selection supports its stated focus, not necessarily every part of a curriculum outcome.

## Coverage

| Year | Codes with a selection | Total codes |
| --- | ---: | ---: |
| Foundation | 50 | 50 |
| 1 | 55 | 55 |
| 2 | 53 | 55 |
| 3 | 62 | 63 |
| 4 | 61 | 63 |
| 5 | 57 | 60 |
| 6 | 59 | 59 |
| 7 | 70 | 72 |
| 8 | 69 | 69 |
| 9 | 65 | 65 |
| 10 | 65 | 65 |

## Ten explicit gaps

Useful written lessons remain available for these codes. No empty video section or unrelated placeholder is generated.

| Code | Remaining evidence or fit issue |
| --- | --- |
| AC9M2M05 | Original free YouTube version and complete Year 2 turn explanation not sufficiently established. |
| AC9S2U03 | Relevant primary Twinkl material found, but no confirmed free original YouTube version for this specific physical-change explanation. |
| AC9E3LA04 | Candidate paragraph models either lacked sufficient review evidence or presented an overly rigid formula. Keep searching for grouping related information. |
| AC9M4P02 | No sufficiently matched primary explanation of repeated trials and variation at Year 4 level. |
| AC9E4LA10 | ACMI originals confirmed, but its course starts at Year 5 and individual clip playback/transcript inspection was unavailable; Year 4 suitability remains unconfirmed. |
| AC9E5LA07 | Official Pixar/Khan lesson located; exact authorised YouTube ID could not be established. |
| AC9E5LE01 | No sufficiently reviewed short author/publisher source for the required cultural and historical context. Unauthorised book read-alouds excluded. |
| AC9E5LY01 | Relevant author sources were lengthy or insufficiently reviewed; no short contextual-text selection established. |
| AC9M7SP03 | Translation candidate found, but original-source/player evidence was insufficient for inclusion in this pass. |
| AC9E7LA04 | Part-to-whole candidate found, but sufficient exact source/player evidence was not completed. |

## What was checked

The CSV records each original video URL, creator, intended year range, exact teaching focus, original watch question and follow-up task, primary source and review limitations. Year threads checked canonical descriptors against source pages and available transcripts. YouTube oEmbed metadata was used where available to confirm title, original author and an advertised player. Some original institutional pages directly exposed the exact embed. Network or playback failures are not treated as successful checks.

Examples of targeted exclusions include an inaccurate minute-counting song, an explanation that incorrectly implied solid particles do not move, an Urdu translation in an English selection pool, unauthorised read-alouds, clips that would require a mid-video cutoff to remain within the year boundary, and TED/TEDx Talks with additional licensing conditions. TED-Ed animations are distinguished from TED/TEDx Talks in the [primary TED usage policy](https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy).

Full audiovisual playback, caption accuracy and regional/school-network availability have not been verified for every selected video. Source screening and a successful metadata response must not be described as a complete watch-through. The catalogue is ready for review, not a claim that every video has passed that final review.

The ABC astronomy example is explicitly local: Western Australia, Astrotourism WA and Beemurra Aboriginal Corporation. Its full available transcript was read. No Nation or language group absent from the source was invented, and the example is not presented as a universal account of First Nations knowledge. UK handwriting examples are supplementary models; the school’s Australian handwriting style takes precedence.

## Implementation and maintenance

One CSV supplies a small standard-library Python build script. It adds a marked native HTML disclosure section and one scoped stylesheet link to each selected canonical topic page. It does not regenerate or reword the authored lesson. Titles, descriptions, canonicals, schema, sitemaps, questions, worksheets and fixed teacher presentations are outside this change.

The optional section is collapsed. Each video shows its creator, specific contribution, viewing question and follow-up task. An ordinary link loads the official privacy-enhanced YouTube player into a named frame; playback uses YouTube’s own Play control. No external player or thumbnail request is made by the supplement before the learner loads it. There is no new JavaScript player library, plugin, database, scheduled service or API key.

The player retains YouTube controls, branding and links. Autoplay is not requested. Captions are requested where available. The separate YouTube watch link has been removed at the owner's request. A visible reporting link beneath each video prefills its lesson code and video URL in an email; it does not send a message automatically. The written lesson and practice resources remain available if a video is unavailable. Removing a video row and rebuilding removes the recommendation while retaining the lesson. See [the maintenance guide](topic-video-maintenance.md).

The notice attributes ownership, avoids implying endorsement, links platform terms/privacy, explains advertising and availability, and provides the existing reporting email without requesting student data. The Privacy Policy has a matching section. The notice does not grant copyright permission or remove legal duties.

## Launch requirements

1. Confirm SkillrHub’s child-directed designation in Google. [YouTube explicitly requires this for children’s sites, even for privacy-enhanced embeds](https://support.google.com/youtube/answer/171780?hl=en). On 8 September the connected account’s [tagging tool](https://search.google.com/search-console/coppa) did not list a matching property, so its existing designation could not be inspected. This does not prove that the site is untagged. No new property, ownership verification or designation was submitted. Use the owner account/property that manages SkillrHub; [Google describes the designation here](https://support.google.com/webmasters/answer/3221080?hl=en).
2. The owner has authorised publication of the source-screened catalogue with a visible problem-reporting route. Complete audiovisual and caption checks before promoting clips as fully reviewed. Check representative embeds on the actual site on desktop, phone and keyboard. The local browser preview was blocked by the environment and the latest Google-settings check timed out, so no successful visual/player or designation verification is claimed.
3. Follow the complete-tree release procedure in AGENTS.md, rebase additive sections on the exact latest main if it advances, verify zero deletions/core files/CNAME, and check Pages and live routes after any approved publication. A draft pull request does not change the live website.

## Validation record

The build checks unknown codes, URL formats, duplicate IDs per code, numeric year ranges, nonempty fields and a five-video maximum. It validates every proposed page before the first write and rejects damaged section markers. Automated tests cover reversible exact-content preservation, CRLF text, invalid mappings, escaping, optional player loading and Referer policy.

Final integration passed: the builder reported no stale pages; all four regression tests passed; and Git reported no whitespace errors. An independent comparison stripped only the new video block and stylesheet link and confirmed that every one of the 676 original topic files was otherwise byte-for-byte unchanged against the newer main, including its Year 4 teaching updates. The complete candidate tree contains 18,385 files against 18,378 in this base, with zero deleted paths; all seven core file blobs, including CNAME and the latest AGENTS.md, are unchanged. The release pull request records the final base and candidate. These checks do not substitute for playback verification.

The draft's GitHub checks also exercised the complete checkout. The optional-video, release-integrity, static architecture, resource and year/subject checks passed. The English validator initially mistook the iframe's `loading` attribute for a runtime lesson placeholder; the unnecessary attribute was removed while preserving click-to-load behaviour. Two existing issues remain: 118 English pages have a legacy Homework label, and the Foundation pre-module validator expects older quiz counts/selection flags. The Homework matches are identical in main and the candidate, and every input to the failed Foundation assertions is unchanged. These failures are documented, not disabled or silently treated as passes; they need separate resolution before a fully green release.
