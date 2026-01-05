(function () {
  const form = document.getElementById("regForm");
  const list = document.getElementById("studentsList");
  const addBtn = document.getElementById("addStudentBtn");
  const removeBtn = document.getElementById("removeStudentBtn");
  const status = document.getElementById("regStatus");

  if (!form || !list) return;

  function setStatus(msg, kind) {
    status.textContent = msg;
    status.classList.remove("ok", "err");
    if (kind) status.classList.add(kind);
  }

  function studentRow(i) {
    const wrap = document.createElement("div");
    wrap.className = "student-row";
    wrap.innerHTML = `
      <label>
        Student ${i + 1} name
        <input required maxlength="80" name="student_name_${i}" placeholder="First Last" />
      </label>
      <label>
        (Optional) Student email
        <input type="email" maxlength="120" name="student_email_${i}" placeholder="name@email.com" />
      </label>
    `;
    return wrap;
  }

  function studentCount() {
    return list.querySelectorAll(".student-row").length;
  }

  function ensureMin(n) {
    while (studentCount() < n) list.appendChild(studentRow(studentCount()));
  }

  function enforceBounds() {
    const n = studentCount();
    removeBtn.disabled = n <= 4;
    addBtn.disabled = n >= 6;
  }

  // Initialize with 4 students
  ensureMin(4);
  enforceBounds();

  addBtn.addEventListener("click", () => {
    if (studentCount() >= 6) return;
    list.appendChild(studentRow(studentCount()));
    enforceBounds();
  });

  removeBtn.addEventListener("click", () => {
    if (studentCount() <= 4) return;
    list.lastElementChild?.remove();
    enforceBounds();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("Submitting…");

    const fd = new FormData(form);
    const students = [];
    const n = studentCount();

    for (let i = 0; i < n; i++) {
      const name = (fd.get(`student_name_${i}`) || "").toString().trim();
      const email = (fd.get(`student_email_${i}`) || "").toString().trim();
      if (!name) {
        setStatus(`Student ${i + 1} name is required.`, "err");
        return;
      }
      students.push({ name, email: email || null });
    }

    const payload = {
      school_name: (fd.get("school_name") || "").toString().trim(),
      grade_level: (fd.get("grade_level") || "").toString().trim(),
      team_name: (fd.get("team_name") || "").toString().trim(),
      coach_name: (fd.get("coach_name") || "").toString().trim(),
      coach_email: (fd.get("coach_email") || "").toString().trim(),
      coach_phone: (fd.get("coach_phone") || "").toString().trim(),
      notes: (fd.get("notes") || "").toString().trim(),
      students
    };

    try {
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Registration failed.");

      setStatus(`Submitted! Registration ID: ${data.registration_id}`, "ok");
      form.reset();
      list.innerHTML = "";
      ensureMin(4);
      enforceBounds();
    } catch (err) {
      setStatus(err.message || "Something went wrong.", "err");
    }
  });
})();
