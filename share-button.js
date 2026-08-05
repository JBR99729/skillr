document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.skillr-share-btn')) {
    return;
  }

  var shareUrl = encodeURIComponent(window.location.href);
  var text = encodeURIComponent('Check this out: ' + window.location.href);

  var menu = document.createElement('div');
  menu.className = 'skillr-share-menu';
  menu.innerHTML = [
    '<a class="wa" href="https://wa.me/?text=' + text + '" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">📱 WhatsApp</a>',
    '<a class="ig" href="https://www.instagram.com/?url=' + shareUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram">📸 Instagram</a>',
    '<a class="fb" href="https://www.facebook.com/sharer/sharer.php?u=' + shareUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">👍 Facebook</a>'
  ].join('');

  var button = document.createElement('a');
  button.className = 'skillr-share-btn';
  button.href = '#';
  button.setAttribute('aria-label', 'Open social sharing options');
  button.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" role="img" aria-label="Share"><path d="M18 16.08c-.76 0-1.44.3-1.96.78l-7.13-3.75c.05-.22.08-.46.08-.71s-.03-.49-.08-.71l7.12-3.75c.52.48 1.2.78 1.96.78 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .25.03.49.08.71L7.96 9.54c-.52-.48-1.2-.78-1.96-.78-1.66 0-3 1.34-3 3s1.34 3 3 3c.76 0 1.44-.3 1.96-.78l7.13 3.75c-.05.22-.08.46-.08.71 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/></svg></span><span>Share it!</span>';

  button.addEventListener('click', function (event) {
    event.preventDefault();
    menu.classList.toggle('is-open');
  });

  document.body.appendChild(menu);
  document.body.appendChild(button);
});
