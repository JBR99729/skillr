# Independent teacher-style review — Year 4 Science topic pages

Date: 8 November 2026  
Reviewer: independent teacher-style AI reviewer (`/root/year4_science_teacher_review`), separate from the author; not a human teacher sign-off.  
Result: **PASS for the reviewed static topic-page batch after the correction below. No unresolved teacher-content finding.**

## Scope and evidence

Read `AGENTS.md`, the static curriculum architecture/content standards, `page-content.json`, `inventory.json`, and the actual final HTML for all 12 listed pages. Reviewed all 12 new worked examples, 36 teaching steps with their questions/answers, 36 tricky questions/answers, 24 FAQs, all new misconception corrections, activities, differentiation and safety notes. Independently read the 121 retained teaching sections and checked their named supplied-data/SVG labels against the explanations. Every new authored string is present in its matching HTML; all 121 expected retained section headings are present.

Independently checked all 12 official Year 4 content descriptions against [QCAA’s AC v9.0 Year 4 Science alignment](https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr4_as_cd_alignment.pdf). Content stays within qualitative Year 4 food-chain, water, materials, force and inquiry expectations; later-year equations, formal statistics and exact ecological forecasts are explicitly excluded. No substantive inherited factual defect was identified. This scoped review does not approve app banks, worksheets or teacher presentations.

- Ruler: checked exact SVG geometry and a deterministic render. Zero is at x=60, each 2 cm mark advances 16 px, and the pointer x=556 is 62 cm. Labels, worked reading and answers agree.
- Column graph: checked exact SVG geometry and a deterministic render. Baseline y=280 is zero, 10 cm intervals are 30 px, and column heights 186/90/72 px encode 62/30/24 cm. Table, graph, explanations and questions agree.
- Water model: checked process directions, gas-to-liquid wording, precipitation and downhill-flow labels; the caption/lesson correctly describes a possible pathway rather than a compulsory single route. Re-rendered and inspected the corrected final SVG.
- Context artwork: viewed both WebP illustrations. Their alternative text matches their content. Pages label artwork as context and require supplied records/models for exact values; no question relies on measuring the artwork.
- Safety/cultural context: activities use low/light adult-supervised apparatus, safe specimens or paper models; magnet, hot-water, unknown-organism and drinking-water cautions are appropriate. Attributed First Nations examples avoid universal claims and invented consultation or endorsement.
- Navigation: all 12 catalogue CTAs use `year=4&subject=science` and the exact matching canonical `returnTo`. No unpublished code-specific practice or assessment bank is advertised by these CTAs.

## Finding and independent recheck

| Resource/section | Severity | Finding and minimal correction | Recheck |
| --- | --- | --- | --- |
| AC9S4U02, worked-example inline water-cycle SVG | Medium, corrected | Curved arrows crossed the Evaporation and Precipitation labels. Move the labels into clear space while preserving the process arrows. | PASS: final labels at (140,198) and (400,180) have clear separation from their curves in the rendered model; process meaning is unchanged. Final U02 SHA256 is recorded below. |

No further correction is requested. Browser rendering was attempted but local Chromium was blocked by the executor’s socket restriction; exact SVG inspection and CairoSVG rendering provided the model review above. Whole-page browser/device layout verification remains the author’s separate software/visual QA evidence.

## Original reviewed HTML artifact identities

Paths are the exact code-to-path mappings in `inventory.json`. These SHA256 values were recomputed from the final HTML after the correction and matched the regenerated inventory.

