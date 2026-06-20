(() => {
  const slides = [...document.querySelectorAll('.slide')];
  if (!slides.length) return;

  const PRESENTATION_FLAGS = {
    enablePresenterNotes: true,
    allowUrlParamOverride: true
  };

  const progress = document.getElementById('progress');
  const notesPanel = document.getElementById('notesPanel');
  const notesContent = document.getElementById('notesContent');
  const notesBtn = document.getElementById('notesBtn');
  const closeNotes = document.getElementById('closeNotes');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const scrollStatus = document.getElementById('scrollStatus');
  const params = new URLSearchParams(location.search);
  const notesEnabled = PRESENTATION_FLAGS.enablePresenterNotes &&
    (!PRESENTATION_FLAGS.allowUrlParamOverride || params.get('notes') !== '0');

  let index = clamp(Number(location.hash.slice(1)) - 1 || 0, 0, slides.length - 1);

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function decorateSlides() {
    slides.forEach((slide, slideIndex) => {
      slide.setAttribute('tabindex', '-1');
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `Slide ${slideIndex + 1} de ${slides.length}`);

      if (!slide.querySelector('.number-rail')) {
        const rail = document.createElement('div');
        rail.className = 'number-rail';
        rail.setAttribute('aria-hidden', 'true');
        rail.innerHTML = `<div class="line"></div><div class="num">${String(slideIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}</div>`;
        slide.appendChild(rail);
      }
    });
  }

  function updateNotes() {
    if (!notesEnabled || !notesContent) return;
    const notes = slides[index].querySelector('.notes');
    notesContent.innerHTML = notes ? notes.innerHTML : '<p>Sem notas para este slide.</p>';
  }

  function updateScrollableState() {
    const active = slides[index];
    const isScrollable = active.scrollHeight > active.clientHeight + 8;
    active.dataset.scrollable = String(isScrollable);
    document.body.classList.toggle('has-scrollable-slide', isScrollable);
    if (scrollStatus) {
      const atEnd = active.scrollTop + active.clientHeight >= active.scrollHeight - 8;
      scrollStatus.textContent = atEnd ? 'fim do conteúdo' : 'role para continuar ↓';
    }
  }

  function showSlide(nextIndex, options = {}) {
    index = clamp(nextIndex, 0, slides.length - 1);
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
      if (active && options.preserveScroll !== true) slide.scrollTop = 0;
    });

    if (progress) {
      const percent = ((index + 1) / slides.length) * 100;
      progress.style.width = `${percent}%`;
      progress.setAttribute('aria-valuemin', '1');
      progress.setAttribute('aria-valuenow', String(index + 1));
      progress.setAttribute('aria-valuemax', String(slides.length));
    }

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === slides.length - 1;
    if (location.hash !== `#${index + 1}`) history.replaceState(null, '', `#${index + 1}`);
    updateNotes();
    requestAnimationFrame(updateScrollableState);
  }

  function scrollOrAdvance(direction) {
    const active = slides[index];
    const distance = Math.max(260, active.clientHeight * .72);
    const atBottom = active.scrollTop + active.clientHeight >= active.scrollHeight - 10;
    const atTop = active.scrollTop <= 10;

    if (direction > 0 && !atBottom) {
      active.scrollBy({ top: distance, behavior: 'smooth' });
      window.setTimeout(updateScrollableState, 260);
      return;
    }

    if (direction < 0 && !atTop) {
      active.scrollBy({ top: -distance, behavior: 'smooth' });
      window.setTimeout(updateScrollableState, 260);
      return;
    }

    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= slides.length) return;
    showSlide(nextIndex);
  }

  prevBtn?.addEventListener('click', () => showSlide(index - 1));
  nextBtn?.addEventListener('click', () => showSlide(index + 1));

  if (!notesEnabled) {
    notesBtn?.remove();
    notesPanel?.remove();
  } else {
    notesBtn?.setAttribute('aria-expanded', 'false');
    notesBtn?.addEventListener('click', () => {
      notesPanel?.classList.toggle('open');
      notesBtn.setAttribute('aria-expanded', String(notesPanel?.classList.contains('open')));
      updateNotes();
    });
    closeNotes?.addEventListener('click', () => {
      notesPanel?.classList.remove('open');
      notesBtn?.setAttribute('aria-expanded', 'false');
    });
  }

  slides.forEach(slide => slide.addEventListener('scroll', updateScrollableState, { passive: true }));

  window.addEventListener('keydown', event => {
    const target = event.target;
    if (target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

    if (event.key === 'ArrowRight') showSlide(index + 1);
    if (event.key === 'ArrowLeft') showSlide(index - 1);
    if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault();
      scrollOrAdvance(1);
    }
    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      scrollOrAdvance(-1);
    }
    if (event.key === 'Home') showSlide(0);
    if (event.key === 'End') showSlide(slides.length - 1);
    if (event.key.toLowerCase() === 'n' && notesEnabled) {
      notesPanel?.classList.toggle('open');
      notesBtn?.setAttribute('aria-expanded', String(notesPanel?.classList.contains('open')));
    }
    if (event.key === 'Escape') {
      notesPanel?.classList.remove('open');
      notesBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('hashchange', () => {
    const hashIndex = Number(location.hash.slice(1)) - 1;
    if (Number.isFinite(hashIndex)) showSlide(hashIndex);
  });

  window.addEventListener('resize', updateScrollableState);

  decorateSlides();
  showSlide(index);
})();
