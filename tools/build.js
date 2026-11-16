// build.js - CPC Utils statikus oldalgenerator (2026-11-15, PAI)
// node tools/build.js  ->  site/
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const OUT = path.join(ROOT, 'site');
const copy = JSON.parse(fs.readFileSync(path.join(DATA, 'copy.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(DATA, 'products.json'), 'utf8'));
const LUCIDE = JSON.parse(fs.readFileSync(path.join(DATA, 'icons.json'), 'utf8'));

const BUILDV = Date.now().toString(36);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const SITE = 'https://cpcutils.com';

const ICONS = {
  'package-plus': 'M12 3l9 5v8l-9 5-9-5V8l9-5zm0 2.3L5 9.1v6.8l7 3.9 7-3.9V9.1l-7-3.8zM11 9h2v3h3v2h-3v3h-2v-3H8v-2h3V9z',
  'grid-2x2': 'M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z',
  'wrench': 'M14.7 6.3a4 4 0 105.3 5.3l-2.5-2.5 2.5-2.5-5.3-5.3-2.5 2.5 2.5 2.5zM3 21l7-7',
  'download': 'M12 3v12m0 0l-4-4m4 4l4-4M4 21h16',
  'sun': 'M12 4v2m0 12v2M4 12h2m12 0h2M6.3 6.3l1.4 1.4m8.6 8.6l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 15.7l-1.4 1.4M12 8a4 4 0 100 8 4 4 0 000-8z',
  'arrow': 'M5 12h14m0 0l-6-6m6 6l-6 6',
  'zoom': 'M11 4a7 7 0 100 14 7 7 0 000-14M16.2 16.2L21 21'
};
const icon = (name, size = 18) =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${LUCIDE[name] || LUCIDE.wrench}</svg>`;

/* ---------- chrome ---------- */
function nav(active = '') {
  const link = (href, label, id) =>
    `<a class="nav-link${active === id ? ' is-active' : ''}" href="${href}">${label}</a>`;
  const productItems = products.products
    .filter(p => p.id !== 'next-slot')
    .map(p => `<a href="${p.id}">${esc(p.name)}<br><span class="menu-note" style="padding:0">${esc(p.tagline)}</span></a>`)
    .join('');
  return `<header class="topbar">
  <div class="wrap topbar-inner">
    <a class="brand" href="/"><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">CPC Utils</span></a>
    <nav class="nav" id="main-nav" aria-label="Main">
      <div class="nav-item">
        <a class="nav-link${active === 'products' ? ' is-active' : ''}" href="/#products">Products ${icon('chevron-down', 14)}</a>
        <div class="menu">${productItems}<div class="menu-note">More tools are on the way.</div></div>
      </div>
      ${link('/download', 'Download', 'download')}
      ${link('/docs', 'Docs', 'docs')}
      ${link('/buy', 'Pricing', 'buy')}
      <div class="nav-item">
        <a class="nav-link" href="/contact">Contact ${icon('chevron-down', 14)}</a>
        <div class="menu">
          <a href="/contact">Contact</a>
          <a href="/about">About CPC Utils</a>
          <a href="/faq">FAQ</a>
        </div>
      </div>
      <button class="theme-btn" id="theme-toggle" type="button" aria-label="Toggle light and dark theme" title="Light / dark">${icon('sun', 18)}</button>
      <a class="btn btn-primary nav-cta" href="/download">${icon('download', 16)} Download</a>
    </nav>
    <button class="nav-burger" id="nav-burger" type="button" aria-label="Menu" aria-controls="main-nav" aria-expanded="false"><span class="i-menu">${icon('menu', 22)}</span><span class="i-x">${icon('x', 22)}</span></button>
  </div>
</header>`;
}

function footer() {
  const cols = copy.footer.columns.map(c => `
      <div class="foot-col">
        <h4>${esc(c.h)}</h4>
        <ul>${c.links.map(([label, href]) => `<li><a href="/${href}">${esc(label)}</a></li>`).join('')}</ul>
      </div>`).join('');
  return `<footer class="footer">
  <div class="wrap footer-inner">
    <div class="foot-brand">
      <a class="brand" href="/"><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">CPC Utils</span></a>
      <p class="foot-note">Portable Windows tools that just run.<br>${esc(copy.footer.copyright)}</p>
    </div>
    ${cols}
  </div>
  <div class="wrap foot-bottom">
    <span>${esc(copy.footer.copyright)}</span>
    <span class="foot-legal"><a href="/legal/privacy">Privacy</a> · <a href="/legal/eula">EULA</a> · <a href="/legal/third-party">Licenses</a></span>
  </div>
</footer>`;
}

function page({ title, description, content, active = '', scripts = '', ld = '', canonical = SITE + '/' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#191919">
<meta property="og:type" content="website">
<meta property="og:site_name" content="CPC Utils">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE}/assets/img/hero-progress.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/site.css?v=${BUILDV}">
${ld}
</head>
<body>
${nav(active)}
<main>
${content}
</main>
${footer()}
<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Enlarged screenshot"><button class="lb-close" id="lb-close" aria-label="Close">${icon('x', 20)}</button><img id="lb-img" alt=""></div>
<script src="/assets/app.js?v=${BUILDV}" defer></script>
${scripts}
</body>
</html>`;
}

function ldProduct(p, c) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: p.platform,
    description: c.lead,
    url: SITE + '/' + p.id,
    publisher: { '@type': 'Organization', name: 'Central PC Service Bt.' }
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/* ---------- home ---------- */
function productCards() {
  return products.products.map(p => `
    <article class="card product-card${p.accent ? ' is-accent' : ''} reveal">
      <div class="product-head">
        <span class="product-icon">${icon(p.icon, 20)}</span>
        <span class="badge${p.status === 'available' ? ' badge-ok' : ''}">${esc(p.statusLabel)}</span>
      </div>
      <h3>${esc(p.name)}</h3>
      <p class="product-tag">${esc(p.tagline)}</p>
      <ul class="ticks">${p.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      <div class="product-foot">
        <a class="btn btn-ghost btn-sm" href="/${p.id === 'next-slot' ? 'contact' : p.id}">${esc(p.id === 'next-slot' ? copy.productCard.talk : copy.productCard.learnMore)}</a>
        ${p.api ? `<a class="btn btn-primary btn-sm" href="/download">${icon('download', 15)} ${esc(copy.productCard.download)}</a>` : ''}
      </div>
    </article>`).join('');
}

const heroLines = copy.hero.h1Lines.map((l, i) =>
  i === copy.hero.h1Lines.length - 1 ? `<span class="accent">${esc(l)}</span>` : `<span>${esc(l)}</span>`).join('');

const home = page({
  title: copy.meta.title,
  description: copy.meta.description,
  content: `
<section class="hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap hero-grid">
    <div>
      <p class="pill reveal"><span class="tag">${esc(copy.hero.tag)}</span> <span id="hero-version">${esc(copy.hero.pillTop)}</span></p>
      <h1 class="reveal">${heroLines}</h1>
      <p class="hero-sub reveal">${esc(copy.hero.sub)}</p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary btn-lg" href="/download">${icon('download', 18)} ${esc(copy.hero.ctaPrimary)}</a>
        <a class="btn btn-ghost btn-lg" href="#products">${esc(copy.hero.ctaSecondary)} ${icon('arrow-right', 16)}</a>
      </div>
      <ul class="trust reveal">${copy.hero.trust.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <a class="version-pill reveal" href="/download"><b id="version-text">latest release</b></a>
    </div>
    <div class="shots reveal">
      <div class="shot shot-back"><div class="zoomwrap" data-zoom="/assets/img/${copy.hero.shots[0].img}" role="button" tabindex="0" aria-label="Enlarge screenshot"><img src="/assets/img/${copy.hero.shots[0].img}" alt="${esc(copy.hero.shots[0].alt)}"></div></div>
      <div class="shot shot-main"><div class="zoomwrap" data-zoom="/assets/img/${copy.hero.shots[1].img}" role="button" tabindex="0" aria-label="Enlarge screenshot"><img src="/assets/img/${copy.hero.shots[1].img}" alt="${esc(copy.hero.shots[1].alt)}"></div></div>
      <div class="shot-card"><div class="k">${esc(copy.hero.shotCard.k)}</div><p>${esc(copy.hero.shotCard.p)}</p></div>
    </div>
  </div>
</section>

<section class="section" id="products">
  <div class="wrap">
    <div class="section-head"><h2 class="reveal">${esc(copy.umbrella.h2)}</h2><p class="section-sub reveal">${esc(copy.umbrella.p)}</p></div>
    <div class="product-grid">${productCards()}</div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <div class="section-head"><h2 class="reveal">${esc(copy.home.shared.h)}</h2><p class="section-sub reveal">${esc(copy.home.shared.sub)}</p></div>
    <div class="feature-grid">
      ${copy.home.shared.items.map(f => `<article class="card feature-card reveal"><h3>${esc(f.h)}</h3><p>${esc(f.p)}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head"><h2 class="reveal">${esc(copy.home.whatIs.h)}</h2><p class="section-sub reveal">${esc(copy.home.whatIs.sub)}</p></div>
    <div class="prose-grid">
      ${products.products.filter(p => p.status !== 'placeholder').map(p => `<article class="card prose-card reveal"><h2>${esc(p.name)}</h2><p>${esc(p.blurb || p.tagline)}</p><p><a class="btn btn-ghost" href="/${p.id}">${esc(copy.productCard.learnMore)} ${icon('arrow-right', 15)}</a></p></article>`).join('')}
    </div>
  </div>
</section>

<section class="section section-alt" id="faq">
  <div class="wrap">
    <div class="section-head"><h2 class="reveal">${esc(copy.home.faq.h)}</h2></div>
    <div class="faq">
      ${copy.home.faq.items.map((f, i) => `<details class="faq-item reveal"${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
    </div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap cta-inner">
    <h2>${esc(copy.home.cta.h2)}</h2>
    <p>${esc(copy.home.cta.p)}</p>
    <div class="cta-actions">
      <a class="btn btn-primary btn-lg" href="/download">${icon('download', 18)} ${esc(copy.home.cta.primary)}</a>
      <a class="btn btn-ghost btn-lg" href="/buy">${esc(copy.home.cta.secondary)}</a>
    </div>
  </div>
</section>`,
  scripts: `<script src="/assets/download.js?v=${BUILDV}" defer></script>`
});

/* ---------- product pages ---------- */
function productPage(id) {
  const p = products.products.find(x => x.id === id);
  const c = copy.productPages[id];
  const zoom = (s, lazy) => `<div class="zoomwrap reveal" data-zoom="/assets/img/${s.img}" role="button" tabindex="0" aria-label="Enlarge screenshot"><img src="/assets/img/${s.img}" alt="${esc(s.alt)}"${lazy ? ' loading="lazy"' : ''}></div>`;
  const link = (l) => l ? `<a class="btn btn-ghost" href="${l.href}">${esc(l.label)} ${icon('arrow-right', 15)}</a>` : '';

  const actions = p.api
    ? `<a class="btn btn-primary btn-lg" href="/download">${icon('download', 18)} ${esc(copy.productCard.download)}</a>`
    : `<a class="btn btn-primary btn-lg" href="${c.cta ? c.cta.actions[0].href : '/contact'}">${esc(c.cta ? c.cta.actions[0].label : 'Ask about availability')} ${icon('arrow-right', 15)}</a>`;
  const secondary = c.secondary
    ? `<a class="btn btn-ghost btn-lg" href="${c.secondary.href}">${esc(c.secondary.label)} ${icon('arrow-right', 15)}</a>` : '';
  const head = `
      <p class="pill"><span class="tag">${esc(p.statusLabel)}</span> ${esc(p.platform)}</p>
      <h1>${esc(c.h1)}</h1>
      <p class="hero-sub">${esc(c.lead)}</p>
      <div class="hero-actions">${actions}${secondary}</div>`;

  const hero = c.heroShot
    ? `<section class="page-head hero"><div class="wrap hero-grid"><div>${head}</div>${zoom(c.heroShot)}</div></section>`
    : `<section class="page-head hero"><div class="wrap">${head}</div></section>`;

  const sections = `<section class="section"><div class="wrap prose-grid">
      ${c.sections.map(s => `<article class="card prose-card reveal"><h2>${esc(s.h)}</h2><p>${esc(s.p)}</p></article>`).join('')}
    </div></section>`;

  const steps = c.steps ? `<section class="section section-alt"><div class="wrap">
      <div class="section-head"><h2 class="reveal">${esc(c.steps.h2)}</h2>${c.steps.sub ? `<p class="section-sub reveal">${esc(c.steps.sub)}</p>` : ''}</div>
      <ol class="steps">${c.steps.items.map((x, i) => `<li class="step reveal"><span class="step-no">${i + 1}</span><h3>${esc(x.h)}</h3><p>${esc(x.p)}</p></li>`).join('')}</ol>
    </div></section>` : '';

  const features = c.features ? `<section class="section section-alt"><div class="wrap">
      <div class="section-head"><h2 class="reveal">${esc(c.features.h)}</h2>${c.features.sub ? `<p class="section-sub reveal">${esc(c.features.sub)}</p>` : ''}</div>
      <div class="feature-grid">${c.features.items.map(f => `<article class="card feature-card reveal"><h3>${esc(f.h)}</h3><p>${esc(f.p)}</p></article>`).join('')}</div>
    </div></section>` : '';

  const spotlight = c.spotlight ? `<section class="section"><div class="wrap split${c.spotlight.reverse ? ' reverse' : ''}">
      ${zoom(c.spotlight, true)}
      <div class="reveal"><h2>${esc(c.spotlight.h)}</h2><p>${esc(c.spotlight.p)}</p>${link(c.spotlight.link)}</div>
    </div></section>` : '';

  const spotlight2 = c.spotlight2 ? `<section class="section section-alt"><div class="wrap split${c.spotlight2.reverse ? ' reverse' : ''}">
      ${c.spotlight2.img ? zoom(c.spotlight2, true) : ''}
      <div class="reveal"><h2>${esc(c.spotlight2.h)}</h2><p>${esc(c.spotlight2.p)}</p>${link(c.spotlight2.link)}</div>
    </div></section>` : '';

  const gallery = c.gallery ? `<section class="section"><div class="wrap">
      <div class="section-head"><h2 class="reveal">${esc(c.gallery.h)}</h2>${c.gallery.sub ? `<p class="section-sub reveal">${esc(c.gallery.sub)}</p>` : ''}</div>
      ${c.gallery.img ? zoom(c.gallery, true) : ''}
    </div></section>` : '';

  const closing = c.closing ? `<section class="section section-alt"><div class="wrap split">
      <div class="reveal"><h2>${esc(c.closing.h)}</h2><p>${esc(c.closing.p)}</p>${link(c.closing.link)}</div>
    </div></section>` : '';

  const faqBlock = c.faq ? `<section class="section"><div class="wrap">
      <div class="section-head"><h2 class="reveal">${esc(c.faq.h)}</h2></div>
      <div class="faq">${c.faq.items.map((f, i) => `<details class="faq-item reveal"${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
    </div></section>` : '';

  const ctaBlock = c.cta ? `<section class="cta-band"><div class="wrap cta-inner">
      <h2>${esc(c.cta.h)}</h2><p>${esc(c.cta.p)}</p>
      <div class="cta-actions">${c.cta.actions.map(a => `<a class="btn ${a.kind === 'primary' ? 'btn-primary' : 'btn-ghost'} btn-lg" href="${a.href}">${esc(a.label)}</a>`).join('')}</div>
    </div></section>` : '';

  return page({
    title: c.title,
    description: c.lead,
    active: 'products',
    ld: ldProduct(p, c),
    canonical: SITE + '/' + p.id,
    content: hero + sections + steps + features + spotlight + spotlight2 + gallery + closing + faqBlock + ctaBlock
  });
}

/* ---------- other pages ---------- */
const download = page({
  title: 'Download — CPC Utils',
  description: 'Download CPC 7z SFX Builder, or ask for the CPC MInst Launcher beta build. Version, size and SHA-256 come straight from the release server.',
  active: 'download',
  canonical: SITE + '/download',
  content: `<section class="page-head"><div class="wrap">
    <h1>Download</h1>
    <p class="lead">The builder is available now. The launcher is in beta: the current build is sent on request, because it is still changing.</p>
  </div></section>
  <section class="section"><div class="wrap">
    ${products.products.filter(p => p.status !== 'placeholder').map(p => p.api ? `
    <article class="card download-card">
      <div class="dl-head"><h2>${esc(p.name)}</h2><span class="badge badge-ok">${esc(p.statusLabel)}</span></div>
      <dl class="dl-meta">
        <div><dt>Version</dt><dd id="dl-version">—</dd></div>
        <div><dt>Released</dt><dd id="dl-date">—</dd></div>
        <div><dt>Size</dt><dd id="dl-size">—</dd></div>
        <div><dt>SHA-256</dt><dd id="dl-sha" class="mono">—</dd></div>
      </dl>
      <a class="btn btn-primary btn-lg" id="dl-btn" href="#" rel="noopener">${icon('download', 18)} ${esc(copy.productCard.download)}</a>
      <p class="hint">No account, no email. The program is not code-signed yet, so Windows may show the SmartScreen prompt. A package you build can carry your own signature.</p>
    </article>` : `
    <article class="card download-card" style="margin-top:18px">
      <div class="dl-head"><h2>${esc(p.name)}</h2><span class="badge">${esc(p.statusLabel)}</span></div>
      <p class="hint" style="margin:10px 0 16px">${esc(p.blurb || p.tagline)} Not on this page yet: the beta build is sent by email with a test profile.</p>
      <a class="btn btn-primary btn-lg" href="/contact">Ask for the beta build</a>
    </article>`).join('')}
  </div></section>`,
  scripts: `<script src="/assets/download.js?v=${BUILDV}" defer></script>`
});

const planCard = p => `<article class="card plan${p.highlight ? ' plan-hl' : ''}">
      <h3>${esc(p.name)}</h3>
      <div class="plan-price">${esc(p.price)}${p.per ? `<span>${esc(p.per)}</span>` : ''}</div>
      <p class="plan-sub">${esc(p.sub)}</p>
      <ul class="plan-list">${p.items.map(i => `<li class="${i.on ? 'on' : 'off'}"><span class="tick">${i.on ? '&#10003;' : '&mdash;'}</span>${esc(i.t)}</li>`).join('')}</ul>
      <a class="btn ${p.highlight ? 'btn-primary' : 'btn-ghost'}" href="${esc(p.ctaHref)}">${esc(p.cta)}</a>
    </article>`;

const buy = page({
  title: 'Pricing — CPC Utils',
  description: 'CPC 7z SFX Builder: free, or Pro at $30. CPC MInst Launcher: every function free; Supporter $20, Brand $60. Perpetual licences.',
  active: 'buy',
  canonical: SITE + '/buy',
  content: `<section class="page-head"><div class="wrap"><h1>${esc(copy.pricing.h1)}</h1><p class="lead">${esc(copy.pricing.lead)}</p>
    <div class="hero-actions"><a class="btn btn-primary btn-lg" href="/download">${icon('download', 18)} ${esc(copy.buy.cta)}</a></div></div></section>
    ${copy.pricing.products.map(pr => `<section class="section"><div class="wrap">
      <div class="section-head"><h2>${esc(pr.name)}</h2><p class="section-sub">${esc(pr.sub)}</p></div>
      <div class="plan-grid">${pr.plans.map(planCard).join('')}</div>
      ${pr.note ? `<p class="hint" style="margin-top:18px">${esc(pr.note)}</p>` : ''}
    </div></section>`).join('')}
    <section class="section section-alt"><div class="wrap">
      <h2>How to buy</h2>
      <p>${esc(copy.pricing.howto)}</p>
      <p class="hint">${esc(copy.pricing.note)}</p>
    </div></section>`
});

const faq = page({
  title: 'FAQ — CPC Utils',
  description: 'Answers about free download, portability, WinPE support, code signing and what the built packages contain.',
  active: 'faq',
  canonical: SITE + '/faq',
  content: `<section class="page-head"><div class="wrap"><h1>${esc(copy.faq.h2)}</h1></div></section>
  <section class="section"><div class="wrap"><div class="faq">
    ${copy.faq.items.map((f, i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
  </div></div></section>`
});

const stub = (title, h1, text) => page({
  title: title + ' — CPC Utils',
  description: text,
  content: `<section class="page-head"><div class="wrap"><h1>${esc(h1)}</h1><p class="lead">${esc(text)}</p></div></section>
  <section class="section"><div class="wrap"><p class="hint">This page is being written. In the meantime: <a href="/">front page</a> · <a href="/download">free download</a>.</p></div></section>`
});

/* ---------- write ---------- */
fs.mkdirSync(OUT, { recursive: true });
const write = (f, s) => { fs.mkdirSync(path.dirname(path.join(OUT, f)), { recursive: true }); fs.writeFileSync(path.join(OUT, f), s, 'utf8'); };

write('index.html', home);
write('sfx-builder.html', productPage('sfx-builder'));
write('launcher.html', productPage('launcher'));
write('download.html', download);
write('buy.html', buy);
write('faq.html', faq);
// --- kiadastortenet a data/changelog.json-bol (tools/changelog.js generalja) ---
const chlog = (() => {
  try { return JSON.parse(fs.readFileSync(path.join(DATA, 'changelog.json'), 'utf8')); } catch { return null; }
})();
const fmtSize = b => b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.round(b / 1024) + ' KB';
const relTable = p => p.releases.length
  ? `<div class="rel-wrap"><table class="rel-table"><thead><tr><th>Version</th><th>Date</th><th>Size</th><th>SHA-256</th></tr></thead><tbody>
${p.releases.map(r => `<tr><td class="mono">${esc(r.version)}</td><td>${esc(r.date)}</td><td>${fmtSize(r.size)}</td><td class="mono">${esc(r.sha.slice(0, 16))}…</td></tr>`).join('\n')}
</tbody></table></div>`
  : '<p class="hint">No public release recorded yet.</p>';

write('changelog.html', page({
  title: 'Changelog — CPC Utils',
  description: 'Release history for CPC 7z SFX Builder and CPC MInst Launcher: version, date, size and SHA-256 of every recorded build.',
  canonical: SITE + '/changelog',
  content: `<section class="page-head"><div class="wrap"><h1>Changelog</h1><p class="lead">Every build is recorded with its version, date, size and SHA-256. The download page always shows the current one.</p></div></section>
  ${chlog ? chlog.products.map(p => `<section class="section"><div class="wrap">
    <div class="section-head"><h2 class="reveal">${esc(p.name)}</h2></div>
    ${relTable(p)}
  </div></section>`).join('\n  ') : `<section class="section"><div class="wrap"><p class="hint">Release history is being assembled. <a href="/download">Current version and checksum</a></p></div></section>`}
  <section class="section section-alt"><div class="wrap"><p class="hint">SHA-256 values are shortened for the table; the full checksum is on the <a href="/download">download page</a> and in the release manifest the program reads.</p></div></section>`
}));

write('about.html', page({
  title: 'About — CPC Utils',
  description: 'CPC Utils is built by Central PC Service Bt., a Hungarian company that repairs and builds PCs. The tools are used on real machines before they are sold.',
  canonical: SITE + '/about',
  content: `<section class="page-head"><div class="wrap"><h1>Built on a service bench, not in a marketing department</h1>
  <p class="lead">CPC Utils is the software arm of Central PC Service Bt., a Hungarian company that repairs and builds PCs for businesses and home users.</p></div></section>
  <section class="section"><div class="wrap prose-grid">
    <article class="card prose-card"><h2>Why these tools exist</h2><p>We build them for ourselves first. Every package on a customer machine, every service stick and every WinPE image here is made with the same programs we sell. When something is annoying in daily use, it gets fixed; when a feature only looks good in a screenshot, it does not get built.</p></article>
    <article class="card prose-card"><h2>What that means for you</h2><ul><li>A single portable executable: nothing to install, no .NET, no runtime.</li><li>Settings next to the program, not in the registry.</li><li>No account, no telemetry, no email required to download.</li><li>Output you can check before it leaves your hands.</li></ul></article>
  </div>
  <p class="hint" style="margin-top:26px">Written in Hungary. Support in English and Hungarian: <a href="/contact">contact</a>.</p></section>`
}));

write('contact.html', page({
  title: 'Contact — CPC Utils',
  description: 'Licences, purchasing, beta builds and bug reports: support@cpcutils.com. General questions: info@cpcutils.com.',
  canonical: SITE + '/contact',
  content: `<section class="page-head"><div class="wrap"><h1>Contact</h1><p class="lead">Two addresses, so nothing gets lost.</p></div></section>
  <section class="section"><div class="wrap prose-grid">
    <article class="card prose-card"><h2>Licences and product support</h2><p><strong>support@cpcutils.com</strong></p><ul><li>Buying a licence, renewal, lost key</li><li>Beta builds of CPC MInst Launcher</li><li>Bug reports and package problems</li></ul></article>
    <article class="card prose-card"><h2>Everything else</h2><p><strong>info@cpcutils.com</strong></p><ul><li>General questions about the company</li><li>Partnerships and volume licences</li><li>Anything that does not fit the first column</li></ul></article>
  </div>
  <section class="section"><div class="wrap"><h2>What to include in a bug report</h2><p>The program version, your Windows version, what you did and what happened. If a package misbehaves: the build log from the Build page saved to a text file, and the package size. That is usually enough to reproduce it. Write in English or Hungarian.</p></div></section></section>`
}));
write('404.html', page({
  title: 'Page not found — CPC Utils',
  description: 'This page does not exist.',
  content: `<section class="page-head"><div class="wrap"><h1>This page unpacked somewhere else</h1><p class="lead">The link you followed points at a page that is not here. The front page, the download and the docs are a good place to restart.</p><div class="hero-actions"><a class="btn btn-primary" href="/">Back to the start</a><a class="btn btn-ghost" href="/download">Free download</a></div></div></section>`
}));
write('legal/eula.html', page({
  title: 'End user license — CPC Utils',
  description: 'Licence summary for CPC Utils products: perpetual licence, 12 months of updates and support, one workstation, no redistribution.',
  canonical: SITE + '/legal/eula',
  content: `<section class="page-head"><div class="wrap"><h1>End user license</h1><p class="lead">A plain summary. The binding text ships with every release and is shown on the License page inside the program.</p></div></section>
  <section class="section"><div class="wrap prose-grid">
    <article class="card prose-card"><h2>What you get</h2><ul><li>The licence is <strong>perpetual</strong>: the version you buy keeps working.</li><li>It includes <strong>12 months of updates and support</strong>. When that period ends the program still works; it simply stops receiving updates.</li><li>Activation is bound to the workstation where you activate it, and needs an internet connection once.</li></ul></article>
    <article class="card prose-card"><h2>What you may not do</h2><ul><li>Redistribute or resell the licensed edition as your own product.</li><li>Share one key across machines it was not activated on.</li><li>Remove the licence or branding notices from the program itself.</li></ul></article>
  </div>
  <p class="hint" style="margin-top:26px">Moving to another machine? The program exports the licence to a password-protected key file — <a href="/docs">see the documentation</a>. Questions about a specific case: <a href="/contact">contact</a>.</p></section>`
}));

write('legal/privacy.html', page({
  title: 'Privacy — CPC Utils',
  description: 'What the website and the programs store: no advertising trackers, no account, no telemetry from the tools.',
  canonical: SITE + '/legal/privacy',
  content: `<section class="page-head"><div class="wrap"><h1>Privacy</h1><p class="lead">Short version: the website does not follow you, and the programs do not report on you.</p></div></section>
  <section class="section"><div class="wrap prose-grid">
    <article class="card prose-card"><h2>The website</h2><ul><li>No advertising trackers and no profiling cookies.</li><li>No account and no newsletter: downloading requires no email address.</li><li>The download page asks our release endpoint for the current version, which records the request like any web server does.</li></ul></article>
    <article class="card prose-card"><h2>The programs</h2><ul><li>No telemetry, no usage statistics, no crash uploading.</li><li>Settings are stored next to the executable, not in the cloud.</li><li>Activation contacts our licence server once and sends the key plus a machine-bound identifier; nothing else.</li></ul></article>
  </div>
  <p class="hint" style="margin-top:26px">Data requests, deletion, anything unclear: <a href="/contact">info@cpcutils.com</a>.</p></section>`
}));

write('legal/third-party.html', page({
  title: 'Third-party licenses — CPC Utils',
  description: 'Open source components used by CPC Utils: Lucide icons (ISC), 7-Zip (LGPL), LZMA SDK (public domain), TweetNaCl (public domain).',
  canonical: SITE + '/legal/third-party',
  content: `<section class="page-head"><div class="wrap"><h1>Third-party licenses</h1><p class="lead">The components we build on, and the licence each one carries.</p></div></section>
  <section class="section"><div class="wrap prose-grid">
    <article class="card prose-card"><h2>In the programs</h2><ul><li><strong>LZMA SDK</strong> — public domain. The extractor inside every built package is our own build of it.</li><li><strong>7-Zip</strong> — GNU LGPL. The compression engine; its licence text ships with the program.</li><li><strong>TweetNaCl</strong> — public domain. Ed25519 signature primitives.</li></ul></article>
    <article class="card prose-card"><h2>On the website</h2><ul><li><strong>Lucide</strong> icons — ISC licence.</li><li><strong>Oxanium</strong> and <strong>Inter</strong> typefaces — SIL Open Font License, self-hosted.</li><li>No CDN, no third-party script, no external font request.</li></ul></article>
  </div>
  <p class="hint" style="margin-top:26px">The complete licence texts ship with each release and are linked from the program's License page.</p></section>`
}));
write('assets/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#191919"/><path d="M10 22V10h4l3 6 3-6h4v12h-3v-7l-3 6h-2l-3-6v7z" fill="#8B7BFF"/></svg>');
write('robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://cpcutils.com/sitemap.xml\n');
/* ---------- docs: a meglevo sugo bebontezese ---------- */
const HELP_SRC = process.env.CPC_HELP_SRC || 'G:\\7zip_project\\help';
function buildDocs() {
  const en = path.join(HELP_SRC, 'en');
  if (!fs.existsSync(en)) { console.warn('Docs: help forras nem talalhato ->', en); return []; }
  const idx = fs.readFileSync(path.join(en, 'index.html'), 'utf8');
  const chapters = [];
  const re = /<a href="(\d\d-[^"]+\.html)"><span class="n">(\d+)<\/span>([^<]+)<\/a>/g;
  let m;
  while ((m = re.exec(idx))) chapters.push({ href: m[1], n: m[2], title: m[3] });
  for (const f of fs.readdirSync(en).filter(x => x.endsWith('.html'))) {
    let html = fs.readFileSync(path.join(en, f), 'utf8');
    html = html.replace(/<a class="lang" href="\.\.\/hu\/[^"]*">[^<]*<\/a>/, '<a class="lang" href="/docs">&larr; CPC Utils Docs</a>');
    if (!/rel="canonical"/.test(html)) html = html.replace('</head>', `<link rel="canonical" href="${SITE}/docs/en/${f.replace(/\.html$/, '')}">\n</head>`);
    write('docs/en/' + f, html);
  }
  fs.mkdirSync(path.join(OUT, 'docs/assets/img'), { recursive: true });
  fs.copyFileSync(path.join(HELP_SRC, 'assets/help.css'), path.join(OUT, 'docs/assets/help.css'));
  fs.cpSync(path.join(HELP_SRC, 'assets/img/en'), path.join(OUT, 'docs/assets/img/en'), { recursive: true });
  return chapters;
}

const chapters = buildDocs();

/* ---------- launcher docs ---------- */
const HELP_SRC_LAUNCHER = process.env.CPC_HELP_SRC_LAUNCHER || 'G:\\CPC_Soft\\launcher\\help';
function buildLauncherDocs() {
  const en = path.join(HELP_SRC_LAUNCHER, 'en');
  if (!fs.existsSync(en)) { console.warn('Docs: launcher help nem talalhato ->', en); return []; }
  const idx = fs.readFileSync(path.join(en, 'index.html'), 'utf8');
  const list = [];
  const re = /<a href="(\d\d-[^"]+\.html)"><span class="n">(\d+)<\/span>([^<]+)<\/a>/g;
  let mm;
  while ((mm = re.exec(idx))) list.push({ href: mm[1], n: mm[2], title: mm[3] });
  for (const f of fs.readdirSync(en).filter(x => x.endsWith('.html'))) {
    let html = fs.readFileSync(path.join(en, f), 'utf8');
    html = html.replace(/<a class="lang" href="\.\.\/(hu|en)\/[^"]*">[^<]*<\/a>/, '<a class="lang" href="/docs">&larr; CPC Utils Docs</a>');
    if (!/rel="canonical"/.test(html)) html = html.replace('</head>', '<link rel="canonical" href="' + SITE + '/docs/launcher/en/' + f.replace(/\.html$/, '') + '">\n</head>');
    write('docs/launcher/en/' + f, html);
  }
  const imgSrc = path.join(HELP_SRC_LAUNCHER, 'assets', 'img', 'en');
  const imgOut = path.join(OUT, 'docs', 'launcher', 'assets', 'img', 'en');
  if (fs.existsSync(imgSrc)) { fs.mkdirSync(imgOut, { recursive: true }); fs.cpSync(imgSrc, imgOut, { recursive: true }); }
  return list;
}
const launcherChapters = buildLauncherDocs();

write('docs/index.html', page({
  title: 'Documentation — CPC Utils',
  description: 'User guides for CPC 7z SFX Builder and CPC MInst Launcher: interface, sources, installer mode, profiles, WinPE and command line.',
  active: 'docs',
  canonical: SITE + '/docs',
  content: `<section class="page-head"><div class="wrap">
    <h1>Documentation</h1>
    <p class="lead">The complete user guide for both tools. English only on the web; the programs ship with their own interface languages.</p>
  </div></section>
  <section class="section"><div class="wrap">
    <h2>CPC 7z SFX Builder</h2>
    <div class="doc-grid">${chapters.map(c => `<a class="card doc-card reveal" href="/docs/en/${c.href.replace(/\.html$/, '')}"><span class="step-no">${c.n}</span><h3>${esc(c.title)}</h3></a>`).join('')}</div>
    <h2 style="margin-top:38px">CPC MInst Launcher</h2>
    <div class="doc-grid">${launcherChapters.map(c => `<a class="card doc-card reveal" href="/docs/launcher/en/${c.href.replace(/\.html$/, '')}"><span class="step-no">${c.n}</span><h3>${esc(c.title)}</h3></a>`).join('')}</div>
    <p class="hint" style="margin-top:26px">The guide is English only on the web; the program itself ships with English and Hungarian help.</p>
  </div></section>`
}));

const urls = ['', 'sfx-builder', 'launcher', 'download', 'buy', 'faq', 'about', 'contact', 'docs']
  .concat(chapters.map(c => 'docs/en/' + c.href.replace(/\.html$/, '')))
  .concat(launcherChapters.map(c => 'docs/launcher/en/' + c.href.replace(/\.html$/, '')));
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>https://cpcutils.com/${u}</loc></url>`).join('\n')}\n</urlset>\n`);
write('_headers', `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  X-Robots-Tag: noindex, nofollow\n/assets/*\n  Cache-Control: public, max-age=86400\n`);

console.log('Kesz:', fs.readdirSync(OUT).join(', '));
