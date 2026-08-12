(function () {
  "use strict";
  const unit = window.SkillrFoundationMathsData && window.SkillrFoundationMathsData.AC9MFN02;
  if (!unit) return;

  if (!document.getElementById("ac9mfn02-elaboration-visual-style")) {
    const style = document.createElement("style");
    style.id = "ac9mfn02-elaboration-visual-style";
    style.textContent = ".subitising-visual-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:8px 0}.subitising-card{display:grid;place-items:center;min-height:116px;padding:10px;border:2px solid #b9cbe4;border-radius:12px;background:#fff}.subitising-card b{color:#173968}.dot-frame{display:grid;grid-template-columns:repeat(3,18px);grid-auto-rows:18px;gap:7px;place-content:center;min-width:88px;min-height:68px;margin:7px auto;padding:9px;border:1px solid #d8e4f2;border-radius:10px;background:#f7faff}.dot-frame.two-col{grid-template-columns:repeat(2,18px)}.dot{width:17px;height:17px;border-radius:50%;background:#2457d6;box-shadow:inset 0 0 0 2px rgba(255,255,255,.42)}.dot.blank{visibility:hidden}.subitising-symbol{font-size:1.5rem;font-weight:900;color:#2457d6}.subitising-card p{margin:4px 0;text-align:center}@media(max-width:680px){.subitising-visual-row{grid-template-columns:1fr}.subitising-card{min-height:0}}";
    document.head.appendChild(style);
  }

  unit.model_title = "E1 visual teaching: recognise a quantity with a quick look";
  unit.model_html = '<div class="subitising-visual-row"><div class="subitising-card"><b>FLASH</b><div class="dot-frame"><i class="dot"></i><i class="dot"></i><i class="dot blank"></i><i class="dot"></i><i class="dot"></i><i class="dot"></i></div><p>Show for two seconds, then cover.</p></div><div class="subitising-card"><b>SEE PARTS</b><div class="dot-frame two-col"><i class="dot"></i><i class="dot"></i><i class="dot"></i><i class="dot"></i></div><span class="subitising-symbol">+ 1</span><p>The eyes notice 4 and 1.</p></div><div class="subitising-card"><b>NAME TOTAL</b><span class="subitising-symbol">4 + 1 → 5</span><p>Say 5 without counting every dot.</p></div></div><p><strong>Teacher model:</strong> “I did not count one by one. I saw 4 and 1 more, so I knew there were 5.”</p><div class="mini-card check-card"><span class="mini-label">E1 guided check</span><p>Flash 3 dots with 2 underneath. Cover them. Ask: “How many? What groups did you see?”</p></div>';

  unit.apply_title = "E2 visual teaching: match, compare and order arrangements";
  unit.apply_html = '<div class="subitising-visual-row"><div class="subitising-card"><b>MATCH</b><div class="dot-frame"><i class="dot"></i><i class="dot"></i><i class="dot"></i><i class="dot"></i><i class="dot"></i><i class="dot blank"></i></div><span class="subitising-symbol">= 5</span><p>Arrangement changes; quantity stays 5.</p></div><div class="subitising-card"><b>COMPARE</b><span class="subitising-symbol">5 &gt; 4</span><p>Five has one more dot than four.</p></div><div class="subitising-card"><b>ORDER</b><span class="subitising-symbol">3 → 4 → 5</span><p>Arrange quantities from fewer to more.</p></div></div><p><strong>Teacher model:</strong> “The positions changed, but the quantity did not. I match equal totals before I compare or order them.”</p><div class="mini-card check-card"><span class="mini-label">E2 guided check</span><p>Show differently arranged cards for 3, 4 and 5. Ask the student to match equal quantities, order them and explain which has more.</p></div>';
}());
