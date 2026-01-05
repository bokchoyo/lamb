(function () {
  const yearSelect = document.getElementById("yearSelect");
  const status = document.getElementById("resultsStatus");
  const title = document.getElementById("resultsTitle");
  const stats = document.getElementById("resultsStats");
  const indiv = document.getElementById("indivBlocks");
  const team = document.getElementById("teamBlocks");
  const extras = document.getElementById("extrasBlocks");

  if (!yearSelect) return;

  // Derive base path like "/lamb" from current location
  const parts = location.pathname.split("/").filter(Boolean);
  const base = parts.length ? "/" + parts[0] : "";

  function setStatus(msg, kind) {
    status.textContent = msg || "";
    status.classList.remove("ok", "err");
    if (kind) status.classList.add(kind);
  }

  function renderPodium(block, label, rows) {
    const wrap = document.createElement("div");
    wrap.className = "podium";
    wrap.innerHTML = `<div class="podium-title">${label}</div>`;

    if (!rows || rows.length === 0) {
      const p = document.createElement("div");
      p.className = "muted tiny";
      p.textContent = "No data posted yet.";
      wrap.appendChild(p);
      block.appendChild(wrap);
      return;
    }

    const ol = document.createElement("ol");
    ol.className = "podium-list";
    rows.forEach((r) => {
      const li = document.createElement("li");
      li.textContent = `${r.place} — ${r.name} (${r.school})`;
      ol.appendChild(li);
    });
    wrap.appendChild(ol);
    block.appendChild(wrap);
  }

  function renderTeamRanks(block, label, rows) {
    const wrap = document.createElement("div");
    wrap.className = "podium";
    wrap.innerHTML = `<div class="podium-title">${label}</div>`;

    if (!rows || rows.length === 0) {
      const p = document.createElement("div");
      p.className = "muted tiny";
      p.textContent = "No data posted yet.";
      wrap.appendChild(p);
      block.appendChild(wrap);
      return;
    }

    rows.forEach((r) => {
      const div = document.createElement("div");
      div.className = "rank-row";
      const members = (r.members || []).join(", ");
      div.innerHTML = `
        <div class="rank-head">${r.place} — ${r.team}</div>
        <div class="muted tiny">${members}</div>
      `;
      wrap.appendChild(div);
    });

    block.appendChild(wrap);
  }

  async function loadYear(year) {
    setStatus("Loading…");
    title.textContent = "Loading…";
    stats.textContent = "";
    indiv.innerHTML = "";
    team.innerHTML = "";
    extras.innerHTML = "";

    try {
      const resp = await fetch(`${base}/data/results_${encodeURIComponent(year)}.json`, { cache: "no-store" });
      if (!resp.ok) throw new Error("Results file not found.");
      const data = await resp.json();

      title.textContent = data.title || `Results ${year}`;
      const s = data.stats || {};
      if (s.participants != null) stats.textContent = `${s.participants} participants · ${s.schools} schools · ${s.teams} teams`;

      const indivData = data.individual || {};
      ["6", "7", "8"].forEach((g) => renderPodium(indiv, `${g}th Grade`, indivData[g]));

      const teamData = data.team || {};
      ["6", "7", "8"].forEach((g) => renderTeamRanks(team, `${g}th Grade`, teamData[g]));

      (data.extras || []).forEach((x) => {
        const c = document.createElement("div");
        c.className = "note";
        c.innerHTML = `<div class="note-title">${x.label}</div><div class="muted">${x.text}</div>`;
        extras.appendChild(c);
      });

      if ((data.extras || []).length === 0) {
        const p = document.createElement("div");
        p.className = "muted tiny";
        p.textContent = "No extras posted yet.";
        extras.appendChild(p);
      }

      setStatus("");
    } catch (err) {
      setStatus(err.message || "Error loading results.", "err");
      title.textContent = "Could not load results.";
    }
  }

  yearSelect.addEventListener("change", () => loadYear(yearSelect.value));
  loadYear(yearSelect.value);
})();
