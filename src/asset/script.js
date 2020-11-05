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
  function map(x, inMin, inMax, outMin, outMax) {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }
  /**
   * Add animation to OS download buttons.
   */
  document.querySelectorAll(".os").forEach(function (os) {
    const inner = os.querySelector(".inner");

    os.addEventListener("mousemove", function (e) {
      const x = e.clientX - this.getBoundingClientRect().x;
      const y = e.clientY - this.getBoundingClientRect().y;

      const rotateY = map(x, 0, this.offsetWidth, -17, 17);
      const rotateX = map(y, 0, this.offsetHeight, -17, 17);

      inner.style.transform = "rotateY(" + rotateY + "deg)" + " " + "rotateX(" + -rotateX + "deg)";
    });
    os.addEventListener("mouseenter", function () {
      inner.style.transition = "all " + 0.05 + "s" + " linear";
      inner.classList.add("hovered");
    });
    os.addEventListener("mouseleave", function () {
      inner.style.transition = "all " + 0.2 + "s" + " linear";
      inner.classList.remove("hovered");
      inner.style.transform = "rotateY(" + 0 + "deg)" + " " + "rotateX(" + 0 + "deg)";
    });
  });

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
