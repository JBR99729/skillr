(() => {
  "use strict";
  if (!/^\/quiz\/year-4\/science\/ac9s4(?:u0[1-4]|h0[12]|i0[1-6])\/(practice|test)\/?$/i.test(location.pathname)) return;
  const notes = document.querySelector('[data-skillr-authored-preparation="true"]');
  const card = document.querySelector('#startScreen .start-card');
  if (!notes || !card) return;
  // Shared Practice initialization removes legacy quick reads. Preserve the
  // same reviewed node after that cleanup, including a cached quiz runtime.
  const preserve = () => {
    if (card.contains(notes)) return;
    const summary = card.querySelector('.quiz-summary');
    summary ? card.insertBefore(notes, summary) : card.appendChild(notes);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', preserve, {once: true});
  preserve();
})();
