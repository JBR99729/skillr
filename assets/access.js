"use strict";

/* =========================================================
   Future access/payment metadata hook.
   Nothing is gated today. Pages can declare window.skillrAccess
   and future login or payment code can read it consistently.
   ========================================================= */

if (!document.querySelector('script[data-skillr-display-only]')) {
  const displayOnlyScript = document.createElement("script");
  displayOnlyScript.src = "/assets/display-only.js?v=1";
  displayOnlyScript.dataset.skillrDisplayOnly = "true";
  document.head.appendChild(displayOnlyScript);
}

(function initialiseSkillrAccess() {
  const defaults = {
    product: "skillrhub-free-curriculum",
    accessLevel: "free",
    requiresLogin: false,
    requiresPayment: false,
    monetisationReady: true
  };

  window.skillrAccess = {
    ...defaults,
    ...(window.skillrAccess || {})
  };

  document.documentElement.dataset.skillrAccessLevel =
    window.skillrAccess.accessLevel;
}());
