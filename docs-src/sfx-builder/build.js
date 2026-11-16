#!/usr/bin/env node
/* CPC 7z SFX Builder - help builder
 *
 * Tartalom (markdown) -> statikus HTML. Nincs dependency, nincs CDN, nincs JS a kimenetben.
 *
 * Hasznalat:
 *   node build.js            # minden nyelv, ami a toc.json-ban van
 *   node build.js en         # csak egy nyelv
 *   node build.js --check    # nem ir, csak jelenti a hianyzo fejezeteket
 *
 * Uj fejezet: content/<lang>/<id>.md + egy sor a content/toc.json-ban.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CONTENT = path.join(ROOT, 'content');
const toc = JSON.parse(fs.readFileSync(path.join(CONTENT, 'toc.json'), 'utf8'));

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const langArg = args.find(a => !a.startsWith('--'));
const langs = langArg ? [langArg] : (toc.langs || ['en', 'hu']);

/* ------------------------------------------------------------------ inline */

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(raw) {
  let s = esc(raw);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return s;
}

/* ------------------------------------------------------------------- blocks */

let figN = 0;
let figPrefix = 'x';

function mdToHtml(md, outDir, imgBase) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  let firstBlockSeen = false;

  const isBlank = l => l.trim() === '';
  const isUl = l => /^\s*[-*]\s+/.test(l);
  const isOl = l => /^\s*\d+\.\s+/.test(l);
  const isH = l => /^#{1,4}\s+/.test(l);
  const isHr = l => /^\s*(---|\*\*\*)\s*$/.test(l);
  const isQuote = l => /^\s*>\s?/.test(l);
  const isImg = l => /^\s*!\[(.*?)\]\((.+?)\)\s*$/.test(l);
  const isTableRow = l => /^\s*\|.*\|\s*$/.test(l);
  const isTableSep = l => /^\s*\|[\s:|-]+\|\s*$/.test(l);

  function imageBlock(line) {
    const m = line.match(/^\s*!\[(.*?)\]\((.+?)\)\s*$/);
    const alt = m[1];
    const src = m[2];
    const file = path.join(outDir, src);
    const cap = alt ? `<figcaption>${inline(alt)}</figcaption>` : '';
    if (fs.existsSync(file)) {
      figN++;
      const id = figPrefix + '-' + figN;
      return (`<figure id="fig-${id}"><a class="zoom" href="#z-${id}" title="Enlarge"><img src="${esc(src)}" alt="${esc(alt)}"></a>${cap}</figure>` +
        `<a class="lb" id="z-${id}" href="#fig-${id}" title="Close"><img src="${esc(src)}" alt="${esc(alt)}"><span class="x">&times;</span></a>`);
    }
    return `<figure class="ph"><div class="ph-box">Screenshot<span>${esc(src)}</span></div>${cap}</figure>`;
  }

  while (i < lines.length) {
    const line = lines[i];

    if (isBlank(line)) { i++; continue; }

    /* kodblokk */
    if (/^\s*```/.test(line)) {
      i++;
      const buf = [];
      while (i < lines.length && !/^\s*```/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++;
      out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`);
      continue;
    }

    /* cim */
    if (isH(line)) {
      const m = line.match(/^(#{1,4})\s+(.*)$/);
      /* a fejezet sajat # cime kimarad: a h1-et a toc.json adja */
      if (!firstBlockSeen && m[1].length === 1) { firstBlockSeen = true; i++; continue; }
      firstBlockSeen = true;
      const lvl = m[1].length === 1 ? 2 : Math.min(m[1].length, 5); /* # -> h2, ## -> h2, ### -> h3 */
      out.push(`<h${lvl}>${inline(m[2])}</h${lvl}>`);
      i++;
      continue;
    }

    if (isHr(line)) { out.push('<hr>'); i++; continue; }

    /* idezet / tipp */
    if (isQuote(line)) {
      const buf = [];
      while (i < lines.length && isQuote(lines[i])) { buf.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
      out.push(`<div class="note">${mdToHtml(buf.join('\n'), outDir, imgBase)}</div>`);
      continue;
    }

    /* felsorolas */
    if (isUl(line) || isOl(line)) {
      const ordered = isOl(line);
      const items = [];
      while (i < lines.length && (isUl(lines[i]) || isOl(lines[i]))) {
        items.push(lines[i].replace(/^\s*(?:[-*]|\d+\.)\s+/, ''));
        i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>` + items.map(t => `<li>${inline(t)}</li>`).join('') + `</${tag}>`);
      continue;
    }

    /* tabla */
    if (isTableRow(line) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const cells = l => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && isTableRow(lines[i])) { rows.push(cells(lines[i])); i++; }
      out.push('<table><thead><tr>' + head.map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
        rows.map(r => '<tr>' + r.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') +
        '</tbody></table>');
      continue;
    }

    /* kep sajat sorban */
    if (isImg(line)) { out.push(imageBlock(line)); i++; continue; }

    /* bekezdes */
    const buf = [];
    while (i < lines.length && !isBlank(lines[i]) && !isH(lines[i]) && !isUl(lines[i]) &&
           !isOl(lines[i]) && !isHr(lines[i]) && !isQuote(lines[i]) && !isImg(lines[i]) &&
           !isTableRow(lines[i]) && !/^\s*```/.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }

  return out.join('\n');
}

/* ------------------------------------------------------------------ sablon */

const CSS_INLINE = fs.readFileSync(path.join(ROOT, 'assets', 'help.css'), 'utf8');

function navHtml(chapters, lang, activeId) {
  const items = [];
  let n = 0;
  for (const ch of chapters) {
    const file = path.join(CONTENT, lang, ch.id + '.md');
    if (!fs.existsSync(file)) continue;
    n++;
    const active = ch.id === activeId ? ' class="on"' : '';
    items.push(`<li${active}><a href="${ch.id}.html"><span class="n">${n}</span>${esc(ch[lang] || ch.en)}</a></li>`);
  }
  return `<nav><ul>${items.join('')}</ul></nav>`;
}

function pageHtml({ lang, ch, title, body, chapters, prev, next }) {
  const other = (toc.langs || []).find(l => l !== lang);
  const langLabel = { en: 'English', hu: 'Magyar', de: 'Deutsch' };
  const switchLink = other
    ? `<a class="lang" href="../${other}/${ch.id}.html">${langLabel[other] || other}</a>`
    : '';
  const pager = [
    prev ? `<a class="prev" href="${prev.id}.html">&larr; ${esc(prev[lang] || prev.en)}</a>` : '<span></span>',
    next ? `<a class="next" href="${next.id}.html">${esc(next[lang] || next.en)} &rarr;</a>` : '<span></span>'
  ].join('');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} - ${esc(toc.product)}</title>
<style>${CSS_INLINE}</style>
</head>
<body>
<header class="top">
  <div class="brand">${esc(toc.product)}<span>Help</span></div>
  ${switchLink}
</header>
<div class="wrap">
  <aside>
    ${navHtml(chapters, lang, ch.id)}
  </aside>
  <main>
    <h1>${esc(ch[lang] || ch.en)}</h1>
    ${body}
    <div class="pager">${pager}</div>
    <footer>Help &middot; ${new Date().toISOString().slice(0, 10)} &middot; Central PC Service Bt.</footer>
  </main>
</div>
</body>
</html>
`;
}

