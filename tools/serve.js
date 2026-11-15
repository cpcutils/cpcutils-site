const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..', 'site');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.json':'application/json', '.woff2':'font/woff2', '.txt':'text/plain; charset=utf-8' };
// Cloudflare Pages viselkedes helyi utanzasa: /launcher -> launcher.html, /docs -> docs/index.html
function candidates(u) {
  const list = [];
  if (u.endsWith('/')) list.push(u + 'index.html');
  else { list.push(u); list.push(u + '.html'); list.push(u + '/index.html'); }
  return list;
}
http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  const list = candidates(u).map(p => path.join(root, p)).filter(fp => fp.startsWith(root));
  const tryNext = (i) => {
    if (i >= list.length) { res.writeHead(404, {'Content-Type':'text/plain'}); return res.end('404 ' + u); }
    const fp = list[i];
    fs.readFile(fp, (e, d) => {
      if (e) return tryNext(i + 1);
      res.writeHead(200, { 'Content-Type': types[path.extname(fp)] || 'application/octet-stream' });
      res.end(d);
    });
  };
  tryNext(0);
}).listen(8099, '127.0.0.1', () => console.log('serving http://127.0.0.1:8099'));
