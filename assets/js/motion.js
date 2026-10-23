(() => {
  document.querySelectorAll('.project-image, .certificate-image').forEach((image) => {
    const markLoaded = () => {
      if (!image.naturalWidth) return;
      image.parentElement.classList.add(image.classList.contains('project-image') ? 'is-loaded' : 'has-image');
    };
    image.addEventListener('load', markLoaded, { once: true });
    if (image.complete) markLoaded();
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  let progressFrame = 0;
  const updateProgress = () => {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(() => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
      progress.style.transform = `scaleX(${Math.max(0, Math.min(amount, 1))})`;
      progressFrame = 0;
    });
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  if (!('IntersectionObserver' in window)) return;

  const revealGroups = [
    '.career-heading', '.career-entry', '.skills-heading', '.skill-card',
    '.projects-intro', '.project-card', '.certificates-intro',
    '.certificate-search', '.certificate-filters', '.certificate-card',
    '.contact-form-panel', '.contact-detail-card', '.contact-social-links'
  ];

  revealGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.dataset.motion = 'reveal';
      element.style.setProperty('--motion-delay', `${Math.min(index % 6, 5) * 65}ms`);
    });
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });

  document.querySelectorAll('[data-motion="reveal"]').forEach((element) => observer.observe(element));
})();
