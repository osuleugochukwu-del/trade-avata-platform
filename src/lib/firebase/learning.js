import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where
} from 'firebase/firestore';
import { db } from './db.js';

function requireDb() {
  if (!db) throw new Error('Firebase Firestore is not configured yet.');
}

export async function getCourseDocument(courseId) {
  requireDb();
  const snap = await getDoc(doc(db, 'courses', courseId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function getCourseEnrollment(uid, courseId) {
  requireDb();
  const snap = await getDoc(doc(db, 'enrollments', `${uid}_${courseId}`));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function getCourseModules(courseId) {
  requireDb();
  const snap = await getDocs(query(collection(db, 'courses', courseId, 'modules'), where('courseId', '==', courseId)));
  return snap.docs.map(item => ({ id: item.id, ...item.data() })).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getModuleLessons(courseId, moduleId) {
  requireDb();
  const snap = await getDocs(query(collection(db, 'courses', courseId, 'modules', moduleId, 'lessons'), where('moduleId', '==', moduleId)));
  return snap.docs.map(item => ({ id: item.id, ...item.data() })).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getCourseLesson(courseId, moduleId, lessonId) {
  requireDb();
  const lessonSnap = await getDoc(doc(db, 'courses', courseId, 'modules', moduleId, 'lessons', lessonId));
  if (!lessonSnap.exists()) return null;
  const contentSnap = await getDoc(doc(db, 'courses', courseId, 'modules', moduleId, 'lessons', lessonId, 'content', 'body'));
  return {
    id: lessonSnap.id,
    ...lessonSnap.data(),
    ...(contentSnap.exists() ? contentSnap.data() : {})
  };
}

export async function getUserCourseProgress(uid, courseId) {
  requireDb();
  const snap = await getDocs(query(collection(db, 'progress'), where('userId', '==', uid), where('courseId', '==', courseId)));
  return snap.docs.map(item => ({ id: item.id, ...item.data() }));
}

export async function saveLessonProgress({ uid, courseId, moduleId, lessonId, completed, percent = 100 }) {
  requireDb();
  const progressId = `${uid}_${courseId}_${moduleId}_${lessonId}`;
  const ref = doc(db, 'progress', progressId);
  await setDoc(ref, {
    userId: uid,
    courseId,
    moduleId,
    lessonId,
    completed: Boolean(completed),
    percent: Math.max(0, Math.min(100, Number(percent) || 0)),
    completedAt: completed ? serverTimestamp() : null,
    updatedAt: serverTimestamp()
  }, { merge: true });
  return progressId;
}
