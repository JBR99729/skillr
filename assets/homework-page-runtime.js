(() => {
  "use strict";

  const measurementId = "G-8P22BET45N";
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };

  if (!document.querySelector('script[data-skillr-ga4="homework"]')) {
    const analytics = document.createElement("script");
    analytics.async = true;
    analytics.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    analytics.dataset.skillrGa4 = "homework";
    document.head.appendChild(analytics);
  }

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { page_type: "homework" });

  const start = () => {
    const match = window.location.pathname.match(/\/(ac9[a-z0-9]+)\/homework\/?$/i);
    const curriculumCode = match ? match[1].toUpperCase() : "UNKNOWN";
    const yearMatch = window.location.pathname.match(/\/year-(\d+)\//i);

    window.gtag("event", "homework_open", {
      curriculum_code: curriculumCode,
      year_level: yearMatch ? yearMatch[1] : "foundation",
      page_type: "homework"
    });

    /* ADSENSE DISABLED PENDING APPROVAL
    const config = window.SkillrAdConfig;
    const slot = config && config.slots && config.slots.homeworkEnd;
    if (!config || config.enabled !== true || !/^ca-pub-\d+$/.test(config.client || "") || !/^\d+$/.test(slot || "")) {
      return;
    }

    const zone = document.querySelector('[data-ad-zone="homework-end"]');
    if (!zone || zone.dataset.adInitialised === "true") {
      return;
    }

    zone.dataset.adInitialised = "true";
    zone.hidden = false;

    const label = document.createElement("span");
    label.className = "skillr-homework-ad-label";
    label.textContent = "Advertisement";

    const ad = document.createElement("ins");
    ad.className = "adsbygoogle";
    ad.style.display = "block";
    ad.dataset.adClient = config.client;
    ad.dataset.adSlot = slot;
    ad.dataset.adFormat = "auto";
    ad.dataset.fullWidthResponsive = "true";

    zone.replaceChildren(label, ad);

    const requestAd = () => {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    };

    const existing = document.querySelector('script[data-skillr-adsense="true"]');
    if (existing) {
      requestAd();
      return;
    }

    const loader = document.createElement("script");
    loader.async = true;
    loader.crossOrigin = "anonymous";
    loader.dataset.skillrAdsense = "true";
    loader.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(config.client);
    loader.addEventListener("load", requestAd, { once: true });
    document.head.appendChild(loader);
    END ADSENSE DISABLED PENDING APPROVAL */
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
