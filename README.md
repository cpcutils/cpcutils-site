# cpcutils.com — website source

Static site for **CPC Utils** (CPC 7z SFX Builder, CPC MInst Launcher).
Data-driven: the text lives in JSON, a small Node script generates the HTML.

**Live:** https://cpcutils.com · **Preview:** Cloudflare Pages project `cpcutils-site`

---

## Structure

```
data/
  copy.json       all page text: hero, sections, FAQ, pricing, product pages
  products.json   product cards (name, tagline, bullets, status, download API)
  icons.json      inline Lucide SVG paths
tools/
  build.js        the generator: data/*.json -> site/*.html
  serve.js        local preview server
site/
  assets/         css, js, fonts, images  ← SOURCE, committed
  *.html          GENERATED, not committed (see .gitignore)
site/docs/        generated from the product help sources (see below)
```

## Build and preview

```powershell
node tools\build.js      # regenerates site\*.html from data\*.json
node tools\serve.js      # http://127.0.0.1:8099
```

Node 20+. No dependencies, no package.json, no framework.

## Rules for contributors

1. **Never edit `site/*.html`** — it is overwritten by `tools/build.js`. Edit `data/copy.json` or `tools/build.js`.
2. **`site/assets/` is real source** — CSS, JS, fonts and images are edited and committed directly.
3. Text changes belong in `data/copy.json` under the matching key; the generator escapes HTML for you.
4. Facts about the products must match the program documentation. Claims that are not backed by the help files do not go on the site.
5. Prices and licence terms live in `data/copy.json` under `pricing`. Do not change them without the owner's decision.

## Documentation pages

`/docs` is generated from the user help of the two programs, which lives in their own repositories:

- CPC 7z SFX Builder help: `G:\7zip_project\help` (built by its own `build.js`)
- CPC MInst Launcher help: `G:\CPC_Soft\launcher\help`

`tools/build.js` copies them into `site/docs/` and `site/docs/launcher/`. The web version is English only; the programs ship their own interface languages.

### docs-src (vendored copy, 2026-11-16)

The build prefers `docs-src/` over the `G:` paths, so the repository rebuilds on its own:

- `docs-src/sfx-builder/` - built `en/` + `assets/` + the editable `content/` and the help's own `build.js`
- `docs-src/launcher/` - same for the launcher

Editing still happens in the `G:` folders (those are the working copies). After a help change, refresh the vendored copy:

```powershell
$repo = 'G:\CPC_Soft\cpcutils-site'
Copy-Item 'G:\7zip_project\help\en'      "$repo\docs-src\sfx-builder\en"     -Recurse -Force
Copy-Item 'G:\7zip_project\help\assets'  "$repo\docs-src\sfx-builder\assets" -Recurse -Force
Copy-Item 'G:\7zip_project\help\content' "$repo\docs-src\sfx-builder\content" -Recurse -Force
Copy-Item 'G:\CPC_Soft\launcher\help\en'      "$repo\docs-src\launcher\en"     -Recurse -Force
Copy-Item 'G:\CPC_Soft\launcher\help\assets'  "$repo\docs-src\launcher\assets" -Recurse -Force
Copy-Item 'G:\CPC_Soft\launcher\help\content' "$repo\docs-src\launcher\content" -Recurse -Force
node tools\build.js
```

`data/changelog.json` is generated from the build history files by `node tools/changelog.js` - run it after a release, then rebuild.

## Deploy

Cloudflare Pages, project `cpcutils-site`, publish directory `site`.

```powershell
npx wrangler@4 pages deploy site --project-name=cpcutils-site --branch=preview --commit-dirty=true
```

Preview deployments carry `X-Robots-Tag: noindex` from `_headers`; remove that line before pointing the production domain at it.

## Contact

Central PC Service Bt. · info@cpcutils.com (general) · support@cpcutils.com (licences, product support)