/* -------------------------------------------------------------------- main */

let problems = 0;
let written = 0;

for (const lang of langs) {
  const outDir = path.join(ROOT, lang);
  if (!checkOnly && !fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const existing = toc.chapters.filter(ch => fs.existsSync(path.join(CONTENT, lang, ch.id + '.md')));
  const missing = toc.chapters.filter(ch => !fs.existsSync(path.join(CONTENT, lang, ch.id + '.md')));

  for (const ch of missing) {
    console.log(`  [${lang}] hianyzo fejezet: ${ch.id} (${ch[lang] || ch.en})`);
  }
  if (existing.length === 0) {
    console.log(`  [${lang}] nincs mit generalni`);
    continue;
  }

  existing.forEach((ch, idx) => {
    const mdPath = path.join(CONTENT, lang, ch.id + '.md');
    const md = fs.readFileSync(mdPath, 'utf8');
    figN = 0; figPrefix = lang + '-' + ch.id;
    const body = mdToHtml(md, outDir, '../assets/img/' + lang + '/');
    const html = pageHtml({
      lang, ch, body, chapters: toc.chapters,
      title: ch[lang] || ch.en,
      prev: existing[idx - 1],
      next: existing[idx + 1]
    });
    if (checkOnly) return;
    fs.writeFileSync(path.join(outDir, ch.id + '.html'), html, 'utf8');
    written++;
    console.log(`  [${lang}] ${ch.id}.html`);
  });

  if (!checkOnly && existing[0]) {
    const first = fs.readFileSync(path.join(outDir, existing[0].id + '.html'), 'utf8');
    fs.writeFileSync(path.join(outDir, 'index.html'), first, 'utf8');
  }
}

if (!checkOnly) {
  const def = toc.defaultLang || 'en';
  fs.writeFileSync(path.join(ROOT, 'index.html'),
    `<!DOCTYPE html><html><head><meta charset="utf-8">` +
    `<meta http-equiv="refresh" content="0; url=${def}/index.html">` +
    `<title>${esc(toc.product)} - Help</title></head>` +
    `<body><p><a href="${def}/index.html">${esc(toc.product)} - Help</a></p></body></html>\n`, 'utf8');
  console.log(`\nKesz: ${written} oldal generalva.`);
}
