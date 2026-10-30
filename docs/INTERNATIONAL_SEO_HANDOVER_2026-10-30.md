# International discovery — 30 October 2026

Owner-authorised, bounded international discovery over the existing Australian Curriculum V9.0 experience. This is not a complete overseas curriculum rollout.

Changed surfaces: homepage welcome/metadata/organization audience, international FAQ and matching FAQ JSON-LD, both LLM guides, `ai-international.json`, and only these existing topic pages:

| Australian page | Related US standard | Scope |
|---|---|---|
| AC9M1N01 — Numbers to 120 | 1.NBT.A.1 | Selected counting and number-representation support |
| AC9M1N02 — Tens and ones | 1.NBT.B.2 | Selected tens/ones support |
| AC9M1N04 — Addition/subtraction within 20 | 1.OA.C.6 | Selected strategy support, not fluency certification |

The topic references reuse saved product mapping evidence, the official Grade 1 CCSS descriptors and samples from the current DEV banks (see the app companion handover for IDs/hashes). They are labelled partial/related. No independent full-standard or full-grade review is claimed.

Each topic retains its H1, section IDs, canonical URL and teaching/practice/assessment/TpT links. Exact related codes appear in the visible heading-adjacent reference, reference section, title/description and `educationalAlignment` metadata. Existing broad overseas grade-equivalence rows on those three pages are removed; missing UK/NZ/Canadian mappings are not fabricated. Existing Australian/state references remain. No learning material, public page, CNAME, sitemap architecture or verification badge is removed or regenerated.

The country names describe an available audience, not local courses. A single English-language resource does not justify duplicate country URLs or hreflang alternates. No ranking/traffic guarantee or assumed low-keyword-competition claim is introduced. Use existing Search Console query/country reports and existing analytics to assess impressions, clicks and international sessions after release; no new scheduled task or new analytics collection is created here.

Source references: https://schema.org/educationalAlignment , https://schema.org/AlignmentObject , https://developers.google.com/search/docs/appearance/structured-data/sd-policies . Metadata describes the visible page; it does not certify a credential.

## Validation and release

`international-seo-smoke-2026-10-30.json` records static SEO checks: 18 JSON-LD objects parsed, FAQ/schema parity, exact preserved H1s/section IDs/resource links/canonicals. App preference logic passes its focused checks, including storage blocked and invalid saved-country cases. Rendered browser checks remain pending because this executor has no browser executable; do not label a source check as a mobile/desktop or live deployment pass.

Review this alongside the app companion PR. The app adds country references as a device preference without changing enrolment country, school calendars, Australian year grouping, marking or progress. DEV/application release and public-site production promotion remain separate. Use the normal complete-tree integrity check and a non-forced reviewed release. Roll back by reverting the two scoped commits; no database rollback is needed.
