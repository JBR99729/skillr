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
  button.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" role="img" aria-label="WhatsApp"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.272-.099-.47-.149-.669.149-.198.297-.768.966-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.521.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.076 4.487.708.305 1.26.487 1.692.625.708.225 1.352.194 1.863.118.569-.085 1.758-.719 2.008-1.417.25-.697.25-1.297.174-1.417-.074-.12-.272-.198-.57-.347zM12.002 2.001A9.996 9.996 0 0 0 2.007 12.0c0 1.75.458 3.45 1.333 4.93L2 22l5.18-1.36a9.958 9.958 0 0 0 4.82 1.198h.001a9.997 9.997 0 0 0 9.995-9.998C21.997 5.72 17.28 1.001 12.002 2.001zm0 18.0a8.003 8.003 0 0 1-4.08-1.09l-.29-.17-3.07.81.82-2.99-.19-.31A8.004 8.004 0 1 1 12.002 20.001z"/></svg></span><span>Share it!</span>';

  var copyButton = document.createElement('a');
  copyButton.className = 'skillr-copy-btn';
  copyButton.href = '#';
  copyButton.setAttribute('aria-label', 'Copy this page link');
  copyButton.innerHTML = '📋 Copy link';
  copyButton.addEventListener('click', function (event) {
    event.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(function () {
      copyButton.innerHTML = '✓ Copied';
      setTimeout(function () {
        copyButton.innerHTML = '📋 Copy link';
      }, 1800);
    });
  });

  document.body.appendChild(copyButton);
  document.body.appendChild(button);
});
