// team.js — modal behavior for team.html
(function () {
  const modal = document.querySelector(".team-modal");
  if (!modal) return;

  // Always start hidden (prevents accidental on-load open)
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  const img = modal.querySelector(".team-modal-img");
  const fallback = modal.querySelector(".team-modal-fallback");
  const nameEl = modal.querySelector(".team-modal-name");
  const bioEl = modal.querySelector(".team-modal-bio");
  const closeBtn = modal.querySelector("[data-close]");
  const backdrop = modal.querySelector(".team-modal-backdrop");
  const closeBtn = modal.querySelector(".team-modal-close");
  const closeTargets = modal.querySelectorAll("[data-close]");

  if (!img || !fallback || !nameEl || !bioEl) return;

  const openModal = (card) => {
    if (!card || !card.dataset) return;

    const name = card.dataset.name || "";
    const bio = card.dataset.bio || "";
    const src = card.dataset.img || "";

    // Populate text
    nameEl.textContent = name;
    bioEl.textContent = bio;

    // Reset media state
    img.onerror = null;
    img.style.display = "block";
    fallback.style.display = "none";
    fallback.textContent = "";

    // Set image (or fallback to initials)
    img.src = src;
    img.alt = name ? "Portrait of " + name : "Portrait";
    img.onerror = () => {
      img.style.display = "none";
@@ -51,48 +51,51 @@

    // Accessibility
    closeBtn?.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    img.onerror = null;
    img.src = "";
  };

  // Click + keyboard open
  document.querySelectorAll(".person-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  // Close handlers
  closeBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);
  closeTargets.forEach((target) => {
    target.addEventListener("click", closeModal);
  });

  // Also close if user clicks outside the card (extra safety)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
    if (!modal.querySelector(".team-modal-card")?.contains(e.target)) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // Safety: if something else unhides modal without content, re-hide it
  // (prevents blank modal stuck open)
  const observer = new MutationObserver(() => {
    if (!modal.hidden) {
      const hasName = (nameEl.textContent || "").trim().length > 0;
      const hasBio = (bioEl.textContent || "").trim().length > 0;
      if (!hasName && !hasBio) closeModal();
    }
  });
  observer.observe(modal, { attributes: true, attributeFilter: ["hidden"] });
})();
})();