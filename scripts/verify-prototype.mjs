import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'astro.config.mjs', 'package.json', 'README.md', 'ARCHITECTURE.md', 'TEST-CHECKLIST.md',
  '.github/workflows/deploy-pages.yml', 'public/brand/trade-avata-mark.png', 'public/images/hero-laptop.png',
  'src/layouts/BaseLayout.astro', 'src/components/Header.astro', 'src/components/Footer.astro',
  'src/styles/global.css', 'src/data/site.js',
  'src/pages/index.astro', 'src/pages/products/index.astro', 'src/pages/products/[slug].astro',
  'src/pages/tools.astro', 'src/pages/tools/[slug].astro', 'src/pages/company.astro', 'src/pages/faq.astro', 'src/pages/contact.astro',
  'src/pages/login.astro', 'src/pages/register.astro', 'src/pages/learn/index.astro', 'src/pages/learn/[slug].astro',
  'src/pages/terms.astro', 'src/pages/privacy.astro', 'src/pages/risk-disclosure.astro', 'src/pages/404.astro'
];
const errors=[];
for (const file of required) if (!fs.existsSync(path.join(root,file))) errors.push(`Missing required file: ${file}`);

const sourceFiles=[];
function walk(dir){
  for(const name of fs.readdirSync(dir)){
    const full=path.join(dir,name); const st=fs.statSync(full);
    if(st.isDirectory()) walk(full); else if(/\.(astro|js|css)$/.test(name)) sourceFiles.push(full);
  }
}
walk(path.join(root,'src'));

for(const file of sourceFiles){
  const text=fs.readFileSync(file,'utf8');
  if(text.includes('/Tradeavata/')) errors.push(`Old repository base found in ${path.relative(root,file)}`);
}

const css=fs.readFileSync(path.join(root,'src/styles/global.css'),'utf8');
if((css.match(/\{/g)||[]).length !== (css.match(/\}/g)||[]).length) errors.push('Unbalanced CSS braces');
if((css.match(/\(/g)||[]).length !== (css.match(/\)/g)||[]).length) errors.push('Unbalanced CSS parentheses');

const routes = new Set(['/','/products/','/tools/','/company/','/faq/','/contact/','/login/','/register/','/learn/','/terms/','/privacy/','/risk-disclosure/']);
for(const f of fs.readdirSync(path.join(root,'src/pages'))){
  if(f.endsWith('.astro') && f!=='index.astro' && f!=='404.astro') routes.add('/'+f.replace(/\.astro$/,'/') );
}
const hrefRegex=/href=\{`\$\{base\}([^`]+)`\}/g;
for(const file of sourceFiles){
  const text=fs.readFileSync(file,'utf8');
  for(const m of text.matchAll(hrefRegex)){
    const target='/'+m[1].replace(/^\//,'').replace(/\/$/,'')+'/';
    const normalized=target.replace(/\/+/g,'/');
    const dynamic=normalized.includes('[slug]') || normalized.includes('${');
    const asset=normalized.startsWith('/brand/') || normalized.startsWith('/images/');
    if(!dynamic && !asset && !routes.has(normalized) && !normalized.startsWith('/products/')) errors.push(`Potential broken internal route ${normalized} in ${path.relative(root,file)}`);
  }
}


const siteData=fs.readFileSync(path.join(root,'src/data/site.js'),'utf8');
if(!siteData.includes("delivery: { type: 'Vimeo'")) errors.push('Course delivery model is missing Vimeo metadata');
if(!siteData.includes("delivery: { type: 'cTrader Store'")) errors.push('cTrader Store delivery model is missing');
if(!siteData.includes("delivery: { type: 'External download'")) errors.push('External download delivery model is missing');
const toolPage=fs.readFileSync(path.join(root,'src/pages/tools/[slug].astro'),'utf8');
if(!toolPage.includes("kind === 'position-sizing'")) errors.push('Position sizing tool is missing');
if(!toolPage.includes("kind === 'risk-reward'")) errors.push('Risk/reward tool is missing');
if(!toolPage.includes("kind === 'technical-analysis'")) errors.push('Technical analysis widget is missing');
if(!siteData.includes('toolCategories')) errors.push('Tool category structure is missing');
const cssText=fs.readFileSync(path.join(root,'src/styles/global.css'),'utf8');
if((cssText.match(/Trade Avata readability and prototype utility states/g)||[]).length!==1) errors.push('Duplicate readability utility block detected in CSS');

const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
if(pkg.dependencies?.['@astrojs/firebase']) errors.push('Unexpected @astrojs/firebase dependency');
if(pkg.scripts?.build !== 'astro build') errors.push('Build script is not astro build');

console.log(`Checked ${required.length} required files and ${sourceFiles.length} source files.`);
if(errors.length){ console.error('\nVerification failed:\n- '+errors.join('\n- ')); process.exit(1); }
console.log('Static verification passed.');
