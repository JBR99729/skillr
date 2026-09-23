(() => {
  "use strict";
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-skillr-app-cta]");
    if (!link || typeof window.gtag !== "function") return;
    window.gtag("event", "skillr_app_click", {
      curriculum_code: link.dataset.curriculumCode || "",
      curriculum_subject: link.dataset.curriculumSubject || "",
      funnel_location: link.dataset.funnelLocation || "curriculum",
      link_url: link.href,
    });
  });
})();
