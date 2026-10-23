(() => {
  const tabs = [...document.querySelectorAll("[data-career-target]")];
  const panels = tabs
    .map((tab) => document.getElementById(tab.getAttribute("aria-controls")))
    .filter(Boolean);

  if (!tabs.length || !panels.length) return;

  function activateTab(tab, moveFocus = false) {
    const selectedPanelId = tab.getAttribute("aria-controls");

    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      item.classList.toggle("is-selected", selected);
      if (selected && moveFocus) item.focus();
    });

    panels.forEach((panel) => {
      const selected = panel.id === selectedPanelId;
      if (selected) {
        panel.hidden = false;
        panel.setAttribute("aria-hidden", "false");
        requestAnimationFrame(() => panel.classList.add("is-active"));
      } else {
        panel.classList.remove("is-active");
        panel.setAttribute("aria-hidden", "true");
        window.setTimeout(() => {
          if (!panel.classList.contains("is-active")) panel.hidden = true;
        }, 240);
      }
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });
})();
