(function () {
  function iconMarkup(name, size) {
    var iconSize = size || 20;
    var attrs = 'viewBox="0 0 24 24" width="' + iconSize + '" height="' + iconSize + '" aria-hidden="true" focusable="false"';

    if (name === 'share') {
      return '<svg ' + attrs + ' fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m7 12 10-6-3 12-4-4-3-2Z"></path><path d="m14 18-4-4"></path></svg>';
    }

    if (name === 'copy') {
      return '<svg ' + attrs + ' fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    }

    if (name === 'check') {
      return '<svg ' + attrs + ' fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"></path></svg>';
    }

    if (name === 'instagram') {
      return '<svg ' + attrs + ' fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.2" cy="6.8" r="1"></circle></svg>';
    }

    if (name === 'facebook') {
      return '<svg ' + attrs + ' fill="currentColor"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3.2l.8-4H13V9c0-.7.3-1 1-1Z"></path></svg>';
    }

    if (name === 'bookmark') {
      return '<svg ' + attrs + ' fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"></path></svg>';
    }

    return '';
  }

  function injectMainNavBranding() {
    var nav = document.querySelector('.main-nav');
    if (!nav || nav.querySelector('.skillr-brand-anchor')) {
      return;
    }

    var brandAnchor = document.createElement('a');
    brandAnchor.className = 'skillr-brand-anchor';
    brandAnchor.href = '/';
    brandAnchor.setAttribute('aria-label', 'SkillrHub home');
    brandAnchor.innerHTML = '<span class="skillr-brand-mark" aria-hidden="true">S</span><span class="skillr-brand-text">SkillrHub</span>';

    nav.insertBefore(brandAnchor, nav.firstChild);
  }

  function shouldEnableFloatingShare() {
    var search = window.location.search || '';
    var enableShare = /(?:\?|&)share-widget=(?:1|on|true)(?:&|$)/i.test(search);
    var disableShare = /(?:\?|&)share-widget=(?:0|off|false)(?:&|$)/i.test(search);
    var storageKey = 'skillrShareWidgetMode';

    try {
      if (disableShare) {
        window.localStorage.setItem(storageKey, '0');
        return false;
      }

      if (enableShare) {
        window.localStorage.setItem(storageKey, '1');
        return true;
      }

      var storedMode = window.localStorage.getItem(storageKey);

      if (storedMode === '1') {
        return true;
      }

      if (storedMode === '0') {
        // Recover from old persisted-off state so share actions are available by default.
        window.localStorage.removeItem(storageKey);
      }

      return true;
    } catch (error) {
      return !disableShare;
    }
  }

  function applyAdsPreviewMode() {
    if (!document.body) {
      return;
    }

    var search = window.location.search || '';
    var enablePreview = /(?:\?|&)ads-preview=(?:1|on|true)(?:&|$)/i.test(search);
    var disablePreview = /(?:\?|&)ads-preview=(?:0|off|false)(?:&|$)/i.test(search);
    var storageKey = 'skillrAdsPreviewMode';
    var previewEnabled = false;

    try {
      if (enablePreview) {
        window.localStorage.setItem(storageKey, '1');
      } else if (disablePreview) {
        window.localStorage.removeItem(storageKey);
      }

      previewEnabled = window.localStorage.getItem(storageKey) === '1';
    } catch (error) {
      previewEnabled = enablePreview && !disablePreview;
    }

    if (previewEnabled) {
      document.body.classList.add('ads-preview');
    } else {
      document.body.classList.remove('ads-preview');
    }
  }

  function isInstalledApp() {
    if (window.matchMedia) {
      return window.matchMedia('(display-mode: standalone), (display-mode: fullscreen), (display-mode: minimal-ui)').matches;
    }

    return window.navigator.standalone === true;
  }

  function injectFallbackStyles() {
    if (document.getElementById('skillr-share-styles')) {
      return;
    }

    var style = document.createElement('style');
    style.id = 'skillr-share-styles';
    style.textContent = [
      '.skillr-share-btn, .skillr-copy-btn, .skillr-ig-btn, .skillr-fb-btn, .skillr-install-btn {',
      'position: fixed; right: 16px; z-index: 9999; display: inline-flex; align-items: center; justify-content: center; text-decoration: none;',
      'border-radius: 50%; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.16); }',
      '.skillr-share-btn { bottom: 22px; width: 58px; height: 58px; border: 3px solid #fff; background: linear-gradient(135deg, #25d366 0%, #075e54 100%); color: #fff; }',
      '.skillr-copy-btn, .skillr-ig-btn, .skillr-fb-btn, .skillr-install-btn { width: 48px; height: 48px; border: 2px solid #dce7f2; background: #fff; color: #1f2937; }',
      '.skillr-copy-btn { bottom: 92px; }',
      '.skillr-install-btn { bottom: 146px; border-color: #fde8c8; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #fff; }',
      '.skillr-ig-btn { bottom: 200px; border-color: #f2d2e2; color: #e1306c; }',
      '.skillr-fb-btn { bottom: 254px; border-color: #d8e7ff; color: #1877f2; }',
      '.skillr-install-help { position: fixed; right: 74px; bottom: 150px; z-index: 9998; display: block; max-width: min(260px, calc(100vw - 92px)); padding: 11px 12px; border-radius: 12px; background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%); color: #fff; box-shadow: 0 14px 32px rgba(15, 23, 42, 0.24); font-size: 0.8rem; line-height: 1.45; }',
      '.skillr-install-help strong { display: block; margin-bottom: 4px; color: #fef3c7; font-size: 0.84rem; font-weight: 800; letter-spacing: 0.02em; text-transform: uppercase; }',
      '.skillr-install-help span { display: block; font-weight: 700; }'
    ].join('');

    document.head.appendChild(style);
  }

  function initShareWidget() {
    applyAdsPreviewMode();
    injectMainNavBranding();

    if (!shouldEnableFloatingShare()) {
      return;
    }

    if (window.__skillrShareWidgetInitialized || document.querySelector('.skillr-share-btn, .skillr-copy-btn')) {
      return;
    }

    if (!document.body) {
      return;
    }

    injectFallbackStyles();

    var shareText = 'Check this out: ' + window.location.href;
    var encodedShareText = encodeURIComponent(shareText);
    var whatsappShareUrl = 'https://wa.me/?text=' + encodedShareText;

    function openWhatsAppFallback() {
      window.open(whatsappShareUrl, '_blank', 'noopener,noreferrer');
    }

    var button = document.createElement('a');
    button.className = 'skillr-share-btn';
    button.href = '#';
    button.setAttribute('aria-label', 'Share this page');
    button.innerHTML = '<span aria-hidden="true">' + iconMarkup('share', 24) + '</span>';
    button.addEventListener('click', function (event) {
      event.preventDefault();

      if (navigator.share) {
        navigator.share({
          title: document.title,
          text: 'Try this learning page from SkillrHub',
          url: window.location.href
        }).catch(function () {
          openWhatsAppFallback();
        });
        return;
      }

      openWhatsAppFallback();
    });

    var copyButton = document.createElement('a');
    copyButton.className = 'skillr-copy-btn';
    copyButton.href = '#';
    copyButton.setAttribute('aria-label', 'Copy this page link');
    copyButton.innerHTML = '<span aria-hidden="true">' + iconMarkup('copy', 18) + '</span>';
    copyButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(function () {
          copyButton.innerHTML = '<span aria-hidden="true">' + iconMarkup('check', 18) + '</span>';
          setTimeout(function () {
            copyButton.innerHTML = '<span aria-hidden="true">' + iconMarkup('copy', 18) + '</span>';
          }, 1800);
        });
      }
    });

    var instagramButton = document.createElement('a');
    instagramButton.className = 'skillr-ig-btn';
    instagramButton.href = 'https://www.instagram.com/';
    instagramButton.target = '_blank';
    instagramButton.rel = 'noopener noreferrer';
    instagramButton.setAttribute('aria-label', 'Open Instagram');
    instagramButton.innerHTML = '<span aria-hidden="true">' + iconMarkup('instagram', 18) + '</span>';

    var facebookButton = document.createElement('a');
    facebookButton.className = 'skillr-fb-btn';
    facebookButton.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
    facebookButton.target = '_blank';
    facebookButton.rel = 'noopener noreferrer';
    facebookButton.setAttribute('aria-label', 'Share this page on Facebook');
    facebookButton.innerHTML = '<span aria-hidden="true">' + iconMarkup('facebook', 18) + '</span>';

    var installButton = document.createElement('a');
    installButton.className = 'skillr-install-btn';
    installButton.href = '#';
    installButton.setAttribute('aria-label', 'Add this page as a bookmark shortcut');
    installButton.innerHTML = '<span aria-hidden="true">' + iconMarkup('bookmark', 19) + '</span>';
    installButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (window.external && typeof window.external.AddFavorite === 'function') {
        window.external.AddFavorite(window.location.href, document.title);
      }
      installButton.classList.add('skillr-install-btn--active');
      installHelp.style.opacity = '0';
      installHelp.style.transform = 'translateY(6px)';
      installHelp.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      setTimeout(function () {
        installButton.classList.remove('skillr-install-btn--active');
      }, 300);
    });

    var installHelp = document.createElement('div');
    installHelp.className = 'skillr-install-help';
    installHelp.setAttribute('role', 'note');
    installHelp.innerHTML = '<strong>Bookmark shortcut</strong><span>Safe on school and kids devices. It only adds a simple bookmark shortcut and does not collect data.</span>';

    if (isInstalledApp()) {
      installHelp.style.display = 'none';
    } else {
      setTimeout(function () {
        installHelp.style.opacity = '0';
        installHelp.style.transform = 'translateY(6px)';
        installHelp.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      }, 30000);
    }

    document.body.appendChild(facebookButton);
    document.body.appendChild(instagramButton);
    document.body.appendChild(installHelp);
    document.body.appendChild(installButton);
    document.body.appendChild(copyButton);
    document.body.appendChild(button);

    window.__skillrShareWidgetInitialized = true;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShareWidget, { once: true });
  } else {
    initShareWidget();
  }

  window.addEventListener('load', initShareWidget, { once: true });
})();
