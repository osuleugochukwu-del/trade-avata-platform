import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const errors = [];
const required = [
  'src/lib/firebase/learning.js',
  'src/lib/learning/content.js',
  'src/data/learning.js',
  'src/pages/learn/index.astro',
  'src/pages/learn/[slug].astro',
  'src/pages/learn/lesson/index.astro',
  'firebase/seed/learning-content.example.json',
  'firebase/firestore.rules',
  'firebase/firestore.indexes.json',
  'ARCHITECTURE.md',
  'README.md'
];
const read = file => {
  const target = path.join(root, file);
  if (!fs.existsSync(target)) { errors.push(`Missing Layer 4 file: ${file}`); return ''; }
  return fs.readFileSync(target, 'utf8');
};

for (const file of required) read(file);
const learning = read('src/lib/firebase/learning.js');
for (const item of ['getCourseDocument','getCourseEnrollment','getCourseModules','getModuleLessons','getCourseLesson','getUserCourseProgress','saveLessonProgress']) {
  if (!learning.includes(`export async function ${item}`)) errors.push(`Learning API missing ${item}.`);
}
const content = read('src/lib/learning/content.js');
for (const type of ['heading','paragraph','image','chart','callout','warning','takeaway','list','orderedList','quote','example','video','resource','quiz','divider']) if (!content.includes(`'${type}'`)) errors.push(`Learning content schema missing ${type}.`);
const reader = read('src/pages/learn/lesson/index.astro');
for (const token of ['URLSearchParams','getCourseEnrollment','saveLessonProgress','sequentially','vimeo.com','loading = \'lazy\'']) if (!reader.includes(token)) errors.push(`Lesson reader missing expected feature: ${token}.`);
const rules = read('firebase/firestore.rules');
for (const token of ['isCourseEnrolled','isCourseEnrolled(courseId)','match /content/{contentId}','previousProgressId','allow create: if isOwner(request.resource.data.userId) && isCourseEnrolled(request.resource.data.courseId)']) if (!rules.includes(token)) errors.push(`Learning security rule missing: ${token}.`);
if (rules.includes('allow read, write: if true')) errors.push('Unsafe allow-all Firestore rule found.');
const seed = JSON.parse(read('firebase/seed/learning-content.example.json'));
if (seed.content.blocks.some(block => block.type === 'image' && !String(block.url || '').startsWith('https://'))) errors.push('Example lesson image URL is not HTTPS.');
if (!seed.content.blocks.some(block => block.type === 'image')) errors.push('Example learning content does not demonstrate external images.');
if (!seed.content.blocks.some(block => block.type === 'video')) errors.push('Example learning content does not demonstrate video blocks.');
if (!read('ARCHITECTURE.md').includes('Layer 4 — Learning + Product Access')) errors.push('Architecture does not document Layer 4.');
if (!read('README.md').includes('Layer 4 — Learning + Product Access')) errors.push('README does not document Layer 4.');

for (const file of ['src/lib/firebase/learning.js','src/lib/learning/content.js','src/data/learning.js']) {
  try { execFileSync(process.execPath, ['--check', path.join(root,file)], { stdio:'pipe' }); }
  catch { errors.push(`JavaScript syntax check failed: ${file}`); }
}
for (const file of ['src/pages/learn/lesson/index.astro','src/pages/learn/[slug].astro']) {
  const source = read(file);
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatter) {
    const tmp = path.join(root,'.layer4-frontmatter-check.mjs'); fs.writeFileSync(tmp,frontmatter[1]);
    try { execFileSync(process.execPath,['--check',tmp],{stdio:'pipe'}); } catch { errors.push(`Astro frontmatter syntax check failed: ${file}`); } finally { fs.rmSync(tmp,{force:true}); }
  }
}

if (errors.length) { console.error('Layer 4 verification failed:\n- '+errors.join('\n- ')); process.exit(1); }
console.log('Layer 4 verification passed.');
console.log(`Verified ${required.length} required learning/access files, readable lesson blocks, external-media model, sequential-progress hooks, Firebase access boundaries, and JavaScript syntax.`);
