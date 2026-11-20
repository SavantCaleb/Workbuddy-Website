/* WorkBuddy site behaviour: nav, reveals, counters, carousels, the client map and tracking. Shared by every static page. */
(function () {
  "use strict";
  const root = document.documentElement;
  const RM = root.classList.contains("rm");
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const onView = (els, fn, opts) => {
    if (!("IntersectionObserver" in window)) { els.forEach(fn); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); fn(e.target); } }), opts || { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  };

  /* ---------- Tracking (only on the real site: see WB_LIVE in the page head) ---------- */
  let NQ = false;
  try { NQ = sessionStorage.getItem("p1_nq") === "1"; } catch (e) { /* storage off */ }
  const PIXEL = !!window.WB_LIVE && !NQ;
  function track(name, props) {
    if (!window.WB_LIVE) return;
    try { if (window.posthog && window.posthog.capture) window.posthog.capture(name, props || {}); } catch (e) { /* ignore */ }
    if (window.fbq && PIXEL) window.fbq("trackCustom", name, props || {});
  }
  if (PIXEL) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,"script","https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", "1423373965929476");
    window.fbq("track", "PageView");
  }
  $$('a[data-track^="apply_"]').forEach((a) => a.addEventListener("click", () => track("ApplyClick", { where: a.dataset.track.slice(6), page: location.pathname })));
  $$("a[data-ev]").forEach((a) => a.addEventListener("click", () => track(a.dataset.ev, { href: a.getAttribute("href"), page: location.pathname })));

  /* ---------- Nav ---------- */
  const nav = $(".nav");
  if (nav) {
    const btn = $(".nav-links [data-menu]"), menu = $(".nav-menu");
    let closeT = 0;
    const setMenu = (open) => { if (!btn || !menu) return; btn.setAttribute("aria-expanded", String(open)); menu.classList.toggle("open", open); };
    if (btn && menu) {
      btn.addEventListener("click", () => setMenu(btn.getAttribute("aria-expanded") !== "true"));
      const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (fine) {
        [btn, menu].forEach((el) => {
          el.addEventListener("mouseenter", () => { clearTimeout(closeT); setMenu(true); });
          el.addEventListener("mouseleave", () => { closeT = setTimeout(() => setMenu(false), 180); });
        });
      }
      document.addEventListener("click", (e) => { if (!btn.contains(e.target) && !menu.contains(e.target)) setMenu(false); });
    }
    const burger = $(".nav-burger");
    if (burger) burger.addEventListener("click", () => {
      const open = !root.classList.contains("nav-open");
      root.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); root.classList.remove("nav-open"); } });
  }

  /* ---------- Reveal + counters ---------- */
  const rev = $$("[data-r]");
  if (RM) rev.forEach((el) => el.classList.add("in")); else onView(rev, (el) => el.classList.add("in"));
  const fmt = (n, d) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  onView($$("[data-count]"), (el) => {
    const to = parseFloat(el.dataset.count), d = (el.dataset.count.split(".")[1] || "").length;
    const pre = el.dataset.pre || "", suf = el.dataset.suf || "";
    if (RM) { el.textContent = pre + fmt(to, d) + suf; return; }
    const from = parseFloat(el.dataset.from || "0"), t0 = performance.now(), dur = 1400;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(from + (to - from) * e, d) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { rootMargin: "0px 0px -15% 0px" });

  /* ---------- Statement: each word lights as the paragraph scrolls through the middle ---------- */
  $$("[data-say]").forEach((p) => {
    const acc = (p.dataset.say || "").split("|").filter(Boolean);
    const words = p.textContent.trim().split(/\s+/);
    p.textContent = "";
    const spans = words.map((w, i) => {
      const s = document.createElement("span");
      s.className = "w" + (acc.some((a) => w.replace(/[^\w']/g, "").toLowerCase() === a.toLowerCase()) ? " ac" : "");
      s.textContent = w;
      p.append(s, i < words.length - 1 ? " " : "");
      return s;
    });
    if (RM) { spans.forEach((s) => s.classList.add("on")); return; }
    const tick = () => {
      const r = p.getBoundingClientRect(), vh = innerHeight;
      const prog = Math.max(0, Math.min(1, (vh * 0.78 - r.top) / (r.height + vh * 0.36)));
      const n = Math.round(prog * spans.length);
      spans.forEach((s, i) => s.classList.toggle("on", i < n));
    };
    addEventListener("scroll", tick, { passive: true });
    addEventListener("resize", tick);
    tick();
  });

  /* ---------- Services list ↔ card ---------- */
  $$("[data-svc]").forEach((wrap) => {
    const items = $$(".svc-item", wrap), cards = $$(".svc-card", wrap);
    const show = (i) => {
      items.forEach((it, j) => { it.classList.toggle("on", i === j); $(".svc-btn", it).setAttribute("aria-expanded", String(i === j)); });
      cards.forEach((c, j) => c.classList.toggle("on", i === j));
    };
    items.forEach((it, i) => $(".svc-btn", it).addEventListener("click", () => show(i)));
    show(0);
  });

  /* ---------- Tabs (industries) ---------- */
  $$("[data-tabs]").forEach((wrap) => {
    const tabs = $$("[role=tab]", wrap), panels = $$("[role=tabpanel]", wrap);
    const show = (i) => {
      tabs.forEach((t, j) => { t.classList.toggle("on", i === j); t.setAttribute("aria-selected", String(i === j)); t.tabIndex = i === j ? 0 : -1; });
      panels.forEach((p, j) => { p.classList.toggle("on", i === j); p.hidden = i !== j; });
      const cv = panels[i] && $("canvas[data-art]", panels[i]);
      if (cv && cv._draw) cv._draw();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => show(i));
      t.addEventListener("keydown", (e) => {
        const k = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
        if (k) { e.preventDefault(); const n = (i + k + tabs.length) % tabs.length; show(n); tabs[n].focus(); }
      });
    });
    show(0);
  });

  /* ---------- Story carousel ---------- */
  $$("[data-carousel]").forEach((wrap) => {
    const track = $(".stories-track", wrap), slides = $$(".story", wrap), dotsEl = $(".d", wrap);
    if (!track || !slides.length) return;
    let cur = 0, auto = !RM, timer = 0;
    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.setAttribute("aria-label", "Story " + (i + 1));
      b.addEventListener("click", () => { stop(); go(i); });
      dotsEl && dotsEl.append(b);
      return b;
    });
    const mark = (i) => { cur = i; slides.forEach((s, j) => s.classList.toggle("on", i === j)); dots.forEach((d, j) => d.classList.toggle("on", i === j)); };
    const go = (i) => { const s = slides[(i + slides.length) % slides.length]; track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.clientWidth) / 2, behavior: RM ? "auto" : "smooth" }); };
    const stop = () => { auto = false; clearInterval(timer); };
    let raf = 0;
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = track.scrollLeft + track.clientWidth / 2;
        let best = 0, bd = Infinity;
        slides.forEach((s, j) => { const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - mid); if (d < bd) { bd = d; best = j; } });
        mark(best);
      });
    }, { passive: true });
    ["pointerdown", "wheel", "touchstart"].forEach((ev) => track.addEventListener(ev, stop, { passive: true }));
    $$("[data-prev],[data-next]", wrap).forEach((b) => b.addEventListener("click", () => { stop(); go(cur + (b.hasAttribute("data-next") ? 1 : -1)); }));
    mark(0);
    onView([wrap], () => { if (auto) timer = setInterval(() => { if (auto) go(cur + 1); }, 6500); });
  });

  /* ---------- Wall rows loop: duplicate the tiles so the slide never shows a gap ---------- */
  $$(".wall-row").forEach((row) => { row.append(...Array.from(row.children).map((n) => { const c = n.cloneNode(true); c.setAttribute("aria-hidden", "true"); return c; })); });

  /* ---------- Console feed: rows land one by one ---------- */
  $$("[data-feed]").forEach((feed) => {
    const rows = $$(".feed-row", feed);
    onView([feed], () => rows.forEach((r, i) => setTimeout(() => r.classList.add("in"), RM ? 0 : 260 * i)), { rootMargin: "0px 0px -20% 0px" });
  });

  /* ---------- Board chart: draw the line in ---------- */
  $$("[data-draw]").forEach((path) => {
    if (RM || !path.getTotalLength) return;
    const L = path.getTotalLength();
    path.style.strokeDasharray = L; path.style.strokeDashoffset = L;
    onView([path], () => { path.style.transition = "stroke-dashoffset 2.2s cubic-bezier(0.16,1,0.3,1)"; path.style.strokeDashoffset = 0; });
  });

  /* ---------- Filters on index pages ---------- */
  $$("[data-filters]").forEach((bar) => {
    const target = $(bar.dataset.filters);
    const btns = $$("button", bar);
    btns.forEach((b) => b.addEventListener("click", () => {
      btns.forEach((x) => x.classList.toggle("on", x === b));
      const f = b.dataset.f;
      $$("[data-cat]", target).forEach((el) => { el.hidden = f !== "all" && el.dataset.cat.split(" ").indexOf(f) === -1; });
    }));
  });

  /* ---------- Mobile dock ---------- */
  const dock = $(".dock"), hero = $(".hero, .ph");
  if (dock && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => dock.classList.toggle("show", !e.isIntersecting), { rootMargin: "-40% 0px 0px 0px" }).observe(hero);
  }

  /* ---------- Client map: every business we've worked with, as dots on the US ---------- */
  const maps = $$("canvas[data-map]");
  if (maps.length && window.fetch) {
    fetch("/site/map.json").then((r) => r.json()).then((M) => {
      const raw = atob(M.land), land = [];
      for (let r = 0; r < M.rows; r++) for (let c = 0; c < M.cols; c++) {
        const i = r * M.cols + c;
        if (raw.charCodeAt(i >> 3) & (1 << (i & 7))) land.push(c * M.step + M.step / 2, r * M.step + M.step / 2);
      }
      maps.forEach((cv) => setupMap(cv, M, land));
    }).catch(() => {});
  }
  function setupMap(cv, M, land) {
    const mode = cv.dataset.map; // "lit" (homepage band), "foot" (footer), "art" (industry card: one region lit)
    const ctx = cv.getContext("2d");
    let k = 1, dpr = 1, t0 = null;
    const order = M.pts.map((_, i) => i);
    let seed = 7;
    for (let i = order.length - 1; i > 0; i--) { seed = (seed * 16807) % 2147483647; const j = seed % (i + 1); [order[i], order[j]] = [order[j], order[i]]; }
    const appear = []; order.forEach((idx, rank) => { appear[idx] = 500 + 2600 * Math.pow(rank / Math.max(1, order.length - 1), 0.7); });
    const landCol = mode === "foot" ? "rgba(214,226,233,0.10)" : "rgba(214,226,233,0.16)";
    const draw = (now) => {
      const w = cv.clientWidth; if (!w) return;
      dpr = Math.min(2, devicePixelRatio || 1); k = w / M.w;
      const pw = Math.round(w * dpr), ph = Math.round((w * M.h / M.w) * dpr);
      if (cv.width !== pw || cv.height !== ph) { cv.width = pw; cv.height = ph; }
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, pw, ph);
      ctx.setTransform(dpr * k, 0, 0, dpr * k, 0, 0);
      const r = Math.max(1.2, 0.7 / k);
      ctx.fillStyle = landCol; ctx.beginPath();
      for (let i = 0; i < land.length; i += 2) { ctx.moveTo(land[i] + r, land[i + 1]); ctx.arc(land[i], land[i + 1], r, 0, 6.2832); }
      ctx.fill();
      const t = RM || mode === "foot" ? 1e9 : t0 === null ? -1 : now - t0;
      const base = Math.max(mode === "foot" ? 1.8 : 2.4, 1.7 / k);
      for (let i = 0; i < M.pts.length; i++) {
        const p = M.pts[i], age = t - appear[i];
        if (age < 0) continue;
        if (age < 1100) {
          const e = age / 1100;
          ctx.beginPath(); ctx.arc(p[0], p[1], base + 14 * (1 - Math.pow(1 - e, 3)), 0, 6.2832);
          ctx.strokeStyle = "rgba(104,183,206," + (0.5 * (1 - e)).toFixed(3) + ")"; ctx.lineWidth = Math.max(0.8, 0.9 / k); ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(p[0], p[1], base, 0, 6.2832);
        ctx.fillStyle = age < 700 ? "rgba(220,171,88,0.95)" : mode === "foot" ? "rgba(104,183,206,0.55)" : "rgba(140,205,224,0.95)";
        ctx.fill();
      }
      if (t < 4000) requestAnimationFrame(draw);
    };
    cv._draw = () => draw(performance.now());
    addEventListener("resize", () => draw(1e9));
    if (mode === "foot" || RM) { draw(1e9); return; }
    draw(-1);
    onView([cv], () => { t0 = performance.now(); requestAnimationFrame(draw); }, { rootMargin: "0px 0px -20% 0px" });
  }
})();
