/**
 * Initiate bootstrap.native
 */
window.addEventListener("load", () => {
  window.BSN.initCallback();
});

/**
 * Initiate google analytics
 */
window.addEventListener("load", () => {
  if (location.host.includes("localhost")) {
    return;
  }
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=UA-175669174-2";
  script.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "UA-175669174-2", {
      page_title: "Landing Page",
    });
  };
  document.body.append(script);
});
