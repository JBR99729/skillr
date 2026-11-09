# Independent native visual and targeted recheck

**Decision: PASS for all 58 native model views, all 13 retained diagram views, and the two positional-wording / capture-harness deltas. OPEN only for three final in-page Potter illustration captures (1440 / 768 / 390px).** This addendum closes the original content report’s native-model rendering uncertainty. It is not an overall final browser or publication approval while those three book-figure views remain uninspected.

Independent reviewer: separate AI reviewer `/root/science_teacher_review`, 9 November 2026. Scope is the ten Foundation English public Topic Guides AC9EFLA01–09 and AC9EFLE01. No human certification, app-bank review, six-pass bank QA, teacher-slide/worksheet certification or production deployment verification is implied. The immutable all-item content report was not edited.

## Actual captured evidence inspected

Captured source head `434f610978bbe81085ee6f5ed9802fb677791ede`, tree `8249fc1d5927d8923abb6f963e63cc5fe6c4fd1e`; hosted run `42618889592`, artifact `13674770145`. Root reported downloading and verifying artifact ZIP SHA256 `266af7fd71e061ea4b2bf68eb2513903fe047121ed2f5d0bd5dcd702561ae78b`. The ZIP itself was not available for this reviewer’s independent digest check; the extracted files and their identities below were directly inspected/hashed.

Individually opened all 58 `CODE-1440-native-N.png` and all 13 `CODE-1440-retained-N.png` files, without sampling or relying on contact sheets. All visible words, cards, labels, captions and drawings are readable and complete; no clipping, overlap, unexpected blank model or mismatched scene was observed. In particular, the legacy preview SVGs render correctly inline, the LA03 information/invented-whale comparison is visible, and the two added LA07 scene pictures and four earlier-check panels display with their correct captions. Text-only conceptual cards were assessed as conceptual cards rather than misreported actual media performances.

Inspected extracted `results.json`: 30 JavaScript-disabled page visits at 1440/768/390px, ten JavaScript-enabled smoke visits, keyboard answers and keyboard phone diagram pan reported true, and no reported problems. The reviewer manually inspected the 71 scoped model/retained views, not all sixty top/lesson screenshots. Parent’s separate whole-page review and final-head CI remain distinct evidence.

## Targeted changes and dependency checks

**LE01 positional wording: PASS.** The actual reading packet precedes its explanatory text and focus steps. Exactly two authored scalar fields now say “selections in this worked example” and “Use Reading A in the worked example”. Independently compared the actual LE01 HTML to captured source and confirmed these exact two substitutions are its only differences. All other nine HTML sources are byte-identical to the captured head. The new wording accurately locates the readings and changes no text clue, answer or response criterion. Source QA again passes ten pages / 400 author fields / 81 retained sections / 269 disclosures.

**Capture-harness addition: PASS as a code delta, execution of the new captures pending.** Compared the current browser harness against the captured version. Its sole addition eagerly loads the actual `.reading-packet figure:has(img)` image, waits for successful image loading, scrolls instantly and captures the enclosing figure at each existing viewport width. No existing assertion was removed or relaxed. `node --check` passes. This code inspection does not claim the not-yet-supplied three new book captures have passed.

**Reuse of the 71 captures is justified by unchanged dependencies.** Independently compared all 58 native HTML model serializations, all nineteen literal SVGs, all six linked CSS files and all inline head-style text with the captured source head: unchanged. The current artwork manifest’s 58 native fingerprints match the actual current elements. The two changed LE01 paragraphs are outside the cropped native-model elements and outside the unchanged book figure. The Potter JPEG is unchanged. No unchanged content review was repeated.

## Exact artifact identities

Immutable all-item content report SHA256: `aab2397a498a5125514b6e218043fc585527b895d2b48a8c98b78749e05f0fc1`.

Current final source identities; captured identities are shown explicitly where they differ:

