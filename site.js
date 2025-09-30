// Simple interactions: mobile nav + theme toggle
// Runs after DOM is parsed (script is loaded with `defer`)

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const navToggle = $(".nav-toggle");
  const navList = $("#primary-nav");
  const themeToggle = $("#theme-toggle");
  const yearEl = $("#year");

  // Footer year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) {
        // focus first link for accessibility
        const firstLink = navList.querySelector("a");
        firstLink && firstLink.focus();
      }
    });

    // Close menu when clicking a link (on small screens)
    $$("a", navList).forEach((a) =>
      a.addEventListener("click", () => {
        if (navList.classList.contains("open")) {
          navList.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      })
    );
  }

  // Theme handling
  const storageKey = "theme"; // 'light' | 'dark'
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

  const getStoredTheme = () => localStorage.getItem(storageKey);
  const setStoredTheme = (t) => localStorage.setItem(storageKey, t);

  const applyTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    if (themeToggle) {
      const isDark = t === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      const icon = themeToggle.querySelector(".theme-icon");
      if (icon) icon.textContent = isDark ? "☀️" : "🌙"; // shows next action
      themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    }
  };

  const initTheme = () => {
    const stored = getStoredTheme();
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
      return { explicit: true, theme: stored };
    }
    const system = prefersDark && prefersDark.matches ? "dark" : "light";
    applyTheme(system);
    return { explicit: false, theme: system };
  };

  const state = initTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      setStoredTheme(next);
    });
  }

  // Update theme if system preference changes and no explicit user choice
  if (prefersDark && typeof prefersDark.addEventListener === "function" && !state.explicit) {
    prefersDark.addEventListener("change", (e) => {
      applyTheme(e.matches ? "dark" : "light");
    });
  }
})();
