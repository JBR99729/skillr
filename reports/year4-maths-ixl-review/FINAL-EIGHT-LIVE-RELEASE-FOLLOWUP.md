# Year 4 live release follow-up — 2026-09-08

Content release PR822 merged as48990ac843f519124f9cf42ce67b3853f367a9e1. All nine PR checks and all ten main workflows, including Pages, succeeded. All23 codes have48 Practice+16 Test questions (1,472 total). Source verification remains5/23; the Content Verified badge stays off.

## Observed browser behavior and corrections

A real cloud-browser SP01 Practice attempt completed5/5, opened its result and saved-answer review, and retained the actual house diagram. Topic Guide and Classroom View links opened the correct resources. A live ST01 Test question displayed the correct club bar graph, accepted Music and Garden (8 + 6 = 14), and awarded one point with the correct explanation. Narrow-viewport checks are not desktop coverage.

The full live load exposed three legacy helper interactions missed by the initial offline marking tests:

1. Shared quiz initialization removed the only authored preparation panel on the final eight Practice pages. The Year4 quick-read helper now restores the same captured node after initialization. The shared quiz runtime and bootstrap are unchanged from main.
2. The legacy worksheet renderer replaced the authored homework body after PWA loading, changing tasks and removing Download PDF. All23 authored worksheet pages now opt out explicitly and load the guarded renderer before PWA initialization.
3. The legacy visual layer inserted an unrelated clock model into ST01 Test above its correct fruit graph. All69 authored Year4 activities/worksheets now load a fresh guarded visual helper before PWA initialization. The existing global once-only guard also prevents a later cached helper from injecting a second model. Other years and unmarked legacy resources retain their existing behavior.

These corrections preserve authored question content, scoring, worksheet banks and the35 previously inspected PDF pages. Independent regression reports record the actual legacy helper reproductions, preservation checks and final artifact hashes. Full-browser post-deployment checks are a separate release step and are not claimed here in advance.

## Superseded candidate

The first PR823 candidate modified the shared runtime. Its CI exposed four unrelated baseline failures: Year1 bankCount80, Foundation and Year4 Science eight-attempt expectations versus current five, and Year3 mobile overflow. That approach was replaced with the scoped Year4 helper correction; no tests were weakened and no unrelated assessment behavior was changed. Only the final candidate's checks establish its release status.
