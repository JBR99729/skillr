(() => {
  "use strict";
  if (!/^\/quiz\/year-4\/english\/ac9e4(?:la(?:0[1-9]|1[0-2])|le0[1-5]|ly01)\/(practice|test)(?:\/index\.html|\/?)$/i.test(location.pathname)) return;
  const notes = document.querySelector('[data-skillr-authored-preparation="true"]');
  const card = document.querySelector('#startScreen .start-card');
  if (!notes || !card) return;
  // Load after the quiz runtime registers its DOMContentLoaded initializer.
  // That initializer removes legacy quick reads. Retain this exact authored
  // node, without extracting, recreating or changing any curriculum wording.
  const preserve = () => {
    if (card.contains(notes)) return;
    const summary = card.querySelector('.quiz-summary');
    summary ? card.insertBefore(notes, summary) : card.appendChild(notes);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', preserve, {once: true});
  preserve();
})();
