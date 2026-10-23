(() => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-form-note");
  if (!form || !status) return;

  function hideStatus() {
    status.hidden = true;
    status.textContent = "";
  }

  form.addEventListener("input", hideStatus);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideStatus();
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const submitButton = form.querySelector('button[type="submit"]');
    if (!name || !email || !message) return;

    submitButton.disabled = true;
    form.setAttribute("aria-busy", "true");

    try {
      const response = await fetch(form.dataset.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio message from ${name}`,
          _replyto: email,
          _template: "table",
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !(result.success === "true" || result.success === true)) {
        throw new Error(result.message || "The message could not be sent.");
      }

      status.textContent = "Message sent successfully.";
      status.hidden = false;
      form.reset();
    } catch {
      hideStatus();
    } finally {
      submitButton.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
})();
