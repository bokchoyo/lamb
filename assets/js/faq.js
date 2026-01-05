(function () {
  const root = document.querySelector("[data-accordion]");
  if (!root) return;

  const items = root.querySelectorAll(".acc-item");
  items.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      items.forEach((b) => b.setAttribute("aria-expanded", "false"));
      btn.setAttribute("aria-expanded", String(!expanded));
    });
  });
})();
