(() => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-form-note");
  if (!form || !status) return;

  function hideStatus() {
    status.hidden = true;
    status.textContent = "";
    status.classList.remove("is-success", "is-error");
  }

  function showStatus(message, type) {
    status.textContent = message;
    status.classList.remove("is-success", "is-error");
    status.classList.add(type === "success" ? "is-success" : "is-error");
    status.hidden = false;
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

      showStatus("Thank you for reaching out! Your message was sent successfully.", "success");
      form.reset();
    } catch (error) {
      const detail = error instanceof Error && error.message
        ? ` (${error.message})`
        : " (Please check your connection and try again.)";
      showStatus(`Sorry, your message could not be sent${detail}`, "error");
    } finally {
      submitButton.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
})();
