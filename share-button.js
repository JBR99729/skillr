document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.skillr-share-btn')) {
    return;
  }

  var button = document.createElement('a');
  button.className = 'skillr-share-btn';
  button.href = 'https://wa.me/?text=' + encodeURIComponent('Check this out: ' + window.location.href);
  button.target = '_blank';
  button.rel = 'noopener noreferrer';
  button.setAttribute('aria-label', 'Share this page on WhatsApp');
  button.innerHTML = '<span aria-hidden="true">💬</span>';

  document.body.appendChild(button);
});
