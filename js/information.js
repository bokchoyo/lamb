// information.js — modal behavior for information.html schedule poster
(function () {
  const modal = document.querySelector(".poster-modal");
  const openBtn = document.querySelector("[data-poster-open]");

  if (!modal || !openBtn) return;

  const closeBtn = modal.querySelector(".poster-modal-close");
  const closeTargets = modal.querySelectorAll("[data-poster-close]");

  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");

  const openModal = () => {
    document.body.classList.add("modal-open");
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    closeBtn?.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    openBtn.focus();
  };

  openBtn.addEventListener("click", openModal);

  closeTargets.forEach((target) => {
    target.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (e) => {
    if (!modal.querySelector(".poster-modal-card")?.contains(e.target)) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
})();
