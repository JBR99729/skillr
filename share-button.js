(function () {
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
    if (window.__skillrShareWidgetInitialized || document.querySelector('.skillr-share-btn, .skillr-copy-btn')) {
      return;
    }

    if (!document.body) {
      return;
    }

    function getInstallDismissed() {
      try {
        return localStorage.getItem('skillr-install-dismissed') === 'true' ||
          Number(localStorage.getItem('skillrPwaAcceptedAt') || '0') > 0;
      } catch (error) {
        return false;
      }
    }

    function setInstallDismissed() {
      try {
        localStorage.setItem('skillr-install-dismissed', 'true');
      } catch (error) {
        // Ignore storage failures.
      }
    }

    function shouldShowInstallPrompt() {
      if (getInstallDismissed() || isInstalledApp()) {
        return false;
      }

      var referrer = document.referrer || '';
      if (!referrer) {
        return false;
      }

      try {
        return new URL(referrer).origin !== window.location.origin;
      } catch (error) {
        return Boolean(referrer);
      }
    }

    injectFallbackStyles();

    var text = encodeURIComponent('Check this out: ' + window.location.href);

    var button = document.createElement('a');
    button.className = 'skillr-share-btn';
    button.href = 'https://wa.me/?text=' + text;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.setAttribute('aria-label', 'Share this page');
    button.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.3 3.3 0 0 0 0-1.39l7.05-4.11A3 3 0 1 0 15 5c0 .23.03.45.08.66L8.03 9.78a3 3 0 1 0 0 4.44l7.12 4.16c-.04.2-.07.41-.07.62A2.92 2.92 0 1 0 18 16.08z"/></svg></span><span class="skillr-share-label">Share</span>';
    button.addEventListener('click', function (event) {
      if (!navigator.share) return;
      event.preventDefault();
      navigator.share({ title: document.title, url: window.location.href }).catch(function () {});
    });

    var copyButton = document.createElement('a');
    copyButton.className = 'skillr-copy-btn';
    copyButton.href = '#';
    copyButton.setAttribute('aria-label', 'Copy this page link');
    copyButton.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16 1H4a2 2 0 0 0-2 2v10h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg></span>';
    copyButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(function () {
          copyButton.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>';
          setTimeout(function () {
            copyButton.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16 1H4a2 2 0 0 0-2 2v10h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg></span>';
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
    instagramButton.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.03 2h9.94A5.03 5.03 0 0 1 22 7.03v9.94A5.03 5.03 0 0 1 16.97 22H7.03A5.03 5.03 0 0 1 2 16.97V7.03A5.03 5.03 0 0 1 7.03 2zm0 2A3.03 3.03 0 0 0 4 7.03v9.94A3.03 3.03 0 0 0 7.03 20h9.94A3.03 3.03 0 0 0 20 16.97V7.03A3.03 3.03 0 0 0 16.97 4H7.03zm9.94 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 1 0-6z"/></svg></span>';

    var facebookButton = document.createElement('a');
    facebookButton.className = 'skillr-fb-btn';
    facebookButton.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
    facebookButton.target = '_blank';
    facebookButton.rel = 'noopener noreferrer';
    facebookButton.setAttribute('aria-label', 'Share this page on Facebook');
    facebookButton.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13.5 22v-8.5h2.9l.4-3.3H13.5V4.9c0-.95.3-1.6 1.6-1.6h1.7V.1c-.3-.1-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.2v2.4H7.1v3.3h2.8V22h3.6z"/></svg></span>';

    if (shouldShowInstallPrompt()) {
      var installButton = document.createElement('a');
      installButton.className = 'skillr-install-btn';
      installButton.href = '#';
      installButton.setAttribute('aria-label', 'Download or install this page');
      installButton.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M12 3v10.2l3-3 1.4 1.4L12 16 7.6 11.6 9 10.2l3 3V3h2Zm-7 16h14v2H5z"/></svg></span>';
      installButton.addEventListener('click', function (event) {
        event.preventDefault();
        setInstallDismissed();
        if (window.external && typeof window.external.AddFavorite === 'function') {
          window.external.AddFavorite(window.location.href, document.title);
        }
        installButton.classList.add('skillr-install-btn--active');
        if (installHelp && installHelp.parentNode) {
          installHelp.style.opacity = '0';
          installHelp.style.transform = 'translateY(6px)';
          installHelp.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }
        setTimeout(function () {
          installButton.classList.remove('skillr-install-btn--active');
          if (installButton.parentNode) {
            installButton.parentNode.removeChild(installButton);
          }
          if (installHelp && installHelp.parentNode) {
            installHelp.parentNode.removeChild(installHelp);
          }
        }, 220);
      });

      var installHelp = document.createElement('div');
      installHelp.className = 'skillr-install-help';
      installHelp.setAttribute('role', 'note');
      installHelp.innerHTML = '<strong>Download / install</strong><span>Tap once to save this page as a quick shortcut for later.</span>';

      if (isInstalledApp()) {
        installHelp.style.display = 'none';
      } else {
        setTimeout(function () {
          installHelp.style.opacity = '0';
          installHelp.style.transform = 'translateY(6px)';
          installHelp.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 30000);
      }

      document.body.appendChild(installHelp);
      document.body.appendChild(installButton);
    }

    document.body.appendChild(facebookButton);
    document.body.appendChild(instagramButton);
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
