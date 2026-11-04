(() => {
  if (window.location.pathname === "/") {
    window.location.replace(`/shehara${window.location.search}`);
    return;
  }

  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const savedTheme = window.localStorage.getItem("portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;

  const updateThemeControl = () => {
    if (!themeButton) return;
    const light = root.dataset.theme === "light";
    themeButton.setAttribute("aria-pressed", String(light));
    themeButton.innerHTML = light
      ? '<i class="ri-moon-line" aria-hidden="true"></i><span>Dark</span>'
      : '<i class="ri-sun-line" aria-hidden="true"></i><span>Light</span>';
    themeButton.setAttribute("aria-label", `Switch to ${light ? "dark" : "light"} theme`);
  };

  updateThemeControl();
  themeButton?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    window.localStorage.setItem("portfolio-theme", root.dataset.theme);
    updateThemeControl();
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll("main > section, .hero-copy, .social-links, .resume-link");
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        activeObserver.unobserve(entry.target);
      });
    // Large sections (like the full certificate grid) may be much taller than
    // the viewport, so a ratio threshold can prevent them from ever revealing.
    }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });
    targets.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 60}ms`);
      element.classList.add("reveal-on-scroll");
      observer.observe(element);
    });
  }
})();