| Code | Current HTML SHA256 | Captured-head HTML SHA256 |
|---|---|---|
| AC9EFLA01 | `13a74ab5ea34f3e907089e26724c339df17cd6a56d7a4a31fc70880078326313` | `13a74ab5ea34f3e907089e26724c339df17cd6a56d7a4a31fc70880078326313` |
| AC9EFLA02 | `fdcba61b05354a23e0855db8ab57f1a2fca412958a0d9f4e3bcce07420cef6d9` | `fdcba61b05354a23e0855db8ab57f1a2fca412958a0d9f4e3bcce07420cef6d9` |
| AC9EFLA03 | `8a0bc56650a0bffb78c01da9891c2bae4c639fd4d4675b40b9670cb8f681850f` | `8a0bc56650a0bffb78c01da9891c2bae4c639fd4d4675b40b9670cb8f681850f` |
| AC9EFLA04 | `e84bc259a301c868d57aa7e60b202f758eaddb298a9e94ca1d3fb968893b8962` | `e84bc259a301c868d57aa7e60b202f758eaddb298a9e94ca1d3fb968893b8962` |
| AC9EFLA05 | `44c8065bf170ce1f54abbba7d4ccf79ee2557e6ec64eb70632f15a777c0774e1` | `44c8065bf170ce1f54abbba7d4ccf79ee2557e6ec64eb70632f15a777c0774e1` |
| AC9EFLA06 | `293f9e0a7bb2fc03aa7e445659b2d8bede8daf22da9cd6706e0258916cf1f52e` | `293f9e0a7bb2fc03aa7e445659b2d8bede8daf22da9cd6706e0258916cf1f52e` |
| AC9EFLA07 | `7a90848bee98a7917fa0788ee79f0240090a334ae8a38c4f233018b2372d93e6` | `7a90848bee98a7917fa0788ee79f0240090a334ae8a38c4f233018b2372d93e6` |
| AC9EFLA08 | `e000805d1311ae89e94ebea420253d1a94a4d1a00324a714f502a762163b5640` | `e000805d1311ae89e94ebea420253d1a94a4d1a00324a714f502a762163b5640` |
| AC9EFLA09 | `cd5da51b84fc6dc93be581ff88087797db5d9ce812e33c6845fa229b6ee74281` | `cd5da51b84fc6dc93be581ff88087797db5d9ce812e33c6845fa229b6ee74281` |
| AC9EFLE01 | `c04fd802b6f9403f49adbc8aeaa0651a766442c49a1150f82a63e9c84831e098` | `ce4a374b8e9b10190e1144f2145ba13eac797adbb3abee1dafed58faff331c83` |

| Stylesheet unchanged from capture | SHA256 |
|---|---|
| `style.css` | `ae989b9bfe20db6ac741e2df4cc0dbeeffd3d8fcf8d8e1d0e5ffd5dd05821fae` |
| `assets/curriculum.css` | `c65198923858734e005d9e6ad76d55156e8f39a3cdc8f08524e62fdda8e2d9f2` |
| `assets/css/year3-science-topic-pages.css` | `9f9a698f33023163f2ae4508b0fd52c82a9ceeec5ed8520daa6d181ed8e86480` |
| `assets/css/science-topic-release.css` | `41284b9009408203275beb157601f7b8b870a44b6820da61bd96770c1eab280c` |
| `assets/css/foundation-english-topic-pages.css` | `e6864419fb7478108ae0bf76f3e46f5cb33a27e86784856b4419343f5cac9346` |
| `assets/topic-practice-link.css` | `55b40419f335610abc5aa5adc3549af4c4105ea9ada9ea7f151f1d53539d47dc` |

