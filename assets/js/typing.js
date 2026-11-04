const focusText = document.querySelector("#focus-text");

if (focusText) {
  const roles = ["Project Manager", "QA", "Developer"];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!reduceMotion.matches) {
    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const renderRole = (role, visibleCharacters) => {
      const visibleText = role.slice(0, visibleCharacters);
      focusText.textContent = visibleText;
      focusText.classList.toggle("is-typing", visibleCharacters < role.length);
    };

    const animateTyping = () => {
      const role = roles[roleIndex];
      renderRole(role, characterIndex);

      if (!deleting && characterIndex === role.length) {
        deleting = true;
        window.setTimeout(animateTyping, 1300);
        return;
      }

      if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        window.setTimeout(animateTyping, 280);
        return;
      }

      characterIndex += deleting ? -1 : 1;
      window.setTimeout(animateTyping, deleting ? 42 : 85);
    };

    focusText.innerHTML = "";
    window.setTimeout(animateTyping, 85);
  }
}
