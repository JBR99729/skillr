# Authored Year 4 preparation — final independent runtime regression

**PASS: Year 4 helper restores the same authored node; shared runtime is unchanged.**

Root live inspection found that Practice initialization removed the first preparation section. The earlier 80-case marking tests did not assert guide survival and missed this real defect. The earlier broad integration conclusion is qualified by this correction.

The final correction is local to the Year 4 helper. It captures the existing authored section, registers a DOMContentLoaded callback, applies immediately, and reattaches that same node if shared initialization later detaches it. Its exact Year 4 code/version/authored-marker guards remain. It does not rebuild or alter the teaching content. The earlier shared-runtime patch is superseded: final runtime and bootstrap bytes match commit48990 exactly; all16 activity wrappers retain script.js?v=117 and refresh only the helper cache query.

Independent reproduction uses actual script timing with readyState=loading, then interactive and DOMContentLoaded: shared runtime cleanup runs before the helper restoration callback. Old helper plus old runtime removes all8 Practice guides (one section to zero), while8 Test guides survive. The final helper plus unchanged runtime preserves exactly one guide on all16 activities, with the identical DOM node and unchanged innerHTML. Two unmarked legacy cases still remove the legacy section. M03’s previous two-section layout reduces to one, retaining the same authored node. An out-of-scope Year3 marked section remains subject to old cleanup. All80 marking, pending-response, saved-review and missing-helper cases also pass with the unchanged shared runtime.

Root reported four unrelated baseline CI failures when the earlier candidate touched the shared runtime: Foundation attempt-count expectations, Year4 Science attempt/cycle expectations, a Year1 drill bank-count expectation, and Year3 mobile overflow. This reviewer did not independently reproduce those unrelated failures. They were not fixed or waived through test changes here; the final correction avoids modifying those shared-runtime files.

Exact old/final hashes,36 before/after cases and limitations are recorded in FINAL-EIGHT-PREPARATION-RUNTIME-REGRESSION.json. Offline VM/linkedom stubs audio, network, layout and navigation; root owns actual live-browser/deployment verification.
