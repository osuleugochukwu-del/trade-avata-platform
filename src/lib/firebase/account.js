import { auth, logout, watchAuth } from './auth.js';
import {
  ensureUserProfile,
  getUserEnrollments,
  getUserEntitlements,
  getUserOrders,
  getUserProgress,
  getUserRole,
  getUserSubscriptions
} from './db.js';

export function bindAccountPage({ onSignedOut, onLoaded, onError }) {
  return watchAuth(async user => {
    if (!user) {
      onSignedOut?.();
      return;
    }
    try {
      await ensureUserProfile(user);
      const [role, entitlements, orders, subscriptions, enrollments, progress] = await Promise.all([
        getUserRole(user.uid),
        getUserEntitlements(user.uid),
        getUserOrders(user.uid),
        getUserSubscriptions(user.uid),
        getUserEnrollments(user.uid),
        getUserProgress(user.uid)
      ]);
      onLoaded?.({ user, role, entitlements, orders, subscriptions, enrollments, progress });
    } catch (error) {
      onError?.(error);
    }
  });
}

export async function signOutCurrentUser() {
  if (auth) await logout();
}
