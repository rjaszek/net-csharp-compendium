/* ==========================================================================
   .NET / C# Kompendium — logika strony statycznej (wiele plików HTML)
   Każda strona ma już wgraną własną treść; ten skrypt tylko:
   - filtruje listę tematów w menu (wyszukiwarka)
   - obsługuje szufladę menu na mobile
   - podświetla składnię kodu
   - dodaje przyciski "Kopiuj" do bloków kodu
   - obsługuje przełącznik trybu ciemny/jasny i pełnej szerokości
   ========================================================================== */

(function () {
  "use strict";

  const navList = document.getElementById("navList");
  const contentEl = document.getElementById("content");
  const searchInput = document.getElementById("searchInput");
  const searchCount = document.getElementById("searchCount");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const burgerBtn = document.getElementById("burgerBtn");
  const mainArea = document.getElementById("mainArea");
  const widthToggle = document.getElementById("widthToggle");
  const themeToggle = document.getElementById("themeToggle");

  const allNavItems = Array.from(document.querySelectorAll(".nav-item"));
  const allNavGroups = Array.from(document.querySelectorAll(".nav-group"));
  const totalTopicsCount = allNavItems.length;

  /* ---------------- search (filtruje już wgraną listę w menu) ---------------- */
  function applySearch(query) {
    const q = query.trim().toLowerCase();
    let visibleCount = 0;

    allNavGroups.forEach(group => {
      let anyVisibleInGroup = false;
      group.querySelectorAll(".nav-item").forEach(el => {
        const haystack = (el.textContent + " " + (el.dataset.tags || "")).toLowerCase();
        const match = q === "" || haystack.includes(q);
        el.classList.toggle("hidden", !match);
        if (match) { anyVisibleInGroup = true; visibleCount++; }
      });
      group.classList.toggle("hidden", !anyVisibleInGroup);
      if (q !== "" && anyVisibleInGroup) group.open = true;
    });

    searchCount.textContent = q === "" ? "" : `${visibleCount} / ${totalTopicsCount} wyników`;
  }

  if (searchInput) searchInput.addEventListener("input", e => applySearch(e.target.value));

  /* ---------------- mobile drawer ---------------- */
  function openMobileSidebar() { sidebar.classList.add("open"); overlay.classList.add("show"); }
  function closeMobileSidebar() { sidebar.classList.remove("open"); overlay.classList.remove("show"); }
  if (burgerBtn) {
    burgerBtn.addEventListener("click", () => {
      sidebar.classList.contains("open") ? closeMobileSidebar() : openMobileSidebar();
    });
  }
  if (overlay) overlay.addEventListener("click", closeMobileSidebar);
  // Kliknięcie w link menu na mobile zamyka szufladę (nawigacja i tak przeładuje stronę)
  allNavItems.forEach(el => el.addEventListener("click", closeMobileSidebar));

  /* ---------------- syntax highlighting ---------------- */
  if (window.hljs) {
    document.querySelectorAll("pre code").forEach(block => hljs.highlightElement(block));
  }

  /* ---------------- copy-to-clipboard for code blocks ---------------- */
  const copyIconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="1.5"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>`;
  const checkIconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  function addCopyButtons() {
    contentEl.querySelectorAll("pre").forEach(pre => {
      if (pre.parentElement.classList.contains("code-wrap")) return;

      const wrap = document.createElement("div");
      wrap.className = "code-wrap";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.innerHTML = `${copyIconSvg}<span>Kopiuj</span>`;
      btn.addEventListener("click", () => copyCodeBlock(pre, btn));
      wrap.appendChild(btn);
    });
  }

  function copyCodeBlock(pre, btn) {
    const code = pre.querySelector("code");
    const text = code ? code.innerText : pre.innerText;

    const done = () => {
      btn.classList.add("copied");
      btn.innerHTML = `${checkIconSvg}<span>Skopiowano</span>`;
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = `${copyIconSvg}<span>Kopiuj</span>`;
      }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      done();
    } catch (e) { /* silent */ }
  }

  addCopyButtons();

  /* ---------------- pjax navigation: dociąga TYLKO treść, menu się nie odbudowuje ----------------
     Każdy plik .html jest wciąż pełną, samodzielną stroną (działa bez JS, dobre dla SEO/no-JS),
     ale kliknięcie linku wewnętrznego podmienia tylko #content przez fetch(), bez przeładowania
     całego dokumentu - stąd zero "flasha" menu/topbaru przy nawigacji. */
  function isPjaxLink(link) {
    if (!link || !link.href) return false;
    if (link.target === "_blank" || link.hasAttribute("download")) return false;
    let url;
    try { url = new URL(link.href, window.location.href); } catch (e) { return false; }
    if (url.origin !== window.location.origin) return false;
    if (!/\.html?$/.test(url.pathname)) return false;
    return true;
  }

  function setActiveNavItem(pathname) {
    allNavItems.forEach(el => el.classList.remove("active"));
    const match = allNavItems.find(el => {
      try { return new URL(el.href, window.location.href).pathname === pathname; }
      catch (e) { return false; }
    });
    if (match) {
      match.classList.add("active");
      const group = match.closest(".nav-group");
      if (group) group.open = true;
    }
  }

  async function pjaxNavigate(url, push) {
    let response;
    try {
      response = await fetch(url, { credentials: "same-origin" });
    } catch (e) { return false; }
    if (!response || !response.ok) return false;

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const newContent = doc.getElementById("content");
    if (!newContent) return false;

    contentEl.innerHTML = newContent.innerHTML;
    document.title = doc.title;

    const targetPath = new URL(url, window.location.href).pathname;
    setActiveNavItem(targetPath);

    if (push) window.history.pushState({ pjax: true }, doc.title, url);

    if (window.hljs) {
      contentEl.querySelectorAll("pre code").forEach(block => hljs.highlightElement(block));
    }
    addCopyButtons();
    window.scrollTo(0, 0);
    closeMobileSidebar();
    return true;
  }

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest("a");
    if (!isPjaxLink(link)) return;

    e.preventDefault();
    pjaxNavigate(link.href, true).then(ok => {
      if (!ok) window.location.href = link.href; // fallback: normalne przejście
    });
  });

  window.addEventListener("popstate", () => {
    pjaxNavigate(window.location.href, false).then(ok => {
      if (!ok) window.location.reload();
    });
  });

  /* ---------------- dark / light theme toggle ---------------- */
  if (themeToggle) {
    function setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      themeToggle.classList.toggle("is-light", theme === "light");
      themeToggle.title = theme === "light" ? "Tryb ciemny" : "Tryb jasny";
      try { localStorage.setItem("kompendium-theme", theme); } catch (e) { /* ignore */ }
    }

    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      setTheme(current === "light" ? "dark" : "light");
    });

    let savedTheme = null;
    try { savedTheme = localStorage.getItem("kompendium-theme"); } catch (e) { /* ignore */ }
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
      setTheme(prefersLight ? "light" : "dark");
    }
  }

  /* ---------------- full-width toggle ---------------- */
  if (widthToggle) {
    const wideIconExpand = `<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>`;
    const wideIconCollapse = `<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="10" y1="14" x2="3" y2="21"/>`;

    function setWide(isWide) {
      mainArea.classList.toggle("wide", isWide);
      widthToggle.title = isWide ? "Wąska treść" : "Pełna szerokość";
      document.getElementById("widthToggleIcon").innerHTML = isWide ? wideIconCollapse : wideIconExpand;
    }

    widthToggle.addEventListener("click", () => {
      setWide(!mainArea.classList.contains("wide"));
    });

    // Strona domyślnie ZAWSZE otwiera się na pełną szerokość (klasa "wide"
    // jest już wpisana w HTML każdej strony, to tylko synchronizuje ikonę/tytuł).
    setWide(true);
  }

})();
