// download.js - a Worker manifestbol elo verzió/méret/SHA + letoltes link
(function () {
  'use strict';
  var API = 'https://cpc-activate-dev.odd-wood-edb6.workers.dev/v1/latest/sfx-builder';

  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
  function fmtSize(b) {
    if (!b) return '—';
    var mb = b / 1048576;
    return (mb >= 1 ? mb.toFixed(1) + ' MB' : Math.round(b / 1024) + ' KB');
  }
  function decodeJwt(t) {
    var p = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    while (p.length % 4) p += '=';
    return JSON.parse(decodeURIComponent(escape(atob(p))));
  }

  fetch(API, { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (j) {
      var m = decodeJwt(j.token);
      setText('dl-version', m.version || '—');
      setText('dl-date', m.released || '—');
      setText('dl-size', fmtSize(m.size || m.exe_size));
      setText('dl-sha', m.sha256 || m.exe_sha256 || 'shown in the package');
      var btn = document.getElementById('dl-btn');
      if (btn && m.exe_url) { btn.href = m.exe_url; btn.textContent = 'Download ' + m.version; }
      var badge = document.getElementById('version-badge');
      var badgeText = document.getElementById('version-text');
      if (badge && badgeText) { badgeText.textContent = 'Latest release: ' + m.version; badge.hidden = false; }
    })
    .catch(function () {
      setText('dl-version', 'unavailable');
      var btn = document.getElementById('dl-btn');
      if (btn) { btn.removeAttribute('href'); btn.textContent = 'Update server unreachable'; }
    });
})();
