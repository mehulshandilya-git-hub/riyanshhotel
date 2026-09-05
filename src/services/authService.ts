import { User } from '@/types';
import {
  auth,
  db,
  authDoc,
  hydrateSessionUser,
  keepUserInSync,
} from '@/lib/firebase';
import { ensureSeeded } from '@/lib/seed';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

const AUTH_SESSION_KEY = 'hr_auth_user';

function friendlyAuthError(err: any): string {
  switch (err?.code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    default:
      return err?.message || 'Something went wrong. Please try again.';
  }
}

function toUser(uid: string, data: Partial<User>): User {
  return {
    id: uid,
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    role: data.role || 'customer',
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const authService = {
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    await ensureSeeded();
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const uid = cred.user.uid;

      let profile = await authDoc<User>(uid);
      if (!profile) {
        profile = toUser(uid, { email: email.trim(), name: 'Guest', role: 'customer' });
        await setDoc(doc(db, 'users', uid), profile);
      }
      const user = toUser(uid, profile);
      hydrateSessionUser(user);
      keepUserInSync(uid);
      return { success: true, user };
    } catch (err) {
      return { success: false, error: friendlyAuthError(err) };
    }
  },

  async register(data: { name: string; email: string; phone: string; password: string }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const cred = await createUserWithEmailAndPassword(auth, data.email.trim(), data.password);
      const uid = cred.user.uid;
      const user: User = {
        id: uid,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        role: 'customer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', uid), user);
      hydrateSessionUser(user);
      keepUserInSync(uid);
      return { success: true, user };
    } catch (err) {
      return { success: false, error: friendlyAuthError(err) };
    }
  },

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch {
      // ignore sign-out errors
    }
    hydrateSessionUser(null);
  },

  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { success: true };
    } catch (err) {
      return { success: false, error: friendlyAuthError(err) };
    }
  },

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(AUTH_SESSION_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  },

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin';
  },

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  },
};