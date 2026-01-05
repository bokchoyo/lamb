(function () {
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelectorAll("[data-navlink]");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open");
    });
  }

  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  links.forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });
})();
