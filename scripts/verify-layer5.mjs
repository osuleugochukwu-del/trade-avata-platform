import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const required = [
  'src/pages/admin/index.astro',
  'src/lib/firebase/admin.js',
  'firebase/firestore.rules',
  'firebase/storage.rules',
  'package.json',
  'ARCHITECTURE.md',
  'src/pages/articles/index.astro'
];
const missing = required.filter(file => !fs.existsSync(path.join(root,file)));
if (missing.length) throw new Error(`Layer 5 missing files: ${missing.join(', ')}`);
const admin = fs.readFileSync(path.join(root,'src/pages/admin/index.astro'),'utf8');
const checks = [
  ['admin route', admin.includes('Trade Avata Control Centre')],
  ['role verification', admin.includes('getAdminRole')],
  ['products management', admin.includes('data-panel="products"')],
  ['courses management', admin.includes('data-panel="courses"')],
  ['learning content management', admin.includes('data-panel="content"')],
  ['users and roles', admin.includes('data-panel="users"') && admin.includes('setRole')],
  ['orders', admin.includes('data-panel="orders"')],
  ['announcements', admin.includes('data-panel="announcements"')],
  ['settings and flags', admin.includes('data-panel="settings"')],
  ['audit log', admin.includes('data-panel="audit"')],
  ['external image URL', admin.includes('imageUrl')],
  ['learning builder', admin.includes('data-panel="builder"') && admin.includes('block-editor') && admin.includes('saveAdminPathDocument')],
  ['access and support', admin.includes('data-panel="access"') && admin.includes('enrollment-form') && admin.includes('entitlement-form')],
  ['public article reader', fs.existsSync(path.join(root,'src/pages/articles/index.astro')) && fs.readFileSync(path.join(root,'src/pages/articles/index.astro'),'utf8').includes('articles')],
  ['role writes restricted to super admin', fs.readFileSync(path.join(root,'firebase/firestore.rules'),'utf8').includes('allow write: if isSuperAdmin()')],
  ['audit log append only', fs.readFileSync(path.join(root,'firebase/firestore.rules'),'utf8').includes('allow update, delete: if false')],
  ['audit helper', fs.readFileSync(path.join(root,'src/lib/firebase/admin.js'),'utf8').includes('writeAdminAudit')],
  ['firestore admin writes', fs.readFileSync(path.join(root,'firebase/firestore.rules'),'utf8').includes('allow write: if isAdmin()')],
  ['no service account', !admin.match(/private_key|client_email|serviceAccount/i)]
];
for (const [name, ok] of checks) if (!ok) throw new Error(`Layer 5 check failed: ${name}`);
console.log(`Layer 5 verification passed: ${checks.length} checks.`);
