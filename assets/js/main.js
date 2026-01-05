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

  // Works for index + .html pages under /lamb/
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  links.forEach((a) => {
    const href = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
    if ((current === "" && href === "") || href === current) a.classList.add("active");
    if (current === "" && href === "index.html") a.classList.add("active");
  });
})();
