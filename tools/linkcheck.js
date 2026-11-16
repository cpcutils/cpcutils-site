// Belso link-audit a helyi szerver ellen: minden href/src 200-at ad-e.
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'site');
const BASE = 'http://127.0.0.1:8099';

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith('.html')) files.push(p);
  }
})(ROOT);

const links = new Map(); // url -> [forrasok]
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = '/' + path.relative(ROOT, f).replace(/\\/g, '/');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (!u.startsWith('/') || u.startsWith('//')) continue;
    if (u.startsWith('/assets/img/')) continue; // kulon ellenorizve
    const clean = u.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (!links.has(clean)) links.set(clean, []);
    links.get(clean).push(rel);
  }
}

const get = u => new Promise(res => {
  http.get(BASE + u, r => { r.resume(); res(r.statusCode); }).on('error', () => res(0));
});

(async () => {
  let bad = 0;
  for (const [u, from] of [...links].sort()) {
    const code = await get(u);
    if (code !== 200) { bad++; console.log('HIBA', code, u, '<-', [...new Set(from)].slice(0, 3).join(', ')); }
  }
  console.log('---');
  console.log('oldalak:', files.length, '| kulonbozo belso cel:', links.size, '| hibas:', bad);
})();
