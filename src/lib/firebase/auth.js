import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile
} from 'firebase/auth';
import { firebaseApp, firebaseConfigured } from './config.js';

export const auth = firebaseApp ? getAuth(firebaseApp) : null;

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export function requireFirebase() {
  if (!firebaseConfigured || !auth) {
    throw new Error('Firebase is not configured yet. Add the PUBLIC_FIREBASE_* values to the deployment environment.');
  }
}

export async function registerWithEmail(email, password, displayName) {
  requireFirebase();
  const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (displayName?.trim()) {
    await updateProfile(credential.user, { displayName: displayName.trim() });
  }
  return credential.user;
}

export async function loginWithEmail(email, password) {
  requireFirebase();
  return (await signInWithEmailAndPassword(auth, email.trim(), password)).user;
}

export async function loginWithGoogle() {
  requireFirebase();
  try {
    return (await signInWithPopup(auth, googleProvider)).user;
  } catch (error) {
    if (['auth/popup-blocked', 'auth/popup-closed-by-user'].includes(error?.code)) {
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throw error;
  }
}

export async function resetPassword(email) {
  requireFirebase();
  await sendPasswordResetEmail(auth, email.trim());
}

export async function logout() {
  requireFirebase();
  await signOut(auth);
}

export function watchAuth(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
