document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.skillr-share-btn')) {
    return;
  }

  var shareUrl = encodeURIComponent(window.location.href);
  var text = encodeURIComponent('Check this out: ' + window.location.href);

  var menu = document.createElement('div');
  menu.className = 'skillr-share-menu';
  menu.innerHTML = [
    '<a class="wa" href="https://wa.me/?text=' + text + '" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><span class="share-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.272-.099-.47-.149-.669.149-.198.297-.768.966-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.521.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.076 4.487.708.305 1.26.487 1.692.625.708.225 1.352.194 1.863.118.569-.085 1.758-.719 2.008-1.417.25-.697.25-1.297.174-1.417-.074-.12-.272-.198-.57-.347zM12.002 2.001A9.996 9.996 0 0 0 2.007 12.0c0 1.75.458 3.45 1.333 4.93L2 22l5.18-1.36a9.958 9.958 0 0 0 4.82 1.198h.001a9.997 9.997 0 0 0 9.995-9.998C21.997 5.72 17.28 1.001 12.002 2.001zm0 18.0a8.003 8.003 0 0 1-4.08-1.09l-.29-.17-3.07.81.82-2.99-.19-.31A8.004 8.004 0 1 1 12.002 20.001z"/></svg></span><span>WhatsApp</span></a>',
    '<a class="ig" href="https://www.instagram.com/?url=' + shareUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram"><span class="share-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.03 2h9.94A5.03 5.03 0 0 1 22 7.03v9.94A5.03 5.03 0 0 1 16.97 22H7.03A5.03 5.03 0 0 1 2 16.97V7.03A5.03 5.03 0 0 1 7.03 2zm0 2A3.03 3.03 0 0 0 4 7.03v9.94A3.03 3.03 0 0 0 7.03 20h9.94A3.03 3.03 0 0 0 20 16.97V7.03A3.03 3.03 0 0 0 16.97 4H7.03zm9.94 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 1 0-6z"/></svg></span><span>Instagram</span></a>',
    '<a class="fb" href="https://www.facebook.com/sharer/sharer.php?u=' + shareUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><span class="share-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13.5 22v-8.5h2.9l.4-3.3H13.5V4.9c0-.95.3-1.6 1.6-1.6h1.7V.1c-.3-.1-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.2v2.4H7.1v3.3h2.8V22h3.6z"/></svg></span><span>Facebook</span></a>'
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
