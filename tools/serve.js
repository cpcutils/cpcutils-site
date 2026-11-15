const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..', 'site');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.json':'application/json' };
http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  if (u.endsWith('/')) u += 'index.html';
  const fp = path.join(root, u);
  if (!fp.startsWith(root)) { res.writeHead(403); return res.end('403'); }
  fs.readFile(fp, (e, d) => {
    if (e) { res.writeHead(404, {'Content-Type':'text/plain'}); return res.end('404 ' + u); }
    res.writeHead(200, { 'Content-Type': types[path.extname(fp)] || 'application/octet-stream' });
    res.end(d);
  });
}).listen(8099, '127.0.0.1', () => console.log('serving http://127.0.0.1:8099'));