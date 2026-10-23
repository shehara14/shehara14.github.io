(() => {
  const filterButtons = [...document.querySelectorAll(".certificate-filter")];
  const searchInput = document.getElementById("certificate-search-input");
  const cards = [...document.querySelectorAll(".certificate-card")];
  const certificateGrid = document.getElementById("certificate-grid");
  const emptyMessage = document.getElementById("certificates-empty");
  const viewer = document.querySelector(".certificate-viewer");
  const viewerImage = viewer?.querySelector(".certificate-viewer-image");
  const viewerTitle = viewer?.querySelector(".certificate-viewer-title");
  const viewerClose = viewer?.querySelector(".certificate-viewer-close");
  if (!filterButtons.length || !searchInput || !emptyMessage) return;

  const titleOrder = new Intl.Collator(undefined, {
    sensitivity: "base",
    numeric: true,
    ignorePunctuation: true,
  });
  cards.sort((first, second) => titleOrder.compare(first.dataset.title || "", second.dataset.title || ""));
  cards.forEach((card) => certificateGrid?.append(card));

  if (viewer && viewerImage && viewerTitle && viewerClose) {
    document.querySelectorAll(".certificate-open").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".certificate-card");
        const image = card?.querySelector(".certificate-image");
        if (!image) return;
        viewerImage.src = image.currentSrc || image.src;
        viewerImage.alt = image.alt;
        viewerTitle.textContent = card.dataset.title || image.alt;
        viewer.showModal();
        viewerClose.focus();
      });
    });

    viewerClose.addEventListener("click", () => viewer.close());
    viewer.addEventListener("click", (event) => {
      if (event.target === viewer) viewer.close();
    });
  }

  let selectedOrganization = "all";

  function updateCertificates() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const organization = card.dataset.organization || "";
      const title = card.dataset.title || "";
      const matchesOrganization = selectedOrganization === "all" || organization === selectedOrganization;
      const matchesQuery = !query || `${title} ${organization}`.toLocaleLowerCase().includes(query);
      const visible = matchesOrganization && matchesQuery;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    emptyMessage.hidden = visibleCount > 0;
    if (visibleCount === 0 && selectedOrganization !== "all" && !query) {
      emptyMessage.textContent = `Certificate titles and files from ${selectedOrganization} have not been added to this website yet.`;
    } else if (visibleCount === 0) {
      emptyMessage.textContent = "No certificate titles match this search yet. Try another search or organization.";
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedOrganization = button.dataset.organization || "all";
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      updateCertificates();
    });
  });

  searchInput.addEventListener("input", updateCertificates);
  updateCertificates();
})();
