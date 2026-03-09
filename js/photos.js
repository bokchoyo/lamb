document.addEventListener('DOMContentLoaded', () => {
  const photoButtons = document.querySelectorAll('.photo[data-photo-src]');
  const photoModal = document.getElementById('photoModal');
  const photoModalImg = document.getElementById('photoModalImg');
  const photoModalCaption = document.getElementById('photoModalCaption');
  const photoModalClosers = document.querySelectorAll('[data-close-photo-modal]');

  function closePhotoModal() {
    photoModal.hidden = true;
    photoModalImg.src = '';
    document.body.style.overflow = '';
  }

  photoButtons.forEach(button => {
    button.addEventListener('click', () => {
      const src = button.dataset.photoSrc;
      const caption = button.dataset.photoCaption || '';
      const img = button.querySelector('img');

      photoModalImg.src = src;
      photoModalImg.alt = img ? img.alt : caption;
      photoModalCaption.textContent = caption;
      photoModal.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  photoModalClosers.forEach(el => {
    el.addEventListener('click', closePhotoModal);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && photoModal && !photoModal.hidden) {
      closePhotoModal();
    }
  });
});