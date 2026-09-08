# Foundation Classroom View metadata release-gate repair

Author status: complete; ready for independent approval. Full CI gate pending.

## Finding and exact delta

All nine affected Classroom Views already contained semantically correct robots `noindex,follow` and canonical URLs pointing to their parent Topic Guides. The existing unmodified Foundation validator rejects their equivalent reverse-attribute-order, self-closing syntax. This repair normalises the two existing head tags to the syntax that the validator requires; it does not add new metadata or duplicate tags.

Per file, exactly these two replacements were applied:

```html
<meta content="noindex,follow" name="robots"/>
```

becomes

```html
<meta name="robots" content="noindex,follow">
```

and `<link href="PARENT_TOPIC_URL" rel="canonical"/>` becomes `<link rel="canonical" href="PARENT_TOPIC_URL">`, preserving each URL exactly.

## Completed verification

- Read the actual rules in `scripts/validate_foundation_maths_static_topic_pages.mjs`; no validator changes.
- Read all nine original files from the current Git tree and confirmed both existing semantic values.
- Restored only the nine exact viewer paths in one coordinated sparse-checkout operation.
- Applied exactly two existing-tag replacements per file; each robots and canonical tag occurs once, inside the head.
- Reversing the two replacements reproduces each original complete byte sequence.
- Every byte from the opening body tag through the end of each file is unchanged. Teaching, styles, scripts, navigation, titles and resource links remain byte-identical.
- Independent reviewer separately compared all nine candidates against the latest main baseline `ad23` and confirmed the exact two-tag delta and unchanged body. Their formal approval follows below.

The optional local complete-input validator attempt was stopped while lazy Git blob retrieval remained blocked. No local full-gate pass is claimed. CI must rerun the unchanged Foundation validator on the complete candidate tree before release. This is a bounded release-gate compatibility repair, not a Foundation content sweep.

## SHA-256 artifact identities

The before hash represents the original file and the body hash is identical before and after.

| Exact path | Before | After | Unchanged body |
| --- | --- | --- | --- |
| `foundation/maths/ac9mfa01-recognise-copy-and-continue-repeating-patterns-represented-in/teacher-slides/index.html` | `48460ace744275118de86ca65daf66109182a4cbfc17fdbb34f7a1170529762d` | `a633fdf052df0382c0ad63d03097c7052cd798b5805e73f5a324ce2f7531eef5` | `9baa608e41b25c178ccf858d7c2e69eb62d1b225cbc1a07c6567b5c148834ade` |
| `foundation/maths/ac9mfm01-and-compare-attributes-of-objects-and-events-including-length/teacher-slides/index.html` | `98cbf9dcdc2a68838ccb3c45d34e817d911e4c23337a788814613244fd76430e` | `f21c1f3f68221be6220aaddf8011e6ab4b626a6595a607be20ea9e80a99eb471` | `93523834381f75eab33d6dd37bc8c637f98f6523d12125b46226a2dd902ac949` |
| `foundation/maths/ac9mfm02-sequence-days-of-the-week-and-times-of-the-day/teacher-slides/index.html` | `813fa4d20d445aac9bc39157d902c6551baab79639d8b03f4830adf898984f2f` | `3bc765d4659bac6032675a92ca0152d8902419f0487e9fa9c73a9f24aea33e02` | `1e1368ff9544962fb42894d0c663c5ea011ad9036a3891553a6e67966e56b80c` |
| `foundation/maths/ac9mfn04-partition-and-combine-collections-up-to-10-using-part-part/teacher-slides/index.html` | `7e4705f36360f7f039578fe34af5bf233a60d5826564eba89dda7614d5f2b6c1` | `b6efdb1e3489264db38d789a39b9fec0a75998c703900c48363901d353528335` | `8afe8371a9f195d7597e1bde9e9d18d3c9fcd1cfd16a83777b154c01de54648a` |
| `foundation/maths/ac9mfn05-represent-practical-situations-involving-addition-subtraction/teacher-slides/index.html` | `236c3525e36fb9324c43d8c3efa43436a7c71d728e53f1cf60298c7fa118b712` | `9e8beb338d8dcc3ed05617ca8fe1c567c14b0c3cff91718128a389548e0f789b` | `03d13d56ea5ecbaa3390b9f868236f4a5a55a03eb2f023d1f25a1f719963a483` |
| `foundation/maths/ac9mfn06-represent-practical-situations-that-involve-equal-sharing-and/teacher-slides/index.html` | `e3441fb09be3f8f3242373a6e41aa80d7228c0ffdd74509608a320a5fd29a2d1` | `b424ff66b3fc27e965d35543cc421f216644e3e420a1e76180d8498adcbcee18` | `ee4196a70c4576e85f1caa52236503047e5ba6cb1030553e5235643f432ae6bd` |
| `foundation/maths/ac9mfsp01-sort-name-and-create-familiar-shapes-recognise-and-describe/teacher-slides/index.html` | `a0717cabf5ac07612d193da5df978ec544d8a03abdea805b1f6fcf18b0edf401` | `55a9f74d7c36325423e8f506db08ae731c3172280ec47257f0abc02fc16171c3` | `605b919ad1905d50e1dcebbfc2c4936250dde9e0643e045b3413d6edc9e012d3` |
| `foundation/maths/ac9mfsp02-the-position-and-location-of-themselves-and-objects-in-relation/teacher-slides/index.html` | `6d14b8e5acca4a2a0082b46ed9488487f3dac1b5b546727837adcb4f3523a834` | `3a438a7ef523b97682a74a217bf6e6b89c4af9f925725bbbe22747d2dd2a703c` | `5b16d154b288218b0691f2c07ba6223440dd3b1665d359fcc022ec46fe94bdc3` |
| `foundation/maths/ac9mfst01-collect-sort-and-compare-data-represented-by-objects-and-images/teacher-slides/index.html` | `af45eb862c4ec37fc437df665e8200c1e11e25960f7fc7b8b6612b07619aec0d` | `f061d1a7b88f11b02599600dea1b53216c05d7fada4d30507d407c008f4f919f` | `ad88a2df98401ac48100296e42d204bc4da6ca35116bd7e257e001d5a7f210b6` |

## Independent review — APPROVED

Reviewer: `science_i05_i06_reviewer`. Review date: 2026-09-08. Author: `science_i03_i04_author`.

I independently read the actual Foundation validator and retrieved all nine original files directly from main baseline `ad23ae9f73c12e4228e58f689ccfdda4b52e858a`. Every file was byte-identical to its version at pre-repair local HEAD `6efbe399d4344d46c7d9cfe992a2edc0a98593df`. An attribute-order-independent HTML parse confirmed that each baseline already had exactly one correct `noindex,follow` robots tag and one correct parent-topic canonical link. Applying the validator’s exact checks to those baseline files reproduced both syntax failures on all nine. These were pre-existing validator/markup compatibility failures, not metadata removed by the Year 4 Science work.

I independently verified each final file equals its complete baseline after only the two specified existing-tag normalisations. Both tags remain inside the head, their semantic values are unchanged and neither tag is duplicated. Every byte from the opening body tag to end-of-file is identical. The actual Foundation validator itself remains byte-identical to the same baseline; no audit condition was weakened or bypassed.

All nine before, after and unchanged-body SHA-256 entries in the table above were independently recomputed and matched. This bounded formatting repair is approved. The complete unchanged-validator run remains a CI requirement; this approval does not claim a local full Foundation validation or a new Foundation content review.
