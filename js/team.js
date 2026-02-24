// Simple, self-contained modal (works even if js/main.js changes)
    (function () {
      const modal = document.querySelector('.team-modal');
      if (!modal) return;

      const img = modal.querySelector('.team-modal-img');
      const fallback = modal.querySelector('.team-modal-fallback');
      const nameEl = modal.querySelector('.team-modal-name');
      const bioEl = modal.querySelector('.team-modal-bio');

      const openModal = (card) => {
        const name = card.dataset.name || '';
        const bio = card.dataset.bio || '';
        const src = card.dataset.img || '';

        nameEl.textContent = name;
        bioEl.textContent = bio;

        // reset
        img.style.display = 'block';
        fallback.style.display = 'none';
        fallback.textContent = '';

        img.src = src;
        img.alt = name ? ('Portrait of ' + name) : 'Portrait';
        img.onerror = () => {
          img.style.display = 'none';
          const initials = (card.querySelector('.person-photo')?.dataset.initials) || '';
          fallback.textContent = initials;
          fallback.style.display = 'grid';
        };

        document.body.classList.add('modal-open');
        modal.hidden = false;
        modal.setAttribute('aria-hidden', 'false');

        // focus close button for accessibility
        modal.querySelector('[data-close]')?.focus();
      };

      const closeModal = () => {
        modal.hidden = true;
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        img.src = '';
      };

      document.querySelectorAll('.person-card').forEach((card) => {
        card.addEventListener('click', () => openModal(card));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(card);
          }
        });
      });

      modal.addEventListener('click', (e) => {
        if (e.target && e.target.matches('[data-close]')) closeModal();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
      });
    })();
