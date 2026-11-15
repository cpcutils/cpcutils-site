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
    <nav class="nav" aria-label="Main">
      <div class="nav-item">
        <a class="nav-link${active === 'products' ? ' is-active' : ''}" href="/#products">Products ${icon('chevron-down', 14)}</a>
        <div class="menu">${productItems}<div class="menu-note">More tools are on the way.</div></div>
      </div>
      ${link('/download', 'Download', 'download')}
      ${link('/docs', 'Docs', 'docs')}
      ${link('/buy', 'Buy Now', 'buy')}
      ${link('/blog', 'Blog', 'blog')}
      <div class="nav-item">
        <a class="nav-link" href="/contact">Contact ${icon('chevron-down', 14)}</a>
        <div class="menu">
          <a href="/contact">Contact</a>
          <a href="/about">About CPC Utils</a>
          <a href="/faq">FAQ</a>
        </div>
      </div>
      <button class="theme-btn" id="theme-toggle" type="button" aria-label="Toggle light and dark theme" title="Light / dark">${icon('sun', 18)}</button>
      <a class="btn btn-primary nav-cta" href="/download">${icon('download', 16)} Free Download</a>
    </nav>
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
        <a class="btn btn-ghost btn-sm" href="/${p.id === 'next-slot' ? 'contact' : p.id}">${esc(p.api ? copy.productCard.learnMore : copy.productCard.soon)}</a>
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
      <p class="pill reveal"><span class="tag">New</span> <span id="hero-version">${esc(copy.hero.pillTop)}</span></p>
      <h1 class="reveal">${heroLines}</h1>
      <p class="hero-sub reveal">${esc(copy.hero.sub)}</p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary btn-lg" href="/download">${icon('download', 18)} ${esc(copy.hero.ctaPrimary)}</a>
        <a class="btn btn-ghost btn-lg" href="#features">${esc(copy.hero.ctaSecondary)} ${icon('arrow', 16)}</a>
      </div>
      <ul class="trust reveal">${copy.hero.trust.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <a class="version-pill reveal" href="/download"><b id="version-text">latest release</b></a>
    </div>
    <div class="shots reveal">
      <div class="shot shot-back"><div class="zoomwrap" data-zoom="/assets/img/hero-done.png" role="button" tabindex="0" aria-label="Enlarge screenshot"><img src="/assets/img/hero-done.png" alt="Finished build: config check, version, output size and Done"></div></div>
      <div class="shot shot-main"><div class="zoomwrap" data-zoom="/assets/img/hero-progress.png" role="button" tabindex="0" aria-label="Enlarge screenshot"><img src="/assets/img/hero-progress.png" alt="Extracting a 289 MB package at 55% with the live log"></div></div>
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
    <div class="section-head"><h2 class="reveal">${esc(copy.steps.h2)}</h2><p class="section-sub reveal">${esc(copy.steps.sub)}</p></div>
    <ol class="steps">
      ${copy.steps.items.map((s, i) => `<li class="step reveal"><span class="step-no">${i + 1}</span><h3>${esc(s.h)}</h3><p>${esc(s.p)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section" id="features">
  <div class="wrap">
    <div class="section-head"><h2 class="reveal">${esc(copy.features.h2)}</h2><p class="section-sub reveal">${esc(copy.features.sub)}</p></div>
    <div class="feature-grid">
      ${copy.features.items.map(f => `<article class="card feature-card reveal"><h3>${esc(f.h)}</h3><p>${esc(f.p)}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap split">
    <div class="reveal">
      <h2>${esc(copy.spotlight.h2)}</h2>
      <p>${esc(copy.spotlight.p)}</p>
      <a class="btn btn-ghost" href="/sfx-builder">${esc(copy.productCard.learnMore)} ${icon('arrow', 15)}</a>
    </div>
    <div class="zoomwrap reveal" data-zoom="/assets/img/spot-unpack.png" role="button" tabindex="0" aria-label="Enlarge screenshot"><img src="/assets/img/spot-unpack.png" alt="Unpacking a package at 55% with the live log and a cancel button" loading="lazy"></div>
  </div>
</section>

<section class="section">
  <div class="wrap split reverse">
    <div class="zoomwrap reveal" data-zoom="/assets/img/spot-installer.png" role="button" tabindex="0" aria-label="Enlarge screenshot"><img src="/assets/img/spot-installer.png" alt="Installer mode configured while the build runs at 54%" loading="lazy"></div>
    <div class="reveal">
      <h2>${esc(copy.spotlight.h2b)}</h2>
      <p>${esc(copy.spotlight.pb)}</p>
      <a class="btn btn-ghost" href="/download">${esc(copy.hero.ctaPrimary)} ${icon('arrow', 15)}</a>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <div class="section-head"><h2 class="reveal">${esc(copy.gallery.h2)}</h2><p class="section-sub reveal">${esc(copy.gallery.sub)}</p></div>
    <div class="zoomwrap reveal" data-zoom="/assets/img/gal-verify.png" role="button" tabindex="0" aria-label="Enlarge screenshot"><img src="/assets/img/gal-verify.png" alt="Verification: configuration authentic, payload intact, result passed" loading="lazy"></div>
  </div>
</section>

<section class="section" id="faq">
  <div class="wrap">
    <div class="section-head"><h2 class="reveal">${esc(copy.faq.h2)}</h2></div>
    <div class="faq">
      ${copy.faq.items.map((f, i) => `<details class="faq-item reveal"${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
    </div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap cta-inner">
    <h2>${esc(copy.cta.h2)}</h2>
    <p>${esc(copy.cta.p)}</p>
    <div class="cta-actions">
      <a class="btn btn-primary btn-lg" href="/download">${icon('download', 18)} ${esc(copy.hero.ctaPrimary)}</a>
      <a class="btn btn-ghost btn-lg" href="/buy">Buy Now</a>
    </div>
  </div>
</section>`,
  scripts: `<script src="/assets/download.js?v=${BUILDV}" defer></script>`
});

/* ---------- product pages ---------- */
function productPage(id) {
  const p = products.products.find(x => x.id === id);
  const c = copy.productPages[id];
  return page({
    title: c.title,
    description: c.lead,
    active: 'products',
    ld: ldProduct(p, c),
    canonical: SITE + '/' + p.id,
    content: `<section class="page-head hero"><div class="wrap">
      <p class="pill"><span class="tag">${esc(p.statusLabel)}</span> ${esc(p.platform)}</p>
      <h1>${esc(c.h1)}</h1>
      <p class="hero-sub">${esc(c.lead)}</p>
      <div class="hero-actions">
        ${p.api ? `<a class="btn btn-primary btn-lg" href="/download">${icon('download', 18)} ${esc(copy.hero.ctaPrimary)}</a>` : `<a class="btn btn-ghost btn-lg" href="/contact">Ask about availability</a>`}
        <a class="btn btn-ghost btn-lg" href="/docs">Docs ${icon('arrow', 15)}</a>
      </div>
    </div></section>
    <section class="section"><div class="wrap prose-grid">
      ${c.sections.map(s => `<article class="card prose-card reveal"><h2>${esc(s.h)}</h2><p>${esc(s.p)}</p></article>`).join('')}
    </div></section>
    <section class="section section-alt"><div class="wrap split">
      <div class="reveal"><h2>Everything in one window</h2><p>Source, behaviour, installer options and verification live in the same project — no export, no second tool.</p><a class="btn btn-ghost" href="/download">${esc(copy.hero.ctaPrimary)} ${icon('arrow-right', 15)}</a></div>

    </div></section>`
  });
}

/* ---------- other pages ---------- */
const download = page({
  title: 'Free Download — CPC Utils',
  description: 'Download CPC 7z SFX Builder for free. Version, size and SHA-256 are shown before the download, straight from the update server.',
  active: 'download',
  canonical: SITE + '/download',
  content: `<section class="page-head"><div class="wrap">
    <h1>Free Download</h1>
    <p class="lead">CPC 7z SFX Builder is free to download. The button always points at the current release; version, size and SHA-256 come from the update server.</p>
  </div></section>
  <section class="section"><div class="wrap">
    <article class="card download-card">
      <div class="dl-head"><h2>CPC 7z SFX Builder</h2><span class="badge badge-ok">Available</span></div>
      <dl class="dl-meta">
        <div><dt>Version</dt><dd id="dl-version">—</dd></div>
        <div><dt>Released</dt><dd id="dl-date">—</dd></div>
        <div><dt>Size</dt><dd id="dl-size">—</dd></div>
        <div><dt>SHA-256</dt><dd id="dl-sha" class="mono">—</dd></div>
      </dl>
      <a class="btn btn-primary btn-lg" id="dl-btn" href="#" rel="noopener">${icon('download', 18)} Free Download</a>
      <p class="hint">No account, no email. The executable is not code-signed yet, so Windows may show the SmartScreen prompt.</p>
    </article>
    <p class="hint" style="margin-top:24px">CPC MInst Launcher: coming soon. <a href="/launcher">What it will do</a>.</p>
  </div></section>`,
  scripts: `<script src="/assets/download.js?v=${BUILDV}" defer></script>`
});

const buy = page({
  title: 'Buy Now — CPC Utils',
  description: 'CPC 7z SFX Builder is free to download. A Pro edition with custom branding is planned; checkout is not live yet.',
  active: 'buy',
  canonical: SITE + '/buy',
  content: `<section class="page-head"><div class="wrap"><h1>${esc(copy.buy.h2)}</h1><p class="lead">${esc(copy.buy.p)}</p>
    <div class="hero-actions"><a class="btn btn-primary btn-lg" href="/download">${icon('download', 18)} ${esc(copy.buy.cta)}</a></div></div></section>
    <section class="section"><div class="wrap prose-grid">
      <article class="card prose-card"><h2>Free edition</h2><p>Complete package building, installer mode, signing support and the built-in help. A short splash screen is shown in the package.</p></article>
      <article class="card prose-card"><h2>Pro edition (planned)</h2><p>No splash screen and custom branding. Pricing and checkout will be announced here.</p></article>
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
write('blog.html', stub('Blog', 'Blog', 'Notes about building packages, WinPE deployment and the tools behind CPC Utils.'));
write('changelog.html', stub('Changelog', 'Changelog', 'Release notes per product, generated from the build history.'));
write('about.html', stub('About', 'About CPC Utils', 'A small Hungarian company building portable Windows tools for technicians and developers.'));
write('contact.html', stub('Contact', 'Contact', 'Write to info@cpcutils.com.'));
write('legal/eula.html', stub('EULA', 'End user license', 'License terms for CPC Utils products.'));
write('legal/privacy.html', stub('Privacy', 'Privacy', 'What the website and the tools store. Short answer: as little as possible.'));
write('legal/third-party.html', stub('Third-party licenses', 'Third-party licenses', 'Lucide icons (ISC), 7-Zip (LGPL), TweetNaCl (public domain).'));
write('assets/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#191919"/><path d="M10 22V10h4l3 6 3-6h4v12h-3v-7l-3 6h-2l-3-6v7z" fill="#8B7BFF"/></svg>');
write('robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://cpcutils.com/sitemap.xml\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['', 'sfx-builder', 'launcher', 'download', 'buy', 'faq', 'blog', 'about', 'contact'].map(u => `  <url><loc>https://cpcutils.com/${u}</loc></url>`).join('\n')}\n</urlset>\n`);
write('_headers', `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  X-Robots-Tag: noindex, nofollow\n/assets/*\n  Cache-Control: public, max-age=86400\n`);

console.log('Kesz:', fs.readdirSync(OUT).join(', '));
