(function () {
  const root = document.querySelector("[data-countdown]");
  if (!root) return;

  const dateIso = root.getAttribute("data-event-date");
  const target = new Date(dateIso);

  const dd = root.querySelector("[data-dd]");
  const hh = root.querySelector("[data-hh]");
  const mm = root.querySelector("[data-mm]");
  const ss = root.querySelector("[data-ss]");
  const label = root.querySelector("[data-date-label]");

  if (label && !Number.isNaN(target.getTime())) label.textContent = target.toLocaleString();

  function tick() {
    const now = new Date();
    let diff = Math.max(0, target.getTime() - now.getTime());

    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    dd.textContent = String(days);
    hh.textContent = String(hours).padStart(2, "0");
    mm.textContent = String(mins).padStart(2, "0");
    ss.textContent = String(secs).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
})();
