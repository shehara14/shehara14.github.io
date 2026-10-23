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

  const experienceEntries = [...document.querySelectorAll(".experience-entry")];
  const mobileExperience = window.matchMedia("(max-width: 620px)");

  function setupMobileExperience() {
    experienceEntries.forEach((entry) => {
      const content = entry.querySelector(".career-content");
      let toggle = content?.querySelector(".career-details-toggle");

      if (!toggle && content) {
        toggle = document.createElement("button");
        toggle.className = "career-details-toggle";
        toggle.type = "button";
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = `<span>Read more</span><i class="ri-arrow-down-s-line" aria-hidden="true"></i>`;
        content.insertBefore(toggle, content.querySelector("ul"));

        toggle.addEventListener("click", () => {
          const expanded = entry.classList.toggle("is-expanded");
          entry.classList.toggle("is-collapsed", !expanded);
          toggle.setAttribute("aria-expanded", String(expanded));
          toggle.querySelector("span").textContent = expanded ? "Show less" : "Read more";
        });
      }

      if (mobileExperience.matches) {
        if (!entry.classList.contains("is-expanded")) entry.classList.add("is-collapsed");
      } else {
        entry.classList.remove("is-collapsed", "is-expanded");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "true");
          toggle.querySelector("span").textContent = "Show less";
        }
      }
    });
  }

  setupMobileExperience();
  mobileExperience.addEventListener("change", setupMobileExperience);
})();
