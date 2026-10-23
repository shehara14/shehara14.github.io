document.querySelectorAll('.skill-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    const card = button.closest('.skill-card');
    button.setAttribute('aria-expanded', String(expanded));
    button.querySelector('span').textContent = expanded ? 'Hide skills' : 'View skills';
    button.setAttribute(
      'aria-label',
      `${expanded ? 'Hide' : 'Show'} ${button.getAttribute('aria-label').replace(/^(Show|Hide) /, '')}`
    );
    card.classList.toggle('is-expanded', expanded);
  });
});
