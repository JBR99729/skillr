(() => {
  "use strict";

  if (!/^\/quiz\/grade-k\/english\/ac9ef[a-z0-9]+\/worksheet(?:\/topic-practice-[12])?\/?$/i.test(location.pathname)) return;
  if (typeof window.SkillrFoundationEnglishWorksheetPageInit === "function") {
    window.SkillrFoundationEnglishWorksheetPageInit();
    return;
  }
  if (document.querySelector('script[data-skillr-foundation-english-topic-practice="true"]')) return;
  const script = document.createElement("script");
  script.src = "/assets/foundation-english-worksheet-page.js?v=20260814-foundation-english-topic2";
  script.async = false;
  script.dataset.skillrFoundationEnglishTopicPractice = "true";
  document.head.appendChild(script);
})();
