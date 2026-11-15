// app.js - kozos viselkedes: reveal, tema-kapcsolo, galeria-tabok
(function () {
  'use strict';

  /* ---- scroll reveal ---- */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    var i = 0;
    els.forEach(function (el) {
      el.style.transitionDelay = (Math.min(i++, 8) * 55) + 'ms';
      io.observe(el);
    });
  } else {
    els.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- light / dark ---- */
  var KEY = 'cpc-theme';
  function apply(t) {
    if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
  }
  try { apply(localStorage.getItem(KEY) || 'dark'); } catch (e) {}
  var tb = document.getElementById('theme-toggle');
  if (tb) {
    tb.addEventListener('click', function () {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      var next = isLight ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }

  /* ---- mobil menu ---- */
  var burger = document.getElementById('nav-burger');
  var mnav = document.getElementById('main-nav');
  if (burger && mnav) {
    var setNav = function (open) {
      mnav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', function () {
      setNav(burger.getAttribute('aria-expanded') !== 'true');
    });
    mnav.addEventListener('click', function (ev) {
      if (ev.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') setNav(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setNav(false);
    });
  }

  /* ---- screenshot tabs ---- */
  var tabBox = document.getElementById('gallery-tabs');
  if (tabBox) {
    tabBox.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-tab]');
      if (!b) return;
      var id = b.getAttribute('data-tab');
      tabBox.querySelectorAll('.tab').forEach(function (t) { t.classList.toggle('is-active', t === b); });
      document.querySelectorAll('[data-pane]').forEach(function (img) {
        img.hidden = img.getAttribute('data-pane') !== id;
      });
    });
  }

  /* ---- lightbox (nagyito) ---- */
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lb-img');
  var lbClose = document.getElementById('lb-close');
  function openLb(src, alt) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    if (!lb) return;
    lb.classList.remove('is-open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  document.addEventListener('click', function (ev) {
    var z = ev.target.closest('[data-zoom]');
    if (z) { ev.preventDefault(); openLb(z.getAttribute('data-zoom'), (z.querySelector('img') || {}).alt); return; }
    if (ev.target === lb || ev.target === lbClose) closeLb();
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') closeLb();
    if ((ev.key === 'Enter' || ev.key === ' ') && document.activeElement && document.activeElement.hasAttribute('data-zoom')) {
      ev.preventDefault();
      openLb(document.activeElement.getAttribute('data-zoom'));
    }
  });

  /* ---- analytics: cookieless, only if a provider is configured later ---- */
  // window.__cpcAnalytics && loadAnalytics();
})();
