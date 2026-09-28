/* Gedeeld script voor alle pagina's. Normaal hoef je hier niets aan te veranderen:
   de teksten staan in assets/data.js. */
(function () {
  const P = window.PROFILE;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const page = document.body.dataset.page;

  const PAGES = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "over", href: "over-mij.html", label: "Over mij" },
    { id: "projecten", href: "projecten.html", label: "Projecten" },
    { id: "vaardigheden", href: "vaardigheden.html", label: "Vaardigheden" },
    { id: "contact", href: "contact.html", label: "Contact", cta: true }
  ];

  // ---------- Vaste onderdelen: menu, cursor, voortgang, overgang, footer ----------
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="curtain" aria-hidden="true"><span>OM.</span></div>
    <div class="progress" id="progress"></div>
    <div class="cursor" id="cursor"></div><div class="cursor-dot" id="cursor-dot"></div>
    <header class="nav">
      <a href="index.html" class="logo" data-magnetic aria-label="Home">OM<span>.</span></a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span></button>
      <nav class="nav-links" id="nav-links">
        ${PAGES.filter((p) => p.id !== "home").map((p) =>
          `<a href="${p.href}"${p.cta ? ' class="cta"' : ""}${p.id === page ? ' aria-current="page"' : ""}>${p.cta ? "Neem contact op" : p.label}</a>`).join("")}
      </nav>
    </header>`);

  document.body.insertAdjacentHTML("beforeend", `
    <footer>
      <div class="container footer-inner">
        <span>© ${new Date().getFullYear()} ${esc(P.name)} — ${esc(P.location)}</span>
        <span><a href="mailto:${esc(P.email)}">E-mail</a> · <a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></span>
      </div>
    </footer>`);

  // "Volgende pagina"-link onderaan
  const next = $("#next-page");
  if (next) {
    const i = PAGES.findIndex((p) => p.id === page);
    const n = PAGES[(i + 1) % PAGES.length];
    next.innerHTML = `<a class="next-page container" href="${n.href}"><span><small>Volgende pagina</small><strong>${n.label}</strong></span><span class="arrow">→</span></a>`;
  }

  // Losse tekstvelden
  $$("[data-field]").forEach((el) => { el.textContent = P[el.dataset.field] ?? ""; });

  // ---------- Menu (mobiel) ----------
  const toggle = $(".nav-toggle"), links = $("#nav-links");
  toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", links.classList.toggle("open")));

  // ---------- Pagina-overgang ----------
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || reduced || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const href = a.getAttribute("href");
    if (!/\.html(#.*)?$/.test(href) || href.startsWith("http")) return;
    e.preventDefault();
    $(".curtain").classList.add("leaving");
    setTimeout(() => { location.href = href; }, 420);
  });
  addEventListener("pageshow", (e) => { if (e.persisted) $(".curtain").classList.remove("leaving"); });

  // ---------- Inhoud per pagina ----------
  const photo = $("#photo");
  if (photo) {
    const initials = () => { photo.innerHTML = `<div class="initials">${esc(P.firstName[0] + P.lastName[0])}</div>`; };
    if (P.photo) {
      const img = new Image(); img.alt = `Portretfoto van ${P.name}`; img.onerror = initials; img.src = P.photo; photo.appendChild(img);
    } else initials();
  }

  const fill = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
  fill("#about-text", P.about.map((p) => `<p>${p}</p>`).join(""));
  fill("#stats", P.stats.map((s) => `<div class="stat"><div class="n"><span data-count="${s.n}">0</span><sup>${esc(s.suffix)}</sup></div><div class="t">${esc(s.label)}</div></div>`).join(""));
  fill("#interests", P.interests.map((i) => `<li>${esc(i)}</li>`).join(""));

  const allSkills = P.skills.flatMap((g) => g.items);
  fill("#marquee", [...allSkills, ...allSkills].map((s) => `<span>${esc(s)}</span>`).join(""));

  const tl = $("#timeline");
  if (tl) tl.insertAdjacentHTML("beforeend", P.experience.map((e) => `
    <li class="t-item reveal">
      <div class="t-when">${esc(e.period)}</div><span class="t-dot"></span>
      <div class="t-card"><h3>${esc(e.role)}</h3><div class="org">${esc(e.org)}</div><p>${esc(e.text)}</p></div>
    </li>`).join(""));

  const row = (e) => `<div class="edu-row reveal"><span class="when">${esc(e.period)}</span><div><h3>${esc(e.title)}</h3><div class="org">${esc(e.org)}</div></div><span class="tag">${esc(e.tag)}</span></div>`;
  fill("#education", P.education.map(row).join(""));
  fill("#certificates", P.certificates.map(row).join(""));

  // Projectkaarten (op de homepage alleen 'featured')
  const projWrap = $("#projects");
  if (projWrap) {
    const onlyFeatured = projWrap.dataset.featured !== undefined;
    projWrap.innerHTML = P.projects.map((p, i) => ({ p, i })).filter(({ p }) => !onlyFeatured || p.featured).map(({ p, i }, k) => `
      <article class="p-card reveal" style="transition-delay:${(k % 3) * 90}ms" data-tags="${esc(p.tags.join("|"))}">
        <div class="p-inner tiltable" tabindex="0" role="button" data-index="${i}" aria-label="Meer over ${esc(p.title)}">
          <div class="glare"></div>
          <div class="p-top"><span class="p-num">${String(i + 1).padStart(2, "0")} / ${String(P.projects.length).padStart(2, "0")}</span><span class="p-icon">${p.icon}</span></div>
          <h3>${esc(p.title)}</h3><div class="p-ctx">${esc(p.context)}</div><p>${esc(p.text)}</p>
          <div class="p-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
          <div class="p-more">Meer info →</div>
        </div>
      </article>`).join("");
  }

  // Filterknoppen op de projectenpagina
  const filters = $("#filters");
  if (filters) {
    const cats = { "Alles": null, "Data & BI": ["Power BI", "Python", "Data Warehousing", "Excel"], "AI": ["AI", "Agentic AI", "Generative AI"], "UX & organisatie": ["UX-strategie", "UX", "Onboarding", "Projectmanagement", "Organisatie", "Procesverbetering"] };
    filters.innerHTML = Object.keys(cats).map((c, i) => `<button type="button" class="${i ? "" : "on"}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      filters.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
      const want = cats[b.dataset.cat];
      $$(".p-card").forEach((c) => {
        const tags = c.dataset.tags.split("|");
        c.classList.toggle("hide", !!want && !tags.some((t) => want.includes(t)));
      });
    });
  }

  fill("#skill-groups", P.skills.map((g) => `<div class="sg"><h3>${esc(g.group)}</h3><ul class="chips">${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join(""));
  fill("#languages", P.languages.map((l) => `<div class="lang"><b>${esc(l.name)}</b><div class="bar"><i data-w="${l.percent}"></i></div><small>${esc(l.label)}</small></div>`).join(""));

  // Contact
  const mail = $("#email-link"); if (mail) mail.href = `mailto:${P.email}`;
  const li = $("#linkedin-link"); if (li) li.href = P.linkedin;
  const copy = $("#copy-email");
  if (copy) copy.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(P.email); $("#copied").textContent = "✓ E-mailadres gekopieerd"; }
    catch { $("#copied").textContent = P.email; }
  });

  // ---------- Getypte titel (home) ----------
  const typed = $("#typed");
  if (typed) {
    const words = P.typedWords;
    if (reduced) typed.textContent = words[0];
    else {
      let w = 0, c = 0, del = false;
      (function tick() {
        const word = words[w];
        typed.textContent = word.slice(0, c);
        if (!del && c === word.length) { del = true; return setTimeout(tick, 1800); }
        if (del && c === 0) { del = false; w = (w + 1) % words.length; }
        c += del ? -1 : 1;
        setTimeout(tick, del ? 35 : 75);
      })();
    }
  }

  // ---------- Verschijnen bij scrollen, tellers, taalbalken ----------
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in"); io.unobserve(en.target);
    en.target.querySelectorAll("[data-count]").forEach((n) => {
      const end = +n.dataset.count, t0 = performance.now();
      (function step(t) { const k = Math.min((t - t0) / 1400, 1); n.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(t0);
    });
    en.target.querySelectorAll("[data-w]").forEach((b) => { b.style.width = b.dataset.w + "%"; });
  }), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  // ---------- Scroll: voortgangsbalk + tijdlijn ----------
  const tFill = $("#timeline-fill");
  function onScroll() {
    const h = document.documentElement;
    $("#progress").style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
    if (tFill) {
      const r = tl.getBoundingClientRect();
      tFill.style.transform = `scaleY(${Math.min(Math.max((innerHeight * 0.6 - r.top) / r.height, 0), 1)})`;
    }
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // ---------- Cursor, magnetische knoppen, 3D-kantelen ----------
  if (finePointer && !reduced) {
    const cur = $("#cursor"), dot = $("#cursor-dot");
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px)`; });
    (function loop() { cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18; cur.style.transform = `translate(${cx}px, ${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", (e) => cur.classList.toggle("hover", !!e.target.closest("a, button, .tiltable")));

    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });

    const tilt = (el, max) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.transform = `rotateY(${(x - .5) * max}deg) rotateX(${(.5 - y) * max}deg)`;
        el.style.setProperty("--gx", x * 100 + "%"); el.style.setProperty("--gy", y * 100 + "%");
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    };
    $$(".tiltable").forEach((el) => tilt(el, 16));
    if ($("#portrait")) tilt($("#portrait"), 12);
  }

  // ---------- Projectdetails (modal) ----------
  const modal = $("#modal");
  if (modal) {
    const open = (i) => {
      const p = P.projects[i];
      $("#modal-num").textContent = `${p.icon}  PROJECT ${String(i + 1).padStart(2, "0")}`;
      $("#modal-title").textContent = p.title; $("#modal-ctx").textContent = p.context; $("#modal-text").textContent = p.text;
      $("#modal-tags").innerHTML = p.tags.map((t) => `<span>${esc(t)}</span>`).join("");
      modal.classList.add("open"); $("#modal-close").focus();
    };
    const close = () => modal.classList.remove("open");
    $$(".p-inner").forEach((el) => {
      el.addEventListener("click", () => open(+el.dataset.index));
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(+el.dataset.index); } });
    });
    $("#modal-close").addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  // ---------- 3D-bol met vaardigheden ----------
  const wrap = $("#sphere");
  if (wrap) {
    const words = [...new Set([...allSkills, ...P.interests.slice(0, 6)])];
    const tags = words.map((w, i) => {
      const el = document.createElement("span"); el.className = "sphere-tag"; el.textContent = w; wrap.appendChild(el);
      const phi = Math.acos(-1 + (2 * i + 1) / words.length), theta = Math.sqrt(words.length * Math.PI) * phi;
      return { el, x: Math.cos(theta) * Math.sin(phi), y: Math.sin(theta) * Math.sin(phi), z: Math.cos(phi) };
    });
    let ax = 0.002, ay = 0.004, dragging = false, lx = 0, ly = 0, visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(wrap);
    const down = (x, y) => { dragging = true; lx = x; ly = y; };
    const move = (x, y) => { if (!dragging) return; ay = (x - lx) * 0.006; ax = -(y - ly) * 0.006; lx = x; ly = y; };
    wrap.addEventListener("mousedown", (e) => down(e.clientX, e.clientY));
    addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
    addEventListener("mouseup", () => { dragging = false; });
    wrap.addEventListener("touchstart", (e) => down(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    wrap.addEventListener("touchmove", (e) => move(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    wrap.addEventListener("touchend", () => { dragging = false; });
    const speed = reduced ? 0 : 1;
    (function frame() {
      requestAnimationFrame(frame);
      if (!visible) return;
      if (!dragging) { ax += (0.002 * speed - ax) * 0.02; ay += (0.004 * speed - ay) * 0.02; }
      const R = wrap.clientWidth * 0.38, cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
      tags.forEach((t) => {
        const y1 = t.y * cx - t.z * sx, z1 = t.y * sx + t.z * cx;
        const x2 = t.x * cy + z1 * sy, z2 = -t.x * sy + z1 * cy;
        t.x = x2; t.y = y1; t.z = z2;
        t.el.style.transform = `translate(-50%, -50%) translate3d(${x2 * R}px, ${y1 * R}px, 0) scale(${(z2 + 2) / 3})`;
        t.el.style.opacity = 0.25 + (z2 + 1) * 0.375;
        t.el.style.zIndex = Math.round(z2 * 100) + 100;
        t.el.style.color = z2 > 0.3 ? "var(--mint)" : "var(--text)";
      });
    })();
  }
})();