| Code | SHA256 |
| --- | --- |
| AC9S4U01 | `6720ea75841c4860ae94ea1a9f0d34861398647123bdf26fc076d489779abfc1` |
| AC9S4U02 | `c4482b11c7946c133e55ead1b871c456311e13188f73ec6d3f37117f721f80c5` |
| AC9S4U03 | `2c4608b6f7fda2e1486195184e818e1a7f0dc9e1d747d54dcf2eb1806af24145` |
| AC9S4U04 | `25433e59893d672b47a5e7503213e08f5e0040dfaf07792bbc3b733bda3818d4` |
| AC9S4H01 | `74643062977d55e371e094b66e92520d87b03abe67582620bd4d12e2929c9712` |
| AC9S4H02 | `b7570102b18433fab4a4c7ce8acaffe0553d9ec74e3217d0b118388ff1d9bafd` |
| AC9S4I01 | `bb1192f400e219ff76e9b757a1877a43ad67221f504c58ae2a10770e6fef50ef` |
| AC9S4I02 | `0f813f07687fb30204dab7d258fffc595b56cc0ee1218489bb2840323cd9d94f` |
| AC9S4I03 | `36a7c7b44fc3dcc0f25d813d5adab188c416f858ddb7008e1de2f44183ec9927` |
| AC9S4I04 | `7bc655e43b85c5c0b34612b9a73eb070939ebbd02675088b13106621cde9f973` |
| AC9S4I05 | `ba2f4d47345fa0f1c3a55141d6a9f38176f401eb66297f2f51c1e39148a98e71` |
| AC9S4I06 | `66459ad219e9dd8aca5b3ace45cf92741be6e82668752fc2d34b7c2515f2a04d` |

## Independent loader-restoration delta review

Date: 8 November 2026. Reviewer: separate teacher-style AI reviewer (`/root/science_teacher_review`), distinct from the original reviewer above and the author. Result: **PASS for the loader-only delta; no teaching-content change or new teacher-content defect.**

Compared all twelve repaired HTML files byte-for-byte with `origin/main` at `5dd4bea441209378dd1cbe1912e244f41e28cc30`. Removing the single added `<script src="/pwa-register.js?v=20261107-seo-navigation"></script>` reproduces each baseline exactly. Independently confirmed identical `head` metadata/structured data and identical complete `main` teaching content. The inventory hashes match the repaired files. The historical full-content review above is retained; this delta check does not claim a second full teacher review.

Read the unchanged shared loader. Its canonical-topic guard is set before loading legacy helpers and blocks curriculum data/renderers and dynamic lesson layers from script insertion. The restored entry point preserves general PWA/navigation utilities and normalises fixed Classroom View folder links to their explicit `index.html`. Teaching remains in the authored HTML and does not depend on this loader. Runtime/browser behaviour remains part of the author’s separate software check, not inferred from this source review.

### Final HTML identities after loader restoration

| Code | SHA256 |
| --- | --- |
| AC9S4U01 | `84435cb9aedae24ed18a996df14a81d2ac54a498ca070bf91340a5e48a23fdc4` |
| AC9S4U02 | `cd4e483c2827c4e974b994e79776bc48f5c13a34ecd73ccdf8c22ae56655938e` |
| AC9S4U03 | `177057d7b68931fc25ff1a39222deb2125b570bd36aa3875ca16b0eecf9e5a28` |
| AC9S4U04 | `79f495b27e13dbc712af6133c271ba01ee019b4993767530a4d7341e1cb89f53` |
| AC9S4H01 | `17eb771efc0ffde9bacc034e839c851c30d5d8d9bd74f3a281c929dc0c5abc3b` |
| AC9S4H02 | `b57dff0b003682dc42818f16c21f37b63ef38e8a41ba675e30df608346fb39df` |
| AC9S4I01 | `21118f12fbef2158ef307c8349a3f0fb529924561409a9217c27311353158831` |
| AC9S4I02 | `08bdf4a1760a5fea8a529577e5b8c396ff6817073d5b352d32252a4d6fe9fc97` |
| AC9S4I03 | `8e658cad125a8520a3998d51a62e6248f0ab8a127a0d5a3983c0f22bbf9c98eb` |
| AC9S4I04 | `da2d9b5f66963200061510a6d1dd0ec8f5e02c44309381d9d9b4cf26a718640a` |
| AC9S4I05 | `39f852f908f6da0cd10d8f829fb506f73d5e952b22add7dab56143492355ed00` |
| AC9S4I06 | `ac4da6eaa0392e203b298e3387adaa002a7e895228a773e6cff7fab2f76166c9` |
