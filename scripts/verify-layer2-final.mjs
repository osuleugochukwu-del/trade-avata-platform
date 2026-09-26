import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

const pkg = JSON.parse(read('package.json'));
const verifyScript = pkg.scripts?.verify || '';
for (const requiredCheck of ['verify-prototype.mjs','verify-layer2-complete.mjs','verify-layer2-final.mjs','verify-tools.mjs']) {
  if (!verifyScript.includes(requiredCheck)) errors.push(`npm verify script is missing ${requiredCheck}.`);
}

const site = read('src/data/site.js');
const header = read('src/components/Header.astro');
const toolsPage = read('src/pages/tools.astro');
const toolDetail = read('src/pages/tools/[slug].astro');
const productDetail = read('src/pages/products/[slug].astro');
const css = read('src/styles/global.css');

if (!header.includes('mega-menu') || !header.includes('mobile-tool-groups')) errors.push('Tools navigation is not present in both desktop and mobile structures.');
if (!css.includes('.nav-dropdown:hover .mega-menu') && !css.includes('.nav-dropdown:focus-within .mega-menu')) errors.push('Desktop Tools menu lacks hover/focus styling.');
if (!toolsPage.includes('data-tool-search') || !toolsPage.includes('trade-avata-tool-history')) errors.push('Tools Center search/history is incomplete.');
if (!toolDetail.includes('data-favorite') || !toolDetail.includes('trade-avata-fav-')) errors.push('Tool favorites are incomplete.');
if (!productDetail.includes('product.delivery?.url?.startsWith')) errors.push('Product delivery links are not base-path aware.');
if (!site.includes("url: '/tools/position-sizing/'")) errors.push('Risk Calculator product does not point to the position sizing tool.');

const tools = [...site.matchAll(/slug: '([^']+)', name: '([^']+)', category: '([^']+)', description: '([^']+)', ready: true, kind: '([^']+)'/g)];
if (tools.length < 20) errors.push(`Expected at least 20 public tools, found ${tools.length}.`);

const forbidden = ['localhost:', '127.0.0.1:', 'http://'];
for (const f of ['src/components/Header.astro','src/pages/index.astro','src/pages/products/index.astro','src/pages/products/[slug].astro','src/pages/tools.astro','src/pages/tools/[slug].astro','src/pages/learn/index.astro','src/pages/learn/[slug].astro']) {
  const t = read(f);
  for (const bad of forbidden) if (t.includes(bad)) errors.push(`Forbidden URL pattern ${bad} in ${f}.`);
}

if (errors.length) {
  console.error('Layer 2 final verification failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log('Layer 2 final verification passed.');
console.log(`Verified ${tools.length} tool records, desktop/mobile tools navigation, Tools Center state, product delivery routing, and deployment-safe URL patterns.`);
