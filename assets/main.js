/* Gedeeld script voor alle pagina's. Normaal hoef je hier niets aan te veranderen:
   de teksten staan in assets/i18n/nl.js, en.js en ar.js. */
(function () {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const page = document.body.dataset.page;

  // ---------- Taal kiezen: ?lang=… → opgeslagen keuze → Nederlands ----------
  const LANGS = ["nl", "en", "ar"];
  const LANG_SHORT = { nl: "NL", en: "EN", ar: "ع" };
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
                  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
  const fromUrl = new URLSearchParams(location.search).get("lang");
  const lang = LANGS.includes(fromUrl) ? fromUrl : LANGS.includes(store.get("lang")) ? store.get("lang") : "nl";
  store.set("lang", lang);
  const P = window.PROFILES[lang];
  const T = P.ui;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  if (lang === "ar" && !$("#font-ar")) {
    document.head.insertAdjacentHTML("beforeend", '<link id="font-ar" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap">');
  }
  const [title, desc] = T.meta[page] || T.meta.home;
  document.title = title;
  const md = $('meta[name="description"]'); if (md) md.content = desc;

  // Interne links houden de gekozen taal vast (ook zonder opgeslagen voorkeur)
  const langHref = (href) => { const [base, hash] = href.split("#"); return (lang === "nl" ? base : `${base}?lang=${lang}`) + (hash ? "#" + hash : ""); };

  const PAGES = [
    { id: "home", href: "index.html" },
    { id: "over", href: "over-mij.html" },
    { id: "projecten", href: "projecten.html" },
    { id: "vaardigheden", href: "vaardigheden.html" },
    { id: "contact", href: "contact.html", cta: true }
  ];

  // ---------- Vaste onderdelen: menu, taalknop, cursor, voortgang, overgang, footer ----------
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="curtain" aria-hidden="true"><span>${esc(P.initials)}.</span></div>
    <div class="progress" id="progress"></div>
    <div class="cursor" id="cursor"></div><div class="cursor-dot" id="cursor-dot"></div>
    <header class="nav">
      <a href="index.html" class="logo" data-magnetic aria-label="${esc(T.nav.home)}">${esc(P.initials)}<span>.</span></a>
      <nav class="nav-links" id="nav-links">
        ${PAGES.filter((p) => p.id !== "home").map((p) =>
          `<a href="${p.href}"${p.cta ? ' class="cta"' : ""}${p.id === page ? ' aria-current="page"' : ""}>${esc(p.cta ? T.nav.cta : T.nav[p.id])}</a>`).join("")}
      </nav>
      <div class="nav-right">
        <div class="lang-switch" role="group" aria-label="${esc(T.common.language)}">
          <span class="lang-glider" aria-hidden="true"></span>
          ${LANGS.map((l) => `<button type="button" data-lang="${l}" lang="${l}" title="${esc(window.PROFILES[l].langName)}"${l === lang ? ' aria-pressed="true"' : ' aria-pressed="false"'}>${LANG_SHORT[l]}</button>`).join("")}
        </div>
        <button class="nav-toggle" aria-label="${esc(T.common.menu)}" aria-expanded="false" aria-controls="nav-links"><span></span><span></span></button>
      </div>
    </header>
    <div class="lang-wipe" aria-hidden="true"><span></span></div>`);

  document.body.insertAdjacentHTML("beforeend", `
    <footer>
      <div class="container footer-inner">
        <span>© ${new Date().getFullYear()} ${esc(P.name)} — ${esc(P.location)}</span>
        <span><a href="mailto:${esc(P.email)}">${esc(T.common.email)}</a> · <a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></span>
      </div>
    </footer>`);

  // "Volgende pagina"-link onderaan
  const next = $("#next-page");
  if (next) {
    const i = PAGES.findIndex((p) => p.id === page);
    const n = PAGES[(i + 1) % PAGES.length];
    next.innerHTML = `<a class="next-page container" href="${n.href}"><span><small>${esc(T.common.nextPage)}</small><strong>${esc(T.nav[n.id])}</strong></span><span class="arrow">→</span></a>`;
  }

  // Teksten invullen: data-field (gegevens), data-i18n (vaste tekst), data-i18n-html (met opmaak)
  const lookup = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), T);
  $$("[data-field]").forEach((el) => { el.textContent = P[el.dataset.field] ?? ""; });
  $$("[data-i18n]").forEach((el) => { el.textContent = lookup(el.dataset.i18n) ?? ""; });
  $$("[data-i18n-html]").forEach((el) => { el.innerHTML = lookup(el.dataset.i18nHtml) ?? ""; });

  // Alle interne links krijgen de taal mee
  $$('a[href$=".html"], a[href*=".html#"]').forEach((a) => { a.setAttribute("href", langHref(a.getAttribute("href"))); });

  // ---------- Menu (mobiel) ----------
  const toggle = $(".nav-toggle"), links = $("#nav-links");
  toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", links.classList.toggle("open")));

  // ---------- Taalknop: glijdend blokje + overgang met de naam van de taal ----------
  const sw = $(".lang-switch"), glider = $(".lang-glider");
  const placeGlider = (btn, animate) => {
    if (!animate) glider.style.transition = "none";
    glider.style.width = btn.offsetWidth + "px";
    glider.style.transform = `translateX(${btn.offsetLeft - 4}px)`;
    if (!animate) { glider.offsetWidth; glider.style.transition = ""; }
  };
  const current = sw.querySelector(`[data-lang="${lang}"]`);
  requestAnimationFrame(() => placeGlider(current, false));
  addEventListener("resize", () => placeGlider(sw.querySelector('[aria-pressed="true"]'), false));
  if (document.fonts) document.fonts.ready.then(() => placeGlider(sw.querySelector('[aria-pressed="true"]'), false));
  sw.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-lang]");
    if (!b || b.dataset.lang === lang) return;
    const to = b.dataset.lang;
    sw.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    placeGlider(b, true);
    store.set("lang", to);
    const url = new URL(location.href);
    to === "nl" ? url.searchParams.delete("lang") : url.searchParams.set("lang", to);
    const wipe = $(".lang-wipe"), r = b.getBoundingClientRect();
    wipe.style.setProperty("--wx", r.left + r.width / 2 + "px"); wipe.style.setProperty("--wy", r.top + r.height / 2 + "px");
    wipe.querySelector("span").textContent = window.PROFILES[to].langName;
    wipe.setAttribute("dir", to === "ar" ? "rtl" : "ltr");
    if (reduced) { location.href = url; return; }
    wipe.classList.add("go");
    setTimeout(() => { location.href = url; }, 900);
  });

  // ---------- Pagina-overgang ----------
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || reduced || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const href = a.getAttribute("href");
    if (!/\.html(\?[^#]*)?(#.*)?$/.test(href) || href.startsWith("http")) return;
    e.preventDefault();
    $(".curtain").classList.add("leaving");
    setTimeout(() => { location.href = href; }, 420);
  });
  addEventListener("pageshow", (e) => {
    if (e.persisted) { $(".curtain").classList.remove("leaving"); $(".lang-wipe").classList.remove("go"); }
  });

  // ---------- Inhoud per pagina ----------
  const photo = $("#photo");
  if (photo) {
    const initials = () => { photo.innerHTML = `<div class="initials">${esc(P.initials)}</div>`; };
    if (P.photo) {
      const img = new Image(); img.alt = `${T.common.photoAlt} ${P.name}`; img.onerror = initials; img.src = P.photo; photo.appendChild(img);
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
      <article class="p-card reveal" style="transition-delay:${(k % 3) * 90}ms" data-cats="${esc((p.cats || []).join(" "))}">
        <div class="p-inner tiltable" tabindex="0" role="button" data-index="${i}" aria-label="${esc(T.common.moreInfo)}: ${esc(p.title)}">
          <div class="glare"></div>
          <div class="p-top"><span class="p-num">${String(i + 1).padStart(2, "0")} / ${String(P.projects.length).padStart(2, "0")}</span><span class="p-icon">${p.icon}</span></div>
          <h3>${esc(p.title)}</h3><div class="p-ctx">${esc(p.context)}</div><p>${esc(p.text)}</p>
          <div class="p-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
          <div class="p-more">${esc(T.common.moreInfo)} <span class="arrow">→</span></div>
        </div>
      </article>`).join("");
  }

  // Filterknoppen op de projectenpagina
  const filters = $("#filters");
  if (filters) {
    const F = T.common.filters;
    filters.innerHTML = ["all", "data", "ai", "ux"].map((c, i) => `<button type="button" class="${i ? "" : "on"}" data-cat="${c}">${esc(F[c])}</button>`).join("");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      filters.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
      const want = b.dataset.cat;
      $$(".p-card").forEach((c) => c.classList.toggle("hide", want !== "all" && !c.dataset.cats.split(" ").includes(want)));
    });
  }

  fill("#skill-groups", P.skills.map((g) => `<div class="sg"><h3>${esc(g.group)}</h3><ul class="chips">${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join(""));
  fill("#languages", P.languages.map((l) => `<div class="lang"><b>${esc(l.name)}</b><div class="bar"><i data-w="${l.percent}"></i></div><small>${esc(l.label)}</small></div>`).join(""));

  // Contact
  const mail = $("#email-link"); if (mail) mail.href = `mailto:${P.email}`;
  const li = $("#linkedin-link"); if (li) li.href = P.linkedin;
  const copy = $("#copy-email");
  if (copy) copy.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(P.email); $("#copied").textContent = T.common.copied; }
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
    $("#modal-close").setAttribute("aria-label", T.common.close);
    const open = (i) => {
      const p = P.projects[i];
      $("#modal-num").textContent = `${p.icon}  ${T.common.project} ${String(i + 1).padStart(2, "0")}`;
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
