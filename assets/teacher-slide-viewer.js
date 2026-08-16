(() => {
  'use strict';

  const root = document.querySelector('[data-fixed-slide-viewer]');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll('[data-slide]'));
  const previous = root.querySelector('[data-slide-previous]');
  const next = root.querySelector('[data-slide-next]');
  const counter = root.querySelector('[data-slide-counter]');
  const fullscreen = root.querySelector('[data-slide-fullscreen]');
  let index = 0;

  const show = (nextIndex) => {
    if (!slides.length) return;
    index = Math.max(0, Math.min(slides.length - 1, nextIndex));
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.hidden = !active;
      slide.setAttribute('aria-hidden', String(!active));
    });
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === slides.length - 1;
    if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
  };

  previous?.addEventListener('click', () => show(index - 1));
  next?.addEventListener('click', () => show(index + 1));

  fullscreen?.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) await root.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) {
      // Fullscreen is an enhancement; the deck remains usable without it.
    }
  });

  root.addEventListener('contextmenu', (event) => event.preventDefault());
  root.addEventListener('copy', (event) => event.preventDefault());
  root.addEventListener('cut', (event) => event.preventDefault());
  root.addEventListener('dragstart', (event) => event.preventDefault());
  root.addEventListener('selectstart', (event) => event.preventDefault());

  root.querySelectorAll('img').forEach((image) => {
    image.draggable = false;
    image.setAttribute('draggable', 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (!root.contains(document.activeElement) && !document.fullscreenElement) return;

    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      show(index - 1);
      return;
    }
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault();
      show(index + 1);
      return;
    }

    const blocked = (event.ctrlKey || event.metaKey) && ['c', 's', 'p', 'u'].includes(event.key.toLowerCase());
    if (blocked) event.preventDefault();
  });

  show(0);
})();
