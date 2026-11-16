// data/changelog.json generalasa a ket build-history.tsv-bol.
// Futtatas: node tools/changelog.js  (a repon kivuli, helyi build-torteneteket olvassa)
const fs = require('fs');
const path = require('path');

const BUILDER = process.argv[2] || 'G:\\7zip_project\\builder\\build-history.tsv';
const LAUNCHER = process.argv[3] || 'G:\\CPC_Soft\\launcher\\build-history.tsv';
const OUT = path.join(__dirname, '..', 'data', 'changelog.json');
const LIMIT = 12;

const rows = p => {
  if (!fs.existsSync(p)) { console.error('nincs ilyen fajl:', p); return []; }
  return fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(l => l.trim()).map(l => l.split('\t'));
};

// builder: datum, verzio, build, meret, sha, note
const builder = rows(BUILDER).map(r => ({
  date: (r[0] || '').slice(0, 10),
  version: r[1] || '',
  build: Number(r[2] || 0),
  size: Number(r[3] || 0),
  sha: (r[4] || '').toLowerCase()
})).filter(x => x.version && x.sha);

// launcher: datum, build, meret, sha, note  -> verzio a build szambol: 1.0.<build/100>.<build%100>
const launcher = rows(LAUNCHER).map(r => {
  const b = Number(r[1] || 0);
  return {
    date: (r[0] || '').slice(0, 10),
    version: b ? `1.0.${Math.floor(b / 100)}.${b % 100}` : '',
    build: b,
    size: Number(r[2] || 0),
    sha: (r[3] || '').toLowerCase()
  };
}).filter(x => x.version && x.sha);

const take = list => list.slice(-LIMIT).reverse();

const out = {
  generated: new Date().toISOString().slice(0, 19).replace('T', ' '),
  products: [
    { id: 'sfx-builder', name: 'CPC 7z SFX Builder', releases: take(builder) },
    { id: 'launcher', name: 'CPC MInst Launcher', releases: take(launcher) }
  ]
};

fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('kesz:', path.relative(process.cwd(), OUT));
for (const p of out.products) console.log(' ', p.name, '->', p.releases.length, 'kiadas, legujabb:', p.releases[0] ? p.releases[0].version : '-');
