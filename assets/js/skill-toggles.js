document.querySelectorAll('.skill-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    const card = button.closest('.skill-card');

    if (expanded) {
      document.querySelectorAll('.skill-card.is-expanded').forEach(openCard => {
        if (openCard === card) return;
        const openButton = openCard.querySelector('.skill-toggle');
        openCard.classList.remove('is-expanded');
        openButton.setAttribute('aria-expanded', 'false');
        openButton.querySelector('span').textContent = 'View skills';
        openButton.setAttribute(
          'aria-label',
          `Show ${openButton.getAttribute('aria-label').replace(/^(Show|Hide) /, '')}`
        );
      });
    }

    button.setAttribute('aria-expanded', String(expanded));
    button.querySelector('span').textContent = expanded ? 'Hide skills' : 'View skills';
    button.setAttribute(
      'aria-label',
      `${expanded ? 'Hide' : 'Show'} ${button.getAttribute('aria-label').replace(/^(Show|Hide) /, '')}`
    );
    card.classList.toggle('is-expanded', expanded);
  });
});
