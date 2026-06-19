const slides = [...document.querySelectorAll('.slide')];
    const progress = document.getElementById('progress');
    const notesPanel = document.getElementById('notesPanel');
    const notesContent = document.getElementById('notesContent');
    const notesBtn = document.getElementById('notesBtn');
    const closeNotes = document.getElementById('closeNotes');
    let index = Math.max(0, Math.min(slides.length - 1, Number(location.hash.replace('#', '')) - 1 || 0));

    function decorateSlides() {
      slides.forEach((slide, i) => {
        if (!slide.querySelector('.number-rail')) {
          const rail = document.createElement('div');
          rail.className = 'number-rail';
          rail.innerHTML = `<div class="line"></div><div class="num">${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}</div>`;
          slide.appendChild(rail);
        }
        if (!slide.querySelector('.dots')) {
          const dots = document.createElement('div');
          dots.className = 'dots';
          dots.innerHTML = '<i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>';
          slide.appendChild(dots);
        }
      });
    }

    function showSlide(nextIndex) {
      index = Math.max(0, Math.min(slides.length - 1, nextIndex));
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      progress.style.width = `${((index + 1) / slides.length) * 100}%`;
      location.hash = String(index + 1);
      updateNotes();
    }

    function updateNotes() {
      const notes = slides[index].querySelector('.notes');
      notesContent.innerHTML = notes ? notes.innerHTML : '<p>Sem notas para este slide.</p>';
    }

    document.getElementById('prevBtn').addEventListener('click', () => showSlide(index - 1));
    document.getElementById('nextBtn').addEventListener('click', () => showSlide(index + 1));
    notesBtn.addEventListener('click', () => {
      notesPanel.classList.toggle('open');
      updateNotes();
    });
    closeNotes.addEventListener('click', () => notesPanel.classList.remove('open'));

    window.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') showSlide(index + 1);
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') showSlide(index - 1);
      if (event.key.toLowerCase() === 'n') notesPanel.classList.toggle('open');
      if (event.key === 'Escape') notesPanel.classList.remove('open');
    });

    window.addEventListener('hashchange', () => {
      const hashIndex = Number(location.hash.replace('#', '')) - 1;
      if (!Number.isNaN(hashIndex)) showSlide(hashIndex);
    });

    decorateSlides();
    showSlide(index);