(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function () {
    if (typeof QRCode === "undefined") return;
    document.querySelectorAll("[data-qr-url]").forEach(function (node) {
      var url = node.getAttribute("data-qr-url");
      if (!url || node.dataset.qrReady === "1") return;
      node.dataset.qrReady = "1";
      new QRCode(node, {
        text: url,
        width: 156,
        height: 156,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    });
  });
})();
