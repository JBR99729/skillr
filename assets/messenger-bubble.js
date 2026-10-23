(function () {
  "use strict";

  function mountMessengerBubble() {
    if (!document.body || document.getElementById("skillr-messenger-bubble")) return;

    var style = document.createElement("style");
    style.id = "skillr-messenger-bubble-styles";
    style.textContent = [
      ".skillr-messenger-bubble{position:fixed;right:max(18px,calc(env(safe-area-inset-right) + 16px));bottom:max(84px,calc(env(safe-area-inset-bottom) + 76px));z-index:2147483000;display:grid;place-items:center;width:56px;height:56px;border:2px solid #fff;border-radius:50%;background:#0084ff;color:#fff;box-shadow:0 10px 24px rgba(0,71,160,.32);transition:transform .18s ease,box-shadow .18s ease;text-decoration:none}",
      ".skillr-messenger-bubble:hover{transform:translateY(-2px);box-shadow:0 14px 28px rgba(0,71,160,.4)}",
      ".skillr-messenger-bubble:focus-visible{outline:3px solid #ffcf4d;outline-offset:3px}",
      ".skillr-messenger-bubble svg{width:29px;height:29px;fill:currentColor}",
      ".skillr-messenger-bubble::after{content:attr(data-skillr-messenger-tooltip);position:absolute;right:0;bottom:calc(100% + 10px);padding:8px 10px;border-radius:8px;background:#123b66;color:#fff;font:700 12px/1.2 system-ui,sans-serif;white-space:nowrap;opacity:0;pointer-events:none;transform:translateY(4px);transition:opacity .16s ease,transform .16s ease}",
      ".skillr-messenger-bubble:hover::after,.skillr-messenger-bubble:focus-visible::after{opacity:1;transform:translateY(0)}",
      "@media(max-width:560px){.skillr-messenger-bubble{right:max(14px,calc(env(safe-area-inset-right) + 12px));bottom:max(82px,calc(env(safe-area-inset-bottom) + 74px));width:52px;height:52px}.skillr-messenger-bubble svg{width:27px;height:27px}}",
      "@media(prefers-reduced-motion:reduce){.skillr-messenger-bubble,.skillr-messenger-bubble::after{transition:none}.skillr-messenger-bubble:hover{transform:none}}"
    ].join("");
    document.head.appendChild(style);

    var link = document.createElement("a");
    link.id = "skillr-messenger-bubble";
    link.className = "skillr-messenger-bubble";
    link.href = "https://m.me/61591597270383";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Chat with SkillrHub on Facebook Messenger (opens in a new tab)");
    link.setAttribute("data-skillr-messenger-tooltip", "Chat on Messenger");
    link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2C6.34 2 2 6.15 2 11.5c0 3.05 1.42 5.74 3.64 7.5V22l3.14-1.73c1 .28 2.08.43 3.22.43 5.66 0 10-4.15 10-9.5S17.66 2 12 2Zm1.08 12.8-2.55-2.72-4.97 2.72 5.47-5.8 2.62 2.72 4.9-2.72-5.47 5.8Z"/></svg>';
    document.body.appendChild(link);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountMessengerBubble, { once: true });
  else mountMessengerBubble();
}());
