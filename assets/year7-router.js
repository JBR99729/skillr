(() => {
  "use strict";

  if (window.__skillrYear7RouterLoaded) return;
  window.__skillrYear7RouterLoaded = true;

  const path = location.pathname;
  const topic = path.match(/^\/year7\/(maths|science|english)\/(ac9[mse]7[a-z0-9]+)/i);
  const quiz = path.match(/^\/quiz\/year-7\/(math|science|english)\/(ac9[mse]7[a-z0-9]+)\/(practice|test|worksheet)\/?$/i);

  // Static Curriculum Architecture v2: canonical Year 7 topic pages own their
  // complete teaching content in index.html. Never replace that content at runtime.
  if (topic) return;
  if (!quiz) return;

  const routeSubject = (quiz[1] || "").toLowerCase();
  const subject = routeSubject === "math" ? "maths" : routeSubject;
  const mode = quiz[3].toLowerCase();

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const base = src.split("?")[0];
      const existing = [...document.scripts].find((script) => String(script.src || "").includes(base));
      if (existing) {
        if (existing.dataset.skillrLoaded === "true") { resolve(); return; }
        existing.addEventListener("load", resolve, {once:true});
        existing.addEventListener("error", reject, {once:true});
        setTimeout(resolve, 250);
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.addEventListener("load", () => { script.dataset.skillrLoaded = "true"; resolve(); }, {once:true});
      script.addEventListener("error", reject, {once:true});
      document.head.appendChild(script);
    });
  }

  function loadSequence(items) {
    return items.reduce((promise,src)=>promise.then(()=>loadScript(src)),Promise.resolve());
  }

  const data = {
    maths:[
      "/assets/year7-curriculum-base.js?v=1",
      "/assets/year7-maths-data-n.js?v=1",
      "/assets/year7-maths-data-am.js?v=1",
      "/assets/year7-maths-data-spstp.js?v=1"
    ],
    science:[
      "/assets/year7-curriculum-base.js?v=1",
      "/assets/year7-science-data-u.js?v=1",
      "/assets/year7-science-data-hi.js?v=1"
    ],
    english:[
      "/assets/year7-curriculum-base.js?v=1",
      "/assets/year7-english-data-la.js?v=1",
      "/assets/year7-english-data-le.js?v=1",
      "/assets/year7-english-data-ly.js?v=1"
    ]
  };

  const finalScript = mode === "worksheet"
    ? "/assets/year7-curriculum-worksheet-page.js?v=1"
    : "/assets/year7-curriculum-quick-read.js?v=1";

  loadSequence([...(data[subject] || []), "/assets/year7-worksheet-normalise.js?v=1", finalScript])
    .catch((error) => console.error("Year 7 curriculum resources failed to load:", error));
})();
