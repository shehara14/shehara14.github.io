(() => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-form-note");
  if (!form || !status) return;

  function showStatus(message, state) {
    status.textContent = message;
    status.dataset.state = state;
    status.hidden = false;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.hidden = true;
    if (!form.reportValidity()) return;

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    form.setAttribute("aria-busy", "true");

    try {
      // A simple cross-origin POST avoids a preflight request. The Apps Script
      // response is opaque, so a resolved fetch confirms the submission request
      // completed but does not expose Google's response page to the visitor.
      await fetch(form.action, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(new FormData(form)),
      });
      form.reset();
      showStatus("Thank you! Your message has been sent. I’ll get back to you soon.", "success");
    } catch {
      showStatus("Sorry, your message couldn’t be sent. Please try again in a moment.", "error");
    } finally {
      button.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
})();
