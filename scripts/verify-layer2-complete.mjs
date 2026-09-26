import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors=[];
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const exists = p => fs.existsSync(path.join(root,p));

const { products, courses, toolCategories, tools } = await import(path.join(root,'src/data/site.js'));

if (!exists('src/pages/learn/[slug].astro')) errors.push('Missing public course detail route.');
if (!exists('src/pages/tools/[slug].astro')) errors.push('Missing tool detail route.');
if (!exists('src/pages/products/[slug].astro')) errors.push('Missing product detail route.');

const toolSlugs = new Set();
for (const tool of tools) {
  if (toolSlugs.has(tool.slug)) errors.push(`Duplicate tool slug: ${tool.slug}`);
  toolSlugs.add(tool.slug);
  if (!tool.name || !tool.category || !tool.kind) errors.push(`Incomplete tool record: ${tool.slug}`);
}
const categorySlugs = new Set();
for (const category of toolCategories) {
  if (categorySlugs.has(category.slug)) errors.push(`Duplicate tool category: ${category.slug}`);
  categorySlugs.add(category.slug);
  for (const slug of category.tools) if (!toolSlugs.has(slug)) errors.push(`Tool category ${category.slug} references missing tool: ${slug}`);
}
const renderedKinds = new Set([...read('src/pages/tools/[slug].astro').matchAll(/tool\.kind === '([^']+)'/g)].map(m=>m[1]));
for (const tool of tools) if (!renderedKinds.has(tool.kind) && !read('src/pages/tools/[slug].astro').includes(`tool.slug === '${tool.slug}'`)) errors.push(`No renderer branch for tool: ${tool.slug} (${tool.kind})`);

for (const course of courses) {
  if (!course.delivery?.type) errors.push(`Course missing delivery metadata: ${course.slug}`);
}
for (const product of products.filter(p=>p.visible)) {
  if (!product.delivery?.type) errors.push(`Visible product missing delivery metadata: ${product.slug}`);
  if (product.delivery?.type === 'Web tool' && !product.delivery?.url) errors.push(`Web tool missing delivery URL: ${product.slug}`);
}

const filesToScan = [
  'src/components/Header.astro','src/pages/tools.astro','src/pages/tools/[slug].astro','src/pages/products/[slug].astro',
  'src/pages/products/index.astro','src/pages/learn/index.astro','src/pages/learn/[slug].astro','src/pages/index.astro'
];
for (const f of filesToScan) {
  const t=read(f);
  if (t.includes('https://widgets.tradingview-widget.com') || t.includes('https://www.tradingview-widget.com')) {
    // Allowed official TradingView widget hosts.
  }
  if (t.includes('http://')) errors.push(`Insecure HTTP URL found in ${f}`);
}

const productPage=read('src/pages/products/[slug].astro');
if (!productPage.includes('product.delivery?.url?.startsWith')) errors.push('Product delivery URLs are not base-path aware.');
const header=read('src/components/Header.astro');
if (!header.includes('nav-dropdown:hover .mega-menu') && !read('src/styles/global.css').includes('.nav-dropdown:hover .mega-menu')) errors.push('Desktop Tools hover menu is missing.');
if (!header.includes('mobile-tool-groups')) errors.push('Mobile expandable Tools groups are missing.');
if (!read('src/pages/tools.astro').includes('localStorage')) errors.push('Tools favorites/recent history is missing.');
if (!read('src/pages/tools/[slug].astro').includes('Related tools')) errors.push('Related tools panel is missing.');

console.log(`Layer 2 structural checks: ${tools.length} tools, ${toolCategories.length} categories, ${courses.length} courses, ${products.filter(p=>p.visible).length} public products.`);
if (errors.length) { console.error('\nLayer 2 verification failed:\n- '+errors.join('\n- ')); process.exit(1); }
console.log('Layer 2 structural verification passed.');