| Supporting artifact | SHA256 |
|---|---|
| `docs/qa/foundation-english-topic-pages-batch1-20261109/inventory.json` | `371edc3d9452d864f21d6c34e5eeae504b69755a17c85ffe07257cea62f9f8ec` |
| `docs/qa/foundation-english-topic-pages-batch1-20261109/page-content.json` | `ef67700883c900b32fd9691eec050908f90e8404c5346c542ec0642f3fa4ff47` |
| `docs/qa/foundation-english-topic-pages-batch1-20261109/artwork-and-evidence.json` | `c9fde1a39008f68e6726aed343ccb01b5b6aaf73444fa6666ac3c901e937e8f6` |
| `docs/qa/foundation-english-topic-pages-batch1-20261109/retained-additions.json` | `e9ce93b70beed16e40556f534e5943442baf8642c05d0eedc14fa19330855e56` |
| `docs/qa/foundation-english-topic-pages-batch1-20261109/retained-corrections.json` | `5a8d184032684295a26a77bad23780579d0d2ea0370f71cceefe83448d46cb36` |
| `docs/qa/foundation-english-topic-pages-batch1-20261109/image-provenance.json` | `5dcfdbd40a0fe57c30f99f922c23b555fe41ce0417df67d0718d1c4dd87999f1` |
| `scripts/qa_foundation_english_topic_pages_batch1.py` | `2460e8f61b43f71bab0d66a04ad1065b908f7d03e2a77623a0665914496e460c` |
| `scripts/qa_foundation_english_topic_pages_batch1_browser.cjs` | `108498e92f04284e69b1c71b22a9a19ec187c4a636f481364d3ced29162d8aa7` |
| Captured-head browser harness | `fefa959aab6f130718f47f6946ed11dd5782ee4136bd469f5d0ccb6624923414` |
| Extracted initial `browser/results.json` | `875f707aeb9a5fccfe55e810ebc5091fb9561a584009ed1de8375b9ae8f362d0` |

The current artwork manifest binds all nineteen literal/prepared/standalone-PNG triples and all 58 native model HTML fingerprints. Its digest above pins the complete unchanged model identity set. The shipped Potter JPEG remains SHA256 `690baa2d2e36d33d51814143ef47c7d281875a46238f05829f71f459ac45a901`.

Actual individually inspected hosted PNGs (all 58 native + 13 retained):

