// ========================================
// Haze Interactive Behaviors
// ========================================
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const header = document.querySelector('.site-header');
const yearEl = document.getElementById('year');

if (navToggle && siteNav) {
  // ---------- Mobile navigation toggle ----------
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the navigation when a menu link is selected for snappy UX
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (header) {
  // ---------- Sticky header state ----------
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

if (siteNav) {
  // ---------- Active link highlighting ----------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  siteNav.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const [path] = href.split('#');
    if (path && path === currentPath) {
      link.classList.add('is-active');
    }
  });
}

if (yearEl) {
  // ---------- Live copyright year ----------
  yearEl.textContent = String(new Date().getFullYear());
}