import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const exists = p => fs.existsSync(path.join(root, p));

const requiredFiles = [
  'src/lib/firebase/config.js',
  'src/lib/firebase/auth.js',
  'src/lib/firebase/db.js',
  'src/lib/firebase/account.js',
  'src/pages/login.astro',
  'src/pages/register.astro',
  'src/pages/account/index.astro',
  'src/pages/account/settings.astro',
  'firebase.json',
  'firebase/firestore.rules',
  'firebase/firestore.indexes.json',
  'firebase/storage.rules',
  'firebase/README.md',
  '.env.example'
];
for (const file of requiredFiles) if (!exists(file)) errors.push(`Missing Layer 3 file: ${file}`);

const pkg = JSON.parse(read('package.json'));
if (!pkg.dependencies?.firebase) errors.push('Firebase dependency is missing from package.json.');
if (!String(pkg.scripts?.verify || '').includes('verify-layer3.mjs')) errors.push('npm verify script does not include verify-layer3.mjs.');

const config = read('src/lib/firebase/config.js');
for (const key of ['PUBLIC_FIREBASE_API_KEY','PUBLIC_FIREBASE_AUTH_DOMAIN','PUBLIC_FIREBASE_PROJECT_ID','PUBLIC_FIREBASE_STORAGE_BUCKET','PUBLIC_FIREBASE_MESSAGING_SENDER_ID','PUBLIC_FIREBASE_APP_ID']) {
  if (!config.includes(key)) errors.push(`Firebase config is missing ${key}.`);
}
if (config.includes('AIza') || config.includes('firebase-admin') || config.includes('private_key')) errors.push('Possible Firebase secret material was found in browser configuration.');

const auth = read('src/lib/firebase/auth.js');
for (const required of ['createUserWithEmailAndPassword','signInWithEmailAndPassword','GoogleAuthProvider','signInWithPopup','signOut','sendPasswordResetEmail']) {
  if (!auth.includes(required)) errors.push(`Firebase auth integration is missing ${required}.`);
}

const db = read('src/lib/firebase/db.js');
for (const collection of ['users','roles','entitlements','orders','subscriptions','enrollments','progress']) {
  if (!db.includes(`'${collection}'`)) errors.push(`Account data layer does not reference ${collection}.`);
}

const rules = read('firebase/firestore.rules');
for (const pattern of ['match /users/{userId}', 'match /roles/{userId}', 'match /entitlements/{entitlementId}', 'match /orders/{orderId}', 'match /subscriptions/{subscriptionId}', 'match /enrollments/{enrollmentId}', 'match /progress/{progressId}', 'match /auditLogs/{logId}', 'allow read, write: if false']) {
  if (!rules.includes(pattern)) errors.push(`Firestore rules missing expected security boundary: ${pattern}`);
}
if (rules.includes('allow write: if true') || rules.includes('allow read, write: if true')) errors.push('Firestore rules contain an unsafe allow-all rule.');

const storage = read('firebase/storage.rules');
if (!storage.includes('allow read, write: if false')) errors.push('Storage rules do not contain the deny-by-default boundary.');

const indexes = JSON.parse(read('firebase/firestore.indexes.json'));
const indexGroups = new Set((indexes.indexes || []).map(index => index.collectionGroup));
for (const group of ['entitlements','orders','subscriptions','enrollments','progress']) if (!indexGroups.has(group)) errors.push(`Missing Firestore index for ${group}.`);

for (const file of ['src/pages/login.astro','src/pages/register.astro','src/pages/account/index.astro','src/pages/account/settings.astro']) {
  const source = read(file);
  if (!source.includes('<script>')) errors.push(`${file} is missing its client-side Firebase script.`);
  if (source.includes('serviceAccount') || source.includes('private_key')) errors.push(`Possible privileged credential reference in ${file}.`);
}

const jsFiles = [
  'src/lib/firebase/config.js',
  'src/lib/firebase/auth.js',
  'src/lib/firebase/db.js',
  'src/lib/firebase/account.js'
];
for (const file of jsFiles) {
  try { execFileSync(process.execPath, ['--check', path.join(root, file)], { stdio: 'pipe' }); }
  catch { errors.push(`JavaScript syntax check failed: ${file}`); }
}

function extractScripts(file) {
  const source = read(file);
  const results = [];
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatter) results.push({ label: `${file} frontmatter`, code: frontmatter[1] });
  for (const match of source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) results.push({ label: `${file} script`, code: match[1] });
  return results;
}

for (const file of ['src/pages/login.astro','src/pages/register.astro','src/pages/account/index.astro','src/pages/account/settings.astro']) {
  for (const { label, code } of extractScripts(file)) {
    const tmp = path.join(root, `.layer3-check-${file.replace(/[^a-z0-9]/gi, '_')}.mjs`);
    fs.writeFileSync(tmp, code);
    try { execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' }); }
    catch { errors.push(`JavaScript syntax check failed: ${label}`); }
    finally { fs.rmSync(tmp, { force: true }); }
  }
}

const forbiddenSecrets = ['BEGIN PRIVATE KEY','serviceAccountKey','client_email','private_key'];
for (const file of ['src/lib/firebase/config.js','src/lib/firebase/auth.js','src/lib/firebase/db.js','src/lib/firebase/account.js','.env.example']) {
  const source = read(file);
  for (const secret of forbiddenSecrets) if (source.includes(secret)) errors.push(`Potential secret marker ${secret} found in ${file}.`);
}

if (errors.length) {
  console.error('Layer 3 verification failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}

console.log('Layer 3 verification passed.');
console.log(`Verified ${requiredFiles.length} required backend/account files, Firebase auth flows, security boundaries, indexes, secret-safety checks, and JavaScript syntax.`);
