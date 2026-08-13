(() => {
  "use strict";
  const esc = value => String(value ?? "").replace(/[&<>\"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  function conciseCaption(spec) {
    const explicit = String(spec.caption || "").trim();
    if (explicit) return explicit;
    const alt = String(spec.alt || "").trim();
    const match = alt.match(/^A code-specific (visual|application) model for ([^:]+):/i);
    if (match) {
      const label = match[1].toLowerCase() === "application" ? "Application model" : "Visual model";
      return `${label}: ${match[2].trim()}`;
    }
    const firstSentence = alt.split(/(?<=[.!?])\s/)[0] || "Mathematical visual model";
    return firstSentence.length <= 140 ? firstSentence : `${firstSentence.slice(0, 137).replace(/\s+\S*$/, "")}…`;
  }
  function render(spec) {
    if (!spec) return "";
    if (spec.type === "legacyHtml") {
      return `<figure class="tmv2-visual" role="img" aria-label="${esc(spec.alt)}"><div class="tmv2-preserved-visual" aria-hidden="true">${spec.html || ""}</div><figcaption aria-hidden="true">${esc(conciseCaption(spec))}</figcaption></figure>`;
    }
    if (spec.type === "squareArray") {
      const side = Number(spec.parameters.side);
      return `<figure class="tmv2-visual" role="img" aria-label="${esc(spec.alt)}"><div class="tmv2-array" style="--side:${side}">${Array.from({length:side * side}, () => "<i></i>").join("")}</div><figcaption>${side}² = ${esc(spec.parameters.total)} and √${esc(spec.parameters.total)} = ${side}</figcaption></figure>`;
    }
    if (spec.type === "rootBounds") {
      const p = spec.parameters;
      return `<figure class="tmv2-visual" role="img" aria-label="${esc(spec.alt)}"><div class="tmv2-bounds"><b>${esc(p.lower)} = ${esc(p.lowerRoot)}²</b><strong>${esc(p.value)}</strong><b>${esc(p.upper)} = ${esc(p.upperRoot)}²</b></div><figcaption>${esc(p.lowerRoot)} &lt; √${esc(p.value)} &lt; ${esc(p.upperRoot)}</figcaption></figure>`;
    }
    return `<figure class="tmv2-visual" role="img" aria-label="${esc(spec.alt)}"><figcaption aria-hidden="true">${esc(conciseCaption(spec))}</figcaption></figure>`;
  }
  window.SkillrTopicModuleV2Visuals = {render};
})();
