document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.skillr-share-btn')) {
    return;
  }

  var text = encodeURIComponent('Check this out: ' + window.location.href);

  var button = document.createElement('a');
  button.className = 'skillr-share-btn';
  button.href = 'https://wa.me/?text=' + text;
  button.target = '_blank';
  button.rel = 'noopener noreferrer';
  button.setAttribute('aria-label', 'Share this page on WhatsApp');
  button.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" role="img" aria-label="WhatsApp"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.272-.099-.47-.149-.669.149-.198.297-.768.966-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.521.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.076 4.487.708.305 1.26.487 1.692.625.708.225 1.352.194 1.863.118.569-.085 1.758-.719 2.008-1.417.25-.697.25-1.297.174-1.417-.074-.12-.272-.198-.57-.347zM12.002 2.001A9.996 9.996 0 0 0 2.007 12.0c0 1.75.458 3.45 1.333 4.93L2 22l5.18-1.36a9.958 9.958 0 0 0 4.82 1.198h.001a9.997 9.997 0 0 0 9.995-9.998C21.997 5.72 17.28 1.001 12.002 2.001zm0 18.0a8.003 8.003 0 0 1-4.08-1.09l-.29-.17-3.07.81.82-2.99-.19-.31A8.004 8.004 0 1 1 12.002 20.001z"/></svg></span>';

  var copyButton = document.createElement('a');
  copyButton.className = 'skillr-copy-btn';
  copyButton.href = '#';
  copyButton.setAttribute('aria-label', 'Copy this page link');
  copyButton.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16 1H4a2 2 0 0 0-2 2v10h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg></span>';
  copyButton.addEventListener('click', function (event) {
    event.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(function () {
      copyButton.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>';
      setTimeout(function () {
        copyButton.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16 1H4a2 2 0 0 0-2 2v10h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg></span>';
      }, 1800);
    });
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

  var installButton = document.createElement('a');
  installButton.className = 'skillr-install-btn';
  installButton.href = '#';
  installButton.setAttribute('aria-label', 'Add this page as a bookmark shortcut');
  installButton.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M6 3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4V3z"/></svg></span>';
  installButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (window.external && typeof window.external.AddFavorite === 'function') {
      window.external.AddFavorite(window.location.href, document.title);
    }
  });

  var installHelp = document.createElement('div');
  installHelp.className = 'skillr-install-help';
  installHelp.setAttribute('role', 'note');
  installHelp.innerHTML = '<strong>Bookmark shortcut</strong><span>Safe on school and kids devices. It only adds a simple bookmark shortcut and does not collect data.</span>';

  document.body.appendChild(facebookButton);
  document.body.appendChild(instagramButton);
  document.body.appendChild(installHelp);
  document.body.appendChild(installButton);
  document.body.appendChild(copyButton);
  document.body.appendChild(button);
});
