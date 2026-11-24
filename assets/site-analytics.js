/* Page measurement for public landing pages. Never send auth parameters or
 * learner details; existing pages with their own GA loader retain that setup. */
(function () {
  'use strict';
  var measurementId = 'G-8P22BET45N';
  var current = new URL(window.location.href);
  var productionHosts = ['skillrhub.com', 'www.skillrhub.com'];
  var excludedFlags = ['qa', 'qa_preview', 'qa_review', 'qa_session', 'review', 'analytics_off'];
  if (!productionHosts.includes(current.hostname)
      || excludedFlags.some(function (key) { return current.searchParams.has(key); })
      || window['ga-disable-' + measurementId] || window.skillrPublicAnalyticsStarted) return;

  // A page that already initializes this stream must not receive a second view.
  var alreadyLoaded = Array.from(document.scripts).some(function (script) {
    try {
      var src = new URL(script.src, current.origin);
      return src.hostname === 'www.googletagmanager.com'
        && src.pathname === '/gtag/js' && src.searchParams.get('id') === measurementId;
    } catch (_) { return false; }
  });
  if (alreadyLoaded) return;
  window.skillrPublicAnalyticsStarted = true;

  // Preserve campaign attribution and catalogue selection, but discard arbitrary
  // query strings/fragments (which can contain emailed authentication tokens).
  function publicLocation(url) {
    var clean = new URL(url.origin + url.pathname);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_content', 'utm_term', 'year', 'subject'].forEach(function (key) {
      if (url.searchParams.has(key)) clean.searchParams.set(key, url.searchParams.get(key));
    });
    return clean.href;
  }
  var referrer = '';
  try {
    var previous = new URL(document.referrer);
    if (['http:', 'https:'].includes(previous.protocol)) referrer = previous.origin + previous.pathname;
  } catch (_) { /* A direct visit has no referrer. */ }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_location: publicLocation(current),
    page_referrer: referrer,
    page_title: document.title,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);

  // Internal links are not covered by GA's default outbound-click event. Record
  // navigation destinations without link text, form values or account fields.
  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    try {
      var destination = new URL(link.href, current.origin);
      if (!['skillrhub.com', 'www.skillrhub.com', 'app.skillrhub.com'].includes(destination.hostname)) return;
      window.gtag('event', 'site_navigation_click', {
        destination_host: destination.hostname,
        destination_path: destination.pathname,
        page_location: publicLocation(current)
      });
    } catch (_) { /* Malformed links must never interrupt navigation. */ }
  });
})();
