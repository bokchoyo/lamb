document.addEventListener("DOMContentLoaded", () => {
  const photos = document.querySelectorAll(".photo");
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("photoModalImg");
  const modalCaption = document.getElementById("photoModalCaption");
  const modalCard = modal ? modal.querySelector(".photo-modal-card") : null;
  const closeButtons = document.querySelectorAll("[data-photo-close]");

  if (!photos.length || !modal || !modalImg || !modalCaption || !modalCard) return;

  let lastFocusedPhoto = null;

  function openModal(img, triggerEl) {
    const caption = img.alt || "";

    modalImg.src = img.src;
    modalImg.alt = caption;
    modalCaption.textContent = caption;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("photo-modal-open");

    lastFocusedPhoto = triggerEl;
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    modalImg.alt = "";
    modalCaption.textContent = "";
    document.body.classList.remove("photo-modal-open");

    if (lastFocusedPhoto) {
      lastFocusedPhoto.focus();
    }
  }

  photos.forEach((photo) => {
    const img = photo.querySelector("img");
    if (!img) return;

    const caption = img.alt || "Open photo";

    photo.setAttribute("tabindex", "0");
    photo.setAttribute("role", "button");
    photo.setAttribute("aria-label", `Open photo: ${caption}`);

    photo.addEventListener("click", () => openModal(img, photo));

    photo.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(img, photo);
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (e) => {
    if (!modalCard.contains(e.target)) {
      closeModal();
    }
  });

  modalCard.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
});