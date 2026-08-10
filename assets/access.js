"use strict";

/* =========================================================
   Future access/payment metadata hook.
   Nothing is gated today. Pages can declare window.skillrAccess
   and future login or payment code can read it consistently.
   ========================================================= */

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
