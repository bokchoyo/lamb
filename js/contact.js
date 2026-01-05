(function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  if (!form) return;

  function setStatus(msg, kind) {
    status.textContent = msg;
    status.classList.remove("ok", "err");
    if (kind) status.classList.add(kind);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("Sending…");

    const fd = new FormData(form);
    const payload = {
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      subject: (fd.get("subject") || "").toString().trim(),
      message: (fd.get("message") || "").toString().trim()
    };

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Failed to send.");

      setStatus("Sent! We’ll get back to you by email.", "ok");
      form.reset();
    } catch (err) {
      setStatus(err.message || "Something went wrong.", "err");
    }
  });
})();