| PNG | Dimensions | SHA256 |
|---|---|---|
| `AC9EFLA01-1440-native-1.png` | 1042×86 | `f8a0dba8dfebd67dd23c6976320dfd42610ae080932731e9c4794a336eb05200` |
| `AC9EFLA01-1440-native-2.png` | 707×131 | `94d561c504f8fe21dfed51d7b4a984f81381ba2e20cde2a364da7fa76188c70d` |
| `AC9EFLA01-1440-native-3.png` | 707×131 | `5557e019f5bf38bbe05c35f9407e3745bbc48431de54df4749055f9dd87eb00d` |
| `AC9EFLA01-1440-retained-1.png` | 720×297 | `fe211825c7867564b228e9b93b17ca552f4a37713443afde94727e24e9acb323` |
| `AC9EFLA02-1440-native-1.png` | 745×111 | `76071aff35d78762d8d6137ffe325dec8c87dd9b1ebcc04e96a4d26e89a85207` |
| `AC9EFLA02-1440-native-2.png` | 745×132 | `2eddd4d3fd2fb19e62e426962d817bd3d62ae1aff49a6f8ca504355bc4425b77` |
| `AC9EFLA02-1440-native-3.png` | 707×111 | `d36e15ff732acc8df7a91b4e8fca8705351d0b95500276559b3a140f339929d5` |
| `AC9EFLA02-1440-native-4.png` | 707×132 | `b09fcaa002176dbd864a6ee1ec658e80cc6c9e39cb673cd8c6cd014aa53923fa` |
| `AC9EFLA02-1440-native-5.png` | 707×132 | `8bb5ccf8ed7b196c1dd3d812bc3d6d0e67151fd58c0b753a25a9cee15b2c2d7b` |
| `AC9EFLA02-1440-native-6.png` | 707×132 | `28b06404c9b361a915e2c0f45771adbd8dee550ef8b61a3f8ff8589042dc0b7c` |
| `AC9EFLA02-1440-retained-1.png` | 720×297 | `df00167aeffa479accbff10d192e88255a7d83ce1c667d86fad9521d84e793c3` |
| `AC9EFLA03-1440-native-1.png` | 745×111 | `3378538ce11867d0c060942e622ee46a58032f9a390a6bb7104e82c04cab56bf` |
| `AC9EFLA03-1440-native-2.png` | 745×131 | `578bc82229a2ed03a051e7775f58e0a2484ba431a2711516704d771ade82d643` |
| `AC9EFLA03-1440-native-3.png` | 707×112 | `541e5f14305f9033d7bd11cfb37c6711ede28b91707555b885b64aa734ce5252` |
| `AC9EFLA03-1440-native-4.png` | 707×131 | `9c0c19d4943670b3141e6902a4d1ace2b10a050db36be08c4ea6e5734d9c90aa` |
| `AC9EFLA03-1440-native-5.png` | 707×131 | `3c4e1ca2365b014c6106562453ff5b182418e42a2daf289618acea6b3ef323fc` |
| `AC9EFLA03-1440-native-6.png` | 707×131 | `5ac33abd5f3e2bf72b1a706bb1c6de4851b1484e5f3278e041c981e6f8906220` |
| `AC9EFLA03-1440-native-7.png` | 707×132 | `cb9a5a7a930e5b7a2aad574d45e31ed60b1409d16b619394fb83b1644edc87df` |
| `AC9EFLA03-1440-native-8.png` | 707×131 | `234b9e3662ba62f92ad4756e77dd97f277b00fc67e3dd322e305ed6b2ccd7b1a` |
| `AC9EFLA03-1440-retained-1.png` | 720×365 | `e3b99ad629192392d501521b5c196761e80037bd3880e59ddbb148de3a5c1cd1` |
| `AC9EFLA03-1440-retained-2.png` | 720×297 | `d667a0d23404721d4de2544aa8e55db70a743148060841702cd682528fadde9e` |
| `AC9EFLA04-1440-native-1.png` | 745×111 | `89df0f7b5d140bd6e5d6e8602f0f0ae44712fc4323d1a68da4bb1903170cd09d` |
| `AC9EFLA04-1440-native-2.png` | 745×111 | `1ebfb6624ad7e33c5c10c5651dc9e2a8a1b2b91df0adf1e3d83fdc8811e21094` |
| `AC9EFLA04-1440-native-3.png` | 707×131 | `3388a2d06b257c27d8e388e6e5bcd62002966334819cd113a631eca9ed0fd71c` |
| `AC9EFLA04-1440-native-4.png` | 707×131 | `bb4f3b48003ba11241bd7f3603c5af4d8c89f062a5deef67c784d6bd27b892c3` |
| `AC9EFLA04-1440-native-5.png` | 707×132 | `f40530354dc83f3e0e209fa6f204f9a8c5a982799bd7b2712a6e8edfbdfc2bb7` |
| `AC9EFLA04-1440-native-6.png` | 707×132 | `4a7b48465648f0e35062c3ce5f093ef56e063980ed2565ca73a8471f9a26d7fe` |
| `AC9EFLA04-1440-native-7.png` | 707×131 | `b7c0717bee2685eedd9c6e430326e1594af7368186343159e2523991b2c3cb5c` |
| `AC9EFLA04-1440-native-8.png` | 707×131 | `d65f9c5df9c49cfca8ef1bd7cf09cb065aa5ca09ea613e25886d8cf54e7d9c58` |
| `AC9EFLA04-1440-retained-1.png` | 720×297 | `5ae4a47e2ab89f6303fc1de219cc0ea00a08765bcee74d74042720eae9478167` |
| `AC9EFLA05-1440-native-1.png` | 1042×86 | `01861e9226c8d7b70d9dc9c17db8b13dc0207737d1e5321764a95283b8715cff` |
| `AC9EFLA05-1440-native-2.png` | 745×131 | `2672e89b8b7b10ccd936ea9ff52f4c11c955499a2692ef245f1333e21df278d8` |
| `AC9EFLA05-1440-native-3.png` | 745×131 | `ea0d9c6925cd0eae8cf509e5f70688448af7b51bc403b09523736c566c745127` |
| `AC9EFLA05-1440-native-4.png` | 707×132 | `a3152e3850ad8e757adbe75fe053f01de836c0cdc0ed776b1809772d7558c13e` |
| `AC9EFLA05-1440-native-5.png` | 707×151 | `73fffc7cac366e51403e47ac03af68692888ef94bbd69667ff7ad0d822c1470e` |
| `AC9EFLA05-1440-retained-1.png` | 720×297 | `f4a0c3f4ebc1a76c0bd7ae74f4d05dc5905bf440586e8d917a3de79d44210ae6` |
| `AC9EFLA06-1440-native-1.png` | 1042×86 | `ec95801e110aaad2ace080b8cc86945cb93415973b1509885a7b84728fe0151c` |
| `AC9EFLA06-1440-native-2.png` | 745×131 | `3c2bbba8385f9f656b83983b16f759e2352b253ba6e97653942fb086d7fdc54a` |
| `AC9EFLA06-1440-native-3.png` | 745×131 | `613de182184801c0539de86f6b179607192b8b23395d1b10be79d16252611f55` |
| `AC9EFLA06-1440-native-4.png` | 707×111 | `14c427d13203b23ad96dbe60d7b31e9bddb84c173445fa0c3f7ac7b3636cceaf` |
| `AC9EFLA06-1440-retained-1.png` | 720×297 | `7181aebea91eb97d069a0004ac35bd8496a7aaf3f2adc82c5624d61f2104a4df` |
| `AC9EFLA07-1440-native-1.png` | 745×132 | `bf486978b0dc7f03b15ef88068d7fcf5c3c8278482bd3c771ac4afaafe8bc951` |
| `AC9EFLA07-1440-native-2.png` | 745×131 | `3902e960db85ce274a8fac159e8e8b2702f85d6393ba56e94744cdcd2b91f76f` |
| `AC9EFLA07-1440-native-3.png` | 707×131 | `f935cd9d0356aa542416fe4130bdea1df8e184b8983a68c4a434c7012d23ce09` |
| `AC9EFLA07-1440-native-4.png` | 707×131 | `73820ee8da53cd8fa2b33f02d62963fd5cc45feee2f9c69363489c2688f48ae7` |
| `AC9EFLA07-1440-retained-1.png` | 720×396 | `b308a548bf00144412f0967155452b39ab938c3408a9519f2bc87d92934392a1` |
| `AC9EFLA07-1440-retained-2.png` | 720×553 | `6bb3989d79744fe8980bd7210ca5c82284d748cb144e4ba8b16bd48753b1ad1f` |
| `AC9EFLA07-1440-retained-3.png` | 720×297 | `30c11420cb27234f4ce8f6282580600cc61d4ae4e40f3a91feacc16e1c8af2de` |
| `AC9EFLA08-1440-native-1.png` | 720×147 | `ee23873d9c9ef8da87d842799d3d8155e08b64588a5466d43c3a29279f95db8b` |
| `AC9EFLA08-1440-native-2.png` | 745×131 | `9e856b454442028a002d5d4143ce5f34cf5f10410067ecb0f1402a77e57aab2a` |
| `AC9EFLA08-1440-native-3.png` | 745×111 | `e8b12217a496240c43ebea02366ffed96acc90b00de8123ae3cf4a6c7da8aaa2` |
| `AC9EFLA08-1440-native-4.png` | 707×132 | `db418cfcb6ae8510a531132de8d57eb2c07b3bfa2559e4249742995a1cbb2f54` |
| `AC9EFLA08-1440-native-5.png` | 707×159 | `af6d36b67ab31110791443d50571214d826aa7d6234c70076aa480c04f0bd247` |
| `AC9EFLA08-1440-native-6.png` | 707×132 | `a36931e3eb278909363bf3fbe1f8b275e29123a07497e03bee656bf84758b3c0` |
| `AC9EFLA08-1440-retained-1.png` | 720×297 | `74fe63bd17cb1f717e0b0533d69969b182e51dff10d760abda1762e39d0c1ced` |
| `AC9EFLA09-1440-native-1.png` | 1042×86 | `8cacb17af6234d5232f1c34771393e62d8e47257c9d685c6a107c3c30ed5ea1e` |
| `AC9EFLA09-1440-native-2.png` | 745×131 | `79f41d58d2a4b8203878de147fb9e33b0aea083787f7252f466fea35444b2740` |
| `AC9EFLA09-1440-native-3.png` | 745×111 | `a702cfb4bc0cad0efeebb92a249cd9534b9e7c43c592e7ca887f17c2312e58fc` |
| `AC9EFLA09-1440-native-4.png` | 707×131 | `c500269ae4c14a8863787aa72ece786f8fb56d01e034bdb556b3e03a7d02e90b` |
| `AC9EFLA09-1440-retained-1.png` | 720×297 | `9718a61ce7dd102608d852aee2224bd8dd8a68429733cb8e43cfe4e4ab04f671` |
| `AC9EFLE01-1440-native-1.png` | 1042×85 | `0e77245f371bbf749718a528356d065817597f2670df8d68c06f6df16d429eda` |
| `AC9EFLE01-1440-native-10.png` | 707×90 | `7d9d94f9176da6bf33528ab483fca06d3652911ec637333fac6d2157d697798d` |
| `AC9EFLE01-1440-native-2.png` | 745×118 | `23c74546ec620588a933509b2333e7a725e2af4009b632c826e4880f4185f64f` |
| `AC9EFLE01-1440-native-3.png` | 745×117 | `8324a77d6e635e539b335c12456d751650f692c7ba506cd9c182cc3d496b1240` |
| `AC9EFLE01-1440-native-4.png` | 707×110 | `374ef55439927d9a3d06cff22b0ac6d0780dce5888f27951882505788e60e598` |
| `AC9EFLE01-1440-native-5.png` | 707×109 | `9f833fa3469da89391e3788de39000a23308a3c2d42e8c9df076322fdcb7ccc1` |
| `AC9EFLE01-1440-native-6.png` | 707×90 | `4f65c904248e248ce910225dcd345796c169109262e5ac458138befdd443dc8a` |
| `AC9EFLE01-1440-native-7.png` | 707×89 | `bee425de0e6d8d55214752f124aee9dc03301091802a2df45c327987edb8381b` |
| `AC9EFLE01-1440-native-8.png` | 707×69 | `8de0cda389dbf14fafe353e26d3ccf7317e5cd43871706514b2cbab292520ee8` |
| `AC9EFLE01-1440-native-9.png` | 707×69 | `ccc117ed3440ee547872490e8a8c9bb64583db2787cb49a28152461fcb4e3e6e` |
| `AC9EFLE01-1440-retained-1.png` | 720×297 | `ee39f39d0b93b00b6e331bd4dfc2d2945fe19889c03dd0fafddbaca0bdb593aa` |

## Remaining closure

Only the final three LE01 in-page Potter book-figure captures remain OPEN for this independent visual review. They must show the actual image and credit in the page at all three widths, with final source/style identities and successful current-head checks. After actual inspection, a narrowly scoped reviewer reply may close this item and be recorded with its hashes in the PR evidence; it need not modify this immutable addendum. This report contains no final production or whole-page publication PASS.
